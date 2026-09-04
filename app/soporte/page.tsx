'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import toast from 'react-hot-toast'

const SupportScene = dynamic(() => import('@/components/support/SupportScene'), { ssr: false })
const AuroraField = dynamic(() => import('@/components/ui/AuroraField'), { ssr: false })

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ── Datos de contacto (TODO: reemplazar con los datos reales) ────
const SUPPORT_PHONE = '+503 0000-0000'
const SUPPORT_EMAIL = 'soporte@athernix.com'
const SUPPORT_HOURS = 'LUN – VIE · 8:00 – 17:00 (GMT-6)'

// ── Design tokens (estética módulos) ─────────────────────────────
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif"
const F_MONO = "'Plus Jakarta Sans', monospace"

// ── Magnetic button helper (award-winning cursor-follow effect) ──
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
function tiltMove(e: React.MouseEvent<HTMLElement>, ref: React.RefObject<HTMLElement | null>, lift = -4, max = 12) {
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

// ── Canales de soporte ───────────────────────────────────────────
const CHANNELS = [
  {
    icon: '◎', tag: 'CANAL_01', title: 'LÍNEA TELEFÓNICA',
    desc: 'Atención directa desde El Salvador para incidencias con headsets, cuentas y módulos VR.',
    meta: SUPPORT_PHONE, color: '#ff6b35', href: `tel:${SUPPORT_PHONE.replace(/[\s-]/g, '')}`,
  },
  {
    icon: '✉', tag: 'CANAL_02', title: 'CORREO DE SOPORTE',
    desc: 'Envíanos capturas, logs o dudas detalladas. Respondemos en menos de 24 horas hábiles.',
    meta: SUPPORT_EMAIL, color: '#ff006e', href: `mailto:${SUPPORT_EMAIL}`,
  },
  {
    icon: '◈', tag: 'CANAL_03', title: 'ATHERNIXITO · IA',
    desc: 'Nuestro asistente con IA resuelve dudas sobre la plataforma al instante, 24/7.',
    meta: 'DISPONIBLE 24/7', color: '#ffd700', href: '/chatbot',
  },
  {
    icon: '◉', tag: 'CANAL_04', title: 'CENTRO XR',
    desc: 'Visítanos para soporte presencial de equipos y calibración de headsets.',
    meta: 'SAN SALVADOR · SV', color: '#a855f7', href: '/about',
  },
]

const STATS = [
  { value: '<2H', label: 'TIEMPO DE RESPUESTA', color: '#ff6b35' },
  { value: '24/7', label: 'IA DISPONIBLE', color: '#ffd700' },
  { value: '98%', label: 'SATISFACCIÓN', color: '#ff006e' },
  { value: '+500', label: 'CASOS RESUELTOS', color: '#a855f7' },
]

const FAQS = [
  {
    q: '¿CÓMO REPORTO UN PROBLEMA CON MI HEADSET?',
    a: 'Llama a la línea de soporte o escríbenos por correo con el modelo de tu headset y una descripción del problema. Si es un equipo del programa educativo, indica también tu centro escolar.',
  },
  {
    q: '¿EL SOPORTE TIENE ALGÚN COSTO?',
    a: 'No. El soporte técnico de ATHERNIX es gratuito para todos los usuarios registrados de la plataforma y para las instituciones del programa educativo.',
  },
  {
    q: '¿QUÉ HAGO SI OLVIDÉ MI CONTRASEÑA?',
    a: 'Desde la pantalla de inicio de sesión selecciona “Recuperar contraseña” y sigue las instrucciones que llegarán a tu correo. Si no recibes el correo, contáctanos por cualquiera de los canales.',
  },
  {
    q: '¿PUEDO RECIBIR SOPORTE EN OTRO IDIOMA?',
    a: 'Sí. Nuestra plataforma soporta español, inglés, portugués, francés e italiano, y el equipo de soporte puede atenderte en español e inglés.',
  },
  {
    q: '¿CÓMO SOLICITO UNA DEMO PARA MI INSTITUCIÓN?',
    a: 'Escríbenos al correo de soporte con el nombre de tu institución y la cantidad aproximada de estudiantes. Coordinamos una demo presencial o virtual de los módulos VR.',
  },
]

// ── Stat item (contador animado al entrar en viewport) ──────────
function StatItem({ stat }: { stat: (typeof STATS)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = valueRef.current
    if (!el) return
    const match = stat.value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/)
    const ctx = gsap.context(() => {
      if (match) {
        const prefix = match[1]
        const target = parseFloat(match[2])
        const suffix = match[3]
        const counter = { val: 0 }
        gsap.to(counter, {
          val: target, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: () => { el.textContent = `${prefix}${Math.round(counter.val)}${suffix}` },
        })
      } else {
        gsap.fromTo(el, { opacity: 0, scale: 0.4 }, {
          opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(2.2)',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        })
      }
    })
    return () => ctx.revert()
  }, [stat.value])

  return (
    <div ref={ref} className="sp-stat tilt-card glare-card shine flex flex-col items-center gap-1.5 p-5 rounded-2xl border"
      style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(180,60,40,0.18)' }}
      onMouseMove={e => tiltMove(e, ref)}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${stat.color}55`
        e.currentTarget.style.boxShadow = `0 0 24px ${stat.color}25`
      }}
      onMouseLeave={e => {
        tiltReset(ref)
        e.currentTarget.style.borderColor = 'rgba(180,60,40,0.18)'
        e.currentTarget.style.boxShadow = 'none'
      }}>
      <span ref={valueRef} className="text-2xl font-black card-depth" style={{ fontFamily: F_BE, color: stat.color, letterSpacing: '-0.02em' }}>{stat.value}</span>
      <span className="text-xs text-center tracking-wider uppercase card-depth-sm" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: F_MONO, fontSize: '0.6rem', letterSpacing: '0.15em' }}>{stat.label}</span>
    </div>
  )
}

// ── Channel card ─────────────────────────────────────────────────
function ChannelCard({ ch }: { ch: (typeof CHANNELS)[number] }) {
  const ref = useRef<HTMLAnchorElement>(null)
  return (
    <Link href={ch.href} ref={ref}
      className="sp-channel tilt-card glare-card shine flex flex-col gap-3 p-6 rounded-2xl border no-underline"
      style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(180,60,40,0.18)' }}
      onMouseMove={e => tiltMove(e, ref, -6, 14)}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${ch.color}55`
        e.currentTarget.style.boxShadow = `0 0 30px ${ch.color}22`
      }}
      onMouseLeave={e => {
        tiltReset(ref)
        e.currentTarget.style.borderColor = 'rgba(180,60,40,0.18)'
        e.currentTarget.style.boxShadow = 'none'
      }}>
      <div className="flex items-center justify-between card-depth">
        <span className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ background: `${ch.color}15`, border: `1px solid ${ch.color}35`, color: ch.color, boxShadow: `0 0 14px ${ch.color}15` }}>
          {ch.icon}
        </span>
        <span className="text-xs font-bold" style={{ color: `${ch.color}88`, fontFamily: F_MONO, fontSize: '0.55rem', letterSpacing: '0.25em' }}>{ch.tag}</span>
      </div>
      <h3 className="font-black tracking-widest uppercase card-depth-sm" style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.85rem', letterSpacing: '0.14em' }}>
        {ch.title}
      </h3>
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_MONO, fontSize: '0.66rem' }}>
        {ch.desc}
      </p>
      <span className="mt-auto text-xs font-bold tracking-widest card-depth-sm" style={{ color: ch.color, fontFamily: F_MONO, fontSize: '0.62rem', letterSpacing: '0.18em' }}>
        {ch.meta} →
      </span>
    </Link>
  )
}

// ── FAQ item (accordion) ─────────────────────────────────────────
function FaqItem({ faq, open, onToggle }: { faq: (typeof FAQS)[number]; open: boolean; onToggle: () => void }) {
  return (
    <div className="sp-faq rounded-2xl border overflow-hidden transition-all duration-300"
      style={{
        background: open ? 'rgba(255,107,53,0.06)' : 'rgba(18,8,22,0.88)',
        borderColor: open ? 'rgba(255,107,53,0.4)' : 'rgba(180,60,40,0.18)',
      }}>
      <button onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 cursor-pointer bg-transparent border-none text-left"
        style={{ fontFamily: F_MONO }}>
        <span className="text-xs font-bold tracking-widest" style={{ color: open ? '#ff6b35' : '#ede0d4', fontSize: '0.68rem', letterSpacing: '0.14em' }}>
          {faq.q}
        </span>
        <span className="flex-shrink-0 transition-transform duration-300 text-sm"
          style={{ color: '#ff6b35', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          +
        </span>
      </button>
      <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-xs leading-relaxed m-0" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: F_MONO, fontSize: '0.66rem' }}>
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Página ───────────────────────────────────────────────────────
export default function SoportePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const phoneCardRef = useRef<HTMLDivElement>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_PHONE)
      toast.success('Número copiado al portapapeles')
    } catch {
      toast.error('No se pudo copiar el número')
    }
  }

  // ── Entrance + scroll-triggered reveals ────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Scroll progress bar
      gsap.fromTo('.sp-progress', { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      })

      // Hero: título por caracteres + badge + sub
      gsap.fromTo('.sp-hero-badge', { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.15 })
      gsap.fromTo('.sp-char', { yPercent: 120, opacity: 0, rotationX: -60 }, {
        yPercent: 0, opacity: 1, rotationX: 0,
        duration: prefersReduced ? 0.3 : 0.9,
        stagger: prefersReduced ? 0 : 0.035,
        ease: 'power4.out', delay: 0.3,
        transformPerspective: 600,
      })
      gsap.fromTo('.sp-hero-sub', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 })
      gsap.fromTo('.sp-phone-card', { opacity: 0, y: 34, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: 1 })

      // Reveals en cascada al hacer scroll
      const batches: Array<[string, Record<string, number>]> = [
        ['.section-hdr', { opacity: 0, x: -16 }],
        ['.sp-channel', { opacity: 0, y: 22, rotationX: -10 }],
        ['.sp-stat', { opacity: 0, y: 18 }],
        ['.sp-faq', { opacity: 0, y: 16 }],
        ['.sp-cta', { opacity: 0, y: 26, scale: 0.97 }],
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

  // ── Buttery smooth scroll (Lenis, synced with ScrollTrigger) ──
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

  const title = 'SOPORTE'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @keyframes sp-pulse{0%,100%{opacity:1;box-shadow:0 0 8px #00e5a0}55%{opacity:0.3;box-shadow:none}}
        @keyframes sp-ring{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.9);opacity:0}}
        .sp-progress{position:fixed;top:0;left:0;right:0;height:2px;z-index:100000;transform-origin:0% 50%;
          background:linear-gradient(90deg,#ff6b35,#ffd700,#ff006e);pointer-events:none}
        .tilt-card{transform-style:preserve-3d;will-change:transform}
        .support-hero-scene{position:absolute;inset:-8% 0 auto 0;height:130%;z-index:0;pointer-events:none;opacity:.85}
        .support-hero-scene canvas{display:block}
        .aurora-field{position:fixed;inset:0;z-index:0;pointer-events:none}
        .aurora-field canvas{display:block}
        .sp-char{display:inline-block;will-change:transform}
        .sp-call-ring{position:absolute;inset:0;border-radius:9999px;border:1px solid rgba(255,107,53,.6);animation:sp-ring 2s ease-out infinite}
        .glare-card{position:relative;overflow:hidden}
        .glare-card::before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:2;
          background:radial-gradient(320px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,0.08),transparent 55%);
          opacity:0;transition:opacity .3s}
        .glare-card:hover::before{opacity:1}
        .shine::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:3;
          background:linear-gradient(115deg,transparent 32%,rgba(255,255,255,0.05) 46%,transparent 60%);
          transform:translateX(-130%);transition:transform .9s ease}
        .shine:hover::after{transform:translateX(130%)}
        .card-depth{transform:translateZ(26px)}
        .card-depth-sm{transform:translateZ(14px)}
        @media (prefers-reduced-motion: reduce){.tilt-card{transform:none !important}.sp-call-ring{animation:none}}
      `}</style>

      <div ref={containerRef} className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(135deg,#08040c 0%,#120818 50%,#08040c 100%)', fontFamily: F_MONO }}>

        {/* Barra de progreso de scroll */}
        <div className="sp-progress" />

        {/* Fondo 3D interactivo (olas de partículas · GPU, reacciona al scroll y al puntero) */}
        <AuroraField colorA="#ff006e" colorB="#ff6b35" colorC="#ffd700" opacity={0.55} />

        {/* Orbes de luz */}
        <div className="fixed pointer-events-none rounded-full"
          style={{ width: 600, height: 600, top: '-10%', right: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(255,107,53,0.12) 0%,transparent 70%)', filter: 'blur(60px)' }} />
        <div className="fixed pointer-events-none rounded-full"
          style={{ width: 500, height: 500, bottom: '5%', left: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(255,0,110,0.1) 0%,transparent 70%)', filter: 'blur(70px)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-24">

          {/* ── HERO ── */}
          <section className="relative text-center min-h-[70vh] flex flex-col items-center justify-center">
            <SupportScene />
            <div className="relative z-10 flex flex-col items-center">
              <div className="sp-hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
                style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}>
                <span style={{ color: '#ff6b35', fontSize: '0.7rem' }}>◎</span>
                <span className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: 'rgba(255,120,70,0.7)', fontFamily: F_MONO, letterSpacing: '0.25em', fontSize: '0.62rem' }}>
                  Centro de ayuda · El Salvador
                </span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e5a0',
                  boxShadow: '0 0 8px #00e5a0', display: 'inline-block', animation: 'sp-pulse 2.2s infinite' }} />
              </div>

              <h1 className="font-black uppercase leading-none mb-5"
                style={{ fontFamily: F_BE, fontSize: 'clamp(4rem, 14vw, 9.5rem)', letterSpacing: '0.04em' }}>
                {title.split('').map((c, i) => (
                  <span key={i} className="sp-char"
                    style={{
                      backgroundImage: 'linear-gradient(90deg,#FF006E,#FF6B00,#FFD700)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      color: '#FF6B00',
                    }}>
                    {c}
                  </span>
                ))}
              </h1>

              <p className="sp-hero-sub max-w-xl text-sm leading-relaxed mb-10"
                style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_MONO, letterSpacing: '0.06em' }}>
                Humanos + IA a tu lado. Resolvemos cualquier problema con tu cuenta,
                tus headsets o los módulos VR del ecosistema ATHERNIX.
              </p>

              {/* ── Tarjeta de contacto principal ── */}
              <div ref={phoneCardRef} className="sp-phone-card tilt-card glare-card shine relative w-full max-w-xl p-8 rounded-3xl border"
                style={{ background: 'rgba(14,6,18,0.92)', borderColor: 'rgba(255,107,53,0.28)',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.55), 0 0 40px rgba(255,107,53,0.08)' }}
                onMouseMove={e => tiltMove(e, phoneCardRef, -2, 7)}
                onMouseLeave={() => tiltReset(phoneCardRef)}>
                <p className="text-xs font-bold tracking-widest uppercase mb-3 card-depth-sm"
                  style={{ color: 'rgba(255,120,70,0.6)', fontFamily: F_MONO, letterSpacing: '0.3em', fontSize: '0.58rem' }}>
                  LÍNEA DIRECTA · EL SALVADOR
                </p>
                {/* TODO: número provisional — reemplazar SUPPORT_PHONE al tener el real */}
                <p className="font-black mb-2 card-depth" style={{ fontFamily: F_BE, fontSize: 'clamp(2.2rem, 6vw, 3.4rem)', color: '#ede0d4', letterSpacing: '0.06em' }}>
                  {SUPPORT_PHONE}
                </p>
                <p className="text-xs mb-7 card-depth-sm" style={{ color: 'rgba(200,150,120,0.45)', fontFamily: F_MONO, fontSize: '0.6rem', letterSpacing: '0.2em' }}>
                  {SUPPORT_HOURS}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 card-depth-sm">
                  <a href={`tel:${SUPPORT_PHONE.replace(/[\s-]/g, '')}`}
                    className="relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase no-underline"
                    style={{ background: 'linear-gradient(90deg,#FF006E,#FF6B00)', color: '#fff',
                      fontFamily: F_MONO, letterSpacing: '0.2em', boxShadow: '0 8px 30px rgba(255,60,30,0.35)' }}
                    onMouseMove={e => magneticMove(e)}
                    onMouseLeave={e => magneticReset(e)}>
                    <span className="sp-call-ring" />
                    ◎ LLAMAR AHORA
                  </a>
                  <button onClick={copyPhone}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase cursor-pointer"
                    style={{ background: 'transparent', color: 'rgba(255,120,70,0.85)', border: '1px solid rgba(255,107,53,0.4)',
                      fontFamily: F_MONO, letterSpacing: '0.2em' }}
                    onMouseMove={e => magneticMove(e, 0.2)}
                    onMouseLeave={e => magneticReset(e)}>
                    ⧉ COPIAR NÚMERO
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── CANALES ── */}
          <section>
            <div className="section-hdr flex items-center gap-3 mb-8">
              <span style={{ color: '#ff6b35', fontSize: '1.1rem' }}>◈</span>
              <div>
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.22em', lineHeight: 1 }}>
                  CANALES DE ATENCIÓN
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_MONO, letterSpacing: '0.1em', fontSize: '0.6rem' }}>
                  ELIGE EL CAMINO MÁS RÁPIDO PARA TI
                </p>
              </div>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CHANNELS.map(ch => <ChannelCard key={ch.tag} ch={ch} />)}
            </div>
          </section>

          {/* ── STATS ── */}
          <section>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {STATS.map(s => <StatItem key={s.label} stat={s} />)}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section>
            <div className="section-hdr flex items-center gap-3 mb-8">
              <span style={{ color: '#ff6b35', fontSize: '1.1rem' }}>✦</span>
              <div>
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.22em', lineHeight: 1 }}>
                  PREGUNTAS FRECUENTES
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_MONO, letterSpacing: '0.1em', fontSize: '0.6rem' }}>
                  RESPUESTAS RÁPIDAS ANTES DE LLAMAR
                </p>
              </div>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }} />
            </div>
            <div className="flex flex-col gap-3 max-w-3xl mx-auto">
              {FAQS.map((faq, i) => (
                <FaqItem key={i} faq={faq} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
              ))}
            </div>
          </section>

          {/* ── CTA FINAL ── */}
          <section>
            <div className="sp-cta glare-card shine relative overflow-hidden text-center p-10 sm:p-14 rounded-3xl border"
              style={{ background: 'linear-gradient(135deg,rgba(255,0,110,0.08),rgba(255,107,0,0.08))', borderColor: 'rgba(255,107,53,0.25)' }}
              onMouseMove={e => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
                e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
              }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: 'rgba(255,120,70,0.6)', fontFamily: F_MONO, letterSpacing: '0.3em', fontSize: '0.58rem' }}>
                ¿AÚN NECESITAS AYUDA?
              </p>
              <h2 className="font-black uppercase mb-8" style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: 'clamp(1.6rem,4vw,2.6rem)', letterSpacing: '0.06em' }}>
                HABLEMOS AHORA MISMO
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/chatbot"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase no-underline"
                  style={{ background: 'linear-gradient(90deg,#FF6B00,#FFD700)', color: '#160a04',
                    fontFamily: F_MONO, letterSpacing: '0.2em', boxShadow: '0 8px 30px rgba(255,150,30,0.3)' }}
                  onMouseMove={e => magneticMove(e)}
                  onMouseLeave={e => magneticReset(e)}>
                  ◈ CHATEAR CON ATHERNIXITO
                </Link>
                <a href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase no-underline"
                  style={{ background: 'transparent', color: 'rgba(255,120,70,0.85)', border: '1px solid rgba(255,107,53,0.4)',
                    fontFamily: F_MONO, letterSpacing: '0.2em' }}
                  onMouseMove={e => magneticMove(e, 0.2)}
                  onMouseLeave={e => magneticReset(e)}>
                  ✉ ESCRIBIR CORREO
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
