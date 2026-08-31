'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PrivacyScene = dynamic(() => import('@/components/privacy/PrivacyScene'), { ssr: false })
const AuroraField = dynamic(() => import('@/components/ui/AuroraField'), { ssr: false })

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ── Documento PDF (TODO: reemplazar el archivo en public/docs/ con el oficial) ──
const PDF_URL = '/docs/politica-privacidad.pdf'
const PDF_VERSION = 'V1.0 · AGOSTO 2026'
const PRIVACY_EMAIL = 'privacidad@athernix.com'

// ── Design tokens (estética módulos) ─────────────────────────────
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif"
const F_MONO = "'Plus Jakarta Sans', monospace"

// ── Magnetic button helper ───────────────────────────────────────
function magneticMove(e: React.MouseEvent<HTMLElement>, strength = 0.3) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) * strength
  const y = (e.clientY - rect.top - rect.height / 2) * strength
  gsap.to(e.currentTarget, { x, y, duration: 0.3, ease: 'power2.out' })
}
function magneticReset(e: React.MouseEvent<HTMLElement>) {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' })
}
// ── 3D pointer-tilt helper (+ glare que sigue al puntero) ────────
function tiltMove(e: React.MouseEvent<HTMLElement>, ref: React.RefObject<HTMLElement | null>, lift = -4, max = 10) {
  const rect = e.currentTarget.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width - 0.5
  const py = (e.clientY - rect.top) / rect.height - 0.5
  e.currentTarget.style.setProperty('--mx', `${(px + 0.5) * 100}%`)
  e.currentTarget.style.setProperty('--my', `${(py + 0.5) * 100}%`)
  gsap.to(ref.current, { y: lift, rotationY: px * max, rotationX: -py * max, transformPerspective: 700, duration: 0.35, ease: 'power2.out' })
}
function tiltReset(ref: React.RefObject<HTMLElement | null>) {
  gsap.to(ref.current, { y: 0, rotationX: 0, rotationY: 0, duration: 0.45, ease: 'power2.out' })
}

// ── Secciones de la política ─────────────────────────────────────
const SECTIONS = [
  {
    n: '01', color: '#ff6b35', title: 'INFORMACIÓN QUE RECOPILAMOS',
    body: 'Recopilamos los datos que nos entregas al crear tu cuenta (nombre, correo electrónico, rol educativo) y datos técnicos básicos del dispositivo o headset con el que accedes a la plataforma, necesarios para que las experiencias VR funcionen correctamente.',
  },
  {
    n: '02', color: '#a855f7', title: 'DATOS DE BIOFEEDBACK',
    body: 'Módulos como MenteLibre VR procesan señales de biofeedback en tiempo real para adaptar la experiencia. Estas señales se procesan de forma efímera: no se venden, no se usan con fines publicitarios y solo se almacenan métricas agregadas de progreso.',
  },
  {
    n: '03', color: '#ff006e', title: 'USO DE LA INFORMACIÓN',
    body: 'Usamos tus datos para personalizar las experiencias VR, dar seguimiento a tu progreso académico, mejorar nuestros módulos y mantener la seguridad de la plataforma. Nunca para venderte publicidad de terceros.',
  },
  {
    n: '04', color: '#ffd700', title: 'COOKIES Y TECNOLOGÍAS',
    body: 'Utilizamos cookies estrictamente funcionales: sesión de usuario, preferencia de idioma y métricas de uso anónimas que nos ayudan a entender qué módulos aportan más valor a la comunidad educativa.',
  },
  {
    n: '05', color: '#ff6b35', title: 'COMPARTIR CON TERCEROS',
    body: 'Solo compartimos datos con proveedores de infraestructura bajo contrato (alojamiento, autenticación y servicios de IA), quienes los procesan exclusivamente en nuestro nombre. Jamás vendemos tu información.',
  },
  {
    n: '06', color: '#a855f7', title: 'SEGURIDAD DE LOS DATOS',
    body: 'Protegemos tu información con cifrado en tránsito y en reposo, control de acceso por roles y auditorías periódicas. El acceso a datos de estudiantes está restringido al personal autorizado del programa.',
  },
  {
    n: '07', color: '#ff006e', title: 'MENORES DE EDAD',
    body: 'El uso escolar de ATHERNIX se realiza con el consentimiento del centro educativo y de los tutores legales. Los perfiles de menores contienen la mínima información necesaria para operar el programa.',
  },
  {
    n: '08', color: '#ffd700', title: 'CAMBIOS Y CONTACTO',
    body: `Publicaremos cualquier actualización de esta política en esta página, indicando la fecha de la última versión. Para dudas o solicitudes escríbenos a ${PRIVACY_EMAIL}.`,
  },
]

const RIGHTS = [
  { icon: '◍', label: 'ACCESO', desc: 'Saber qué datos tenemos sobre ti', color: '#ff6b35' },
  { icon: '✎', label: 'RECTIFICACIÓN', desc: 'Corregir datos incorrectos', color: '#a855f7' },
  { icon: '◌', label: 'ELIMINACIÓN', desc: 'Borrar tu cuenta y tus datos', color: '#ff006e' },
  { icon: '⇄', label: 'PORTABILIDAD', desc: 'Llevarte tus datos contigo', color: '#ffd700' },
]

// ── Botón de descarga del PDF ────────────────────────────────────
function DownloadButton({ large = false }: { large?: boolean }) {
  return (
    <a href={PDF_URL} download
      className="relative inline-flex items-center gap-3 rounded-full font-bold tracking-widest uppercase no-underline"
      style={{
        padding: large ? '18px 42px' : '14px 32px',
        fontSize: large ? '0.72rem' : '0.62rem',
        background: 'linear-gradient(90deg,#a855f7,#FF006E,#FF6B00)',
        backgroundSize: '200% 100%',
        color: '#fff',
        fontFamily: F_MONO,
        letterSpacing: '0.22em',
        boxShadow: '0 10px 40px rgba(168,85,247,0.35)',
        transition: 'background-position 0.5s',
      }}
      onMouseMove={e => { magneticMove(e); e.currentTarget.style.backgroundPosition = '100% 0' }}
      onMouseLeave={e => { magneticReset(e); e.currentTarget.style.backgroundPosition = '0 0' }}>
      <svg width={large ? 16 : 13} height={large ? 16 : 13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      DESCARGAR PDF
    </a>
  )
}

// ── Tarjeta de derecho (tilt 3D) ─────────────────────────────────
function RightCard({ r }: { r: (typeof RIGHTS)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="pv-right tilt-card glare-card shine flex flex-col items-center gap-2 text-center p-6 rounded-2xl border"
      style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(180,60,40,0.18)' }}
      onMouseMove={e => tiltMove(e, ref, -5, 12)}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${r.color}55`
        e.currentTarget.style.boxShadow = `0 0 24px ${r.color}22`
      }}
      onMouseLeave={e => {
        tiltReset(ref)
        e.currentTarget.style.borderColor = 'rgba(180,60,40,0.18)'
        e.currentTarget.style.boxShadow = 'none'
      }}>
      <span className="w-11 h-11 rounded-full flex items-center justify-center text-lg mb-1 card-depth"
        style={{ background: `${r.color}15`, border: `1px solid ${r.color}35`, color: r.color, boxShadow: `0 0 14px ${r.color}18` }}>
        {r.icon}
      </span>
      <span className="font-black tracking-widest uppercase card-depth-sm" style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.7rem', letterSpacing: '0.16em' }}>
        {r.label}
      </span>
      <span className="text-xs" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_MONO, fontSize: '0.6rem' }}>
        {r.desc}
      </span>
    </div>
  )
}

// ── Tarjeta de sección ───────────────────────────────────────────
function SectionCard({ sec }: { sec: (typeof SECTIONS)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="pv-section tilt-card glare-card shine relative p-6 rounded-2xl border overflow-hidden"
      style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(180,60,40,0.18)' }}
      onMouseMove={e => tiltMove(e, ref, -4, 10)}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${sec.color}50`
        e.currentTarget.style.boxShadow = `0 0 28px ${sec.color}20`
      }}
      onMouseLeave={e => {
        tiltReset(ref)
        e.currentTarget.style.borderColor = 'rgba(180,60,40,0.18)'
        e.currentTarget.style.boxShadow = 'none'
      }}>
      <span className="absolute -top-3 -right-1 font-black select-none pointer-events-none"
        style={{ fontFamily: F_BE, fontSize: '4.6rem', color: `${sec.color}12`, letterSpacing: '-0.02em' }}>
        {sec.n}
      </span>
      <div className="flex items-center gap-3 mb-3 card-depth">
        <span className="text-xs font-black px-2.5 py-1 rounded-lg"
          style={{ color: sec.color, background: `${sec.color}15`, border: `1px solid ${sec.color}35`, fontFamily: F_MONO, fontSize: '0.58rem', letterSpacing: '0.15em', boxShadow: `0 0 12px ${sec.color}12` }}>
          {sec.n}
        </span>
        <h3 className="font-black tracking-widest uppercase m-0"
          style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.8rem', letterSpacing: '0.13em' }}>
          {sec.title}
        </h3>
      </div>
      <p className="text-xs leading-relaxed m-0" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: F_MONO, fontSize: '0.67rem' }}>
        {sec.body}
      </p>
    </div>
  )
}

// ── Página ───────────────────────────────────────────────────────
export default function PrivacidadPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Barra de progreso
      gsap.fromTo('.pv-progress', { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      })

      // Hero
      gsap.fromTo('.pv-hero-badge', { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.15 })
      gsap.fromTo('.pv-line', { yPercent: 130, opacity: 0, rotationX: -50 }, {
        yPercent: 0, opacity: 1, rotationX: 0,
        duration: prefersReduced ? 0.3 : 1,
        stagger: prefersReduced ? 0 : 0.12,
        ease: 'power4.out', delay: 0.3,
        transformPerspective: 600,
      })
      gsap.fromTo('.pv-hero-sub', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.85 })
      gsap.fromTo('.pv-hero-cta', { opacity: 0, y: 22, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.6)', delay: 1.05 })

      // Reveals al hacer scroll
      const batches: Array<[string, Record<string, number>]> = [
        ['.section-hdr', { opacity: 0, x: -16 }],
        ['.pv-section', { opacity: 0, y: 24, rotationX: -10 }],
        ['.pv-right', { opacity: 0, y: 18, scale: 0.94 }],
        ['.pv-cta', { opacity: 0, y: 26, scale: 0.97 }],
      ]
      batches.forEach(([selector, fromVars]) => {
        ScrollTrigger.batch(selector, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => gsap.fromTo(batch, fromVars, {
            opacity: 1, x: 0, y: 0, scale: 1, rotationX: 0,
            duration: prefersReduced ? 0.3 : 0.7,
            stagger: prefersReduced ? 0 : 0.08,
            ease: 'power3.out',
            transformPerspective: 700,
          }),
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // ── Smooth scroll Lenis ──────────────────────────────────────
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    type LenisInstance = { raf: (t: number) => void; on: (e: string, cb: () => void) => void; destroy: () => void }
    let lenis: LenisInstance | null = null
    let pollId: ReturnType<typeof setTimeout> | null = null
    let cancelled = false

    const onTick = (time: number) => { lenis?.raf(time * 1000) }

    const trySetup = () => {
      if (cancelled) return
      const LenisCtor = (window as unknown as { Lenis?: new (opts: object) => LenisInstance }).Lenis
      if (!LenisCtor) { pollId = setTimeout(trySetup, 80); return }
      lenis = new LenisCtor({ duration: 1.1, smoothWheel: true, easing: (t: number) => 1 - Math.pow(1 - t, 3) })
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(onTick)
      gsap.ticker.lagSmoothing(0)
    }
    trySetup()

    return () => {
      cancelled = true
      if (pollId) clearTimeout(pollId)
      gsap.ticker.remove(onTick)
      lenis?.destroy()
    }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @keyframes pv-pulse{0%,100%{opacity:1;box-shadow:0 0 8px #a855f7}55%{opacity:0.35;box-shadow:none}}
        .pv-progress{position:fixed;top:0;left:0;right:0;height:2px;z-index:100000;transform-origin:0% 50%;
          background:linear-gradient(90deg,#a855f7,#ff006e,#ff6b35);pointer-events:none}
        .tilt-card{transform-style:preserve-3d;will-change:transform}
        .privacy-hero-scene{position:absolute;inset:-6% 0 auto 0;height:125%;z-index:0;pointer-events:none;opacity:.8}
        .privacy-hero-scene canvas{display:block}
        .aurora-field{position:fixed;inset:0;z-index:0;pointer-events:none}
        .aurora-field canvas{display:block}
        .pv-line{display:block;will-change:transform}
        .glare-card{position:relative;overflow:hidden}
        .glare-card::before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:2;
          background:radial-gradient(320px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,0.08),transparent 55%);
          opacity:0;transition:opacity .3s}
        .glare-card:hover::before{opacity:1}
        .shine::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:3;
          background:linear-gradient(115deg,transparent 32%,rgba(255,255,255,0.05) 46%,transparent 60%);
          transform:translateX(-130%);transition:transform .9s ease}
        .shine:hover::after{transform:translateX(130%)}
        .card-depth{transform:translateZ(24px)}
        .card-depth-sm{transform:translateZ(12px)}
        @media (prefers-reduced-motion: reduce){.tilt-card{transform:none !important}}
      `}</style>

      <div ref={containerRef} className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(135deg,#08040c 0%,#100a1c 50%,#08040c 100%)', fontFamily: F_MONO }}>

        {/* Barra de progreso de scroll */}
        <div className="pv-progress" />

        {/* Fondo 3D interactivo (olas de partículas · GPU, reacciona al scroll y al puntero) */}
        <AuroraField colorA="#a855f7" colorB="#ff006e" colorC="#ff6b35" opacity={0.5} />

        {/* Orbes de luz */}
        <div className="fixed pointer-events-none rounded-full"
          style={{ width: 620, height: 620, top: '-12%', left: '-10%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(168,85,247,0.13) 0%,transparent 70%)', filter: 'blur(70px)' }} />
        <div className="fixed pointer-events-none rounded-full"
          style={{ width: 480, height: 480, bottom: '5%', right: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(255,107,53,0.1) 0%,transparent 70%)', filter: 'blur(60px)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-24">

          {/* ── HERO ── */}
          <section className="relative text-center min-h-[68vh] flex flex-col items-center justify-center">
            <PrivacyScene />
            <div className="relative z-10 flex flex-col items-center">
              <div className="pv-hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
                style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)' }}>
                <span style={{ color: '#a855f7', fontSize: '0.7rem' }}>◆</span>
                <span className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: 'rgba(190,140,255,0.75)', fontFamily: F_MONO, letterSpacing: '0.25em', fontSize: '0.62rem' }}>
                  Legal · Protección de datos
                </span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a855f7',
                  boxShadow: '0 0 8px #a855f7', display: 'inline-block', animation: 'pv-pulse 2.2s infinite' }} />
              </div>

              <h1 className="font-black uppercase leading-[0.95] mb-5"
                style={{ fontFamily: F_BE, fontSize: 'clamp(2.8rem, 9vw, 6.4rem)', letterSpacing: '0.04em' }}>
                <span className="pv-line" style={{ color: '#ede0d4' }}>POLÍTICA DE</span>
                <span className="pv-line" style={{
                  background: 'linear-gradient(90deg,#a855f7,#FF006E,#FF6B00)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  PRIVACIDAD
                </span>
              </h1>

              <p className="pv-hero-sub max-w-xl text-sm leading-relaxed mb-4"
                style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_MONO, letterSpacing: '0.06em' }}>
                Tu confianza es el núcleo del ecosistema ATHERNIX. Aquí te explicamos con total
                transparencia qué datos usamos, por qué y cómo los protegemos.
              </p>
              <p className="pv-hero-sub text-xs mb-9" style={{ color: 'rgba(200,150,120,0.35)', fontFamily: F_MONO, fontSize: '0.58rem', letterSpacing: '0.25em' }}>
                ÚLTIMA ACTUALIZACIÓN · {PDF_VERSION}
              </p>

              <div className="pv-hero-cta">
                <DownloadButton />
              </div>
            </div>
          </section>

          {/* ── SECCIONES ── */}
          <section>
            <div className="section-hdr flex items-center gap-3 mb-8">
              <span style={{ color: '#a855f7', fontSize: '1.1rem' }}>◆</span>
              <div>
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.22em', lineHeight: 1 }}>
                  LA POLÍTICA, PUNTO POR PUNTO
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_MONO, letterSpacing: '0.1em', fontSize: '0.6rem' }}>
                  8 SECCIONES · LECTURA DE 4 MINUTOS
                </p>
              </div>
              <div className="flex-1 h-px" style={{ background: 'rgba(168,85,247,0.2)' }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SECTIONS.map(sec => <SectionCard key={sec.n} sec={sec} />)}
            </div>
          </section>

          {/* ── TUS DERECHOS ── */}
          <section>
            <div className="section-hdr flex items-center gap-3 mb-8">
              <span style={{ color: '#ff6b35', fontSize: '1.1rem' }}>✦</span>
              <div>
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.22em', lineHeight: 1 }}>
                  TUS DERECHOS
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_MONO, letterSpacing: '0.1em', fontSize: '0.6rem' }}>
                  SIEMPRE TIENES EL CONTROL DE TUS DATOS
                </p>
              </div>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }} />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {RIGHTS.map(r => <RightCard key={r.label} r={r} />)}
            </div>
          </section>

          {/* ── CTA DESCARGA ── */}
          <section>
            <div className="pv-cta glare-card shine relative overflow-hidden text-center p-10 sm:p-14 rounded-3xl border"
              style={{ background: 'linear-gradient(135deg,rgba(168,85,247,0.1),rgba(255,0,110,0.07))', borderColor: 'rgba(168,85,247,0.3)' }}
              onMouseMove={e => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
                e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
              }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: 'rgba(190,140,255,0.65)', fontFamily: F_MONO, letterSpacing: '0.3em', fontSize: '0.58rem' }}>
                DOCUMENTO OFICIAL
              </p>
              <h2 className="font-black uppercase mb-4" style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: 'clamp(1.6rem,4vw,2.6rem)', letterSpacing: '0.06em' }}>
                LLÉVATE LA VERSIÓN COMPLETA
              </h2>
              <p className="max-w-md mx-auto text-xs leading-relaxed mb-9" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_MONO, fontSize: '0.66rem' }}>
                Descarga la política de privacidad en PDF para leerla sin conexión,
                compartirla con tu institución o archivarla.
              </p>
              <div className="flex flex-col items-center gap-4">
                <DownloadButton large />
                <span className="text-xs" style={{ color: 'rgba(200,150,120,0.35)', fontFamily: F_MONO, fontSize: '0.55rem', letterSpacing: '0.25em' }}>
                  PDF · {PDF_VERSION} · {PRIVACY_EMAIL}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
