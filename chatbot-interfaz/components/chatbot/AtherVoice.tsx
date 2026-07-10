'use client'

import { useState, useCallback } from 'react'

interface VoiceState {
  ttsEnabled: boolean
  listening: boolean
  speaking: boolean
}

export function useAtherVoice(onTranscript: (transcript: string) => void) {
  const [voiceState, setVoiceState] = useState<VoiceState>({
    ttsEnabled: false,
    listening: false,
    speaking: false,
  })

  const speak = useCallback((text: string) => {
    if (!voiceState.ttsEnabled) return
    setVoiceState(prev => ({ ...prev, speaking: true }))
    // Simulate TTS
    setTimeout(() => {
      setVoiceState(prev => ({ ...prev, speaking: false }))
    }, 2000)
  }, [voiceState.ttsEnabled])

  const stopSpeaking = useCallback(() => {
    setVoiceState(prev => ({ ...prev, speaking: false }))
  }, [])

  const toggleTTS = useCallback(() => {
    setVoiceState(prev => ({ ...prev, ttsEnabled: !prev.ttsEnabled }))
  }, [])

  const startListening = useCallback(() => {
    setVoiceState(prev => ({ ...prev, listening: true }))
    // Simulate speech recognition
    setTimeout(() => {
      onTranscript('Transcripción de voz simulada')
      setVoiceState(prev => ({ ...prev, listening: false }))
    }, 3000)
  }, [onTranscript])

  const stopListening = useCallback(() => {
    setVoiceState(prev => ({ ...prev, listening: false }))
  }, [])

  return {
    voiceState,
    speak,
    stopSpeaking,
    toggleTTS,
    startListening,
    stopListening,
  }
}
