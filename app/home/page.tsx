// view/HomeView.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useHomeController } from '@/controllers/user/usehome'
import type { Achievement, NewsItem, ExploreCard, AIGlassesModel, StatBadge } from '@/models/useHome'

// ── Design tokens ──────────────────────────────────────────────
const F_ORB = "'Orbitron', sans-serif"
const F_RAJ = "'Rajdhani', sans-serif"

// ── Icons ──────────────────────────────────────────────────────
const IconArrowL   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>
const IconArrowR   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>
const IconChevronD = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>
const IconChevronU = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"/></svg>
const IconLock     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>
const IconCheck    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
const IconZap      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/></svg>

// ── Mascot SVG — Ather robot ───────────────────────────────────
function AthernixMascot({ className, glassesColor = '#ff6b35' }: { className?: string; glassesColor?: string }) {
  const bodyRef     = useRef<SVGGElement>(null)
  const eyeL        = useRef<SVGRectElement>(null)
  const eyeR        = useRef<SVGRectElement>(null)
  const mouthRef    = useRef<SVGPathElement>(null)
  const crystalRefs = useRef<SVGPathElement[]>([])

  const addCrystalRef = (el: SVGPathElement | null, i: number) => { if (el) crystalRefs.current[i] = el }

  useEffect(() => {
    gsap.to(bodyRef.current, { y: -10, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 3 })
    blinkTl
      .to([eyeL.current, eyeR.current], { scaleY: 0.1, duration: 0.08, transformOrigin: 'center' })
      .to([eyeL.current, eyeR.current], { scaleY: 1, duration: 0.08 })
    crystalRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, { opacity: 0.55 + Math.random() * 0.45, duration: 1.2 + i * 0.3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.2 })
    })
    gsap.to(mouthRef.current, { attr: { d: 'M 95 155 Q 115 170 135 155' }, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }, [glassesColor])

  return (
    <svg viewBox="0 0 230 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bodyGrad2" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#2a1218"/><stop offset="100%" stopColor="#0d0608"/>
        </radialGradient>
        <radialGradient id="screenGrad2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a0a0a"/><stop offset="100%" stopColor="#0a0404"/>
        </radialGradient>
        <filter id="glow2"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="glowStrong2"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="crystalDyn" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={glassesColor}/>
          <stop offset="100%" stopColor={glassesColor + '88'}/>
        </linearGradient>
        <linearGradient id="crystalGold2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffcc44"/><stop offset="100%" stopColor="#ff8c00"/>
        </linearGradient>
      </defs>
      <g ref={bodyRef}>
        <path ref={el => addCrystalRef(el, 0)} d="M 75 45 L 65 15 L 80 8 L 90 40 Z" fill="url(#crystalDyn)" opacity="0.9" filter="url(#glow2)"/>
        <path ref={el => addCrystalRef(el, 1)} d="M 60 55 L 45 22 L 58 16 L 72 50 Z" fill="url(#crystalDyn)" opacity="0.75" filter="url(#glow2)"/>
        <path ref={el => addCrystalRef(el, 2)} d="M 155 45 L 165 15 L 150 8 L 140 40 Z" fill="url(#crystalDyn)" opacity="0.9" filter="url(#glow2)"/>
        <path ref={el => addCrystalRef(el, 3)} d="M 170 55 L 185 22 L 172 16 L 158 50 Z" fill="url(#crystalDyn)" opacity="0.75" filter="url(#glow2)"/>
        <path ref={el => addCrystalRef(el, 4)} d="M 115 35 L 110 5 L 120 5 L 118 32 Z" fill="url(#crystalGold2)" opacity="0.85" filter="url(#glow2)"/>
        <rect x="52" y="52" width="126" height="88" rx="22" fill="url(#bodyGrad2)" stroke={glassesColor} strokeWidth="1.5" filter="url(#glow2)"/>
        <rect x="62" y="62" width="106" height="68" rx="14" fill="url(#screenGrad2)" stroke={glassesColor + '50'} strokeWidth="1"/>
        <g filter="url(#glowStrong2)">
          {[0,1,2].map(i => <rect key={`l${i}`} ref={i===0?eyeL:undefined} x={72} y={74+i*10} width={26} height={6} rx={3} fill={glassesColor} opacity={1-i*0.2}/>)}
          {[0,1,2].map(i => <rect key={`r${i}`} ref={i===0?eyeR:undefined} x={132} y={74+i*10} width={26} height={6} rx={3} fill={glassesColor} opacity={1-i*0.2}/>)}
          <path ref={mouthRef} d="M 95 155 Q 115 163 135 155" stroke={glassesColor} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        </g>
        <rect x="100" y="138" width="30" height="16" rx="6" fill="#1a0a0e" stroke={glassesColor + '50'} strokeWidth="1"/>
        <rect x="58" y="152" width="114" height="80" rx="18" fill="url(#bodyGrad2)" stroke={glassesColor} strokeWidth="1.5" filter="url(#glow2)"/>
        <text x="115" y="202" textAnchor="middle" fill="none" stroke={glassesColor} strokeWidth="1.5" fontSize="28" fontFamily="serif" filter="url(#glowStrong2)" opacity="0.9">A</text>
        <ellipse cx="115" cy="192" rx="22" ry="22" fill="none" stroke={glassesColor} strokeWidth="2" opacity="0.6" filter="url(#glow2)"/>
        <rect x="20" y="160" width="38" height="18" rx="9" fill="#1a0a0e" stroke={glassesColor + '60'} strokeWidth="1" transform="rotate(-15 39 169)"/>
        <path ref={el => addCrystalRef(el, 5)} d="M 14 178 L 8 160 L 18 158 L 22 175 Z" fill="url(#crystalGold2)" opacity="0.8" filter="url(#glow2)"/>
        <rect x="172" y="148" width="38" height="18" rx="9" fill="#1a0a0e" stroke={glassesColor + '60'} strokeWidth="1" transform="rotate(25 191 157)"/>
        <circle cx="208" cy="140" r="14" fill="#1a0a0e" stroke={glassesColor} strokeWidth="1.5" filter="url(#glow2)"/>
        <path ref={el => addCrystalRef(el, 6)} d="M 208 126 L 204 112 L 212 112 L 210 124 Z" fill="url(#crystalDyn)" opacity="0.9" filter="url(#glow2)"/>
        <path ref={el => addCrystalRef(el, 7)} d="M 218 130 L 226 118 L 232 122 L 222 132 Z" fill="url(#crystalDyn)" opacity="0.75" filter="url(#glow2)"/>
        <rect x="78" y="230" width="32" height="36" rx="10" fill="#1a0a0e" stroke={glassesColor + '50'} strokeWidth="1"/>
        <rect x="120" y="230" width="32" height="36" rx="10" fill="#1a0a0e" stroke={glassesColor + '50'} strokeWidth="1"/>
        <ellipse cx="94" cy="270" rx="20" ry="10" fill="#0f0608" stroke={glassesColor + '60'} strokeWidth="1"/>
        <ellipse cx="136" cy="270" rx="20" ry="10" fill="#0f0608" stroke={glassesColor + '60'} strokeWidth="1"/>
        <polygon points="88,264 94,254 100,264" fill={glassesColor} opacity="0.6" filter="url(#glow2)"/>
        <polygon points="130,264 136,254 142,264" fill={glassesColor} opacity="0.6" filter="url(#glow2)"/>
        <rect x="52" y="52" width="126" height="88" rx="22" fill="none" stroke={glassesColor + '40'} strokeWidth="0.5"/>
      </g>
    </svg>
  )
}

// ── Stat badge ─────────────────────────────────────────────────
function StatBadgeItem({ badge }: { badge: StatBadge }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref}
      className="stat-badge flex flex-col items-center gap-1 px-4 py-3 rounded-2xl border cursor-default transition-all duration-300"
      style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(180,60,40,0.2)' }}
      onMouseEnter={e => {
        gsap.to(ref.current, { y: -3, duration: 0.2, ease: 'power2.out' })
        e.currentTarget.style.borderColor = badge.color + '55'
        e.currentTarget.style.boxShadow   = `0 0 20px ${badge.color}20`
      }}
      onMouseLeave={e => {
        gsap.to(ref.current, { y: 0, duration: 0.2, ease: 'power2.out' })
        e.currentTarget.style.borderColor = 'rgba(180,60,40,0.2)'
        e.currentTarget.style.boxShadow   = 'none'
      }}>
      <span style={{ fontSize: '1.1rem', color: badge.color, filter: `drop-shadow(0 0 5px ${badge.color})` }}>{badge.icon}</span>
      <span className="text-xl font-black" style={{ fontFamily: F_ORB, color: badge.color, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>{badge.value}</span>
      <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_RAJ, fontSize: '0.58rem', letterSpacing: '0.15em' }}>{badge.label}</span>
    </div>
  )
}

// ── Achievement brain map ──────────────────────────────────────
function BrainMap({ achievements }: { achievements: Achievement[] }) {
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    nodeRefs.current.forEach((el, i) => {
      const ach = achievements[i]
      if (ach?.unlocked && el) {
        gsap.to(el, { boxShadow: `0 0 18px ${ach.color}80, 0 0 6px ${ach.color}`, duration: 1.5+i*0.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i*0.15 })
      }
    })
  }, [achievements])

  const positions = [
    { top: '8%',  left: '42%' },
    { top: '20%', left: '18%' },
    { top: '20%', left: '66%' },
    { top: '42%', left: '8%'  },
    { top: '42%', left: '76%' },
    { top: '58%', left: '28%' },
    { top: '58%', left: '56%' },
    { top: '74%', left: '42%' },
  ]
  const connections = [[0,1],[0,2],[1,3],[2,4],[1,2],[3,5],[4,6],[5,7],[6,7],[3,4]]

  return (
    <div className="relative w-full" style={{ height: 280 }}>
      <svg viewBox="0 0 300 280" className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
        <path d="M 150 20 C 80 15, 30 55, 28 110 C 25 155, 45 185, 70 200 C 55 220, 60 250, 90 255 C 110 260, 130 248, 150 245 C 170 248, 190 260, 210 255 C 240 250, 245 220, 230 200 C 255 185, 275 155, 272 110 C 270 55, 220 15, 150 20 Z"
          fill="none" stroke="#ff6b35" strokeWidth="1.5"/>
        <path d="M 150 22 C 148 80, 150 160, 150 244" stroke="rgba(255,107,53,0.3)" strokeWidth="1" strokeDasharray="4 4"/>
        {connections.map(([a,b],i) => {
          const pa = positions[a], pb = positions[b]
          const x1=parseFloat(pa.left)*3, y1=parseFloat(pa.top)*2.8
          const x2=parseFloat(pb.left)*3, y2=parseFloat(pb.top)*2.8
          const ach = achievements[a]
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ach?.unlocked?`${ach.color}55`:'rgba(255,100,50,0.1)'} strokeWidth="1" strokeDasharray={ach?.unlocked?'0':'3 3'}/>
        })}
      </svg>
      {achievements.map((ach, i) => {
        const pos = positions[i]
        return (
          <div key={ach.id} ref={el => { nodeRefs.current[i] = el }}
            className="absolute flex flex-col items-center group cursor-pointer"
            style={{ top: pos.top, left: pos.left, transform: 'translate(-50%,-50%)', zIndex: 2 }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-base transition-transform duration-200 group-hover:scale-125"
              style={{ background: ach.unlocked ? `radial-gradient(circle,${ach.color}30,rgba(10,5,8,0.9))` : 'rgba(20,10,14,0.8)',
                border: `2px solid ${ach.unlocked ? ach.color : 'rgba(255,100,50,0.2)'}`,
                color: ach.unlocked ? ach.color : 'rgba(255,100,50,0.25)',
                filter: ach.unlocked ? `drop-shadow(0 0 6px ${ach.color})` : 'none' }}>
              {ach.icon}
            </div>
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap">
              <div className="px-3 py-2 rounded-lg text-xs" style={{ background: 'rgba(15,6,10,0.97)', border: `1px solid ${ach.color}55`, boxShadow: '0 4px 20px rgba(0,0,0,0.8)', minWidth: 150 }}>
                <p className="font-bold tracking-wider" style={{ color: ach.color, fontFamily: F_RAJ }}>{ach.label}</p>
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

// ── News carousel ──────────────────────────────────────────────
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
  const item     = items[activeIndex]
  const slideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(slideRef.current, { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' })
  }, [activeIndex])

  return (
    <div className="rounded-2xl border overflow-hidden"
      style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(180,60,40,0.2)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b" style={{ borderColor: 'rgba(180,60,40,0.12)' }}>
        <span className="text-xs tracking-widest uppercase font-bold" style={{ color: 'rgba(255,120,70,0.5)', fontFamily: F_RAJ, letterSpacing: '0.22em', fontSize: '0.58rem' }}>
          ✦ transmisión_athernix
        </span>
        <div className="flex items-center gap-2">
          {[onPrev, onNext].map((fn, i) => (
            <button key={i} onClick={fn}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
              style={{ background: 'rgba(255,100,50,0.1)', border: '1px solid rgba(255,100,50,0.2)', color: '#ff6b35', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,100,50,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,100,50,0.1)'}>
              {i === 0 ? <IconArrowL /> : <IconArrowR />}
            </button>
          ))}
        </div>
      </div>

      <div ref={slideRef} className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider"
            style={{ background: `${item.tagColor}18`, border: `1px solid ${item.tagColor}50`, color: item.tagColor, fontFamily: F_RAJ }}>
            {item.tag}
          </span>
          <span className="text-xs ml-auto" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_RAJ }}>
            {item.date} · {item.readTime}
          </span>
        </div>
        <h3 className="text-sm font-black mb-2 leading-snug" style={{ fontFamily: F_ORB, color: '#e8d5c8', letterSpacing: '0.03em', fontSize: '0.9rem' }}>
          {item.title}
        </h3>
        <p className="text-xs leading-relaxed transition-all duration-300"
          style={{ color: 'rgba(200,160,140,0.75)', fontFamily: F_RAJ,
            display: '-webkit-box', WebkitLineClamp: expandedId === item.id ? 'unset' : 2,
            WebkitBoxOrient: 'vertical' as const, overflow: expandedId === item.id ? 'visible' : 'hidden' }}>
          {item.summary}
        </p>
        <button onClick={() => onToggle(item.id)}
          className="mt-3 flex items-center gap-1 text-xs font-semibold tracking-wider uppercase"
          style={{ color: item.tagColor, fontFamily: F_RAJ, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.opacity='0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity='1'}>
          {expandedId === item.id ? <><IconChevronU />Leer menos</> : <><IconChevronD />Leer más</>}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 pb-4">
        {items.map((_,i) => (
          <button key={i} onClick={() => onDot(i)}
            style={{ width: activeIndex===i?20:6, height:6, borderRadius:9999,
              background: activeIndex===i ? 'linear-gradient(90deg,#ff4e50,#f7931e)' : 'rgba(255,100,50,0.25)',
              border:'none', cursor:'pointer', transition:'all 0.3s',
              boxShadow: activeIndex===i ? '0 0 8px rgba(255,100,50,0.5)' : 'none' }}/>
        ))}
      </div>
    </div>
  )
}

// ── Explore card ───────────────────────────────────────────────
function ExploreCardItem({ card }: { card: ExploreCard }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref}
      className="explore-card relative overflow-hidden cursor-pointer rounded-2xl border transition-all duration-300"
      style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(180,60,40,0.2)', padding: '1.1rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
      onMouseEnter={e => {
        gsap.to(ref.current, { y: -4, duration: 0.25, ease: 'power2.out' })
        e.currentTarget.style.borderColor = card.color + '55'
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.6), 0 0 28px ${card.glow}`
      }}
      onMouseLeave={e => {
        gsap.to(ref.current, { y: 0, duration: 0.25, ease: 'power2.out' })
        e.currentTarget.style.borderColor = 'rgba(180,60,40,0.2)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
      }}>
      <div className="absolute top-0 right-0 w-16 h-16 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle,${card.glow} 0%,transparent 70%)`, filter: 'blur(18px)', transform: 'translate(30%,-30%)' }}/>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-2.5"
        style={{ background: `${card.color}18`, border: `1px solid ${card.color}40`, color: card.color, filter: `drop-shadow(0 0 5px ${card.color})` }}>
        {card.icon}
      </div>
      <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: `${card.color}aa`, fontFamily: F_RAJ, fontSize: '0.6rem', letterSpacing: '0.18em' }}>{card.area}</p>
      <h4 className="font-black text-sm mb-1.5" style={{ fontFamily: F_ORB, color: '#e8d5c8', fontSize: '0.78rem', letterSpacing: '0.04em' }}>{card.title}</h4>
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_RAJ }}>{card.desc}</p>
      <div className="mt-3 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase" style={{ color: card.color, fontFamily: F_RAJ }}>
        Explorar <IconArrowR />
      </div>
    </div>
  )
}

// ── ═══════════════════════════════════════════════════════════
// ── GLASSES SELECTOR — new section ────────────────────────────
// ── ═══════════════════════════════════════════════════════════

function GlassesCard({
  model,
  isActive,
  onSelect,
  onHover,
}: {
  model: AIGlassesModel
  isActive: boolean
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !ref.current) return
    // Pulse effect on active card
    gsap.to(ref.current, {
      boxShadow: `0 0 32px ${model.color}30, 0 0 8px ${model.color}15`,
      duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut',
    })
    return () => { gsap.killTweensOf(ref.current) }
  }, [isActive, model.color])

  return (
    <div ref={ref}
      className="glasses-card relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: isActive ? `linear-gradient(135deg, rgba(18,8,22,0.98), rgba(18,8,22,0.92))` : 'rgba(18,8,22,0.88)',
        borderColor: isActive ? model.color + '70' : model.locked ? 'rgba(80,40,40,0.3)' : 'rgba(180,60,40,0.2)',
        boxShadow: isActive ? `0 0 32px ${model.color}25, inset 0 1px 0 rgba(255,255,255,0.05)` : 'none',
        opacity: model.locked ? 0.6 : 1,
      }}
      onClick={() => onSelect(model.id)}
      onMouseEnter={e => {
        onHover(model.id)
        if (!model.locked) {
          gsap.to(ref.current, { y: -3, duration: 0.2, ease: 'power2.out' })
          if (!isActive) {
            e.currentTarget.style.borderColor = model.color + '45'
            e.currentTarget.style.boxShadow   = `0 8px 24px rgba(0,0,0,0.5), 0 0 16px ${model.color}15`
          }
        }
      }}
      onMouseLeave={e => {
        onHover(null)
        gsap.to(ref.current, { y: 0, duration: 0.2, ease: 'power2.out' })
        if (!isActive) {
          e.currentTarget.style.borderColor = 'rgba(180,60,40,0.2)'
          e.currentTarget.style.boxShadow   = 'none'
        }
      }}>

      {/* Active indicator strip */}
      {isActive && (
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${model.color}, transparent)` }}/>
      )}

      {/* Lock overlay */}
      {model.locked && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-2xl"
          style={{ background: 'rgba(8,4,12,0.65)', backdropFilter: 'blur(2px)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,100,50,0.12)', border: '1px solid rgba(255,100,50,0.3)', color: 'rgba(255,120,70,0.6)' }}>
            <IconLock />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255,120,70,0.45)', fontFamily: F_RAJ, fontSize: '0.55rem', letterSpacing: '0.2em' }}>
            BLOQUEADO
          </span>
        </div>
      )}

      <div className="p-4">
        {/* Top row: icon + badges */}
        <div className="flex items-start justify-between mb-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `${model.color}15`, border: `1px solid ${model.color}35`,
              color: model.color, filter: isActive ? `drop-shadow(0 0 8px ${model.color})` : 'none' }}>
            {model.icon}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {/* Tier badge */}
            <span className="px-2 py-0.5 rounded-full text-xs font-black tracking-widest"
              style={{ background: `${model.tierColor}18`, border: `1px solid ${model.tierColor}40`,
                color: model.tierColor, fontFamily: F_RAJ, fontSize: '0.55rem', letterSpacing: '0.18em' }}>
              {model.tier}
            </span>
            {/* Special badge */}
            {model.badge && (
              <span className="px-2 py-0.5 rounded-full text-xs font-black tracking-widest"
                style={{ background: `${model.color}22`, border: `1px solid ${model.color}55`,
                  color: model.color, fontFamily: F_RAJ, fontSize: '0.52rem', letterSpacing: '0.15em' }}>
                {model.badge}
              </span>
            )}
            {/* Active check */}
            {isActive && (
              <div className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: model.color, color: '#fff', boxShadow: `0 0 10px ${model.color}` }}>
                <IconCheck />
              </div>
            )}
          </div>
        </div>

        {/* Name + codename */}
        <p className="text-xs tracking-widest uppercase mb-0.5"
          style={{ color: `${model.color}88`, fontFamily: F_RAJ, fontSize: '0.58rem', letterSpacing: '0.2em' }}>
          {model.codename}
        </p>
        <h4 className="font-black mb-2" style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.82rem', letterSpacing: '0.05em' }}>
          {model.name}
        </h4>
        <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_RAJ, fontSize: '0.75rem' }}>
          {model.description}
        </p>

        {/* Strengths */}
        <div className="flex flex-col gap-1 mb-3">
          {model.strengths.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span style={{ color: model.color, fontSize: '0.55rem' }}>◈</span>
              <span className="text-xs" style={{ color: 'rgba(200,160,140,0.55)', fontFamily: F_RAJ, fontSize: '0.7rem' }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'rgba(180,60,40,0.12)' }}>
          <div className="flex items-center gap-1">
            <span style={{ color: 'rgba(200,150,120,0.4)', fontSize: '0.62rem', fontFamily: F_RAJ }}>CTX</span>
            <span className="text-xs font-bold" style={{ color: model.color, fontFamily: F_RAJ, fontSize: '0.68rem' }}>{model.context}</span>
          </div>
          <div className="w-px h-3 self-center" style={{ background: 'rgba(180,60,40,0.2)' }}/>
          <div className="flex items-center gap-1">
            <IconZap />
            <span className="text-xs font-bold" style={{ color: model.speedColor, fontFamily: F_RAJ, fontSize: '0.68rem' }}>{model.speed}</span>
          </div>
        </div>

        {/* Select button */}
        {!model.locked && (
          <button
            className="w-full mt-3 py-2 rounded-xl text-xs font-black tracking-widest uppercase flex items-center justify-center gap-1.5 transition-all duration-200"
            style={{
              background: isActive ? `${model.color}25` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${isActive ? model.color + '60' : 'rgba(180,60,40,0.2)'}`,
              color: isActive ? model.color : 'rgba(200,150,120,0.5)',
              fontFamily: F_RAJ, fontSize: '0.62rem', letterSpacing: '0.18em', cursor: 'pointer',
            }}
            onClick={e => { e.stopPropagation(); onSelect(model.id) }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = `${model.color}12` }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}>
            {isActive ? <><IconCheck />EN USO</> : 'SELECCIONAR'}
          </button>
        )}
      </div>
    </div>
  )
}

// ── Active glasses status bar ──────────────────────────────────
function ActiveGlassesBar({ model }: { model: AIGlassesModel }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.to(ref.current, {
      borderColor: [model.color + '50', model.color + '20', model.color + '50'],
      duration: 3, repeat: -1, ease: 'sine.inOut',
    })
  }, [model])

  return (
    <div ref={ref}
      className="active-glasses-bar flex items-center gap-4 px-5 py-3 rounded-2xl border transition-all duration-500"
      style={{ background: `linear-gradient(135deg, rgba(18,8,22,0.95), rgba(18,8,22,0.88))`,
        borderColor: model.color + '35', boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 20px ${model.color}15` }}>
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: `${model.color}15`, border: `1px solid ${model.color}45`, color: model.color,
          filter: `drop-shadow(0 0 8px ${model.color})` }}>
        {model.icon}
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs tracking-widest uppercase font-black" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_RAJ, fontSize: '0.55rem', letterSpacing: '0.22em' }}>
            Modelo activo
          </span>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00e5a0', boxShadow: '0 0 6px #00e5a0', animation: 'pulse 2s infinite' }}/>
        </div>
        <p className="font-black text-sm" style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.82rem', letterSpacing: '0.04em' }}>
          {model.name}
          <span className="ml-2 text-xs font-normal" style={{ color: `${model.color}aa`, fontFamily: F_RAJ, fontSize: '0.65rem' }}>
            ({model.codename})
          </span>
        </p>
      </div>
      {/* Stats */}
      <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
        <div className="text-center">
          <p className="text-xs font-black" style={{ color: model.color, fontFamily: F_ORB, fontSize: '0.7rem' }}>{model.context}</p>
          <p className="text-xs" style={{ color: 'rgba(200,150,120,0.35)', fontFamily: F_RAJ, fontSize: '0.58rem', letterSpacing: '0.1em' }}>CONTEXTO</p>
        </div>
        <div className="w-px h-6 self-center" style={{ background: 'rgba(180,60,40,0.2)' }}/>
        <div className="text-center">
          <p className="text-xs font-black" style={{ color: model.speedColor, fontFamily: F_ORB, fontSize: '0.7rem' }}>{model.speed}</p>
          <p className="text-xs" style={{ color: 'rgba(200,150,120,0.35)', fontFamily: F_RAJ, fontSize: '0.58rem', letterSpacing: '0.1em' }}>MODO</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-black"
          style={{ background: `${model.tierColor}18`, border: `1px solid ${model.tierColor}40`,
            color: model.tierColor, fontFamily: F_RAJ, fontSize: '0.6rem', letterSpacing: '0.15em' }}>
          {model.tier}
        </span>
      </div>
    </div>
  )
}

// ── Section header helper ──────────────────────────────────────
function SectionHeader({ icon, title, right }: { icon: string; title: string; right?: React.ReactNode }) {
  return (
    <div className="section-hdr flex items-center gap-3 mb-5">
      <span style={{ color: '#ff6b35', fontSize: '1rem' }}>{icon}</span>
      <h2 className="font-black tracking-widest uppercase" style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.2em' }}>
        {title}
      </h2>
      <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }}/>
      {right}
    </div>
  )
}

// ── ═══════════════════════════════════════════════════════════
// ── MAIN VIEW ─────────────────────────────────────────────────
// ── ═══════════════════════════════════════════════════════════

export default function HomeView() {
  const {
    state, firstName, greeting, totalXP, unlockedCount,
    activeGlasses, achievements, newsItems, exploreCards, statBadges, glassesModels,
    prevNews, nextNews, goToNews, toggleNews,
    selectGlasses, hoverGlasses,
  } = useHomeController()

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ambient orbs
      gsap.to('.orb-h1', { scale: 1.2, opacity: 0.5, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.orb-h2', { scale: 1.3, opacity: 0.35, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })
      gsap.to('.orb-h3', { scale: 1.15, opacity: 0.25, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })

      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero-badge',       { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.45 })
        .fromTo('.hero-title',       { opacity: 0, y: 36 },  { opacity: 1, y: 0, duration: 0.7 }, '-=0.2')
        .fromTo('.hero-sub',         { opacity: 0 },          { opacity: 1, duration: 0.4 },       '-=0.3')
        .fromTo('.hero-xp',          { opacity: 0, y: 12 },  { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .fromTo('.mascot-wrap',      { opacity: 0, x: 40 },  { opacity: 1, x: 0, duration: 0.6 }, '-=0.5')
        .fromTo('.stat-badge',       { opacity: 0, y: 20 },  { opacity: 1, y: 0, stagger: 0.07, duration: 0.4 }, '-=0.2')
        .fromTo('.active-glasses-bar', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45 }, '-=0.1')
        .fromTo('.section-hdr',      { opacity: 0, x: -16 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.4 }, '-=0.1')
        .fromTo('.glasses-card',     { opacity: 0, y: 24 },  { opacity: 1, y: 0, stagger: 0.09, duration: 0.4 }, '-=0.2')
        .fromTo('.explore-card',     { opacity: 0, y: 18 },  { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, '-=0.2')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>

      <div ref={containerRef}
        className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(135deg,#0d0608 0%,#120818 50%,#080410 100%)', fontFamily: F_RAJ }}>

        {/* Ambient orbs */}
        <div className="orb-h1 fixed pointer-events-none rounded-full"
          style={{ width:650, height:650, top:'-15%', right:'-10%', zIndex:0,
            background:'radial-gradient(circle,rgba(180,30,30,0.18) 0%,transparent 70%)', filter:'blur(60px)' }}/>
        <div className="orb-h2 fixed pointer-events-none rounded-full"
          style={{ width:500, height:500, bottom:'0%', left:'-10%', zIndex:0,
            background:'radial-gradient(circle,rgba(130,40,200,0.12) 0%,transparent 70%)', filter:'blur(70px)' }}/>
        <div className="orb-h3 fixed pointer-events-none rounded-full"
          style={{ width:350, height:350, top:'40%', left:'30%', zIndex:0,
            background:'radial-gradient(circle,rgba(255,107,53,0.05) 0%,transparent 70%)', filter:'blur(50px)' }}/>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-14">

          {/* ──────────────── HERO ──────────────── */}
          <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
            {/* Text side */}
            <div className="flex-1 text-center lg:text-left">
              {/* Eyebrow badge */}
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(255,107,53,0.07)', border: '1px solid rgba(255,107,53,0.18)' }}>
                <span style={{ color: '#ff6b35', fontSize: '0.7rem' }}>◈</span>
                <span className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: 'rgba(255,120,70,0.65)', fontFamily: F_RAJ, letterSpacing: '0.25em', fontSize: '0.6rem' }}>
                  {greeting}, operador
                </span>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#00e5a0',
                  boxShadow:'0 0 8px #00e5a0', display:'inline-block', animation:'pulse 2s infinite' }}/>
              </div>

              {/* Name headline */}
              <h1 className="hero-title font-black leading-none mb-4"
                style={{ fontFamily: F_ORB, fontSize: 'clamp(2.4rem,6vw,4.2rem)', letterSpacing: '-0.02em' }}>
                <span style={{ background: 'linear-gradient(90deg,#ff6b35 0%,#f7c59f 55%,#ff8c42 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  {firstName}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="hero-sub text-sm leading-relaxed max-w-md mx-auto lg:mx-0 mb-5"
                style={{ color: 'rgba(200,160,140,0.65)', fontFamily: F_RAJ, letterSpacing: '0.04em' }}>
                El sistema Athernix está en línea.<br/>Tu viaje de aprendizaje continúa hoy.
              </p>

              {/* Terminal line */}
              <div className="hero-sub inline-flex items-center gap-3 px-4 py-2 rounded-xl mb-6"
                style={{ background: 'rgba(8,4,14,0.88)', border: '1px solid rgba(180,60,40,0.22)', fontFamily: "'Courier New', monospace" }}>
                <span style={{ color: '#ff6b35', fontSize: '0.78rem' }}>$</span>
                <span style={{ color: '#ede0d4', fontSize: '0.75rem', letterSpacing: '0.04em' }}>
                  ather init --user {firstName.toLowerCase()} --session active
                </span>
              </div>

              {/* XP bar */}
              <div className="hero-xp max-w-xs mx-auto lg:mx-0">
                <div className="flex justify-between text-xs mb-1.5"
                  style={{ color: 'rgba(255,120,70,0.55)', fontFamily: F_RAJ, letterSpacing: '0.1em' }}>
                  <span>EXPERIENCIA TOTAL</span>
                  <span style={{ color: '#ff6b35', fontWeight: 700 }}>{totalXP} XP</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,100,50,0.1)', border: '1px solid rgba(255,100,50,0.18)' }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min((totalXP/800)*100, 100)}%`,
                      background: 'linear-gradient(90deg,#ff4e50,#f7931e)',
                      boxShadow: '0 0 8px rgba(255,100,50,0.6)' }}/>
                </div>
                <p className="text-xs mt-1" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_RAJ }}>
                  {unlockedCount}/{achievements.length} logros desbloqueados
                </p>
              </div>
            </div>

            {/* Mascot */}
            <div className="mascot-wrap flex-shrink-0 relative flex items-center justify-center"
              style={{ width: 260, height: 295 }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-10 rounded-full"
                style={{ background: `radial-gradient(ellipse,${activeGlasses.color}40,transparent 70%)`, filter: 'blur(14px)' }}/>
              <AthernixMascot className="w-full h-full drop-shadow-2xl" glassesColor={activeGlasses.color} />
              <div className="absolute top-2 right-0 px-3 py-1.5 rounded-xl text-xs font-bold"
                style={{ background: `${activeGlasses.color}15`, border: `1px solid ${activeGlasses.color}40`,
                  color: activeGlasses.color, fontFamily: F_RAJ, letterSpacing: '0.1em' }}>
                {activeGlasses.icon} {activeGlasses.codename}
              </div>
            </div>
          </section>

          {/* ──────────────── STAT BADGES ──────────────── */}
          <div className="grid grid-cols-4 gap-3">
            {statBadges.map(b => <StatBadgeItem key={b.label} badge={b}/>)}
          </div>

          {/* ──────────────── ACTIVE GLASSES STATUS ──────────────── */}
          <div>
            <SectionHeader icon="◈" title="Modelo de IA Activo" right={
              <span className="text-xs" style={{ color: 'rgba(200,150,120,0.35)', fontFamily: F_RAJ, fontSize: '0.62rem' }}>
                Athernix v2.0
              </span>
            }/>
            <ActiveGlassesBar model={activeGlasses}/>
          </div>

          {/* ──────────────── GLASSES SELECTOR ──────────────── */}
          <div>
            <SectionHeader icon="⬡" title="Selector de Gafas IA" right={
              <span className="text-xs" style={{ color: 'rgba(200,150,120,0.35)', fontFamily: F_RAJ, fontSize: '0.62rem' }}>
                {glassesModels.filter(g => !g.locked).length} disponibles
              </span>
            }/>

            {/* Subtitle */}
            <p className="text-xs mb-5 -mt-3" style={{ color: 'rgba(200,150,120,0.45)', fontFamily: F_RAJ, letterSpacing: '0.04em' }}>
              Elige el modelo de IA que alimenta a Ather — cada uno tiene diferentes capacidades y límites de contexto.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {glassesModels.map(model => (
                <GlassesCard
                  key={model.id}
                  model={model}
                  isActive={state.activeGlassesId === model.id}
                  onSelect={selectGlasses}
                  onHover={hoverGlasses}
                />
              ))}
            </div>
          </div>

          {/* ──────────────── BRAIN MAP ──────────────── */}
          <div>
            <SectionHeader icon="⬡" title="Lo que has aprendido"/>
            <div className="rounded-2xl border p-6"
              style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(180,60,40,0.2)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs tracking-wider" style={{ color: 'rgba(200,150,120,0.45)', fontFamily: F_RAJ }}>
                  Mapa de logros — pasa el cursor sobre cada nodo
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#ff6b35', boxShadow: '0 0 6px #ff6b35' }}/>
                    <span className="text-xs" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_RAJ }}>Desbloqueado</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,100,50,0.2)', border: '1px solid rgba(255,100,50,0.3)' }}/>
                    <span className="text-xs" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_RAJ }}>Bloqueado</span>
                  </div>
                </div>
              </div>
              <BrainMap achievements={achievements}/>
            </div>
          </div>

          {/* ──────────────── NEWS + EXPLORE grid ──────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <SectionHeader icon="◎" title="Noticias STEM"/>
              <NewsCarousel items={newsItems} activeIndex={state.activeNews} expandedId={state.expandedNews}
                onPrev={prevNews} onNext={nextNews} onDot={goToNews} onToggle={toggleNews}/>
            </div>
            <div>
              <SectionHeader icon="◈" title="Exploración STEM"/>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {exploreCards.map(card => <ExploreCardItem key={card.id} card={card}/>)}
              </div>
            </div>
          </div>

          {/* ──────────────── Footer ──────────────── */}
          <div className="text-center pt-4">
            <p className="text-xs tracking-widest uppercase"
              style={{ color: 'rgba(255,100,50,0.15)', fontFamily: F_RAJ, letterSpacing: '0.4em' }}>
              ✦ athernix · sistema v2.0 · el salvador ✦
            </p>
          </div>

        </div>
      </div>
    </>
  )
}