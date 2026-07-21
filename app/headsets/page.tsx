// view/MyHeadsetsView.tsx
'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useMyHeadsetsController } from '@/controllers/information/headset'
import { HEADSET_META, TIER_LABEL, TYPE_LABEL, getHeadsetMeta, type VRGlassesModel } from '@/models/headset';

// ── Design tokens (idénticos a HomeView) ────────────────────────
const F_ORB = "'Orbitron', sans-serif"
const F_RAJ = "'Rajdhani', sans-serif"

// ── Icons ────────────────────────────────────────────────────────
const IconBack   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>
const IconCheck  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
const IconX      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
const IconArrowR = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>

// ── Section header helper (igual a HomeView) ────────────────────
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

// ── Hero: headset actual ─────────────────────────────────────────
function CurrentHeadsetHero({ model, setAt }: { model: VRGlassesModel; setAt: string | null }) {
  const meta = getHeadsetMeta(model)
  const isSet = model !== 'none'
  const dateLabel = setAt
    ? new Intl.DateTimeFormat('es-SV', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(setAt))
    : null

  return (
    <div className="current-headset-hero relative rounded-2xl border overflow-hidden p-6 sm:p-8"
      style={{
        background: 'linear-gradient(135deg, rgba(18,8,22,0.96), rgba(18,8,22,0.9))',
        borderColor: isSet ? meta.color + '45' : 'rgba(180,60,40,0.25)',
        boxShadow: isSet ? `0 8px 40px rgba(0,0,0,0.5), 0 0 30px ${meta.color}18` : '0 8px 40px rgba(0,0,0,0.5)',
      }}>
      <div className="absolute top-0 right-0 w-52 h-52 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle,${meta.color}22 0%,transparent 70%)`, filter: 'blur(40px)', transform: 'translate(20%,-30%)' }}/>

      <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}40`,
            filter: isSet ? `drop-shadow(0 0 14px ${meta.color})` : 'none' }}>
          {meta.imageUrl ? (
            <img src={meta.imageUrl} alt={meta.label} className="w-full h-full object-contain p-2" />
          ) : (
            <span className="text-4xl">{meta.icon}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'rgba(255,120,70,0.55)', fontFamily: F_RAJ, letterSpacing: '0.24em', fontSize: '0.6rem' }}>
            {isSet ? 'Tu headset registrado' : 'Aún no has registrado un headset'}
          </p>
          <h1 className="font-black mb-2" style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: 'clamp(1.4rem,3vw,2rem)', letterSpacing: '0.02em' }}>
            {meta.label}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            {isSet && (
              <>
                <span className="px-2.5 py-1 rounded-full text-xs font-black tracking-widest"
                  style={{ background: `${meta.color}18`, border: `1px solid ${meta.color}40`, color: meta.color, fontFamily: F_RAJ, fontSize: '0.58rem', letterSpacing: '0.16em' }}>
                  {meta.brand}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-black tracking-widest"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(180,60,40,0.2)', color: 'rgba(200,150,120,0.7)', fontFamily: F_RAJ, fontSize: '0.58rem', letterSpacing: '0.16em' }}>
                  {TYPE_LABEL[meta.type]}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-black tracking-widest"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(180,60,40,0.2)', color: 'rgba(200,150,120,0.7)', fontFamily: F_RAJ, fontSize: '0.58rem', letterSpacing: '0.16em' }}>
                  {TIER_LABEL[meta.tier]}
                </span>
                {dateLabel && (
                  <span className="text-xs" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: F_RAJ, fontSize: '0.65rem' }}>
                    Registrado el {dateLabel}
                  </span>
                )}
              </>
            )}
            {!isSet && (
              <p className="text-xs" style={{ color: 'rgba(200,150,120,0.6)', fontFamily: F_RAJ, fontSize: '0.75rem' }}>
                Elige tu headset abajo para desbloquear las recomendaciones de compatibilidad de cada módulo.
              </p>
            )}
          </div>
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
        <h4 className="font-black text-sm truncate" style={{ fontFamily: F_ORB, color: '#e8d5c8', fontSize: '0.78rem', letterSpacing: '0.03em' }}>
          {mod.name}
        </h4>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: F_RAJ, fontSize: '0.68rem' }}>
          {!hasHeadset ? 'Registra un headset para ver compatibilidad' : mod.compatible ? mod.note : 'No recomendado con tu headset actual'}
        </p>
      </div>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" style={{ color: mod.color }}>
        <IconArrowR/>
      </span>
    </Link>
  )
}

// ── Tarjeta de catálogo (seleccionable) ──────────────────────────
function HeadsetCatalogCard({ id, meta, isActive, saving, onSelect }: {
  id: VRGlassesModel; meta: ReturnType<typeof getHeadsetMeta>; isActive: boolean; saving: boolean
  onSelect: (id: VRGlassesModel) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !ref.current) return
    gsap.to(ref.current, { boxShadow: `0 0 28px ${meta.color}28, 0 0 6px ${meta.color}12`, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    return () => { gsap.killTweensOf(ref.current) }
  }, [isActive, meta.color])

  return (
    <div ref={ref}
      className="headset-card relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 p-4"
      style={{
        background: isActive ? 'linear-gradient(135deg, rgba(18,8,22,0.98), rgba(18,8,22,0.9))' : 'rgba(18,8,22,0.86)',
        borderColor: isActive ? meta.color + '65' : 'rgba(180,60,40,0.2)',
        pointerEvents: saving ? 'none' : 'auto', opacity: saving ? 0.6 : 1,
      }}
      onClick={() => onSelect(id)}
      onMouseEnter={() => { if (!isActive) gsap.to(ref.current, { y: -3, duration: 0.2, ease: 'power2.out' }) }}
      onMouseLeave={() => { if (!isActive) gsap.to(ref.current, { y: 0, duration: 0.2, ease: 'power2.out' }) }}>

      {isActive && <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }}/>}

      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
          style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}35`,
            filter: isActive ? `drop-shadow(0 0 8px ${meta.color})` : 'none' }}>
          {meta.imageUrl ? (
            <img src={meta.imageUrl} alt={meta.label} className="w-full h-full object-contain p-1" />
          ) : (
            <span className="text-lg">{meta.icon}</span>
          )}
        </div>
        {isActive && (
          <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: meta.color, color: '#fff', boxShadow: `0 0 10px ${meta.color}` }}>
            <IconCheck/>
          </div>
        )}
      </div>

      <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: `${meta.color}99`, fontFamily: F_RAJ, fontSize: '0.56rem', letterSpacing: '0.18em' }}>
        {meta.brand} · {TIER_LABEL[meta.tier]}
      </p>
      <h4 className="font-black mb-2" style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.78rem', letterSpacing: '0.03em' }}>{meta.label}</h4>
      <p className="text-xs mb-3" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_RAJ, fontSize: '0.65rem' }}>{TYPE_LABEL[meta.type]} · {meta.sdk}</p>

      <button
        className="w-full py-2 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-200"
        style={{
          background: isActive ? `${meta.color}22` : 'rgba(255,255,255,0.03)',
          border: `1px solid ${isActive ? meta.color + '55' : 'rgba(180,60,40,0.2)'}`,
          color: isActive ? meta.color : 'rgba(200,150,120,0.55)',
          fontFamily: F_RAJ, fontSize: '0.6rem', letterSpacing: '0.16em', cursor: 'pointer',
        }}>
        {isActive ? 'EN USO' : 'REGISTRAR'}
      </button>
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
      <span className="text-xs" style={{ color: '#ede0d4', fontFamily: F_RAJ, fontSize: '0.75rem' }}>{text}</span>
    </div>
  )
}

// ── MAIN VIEW ──────────────────────────────────────────────────
export default function MyHeadsetsView() {
  const { state, currentMeta, models, compatibility, toast, selectHeadset } = useMyHeadsetsController()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.orb-h1', { scale: 1.2, opacity: 0.5, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.orb-h2', { scale: 1.3, opacity: 0.35, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.mh-back',   { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.35 })
        .fromTo('.current-headset-hero', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.15')
        .fromTo('.section-hdr', { opacity: 0, x: -16 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.4 }, '-=0.2')
        .fromTo('.module-compat-card', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.35 }, '-=0.2')
        .fromTo('.headset-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.35 }, '-=0.2')
    }, containerRef)
    return () => ctx.revert()
  }, [state.loading])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');
      `}</style>

      <div ref={containerRef} className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(135deg,#0d0608 0%,#120818 50%,#080410 100%)', fontFamily: F_RAJ }}>

        <div className="orb-h1 fixed pointer-events-none rounded-full"
          style={{ width: 650, height: 650, top: '-15%', right: '-10%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(180,30,30,0.18) 0%,transparent 70%)', filter: 'blur(60px)' }}/>
        <div className="orb-h2 fixed pointer-events-none rounded-full"
          style={{ width: 500, height: 500, bottom: '0%', left: '-10%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(130,40,200,0.12) 0%,transparent 70%)', filter: 'blur(70px)' }}/>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-12">

          {/* Back + title */}
          <div>
            <Link href="/home" className="mh-back inline-flex items-center gap-2 mb-6 text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255,120,70,0.6)', fontFamily: F_RAJ, letterSpacing: '0.2em', fontSize: '0.62rem' }}>
              <IconBack/> Volver al inicio
            </Link>
            <h1 className="font-black" style={{ fontFamily: F_ORB, fontSize: 'clamp(1.8rem,4vw,2.6rem)', letterSpacing: '-0.01em' }}>
              <span style={{ background: 'linear-gradient(90deg,#ff6b35 0%,#f7c59f 55%,#ff8c42 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Mis Headsets
              </span>
            </h1>
            <p className="text-sm mt-2 max-w-lg" style={{ color: 'rgba(200,160,140,0.6)', fontFamily: F_RAJ, letterSpacing: '0.02em' }}>
              Registra tu dispositivo VR para que Athernix adapte cada módulo a sus capacidades reales.
            </p>
          </div>

          {/* Hero: headset actual */}
          {state.loading ? (
            <div className="rounded-2xl border p-10 text-center" style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(180,60,40,0.2)' }}>
              <span className="text-xs" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_RAJ }}>Cargando tu headset...</span>
            </div>
          ) : (
            <CurrentHeadsetHero model={state.current} setAt={state.setAt}/>
          )}

          {/* Compatibilidad con módulos */}
          <div>
            <SectionHeader icon="◈" title="Compatibilidad con módulos Athernix"/>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {compatibility.map(mod => (
                <ModuleCompatCard key={mod.id} mod={mod} hasHeadset={state.current !== 'none'}/>
              ))}
            </div>
          </div>

          {/* Catálogo de headsets */}
          <div>
            <SectionHeader icon="⬡" title="Catálogo de headsets" right={
              <span className="text-xs" style={{ color: 'rgba(200,150,120,0.35)', fontFamily: F_RAJ, fontSize: '0.62rem' }}>
                {models.length} modelos soportados
              </span>
            }/>
            <p className="text-xs mb-5 -mt-3" style={{ color: 'rgba(200,150,120,0.45)', fontFamily: F_RAJ, letterSpacing: '0.04em' }}>
              Selecciona el headset que usas para acceder a recomendaciones y ajustes específicos de cada módulo.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {models.map(id => (
                <HeadsetCatalogCard key={id} id={id} meta={HEADSET_META[id]} isActive={state.current === id}
                  saving={state.saving} onSelect={selectHeadset}/>
              ))}
            </div>
          </div>

          {/* Ayuda */}
          <div className="rounded-2xl border p-5 flex items-start gap-3"
            style={{ background: 'rgba(18,8,22,0.7)', borderColor: 'rgba(180,60,40,0.16)' }}>
            <span style={{ color: '#ff6b35', fontSize: '1rem' }}>◈</span>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,150,120,0.55)', fontFamily: F_RAJ, fontSize: '0.72rem' }}>
              ¿No encuentras tu modelo exacto? Selecciona el más parecido de tu misma marca — Athernix ajusta
              automáticamente la calidad según el hardware real detectado al conectar tu headset.
            </p>
          </div>
        </div>
      </div>

      {toast && <Toast text={toast.text} ok={toast.ok}/>}
    </>
  )
}