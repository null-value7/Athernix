'use client';

// ═══════════════════════════════════════════
// VISTA — /experience
// Recorrido editorial con escena 3D persistente. Solo JSX
// presentacional: el estado vive en controllers/experience y
// el contenido en models/experience.
// ═══════════════════════════════════════════

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Component, useCallback, useState, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowDown,
  ExternalLink,
  GraduationCap,
  Hammer,
  Hand,
  Headset,
  Landmark,
  Monitor,
  Orbit,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Scan,
  Smartphone,
  Tablet,
} from 'lucide-react';
import { useExperienceController } from '@/controllers/experience/useExperienceController';
import {
  CHAPTERS,
  DEVICES,
  EXPERIENCE_COPY,
  IMMERSIONS,
  OPPORTUNITIES,
  TOPICS,
} from '@/models/experience';
import type { ChapterId, DeviceId, OpportunityId } from '@/models/experience';
import { protectBrands } from '@/components/ui/ProtectedText';

const ExperienceScene = dynamic(() => import('./ExperienceScene'), {
  ssr: false,
});

/* ── Boundary: si WebGL falla, el contenido DOM sigue intacto ── */
class SceneBoundary extends Component<
  { children: ReactNode; onUnavailable: () => void },
  { err: boolean }
> {
  state = { err: false };
  static getDerivedStateFromError() {
    return { err: true };
  }
  componentDidCatch() {
    this.props.onUnavailable();
  }
  render() {
    return this.state.err ? null : this.props.children;
  }
}

const DEVICE_ICONS: Record<DeviceId, typeof Smartphone> = {
  phone: Smartphone,
  tablet: Tablet,
  desktop: Monitor,
  headset: Headset,
};

const OPPORTUNITY_ICONS: Record<OpportunityId, typeof GraduationCap> = {
  education: GraduationCap,
  heritage: Landmark,
  creation: Hammer,
};

const COPY = EXPERIENCE_COPY;

let webglSupport: boolean | null = null;
function checkWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const c = document.createElement('canvas');
    // Three 0.185 requiere WebGL2 — y liberamos el contexto de prueba.
    const gl = c.getContext('webgl2');
    webglSupport = !!gl;
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}
const subscribeNoop = () => () => {};

export default function ExperienceView() {
  const {
    rootRef,
    progressRef,
    frameRef,
    activeChapter,
    device: deviceId,
    topic: topicId,
    immersion: immersionId,
    opportunity: opportunityId,
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
  } = useExperienceController();
  const still = paused || reducedMotion;
  const webgl = useSyncExternalStore(subscribeNoop, checkWebGL, () => false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const onSceneUnavailable = useCallback(() => setSceneFailed(true), []);

  const chapterIndex = Math.max(
    0,
    CHAPTERS.findIndex((c) => c.id === activeChapter)
  );
  const chapter = CHAPTERS[chapterIndex];
  const device = DEVICES.find((d) => d.id === deviceId) ?? DEVICES[1];
  const topic = TOPICS.find((t) => t.id === topicId) ?? TOPICS[0];
  const immersion =
    IMMERSIONS.find((i) => i.id === immersionId) ?? IMMERSIONS[0];
  const opportunity =
    OPPORTUNITIES.find((o) => o.id === opportunityId) ?? OPPORTUNITIES[0];

  const sceneLabels: Record<ChapterId, string> = {
    inicio: 'Dispositivos a tu medida',
    dispositivos: `Explorando en ${device.label}`,
    athernixito: 'Athernixito te acompaña',
    inmersion: 'Gira. Separa. Descubre.',
    'el-salvador': 'El Salvador · ideas que conectan',
  };

  const showScene = !no3d && webgl && !sceneFailed;

  return (
    <div
      className="experience-v2"
      data-motion={still ? 'still' : 'full'}
      data-compact={compact}
    >
      <div className="ex-journey" ref={rootRef}>
        {/* ═══ ESCENA PERSISTENTE ═══ */}
        <div className="ex-scene-pin" data-scene={showScene ? 'on' : 'off'}>
          <div className="ex-scene-fallback" aria-hidden="true">
            <div className="ex-fb-halo" />
            <div className="ex-fb-ring ex-fb-ring-1" />
            <div className="ex-fb-ring ex-fb-ring-2" />
            <div className="ex-fb-ring ex-fb-ring-3" />
            <div className="ex-fb-devices">
              <div className="ex-fb-tablet" />
              <div className="ex-fb-phone" />
              <div className="ex-fb-orb" />
            </div>
            <div className="ex-fb-horizon" />
          </div>
          <div className="ex-scene-viewport" {...sceneHandlers}>
            {showScene && (
              <SceneBoundary onUnavailable={onSceneUnavailable}>
                <ExperienceScene
                  frameRef={frameRef}
                  requestFrameRef={requestFrameRef}
                  still={still}
                  compact={compact}
                  visible={visible}
                  device={deviceId}
                  topic={topicId}
                  immersion={immersionId}
                  opportunity={opportunityId}
                  exploded={exploded}
                  greeting={greeting}
                  chapterIndex={chapterIndex}
                  loadModel={chapterIndex >= 1}
                  onSelectDevice={selectDevice}
                  onSelectOpportunity={selectOpportunity}
                  onSelectVR={() => selectImmersion('vr')}
                  onToggleExploded={toggleExploded}
                  onGreet={greet}
                  onPulse={pulse}
                  onUnavailable={onSceneUnavailable}
                />
              </SceneBoundary>
            )}
          </div>
          <div className="ex-scene-caption" aria-hidden="true">
            <span className="ex-mono ex-cap-num">{chapter.number}</span>
            <span className="ex-cap-label">{sceneLabels[chapter.id]}</span>
          </div>
          {showScene && (
            <>
              <p className="ex-scene-hint" aria-hidden="true">
                Arrastra para girar · toca para explorar
              </p>
              <div className="ex-scene-tools" role="group" aria-label="Controles de la escena">
                <button
                  type="button"
                  className="ex-tool"
                  onClick={() => rotate(-1)}
                  aria-label="Girar a la izquierda"
                >
                  <RotateCcw size={15} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="ex-tool"
                  onClick={() => rotate(1)}
                  aria-label="Girar a la derecha"
                >
                  <RotateCw size={15} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="ex-tool"
                  onClick={resetView}
                  aria-label="Restablecer vista"
                >
                  <Scan size={15} aria-hidden="true" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* ═══ HISTORIA ═══ */}
        <div className="ex-story">
          {/* ── 00 · HERO ── */}
          <section className="ex-chapter ex-hero" data-ex-chapter="inicio" id="ex-inicio">
            <div className="ex-copy">
              <p className="ex-eyebrow ex-mono">{protectBrands(COPY.hero.eyebrow)}</p>
              <h1 className="ex-h1">
                <span className="ex-h1-line">{COPY.hero.title[0]}</span>
                <span className="ex-h1-line ex-gradient">{COPY.hero.title[1]}</span>
              </h1>
              <p className="ex-lead">{COPY.hero.description}</p>
              <div className="ex-cta-row">
                <button
                  type="button"
                  className="ex-btn ex-btn-pri"
                  onClick={() => goTo('dispositivos')}
                >
                  {COPY.hero.cta}
                </button>
                <Link href="/modulos" className="ex-btn ex-btn-sec">
                  {COPY.hero.secondary}
                </Link>
              </div>
              <div className="ex-device-row" aria-label={COPY.hero.footnote}>
                {DEVICES.map((d) => {
                  const Icon = DEVICE_ICONS[d.id];
                  return (
                    <span key={d.id} className="ex-device-tag">
                      <Icon size={15} aria-hidden="true" />
                      {d.label}
                    </span>
                  );
                })}
              </div>
              <p className="ex-scrollcue ex-mono">
                Desliza
                <ArrowDown size={13} aria-hidden="true" />
              </p>
            </div>
          </section>

          {/* ── 01 · DISPOSITIVOS ── */}
          <section className="ex-chapter" data-ex-chapter="dispositivos" id="ex-dispositivos">
            <div className="ex-copy">
              <p className="ex-eyebrow ex-mono">{COPY.devices.eyebrow}</p>
              <h2 className="ex-h2">
                <span>{COPY.devices.title[0]}</span>
                <span className="ex-gradient">{COPY.devices.title[1]}</span>
              </h2>
              <p className="ex-lead">{COPY.devices.description}</p>
              <div className="ex-select-row" role="group" aria-label="Elige un dispositivo">
                {DEVICES.map((d) => {
                  const Icon = DEVICE_ICONS[d.id];
                  return (
                    <button
                      key={d.id}
                      type="button"
                      className="ex-select-btn"
                      aria-pressed={deviceId === d.id}
                      onClick={() => selectDevice(d.id)}
                    >
                      <Icon size={17} aria-hidden="true" />
                      <span>{d.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="ex-readout" aria-live="polite">
                <p className="ex-readout-eyebrow ex-mono">{device.eyebrow}</p>
                <h3 className="ex-readout-title">{device.title}</h3>
                <p className="ex-readout-desc">{protectBrands(device.description)}</p>
                <p className="ex-chip">{device.detail}</p>
                <p className="ex-note">{COPY.devices.note}</p>
              </div>
            </div>
          </section>

          {/* ── 02 · ATHERNIXITO ── */}
          <section className="ex-chapter" data-ex-chapter="athernixito" id="ex-athernixito">
            <div className="ex-copy">
              <p className="ex-eyebrow ex-mono">{COPY.assistant.eyebrow}</p>
              <h2 className="ex-h2">
                <span>{COPY.assistant.title[0]}</span>
                <span className="ex-gradient">{COPY.assistant.title[1]}</span>
              </h2>
              <p className="ex-lead">{protectBrands(COPY.assistant.description)}</p>
              <div className="ex-seg" role="group" aria-label="¿Qué te gustaría hacer?">
                {TOPICS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className="ex-seg-btn"
                    aria-pressed={topicId === t.id}
                    onClick={() => {
                      selectTopic(t.id);
                      pulse();
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="ex-chat" aria-live="polite">
                <p className="ex-chat-label ex-mono">{COPY.assistant.demoLabel}</p>
                <div className="ex-bubble ex-bubble-q">{topic.question}</div>
                <div className="ex-bubble ex-bubble-a">{protectBrands(topic.answer)}</div>
              </div>
              <div className="ex-cta-row">
                <button type="button" className="ex-btn ex-btn-pri" onClick={greet}>
                  <Hand size={15} aria-hidden="true" />
                  {protectBrands('Saludar a Athernixito')}
                </button>
                <Link href="/chatbot" className="ex-btn ex-btn-sec">
                  {protectBrands(COPY.assistant.link)}
                </Link>
              </div>
              {greeting > 0 && (
                <p key={greeting} className="ex-greeting" role="status">
                  <Orbit size={13} aria-hidden="true" />
                  {COPY.assistant.greeting}
                </p>
              )}
            </div>
          </section>

          {/* ── 03 · INMERSIÓN ── */}
          <section className="ex-chapter" data-ex-chapter="inmersion" id="ex-inmersion">
            <div className="ex-copy">
              <p className="ex-eyebrow ex-mono">{COPY.immersion.eyebrow}</p>
              <h2 className="ex-h2">
                <span>{COPY.immersion.title[0]}</span>
                <span className="ex-gradient">{COPY.immersion.title[1]}</span>
              </h2>
              <p className="ex-lead">{COPY.immersion.description}</p>
              <div className="ex-seg" role="group" aria-label="Modo de exploración">
                {IMMERSIONS.map((i) => (
                  <button
                    key={i.id}
                    type="button"
                    className="ex-seg-btn"
                    aria-pressed={immersionId === i.id}
                    onClick={() => selectImmersion(i.id)}
                  >
                    {i.label}
                  </button>
                ))}
              </div>
              <div className="ex-readout" aria-live="polite">
                <h3 className="ex-readout-title">{immersion.title}</h3>
                <p className="ex-readout-desc">{protectBrands(immersion.description)}</p>
                <p className="ex-chip">{immersion.detail}</p>
              </div>
              <div className="ex-cta-row">
                {immersionId === '3d' && (
                  <button
                    type="button"
                    className="ex-btn ex-btn-ghost"
                    aria-pressed={exploded}
                    onClick={toggleExploded}
                  >
                    {exploded ? 'Reunir las piezas' : 'Separar las piezas'}
                  </button>
                )}
                <Link href="/modulos" className="ex-btn ex-btn-sec">
                  Ver las experiencias
                </Link>
              </div>
              <p className="ex-note">Vista previa interactiva</p>
            </div>
          </section>

          {/* ── 04 · EL SALVADOR ── */}
          <section className="ex-chapter" data-ex-chapter="el-salvador" id="ex-el-salvador">
            <div className="ex-copy">
              <p className="ex-eyebrow ex-mono">{COPY.country.eyebrow}</p>
              <h2 className="ex-h2">
                <span>{COPY.country.title[0]}</span>
                <span className="ex-gradient">{COPY.country.title[1]}</span>
              </h2>
              <p className="ex-lead">{COPY.country.description}</p>
              <div className="ex-select-row" role="group" aria-label="Elige un enfoque">
                {OPPORTUNITIES.map((o) => {
                  const Icon = OPPORTUNITY_ICONS[o.id];
                  return (
                    <button
                      key={o.id}
                      type="button"
                      className="ex-select-btn"
                      aria-pressed={opportunityId === o.id}
                      onClick={() => selectOpportunity(o.id)}
                    >
                      <Icon size={16} aria-hidden="true" />
                      <span>{o.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="ex-readout" aria-live="polite">
                <h3 className="ex-readout-title">{opportunity.title}</h3>
                <p className="ex-readout-desc">{protectBrands(opportunity.description)}</p>
              </div>
              <p className="ex-mission">{protectBrands(COPY.country.mission)}</p>
              <a
                className="ex-source ex-mono"
                href={COPY.country.sourceHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {COPY.country.sourceLabel}
                <ExternalLink size={11} aria-hidden="true" />
              </a>
              <p className="ex-note">Inspirado en el paisaje salvadoreño.</p>
            </div>
          </section>
        </div>

        {/* ═══ DOCK DE CAPÍTULOS ═══ */}
        <nav
          className="ex-dock"
          data-open={visible}
          inert={!visible}
          aria-hidden={!visible}
          aria-label="Capítulos del recorrido"
        >
          <div className="ex-dock-rail" aria-hidden="true">
            <div className="ex-dock-fill" ref={progressRef} />
          </div>
          {CHAPTERS.map((c) => (
            <button
              key={c.id}
              type="button"
              className="ex-dock-btn"
              aria-label={`Ir a ${c.short}`}
              aria-current={activeChapter === c.id ? 'step' : undefined}
              onClick={() => goTo(c.id)}
            >
              <span className="ex-dock-num ex-mono">{c.number}</span>
              <span className="ex-dock-label">{c.short}</span>
            </button>
          ))}
          <button
            type="button"
            className="ex-dock-btn ex-dock-pause"
            aria-pressed={paused}
            aria-label={paused ? 'Reanudar animaciones' : 'Pausar animaciones'}
            title={paused ? 'Reanudar animaciones' : 'Pausar animaciones'}
            onClick={togglePause}
          >
            {paused ? (
              <Play size={14} aria-hidden="true" />
            ) : (
              <Pause size={14} aria-hidden="true" />
            )}
          </button>
        </nav>
      </div>

      {/* ═══ CIERRE ═══ */}
      <section className="ex-closing" data-ex-end>
        <p className="ex-eyebrow ex-mono">{COPY.closing.eyebrow}</p>
        <h2 className="ex-closing-title">{COPY.closing.title}</h2>
        <p className="ex-lead">{COPY.closing.description}</p>
        <div className="ex-closing-links">
          <Link href="/modulos" className="ex-closing-link">
            <span className="ex-closing-num ex-mono">01</span>
            Explorar módulos
          </Link>
          <Link href="/chatbot" className="ex-closing-link">
            <span className="ex-closing-num ex-mono">02</span>
            {protectBrands('Conversar con Ather')}
          </Link>
          <Link href="/register" className="ex-closing-link">
            <span className="ex-closing-num ex-mono">03</span>
            Crear cuenta
          </Link>
        </div>
      </section>
    </div>
  );
}
