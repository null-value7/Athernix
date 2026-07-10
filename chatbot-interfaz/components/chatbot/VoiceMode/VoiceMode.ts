import { useState, useCallback } from 'react'

export type VoiceTurn = 'idle' | 'listening' | 'processing' | 'speaking'

export interface VoiceModeState {
  active: boolean
  turn: VoiceTurn
  transcript: string
  response: string
  error: string | null
}

export function useVoiceMode(onMessage: (role: 'user' | 'ai', text: string) => void) {
  const [state, setState] = useState<VoiceModeState>({
    active: false,
    turn: 'idle',
    transcript: '',
    response: '',
    error: null,
  })

  const openVoiceMode = useCallback(() => {
    setState(prev => ({ ...prev, active: true, turn: 'idle', transcript: '', response: '', error: null }))
  }, [])

  const closeVoiceMode = useCallback(() => {
    setState(prev => ({ ...prev, active: false, turn: 'idle' }))
  }, [])

  const startVoiceCycle = useCallback(() => {
    setState(prev => ({ ...prev, turn: 'listening' }))
    // Simulate listening
    setTimeout(() => {
      const simulatedTranscript = 'Hola, esto es una prueba de voz'
      setState(prev => ({ ...prev, turn: 'processing', transcript: simulatedTranscript }))
      onMessage('user', simulatedTranscript)
      
      // Simulate processing
      setTimeout(() => {
        const simulatedResponse = 'Entendido. Esta es una respuesta simulada del modo voz.'
        setState(prev => ({ ...prev, turn: 'speaking', response: simulatedResponse }))
        onMessage('ai', simulatedResponse)
        
        // Return to idle after speaking
        setTimeout(() => {
          setState(prev => ({ ...prev, turn: 'idle' }))
        }, 2000)
      }, 1500)
    }, 3000)
  }, [onMessage])

  const interrupt = useCallback(() => {
    setState(prev => ({ ...prev, turn: 'idle' }))
  }, [])

  return {
    state,
    openVoiceMode,
    closeVoiceMode,
    startVoiceCycle,
    interrupt,
  }
}
