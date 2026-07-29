// view/MyHeadsetsView.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { useMyHeadsetsController } from '@/controllers/information/headset'
import { HEADSET_META, TIER_LABEL, TYPE_LABEL, getHeadsetMeta, type VRGlassesModel } from '@/models/headset';

// ── Design tokens (estética módulos) ────────────────────────
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif"
const F_MONO = "'Plus Jakarta Sans', monospace"

// ── Icons ────────────────────────────────────────────────────────
const IconBack   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>
const IconCheck  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
const IconX      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
const IconArrowR = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>

// ── Section header helper ───────────────────────────────────────
function SectionHeader({ icon, title, right }: { icon: string; title: string; right?: React.ReactNode }) {
  return (
    <div className="section-hdr flex items-center gap-3 mb-5">
      <span style={{ color: 'var(--orange)', fontSize: '1rem' }}>{icon}</span>
      <h2 className="font-black tracking-widest uppercase" style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
        {title}
      </h2>
      <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }}/>
      {right}
    </div>
  )
}

// ── Hero: headset actual ─────────────────────────────────────────
function CurrentHeadsetHero({ model, setAt }: { model: VRGlassesModel; setAt: string | null }) {
  const meta = getHeadsetMeta(model)
  const isSet = model !== 'none'
  const dateLabel = setAt
    ? new Intl.DateTimeFormat('es-SV', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(setAt))
    : null

  return (
    <div className="current-headset-hero relative rounded-3xl overflow-hidden"
      style={{
        background: isSet 
          ? `linear-gradient(135deg, rgba(18,8,22,0.96) 0%, rgba(18,8,22,0.92) 100%)` 
          : 'linear-gradient(135deg, rgba(18,8,22,0.9) 0%, rgba(18,8,22,0.85) 100%)',
        border: `2px solid ${isSet ? meta.color + '50' : 'rgba(255,107,53,0.25)'}`,
        boxShadow: isSet 
          ? `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${meta.color}20` 
          : '0 20px 60px rgba(0,0,0,0.5)',
      }}>
      {/* Glow effect */}
      {isSet && (
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{ background: `radial-gradient(circle,${meta.color}18 0%,transparent 70%)`, filter: 'blur(60px)', transform: 'translate(30%,-30%)' }}/>
      )}

      <div className="relative flex flex-col lg:flex-row lg:items-center gap-8 p-8">
        {/* Large image */}
        <div className="w-full lg:w-1/3 h-64 lg:h-80 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0"
          style={{ background: `linear-gradient(180deg, ${meta.color}12 0%, transparent 100%)`, 
            border: `1px solid ${isSet ? meta.color + '30' : 'rgba(255,107,53,0.2)'}`,
            filter: isSet ? `drop-shadow(0 0 30px ${meta.color}30)` : 'none' }}>
          {meta.imageUrl ? (
            <img src={meta.imageUrl} alt={meta.label} className="w-full h-full object-contain p-6" />
          ) : (
            <span className="text-8xl">{meta.icon}</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-4">
          <div>
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(255,107,53,0.7)', fontFamily: F_MONO, letterSpacing: '0.24em', fontSize: '0.7rem' }}>
              {isSet ? 'Tu headset registrado' : 'Aún no has registrado un headset'}
            </p>
            <h1 className="font-black" style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: '0.02em' }}>
              {meta.label}
            </h1>
          </div>

          {isSet && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1.5 rounded-full text-xs font-black tracking-widest"
                style={{ background: `${meta.color}20`, border: `1px solid ${meta.color}50`, color: meta.color, fontFamily: F_MONO, fontSize: '0.65rem', letterSpacing: '0.16em' }}>
                {meta.brand}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-black tracking-widest"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,107,53,0.25)', color: 'rgba(200,150,120,0.8)', fontFamily: F_MONO, fontSize: '0.65rem', letterSpacing: '0.16em' }}>
                {TYPE_LABEL[meta.type]}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-black tracking-widest"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,107,53,0.25)', color: 'rgba(200,150,120,0.8)', fontFamily: F_MONO, fontSize: '0.65rem', letterSpacing: '0.16em' }}>
                {TIER_LABEL[meta.tier]}
              </span>
              {dateLabel && (
                <span className="text-xs" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_MONO, fontSize: '0.75rem' }}>
                  Registrado el {dateLabel}
                </span>
              )}
            </div>
          )}

          {!isSet && (
            <p className="text-sm" style={{ color: 'rgba(200,150,120,0.7)', fontFamily: F_MONO, fontSize: '0.9rem', lineHeight: 1.6 }}>
              Elige tu headset abajo para desbloquear las recomendaciones de compatibilidad de cada módulo.
            </p>
          )}

          {isSet && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm"
                style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_MONO, fontSize: '0.8rem' }}>
                <span style={{ color: meta.color }}>●</span>
                <span>SDK: {meta.sdk}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Tarjeta de compatibilidad por módulo ─────────────────────────
function ModuleCompatCard({ mod, hasHeadset }: {
  mod: { id: string; name: string; color: string; href: string; note: string; compatible: boolean }
  hasHeadset: boolean
}) {
  return (
    <Link href={mod.href}
      className="module-compat-card group relative flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300"
      style={{
        background: 'rgba(18,8,22,0.9)',
        borderColor: hasHeadset && mod.compatible ? mod.color + '45' : 'rgba(180,60,40,0.18)',
        opacity: hasHeadset && !mod.compatible ? 0.55 : 1,
      }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: hasHeadset && mod.compatible ? `${mod.color}20` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${hasHeadset && mod.compatible ? mod.color + '50' : 'rgba(180,60,40,0.2)'}`,
          color: hasHeadset && mod.compatible ? mod.color : 'rgba(200,150,120,0.4)',
        }}>
        {hasHeadset ? (mod.compatible ? <IconCheck/> : <IconX/>) : '?'}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-black text-sm truncate" style={{ fontFamily: F_BE, color: '#e8d5c8', fontSize: '0.85rem', letterSpacing: '0.03em' }}>
          {mod.name}
        </h4>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: F_MONO, fontSize: '0.7rem' }}>
          {!hasHeadset ? 'Registra un headset para ver compatibilidad' : mod.compatible ? mod.note : 'No recomendado con tu headset actual'}
        </p>
      </div>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" style={{ color: mod.color }}>
        <IconArrowR/>
      </span>
    </Link>
  )
}

// ── Headset Showcase - Single element with selector ──────────────────────────
function HeadsetShowcase({ models, currentId, isActive, saving, onSelect }: {
  models: VRGlassesModel[]
  currentId: VRGlassesModel
  isActive: boolean
  saving: boolean
  onSelect: (id: VRGlassesModel) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedId, setSelectedId] = useState<VRGlassesModel>(models[0])
  const [isExpanded, setIsExpanded] = useState(false)
  const meta = HEADSET_META[selectedId]

  // Update selected when current changes
  useEffect(() => {
    if (isActive && currentId) {
      setSelectedId(currentId)
    }
  }, [isActive, currentId])

  const handleSelect = (id: VRGlassesModel) => {
    setSelectedId(id)
    onSelect(id)
  }

  const isCurrentSelected = selectedId === currentId

  return (
    <div ref={containerRef}
      className="headset-showcase relative rounded-3xl overflow-hidden transition-all duration-500"
      style={{
        background: isCurrentSelected 
          ? 'linear-gradient(180deg, rgba(18,8,22,0.98) 0%, rgba(18,8,22,0.95) 100%)' 
          : 'linear-gradient(180deg, rgba(18,8,22,0.92) 0%, rgba(18,8,22,0.88) 100%)',
        border: `2px solid ${isCurrentSelected ? meta.color + '70' : 'rgba(255,107,53,0.25)'}`,
        pointerEvents: saving ? 'none' : 'auto', 
        opacity: saving ? 0.6 : 1,
      }}>

      {/* Glow effect */}
      {isCurrentSelected && (
        <div className="absolute inset-0 pointer-events-none" 
          style={{ background: `radial-gradient(circle at 50% 30%, ${meta.color}15 0%, transparent 60%)` }}/>
      )}

      <div className="flex flex-col lg:flex-row">
        {/* Left: Image */}
        <div className="lg:w-1/2 relative h-64 lg:h-auto min-h-[300px] flex items-center justify-center p-6 overflow-hidden"
          style={{ background: `linear-gradient(180deg, ${meta.color}08 0%, transparent 100%)` }}>
          {meta.imageUrl ? (
            <img 
              src={meta.imageUrl} 
              alt={meta.label} 
              className="w-full h-full object-contain drop-shadow-2xl transition-all duration-500"
              style={{ 
                filter: isCurrentSelected ? `drop-shadow(0 0 30px ${meta.color}40)` : 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
                transform: 'scale(1.1)'
              }}
            />
          ) : (
            <span className="text-9xl">{meta.icon}</span>
          )}
          
          {/* Active badge */}
          {isCurrentSelected && (
            <div className="absolute top-4 right-4 px-4 py-2 rounded-full flex items-center gap-2"
              style={{ background: meta.color, color: '#fff', boxShadow: `0 0 20px ${meta.color}60` }}>
              <IconCheck/>
              <span className="text-xs font-bold tracking-wider" style={{ fontFamily: F_MONO, fontSize: '0.75rem' }}>EN USO</span>
            </div>
          )}
        </div>

        {/* Right: Content */}
        <div className="lg:w-1/2 p-6 lg:p-8 space-y-4">
          {/* Brand & Tier */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold tracking-widest uppercase" 
              style={{ color: meta.color, fontFamily: F_MONO, fontSize: '0.75rem', letterSpacing: '0.2em' }}>
              {meta.brand}
            </span>
            <span className="px-3 py-1 rounded text-xs font-black tracking-wider"
              style={{ 
                background: `${meta.color}15`, 
                color: meta.color, 
                fontFamily: F_MONO, 
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                border: `1px solid ${meta.color}30`
              }}>
              {TIER_LABEL[meta.tier]}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-black leading-tight" 
            style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: 'clamp(1.5rem,3vw,2.5rem)', letterSpacing: '0.02em' }}>
            {meta.label}
          </h2>

          {/* Selector */}
          <div className="relative">
            <select
              value={selectedId}
              onChange={(e) => handleSelect(e.target.value as VRGlassesModel)}
              className="w-full px-4 py-3 rounded-xl text-xs font-bold tracking-widest uppercase cursor-pointer appearance-none transition-all duration-300"
              style={{
                background: 'rgba(18,8,22,0.9)',
                border: `2px solid ${meta.color + '40'}`,
                color: meta.color,
                fontFamily: F_MONO,
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
              }}>
              {models.map(id => (
                <option key={id} value={id} style={{ background: '#120816', color: '#ede0d4' }}>
                  {HEADSET_META[id].label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: meta.color, fontSize: '0.8rem' }}>
              ▼
            </div>
          </div>

          {/* Quick specs */}
          <div className="grid grid-cols-2 gap-3 text-xs"
            style={{ color: 'rgba(200,150,120,0.7)', fontFamily: F_MONO, fontSize: '0.7rem' }}>
            <div className="flex items-center gap-2">
              <span style={{ color: meta.color }}>●</span>
              <span className="truncate">{meta.resolution}</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: meta.color }}>●</span>
              <span className="truncate">{meta.refreshRate}</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: meta.color }}>●</span>
              <span className="truncate">{meta.fov}</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: meta.color }}>●</span>
              <span className="truncate">{meta.releaseYear}</span>
            </div>
          </div>

          {/* Expandable details */}
          <div className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: isExpanded ? '600px' : '0px' }}>
            <div className="pt-4 space-y-3 border-t"
              style={{ borderColor: 'rgba(255,107,53,0.15)' }}>
              
              {/* Controllers */}
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold" style={{ color: meta.color, fontFamily: F_MONO, minWidth: '70px' }}>
                  CONTROL
                </span>
                <span className="text-xs" style={{ color: 'rgba(200,150,120,0.8)', fontFamily: F_MONO, lineHeight: 1.5 }}>
                  {meta.controllers}
                </span>
              </div>

              {/* Display Tech */}
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold" style={{ color: meta.color, fontFamily: F_MONO, minWidth: '70px' }}>
                  DISPLAY
                </span>
                <span className="text-xs" style={{ color: 'rgba(200,150,120,0.8)', fontFamily: F_MONO, lineHeight: 1.5 }}>
                  {meta.displayTech}
                </span>
              </div>

              {/* Tracking */}
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold" style={{ color: meta.color, fontFamily: F_MONO, minWidth: '70px' }}>
                  TRACKING
                </span>
                <span className="text-xs" style={{ color: 'rgba(200,150,120,0.8)', fontFamily: F_MONO, lineHeight: 1.5 }}>
                  {meta.tracking}
                </span>
              </div>

              {/* Features */}
              {meta.features && meta.features.length > 0 && (
                <div className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {meta.features.map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full text-xs"
                        style={{ 
                          background: `${meta.color}12`, 
                          color: meta.color, 
                          fontFamily: F_MONO, 
                          fontSize: '0.65rem',
                          border: `1px solid ${meta.color}25`
                        }}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 py-4 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300"
              style={{
                background: isCurrentSelected 
                  ? `linear-gradient(135deg, ${meta.color}30 0%, ${meta.color}15 100%)` 
                  : 'rgba(255,255,255,0.03)',
                border: `2px solid ${isCurrentSelected ? meta.color + '60' : 'rgba(255,107,53,0.25)'}`,
                color: isCurrentSelected ? meta.color : 'rgba(200,150,120,0.6)',
                fontFamily: F_MONO, 
                fontSize: '0.75rem', 
                letterSpacing: '0.15em', 
                cursor: 'pointer',
              }}
              onClick={() => handleSelect(selectedId)}>
              {isCurrentSelected ? 'SELECCIONADO' : 'SELECCIONAR'}
            </button>
            
            <button
              className="px-4 py-4 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `2px solid rgba(255,107,53,0.25)`,
                color: 'rgba(200,150,120,0.6)',
                fontFamily: F_MONO, 
                fontSize: '0.75rem', 
                letterSpacing: '0.15em', 
                cursor: 'pointer',
              }}
              onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? '▲' : '▼'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Toast ─────────────────────────────────────────────────────────
function Toast({ text, ok }: { text: string; ok: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { gsap.fromTo(ref.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }) }, [text])
  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl flex items-center gap-2.5"
      style={{ background: 'rgba(12,6,14,0.96)', border: `1px solid ${ok ? 'rgba(0,229,160,0.4)' : 'rgba(255,78,80,0.4)'}`,
        boxShadow: '0 8px 30px rgba(0,0,0,0.6)' }}>
      <span style={{ color: ok ? '#00e5a0' : '#ff4e50' }}>{ok ? <IconCheck/> : <IconX/>}</span>
      <span className="text-xs" style={{ color: '#ede0d4', fontFamily: F_MONO, fontSize: '0.8rem' }}>{text}</span>
    </div>
  )
}

// ── MAIN VIEW ──────────────────────────────────────────────────
export default function MyHeadsetsView() {
  const { state, currentMeta, models, compatibility, toast, selectHeadset } = useMyHeadsetsController()
  const containerRef = useRef<HTMLDivElement>(null)
  const heroCanvasRef = useRef<HTMLCanvasElement>(null)

  // Three.js Hero Animation - Headset Lens Visualization
  useEffect(() => {
    if (!heroCanvasRef.current || typeof window === 'undefined') return
    
    const canvas = heroCanvasRef.current
    const W = canvas.offsetWidth || 800
    const H = canvas.offsetHeight || 400

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200)
    camera.position.set(0, 0, 8)

    // Create headset lens visualization - concentric rings representing lens optics
    const ringsGroup = new THREE.Group()
    
    const ringConfigs = [
      { radius: 1.5, color: '#FF006E', segments: 64, thickness: 0.02 },
      { radius: 2.2, color: '#FF6B00', segments: 80, thickness: 0.015 },
      { radius: 3.0, color: '#FFD700', segments: 96, thickness: 0.01 },
      { radius: 3.8, color: '#FF006E', segments: 120, thickness: 0.008 },
    ]

    ringConfigs.forEach((config, i) => {
      const geometry = new THREE.TorusGeometry(config.radius, config.thickness, 16, config.segments)
      const material = new THREE.MeshBasicMaterial({ 
        color: config.color,
        transparent: true,
        opacity: 0.6,
        wireframe: true
      })
      const ring = new THREE.Mesh(geometry, material)
      ring.userData = { 
        baseRotation: Math.random() * Math.PI * 2,
        rotationSpeed: (i + 1) * 0.001,
        baseScale: 1
      }
      ringsGroup.add(ring)
    })

    // Add floating particles representing tracking points
    const particleCount = 500
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    const color1 = new THREE.Color('#FF006E')
    const color2 = new THREE.Color('#FF6B00')
    const color3 = new THREE.Color('#FFD700')

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2 + Math.random() * 3

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      particlePositions[i * 3 + 2] = r * Math.cos(phi)

      const colorChoice = Math.random()
      let color
      if (colorChoice < 0.33) color = color1
      else if (colorChoice < 0.66) color = color2
      else color = color3

      particleColors[i * 3] = color.r
      particleColors[i * 3 + 1] = color.g
      particleColors[i * 3 + 2] = color.b
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    ringsGroup.add(particles)

    scene.add(ringsGroup)

    // Add central glow representing lens center
    const glowGeometry = new THREE.SphereGeometry(0.5, 32, 32)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: '#FF6B00',
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    })
    const glow = new THREE.Mesh(glowGeometry, glowMaterial)
    ringsGroup.add(glow)

    let mx = 0, my = 0
    const onMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2
      my = -((e.clientY - r.top) / r.height - 0.5) * 2
    }
    canvas.addEventListener('mousemove', onMouseMove)

    const timer = new THREE.Timer()
    let animationFrameId: number

    function animate() {
      animationFrameId = requestAnimationFrame(animate)
      const t = timer.getElapsed()

      // Animate rings
      ringsGroup.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh && child.geometry.type === 'TorusGeometry') {
          const data = child.userData
          child.rotation.x = data.baseRotation + t * data.rotationSpeed
          child.rotation.y = data.baseRotation + t * data.rotationSpeed * 0.7
          
          // Pulsing effect
          const scale = data.baseScale + Math.sin(t * 2 + i) * 0.05
          child.scale.set(scale, scale, scale)
        }
      })

      // Animate particles
      const positions = particleGeometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3
        const iy = ix + 1
        const iz = ix + 2
        
        // Gentle floating motion
        positions[iy] += Math.sin(t + positions[ix]) * 0.002
        positions[ix] += Math.cos(t + positions[iz]) * 0.002
      }
      particleGeometry.attributes.position.needsUpdate = true

      // Rotate entire group based on mouse
      ringsGroup.rotation.y += mx * 0.01
      ringsGroup.rotation.x += my * 0.01

      // Gentle auto-rotation
      ringsGroup.rotation.y += 0.002

      // Pulse the central glow
      const glowScale = 1 + Math.sin(t * 3) * 0.2
      glow.scale.set(glowScale, glowScale, glowScale)

      renderer.render(scene, camera)
    }
    animate()

    const resizeObserver = new ResizeObserver(() => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener('mousemove', onMouseMove)
      resizeObserver.disconnect()
      particleGeometry.dispose()
      particleMaterial.dispose()
      glowGeometry.dispose()
      glowMaterial.dispose()
      ringsGroup.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
          if (child.material instanceof THREE.Material) {
            child.material.dispose()
          }
        }
      })
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero-intro', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo('.current-headset-hero', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo('.section-hdr', { opacity: 0, x: -16 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
        .fromTo('.module-compat-card', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, '-=0.3')
        .fromTo('.headset-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.4 }, '-=0.3')
    }, containerRef)
    return () => ctx.revert()
  }, [state.loading])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        :root {
          --pink: #FF006E;
          --orange: #FF6B00;
          --yellow: #FFD700;
        }
      `}</style>

      <div ref={containerRef} className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(135deg,#0d0608 0%,#120818 50%,#080410 100%)', fontFamily: F_MONO }}>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-16">

          {/* HERO SECTION */}
          <section className="hero-intro relative">
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
              <div className="canvas-glow" style={{ background: 'radial-gradient(var(--orange),transparent 70%)', width: '600px', height: '600px', position: 'absolute', top: '-20%', right: '-10%', filter: 'blur(80px)' }}></div>
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <p className="eyebrow text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'rgba(255,107,53,0.6)', fontFamily: F_MONO, letterSpacing: '0.2em' }}>
                  [ PLATAFORMA_XR // HEADSETS // 2026 ]
                </p>
                <h1 style={{ fontFamily: F_BE, fontSize: 'clamp(2.5rem,6vw,4rem)', lineHeight: 0.9 }}>
                  <span className="line1" style={{ display: 'block' }}>MIS</span>
                  <span className="line2" style={{ display: 'block' }}>HEADSETS</span>
                </h1>
                <p className="sub text-sm mt-4 max-w-lg" style={{ color: 'rgba(200,160,140,0.7)', fontFamily: F_MONO, letterSpacing: '0.02em' }}>
                  Registra tu dispositivo VR para que Athernix adapte cada módulo a sus capacidades reales.
                </p>
                <Link href="/home" className="inline-flex items-center gap-2 mt-6 text-xs font-bold tracking-widest uppercase transition-all hover:opacity-70"
                  style={{ color: 'var(--orange)', fontFamily: F_MONO, letterSpacing: '0.15em' }}>
                  <IconBack/> VOLVER AL INICIO
                </Link>
              </div>
              <div className="flex-1 w-full lg:w-1/2">
                <div className="module-canvas-wrap relative rounded-2xl overflow-hidden" style={{ background: 'rgba(18,8,22,0.8)', border: '1px solid rgba(255,107,53,0.2)' }}>
                  <canvas ref={heroCanvasRef} className="w-full h-80 lg:h-96"></canvas>
                </div>
              </div>
            </div>
          </section>

          <div className="grad-line" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--orange), transparent)', opacity: 0.5 }}></div>

          {/* MARQUEE */}
          <div className="mq overflow-hidden py-4" style={{ background: 'rgba(18,8,22,0.5)' }}>
            <div className="mq-t flex gap-8 whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
              <span className="mqi text-sm font-bold" style={{ color: 'rgba(255,107,53,0.6)', fontFamily: F_BE }}>META QUEST <span style={{ color: 'var(--orange)' }}>✦</span></span>
              <span className="mqi text-sm font-bold" style={{ color: 'rgba(255,107,53,0.6)', fontFamily: F_BE }}>APPLE VISION PRO <span style={{ color: 'var(--pink)' }}>✦</span></span>
              <span className="mqi text-sm font-bold" style={{ color: 'rgba(255,107,53,0.6)', fontFamily: F_BE }}>VALVE INDEX <span style={{ color: 'var(--yellow)' }}>✦</span></span>
              <span className="mqi text-sm font-bold" style={{ color: 'rgba(255,107,53,0.6)', fontFamily: F_BE }}>HTC VIVE <span style={{ color: 'var(--orange)' }}>✦</span></span>
              <span className="mqi text-sm font-bold" style={{ color: 'rgba(255,107,53,0.6)', fontFamily: F_BE }}>PICO <span style={{ color: 'var(--pink)' }}>✦</span></span>
              <span className="mqi text-sm font-bold" style={{ color: 'rgba(255,107,53,0.6)', fontFamily: F_BE }}>PSVR2 <span style={{ color: 'var(--yellow)' }}>✦</span></span>
              <span className="mqi text-sm font-bold" style={{ color: 'rgba(255,107,53,0.6)', fontFamily: F_BE }}>ATHERNIX XR <span style={{ color: 'var(--orange)' }}>✦</span></span>
              <span className="mqi text-sm font-bold" style={{ color: 'rgba(255,107,53,0.6)', fontFamily: F_BE }}>WEBXR <span style={{ color: 'var(--pink)' }}>✦</span></span>
            </div>
          </div>

          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>

          <div className="grad-line" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--orange), transparent)', opacity: 0.5 }}></div>

          {/* Hero: headset actual */}
          {state.loading ? (
            <div className="rounded-2xl border p-10 text-center" style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(255,107,53,0.2)' }}>
              <span className="text-xs" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_MONO }}>Cargando tu headset...</span>
            </div>
          ) : (
            <CurrentHeadsetHero model={state.current} setAt={state.setAt}/>
          )}

          {/* Compatibilidad con módulos */}
          <section>
            <SectionHeader icon="◈" title="COMPATIBILIDAD CON MÓDULOS ATHERNIX"/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {compatibility.map(mod => (
                <ModuleCompatCard key={mod.id} mod={mod} hasHeadset={state.current !== 'none'}/>
              ))}
            </div>
          </section>

          <div className="grad-line" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--orange), transparent)', opacity: 0.5 }}></div>

          {/* Catálogo de headsets */}
          <section>
            <SectionHeader icon="⬡" title="CATÁLOGO DE HEADSETS" right={
              <span className="text-xs font-bold" style={{ color: 'rgba(255,107,53,0.5)', fontFamily: F_MONO, letterSpacing: '0.15em' }}>
                {models.length} MODELOS SOPORTADOS
              </span>
            }/>
            <p className="text-xs mb-6 -mt-3" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_MONO, letterSpacing: '0.05em' }}>
              Explora y selecciona el headset que usas para acceder a recomendaciones y ajustes específicos de cada módulo.
            </p>
            <HeadsetShowcase 
              models={models}
              currentId={state.current}
              isActive={state.current !== 'none'}
              saving={state.saving}
              onSelect={selectHeadset}
            />
          </section>

          <div className="grad-line" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--orange), transparent)', opacity: 0.5 }}></div>

          {/* Ayuda */}
          <div className="rounded-2xl border p-6 flex items-start gap-4"
            style={{ background: 'rgba(18,8,22,0.7)', borderColor: 'rgba(255,107,53,0.2)' }}>
            <span style={{ color: 'var(--orange)', fontSize: '1.25rem' }}>◈</span>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_MONO, letterSpacing: '0.02em' }}>
              ¿No encuentras tu modelo exacto? Selecciona el más parecido de tu misma marca — Athernix ajusta
              automáticamente la calidad según el hardware real detectado al conectar tu headset.
            </p>
          </div>

          {/* MARQUEE 2 */}
          <div className="mq overflow-hidden py-4" style={{ background: 'rgba(18,8,22,0.5)' }}>
            <div className="mq-t flex gap-8 whitespace-nowrap" style={{ animation: 'marquee 25s linear infinite reverse' }}>
              <span className="mqi text-sm font-bold" style={{ color: 'rgba(255,107,53,0.4)', fontFamily: F_MONO }}>UNITY ENGINE <span>◈</span></span>
              <span className="mqi text-sm font-bold" style={{ color: 'rgba(255,107,53,0.4)', fontFamily: F_MONO }}>META QUEST PRO <span>◈</span></span>
              <span className="mqi text-sm font-bold" style={{ color: 'rgba(255,107,53,0.4)', fontFamily: F_MONO }}>UNREAL ENGINE 5 <span>◈</span></span>
              <span className="mqi text-sm font-bold" style={{ color: 'rgba(255,107,53,0.4)', fontFamily: F_MONO }}>WEBXR <span>◈</span></span>
              <span className="mqi text-sm font-bold" style={{ color: 'rgba(255,107,53,0.4)', fontFamily: F_MONO }}>HAPTIC FEEDBACK <span>◈</span></span>
              <span className="mqi text-sm font-bold" style={{ color: 'rgba(255,107,53,0.4)', fontFamily: F_MONO }}>OPENXR <span>◈</span></span>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast text={toast.text} ok={toast.ok}/>}
    </>
  )
}