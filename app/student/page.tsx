// @ts-nocheck
'use client'

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStudentDashboard } from '@/controllers/StudentRol/student';
import { DIFFICULTY_META } from '@/models/teacher';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TextSplitter } from '@/components/ui/TextSplitter';
import { MagneticElement } from '@/components/ui/MagneticElement';
import { ParallaxLayer } from '@/components/ui/ParallaxLayer';
import '../styles/student.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const F_DISPLAY = "'Bebas Neue', sans-serif"
const F_ORB = "'Orbitron', sans-serif"
const F_RAJ = "'Rajdhani', sans-serif"
const C_PINK = '#FF006E'
const C_ORANGE = '#FF6B00'
const C_YELLOW = '#FFD700'
const C_GREEN = '#00E5A0'
const C_PURPLE = '#A855F7'
const C_BLUE = '#3B82F6'

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

    // Trail dots
    for (let i = 0; i < 18; i++) {
      const t = document.createElement('div')
      t.style.cssText = `
        position:fixed;pointer-events:none;z-index:9999;
        width:${5 - i * 0.25}px;height:${5 - i * 0.25}px;
        border-radius:50%;
        background:${i < 9 ? 'rgba(0,229,160,' + (0.6 - i * 0.06) + ')' : 'rgba(168,85,247,' + (0.5 - (i-9) * 0.05) + ')'};
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

    // Sparkle burst on move
    let sparkleTimer: any = null
    const createSparkle = (x: number, y: number) => {
      const sparkle = document.createElement('div')
      sparkle.style.cssText = `
        position:fixed;pointer-events:none;z-index:9997;
        width:3px;height:3px;border-radius:50%;
        background:${Math.random() > 0.5 ? C_GREEN : C_PURPLE};
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
      gsap.to(ring, { scale: 4.5, opacity: 0.15, borderColor: C_YELLOW, duration: 0.35 })
      gsap.to(dot, { scale: 3, background: C_YELLOW, duration: 0.35 })
      gsap.to(glow, { scale: 6, opacity: 0.9, background: `radial-gradient(circle, ${C_YELLOW}88, transparent 70%)`, duration: 0.35 })
    }
    const leave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, borderColor: 'rgba(0,229,160,0.7)', duration: 0.5 })
      gsap.to(dot, { scale: 1, background: C_GREEN, duration: 0.5 })
      gsap.to(glow, { scale: 3, opacity: 0.6, background: `radial-gradient(circle, ${C_GREEN}88, transparent 70%)`, duration: 0.5 })
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
        style={{ width: 70, height: 70, background: `radial-gradient(circle, ${C_GREEN}88, transparent 70%)`, filter: 'blur(14px)' }} />
      <div ref={ringRef} className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{ width: 42, height: 42, border: '2.5px solid rgba(0,229,160,0.8)', boxShadow: '0 0 30px rgba(0,229,160,0.5), 0 0 60px rgba(0,229,160,0.2)' }} />
      <div ref={dotRef} className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{ width: 7, height: 7, background: C_GREEN, boxShadow: '0 0 20px #00E5A0, 0 0 40px rgba(0,229,160,0.8)' }} />
    </div>
  )
}

// ── Particle Galaxy (THREE.js dynamic ring) ─────────────────
function ParticleGalaxy() {
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
      { cx: rect.width * 0.5, cy: rect.height * 0.5, radius: 200, particles: 60, color: C_GREEN, speed: 0.3 },
      { cx: rect.width * 0.5, cy: rect.height * 0.5, radius: 300, particles: 80, color: C_PURPLE, speed: -0.2 },
      { cx: rect.width * 0.5, cy: rect.height * 0.5, radius: 400, particles: 100, color: C_PINK, speed: 0.15 },
    ]

    let time = 0
    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)
      
      rings.forEach(ring => {
        for (let i = 0; i < ring.particles; i++) {
          const angle = (i / ring.particles) * Math.PI * 2 + time * ring.speed
          const x = ring.cx + Math.cos(angle) * ring.radius
          const y = ring.cy + Math.sin(angle) * ring.radius * 0.3
          const alpha = 0.3 + 0.2 * Math.sin(time * 2 + i)
          
          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = ring.color.replace(')', `,${alpha})`).replace('rgb', 'rgba')
          if (ring.color.startsWith('#')) {
            ctx.fillStyle = ring.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
          }
          ctx.fill()
        }
      })
      
      time += 0.01
      requestAnimationFrame(draw)
    }
    const anim = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(anim)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[2] opacity-30" />
}

// ── Card Shine Sweep Effect ─────────────────────────────────
function CardShine() {
  const ref = useRef<HTMLDivElement>(null)
  
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    ref.current.style.setProperty('--shine-x', `${x}%`)
    ref.current.style.setProperty('--shine-y', `${y}%`)
  }

  return { ref, onMove }
}

// ── 3D Tilt Card Ultra ──────────────────────────────────────
function TiltCard({ children, max = 12, className = '', glowColor = C_GREEN }: { 
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
function GlitchText({ text, className = '', as: Tag = 'span', color = C_GREEN }: { 
  text: string; className?: string; as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4'; color?: string 
}) {
  const ref = useRef<HTMLElement>(null)
  const onEnter = () => {
    const tl = gsap.timeline()
    tl.to(ref.current, { skewX: 2, x: 3, textShadow: `2px 0 ${C_PINK}, -2px 0 ${C_BLUE}`, duration: 0.08 })
      .to(ref.current, { skewX: -1.5, x: -2, textShadow: `-2px 0 ${C_PINK}, 2px 0 ${C_BLUE}`, duration: 0.08 })
      .to(ref.current, { skewX: 0.5, x: 1, textShadow: `1px 0 ${color}`, duration: 0.05 })
      .to(ref.current, { skewX: 0, x: 0, textShadow: 'none', duration: 0.08 })
  }
  return <Tag ref={ref as any} className={className} onMouseEnter={onEnter}>{text}</Tag>
}

// ── Floating 3D Orbs ────────────────────────────────────────
function FloatingOrbs() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const orbs = ref.current.querySelectorAll('.floating-orb')
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        y: gsap.utils.random(-30, 30),
        x: gsap.utils.random(-15, 15),
        scale: gsap.utils.random(0.8, 1.2),
        duration: gsap.utils.random(4, 7),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.4,
      })
    })
  }, [])
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
      <div className="floating-orb absolute top-[15%] left-[10%] w-12 h-12 rounded-full opacity-[0.12]"
        style={{ background: `radial-gradient(circle, ${C_GREEN}, transparent 70%)`, filter: 'blur(8px)' }} />
      <div className="floating-orb absolute top-[60%] right-[8%] w-16 h-16 rounded-full opacity-[0.1]"
        style={{ background: `radial-gradient(circle, ${C_PURPLE}, transparent 70%)`, filter: 'blur(10px)' }} />
      <div className="floating-orb absolute top-[85%] left-[40%] w-10 h-10 rounded-full opacity-[0.08]"
        style={{ background: `radial-gradient(circle, ${C_PINK}, transparent 70%)`, filter: 'blur(6px)' }} />
      <div className="floating-orb absolute top-[30%] right-[30%] w-8 h-8 rounded-full opacity-[0.1]"
        style={{ background: `radial-gradient(circle, ${C_YELLOW}, transparent 70%)`, filter: 'blur(6px)' }} />
    </div>
  )
}

// ── Animated Counter ────────────────────────────────────────
function AnimatedCounter({ value, suffix = '', color = C_GREEN }: { value: number | string; suffix?: string; color?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    if (typeof value === 'string') return
    const el = ref.current
    if (!el) return
    const obj = { v: 0 }
    gsap.to(obj, {
      v: value,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => { if (el) el.textContent = Math.round(obj.v) + suffix },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
  }, [value, suffix])
  
  return <span ref={ref} style={{ color, fontFamily: F_ORB }}>{typeof value === 'string' ? value : `0${suffix}`}</span>
}

// ── Grain Overlay ────────────────────────────────────────────
function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 mix-blend-overlay opacity-[0.03]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
  )
}

function isWebGLAvailable() {
  if (typeof window === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

function MisClasesSection({ joinedClasses, subjects, onOpenJoin, onLeave, onGoMissions }) {
  return (
    <div className="space-y-6">
      {joinedClasses.length === 0 && (
        <div className="std-glass p-12 text-center relative overflow-hidden" style={{ borderColor: 'rgba(0,229,160,.3)' }}>
          <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 50% 50%, ${C_GREEN}, transparent 70%)` }} />
          <div className="relative z-10">
            <p style={{ fontSize: '3rem' }} className="mb-4">🎒</p>
            <GlitchText text="AÚN NO TIENES CLASES" as="h3" className="text-3xl mb-3" style={{ fontFamily: F_DISPLAY, letterSpacing: '.03em' }} />
            <p className="text-sm text-white/50 max-w-md mx-auto mb-6">Pídele el código a tu profesor y únete para ver tus misiones.</p>
            <MagneticElement>
              <button onClick={onOpenJoin} className="mono text-sm px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-110" 
                style={{ background: `linear-gradient(135deg,${C_ORANGE},${C_YELLOW})`, color: '#08000a', boxShadow: `0 8px 30px ${C_ORANGE}44` }}>
                ✦ UNIRME A UNA CLASE
              </button>
            </MagneticElement>
          </div>
        </div>
      )}

      {joinedClasses.length > 0 && (
        <ScrollReveal effect="fadeUp" stagger={0.1}>
        <div className="std-stagger grid grid-cols-1 md:grid-cols-3 gap-5">
          {joinedClasses.map((c) => {
            const subjectsForClass = subjects.filter((s) => (s.classIds || []).includes(c.id))
            return (
              <TiltCard key={c.id} max={8} glowColor={C_GREEN}>
                <div className="std-stagger-item std-glass liquid-glass glass-card-interactive card-3d std-class-card relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-20"
                    style={{ background: `radial-gradient(circle, ${C_GREEN}, transparent 70%)`, filter: 'blur(20px)', transform: 'translate(30%,-30%)' }} />
                  <div className="relative z-10">
                    <p className="mono text-xs text-white/40 mb-1">{c.gradeLevel.toUpperCase()}</p>
                    <GlitchText text={c.name} as="h4" className="text-xl mb-2" style={{ fontFamily: F_DISPLAY, letterSpacing: '.02em' }} />
                    <p className="text-xs text-white/50 mb-3">👤 {c.teacherName}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {subjectsForClass.map((s) => (
                        <span key={s.id} className="mono text-xs px-2.5 py-1 rounded-full" 
                          style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}40`, boxShadow: `0 0 10px ${s.color}22` }}>
                          {s.icon} {s.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={onGoMissions} className="mono text-xs px-4 py-2 rounded-full flex-1 transition-all duration-300 hover:bg-white/10"
                        style={{ background: 'rgba(255,255,255,.04)', color: 'rgba(255,255,255,.8)', border: '1px solid rgba(255,255,255,.1)' }}>
                        🚀 Ver misiones
                      </button>
                      <button onClick={() => onLeave(c.id)} className="mono text-xs px-4 py-2 rounded-full transition-all duration-300 hover:bg-pink-500/20"
                        style={{ background: 'rgba(255,0,110,.06)', color: C_PINK, border: `1px solid ${C_PINK}30` }}>
                        Salir
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            )
          })}
          <TiltCard max={8} glowColor={C_ORANGE}>
            <div className="std-stagger-item std-join-card liquid-glass glass-card-interactive card-3d relative overflow-hidden" onClick={onOpenJoin}>
              <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 50% 50%, ${C_ORANGE}, transparent 70%)` }} />
              <div className="relative z-10 text-center">
                <span className="text-5xl block mb-3" style={{ color: C_GREEN }}>＋</span>
                <p className="mono text-sm font-bold" style={{ color: C_GREEN }}>UNIRME A OTRA CLASE</p>
              </div>
            </div>
          </TiltCard>
        </div>
        </ScrollReveal>
      )}
    </div>
  )
}

function MissionCard({ mission, subject, cls, onToggle }) {
  const diff = DIFFICULTY_META[mission.difficulty]
  const done = mission.studentState === 'completada'
  
  return (
    <TiltCard max={8} glowColor={done ? C_GREEN : C_ORANGE}>
      <div className={`std-stagger-item std-glass liquid-glass glass-card-interactive card-3d std-mission relative overflow-hidden ${done ? 'std-done' : ''}`}>
        {done && (
          <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at 50% 50%, ${C_GREEN}, transparent 70%)` }} />
        )}
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${subject?.color}18`, border: `1px solid ${subject?.color}40` }}>
                <span style={{ fontSize: '1.3rem' }}>{subject?.icon}</span>
              </div>
              <div>
                <p className="mono text-xs font-bold" style={{ color: subject?.color }}>{subject?.name?.toUpperCase()}</p>
                <p className="mono text-xs text-white/35">{cls?.name}</p>
              </div>
            </div>
            <span className="std-status-pill mono cursor-pointer transition-all duration-300 hover:scale-105" 
              style={{ color: done ? C_GREEN : 'rgba(255,255,255,.5)', background: done ? `${C_GREEN}15` : 'transparent' }}
              onClick={() => onToggle(mission.id)}>
              {done ? '✓ COMPLETADA' : 'PENDIENTE'}
            </span>
          </div>

          <GlitchText text={mission.title} as="h4" className="text-lg font-bold mb-2" 
            style={{ fontFamily: F_DISPLAY, letterSpacing: '.02em' }} />
          <p className="text-sm text-white/55 leading-relaxed mb-4">{mission.description}</p>

          <div className="flex items-center gap-3 flex-wrap mb-4">
            <span className="mono text-xs px-3 py-1.5 rounded-full border" 
              style={{ color: diff.color, borderColor: diff.color, background: `${diff.color}10` }}>
              {diff.label}
            </span>
            <span className="mono text-xs text-white/45 flex items-center gap-1">
              <span style={{ color: C_YELLOW }}>✦</span> {mission.xpReward} XP
            </span>
            <span className="mono text-xs text-white/45 flex items-center gap-1">
              📅 {mission.dueDate}
            </span>
          </div>

          <button
            onClick={() => onToggle(mission.id)}
            className="std-complete-btn mono w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: done ? 'rgba(0,229,160,.12)' : `linear-gradient(135deg,${C_PINK},${C_ORANGE})`,
              color: done ? C_GREEN : '#08000a',
              border: done ? `1px solid ${C_GREEN}40` : 'none',
              boxShadow: done ? 'none' : `0 4px 20px ${C_ORANGE}44`,
            }}>
            {done ? 'MARCAR COMO PENDIENTE' : `✦ COMPLETAR MISIÓN (+${mission.xpReward} XP)`}
          </button>
        </div>
      </div>
    </TiltCard>
  )
}

function MisionesSection({ joinedClasses, subjects, filteredMissions, missionClassFilter, onSetFilter, onToggle, onOpenJoin }) {
  if (joinedClasses.length === 0) {
    return (
      <div className="std-glass p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 50% 50%, ${C_ORANGE}, transparent 70%)` }} />
        <p className="text-4xl mb-4">🚀</p>
        <p className="text-lg text-white/60 mb-4">Únete a una clase primero para ver tus misiones.</p>
        <MagneticElement>
          <button onClick={onOpenJoin} className="mono text-sm px-8 py-4 rounded-full font-bold" 
            style={{ background: `linear-gradient(135deg,${C_ORANGE},${C_YELLOW})`, color: '#08000a' }}>
            ✦ UNIRME A UNA CLASE
          </button>
        </MagneticElement>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <span className={`std-pill cursor-pointer transition-all duration-300 ${missionClassFilter === 'all' ? 'std-pill-active' : ''}`} 
          onClick={() => onSetFilter('all')}>🌍 TODAS</span>
        {joinedClasses.map((c) => (
          <span key={c.id} className={`std-pill cursor-pointer transition-all duration-300 ${missionClassFilter === c.id ? 'std-pill-active' : ''}`} 
            onClick={() => onSetFilter(c.id)}>
            {c.name.split(' — ')[0].toUpperCase()}
          </span>
        ))}
      </div>

      {filteredMissions.length === 0 ? (
        <div className="std-glass p-12 text-center text-white/40">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-sm">No hay misiones para este filtro todavía.</p>
        </div>
      ) : (
        <ScrollReveal effect="fadeUp" stagger={0.1}>
        <div className="std-stagger grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredMissions.map((m) => (
            <MissionCard
              key={m.id}
              mission={m}
              subject={subjects.find((s) => s.id === m.subjectId)}
              cls={joinedClasses.find((c) => c.id === m.classId)}
              onToggle={onToggle}
            />
          ))}
        </div>
        </ScrollReveal>
      )}
    </div>
  )
}

function ProgresoSection({ stats, badges }) {
  const cards = [
    { label: 'XP TOTAL', value: stats.xp, color: C_ORANGE, icon: '✦', isNumber: true },
    { label: 'NIVEL', value: stats.level, color: C_YELLOW, icon: '🎓', isNumber: true },
    { label: 'COMPLETADAS', value: `${stats.completed}/${stats.total}`, color: C_GREEN, icon: '✓', isNumber: false },
    { label: 'AVANCE', value: `${stats.pct}%`, color: C_PINK, icon: '📈', isNumber: false },
  ]
  
  return (
    <div className="space-y-10">
      <ScrollReveal effect="fadeUp" stagger={0.1}>
      <div className="std-stagger grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <TiltCard key={c.label} max={8} glowColor={c.color}>
            <div className="std-stagger-item std-glass liquid-glass glass-card-interactive card-3d std-stat relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none opacity-20"
                style={{ background: `radial-gradient(circle, ${c.color}, transparent 70%)`, filter: 'blur(15px)' }} />
              <div className="relative z-10 text-center">
                <span className="text-2xl block mb-2">{c.icon}</span>
                <div className="text-2xl font-black mb-1" style={{ fontFamily: F_ORB }}>
                  {c.isNumber ? <AnimatedCounter value={c.value as number} color={c.color} /> : c.value}
                </div>
                <span className="mono text-xs text-white/50">{c.label}</span>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
      </ScrollReveal>

      <ScrollReveal effect="scaleIn">
      <div className="std-reveal std-glass p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at 50% 50%, ${C_ORANGE}, transparent 70%)` }} />
        <div className="relative z-10">
          <div className="flex justify-between mono text-sm mb-3" style={{ color: 'rgba(255,255,255,.6)' }}>
            <span className="flex items-center gap-2">
              <span style={{ color: C_ORANGE }}>⚡</span> PROGRESO AL SIGUIENTE NIVEL
            </span>
            <span className="font-bold" style={{ color: C_ORANGE }}>{stats.xpIntoLevel}/{stats.xpPerLevel} XP</span>
          </div>
          <div className="std-xp-track relative">
            <div className="std-xp-fill relative" style={{ width: `${Math.round((stats.xpIntoLevel / stats.xpPerLevel) * 100)}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full" 
                style={{ background: C_YELLOW, boxShadow: `0 0 15px ${C_YELLOW}, 0 0 30px ${C_YELLOW}66` }} />
            </div>
            <div className="absolute inset-0 rounded-full opacity-20" 
              style={{ background: `linear-gradient(90deg, ${C_ORANGE}, ${C_YELLOW})`, filter: 'blur(8px)' }} />
          </div>
        </div>
      </div>
      </ScrollReveal>

      <ScrollReveal effect="fadeUp">
      <div className="std-reveal">
        <p className="std-tag mb-6 text-lg flex items-center gap-2" style={{ color: C_YELLOW }}>
          <span className="std-tag-dot" style={{ background: C_YELLOW, boxShadow: `0 0 10px ${C_YELLOW}` }}></span> 
          LOGROS DESBLOQUEADOS
        </p>
        <div className="std-stagger grid grid-cols-2 md:grid-cols-5 gap-4">
          {badges.map((b) => (
            <TiltCard key={b.id} max={10} glowColor={b.unlocked ? b.color : 'rgba(255,255,255,.3)'}>
              <div className="std-stagger-item std-glass liquid-glass glass-card-interactive card-3d std-badge-card relative overflow-hidden" 
                style={{ opacity: b.unlocked ? 1 : 0.35 }}>
                {b.unlocked && (
                  <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 50% 50%, ${b.color}, transparent 70%)` }} />
                )}
                <div className="relative z-10 text-center">
                  <div className="std-badge-icon mx-auto mb-3 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ 
                      background: b.unlocked ? `${b.color}20` : 'rgba(255,255,255,.04)', 
                      border: `1px solid ${b.unlocked ? b.color + '55' : 'rgba(255,255,255,.1)'}`,
                      boxShadow: b.unlocked ? `0 0 20px ${b.color}44` : 'none'
                    }}>
                    {b.icon}
                  </div>
                  <p className="text-sm font-bold mb-1">{b.label}</p>
                  <p className="mono text-xs text-white/40">{b.desc}</p>
                  {!b.unlocked && (
                    <div className="mt-2">
                      <span className="mono text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,.05)', color: 'rgba(255,255,255,.3)' }}>
                        🔒 BLOQUEADO
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
      </ScrollReveal>
    </div>
  )
}

function JoinClassModal({ value, error, success, onChange, onCancel, onSubmit }) {
  return (
    <div className="std-modal-overlay" onClick={onCancel}>
      <div className="std-modal relative overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at 50% 0%, ${C_GREEN}, transparent 70%)` }} />
        <div className="relative z-10">
          <p className="std-tag mb-2 text-sm flex items-center gap-2" style={{ color: C_GREEN }}>
            <span className="std-tag-dot" style={{ background: C_GREEN, boxShadow: `0 0 10px ${C_GREEN}` }}></span> 
            UNIRSE A UNA CLASE
          </p>
          <GlitchText text="CÓDIGO DE CLASE" as="h3" className="text-3xl mb-3" style={{ fontFamily: F_DISPLAY, letterSpacing: '.03em' }} />
          <p className="text-sm text-white/50 mb-6">Ingresa el código que te compartió tu profesor.</p>

          <div className="std-field relative">
            <label className="mono text-xs mb-2 block" style={{ color: C_GREEN }}>CÓDIGO</label>
            <input
              value={value}
              onChange={e => onChange(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && onSubmit()}
              placeholder="EJ. HIST-8A2K"
              autoFocus
              className="w-full text-lg tracking-wider"
            />
            <div className="absolute bottom-0 left-0 h-0.5 transition-all duration-300" 
              style={{ background: `linear-gradient(90deg, ${C_GREEN}, ${C_PURPLE})`, width: value ? '100%' : '0%' }} />
          </div>

          {error && <p className="mono text-sm mt-4 flex items-center gap-2" style={{ color: C_PINK }}>⚠ {error}</p>}
          {success && <p className="mono text-sm mt-4 flex items-center gap-2" style={{ color: C_GREEN }}>✓ {success}</p>}

          <div className="mt-8 flex items-center justify-end gap-3">
            <button onClick={onCancel} className="mono text-sm px-6 py-3 rounded-full border border-white/15 text-white/60 hover:border-white/35 transition-all duration-300">
              CERRAR
            </button>
            <MagneticElement>
              <button onClick={onSubmit} className="mono text-sm px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105"
                style={{ background: `linear-gradient(135deg,${C_ORANGE},${C_YELLOW})`, color: '#08000a', boxShadow: `0 4px 20px ${C_ORANGE}44` }}>
                ✦ UNIRME
              </button>
            </MagneticElement>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StudentDashboardPage() {
  const {
    state, copy, profile, subjects,
    joinedClasses, filteredMissions, stats, badges,
    goSection, openJoinModal, closeJoinModal, setJoinCodeInput, joinClass, leaveClass,
    setMissionClassFilter, toggleMissionComplete,
  } = useStudentDashboard()

  const containerRef = useRef(null)
  const heroCanvasRef = useRef(null)

  // ── THREE.JS: Nebula de partículas ──
  useEffect(() => {
    if (typeof window === 'undefined') return
    const canvas = heroCanvasRef.current
    if (!canvas) return

    if (!isWebGLAvailable()) {
      canvas.closest('.std-hero-canvas-wrap')?.classList.add('std-no-webgl')
      return
    }

    const W = canvas.offsetWidth || 800
    const H = canvas.offsetHeight || 340

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    } catch (err) {
      canvas.closest('.std-hero-canvas-wrap')?.classList.add('std-no-webgl')
      return
    }
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
    camera.position.set(0, 0, 8)

    // Spiral galaxy
    const N = 2500
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    const seed = new Float32Array(N * 3)
    const colors = [new THREE.Color(C_GREEN), new THREE.Color(C_PURPLE), new THREE.Color(C_PINK), new THREE.Color(C_YELLOW)]
    
    for (let i = 0; i < N; i++) {
      const angle = (i / N) * Math.PI * 8
      const radius = (i / N) * 8
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.sin(angle) * radius * 0.3
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3
      const c = colors[i % colors.length]
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
      seed[i * 3] = Math.random() * Math.PI * 2
      seed[i * 3 + 1] = Math.random() * Math.PI * 2
    }
    
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos.slice(), 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const mat = new THREE.PointsMaterial({ 
      size: 0.05, 
      vertexColors: true, 
      transparent: true, 
      opacity: 0.6, 
      blending: THREE.AdditiveBlending, 
      depthWrite: false 
    })
    const points = new THREE.Points(geo, mat)
    scene.add(points)
    const base = pos.slice()

    const clock = new THREE.Clock()
    let frameId
    function animate() {
      frameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const arr = geo.attributes.position.array
      for (let i = 0; i < N; i++) {
        const s0 = seed[i * 3], s1 = seed[i * 3 + 1]
        arr[i * 3] = base[i * 3] + Math.sin(t * 0.4 + s0) * 0.2
        arr[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * 0.35 + s1) * 0.2
        arr[i * 3 + 2] = base[i * 3 + 2] + Math.sin(t * 0.3 + s0) * 0.15
      }
      geo.attributes.position.needsUpdate = true
      points.rotation.z += 0.0003
      points.rotation.y += 0.0002
      renderer.render(scene, camera)
    }
    animate()

    const resizeObserver = new ResizeObserver(() => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      geo.dispose(); mat.dispose(); renderer.dispose()
    }
  }, [])

  // ── GSAP: entrada del hero ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.std-badge', { opacity: 0, y: -20, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 })
        .fromTo('.std-title', { opacity: 0, y: 40, rotateX: -15 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.8 }, '-=0.3')
        .fromTo('.std-sub', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  // ── GSAP: reveals con scroll ──
  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.std-reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40, rotateX: 8 }, {
          opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        })
      })
      gsap.utils.toArray('.std-stagger').forEach((group) => {
        const items = group.querySelectorAll('.std-stagger-item')
        gsap.fromTo(items, { opacity: 0, y: 30, scale: 0.92 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: group, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [state.section, joinedClasses.length])

  const tabs = [
    ['clases', 'Mis Clases', '🎒'],
    ['misiones', 'Misiones', '🚀'],
    ['progreso', 'Progreso', '🏆'],
  ]

  return (
    <div ref={containerRef} className="std-root relative min-h-screen" style={{ paddingTop: '80px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=Bebas+Neue&family=Rajdhani:wght@500;600;700&display=swap');
        * { cursor: none; }
        @media (pointer: coarse) { * { cursor: auto; } }
        .std-xp-fill {
          background: linear-gradient(90deg, ${C_ORANGE}, ${C_YELLOW}) !important;
          box-shadow: 0 0 20px ${C_ORANGE}88, 0 0 40px ${C_YELLOW}44 !important;
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .std-pill-active {
          background: linear-gradient(135deg, ${C_GREEN}22, ${C_PURPLE}22) !important;
          border-color: ${C_GREEN}66 !important;
          box-shadow: 0 0 20px ${C_GREEN}33 !important;
        }
      `}</style>

      <CinematicCursor />
      <GrainOverlay />
      <ParticleGalaxy />
      <FloatingOrbs />

      <ParallaxLayer speed={0.3} direction="up">
        <div className="std-orb float-gentle" style={{ width: 600, height: 600, top: '-20%', right: '-15%', background: `radial-gradient(circle,${C_GREEN}15 0%,transparent 70%)` }} />
      </ParallaxLayer>
      <ParallaxLayer speed={0.5} direction="down">
        <div className="std-orb float-medium" style={{ width: 500, height: 500, bottom: '-5%', left: '-12%', background: `radial-gradient(circle,${C_PURPLE}10 0%,transparent 70%)` }} />
      </ParallaxLayer>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">

        {/* HERO */}
        <section className="std-hero p-8 md:p-12 relative overflow-hidden rounded-3xl" 
          style={{ background: 'rgba(0,0,0,.3)', border: '1px solid rgba(255,255,255,.05)' }}>
          <div className="std-hero-canvas-wrap absolute inset-0">
            <canvas ref={heroCanvasRef} className="w-full h-full"></canvas>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="std-badge inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6" 
                style={{ background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.25)', opacity: 0 }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C_GREEN, boxShadow: `0 0 10px ${C_GREEN}` }} />
                <span className="mono text-xs font-bold tracking-widest uppercase" style={{ color: `${C_GREEN}cc`, letterSpacing: '0.25em' }}>
                  {copy.eyebrow}
                </span>
              </div>
              <h1 className="std-title font-black leading-none mb-5" 
                style={{ fontFamily: F_DISPLAY, fontSize: 'clamp(2.5rem,6vw,4rem)', letterSpacing: '.02em', opacity: 0 }}>
                <TextSplitter text={`HOLA, ${profile.firstName.toUpperCase()}`} splitBy="word" effect="rise" gradient={true} />
              </h1>
              <p className="std-sub text-base text-white/55 max-w-lg leading-relaxed" style={{ opacity: 0 }}>
                {copy.heroSub}
              </p>
            </div>
            <MagneticElement strength={25} radius={0}>
              <button onClick={openJoinModal} 
                className="mono flex-shrink-0 text-sm px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-110"
                style={{ background: `linear-gradient(135deg,${C_ORANGE},${C_YELLOW})`, color: '#08000a', boxShadow: `0 8px 35px ${C_ORANGE}55` }}>
                ✦ UNIRME A UNA CLASE
              </button>
            </MagneticElement>
          </div>
        </section>

        {/* TABS */}
        <div className="section-divider my-6"></div>
        <ScrollReveal effect="fadeUp" delay={0.2}>
        <div className="std-tabs std-reveal flex justify-center">
          {tabs.map(([id, label, icon]) => (
            <span key={id} className={`std-tab text-sm ${state.section === id ? 'std-tab-active' : ''}`} onClick={() => goSection(id)}>
              <span className="mr-2">{icon}</span> {label.toUpperCase()}
            </span>
          ))}
        </div>
        </ScrollReveal>
        <div className="section-divider my-6"></div>

        {/* CONTENIDO */}
        {state.section === 'clases' && (
          <MisClasesSection joinedClasses={joinedClasses} subjects={subjects} onOpenJoin={openJoinModal} onLeave={leaveClass} onGoMissions={() => goSection('misiones')} />
        )}
        {state.section === 'misiones' && (
          <MisionesSection
            joinedClasses={joinedClasses} subjects={subjects} filteredMissions={filteredMissions}
            missionClassFilter={state.missionClassFilter} onSetFilter={setMissionClassFilter}
            onToggle={toggleMissionComplete} onOpenJoin={openJoinModal}
          />
        )}
        {state.section === 'progreso' && (
          <ProgresoSection stats={stats} badges={badges} />
        )}

        {/* NOTA */}
        <div className="std-reveal std-glass p-10 text-center relative overflow-hidden rounded-2xl" style={{ borderColor: 'rgba(255,255,255,.08)' }}>
          <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at 50% 50%, ${C_PURPLE}, transparent 70%)` }} />
          <div className="relative z-10">
            <p className="mono text-sm tracking-widest text-white/30 mb-4">🔧 EN CONSTRUCCIÓN</p>
            <GlitchText text="TU PROGRESO SE GUARDA LOCALMENTE POR AHORA" as="h3" className="text-2xl mb-3" 
              style={{ fontFamily: F_DISPLAY, letterSpacing: '.03em' }} color={C_PURPLE} />
            <p className="text-sm text-white/45 max-w-md mx-auto">
              Pronto conectaremos este panel con tu cuenta real, para que tus clases y misiones persistan entre sesiones.
            </p>
          </div>
        </div>
      </div>

      {state.showJoinModal && (
        <JoinClassModal
          value={state.joinCodeInput} error={state.joinError} success={state.joinSuccess}
          onChange={setJoinCodeInput} onCancel={closeJoinModal} onSubmit={joinClass}
        />
      )}
    </div>
  )
}