'use client'

// ════════════════════════════════════════════════════════════════
// CABECERA UNIVERSAL JSX → TSX
// Copia este bloque al inicio de CUALQUIER migración futura.
// ════════════════════════════════════════════════════════════════
//
// REGLAS RÁPIDAS:
//  1. getElementById     → as HTMLElement / HTMLInputElement / HTMLCanvasElement / HTMLButtonElement
//  2. getContext('2d')   → as CanvasRenderingContext2D   (nunca puede ser null aquí)
//  3. querySelectorAll   → querySelectorAll<HTMLElement>
//  4. toArray() de GSAP  → toArray<HTMLElement>
//  5. addEventListener   → (e: MouseEvent) / (e: KeyboardEvent) / (e: Event)
//  6. style CSS vars     → { '--mi-var': 'valor' } as React.CSSProperties
//  7. window globals     → declare global { interface Window { ... } }
//  8. arrays vacíos      → const arr: MiTipo[] = []
//  9. objeto indexado    → const obj: Record<string, string> = {}
// 10. NUNCA getElementById fuera del componente/useEffect (rompe SSR)
// ════════════════════════════════════════════════════════════════

import React, { useEffect } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/home.css'

// ── Global window augmentation ────────────────────────────────
declare global {
  interface Window {
    THREE:           typeof THREE
    gsap:            typeof gsap
    ScrollTrigger:   typeof ScrollTrigger
    homeReqId1:      number
    homeReqId2:      number
    homeReqId3:      number
    homeReqIdIntro:  number
    homeReqAnimShip: number
  }
}

// ── Shared interfaces ─────────────────────────────────────────
interface Particle {
  x: number; y: number; s: number
  vx: number; vy: number; o: number
}

interface NodeParticle {
  x: number; y: number
  vx: number; vy: number
  r: number; pulse: number
}

// ── Terminal commands ──────────────────────────────────────────
// Record<string,string> permite indexar con cualquier string sin error
const CMDS: Record<string, string> = {
  help:   'COMANDOS DISPONIBLES: help, status, scan, whoami, clear, hack, ping',
  status: 'TODOS LOS SISTEMAS NOMINALES. TIEMPO ACTIVO: 99.97%. LATENCIA: 12ms. NODOS: 10,247,891',
  scan:   'ESCANEANDO RED... 47 NODOS ENCONTRADOS. 3 ANOMALÍAS DETECTADAS EN SECTOR 7G.',
  whoami: 'USUARIO: raíz@athernix | CLARANCIA: NIVEL_5 | SESIÓN: #A7X-002',
  hack:   '⚠ ACCESO DENEGADO. CONTRAMEDIDAS DE INTRUSIÓN ACTIVADAS. TU IP HA SIDO REGISTRADA.',
  ping:   'HACIENDO PING A NODO_NÚCLEO_01... 4ms | NODO_NÚCLEO_02... 7ms | NODO_NÚCLEO_03... 3ms [TODOS OK]',
  clear:  '__CLEAR__',
}

export default function AthernixHome() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const init = () => {
      if (!window.THREE || !window.gsap || !window.ScrollTrigger) {
        setTimeout(init, 50)
        return
      }

      window.gsap.registerPlugin(window.ScrollTrigger)

      try {

        // ════════════════════════════════════════════
        // 2. INTRO SCREEN
        // ════════════════════════════════════════════
        // ✅ REGLA 10: getElementById SIEMPRE dentro de useEffect/init, nunca en scope global
        const introScreen  = document.getElementById('intro-screen')  as HTMLElement
        const introBtn     = document.getElementById('intro-btn')     as HTMLButtonElement
        const impactFlash  = document.getElementById('impact-flash')  as HTMLElement

        if (!introScreen || !introBtn) return

        // Intro particles
        const initIntroCanvas = () => {
          const containerIntro = document.getElementById('intro-canvas-container')
          if (!containerIntro) return

          containerIntro.innerHTML = ''
          const c = document.createElement('canvas')
          c.id = 'intro-canvas'
          containerIntro.appendChild(c)

          // ✅ REGLA 2: cast a CanvasRenderingContext2D + guard
          const ctx = c.getContext('2d') as CanvasRenderingContext2D
          if (!ctx) return

          c.width  = window.innerWidth
          c.height = window.innerHeight

          // ✅ REGLA 8: array tipado, no []
          const pts: Particle[] = []
          for (let i = 0; i < 180; i++) {
            pts.push({
              x: Math.random() * c.width,
              y: Math.random() * c.height,
              s: Math.random() * 2 + 0.5,
              vx: (Math.random() - 0.5) * 0.4,
              vy: Math.random() * -1.2 - 0.3,
              o: Math.random() * 0.5 + 0.2,
            })
          }

          const loop = () => {
            ctx.clearRect(0, 0, c.width, c.height)
            pts.forEach(p => {
              p.x += p.vx; p.y += p.vy
              if (p.y < 0) { p.y = c.height; p.x = Math.random() * c.width }
              if (p.x < 0)  p.x = c.width
              if (p.x > c.width) p.x = 0
              ctx.beginPath()
              ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(255,107,0,${p.o})`
              ctx.fill()
            })
            for (let i = 0; i < pts.length; i++) {
              for (let j = i + 1; j < pts.length; j++) {
                const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
                if (d < 90) {
                  ctx.beginPath()
                  ctx.moveTo(pts[i].x, pts[i].y)
                  ctx.lineTo(pts[j].x, pts[j].y)
                  ctx.strokeStyle = `rgba(255,107,0,${0.06 * (1 - d / 90)})`
                  ctx.stroke()
                }
              }
            }
            if (!introScreen.classList.contains('hidden')) {
              window.homeReqIdIntro = requestAnimationFrame(loop)
            }
          }
          loop()
        }
        initIntroCanvas()

        window.gsap.to('.intro-logo', { opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 })
        window.gsap.to('#intro-btn',  { opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.7 })
        window.gsap.to('.intro-sub',  { opacity: 1, duration: 1,   delay: 1.2 })

        introBtn.addEventListener('click', () => {
          if (impactFlash) {
            window.gsap.to(impactFlash, {
              opacity: 0.7, duration: 0.12,
              onComplete: () => window.gsap.to(impactFlash, { opacity: 0, duration: 0.8 }),
            })
          }

          // Sparks
          for (let i = 0; i < 24; i++) {
            const s = document.createElement('div')
            s.className = 'spark'
            s.style.cssText = `left:50%;top:50%;width:${Math.random() * 4 + 2}px;height:${Math.random() * 4 + 2}px;background:${['#FF6B00','#FF006E','#FFD700'][i % 3]}`
            document.body.appendChild(s)
            window.gsap.to(s, {
              x: (Math.random() - 0.5) * 700,
              y: (Math.random() - 0.5) * 700,
              opacity: 1, duration: 0.08,
              onComplete: () => window.gsap.to(s, { opacity: 0, scale: 0, duration: 0.7, onComplete: () => s.remove() }),
            })
          }

          window.gsap.to(introScreen, {
            opacity: 0, duration: 1.2, delay: 0.2,
            onComplete: () => {
              introScreen.classList.add('hidden')
              window.gsap.to('.h-eyb',         { opacity: 1, duration: 0.8 })
              window.gsap.to('#athernix-wrap',  { opacity: 1, duration: 1, delay: 0.2 })
              window.gsap.to('#athernix-shadow',{ opacity: 0.5, duration: 1.5, delay: 0.4 })
              window.gsap.from('.ath-letter',   { y: 80, opacity: 0, rotationX: -90, stagger: 0.06, duration: 1, delay: 0.3, ease: 'back.out(1.7)' })
              window.gsap.to('.h-sub',          { opacity: 1, duration: 1, delay: 0.9 })
              window.gsap.to('.scroll-hint',    { opacity: 1, duration: 1, delay: 1.3 })
              setInterval(() => {
                const t = document.querySelector('#athernix-text')
                if (t) { t.classList.add('glitch-active'); setTimeout(() => t.classList.remove('glitch-active'), 150) }
              }, 4000)
            },
          })
        })

        // ════════════════════════════════════════════
        // 3. THREE.JS PARTICLE BACKGROUND
        // ════════════════════════════════════════════
        const tunnelContainer = document.getElementById('tunnel-canvas-container')
        if (!tunnelContainer) return

        tunnelContainer.innerHTML = ''
        const scene  = new window.THREE.Scene()
        scene.fog    = new window.THREE.FogExp2(0x07000a, 0.02)
        const camera = new window.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 5

        const renderer = new window.THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
        renderer.domElement.id = 'tunnel-canvas'
        tunnelContainer.appendChild(renderer.domElement)
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // Tunnel particles
        const pCount = 6000
        const tGeo   = new window.THREE.BufferGeometry()
        const tPos   = new Float32Array(pCount * 3)
        const tCol   = new Float32Array(pCount * 3)
        const cO     = new window.THREE.Color(0xFF6B00)
        const cP     = new window.THREE.Color(0xFF006E)
        const cY     = new window.THREE.Color(0xFFD700)

        for (let i = 0; i < pCount; i++) {
          const i3 = i * 3
          const r  = Math.random() * 8 + 3
          const th = Math.random() * Math.PI * 2
          const z  = Math.random() * 400 - 200
          tPos[i3]     = Math.cos(th) * r
          tPos[i3 + 1] = Math.sin(th) * r
          tPos[i3 + 2] = z
          const c = [cO, cP, cY][Math.floor(Math.random() * 3)].clone()
          tCol[i3] = c.r; tCol[i3 + 1] = c.g; tCol[i3 + 2] = c.b
        }
        tGeo.setAttribute('position', new window.THREE.BufferAttribute(tPos, 3))
        tGeo.setAttribute('color',    new window.THREE.BufferAttribute(tCol, 3))
        const tMat = new window.THREE.PointsMaterial({
          size: 0.1, vertexColors: true, transparent: true,
          opacity: 0.65, blending: window.THREE.AdditiveBlending, sizeAttenuation: true,
        })
        const tunnel = new window.THREE.Points(tGeo, tMat)
        scene.add(tunnel)

        // Inner ring
        const iCount = 2500
        const iGeo   = new window.THREE.BufferGeometry()
        const iPos   = new Float32Array(iCount * 3)
        const iCol   = new Float32Array(iCount * 3)
        for (let i = 0; i < iCount; i++) {
          const i3 = i * 3
          const r  = Math.random() * 2 + 0.5
          const th = Math.random() * Math.PI * 2
          const z  = Math.random() * 400 - 200
          iPos[i3]     = Math.cos(th) * r
          iPos[i3 + 1] = Math.sin(th) * r
          iPos[i3 + 2] = z
          const c = cO.clone().lerp(cY, Math.random())
          iCol[i3] = c.r; iCol[i3 + 1] = c.g; iCol[i3 + 2] = c.b
        }
        iGeo.setAttribute('position', new window.THREE.BufferAttribute(iPos, 3))
        iGeo.setAttribute('color',    new window.THREE.BufferAttribute(iCol, 3))
        const iMat  = new window.THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.45, blending: window.THREE.AdditiveBlending })
        const inner = new window.THREE.Points(iGeo, iMat)
        scene.add(inner)

        // Mouse parallax
        let smx = 0, smy = 0
        // ✅ REGLA 5: tipo MouseEvent explícito
        document.addEventListener('mousemove', (e: MouseEvent) => {
          smx = (e.clientX / window.innerWidth  - 0.5) * 2
          smy = (e.clientY / window.innerHeight - 0.5) * 2
        })

        const clock = new window.THREE.Clock();
        (function animIntro() {
          window.homeReqId3 = requestAnimationFrame(animIntro)
          const t = clock.getElapsedTime()
          tunnel.rotation.z -= 0.0006
          inner.rotation.z  += 0.001
          inner.scale.setScalar(1 + Math.sin(t * 0.5) * 0.04)
          camera.position.x += (smx * 0.4 - camera.position.x) * 0.015
          camera.position.y += (-smy * 0.4 - camera.position.y) * 0.015
          renderer.render(scene, camera)
        })()

        // ════════════════════════════════════════════
        // 4. SCROLL-DRIVEN CAMERA
        // ════════════════════════════════════════════
        window.gsap.to(camera.position, { z: -50, ease: 'none', scrollTrigger: { trigger: '#main-content', start: 'top top', end: 'bottom bottom', scrub: 1.5 } })
        window.gsap.to(camera.rotation, { z: Math.PI * 0.4, ease: 'none', scrollTrigger: { trigger: '#main-content', start: 'top top', end: 'bottom bottom', scrub: 1.5 } })

        // ════════════════════════════════════════════
        // 5. SCROLL REVEAL
        // ════════════════════════════════════════════
        // ✅ REGLA 4: toArray<HTMLElement>
        window.gsap.utils.toArray<HTMLElement>('.anim-reveal').forEach(el => {
          window.gsap.to(el, { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 40%', toggleActions: 'play none none reverse' } })
        })

        window.gsap.utils.toArray<HTMLElement>('.anim-reveal-up').forEach(el => {
          const delay = parseFloat(getComputedStyle(el).getPropertyValue('--delay')) || 0
          window.gsap.to(el, { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay, scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 50%', toggleActions: 'play none none reverse' } })
        })

        window.gsap.utils.toArray<HTMLElement>('.stat-bar-fill').forEach(bar => {
          const w = bar.dataset.width
          window.ScrollTrigger.create({
            trigger:    bar,
            start:      'top 85%',
            onEnter:    () => { bar.style.width = w + '%' },
            onLeaveBack:() => { bar.style.width = '0%'   },
          })
        })

        // ════════════════════════════════════════════
        // 6. ANIMATED STAT COUNTERS
        // ════════════════════════════════════════════
        const statData = [
          { el: '#stat-1', target: 99.9, suffix: '%',  decimals: 1 },
          { el: '#stat-2', target: 42,   suffix: 'ms', decimals: 0 },
          { el: '#stat-3', target: 10,   suffix: 'M+', decimals: 0 },
          { el: '#stat-4', target: 0,    suffix: '',   decimals: 0 },
        ]
        statData.forEach(({ el, target, suffix, decimals }) => {
          const element = document.querySelector<HTMLElement>(el)
          if (!element) return
          const obj = { val: 0 }
          window.ScrollTrigger.create({
            trigger: element,
            start:   'top 85%',
            onEnter: () => {
              window.gsap.to(obj, {
                val: target, duration: 2, ease: 'power2.out',
                onUpdate: () => { element.textContent = obj.val.toFixed(decimals) + suffix },
              })
            },
            onLeaveBack: () => { obj.val = 0; element.textContent = '0' },
          })
        })

        // ════════════════════════════════════════════
        // 7. INTERACTIVE NODE CANVAS
        // ════════════════════════════════════════════
        // ✅ REGLA 1: cast a HTMLCanvasElement
        const nodeCanvas = document.getElementById('node-canvas') as HTMLCanvasElement | null
        if (nodeCanvas) {
          // ✅ REGLA 2: cast a CanvasRenderingContext2D
          const ctx    = nodeCanvas.getContext('2d') as CanvasRenderingContext2D
          const resize = () => {
            nodeCanvas.width  = nodeCanvas.offsetWidth
            nodeCanvas.height = nodeCanvas.offsetHeight
          }
          resize()

          // ✅ REGLA 8: NodeParticle[]
          const nodes: NodeParticle[] = []
          for (let i = 0; i < 50; i++) {
            nodes.push({
              x:     Math.random() * nodeCanvas.width,
              y:     Math.random() * nodeCanvas.height,
              vx:    (Math.random() - 0.5) * 0.8,
              vy:    (Math.random() - 0.5) * 0.8,
              r:     Math.random() * 3 + 2,
              pulse: Math.random() * Math.PI * 2,
            })
          }

          ;(function drawNodes() {
            ctx.clearRect(0, 0, nodeCanvas.width, nodeCanvas.height)
            for (let i = 0; i < nodes.length; i++) {
              for (let j = i + 1; j < nodes.length; j++) {
                const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
                if (d < 120) {
                  ctx.beginPath()
                  ctx.moveTo(nodes[i].x, nodes[i].y)
                  ctx.lineTo(nodes[j].x, nodes[j].y)
                  ctx.strokeStyle = `rgba(255,107,0,${0.15 * (1 - d / 120)})`
                  ctx.lineWidth = 1
                  ctx.stroke()
                }
              }
            }
            nodes.forEach(n => {
              n.x += n.vx; n.y += n.vy; n.pulse += 0.03
              if (n.x < 0 || n.x > nodeCanvas.width)  n.vx *= -1
              if (n.y < 0 || n.y > nodeCanvas.height)  n.vy *= -1
              const glow = 0.5 + Math.sin(n.pulse) * 0.3
              ctx.beginPath()
              ctx.arc(n.x, n.y, n.r + Math.sin(n.pulse), 0, Math.PI * 2)
              ctx.fillStyle = `rgba(255,107,0,${glow})`
              ctx.fill()
              ctx.beginPath()
              ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(255,107,0,${glow * 0.08})`
              ctx.fill()
            })
            window.homeReqId1 = requestAnimationFrame(drawNodes)
          })()

          window.addEventListener('resize', resize)
        }

        // ════════════════════════════════════════════
        // 8. INTERACTIVE TERMINAL
        // ════════════════════════════════════════════
        // ✅ REGLA 1: HTMLInputElement y HTMLElement
        const termIn  = document.getElementById('terminal-input')  as HTMLInputElement | null
        const termOut = document.getElementById('terminal-output') as HTMLElement | null

        if (termIn && termOut) {
          // ✅ REGLA 5: KeyboardEvent
          termIn.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key !== 'Enter') return
            const cmd = termIn.value.trim().toLowerCase()
            if (!cmd) return

            const uLine = document.createElement('div')
            uLine.className   = 'tli'
            uLine.innerHTML   = `<span style="color:var(--yellow)">❯</span> ${cmd.toUpperCase()}`
            termOut.appendChild(uLine)

            if (cmd === 'clear') {
              termOut.innerHTML = ''
            } else {
              // ✅ REGLA 9: Record<string,string> — indexar con string sin error
              const resp  = CMDS[cmd] ?? `COMANDO NO ENCONTRADO: "${cmd.toUpperCase()}". ESCRIBE "help".`
              const rLine = document.createElement('div')
              rLine.className = 'tli'
              rLine.style.color = cmd === 'hack' ? 'var(--pink)' : 'rgba(255,107,0,0.8)'
              rLine.textContent = resp
              termOut.appendChild(rLine)
            }
            termOut.scrollTop = termOut.scrollHeight
            termIn.value = ''
          })
        }

        // ════════════════════════════════════════════
        // 9. INTERACTIVE CIPHER GRID
        // ════════════════════════════════════════════
        const cipherGrid = document.getElementById('cipher-grid')
        const hexC       = '0123456789ABCDEF'
        if (cipherGrid) {
          for (let i = 0; i < 32; i++) {
            const cell = document.createElement('div')
            cell.className   = 'cipher-cell'
            cell.textContent = hexC[Math.floor(Math.random() * hexC.length)]
            cell.addEventListener('click', () => {
              cell.classList.remove('selected', 'correct', 'wrong')
              const r = Math.random()
              if (r < 0.35) {
                cell.classList.add('correct'); cell.textContent = '✓'
              } else if (r < 0.55) {
                cell.classList.add('wrong')
                setTimeout(() => { cell.classList.remove('wrong'); cell.textContent = hexC[Math.floor(Math.random() * hexC.length)] }, 600)
              } else {
                cell.classList.add('selected')
              }
            })
            cipherGrid.appendChild(cell)
          }
        }

        // ════════════════════════════════════════════
        // 10. PARALLAX ON GLASS CARDS
        // ════════════════════════════════════════════
        // ✅ REGLA 3: querySelectorAll<HTMLElement>
        document.querySelectorAll<HTMLElement>('.glass-card').forEach(card => {
          // ✅ REGLA 5: MouseEvent
          card.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = card.getBoundingClientRect()
            const x    = (e.clientX - rect.left) / rect.width  - 0.5
            const y    = (e.clientY - rect.top)  / rect.height - 0.5
            card.style.transform = `translateY(-4px) perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`
          })
          card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) perspective(800px) rotateY(0deg) rotateX(0deg)'
          })
        })

        // ════════════════════════════════════════════
        // 11. RESIZE
        // ════════════════════════════════════════════
        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

      } catch (err) {
        console.error('Error running home animation scripts:', err)
      }
    }

    init()

    return () => {
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(t => t.kill())
      cancelAnimationFrame(window.homeReqId1)
      cancelAnimationFrame(window.homeReqId2)
      cancelAnimationFrame(window.homeReqId3)
      cancelAnimationFrame(window.homeReqIdIntro)
    }
  }, [])

  return (
    <div style={{ backgroundColor: '#07000a' }}>

      <div id="impact-flash"></div>
      <div id="tunnel-canvas-container"></div>

      {/* Intro Screen */}
      <div id="intro-screen">
        <div id="intro-canvas-container" style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }}></div>
        <div className="intro-ring" style={{ width: '300px', height: '300px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'breathe 6s ease-in-out infinite' }}></div>
        <div className="intro-ring" style={{ width: '500px', height: '500px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'breathe 8s ease-in-out infinite 1s' }}></div>
        <div className="intro-logo">ATHERNIX</div>
        <button id="intro-btn"><span style={{ position: 'relative', zIndex: 1 }}>INICIAR_SECUENCIA</span></button>
        <div className="intro-sub">ESTABLECIENDO CONEXIÓN SEGURA...</div>
      </div>

      <main id="main-content">

        {/* HERO */}
        <section className="hero" id="hero-section">
          <div className="hero-s">
            <div className="orb" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(255,107,0,0.18),transparent 70%)', top: '15%', right: '5%', animation: 'f1 8s ease-in-out infinite' }}></div>
            <div className="orb" style={{ width: '350px', height: '350px', background: 'radial-gradient(circle,rgba(255,0,110,0.14),transparent 70%)', bottom: '15%', left: '3%', animation: 'f2 10s ease-in-out infinite' }}></div>
            <p className="h-eyb mono">SISTEMA_EN_LÍNEA // V2.4.1</p>
            <div id="athernix-wrap">
              <div id="athernix-shadow">ATHERNIX</div>
              <h1 id="athernix-text">
                {'ATHERNIX'.split('').map((l, i) => <span key={i} className="ath-letter">{l}</span>)}
              </h1>
            </div>
            <p className="h-sub mono">NAVEGANDO EL VACÍO DIGITAL</p>
            <div className="scroll-hint">
              <div className="s-line"></div>
              <span className="s-lbl mono">DESLIZA_ABAJO</span>
            </div>
          </div>
        </section>

        {/* MARQUEE 1 */}
        <div className="mq">
          <div className="mq-t">
            {['INTEGRIDAD DEL SISTEMA VERIFICADA','FLUJO DE DATOS ENCRIPTADO','MALLA CUÁNTICA ACTIVA','RUTA NEURAL EN LÍNEA','PROTOCOLO CERO BRECHAS'].flatMap((t, i) => [
              <div key={`a${i}`} className="mqi"><span>◆</span> {t}</div>,
              <div key={`b${i}`} className="mqi"><span>◆</span> {t}</div>,
            ])}
          </div>
        </div>

        {/* SECTION 1 */}
        <section className="info-section" id="sec-what">
          <div className="info-container glass-card anim-reveal">
            <div className="info-grid two-col">
              <div className="info-text">
                <div className="section-tag mono"><span className="tag-dot"></span> 01 // QUÉ ES ATHERNIX</div>
                <h2 className="section-title">UNA NUEVA ERA DE<br /><span className="grad-text">INFRAESTRUCTURA DIGITAL</span></h2>
                <p className="section-desc">Athernix es una red mesh descentralizada de próxima generación diseñada para resistir los desafíos de un panorama digital cada vez más hostil.</p>
                <div className="info-badges">
                  <div className="badge"><div className="bdot"></div> DESCENTRALIZADA</div>
                  <div className="badge"><div className="bdot"></div> ENCRIPTADA</div>
                  <div className="badge"><div className="bdot"></div> AUTÓNOMA</div>
                </div>
              </div>
              <div className="info-visual">
                <div className="node-cluster"><canvas id="node-canvas"></canvas></div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: STATS */}
        <section className="info-section" id="sec-stats">
          <div className="info-container">
            <div className="section-tag mono center-tag"><span className="tag-dot"></span> 02 // MÉTRICAS DE RED</div>
            <h2 className="section-title center-title">TELEMETRÍA<br /><span className="grad-text">EN TIEMPO REAL</span></h2>
            <div className="stats-grid">
              {/* ✅ REGLA 6: CSS vars con as React.CSSProperties */}
              {[
                { id: 'stat-1', label: 'TIEMPO ACTIVO %',  width: '99.9', delay: '0s'    },
                { id: 'stat-2', label: 'LATENCIA MS',       width: '15',   delay: '0.15s' },
                { id: 'stat-3', label: 'MILLONES DE NODOS', width: '72',   delay: '0.3s'  },
                { id: 'stat-4', label: 'BRECHAS',           width: '0',    delay: '0.45s' },
              ].map(s => (
                <div key={s.id} className="stat-card glass-card anim-reveal-up" style={{ '--delay': s.delay } as React.CSSProperties}>
                  <strong className="snum" id={s.id}>0</strong>
                  <span className="mono">{s.label}</span>
                  <div className="stat-bar">
                    <div className="stat-bar-fill" data-width={s.width}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: TERMINAL */}
        <section className="info-section" id="sec-terminal">
          <div className="info-container glass-card anim-reveal">
            <div className="info-grid two-col reverse">
              <div className="info-visual">
                <div className="term">
                  <div className="t-bar">
                    <div className="td" style={{ background: '#FF006E' }}></div>
                    <div className="td" style={{ background: '#FFD700' }}></div>
                    <div className="td" style={{ background: '#00ff88' }}></div>
                    <span className="mono" style={{ marginLeft: 'auto', fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>raíz@athernix:~</span>
                  </div>
                  <div className="t-out" id="terminal-output">
                    <div className="tli">SECUENCIA DE ARRANQUE INICIADA...</div>
                    <div className="tli">CARGANDO MÓDULOS <span style={{ color: '#00ff88' }}>[OK]</span></div>
                    <div className="tli">ESTABLECIENDO ENLACE <span style={{ color: '#00ff88' }}>[OK]</span></div>
                    <div className="tli" style={{ color: 'var(--pink)' }}>ADVERTENCIA: ACCESO NO AUTORIZADO DETECTADO</div>
                  </div>
                  <div className="t-row">
                    <span style={{ color: 'var(--orange)' }}>❯</span>
                    <input type="text" id="terminal-input" placeholder="escribe un comando..." />
                  </div>
                </div>
              </div>
              <div className="info-text">
                <div className="section-tag mono"><span className="tag-dot"></span> 03 // INTERFAZ DE COMANDOS</div>
                <h2 className="section-title">ACCESO<br /><span className="grad-text">DIRECTO AL TERMINAL</span></h2>
                <p className="section-desc">Interactúa directamente con el núcleo de Athernix. Ejecuta diagnósticos, escanea la red y despliega contramedidas en tiempo real.</p>
                <div className="info-badges">
                  <div className="badge"><div className="bdot"></div> PRUEBA: help, status, scan, hack</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CIPHER GRID */}
        <section className="info-section" id="sec-cipher">
          <div className="info-container glass-card anim-reveal">
            <div className="info-grid two-col">
              <div className="info-text">
                <div className="section-tag mono"><span className="tag-dot"></span> 04 // MÓDULO CIFRADO</div>
                <h2 className="section-title">DECIFRA LA<br /><span className="grad-text">MATRIZ</span></h2>
                <p className="section-desc">Haz clic en las celdas para decodificar la matriz hexadecimal. Verde = descifrado, Rojo = acceso denegado.</p>
                <div className="info-badges">
                  <div className="badge"><div className="bdot"></div> HAZ CLIC EN LAS CELDAS</div>
                </div>
              </div>
              <div className="info-visual">
                <div className="cipher-grid" id="cipher-grid"></div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE 2 */}
        <div className="mq">
          <div className="mq-t rev">
            {['NÚCLEO ATHERNIX V2.4','ENCRIPTACIÓN 256-BIT','TOPOLOGÍA MESH','COMPUTO DISTRIBUIDO','ARQUITECTURA CERO CONFIANZA'].flatMap((t, i) => [
              <div key={`c${i}`} className="mqi"><span>●</span> {t}</div>,
              <div key={`d${i}`} className="mqi"><span>●</span> {t}</div>,
            ])}
          </div>
        </div>

        {/* SECTION 5: FEATURES */}
        <section className="info-section" id="sec-features">
          <div className="info-container">
            <div className="section-tag mono center-tag"><span className="tag-dot"></span> 05 // CAPACIDADES CORE</div>
            <h2 className="section-title center-title">LA VENTAJA<br /><span className="grad-text">ATHERNIX</span></h2>
            <div className="features-grid">
              {[
                { icon: '🛡️', title: 'Escudo Cuántico',                   desc: 'Algoritmos criptográficos post-cuánticos protegen cada paquete.',                     delay: '0s'    },
                { icon: '🌐', title: 'Malla Auto-Sanadora',               desc: 'Re-enrutamiento autónomo cuando los nodos se desconectan.',                           delay: '0.12s' },
                { icon: '⚡', title: 'Computo en el Borde',               desc: 'Latencia sub-milisegundo en las 47 regiones.',                                        delay: '0.24s' },
                { icon: '👁️', title: 'Nodos Fantasma',                    desc: 'Puntos señuelo redirigen el tráfico adversario a honeypots.',                         delay: '0.36s' },
                { icon: '🔗', title: 'Autenticación Conocimiento Cero',   desc: 'Verifica identidad sin exponer credenciales.',                                        delay: '0.48s' },
                { icon: '🕐', title: 'Sincronización Crono',              desc: 'Precisión de nanosegundos en cada punto final de la malla global.',                   delay: '0.6s'  },
              ].map((f, i) => (
                <div key={i} className="feature-card glass-card anim-reveal-up" style={{ '--delay': f.delay } as React.CSSProperties}>
                  <div className="feature-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                  <div className="feature-line"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: VISION */}
        <section className="info-section" id="sec-vision">
          <div className="info-container">
            <div className="about-vision glass-card anim-reveal">
              <blockquote>"El futuro de la conectividad no se construye en servidores — está tejido en la tela del espacio mismo."</blockquote>
              <span className="mono">— MANIFIESTO FUNDACIONAL ATHERNIX, 2024</span>
            </div>
          </div>
        </section>

        {/* SECTION 7: CTA */}
        <section className="info-section cta-section" id="sec-cta">
          <div className="info-container anim-reveal" style={{ textAlign: 'center' }}>
            <div className="section-tag mono center-tag"><span className="tag-dot"></span> ¿LISTO?</div>
            <h2 className="section-title center-title" style={{ fontSize: 'clamp(3rem,9vw,8rem)' }}>
              ÚNETE A LA<br /><span className="grad-text">RED</span>
            </h2>
            <p className="section-desc" style={{ maxWidth: '500px', margin: '0 auto 40px' }}>
              Despliega tu nodo hoy y conviértete en parte de la columna vertebral descentralizada.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#" className="cta-btn"><span>DESPLIEGA AHORA</span></a>
              <a href="#" className="sec-btn">VER DOCS</a>
            </div>
          </div>
        </section>

        <div className="grad-line"></div>
      </main>
    </div>
  )
}