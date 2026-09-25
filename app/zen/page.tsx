'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { useZenController } from '@/controllers/zen/zenController'
import type { ZenPointInfo } from '@/models/zen'
import { protectBrands } from '@/components/ui/ProtectedText';

const ZenTreeScene = dynamic(() => import('@/components/zen/ZenTreeScene'), { ssr: false })

// ── Design tokens (estética módulos) ─────────────────────────────
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif"
const F_MONO = "'Plus Jakarta Sans', monospace"

// ── Helpers UI ───────────────────────────────────────────────────
function magneticMove(e: React.MouseEvent<HTMLElement>, strength = 0.3) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) * strength
  const y = (e.clientY - rect.top - rect.height / 2) * strength
  gsap.to(e.currentTarget, { x, y, duration: 0.3, ease: 'power2.out' })
}
function magneticReset(e: React.MouseEvent<HTMLElement>) {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' })
}

// ── Estadística con contador animado + barra de progreso ─────────
function StatBlock({ point }: { point: ZenPointInfo }) {
  const numRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const m = point.stat.match(/[+-]?\d+/)
    if (!m) return
    const target = parseInt(m[0], 10)
    const prefix = point.stat.slice(0, m.index)
    const suffix = point.stat.slice((m.index ?? 0) + m[0].length)
    const obj = { v: 0 }
    const tw = gsap.to(obj, {
      v: target, duration: 1.2, ease: 'power2.out',
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = `${prefix}${Math.round(obj.v)}${suffix}`
      },
    })
    const pct = Math.min(100, Math.abs(target))
    const tw2 = barRef.current
      ? gsap.fromTo(barRef.current, { width: '0%' }, { width: `${pct}%`, duration: 1.2, ease: 'power3.out' })
      : null
    return () => { tw.kill(); tw2?.kill() }
  }, [point])

  return (
    <div className="zn-p-item flex items-center gap-3 mb-5 p-3.5 rounded-xl relative overflow-hidden"
      style={{ background: `${point.color}0f`, border: `1px solid ${point.color}28` }}>
      <span ref={numRef} className="font-black"
        style={{ fontFamily: F_BE, color: point.color, fontSize: '1.9rem', minWidth: '3.4rem', textShadow: `0 0 18px ${point.color}55` }}>
        {point.stat}
      </span>
      <div className="flex-1">
        <span className="text-xs block mb-1.5" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_MONO, fontSize: '0.55rem', letterSpacing: '0.12em' }}>
          {point.statLabel}
        </span>
        <div className="w-full rounded-full overflow-hidden" style={{ height: 3, background: 'rgba(255,255,255,0.07)' }}>
          <div ref={barRef} style={{ height: '100%', width: 0, background: `linear-gradient(90deg, ${point.color}66, ${point.color})`, boxShadow: `0 0 10px ${point.color}66` }} />
        </div>
      </div>
    </div>
  )
}

// ── Página (experiencia fullscreen tipo MUNDI) ───────────────────
export default function ZenPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { points, selected, select, hoveredId, setHoveredId, clearSelection } = useZenController()

  // ── Animaciones de entrada ─────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      gsap.fromTo('.zn-stage-canvas', { scale: prefersReduced ? 1 : 1.14, opacity: 0 }, {
        scale: 1, opacity: 1, duration: prefersReduced ? 0.4 : 1.6, ease: 'power2.out',
      })
      gsap.fromTo('.zn-hero-badge', { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 })
      gsap.fromTo('.zn-char', { yPercent: 120, opacity: 0, rotationX: -60 }, {
        yPercent: 0, opacity: 1, rotationX: 0,
        duration: prefersReduced ? 0.3 : 0.9,
        stagger: prefersReduced ? 0 : 0.05,
        ease: 'power4.out', delay: 0.35,
        transformPerspective: 600,
      })
      gsap.fromTo('.zn-hero-sub', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.85 })
      gsap.fromTo('.zn-chip', { opacity: 0, y: 18, scale: 0.9 }, {
        opacity: 1, y: 0, scale: 1,
        duration: prefersReduced ? 0.3 : 0.6,
        stagger: prefersReduced ? 0 : 0.07,
        ease: 'back.out(1.8)', delay: 1.05,
      })
      gsap.fromTo('.zn-hud', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.3 })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // ── Entrada escalonada del panel al seleccionar ────────────────
  useEffect(() => {
    if (!selected) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.zn-panel .zn-p-item', { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.055, ease: 'power3.out', delay: 0.1,
      })
    }, containerRef)
    return () => ctx.revert()
  }, [selected])

  // ── Teclado: flechas navegan entre puntos, Esc cierra ──────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { clearSelection(); return }
      if (!selected) return
      const i = points.findIndex(p => p.id === selected.id)
      if (e.key === 'ArrowRight') select(points[(i + 1) % points.length].id)
      if (e.key === 'ArrowLeft') select(points[(i - 1 + points.length) % points.length].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, points, select, clearSelection])

  const selIdx = selected ? points.findIndex(p => p.id === selected.id) : -1
  const cycle = (dir: 1 | -1) => {
    if (selIdx < 0) return
    select(points[(selIdx + dir + points.length) % points.length].id)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @keyframes zn-pulse{0%,100%{opacity:1;box-shadow:0 0 8px #00e5a0}55%{opacity:0.3;box-shadow:none}}
        @keyframes zn-panel-in{from{opacity:0;transform:translateY(-50%) translateX(28px)}to{opacity:1;transform:translateY(-50%) translateX(0)}}
        @keyframes zn-panel-in-m{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes zn-fade{from{opacity:0}to{opacity:1}}
        @keyframes zn-shine{to{background-position:300% 0}}
        @keyframes zn-chip-pulse{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--zc) 45%,transparent)}70%{box-shadow:0 0 0 10px transparent}100%{box-shadow:0 0 0 0 transparent}}
        .zn-char{display:inline-block;will-change:transform}
        .zn-stage-canvas{position:absolute;inset:0}
        .zn-stage-canvas canvas{display:block}
        .zn-panel{position:absolute;right:26px;top:46%;transform:translateY(-50%);width:400px;max-width:92vw;
          max-height:calc(100% - 150px);overflow-y:auto;overflow-x:hidden;z-index:20;animation:zn-panel-in .5s cubic-bezier(.22,1,.36,1) both;
          scrollbar-width:thin;scrollbar-color:rgba(255,215,0,0.25) transparent}
        .zn-panel::-webkit-scrollbar{width:4px}
        .zn-panel::-webkit-scrollbar-thumb{background:rgba(255,215,0,0.25);border-radius:99px}
        @media (max-width: 1023px){
          .zn-panel{left:10px;right:10px;width:auto;top:auto;bottom:10px;transform:none;max-height:60%;animation-name:zn-panel-in-m}
        }
        @media (prefers-reduced-motion: reduce){.zn-panel{animation:none}}
      `}</style>

      <div ref={containerRef} style={{ background: '#0a0710', fontFamily: F_MONO }}>

        {/* ══ ESCENARIO FULLSCREEN (como MUNDI) ══ */}
        <section className="relative w-full overflow-hidden" style={{ height: '100dvh' }}>

          {/* Canvas del árbol a pantalla completa */}
          <div className="zn-stage-canvas">
            <ZenTreeScene
              points={points}
              selected={selected}
              hovered={hoveredId}
              onSelect={(id) => (id ? select(id) : clearSelection())}
              onHover={setHoveredId}
            />
          </div>

          {/* Viñeta para legibilidad */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(10,7,16,0.55) 100%)', zIndex: 4,
          }} />
          {/* Degradado inferior para los chips */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
            height: 120, background: 'linear-gradient(to top, rgba(10,7,16,0.65), transparent)', zIndex: 5,
          }} />

          {/* ── Título superpuesto (arriba) ── */}
          <div className="absolute top-0 left-0 right-0 flex flex-col items-center text-center pointer-events-none px-4"
            style={{ paddingTop: 'calc(84px + 2vh)', zIndex: 10 }}>
            <div className="zn-hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 pointer-events-auto"
              style={{ background: 'rgba(10,7,16,0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,215,0,0.25)' }}>
              <span style={{ color: '#FFD700', fontSize: '0.7rem' }}>❋</span>
              <span className="text-xs font-bold tracking-widest uppercase"
                style={{ color: 'rgba(255,225,120,0.8)', fontFamily: F_MONO, letterSpacing: '0.25em', fontSize: '0.6rem' }}>
                MenteLibre VR · Zona de relajación
              </span>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e5a0',
                boxShadow: '0 0 8px #00e5a0', display: 'inline-block', animation: 'zn-pulse 2.2s infinite' }} />
            </div>

            <h1 className="font-black uppercase leading-none m-0"
              style={{ fontFamily: F_BE, fontSize: 'clamp(2.6rem, 7vw, 5.2rem)', letterSpacing: '0.05em',
                background: 'linear-gradient(90deg,#00e5a0,#FFD700,#FF6B00,#ff8fab,#00e5a0)',
                backgroundSize: '300% 100%',
                animation: 'zn-shine 7s linear infinite',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.6))' }}>
              {'JARDÍN ZEN'.split('').map((c, i) => <span key={i} className="zn-char">{c === ' ' ? ' ' : c}</span>)}
            </h1>

            <p className="zn-hero-sub max-w-lg text-xs leading-relaxed mt-3"
              style={{ color: 'rgba(230,210,190,0.72)', fontFamily: F_MONO, letterSpacing: '0.06em',
                textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
              Gira el árbol y toca los puntos de luz: cada uno revela una condición
              que la relajación ayuda a sanar.
            </p>
          </div>

          {/* ── HUD (abajo izquierda) ── */}
          <div className="zn-hud absolute bottom-6 left-6 pointer-events-none hidden sm:block" style={{ zIndex: 10 }}>
            <p className="m-0 text-xs font-bold tracking-widest mb-1" style={{ color: 'rgba(255,215,0,0.55)', fontFamily: F_MONO, fontSize: '0.55rem', letterSpacing: '0.3em' }}>
              ÁRBOL_ZEN.V2 · {points.length} PUNTOS DE LUZ
            </p>
            <p className="m-0 text-xs" style={{ color: 'rgba(200,150,120,0.45)', fontFamily: F_MONO, fontSize: '0.55rem', letterSpacing: '0.2em' }}>
              ARRASTRA · SCROLL · CLIC EN UN PUNTO · ← → PARA NAVEGAR
            </p>
          </div>

          {/* ── Botón regreso al selector (abajo derecha) ── */}
          <Link href="/explore"
            className="zn-chip absolute bottom-6 right-6 inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs tracking-widest uppercase no-underline"
            style={{
              zIndex: 15,
              background: 'rgba(10,7,16,0.65)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,215,0,0.25)',
              color: 'rgba(255,225,120,0.8)',
              fontFamily: F_MONO, fontSize: '0.54rem', letterSpacing: '0.16em',
              transition: 'all .3s',
            }}
            onMouseMove={e => magneticMove(e, 0.15)}
            onMouseLeave={e => magneticReset(e)}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,215,0,0.6)'; e.currentTarget.style.boxShadow = '0 0 22px rgba(255,215,0,0.25)' }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,215,0,0.25)'; e.currentTarget.style.boxShadow = 'none' }}>
            ← REGRESAR AL SELECTOR
          </Link>

          {/* ── Chips de puntos (abajo centro) ── */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-2 px-4 w-full sm:w-auto"
            style={{ zIndex: 15, maxWidth: '96vw' }}>
            {points.map(p => {
              const active = selected?.id === p.id
              return (
                <button key={p.id} onClick={() => select(p.id)}
                  onMouseEnter={() => setHoveredId(p.id)}
                  className="zn-chip inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs tracking-widest uppercase cursor-pointer"
                  style={{
                    ['--zc' as string]: p.color,
                    background: active ? `${p.color}22` : 'rgba(10,7,16,0.65)',
                    backdropFilter: 'blur(12px)',
                    border: active ? `1px solid ${p.color}80` : '1px solid rgba(255,255,255,0.12)',
                    color: active ? p.color : 'rgba(255,255,255,0.6)',
                    fontFamily: F_MONO, fontSize: '0.54rem', letterSpacing: '0.16em',
                    boxShadow: active ? `0 0 22px ${p.color}30` : 'none',
                    animation: active ? 'zn-chip-pulse 1.8s infinite' : 'none',
                    transition: 'all .3s',
                  }}
                  onMouseMove={e => magneticMove(e, 0.15)}
                  onMouseLeave={e => { setHoveredId(null); magneticReset(e) }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }} />
                  {protectBrands(p.title)}
                </button>
              )
            })}
          </div>

          {/* ── Panel de información (overlay derecha, estilo MUNDI) ── */}
          {selected && (
            <div key={selected.id} className="zn-panel rounded-3xl border p-7 relative"
              style={{
                background: 'rgba(12,9,16,0.88)',
                backdropFilter: 'blur(24px) saturate(160%)',
                WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                borderColor: `${selected.color}45`,
                boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 40px ${selected.color}12`,
              }}>
              {/* barra de acento superior */}
              <div className="absolute top-0 left-6 right-6" style={{
                height: 3, borderRadius: 99,
                background: `linear-gradient(90deg, transparent, ${selected.color}, transparent)`,
                boxShadow: `0 0 14px ${selected.color}88`,
              }} />
              {/* número de marca de agua */}
              <span className="absolute pointer-events-none select-none" style={{
                top: 6, right: 18, fontFamily: F_BE, fontSize: '5.2rem', lineHeight: 1,
                color: `${selected.color}10`, letterSpacing: '0.02em',
              }}>
                {selected.num}
              </span>

              <div className="zn-p-item flex items-center justify-between mb-4">
                <span className="text-xs font-black px-2.5 py-1 rounded-lg"
                  style={{ color: selected.color, background: `${selected.color}15`, border: `1px solid ${selected.color}40`, fontFamily: F_MONO, fontSize: '0.58rem', letterSpacing: '0.2em' }}>
                  {selected.num} · {selected.zone}
                </span>
                <div className="flex items-center gap-2">
                  {/* navegación entre puntos */}
                  <button onClick={() => cycle(-1)} aria-label="Punto anterior"
                    className="cursor-pointer rounded-full border-none font-bold"
                    style={{ width: 26, height: 26, background: `${selected.color}14`, color: selected.color, fontSize: '0.8rem' }}>
                    ‹
                  </button>
                  <button onClick={() => cycle(1)} aria-label="Punto siguiente"
                    className="cursor-pointer rounded-full border-none font-bold"
                    style={{ width: 26, height: 26, background: `${selected.color}14`, color: selected.color, fontSize: '0.8rem' }}>
                    ›
                  </button>
                  <button onClick={clearSelection}
                    className="cursor-pointer text-xs font-bold bg-transparent border-none ml-1"
                    style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_MONO, letterSpacing: '0.15em', fontSize: '0.62rem' }}>
                    ✕ CERRAR
                  </button>
                </div>
              </div>

              <h2 className="zn-p-item font-black uppercase m-0 mb-1"
                style={{ fontFamily: F_BE, color: selected.color, fontSize: '1.8rem', letterSpacing: '0.05em', textShadow: `0 0 24px ${selected.color}44` }}>
                {protectBrands(selected.title)}
              </h2>
              <p className="zn-p-item text-xs italic m-0 mb-4" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: F_MONO, fontSize: '0.66rem' }}>
                {selected.short}
              </p>
              <p className="zn-p-item text-xs leading-relaxed m-0 mb-5" style={{ color: 'rgba(235,220,200,0.8)', fontFamily: F_MONO, fontSize: '0.7rem' }}>
                {protectBrands(selected.desc)}
              </p>

              <p className="zn-p-item text-xs font-bold tracking-widest uppercase m-0 mb-2" style={{ color: 'rgba(0,229,160,0.65)', fontFamily: F_MONO, fontSize: '0.55rem', letterSpacing: '0.28em' }}>
                CÓMO AYUDA LA RELAJACIÓN
              </p>
              <ul className="zn-p-item m-0 mb-5 pl-0 flex flex-col gap-1.5" style={{ listStyle: 'none' }}>
                {selected.helps.map((h, i) => (
                  <li key={i} className="text-xs flex gap-2 leading-relaxed" style={{ color: 'rgba(210,170,140,0.7)', fontFamily: F_MONO, fontSize: '0.65rem' }}>
                    <span style={{ color: selected.color }}>◆</span> {h}
                  </li>
                ))}
              </ul>

              <StatBlock point={selected} />

              <div className="zn-p-item flex flex-col gap-3">
                <span className="text-xs font-bold px-3 py-2 rounded-full w-fit inline-flex items-center gap-2"
                  style={{ color: '#FFD700', background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.3)', fontFamily: F_MONO, fontSize: '0.56rem', letterSpacing: '0.2em' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFD700', boxShadow: '0 0 8px #FFD700', display: 'inline-block', animation: 'zn-pulse 2.2s infinite' }} />
                  TÉCNICA: {selected.technique}
                </span>
                <Link href="/mundi/experience/santuario-zen-kioto"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs tracking-widest uppercase no-underline"
                  style={{ background: 'linear-gradient(90deg,#00e5a0,#FFD700)', color: '#0a140f', fontFamily: F_MONO, letterSpacing: '0.18em', boxShadow: '0 8px 26px rgba(0,229,160,0.3)' }}
                  onMouseMove={e => magneticMove(e, 0.15)}
                  onMouseLeave={e => magneticReset(e)}>
                  ❋ PRACTICAR EN MENTELIBRE VR
                </Link>
                <span className="text-right" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: F_MONO, fontSize: '0.55rem', letterSpacing: '0.25em' }}>
                  {selected.num} / {String(points.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          )}

          {/* Hint cuando no hay selección */}
          {!selected && (
            <div className="absolute pointer-events-none hidden lg:flex flex-col items-end gap-1"
              style={{ right: 30, top: '50%', transform: 'translateY(-50%)', zIndex: 10, animation: 'zn-fade 1s .1s both' }}>
              <p className="m-0 text-xs font-bold tracking-widest text-right" style={{ color: 'rgba(255,215,0,0.5)', fontFamily: F_MONO, fontSize: '0.58rem', letterSpacing: '0.25em' }}>
                TOCA UN PUNTO DE LUZ ❋
              </p>
              <p className="m-0 text-xs text-right max-w-[200px]" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_MONO, fontSize: '0.55rem', letterSpacing: '0.12em', lineHeight: 1.7 }}>
                cada luz revela una condición y su camino de calma
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
