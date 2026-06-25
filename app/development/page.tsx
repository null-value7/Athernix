// view/ZonaDesarrolloView.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
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

// ── Design tokens ─────────────────────────────────────────────
const F_ORB = "'Orbitron', sans-serif"
const F_RAJ = "'Rajdhani', sans-serif"

// ── Icons ──────────────────────────────────────────────────────
const IconSearch   = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>
const IconChevron  = ({ open }: { open: boolean }) => <svg className="w-4 h-4 transition-transform duration-300" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>
const IconBot      = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"/></svg>
const IconBook     = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg>
const IconArrow    = () => <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>
const IconExternal = () => <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
const IconMap      = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"/></svg>

// ── Stat card ──────────────────────────────────────────────────
function StatCardItem({ card, index }: { card: StatCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="stat-card flex flex-col items-center gap-1.5 p-5 rounded-2xl border transition-all duration-300 cursor-default"
      style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(180,60,40,0.18)' }}
      onMouseEnter={e => {
        gsap.to(ref.current, { y: -4, duration: 0.2, ease: 'power2.out' })
        const el = e.currentTarget
        el.style.borderColor = `${card.color}55`
        el.style.boxShadow   = `0 0 24px ${card.color}25`
      }}
      onMouseLeave={e => {
        gsap.to(ref.current, { y: 0, duration: 0.2, ease: 'power2.out' })
        const el = e.currentTarget
        el.style.borderColor = 'rgba(180,60,40,0.18)'
        el.style.boxShadow   = 'none'
      }}>
      <span style={{ color: card.color, fontSize: '1.4rem', filter: `drop-shadow(0 0 6px ${card.color})` }}>{card.icon}</span>
      <span className="text-3xl font-black" style={{ fontFamily: F_ORB, color: card.color, letterSpacing: '-0.02em' }}>{card.value}</span>
      <span className="text-xs text-center tracking-wider uppercase" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_RAJ, fontSize: '0.65rem', letterSpacing: '0.15em' }}>{card.label}</span>
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
      className="stem-card rounded-2xl overflow-hidden border transition-all duration-300"
      style={{
        background:   'rgba(18,8,22,0.88)',
        borderColor:  isActive ? `${area.color}45` : 'rgba(180,60,40,0.18)',
        boxShadow:    isActive ? `0 0 30px ${area.glow}` : 'none',
      }}>

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
          <p className="text-xs tracking-widest uppercase mb-0.5"
            style={{ color: `${area.color}cc`, fontFamily: F_RAJ, letterSpacing: '0.2em', fontSize: '0.6rem' }}>
            {area.area}
          </p>
          <h3 className="font-black text-sm tracking-wider"
            style={{ fontFamily: F_ORB, color: '#ede0d4', letterSpacing: '0.06em', fontSize: '0.82rem' }}>
            {area.title}
          </h3>
          <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: F_RAJ }}>
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
          <p className="text-xs tracking-widest uppercase mb-3"
            style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_RAJ, letterSpacing: '0.2em', fontSize: '0.58rem' }}>
            Temario
          </p>
          <div className="flex flex-col gap-2 mb-5">
            {area.topics.map(topic => {
              const badge     = getLevelBadge(topic.level)
              const topicOpen = activeTopic === topic.id
              return (
                <div key={topic.id} className="rounded-xl overflow-hidden"
                  style={{ border: `1px solid ${topicOpen ? area.color + '45' : 'rgba(180,60,40,0.15)'}`,
                    background: topicOpen ? `${area.color}08` : 'rgba(255,255,255,0.02)' }}>
                  {/* Topic header */}
                  <button onClick={() => onToggleTopic(topic.id)}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <div className="flex-1 flex items-center gap-2.5 min-w-0">
                      <span className="text-xs font-semibold truncate" style={{ color: '#ede0d4', fontFamily: F_RAJ, letterSpacing: '0.03em' }}>
                        {topic.label}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: `${badge.color}18`, border: `1px solid ${badge.color}45`, color: badge.color,
                          fontFamily: F_RAJ, fontSize: '0.55rem', letterSpacing: '0.15em' }}>
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
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all duration-200"
                        style={{ background: `${area.color}18`, border: `1px solid ${area.color}45`,
                          color: area.color, fontFamily: F_RAJ, letterSpacing: '0.1em', cursor: 'pointer' }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${area.color}28`; e.currentTarget.style.boxShadow = `0 0 12px ${area.color}30` }}
                        onMouseLeave={e => { e.currentTarget.style.background = `${area.color}18`; e.currentTarget.style.boxShadow = 'none' }}>
                        <IconBot /> Preguntar a Ather
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Bibliography */}
          <p className="text-xs tracking-widest uppercase mb-2"
            style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_RAJ, letterSpacing: '0.2em', fontSize: '0.58rem' }}>
            Bibliografía recomendada
          </p>
          <div className="flex flex-col gap-2">
            {area.bibliography.map((bib, i) => (
              <a key={i} href={bib.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 group"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(180,60,40,0.12)',
                  textDecoration: 'none' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'rgba(255,255,255,0.05)'; el.style.borderColor = 'rgba(180,60,40,0.3)' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(255,255,255,0.02)'; el.style.borderColor = 'rgba(180,60,40,0.12)' }}>
                <span className="text-sm">{getBibIcon(bib.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate" style={{ color: '#ede0d4', fontFamily: F_RAJ }}>{bib.title}</p>
                  <p className="text-xs" style={{ color: 'rgba(200,150,120,0.45)', fontFamily: F_RAJ, fontSize: '0.62rem' }}>{bib.author}</p>
                </div>
                <span style={{ color: 'rgba(200,150,120,0.4)' }}><IconExternal /></span>
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
    <div ref={ref} className="roadmap-card rounded-2xl p-5 border transition-all duration-300 cursor-pointer"
      style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(180,60,40,0.18)' }}
      onMouseEnter={e => {
        gsap.to(ref.current, { y: -4, duration: 0.2, ease: 'power2.out' })
        const el = e.currentTarget
        el.style.borderColor = `${card.color}55`
        el.style.boxShadow   = `0 0 24px ${card.color}22`
      }}
      onMouseLeave={e => {
        gsap.to(ref.current, { y: 0, duration: 0.2, ease: 'power2.out' })
        const el = e.currentTarget
        el.style.borderColor = 'rgba(180,60,40,0.18)'
        el.style.boxShadow   = 'none'
      }}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
          style={{ background: `${card.color}18`, border: `1px solid ${card.color}40`, color: card.color }}>
          {card.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-black text-sm mb-0.5" style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.78rem', letterSpacing: '0.04em' }}>
            {card.title}
          </h4>
          <p className="text-xs" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: F_RAJ }}>{card.desc}</p>
        </div>
      </div>
      <button onClick={() => onSendToChat(card.prompt)}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-200"
        style={{ background: `${card.color}18`, border: `1px solid ${card.color}40`, color: card.color,
          fontFamily: F_RAJ, letterSpacing: '0.12em', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.background = `${card.color}28` }}
        onMouseLeave={e => { e.currentTarget.style.background = `${card.color}18` }}>
        <IconMap /> VER ROADMAP EN ATHER
      </button>
    </div>
  )
}

// ── News card ──────────────────────────────────────────────────
function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer"
      className="group block rounded-2xl p-4 border transition-all duration-200"
      style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(180,60,40,0.18)', textDecoration: 'none' }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = `${item.tagColor}45`; el.style.background = `rgba(18,8,22,0.95)` }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(180,60,40,0.18)'; el.style.background = 'rgba(18,8,22,0.88)' }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 rounded-full text-xs font-bold tracking-wider"
          style={{ background: `${item.tagColor}18`, border: `1px solid ${item.tagColor}45`, color: item.tagColor,
            fontFamily: F_RAJ, fontSize: '0.58rem', letterSpacing: '0.15em' }}>
          {item.tag}
        </span>
        <span className="text-xs ml-auto" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_RAJ, fontSize: '0.6rem' }}>{item.date}</span>
      </div>
      <h4 className="font-bold text-sm mb-1.5 leading-snug" style={{ color: '#ede0d4', fontFamily: F_RAJ, letterSpacing: '0.02em' }}>
        {item.title}
      </h4>
      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: F_RAJ }}>{item.summary}</p>
      <div className="flex items-center gap-1 mt-3 text-xs font-bold tracking-wider"
        style={{ color: item.tagColor, fontFamily: F_RAJ, letterSpacing: '0.1em', fontSize: '0.62rem' }}>
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

  // ── GSAP entrance ─────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ambient orb pulse
      gsap.to('.orb-zd1', { scale: 1.2, opacity: 0.5, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.orb-zd2', { scale: 1.15, opacity: 0.35, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })

      // Hero entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero-badge',  { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo('.hero-title',  { opacity: 0, y: 30  }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.2')
        .fromTo('.hero-sub',    { opacity: 0 },          { opacity: 1, duration: 0.5 },       '-=0.3')
        .fromTo('.hero-cmd',    { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 }, '-=0.2')
        .fromTo('.stat-card',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, '-=0.1')
        .fromTo('.section-hdr', { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 }, '-=0.1')
        .fromTo('.stem-card',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.4 }, '-=0.3')
        .fromTo('.roadmap-card',{ opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, '-=0.2')
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');
        .line-clamp-1{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        #zd-search::placeholder{color:rgba(210,170,140,0.3);letter-spacing:0.08em}
        #zd-search:focus{outline:none;border-color:rgba(255,107,53,0.5);border-bottom-color:#ff6b35;background:rgba(255,100,50,0.03)}
      `}</style>

      <div className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(135deg,#08040c 0%,#120818 50%,#08040c 100%)', fontFamily: F_RAJ }}>

        {/* Ambient orbs */}
        <div className="orb-zd1 fixed pointer-events-none rounded-full"
          style={{ width: 600, height: 600, top: '-10%', right: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(180,30,30,0.15) 0%,transparent 70%)', filter: 'blur(60px)' }}/>
        <div className="orb-zd2 fixed pointer-events-none rounded-full"
          style={{ width: 500, height: 500, bottom: '5%', left: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(130,40,200,0.12) 0%,transparent 70%)', filter: 'blur(70px)' }}/>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">

          {/* ── HERO ── */}
          <div ref={heroRef} className="text-center mb-14">
            {/* Works-with / badge row (reference image) */}
            <div className="hero-badge flex items-center justify-center gap-2 mb-6">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full"
                style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}>
                <span style={{ color: '#ff6b35', fontSize: '0.7rem' }}>◈</span>
                <span className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: 'rgba(255,120,70,0.7)', fontFamily: F_RAJ, letterSpacing: '0.25em', fontSize: '0.62rem' }}>
                  Exploración activa
                </span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e5a0',
                  boxShadow: '0 0 8px #00e5a0', display: 'inline-block', animation: 'pulse 2s infinite' }}/>
              </div>
            </div>

            {/* Headline — multicolor like reference image */}
            <h1 className="hero-title font-black leading-none mb-4"
              style={{ fontFamily: F_ORB, fontSize: 'clamp(2.2rem, 6vw, 4rem)', letterSpacing: '-0.02em' }}>
              <span style={{ background: 'linear-gradient(90deg,#ff6b35,#f7c59f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ZONA{' '}
              </span>
              <span style={{ background: 'linear-gradient(90deg,#f7c59f,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                DE{' '}
              </span>
              <span style={{ background: 'linear-gradient(90deg,#a855f7,#ff3060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                DESARROLLO
              </span>
            </h1>

            <p className="hero-sub text-base max-w-xl mx-auto mb-6 leading-relaxed"
              style={{ color: 'rgba(200,160,140,0.65)', fontFamily: F_RAJ, letterSpacing: '0.04em', fontSize: '0.9rem' }}>
              Temarios STEM desde lo esencial hasta nivel intermedio. Explora con Ather IA, sigue roadmaps y descubre bibliografía curada.
            </p>

            {/* Terminal command (reference image detail) */}
            <div className="hero-cmd inline-flex items-center gap-3 px-5 py-2.5 rounded-xl mx-auto mb-8"
              style={{ background: 'rgba(8,4,14,0.9)', border: '1px solid rgba(180,60,40,0.25)',
                fontFamily: "'Courier New', monospace" }}>
              <span style={{ color: '#ff6b35', fontSize: '0.8rem' }}>$</span>
              <span style={{ color: '#ede0d4', fontSize: '0.78rem', letterSpacing: '0.05em' }}>
                ather explore --area stem --level basico
              </span>
            </div>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,107,53,0.5)' }}>
                <IconSearch />
              </div>
              <input id="zd-search"
                value={state.searchQuery}
                onChange={e => setSearch(e.target.value)}
                placeholder="BUSCAR ÁREA O TEMA..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(180,60,40,0.22)',
                  borderBottom: '1.5px solid rgba(255,107,53,0.35)', color: '#ede0d4',
                  fontFamily: F_RAJ, fontSize: '0.78rem', letterSpacing: '0.06em', caretColor: '#ff6b35' }}
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
              <div className="section-hdr flex items-center gap-3 mb-5">
                <span style={{ color: '#ff6b35' }}>◈</span>
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.2em' }}>
                  Áreas STEM
                </h2>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }}/>
                <span className="text-xs" style={{ color: 'rgba(200,150,120,0.35)', fontFamily: F_RAJ, fontSize: '0.62rem' }}>
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
                  <div className="text-center py-12"
                    style={{ color: 'rgba(200,150,120,0.35)', fontFamily: F_RAJ, letterSpacing: '0.1em', fontSize: '0.78rem' }}>
                    Sin resultados para "{state.searchQuery}"
                  </div>
                )}
              </div>
            </div>

            {/* Roadmaps sidebar — 1/3 width */}
            <div>
              <div className="section-hdr flex items-center gap-3 mb-5">
                <span style={{ color: '#ff6b35' }}>⬡</span>
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.2em' }}>
                  Roadmaps
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
                style={{ background: 'rgba(255,107,53,0.06)', borderColor: 'rgba(255,107,53,0.22)',
                  borderStyle: 'dashed' }}>
                <p className="text-xs mb-2 tracking-wider uppercase font-bold"
                  style={{ color: 'rgba(255,120,70,0.6)', fontFamily: F_RAJ, fontSize: '0.6rem', letterSpacing: '0.2em' }}>
                  ✦ Pregunta libre
                </p>
                <p className="text-xs mb-3" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: F_RAJ }}>
                  Envía cualquier pregunta directamente a Ather IA
                </p>
                <button onClick={() => sendToChat('')}
                  className="w-full py-2 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg,#ff4e50,#f7931e)', color: '#fff',
                    fontFamily: F_ORB, fontSize: '0.65rem', letterSpacing: '0.15em', border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(255,100,50,0.3)' }}
                  onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.02, duration: 0.2 })}
                  onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}>
                  <IconBot /> ABRIR ATHER IA
                </button>
              </div>
            </div>
          </div>

          {/* ── STEM NEWS ── */}
          <div>
            <div className="section-hdr flex items-center gap-3 mb-5">
              <span style={{ color: '#ff6b35' }}>◎</span>
              <h2 className="font-black tracking-widest uppercase"
                style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.2em' }}>
                Noticias STEM
              </h2>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }}/>
              <span className="text-xs" style={{ color: 'rgba(200,150,120,0.35)', fontFamily: F_RAJ, fontSize: '0.62rem' }}>
                Actualizadas mensualmente
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {news.map(item => <NewsCard key={item.id} item={item}/>)}
            </div>
          </div>

          {/* Footer stamp */}
          <div className="text-center mt-14">
            <p className="text-xs tracking-widest uppercase"
              style={{ color: 'rgba(255,100,50,0.18)', fontFamily: F_RAJ, letterSpacing: '0.4em' }}>
              ✦ athernix · zona de desarrollo · stem · v2.0 ✦
            </p>
          </div>
        </div>
      </div>
    </>
  )
}