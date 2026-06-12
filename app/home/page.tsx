// view/HomeView.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useHomeController } from '@/controllers/user/usehome'
import type { Achievement, NewsItem, ExploreCard } from '@/models/useHome'

// ── Shared token styles ───────────────────────────────────────
const FONT_ORBITRON  = "'Orbitron', sans-serif"
const FONT_RAJDHANI  = "'Rajdhani', sans-serif"
const CARD: React.CSSProperties = {
  background:    'rgba(18,8,12,0.88)',
  border:        '1px solid rgba(180,60,40,0.2)',
  boxShadow:     '0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
  backdropFilter:'blur(14px)',
  borderRadius:  '1rem',
}

// ── Icons ─────────────────────────────────────────────────────
const ArrowLeft  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>
const ArrowRight = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>
const ChevronDown = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>
const ChevronUp   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"/></svg>

// ── Mascot SVG — Ather robot stylized ────────────────────────
function AthernixMascot({ className }: { className?: string }) {
  const maskRef  = useRef<SVGGElement>(null)
  const eyeL     = useRef<SVGRectElement>(null)
  const eyeR     = useRef<SVGRectElement>(null)
  const mouthRef = useRef<SVGPathElement>(null)
  const bodyRef  = useRef<SVGGElement>(null)
  const crystalRefs = useRef<SVGPathElement[]>([])

  useEffect(() => {
    // Body float
    gsap.to(bodyRef.current, {
      y: -10, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
    })
    // Eye blink
    const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 3 })
    blinkTl
      .to([eyeL.current, eyeR.current], { scaleY: 0.1, duration: 0.08, transformOrigin: 'center' })
      .to([eyeL.current, eyeR.current], { scaleY: 1, duration: 0.08 })
    // Crystal shimmer
    crystalRefs.current.forEach((el, i) => {
      gsap.to(el, {
        opacity: 0.55 + Math.random() * 0.45,
        duration: 1.2 + i * 0.3,
        repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.2,
      })
    })
    // Mouth wave
    gsap.to(mouthRef.current, {
      attr: { d: 'M 95 155 Q 115 170 135 155' },
      duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut',
    })
  }, [])

  const addCrystalRef = (el: SVGPathElement | null, i: number) => {
    if (el) crystalRefs.current[i] = el
  }

  return (
    <svg
      ref={el => { if (el) (bodyRef.current as unknown) = el.querySelector('g') }}
      viewBox="0 0 230 280"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#2a1218"/>
          <stop offset="100%" stopColor="#0d0608"/>
        </radialGradient>
        <radialGradient id="screenGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a0a0a"/>
          <stop offset="100%" stopColor="#0a0404"/>
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glowStrong">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Crystal gradient */}
        <linearGradient id="crystalPink" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6eb4"/>
          <stop offset="100%" stopColor="#c0396b"/>
        </linearGradient>
        <linearGradient id="crystalGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffcc44"/>
          <stop offset="100%" stopColor="#ff8c00"/>
        </linearGradient>
      </defs>

      <g ref={bodyRef}>
        {/* ── Crystals top ── */}
        <path ref={el => addCrystalRef(el, 0)} d="M 75 45 L 65 15 L 80 8 L 90 40 Z" fill="url(#crystalPink)" opacity="0.9" filter="url(#glow)"/>
        <path ref={el => addCrystalRef(el, 1)} d="M 60 55 L 45 22 L 58 16 L 72 50 Z" fill="url(#crystalPink)" opacity="0.75" filter="url(#glow)"/>
        <path ref={el => addCrystalRef(el, 2)} d="M 155 45 L 165 15 L 150 8 L 140 40 Z" fill="url(#crystalPink)" opacity="0.9" filter="url(#glow)"/>
        <path ref={el => addCrystalRef(el, 3)} d="M 170 55 L 185 22 L 172 16 L 158 50 Z" fill="url(#crystalPink)" opacity="0.75" filter="url(#glow)"/>
        <path ref={el => addCrystalRef(el, 4)} d="M 115 35 L 110 5 L 120 5 L 118 32 Z" fill="url(#crystalGold)" opacity="0.85" filter="url(#glow)"/>

        {/* ── Head ── */}
        <rect x="52" y="52" width="126" height="88" rx="22" fill="url(#bodyGrad)"
          stroke="#ff6b35" strokeWidth="1.5" filter="url(#glow)"/>
        {/* Screen bezel */}
        <rect x="62" y="62" width="106" height="68" rx="14" fill="url(#screenGrad)"
          stroke="rgba(255,107,53,0.3)" strokeWidth="1"/>

        {/* Eyes - segmented bars */}
        <g ref={el => { if (el) (maskRef.current as unknown) = el }} filter="url(#glowStrong)">
          {/* Left eye */}
          {[0,1,2].map(i => (
            <rect key={`l${i}`} ref={i === 0 ? eyeL : undefined}
              x={72} y={74 + i * 10} width={26} height={6} rx={3} fill="#ff8c35" opacity={1 - i * 0.2}/>
          ))}
          {/* Right eye */}
          {[0,1,2].map(i => (
            <rect key={`r${i}`} ref={i === 0 ? eyeR : undefined}
              x={132} y={74 + i * 10} width={26} height={6} rx={3} fill="#ff8c35" opacity={1 - i * 0.2}/>
          ))}
          {/* Mouth */}
          <path ref={mouthRef} d="M 95 155 Q 115 163 135 155"
            stroke="#ff6b35" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        </g>

        {/* ── Neck ── */}
        <rect x="100" y="138" width="30" height="16" rx="6" fill="#1a0a0e"
          stroke="rgba(255,107,53,0.3)" strokeWidth="1"/>

        {/* ── Body ── */}
        <rect x="58" y="152" width="114" height="80" rx="18" fill="url(#bodyGrad)"
          stroke="#ff6b35" strokeWidth="1.5" filter="url(#glow)"/>
        {/* Athernix A logo on chest */}
        <text x="115" y="202" textAnchor="middle" fill="none"
          stroke="#ff6b35" strokeWidth="1.5" fontSize="28" fontFamily="serif"
          filter="url(#glowStrong)" opacity="0.9">A</text>
        {/* Neon ring around chest */}
        <ellipse cx="115" cy="192" rx="22" ry="22" fill="none"
          stroke="#ff4e50" strokeWidth="2" opacity="0.6" filter="url(#glow)"/>

        {/* ── Left arm ── */}
        <rect x="20" y="160" width="38" height="18" rx="9" fill="#1a0a0e"
          stroke="rgba(255,107,53,0.4)" strokeWidth="1" transform="rotate(-15 39 169)"/>
        {/* Left hand crystal */}
        <path ref={el => addCrystalRef(el, 5)} d="M 14 178 L 8 160 L 18 158 L 22 175 Z"
          fill="url(#crystalGold)" opacity="0.8" filter="url(#glow)"/>

        {/* ── Right arm (raised/waving) ── */}
        <rect x="172" y="148" width="38" height="18" rx="9" fill="#1a0a0e"
          stroke="rgba(255,107,53,0.4)" strokeWidth="1" transform="rotate(25 191 157)"/>
        {/* Right fist */}
        <circle cx="208" cy="140" r="14" fill="#1a0a0e"
          stroke="#ff6b35" strokeWidth="1.5" filter="url(#glow)"/>
        {/* Crystals on right fist */}
        <path ref={el => addCrystalRef(el, 6)} d="M 208 126 L 204 112 L 212 112 L 210 124 Z"
          fill="url(#crystalPink)" opacity="0.9" filter="url(#glow)"/>
        <path ref={el => addCrystalRef(el, 7)} d="M 218 130 L 226 118 L 232 122 L 222 132 Z"
          fill="url(#crystalPink)" opacity="0.75" filter="url(#glow)"/>

        {/* ── Legs ── */}
        <rect x="78" y="230" width="32" height="36" rx="10" fill="#1a0a0e"
          stroke="rgba(255,107,53,0.3)" strokeWidth="1"/>
        <rect x="120" y="230" width="32" height="36" rx="10" fill="#1a0a0e"
          stroke="rgba(255,107,53,0.3)" strokeWidth="1"/>
        {/* Feet */}
        <ellipse cx="94" cy="270" rx="20" ry="10" fill="#0f0608"
          stroke="rgba(255,107,53,0.4)" strokeWidth="1"/>
        <ellipse cx="136" cy="270" rx="20" ry="10" fill="#0f0608"
          stroke="rgba(255,107,53,0.4)" strokeWidth="1"/>
        {/* Foot triangles */}
        <polygon points="88,264 94,254 100,264" fill="#ff6b35" opacity="0.6" filter="url(#glow)"/>
        <polygon points="130,264 136,254 142,264" fill="#ff6b35" opacity="0.6" filter="url(#glow)"/>

        {/* ── Ambient neon edge glow ── */}
        <rect x="52" y="52" width="126" height="88" rx="22" fill="none"
          stroke="#ff3060" strokeWidth="0.5" opacity="0.4"/>
      </g>
    </svg>
  )
}

// ── Brain achievement map ─────────────────────────────────────
function BrainMap({ achievements }: { achievements: Achievement[] }) {
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    nodeRefs.current.forEach((el, i) => {
      if (!el) return
      const ach = achievements[i]
      if (ach?.unlocked) {
        gsap.to(el, {
          boxShadow: `0 0 18px ${ach.color}80, 0 0 6px ${ach.color}`,
          duration: 1.5 + i * 0.2,
          repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.15,
        })
      }
    })
  }, [achievements])

  // Node positions simulating brain lobes
  const positions = [
    { top: '8%',  left: '42%' }, // frontal top
    { top: '20%', left: '18%' }, // left temporal
    { top: '20%', left: '66%' }, // right temporal
    { top: '42%', left: '8%'  }, // left parietal
    { top: '42%', left: '76%' }, // right parietal
    { top: '58%', left: '28%' }, // left occipital
    { top: '58%', left: '56%' }, // right occipital
    { top: '74%', left: '42%' }, // cerebellum
  ]

  // SVG connector lines between nodes
  const connections = [
    [0,1],[0,2],[1,3],[2,4],[1,2],[3,5],[4,6],[5,7],[6,7],[3,4],
  ]

  return (
    <div className="relative w-full" style={{ height: 320 }}>
      {/* Brain outline SVG background */}
      <svg viewBox="0 0 300 280" className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="brainGlow">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Brain shape */}
        <path d="M 150 20 C 80 15, 30 55, 28 110 C 25 155, 45 185, 70 200 C 55 220, 60 250, 90 255 C 110 260, 130 248, 150 245 C 170 248, 190 260, 210 255 C 240 250, 245 220, 230 200 C 255 185, 275 155, 272 110 C 270 55, 220 15, 150 20 Z"
          fill="none" stroke="#ff6b35" strokeWidth="1.5" filter="url(#brainGlow)"/>
        {/* Hemisphere divider */}
        <path d="M 150 22 C 148 80, 150 160, 150 244"
          stroke="rgba(255,107,53,0.4)" strokeWidth="1" strokeDasharray="4 4"/>
        {/* Lobe details */}
        <path d="M 90 80 C 70 90, 55 115, 65 140" stroke="rgba(255,107,53,0.25)" strokeWidth="1" fill="none"/>
        <path d="M 210 80 C 230 90, 245 115, 235 140" stroke="rgba(255,107,53,0.25)" strokeWidth="1" fill="none"/>
        <path d="M 100 170 C 120 185, 180 185, 200 170" stroke="rgba(255,107,53,0.25)" strokeWidth="1" fill="none"/>

        {/* Connector lines between achievement nodes */}
        {connections.map(([a, b], i) => {
          const pa = positions[a], pb = positions[b]
          const x1 = parseFloat(pa.left) * 3
          const y1 = parseFloat(pa.top)  * 2.8
          const x2 = parseFloat(pb.left) * 3
          const y2 = parseFloat(pb.top)  * 2.8
          const ach = achievements[a]
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={ach?.unlocked ? `${ach.color}55` : 'rgba(255,100,50,0.1)'}
              strokeWidth="1" strokeDasharray={ach?.unlocked ? '0' : '3 3'}/>
          )
        })}
      </svg>

      {/* Achievement nodes */}
      {achievements.map((ach, i) => {
        const pos = positions[i]
        return (
          <div key={ach.id}
            ref={el => { nodeRefs.current[i] = el }}
            className="absolute flex flex-col items-center group cursor-pointer"
            style={{ top: pos.top, left: pos.left, transform: 'translate(-50%,-50%)', zIndex: 2 }}>
            {/* Node */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-base transition-transform duration-200 group-hover:scale-125"
              style={{
                background: ach.unlocked
                  ? `radial-gradient(circle, ${ach.color}30, rgba(10,5,8,0.9))`
                  : 'rgba(20,10,14,0.8)',
                border: `2px solid ${ach.unlocked ? ach.color : 'rgba(255,100,50,0.2)'}`,
                color: ach.unlocked ? ach.color : 'rgba(255,100,50,0.25)',
                filter: ach.unlocked ? `drop-shadow(0 0 6px ${ach.color})` : 'none',
              }}>
              {ach.icon}
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap"
              style={{ minWidth: 150 }}>
              <div className="px-3 py-2 rounded-lg text-xs"
                style={{ background: 'rgba(15,6,10,0.97)', border: `1px solid ${ach.color}55`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.8)` }}>
                <p className="font-bold tracking-wider" style={{ color: ach.color, fontFamily: FONT_RAJDHANI }}>
                  {ach.label}
                </p>
                <p style={{ color: 'rgba(200,160,140,0.8)', fontSize: '0.65rem' }}>{ach.desc}</p>
                <p className="mt-1 font-bold" style={{ color: ach.unlocked ? '#00e5a0' : 'rgba(255,100,50,0.4)', fontSize: '0.65rem' }}>
                  {ach.unlocked ? `+${ach.xp} XP ✦` : 'BLOQUEADO'}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── News carousel ─────────────────────────────────────────────
function NewsCarousel({
  items, activeIndex, expandedId,
  onPrev, onNext, onDot, onToggle,
}: {
  items: NewsItem[]
  activeIndex: number
  expandedId: string | null
  onPrev: () => void
  onNext: () => void
  onDot: (i: number) => void
  onToggle: (id: string) => void
}) {
  const item = items[activeIndex]
  const slideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(slideRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, [activeIndex])

  return (
    <div style={CARD} className="p-5 overflow-hidden">
      {/* Controls row */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-[0.25em] uppercase font-bold"
          style={{ color: 'rgba(255,120,70,0.5)', fontFamily: FONT_RAJDHANI }}>
          ✦ transmisión_athernix
        </span>
        <div className="flex items-center gap-2">
          <button onClick={onPrev}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{ background: 'rgba(255,100,50,0.1)', border: '1px solid rgba(255,100,50,0.2)', color: '#ff6b35', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,100,50,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,100,50,0.1)'}>
            <ArrowLeft />
          </button>
          <button onClick={onNext}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{ background: 'rgba(255,100,50,0.1)', border: '1px solid rgba(255,100,50,0.2)', color: '#ff6b35', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,100,50,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,100,50,0.1)'}>
            <ArrowRight />
          </button>
        </div>
      </div>

      {/* Slide */}
      <div ref={slideRef}>
        {/* Tag + date */}
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider"
            style={{ background: `${item.tagColor}18`, border: `1px solid ${item.tagColor}50`, color: item.tagColor, fontFamily: FONT_RAJDHANI }}>
            {item.tag}
          </span>
          <span className="text-xs" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: FONT_RAJDHANI }}>
            {item.date} · {item.readTime} lectura
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-black mb-2 leading-snug"
          style={{ fontFamily: FONT_ORBITRON, color: '#e8d5c8', letterSpacing: '0.03em', fontSize: '0.95rem' }}>
          {item.title}
        </h3>

        {/* Summary - expandable */}
        <p className="text-xs leading-relaxed transition-all duration-300"
          style={{
            color: 'rgba(200,160,140,0.75)',
            fontFamily: FONT_RAJDHANI,
            display: '-webkit-box',
            WebkitLineClamp: expandedId === item.id ? 'unset' : 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: expandedId === item.id ? 'visible' : 'hidden',
          }}>
          {item.summary}
        </p>

        {/* Expand button */}
        <button onClick={() => onToggle(item.id)}
          className="mt-3 flex items-center gap-1 text-xs font-semibold tracking-wider uppercase transition-colors"
          style={{ color: item.tagColor, fontFamily: FONT_RAJDHANI, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          {expandedId === item.id ? <><ChevronUp /> Leer menos</> : <><ChevronDown /> Leer más</>}
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {items.map((_, i) => (
          <button key={i} onClick={() => onDot(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width:  activeIndex === i ? 20 : 6,
              height: 6,
              background: activeIndex === i ? 'linear-gradient(90deg,#ff4e50,#f7931e)' : 'rgba(255,100,50,0.25)',
              border: 'none', cursor: 'pointer',
              boxShadow: activeIndex === i ? '0 0 8px rgba(255,100,50,0.5)' : 'none',
            }}/>
        ))}
      </div>
    </div>
  )
}

// ── Explore card ──────────────────────────────────────────────
function ExploreCardItem({ card }: { card: ExploreCard }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref}
      className="explore-card relative overflow-hidden cursor-pointer transition-all duration-300"
      style={{ ...CARD, padding: '1.25rem' }}
      onMouseEnter={e => {
        gsap.to(ref.current, { y: -4, duration: 0.25, ease: 'power2.out' })
        const el = e.currentTarget
        el.style.borderColor = `${card.color}55`
        el.style.boxShadow = `0 12px 40px rgba(0,0,0,0.6), 0 0 30px ${card.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
      }}
      onMouseLeave={e => {
        gsap.to(ref.current, { y: 0, duration: 0.25, ease: 'power2.out' })
        const el = e.currentTarget
        el.style.borderColor = 'rgba(180,60,40,0.2)'
        el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)'
      }}>
      {/* Glow blob */}
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${card.glow} 0%, transparent 70%)`, filter: 'blur(20px)', transform: 'translate(30%, -30%)' }}/>
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
        style={{ background: `${card.color}18`, border: `1px solid ${card.color}40`, color: card.color,
          filter: `drop-shadow(0 0 6px ${card.color})` }}>
        {card.icon}
      </div>
      {/* Area */}
      <p className="text-xs tracking-[0.2em] uppercase mb-1"
        style={{ color: `${card.color}aa`, fontFamily: FONT_RAJDHANI }}>
        {card.area}
      </p>
      {/* Title */}
      <h4 className="font-black text-sm mb-2"
        style={{ fontFamily: FONT_ORBITRON, color: '#e8d5c8', letterSpacing: '0.05em', fontSize: '0.8rem' }}>
        {card.title}
      </h4>
      {/* Desc */}
      <p className="text-xs leading-relaxed"
        style={{ color: 'rgba(200,150,120,0.65)', fontFamily: FONT_RAJDHANI }}>
        {card.desc}
      </p>
      {/* CTA */}
      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase"
        style={{ color: card.color, fontFamily: FONT_RAJDHANI }}>
        Explorar <ArrowRight />
      </div>
    </div>
  )
}

// ── Main View ──────────────────────────────────────────────────
export default function HomeView() {
  const {
    state, firstName, greeting, totalXP, unlockedCount,
    achievements, newsItems, exploreCards,
    goToNews, prevNews, nextNews, toggleNews,
  } = useHomeController()

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.isLoading) return
    const ctx = gsap.context(() => {
      gsap.to('.orb-h1', { scale: 1.2, opacity: 0.5, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.orb-h2', { scale: 1.3, opacity: 0.35, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero-section',   { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo('.mascot-wrap',    { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.7 }, '-=0.5')
        .fromTo('.section-block',  { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.6 }, '-=0.3')
        .fromTo('.explore-card',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, '-=0.2')
    }, containerRef)
    return () => ctx.revert()
  }, [state.isLoading])

  if (state.isLoading) {
    return (
      <div style={{ background: 'linear-gradient(135deg,#0d0608,#1a0810,#120508)', minHeight: '100vh' }}
        className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin w-10 h-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="rgba(255,100,50,0.2)" strokeWidth="3"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="#ff6b35" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(255,120,70,0.5)', fontFamily: FONT_RAJDHANI }}>
            Cargando sistema...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef}
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: 'linear-gradient(135deg,#0d0608 0%,#1a0810 50%,#0d0608 100%)' }}>

      {/* Ambient orbs */}
      <div className="orb-h1 fixed pointer-events-none rounded-full"
        style={{ width: 600, height: 600, top: '-15%', right: '-10%', zIndex: 0,
          background: 'radial-gradient(circle,rgba(180,30,30,0.18) 0%,transparent 70%)',
          filter: 'blur(60px)' }}/>
      <div className="orb-h2 fixed pointer-events-none rounded-full"
        style={{ width: 500, height: 500, bottom: '0%', left: '-10%', zIndex: 0,
          background: 'radial-gradient(circle,rgba(200,60,20,0.14) 0%,transparent 70%)',
          filter: 'blur(70px)' }}/>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* ── HERO — Welcome + Mascot ── */}
        <section className="hero-section flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Greeting eyebrow */}
            <p className="text-xs tracking-[0.35em] uppercase mb-3"
              style={{ color: 'rgba(255,120,70,0.55)', fontFamily: FONT_RAJDHANI }}>
              ✦ {greeting}, operador ✦
            </p>
            {/* Name headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none mb-4"
              style={{ fontFamily: FONT_ORBITRON }}>
              <span style={{
                background: 'linear-gradient(90deg,#ff6b35 0%,#f7c59f 50%,#ff8c42 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {firstName}
              </span>
            </h1>
            {/* Subtitle */}
            <p className="text-sm leading-relaxed max-w-md mx-auto lg:mx-0"
              style={{ color: 'rgba(200,160,140,0.7)', fontFamily: FONT_RAJDHANI, letterSpacing: '0.05em' }}>
              El sistema Athernix está en línea.<br/>
              Tu viaje de aprendizaje continúa hoy.
            </p>
            {/* XP bar */}
            <div className="mt-6 max-w-xs mx-auto lg:mx-0">
              <div className="flex justify-between text-xs mb-2"
                style={{ color: 'rgba(255,120,70,0.6)', fontFamily: FONT_RAJDHANI, letterSpacing: '0.1em' }}>
                <span>EXPERIENCIA TOTAL</span>
                <span style={{ color: '#ff6b35', fontWeight: 700 }}>{totalXP} XP</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,100,50,0.12)', border: '1px solid rgba(255,100,50,0.2)' }}>
                <div className="h-full rounded-full"
                  style={{
                    width: `${Math.min((totalXP / 1000) * 100, 100)}%`,
                    background: 'linear-gradient(90deg,#ff4e50,#f7931e)',
                    boxShadow: '0 0 8px rgba(255,100,50,0.6)',
                  }}/>
              </div>
              <p className="text-xs mt-1.5" style={{ color: 'rgba(200,150,120,0.45)', fontFamily: FONT_RAJDHANI }}>
                {unlockedCount}/{achievements.length} logros desbloqueados
              </p>
            </div>
          </div>

          {/* Mascot */}
          <div className="mascot-wrap flex-shrink-0 relative flex items-center justify-center"
            style={{ width: 260, height: 300 }}>
            {/* Glow under mascot */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-10 rounded-full"
              style={{ background: 'radial-gradient(ellipse,rgba(255,100,50,0.35),transparent 70%)', filter: 'blur(12px)' }}/>
            <AthernixMascot className="w-full h-full drop-shadow-2xl" />
            {/* Wave label */}
            <div className="absolute top-2 right-0 px-3 py-1.5 rounded-xl text-xs font-bold"
              style={{ background: 'rgba(255,107,53,0.12)', border: '1px solid rgba(255,107,53,0.3)',
                color: '#ff8c42', fontFamily: FONT_RAJDHANI, letterSpacing: '0.1em',
                boxShadow: '0 2px 12px rgba(255,100,50,0.2)' }}>
              ¡HOLA! 👾
            </div>
          </div>
        </section>

        {/* ── BRAIN MAP — Logros ── */}
        <section className="section-block">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1" style={{ background: 'rgba(255,100,50,0.15)' }}/>
            <div className="flex items-center gap-3">
              <span style={{ color: '#ff6b35', fontSize: '1.1rem' }}>⬡</span>
              <h2 className="text-sm font-black tracking-[0.3em] uppercase"
                style={{ fontFamily: FONT_ORBITRON, color: '#e8d5c8', letterSpacing: '0.2em' }}>
                Lo que has aprendido
              </h2>
              <span style={{ color: '#ff6b35', fontSize: '1.1rem' }}>⬡</span>
            </div>
            <div className="h-px flex-1" style={{ background: 'rgba(255,100,50,0.15)' }}/>
          </div>

          <div style={CARD} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs tracking-wider" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: FONT_RAJDHANI }}>
                Mapa de logros cerebrales — pasa el cursor sobre cada nodo
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff6b35', boxShadow: '0 0 6px #ff6b35' }}/>
                <span className="text-xs" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: FONT_RAJDHANI }}>Desbloqueado</span>
                <div className="w-2.5 h-2.5 rounded-full ml-3" style={{ background: 'rgba(255,100,50,0.2)', border: '1px solid rgba(255,100,50,0.3)' }}/>
                <span className="text-xs" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: FONT_RAJDHANI }}>Bloqueado</span>
              </div>
            </div>
            <BrainMap achievements={achievements} />
          </div>
        </section>

        {/* ── NEWS + EXPLORE grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* News carousel */}
          <section className="section-block">
            <div className="flex items-center gap-3 mb-4">
              <span style={{ color: '#ff6b35' }}>◎</span>
              <h2 className="text-sm font-black tracking-[0.2em] uppercase"
                style={{ fontFamily: FONT_ORBITRON, color: '#e8d5c8', letterSpacing: '0.15em', fontSize: '0.8rem' }}>
                Noticias
              </h2>
            </div>
            <NewsCarousel
              items={newsItems}
              activeIndex={state.activeNews}
              expandedId={state.expandedNews}
              onPrev={prevNews}
              onNext={nextNews}
              onDot={goToNews}
              onToggle={toggleNews}
            />
          </section>

          {/* STEM explore */}
          <section className="section-block">
            <div className="flex items-center gap-3 mb-4">
              <span style={{ color: '#ff6b35' }}>◈</span>
              <h2 className="text-sm font-black tracking-[0.2em] uppercase"
                style={{ fontFamily: FONT_ORBITRON, color: '#e8d5c8', letterSpacing: '0.15em', fontSize: '0.8rem' }}>
                Exploración STEM
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {exploreCards.map(card => (
                <ExploreCardItem key={card.id} card={card} />
              ))}
            </div>
          </section>
        </div>

        {/* ── Footer stamp ── */}
        <div className="section-block text-center pb-4">
          <p className="text-xs tracking-[0.4em] uppercase"
            style={{ color: 'rgba(255,100,50,0.2)', fontFamily: FONT_RAJDHANI }}>
            ✦ athernix · sistema v2.0 · el salvador ✦
          </p>
        </div>

      </div>
    </div>
  )
}