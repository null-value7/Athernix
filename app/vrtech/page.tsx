// @ts-nocheck
'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useVRTechnologyController } from '@/controllers/information/Vrtech';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TextSplitter } from '@/components/ui/TextSplitter';
import { MagneticElement } from '@/components/ui/MagneticElement';
import { ParallaxLayer } from '@/components/ui/ParallaxLayer';
import AwardWinning3D from '@/components/ui/AwardWinning3D';
import LiquidGlassCard from '@/components/ui/LiquidGlassCard';
import '../styles/vrtech.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  
  // Lenis smooth scroll integration
  if (typeof window !== 'undefined' && window.Lenis) {
    const lenis = new window.Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      orientation: 'vertical'
    })
    
    lenis.on('scroll', ScrollTrigger.update)
    
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
  }
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

    const clock = new THREE.Clock()
    let frameId

    function animate() {
      frameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
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
      // Mouse parallax state
      let mouseX = 0
      let mouseY = 0
      let targetMouseX = 0
      let targetMouseY = 0
      let parallaxRafId: number | null = null

      const handleMouseMove = (e) => {
        targetMouseX = (e.clientX / window.innerWidth) - 0.5
        targetMouseY = (e.clientY / window.innerHeight) - 0.5
      }

      window.addEventListener('mousemove', handleMouseMove)

      const updateParallax = () => {
        mouseX += (targetMouseX - mouseX) * 0.05
        mouseY += (targetMouseY - mouseY) * 0.05

        // Enhanced parallax for hero canvas - more interactive
        const parallaxX = mouseX * 50
        const parallaxY = mouseY * 50
        
        if (heroCanvasRef.current) {
          gsap.to(heroCanvasRef.current, {
            x: parallaxX,
            y: parallaxY,
            rotationX: -mouseY * 15,
            rotationY: mouseX * 15,
            scale: 1 + mouseX * 0.05,
            duration: 0.4,
            ease: 'power2.out'
          })
        }
        
        // Interactive glow effect
        const glowElement = document.querySelector('.vrt-hero-glow')
        if (glowElement) {
          const glowX = mouseX * 100
          const glowY = mouseY * 100
          gsap.to(glowElement, {
            x: glowX,
            y: glowY,
            scale: 1 + mouseY * 0.3,
            duration: 0.6,
            ease: 'power2.out'
          })
        }

        parallaxRafId = requestAnimationFrame(updateParallax)
      }

      updateParallax()

      // Award-winning scroll animations with 3D effects
      
      // Hero 3D parallax with perspective - enhanced
      gsap.to('.vrt-hero-canvas-wrap', {
        y: -180,
        scale: 1.2,
        rotationX: 8,
        rotationY: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: '.vrt-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
      
      gsap.to('.vrt-hero-glow', {
        scale: 2.0,
        opacity: 0.5,
        rotation: 45,
        ease: 'none',
        scrollTrigger: {
          trigger: '.vrt-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
      
      // Hero content subtle fade out - enhanced
      gsap.to('.vrt-hero-content', {
        opacity: 0.15,
        scale: 0.9,
        y: -80,
        rotationX: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.vrt-hero',
          start: 'top top',
          end: '70% top',
          scrub: 0.8,
        },
      })
      
      // Section headers with 3D reveal
      gsap.utils.toArray('.vrt-sec-head').forEach((head, i) => {
        gsap.fromTo(
          head,
          { 
            opacity: 0, 
            y: 60,
            rotationX: 15,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: head,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        )
      })
      
      // Pipeline cards with 3D stagger
      gsap.utils.toArray('.vrt-stagger').forEach((group) => {
        const items = group.querySelectorAll('.vrt-stagger-item')
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { 
              opacity: 0, 
              y:80,
              rotationY: -10,
              rotationX: 5,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              rotationY: 0,
              rotationX: 0,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 1,
              },
            }
          )
        })
      })
      
      // Anatomy items with slide 3D effect
      gsap.utils.toArray('.vrt-anatomy-item').forEach((item, i) => {
        gsap.fromTo(
          item,
          { 
            opacity: 0, 
            x: -60,
            rotationY: 20,
            scale: 0.9
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        )
      })
      
      // Headset cards with scale 3D effect
      gsap.utils.toArray('.vrt-headset').forEach((item, i) => {
        gsap.fromTo(
          item,
          { 
            opacity: 0, 
            y: 60,
            rotationX: 15,
            scale: 0.85
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        )
      })
      
      // Marquee parallax
      gsap.to('.vrt-mq-track', {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.vrt-mq',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
      
      // Section dividers with fade
      gsap.utils.toArray('.section-divider').forEach((divider) => {
        gsap.fromTo(
          divider,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: divider,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
      
      // CTA button with 3D reveal
      gsap.fromTo('.vrt-cta',
        { 
          opacity: 0, 
          y: 40,
          rotationX: 10,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.vrt-cta',
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      )


      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        if (parallaxRafId !== null) {
          cancelAnimationFrame(parallaxRafId)
        }
        ScrollTrigger.getAll().forEach(t => t.kill())
      }
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="vrt-root">
      {/* Award-winning 3D background */}
      <AwardWinning3D 
        containerId="vrtech-3d-bg"
        variant="tunnel"
        colors={{ primary: '#FF006E', secondary: '#FF6B00', tertiary: '#FFD700' }}
        intensity={2.0}
        interactive={true}
      />

      {/* HERO */}
      <section className="vrt-hero">
        <div className="vrt-hero-canvas-wrap">
          <canvas ref={heroCanvasRef}></canvas>
        </div>
        <div className="vrt-hero-glow"></div>
        <div className="vrt-hero-content">
          <ScrollReveal effect="fadeDown" delay={0.1}>
            <p className="vrt-eyebrow">{info.eyebrow}</p>
          </ScrollReveal>
          <h1 className="vrt-title">
            <TextSplitter as="span" text={info.titleLine1 || ''} effect="rise" />
            <TextSplitter as="span" className="line2" text={info.titleLine2 || ''} effect="cascade" delay={0.2} />
          </h1>
          <ScrollReveal effect="fadeUp" delay={0.4}>
            <p className="vrt-sub">{info.sub}</p>
          </ScrollReveal>
          <ScrollReveal effect="fadeUp" delay={0.6}>
            <div className="vrt-scroll float-medium">
              <div className="s-line"></div>
              <span>EXPLORAR</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="line-gradient-animated section-divider"></div>

      {/* MARQUEE */}
      <div className="vrt-mq">
        <div className="vrt-mq-track">
          {[...Array(4)].map((_, dup) => (
            <div key={dup} style={{ display: 'inline-flex' }}>
              <span className="vrt-mq-item">TRACKING 6DoF <span className="sparkle">✦</span></span>
              <span className="vrt-mq-item">RENDERIZADO ESTÉREO <span className="sparkle">✦</span></span>
              <span className="vrt-mq-item">MOTION-TO-PHOTON <span className="sparkle">✦</span></span>
              <span className="vrt-mq-item">HAND TRACKING <span className="sparkle">✦</span></span>
              <span className="vrt-mq-item">OPENXR <span className="sparkle">✦</span></span>
              <span className="vrt-mq-item">FOVEATED RENDERING <span className="sparkle">✦</span></span>
              <span className="vrt-mq-item">HRTF AUDIO <span className="sparkle">✦</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* CÓMO FUNCIONA — PIPELINE */}
      <section className="py-28 px-6" id="como-funciona">
        <div className="vrt-sec-head vrt-reveal">
          <p className="vrt-sec-tag">PIPELINE_TÉCNICO</p>
          <h2 className="vrt-sec-title">
            <TextSplitter as="span" text="¿CÓMO FUNCIONA" effect="rise" />
            <br />
            <TextSplitter as="span" className="grad text-gradient-atx" text="LA REALIDAD VIRTUAL?" effect="cascade" delay={0.2} />
          </h2>
          <ScrollReveal effect="fadeUp" delay={0.3}>
            <p className="mt-5 text-white/55 text-sm leading-relaxed max-w-xl mx-auto">
              Desde que mueves la cabeza hasta que tu cerebro percibe un mundo distinto,
              un headset ejecuta seis procesos encadenados, decenas de veces por segundo.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal effect="fadeUp" stagger={0.1}>
          <div className="vrt-stagger max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {pipeline.map((stage, index) => {
              const isActive = state.activeStage === stage.id
              return (
                <LiquidGlassCard
                  key={stage.id}
                  intensity={isActive ? "medium" : "subtle"}
                  glowColor={`${stage.color}30`}
                  className="vrt-stagger-item vrt-stage"
                  hoverEffect={true}
                  onClick={() => toggleStage(stage.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                <div className="p-6">
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

                  <div className={`vrt-stage-detail ${isActive ? 'active' : ''}`}>
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
                </LiquidGlassCard>
              )
            })}
          </div>
        </ScrollReveal>
      </section>

      <div className="line-gradient-animated section-divider"></div>

      {/* ANATOMÍA DEL HEADSET */}
      <section className="py-28 px-6" id="anatomia">
        <div className="vrt-sec-head vrt-reveal">
          <p className="vrt-sec-tag" style={{ color: 'var(--yellow)' }}>ANATOMÍA_DE_HARDWARE</p>
          <h2 className="vrt-sec-title">
            <TextSplitter as="span" text="POR DENTRO" effect="rise" />
            <br />
            <TextSplitter as="span" className="grad text-gradient-atx" text="DE UN HEADSET" effect="cascade" delay={0.2} />
          </h2>
          <ScrollReveal effect="fadeUp" delay={0.3}>
            <p className="mt-5 text-white/55 text-sm leading-relaxed max-w-xl mx-auto">
              Seis componentes físicos trabajan en conjunto para sostener toda la experiencia inmersiva.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal effect="slideLeft" stagger={0.1}>
          <div className="vrt-stagger max-w-3xl mx-auto space-y-5">
            {anatomy.map((part, index) => (
              <LiquidGlassCard
                key={part.id}
                intensity="subtle"
                glowColor="rgba(255, 215, 0, 0.3)"
                className="vrt-stagger-item vrt-anatomy-item"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="pl-5 py-3 flex items-start gap-4">
                  <span className="text-xl" style={{ color: 'var(--yellow)', filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.5))' }}>{part.icon}</span>
                  <div>
                    <p className="font-semibold text-sm tracking-wide mono">{part.label}</p>
                    <p className="text-sm text-white/55 mt-1">{part.desc}</p>
                  </div>
                </div>
              </LiquidGlassCard>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <div className="line-gradient-animated section-divider"></div>

      {/* HEADSETS COMPATIBLES CON UNITY */}
      <section className="py-28 px-6" id="headsets-unity">
        <div className="vrt-sec-head vrt-reveal">
          <p className="vrt-sec-tag" style={{ color: 'var(--pink)' }}>UNITY_XR_ECOSYSTEM</p>
          <h2 className="vrt-sec-title">
            <TextSplitter as="span" text="HEADSETS QUE" effect="rise" />
            <br />
            <TextSplitter as="span" className="grad text-gradient-atx" text="SOPORTA UNITY" effect="cascade" delay={0.2} />
          </h2>
          <ScrollReveal effect="fadeUp" delay={0.3}>
            <p className="mt-5 text-white/55 text-sm leading-relaxed max-w-xl mx-auto">
              Unity se conecta a cada dispositivo mediante XR Plug-in Management. La mayoría
              converge hoy en el estándar abierto OpenXR, aunque algunos fabricantes mantienen
              SDKs propios para funciones avanzadas.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal effect="scaleIn" stagger={0.1}>
          <div className="vrt-stagger max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {headsets.map((h, index) => {
              const isActive = state.activeHeadset === h.id
              return (
                <LiquidGlassCard
                  key={h.id}
                  intensity={isActive ? "medium" : "subtle"}
                  glowColor={`${h.color}35`}
                  className="vrt-stagger-item vrt-headset"
                  hoverEffect={true}
                  onClick={() => toggleHeadset(h.id)}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="mono text-[10px] tracking-widest text-white/40">{h.maker.toUpperCase()}</p>
                    <span className="vrt-badge" style={{ color: h.color, borderColor: h.color, boxShadow: `0 0 15px ${h.color}40` }}>{h.type}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif", filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }}>
                    {h.name}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {h.unityPath.map((p) => (
                      <span key={p} className="mono text-[9px] px-2 py-1 rounded-full border border-white/10 text-white/50 bg-white/5">
                        {p}
                      </span>
                    ))}
                  </div>
                  {isActive && (
                    <p className="mt-4 text-xs text-white/55 leading-relaxed" style={{ animation: 'fadeIn 0.3s ease' }}>{h.notes}</p>
                  )}
                </div>
                </LiquidGlassCard>
              )
            })}
          </div>
        </ScrollReveal>
      </section>

      <div className="line-gradient-animated section-divider"></div>

      {/* CTA */}
      <ScrollReveal effect="fadeUp">
        <section className="py-28 px-6 text-center vrt-reveal">
          <p className="mono text-xs tracking-widest text-white/40 mb-4">SIGUIENTE_PASO</p>
          <h2 className="vrt-sec-title mb-8">
            <TextSplitter as="span" text="VE ESTA TECNOLOGÍA" effect="rise" />
            <br />
            <TextSplitter as="span" className="grad text-gradient-atx" text="EN ACCIÓN" effect="cascade" delay={0.2} />
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticElement>
              <button onClick={goToModulos} className="vrt-cta px-7 py-3 rounded-full text-sm mono">
                VER MÓDULOS ATHERNIX →
              </button>
            </MagneticElement>
            <MagneticElement>
              <button
                onClick={goToChat}
                className="px-7 py-3 rounded-full text-sm mono border border-white/15 text-white/70 hover:border-white/35 transition-colors liquid-glass-subtle"
              >
                PREGUNTAR A ATHER
              </button>
            </MagneticElement>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}