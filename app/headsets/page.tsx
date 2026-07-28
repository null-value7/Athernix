// view/MyHeadsetsView.tsx - Award-Winning ULTRA PREMIUM 3D Interactive
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMyHeadsetsController } from '@/controllers/information/headset'
import { HEADSET_META, TIER_LABEL, TYPE_LABEL, getHeadsetMeta, type VRGlassesModel } from '@/models/headset'
import ScrollReveal from '@/components/ui/ScrollReveal'
import TextSplitter from '@/components/ui/TextSplitter'
import MagneticElement from '@/components/ui/MagneticElement'
import ParallaxLayer from '@/components/ui/ParallaxLayer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ═══════════════════════════════════════════════════════════════
//  ULTRA PREMIUM INTERACTIVE ELEMENTS v3
// ═══════════════════════════════════════════════════════════════

// ── Cinematic Cursor Ultra ──────────────────────────────────
function CinematicCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const trails = useRef<HTMLDivElement[]>([])
  const sparklesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const dot = dotRef.current, ring = ringRef.current, glow = glowRef.current, tc = trailRef.current
    if (!dot || !ring || !glow || !tc) return

    for (let i = 0; i < 18; i++) {
      const t = document.createElement('div')
      t.style.cssText = `
        position:fixed;pointer-events:none;z-index:9999;
        width:${5 - i * 0.25}px;height:${5 - i * 0.25}px;
        border-radius:50%;
        background:${i < 9 ? 'rgba(255,107,53,' + (0.6 - i * 0.06) + ')' : 'rgba(168,85,247,' + (0.5 - (i-9) * 0.05) + ')'};
        box-shadow:0 0 ${8 - i * 0.4}px currentColor;
        top:0;left:0;transform:translate(-50%,-50%);opacity:0;
        transition: background 0.3s;
      `
      tc.appendChild(t)
      trails.current.push(t)
    }

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }
    const history: { x: number; y: number }[] = Array(18).fill({ ...pos })

    gsap.set([dot, ring, glow], { xPercent: -50, yPercent: -50 })
    gsap.set(glow, { opacity: 0.6, scale: 3 })

    let sparkleTimer: any = null
    const createSparkle = (x: number, y: number) => {
      const sparkle = document.createElement('div')
      sparkle.style.cssText = `
        position:fixed;pointer-events:none;z-index:9997;
        width:3px;height:3px;border-radius:50%;
        background:${Math.random() > 0.5 ? '#FF6B00' : '#A855F7'};
        box-shadow:0 0 6px currentColor;
        top:${y}px;left:${x}px;
        opacity:0.8;
      `
      document.body.appendChild(sparkle)
      sparklesRef.current.push(sparkle)
      
      gsap.to(sparkle, {
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 30,
        opacity: 0,
        scale: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          sparkle.remove()
          sparklesRef.current = sparklesRef.current.filter(s => s !== sparkle)
        }
      })
    }

    const move = (e: MouseEvent) => { 
      pos.x = e.clientX; pos.y = e.clientY
      if (!sparkleTimer) {
        sparkleTimer = setTimeout(() => {
          createSparkle(e.clientX, e.clientY)
          sparkleTimer = null
        }, 50)
      }
    }
    window.addEventListener('mousemove', move)

    const ticker = gsap.ticker.add(() => {
      ringPos.x += (pos.x - ringPos.x) * 0.05
      ringPos.y += (pos.y - ringPos.y) * 0.05
      gsap.set(dot, { x: pos.x, y: pos.y })
      gsap.set(ring, { x: ringPos.x, y: ringPos.y })
      gsap.set(glow, { x: pos.x, y: pos.y })
      history.unshift({ x: pos.x, y: pos.y })
      history.pop()
      trails.current.forEach((t, i) => {
        const pt = history[Math.min(i * 2, history.length - 1)]
        if (pt) gsap.set(t, { x: pt.x, y: pt.y, opacity: 0.5 - i * 0.025 })
      })
    })

    const growables = document.querySelectorAll('[data-cursor="grow"]')
    const enter = () => {
      gsap.to(ring, { scale: 4.5, opacity: 0.15, borderColor: '#FFD700', duration: 0.35 })
      gsap.to(dot, { scale: 3, background: '#FFD700', duration: 0.35 })
      gsap.to(glow, { scale: 6, opacity: 0.9, background: 'radial-gradient(circle, rgba(255,215,0,0.5), transparent 70%)', duration: 0.35 })
    }
    const leave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, borderColor: 'rgba(255,120,70,0.7)', duration: 0.5 })
      gsap.to(dot, { scale: 1, background: '#FF6B00', duration: 0.5 })
      gsap.to(glow, { scale: 3, opacity: 0.6, background: 'radial-gradient(circle, rgba(255,107,0,0.5), transparent 70%)', duration: 0.5 })
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
      sparklesRef.current.forEach(s => s.remove())
    }
  }, [])

  return (
    <div className="hidden lg:block">
      <div ref={trailRef} />
      <div ref={glowRef} className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{ width: 70, height: 70, background: 'radial-gradient(circle, rgba(255,107,0,0.5), transparent 70%)', filter: 'blur(14px)' }} />
      <div ref={ringRef} className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{ width: 42, height: 42, border: '2.5px solid rgba(255,120,70,0.8)', boxShadow: '0 0 30px rgba(255,107,53,0.5), 0 0 60px rgba(255,107,53,0.2)' }} />
      <div ref={dotRef} className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{ width: 7, height: 7, background: '#FF6B00', boxShadow: '0 0 20px #FF6B00, 0 0 40px rgba(255,107,53,0.8)' }} />
    </div>
  )
}

// ── VR Particles Ring (THREE.js style in Canvas) ────────────
function VRParticlesRing() {
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

    const rings = [
      { cx: rect.width * 0.5, cy: rect.height * 0.5, radius: 180, particles: 50, color: '#FF6B00', speed: 0.4 },
      { cx: rect.width * 0.5, cy: rect.height * 0.5, radius: 280, particles: 70, color: '#A855F7', speed: -0.3 },
      { cx: rect.width * 0.5, cy: rect.height * 0.5, radius: 380, particles: 90, color: '#FF006E', speed: 0.2 },
    ]

    let time = 0
    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)
      
      rings.forEach(ring => {
        for (let i = 0; i < ring.particles; i++) {
          const angle = (i / ring.particles) * Math.PI * 2 + time * ring.speed
          const x = ring.cx + Math.cos(angle) * ring.radius
          const y = ring.cy + Math.sin(angle) * ring.radius * 0.4
          const alpha = 0.25 + 0.15 * Math.sin(time * 2 + i)
          
          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, Math.PI * 2)
          const hex = ring.color.replace('#', '')
          const r = parseInt(hex.substring(0, 2), 16)
          const g = parseInt(hex.substring(2, 4), 16)
          const b = parseInt(hex.substring(4, 6), 16)
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
          ctx.fill()

          // Glow
          ctx.beginPath()
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.3})`
          ctx.fill()
        }
      })
      
      time += 0.015
      requestAnimationFrame(draw)
    }
    const anim = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(anim)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[2] opacity-40" />
}

// ── Floating VR Icons ───────────────────────────────────────
function FloatingVRIcons() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const icons = ref.current.querySelectorAll('.float-vr-icon')
    icons.forEach((icon, i) => {
      gsap.to(icon, {
        y: gsap.utils.random(-25, 25),
        x: gsap.utils.random(-12, 12),
        rotate: gsap.utils.random(-8, 8),
        scale: gsap.utils.random(0.8, 1.2),
        duration: gsap.utils.random(4, 7),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.5,
      })
    })
  }, [])
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
      <div className="float-vr-icon absolute top-[20%] left-[8%] text-3xl opacity-[0.12]">🥽</div>
      <div className="float-vr-icon absolute top-[65%] right-[10%] text-4xl opacity-[0.1]">🎮</div>
      <div className="float-vr-icon absolute top-[80%] left-[35%] text-2xl opacity-[0.08]">🕹️</div>
      <div className="float-vr-icon absolute top-[35%] right-[25%] text-3xl opacity-[0.1]">🔮</div>
    </div>
  )
}

// ── Grain Overlay ────────────────────────────────────────────
function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 mix-blend-overlay opacity-[0.03]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
  )
}

// ── 3D Tilt Card Ultra ──────────────────────────────────────
function TiltCard({ children, max = 12, className = '', glowColor = '#FF6B00' }: { 
  children: React.ReactNode; max?: number; className?: string; glowColor?: string 
}) {
  const ref = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)
  const borderGlowRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    
    gsap.to(el, {
      rotateX: (0.5 - y) * max,
      rotateY: (x - 0.5) * max,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power2.out',
    })
    
    if (shineRef.current) {
      gsap.to(shineRef.current, { 
        left: `${x * 100}%`, 
        top: `${y * 100}%`, 
        opacity: 0.4, 
        duration: 0.35 
      })
    }
    
    if (borderGlowRef.current) {
      const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI)
      borderGlowRef.current.style.background = `conic-gradient(from ${angle}deg at ${x * 100}% ${y * 100}%, ${glowColor}44, transparent 40%, transparent 60%, ${glowColor}44)`
    }
  }
  
  const onLeave = () => {
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power3.out' })
    if (shineRef.current) gsap.to(shineRef.current, { opacity: 0, duration: 0.5 })
    if (borderGlowRef.current) borderGlowRef.current.style.background = 'transparent'
  }
  
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} data-cursor="grow"
      className={`relative ${className}`} style={{ transformStyle: 'preserve-3d', height: '100%' }}>
      <div ref={borderGlowRef} className="absolute -inset-[1px] rounded-2xl pointer-events-none z-0 transition-all duration-300" />
      <div ref={shineRef} className="absolute w-32 h-32 rounded-full pointer-events-none opacity-0 z-20"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.5), transparent 70%)', transform: 'translate(-50%,-50%)', left: 0, top: 0 }} />
      {children}
    </div>
  )
}

// ── Glitch Text Ultra ───────────────────────────────────────
function GlitchText({ text, className = '', as: Tag = 'span', color = '#FF6B00' }: { 
  text: string; className?: string; as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4'; color?: string 
}) {
  const ref = useRef<HTMLElement>(null)
  const onEnter = () => {
    const tl = gsap.timeline()
    tl.to(ref.current, { skewX: 2, x: 3, textShadow: `2px 0 #FF006E, -2px 0 #3B82F6`, duration: 0.08 })
      .to(ref.current, { skewX: -1.5, x: -2, textShadow: `-2px 0 #FF006E, 2px 0 #3B82F6`, duration: 0.08 })
      .to(ref.current, { skewX: 0.5, x: 1, textShadow: `1px 0 ${color}`, duration: 0.05 })
      .to(ref.current, { skewX: 0, x: 0, textShadow: 'none', duration: 0.08 })
  }
  return <Tag ref={ref as any} className={className} onMouseEnter={onEnter}>{text}</Tag>
}

// ── Design tokens ────────────────────────────────────────────
const F_ORB = "'Orbitron', sans-serif"
const F_RAJ = "'Rajdhani', sans-serif"

// ── Icons ────────────────────────────────────────────────────
const IconBack   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>
const IconCheck  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
const IconX      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
const IconArrowR = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>

// ── Section header ───────────────────────────────────────────
function SectionHeader({ icon, title, right }: { icon: string; title: string; right?: React.ReactNode }) {
  return (
    <div className="section-hdr flex items-center gap-3 mb-5 group">
      <div className="relative flex items-center justify-center w-12 h-12 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', background: 'linear-gradient(135deg,rgba(255,107,0,0.2),rgba(168,85,247,0.15))', border: '1px solid rgba(255,107,53,0.4)' }}>
        <span style={{ color: '#ff6b35', fontSize: '1.1rem', filter: 'drop-shadow(0 0 8px #ff6b35)' }}>{icon}</span>
      </div>
      <GlitchText text={title} as="h2" className="font-black tracking-widest uppercase whitespace-nowrap"
        style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.75rem', letterSpacing: '0.25em' }} />
      <div className="flex-1 h-[2px]" style={{ background: 'repeating-linear-gradient(90deg, rgba(255,107,53,0.3) 0 6px, transparent 6px 12px)' }} />
      {right}
    </div>
  )
}

// ── Hero: headset actual ─────────────────────────────────────
function CurrentHeadsetHero({ model, setAt }: { model: VRGlassesModel; setAt: string | null }) {
  const meta = getHeadsetMeta(model)
  const isSet = model !== 'none'
  const dateLabel = setAt
    ? new Intl.DateTimeFormat('es-SV', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(setAt))
    : null

  return (
    <TiltCard max={10} glowColor={meta.color}>
      <div className="current-headset-hero relative rounded-2xl border overflow-hidden p-8 sm:p-10"
        style={{
          background: 'linear-gradient(160deg, rgba(18,8,22,0.98), rgba(14,6,18,0.95))',
          borderColor: isSet ? meta.color + '55' : 'rgba(180,60,40,0.3)',
          boxShadow: isSet ? `0 15px 60px rgba(0,0,0,0.6), 0 0 50px ${meta.color}22, inset 0 1px 0 rgba(255,255,255,0.05)` : '0 15px 60px rgba(0,0,0,0.6)',
        }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle,${meta.color}25 0%,transparent 70%)`, filter: 'blur(50px)', transform: 'translate(25%,-30%)' }}/>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle,rgba(168,85,247,0.15) 0%,transparent 70%)`, filter: 'blur(40px)', transform: 'translate(-20%,30%)' }}/>

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-8">
          <div className="w-28 h-28 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden relative"
            style={{ background: `${meta.color}18`, border: `3px solid ${meta.color}50`,
              filter: isSet ? `drop-shadow(0 0 25px ${meta.color}88)` : 'none', transform: 'translateZ(40px)' }}>
            <div className="absolute inset-0 rounded-2xl" style={{ background: `linear-gradient(135deg,${meta.color}22,transparent)` }} />
            {meta.imageUrl ? (
              <img src={meta.imageUrl} alt={meta.label} className="w-full h-full object-contain p-3 relative z-10" />
            ) : (
              <span className="text-6xl relative z-10">{meta.icon}</span>
            )}
          </div>

          <div className="flex-1 min-w-0" style={{ transform: 'translateZ(25px)' }}>
            <p className="text-xs tracking-widest uppercase mb-2 flex items-center gap-2" 
              style={{ color: 'rgba(255,120,70,0.6)', fontFamily: F_RAJ, letterSpacing: '0.28em', fontSize: '0.62rem' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: isSet ? '#00e5a0' : '#ff4e50', boxShadow: `0 0 8px ${isSet ? '#00e5a0' : '#ff4e50'}` }} />
              {isSet ? 'Tu headset registrado' : 'Aún no has registrado un headset'}
            </p>
            <GlitchText text={meta.label} as="h1" className="font-black mb-3"
              style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', letterSpacing: '0.03em' }} 
              color={meta.color} />
            <div className="flex flex-wrap items-center gap-2">
              {isSet && (
                <>
                  <span className="px-3 py-1.5 rounded-full text-xs font-black tracking-widest"
                    style={{ background: `${meta.color}20`, border: `1.5px solid ${meta.color}50`, color: meta.color, fontFamily: F_RAJ, fontSize: '0.6rem', letterSpacing: '0.18em', boxShadow: `0 0 12px ${meta.color}33` }}>
                    {meta.brand}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-black tracking-widest"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(180,60,40,0.25)', color: 'rgba(200,150,120,0.8)', fontFamily: F_RAJ, fontSize: '0.6rem', letterSpacing: '0.18em' }}>
                    {TYPE_LABEL[meta.type]}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-black tracking-widest"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(180,60,40,0.25)', color: 'rgba(200,150,120,0.8)', fontFamily: F_RAJ, fontSize: '0.6rem', letterSpacing: '0.18em' }}>
                    {TIER_LABEL[meta.tier]}
                  </span>
                  {dateLabel && (
                    <span className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                      style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_RAJ, fontSize: '0.62rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      📅 {dateLabel}
                    </span>
                  )}
                </>
              )}
              {!isSet && (
                <p className="text-sm" style={{ color: 'rgba(200,150,120,0.65)', fontFamily: F_RAJ, fontSize: '0.8rem' }}>
                  Elige tu headset abajo para desbloquear las recomendaciones de compatibilidad.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}

// ── Tarjeta de compatibilidad por módulo ─────────────────────
function ModuleCompatCard({ mod, hasHeadset }: {
  mod: { id: string; name: string; color: string; href: string; note: string; compatible: boolean }
  hasHeadset: boolean
}) {
  return (
    <TiltCard max={8} glowColor={mod.color}>
      <Link href={mod.href}
        className="module-compat-card group relative flex items-center gap-4 rounded-2xl border p-5 transition-all duration-500"
        style={{
          background: hasHeadset && mod.compatible ? `linear-gradient(135deg, ${mod.color}08, rgba(18,8,22,0.95))` : 'rgba(18,8,22,0.9)',
          borderColor: hasHeadset && mod.compatible ? mod.color + '55' : 'rgba(180,60,40,0.2)',
          opacity: hasHeadset && !mod.compatible ? 0.5 : 1,
          display: 'block',
          textDecoration: 'none',
        }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{
            background: hasHeadset && mod.compatible ? `${mod.color}25` : 'rgba(255,255,255,0.05)',
            border: `1.5px solid ${hasHeadset && mod.compatible ? mod.color + '60' : 'rgba(180,60,40,0.2)'}`,
            color: hasHeadset && mod.compatible ? mod.color : 'rgba(200,150,120,0.5)',
            boxShadow: hasHeadset && mod.compatible ? `0 0 15px ${mod.color}44` : 'none',
          }}>
          {hasHeadset ? (mod.compatible ? <IconCheck/> : <IconX/>) : '?'}
        </div>
        <div className="flex-1 min-w-0">
          <GlitchText text={mod.name} as="h4" className="font-black text-sm truncate"
            style={{ fontFamily: F_ORB, color: '#e8d5c8', fontSize: '0.8rem', letterSpacing: '0.04em' }} 
            color={mod.color} />
          <p className="text-xs mt-1" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_RAJ, fontSize: '0.7rem' }}>
            {!hasHeadset ? 'Registra un headset para ver compatibilidad' : mod.compatible ? mod.note : 'No recomendado con tu headset actual'}
          </p>
        </div>
        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 group-hover:translate-x-1" 
          style={{ color: mod.color, filter: `drop-shadow(0 0 6px ${mod.color})` }}>
          <IconArrowR/>
        </span>
      </Link>
    </TiltCard>
  )
}

// ── Tarjeta de catálogo (seleccionable) ──────────────────────
function HeadsetCatalogCard({ id, meta, isActive, saving, onSelect }: {
  id: VRGlassesModel; meta: ReturnType<typeof getHeadsetMeta>; isActive: boolean; saving: boolean
  onSelect: (id: VRGlassesModel) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !ref.current) return
    gsap.to(ref.current, { 
      boxShadow: `0 0 35px ${meta.color}33, 0 0 10px ${meta.color}18`, 
      duration: 2, 
      repeat: -1, 
      yoyo: true, 
      ease: 'sine.inOut' 
    })
    return () => { gsap.killTweensOf(ref.current) }
  }, [isActive, meta.color])

  return (
    <TiltCard max={12} glowColor={meta.color}>
      <div ref={ref}
        className="headset-card relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-500 p-5 h-full group"
        style={{
          background: isActive ? `linear-gradient(150deg, ${meta.color}15, rgba(18,8,22,0.98))` : 'rgba(18,8,22,0.88)',
          borderColor: isActive ? meta.color + '70' : 'rgba(180,60,40,0.22)',
          pointerEvents: saving ? 'none' : 'auto', 
          opacity: saving ? 0.6 : 1,
          boxShadow: isActive ? `0 0 30px ${meta.color}33` : 'none',
        }}
        onClick={() => onSelect(id)}
        onMouseEnter={() => { if (!isActive) gsap.to(ref.current, { y: -5, borderColor: meta.color + '44', duration: 0.3, ease: 'power2.out' }) }}
        onMouseLeave={() => { if (!isActive) gsap.to(ref.current, { y: 0, borderColor: 'rgba(180,60,40,0.22)', duration: 0.3, ease: 'power2.out' }) }}>

        {isActive && <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }}/>}
        
        {isActive && (
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: meta.color, color: '#fff', boxShadow: `0 0 20px ${meta.color}88` }}>
            <IconCheck/>
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${meta.color}18`, border: `2px solid ${meta.color}45`,
              filter: isActive ? `drop-shadow(0 0 15px ${meta.color}88)` : 'none' }}>
            {meta.imageUrl ? (
              <img src={meta.imageUrl} alt={meta.label} className="w-full h-full object-contain p-2" />
            ) : (
              <span className="text-3xl">{meta.icon}</span>
            )}
          </div>
        </div>

        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: `${meta.color}aa`, fontFamily: F_RAJ, fontSize: '0.58rem', letterSpacing: '0.2em' }}>
          {meta.brand} · {TIER_LABEL[meta.tier]}
        </p>
        <GlitchText text={meta.label} as="h4" className="font-black mb-2"
          style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.82rem', letterSpacing: '0.04em' }} 
          color={meta.color} />
        <p className="text-xs mb-4" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: F_RAJ, fontSize: '0.68rem' }}>
          {TYPE_LABEL[meta.type]} · {meta.sdk}
        </p>

        <button
          className="w-full py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300 group-hover:scale-[1.03]"
          style={{
            background: isActive ? `${meta.color}25` : 'rgba(255,255,255,0.04)',
            border: `1.5px solid ${isActive ? meta.color + '60' : 'rgba(180,60,40,0.25)'}`,
            color: isActive ? meta.color : 'rgba(200,150,120,0.6)',
            fontFamily: F_RAJ, fontSize: '0.62rem', letterSpacing: '0.18em', cursor: 'pointer',
            boxShadow: isActive ? `0 0 15px ${meta.color}33` : 'none',
          }}>
          {isActive ? '✦ EN USO' : 'REGISTRAR'}
        </button>
      </div>
    </TiltCard>
  )
}

// ── Toast ─────────────────────────────────────────────────────
function Toast({ text, ok }: { text: string; ok: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { 
    gsap.fromTo(ref.current, { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.3)' }) 
  }, [text])
  return (
    <div ref={ref} className="fixed bottom-8 right-8 z-50 px-5 py-3 rounded-xl flex items-center gap-3"
      style={{ background: 'rgba(12,6,14,0.98)', border: `1.5px solid ${ok ? 'rgba(0,229,160,0.5)' : 'rgba(255,78,80,0.5)'}`,
        boxShadow: `0 10px 40px rgba(0,0,0,0.7), 0 0 20px ${ok ? 'rgba(0,229,160,0.2)' : 'rgba(255,78,80,0.2)'}` }}>
      <span style={{ color: ok ? '#00e5a0' : '#ff4e50', filter: `drop-shadow(0 0 6px ${ok ? '#00e5a0' : '#ff4e50'})` }}>
        {ok ? <IconCheck/> : <IconX/>}
      </span>
      <span className="text-xs" style={{ color: '#ede0d4', fontFamily: F_RAJ, fontSize: '0.78rem' }}>{text}</span>
    </div>
  )
}

// ── MAIN VIEW ──────────────────────────────────────────────────
export default function MyHeadsetsView() {
  const { state, currentMeta, models, compatibility, toast, selectHeadset } = useMyHeadsetsController()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.orb-h1', { scale: 1.3, opacity: 0.4, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.orb-h2', { scale: 1.35, opacity: 0.28, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.5 })

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.mh-back',   { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.45 })
        .fromTo('.current-headset-hero', { opacity: 0, y: 40, rotateX: 12, scale: 0.95 }, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.8 }, '-=0.25')
        .fromTo('.section-hdr', { opacity: 0, x: -25 }, { opacity: 1, x: 0, stagger: 0.12, duration: 0.5 }, '-=0.35')
        .fromTo('.module-compat-card', { opacity: 0, y: 25, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.45, ease: 'back.out(1.2)' }, '-=0.25')
        .fromTo('.headset-card', { opacity: 0, y: 30, scale: 0.88 }, { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.45, ease: 'back.out(1.3)' }, '-=0.25')
    }, containerRef)
    return () => ctx.revert()
  }, [state.loading])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=Rajdhani:wght@500;600;700&display=swap');
        html{scroll-behavior:smooth}
        * { cursor: none; }
        @media (pointer: coarse) { * { cursor: auto; } }
      `}</style>

      <CinematicCursor />
      <GrainOverlay />
      <VRParticlesRing />
      <FloatingVRIcons />

      <div ref={containerRef} className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(160deg,#0d0608 0%,#120818 50%,#080410 100%)', fontFamily: F_RAJ }}>

        <ParallaxLayer speed={0.2} direction="up">
          <div className="orb-h1 fixed pointer-events-none rounded-full float-gentle"
            style={{ width: 700, height: 700, top: '-20%', right: '-12%', zIndex: 0,
              background: 'radial-gradient(circle,rgba(180,30,30,0.2) 0%,transparent 65%)', filter: 'blur(65px)' }}/>
        </ParallaxLayer>
        <ParallaxLayer speed={0.15} direction="down">
          <div className="orb-h2 fixed pointer-events-none rounded-full float-medium"
            style={{ width: 550, height: 550, bottom: '-5%', left: '-12%', zIndex: 0,
              background: 'radial-gradient(circle,rgba(130,40,200,0.15) 0%,transparent 65%)', filter: 'blur(75px)' }}/>
        </ParallaxLayer>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 space-y-14">

          {/* Back + title */}
          <div>
            <Link href="/home" className="mh-back inline-flex items-center gap-2 mb-7 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:opacity-70 hover:-translate-x-1"
              style={{ color: 'rgba(255,120,70,0.65)', fontFamily: F_RAJ, letterSpacing: '0.22em', fontSize: '0.64rem' }}>
              <IconBack/> Volver al inicio
            </Link>
            <h1 className="font-black" style={{ fontFamily: F_ORB, fontSize: 'clamp(2rem,4.5vw,2.8rem)', letterSpacing: '-0.02em' }}>
              <span style={{ background: 'linear-gradient(90deg,#ff6b35 0%,#f7c59f 55%,#a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                <TextSplitter as="span" text="Mis Headsets" effect="rise" />
              </span>
            </h1>
            <p className="text-sm mt-3 max-w-lg leading-relaxed" style={{ color: 'rgba(200,160,140,0.65)', fontFamily: F_RAJ, letterSpacing: '0.03em' }}>
              Registra tu dispositivo VR para que Athernix adapte cada módulo a sus capacidades reales.
            </p>
          </div>

          {/* Hero: headset actual */}
          {state.loading ? (
            <div className="rounded-2xl border p-12 text-center relative overflow-hidden" 
              style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(180,60,40,0.2)' }}>
              <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 50% 50%, #ff6b35, transparent 70%)' }} />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <svg className="animate-spin w-8 h-8" viewBox="0 0 24 24" fill="none" style={{ color: '#ff6b35' }}>
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                <span className="text-sm" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_RAJ }}>Cargando tu headset...</span>
              </div>
            </div>
          ) : (
            <CurrentHeadsetHero model={state.current} setAt={state.setAt}/>
          )}

          {/* Compatibilidad con módulos */}
          <ScrollReveal effect="fadeUp">
            <div>
              <SectionHeader icon="◈" title="Compatibilidad con Módulos" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {compatibility.map(mod => (
                  <ModuleCompatCard key={mod.id} mod={mod} hasHeadset={state.current !== 'none'}/>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="h-px w-full relative" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.25), rgba(168,85,247,0.25), transparent)' }}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.1), transparent 50%, rgba(168,85,247,0.1), transparent)', filter: 'blur(4px)' }} />
          </div>

          {/* Catálogo de headsets */}
          <ScrollReveal effect="scaleIn">
            <div>
              <SectionHeader icon="⬡" title="Catálogo de Headsets" right={
                <span className="text-xs px-3 py-1.5 rounded-full"
                  style={{ color: 'rgba(255,180,140,0.7)', fontFamily: F_RAJ, fontSize: '0.62rem', background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}>
                  {models.length} modelos
                </span>
              }/>
              <p className="text-xs mb-6 -mt-3" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_RAJ, letterSpacing: '0.05em' }}>
                Selecciona el headset que usas para acceder a recomendaciones y ajustes específicos de cada módulo.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {models.map(id => (
                  <HeadsetCatalogCard key={id} id={id} meta={HEADSET_META[id]} isActive={state.current === id}
                    saving={state.saving} onSelect={selectHeadset}/>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Ayuda */}
          <div className="rounded-2xl border p-6 flex items-start gap-4 relative overflow-hidden"
            style={{ background: 'rgba(18,8,22,0.75)', borderColor: 'rgba(180,60,40,0.18)' }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-20"
              style={{ background: 'radial-gradient(circle, #ff6b35, transparent 70%)', filter: 'blur(20px)', transform: 'translate(30%,-30%)' }} />
            <div className="relative z-10 flex items-start gap-3">
              <span style={{ color: '#ff6b35', fontSize: '1.2rem', filter: 'drop-shadow(0 0 6px #ff6b35)' }}>◈</span>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_RAJ, fontSize: '0.75rem' }}>
                ¿No encuentras tu modelo exacto? Selecciona el más parecido de tu misma marca — Athernix ajusta
                automáticamente la calidad según el hardware real detectado al conectar tu headset.
              </p>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast text={toast.text} ok={toast.ok}/>}
    </>
  )
}