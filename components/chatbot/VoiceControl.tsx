// components/chatbot/VoiceControls.tsx
// Barra de controles de voz para integrar en ChatAltView.
// Muestra: toggle TTS | botón micrófono | transcript en tiempo real

'use client'

import type { VoiceState } from './AtherVoice'

const F_RAJ = "'Rajdhani', sans-serif"
const F_ORB = "'Orbitron', sans-serif"

// ── Íconos SVG ─────────────────────────────────────────────────
const IconMic = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"/>
  </svg>
)

const IconMicOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"/>
  </svg>
)

const IconVolume = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    {active ? (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"/>
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"/>
    )}
  </svg>
)

const IconStop = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <rect x="6" y="6" width="12" height="12" rx="2"/>
  </svg>
)

// ── Props ──────────────────────────────────────────────────────
interface Props {
  voiceState:     VoiceState
  toggleTTS:      () => void
  startListening: () => void
  stopListening:  () => void
  stopSpeaking:   () => void
}

// ── Componente ─────────────────────────────────────────────────
export default function VoiceControls({
  voiceState,
  toggleTTS,
  startListening,
  stopListening,
  stopSpeaking,
}: Props) {
  const { ttsEnabled, isSpeaking, isListening, transcript, supported } = voiceState

  // Si el navegador no soporta nada, no renderizar
  if (!supported.tts && !supported.stt) return null

  return (
    <div className="flex items-center gap-2 flex-wrap">

      {/* ── Toggle TTS ── */}
      {supported.tts && (
        <button
          onClick={isSpeaking ? stopSpeaking : toggleTTS}
          title={isSpeaking ? 'Detener voz' : ttsEnabled ? 'Desactivar voz de Ather' : 'Activar voz de Ather'}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-all"
          style={{
            fontFamily:    F_RAJ,
            fontSize:      '0.6rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background:    isSpeaking
              ? 'rgba(192,96,255,0.15)'
              : ttsEnabled
                ? 'rgba(192,96,255,0.08)'
                : 'transparent',
            border: `1px solid ${
              isSpeaking ? 'rgba(192,96,255,0.6)' :
              ttsEnabled ? 'rgba(192,96,255,0.35)' :
              'rgba(192,96,255,0.18)'
            }`,
            color: isSpeaking ? '#c060ff' : ttsEnabled ? 'rgba(192,96,255,0.85)' : 'rgba(192,96,255,0.4)',
            cursor: 'pointer',
          }}
        >
          {isSpeaking ? <IconStop /> : <IconVolume active={ttsEnabled} />}
          <span>
            {isSpeaking ? 'Silenciar' : ttsEnabled ? 'Voz ON' : 'Voz OFF'}
          </span>
          {/* Pulso animado cuando habla */}
          {isSpeaking && (
            <span className="flex gap-px items-end" style={{ height: 12 }}>
              {[0, 1, 2].map(i => (
                <span key={i}
                  style={{
                    display:    'block',
                    width:      2,
                    borderRadius: 1,
                    background: '#c060ff',
                    animation:  `atherWave 0.8s ${i * 0.15}s infinite ease-in-out`,
                  }}
                />
              ))}
            </span>
          )}
        </button>
      )}

      {/* ── Botón micrófono ── */}
      {supported.stt && (
        <button
          onClick={isListening ? stopListening : startListening}
          title={isListening ? 'Detener micrófono' : 'Hablarle a Ather'}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-all"
          style={{
            fontFamily:    F_RAJ,
            fontSize:      '0.6rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background:    isListening ? 'rgba(255,107,53,0.12)' : 'transparent',
            border: `1px solid ${isListening ? 'rgba(255,107,53,0.6)' : 'rgba(255,107,53,0.2)'}`,
            color:  isListening ? '#ff6b35' : 'rgba(255,107,53,0.45)',
            cursor: 'pointer',
          }}
        >
          {isListening ? <IconMicOff /> : <IconMic />}
          <span>{isListening ? 'Escuchando...' : 'Hablar'}</span>
          {/* Dot pulsante cuando escucha */}
          {isListening && (
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#ff6b35',
              animation: 'atherBlink 1s infinite',
              display: 'inline-block',
            }}/>
          )}
        </button>
      )}

      {/* ── Transcript en tiempo real ── */}
      {isListening && transcript && (
        <span
          className="truncate max-w-xs"
          style={{
            fontFamily:    F_RAJ,
            fontSize:      '0.65rem',
            color:         'rgba(255,107,53,0.6)',
            fontStyle:     'italic',
            letterSpacing: '0.03em',
          }}
        >
          "{transcript}"
        </span>
      )}

      {/* Keyframes inline */}
      <style>{`
        @keyframes atherWave {
          0%,100% { height: 4px  }
          50%      { height: 12px }
        }
        @keyframes atherBlink {
          0%,100% { opacity: 1 }
          50%      { opacity: 0.2 }
        }
      `}</style>
    </div>
  )
}