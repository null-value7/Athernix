// @ts-nocheck
'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useVRTechnologyController } from '@/controllers/information/Vrtech';
import { ChromaUniverse } from '@/components/vrtech/ChromaUniverse';
import '../styles/vrtech.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

function magneticMove(e, strength = 0.3) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) * strength
  const y = (e.clientY - rect.top - rect.height / 2) * strength
  gsap.to(e.currentTarget, { x, y, duration: 0.3, ease: 'power2.out' })
}
function magneticReset(e) {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' })
}
function tiltMove(e, lift = -4, max = 10) {
  const rect = e.currentTarget.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width - 0.5
  const py = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(e.currentTarget, { y: lift, rotationY: px * max, rotationX: -py * max, transformPerspective: 700, duration: 0.35, ease: 'power2.out' })
}
function tiltReset(e) {
  gsap.to(e.currentTarget, { y: 0, rotationX: 0, rotationY: 0, duration: 0.45, ease: 'power2.out' })
}

export default function VRTechnologyPage() {
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

  // ── THREE.JS: fondo scroll-driven estilo Chroma VR ──

  // ── GSAP: scroll-driven hero parallax (canvas + content) ──
  useEffect(() => {
    if (typeof window === 'undefined' || !rootRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.to('.vrt-hero-canvas-wrap', {
        y: '18%', scale: 0.85, opacity: 0.45,
        ease: 'none',
        scrollTrigger: { trigger: '.vrt-hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
      gsap.to('.vrt-hero-content', {
        y: -40, opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.vrt-hero', start: 'top top', end: '50% top', scrub: 0.5 },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  // ── GSAP: revelado progresivo de secciones al hacer scroll ──
  useEffect(() => {
    if (typeof window === 'undefined' || !rootRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let split = null

    const ctx = gsap.context(() => {
      // Scroll progress bar
      gsap.set('.vrt-progress-bar', { scaleX: 0 })
      gsap.to('.vrt-progress-bar', {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      })

      // Ambient orb parallax
      if (!prefersReduced) {
        gsap.to('.vrt-bg-orb-1', { y: -80, ease: 'none', scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 1 } })
        gsap.to('.vrt-bg-orb-2', { y: 120, ease: 'none', scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 1 } })
        gsap.to('.vrt-bg-orb-3', { y: -40, ease: 'none', scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 1 } })
      }

      // Hero entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.vrt-eyebrow', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 })

      const line2 = rootRef.current.querySelector('.vrt-title .line2')
      if (line2 && !prefersReduced) {
        split = new SplitText(line2, { type: 'chars' })
        tl.fromTo('.vrt-title > span:not(.line2)', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.1')
          .fromTo(split.chars, { opacity: 0, yPercent: 120, rotationX: -80 },
            { opacity: 1, yPercent: 0, rotationX: 0, duration: 0.8, stagger: 0.025, ease: 'back.out(1.7)' }, '-=0.3')
      } else {
        tl.fromTo('.vrt-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.1')
      }

      tl.fromTo('.vrt-sub',   { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')
        .fromTo('.vrt-scroll', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')

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

    return () => { split?.revert(); ctx.revert() }
  }, [])

  // ── Award-winning buttery smooth scroll (Lenis, synced with ScrollTrigger) ──
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let lenis = null
    let pollId = null
    let cancelled = false

    const onTick = (time) => { lenis?.raf(time * 1000) }

    const trySetup = () => {
      if (cancelled) return
      const LenisCtor = window.Lenis
      if (!LenisCtor) { pollId = setTimeout(trySetup, 80); return }
      lenis = new LenisCtor({ duration: 1.1, smoothWheel: true, easing: (t) => 1 - Math.pow(1 - t, 3) })
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
    <div ref={rootRef} className="vrt-root" style={{ paddingTop: '80px', background: 'transparent' }}>
      <div className="vrt-progress-bar" />
      <ChromaUniverse />
      {/* HERO */}
      <section className="vrt-hero">
        <div className="vrt-hero-ring" />
        <div className="vrt-hero-corner tl" />
        <div className="vrt-hero-corner tr" />
        <div className="vrt-hero-corner bl" />
        <div className="vrt-hero-corner br" />
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
        <div className="vrt-sec-head vrt-reveal" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }} onMouseMove={e => tiltMove(e, -3, 6)} onMouseLeave={e => tiltReset(e)}>
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
                onMouseMove={e => { tiltMove(e, -8, 14); e.currentTarget.style.borderColor = stage.color; e.currentTarget.style.boxShadow = `0 22px 70px -18px ${stage.color}66, 0 0 0 1px ${stage.color}33`; e.currentTarget.style.background = 'rgba(255,255,255,.08)' }}
                onMouseLeave={e => { tiltReset(e); e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.background = '' }}
                style={{ '--stage-color': stage.color }}
              >
                <span className="vrt-stage-watermark">{stage.step}</span>
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
        <div className="vrt-sec-head vrt-reveal" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }} onMouseMove={e => tiltMove(e, -3, 6)} onMouseLeave={e => tiltReset(e)}>
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
            <div key={part.id} className="vrt-stagger-item vrt-anatomy-item pl-5 py-2 flex items-start gap-4"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              onMouseMove={e => { tiltMove(e, -4, 10); e.currentTarget.style.borderLeftColor = 'var(--yellow)'; e.currentTarget.style.background = 'rgba(255,215,0,.08)'; e.currentTarget.style.boxShadow = '0 0 40px -6px rgba(255,215,0,.35)' }}
              onMouseLeave={e => { tiltReset(e); e.currentTarget.style.borderLeftColor = ''; e.currentTarget.style.background = ''; e.currentTarget.style.boxShadow = '' }}>
              <span className="vrt-anatomy-icon" style={{ color: 'var(--yellow)' }}>{part.icon}</span>
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
        <div className="vrt-sec-head vrt-reveal" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }} onMouseMove={e => tiltMove(e, -3, 6)} onMouseLeave={e => tiltReset(e)}>
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
                onMouseMove={e => { tiltMove(e, -6, 12); e.currentTarget.style.borderColor = h.color; e.currentTarget.style.boxShadow = `0 22px 70px -18px ${h.color}66, 0 0 0 1px ${h.color}33`; e.currentTarget.style.background = 'rgba(255,255,255,.08)' }}
                onMouseLeave={e => { tiltReset(e); e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.background = '' }}
                style={{ '--hs-color': h.color }}
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
      <section className="py-28 px-6 text-center vrt-reveal vrt-cta-section" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }} onMouseMove={e => tiltMove(e, -2, 5)} onMouseLeave={e => tiltReset(e)}>
        <p className="mono text-xs tracking-widest text-white/40 mb-4">SIGUIENTE_PASO</p>
        <h2 className="vrt-sec-title mb-8">
          VE ESTA TECNOLOGÍA<br /><span className="grad">EN ACCIÓN</span>
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={goToModulos}
            className="vrt-cta px-7 py-3 rounded-full text-sm mono"
            onMouseMove={e => magneticMove(e, 0.3)}
            onMouseLeave={magneticReset}
          >
            VER MÓDULOS ATHERNIX →
          </button>
          <button
            onClick={goToChat}
            className="px-7 py-3 rounded-full text-sm mono border border-white/15 text-white/70 hover:border-white/35 transition-colors"
            onMouseMove={e => magneticMove(e, 0.3)}
            onMouseLeave={magneticReset}
          >
            PREGUNTAR A ATHER
          </button>
        </div>
      </section>
    </div>
  )
}