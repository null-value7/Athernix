'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';

import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SplitText } from 'gsap/SplitText';

import * as THREE from 'three';

import { useAltChatController } from '@/controllers/AI/chatbot';

import { ALT_QUICK_PROMPTS, AltChatMessage } from '@/models/AI/chatbot';

import ReactMarkdown from 'react-markdown';

import remarkMath from 'remark-math';

import rehypeKatex from 'rehype-katex';

import 'katex/dist/katex.min.css';

import { MermaidDiagram } from '@/components/chatbot/roadmaps'; 

import { VectorVisualizer } from '@/components/simulators/VectorVisualizer';

import { useAtherVoice } from '@/components/chatbot/AtherVoice';

import { useVoiceMode } from '@/components/chatbot/VoiceMode/VoiceMode';

import VoiceModeOverlay from '@/components/chatbot/VoiceMode/VoiceOverlay';

import MessageAudioButton from '@/components/chatbot/MessageAudioButton';

//UI Components

import { AcademicSourceCard } from '@/components/chatbot/UIChatbot/academicResources';

import { InteractiveFlashcards } from '@/components/chatbot/UIChatbot/interactiveCards';

import { ComparisonTable } from '@/components/chatbot/UIChatbot/comparation';

import { ConceptTimeline } from '@/components/chatbot/UIChatbot/timeline';



const F_ORB = "'Bebas Neue', sans-serif"

const F_RAJ = "'Plus Jakarta Sans', sans-serif"

const F_MONO = "'JetBrains Mono', monospace"



const C = {

  bg:        '#08000a',

  surface:   'rgba(8,0,10,0.98)',

  orange:    '#FF6B00',

  pink:      '#FF006E',

  yellow:    '#FFD700',

  purple:    '#FF006E', 

  cyan:      '#FFD700', 

  text:      '#ede0d4',

  dim:       'rgba(210,170,140,0.5)',

  dimmer:    'rgba(210,170,140,0.28)',

  bdrO:      'rgba(255,107,0,0.18)',

  bdrP:      'rgba(255,0,110,0.18)',

}



if (typeof window !== 'undefined') {

  gsap.registerPlugin(ScrollTrigger, SplitText)

}



// ── Interaction helpers ────────────────────────────────────────

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

const IconMenu = () => (

  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>

    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/>

  </svg>

)

const IconPlus = () => (

  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>

    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>

  </svg>

)

const IconSend = () => (

  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>

    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/>

  </svg>

)



// ── Typing indicator ───────────────────────────────────────────

function TypingDots() {

  return (

    <>

      <style>{`

        @keyframes altTd {

          0%,80%,100% { transform:scale(0.5) translateY(0); opacity:0.25; box-shadow:0 0 0 rgba(255,0,110,0) }

          40%          { transform:scale(1.15) translateY(-4px); opacity:1; box-shadow:0 0 8px rgba(255,0,110,0.6) }

        }

      `}</style>

      <div style={{ display: 'flex', gap: 5, padding: '4px 0', alignItems: 'center' }}>

        {[0, 1, 2].map(i => (

          <div key={i} style={{

            width: 6, height: 6, borderRadius: '50%',

            background: 'rgba(255,0,110,0.8)',

            animation: `altTd 1.1s ${i * 0.18}s infinite`,

          }}/>

        ))}

      </div>

    </>

  )

}



// ── Message bubble ─────────────────────────────────────────────

function AltMessageBubble({

  msg, isLast, busy,

  onSpeakMessage,

  currentlySpeakingId,

}: {

  msg: AltChatMessage

  isLast: boolean

  busy: boolean

  onSpeakMessage: (text: string, id: string) => void

  currentlySpeakingId: string | null

}) {

  const markdownComponents = useMemo(() => ({

    code({ node, inline, className, children, ...props }: any) {

      const match = /language-(\w+)/.exec(className || '');

      

      // Si el bloque es tipo "mermaid", dibuja el roadmap

      if (!inline && match && match[1] === 'mermaid') {

        return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />;

      }

      

      // Si es código normal, le da estilo de terminal

      return (

        <code 

          className={className} 

          style={{ 

            background: 'rgba(255,0,110,0.1)', 

            padding: '2px 4px', 

            borderRadius: 4, 

            color: '#FFD700' 

          }} 

          {...props}

        >

          {children}

        </code>

      );

    }

  }), []);

  const isAI       = msg.role === 'ai'

  const showTyping = isAI && isLast && busy && msg.text === ''



  return (

    <div className="alt-bubble"

      style={{

        display:       'flex',

        gap:           9,

        alignItems:    'flex-start',

        flexDirection: isAI ? 'row' : 'row-reverse',

        transformStyle: 'preserve-3d',

      }}

      onMouseMove={e => {

        const textbox = e.currentTarget.querySelector('.alt-textbox') as HTMLElement | null

        if (textbox) {

          textbox.style.boxShadow = isAI ? '0 12px 32px rgba(0,0,0,0.5), 0 0 28px rgba(255,0,110,0.2)' : '0 12px 32px rgba(0,0,0,0.5), 0 0 28px rgba(255,107,0,0.2)'

          textbox.style.borderColor = isAI ? 'rgba(255,0,110,0.35)' : 'rgba(255,107,0,0.35)'

        }

        ;(e.currentTarget as HTMLElement).style.zIndex = '5'; tiltMove(e, -6, 10)

      }}

      onMouseLeave={e => {

        const textbox = e.currentTarget.querySelector('.alt-textbox') as HTMLElement | null

        if (textbox) {

          textbox.style.boxShadow = '0 6px 18px rgba(0,0,0,0.45)'

          textbox.style.borderColor = isAI ? 'rgba(255,0,110,0.18)' : 'rgba(255,107,0,0.18)'

        }

        ;(e.currentTarget as HTMLElement).style.zIndex = ''; tiltReset(e)

      }}>

      {/* Avatar */}

      <div className="alt-avatar" style={{

        width: 34, height: 34, borderRadius: isAI ? '50%' : 8, flexShrink: 0,

        display: 'flex', alignItems: 'center', justifyContent: 'center',

        fontSize: '0.6rem', fontFamily: F_ORB, fontWeight: 700, letterSpacing: '0.05em',

        background: isAI ? 'rgba(255,0,110,0.08)' : 'rgba(255,107,0,0.08)',

        border: `2px solid ${isAI ? 'rgba(255,0,110,0.4)' : 'rgba(255,107,0,0.35)'}`,

        color: isAI ? 'rgba(255,0,110,0.9)' : 'rgba(255,107,0,0.9)',

        boxShadow: isAI ? '0 0 18px rgba(255,0,110,0.35), inset 0 0 12px rgba(255,0,110,0.08)' : '0 0 14px rgba(255,107,0,0.25), inset 0 0 10px rgba(255,107,0,0.05)',

        transformStyle: 'preserve-3d',

        animation: isAI ? 'avatarPulse 2.4s ease-in-out infinite' : 'none',

      }}>

        <style>{`

          @keyframes avatarPulse { 0%,100%{box-shadow:0 0 14px rgba(255,0,110,0.25)} 50%{box-shadow:0 0 24px rgba(255,0,110,0.45)} }

        `}</style>

        {isAI ? (

          <>

            <span style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1px solid rgba(255,0,110,0.2)', animation: 'spin 8s linear infinite' }} />

            <span style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '1px dashed rgba(255,107,0,0.18)', animation: 'spin 14s linear infinite reverse' }} />

            <span style={{ position: 'relative', zIndex: 1 }}>A</span>

            <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>

          </>

        ) : 'U'}

      </div>



      {/* Bubble */}

      <div style={{ maxWidth: '75%' }}>

        {/* Tag */}

        <div style={{

          display:       'flex',

          alignItems:    'center',

          gap:           5,

          justifyContent: isAI ? 'flex-start' : 'flex-end',

          fontSize:      '0.52rem',

          letterSpacing: '0.25em',

          textTransform: 'uppercase',

          marginBottom:  4,

          fontFamily:    F_RAJ,

          color:         isAI ? 'rgba(255,0,110,0.4)' : 'rgba(255,107,0,0.4)',

        }}>

          {isAI && <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,0,110,0.5)', flexShrink: 0 }}/>}

          {isAI ? '◈ ATHER ENGINE' : '↑ OPERADOR'}

          {!isAI && <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,107,0,0.5)', flexShrink: 0 }}/>}

          {isAI && msg.text && (

            <MessageAudioButton

              text={msg.text}

              isPlaying={currentlySpeakingId === msg.id}

              onPlay={() => onSpeakMessage(msg.text, String(msg.id))}

              onStop={() => onSpeakMessage('', '')}

            />

          )}

        </div>



        {/* Text box */}

        <div className="alt-textbox" style={{

          padding:      '10px 13px',

          borderRadius: 8,

          fontSize:     '0.78rem',

          lineHeight:   1.62,

          color:        C.text,

          fontFamily:   F_RAJ,

          textAlign:    isAI ? 'left' : 'right',

          background:   isAI ? 'rgba(18,8,28,0.95)' : 'rgba(28,10,8,0.95)',

          border:       `1px solid ${isAI ? 'rgba(255,0,110,0.18)' : 'rgba(255,107,0,0.18)'}`,

          borderLeft:   isAI ? '2px solid rgba(255,0,110,0.45)' : undefined,

          borderRight:  !isAI ? '2px solid rgba(255,107,0,0.45)' : undefined,

          boxShadow:    isAI ? '0 6px 18px rgba(0,0,0,0.45)' : '0 6px 18px rgba(0,0,0,0.45)',

          transformStyle: 'preserve-3d',

          transition: 'box-shadow 0.2s, border-color 0.2s',

        }}>

          {showTyping ? (

            <TypingDots />

          ) : (

            <div style={{ textAlign: 'left' }} className="alt-markdown">

              

              {/* --- AQUÍ VA LA INTEGRACIÓN --- */}

              {msg.toolInvocations?.map((tool: any) => {

                if (tool.state !== 'result') return null;

                switch (tool.toolName) {

                  case 'vectorSimulator':

                    return (

                      <div key={tool.toolCallId} className="my-2 p-2 border border-teal-500/30 rounded-md">

                        <VectorVisualizer v1={tool.result.v1} v2={tool.result.v2} resultant={tool.result.resultant} />

                      </div>

                    );

                  case 'buscarFuentesAcademicas':

                    return <AcademicSourceCard key={tool.toolCallId} sources={tool.result.sources} />;

                  case 'generarFlashcards':

                    return <InteractiveFlashcards key={tool.toolCallId} topic={tool.result.topic} cards={tool.result.cards} notice={tool.result.notice} />;

                  case 'compararConceptos':

                    return (

                      <ComparisonTable

                        key={tool.toolCallId}

                        itemA={tool.result.itemA}

                        itemB={tool.result.itemB}

                        rows={tool.result.rows}

                        notice={tool.result.notice}

                      />

                    );

                  case 'generarLineaDeTiempo':

                    return (

                      <ConceptTimeline key={tool.toolCallId} topic={tool.result.topic} events={tool.result.events} notice={tool.result.notice} />

                    );

                  default:

                    return null;

                }

              })}

              

              <ReactMarkdown

                remarkPlugins={[remarkMath]}

                rehypePlugins={[rehypeKatex]}

                components={markdownComponents}

              >

                {(msg.text || '…').replace(/<function=.*?>(<\/function>)?/g, '').trim()}

              </ReactMarkdown>

            </div>

          )}

        </div>

      </div>

    </div>

  )

}



// ── 3D Neural Field background ─────────────────────────────────

function NeuralField3D() {

  const mountRef = useRef<HTMLDivElement>(null)



  useEffect(() => {

    const container = mountRef.current

    if (!container) return



    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 200)

    camera.position.z = 18



    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(container.clientWidth, container.clientHeight)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    container.appendChild(renderer.domElement)



    // Neural nodes

    const nodeCount = 120

    const positions = new Float32Array(nodeCount * 3)

    const colors = new Float32Array(nodeCount * 3)

    const palette = [new THREE.Color('#FF6B00'), new THREE.Color('#FF006E'), new THREE.Color('#FFD700')]

    for (let i = 0; i < nodeCount; i++) {

      positions[i * 3] = (Math.random() - 0.5) * 35

      positions[i * 3 + 1] = (Math.random() - 0.5) * 25

      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      const col = palette[Math.floor(Math.random() * palette.length)]

      colors[i * 3] = col.r

      colors[i * 3 + 1] = col.g

      colors[i * 3 + 2] = col.b

    }



    const particleGeo = new THREE.BufferGeometry()

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMat = new THREE.PointsMaterial({ size: 0.12, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })

    const particles = new THREE.Points(particleGeo, particleMat)

    scene.add(particles)



    // Connection lines (limit for performance)

    const lineMat = new THREE.LineBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.06 })

    const lineGeo = new THREE.BufferGeometry()

    const linePositions: number[] = []

    const maxDist = 5.5

    for (let i = 0; i < nodeCount; i++) {

      const ax = positions[i * 3], ay = positions[i * 3 + 1], az = positions[i * 3 + 2]

      for (let j = i + 1; j < nodeCount; j++) {

        const bx = positions[j * 3], by = positions[j * 3 + 1], bz = positions[j * 3 + 2]

        const d = Math.hypot(ax - bx, ay - by, az - bz)

        if (d < maxDist) {

          linePositions.push(ax, ay, az, bx, by, bz)

        }

      }

    }

    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))

    const lines = new THREE.LineSegments(lineGeo, lineMat)

    scene.add(lines)



    // Mouse parallax

    let mx = 0, my = 0

    const onMove = (e: MouseEvent) => {

      const rect = container.getBoundingClientRect()

      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2

      my = -((e.clientY - rect.top) / rect.height - 0.5) * 2

    }

    container.addEventListener('mousemove', onMove)



    let raf = 0

    const t0 = performance.now()

    const animate = () => {

      raf = requestAnimationFrame(animate)

      const t = (performance.now() - t0) * 0.0005

      if (!prefersReduced) {

        particles.rotation.y = t * 0.05 + mx * 0.15

        particles.rotation.x = my * 0.08

        lines.rotation.y = t * 0.05 + mx * 0.15

        lines.rotation.x = my * 0.08

      }

      renderer.render(scene, camera)

    }

    animate()



    const onResize = () => {

      if (!container) return

      camera.aspect = container.clientWidth / container.clientHeight

      camera.updateProjectionMatrix()

      renderer.setSize(container.clientWidth, container.clientHeight)

    }

    window.addEventListener('resize', onResize)



    return () => {

      window.removeEventListener('resize', onResize)

      container.removeEventListener('mousemove', onMove)

      cancelAnimationFrame(raf)

      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)

      renderer.dispose()

      particleGeo.dispose()

      particleMat.dispose()

      lineGeo.dispose()

      lineMat.dispose()

    }

  }, [])



  return (

    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>

      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      <div style={{

        position: 'absolute', inset: 0,

        background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(8,0,10,0.55) 70%, rgba(8,0,10,0.95) 100%)',

        pointerEvents: 'none',

      }} />

    </div>

  )

}



// ── Hex grid SVG ───────────────────────────────────────────────

function HexBackground() {

  return (

    <div style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>

      <svg viewBox="0 0 680 600" preserveAspectRatio="xMidYMid slice"

        style={{ width: '100%', height: '100%' }}

        xmlns="http://www.w3.org/2000/svg">

        <defs>

          <pattern id="hex-p" x="0" y="0" width="52" height="60" patternUnits="userSpaceOnUse">

            <polygon points="26,2 50,15 50,45 26,58 2,45 2,15" fill="none" stroke="#FF006E" strokeWidth="0.5"/>

          </pattern>

          <pattern id="hex-p2" x="26" y="30" width="52" height="60" patternUnits="userSpaceOnUse">

            <polygon points="26,2 50,15 50,45 26,58 2,45 2,15" fill="none" stroke="#FF6B00" strokeWidth="0.4" opacity="0.5"/>

          </pattern>

        </defs>

        <rect width="100%" height="100%" fill="url(#hex-p)"/>

        <rect width="100%" height="100%" fill="url(#hex-p2)"/>

        {/* Accent glow nodes at hex intersections */}

        <circle cx="120" cy="90"  r="3"   fill="#FF6B00" opacity="0.6"/>

        <circle cx="380" cy="200" r="2.5" fill="#FF006E" opacity="0.5"/>

        <circle cx="560" cy="80"  r="2"   fill="#FF6B00" opacity="0.4"/>

        <circle cx="240" cy="480" r="2.5" fill="#FF006E" opacity="0.5"/>

        <circle cx="620" cy="420" r="3"   fill="#FF6B00" opacity="0.45"/>

        <circle cx="60"  cy="320" r="2"   fill="#FF006E" opacity="0.4"/>

      </svg>

    </div>

  )

}



// ── Main view ──────────────────────────────────────────────────

export default function AltChatView() {

  const {

    state, messagesEndRef,

    toggleSidebar, loadSession, newChat,

    setInput, sendMessage,

    handleKeyDown, handleSubmit,

  } = useAltChatController()

  //Voice



  const { state: voiceModeState, openVoiceMode, closeVoiceMode, startVoiceCycle, interrupt } =

    useVoiceMode((role: 'user' | 'ai', text: string) => {

      if (role === 'user') {

        sendMessage(text)

      } else if (role === 'ai' && voiceState.ttsEnabled) {

        // Si VoiceMode envía una respuesta de IA, usar TTS

        speak(text)

      }

  })



  const { voiceState, speak, stopSpeaking, toggleTTS, startListening, stopListening } =

    useAtherVoice((transcript) => {sendMessage(transcript)}, voiceModeState.active)

    

  const { sidebarOpen, sessions, currentSession, messages, input, busy } = state

  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  const titleRef = useRef<HTMLDivElement>(null)

  const messagesRef = useRef<HTMLDivElement>(null)



  // ── Entrance animations ──

  useEffect(() => {

    const root = containerRef.current

    if (!root) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let split: SplitText | null = null



    const ctx = gsap.context(() => {

      // Header title SplitText

      if (titleRef.current && !prefersReduced) {

        split = new SplitText(titleRef.current, { type: 'chars' })

        gsap.fromTo(split.chars,

          { opacity: 0, yPercent: 120, rotationX: -70 },

          { opacity: 1, yPercent: 0, rotationX: 0, duration: 0.85, stagger: 0.03, ease: 'back.out(1.7)', delay: 0.2 })

      }



      // Subtle ambient pulse for status dot

      gsap.to('.alt-status-dot', {

        scale: 1.25, boxShadow: '0 0 16px #FFD700', yoyo: true, repeat: -1, duration: 1.2, ease: 'sine.inOut'

      })



      // Empty state ring breathing

      if (!prefersReduced) {

        gsap.to('.alt-empty-ring', { scale: 1.08, opacity: 0.7, yoyo: true, repeat: -1, duration: 2.4, ease: 'sine.inOut' })

      }

    }, root)



    return () => { split?.revert(); ctx.revert() }

  }, [])



  // ── Animate quick prompts in empty state ──

  useEffect(() => {

    if (messages.length !== 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) return

    const btns = document.querySelectorAll('.alt-quick-prompt')

    if (btns.length === 0) return

    gsap.fromTo(btns,

      { opacity: 0, y: 20, scale: 0.9 },

      { opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.45, ease: 'back.out(1.7)', delay: 0.6 })

    gsap.to(btns, {

      y: -3, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut',

      stagger: { each: 0.1, from: 'random' }, delay: 1.2

    })

  }, [messages])



  // ── Animate new messages with GSAP + scroll progress bar ──

  useEffect(() => {

    const root = messagesRef.current

    if (!root) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches



    const updateProgress = () => {

      const bar = document.querySelector('.chat-progress div') as HTMLElement | null

      if (!bar) return

      const max = root.scrollHeight - root.clientHeight

      const pct = max > 0 ? root.scrollTop / max : 0

      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, pct))})`

    }

    updateProgress()

    root.addEventListener('scroll', updateProgress)



    if (messages.length > 0 && !prefersReduced) {

      const last = root.lastElementChild as HTMLElement | null

      if (last && last.classList && last.classList.contains('alt-bubble')) {

        gsap.fromTo(last, { opacity: 0, y: 18, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: 'power2.out' })

      }

    }



    return () => root.removeEventListener('scroll', updateProgress)

  }, [messages])



  const handleSpeakMessage = useCallback((text: string, id: string) => {

    if (text) {

      setCurrentlySpeakingId(id)

      // speak() solo acepta 1 argumento; si devuelve una promesa la usamos

      // para limpiar el estado "hablando", si no, se limpia manualmente.

      const result: any = speak(text)

      if (result && typeof result.then === 'function') {

        result

          .then(() => setCurrentlySpeakingId(null))

          .catch(() => setCurrentlySpeakingId(null))

      }

    } else {

      stopSpeaking()

      setCurrentlySpeakingId(null)

    }

  }, [speak, stopSpeaking])



  const handleHoverBtn = useCallback((e: React.MouseEvent<HTMLButtonElement>, enter: boolean) => {

    const el = e.currentTarget

    if (enter) {

      el.style.background    = 'rgba(255,0,110,0.1)'

      el.style.borderColor   = 'rgba(255,0,110,0.5)'

      el.style.boxShadow     = '0 0 14px rgba(255,0,110,0.12)'

    } else {

      el.style.background    = 'transparent'

      el.style.borderColor   = 'rgba(255,0,110,0.3)'

      el.style.boxShadow     = 'none'

    }

  }, [])



  



  useEffect(() => {

    if (!voiceState.ttsEnabled) return

    if (busy) return  // esperar a que termine de streamear

    if (voiceModeState.active) return

    const last = messages[messages.length - 1]

    if (last?.role === 'ai' && last.text) {

      speak(last.text)

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [busy])  // ← se dispara cuando busy pasa de true a false (Ather terminó)



  // Manejo especial para VoiceMode: cuando VoiceMode está activo y hay respuesta de IA

  useEffect(() => {

    if (!voiceModeState.active) return

    if (!voiceState.ttsEnabled) return

    if (busy) return

    const last = messages[messages.length - 1]

    if (last?.role === 'ai' && last.text) {

      // TTS de la respuesta cuando VoiceMode está activo

      speak(last.text)

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [busy, voiceModeState.active])

 



  return (

    <>

      {/* ── Global keyframes ── */}

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');



        @keyframes altMsgIn    { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

        @keyframes altBlink    { 0%,100%{opacity:1;box-shadow:0 0 8px #FFD700} 55%{opacity:0.25;box-shadow:none} }

        @keyframes altGlitch   { 0%{opacity:0.6;transform:scaleX(0.4) translateX(-60%)} 50%{opacity:1;transform:scaleX(1) translateX(0%)} 100%{opacity:0;transform:scaleX(0.4) translateX(60%)} }

        @keyframes altSig      { to{left:120%} }

        @keyframes scanlines   { from{transform:translateY(0)} to{transform:translateY(4px)} }

        .alt-textbox { position: relative; overflow: hidden; }

        .alt-textbox::before { content: ''; position: absolute; top: 0; left: -150%; width: 80%; height: 100%; background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%); transform: skewX(-25deg); transition: left 0.6s; pointer-events: none; }

        .alt-bubble:hover .alt-textbox::before { left: 150%; transition: left 0.9s ease-in-out; }



        #alt-msgs::-webkit-scrollbar       { width:3px }

        #alt-msgs::-webkit-scrollbar-thumb { background:rgba(180,60,40,0.2); border-radius:4px }

        #alt-msgs::-webkit-scrollbar-track { background:transparent }



        #alt-sb-list::-webkit-scrollbar       { width:3px }

        #alt-sb-list::-webkit-scrollbar-thumb { background:rgba(255,0,110,0.18); border-radius:4px }



        #alt-cin:focus {

          border-color: rgba(255,0,110,0.4);

          border-bottom-color: #FF006E;

          background: rgba(255,0,110,0.03);

          outline: none;

        }

        #alt-cin::placeholder { color: rgba(210,170,140,0.28); letter-spacing: 0.08em }

      `}</style>



      <div ref={containerRef} style={{

        fontFamily:   F_RAJ,

        background:   C.bg,

        height:       '100%',

        minHeight:    520,

        display:      'flex',

        overflow:     'hidden',

        position:     'relative',

      }}>



        {/* ── Corner brackets ── */}

        {(['tl','tr','bl','br'] as const).map(pos => (

          <div key={pos} style={{

            position: 'absolute', width: 18, height: 18, opacity: 0.45, zIndex: 10,

            top:    pos.startsWith('t') ? 10 : undefined,

            bottom: pos.startsWith('b') ? 10 : undefined,

            left:   pos.endsWith('l')   ? 10 : undefined,

            right:  pos.endsWith('r')   ? 10 : undefined,

            borderTop:    pos.startsWith('t') ? `2px solid ${C.orange}` : undefined,

            borderBottom: pos.startsWith('b') ? `2px solid ${C.orange}` : undefined,

            borderLeft:   pos.endsWith('l')   ? `2px solid ${C.orange}` : undefined,

            borderRight:  pos.endsWith('r')   ? `2px solid ${C.orange}` : undefined,

          }}/>

        ))}



        {/* ── Progress bar ── */}

        <div className="chat-progress" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, zIndex: 50, background: 'rgba(255,107,0,0.08)' }}>

          <div style={{ width: '100%', height: '100%', background: `linear-gradient(90deg,${C.pink},${C.orange},${C.yellow})`, boxShadow: '0 0 12px rgba(255,107,0,0.5)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.1s linear' }} />

        </div>



        {/* ── Glitch top line ── */}

        <div style={{

          position:   'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 10,

          background: `linear-gradient(90deg,transparent,${C.orange},${C.purple},transparent)`,

          animation:  'altGlitch 4s linear infinite',

        }}/>



        {/* ── 3D Neural field + hex grid ── */}

        <NeuralField3D />

        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.25,

          backgroundImage: 'linear-gradient(rgba(255,0,110,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,0,110,0.04) 1px,transparent 1px)',

          backgroundSize: '32px 32px',

          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,#000 0%,transparent 80%)',

          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,#000 0%,transparent 80%)'

        }} />



        {/* ── Ambient orbs ── */}

        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,0,110,0.12) 0%,transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,107,0,0.12) 0%,transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />



        {/* ── Scanline overlay ── */}

        <div className="chat-scanlines" style={{

          position: 'absolute', inset: 0, zIndex: 11, pointerEvents: 'none', opacity: 0.05,

          background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.04) 2px,rgba(255,255,255,0.04) 4px)',

          mixBlendMode: 'overlay',

        }} />



        {/* ── Sidebar ── */}

        <div style={{

          position:     'relative', zIndex: 5,

          width:         sidebarOpen ? 210 : 0,

          minWidth:      sidebarOpen ? 210 : 0,

          overflow:      'hidden',

          transition:    'width 0.32s cubic-bezier(.4,0,.2,1)',

          flexShrink:    0,

          background:    C.surface,

          borderRight:   `1px solid ${C.bdrP}`,

          display:       'flex',

          flexDirection: 'column',

        }}>

          <div style={{ width: 210, height: '100%', display: 'flex', flexDirection: 'column', padding: '16px 12px' }}>



            {/* Sidebar title */}

            <div style={{

              fontFamily:    F_ORB, fontSize: '0.66rem', letterSpacing: '0.38em',

              color:         'rgba(255,0,110,0.55)', textTransform: 'uppercase',

              paddingBottom: 10, marginBottom: 12,

              borderBottom:  `1px solid ${C.bdrP}`,

            }}>

              ✦ ARCHIVO NEURAL

            </div>



            {/* New session */}

            <button onClick={newChat}

              style={{

                width: '100%', padding: '8px 0', borderRadius: 8,

                background: 'transparent', border: '1px solid rgba(255,0,110,0.3)',

                color: C.purple, fontFamily: F_RAJ, fontSize: '0.7rem',

                fontWeight: 700, letterSpacing: '0.15em', cursor: 'pointer',

                marginBottom: 14, display: 'flex', alignItems: 'center',

                justifyContent: 'center', gap: 6, textTransform: 'uppercase',

                transformStyle: 'preserve-3d', willChange: 'transform',

              }}

              onMouseMove={e => { handleHoverBtn(e, true); magneticMove(e, 0.2) }}

              onMouseLeave={e => { handleHoverBtn(e, false); magneticReset(e) }}>

              <IconPlus /> NUEVA SESIÓN

            </button>



            {/* Section label */}

            <div style={{

              fontSize: '0.58rem', letterSpacing: '0.2em', color: C.dimmer,

              textTransform: 'uppercase', marginBottom: 8, fontFamily: F_RAJ,

            }}>

              Recientes

            </div>



            {/* Session list */}

            <div id="alt-sb-list" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>

              {sessions.map(s => (

                <button key={s.id} onClick={() => loadSession(s.id)}

                  style={{

                    width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 2,

                    padding: '8px 10px', borderRadius: 8, cursor: 'pointer',

                    background:   currentSession === s.id ? 'rgba(255,0,110,0.06)' : 'transparent',

                    border:       `1px solid ${currentSession === s.id ? 'rgba(255,0,110,0.22)' : 'transparent'}`,

                    fontFamily:   F_RAJ,

                    transformStyle: 'preserve-3d', willChange: 'transform',

                  }}

                  onMouseMove={e => {

                    if (currentSession !== s.id) {

                      e.currentTarget.style.background   = 'rgba(255,0,110,0.04)'

                      e.currentTarget.style.borderColor  = 'rgba(255,0,110,0.15)'

                    }

                    tiltMove(e, -2, 6)

                  }}

                  onMouseLeave={e => {

                    if (currentSession !== s.id) {

                      e.currentTarget.style.background   = 'transparent'

                      e.currentTarget.style.borderColor  = 'transparent'

                    }

                    tiltReset(e)

                  }}>

                  <span style={{ fontSize: '0.58rem', color: C.text, fontWeight: 600, letterSpacing: '0.03em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>

                    {s.title}

                  </span>

                  <span style={{ fontSize: '0.62rem', color: C.dimmer, letterSpacing: '0.05em' }}>

                    {s.date}

                  </span>

                </button>

              ))}

            </div>

          </div>

        </div>



        {/* ── Main panel ── */}

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 4, minWidth: 0 }}>



          <div style={{

            display:       'flex', alignItems: 'center', gap: 10,

            padding:       '12px 16px',

            borderBottom:  `1px solid ${C.bdrO}`,

            background:    'rgba(8,0,10,0.82)',

            backdropFilter:'blur(28px)',

            flexShrink:    0,

          }}>

            {/* Menu button */}

            <button onClick={toggleSidebar}

              style={{

                width: 32, height: 32, borderRadius: 8, flexShrink: 0,

                background: 'transparent', border: '1px solid rgba(255,107,0,0.25)',

                color: 'rgba(255,107,0,0.7)', cursor: 'pointer',

                display: 'flex', alignItems: 'center', justifyContent: 'center',

                transformStyle: 'preserve-3d', willChange: 'transform',

              }}

              onMouseMove={e => { e.currentTarget.style.background = 'rgba(255,107,0,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,107,0,0.5)'; magneticMove(e, 0.35) }}

              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,107,0,0.25)'; magneticReset(e) }}>

              <IconMenu />

            </button>



            {/* Status pulse */}

            <div className="alt-status-dot" style={{

              width: 6, height: 6, borderRadius: '50%', flexShrink: 0,

              background: C.orange, boxShadow: '0 0 8px #FFD700',

            }}/>



            {/* Title */}

            <div style={{ flex: 1, minWidth: 0 }}>

              <div ref={titleRef} style={{ fontFamily: F_ORB, fontSize: '1rem', color: C.text, letterSpacing: '0.08em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

                ATHER — ENLACE NEURAL

              </div>

              <div style={{ fontSize: '0.62rem', color: 'rgba(255,107,0,0.38)', fontFamily: F_MONO, letterSpacing: '0.18em', textTransform: 'uppercase' }}>

                ◈ Motor Athernix · Fase I · Activo

              </div>

            </div>



            <a

              href="/development"

              title="Ir a Development"

              style={{

                flexShrink:   0,

                width:        30,

                height:       30,

                borderRadius: '50%',

                background:   'transparent',

                border:       '1px solid rgba(255,107,0,0.3)',

                color:        'rgba(255,107,0,0.7)',

                cursor:       'pointer',

                display:      'flex',

                alignItems:   'center',

                justifyContent: 'center',

                fontSize:     '0.75rem',

                textDecoration: 'none',

                transformStyle: 'preserve-3d', willChange: 'transform',

              }}

              onMouseMove={e => {

                e.currentTarget.style.background = 'rgba(255,107,0,0.1)';

                e.currentTarget.style.borderColor = 'rgba(255,107,0,0.5)';

                magneticMove(e, 0.35)

              }}

              onMouseLeave={e => {

                e.currentTarget.style.background = 'transparent';

                e.currentTarget.style.borderColor = 'rgba(255,107,0,0.3)';

                magneticReset(e)

              }}

            >

              →

            </a>



            <div style={{ fontSize: '0.56rem', color: C.dimmer, fontFamily: F_RAJ, letterSpacing: '0.2em', flexShrink: 0 }}>

              v2.0

            </div>

          </div>



          {/* Signal bar */}

          <div style={{ height: 2, background: C.bdrO, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>

            <div style={{

              position: 'absolute', top: 0, left: '-60%', width: '60%', height: '100%',

              background: `linear-gradient(90deg,transparent,${C.orange},${C.purple},transparent)`,

              animation: 'altSig 3s linear infinite',

            }}/>

          </div>



          {/* Messages */}

          <div id="alt-msgs" ref={messagesRef} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12, height: 0, }}>

            {messages.length === 0 ? (

              /* Empty state */

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>

                {/* Ather ring */}

                <div className="alt-empty-ring" style={{

                  width: 86, height: 86, borderRadius: '50%', position: 'relative',

                  border: '1px solid rgba(255,0,110,0.25)',

                  display: 'flex', alignItems: 'center', justifyContent: 'center',

                  boxShadow: '0 0 30px rgba(255,0,110,0.15), inset 0 0 20px rgba(255,0,110,0.05)',

                }}>

                  <div style={{

                    position: 'absolute', inset: 6, borderRadius: '50%',

                    border: '1px dashed rgba(255,107,0,0.25)',

                    animation: 'spin 14s linear infinite reverse',

                  }}/>

                  <div style={{

                    position: 'absolute', inset: 14, borderRadius: '50%',

                    border: '1px solid rgba(255,0,110,0.15)',

                    animation: 'spin 8s linear infinite',

                  }}/>

                  <div style={{

                    position: 'absolute', inset: 0, borderRadius: '50%',

                    background: 'conic-gradient(from 0deg, transparent, rgba(255,0,110,0.15), transparent, rgba(255,107,0,0.15), transparent)',

                    animation: 'spin 6s linear infinite',

                    opacity: 0.5,

                  }} />

                  <span style={{ fontFamily: F_ORB, fontSize: '1.4rem', color: C.orange, letterSpacing: '0.1em', position: 'relative', zIndex: 1, textShadow: '0 0 18px rgba(255,107,0,0.5)' }}>A</span>

                </div>



                {/* Divider line */}

                <div style={{ width: 40, height: 1, background: `linear-gradient(90deg,transparent,${C.orange},transparent)` }}/>



                <div style={{

                  fontFamily: F_RAJ, fontSize: '0.78rem', color: C.dimmer,

                  letterSpacing: '0.18em', textTransform: 'uppercase',

                  textAlign: 'center', lineHeight: 1.9,

                }}>

                  ENLACE CEREBRAL ACTIVO<br />¿Qué deseas explorar?

                </div>



                {/* Quick prompts */}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 340 }}>

                  {ALT_QUICK_PROMPTS.map(p => (

                    <button key={p} onClick={() => sendMessage(p)} className="alt-quick-prompt"

                      style={{

                        padding: '6px 14px', borderRadius: 6, background: 'transparent',

                        border: '1px solid rgba(255,107,0,0.2)', color: C.dim,

                        fontSize: '0.7rem', fontFamily: F_RAJ, cursor: 'pointer',

                        letterSpacing: '0.08em', textTransform: 'uppercase',

                        transformStyle: 'preserve-3d', willChange: 'transform',

                      }}

                      onMouseMove={e => { e.currentTarget.style.background = 'rgba(255,107,0,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,107,0,0.5)'; e.currentTarget.style.color = C.orange; magneticMove(e, 0.3) }}

                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,107,0,0.2)'; e.currentTarget.style.color = C.dim; magneticReset(e) }}>

                      {p}

                    </button>

                  ))}

                </div>

              </div>

            ) : (

              <>

                {messages.map((msg, i) => (

                  <AltMessageBubble

                    key={i}

                    msg={{...msg, id: String(i)}}

                    isLast={i === messages.length - 1}

                    busy={busy}

                    onSpeakMessage={handleSpeakMessage}

                    currentlySpeakingId={currentlySpeakingId}

                  />

                  

                ))}

                {/* Standalone typing indicator when waiting for stream start */}

                {busy && messages[messages.length - 1]?.role === 'user' && (

                  <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>

                    <div className="alt-avatar" style={{

                      width: 34, height: 34, borderRadius: '50%', flexShrink: 0,

                      display: 'flex', alignItems: 'center', justifyContent: 'center',

                      fontSize: '0.6rem', fontFamily: F_ORB, fontWeight: 700, letterSpacing: '0.05em',

                      background: 'rgba(255,0,110,0.08)', border: '2px solid rgba(255,0,110,0.4)',

                      color: 'rgba(255,0,110,0.9)',

                      boxShadow: '0 0 18px rgba(255,0,110,0.35), inset 0 0 12px rgba(255,0,110,0.08)',

                      transformStyle: 'preserve-3d', animation: 'avatarPulse 2.4s ease-in-out infinite',

                    }}>

                      A

                    </div>

                    <div>

                      <div style={{ fontSize: '0.52rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 4, fontFamily: F_RAJ, color: 'rgba(255,0,110,0.4)', display: 'flex', alignItems: 'center', gap: 5 }}>

                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,0,110,0.5)', display: 'inline-block' }}/>

                        ◈ ATHER ENGINE

                      </div>

                      <div style={{ padding: '10px 13px', borderRadius: 6, background: 'rgba(18,8,28,0.9)', border: '1px solid rgba(255,0,110,0.14)', borderLeft: '2px solid rgba(255,0,110,0.35)' }}>

                        <TypingDots />

                      </div>

                    </div>

                  </div>

                )}

              </>

            )}

            <div ref={messagesEndRef}/>

          </div>



          {/* Input area */}

          <div style={{

            padding:       '10px 16px 12px',

            borderTop:     `1px solid ${C.bdrO}`,

            background:    'rgba(8,4,14,0.88)',

            backdropFilter:'blur(16px)',

            flexShrink:    0,

            position:      'relative',

          }}>

            {/* Terminal label */}

            <div style={{

              position:      'absolute', top: -10, left: 16,

              fontFamily:    F_RAJ, fontSize: '0.5rem', letterSpacing: '0.2em',

              color:         C.dimmer, background: 'rgba(8,4,14,0.88)', padding: '0 6px',

            }}>

              INPUT_NODE://

            </div>



            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>

              {/* Micrófono: encendido/apagado simple del Modo Voz (overlay) */}

              <button

                type="button"

                onClick={() => voiceModeState.active ? closeVoiceMode() : openVoiceMode()}

                title={voiceModeState.active ? 'Apagar micrófono' : 'Encender micrófono'}

                disabled={busy}

                style={{

                  width: 36, height: 36, borderRadius: 6, flexShrink: 0,

                  background: voiceModeState.active ? 'rgba(255,0,110,0.15)' : 'transparent',

                  border: voiceModeState.active ? '1px solid rgba(255,0,110,0.5)' : '1px solid rgba(255,0,110,0.25)',

                  color: voiceModeState.active ? '#FF006E' : 'rgba(255,0,110,0.7)',

                  cursor: busy ? 'not-allowed' : 'pointer',

                  display: 'flex', alignItems: 'center', justifyContent: 'center',

                  opacity: busy ? 0.28 : 1,

                  transformStyle: 'preserve-3d', willChange: 'transform',

                }}

                onMouseMove={e => {

                  if (!busy && !voiceModeState.active) {

                    e.currentTarget.style.borderColor = 'rgba(255,0,110,0.5)'

                    e.currentTarget.style.color = 'rgba(255,0,110,0.9)'

                    e.currentTarget.style.background = 'rgba(255,0,110,0.1)'

                    magneticMove(e, 0.3)

                  }

                }}

                onMouseLeave={e => {

                  if (!voiceModeState.active) {

                    e.currentTarget.style.borderColor = 'rgba(255,0,110,0.25)'

                    e.currentTarget.style.color = 'rgba(255,0,110,0.7)'

                    e.currentTarget.style.background = 'transparent'

                    magneticReset(e)

                  }

                }}

              >

                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>

                  {voiceModeState.active ? (

                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 0 1 0 1.971l-11.54 6.347a1.125 1.125 0 0 1-1.667-.985V5.653Z" />

                  ) : (

                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"/>

                  )}

                </svg>

              </button>

              <input

                id="alt-cin"

                value={input}

                onChange={e => setInput(e.target.value)}

                onKeyDown={handleKeyDown}

                placeholder="TRANSMITE TU COMANDO AL NÚCLEO..."

                disabled={busy}

                autoComplete="off"

                style={{

                  flex:          1,

                  background:    'transparent',

                  border:        '1px solid rgba(255,0,110,0.2)',

                  borderBottom:  '1.5px solid rgba(255,107,0,0.4)',

                  borderRadius:  6,

                  padding:       '10px 14px',

                  color:         C.text,

                  fontFamily:    F_RAJ,

                  fontSize:      '0.82rem',

                  letterSpacing: '0.03em',

                  caretColor:    C.purple,

                  outline:       'none',

                  transition:    'all 0.2s',

                  opacity:       busy ? 0.5 : 1,

                  transformStyle: 'preserve-3d',

                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',

                }}

                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,0,110,0.5)'; e.currentTarget.style.borderBottomColor = C.pink; e.currentTarget.style.boxShadow = '0 0 20px rgba(255,0,110,0.2), 0 4px 12px rgba(0,0,0,0.25)'; e.currentTarget.style.background = 'rgba(255,0,110,0.03)' }}

                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,0,110,0.2)'; e.currentTarget.style.borderBottomColor = 'rgba(255,107,0,0.4)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)'; e.currentTarget.style.background = 'transparent' }}

              />

              <button type="submit" disabled={busy || !input.trim()}

                style={{

                  width: 36, height: 36, borderRadius: 6, flexShrink: 0,

                  background: 'transparent', border: '1px solid rgba(255,107,0,0.3)',

                  color: 'rgba(255,107,0,0.8)', cursor: busy || !input.trim() ? 'not-allowed' : 'pointer',

                  display: 'flex', alignItems: 'center', justifyContent: 'center',

                  opacity: busy || !input.trim() ? 0.28 : 1,

                  transformStyle: 'preserve-3d', willChange: 'transform',

                }}

                onMouseMove={e => {

                  if (!busy && input.trim()) {

                    e.currentTarget.style.borderColor = C.orange

                    e.currentTarget.style.color       = C.orange

                    e.currentTarget.style.background  = 'rgba(255,107,0,0.07)'

                    magneticMove(e, 0.35)

                  }

                }}

                onMouseLeave={e => {

                  e.currentTarget.style.borderColor = 'rgba(255,107,0,0.3)'

                  e.currentTarget.style.color       = 'rgba(255,107,0,0.8)'

                  e.currentTarget.style.background  = 'transparent'

                  magneticReset(e)

                }}>

                <IconSend />

              </button>

            </form>



            <div style={{

              fontSize:      '0.58rem', color: C.dimmer, letterSpacing: '0.15em',

              textAlign:     'center', marginTop: 8, fontFamily: F_RAJ, textTransform: 'uppercase',

            }}>

              CONECTADO A /API/CHAT · ATHERNIX ENGINE FASE I

            </div>

          </div>

        </div>

      </div>



      {/* Modo Voz: overlay de pantalla completa que se sobrepone sobre toda la interfaz */}

      <VoiceModeOverlay

        state={voiceModeState}

        onClose={closeVoiceMode}

        onStartCycle={startVoiceCycle}

        onInterrupt={interrupt}

      />

    </>

  )

}