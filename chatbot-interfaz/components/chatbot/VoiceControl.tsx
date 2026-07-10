'use client'

interface VoiceState {
  ttsEnabled: boolean
  listening: boolean
  speaking: boolean
}

interface Props {
  voiceState: VoiceState
  toggleTTS: () => void
  startListening: () => void
  stopListening: () => void
  stopSpeaking: () => void
}

export default function VoiceControls({
  voiceState,
  toggleTTS,
  startListening,
  stopListening,
  stopSpeaking,
}: Props) {
  return (
    <div style={{
      display: 'flex',
      gap: 8,
      padding: '8px 16px',
      background: 'rgba(8,4,14,0.82)',
      borderBottom: '1px solid rgba(180,60,40,0.18)',
    }}>
      <button
        onClick={toggleTTS}
        style={{
          padding: '6px 12px',
          borderRadius: 6,
          background: voiceState.ttsEnabled ? 'rgba(255,215,0,0.1)' : 'transparent',
          border: `1px solid ${voiceState.ttsEnabled ? 'rgba(255,215,0,0.4)' : 'rgba(255,107,0,0.2)'}`,
          color: voiceState.ttsEnabled ? '#FFD700' : 'rgba(255,107,0,0.7)',
          fontSize: '0.65rem',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        {voiceState.ttsEnabled ? 'TTS ON' : 'TTS OFF'}
      </button>
      <button
        onClick={voiceState.listening ? stopListening : startListening}
        disabled={voiceState.speaking}
        style={{
          padding: '6px 12px',
          borderRadius: 6,
          background: voiceState.listening ? 'rgba(255,0,110,0.1)' : 'transparent',
          border: `1px solid ${voiceState.listening ? 'rgba(255,0,110,0.4)' : 'rgba(255,107,0,0.2)'}`,
          color: voiceState.listening ? '#FF006E' : 'rgba(255,107,0,0.7)',
          fontSize: '0.65rem',
          cursor: voiceState.speaking ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          opacity: voiceState.speaking ? 0.5 : 1,
        }}
      >
        {voiceState.listening ? '🎤 ESCUCHANDO' : '🎤 MIC'}
      </button>
    </div>
  )
}
