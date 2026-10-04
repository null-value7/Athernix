'use client';

// ═══════════════════════════════════════════════════════════
// CONTROLADOR — detalle de módulo (/modulos/*)
// Estado de página: scroll, puntero, hotspot activo, pausa,
// movimiento reducido, modo día/noche y disponibilidad WebGL.
// La vista solo renderiza; las escenas leen ModuleFrame.
// ═══════════════════════════════════════════════════════════

import { useCallback, useEffect, useRef, useState } from 'react';
import type * as React from 'react';

/** Estado mutable leído por la escena en cada frame — sin re-render. */
export interface ModuleFrame {
  /** 0..1 progreso de scroll suavizado por la escena. */
  progress: number;
  pointerX: number; // -1..1
  pointerY: number; // -1..1
  /** Índice del hotspot seleccionado, -1 = ninguno. */
  hotspot: number;
  /** 0 noche · 1 día (tours). */
  day: number;
  /** Contador: un clic en la escena dispara un pulso/ráfaga. */
  pulse: number;
  /** Contador: cada resetView incrementa para reiniciar la cámara. */
  reset: number;
}

export interface ModuleDetailController {
  rootRef: React.RefObject<HTMLDivElement | null>;
  frameRef: React.RefObject<ModuleFrame>;
  requestFrameRef: React.RefObject<(() => void) | null>;
  activeHotspot: number; // -1 ninguno
  paused: boolean;
  reducedMotion: boolean;
  compact: boolean;
  webgl: boolean;
  sceneFailed: boolean;
  day: boolean;
  selectHotspot: (i: number) => void;
  clearHotspot: () => void;
  togglePause: () => void;
  toggleDay: () => void;
  resetView: () => void;
  pulse: () => void;
  setSceneFailed: () => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

let webglSupport: boolean | null = null;
function checkWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2');
    webglSupport = !!gl;
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

export function useModuleDetailController(): ModuleDetailController {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<ModuleFrame>({
    progress: 0,
    pointerX: 0,
    pointerY: 0,
    hotspot: -1,
    day: 0,
    pulse: 0,
    reset: 0,
  });
  const requestFrameRef = useRef<(() => void) | null>(null);

  const [activeHotspot, setActiveHotspot] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compact, setCompact] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [day, setDay] = useState(false);

  /* ── Preferencias + sondeo WebGL (una vez, en cliente) ── */
  useEffect(() => {
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactMq = window.matchMedia('(max-width: 767px)');
    const sync = () => {
      setReducedMotion(reduceMq.matches || document.documentElement.classList.contains('a11y-reduce-motion'));
      setCompact(compactMq.matches);
    };
    // diferido un frame: setState síncrono en el efecto provoca renders en cascada
    const raf = requestAnimationFrame(() => {
      sync();
      setWebgl(checkWebGL());
    });
    reduceMq.addEventListener('change', sync);
    compactMq.addEventListener('change', sync);
    return () => {
      cancelAnimationFrame(raf);
      reduceMq.removeEventListener('change', sync);
      compactMq.removeEventListener('change', sync);
    };
  }, []);

  /* ── Progreso de scroll 0..1, coalescido por rAF ── */
  useEffect(() => {
    let raf = 0;
    let last = -1;
    const read = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? clamp01(window.scrollY / max) : 0;
      if (p !== last) {
        last = p;
        frameRef.current.progress = p;
        requestFrameRef.current?.();
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Selección de hotspot (misma vía DOM y malla 3D) ── */
  const selectHotspot = useCallback((i: number) => {
    frameRef.current.hotspot = i;
    setActiveHotspot(i);
    requestFrameRef.current?.();
  }, []);
  const clearHotspot = useCallback(() => {
    frameRef.current.hotspot = -1;
    setActiveHotspot(-1);
    requestFrameRef.current?.();
  }, []);

  const togglePause = useCallback(() => setPaused((p) => !p), []);
  const toggleDay = useCallback(() => {
    frameRef.current.day = frameRef.current.day > 0.5 ? 0 : 1;
    setDay(frameRef.current.day > 0.5);
    requestFrameRef.current?.();
  }, []);
  const resetView = useCallback(() => {
    frameRef.current.reset += 1;
    frameRef.current.pointerX = 0;
    frameRef.current.pointerY = 0;
    requestFrameRef.current?.();
  }, []);
  const pulse = useCallback(() => {
    frameRef.current.pulse += 1;
    requestFrameRef.current?.();
  }, []);
  const onUnavailable = useCallback(() => setSceneFailed(true), []);

  /* ── Parallax: puntero normalizado sobre la ventana ── */
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    frameRef.current.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    frameRef.current.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    requestFrameRef.current?.();
  }, []);

  return {
    rootRef,
    frameRef,
    requestFrameRef,
    activeHotspot,
    paused,
    reducedMotion,
    compact,
    webgl,
    sceneFailed,
    day,
    selectHotspot,
    clearHotspot,
    togglePause,
    toggleDay,
    resetView,
    pulse,
    setSceneFailed: onUnavailable,
    onPointerMove,
  };
}
