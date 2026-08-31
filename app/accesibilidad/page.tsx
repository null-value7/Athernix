'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import toast from 'react-hot-toast'
import { ALargeSmall, Contrast, Zap, Link2, BookOpen, Box, RotateCcw, Accessibility } from 'lucide-react'

const AuroraField = dynamic(() => import('@/components/ui/AuroraField'), { ssr: false })

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ── Design tokens (estética módulos) ─────────────────────────────
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif"
const F_MONO = "'Plus Jakarta Sans', monospace"

// ── Estado de accesibilidad ──────────────────────────────────────
type A11yState = {
  textScale: 0 | 1 | 2
  contrast: boolean
  reduceMotion: boolean
  underline: boolean
  readable: boolean
  no3d: boolean
}
const DEFAULTS: A11yState = { textScale: 0, contrast: false, reduceMotion: false, underline: false, readable: false, no3d: false }

function applyA11y(s: A11yState) {
  const el = document.documentElement
  el.classList.toggle('a11y-text-lg', s.textScale === 1)
  el.classList.toggle('a11y-text-xl', s.textScale === 2)
  el.classList.toggle('a11y-contrast', s.contrast)
  el.classList.toggle('a11y-reduce-motion', s.reduceMotion)
  el.classList.toggle('a11y-underline', s.underline)
  el.classList.toggle('a11y-readable', s.readable)
  el.classList.toggle('a11y-no3d', s.no3d)
  localStorage.setItem('atx-a11y', JSON.stringify(s))
  window.dispatchEvent(new Event('atx-a11y-changed'))
}

// ── Helpers 3D (tilt + glare + magnetic) ─────────────────────────
function magneticMove(e: React.MouseEvent<HTMLElement>, strength = 0.3) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) * strength
  const y = (e.clientY - rect.top - rect.height / 2) * strength
  gsap.to(e.currentTarget, { x, y, duration: 0.3, ease: 'power2.out' })
}
function magneticReset(e: React.MouseEvent<HTMLElement>) {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' })
}
function tiltGlareMove(e: React.MouseEvent<HTMLElement>, ref: React.RefObject<HTMLElement | null>, lift = -4, max = 10) {
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

// ── Interruptor 3D ───────────────────────────────────────────────
function Toggle({ on, color }: { on: boolean; color: string }) {
  return (
    <span className="a11y-switch" aria-hidden="true"
      style={{
        background: on ? `${color}28` : 'rgba(255,255,255,0.06)',
        borderColor: on ? `${color}88` : 'rgba(255,255,255,0.14)',
        boxShadow: on ? `0 0 18px ${color}35, inset 0 0 8px ${color}20` : 'none',
      }}>
      <span className="a11y-knob"
        style={{
          transform: on ? 'translateX(22px)' : 'translateX(0)',
          background: on ? color : 'rgba(255,255,255,0.35)',
          boxShadow: on ? `0 0 12px ${color}` : 'none',
        }} />
    </span>
  )
}

// ── Opciones (toggles) ───────────────────────────────────────────
const TOGGLES: Array<{ key: keyof Omit<A11yState, 'textScale'>; Icon: typeof Contrast; title: string; desc: string; color: string }> = [
  { key: 'contrast', Icon: Contrast, title: 'ALTO CONTRASTE', desc: 'Refuerza el contraste de colores de toda la plataforma para una lectura más clara.', color: '#ffd700' },
  { key: 'reduceMotion', Icon: Zap, title: 'REDUCIR ANIMACIONES', desc: 'Minimiza transiciones y efectos animados si el movimiento te resulta incómodo.', color: '#ff6b35' },
  { key: 'underline', Icon: Link2, title: 'SUBRAYAR ENLACES', desc: 'Muestra todos los enlaces subrayados para identificarlos sin depender del color.', color: '#00e5a0' },
  { key: 'readable', Icon: BookOpen, title: 'LECTURA CÓMODA', desc: 'Aumenta el espaciado entre letras, palabras y líneas para facilitar la lectura.', color: '#a855f7' },
  { key: 'no3d', Icon: Box, title: 'DESACTIVAR FONDOS 3D', desc: 'Apaga los fondos y escenas 3D para máximo rendimiento y menos distracción.', color: '#ff006e' },
]

const TEXT_SIZES: Array<{ value: A11yState['textScale']; label: string; sample: string }> = [
  { value: 0, label: 'NORMAL', sample: 'A' },
  { value: 1, label: 'GRANDE', sample: 'A' },
  { value: 2, label: 'EXTRA', sample: 'A' },
]

// ── Tarjeta de toggle ────────────────────────────────────────────
function ToggleCard({ opt, on, onToggle }: { opt: (typeof TOGGLES)[number]; on: boolean; onToggle: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  const { Icon } = opt
  return (
    <button ref={ref} onClick={onToggle} aria-pressed={on}
      className="ac-card tilt-card glare-card shine relative flex flex-col gap-3 p-6 rounded-2xl border text-left cursor-pointer w-full"
      style={{
        background: on ? `linear-gradient(145deg, rgba(18,8,22,0.92), ${opt.color}0d)` : 'rgba(18,8,22,0.88)',
        borderColor: on ? `${opt.color}60` : 'rgba(180,60,40,0.18)',
        boxShadow: on ? `0 0 34px ${opt.color}1f` : 'none',
        fontFamily: F_MONO,
        transition: 'border-color .3s, box-shadow .3s, background .3s',
      }}
      onMouseMove={e => tiltGlareMove(e, ref)}
      onMouseLeave={() => tiltReset(ref)}>
      <div className="flex items-center justify-between card-depth">
        <span className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: `${opt.color}15`, border: `1px solid ${opt.color}40`, color: opt.color, boxShadow: on ? `0 0 16px ${opt.color}30` : 'none' }}>
          <Icon size={18} />
        </span>
        <Toggle on={on} color={opt.color} />
      </div>
      <h3 className="font-black tracking-widest uppercase m-0 card-depth-sm"
        style={{ fontFamily: F_BE, color: on ? opt.color : '#ede0d4', fontSize: '0.82rem', letterSpacing: '0.14em', transition: 'color .3s' }}>
        {opt.title}
      </h3>
      <p className="text-xs leading-relaxed m-0" style={{ color: 'rgba(200,150,120,0.52)', fontSize: '0.65rem' }}>
        {opt.desc}
      </p>
      <span className="mt-auto text-xs font-bold tracking-widest" style={{ color: on ? opt.color : 'rgba(200,150,120,0.35)', fontSize: '0.56rem', letterSpacing: '0.25em', transition: 'color .3s' }}>
        {on ? '● ACTIVADO' : '○ DESACTIVADO'}
      </span>
    </button>
  )
}

// ── Página ───────────────────────────────────────────────────────
export default function AccesibilidadPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sizeCardRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<A11yState>(DEFAULTS)

  // Cargar preferencias guardadas
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('atx-a11y') || '{}')
      setState({ ...DEFAULTS, ...saved })
    } catch { /* usar defaults */ }
  }, [])

  const update = (patch: Partial<A11yState>) => {
    setState(prev => {
      const next = { ...prev, ...patch }
      applyA11y(next)
      return next
    })
  }

  const reset = () => {
    setState(DEFAULTS)
    applyA11y(DEFAULTS)
    toast.success('Preferencias restablecidas')
  }

  // ── Animaciones de entrada + scroll ────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      gsap.fromTo('.ac-progress', { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      })

      gsap.fromTo('.ac-hero-badge', { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.15 })
      gsap.fromTo('.ac-char', { yPercent: 120, opacity: 0, rotationX: -60 }, {
        yPercent: 0, opacity: 1, rotationX: 0,
        duration: prefersReduced ? 0.3 : 0.9,
        stagger: prefersReduced ? 0 : 0.03,
        ease: 'power4.out', delay: 0.3,
        transformPerspective: 600,
      })
      gsap.fromTo('.ac-hero-sub', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 })

      const batches: Array<[string, Record<string, number>]> = [
        ['.section-hdr', { opacity: 0, x: -16 }],
        ['.ac-size-card', { opacity: 0, y: 26, rotationX: -8 }],
        ['.ac-card', { opacity: 0, y: 22, rotationX: -10 }],
        ['.ac-preview', { opacity: 0, y: 24, scale: 0.97 }],
        ['.ac-footer-row', { opacity: 0, y: 20 }],
      ]
      batches.forEach(([selector, fromVars]) => {
        ScrollTrigger.batch(selector, {
          start: 'top 90%',
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

  const title = 'ACCESIBILIDAD'
  const activeCount = TOGGLES.filter(t => state[t.key]).length + (state.textScale > 0 ? 1 : 0)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @keyframes ac-pulse{0%,100%{opacity:1;box-shadow:0 0 8px #00e5a0}55%{opacity:0.3;box-shadow:none}}
        .ac-progress{position:fixed;top:0;left:0;right:0;height:2px;z-index:100000;transform-origin:0% 50%;
          background:linear-gradient(90deg,#00e5a0,#ffd700,#ff6b35);pointer-events:none}
        .tilt-card{transform-style:preserve-3d;will-change:transform}
        .aurora-field{position:fixed;inset:0;z-index:0;pointer-events:none}
        .aurora-field canvas{display:block}
        .ac-char{display:inline-block;will-change:transform}
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
        .a11y-switch{width:50px;height:28px;border-radius:9999px;border:1px solid;display:inline-flex;align-items:center;
          padding:3px;flex-shrink:0;transition:background .3s,border-color .3s,box-shadow .3s}
        .a11y-knob{width:20px;height:20px;border-radius:50%;transition:transform .35s cubic-bezier(.34,1.56,.64,1),background .3s,box-shadow .3s}
        @media (prefers-reduced-motion: reduce){.tilt-card{transform:none !important}}
      `}</style>

      <div ref={containerRef} className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(135deg,#08040c 0%,#0a1410 50%,#08040c 100%)', fontFamily: F_MONO }}>

        {/* Barra de progreso de scroll */}
        <div className="ac-progress" />

        {/* Fondo 3D interactivo (olas de partículas · GPU) */}
        <AuroraField colorA="#00e5a0" colorB="#ffd700" colorC="#ff6b35" opacity={0.5} />

        {/* Orbes de luz */}
        <div className="fixed pointer-events-none rounded-full"
          style={{ width: 600, height: 600, top: '-12%', right: '-10%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(0,229,160,0.1) 0%,transparent 70%)', filter: 'blur(70px)' }} />
        <div className="fixed pointer-events-none rounded-full"
          style={{ width: 480, height: 480, bottom: '4%', left: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(255,107,53,0.09) 0%,transparent 70%)', filter: 'blur(60px)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-20">

          {/* ── HERO ── */}
          <section className="relative text-center min-h-[52vh] flex flex-col items-center justify-center">
            <div className="ac-hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
              style={{ background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.25)' }}>
              <Accessibility size={12} color="#00e5a0" />
              <span className="text-xs font-bold tracking-widest uppercase"
                style={{ color: 'rgba(120,255,200,0.75)', fontFamily: F_MONO, letterSpacing: '0.25em', fontSize: '0.62rem' }}>
                Una experiencia para todos
              </span>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e5a0',
                boxShadow: '0 0 8px #00e5a0', display: 'inline-block', animation: 'ac-pulse 2.2s infinite' }} />
            </div>

            <h1 className="font-black uppercase leading-none mb-5"
              style={{ fontFamily: F_BE, fontSize: 'clamp(2.6rem, 9vw, 6.5rem)', letterSpacing: '0.04em',
                background: 'linear-gradient(90deg,#00e5a0,#FFD700,#FF6B00)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {title.split('').map((c, i) => <span key={i} className="ac-char">{c}</span>)}
            </h1>

            <p className="ac-hero-sub max-w-xl text-sm leading-relaxed"
              style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_MONO, letterSpacing: '0.06em' }}>
              Ajusta la plataforma a tu manera de ver, leer y navegar.
              Los cambios se aplican al instante en todo ATHERNIX y se recuerdan en este dispositivo.
            </p>
          </section>

          {/* ── TAMAÑO DE TEXTO ── */}
          <section>
            <div className="section-hdr flex items-center gap-3 mb-8">
              <span style={{ color: '#00e5a0', fontSize: '1.1rem' }}>◈</span>
              <div>
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.22em', lineHeight: 1 }}>
                  TAMAÑO DEL TEXTO
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_MONO, letterSpacing: '0.1em', fontSize: '0.6rem' }}>
                  ESCALA TODA LA TIPOGRAFÍA DE LA PLATAFORMA
                </p>
              </div>
              <div className="flex-1 h-px" style={{ background: 'rgba(0,229,160,0.18)' }} />
            </div>

            <div ref={sizeCardRef} className="ac-size-card tilt-card glare-card shine p-7 rounded-3xl border max-w-3xl mx-auto"
              style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(0,229,160,0.22)' }}
              onMouseMove={e => tiltGlareMove(e, sizeCardRef, -2, 5)}
              onMouseLeave={() => tiltReset(sizeCardRef)}>
              <div className="flex items-center gap-3 mb-6 card-depth-sm">
                <span className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(0,229,160,0.12)', border: '1px solid rgba(0,229,160,0.35)', color: '#00e5a0' }}>
                  <ALargeSmall size={18} />
                </span>
                <p className="text-xs m-0" style={{ color: 'rgba(200,150,120,0.5)', fontSize: '0.64rem' }}>
                  Elige el tamaño con el que te sientas más cómodo. Se aplica a títulos, párrafos y botones.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 card-depth">
                {TEXT_SIZES.map((ts, i) => {
                  const active = state.textScale === ts.value
                  return (
                    <button key={ts.value} onClick={() => update({ textScale: ts.value })}
                      className="flex flex-col items-center gap-1.5 py-5 rounded-2xl cursor-pointer"
                      style={{
                        background: active ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.03)',
                        border: active ? '1px solid rgba(0,229,160,0.6)' : '1px solid rgba(255,255,255,0.08)',
                        boxShadow: active ? '0 0 24px rgba(0,229,160,0.18)' : 'none',
                        transition: 'all .3s',
                      }}
                      onMouseMove={e => magneticMove(e, 0.12)}
                      onMouseLeave={e => magneticReset(e)}>
                      <span className="font-black" style={{ fontFamily: F_BE, color: active ? '#00e5a0' : 'rgba(255,255,255,0.5)', fontSize: `${1 + i * 0.5}rem`, lineHeight: 1 }}>
                        {ts.sample}
                      </span>
                      <span className="text-xs font-bold tracking-widest" style={{ color: active ? '#00e5a0' : 'rgba(200,150,120,0.4)', fontFamily: F_MONO, fontSize: '0.56rem', letterSpacing: '0.22em' }}>
                        {ts.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </section>

          {/* ── OPCIONES ── */}
          <section>
            <div className="section-hdr flex items-center gap-3 mb-8">
              <span style={{ color: '#ffd700', fontSize: '1.1rem' }}>✦</span>
              <div>
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.22em', lineHeight: 1 }}>
                  OPCIONES DE ACCESIBILIDAD
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_MONO, letterSpacing: '0.1em', fontSize: '0.6rem' }}>
                  {activeCount} ACTIVAS · SE GUARDAN AUTOMÁTICAMENTE
                </p>
              </div>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,215,0,0.15)' }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TOGGLES.map(opt => (
                <ToggleCard key={opt.key} opt={opt} on={state[opt.key]} onToggle={() => update({ [opt.key]: !state[opt.key] } as Partial<A11yState>)} />
              ))}
            </div>
          </section>

          {/* ── VISTA PREVIA ── */}
          <section>
            <div ref={previewRef} className="ac-preview tilt-card glare-card p-8 rounded-3xl border max-w-3xl mx-auto"
              style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(180,60,40,0.2)' }}
              onMouseMove={e => tiltGlareMove(e, previewRef, -2, 4)}
              onMouseLeave={() => tiltReset(previewRef)}>
              <p className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: 'rgba(0,229,160,0.6)', fontFamily: F_MONO, letterSpacing: '0.3em', fontSize: '0.56rem' }}>
                VISTA PREVIA EN VIVO
              </p>
              <h3 className="font-black uppercase mb-3" style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '1.4rem', letterSpacing: '0.05em' }}>
                Así se ve ATHERNIX con tus ajustes
              </h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_MONO }}>
                La realidad virtual conecta la historia, la mente y la tecnología en una sola
                experiencia. Este párrafo refleja tu tamaño de texto, contraste y espaciado actuales.
              </p>
              <Link href="/soporte" className="text-sm font-bold" style={{ color: '#ff6b35', fontFamily: F_MONO }}>
                Este es un enlace de ejemplo →
              </Link>
            </div>
          </section>

          {/* ── RESET + NOTA ── */}
          <section>
            <div className="ac-footer-row flex flex-col items-center gap-5 text-center">
              <button onClick={reset}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase cursor-pointer"
                style={{ background: 'transparent', color: 'rgba(120,255,200,0.85)', border: '1px solid rgba(0,229,160,0.4)',
                  fontFamily: F_MONO, letterSpacing: '0.2em' }}
                onMouseMove={e => magneticMove(e, 0.2)}
                onMouseLeave={e => magneticReset(e)}>
                <RotateCcw size={13} />
                RESTABLECER TODO
              </button>
              <p className="text-xs max-w-md" style={{ color: 'rgba(200,150,120,0.35)', fontFamily: F_MONO, fontSize: '0.58rem', letterSpacing: '0.15em', lineHeight: 1.8 }}>
                TUS PREFERENCIAS SE GUARDAN SOLO EN ESTE DISPOSITIVO.
                ¿NECESITAS MÁS AYUDA? VISITA <Link href="/soporte" style={{ color: '#ff6b35' }}>SOPORTE</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
