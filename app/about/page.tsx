// view/AboutView.tsx – Overhaul Award‑Winning 3D Interactive (ULTRA v2 + HorizontalScroll fix)
'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAboutController } from '@/controllers/information/aboutus'
import ScrollReveal from '@/components/ui/ScrollReveal'
import TextSplitter from '@/components/ui/TextSplitter'
import MagneticElement from '@/components/ui/MagneticElement'
import ParallaxLayer from '@/components/ui/ParallaxLayer'
import AwardWinning3D from '@/components/ui/AwardWinning3D'
import LiquidGlassCard from '@/components/ui/LiquidGlassCard'
import type {
  CoreValue, Module, Milestone,
  RoleCard, StatFact, FutureVision,
} from '@/models/aboutus'

const LiquidGlassBackground = dynamic(() => import('@/components/ui/LiquidGlassBackground'), { ssr: false })

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ═══════════════════════════════════════════════════════════════
//  ULTRA INTERACTIVE ELEMENTS
// ═══════════════════════════════════════════════════════════════

// ── Cinematic Cursor (with enhanced trail + magnetic glow) ──
function CinematicCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const trails = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const dot = dotRef.current, ring = ringRef.current, glow = glowRef.current, tc = trailRef.current
    if (!dot || !ring || !glow || !tc) return

    for (let i = 0; i < 16; i++) {
      const t = document.createElement('div')
      t.style.cssText = `position:fixed;pointer-events:none;z-index:9999;width:${4 - i * 0.25}px;height:${4 - i * 0.25}px;border-radius:50%;background:rgba(255,107,53,${0.6 - i * 0.035});box-shadow:0 0 ${8 - i * 0.5}px rgba(255,107,53,0.8);top:0;left:0;transform:translate(-50%,-50%);opacity:0;`
      tc.appendChild(t)
      trails.current.push(t)
    }

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }
    const history: { x: number; y: number }[] = Array(16).fill({ ...pos })

    gsap.set([dot, ring, glow], { xPercent: -50, yPercent: -50 })
    gsap.set(glow, { opacity: 0.5, scale: 2.5 })

    const move = (e: MouseEvent) => { pos.x = e.clientX; pos.y = e.clientY }
    window.addEventListener('mousemove', move)

    const ticker = gsap.ticker.add(() => {
      ringPos.x += (pos.x - ringPos.x) * 0.06
      ringPos.y += (pos.y - ringPos.y) * 0.06
      gsap.set(dot, { x: pos.x, y: pos.y })
      gsap.set(ring, { x: ringPos.x, y: ringPos.y })
      gsap.set(glow, { x: pos.x, y: pos.y })

      history.unshift({ x: pos.x, y: pos.y })
      history.pop()
      trails.current.forEach((t, i) => {
        const pt = history[Math.min(i * 2, history.length - 1)]
        if (pt) gsap.set(t, { x: pt.x, y: pt.y, opacity: 0.5 - i * 0.03 })
      })
    })

    const growables = document.querySelectorAll('[data-cursor="grow"]')
    const enter = () => {
      gsap.to(ring, { scale: 4, opacity: 0.2, borderColor: 'rgba(255,215,0,0.8)', duration: 0.3 })
      gsap.to(dot, { scale: 3, duration: 0.3 })
      gsap.to(glow, { scale: 5, opacity: 0.9, duration: 0.3 })
    }
    const leave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, borderColor: 'rgba(255,120,70,0.7)', duration: 0.4 })
      gsap.to(dot, { scale: 1, duration: 0.4 })
      gsap.to(glow, { scale: 2.5, opacity: 0.5, duration: 0.4 })
    }
    growables.forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      gsap.ticker.remove(ticker)
      growables.forEach(el => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
      trails.current.forEach(t => t.remove())
    }
  }, [])

  return (
    <div className="hidden lg:block">
      <div ref={trailRef} />
      <div ref={glowRef} className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{ width: 60, height: 60, background: 'radial-gradient(circle, rgba(255,107,0,0.6), transparent 70%)', filter: 'blur(12px)' }} />
      <div ref={ringRef} className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{ width: 40, height: 40, border: '2px solid rgba(255,120,70,0.8)', boxShadow: '0 0 25px rgba(255,107,53,0.5)', transition: 'border-color 0.3s' }} />
      <div ref={dotRef} className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{ width: 7, height: 7, background: '#FF6B00', boxShadow: '0 0 20px #FF6B00, 0 0 40px rgba(255,107,53,0.8)' }} />
    </div>
  )
}

// ── Cursor Ripple on Click ────────────────────────────────────
function CursorRipple() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const ripple = document.createElement('div')
      ripple.className = 'cursor-ripple'
      ripple.style.cssText = `position:fixed;pointer-events:none;z-index:10001;left:${e.clientX}px;top:${e.clientY}px;width:0;height:0;border:2px solid rgba(255,107,53,0.8);border-radius:50%;transform:translate(-50%,-50%);animation:ripple-expand 0.8s ease-out forwards;`
      document.body.appendChild(ripple)
      setTimeout(() => ripple.remove(), 800)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])
  return null
}

// ── 3D Dynamic Background (rotating torus + particles) ───────
function Dynamic3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.parentElement!.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'
    ctx.scale(dpr, dpr)

    const R = 150, r = 40
    let angle = 0
    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = []

    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)
      angle += 0.005

      for (let i = 0; i < 40; i++) {
        const theta = (i / 40) * Math.PI * 2 + angle
        const cx = rect.width / 2 + R * Math.cos(theta)
        const cy = rect.height / 2 + R * Math.sin(theta)

        for (let j = 0; j < 10; j++) {
          const phi = (j / 10) * Math.PI * 2
          const dx = cx + r * Math.cos(phi) * Math.cos(theta)
          const dy = cy + r * Math.sin(phi)
          ctx.beginPath()
          ctx.arc(dx, dy, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,107,53,${0.15 + 0.05 * Math.sin(theta * 2)})`
          ctx.fill()
        }
      }

      if (Math.random() < 0.3) {
        const spawnTheta = Math.random() * Math.PI * 2 + angle
        const spawnCx = rect.width / 2 + R * Math.cos(spawnTheta)
        const spawnCy = rect.height / 2 + R * Math.sin(spawnTheta)
        const phi = Math.random() * Math.PI * 2
        const px = spawnCx + r * Math.cos(phi) * Math.cos(spawnTheta)
        const py = spawnCy + r * Math.sin(phi)
        particles.push({
          x: px, y: py,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 1,
          maxLife: 1,
        })
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life -= 0.008
        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }
        p.x += p.vx
        p.y += p.vy
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,107,53,${p.life * 0.6})`
        ctx.fill()
      }

      requestAnimationFrame(draw)
    }
    const anim = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(anim)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />
}

// ── Advanced Tilt Card (with dynamic shadow and ripple) ──────
function TiltCard({ children, className = '', max = 12, shadow = true }: {
  children: React.ReactNode; className?: string; max?: number; shadow?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height

    gsap.to(el, {
      rotateX: (0.5 - y) * max,
      rotateY: (x - 0.5) * max,
      transformPerspective: 900,
      duration: 0.4,
      ease: 'power2.out',
    })
    if (shineRef.current)
      gsap.to(shineRef.current, { left: `${x * 100}%`, top: `${y * 100}%`, opacity: 0.4, duration: 0.3 })
    if (shadowRef.current && shadow)
      gsap.to(shadowRef.current, { x: (x - 0.5) * 40, y: (y - 0.5) * 40, opacity: 0.7, duration: 0.4 })
  }
  const onLeave = () => {
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out' })
    if (shineRef.current) gsap.to(shineRef.current, { opacity: 0, duration: 0.4 })
    if (shadowRef.current && shadow) gsap.to(shadowRef.current, { x: 0, y: 0, opacity: 0.3, duration: 0.7 })
  }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} data-cursor="grow"
      className={`relative ${className}`} style={{ transformStyle: 'preserve-3d' }}>
      {shadow && (
        <div ref={shadowRef} className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,0,0,0.3), transparent 70%)', filter: 'blur(20px)', transform: 'translateZ(-10px)' }} />
      )}
      <div ref={shineRef} className="absolute w-32 h-32 rounded-full pointer-events-none opacity-0 z-20"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)', transform: 'translate(-50%,-50%)', left: 0, top: 0 }} />
      {children}
    </div>
  )
}

// ── Hexagon Grid Background ──────────────────────────────────
function HexagonGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.parentElement!.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'
    ctx.scale(dpr, dpr)

    const size = 30
    const hexHeight = size * Math.sqrt(3)
    const hexWidth = size * 2
    let time = 0

    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)
      for (let row = 0; row < rect.height / hexHeight + 2; row++) {
        for (let col = 0; col < rect.width / hexWidth + 2; col++) {
          const x = col * hexWidth * 0.75
          const y = row * hexHeight + (col % 2) * hexHeight / 2
          ctx.strokeStyle = `rgba(255,107,53,${0.06 + 0.02 * Math.sin(time + x * 0.05 + y * 0.05)})`
          ctx.lineWidth = 0.5
          drawHexagon(ctx, x, y, size)
        }
      }
      time += 0.01
      requestAnimationFrame(draw)
    }

    const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.stroke()
    }

    const anim = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(anim)
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

// ── Section 3D Reveal (pinned scroll) ────────────────────────
function useSectionReveal(selector: string) {
  useEffect(() => {
    const elements = gsap.utils.toArray<HTMLElement>(selector)
    elements.forEach((el) => {
      gsap.fromTo(el, {
        opacity: 0,
        y: 60,
        rotateX: -15,
      }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    })
  }, [selector])
}

// ── Glitch Text ───────────────────────────────────────────────
function GlitchText({ text, className = '', as: Tag = 'span' }: { text: string; className?: string; as?: 'span' | 'h1' | 'h2' | 'h3' }) {
  const ref = useRef<HTMLElement>(null)
  const onEnter = () => {
    const tl = gsap.timeline()
    tl.to(ref.current, { skewX: 2, x: 3, duration: 0.06 })
      .to(ref.current, { skewX: -1.5, x: -2, duration: 0.06 })
      .to(ref.current, { skewX: 0.5, x: 1, duration: 0.04 })
      .to(ref.current, { skewX: 0, x: 0, duration: 0.06 })
  }
  return <Tag ref={ref as any} className={className} onMouseEnter={onEnter}>{text}</Tag>
}

// ── Floating 3D Icons (section icons) ────────────────────────
function Floating3DIcon({ icon, color }: { icon: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    gsap.to(ref.current, {
      y: -10,
      rotateY: 360,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])
  return (
    <div ref={ref} className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
      style={{ transformStyle: 'preserve-3d' }}>
      <span className="text-2xl" style={{ color, textShadow: `0 0 15px ${color}` }}>{icon}</span>
    </div>
  )
}

// ── Section Divider (enhanced) ────────────────────────────────
function SectionDivider({ icon, title, sub, color = '#ff6b35' }: { icon: string; title: string; sub?: string; color?: string }) {
  return (
    <div className="section-hdr flex items-center gap-4 mb-8 group">
      <div className="flex items-center gap-2.5 pl-1">
        <div className="relative flex items-center justify-center w-12 h-12 transition-all duration-300 group-hover:scale-110"
          style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', background: `linear-gradient(135deg,${color}22,${color}08)`, border: `1px solid ${color}50` }}>
          <Floating3DIcon icon={icon} color={color} />
        </div>
        <div>
          <GlitchText text={title} as="h2" className="font-black tracking-widest uppercase whitespace-nowrap"
            style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.22em', lineHeight: 1 }} />
          {sub && <p className="text-xs mt-0.5" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_RAJ, letterSpacing: '0.1em', fontSize: '0.6rem' }}>{sub}</p>}
        </div>
      </div>
      <div className="flex-1 h-[2px] relative overflow-hidden"
        style={{ background: `repeating-linear-gradient(90deg, ${color}30 0 6px, transparent 6px 12px)` }} />
    </div>
  )
}

// ── Tokens ─────────────────────────────────────────────────────
const F_ORB = "'Orbitron', sans-serif"
const F_RAJ = "'Rajdhani', sans-serif"

// ── Icons ───────────────────────────────────────────────────────
const IconArrow    = () => <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>
const IconChevron  = ({ open }: { open: boolean }) => <svg className="w-4 h-4 transition-transform duration-300" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>
const IconBot      = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"/></svg>
const IconStar     = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/></svg>

// ── Stat fact (with tilt) ────────────────────────────────────
function StatItem({ stat }: { stat: StatFact }) {
  return (
    <TiltCard max={10} shadow={false}>
      <LiquidGlassCard 
        intensity="subtle"
        glowColor={`${stat.color}40`}
        className="about-stat"
        style={{ minWidth: 'min(140px, 30vw)' }}
      >
        <div className="flex flex-col items-center gap-1.5 p-5">
          <span className="text-2xl font-black" style={{ fontFamily: F_ORB, color: stat.color, letterSpacing: '-0.02em' }}>{stat.value}</span>
          <span className="text-xs text-center tracking-wider uppercase" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: F_RAJ, fontSize: '0.6rem', letterSpacing: '0.15em' }}>{stat.label}</span>
        </div>
      </LiquidGlassCard>
    </TiltCard>
  )
}

// ── Core value card (with tilt) ──────────────────────────────
function ValueCard({ val }: { val: CoreValue }) {
  return (
    <TiltCard max={12}>
      <LiquidGlassCard 
        intensity="medium"
        glowColor={`${val.color}35`}
        className="value-card hs-card"
        style={{ minWidth: 'min(320px, 85vw)' }}
      >
        <div className="p-5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
            style={{ background: `${val.color}18`, border: `1px solid ${val.color}40`, color: val.color }}>
            {val.icon}
          </div>
          <GlitchText text={val.title} as="h4" className="font-black text-sm mb-2" style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.06em' }} />
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_RAJ, lineHeight: 1.7 }}>
            {val.desc}
          </p>
        </div>
      </LiquidGlassCard>
    </TiltCard>
  )
}

// ── Module card (accordion, with tilt) ───────────────────────
function ModuleCard({ mod, isActive, onToggle }: { mod: Module; isActive: boolean; onToggle: (id: string) => void }) {
  const statusColors: Record<Module['status'], string> = {
    'activo':          '#00e5a0',
    'en desarrollo':   '#ffaa00',
    'próximamente':    '#a855f7',
  }
  return (
    <TiltCard max={8} shadow={false}>
      <LiquidGlassCard 
        intensity={isActive ? "strong" : "medium"}
        glowColor={isActive ? `${mod.color}50` : `${mod.color}25`}
        className="module-card"
        hoverEffect={false}
      >
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
              <p className="text-xs tracking-widest uppercase" style={{ color: `${mod.color}cc`, fontFamily: F_RAJ, fontSize: '0.58rem', letterSpacing: '0.18em' }}>
                {mod.tag}
              </p>
              <span className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
                style={{ background: `${statusColors[mod.status]}18`, border: `1px solid ${statusColors[mod.status]}45`,
                  color: statusColors[mod.status], fontFamily: F_RAJ, fontSize: '0.52rem', letterSpacing: '0.12em' }}>
                {mod.status.toUpperCase()}
              </span>
            </div>
            <GlitchText text={mod.title} as="h3" className="font-black text-sm" style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.8rem', letterSpacing: '0.06em' }} />
            <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_RAJ }}>{mod.tagline}</p>
          </div>
          <div style={{ color: `${mod.color}70`, flexShrink: 0 }}><IconChevron open={isActive} /></div>
        </button>
        {isActive && (
          <div className="px-5 pb-5">
            <div className="h-px mb-4" style={{ background: `linear-gradient(90deg,transparent,${mod.color}40,transparent)` }}/>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,160,140,0.75)', fontFamily: F_RAJ, lineHeight: 1.75 }}>
              {mod.desc}
            </p>
          </div>
        )}
      </LiquidGlassCard>
    </TiltCard>
  )
}

// ── Milestone item (interactive timeline) ────────────────────
function MilestoneItem({ m, index, isActive, onHover }: {
  m: Milestone; index: number; isActive: boolean; onHover: (i: number | null) => void
}) {
  return (
    <div className="milestone-item flex gap-5 cursor-default"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}>
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 56 }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300"
          style={{ fontFamily: F_ORB, fontSize: '0.6rem', letterSpacing: '0.05em',
            background: isActive ? `${m.color}30` : 'rgba(255,255,255,0.03)',
            border: `2px solid ${isActive ? m.color : 'rgba(180,60,40,0.25)'}`,
            color: isActive ? m.color : 'rgba(200,150,120,0.5)',
            boxShadow: isActive ? `0 0 20px ${m.color}50` : 'none',
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
          }}>
          {m.year.replace('+', '')}
        </div>
        {index < 4 && (
          <div className="flex-1 w-px mt-2 transition-all duration-300"
            style={{ background: isActive ? `linear-gradient(to bottom, ${m.color}, transparent)` : 'rgba(180,60,40,0.18)', minHeight: 24 }}/>
        )}
      </div>
      <div className="pb-8 flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-black text-sm transition-colors duration-300"
            style={{ fontFamily: F_ORB, color: isActive ? m.color : '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.06em' }}>
            {m.title}
          </h4>
          {m.year.includes('+') && (
            <span className="text-xs px-1.5 py-0.5 rounded-full"
              style={{ background: `${m.color}18`, border: `1px solid ${m.color}40`, color: m.color,
                fontFamily: F_RAJ, fontSize: '0.52rem' }}>
              PRÓXIMO
            </span>
          )}
        </div>
        <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_RAJ, lineHeight: 1.75 }}>
          {m.desc}
        </p>
      </div>
    </div>
  )
}

// ── Role card (with tilt) ─────────────────────────────────────
function RoleCardItem({ r }: { r: RoleCard }) {
  return (
    <TiltCard max={10} shadow={false}>
      <LiquidGlassCard 
        intensity="subtle"
        glowColor={`${r.color}35`}
        className="role-card"
      >
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${r.color}18`, border: `1px solid ${r.color}40`, color: r.color }}>
              {r.icon}
            </div>
            <span className="font-black text-xs tracking-widest uppercase"
              style={{ fontFamily: F_ORB, color: r.color, fontSize: '0.68rem', letterSpacing: '0.18em' }}>
              {r.label}
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_RAJ, lineHeight: 1.75 }}>
            {r.desc}
          </p>
        </div>
      </LiquidGlassCard>
    </TiltCard>
  )
}

// ── Future vision card (with tilt) ────────────────────────────
function VisionCard({ v }: { v: FutureVision }) {
  return (
    <TiltCard max={10} shadow={false}>
      <LiquidGlassCard 
        intensity="subtle"
        glowColor={`${v.color}35`}
        className="vision-card"
      >
        <div className="p-5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
            style={{ background: `${v.color}18`, border: `1px solid ${v.color}40`, color: v.color }}>
            {v.icon}
          </div>
          <GlitchText text={v.title} as="h4" className="font-black text-sm mb-2" style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.7rem', letterSpacing: '0.06em' }} />
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_RAJ, lineHeight: 1.75 }}>
            {v.desc}
          </p>
        </div>
      </LiquidGlassCard>
    </TiltCard>
  )
}

// ── Horizontal Scroll (fixed, responsive) ──────────────────────
function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)

  // Calculamos la distancia y creamos el ScrollTrigger una sola vez
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const setup = () => {
      const totalWidth = track.scrollWidth
      const containerWidth = section.clientWidth
      const scrollWidth = totalWidth - containerWidth

      // Si no hay desplazamiento, limpiamos
      if (scrollWidth <= 0) {
        stRef.current?.kill()
        stRef.current = null
        gsap.set(track, { x: 0 })
        return
      }

      // Matamos el anterior si existe
      stRef.current?.kill()

      // Animación con pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollWidth}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })

      tl.to(track, {
        x: -scrollWidth,
        ease: 'none',
      })

      stRef.current = tl.scrollTrigger as ScrollTrigger
    }

    // Inicializamos tras un pequeño timeout para asegurar el layout
    const timeout = setTimeout(setup, 100)

    // Recalcular al cambiar el tamaño de la ventana
    const onResize = () => {
      clearTimeout(timeout)
      setTimeout(setup, 100)
    }
    window.addEventListener('resize', onResize)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', onResize)
      stRef.current?.kill()
    }
  }, []) // solo al montar

  return (
    <div ref={sectionRef} className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className="flex space-x-4 md:space-x-6 py-4"
        style={{ overflow: 'visible', width: 'max-content' }}
      >
        {children}
      </div>
    </div>
  )
}

// ── Grain Overlay ─────────────────────────────────────────────
function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 mix-blend-overlay opacity-[0.04]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
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
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // ── Scroll‑triggered reveals & 3D interactions ──────────────
  useSectionReveal('[data-atx-section]')

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      // Ambient orb pulses
      gsap.to('.orb-ab1', { scale: 1.3, opacity: 0.35, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.orb-ab2', { scale: 1.2, opacity: 0.25, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })
      gsap.to('.orb-ab3', { scale: 1.2, opacity: 0.2, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3 })

      // Hero entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.hero-badge', { opacity: 0, y: -20, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 })
        .fromTo('.hero-title', { opacity: 0, y: 40, rotateX: 15 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.9 }, '-=0.2')
        .fromTo('.hero-mission', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.3')
        .fromTo('.hero-cmd', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('.hero-cta', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, stagger: 0.1, duration: 0.4 }, '-=0.2')

      // Milestone items staggered entrance
      gsap.utils.toArray<HTMLElement>('.milestone-item').forEach((item, i) => {
        gsap.fromTo(item, { opacity: 0, x: -40 }, {
          opacity: 1, x: 0,
          scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none reverse' },
          delay: i * 0.08,
        })
      })

      // Stats cards scale-in
      gsap.utils.toArray<HTMLElement>('.about-stat, .value-card, .role-card, .vision-card').forEach((card) => {
        gsap.fromTo(card, { scale: 0.9, opacity: 0, rotateY: -15 }, {
          scale: 1, opacity: 1, rotateY: 0, duration: 0.7,
          scrollTrigger: { trigger: card, start: 'top 95%', toggleActions: 'play none none reverse' },
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');
        .line-clamp-1{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
        @keyframes ab-pulse{0%,100%{opacity:1;box-shadow:0 0 8px #00e5a0}55%{opacity:0.3;box-shadow:none}}
        @keyframes ripple-expand{to{width:100px;height:100px;opacity:0;border-width:0;}}
        html{scroll-behavior:smooth}
        * { cursor: none; }
        @media (pointer: coarse) { * { cursor: auto; } }
      `}</style>

      {/* ── ULTRA AMBIENT LAYERS ── */}
      <CinematicCursor />
      <CursorRipple />
      <GrainOverlay />
      <LiquidGlassBackground intensity="particles-only" />
      <AwardWinning3D 
        containerId="about-3d-bg"
        variant="particles"
        colors={{ primary: '#FF6B00', secondary: '#A855F7', tertiary: '#00E5A0' }}
        intensity={1.3}
        interactive={true}
      />
      <HexagonGrid />
      <Dynamic3DBackground />

      {/* ── PARALLAX ORBS ── */}
      <ParallaxLayer speed={0.4} className="orb-ab1 fixed pointer-events-none rounded-full z-0"
        style={{ width: 700, height: 700, top: '-10%', right: '-8%', background: 'radial-gradient(circle,rgba(180,30,30,0.15) 0%,transparent 70%)', filter: 'blur(70px)' }}/>
      <ParallaxLayer speed={0.6} className="orb-ab2 fixed pointer-events-none rounded-full z-0"
        style={{ width: 600, height: 600, bottom: '10%', left: '-10%', background: 'radial-gradient(circle,rgba(130,40,200,0.12) 0%,transparent 70%)', filter: 'blur(80px)' }}/>
      <ParallaxLayer speed={0.3} className="orb-ab3 fixed pointer-events-none rounded-full z-0"
        style={{ width: 400, height: 400, top: '40%', left: '35%', background: 'radial-gradient(circle,rgba(255,107,53,0.07) 0%,transparent 70%)', filter: 'blur(60px)' }}/>

      <div ref={containerRef} className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(135deg,#08040c 0%,#120818 50%,#08040c 100%)', fontFamily: F_RAJ }}>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-32">

          {/* ── HERO ── */}
          <section className="text-center" data-atx-section>
            <ScrollReveal effect="fadeDown">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}>
              <span style={{ color: '#ff6b35', fontSize: '0.7rem' }}>◈</span>
              <span className="text-xs font-bold tracking-widest uppercase"
                style={{ color: 'rgba(255,120,70,0.7)', fontFamily: F_RAJ, letterSpacing: '0.25em', fontSize: '0.62rem' }}>
                El Salvador · Desde 2023
              </span>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e5a0',
                boxShadow: '0 0 8px #00e5a0', display: 'inline-block', animation: 'ab-pulse 2.2s infinite' }}/>
            </div>
            </ScrollReveal>

            <TextSplitter
              as="h1"
              className="hero-title font-black leading-none mb-5"
              text="ACERCA DE ATHERNIX"
              effect="flip"
              scrollTrigger
              gradient
              style={{ fontFamily: F_ORB, fontSize: 'clamp(2.2rem, 6vw, 4rem)', letterSpacing: '-0.02em' }}
            />

            <ScrollReveal effect="fadeUp" delay={0.15}>
            <p className="hero-mission text-base max-w-2xl mx-auto mb-4 leading-relaxed"
              style={{ color: 'rgba(200,160,140,0.7)', fontFamily: F_RAJ, letterSpacing: '0.03em', lineHeight: 1.8 }}>
              {brand.mission}
            </p>
            </ScrollReveal>

            <ScrollReveal effect="scaleIn" delay={0.1}>
            <div className="hero-cmd inline-flex items-center gap-3 px-5 py-2.5 rounded-xl mx-auto mb-8 liquid-glass-subtle"
              style={{ background: 'rgba(8,4,14,0.9)', border: '1px solid rgba(180,60,40,0.25)',
                fontFamily: F_RAJ }}>
              <span style={{ color: '#ff6b35', fontSize: '0.8rem' }}>✦</span>
              <span style={{ color: 'rgba(200,160,140,0.75)', fontSize: '0.82rem', letterSpacing: '0.04em', fontStyle: 'italic' }}>
                "{brand.philosophy}"
              </span>
            </div>
            </ScrollReveal>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <MagneticElement>
              <button onClick={goToChat}
                className="hero-cta flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs tracking-wider uppercase transition-all duration-200"
                style={{ background: 'linear-gradient(135deg,#ff4e50,#f7931e)', color: '#fff',
                  fontFamily: F_ORB, fontSize: '0.65rem', letterSpacing: '0.15em', border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(255,100,50,0.3)' }}
                onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.04, duration: 0.2 })}
                onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}>
                <IconBot /> Hablar con Ather
              </button>
              </MagneticElement>
              <MagneticElement>
              <button onClick={goToZonaDesarrollo}
                className="hero-cta flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200"
                style={{ background: 'transparent', border: '1px solid rgba(255,107,53,0.35)',
                  color: 'rgba(255,120,70,0.85)', fontFamily: F_RAJ, fontSize: '0.72rem',
                  letterSpacing: '0.12em', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,53,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,107,53,0.6)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,107,53,0.35)' }}>
                Zona de Desarrollo <IconArrow />
              </button>
              </MagneticElement>
            </div>
          </section>

          {/* ── STATS ── */}
          <section data-atx-section>
            <SectionDivider icon="◈" title="Estadísticas Clave" sub="Impacto de la plataforma" color="#ff6b35" />
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {stats.map(s => <StatItem key={s.label} stat={s}/>)}
            </div>
          </section>

          {/* ── MISIÓN + VISIÓN ── */}
          <section data-atx-section>
            <SectionDivider icon="◈" title="Misión y Visión" sub="Lo que somos · Lo que construimos" color="#ff6b35" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'MISIÓN', text: brand.mission, color: '#ff6b35', icon: '◈' },
                { label: 'VISIÓN', text: brand.vision,  color: '#a855f7', icon: '◎' },
              ].map(item => (
                <TiltCard key={item.label} max={14} shadow>
                  <LiquidGlassCard 
                    intensity="subtle"
                    glowColor={`${item.color}35`}
                  >
                    <div className="p-6" style={{ borderLeft: `4px solid ${item.color}` }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span style={{ color: item.color }}>{item.icon}</span>
                        <span className="font-black text-xs tracking-widest uppercase"
                          style={{ fontFamily: F_ORB, color: item.color, fontSize: '0.62rem', letterSpacing: '0.22em' }}>
                          {item.label}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,160,140,0.75)', fontFamily: F_RAJ, lineHeight: 1.8 }}>
                        {item.text}
                      </p>
                    </div>
                  </LiquidGlassCard>
                </TiltCard>
              ))}
            </div>
          </section>

          {/* ── CORE VALUES (fixed horizontal scroll) ── */}
          <section data-atx-section>
            <ScrollReveal effect="slideLeft">
              <SectionDivider icon="⬡" title="Nuestros Principios" sub="Los valores que guían cada decisión" color="#a855f7" />
            </ScrollReveal>
            {/* Escritorio: scroll horizontal */}
            <div className="hidden md:block">
              <HorizontalScroll>
                {values.map(v => <ValueCard key={v.id} val={v} />)}
              </HorizontalScroll>
            </div>
            {/* Móvil: grid */}
            <ScrollReveal effect="fadeUp" stagger={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:hidden">
              {values.map(v => <ValueCard key={v.id} val={v} />)}
            </ScrollReveal>
          </section>

          {/* ── MODULES + MILESTONES ── */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2" data-atx-section>
                <SectionDivider icon="◎" title="Nuestros Módulos" sub="La plataforma en acción" color="#00e5a0" />
                <div className="flex flex-col gap-3">
                  {modules.map(m => (
                    <ModuleCard key={m.id} mod={m} isActive={state.activeModule === m.id} onToggle={toggleModule}/>
                  ))}
                </div>
              </div>
              <div data-atx-section>
                <SectionDivider icon="△" title="Cronología" sub="Del inicio al futuro" color="#ffaa00" />
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
          <section data-atx-section>
            <SectionDivider icon="◆" title="Roles de la Plataforma" sub="Cada usuario, una experiencia única" color="#ff006e" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {roles.map(r => <RoleCardItem key={r.id} r={r}/>)}
            </div>
          </section>

          {/* ── ATHER PANEL ── */}
          <section data-atx-section>
            <SectionDivider icon="◈" title="Conoce a Ather" sub="El corazón inteligente de Athernix" color="#ff6b35" />
            <div className="ather-panel grid grid-cols-1 lg:grid-cols-5 gap-6">
              <TiltCard className="lg:col-span-2" max={12} shadow>
                <LiquidGlassCard 
                  intensity="subtle"
                  glowColor="rgba(255, 107, 53, 0.25)"
                >
                  <div className="p-6 flex flex-col gap-5">
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative w-24 h-24 rounded-full flex items-center justify-center"
                        style={{ border: '2px solid rgba(255,107,53,0.4)',
                          background: 'radial-gradient(circle,rgba(255,107,53,0.12),rgba(8,4,14,0.9))' }}>
                        <div className="absolute inset-2 rounded-full"
                          style={{ border: '1px solid rgba(168,85,247,0.25)' }}/>
                        <span style={{ fontFamily: F_ORB, fontSize: '1.6rem', color: '#ff6b35',
                          filter: 'drop-shadow(0 0 12px #ff6b35)', position: 'relative', zIndex: 1 }}>A</span>
                      </div>
                      <div className="text-center">
                        <GlitchText text={ather.name} as="h3" className="font-black" style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '1rem', letterSpacing: '0.12em' }} />
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,107,53,0.6)', fontFamily: F_RAJ, letterSpacing: '0.15em', fontSize: '0.6rem', textTransform: 'uppercase' }}>
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
                        <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_RAJ, fontSize: '0.58rem', letterSpacing: '0.18em' }}>{item.label}</span>
                        <span className="text-xs font-bold" style={{ color: '#ede0d4', fontFamily: F_RAJ, letterSpacing: '0.08em' }}>{item.value}</span>
                      </div>
                    ))}
                    <button onClick={goToChat}
                      className="w-full py-2 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 mt-2"
                      style={{ background: 'linear-gradient(135deg,#ff4e50,#f7931e)', color: '#fff',
                        fontFamily: F_ORB, fontSize: '0.62rem', letterSpacing: '0.15em', border: 'none', cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(255,100,50,0.3)' }}
                      onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2 })}
                      onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}>
                      <IconBot /> INICIAR SESIÓN CON ATHER
                    </button>
                  </div>
                </LiquidGlassCard>
              </TiltCard>

              <TiltCard className="lg:col-span-3" max={12} shadow>
                <LiquidGlassCard 
                  intensity="subtle"
                  glowColor="rgba(168, 85, 247, 0.25)"
                >
                  <div className="p-6">
                    <p className="text-sm leading-relaxed mb-6"
                      style={{ color: 'rgba(200,160,140,0.75)', fontFamily: F_RAJ, lineHeight: 1.85 }}>
                      {ather.desc}
                    </p>
                    <p className="text-xs tracking-widest uppercase mb-3"
                      style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_RAJ, fontSize: '0.58rem', letterSpacing: '0.2em' }}>
                      Capacidades activas
                    </p>
                    <div className="flex flex-col gap-2">
                      {ather.abilities.map((a, i) => (
                        <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg"
                          style={{ background: 'rgba(255,107,53,0.04)', border: '1px solid rgba(255,107,53,0.12)' }}>
                          <span style={{ color: '#ff6b35', fontSize: '0.75rem' }}><IconStar /></span>
                          <span className="text-xs" style={{ color: 'rgba(200,160,140,0.75)', fontFamily: F_RAJ, letterSpacing: '0.03em' }}>{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </LiquidGlassCard>
              </TiltCard>
            </div>
          </section>

          {/* ── FUTURE VISIONS ── */}
          <section data-atx-section>
            <SectionDivider icon="⊕" title="Visión a Futuro" sub="Lo que viene para Athernix y Latinoamérica" color="#ff6b35" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {futureVisions.map(v => <VisionCard key={v.title} v={v}/>)}
            </div>
          </section>

          {/* ── CLOSING CTA ── */}
          <section className="text-center" data-atx-section>
            <TiltCard max={14} shadow>
              <LiquidGlassCard 
                intensity="subtle"
                glowColor="rgba(255, 107, 53, 0.25)"
                className="inline-block"
              >
                <div className="px-8 py-8">
                  <p className="text-xs tracking-widest uppercase mb-3"
                    style={{ color: 'rgba(255,120,70,0.5)', fontFamily: F_RAJ, letterSpacing: '0.3em', fontSize: '0.6rem' }}>
                    ✦ únete al viaje ✦
                  </p>
                  <GlitchText text="El conocimiento no tiene fronteras" as="h3" className="font-black mb-3"
                    style={{ fontFamily: F_ORB, fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
                      background: 'linear-gradient(90deg,#ff6b35,#f7c59f,#a855f7)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '0.04em' }} />
                  <p className="text-sm mb-6 max-w-md mx-auto"
                    style={{ color: 'rgba(200,160,140,0.6)', fontFamily: F_RAJ, lineHeight: 1.8 }}>
                    Athernix está construido para que cada persona — sin importar dónde esté — pueda aprender, explorar y crecer.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button onClick={goToChat}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs tracking-wider uppercase"
                      style={{ background: 'linear-gradient(135deg,#ff4e50,#f7931e)', color: '#fff',
                        fontFamily: F_ORB, fontSize: '0.62rem', letterSpacing: '0.15em', border: 'none', cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(255,100,50,0.3)' }}
                      onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.04, duration: 0.2 })}
                      onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}>
                      <IconBot /> Explorar con Ather
                    </button>
                    <button onClick={goToZonaDesarrollo}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase"
                      style={{ background: 'transparent', border: '1px solid rgba(255,107,53,0.35)',
                        color: 'rgba(255,120,70,0.85)', fontFamily: F_RAJ, fontSize: '0.72rem',
                        letterSpacing: '0.12em', cursor: 'pointer' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,53,0.08)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                      Zona de Desarrollo <IconArrow />
                    </button>
                  </div>
                </div>
              </LiquidGlassCard>
            </TiltCard>
          </section>

          {/* Footer stamp */}
          <div className="text-center">
            <p className="text-xs tracking-widest uppercase"
              style={{ color: 'rgba(255,100,50,0.15)', fontFamily: F_RAJ, letterSpacing: '0.4em' }}>
              ✦ athernix · el salvador · 2023–2027 · stem · xr · ia ✦
            </p>
          </div>

        </div>
      </div>
    </>
  )
}