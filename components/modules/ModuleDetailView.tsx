'use client';

// ═══════════════════════════════════════════════════════════
// VISTA — detalle de módulo (/modulos/history|tours|brain)
// Canvas R3F fijo detrás + overlay DOM que hace scroll encima.
// El estado vive en controllers/modules/useModuleDetailController;
// el movimiento de escena en controllers/modules/useModuleScene.
// Sin WebGL o si la escena falla → ModuleFallback (solo DOM).
// ═══════════════════════════════════════════════════════════

import { Component, useEffect, useMemo, useRef, useState } from 'react';
import type * as React from 'react';
import Link from 'next/link';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei/core/OrbitControls';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import {
  MODULES,
  MODULE_ROUTES,
  MODULE_SECTIONS,
  type ModuleKey,
} from '@/models/modules';
import { useModuleDetailController } from '@/controllers/modules/useModuleDetailController';
import {
  useModuleClock,
  type ModuleMotion,
} from '@/controllers/modules/useModuleScene';
import { protectBrands } from '@/components/ui/ProtectedText';
import HistoryScene, { type ModuleSceneProps } from './scenes/HistoryScene';
import ToursScene from './scenes/ToursScene';
import MindScene from './scenes/MindScene';
import ModuleFallback from './ModuleFallback';
import '@/app/styles/module-detail.css';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

/* Escena por módulo — MindScene también acepta `still`. */
const SCENES: Record<
  ModuleKey,
  React.ComponentType<ModuleSceneProps & { still: boolean }>
> = {
  history: HistoryScene,
  tours: ToursScene,
  mind: MindScene,
};

/* Cámara: posición hero + altura del objetivo (coinciden con cada escena). */
const CAM: Record<
  ModuleKey,
  { pos: [number, number, number]; targetY: number; min: number; max: number }
> = {
  history: { pos: [11, 7.5, 14], targetY: 1, min: 4, max: 42 },
  tours: { pos: [0, 16, 34], targetY: 0.5, min: 12, max: 80 },
  mind: { pos: [8, 5.5, 12], targetY: 0.6, min: 4, max: 36 },
};

const SWITCHER: ReadonlyArray<{ key: ModuleKey; label: string }> = [
  { key: 'history', label: 'HISTORIA' },
  { key: 'tours', label: 'TOURS' },
  { key: 'mind', label: 'MENTELIBRE' },
];

/* Si la escena rompe (shader, contexto, OOM) → fallback DOM. */
class SceneBoundary extends Component<
  { onError: () => void; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err: unknown) {
    console.error('[ModuleDetail] la escena 3D falló:', err);
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/* Vive dentro del Canvas: reloj local + puente invalidate(). */
function FrameBridge({
  motion,
  requestFrameRef,
}: {
  motion: ModuleMotion;
  requestFrameRef: React.RefObject<(() => void) | null>;
}) {
  const invalidate = useThree((s) => s.invalidate);
  useModuleClock(motion);
  useEffect(() => {
    requestFrameRef.current = invalidate;
    return () => {
      requestFrameRef.current = null;
    };
  }, [invalidate, requestFrameRef]);
  return null;
}

/* Ciclo de respiración 8s → avisa al DOM (2 updates por ciclo). */
function BreathSync({
  motion,
  onInhale,
}: {
  motion: ModuleMotion;
  onInhale: (inhale: boolean) => void;
}) {
  const last = useRef(true);
  useFrame(() => {
    const inhale = (motion.timeRef.current % 8) / 8 < 0.5;
    if (inhale !== last.current) {
      last.current = inhale;
      onInhale(inhale);
    }
  });
  return null;
}

/* Título partido en caracteres con cascada (CSS var --d). */
function SplitChars({
  text,
  base = 0,
  step = 0.05,
}: {
  text: string;
  base?: number;
  step?: number;
}) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="md-char"
          style={{ '--d': `${base + i * step}s` }}
          aria-hidden="true"
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </>
  );
}

/* Count-up sobre el primer entero del texto; preserva sufijo. */
function CountUp({
  text,
  run,
  duration = 1500,
}: {
  text: string;
  run: boolean;
  duration?: number;
}) {
  const target = parseInt(text, 10);
  const numeric = Number.isFinite(target);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run || !numeric) return;
    let raf = 0;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      raf = requestAnimationFrame(() => setVal(target));
      return () => cancelAnimationFrame(raf);
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, numeric, duration]);
  if (!numeric) return <>{text}</>;
  return <>{text.replace(/^\d+/, String(val))}</>;
}

export default function ModuleDetailView({ moduleKey }: { moduleKey: ModuleKey }) {
  const {
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
    togglePause,
    toggleDay,
    resetView,
    setSceneFailed,
    onPointerMove,
  } = useModuleDetailController();
  const { config, hotspots } = MODULES[moduleKey];
  const still = reducedMotion || paused;
  const cam = CAM[moduleKey];

  /* Refs mutables que las escenas leen sin provocar re-render. */
  const stillRef = useRef(still);
  const timeRef = useRef(0);
  useEffect(() => {
    stillRef.current = still;
  }, [still]);

  const motion = useMemo<ModuleMotion>(
    () => ({ frameRef, stillRef, timeRef }),
    [frameRef]
  );

  const [inhale, setInhale] = useState(true);
  const [metricsIn, setMetricsIn] = useState(false);
  const metricsRef = useRef<HTMLDivElement | null>(null);

  /* Reveal on scroll: IntersectionObserver marca .in-view una vez. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('in-view');
          if (e.target === metricsRef.current) setMetricsIn(true);
          io.unobserve(e.target);
        }),
      { threshold: 0.16 }
    );
    root.querySelectorAll('.md-reveal').forEach((el) => io.observe(el));
    if (metricsRef.current) io.observe(metricsRef.current);
    return () => io.disconnect();
  }, [rootRef]);

  const Scene = SCENES[moduleKey];

  /* Sin WebGL o escena rota → versión solo DOM. */
  if (!webgl || sceneFailed) {
    return (
      <ModuleFallback
        moduleKey={moduleKey}
        activeHotspot={activeHotspot}
        onSelectHotspot={selectHotspot}
      />
    );
  }

  const selectCard = (i: number) => (e: React.MouseEvent<HTMLElement>) => {
    selectHotspot(i);
    e.currentTarget.scrollIntoView({
      block: 'nearest',
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div
      ref={rootRef}
      className="md-root"
      style={{
        '--md-accent': config.accent,
        '--md-accent-soft': config.accentSoft,
        '--md-gradient': config.gradient,
      }}
      onPointerMove={onPointerMove}
    >
      {/* escena 3D fija detrás */}
      <div className="md-canvas">
        <Canvas
          dpr={[1, 1.75]}
          frameloop={still ? 'demand' : 'always'}
          camera={{ position: cam.pos, fov: 50, near: 0.1, far: 320 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
        >
          <color attach="background" args={['#08000a']} />
          <FrameBridge motion={motion} requestFrameRef={requestFrameRef} />
          {moduleKey === 'mind' && (
            <BreathSync motion={motion} onInhale={setInhale} />
          )}
          <SceneBoundary onError={setSceneFailed}>
            <Scene
              motion={motion}
              hotspots={hotspots}
              active={activeHotspot}
              onSelect={selectHotspot}
              still={still}
            />
          </SceneBoundary>
          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.06}
            autoRotate={!still}
            autoRotateSpeed={0.45}
            target={[0, cam.targetY, 0]}
            minDistance={cam.min}
            maxDistance={cam.max}
          />
          {!compact && (
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={0.7}
                luminanceThreshold={0.18}
                luminanceSmoothing={0.7}
                mipmapBlur
              />
            </EffectComposer>
          )}
        </Canvas>
      </div>
      <div className="md-vignette" aria-hidden="true" />

      {/* navegación flotante fija — regresar / siguiente módulo */}
      <nav className="md-nav" aria-label="Navegación de módulos">
        <Link href="/modulos" className="md-nav-btn mono">
          ← REGRESAR A MÓDULOS
        </Link>
        <Link
          href={config.next}
          className="md-nav-btn md-nav-btn--next mono"
        >
          SIGUIENTE MÓDULO →
        </Link>
      </nav>

      {/* overlay DOM que hace scroll sobre el canvas */}
      <div className="md-content">
        <section className="md-hero">
          <p className="md-number mono">{config.number}</p>
          <p className="md-eyebrow mono">
            [ {protectBrands(config.tag)} / {protectBrands(config.eyebrow)} ]
          </p>
          <h1 className="md-title">
            <span className="sr-only">
              {config.title[0]} {config.title[1]}
            </span>
            <span className="md-title-line" aria-hidden="true">
              <SplitChars text={config.title[0]} base={0.05} />
            </span>
            <span className="md-title-line md-grad" aria-hidden="true">
              <SplitChars text={config.title[1]} base={0.5} />
            </span>
          </h1>
          <p className="md-desc">{protectBrands(config.description)}</p>
          <p className="md-status mono">
            <span className="md-status-dot" />
            {protectBrands(config.status)}
          </p>
          <div className="md-chips">
            {config.features.map((f) => (
              <span key={f} className="md-chip mono">
                {protectBrands(f)}
              </span>
            ))}
          </div>
          <p className="md-hint mono">{protectBrands(config.hint)}</p>
        </section>

        <section className="md-section md-reveal">
          <p className="md-sec-eyebrow mono">
            {MODULE_SECTIONS.hotspotsEyebrow}
          </p>
          <h2 className="md-sec-title">{MODULE_SECTIONS.hotspotsTitle}</h2>
          <p className="md-sec-lead">{MODULE_SECTIONS.hotspotsLead}</p>
          <div className="md-hs-grid">
            {hotspots.map((h, i) => (
              <button
                key={h.id}
                type="button"
                className={`md-hs-card ${activeHotspot === i ? 'active' : ''}`}
                onClick={selectCard(i)}
                aria-pressed={activeHotspot === i}
              >
                <span className="md-hs-idx mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="md-hs-name">{protectBrands(h.label)}</span>
                <span className="md-hs-desc">{protectBrands(h.description)}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="md-section md-reveal">
          <p className="md-sec-eyebrow mono">
            {MODULE_SECTIONS.metricsEyebrow}
          </p>
          <h2 className="md-sec-title">{MODULE_SECTIONS.metricsTitle}</h2>
          <div className="md-metrics" ref={metricsRef}>
            {config.metrics.map(([v, l]) => (
              <div key={l} className="md-metric">
                <strong>
                  <CountUp text={v} run={metricsIn} />
                </strong>
                <small className="mono">{protectBrands(l)}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="md-section md-reveal md-cta-sec">
          <div className="md-cta">
            <Link href="/modulos" className="md-btn md-btn--ghost mono">
              ← VOLVER A MÓDULOS
            </Link>
            <Link href={config.next} className="md-btn md-btn--primary mono">
              SIGUIENTE EJE →
            </Link>
          </div>
          <nav className="md-switcher" aria-label="Cambiar de módulo">
            {SWITCHER.map((s) => (
              <Link
                key={s.key}
                href={MODULE_ROUTES[s.key]}
                className={`mono ${s.key === moduleKey ? 'active' : ''}`}
                aria-current={s.key === moduleKey ? 'page' : undefined}
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </section>
      </div>

      {/* dock fijo abajo a la derecha */}
      <div className="md-dock">
        <button
          type="button"
          className="md-dock-btn"
          onClick={resetView}
          aria-label="Reiniciar vista"
          title="Reiniciar vista"
        >
          ↺
        </button>
        <button
          type="button"
          className="md-dock-btn"
          onClick={togglePause}
          aria-label={paused ? 'Reanudar animación' : 'Pausar animación'}
          aria-pressed={paused}
          title={paused ? 'Reanudar' : 'Pausar'}
        >
          {paused ? '▶' : '⏸'}
        </button>
        {moduleKey === 'tours' && (
          <button
            type="button"
            className="md-dock-btn md-dock-btn--wide mono"
            onClick={toggleDay}
            aria-pressed={day}
            aria-label="Cambiar entre día y noche"
          >
            {day ? 'NOCHE' : 'DÍA'}
          </button>
        )}
      </div>

      {/* guía de respiración (solo MenteLibre) */}
      {moduleKey === 'mind' && (
        <div className="md-breath mono" aria-live="polite">
          {still ? 'RESPIRA' : inhale ? 'INHALA' : 'EXHALA'}
        </div>
      )}
    </div>
  );
}
