'use client'

import { useEffect } from 'react'
import type { VoiceModeState, VoiceTurn } from './VoiceMode'

// ── Etiquetas de estado ────────────────────────────────────────
const TURN_LABEL: Record<VoiceTurn, string> = {
  idle:       'Toca el orb para hablar',
  listening:  'Escuchando...',
  processing: 'Procesando...',
  speaking:   'Athernix hablando',
}

const TURN_COLOR: Record<VoiceTurn, string> = {
  idle:       'rgba(255, 107, 0, 0.5)', // Orange
  listening:  '#FF006E',                 // Pink
  processing: '#FFD700',               // Yellow
  speaking:   '#FF6B00',                 // Orange
}

// ── Orb central animado ────────────────────────────────────────
function VoiceOrb({
  turn,
  onClick,
}: {
  turn: VoiceTurn
  onClick: () => void
}) {
  const color  = TURN_COLOR[turn]
  const pulse  = turn === 'listening' || turn === 'speaking'
  const spin   = turn === 'processing'

  return (
    <button
      onClick={onClick}
      className="w-32 h-32 rounded-full cursor-pointer flex items-center justify-center relative flex-shrink-0 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
      style={{
        background: `radial-gradient(circle at 35% 35%, ${color}40, rgba(10,8,22,0.95))`,
        border: `1px solid ${color}80`,
        boxShadow: `0 0 ${pulse ? '60px' : '30px'} ${color}${pulse ? '80' : '40'}, inset 0 0 40px ${color}20`,
        animation: pulse ? 'orbPulse3d 1.4s ease-in-out infinite' : spin ? 'orbSpin 1.8s linear infinite' : 'float3d 5s ease-in-out infinite',
      }}
    >
      {/* 3D Inner Core */}
      <div className="absolute inset-2 rounded-full" style={{
        background: `radial-gradient(circle at 30% 30%, ${color}80, transparent)`,
        filter: 'blur(8px)',
      }} />

      {/* Onda exterior cuando escucha */}
      {turn === 'listening' && (
        <>
          <span className="absolute inset-[-16px] rounded-full border border-red-500/40 animate-ping" style={{ animationDuration: '2s' }}/>
          <span className="absolute inset-[-32px] rounded-full border border-red-500/20 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.4s' }}/>
        </>
      )}

      {/* Barras de audio cuando habla */}
      {turn === 'speaking' && (
        <div className="absolute flex gap-1.5 items-center justify-center h-full">
          {[0,1,2,3,4].map(i => (
            <span key={i} className="block w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]" style={{ 
              height: 24, 
              animation: `soundWave 0.8s ease-in-out infinite alternate`, 
              animationDelay: `${i * 0.15}s` 
            }}/>
          ))}
        </div>
      )}
    </button>
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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (state.active) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [state.active, onClose])

  if (!state.active) return null

  const { turn, transcript, response, error } = state
  const color = TURN_COLOR[turn]

  const handleOrbClick = () => {
    if (turn === 'idle')     return onStartCycle()
    if (turn === 'speaking') return onInterrupt()
  }

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-[rgba(3,0,10,0.85)] backdrop-blur-md animate-in fade-in duration-300"
      />

      {/* ── Panel central ── */}
      <div className="fixed inset-0 z-[51] flex items-center justify-center pointer-events-none">
        <div
          className="pointer-events-auto w-[400px] max-w-[92vw] glass-panel rounded-3xl p-8 flex flex-col items-center gap-6 animate-in zoom-in-95 duration-300 shadow-[0_20px_60px_rgba(255,107,0,0.15)]"
        >
          {/* Header */}
          <div className="w-full flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_rgba(255,107,0,0.8)]" style={{ background: color }}/>
              <span className="text-[0.7rem] font-bold tracking-widest text-orange-400/80 uppercase">
                Conexión de Voz Activa
              </span>
            </div>
            <button
              onClick={onClose}
              className="bg-transparent border border-orange-500/30 rounded-md text-orange-400/70 cursor-pointer px-2.5 py-1 text-[0.65rem] font-medium tracking-wider hover:bg-orange-500/10 hover:border-orange-500/50 hover:text-orange-300 transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Orb */}
          <div className="py-6">
            <VoiceOrb turn={turn} onClick={handleOrbClick} />
          </div>

          {/* Estado */}
          <div className="text-center w-full">
            <p className="text-[0.85rem] font-bold tracking-widest mb-1.5 transition-colors duration-300 uppercase" style={{ color }}>
              {TURN_LABEL[turn]}
            </p>
            {turn === 'idle' && (
              <p className="text-[0.7rem] font-medium text-orange-200/40">
                Toca el orb para iniciar comunicación
              </p>
            )}
            {turn === 'speaking' && (
              <p className="text-[0.7rem] font-medium text-orange-200/40">
                Toca el orb para interrumpir
              </p>
            )}
          </div>

          {/* Transcript del usuario */}
          {transcript && (
            <div className="w-full p-3 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 border-l-2 border-l-orange-500 rounded-xl shadow-inner animate-fade-in-up">
              <p className="text-[0.65rem] font-semibold tracking-wider mb-1.5 uppercase text-orange-400/70">
                Tú
              </p>
              <p className="text-[0.85rem] leading-relaxed text-[#ede0d4]">
                {transcript}
              </p>
            </div>
          )}

          {/* Respuesta de Ather */}
          {response && (
            <div className="w-full p-3 bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 border-l-2 border-l-pink-500 rounded-xl shadow-inner max-h-[160px] overflow-y-auto animate-fade-in-up">
              <p className="text-[0.65rem] font-semibold tracking-wider mb-1.5 uppercase text-pink-400/70 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400/60 shadow-[0_0_8px_rgba(255,0,110,0.8)] flex-shrink-0"/>
                Athernix
              </p>
              <p className="text-[0.85rem] leading-relaxed text-[#ede0d4]">
                {response}
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="w-full p-2.5 bg-red-500/20 border border-red-500/50 rounded-xl animate-fade-in-up">
              <p className="text-[0.75rem] font-medium text-red-300 text-center">
                {error}
              </p>
            </div>
          )}

          {/* Hint de teclado */}
          <p className="text-[0.6rem] font-medium tracking-wide uppercase text-orange-200/30 mt-2">
            Presiona ESC para cerrar
          </p>
        </div>
      </div>
    </>
  )
}
