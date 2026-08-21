// view/AboutView.tsx
'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useAboutController } from '@/controllers/information/aboutus'
import type {
  CoreValue, Module, Milestone,
  RoleCard, StatFact, FutureVision,
} from '@/models/aboutus'

const AboutHeroScene = dynamic(() => import('@/components/about/AboutHeroScene'), { ssr: false })
const AboutAmbientField = dynamic(() => import('@/components/about/AboutAmbientField'), { ssr: false })

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

// ── Magnetic button helper (award-winning cursor-follow effect) ─
function magneticMove(e: React.MouseEvent<HTMLElement>, strength = 0.3) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) * strength
  const y = (e.clientY - rect.top - rect.height / 2) * strength
  gsap.to(e.currentTarget, { x, y, duration: 0.3, ease: 'power2.out' })
}
function magneticReset(e: React.MouseEvent<HTMLElement>) {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' })
}
// ── 3D pointer-tilt helper ───────────────────────────────────────
function tiltMove(e: React.MouseEvent<HTMLElement>, ref: React.RefObject<HTMLElement | null>, lift = -4, max = 12) {
  const rect = e.currentTarget.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width - 0.5
  const py = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(ref.current, { y: lift, rotationY: px * max, rotationX: -py * max, transformPerspective: 700, duration: 0.35, ease: 'power2.out' })
}
function tiltReset(ref: React.RefObject<HTMLElement | null>) {
  gsap.to(ref.current, { y: 0, rotationX: 0, rotationY: 0, duration: 0.45, ease: 'power2.out' })
}

// ── Design tokens (estética módulos) ────────────────────────
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif"
const F_MONO = "'Plus Jakarta Sans', monospace"

// ── Icons ───────────────────────────────────────────────────────
const IconArrow    = () => <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>
const IconChevron  = ({ open }: { open: boolean }) => <svg className="w-4 h-4 transition-transform duration-300" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>
const IconBot      = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"/></svg>
const IconStar     = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/></svg>

// ── Section header (reused) ─────────────────────────────────────
function SectionHeader({ icon, title, sub }: { icon: string; title: string; sub?: string }) {
  return (
    <div className="section-hdr flex items-center gap-3 mb-8">
      <span style={{ color: '#ff6b35', fontSize: '1.1rem' }}>{icon}</span>
      <div>
        <h2 className="font-black tracking-widest uppercase"
          style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.22em', lineHeight: 1 }}>
          {title}
        </h2>
        {sub && <p className="text-xs mt-0.5" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_MONO, letterSpacing: '0.1em', fontSize: '0.6rem' }}>{sub}</p>}
      </div>
      <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }}/>
    </div>
  )
}

// ── Stat fact ────────────────────────────────────────────────────
function StatItem({ stat }: { stat: StatFact }) {
  const ref = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = valueRef.current
    if (!el) return
    const match = stat.value.match(/^(-?\d+(?:\.\d+)?)(.*)$/)
    const ctx = gsap.context(() => {
      if (match) {
        const target = parseFloat(match[1])
        const suffix = match[2]
        const counter = { val: 0 }
        gsap.to(counter, {
          val: target, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: () => { el.textContent = `${Math.round(counter.val * 10) / 10}${suffix}` },
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
    <div ref={ref} className="about-stat tilt-card flex flex-col items-center gap-1.5 p-5 rounded-2xl border"
      style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(180,60,40,0.18)' }}
      onMouseMove={e => tiltMove(e, ref)}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${stat.color}55`
        e.currentTarget.style.boxShadow   = `0 0 24px ${stat.color}25`
      }}
      onMouseLeave={e => {
        tiltReset(ref)
        e.currentTarget.style.borderColor = 'rgba(180,60,40,0.18)'
        e.currentTarget.style.boxShadow   = 'none'
      }}>
      <span ref={valueRef} className="text-2xl font-black" style={{ fontFamily: F_BE, color: stat.color, letterSpacing: '-0.02em' }}>{stat.value}</span>
      <span className="text-xs text-center tracking-wider uppercase" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: F_MONO, fontSize: '0.6rem', letterSpacing: '0.15em' }}>{stat.label}</span>
    </div>
  )
}

// ── Core value card ──────────────────────────────────────────────
function ValueCard({ val }: { val: CoreValue }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="value-card tilt-card p-5 rounded-2xl border transition-all duration-300"
      style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(180,60,40,0.18)' }}
      onMouseMove={e => tiltMove(e, ref)}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${val.color}55`
        e.currentTarget.style.boxShadow   = `0 0 20px ${val.color}20`
      }}
      onMouseLeave={e => {
        tiltReset(ref)
        e.currentTarget.style.borderColor = 'rgba(180,60,40,0.18)'
        e.currentTarget.style.boxShadow   = 'none'
      }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
        style={{ background: `${val.color}18`, border: `1px solid ${val.color}40`, color: val.color }}>
        {val.icon}
      </div>
      <h4 className="font-black text-sm mb-2" style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.06em' }}>
        {val.title}
      </h4>
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_MONO, lineHeight: 1.7 }}>
        {val.desc}
      </p>
    </div>
  )
}

// ── Module card ──────────────────────────────────────────────────
function ModuleCard({ mod, isActive, onToggle }: { mod: Module; isActive: boolean; onToggle: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const statusColors: Record<Module['status'], string> = {
    'activo':          '#00e5a0',
    'en desarrollo':   '#ffaa00',
    'próximamente':    '#a855f7',
  }
  return (
    <div ref={ref} className="module-card rounded-2xl overflow-hidden border transition-all duration-300"
      style={{ background: 'rgba(18,8,22,0.88)', borderColor: isActive ? `${mod.color}45` : 'rgba(180,60,40,0.18)',
        boxShadow: isActive ? `0 0 30px ${mod.glow}` : 'none' }}>
      <button onClick={() => onToggle(mod.id)}
        className="w-full flex items-center gap-4 p-5 text-left"
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: `${mod.color}18`, border: `1px solid ${mod.color}40`, color: mod.color,
            filter: isActive ? `drop-shadow(0 0 8px ${mod.color})` : 'none' }}>
          {mod.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-xs tracking-widest uppercase" style={{ color: `${mod.color}cc`, fontFamily: F_MONO, fontSize: '0.58rem', letterSpacing: '0.18em' }}>
              {mod.tag}
            </p>
            <span className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{ background: `${statusColors[mod.status]}18`, border: `1px solid ${statusColors[mod.status]}45`,
                color: statusColors[mod.status], fontFamily: F_MONO, fontSize: '0.52rem', letterSpacing: '0.12em' }}>
              {mod.status.toUpperCase()}
            </span>
          </div>
          <h3 className="font-black text-sm" style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.8rem', letterSpacing: '0.06em' }}>
            {mod.title}
          </h3>
          <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_MONO }}>{mod.tagline}</p>
        </div>
        <div style={{ color: `${mod.color}70`, flexShrink: 0 }}><IconChevron open={isActive} /></div>
      </button>
      {isActive && (
        <div className="px-5 pb-5">
          <div className="h-px mb-4" style={{ background: `linear-gradient(90deg,transparent,${mod.color}40,transparent)` }}/>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,160,140,0.75)', fontFamily: F_MONO, lineHeight: 1.75 }}>
            {mod.desc}
          </p>
        </div>
      )}
    </div>
  )
}

// ── Milestone ────────────────────────────────────────────────────
function MilestoneItem({ m, index, isActive, onHover }: {
  m: Milestone; index: number; isActive: boolean; onHover: (i: number | null) => void
}) {
  return (
    <div className="milestone-item flex gap-5 cursor-default"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}>
      {/* Year + line */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 56 }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300"
          style={{ fontFamily: F_BE, fontSize: '0.6rem', letterSpacing: '0.05em',
            background: isActive ? `${m.color}25` : 'rgba(255,255,255,0.03)',
            border: `2px solid ${isActive ? m.color : 'rgba(180,60,40,0.25)'}`,
            color: isActive ? m.color : 'rgba(200,150,120,0.5)',
            boxShadow: isActive ? `0 0 16px ${m.color}40` : 'none',
          }}>
          {m.year.replace('+', '')}
        </div>
        {index < 4 && (
          <div className="flex-1 w-px mt-2 transition-all duration-300"
            style={{ background: isActive ? m.color : 'rgba(180,60,40,0.18)', minHeight: 24 }}/>
        )}
      </div>
      {/* Content */}
      <div className="pb-8 flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-black text-sm transition-colors duration-300"
            style={{ fontFamily: F_BE, color: isActive ? m.color : '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.06em' }}>
            {m.title}
          </h4>
          {m.year.includes('+') && (
            <span className="text-xs px-1.5 py-0.5 rounded-full"
              style={{ background: `${m.color}18`, border: `1px solid ${m.color}40`, color: m.color,
                fontFamily: F_MONO, fontSize: '0.52rem' }}>
              PRÓXIMO
            </span>
          )}
        </div>
        <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_MONO, lineHeight: 1.75 }}>
          {m.desc}
        </p>
      </div>
    </div>
  )
}

// ── Role card ─────────────────────────────────────────────────────
function RoleCardItem({ r }: { r: RoleCard }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="role-card tilt-card p-5 rounded-2xl border transition-all duration-300"
      style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(180,60,40,0.18)' }}
      onMouseMove={e => tiltMove(e, ref)}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${r.color}55`
        e.currentTarget.style.boxShadow   = `0 0 20px ${r.color}20`
      }}
      onMouseLeave={e => {
        tiltReset(ref)
        e.currentTarget.style.borderColor = 'rgba(180,60,40,0.18)'
        e.currentTarget.style.boxShadow   = 'none'
      }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${r.color}18`, border: `1px solid ${r.color}40`, color: r.color }}>
          {r.icon}
        </div>
        <span className="font-black text-xs tracking-widest uppercase"
          style={{ fontFamily: F_BE, color: r.color, fontSize: '0.68rem', letterSpacing: '0.18em' }}>
          {r.label}
        </span>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_MONO, lineHeight: 1.75 }}>
        {r.desc}
      </p>
    </div>
  )
}

// ── Future vision card ────────────────────────────────────────────
function VisionCard({ v }: { v: FutureVision }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="vision-card tilt-card p-5 rounded-2xl border transition-all duration-300"
      style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(180,60,40,0.18)' }}
      onMouseMove={e => tiltMove(e, ref)}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${v.color}55`
        e.currentTarget.style.boxShadow   = `0 0 20px ${v.color}20`
      }}
      onMouseLeave={e => {
        tiltReset(ref)
        e.currentTarget.style.borderColor = 'rgba(180,60,40,0.18)'
        e.currentTarget.style.boxShadow   = 'none'
      }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
        style={{ background: `${v.color}18`, border: `1px solid ${v.color}40`, color: v.color }}>
        {v.icon}
      </div>
      <h4 className="font-black text-sm mb-2" style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.7rem', letterSpacing: '0.06em' }}>
        {v.title}
      </h4>
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_MONO, lineHeight: 1.75 }}>
        {v.desc}
      </p>
    </div>
  )
}

// ── Main view ──────────────────────────────────────────────────────
export default function AboutView() {
  const {
    state, brand, values, modules, milestones,
    roles, stats, futureVisions, ather,
    toggleModule, setActiveMilestone, goToChat, goToZonaDesarrollo,
  } = useAboutController()

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      gsap.to('.orb-ab1', { scale: 1.2, opacity: 0.45, duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.orb-ab2', { scale: 1.15, opacity: 0.3, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })
      gsap.to('.orb-ab3', { scale: 1.1, opacity: 0.25, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3.5 })

      // Scroll progress bar
      gsap.set('.about-progress-bar', { scaleX: 0 })
      gsap.to('.about-progress-bar', {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      })

      if (!prefersReduced) {
        // Ambient orb parallax depth
        gsap.to('.orb-ab2', { y: -140, ease: 'none', scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 1 } })
        gsap.to('.orb-ab3', { y: 180, ease: 'none', scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 1 } })
      }

      // ── Hero entrance ──
      const titleEl = containerRef.current?.querySelector('.hero-title') ?? null
      let split: SplitText | null = null
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero-badge', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.5 })

      if (titleEl && !prefersReduced) {
        split = new SplitText(titleEl, { type: 'chars' })
        tl.fromTo(split.chars,
          { opacity: 0, yPercent: 120, rotationX: -80 },
          { opacity: 1, yPercent: 0, rotationX: 0, duration: 0.9, stagger: 0.02, ease: 'back.out(1.7)' },
          '-=0.2')
      } else {
        tl.fromTo('.hero-title', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.2')
      }

      tl.fromTo('.hero-mission', { opacity: 0 },             { opacity: 1, duration: 0.6 },              '-=0.3')
        .fromTo('.hero-cmd',     { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 },    '-=0.2')
        .fromTo('.hero-cta',     { opacity: 0, y: 10 },       { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 }, '-=0.1')
        .fromTo('.about-stat',   { opacity: 0, y: 20 },       { opacity: 1, y: 0, stagger: 0.07, duration: 0.4 }, '-=0.1')

      // ── Scroll-triggered cascading reveals for everything below the fold ──
      const batches: Array<[string, Record<string, number>]> = [
        ['.section-hdr',    { opacity: 0, x: -16 }],
        ['.mv-box',         { opacity: 0, y: 26 }],
        ['.value-card',     { opacity: 0, y: 22, rotationX: -10 }],
        ['.module-card',    { opacity: 0, y: 18 }],
        ['.milestone-item', { opacity: 0, x: -18 }],
        ['.role-card',      { opacity: 0, y: 18, rotationX: -10 }],
        ['.ather-panel',    { opacity: 0, y: 26, scale: 0.97 }],
        ['.vision-card',    { opacity: 0, y: 18, rotationX: -10 }],
        ['.closing-cta',    { opacity: 0, y: 26, scale: 0.97 }],
        ['.footer-stamp',   { opacity: 0 }],
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

      return () => { split?.revert() }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // ── Award-winning buttery smooth scroll (Lenis, synced with ScrollTrigger) ──
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
        .line-clamp-1{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
        @keyframes ab-pulse{0%,100%{opacity:1;box-shadow:0 0 8px #00e5a0}55%{opacity:0.3;box-shadow:none}}
        .about-progress-bar{position:fixed;top:0;left:0;right:0;height:2px;z-index:100000;transform-origin:0% 50%;
          background:linear-gradient(90deg,#ff6b35,#a855f7,#ff3060);pointer-events:none}
        .tilt-card{transform-style:preserve-3d;will-change:transform}
        .about-hero-scene{position:absolute;inset:0;z-index:0;pointer-events:none}
        .about-hero-scene canvas{display:block}
        .about-ambient-field{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:0.6}
        .about-ambient-field canvas{display:block}
        .hero-title{opacity:1}
        .hero-title .char{display:inline-block;will-change:transform}
        @media (prefers-reduced-motion: reduce){.tilt-card{transform:none !important}}
      `}</style>

      <div ref={containerRef} className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(135deg,#08040c 0%,#120818 50%,#08040c 100%)', fontFamily: F_MONO }}>

        {/* Scroll progress indicator */}
        <div className="about-progress-bar" />

        {/* Page-wide moving 3D backdrop */}
        <AboutAmbientField />

        {/* Ambient orbs */}
        <div className="orb-ab1 fixed pointer-events-none rounded-full"
          style={{ width: 600, height: 600, top: '-10%', right: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(180,30,30,0.15) 0%,transparent 70%)', filter: 'blur(60px)' }}/>
        <div className="orb-ab2 fixed pointer-events-none rounded-full"
          style={{ width: 500, height: 500, bottom: '10%', left: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(130,40,200,0.12) 0%,transparent 70%)', filter: 'blur(70px)' }}/>
        <div className="orb-ab3 fixed pointer-events-none rounded-full"
          style={{ width: 350, height: 350, top: '40%', left: '35%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(255,107,53,0.07) 0%,transparent 70%)', filter: 'blur(50px)' }}/>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-20">

          {/* ── HERO ── */}
          <section className="relative text-center">
            <AboutHeroScene />
            <div className="relative z-10">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}>
              <span style={{ color: '#ff6b35', fontSize: '0.7rem' }}>◈</span>
              <span className="text-xs font-bold tracking-widest uppercase"
                style={{ color: 'rgba(255,120,70,0.7)', fontFamily: F_MONO, letterSpacing: '0.25em', fontSize: '0.62rem' }}>
                El Salvador · Desde 2023
              </span>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e5a0',
                boxShadow: '0 0 8px #00e5a0', display: 'inline-block', animation: 'ab-pulse 2.2s infinite' }}/>
            </div>

            {/* Title */}
            <h1 className="hero-title font-black leading-none mb-5"
              style={{ fontFamily: F_BE, fontSize: 'clamp(2.2rem, 6vw, 4rem)', letterSpacing: '-0.02em' }}>
              <span style={{ background: 'linear-gradient(90deg,#ff6b35,#f7c59f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ACERCA{' '}
              </span>
              <span style={{ background: 'linear-gradient(90deg,#f7c59f,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                DE{' '}
              </span>
              <span style={{ background: 'linear-gradient(90deg,#a855f7,#ff3060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ATHERNIX
              </span>
            </h1>

            {/* Mission */}
            <p className="hero-mission text-base max-w-2xl mx-auto mb-4 leading-relaxed"
              style={{ color: 'rgba(200,160,140,0.7)', fontFamily: F_MONO, letterSpacing: '0.03em', lineHeight: 1.8 }}>
              {brand.mission}
            </p>

            {/* Philosophy quote */}
            <div className="hero-cmd inline-flex items-center gap-3 px-5 py-2.5 rounded-xl mx-auto mb-8"
              style={{ background: 'rgba(8,4,14,0.9)', border: '1px solid rgba(180,60,40,0.25)',
                fontFamily: F_MONO }}>
              <span style={{ color: '#ff6b35', fontSize: '0.8rem' }}>✦</span>
              <span style={{ color: 'rgba(200,160,140,0.75)', fontSize: '0.82rem', letterSpacing: '0.04em', fontStyle: 'italic' }}>
                "{brand.philosophy}"
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button onClick={goToChat}
                className="hero-cta flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs tracking-wider uppercase transition-all duration-200"
                style={{ background: 'linear-gradient(135deg,#ff4e50,#f7931e)', color: '#fff',
                  fontFamily: F_BE, fontSize: '0.65rem', letterSpacing: '0.15em', border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(255,100,50,0.3)' }}
                onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.04, duration: 0.2 })}
                onMouseMove={e => magneticMove(e, 0.3)}
                onMouseLeave={e => { gsap.to(e.currentTarget, { scale: 1, duration: 0.2 }); magneticReset(e) }}>
                <IconBot /> Hablar con Ather
              </button>
              <button onClick={goToZonaDesarrollo}
                className="hero-cta flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200"
                style={{ background: 'transparent', border: '1px solid rgba(255,107,53,0.35)',
                  color: 'rgba(255,120,70,0.85)', fontFamily: F_MONO, fontSize: '0.72rem',
                  letterSpacing: '0.12em', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,53,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,107,53,0.6)' }}
                onMouseMove={e => magneticMove(e, 0.3)}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,107,53,0.35)'; magneticReset(e) }}>
                Zona de Desarrollo <IconArrow />
              </button>
            </div>
            </div>
          </section>

          {/* ── STATS ── */}
          <section>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {stats.map(s => <StatItem key={s.label} stat={s}/>)}
            </div>
          </section>

          {/* ── MISIÓN + VISIÓN ── */}
          <section>
            <SectionHeader icon="◈" title="Misión y Visión" sub="Lo que somos · Lo que construimos"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'MISIÓN', text: brand.mission, color: '#ff6b35', icon: '◈' },
                { label: 'VISIÓN', text: brand.vision,  color: '#a855f7', icon: '◎' },
              ].map(item => (
                <div key={item.label} className="mv-box tilt-card p-6 rounded-2xl border"
                  style={{ background: 'rgba(18,8,22,0.88)', borderColor: `${item.color}35`,
                    borderLeft: `3px solid ${item.color}` }}
                  onMouseMove={e => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const px = (e.clientX - rect.left) / rect.width - 0.5
                    const py = (e.clientY - rect.top) / rect.height - 0.5
                    gsap.to(e.currentTarget, { y: -4, rotationY: px * 8, rotationX: -py * 8, transformPerspective: 700, duration: 0.35, ease: 'power2.out' })
                  }}
                  onMouseLeave={e => gsap.to(e.currentTarget, { y: 0, rotationX: 0, rotationY: 0, duration: 0.45, ease: 'power2.out' })}>
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ color: item.color }}>{item.icon}</span>
                    <span className="font-black text-xs tracking-widest uppercase"
                      style={{ fontFamily: F_BE, color: item.color, fontSize: '0.62rem', letterSpacing: '0.22em' }}>
                      {item.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,160,140,0.75)', fontFamily: F_MONO, lineHeight: 1.8 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CORE VALUES ── */}
          <section>
            <SectionHeader icon="⬡" title="Nuestros Principios" sub="Los valores que guían cada decisión"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {values.map(v => <ValueCard key={v.id} val={v}/>)}
            </div>
          </section>

          {/* ── MODULES + MILESTONES ── */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Modules */}
              <div className="lg:col-span-2">
                <SectionHeader icon="◎" title="Nuestros Módulos" sub="La plataforma en acción"/>
                <div className="flex flex-col gap-3">
                  {modules.map(m => (
                    <ModuleCard key={m.id} mod={m} isActive={state.activeModule === m.id} onToggle={toggleModule}/>
                  ))}
                </div>
              </div>
              {/* Timeline */}
              <div>
                <SectionHeader icon="△" title="Cronología" sub="Del inicio al futuro"/>
                <div className="flex flex-col">
                  {milestones.map((m, i) => (
                    <MilestoneItem key={m.year} m={m} index={i}
                      isActive={state.activeMilestone === i}
                      onHover={setActiveMilestone}/>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── ROLES ── */}
          <section>
            <SectionHeader icon="◆" title="Roles de la Plataforma" sub="Cada usuario, una experiencia única"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {roles.map(r => <RoleCardItem key={r.id} r={r}/>)}
            </div>
          </section>

          {/* ── ATHER PANEL ── */}
          <section>
            <SectionHeader icon="◈" title="Conoce a Ather" sub="El corazón inteligente de Athernix"/>
            <div className="ather-panel grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left — identity */}
              <div className="lg:col-span-2 p-6 rounded-2xl border flex flex-col gap-5"
                style={{ background: 'rgba(18,8,22,0.92)', borderColor: 'rgba(255,107,53,0.3)',
                  boxShadow: '0 0 40px rgba(255,107,53,0.08)' }}>
                {/* Avatar ring */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ border: '2px solid rgba(255,107,53,0.4)',
                      background: 'radial-gradient(circle,rgba(255,107,53,0.12),rgba(8,4,14,0.9))' }}>
                    <div className="absolute inset-2 rounded-full"
                      style={{ border: '1px solid rgba(168,85,247,0.25)' }}/>
                    <span style={{ fontFamily: F_BE, fontSize: '1.4rem', color: '#ff6b35',
                      filter: 'drop-shadow(0 0 12px #ff6b35)', position: 'relative', zIndex: 1 }}>A</span>
                  </div>
                  <div className="text-center">
                    <h3 className="font-black" style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.9rem', letterSpacing: '0.12em' }}>
                      {ather.name}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,107,53,0.6)', fontFamily: F_MONO, letterSpacing: '0.15em', fontSize: '0.6rem', textTransform: 'uppercase' }}>
                      {ather.species}
                    </p>
                  </div>
                </div>
                <div className="h-px" style={{ background: 'rgba(255,107,53,0.15)' }}/>
                {[
                  { label: 'ROL',     value: ather.role    },
                  { label: 'VERSIÓN', value: ather.version },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_MONO, fontSize: '0.58rem', letterSpacing: '0.18em' }}>{item.label}</span>
                    <span className="text-xs font-bold" style={{ color: '#ede0d4', fontFamily: F_MONO, letterSpacing: '0.08em' }}>{item.value}</span>
                  </div>
                ))}
                <button onClick={goToChat}
                  className="w-full py-2 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 mt-2"
                  style={{ background: 'linear-gradient(135deg,#ff4e50,#f7931e)', color: '#fff',
                    fontFamily: F_BE, fontSize: '0.62rem', letterSpacing: '0.15em', border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(255,100,50,0.3)' }}
                  onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2 })}
                  onMouseMove={e => magneticMove(e, 0.25)}
                  onMouseLeave={e => { gsap.to(e.currentTarget, { scale: 1, duration: 0.2 }); magneticReset(e) }}>
                  <IconBot /> INICIAR SESIÓN CON ATHER
                </button>
              </div>

              {/* Right — description + abilities */}
              <div className="lg:col-span-3 p-6 rounded-2xl border"
                style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(180,60,40,0.18)' }}>
                <p className="text-sm leading-relaxed mb-6"
                  style={{ color: 'rgba(200,160,140,0.75)', fontFamily: F_MONO, lineHeight: 1.85 }}>
                  {ather.desc}
                </p>
                <p className="text-xs tracking-widest uppercase mb-3"
                  style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_MONO, fontSize: '0.58rem', letterSpacing: '0.2em' }}>
                  Capacidades activas
                </p>
                <div className="flex flex-col gap-2">
                  {ather.abilities.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg"
                      style={{ background: 'rgba(255,107,53,0.04)', border: '1px solid rgba(255,107,53,0.12)' }}>
                      <span style={{ color: '#ff6b35', fontSize: '0.75rem' }}><IconStar /></span>
                      <span className="text-xs" style={{ color: 'rgba(200,160,140,0.75)', fontFamily: F_MONO, letterSpacing: '0.03em' }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── FUTURE VISIONS ── */}
          <section>
            <SectionHeader icon="⊕" title="Visión a Futuro" sub="Lo que viene para Athernix y Latinoamérica"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {futureVisions.map(v => <VisionCard key={v.title} v={v}/>)}
            </div>
          </section>

          {/* ── CLOSING CTA ── */}
          <section className="text-center">
            <div className="closing-cta inline-block px-8 py-8 rounded-2xl border"
              style={{ background: 'rgba(18,8,22,0.92)', borderColor: 'rgba(255,107,53,0.22)',
                boxShadow: '0 0 60px rgba(255,107,53,0.06)' }}>
              <p className="text-xs tracking-widest uppercase mb-3"
                style={{ color: 'rgba(255,120,70,0.5)', fontFamily: F_MONO, letterSpacing: '0.3em', fontSize: '0.6rem' }}>
                ✦ únete al viaje ✦
              </p>
              <h3 className="font-black mb-3"
                style={{ fontFamily: F_BE, fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
                  background: 'linear-gradient(90deg,#ff6b35,#f7c59f,#a855f7)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '0.04em' }}>
                El conocimiento no tiene fronteras
              </h3>
              <p className="text-sm mb-6 max-w-md mx-auto"
                style={{ color: 'rgba(200,160,140,0.6)', fontFamily: F_MONO, lineHeight: 1.8 }}>
                Athernix está construido para que cada persona — sin importar dónde esté — pueda aprender, explorar y crecer.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button onClick={goToChat}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs tracking-wider uppercase"
                  style={{ background: 'linear-gradient(135deg,#ff4e50,#f7931e)', color: '#fff',
                    fontFamily: F_BE, fontSize: '0.62rem', letterSpacing: '0.15em', border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(255,100,50,0.3)' }}
                  onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.04, duration: 0.2 })}
                  onMouseMove={e => magneticMove(e, 0.3)}
                  onMouseLeave={e => { gsap.to(e.currentTarget, { scale: 1, duration: 0.2 }); magneticReset(e) }}>
                  <IconBot /> Explorar con Ather
                </button>
                <button onClick={goToZonaDesarrollo}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase"
                  style={{ background: 'transparent', border: '1px solid rgba(255,107,53,0.35)',
                    color: 'rgba(255,120,70,0.85)', fontFamily: F_MONO, fontSize: '0.72rem',
                    letterSpacing: '0.12em', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,53,0.08)' }}
                  onMouseMove={e => magneticMove(e, 0.3)}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; magneticReset(e) }}>
                  Zona de Desarrollo <IconArrow />
                </button>
              </div>
            </div>
          </section>

          {/* Footer stamp */}
          <div className="footer-stamp text-center">
            <p className="text-xs tracking-widest uppercase"
              style={{ color: 'rgba(255,100,50,0.15)', fontFamily: F_MONO, letterSpacing: '0.4em' }}>
              ✦ athernix · el salvador · 2023–2027 · stem · xr · ia ✦
            </p>
          </div>

        </div>
      </div>
    </>
  )
}