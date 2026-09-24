'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { protectBrands } from '@/components/ui/ProtectedText';

const AuroraField = dynamic(() => import('@/components/ui/AuroraField'), { ssr: false })

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const DOCX_URL = '/docs/ATHERNIX_Terminos_Condiciones_Privacidad.docx'
const DOC_VERSION = 'V1.0 · SEPTIEMBRE 2026'
const LEGAL_EMAIL = 'soporte@athernix.com'

// ── Design tokens (estética módulos) ─────────────────────────────
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif"
const F_MONO = "'Plus Jakarta Sans', monospace"

// ── 3D pointer-tilt helper ───────────────────────────────────────
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

// ── Secciones de los términos ────────────────────────────────────
const SECTIONS = [
  {
    n: '01', color: '#ff6b35', title: 'ACEPTACIÓN DE LOS TÉRMINOS',
    body: 'Al crear una cuenta o usar ATHERNIX aceptas estos Términos de Servicio y nuestra Política de Privacidad. Si no estás de acuerdo, no uses la plataforma. En el programa educativo, el centro escolar acepta estos términos en nombre de sus estudiantes.',
  },
  {
    n: '02', color: '#a855f7', title: 'EL SERVICIO',
    body: 'ATHERNIX es un ecosistema de realidad virtual e inteligencia artificial para el aprendizaje de historia y STEM: módulos inmersivos (Historia Viva VR, SVirtual Tours, MenteLibre VR), el asistente Ather y herramientas para docentes y estudiantes.',
  },
  {
    n: '03', color: '#ff006e', title: 'CUENTAS Y SEGURIDAD',
    body: 'Eres responsable de mantener la confidencialidad de tus credenciales y de toda actividad bajo tu cuenta. Debes tener al menos 13 años, o contar con la autorización de tu centro educativo y tutores. Notifica de inmediato cualquier acceso no autorizado.',
  },
  {
    n: '04', color: '#ffd700', title: 'USO ACEPTABLE',
    body: 'No está permitido: intentar vulnerar la seguridad, extraer datos de otros usuarios, usar la plataforma para contenido ilegal u ofensivo, automatizar abusos contra las APIs, ni interferir con la experiencia de otros. El incumplimiento puede suspender tu cuenta.',
  },
  {
    n: '05', color: '#ff6b35', title: 'CONTENIDO EDUCATIVO E IA',
    body: 'El contenido generado por Ather (fuentes, flashcards, comparaciones, líneas de tiempo) es material de apoyo educativo. Puede contener errores: verifica siempre la información crítica con fuentes primarias y con tu docente.',
  },
  {
    n: '06', color: '#a855f7', title: 'PROPIEDAD INTELECTUAL',
    body: 'La plataforma, su código, diseño, modelos 3D, el personaje Ather y el contenido original son propiedad de NEO VORTEX LABS o de sus licenciantes. Tu contenido (mensajes, progreso) sigue siendo tuyo; nos otorgas licencia limitada para operar el servicio.',
  },
  {
    n: '07', color: '#ff006e', title: 'DISPONIBILIDAD Y CAMBIOS',
    body: 'Trabajamos para mantener ATHERNIX disponible, pero el servicio se ofrece "tal cual": puede haber interrupciones por mantenimiento, actualizaciones o causas fuera de nuestro control. Podemos modificar o retirar funciones con aviso razonable.',
  },
  {
    n: '08', color: '#ffd700', title: 'LIMITACIÓN DE RESPONSABILIDAD',
    body: 'En la medida permitida por la ley, ATHERNIX no responde por daños indirectos, pérdida de datos o interrupciones del aprendizaje derivadas del uso de la plataforma. Las experiencias de bienestar (MenteLibre VR) no sustituyen atención médica profesional.',
  },
  {
    n: '09', color: '#ff6b35', title: 'TERMINACIÓN',
    body: 'Puedes cerrar tu cuenta en cualquier momento desde tu perfil o escribiéndonos. Podemos suspender cuentas que incumplan estos términos. Las secciones de propiedad intelectual y limitación de responsabilidad sobreviven a la terminación.',
  },
  {
    n: '10', color: '#a855f7', title: 'LEY APLICABLE Y CONTACTO',
    body: `Estos términos se rigen por las leyes de El Salvador. Para cualquier consulta legal escríbenos a ${LEGAL_EMAIL} o visita nuestra página de soporte.`,
  },
]

// ── Tarjeta de sección ───────────────────────────────────────────
function SectionCard({ sec }: { sec: (typeof SECTIONS)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="ts-section tilt-card glare-card shine relative p-6 rounded-2xl border overflow-hidden"
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
          {protectBrands(sec.title)}
        </h3>
      </div>
      <p className="text-xs leading-relaxed m-0" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: F_MONO, fontSize: '0.67rem' }}>
        {protectBrands(sec.body)}
      </p>
    </div>
  )
}

// ── Página ───────────────────────────────────────────────────────
export default function TerminosPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      gsap.fromTo('.ts-progress', { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      })

      gsap.fromTo('.ts-hero-badge', { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.15 })
      gsap.fromTo('.ts-line', { yPercent: 130, opacity: 0, rotationX: -50 }, {
        yPercent: 0, opacity: 1, rotationX: 0,
        duration: prefersReduced ? 0.3 : 1,
        stagger: prefersReduced ? 0 : 0.12,
        ease: 'power4.out', delay: 0.3,
        transformPerspective: 600,
      })
      gsap.fromTo('.ts-hero-sub', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.85 })
      gsap.fromTo('.ts-hero-cta', { opacity: 0, y: 22, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.6)', delay: 1.05 })

      const batches: Array<[string, Record<string, number>]> = [
        ['.section-hdr', { opacity: 0, x: -16 }],
        ['.ts-section', { opacity: 0, y: 24, rotationX: -10 }],
        ['.ts-cta', { opacity: 0, y: 26, scale: 0.97 }],
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
        @keyframes ts-pulse{0%,100%{opacity:1;box-shadow:0 0 8px #ff6b35}55%{opacity:0.35;box-shadow:none}}
        .ts-progress{position:fixed;top:0;left:0;right:0;height:2px;z-index:100000;transform-origin:0% 50%;
          background:linear-gradient(90deg,#ff6b35,#ffd700,#ff006e);pointer-events:none}
        .tilt-card{transform-style:preserve-3d;will-change:transform}
        .aurora-field{position:fixed;inset:0;z-index:0;pointer-events:none}
        .aurora-field canvas{display:block}
        .ts-line{display:block;will-change:transform}
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
        style={{ background: 'linear-gradient(135deg,#08040c 0%,#120818 50%,#08040c 100%)', fontFamily: F_MONO }}>

        {/* Barra de progreso de scroll */}
        <div className="ts-progress" />

        {/* Fondo 3D de partículas */}
        <AuroraField colorA="#ff6b35" colorB="#ffd700" colorC="#ff006e" opacity={0.5} />

        {/* Orbes de luz */}
        <div className="fixed pointer-events-none rounded-full"
          style={{ width: 620, height: 620, top: '-12%', right: '-10%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(255,107,53,0.12) 0%,transparent 70%)', filter: 'blur(70px)' }} />
        <div className="fixed pointer-events-none rounded-full"
          style={{ width: 480, height: 480, bottom: '5%', left: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(255,215,0,0.08) 0%,transparent 70%)', filter: 'blur(60px)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-24">

          {/* ── HERO ── */}
          <section className="relative text-center min-h-[55vh] flex flex-col items-center justify-center">
            <div className="relative z-10 flex flex-col items-center">
              <div className="ts-hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
                style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.25)' }}>
                <span style={{ color: '#ff6b35', fontSize: '0.7rem' }}>◆</span>
                <span className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: 'rgba(255,160,100,0.75)', fontFamily: F_MONO, letterSpacing: '0.25em', fontSize: '0.62rem' }}>
                  Legal · Condiciones de uso
                </span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff6b35',
                  boxShadow: '0 0 8px #ff6b35', display: 'inline-block', animation: 'ts-pulse 2.2s infinite' }} />
              </div>

              <h1 className="font-black uppercase leading-[0.95] mb-5"
                style={{ fontFamily: F_BE, fontSize: 'clamp(2.8rem, 9vw, 6.4rem)', letterSpacing: '0.04em' }}>
                <span className="ts-line" style={{ color: '#ede0d4' }}>TÉRMINOS DE</span>
                <span className="ts-line" style={{
                  background: 'linear-gradient(90deg,#ff6b35,#ffd700,#ff006e)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  SERVICIO
                </span>
              </h1>

              <p className="ts-hero-sub max-w-xl text-sm leading-relaxed mb-4"
                style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_MONO, letterSpacing: '0.06em' }}>
                Las reglas del viaje. Estos términos explican qué puedes esperar de
                <span className="notranslate" translate="no"> ATHERNIX </span> y qué esperamos nosotros de ti.
              </p>
              <p className="ts-hero-sub text-xs mb-9" style={{ color: 'rgba(200,150,120,0.35)', fontFamily: F_MONO, fontSize: '0.58rem', letterSpacing: '0.25em' }}>
                ÚLTIMA ACTUALIZACIÓN · {DOC_VERSION}
              </p>

              <div className="ts-hero-cta flex flex-wrap items-center justify-center gap-4">
                <a href={DOCX_URL} download
                  className="relative inline-flex items-center gap-3 rounded-full font-bold tracking-widest uppercase no-underline"
                  style={{
                    padding: '14px 32px', fontSize: '0.62rem',
                    background: 'linear-gradient(90deg,#ff6b35,#ffd700,#ff006e)', backgroundSize: '200% 100%',
                    color: '#fff', fontFamily: F_MONO, letterSpacing: '0.22em',
                    boxShadow: '0 10px 40px rgba(255,107,53,0.3)', transition: 'background-position 0.5s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundPosition = '100% 0' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundPosition = '0 0' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  DESCARGAR DOCUMENTO
                </a>
                <Link href="/privacidad"
                  className="inline-flex items-center gap-2 rounded-full font-bold tracking-widest uppercase no-underline"
                  style={{ padding: '14px 28px', fontSize: '0.62rem', color: 'rgba(255,160,100,0.8)', fontFamily: F_MONO, letterSpacing: '0.22em', border: '1px solid rgba(255,107,53,0.3)', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,107,53,0.6)'; e.currentTarget.style.color = '#ff6b35' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,107,53,0.3)'; e.currentTarget.style.color = 'rgba(255,160,100,0.8)' }}>
                  VER PRIVACIDAD →
                </Link>
              </div>
            </div>
          </section>

          {/* ── SECCIONES ── */}
          <section>
            <div className="section-hdr flex items-center gap-3 mb-8">
              <span style={{ color: '#ff6b35', fontSize: '1.1rem' }}>◆</span>
              <div>
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.22em', lineHeight: 1 }}>
                  LOS TÉRMINOS, PUNTO POR PUNTO
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_MONO, letterSpacing: '0.1em', fontSize: '0.6rem' }}>
                  10 SECCIONES · LECTURA DE 5 MINUTOS
                </p>
              </div>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.2)' }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SECTIONS.map(sec => <SectionCard key={sec.n} sec={sec} />)}
            </div>
          </section>

          {/* ── CTA FINAL ── */}
          <section>
            <div className="ts-cta glare-card shine relative overflow-hidden text-center p-10 sm:p-14 rounded-3xl border"
              style={{ background: 'linear-gradient(135deg,rgba(255,107,53,0.1),rgba(255,215,0,0.06))', borderColor: 'rgba(255,107,53,0.3)' }}
              onMouseMove={e => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
                e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
              }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: 'rgba(255,160,100,0.65)', fontFamily: F_MONO, letterSpacing: '0.3em', fontSize: '0.58rem' }}>
                ¿DUDAS SOBRE LOS TÉRMINOS?
              </p>
              <h2 className="font-black uppercase mb-4" style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: 'clamp(1.6rem,4vw,2.6rem)', letterSpacing: '0.06em' }}>
                HABLEMOS CLARO
              </h2>
              <p className="max-w-md mx-auto text-xs leading-relaxed mb-9" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_MONO, fontSize: '0.66rem' }}>
                Si algo de este documento no queda claro, escríbenos antes de continuar.
                Preferimos explicarlo dos veces a que lo firmes sin entenderlo.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href={`mailto:${LEGAL_EMAIL}`}
                  className="relative inline-flex items-center gap-3 rounded-full font-bold tracking-widest uppercase no-underline"
                  style={{ padding: '16px 36px', fontSize: '0.68rem',
                    background: 'linear-gradient(90deg,#ff6b35,#ffd700,#ff006e)', backgroundSize: '200% 100%',
                    color: '#fff', fontFamily: F_MONO, letterSpacing: '0.22em',
                    boxShadow: '0 10px 40px rgba(255,107,53,0.35)', transition: 'background-position 0.5s' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundPosition = '100% 0' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundPosition = '0 0' }}>
                  {LEGAL_EMAIL}
                </a>
                <span className="text-xs" style={{ color: 'rgba(200,150,120,0.35)', fontFamily: F_MONO, fontSize: '0.55rem', letterSpacing: '0.25em' }}>
                  {DOC_VERSION}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
