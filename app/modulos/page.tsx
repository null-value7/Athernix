'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ModulosBackdrop } from '@/components/modulos/ModulosBackdrop';
import { ModuleSculpture, type SculptureKind } from '@/components/modulos/ModuleSculpture';
import '../styles/modulos.css';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

/* ───────────────────────── DATA ───────────────────────── */

type ModuleDef = {
  id: string;
  num: string;
  rail: string;
  tag: string;
  title: [string, string];
  desc: string;
  status: string;
  href: string;
  kind: SculptureKind;
  accent: string;
  colors: [string, string, string];
  glow: string;
  gx: string;
  chips: string[];
  metrics: [string, string][];
  details: string[];
  hud: string;
};

const MODULES: ModuleDef[] = [
  {
    id: 'historia',
    num: '01',
    rail: 'HISTORIA_VIVA',
    tag: 'EJE_CULTURAL // PATRIMONIO_DIGITAL',
    title: ['HISTORIA', 'VIVA VR'],
    desc: 'Módulo educativo inmersivo que revitaliza la enseñanza de la historia y el patrimonio cultural salvadoreño. A través de modelos digitales realistas y mecánicas de gamificación, convierte el aprendizaje pasivo en vivencia activa.',
    status: 'EN_DESARROLLO',
    href: '/modulos/history',
    kind: 'pyramid',
    accent: '#FF006E',
    colors: ['#FF006E', '#FF6B00', '#FFD700'],
    glow: 'rgba(255,0,110,.07)',
    gx: '62%',
    chips: ['RECONSTRUCCIÓN 3D', 'GAMIFICACIÓN', 'EDUCACIÓN XR', 'FOTOGRAMETRÍA'],
    metrics: [['50K+', 'PTS / SEGUNDO'], ['4K', 'GEMELO DIGITAL'], ['UNESCO', 'JOYA DE CERÉN']],
    details: [
      'Reconstrucciones históricas fotogramétricas de alta fidelidad',
      'Gamificación pedagógica para retención profunda del conocimiento',
      'Herramienta de ampliación docente, no sustitución',
      'Aplicable dentro y fuera del aula · acceso universal',
    ],
    hud: 'DRAG_TO_ROTATE // CLICK_BURST',
  },
  {
    id: 'svirtual',
    num: '02',
    rail: 'SVIRTUAL_TOURS',
    tag: 'EJE_TURISMO // TURISMO_DIGITAL',
    title: ['SVIRTUAL', 'TOURS'],
    desc: 'Dinamiza la economía cultural de El Salvador mediante turismo digital. Recorridos virtuales guiados por inteligencia artificial que posicionan el patrimonio natural y cultural del país como destino accesible desde cualquier parte del mundo.',
    status: 'BETA_ACTIVA',
    href: '/modulos/tours',
    kind: 'globe',
    accent: '#FF6B00',
    colors: ['#FF6B00', '#FFD700', '#FF006E'],
    glow: 'rgba(255,107,0,.07)',
    gx: '38%',
    chips: ['GUÍA IA EN VIVO', '127+ DESTINOS', '18 IDIOMAS', 'TOURS 360'],
    metrics: [['127+', 'DESTINOS'], ['24/7', 'ASISTENCIA IA'], ['360', 'RUTAS INMERSIVAS']],
    details: [
      'Guías IA en tiempo real · multilingüe · adaptativo',
      'Elimina barreras físicas y logísticas del turismo convencional',
      'Genera visibilidad y potencial económico internacional',
      'Canal de descubrimiento y promoción cultural global',
    ],
    hud: 'ORBIT_FIELD // DRAG_TO_ROTATE',
  },
  {
    id: 'mente',
    num: '03',
    rail: 'MENTELIBRE',
    tag: 'EJE_SALUD_MENTAL // BIOFEEDBACK',
    title: ['MENTELIBRE', 'VR'],
    desc: 'Entornos virtuales controlados y adaptativos para el apoyo terapéutico de ansiedad, fobias y estrés. Respaldado por terapia de exposición gradual en simulación. Democratiza el bienestar psicológico en contextos de acceso limitado.',
    status: 'LIVE',
    href: '/modulos/brain',
    kind: 'brain',
    accent: '#FFD700',
    colors: ['#FFD700', '#FF006E', '#FF6B00'],
    glow: 'rgba(255,215,0,.055)',
    gx: '60%',
    chips: ['EXPOSICIÓN GRADUAL', 'BIOFEEDBACK LIVE', 'IA ADAPTATIVA', 'ENTORNOS SEGUROS'],
    metrics: [['95%', 'REDUCCIÓN SIMULADA'], ['5ms', 'RESPUESTA'], ['3', 'ENTORNOS']],
    details: [
      'Terapia de exposición gradual en entornos simulados seguros',
      'Biofeedback en tiempo real · sensores hápticos adaptativos',
      'Enfoque clínico validado · 95% reducción de síntomas',
      'Democratización del bienestar ante acceso limitado a especialistas',
    ],
    hud: 'NEURAL_FIELD // CLICK_BURST',
  },
];

const MQ1 = ['HISTORIA VIVA VR', 'SVIRTUAL TOURS', 'MENTELIBRE VR', 'EJE CULTURAL', 'EJE TURISMO', 'EJE SALUD MENTAL', 'ATHERNIX XR', 'EL SALVADOR TECH'];
const MQ2 = ['UNITY ENGINE', 'META QUEST', 'UNREAL ENGINE 5', 'PYTHON AI', 'WEBXR', 'HAPTIC FEEDBACK', 'NEURAL NETWORKS', 'REALTIME 3D'];

/* ───────────────────────── HELPERS ───────────────────────── */

function SplitChars({ text, base = 0, step = 0.045 }: { text: string; base?: number; step?: number }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span key={i} className="mx-char" style={{ '--d': `${base + i * step}s` }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </>
  );
}

/* Título 3D interactivo: cada letra se inclina hacia el cursor, flota y hace pop al click */
function Title3D({ text, base = 0, step = 0.05 }: { text: string; base?: number; step?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>('.mx-c3'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0, px = -1e4, py = -1e4, hot = false;
    const onMove = (e: PointerEvent) => { px = e.clientX; py = e.clientY; hot = true; };
    const onLeave = () => { hot = false; };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const t = performance.now() / 1000;
      chars.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2);
        const dy = py - (r.top + r.height / 2);
        const inf = hot ? Math.max(0, 1 - Math.hypot(dx, dy) / 360) : 0;
        const e = inf * inf;
        const ry = (dx / (r.width || 1)) * -22 * e + Math.sin(t * 1.3 + i * 0.6) * 4;
        const rx = (dy / (r.height || 1)) * 16 * e + Math.cos(t * 1.05 + i * 0.5) * 3;
        const ty = Math.sin(t * 1.5 + i * 0.7) * 6 - 14 * e;
        c.style.transform = `translate3d(0,${ty}px,${70 * e}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        c.style.setProperty('--e', e.toFixed(3));
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const pop = (e: React.MouseEvent<HTMLSpanElement>) => {
    const c = e.currentTarget;
    c.classList.remove('pop');
    void c.offsetWidth;
    c.classList.add('pop');
  };

  return (
    <span ref={ref} className="mx-title3d">
      {text.split('').map((ch, i) => (
        <span key={i} className="mx-char" style={{ '--d': `${base + i * step}s` }}>
          <span className="mx-c3" data-ch={ch} onClick={pop}>{ch}</span>
        </span>
      ))}
    </span>
  );
}

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
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
  }, [run, target, duration]);
  return val;
}

/* Tilt card: rotateX/Y + spotlight vars siguen al cursor */
function TiltStage({ mod, children }: { mod: ModuleDef; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.mx-card');
    if (!card) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty('--ry', `${(x - 0.5) * 14}deg`);
    card.style.setProperty('--rx', `${(0.5 - y) * 12}deg`);
    card.style.setProperty('--sx', `${x * 100}%`);
    card.style.setProperty('--sy', `${y * 100}%`);
  }, []);

  const onLeave = useCallback(() => {
    const card = ref.current?.querySelector<HTMLElement>('.mx-card');
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  }, []);

  return (
    <div ref={ref} className="mx-stage" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="mx-card" style={{ '--accent': mod.accent }}>
        {children}
      </div>
      <i className="mx-hud tl" style={{ '--accent': mod.accent } as React.CSSProperties} />
      <i className="mx-hud tr" />
      <i className="mx-hud bl" />
      <i className="mx-hud br" />
      <span className="mx-hud-tag" style={{ '--accent': mod.accent } as React.CSSProperties}>
        [ {mod.hud} ]
      </span>
    </div>
  );
}

/* Botón magnético */
function MagneticLink({ mod, label = 'VER MÁS' }: { mod: ModuleDef; label?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transition = 'transform .12s ease-out, box-shadow .35s, border-color .35s';
    el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.28}px)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1), box-shadow .35s, border-color .35s';
    el.style.transform = 'translate(0,0)';
  }, []);

  return (
    <Link
      ref={ref}
      href={mod.href}
      className="mx-launch"
      style={{ '--accent': mod.accent }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span>{label}</span>
      <span className="mx-arr">→</span>
    </Link>
  );
}

/* ───────────────────────── PAGE ───────────────────────── */

export default function ModulosPage() {
  const [active, setActive] = useState(0);
  const [heroIn, setHeroIn] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const stat1 = useCountUp(3, heroIn);
  const stat2 = useCountUp(127, heroIn, 1800);
  const stat3 = useCountUp(360, heroIn, 2000);

  /* Reveal observer + rail observer + progress + cursor */
  useEffect(() => {
    const heroRaf = requestAnimationFrame(() => setHeroIn(true));

    const revealIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          revealIO.unobserve(e.target);
        }
      }),
      { threshold: 0.18 }
    );
    document.querySelectorAll('.mx-section, .mx-divider, .mx-cta').forEach((el) => revealIO.observe(el));

    const sections = MODULES.map((m) => document.getElementById(m.id)).filter(Boolean) as HTMLElement[];
    const railIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = sections.indexOf(e.target as HTMLElement);
          if (idx >= 0) setActive(idx);
        }
      }),
      { threshold: 0.45 }
    );
    sections.forEach((s) => railIO.observe(s));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current && max > 0) {
        progressRef.current.style.width = `${(window.scrollY / max) * 100}%`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* cursor glow con lerp */
    let raf = 0;
    let cx = innerWidth / 2, cy = innerHeight / 2;
    let tx = cx, ty = cy;
    const onMove = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${cx - 280}px, ${cy - 280}px)`;
      if (dotRef.current) dotRef.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%,-50%)`;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    loop();

    return () => {
      cancelAnimationFrame(heroRaf);
      revealIO.disconnect();
      railIO.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <ModulosBackdrop />
      <div className="mx-vignette" />
      <div className="mx-grain" />
      <div ref={cursorRef} className="mx-cursor" />
      <div ref={dotRef} className="mx-cursor-dot" />
      <div ref={progressRef} className="mx-progress" />

      {/* RAIL */}
      <nav className="mx-rail" aria-label="Índice de módulos">
        {MODULES.map((m, i) => (
          <button
            key={m.id}
            className={`mx-rail-item ${active === i ? 'active' : ''}`}
            style={{ '--rail-accent': m.accent }}
            onClick={() => scrollTo(m.id)}
          >
            <span className="mx-rail-dot" />
            <span className="mx-rail-num">{m.num}</span>
            <span className="mx-rail-label">{m.rail}</span>
          </button>
        ))}
      </nav>

      <div className="mx-page">
        {/* ══════ HERO ══════ */}
        <section className={`mx-hero ${heroIn ? 'in-view' : ''}`}>
          <div className="mx-hero-ring" />

          <span className="mx-chip" style={{ top: '24%', left: '12%', '--tilt': '-6deg', animationDelay: '1.2s' }}>
            <i style={{ background: '#FF006E' }} />REALIDAD_VIRTUAL
          </span>
          <span className="mx-chip" style={{ top: '30%', right: '11%', '--tilt': '5deg', animationDelay: '1.5s' }}>
            <i style={{ background: '#FFD700' }} />WEBXR_READY
          </span>
          <span className="mx-chip" style={{ bottom: '26%', left: '16%', '--tilt': '4deg', animationDelay: '1.8s' }}>
            <i style={{ background: '#FF6B00' }} />UNITY_ENGINE
          </span>
          <span className="mx-chip" style={{ bottom: '30%', right: '15%', '--tilt': '-4deg', animationDelay: '2.1s' }}>
            <i style={{ background: '#FF006E' }} />IA_ADAPTATIVA
          </span>

          <p className="mx-hero-eyebrow">[ PLATAFORMA_XR // EL_SALVADOR // 2026 ]</p>

          <h1 className="mx-hero-title">
            <span className="mx-hero-line mx-hero-line--solid">
              <Title3D text="MÓDULOS" base={0.1} step={0.05} />
            </span>
            <span className="mx-hero-line mx-hero-line--fill">
              <span className="notranslate" translate="no">
                <SplitChars text="ATHERNIX" base={0.55} step={0.05} />
              </span>
            </span>
          </h1>

          <p className="mx-hero-sub rv" style={{ '--d': '1s' }}>
            TRES EJES · UNA PLATAFORMA · <b>IMPACTO REAL</b>
          </p>

          <div className="mx-hero-stats rv" style={{ '--d': '1.15s' }}>
            <div className="mx-stat">
              <span className="mx-stat-num">{String(stat1).padStart(2, '0')}</span>
              <span className="mx-stat-lbl">EJES_ACTIVOS</span>
            </div>
            <div className="mx-stat">
              <span className="mx-stat-num">{stat2}+</span>
              <span className="mx-stat-lbl">DESTINOS_XR</span>
            </div>
            <div className="mx-stat">
              <span className="mx-stat-num">{stat3}°</span>
              <span className="mx-stat-lbl">INMERSIÓN_TOTAL</span>
            </div>
          </div>

          <div className="mx-scroll">
            <div className="mx-scroll-line" />
            <span>EXPLORAR</span>
          </div>
        </section>

        {/* ══════ MARQUEE 1 ══════ */}
        <div className="mx-mq">
          <div className="mx-mq-track">
            {[...MQ1, ...MQ1].map((item, i) => (
              <span key={i} className="mx-mq-item">
                {item.includes('ATHERNIX') ? (
                  <span className="notranslate" translate="no">{item}</span>
                ) : item}
                <span>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══════ MODULES ══════ */}
        {MODULES.map((mod, i) => (
          <div key={mod.id}>
            <section
              id={mod.id}
              className="mx-section"
              style={{ '--glow': mod.glow, '--gx': mod.gx, '--accent': mod.accent }}
            >
              <div className="mx-scan" style={{ '--accent': mod.accent }} />

              <div className={`mx-module ${i % 2 === 1 ? 'flip' : ''}`}>
                <div className={`rv ${i % 2 === 1 ? 'rv-right' : 'rv-left'} rv-scale`} style={{ '--d': '0.1s' }}>
                  <TiltStage mod={mod}>
                    <ModuleSculpture kind={mod.kind} colors={mod.colors} className="mx-sculpt" />
                  </TiltStage>
                </div>

                <div className="mx-text">
                  <span className="mx-num rv" style={{ '--d': '0.05s' }}>{mod.num}</span>
                  <p className="mx-tag rv" style={{ '--d': '0.15s' }}>{mod.tag}</p>
                  <h2 className="mx-title rv" style={{ '--d': '0.22s' }}>
                    {mod.title[0]}
                    <br />
                    <span className="mx-grad" style={{ '--accent': mod.accent }}>{mod.title[1]}</span>
                  </h2>
                  <p className="mx-desc rv" style={{ '--d': '0.3s' }}>{mod.desc}</p>

                  <div className="rv" style={{ '--d': '0.36s' }}>
                    <span className="mx-badge" style={{ '--accent': mod.accent }}>
                      <span className="mx-badge-dot" />
                      {mod.status}
                    </span>
                  </div>

                  <div className="mx-chips rv" style={{ '--d': '0.42s' }}>
                    {mod.chips.map((c) => (
                      <span key={c} className="mx-chip-item" style={{ '--accent': mod.accent }}>{c}</span>
                    ))}
                  </div>

                  <div className="mx-metrics rv" style={{ '--d': '0.48s' }}>
                    {mod.metrics.map(([v, l]) => (
                      <div key={l} className="mx-metric" style={{ '--accent': mod.accent }}>
                        <strong>{v}</strong>
                        <small>{l}</small>
                      </div>
                    ))}
                  </div>

                  <div className="rv" style={{ '--d': '0.54s' }}>
                    <MagneticLink mod={mod} />
                  </div>

                  <div className="mx-details rv" style={{ '--d': '0.6s' }}>
                    {mod.details.map((d) => (
                      <div key={d} className="mx-detail" style={{ '--accent': mod.accent }}>{d}</div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <div className="mx-divider" />
          </div>
        ))}

        {/* ══════ MARQUEE 2 ══════ */}
        <div className="mx-mq">
          <div className="mx-mq-track rev">
            {[...MQ2, ...MQ2].map((item, i) => (
              <span key={i} className="mx-mq-item" style={{ color: 'rgba(255,107,0,.4)' }}>
                {item} <span>◈</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══════ CTA ══════ */}
        <section className="mx-cta">
          <div className="mx-cta-frame" />
          <div className="mx-cta-bg" />
          <h2 className="rv" style={{ '--d': '0.05s' }}>
            ¿LISTO PARA <span className="mx-grad" style={{ '--accent': '#FF6B00' }}>ENTRAR</span>?
          </h2>
          <p className="rv" style={{ '--d': '0.15s' }}>LA EXPERIENCIA COMIENZA EN EL VISOR</p>
          <div className="rv" style={{ '--d': '0.25s' }}>
            <MagneticLink mod={{ ...MODULES[0], href: '/explore', accent: '#FF6B00' }} label="ENTRAR AL VISOR" />
          </div>
        </section>
      </div>
    </>
  );
}
