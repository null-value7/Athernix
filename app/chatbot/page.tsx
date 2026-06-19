'use client';
import { useState, useCallback } from 'react'
import { useAltChatController } from '@/controllers/AI/chatbot'
import { ALT_QUICK_PROMPTS, AltChatMessage } from '@/models/AI/chatbot'

// ── Design tokens ─────────────────────────────────────────────
const F_ORB = "'Orbitron', sans-serif"
const F_RAJ = "'Rajdhani', sans-serif"

const C = {
  bg:        '#08040c',
  surface:   'rgba(8,4,14,0.98)',
  orange:    '#ff6b35',
  purple:    '#c060ff',
  cyan:      '#7fffd4',
  text:      '#ede0d4',
  dim:       'rgba(210,170,140,0.5)',
  dimmer:    'rgba(210,170,140,0.28)',
  bdrO:      'rgba(180,60,40,0.18)',
  bdrP:      'rgba(200,80,255,0.18)',
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
          0%,80%,100% { transform:scale(0.5); opacity:0.25 }
          40%          { transform:scale(1);   opacity:1    }
        }
      `}</style>
      <div style={{ display: 'flex', gap: 4, padding: '2px 0', alignItems: 'center' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: '50%',
            background: 'rgba(200,80,255,0.6)',
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
}: {
  msg: AltChatMessage
  isLast: boolean
  busy: boolean
}) {
  const isAI       = msg.role === 'ai'
  const showTyping = isAI && isLast && busy && msg.text === ''

  return (
    <div style={{
      display:       'flex',
      gap:           9,
      alignItems:    'flex-start',
      flexDirection: isAI ? 'row' : 'row-reverse',
      animation:     'altMsgIn 0.28s ease-out',
    }}>
      {/* Avatar */}
      <div style={{
        width:        26, height: 26,
        borderRadius: 4,
        flexShrink:   0,
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'center',
        fontSize:     '0.58rem',
        fontFamily:   F_ORB,
        fontWeight:   700,
        letterSpacing: '0.05em',
        background:   isAI ? 'rgba(200,80,255,0.08)' : 'rgba(255,107,53,0.08)',
        border:       `1px solid ${isAI ? 'rgba(200,80,255,0.28)' : 'rgba(255,107,53,0.28)'}`,
        color:        isAI ? 'rgba(200,80,255,0.8)' : 'rgba(255,107,53,0.8)',
      }}>
        {isAI ? 'A' : 'U'}
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
          color:         isAI ? 'rgba(200,80,255,0.4)' : 'rgba(255,107,53,0.4)',
        }}>
          {isAI && <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(200,80,255,0.5)', flexShrink: 0 }}/>}
          {isAI ? '◈ ATHER ENGINE' : '↑ OPERADOR'}
          {!isAI && <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,107,53,0.5)', flexShrink: 0 }}/>}
        </div>

        {/* Text box */}
        <div style={{
          padding:      '10px 13px',
          borderRadius: 6,
          fontSize:     '0.78rem',
          lineHeight:   1.62,
          color:        C.text,
          fontFamily:   F_RAJ,
          textAlign:    isAI ? 'left' : 'right',
          background:   isAI ? 'rgba(18,8,28,0.9)' : 'rgba(28,10,8,0.9)',
          border:       `1px solid ${isAI ? 'rgba(200,80,255,0.14)' : 'rgba(255,107,53,0.14)'}`,
          borderLeft:   isAI ? '2px solid rgba(200,80,255,0.35)' : undefined,
          borderRight:  !isAI ? '2px solid rgba(255,107,53,0.35)' : undefined,
        }}>
          {showTyping ? <TypingDots /> : (msg.text || '…')}
        </div>
      </div>
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
            <polygon points="26,2 50,15 50,45 26,58 2,45 2,15" fill="none" stroke="#c060ff" strokeWidth="0.5"/>
          </pattern>
          <pattern id="hex-p2" x="26" y="30" width="52" height="60" patternUnits="userSpaceOnUse">
            <polygon points="26,2 50,15 50,45 26,58 2,45 2,15" fill="none" stroke="#ff6b35" strokeWidth="0.4" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-p)"/>
        <rect width="100%" height="100%" fill="url(#hex-p2)"/>
        {/* Accent glow nodes at hex intersections */}
        <circle cx="120" cy="90"  r="3"   fill="#ff6b35" opacity="0.6"/>
        <circle cx="380" cy="200" r="2.5" fill="#c060ff" opacity="0.5"/>
        <circle cx="560" cy="80"  r="2"   fill="#ff6b35" opacity="0.4"/>
        <circle cx="240" cy="480" r="2.5" fill="#c060ff" opacity="0.5"/>
        <circle cx="620" cy="420" r="3"   fill="#ff6b35" opacity="0.45"/>
        <circle cx="60"  cy="320" r="2"   fill="#c060ff" opacity="0.4"/>
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

  const { sidebarOpen, sessions, currentSession, messages, input, busy } = state

  const handleHoverBtn = useCallback((e: React.MouseEvent<HTMLButtonElement>, enter: boolean) => {
    const el = e.currentTarget
    if (enter) {
      el.style.background    = 'rgba(200,80,255,0.1)'
      el.style.borderColor   = 'rgba(200,80,255,0.5)'
      el.style.boxShadow     = '0 0 14px rgba(200,80,255,0.12)'
    } else {
      el.style.background    = 'transparent'
      el.style.borderColor   = 'rgba(200,80,255,0.3)'
      el.style.boxShadow     = 'none'
    }
  }, [])

  return (
    <>
      {/* ── Global keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');

        @keyframes altMsgIn    { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes altBlink    { 0%,100%{opacity:1;box-shadow:0 0 8px #7fffd4} 55%{opacity:0.25;box-shadow:none} }
        @keyframes altGlitch   { 0%{opacity:0.6;transform:scaleX(0.4) translateX(-60%)} 50%{opacity:1;transform:scaleX(1) translateX(0%)} 100%{opacity:0;transform:scaleX(0.4) translateX(60%)} }
        @keyframes altSig      { to{left:120%} }
        @keyframes altQpHover  { }

        #alt-msgs::-webkit-scrollbar       { width:3px }
        #alt-msgs::-webkit-scrollbar-thumb { background:rgba(180,60,40,0.2); border-radius:4px }
        #alt-msgs::-webkit-scrollbar-track { background:transparent }

        #alt-sb-list::-webkit-scrollbar       { width:3px }
        #alt-sb-list::-webkit-scrollbar-thumb { background:rgba(200,80,255,0.18); border-radius:4px }

        #alt-cin:focus {
          border-color: rgba(200,80,255,0.4) !important;
          border-bottom-color: #c060ff !important;
          background: rgba(200,80,255,0.03) !important;
          outline: none;
        }
        #alt-cin::placeholder { color: rgba(210,170,140,0.28); letter-spacing: 0.08em }
      `}</style>

      <div style={{
        fontFamily:   F_RAJ,
        background:   C.bg,
        height:       '100vh',
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

        {/* ── Glitch top line ── */}
        <div style={{
          position:   'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 10,
          background: `linear-gradient(90deg,transparent,${C.orange},${C.purple},transparent)`,
          animation:  'altGlitch 4s linear infinite',
        }}/>

        {/* ── Hex grid background ── */}
        <HexBackground />

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
              fontFamily:    F_ORB, fontSize: '0.52rem', letterSpacing: '0.38em',
              color:         'rgba(200,80,255,0.45)', textTransform: 'uppercase',
              paddingBottom: 10, marginBottom: 12,
              borderBottom:  `1px solid ${C.bdrP}`,
            }}>
              ✦ ARCHIVO NEURAL
            </div>

            {/* New session */}
            <button onClick={newChat}
              onMouseEnter={e => handleHoverBtn(e, true)}
              onMouseLeave={e => handleHoverBtn(e, false)}
              style={{
                width: '100%', padding: '8px 0', borderRadius: 8,
                background: 'transparent', border: '1px solid rgba(200,80,255,0.3)',
                color: C.purple, fontFamily: F_RAJ, fontSize: '0.7rem',
                fontWeight: 700, letterSpacing: '0.15em', cursor: 'pointer',
                marginBottom: 14, display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 6, textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}>
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
                    padding: '8px 10px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.18s',
                    background:   currentSession === s.id ? 'rgba(200,80,255,0.06)' : 'transparent',
                    border:       `1px solid ${currentSession === s.id ? 'rgba(200,80,255,0.22)' : 'transparent'}`,
                    fontFamily:   F_RAJ,
                  }}
                  onMouseEnter={e => {
                    if (currentSession !== s.id) {
                      e.currentTarget.style.background   = 'rgba(200,80,255,0.04)'
                      e.currentTarget.style.borderColor  = 'rgba(200,80,255,0.15)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (currentSession !== s.id) {
                      e.currentTarget.style.background   = 'transparent'
                      e.currentTarget.style.borderColor  = 'transparent'
                    }
                  }}>
                  <span style={{ fontSize: '0.68rem', color: C.text, fontWeight: 600, letterSpacing: '0.03em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {s.title}
                  </span>
                  <span style={{ fontSize: '0.58rem', color: C.dimmer, letterSpacing: '0.05em' }}>
                    {s.date}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main panel ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 4, minWidth: 0 }}>

          {/* Topbar */}
          <div style={{
            display:       'flex', alignItems: 'center', gap: 10,
            padding:       '12px 16px',
            borderBottom:  `1px solid ${C.bdrO}`,
            background:    'rgba(8,4,14,0.82)',
            backdropFilter:'blur(16px)',
            flexShrink:    0,
          }}>
            {/* Menu button */}
            <button onClick={toggleSidebar}
              style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: 'transparent', border: '1px solid rgba(200,80,255,0.25)',
                color: 'rgba(200,80,255,0.7)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,80,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(200,80,255,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(200,80,255,0.25)' }}>
              <IconMenu />
            </button>

            {/* Status pulse */}
            <div style={{
              width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
              background: C.cyan, animation: 'altBlink 2.2s infinite',
            }}/>

            {/* Title */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: F_ORB, fontSize: '0.65rem', color: C.text, letterSpacing: '0.1em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                ATHER — ENLACE NEURAL
              </div>
              <div style={{ fontSize: '0.56rem', color: 'rgba(200,80,255,0.38)', fontFamily: F_RAJ, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                ◈ Motor Athernix · Fase I · Activo
              </div>
            </div>

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
          <div id="alt-msgs" style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12, height: 0, }}>
            {messages.length === 0 ? (
              /* Empty state */
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                {/* Ather ring */}
                <div style={{
                  width: 72, height: 72, borderRadius: '50%', position: 'relative',
                  border: '1px solid rgba(200,80,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    position: 'absolute', inset: 5, borderRadius: '50%',
                    border: '1px solid rgba(255,107,53,0.18)',
                  }}/>
                  <span style={{ fontFamily: F_ORB, fontSize: '0.9rem', color: C.orange, letterSpacing: '0.1em', position: 'relative', zIndex: 1 }}>A</span>
                </div>

                {/* Divider line */}
                <div style={{ width: 40, height: 1, background: `linear-gradient(90deg,transparent,${C.orange},transparent)` }}/>

                <div style={{
                  fontFamily: F_RAJ, fontSize: '0.72rem', color: C.dimmer,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  textAlign: 'center', lineHeight: 1.9,
                }}>
                  ENLACE CEREBRAL ACTIVO<br />¿Qué deseas explorar?
                </div>

                {/* Quick prompts */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 340 }}>
                  {ALT_QUICK_PROMPTS.map(p => (
                    <button key={p} onClick={() => sendMessage(p)}
                      style={{
                        padding: '5px 13px', borderRadius: 4, background: 'transparent',
                        border: '1px solid rgba(255,107,53,0.2)', color: C.dim,
                        fontSize: '0.66rem', fontFamily: F_RAJ, cursor: 'pointer',
                        transition: 'all 0.2s', letterSpacing: '0.08em', textTransform: 'uppercase',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,53,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)'; e.currentTarget.style.color = C.orange }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,107,53,0.2)'; e.currentTarget.style.color = C.dim }}>
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
                    msg={msg}
                    isLast={i === messages.length - 1}
                    busy={busy}
                  />
                ))}
                {/* Standalone typing indicator when waiting for stream start */}
                {busy && messages[messages.length - 1]?.role === 'user' && (
                  <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: 4, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.58rem', fontFamily: F_ORB, fontWeight: 700,
                      background: 'rgba(200,80,255,0.08)', border: '1px solid rgba(200,80,255,0.28)',
                      color: 'rgba(200,80,255,0.8)',
                    }}>A</div>
                    <div>
                      <div style={{ fontSize: '0.52rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 4, fontFamily: F_RAJ, color: 'rgba(200,80,255,0.4)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(200,80,255,0.5)', display: 'inline-block' }}/>
                        ◈ ATHER ENGINE
                      </div>
                      <div style={{ padding: '10px 13px', borderRadius: 6, background: 'rgba(18,8,28,0.9)', border: '1px solid rgba(200,80,255,0.14)', borderLeft: '2px solid rgba(200,80,255,0.35)' }}>
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
                  border:        '1px solid rgba(200,80,255,0.2)',
                  borderBottom:  '1.5px solid rgba(255,107,53,0.4)',
                  borderRadius:  5,
                  padding:       '9px 13px',
                  color:         C.text,
                  fontFamily:    F_RAJ,
                  fontSize:      '0.78rem',
                  letterSpacing: '0.03em',
                  caretColor:    C.purple,
                  outline:       'none',
                  transition:    'border-color 0.2s',
                  opacity:       busy ? 0.5 : 1,
                }}
              />
              <button type="submit" disabled={busy || !input.trim()}
                style={{
                  width: 36, height: 36, borderRadius: 6, flexShrink: 0,
                  background: 'transparent', border: '1px solid rgba(255,107,53,0.3)',
                  color: 'rgba(255,107,53,0.8)', cursor: busy || !input.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s', opacity: busy || !input.trim() ? 0.28 : 1,
                }}
                onMouseEnter={e => {
                  if (!busy && input.trim()) {
                    e.currentTarget.style.borderColor = C.orange
                    e.currentTarget.style.color       = C.orange
                    e.currentTarget.style.background  = 'rgba(255,107,53,0.07)'
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,107,53,0.3)'
                  e.currentTarget.style.color       = 'rgba(255,107,53,0.8)'
                  e.currentTarget.style.background  = 'transparent'
                }}>
                <IconSend />
              </button>
            </form>

            <div style={{
              fontSize:      '0.52rem', color: C.dimmer, letterSpacing: '0.15em',
              textAlign:     'center', marginTop: 7, fontFamily: F_RAJ, textTransform: 'uppercase',
            }}>
              CONECTADO A /API/CHAT · ATHERNIX ENGINE FASE I
            </div>
          </div>
        </div>
      </div>
    </>
  )
}