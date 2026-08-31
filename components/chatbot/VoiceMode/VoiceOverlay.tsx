'use client'

import type { VoiceModeState, VoiceTurn } from './VoiceMode'

const F_ORB  = "'Bebas Neue', sans-serif"
const F_RAJ  = "'Plus Jakarta Sans', sans-serif"
const F_MONO = "'JetBrains Mono', monospace"

// ── Etiquetas de estado ────────────────────────────────────────
const TURN_LABEL: Record<VoiceTurn, string> = {
  idle:       'TOCA PARA HABLAR',
  listening:  'ESCUCHANDO...',
  processing: 'PROCESANDO...',
  speaking:   'ATHER HABLANDO',
}

// Paleta unificada con /modulos y el resto de Athernix
const TURN_COLOR: Record<VoiceTurn, string> = {
  idle:       'rgba(255,0,110,0.55)',
  listening:  '#FF6B00',
  processing: '#FFD700',
  speaking:   '#FF006E',
}

// ── Campo de "blobs" animados (estilo Gemini) ───────────────────
// Se dibuja detrás/alrededor del orb original y se intensifica
// cuando Ather escucha o habla, sin sustituir el diseño anterior.
function VoiceBlobField({ active }: { active: boolean }) {
  return (
    <div style={{
      position:      'absolute',
      inset:         -30,
      borderRadius:  '50%',
      overflow:      'hidden',
      mixBlendMode:  'screen',
      opacity:       active ? 0.95 : 0.32,
      transition:    'opacity 0.45s ease',
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute', width: '62%', height: '62%', top: '8%', left: '6%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #FFD700, transparent 65%)',
        filter: 'blur(16px)',
        animation: `orbFloat1 ${active ? '2.6s' : '6.5s'} ease-in-out infinite`,
      }}/>
      <div style={{
        position: 'absolute', width: '58%', height: '58%', top: '28%', left: '36%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #FF006E, transparent 65%)',
        filter: 'blur(16px)',
        animation: `orbFloat2 ${active ? '2.1s' : '5.5s'} ease-in-out infinite`,
      }}/>
      <div style={{
        position: 'absolute', width: '54%', height: '54%', top: '18%', left: '18%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #FF6B00, transparent 65%)',
        filter: 'blur(16px)',
        animation: `orbFloat3 ${active ? '3.2s' : '7.2s'} ease-in-out infinite`,
      }}/>
    </div>
  )
}

// ── Orb central animado ────────────────────────────────────────
function VoiceOrb({
  turn,
  onClick,
}: {
  turn: VoiceTurn
  onClick: () => void
}) {
  const color      = TURN_COLOR[turn]
  const pulse      = turn === 'listening' || turn === 'speaking'
  const spin       = turn === 'processing'
  const blobActive = turn === 'listening' || turn === 'speaking'

  return (
    <div style={{
      position:       'relative',
      width:          200,
      height:         200,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      flexShrink:     0,
    }}>
      {/* Capa de blobs — se sobrepone detrás del orb existente */}
      <VoiceBlobField active={blobActive} />

      {/* Anillo giratorio exterior */}
      <div style={{
        position:     'absolute',
        inset:        10,
        borderRadius: '50%',
        background:   `conic-gradient(from 0deg, transparent, ${color}55, transparent 62%)`,
        animation:    'orbRingSpin 3.4s linear infinite',
        opacity:      pulse || spin ? 1 : 0.35,
        transition:   'opacity 0.3s',
      }}/>

      {/* ── Orb original (botón con letra A) ── */}
      <button
        onClick={onClick}
        style={{
          width:        120,
          height:       120,
          borderRadius: '50%',
          background:   `radial-gradient(circle at 38% 38%, ${color}30, rgba(8,4,14,0.95))`,
          border:       `2px solid ${color}`,
          boxShadow:    `0 0 ${pulse ? '48px' : '24px'} ${color}${pulse ? '80' : '40'}, inset 0 0 30px ${color}15`,
          cursor:       'pointer',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'center',
          transition:   'box-shadow 0.3s, border-color 0.3s',
          animation:    pulse ? 'orbPulse 1.4s ease-in-out infinite' : spin ? 'orbSpin 1.8s linear infinite' : 'none',
          position:     'relative',
          zIndex:       2,
          flexShrink:   0,
        }}
      >
        {/* Letra A central */}
        <span style={{
          fontFamily:  F_ORB,
          fontSize:    '2.1rem',
          color,
          filter:      `drop-shadow(0 0 12px ${color})`,
          userSelect:  'none',
          transition:  'color 0.3s',
        }}>
          A
        </span>

        {/* Onda exterior cuando escucha */}
        {turn === 'listening' && (
          <>
            <span style={{
              position:     'absolute',
              inset:        -12,
              borderRadius: '50%',
              border:       `1px solid ${color}50`,
              animation:    'orbRing 1.4s ease-out infinite',
            }}/>
            <span style={{
              position:     'absolute',
              inset:        -24,
              borderRadius: '50%',
              border:       `1px solid ${color}25`,
              animation:    'orbRing 1.4s 0.4s ease-out infinite',
            }}/>
          </>
        )}

        {/* Barras de audio cuando habla */}
        {turn === 'speaking' && (
          <div style={{
            position:       'absolute',
            bottom:         14,
            display:        'flex',
            gap:            3,
            alignItems:     'flex-end',
          }}>
            {[0,1,2,3,4].map(i => (
              <span key={i} style={{
                display:      'block',
                width:        3,
                borderRadius: 2,
                background:   color,
                animation:    `orbBar 0.7s ${i * 0.1}s ease-in-out infinite`,
              }}/>
            ))}
          </div>
        )}
      </button>
    </div>
  )
}

// ── Props ──────────────────────────────────────────────────────
interface Props {
  state:            VoiceModeState
  onClose:          () => void
  onStartCycle:     () => void
  onInterrupt:      () => void
}

// ── Overlay principal ──────────────────────────────────────────
export default function VoiceModeOverlay({
  state,
  onClose,
  onStartCycle,
  onInterrupt,
}: Props) {
  if (!state.active) return null

  const { turn, transcript, response, error } = state
  const color = TURN_COLOR[turn]

  const handleOrbClick = () => {
    if (turn === 'idle')     return onStartCycle()
    if (turn === 'speaking') return onInterrupt()
    // si está escuchando o procesando, no hacer nada
  }

  return (
    <>
      {/* ── Keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        @keyframes orbPulse {
          0%,100% { box-shadow: 0 0 24px ${TURN_COLOR.listening}60, inset 0 0 30px ${TURN_COLOR.listening}15 }
          50%      { box-shadow: 0 0 60px ${TURN_COLOR.listening}90, inset 0 0 40px ${TURN_COLOR.listening}25 }
        }
        @keyframes orbSpin {
          to { transform: rotate(360deg) }
        }
        @keyframes orbRing {
          0%   { transform: scale(1);   opacity: 0.8 }
          100% { transform: scale(1.5); opacity: 0   }
        }
        @keyframes orbBar {
          0%,100% { height: 4px  }
          50%     { height: 18px }
        }
        @keyframes orbRingSpin {
          to { transform: rotate(360deg) }
        }
        @keyframes orbFloat1 {
          0%,100% { transform: translate(-8%,-6%) scale(1)    }
          50%      { transform: translate(10%,8%)  scale(1.18) }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(9%,7%)   scale(1.08) }
          50%      { transform: translate(-9%,-9%) scale(0.92) }
        }
        @keyframes orbFloat3 {
          0%,100% { transform: translate(-6%,9%)  scale(0.9)  }
          50%      { transform: translate(9%,-8%)  scale(1.22) }
        }
        @keyframes voiceIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px) }
          to   { opacity: 1; transform: scale(1)    translateY(0)     }
        }
        @keyframes voiceBgIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
      `}</style>

      {/* ── Backdrop (se sobrepone sobre toda la pantalla) ── */}
      <div
        onClick={onClose}
        style={{
          position:   'fixed',
          inset:      0,
          zIndex:     50,
          background: 'rgba(4,2,8,0.86)',
          backdropFilter: 'blur(14px)',
          animation:  'voiceBgIn 0.25s ease-out',
        }}
      />

      {/* ── Panel central ── */}
      <div style={{
        position:        'fixed',
        inset:           0,
        zIndex:          51,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        pointerEvents:   'none',
      }}>
        <div
          style={{
            pointerEvents:  'auto',
            width:          380,
            maxWidth:       '92vw',
            background:     'rgba(8,4,14,0.97)',
            border:         `1px solid ${color}30`,
            borderRadius:   24,
            boxShadow:      `0 0 90px ${color}18`,
            padding:        '36px 28px 28px',
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            gap:            18,
            animation:      'voiceIn 0.28s ease-out',
          }}
        >
          {/* Header */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: color,
                boxShadow:  `0 0 8px ${color}`,
                display:    'inline-block',
              }}/>
              <span style={{ fontFamily: F_MONO, fontSize: '0.6rem', color: 'rgba(210,170,140,0.5)', letterSpacing: '0.2em' }}>
                ENLACE NEURAL ACTIVO
              </span>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border:     '1px solid rgba(255,107,0,0.25)',
                borderRadius: 6,
                color:      'rgba(255,107,0,0.6)',
                cursor:     'pointer',
                padding:    '3px 8px',
                fontFamily: F_MONO,
                fontSize:   '0.6rem',
                letterSpacing: '0.12em',
              }}
            >
              ESC
            </button>
          </div>

          {/* Orb + blobs superpuestos */}
          <VoiceOrb turn={turn} onClick={handleOrbClick} />

          {/* Estado */}
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily:    F_ORB,
              fontSize:      '0.95rem',
              letterSpacing: '0.2em',
              color,
              marginBottom:  4,
              transition:    'color 0.3s',
            }}>
              {TURN_LABEL[turn]}
            </p>
            {turn === 'idle' && (
              <p style={{ fontFamily: F_RAJ, fontSize: '0.65rem', color: 'rgba(210,170,140,0.3)', letterSpacing: '0.08em' }}>
                Toca el orb para iniciar la conversación
              </p>
            )}
            {turn === 'speaking' && (
              <p style={{ fontFamily: F_RAJ, fontSize: '0.65rem', color: 'rgba(210,170,140,0.3)', letterSpacing: '0.08em' }}>
                Toca el orb para interrumpir
              </p>
            )}
          </div>

          {/* Transcript del usuario */}
          {transcript && (
            <div style={{
              width:       '100%',
              padding:     '10px 14px',
              background:  'rgba(255,107,0,0.05)',
              border:      '1px solid rgba(255,107,0,0.15)',
              borderLeft:  '2px solid rgba(255,107,0,0.4)',
              borderRadius: 8,
            }}>
              <p style={{ fontFamily: F_MONO, fontSize: '0.62rem', color: 'rgba(255,107,0,0.55)', letterSpacing: '0.12em', marginBottom: 4, textTransform: 'uppercase' }}>
                ↑ TÚ
              </p>
              <p style={{ fontFamily: F_RAJ, fontSize: '0.78rem', color: '#ede0d4', lineHeight: 1.6 }}>
                {transcript}
              </p>
            </div>
          )}

          {/* Respuesta de Ather */}
          {response && (
            <div style={{
              width:       '100%',
              padding:     '10px 14px',
              background:  'rgba(255,0,110,0.05)',
              border:      '1px solid rgba(255,0,110,0.14)',
              borderLeft:  '2px solid rgba(255,0,110,0.4)',
              borderRadius: 8,
              maxHeight:   120,
              overflowY:   'auto',
            }}>
              <p style={{ fontFamily: F_MONO, fontSize: '0.62rem', color: 'rgba(255,0,110,0.5)', letterSpacing: '0.12em', marginBottom: 4, textTransform: 'uppercase' }}>
                ◈ ATHER
              </p>
              <p style={{ fontFamily: F_RAJ, fontSize: '0.78rem', color: '#ede0d4', lineHeight: 1.6 }}>
                {response}
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <p style={{ fontFamily: F_RAJ, fontSize: '0.68rem', color: '#ff4444', textAlign: 'center' }}>
              {error}
            </p>
          )}

          {/* Hint de teclado */}
          <p style={{ fontFamily: F_MONO, fontSize: '0.55rem', color: 'rgba(210,170,140,0.2)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Presiona ESC para cerrar · Toca el orb para hablar
          </p>
        </div>
      </div>
    </>
  )
}