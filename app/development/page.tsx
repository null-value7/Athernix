// view/ZonaDesarrolloView.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import * as THREE from 'three'
import { useZonaDesarrolloController } from '@/controllers/user/development'
import {
  STEMArea,
  STEMTopic,
  RoadmapCard,
  NewsItem,
  StatCard,
  getLevelBadge,
  getBibIcon,
} from '@/models/development'
import QuantumRoadmap from '@/components/development/QuantumRoadmap'

// ── Design tokens (estética módulos) ────────────────────────
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif"
const F_MONO = "'Plus Jakarta Sans', monospace"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

function tiltMove(e: React.MouseEvent, lift = -4, max = 10) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width - 0.5
  const py = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(e.currentTarget, { y: lift, rotationY: px * max, rotationX: -py * max, transformPerspective: 800, duration: 0.28, ease: 'power2.out' })
}
function tiltReset(e: React.MouseEvent) {
  gsap.to(e.currentTarget, { y: 0, rotationX: 0, rotationY: 0, duration: 0.35, ease: 'power2.out' })
}
function magneticMove(e: React.MouseEvent, strength = 0.2) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) * strength
  const y = (e.clientY - rect.top - rect.height / 2) * strength
  gsap.to(e.currentTarget, { x, y, duration: 0.25, ease: 'power2.out' })
}
function magneticReset(e: React.MouseEvent) {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1,0.4)' })
}

// ── Icons ──────────────────────────────────────────────────────
const IconSearch   = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>
const IconChevron  = ({ open }: { open: boolean }) => <svg className="w-4 h-4 transition-transform duration-300" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>
const IconBot      = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"/></svg>
const IconBook     = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg>
const IconArrow    = () => <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>
const IconExternal = () => <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
const IconMap      = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"/></svg>

// ── 3D Neural field background ─────────────────────────────────
function NeuralField3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 300)
    camera.position.set(0, 12, 28)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // ── Wave grid ──
    const w = 60, h = 40, segs = 40
    const waveGeo = new THREE.PlaneGeometry(w, h, segs, segs)
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0xff6b35, wireframe: true, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false
    })
    const wave = new THREE.Mesh(waveGeo, waveMat)
    wave.rotation.x = -Math.PI / 2.8
    wave.position.y = -8
    scene.add(wave)

    const wavePos = waveGeo.attributes.position.array as Float32Array
    const baseZ = new Float32Array(wavePos.length / 3)
    for (let i = 0; i < wavePos.length / 3; i++) baseZ[i] = wavePos[i * 3 + 2]

    // ── Floating particles ──
    const nodeCount = 120
    const pPos = new Float32Array(nodeCount * 3)
    const pCol = new Float32Array(nodeCount * 3)
    const palette = [new THREE.Color('#FF6B00'), new THREE.Color('#FF006E'), new THREE.Color('#FFD700')]
    for (let i = 0; i < nodeCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 55
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 35
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 25
      const col = palette[Math.floor(Math.random() * palette.length)]
      pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3))
    const pMat = new THREE.PointsMaterial({ size: 0.18, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ── Connecting lines (lighter) ──
    const linePositions: number[] = []
    for (let i = 0; i < nodeCount; i++) {
      const ax = pPos[i*3], ay = pPos[i*3+1], az = pPos[i*3+2]
      for (let j = i+1; j < Math.min(i+8, nodeCount); j++) {
        const d = Math.hypot(ax - pPos[j*3], ay - pPos[j*3+1], az - pPos[j*3+2])
        if (d < 7) linePositions.push(ax, ay, az, pPos[j*3], pPos[j*3+1], pPos[j*3+2])
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    const lineMat = new THREE.LineBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.05, blending: THREE.AdditiveBlending })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    // ── Orbiting rings ──
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(14, 0.04, 16, 100), new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.15, wireframe: true, blending: THREE.AdditiveBlending }))
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(9, 0.03, 16, 80), new THREE.MeshBasicMaterial({ color: 0xff006e, transparent: true, opacity: 0.12, wireframe: true, blending: THREE.AdditiveBlending }))
    ring1.position.set(0, 6, -10)
    ring2.position.set(0, -4, -6)
    scene.add(ring1, ring2)

    let mx = 0, my = 0, scrollY = 0, smoothScroll = 0
    let smoothMx = 0, smoothMy = 0
    let prevScroll = 0, scrollVelocity = 0
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset
      scrollVelocity = y - prevScroll
      prevScroll = y
      scrollY = y
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })

    let raf = 0
    const clock = new THREE.Clock()
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      if (!prefersReduced) {
        smoothMx += (mx - smoothMx) * 0.05
        smoothMy += (my - smoothMy) * 0.05
        smoothScroll += (scrollY - smoothScroll) * 0.08

        // Wave undulation (reactive to mouse, scroll, and constant time)
        for (let i = 0; i < wavePos.length / 3; i++) {
          const x = wavePos[i * 3]
          const y = wavePos[i * 3 + 1]
          wavePos[i * 3 + 2] = baseZ[i]
            + Math.sin(t * 1.4 + x * 0.18 + smoothScroll * 0.012) * 2.4
            + Math.cos(t * 1.1 + y * 0.15 + smoothMx) * 1.8
            + Math.sin(t * 3.0 + smoothScroll * 0.06 + i * 0.02) * 0.5
        }
        waveGeo.attributes.position.needsUpdate = true

        // Particles drift with scroll burst
        for (let i = 0; i < nodeCount; i++) {
          pPos[i * 3 + 1] += Math.sin(t * 0.6 + i * 0.5) * 0.02 + scrollVelocity * 0.002
          pPos[i * 3] += Math.cos(t * 0.5 + i * 0.5) * 0.015
          pPos[i * 3 + 2] += Math.sin(t * 0.4 + i) * 0.01
        }
        pGeo.attributes.position.needsUpdate = true

        // Camera parallax + scroll depth (stronger)
        camera.position.x += (smoothMx * 12 - camera.position.x) * 0.03
        camera.position.y += (12 + smoothMy * 8 - camera.position.y) * 0.03
        const targetZ = Math.max(5, 30 - smoothScroll * 0.045)
        camera.position.z += (targetZ - camera.position.z) * 0.04
        camera.lookAt(0, smoothScroll * 0.015, 0)

        // Scene tilt with scroll
        camera.rotation.z = smoothScroll * 0.0003

        // Global rotation
        particles.rotation.y = t * 0.04 + smoothScroll * 0.0005
        lines.rotation.y = t * 0.04 + smoothScroll * 0.0005
        wave.rotation.z = t * 0.02 + smoothMx * 0.06
        wave.rotation.x = -Math.PI / 2.8 + smoothScroll * 0.0004
        ring1.rotation.x = t * 0.08 + smoothMx * 0.15 + smoothScroll * 0.0006
        ring1.rotation.y = t * 0.12
        ring2.rotation.x = t * 0.10 + smoothMy * 0.15
        ring2.rotation.y = t * 0.18 + smoothScroll * 0.0004

        scrollVelocity *= 0.92
      }
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      renderer.dispose(); waveGeo.dispose(); waveMat.dispose(); pGeo.dispose(); pMat.dispose(); lineGeo.dispose(); lineMat.dispose(); ring1.geometry.dispose(); (ring1.material as THREE.Material).dispose(); ring2.geometry.dispose(); (ring2.material as THREE.Material).dispose()
    }
  }, [])

  return (
    <div className="pointer-events-none" style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(8,0,10,0.35) 65%, rgba(8,0,10,0.9) 100%)' }} />
    </div>
  )
}

// ── Stat card ──────────────────────────────────────────────────
function StatCardItem({ card, index }: { card: StatCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="stat-card flex flex-col items-center gap-1.5 p-5 rounded-2xl border cursor-default"
      style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(255,107,53,0.18)', transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={e => {
        const el = e.currentTarget
        el.style.borderColor = `${card.color}55`
        el.style.boxShadow   = `0 0 28px ${card.color}30`
        tiltMove(e, -8, 12)
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(255,107,53,0.2)'
        el.style.boxShadow   = 'none'
        tiltReset(e)
      }}>
      <span style={{ color: card.color, fontSize: '1.4rem', filter: `drop-shadow(0 0 6px ${card.color})` }}>{card.icon}</span>
      <span className="text-3xl font-black" style={{ fontFamily: F_BE, color: card.color, letterSpacing: '-0.02em' }}>{card.value}</span>
      <span className="text-xs text-center tracking-wider uppercase font-bold" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: F_MONO, fontSize: '0.65rem', letterSpacing: '0.15em' }}>{card.label}</span>
    </div>
  )
}

// ── STEM area card ─────────────────────────────────────────────
function STEMAreaCard({
  area, isActive, activeTopic,
  onToggleArea, onToggleTopic, onSendToChat,
}: {
  area:          STEMArea
  isActive:      boolean
  activeTopic:   string | null
  onToggleArea:  (id: string) => void
  onToggleTopic: (id: string) => void
  onSendToChat:  (prompt: string) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      height: isActive ? 'auto' : undefined,
      duration: 0.35,
      ease: 'power2.inOut',
    })
  }, [isActive])

  return (
    <div ref={cardRef}
      className="stem-card rounded-2xl overflow-hidden border"
      style={{
        background:   'rgba(18,8,22,0.88)',
        borderColor:  isActive ? `${area.color}60` : 'rgba(255,107,53,0.2)',
        boxShadow:    isActive ? `0 0 30px ${area.glow}` : 'none',
        transformStyle: 'preserve-3d', willChange: 'transform',
      }}
      onMouseMove={e => { e.currentTarget.style.borderColor = `${area.color}75`; e.currentTarget.style.boxShadow = isActive ? `0 0 40px ${area.glow}` : `0 0 30px ${area.glow}`; tiltMove(e, -4, 8) }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = isActive ? `${area.color}60` : 'rgba(255,107,53,0.2)'; e.currentTarget.style.boxShadow = isActive ? `0 0 30px ${area.glow}` : 'none'; tiltReset(e) }}>

      {/* Header — always visible */}
      <button onClick={() => onToggleArea(area.id)}
        className="w-full flex items-center gap-4 p-5 text-left transition-colors duration-200"
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.02)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}>

        {/* Icon badge */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: `${area.color}18`, border: `1px solid ${area.color}40`, color: area.color,
            filter: isActive ? `drop-shadow(0 0 8px ${area.color})` : 'none' }}>
          {area.icon}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs tracking-widest uppercase mb-0.5 font-bold"
            style={{ color: `${area.color}cc`, fontFamily: F_MONO, letterSpacing: '0.2em', fontSize: '0.6rem' }}>
            {area.area}
          </p>
          <h3 className="font-black text-sm tracking-wider"
            style={{ fontFamily: F_BE, color: '#ffffff', letterSpacing: '0.06em', fontSize: '0.82rem' }}>
            {area.title}
          </h3>
          <p className="text-xs mt-0.5 line-clamp-1 font-bold" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: F_MONO }}>
            {area.desc}
          </p>
        </div>

        <div className="flex-shrink-0" style={{ color: `${area.color}80` }}>
          <IconChevron open={isActive} />
        </div>
      </button>

      {/* Expanded content */}
      {isActive && (
        <div className="px-5 pb-5">
          <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, transparent, ${area.color}40, transparent)` }}/>

          {/* Topics list */}
          <p className="text-xs tracking-widest uppercase mb-3 font-bold"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: F_MONO, letterSpacing: '0.2em', fontSize: '0.58rem' }}>
            Temario
          </p>
          <div className="flex flex-col gap-2 mb-5">
            {area.topics.map(topic => {
              const badge     = getLevelBadge(topic.level)
              const topicOpen = activeTopic === topic.id
              return (
                <div key={topic.id} className="rounded-xl overflow-hidden"
                  style={{ border: `1px solid ${topicOpen ? area.color + '45' : 'rgba(255,107,53,0.15)'}`,
                    background: topicOpen ? `${area.color}08` : 'rgba(255,255,255,0.02)' }}>
                  {/* Topic header */}
                  <button onClick={() => onToggleTopic(topic.id)}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <div className="flex-1 flex items-center gap-2.5 min-w-0">
                      <span className="text-xs font-semibold truncate" style={{ color: '#ffffff', fontFamily: F_MONO, letterSpacing: '0.03em' }}>
                        {topic.label}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: `${badge.color}18`, border: `1px solid ${badge.color}60`, color: badge.color,
                          fontFamily: F_MONO, fontSize: '0.55rem', letterSpacing: '0.15em' }}>
                        {badge.label}
                      </span>
                    </div>
                    <div className="flex-shrink-0" style={{ color: `${area.color}70` }}>
                      <IconChevron open={topicOpen} />
                    </div>
                  </button>

                  {/* Topic expanded actions */}
                  {topicOpen && (
                    <div className="px-3.5 pb-3 flex gap-2">
                      <button onClick={() => onSendToChat(topic.prompt)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider"
                        style={{ background: `${area.color}20`, border: `2px solid ${area.color}50`,
                          color: area.color, fontFamily: F_MONO, letterSpacing: '0.1em', cursor: 'pointer', transformStyle: 'preserve-3d', willChange: 'transform' }}
                        onMouseMove={e => { e.currentTarget.style.background = `${area.color}28`; e.currentTarget.style.boxShadow = `0 0 12px ${area.color}30`; magneticMove(e, 0.2) }}
                        onMouseLeave={e => { e.currentTarget.style.background = `${area.color}18`; e.currentTarget.style.boxShadow = 'none'; magneticReset(e) }}>
                        <IconBot /> Preguntar a Ather
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Quantum Roadmap — only inside QUANTUM_LAB (fisica) */}
          {area.id === 'fisica' && (
            <div className="mb-5">
              <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, transparent, ${area.color}30, transparent)` }}/>
              <p className="text-xs tracking-widest uppercase mb-2 font-bold"
                style={{ color: `${area.color}99`, fontFamily: F_MONO, letterSpacing: '0.2em', fontSize: '0.58rem' }}>
                ⬡ Roadmap de Progresión
              </p>
              <p className="text-xs mb-3 font-bold" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: F_MONO, letterSpacing: '0.03em', fontSize: '0.65rem' }}>
                Árbol de progresión: cada tema se construye sobre sus prerequisitos.
              </p>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-3 mb-3 px-3 py-2 rounded-lg"
                style={{ background: 'rgba(0,0,0,0.25)', border: `1px solid ${area.color}20` }}>
                <div className="flex items-center gap-1.5">
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E5A0', boxShadow: '0 0 4px #00E5A0' }}/>
                  <span style={{ fontFamily: F_MONO, fontSize: 8, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>COMPLETADO</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFD700', boxShadow: '0 0 4px #FFD700' }}/>
                  <span style={{ fontFamily: F_MONO, fontSize: 8, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>DISPONIBLE</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#555' }}/>
                  <span style={{ fontFamily: F_MONO, fontSize: 8, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>BLOQUEADO</span>
                </div>
              </div>

              <div className="rounded-xl border p-3 overflow-x-auto"
                style={{ background: 'rgba(8,4,12,0.6)', borderColor: `${area.color}15` }}>
                <QuantumRoadmap onSendToChat={onSendToChat} />
              </div>
            </div>
          )}

          {/* Bibliography */}
          <p className="text-xs tracking-widest uppercase mb-2 font-bold"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: F_MONO, letterSpacing: '0.2em', fontSize: '0.58rem' }}>
            Bibliografía recomendada
          </p>
          <div className="flex flex-col gap-2">
            {area.bibliography.map((bib, i) => (
              <a key={i} href={bib.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg group"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,107,53,0.15)',
                  textDecoration: 'none', transformStyle: 'preserve-3d', willChange: 'transform' }}
                onMouseMove={e => { const el = e.currentTarget; el.style.background = 'rgba(255,255,255,0.05)'; el.style.borderColor = 'rgba(255,107,53,0.3)'; el.style.boxShadow = '0 0 16px rgba(255,107,53,0.12)'; magneticMove(e, 0.15) }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(255,255,255,0.02)'; el.style.borderColor = 'rgba(255,107,53,0.15)'; el.style.boxShadow = 'none'; magneticReset(e) }}>
                <span className="text-sm">{getBibIcon(bib.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate" style={{ color: '#ffffff', fontFamily: F_MONO }}>{bib.title}</p>
                  <p className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: F_MONO, fontSize: '0.62rem' }}>{bib.author}</p>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}><IconExternal /></span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Roadmap card ───────────────────────────────────────────────
function RoadmapCardItem({ card, onSendToChat }: { card: RoadmapCard; onSendToChat: (p: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="roadmap-card rounded-2xl p-5 border cursor-pointer"
      style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(255,107,53,0.18)', transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={e => {
        const el = e.currentTarget
        el.style.borderColor = `${card.color}60`
        el.style.boxShadow   = `0 0 28px ${card.color}30`
        tiltMove(e, -6, 10)
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(255,107,53,0.2)'
        el.style.boxShadow   = 'none'
        tiltReset(e)
      }}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
          style={{ background: `${card.color}20`, border: `2px solid ${card.color}50`, color: card.color }}>
          {card.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-black text-sm mb-0.5" style={{ fontFamily: F_BE, color: '#ffffff', fontSize: '0.78rem', letterSpacing: '0.04em' }}>
            {card.title}
          </h4>
          <p className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: F_MONO }}>{card.desc}</p>
        </div>
      </div>
      <button onClick={() => onSendToChat(card.prompt)}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold tracking-wider"
        style={{ background: `${card.color}20`, border: `2px solid ${card.color}50`, color: card.color,
          fontFamily: F_MONO, letterSpacing: '0.12em', cursor: 'pointer', transformStyle: 'preserve-3d', willChange: 'transform' }}
        onMouseMove={e => { e.currentTarget.style.background = `${card.color}28`; magneticMove(e, 0.2) }}
        onMouseLeave={e => { e.currentTarget.style.background = `${card.color}18`; magneticReset(e) }}>
        <IconMap /> VER ROADMAP EN ATHER
      </button>
    </div>
  )
}

// ── News card ──────────────────────────────────────────────────
function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer"
      className="news-card group block rounded-2xl p-4 border"
      style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(255,107,53,0.2)', textDecoration: 'none', transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={e => { const el = e.currentTarget; el.style.borderColor = `${item.tagColor}60`; el.style.background = 'rgba(18,8,22,0.95)'; el.style.boxShadow = `0 0 28px ${item.tagColor}22`; tiltMove(e, -5, 9) }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,107,53,0.2)'; el.style.background = 'rgba(18,8,22,0.88)'; el.style.boxShadow = 'none'; tiltReset(e) }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 rounded-full text-xs font-bold tracking-wider"
          style={{ background: `${item.tagColor}20`, border: `2px solid ${item.tagColor}60`, color: item.tagColor,
            fontFamily: F_MONO, fontSize: '0.58rem', letterSpacing: '0.15em' }}>
          {item.tag}
        </span>
        <span className="text-xs ml-auto" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: F_MONO, fontSize: '0.6rem' }}>{item.date}</span>
      </div>
      <h4 className="font-bold text-sm mb-1.5 leading-snug" style={{ color: '#ffffff', fontFamily: F_MONO, letterSpacing: '0.02em' }}>
        {item.title}
      </h4>
      <p className="text-xs leading-relaxed line-clamp-2 font-bold" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: F_MONO }}>{item.summary}</p>
      <div className="flex items-center gap-1 mt-3 text-xs font-bold tracking-wider"
        style={{ color: item.tagColor, fontFamily: F_MONO, letterSpacing: '0.1em', fontSize: '0.62rem' }}>
        LEER MÁS <IconArrow />
      </div>
    </a>
  )
}

// ── Main view ──────────────────────────────────────────────────
export default function ZonaDesarrolloView() {
  const {
    state, filteredAreas, roadmaps, news, statCards,
    toggleArea, toggleTopic, sendToChat, setSearch,
  } = useZonaDesarrolloController()

  const heroRef   = useRef<HTMLDivElement>(null)
  const statsRef  = useRef<HTMLDivElement>(null)
  const rootRef   = useRef<HTMLDivElement>(null)

  // ── Scroll progress + reveals ─────────────────────────────
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const updateProgress = () => {
      const bar = root.querySelector('.zd-progress-bar-inner') as HTMLElement | null
      if (!bar) return
      const h = document.documentElement
      const pct = (h.scrollTop || (document.body.scrollTop)) / ((h.scrollHeight - h.clientHeight) || 1)
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, pct))})`
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })

    if (!prefersReduced) {
      ScrollTrigger.batch('.stat-card, .stem-card, .roadmap-card, .news-card', {
        onEnter: batch => gsap.fromTo(batch, { opacity: 0, y: 30, rotateX: 15 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.55, stagger: 0.06, ease: 'power2.out' }),
        start: 'top 85%',
        once: true,
      })
    }

    return () => {
      window.removeEventListener('scroll', updateProgress)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  // ── GSAP entrance ─────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Ambient orb pulse
      gsap.to('.orb-zd1', { scale: 1.2, opacity: 0.5, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.orb-zd2', { scale: 1.15, opacity: 0.35, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })

      // Hero entrance with SplitText
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero-badge',  { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 })

      if (!prefersReduced) {
        const title = document.querySelector('.hero-title-text')
        if (title) {
          const split = new SplitText(title, { type: 'chars' })
          gsap.fromTo(split.chars,
            { opacity: 0, yPercent: 120, rotationX: -70 },
            { opacity: 1, yPercent: 0, rotationX: 0, duration: 0.85, stagger: 0.03, ease: 'back.out(1.7)', delay: 0.1 })
        }
      } else {
        tl.fromTo('.hero-title-text', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.2')
      }

      tl.fromTo('.hero-sub',    { opacity: 0 },          { opacity: 1, duration: 0.5 },       '-=0.3')
        .fromTo('.hero-cmd',    { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 }, '-=0.2')
        .fromTo('.hero-search', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        :root {
          --pink: #FF006E;
          --orange: #FF6B00;
          --yellow: #FFD700;
        }
        .line-clamp-1{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        #zd-search::placeholder{color:rgba(210,170,140,0.3);letter-spacing:0.08em}
        #zd-search:focus{outline:none;border-color:rgba(255,107,53,0.6);border-bottom-color:var(--orange);background:rgba(255,107,53,0.03);box-shadow:0 0 20px rgba(255,107,53,0.18),0 4px 14px rgba(0,0,0,0.25)}
        .hero-title-text,.hero-title-text div{display:inline-block;background:linear-gradient(90deg,var(--pink),var(--orange),var(--yellow));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
      `}</style>

      <div ref={rootRef} className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(135deg,#08040c 0%,#120818 50%,#08040c 100%)', fontFamily: F_MONO }}>

        {/* Progress bar */}
        <div className="zd-progress-bar fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
          style={{ background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))' }}>
          <div className="zd-progress-bar-inner" style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))', boxShadow: '0 0 12px rgba(255,107,53,0.4)', transform: 'scaleX(0)', transformOrigin: 'left' }} />
        </div>

        {/* 3D Neural background */}
        <NeuralField3D />

        {/* Ambient grid */}
        <div className="fixed inset-0 pointer-events-none z-0"
          style={{ opacity: 0.18,
            backgroundImage: 'linear-gradient(rgba(255,0,110,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,0,110,0.05) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,#000 0%,transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,#000 0%,transparent 85%)'
          }} />

        {/* Ambient orbs */}
        <div className="orb-zd1 fixed pointer-events-none rounded-full"
          style={{ width: 700, height: 700, top: '-10%', right: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(255,107,53,0.18) 0%,transparent 70%)', filter: 'blur(70px)' }}/>
        <div className="orb-zd2 fixed pointer-events-none rounded-full"
          style={{ width: 600, height: 600, bottom: '5%', left: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(255,0,110,0.15) 0%,transparent 70%)', filter: 'blur(80px)' }}/>

        {/* Scanlines */}
        <div className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: 0.04,
          background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.05) 2px,rgba(255,255,255,0.05) 4px)',
          mixBlendMode: 'overlay' }} />

        {/* Corner brackets */}
        {(['tl','tr','bl','br'] as const).map(pos => (
          <div key={pos} className="fixed pointer-events-none z-10"
            style={{
              width: 22, height: 22, opacity: 0.5,
              top: pos.startsWith('t') ? 18 : undefined,
              bottom: pos.startsWith('b') ? 18 : undefined,
              left: pos.endsWith('l') ? 18 : undefined,
              right: pos.endsWith('r') ? 18 : undefined,
              borderTop: pos.startsWith('t') ? '2px solid var(--orange)' : undefined,
              borderBottom: pos.startsWith('b') ? '2px solid var(--orange)' : undefined,
              borderLeft: pos.endsWith('l') ? '2px solid var(--orange)' : undefined,
              borderRight: pos.endsWith('r') ? '2px solid var(--orange)' : undefined,
            }} />
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

          {/* ── HERO ── */}
          <div ref={heroRef} className="text-center mb-14">
            {/* Works-with / badge row (reference image) */}
            <div className="hero-badge flex items-center justify-center gap-2 mb-6">
              <div className="flex items-center gap-2 px-5 py-2 rounded-full"
                style={{ background: 'rgba(255,107,53,0.1)', border: '2px solid rgba(255,107,53,0.25)' }}>
                <span style={{ color: 'var(--orange)', fontSize: '0.8rem' }}>◈</span>
                <span className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: 'rgba(255,107,53,0.8)', fontFamily: F_MONO, letterSpacing: '0.25em', fontSize: '0.7rem' }}>
                  Exploración activa
                </span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e5a0',
                  boxShadow: '0 0 8px #00e5a0', display: 'inline-block', animation: 'pulse 2s infinite' }}/>
              </div>
            </div>

            {/* Headline — multicolor like reference image */}
            <h1 className="hero-title font-black leading-none mb-6"
              style={{ fontFamily: F_BE, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.02em' }}>
              <span className="hero-title-text" style={{ background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ZONA DE DESARROLLO
              </span>
            </h1>

            <p className="hero-sub text-base max-w-2xl mx-auto mb-8 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.7)', fontFamily: F_MONO, letterSpacing: '0.04em', fontSize: '1rem' }}>
              Temarios STEM desde lo esencial hasta nivel intermedio. Explora con Ather IA, sigue roadmaps y descubre bibliografía curada.
            </p>

            {/* Terminal command (reference image detail) */}
            <div className="hero-cmd inline-flex items-center gap-3 px-5 py-2.5 rounded-xl mx-auto mb-8"
              style={{ background: 'rgba(8,4,14,0.9)', border: '2px solid rgba(255,107,53,0.25)',
                fontFamily: F_MONO }}>
              <span style={{ color: 'var(--orange)', fontSize: '0.8rem' }}>$</span>
              <span style={{ color: '#ffffff', fontSize: '0.78rem', letterSpacing: '0.05em' }}>
                ather explore --area stem --level basico
              </span>
            </div>

            {/* Search */}
            <div className="hero-search relative max-w-md mx-auto">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,107,53,0.5)' }}>
                <IconSearch />
              </div>
              <input id="zd-search"
                value={state.searchQuery}
                onChange={e => setSearch(e.target.value)}
                placeholder="BUSCAR ÁREA O TEMA..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.03)', border: '2px solid rgba(255,107,53,0.2)',
                  color: '#ffffff',
                  fontFamily: F_MONO, fontSize: '0.78rem', letterSpacing: '0.06em', caretColor: 'var(--orange)' }}
              />
            </div>
          </div>

          {/* ── STAT GRID (reference image layout) ── */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-14">
            {statCards.map((card, i) => <StatCardItem key={card.label} card={card} index={i}/>)}
          </div>

          {/* ── MAIN GRID: STEM areas + Roadmaps ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">

            {/* STEM areas — 2/3 width */}
            <div className="lg:col-span-2">
              <div className="section-hdr flex items-center gap-3 mb-6">
                <span style={{ color: 'var(--orange)', fontSize: '1.2rem' }}>◈</span>
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_BE, color: '#ffffff', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
                  ÁREAS STEM
                </h2>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }}/>
                <span className="text-xs font-bold" style={{ color: 'rgba(255,107,53,0.5)', fontFamily: F_MONO, fontSize: '0.7rem' }}>
                  {filteredAreas.length} módulos
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {filteredAreas.map(area => (
                  <STEMAreaCard
                    key={area.id}
                    area={area}
                    isActive={state.activeArea === area.id}
                    activeTopic={state.activeTopic}
                    onToggleArea={toggleArea}
                    onToggleTopic={toggleTopic}
                    onSendToChat={sendToChat}
                  />
                ))}
                {filteredAreas.length === 0 && (
                  <div className="text-center py-12 font-bold"
                    style={{ color: 'rgba(255,255,255,0.35)', fontFamily: F_MONO, letterSpacing: '0.1em', fontSize: '0.78rem' }}>
                    Sin resultados para "{state.searchQuery}"
                  </div>
                )}
              </div>
            </div>

            {/* Roadmaps sidebar — 1/3 width */}
            <div>
              <div className="section-hdr flex items-center gap-3 mb-6">
                <span style={{ color: 'var(--orange)', fontSize: '1.2rem' }}>⬡</span>
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_BE, color: '#ffffff', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
                  ROADMAPS
                </h2>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }}/>
              </div>

              <div className="flex flex-col gap-3">
                {roadmaps.map(card => (
                  <RoadmapCardItem key={card.id} card={card} onSendToChat={sendToChat}/>
                ))}
              </div>

              {/* Quick AI redirect */}
              <div className="mt-4 p-4 rounded-2xl border"
                style={{ background: 'rgba(255,107,53,0.06)', borderColor: 'rgba(255,107,53,0.25)',
                  borderStyle: 'dashed' }}>
                <p className="text-xs mb-2 tracking-wider uppercase font-bold"
                  style={{ color: 'rgba(255,107,53,0.7)', fontFamily: F_MONO, fontSize: '0.6rem', letterSpacing: '0.2em' }}>
                  ✦ Pregunta libre
                </p>
                <p className="text-xs mb-3 font-bold" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: F_MONO }}>
                  Envía cualquier pregunta directamente a Ather IA
                </p>
                <button onClick={() => sendToChat('')}
                  className="w-full py-2 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg,var(--orange),var(--yellow))', color: '#fff',
                    fontFamily: F_BE, fontSize: '0.65rem', letterSpacing: '0.15em', border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(255,107,53,0.3)', transformStyle: 'preserve-3d', willChange: 'transform' }}
                  onMouseMove={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(255,107,53,0.45)'; magneticMove(e, 0.2) }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,107,53,0.3)'; magneticReset(e) }}>
                  <IconBot /> ABRIR ATHER IA
                </button>
              </div>
            </div>
          </div>

          {/* ── STEM NEWS ── */}
          <div>
            <div className="section-hdr flex items-center gap-3 mb-6">
              <span style={{ color: 'var(--orange)', fontSize: '1.2rem' }}>◎</span>
              <h2 className="font-black tracking-widest uppercase"
                style={{ fontFamily: F_BE, color: '#ffffff', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
                NOTICIAS STEM
              </h2>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }}/>
              <span className="text-xs font-bold" style={{ color: 'rgba(255,107,53,0.5)', fontFamily: F_MONO, fontSize: '0.7rem' }}>
                Actualizadas mensualmente
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {news.map(item => <NewsCard key={item.id} item={item}/>)}
            </div>
          </div>

          {/* Footer stamp */}
          <div className="text-center mt-16">
            <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, var(--orange), transparent)', opacity: 0.5 }}></div>
            <p className="text-xs tracking-widest uppercase font-bold"
              style={{ color: 'rgba(255,107,53,0.3)', fontFamily: F_MONO, letterSpacing: '0.4em' }}>
              ✦ athernix · zona de desarrollo · stem · v2.0 ✦
            </p>
          </div>
        </div>
      </div>
    </>
  )
}