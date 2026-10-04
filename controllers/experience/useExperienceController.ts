'use client';

// ═══════════════════════════════════════════
// CONTROLADOR — /experience
// Estado de selección, progreso de scroll, puntero y
// preferencias (movimiento reducido / sin 3D / pausa).
// La vista solo renderiza: toda la lógica vive aquí.
// ═══════════════════════════════════════════

import { useCallback, useEffect, useRef, useState } from 'react';
import type * as React from 'react';
import { CHAPTERS } from '@/models/experience';
import type {
  ChapterId,
  DeviceId,
  ImmersionId,
  OpportunityId,
  TopicId,
} from '@/models/experience';

export interface ExperienceFrame {
  progress: number; // 0..4, interpolates adjacent chapter anchors
  pointerX: number;
  pointerY: number;
  yaw: number;
  pulse: number;
  device: DeviceId;
  topic: TopicId;
  immersion: ImmersionId;
  opportunity: OpportunityId;
  greeting: number; // increment per greeting action
  exploded: number; // 0 | 1 — reversible exploded state of the artifact
}

export interface ScenePointerHandlers {
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: (e: React.PointerEvent<HTMLDivElement>) => void;
  onLostPointerCapture: (e: React.PointerEvent<HTMLDivElement>) => void;
  onClickCapture: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface ExperienceController {
  rootRef: React.RefObject<HTMLDivElement | null>;
  progressRef: React.RefObject<HTMLDivElement | null>;
  frameRef: React.RefObject<ExperienceFrame>;
  activeChapter: ChapterId;
  device: DeviceId;
  topic: TopicId;
  immersion: ImmersionId;
  opportunity: OpportunityId;
  exploded: boolean;
  greeting: number;
  paused: boolean;
  reducedMotion: boolean;
  no3d: boolean;
  compact: boolean;
  visible: boolean;
  selectDevice: (id: DeviceId) => void;
  selectTopic: (id: TopicId) => void;
  selectImmersion: (id: ImmersionId) => void;
  selectOpportunity: (id: OpportunityId) => void;
  goTo: (id: ChapterId) => void;
  togglePause: () => void;
  toggleExploded: () => void;
  rotate: (direction: -1 | 1) => void;
  resetView: () => void;
  greet: () => void;
  pulse: () => void;
  /** Installed by the canvas so ref-only changes can paint demand frames. */
  requestFrameRef: React.RefObject<(() => void) | null>;
  sceneHandlers: ScenePointerHandlers;
}

const CHAPTER_IDS = CHAPTERS.map((c) => c.id) as ChapterId[];

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export function useExperienceController(): ExperienceController {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<ExperienceFrame>({
    progress: 0,
    pointerX: 0,
    pointerY: 0,
    yaw: 0,
    pulse: 0,
    device: 'tablet',
    topic: 'understand',
    immersion: '3d',
    opportunity: 'education',
    greeting: 0,
    exploded: 0,
  });

  const [activeChapter, setActiveChapter] = useState<ChapterId>('inicio');
  const [device, setDevice] = useState<DeviceId>('tablet');
  const [topic, setTopic] = useState<TopicId>('understand');
  const [immersion, setImmersion] = useState<ImmersionId>('3d');
  const [opportunity, setOpportunity] = useState<OpportunityId>('education');
  const [exploded, setExploded] = useState(false);
  const [greeting, setGreeting] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [no3d, setNo3d] = useState(false);
  const [compact, setCompact] = useState(false);
  const [visible, setVisible] = useState(true);

  // Latest prefs for non-React callbacks (scroll math / goTo behavior).
  const prefsRef = useRef({ compact: false, reduced: false });
  const dragRef = useRef<{ id: number; x: number; moved: number } | null>(null);
  const suppressClickRef = useRef(false);
  const requestFrameRef = useRef<(() => void) | null>(null);

  /* ── Media + accessibility preferences ── */
  useEffect(() => {
    const doc = document.documentElement;
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactMq = window.matchMedia('(max-width: 899px)');
    const sync = () => {
      const reduced = reduceMq.matches || doc.classList.contains('a11y-reduce-motion');
      prefsRef.current = { compact: compactMq.matches, reduced };
      setReducedMotion(reduced);
      setNo3d(doc.classList.contains('a11y-no3d'));
      setCompact(compactMq.matches);
    };
    sync();
    reduceMq.addEventListener('change', sync);
    compactMq.addEventListener('change', sync);
    window.addEventListener('atx-a11y-changed', sync);
    const observer = new MutationObserver(sync);
    observer.observe(doc, { attributes: true, attributeFilter: ['class'] });
    return () => {
      reduceMq.removeEventListener('change', sync);
      compactMq.removeEventListener('change', sync);
      window.removeEventListener('atx-a11y-changed', sync);
      observer.disconnect();
    };
  }, []);

  /* ── Chapter progress from real section positions ── */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;

    let lastProgress = -1;
    const readPosition = () => {
      raf = 0;
      const els = Array.from(root.querySelectorAll<HTMLElement>('[data-ex-chapter]'));
      if (!els.length) return;
      const anchors = els.map((el) => el.getBoundingClientRect().top + window.scrollY);
      const probe =
        window.scrollY +
        (prefsRef.current.compact ? window.innerHeight * 0.48 : window.innerHeight * 0.25);
      let i = 0;
      while (i < anchors.length - 1 && probe >= anchors[i + 1]) i++;
      const next = anchors[Math.min(i + 1, anchors.length - 1)];
      const t = next > anchors[i] ? clamp01((probe - anchors[i]) / (next - anchors[i])) : 0;
      const progress = Math.min(4, i + t);
      frameRef.current.progress = progress;
      if (progress !== lastProgress) {
        lastProgress = progress;
        // Demand mode: el scroll debe repintar el capítulo estático.
        requestFrameRef.current?.();
      }
      const id = (els[i].dataset.exChapter ?? 'inicio') as ChapterId;
      setActiveChapter((prev) => (prev === id ? prev : id));
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress / (CHAPTER_IDS.length - 1)})`;
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(readPosition);
    };

    readPosition();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('orientationchange', schedule);
    document.addEventListener('visibilitychange', schedule);
    // Los anclajes también cambian cuando el layout o las fuentes cambian.
    const ro = new ResizeObserver(schedule);
    ro.observe(root);
    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) schedule();
    });
    return () => {
      alive = false;
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('orientationchange', schedule);
      document.removeEventListener('visibilitychange', schedule);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Visibility: pause when the journey leaves the viewport or tab hides ── */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let inView = true;
    let endInView = false;
    const apply = () => setVisible(inView && !endInView && !document.hidden);
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        apply();
      },
      { threshold: 0 }
    );
    io.observe(root);
    // The persistent canvas/dock end where the closing section begins.
    const end = root.parentElement?.querySelector<HTMLElement>('[data-ex-end]');
    let endIo: IntersectionObserver | null = null;
    if (end) {
      endIo = new IntersectionObserver(
        (entries) => {
          endInView = entries[0]?.isIntersecting ?? false;
          apply();
        },
        { threshold: 0 }
      );
      endIo.observe(end);
    }
    document.addEventListener('visibilitychange', apply);
    apply();
    return () => {
      io.disconnect();
      endIo?.disconnect();
      document.removeEventListener('visibilitychange', apply);
    };
  }, []);

  /* ── Selections: same path for DOM buttons and 3D mesh clicks ── */
  const selectDevice = useCallback((id: DeviceId) => {
    frameRef.current.device = id;
    setDevice(id);
    requestFrameRef.current?.();
  }, []);
  const selectTopic = useCallback((id: TopicId) => {
    frameRef.current.topic = id;
    setTopic(id);
    requestFrameRef.current?.();
  }, []);
  const selectImmersion = useCallback((id: ImmersionId) => {
    frameRef.current.immersion = id;
    setImmersion(id);
    requestFrameRef.current?.();
  }, []);
  const selectOpportunity = useCallback((id: OpportunityId) => {
    frameRef.current.opportunity = id;
    setOpportunity(id);
    requestFrameRef.current?.();
  }, []);
  const toggleExploded = useCallback(() => {
    const next = frameRef.current.exploded > 0 ? 0 : 1;
    frameRef.current.exploded = next;
    setExploded(next === 1);
    requestFrameRef.current?.();
  }, []);

  const goTo = useCallback((id: ChapterId) => {
    const root = rootRef.current;
    if (!root) return;
    const el = root.querySelector<HTMLElement>(`[data-ex-chapter="${id}"]`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    // On compact the sticky stage covers the top of the viewport. Land the
    // chapter top at the stage's bottom edge — and past the 0.48vh probe so
    // the chapter activates — whichever comes first.
    const offset = prefsRef.current.compact
      ? Math.min(
          window.innerHeight * 0.48 - 40,
          Math.min(window.innerHeight * 0.42, 340) + 20,
        )
      : 92;
    window.scrollTo({
      top: Math.max(0, top - offset),
      behavior: prefsRef.current.reduced ? 'auto' : 'smooth',
    });
  }, []);

  const togglePause = useCallback(() => setPaused((p) => !p), []);
  const rotate = useCallback((direction: -1 | 1) => {
    frameRef.current.yaw += direction * 0.55;
    requestFrameRef.current?.();
  }, []);
  const resetView = useCallback(() => {
    frameRef.current.yaw = 0;
    frameRef.current.pointerX = 0;
    frameRef.current.pointerY = 0;
    requestFrameRef.current?.();
  }, []);
  const greet = useCallback(() => {
    frameRef.current.greeting += 1;
    setGreeting((g) => g + 1);
    requestFrameRef.current?.();
  }, []);
  const pulse = useCallback(() => {
    frameRef.current.pulse += 1;
    requestFrameRef.current?.();
  }, []);

  /* ── Drag-to-rotate over the scene viewport only ── */
  const sceneHandlers: ScenePointerHandlers = {
    onPointerDown: (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (!e.isPrimary || dragRef.current) return;
      // Los controles nativos dentro del viewport no inician arrastre.
      if ((e.target as HTMLElement).closest('button, a')) return;
      suppressClickRef.current = false;
      dragRef.current = { id: e.pointerId, x: e.clientX, moved: 0 };
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* capture may fail on some touch paths — dragging still works */
      }
    },
    onPointerMove: (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        frameRef.current.pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        frameRef.current.pointerY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }
      const drag = dragRef.current;
      if (drag && e.pointerId === drag.id) {
        const dx = e.clientX - drag.x;
        drag.moved += Math.abs(dx);
        frameRef.current.yaw += dx * 0.0085;
        drag.x = e.clientX;
      }
      requestFrameRef.current?.();
    },
    onPointerUp: (e) => {
      const drag = dragRef.current;
      if (drag?.id === e.pointerId) {
        if (drag.moved > 5) suppressClickRef.current = true;
        dragRef.current = null;
      }
      if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      requestFrameRef.current?.();
    },
    onPointerCancel: (e) => {
      if (dragRef.current?.id === e.pointerId) dragRef.current = null;
      if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    },
    onPointerLeave: () => {
      dragRef.current = null;
      frameRef.current.pointerX = 0;
      frameRef.current.pointerY = 0;
      requestFrameRef.current?.();
    },
    onLostPointerCapture: (e) => {
      if (dragRef.current?.id === e.pointerId) dragRef.current = null;
    },
    onClickCapture: (e) => {
      // Un arrastre que recorrió >5px no debe disparar clics de malla.
      if (suppressClickRef.current) {
        suppressClickRef.current = false;
        e.stopPropagation();
        e.preventDefault();
      }
    },
  };

  return {
    rootRef,
    progressRef,
    frameRef,
    activeChapter,
    device,
    topic,
    immersion,
    opportunity,
    exploded,
    greeting,
    paused,
    reducedMotion,
    no3d,
    compact,
    visible,
    selectDevice,
    selectTopic,
    selectImmersion,
    selectOpportunity,
    goTo,
    togglePause,
    toggleExploded,
    rotate,
    resetView,
    greet,
    pulse,
    requestFrameRef,
    sceneHandlers,
  };
}
