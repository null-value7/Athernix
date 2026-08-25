'use client';

// ═══════════════════════════════════════════
// VIEW (Página) — MUNDI · Planeta interactivo
// ═══════════════════════════════════════════

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EarthScene from './components/EarthScene';
import LocationPanel from './components/LocationPanel';
import { useMundiController } from './controllers/useMundiController';

// Unity necesita WebGL: solo en cliente.
const UnityExperience = dynamic(() => import('./components/UnityExperience'), { ssr: false });

export default function MundiPage() {
  const {
    locations,
    selected,
    hovered,
    setHovered,
    experience,
    selectLocation,
    closePanel,
    startExperience,
    closeExperience,
  } = useMundiController();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [activeDot, setActiveDot] = useState('hero');
  const earthSectionRef = useRef<HTMLDivElement>(null);

  // ── Cursor personalizado + animaciones de scroll ──
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── Secuencia de arranque (loader) ──
    const bootObj = { v: 0 };
    gsap.to(bootObj, {
      v: 100, duration: 1.6, ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.round(bootObj.v)),
    });
    gsap.to('.boot-overlay', {
      yPercent: -100, duration: 1, ease: 'expo.inOut', delay: 1.85,
      onComplete: () => { document.querySelector('.boot-overlay')?.remove(); },
    });
    gsap.fromTo('.boot-logo', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMove);

    // ── Hero: letras con entrada 3D ──
    gsap.fromTo(
      '.hero-title .letter',
      { y: 120, opacity: 0, rotateX: -90 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.07, duration: 1.2, ease: 'back.out(1.6)', delay: 2.1 }
    );
    gsap.to('.hero-eyebrow', { opacity: 1, duration: 1, delay: 1.95 });
    gsap.to('.hero-sub', { opacity: 1, duration: 1, delay: 3 });
    gsap.to('.scroll-hint', { opacity: 1, duration: 1, delay: 3.3 });

    // Glitch periódico del título
    const glitch = setInterval(() => {
      gsap.fromTo('.hero-title', { x: -3, skewX: 4 }, { x: 0, skewX: 0, duration: 0.18, ease: 'power2.out' });
    }, 4200);

    // ── Efecto scramble/decode en textos [data-scramble] ──
    const scrambleIvs: ReturnType<typeof setInterval>[] = [];
    document.querySelectorAll<HTMLElement>('[data-scramble]').forEach((el) => {
      const orig = el.dataset.scramble || el.textContent || '';
      ScrollTrigger.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter: () => {
          const chars = '█▓▒░<>/#01';
          let frame = 0;
          const total = 22;
          const iv = setInterval(() => {
            frame++;
            el.textContent = orig
              .split('')
              .map((ch, i) => (ch === ' ' ? ' ' : i < (frame / total) * orig.length ? ch : chars[Math.floor(Math.random() * chars.length)]))
              .join('');
            if (frame >= total) { el.textContent = orig; clearInterval(iv); }
          }, 34);
          scrambleIvs.push(iv);
        },
      });
    });

    // ── Elementos magnéticos [data-magnetic] ──
    const magnets = document.querySelectorAll<HTMLElement>('[data-magnetic]');
    const magnetHandlers: Array<{ el: HTMLElement; mv: (e: MouseEvent) => void; lv: () => void }> = [];
    magnets.forEach((el) => {
      const mv = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: 'power3.out' });
      };
      const lv = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
      el.addEventListener('mousemove', mv);
      el.addEventListener('mouseleave', lv);
      magnetHandlers.push({ el, mv, lv });
    });

    // ── Tilt 3D en cards de destinos ──
    const tiltHandlers: Array<{ el: HTMLElement; mv: (e: MouseEvent) => void; lv: () => void }> = [];
    document.querySelectorAll<HTMLElement>('.dest-card').forEach((card) => {
      const inner = card.querySelector<HTMLElement>('.dc-inner');
      if (!inner) return;
      const mv = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(inner, { rotateY: x * 9, rotateX: -y * 9, duration: 0.5, ease: 'power2.out', transformPerspective: 700 });
      };
      const lv = () => gsap.to(inner, { rotateY: 0, rotateX: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)' });
      card.addEventListener('mousemove', mv);
      card.addEventListener('mouseleave', lv);
      tiltHandlers.push({ el: card, mv, lv });
    });

    // ── Skew de marquees según velocidad de scroll ──
    ScrollTrigger.create({
      trigger: document.body, start: 0, end: 'max',
      onUpdate: (self) => {
        const skew = gsap.utils.clamp(-10, 10, self.getVelocity() / -280);
        gsap.to('.mq-track', { skewX: skew, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
      },
    });

    // ── Dots de navegación lateral ──
    ['hero', 'planeta', 'destinos', 'datos'].forEach((id) => {
      ScrollTrigger.create({
        trigger: '#' + id, start: 'top 55%', end: 'bottom 55%',
        onToggle: (self) => { if (self.isActive) setActiveDot(id); },
      });
    });

    // ── Hero se desvanece al hacer scroll (parallax de salida) ──
    gsap.to('.hero-inner', {
      y: -180, opacity: 0, scale: 0.92, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 30%', scrub: 1 },
    });

    // ── Sección tierra: entrada cinematográfica ──
    gsap.fromTo(
      '.earth-header',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: '.earth-stage', start: 'top 65%', toggleActions: 'play none none reverse' },
      }
    );

    // ── Reveals genéricos ──
    gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
      gsap.to(el, {
        y: 0, opacity: 1, duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none reverse' },
      });
    });

    // ── Cards de destinos con stagger ──
    gsap.utils.toArray<HTMLElement>('.dest-card').forEach((el, i) => {
      gsap.to(el, {
        y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: (i % 3) * 0.12,
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
      });
    });

    // ── Contadores animados ──
    gsap.utils.toArray<HTMLElement>('.st-value').forEach((el) => {
      const target = parseFloat(el.dataset.target || '0');
      const suffix = el.dataset.suffix || '';
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () =>
          gsap.to(obj, {
            v: target, duration: 2, ease: 'power2.out',
            onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
          }),
      });
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      clearInterval(glitch);
      scrambleIvs.forEach(clearInterval);
      magnetHandlers.forEach(({ el, mv, lv }) => { el.removeEventListener('mousemove', mv); el.removeEventListener('mouseleave', lv); });
      tiltHandlers.forEach(({ el, mv, lv }) => { el.removeEventListener('mousemove', mv); el.removeEventListener('mouseleave', lv); });
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // ── Bloquear scroll mientras la experiencia Unity está abierta ──
  useEffect(() => {
    document.body.style.overflow = experience ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [experience]);

  // ── Al elegir card, scrollear a la tierra y seleccionar ──
  const pickFromCard = (id: string) => {
    earthSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => selectLocation(id), 700);
  };

  const hoveredLoc = locations.find((l) => l.id === hovered);

  return (
    <>
      {/* ─── BOOT LOADER ─── */}
      <div className="boot-overlay">
        <div className="boot-center">
          <div className="boot-logo">MUNDI</div>
          <div className="boot-bar">
            <div className="boot-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="boot-pct mono">{String(progress).padStart(3, '0')}% // INICIALIZANDO_ÓRBITA</div>
        </div>
      </div>

      {/* ─── NAV DOTS ─── */}
      <aside className="nav-dots">
        {([['hero', 'INICIO'], ['planeta', 'PLANETA'], ['destinos', 'DESTINOS'], ['datos', 'DATOS']] as const).map(([id, label]) => (
          <button
            key={id}
            className={activeDot === id ? 'nd active' : 'nd'}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            aria-label={label}
          >
            <span className="nd-dot" />
            <span className="nd-label mono">{label}</span>
          </button>
        ))}
      </aside>

      {/* ─── HERO ─── */}
      <section className="hero" id="hero">
        <div className="hero-orb" style={{ width: 520, height: 520, background: 'radial-gradient(circle, rgba(255,107,0,0.16), transparent 70%)', top: '12%', right: '4%' }} />
        <div className="hero-orb" style={{ width: 380, height: 380, background: 'radial-gradient(circle, rgba(255,0,110,0.13), transparent 70%)', bottom: '12%', left: '3%' }} />
        <div className="hero-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p className="hero-eyebrow mono">SISTEMA_PLANETARIO // ATHERNIX_V3</p>
          <h1 className="hero-title">
            {'MUNDI'.split('').map((l, i) => (
              <span className="letter" key={i}>{l}</span>
            ))}
          </h1>
          <p className="hero-sub mono" data-scramble="EL PLANETA ES TU INTERFAZ">EL PLANETA ES TU INTERFAZ</p>
        </div>
        <div className="scroll-hint">
          <div className="line" />
          <span className="mono">DESLIZA_PARA_ORBITAR</span>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="mq">
        <div className="mq-track">
          {[0, 1].map((k) => (
            <span key={k}>
              EXPLORA <em>◆</em> SELECCIONA <em>◆</em> VIAJA <em>◆</em> REALIDAD_VIRTUAL <em>◆</em> EL_SALVADOR <em>◆</em> PATRIMONIO <em>◆</em> MUNDI <em>◆</em>{' '}
            </span>
          ))}
        </div>
      </div>

      {/* ─── TIERRA 3D ─── */}
      <section className="earth-stage" id="planeta" ref={earthSectionRef}>
        <span className="stage-corner tl" /><span className="stage-corner tr" />
        <span className="stage-corner bl" /><span className="stage-corner br" />
        <div className="earth-header">
          <h2 data-scramble="SELECCIONA TU DESTINO">SELECCIONA TU DESTINO</h2>
          <p className="mono">CLIC_EN_UN_NODO // ARRASTRA_PARA_ROTAR // RUEDA_PARA_ZOOM</p>
        </div>

        <div className="earth-canvas-wrap">
          <EarthScene
            locations={locations}
            selectedId={selected?.id || null}
            onSelect={selectLocation}
            onHover={setHovered}
          />
        </div>

        {hoveredLoc && !selected && (
          <div className="hover-tag mono" style={{ left: mousePos.x, top: mousePos.y }}>
            <span style={{ color: hoveredLoc.color }}>◉</span> {hoveredLoc.name.toUpperCase()}
          </div>
        )}

        <div className="earth-hud mono">
          <div>MUNDI_OS <b>v3.1.4</b></div>
          <div>NODOS: <b>{locations.length}</b> // ESTADO: <b>EN_LÍNEA</b></div>
          <div>SEÑAL: <b>████████░░ 87%</b></div>
        </div>
        <div className="earth-instructions mono">
          <div><b>[ARRASTRAR]</b> ROTAR PLANETA</div>
          <div><b>[RUEDA]</b> ZOOM ORBITAL</div>
          <div><b>[CLIC]</b> SELECCIONAR NODO</div>
        </div>

        {selected && (
          <LocationPanel location={selected} onClose={closePanel} onStart={startExperience} />
        )}
      </section>

      {/* ─── GRID DE DESTINOS ─── */}
      <section className="dest-section" id="destinos">
        <p className="sec-eyebrow mono reveal" data-scramble="// ÍNDICE_DE_DESTINOS">// ÍNDICE_DE_DESTINOS</p>
        <h2 className="sec-title reveal">
          TODOS LOS <em>NODOS</em>
        </h2>
        <div className="dest-grid">
          {locations.map((loc, i) => (
            <article className="dest-card" key={loc.id} onClick={() => pickFromCard(loc.id)}>
              <div className="dc-inner">
                <span className="dc-scanline" />
                <span className="dc-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="dc-cat mono" style={{ color: loc.color }}>
                  <span className="dot" style={{ background: loc.color, boxShadow: `0 0 8px ${loc.color}` }} />
                  {loc.category}
                </div>
                <h3>{loc.name}</h3>
                <p>{loc.description.slice(0, 110)}…</p>
                <div className="dc-go mono">
                  VER_EN_EL_PLANETA <span>→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── MARQUEE 2 (reverso) ─── */}
      <div className="mq mq-rev">
        <div className="mq-track">
          {[0, 1].map((k) => (
            <span key={k}>
              JOYA_DE_CERÉN <em>◈</em> TAZUMAL <em>◈</em> COATEPEQUE <em>◈</em> EL_TUNCO <em>◈</em> SANTA_ANA <em>◈</em> SUCHITOTO <em>◈</em> EL_BOQUERÓN <em>◈</em> MEANGUERA <em>◈</em>{' '}
            </span>
          ))}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section className="stats-band" id="datos">
        <div className="stat-item reveal">
          <div className="st-value" data-target="12" data-suffix="">0</div>
          <div className="st-label mono">DESTINOS_ACTIVOS</div>
        </div>
        <div className="stat-item reveal">
          <div className="st-value" data-target="1400" data-suffix="+">0</div>
          <div className="st-label mono">AÑOS_DE_HISTORIA</div>
        </div>
        <div className="stat-item reveal">
          <div className="st-value" data-target="240" data-suffix="K">0</div>
          <div className="st-label mono">PARTÍCULAS_RENDERIZADAS</div>
        </div>
        <div className="stat-item reveal">
          <div className="st-value" data-target="100" data-suffix="%">0</div>
          <div className="st-label mono">INMERSIÓN_VR</div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="mundi-footer">
        <span className="f-logo" data-magnetic>MUNDI</span>
        <span className="mono">ATHERNIX ECOSYSTEM © 2026 // NEO_VORTEX_LABS</span>
        <span className="mono">HECHO_EN_EL_SALVADOR 🇸🇻</span>
      </footer>

      {/* ─── EXPERIENCIA UNITY (UI FLOTANTE) ─── */}
      {experience && (
        <div className="uexp-overlay">
          <UnityExperience location={experience} onBack={closeExperience} />
        </div>
      )}
    </>
  );
}
