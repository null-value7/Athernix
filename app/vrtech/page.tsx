// @ts-nocheck
'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useVRTechnologyController } from '@/controllers/information/Vrtech';
import '../styles/vrtech.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function VRTechnologyPage() {
  const heroCanvasRef = useRef(null)
  const rootRef = useRef(null)

  const {
    state,
    info,
    pipeline,
    anatomy,
    headsets,
    toggleStage,
    toggleHeadset,
    goToModulos,
    goToChat,
  } = useVRTechnologyController()

  // ── THREE.JS: escena de partículas del headset en el hero ──
  useEffect(() => {
    if (typeof window === 'undefined') return
    const canvas = heroCanvasRef.current
    if (!canvas) return

    const W = canvas.offsetWidth || window.innerWidth
    const H = canvas.offsetHeight || window.innerHeight

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(58, W / H, 0.1, 200)
    camera.position.set(0, 0, 9)

    // --- Partículas formando un headset VR estilizado ---
    const N = 26000
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    const seed = new Float32Array(N * 3)

    const c1 = new THREE.Color('#FF006E')
    const c2 = new THREE.Color('#FF6B00')
    const c3 = new THREE.Color('#FFD700')

    for (let i = 0; i < N; i++) {
      const t = i / N
      let x, y, z

      if (t < 0.34) {
        // Lente izquierdo (anillo)
        const ang = Math.random() * Math.PI * 2
        const r = 0.95 + (Math.random() - 0.5) * 0.16
        x = -1.15 + Math.cos(ang) * r
        y = Math.sin(ang) * r
        z = (Math.random() - 0.5) * 0.5
      } else if (t < 0.68) {
        // Lente derecho (anillo)
        const ang = Math.random() * Math.PI * 2
        const r = 0.95 + (Math.random() - 0.5) * 0.16
        x = 1.15 + Math.cos(ang) * r
        y = Math.sin(ang) * r
        z = (Math.random() - 0.5) * 0.5
      } else if (t < 0.85) {
        // Puente / carcasa central
        const u = Math.random()
        x = (u - 0.5) * 2.1
        y = (Math.random() - 0.5) * 0.55
        z = 0.35 + (Math.random() - 0.5) * 0.2
      } else {
        // Correa trasera (arco envolvente)
        const ang = Math.PI * 0.5 + Math.random() * Math.PI
        const r = 3.0 + (Math.random() - 0.5) * 0.14
        x = Math.cos(ang) * r
        y = Math.sin(ang) * r * 0.7
        z = -1.6 + (Math.random() - 0.5) * 0.3
      }

      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      let r_, g_, b_
      if (t < 0.5) {
        const mix = t * 2
        r_ = c1.r + (c2.r - c1.r) * mix
        g_ = c1.g + (c2.g - c1.g) * mix
        b_ = c1.b + (c2.b - c1.b) * mix
      } else {
        const mix = (t - 0.5) * 2
        r_ = c2.r + (c3.r - c2.r) * mix
        g_ = c2.g + (c3.g - c2.g) * mix
        b_ = c2.b + (c3.b - c2.b) * mix
      }
      col[i * 3] = r_
      col[i * 3 + 1] = g_
      col[i * 3 + 2] = b_

      seed[i * 3] = Math.random() * 100
      seed[i * 3 + 1] = Math.random() * 100
      seed[i * 3 + 2] = Math.random() * Math.PI * 2
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos.slice(), 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.036,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const mesh = new THREE.Points(geo, mat)
    const group = new THREE.Group()
    group.add(mesh)
    scene.add(group)

    const base = pos.slice()

    let mx = 0, my = 0
    const onMouseMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2
      my = -((e.clientY - r.top) / r.height - 0.5) * 2
    }
    canvas.addEventListener('mousemove', onMouseMove)

    const timer = new THREE.Timer()
    let frameId

    function animate() {
      frameId = requestAnimationFrame(animate)
      const t = timer.getElapsed()
      const arr = geo.attributes.position.array

      for (let i = 0; i < N; i++) {
        const s0 = seed[i * 3], s1 = seed[i * 3 + 1]
        arr[i * 3] = base[i * 3] + Math.sin(t * 0.5 + s0) * 0.025
        arr[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * 0.4 + s1) * 0.025
        arr[i * 3 + 2] = base[i * 3 + 2] + Math.sin(t * 0.6 + s0) * 0.02
      }
      geo.attributes.position.needsUpdate = true

      group.rotation.y += 0.0022
      group.rotation.y += mx * 0.0018
      group.rotation.x += my * 0.0009

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
      cancelAnimationFrame(frameId)
      canvas.removeEventListener('mousemove', onMouseMove)
      resizeObserver.disconnect()
      geo.dispose()
      mat.dispose()
      renderer.dispose()
    }
  }, [])

  // ── GSAP: revelado progresivo de secciones al hacer scroll ──
  useEffect(() => {
    if (typeof window === 'undefined' || !rootRef.current) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.vrt-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      gsap.utils.toArray('.vrt-stagger').forEach((group) => {
        const items = group.querySelectorAll('.vrt-stagger-item')
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="vrt-root" style={{ paddingTop: '80px' }}>
      {/* HERO */}
      <section className="vrt-hero">
        <div className="vrt-hero-canvas-wrap">
          <canvas ref={heroCanvasRef}></canvas>
        </div>
        <div className="vrt-hero-content">
          <p className="vrt-eyebrow">{info.eyebrow}</p>
          <h1 className="vrt-title">
            <span>{info.titleLine1}</span>
            <span className="line2">{info.titleLine2}</span>
          </h1>
          <p className="vrt-sub">{info.sub}</p>
          <div className="vrt-scroll">
            <div className="s-line"></div>
            <span>EXPLORAR</span>
          </div>
        </div>
      </section>

      <div className="vrt-grad-line"></div>

      {/* MARQUEE */}
      <div className="vrt-mq">
        <div className="vrt-mq-track">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} style={{ display: 'inline-flex' }}>
              <span className="vrt-mq-item">TRACKING 6DoF <span>✦</span></span>
              <span className="vrt-mq-item">RENDERIZADO ESTÉREO <span>✦</span></span>
              <span className="vrt-mq-item">MOTION-TO-PHOTON <span>✦</span></span>
              <span className="vrt-mq-item">HAND TRACKING <span>✦</span></span>
              <span className="vrt-mq-item">OPENXR <span>✦</span></span>
              <span className="vrt-mq-item">FOVEATED RENDERING <span>✦</span></span>
              <span className="vrt-mq-item">HRTF AUDIO <span>✦</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* CÓMO FUNCIONA — PIPELINE */}
      <section className="py-28 px-6" id="como-funciona">
        <div className="vrt-sec-head vrt-reveal">
          <p className="vrt-sec-tag">PIPELINE_TÉCNICO</p>
          <h2 className="vrt-sec-title">
            ¿CÓMO FUNCIONA<br /><span className="grad">LA REALIDAD VIRTUAL?</span>
          </h2>
          <p className="mt-5 text-white/55 text-sm leading-relaxed max-w-xl mx-auto">
            Desde que mueves la cabeza hasta que tu cerebro percibe un mundo distinto,
            un headset ejecuta seis procesos encadenados, decenas de veces por segundo.
          </p>
        </div>

        <div className="vrt-stagger max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {pipeline.map((stage) => {
            const isActive = state.activeStage === stage.id
            return (
              <div
                key={stage.id}
                className={`vrt-stagger-item vrt-stage p-6 ${isActive ? 'active' : ''}`}
                onClick={() => toggleStage(stage.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="vrt-stage-num" style={{ color: stage.color }}>{stage.step}</span>
                    <h3 className="mt-2 font-bold tracking-tight text-lg" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '.02em' }}>
                      {stage.title}
                    </h3>
                  </div>
                  <span className="mono text-xs opacity-40">{isActive ? '−' : '+'}</span>
                </div>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">{stage.short}</p>

                <div className="vrt-stage-detail">
                  <p className="text-sm text-white/70 leading-relaxed">{stage.detail}</p>
                  <ul className="mt-4 space-y-2">
                    {stage.bullets.map((b, i) => (
                      <li key={i} className="text-xs text-white/50 flex gap-2">
                        <span style={{ color: stage.color }}>▸</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div className="vrt-grad-line"></div>

      {/* ANATOMÍA DEL HEADSET */}
      <section className="py-28 px-6" id="anatomia">
        <div className="vrt-sec-head vrt-reveal">
          <p className="vrt-sec-tag" style={{ color: 'var(--yellow)' }}>ANATOMÍA_DE_HARDWARE</p>
          <h2 className="vrt-sec-title">
            POR DENTRO<br /><span className="grad">DE UN HEADSET</span>
          </h2>
          <p className="mt-5 text-white/55 text-sm leading-relaxed max-w-xl mx-auto">
            Seis componentes físicos trabajan en conjunto para sostener toda la experiencia inmersiva.
          </p>
        </div>

        <div className="vrt-stagger max-w-3xl mx-auto space-y-4">
          {anatomy.map((part) => (
            <div key={part.id} className="vrt-stagger-item vrt-anatomy-item pl-5 py-2 flex items-start gap-4">
              <span className="text-lg" style={{ color: 'var(--yellow)' }}>{part.icon}</span>
              <div>
                <p className="font-semibold text-sm tracking-wide mono">{part.label}</p>
                <p className="text-sm text-white/55 mt-1">{part.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="vrt-grad-line"></div>

      {/* HEADSETS COMPATIBLES CON UNITY */}
      <section className="py-28 px-6" id="headsets-unity">
        <div className="vrt-sec-head vrt-reveal">
          <p className="vrt-sec-tag" style={{ color: 'var(--pink)' }}>UNITY_XR_ECOSYSTEM</p>
          <h2 className="vrt-sec-title">
            HEADSETS QUE<br /><span className="grad">SOPORTA UNITY</span>
          </h2>
          <p className="mt-5 text-white/55 text-sm leading-relaxed max-w-xl mx-auto">
            Unity se conecta a cada dispositivo mediante XR Plug-in Management. La mayoría
            converge hoy en el estándar abierto OpenXR, aunque algunos fabricantes mantienen
            SDKs propios para funciones avanzadas.
          </p>
        </div>

        <div className="vrt-stagger max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {headsets.map((h) => {
            const isActive = state.activeHeadset === h.id
            return (
              <div
                key={h.id}
                className={`vrt-stagger-item vrt-headset p-5 cursor-pointer ${isActive ? 'active' : ''}`}
                onClick={() => toggleHeadset(h.id)}
              >
                <div className="flex items-center justify-between">
                  <p className="mono text-[10px] tracking-widest text-white/40">{h.maker.toUpperCase()}</p>
                  <span className="vrt-badge" style={{ color: h.color }}>{h.type}</span>
                </div>
                <h3 className="mt-2 text-lg font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {h.name}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {h.unityPath.map((p) => (
                    <span key={p} className="mono text-[9px] px-2 py-1 rounded-full border border-white/10 text-white/50">
                      {p}
                    </span>
                  ))}
                </div>
                {isActive && (
                  <p className="mt-4 text-xs text-white/55 leading-relaxed">{h.notes}</p>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <div className="vrt-grad-line"></div>

      {/* CTA */}
      <section className="py-28 px-6 text-center vrt-reveal">
        <p className="mono text-xs tracking-widest text-white/40 mb-4">SIGUIENTE_PASO</p>
        <h2 className="vrt-sec-title mb-8">
          VE ESTA TECNOLOGÍA<br /><span className="grad">EN ACCIÓN</span>
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={goToModulos} className="vrt-cta px-7 py-3 rounded-full text-sm mono">
            VER MÓDULOS ATHERNIX →
          </button>
          <button
            onClick={goToChat}
            className="px-7 py-3 rounded-full text-sm mono border border-white/15 text-white/70 hover:border-white/35 transition-colors"
          >
            PREGUNTAR A ATHER
          </button>
        </div>
      </section>
    </div>
  )
}