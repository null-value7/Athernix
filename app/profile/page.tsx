// view/ProfileView.tsx
'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useProfileController } from '@/controllers/user/profile'
import { getFullName, getInitials, formatDate, getRoleMeta } from '@/models/profile'

// ── Icons ─────────────────────────────────────────────────────
function IconEdit()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"/></svg> }
function IconKey()      { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 0 1 21.75 8.25Z"/></svg> }
function IconLogout()   { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"/></svg> }
function IconMail()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg> }
function IconPhone()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z"/></svg> }
function IconCalendar() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/></svg> }
function IconCamera()   { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"/></svg> }
function IconClose()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg> }
function IconSave()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg> }
function IconSpinner()  { return <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="3"/><path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg> }

// ── Shared styles ──────────────────────────────────────────────
const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(18,8,12,0.92)',
  border: '1px solid rgba(180,60,40,0.2)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
  backdropFilter: 'blur(12px)',
}

const LABEL_STYLE: React.CSSProperties = {
  color: 'rgba(255,120,70,0.6)',
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: '0.65rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
}

const INPUT_STYLE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(180,60,40,0.3)',
  borderBottom: '2px solid rgba(255,100,50,0.5)',
  color: '#e8d5c8',
  fontFamily: "'Rajdhani', monospace",
  caretColor: '#ff6b35',
  outline: 'none',
  width: '100%',
  borderRadius: '0.5rem',
  padding: '0.65rem 0.85rem',
  fontSize: '0.875rem',
}

// ── Loading skeleton ───────────────────────────────────────────
function ProfileSkeleton() {
  return (
    <div className="w-full max-w-sm mx-auto px-4 py-10 space-y-6 animate-pulse">
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full" style={{ background: 'rgba(255,100,50,0.1)' }} />
        <div className="w-32 h-5 rounded" style={{ background: 'rgba(255,100,50,0.1)' }} />
        <div className="w-48 h-3 rounded" style={{ background: 'rgba(255,100,50,0.07)' }} />
      </div>
      {[1,2,3].map(i => (
        <div key={i} className="w-full h-14 rounded-xl" style={{ background: 'rgba(255,100,50,0.07)' }} />
      ))}
    </div>
  )
}

// ── Main View ──────────────────────────────────────────────────
export default function ProfileView() {
  const {
    state, fileRef,
    openEdit, closeEdit,
    setEditFirst, setEditLast, setEditPhone, setEditCountry,
    triggerFileInput, handleAvatarChange,
    handleSave, handleSignOut, handleChangePassword,
  } = useProfileController()

  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef      = useRef<HTMLDivElement>(null)
  const avatarRef    = useRef<HTMLDivElement>(null)

  // ── GSAP entrance ──────────────────────────────────────────
  useEffect(() => {
    if (state.isLoading) return
    const ctx = gsap.context(() => {
      gsap.to('.orb-p1', { scale: 1.2, opacity: 0.55, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.orb-p2', { scale: 1.15, opacity: 0.35, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(cardRef.current, { opacity: 0, y: 50, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 })
        .fromTo(avatarRef.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.6 }, '-=0.4')
        .fromTo('.p-info-block', { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.45 }, '-=0.2')
        .fromTo('.p-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.4, transformOrigin: 'center' }, '-=0.1')
        .fromTo('.p-action', { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.4 }, '-=0.1')
    }, containerRef)
    return () => ctx.revert()
  }, [state.isLoading])

  // ── GSAP modal entrance ────────────────────────────────────
  useEffect(() => {
    if (!state.editOpen) return
    gsap.fromTo('.modal-card',
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    )
    gsap.fromTo('.modal-field',
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, stagger: 0.08, duration: 0.35, ease: 'power2.out', delay: 0.15 }
    )
  }, [state.editOpen])

  const { profile } = state
  const roleMeta    = getRoleMeta(profile?.role)
  const fullName    = getFullName(profile)
  const initials    = getInitials(profile)
  const avatarSrc   = state.avatarPreview ?? profile?.avatar_url ?? null

  if (state.isLoading) return (
    <div style={{ background: 'linear-gradient(135deg,#0d0608,#1a0810,#120508)', minHeight: '100vh' }}>
      <ProfileSkeleton />
    </div>
  )

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-10"
      style={{ background: 'linear-gradient(135deg,#0d0608 0%,#1a0810 45%,#120508 100%)' }}
    >
      {/* Ambient orbs */}
      <div className="orb-p1 absolute pointer-events-none rounded-full"
        style={{ width: 480, height: 480, top: '-8%', right: '-12%',
          background: 'radial-gradient(circle,rgba(180,30,30,0.22) 0%,transparent 70%)',
          filter: 'blur(45px)' }} />
      <div className="orb-p2 absolute pointer-events-none rounded-full"
        style={{ width: 380, height: 380, bottom: '-5%', left: '-8%',
          background: 'radial-gradient(circle,rgba(200,60,20,0.18) 0%,transparent 70%)',
          filter: 'blur(55px)' }} />

      {/* Success toast */}
      {state.successMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl text-sm font-semibold tracking-wider"
          style={{ background: 'rgba(0,200,120,0.15)', border: '1px solid rgba(0,200,120,0.4)', color: '#00e5a0',
            fontFamily: "'Rajdhani', sans-serif", boxShadow: '0 4px 20px rgba(0,200,120,0.2)' }}>
          ✦ {state.successMsg}
        </div>
      )}

      {/* Main card */}
      <div ref={cardRef} className="relative w-full max-w-sm mx-4 rounded-2xl px-8 py-10" style={CARD_STYLE}>

        {/* Header label */}
        <p className="p-info-block text-center text-xs tracking-[0.35em] uppercase mb-6"
          style={{ color: 'rgba(255,120,70,0.5)', fontFamily: "'Rajdhani', sans-serif" }}>
          ✦ perfil de operador ✦
        </p>

        {/* Avatar section */}
        <div ref={avatarRef} className="flex flex-col items-center mb-6">
          <div className="relative group">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full"
              style={{ background: `radial-gradient(circle, ${roleMeta.glow} 0%, transparent 70%)`,
                filter: 'blur(12px)', transform: 'scale(1.3)', zIndex: 0 }} />

            {/* Avatar ring border */}
            <div className="relative rounded-full p-0.5"
              style={{ background: `linear-gradient(135deg, ${roleMeta.color}, rgba(255,100,50,0.3), transparent)` }}>
              <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center relative"
                style={{ background: 'rgba(20,10,14,0.9)' }}>
                {avatarSrc ? (
                  <Image src={avatarSrc} alt={fullName} fill className="object-cover" sizes="96px" />
                ) : (
                  <span className="text-2xl font-black"
                    style={{ fontFamily: "'Orbitron', sans-serif",
                      background: `linear-gradient(135deg, ${roleMeta.color}, #f7c59f)`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {initials}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Name */}
          <h2 className="p-info-block mt-4 text-xl font-black tracking-wide text-center"
            style={{ fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(90deg,#ff6b35,#f7c59f,#ff8c42)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {fullName}
          </h2>

          {/* Role badge */}
          <div className="p-info-block mt-2 px-3 py-1 rounded-full text-xs font-bold tracking-[0.25em]"
            style={{ background: `rgba(${roleMeta.color === '#ff3060' ? '255,48,96' : roleMeta.color === '#ffaa00' ? '255,170,0' : roleMeta.color === '#00e5a0' ? '0,229,160' : '255,107,53'},0.12)`,
              border: `1px solid ${roleMeta.color}55`,
              color: roleMeta.color,
              fontFamily: "'Rajdhani', sans-serif" }}>
            {roleMeta.label}
          </div>
        </div>

        {/* Info pills */}
        <div className="p-info-block space-y-2 mb-6">
          {[
            { icon: <IconMail />,     value: profile?.email || '—' },
            {
              icon: <IconPhone />,
              value: profile?.phone
                ? `${profile.country_code ? profile.country_code + ' ' : ''}${profile.phone}`
                : '—'
            },
            { icon: <IconCalendar />, value: `Desde ${formatDate(profile?.created_at ?? null)}` },
          ].map(({ icon, value }, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,100,50,0.12)' }}>
              <span style={{ color: 'rgba(255,120,70,0.6)' }}>{icon}</span>
              <span className="text-xs truncate" style={{ color: 'rgba(200,170,150,0.8)', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.05em' }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="p-divider flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: 'rgba(255,100,50,0.15)' }} />
          <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(200,130,100,0.4)', fontFamily: "'Rajdhani', sans-serif" }}>
            cuenta
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,100,50,0.15)' }} />
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          {/* Edit profile */}
          <button onClick={openEdit}
            className="p-action w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,100,50,0.18)', cursor: 'pointer' }}
            onMouseEnter={e => { gsap.to(e.currentTarget, { x: 4, duration: 0.2 }); e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)'; e.currentTarget.style.background = 'rgba(255,100,50,0.07)' }}
            onMouseLeave={e => { gsap.to(e.currentTarget, { x: 0, duration: 0.2 }); e.currentTarget.style.borderColor = 'rgba(255,100,50,0.18)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,107,53,0.15)', color: '#ff6b35' }}>
              <IconEdit />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#e8d5c8', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.05em' }}>
                Editar perfil
              </p>
              <p className="text-xs" style={{ color: 'rgba(200,150,120,0.55)' }}>
                Actualiza tu nombre y/o avatar
              </p>
            </div>
          </button>

          {/* Change password */}
          <button onClick={handleChangePassword}
            className="p-action w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,100,50,0.18)', cursor: 'pointer' }}
            onMouseEnter={e => { gsap.to(e.currentTarget, { x: 4, duration: 0.2 }); e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)'; e.currentTarget.style.background = 'rgba(255,100,50,0.07)' }}
            onMouseLeave={e => { gsap.to(e.currentTarget, { x: 0, duration: 0.2 }); e.currentTarget.style.borderColor = 'rgba(255,100,50,0.18)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,107,53,0.15)', color: '#ff6b35' }}>
              <IconKey />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#e8d5c8', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.05em' }}>
                Cambiar contraseña
              </p>
              <p className="text-xs" style={{ color: 'rgba(200,150,120,0.55)' }}>
                Establece una nueva clave segura
              </p>
            </div>
          </button>

          {/* Sign out */}
          <button onClick={handleSignOut}
            className="p-action w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200"
            style={{ background: 'rgba(220,40,40,0.05)', border: '1px solid rgba(220,40,40,0.2)', cursor: 'pointer' }}
            onMouseEnter={e => { gsap.to(e.currentTarget, { x: 4, duration: 0.2 }); e.currentTarget.style.borderColor = 'rgba(220,40,40,0.5)'; e.currentTarget.style.background = 'rgba(220,40,40,0.1)' }}
            onMouseLeave={e => { gsap.to(e.currentTarget, { x: 0, duration: 0.2 }); e.currentTarget.style.borderColor = 'rgba(220,40,40,0.2)'; e.currentTarget.style.background = 'rgba(220,40,40,0.05)' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(220,40,40,0.15)', color: '#ff4444' }}>
              <IconLogout />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#ff6b6b', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.05em' }}>
                Cerrar sesión
              </p>
              <p className="text-xs" style={{ color: 'rgba(200,120,120,0.55)' }}>
                Salir de tu cuenta actual
              </p>
            </div>
          </button>
        </div>

        {/* Error */}
        {state.error && (
          <div className="mt-4 px-4 py-2 rounded-lg text-xs text-center"
            style={{ background: 'rgba(220,40,40,0.15)', border: '1px solid rgba(220,40,40,0.35)', color: '#ff6b6b' }}>
            {state.error}
          </div>
        )}
      </div>

      {/* ── Edit Modal ── */}
      {state.editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(5,2,4,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) closeEdit() }}>

          <div className="modal-card w-full max-w-sm rounded-2xl px-7 py-8" style={CARD_STYLE}>

            {/* Modal header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-black tracking-widest"
                  style={{ fontFamily: "'Orbitron', sans-serif",
                    background: 'linear-gradient(90deg,#ff6b35,#f7c59f)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  EDITAR PERFIL
                </h3>
                <p className="text-xs tracking-widest mt-0.5" style={{ color: 'rgba(255,120,70,0.45)', fontFamily: "'Rajdhani', sans-serif" }}>
                  ✦ actualizar datos ✦
                </p>
              </div>
              <button onClick={closeEdit}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: 'rgba(200,130,100,0.6)', background: 'rgba(255,100,50,0.08)', border: '1px solid rgba(255,100,50,0.15)', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#ff6b35'; e.currentTarget.style.background = 'rgba(255,100,50,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(200,130,100,0.6)'; e.currentTarget.style.background = 'rgba(255,100,50,0.08)' }}>
                <IconClose />
              </button>
            </div>

            {/* Avatar picker */}
            <div className="modal-field flex flex-col items-center mb-6">
              <div className="relative cursor-pointer group" onClick={triggerFileInput}>
                <div className="w-20 h-20 rounded-full overflow-hidden relative flex items-center justify-center"
                  style={{ background: 'rgba(20,10,14,0.9)',
                    border: '2px solid rgba(255,100,50,0.35)',
                    boxShadow: '0 0 20px rgba(255,100,50,0.2)' }}>
                  {(state.avatarPreview ?? profile?.avatar_url) ? (
                    <Image src={state.avatarPreview ?? profile!.avatar_url!} alt="avatar" fill className="object-cover" sizes="80px"/>
                  ) : (
                    <span className="text-xl font-black" style={{ fontFamily: "'Orbitron', sans-serif", color: '#ff6b35' }}>{initials}</span>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(0,0,0,0.6)' }}>
                    <IconCamera />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#ff4e50,#f7931e)', boxShadow: '0 2px 8px rgba(255,100,50,0.4)' }}>
                  <IconCamera />
                </div>
              </div>
              <p className="text-xs mt-2 tracking-wider" style={{ color: 'rgba(200,150,120,0.45)', fontFamily: "'Rajdhani', sans-serif" }}>
                Toca para cambiar avatar
              </p>
              <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              {[
                { label: 'Nombre',           value: state.editFirst,   setter: setEditFirst,   placeholder: 'Tu nombre',       type: 'text' },
                { label: 'Apellido',          value: state.editLast,    setter: setEditLast,    placeholder: 'Tu apellido',     type: 'text' },
                { label: 'Código de país',    value: state.editCountry, setter: setEditCountry, placeholder: '+503',            type: 'text' },
                { label: 'Teléfono',          value: state.editPhone,   setter: setEditPhone,   placeholder: '7000-0000',       type: 'tel'  },
              ].map(({ label, value, setter, placeholder, type }) => (
                <div key={label} className="modal-field">
                  <label style={LABEL_STYLE} className="block mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={value}
                    onChange={e => setter(e.target.value)}
                    placeholder={placeholder}
                    style={INPUT_STYLE}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,107,53,0.7)'; e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,107,53,0.3)' }}
                    onBlur={e =>  { e.currentTarget.style.borderColor = 'rgba(180,60,40,0.3)';  e.currentTarget.style.boxShadow = 'none' }}
                  />
                </div>
              ))}
            </div>

            {/* Modal error */}
            {state.error && (
              <div className="mt-4 px-3 py-2 rounded-lg text-xs text-center"
                style={{ background: 'rgba(220,40,40,0.15)', border: '1px solid rgba(220,40,40,0.35)', color: '#ff6b6b' }}>
                {state.error}
              </div>
            )}

            {/* Modal actions */}
            <div className="flex gap-3 mt-6">
              <button onClick={closeEdit}
                className="flex-1 py-3 rounded-xl text-sm font-semibold tracking-wider transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,100,50,0.2)',
                  color: 'rgba(200,150,120,0.7)', fontFamily: "'Rajdhani', sans-serif", cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,100,50,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,100,50,0.2)'}>
                Cancelar
              </button>
              <button onClick={handleSave} disabled={state.isSaving}
                className="flex-1 py-3 rounded-xl text-sm font-black tracking-wider flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg,#ff4e50,#f7931e)',
                  color: '#fff', fontFamily: "'Orbitron', sans-serif",
                  boxShadow: '0 4px 16px rgba(255,100,50,0.35)', border: 'none', cursor: 'pointer',
                  letterSpacing: '0.1em' }}
                onMouseEnter={e => !state.isSaving && gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2 })}
                onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}>
                {state.isSaving ? <><IconSpinner /> Guardando...</> : <><IconSave /> Guardar</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}