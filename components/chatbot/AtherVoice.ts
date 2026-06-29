// hooks/useAtherVoice.ts
// TTS + STT con Web Speech API (nativo, gratis, sin dependencias)
// TTS: Ather habla al recibir un mensaje
// STT: el usuario puede hablarle a Ather

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// ── Tipos ──────────────────────────────────────────────────────
export interface VoiceState {
  ttsEnabled:   boolean   // si Ather habla automáticamente
  isSpeaking:   boolean   // Ather está hablando ahora
  isListening:  boolean   // micrófono activo
  transcript:   string    // texto capturado por STT (parcial)
  supported:    { tts: boolean; stt: boolean }
}

// ── Helpers ────────────────────────────────────────────────────

// Filtra la voz más robótica/sintética disponible en el OS
function pickRoboticVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null

  // Prioridad: voces sintéticas conocidas por sonar robóticas
  const preferred = [
    'Google UK English Male',
    'Microsoft David',
    'Microsoft Mark',
    'Alex',                 // macOS
    'Google US English',
  ]
  for (const name of preferred) {
    const found = voices.find(v => v.name.includes(name))
    if (found) return found
  }
  // Fallback: primera voz en inglés disponible
  return voices.find(v => v.lang.startsWith('es')) ?? voices[0]
}

// Limpia el texto para TTS: quita markdown, LaTeX, bloques de código
function cleanForSpeech(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, 'bloque de código omitido.')
    .replace(/\$\$[\s\S]*?\$\$/g, 'fórmula matemática.')
    .replace(/\$[^$]+\$/g, 'expresión matemática.')
    .replace(/[*_`#>~]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

// ── Hook principal ─────────────────────────────────────────────
export function useAtherVoice(onTranscript: (text: string) => void) {
  const [voiceState, setVoiceState] = useState<VoiceState>({
    ttsEnabled:  false,
    isSpeaking:  false,
    isListening: false,
    transcript:  '',
    supported:   { tts: false, stt: false },
  })

  const recognitionRef = useRef<any>(null)
  const utteranceRef   = useRef<SpeechSynthesisUtterance | null>(null)

  // ── Detectar soporte al montar ──────────────────────────────
  useEffect(() => {
    const tts = typeof window !== 'undefined' && 'speechSynthesis' in window
    const stt = typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    setVoiceState(s => ({ ...s, supported: { tts, stt } }))
  }, [])

  // ── TTS: Ather habla ────────────────────────────────────────
  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel() // cancela si ya estaba hablando

    const clean = cleanForSpeech(text)
    if (!clean) return

    const utterance = new SpeechSynthesisUtterance(clean)

    // Parámetros para sonar robótico
    utterance.rate   = 0.92   // un poco más lento que normal
    utterance.pitch  = 0.75   // tono grave = más robótico
    utterance.volume = 1

    // Asignar voz robótica si está disponible
    const voice = pickRoboticVoice()
    if (voice) utterance.voice = voice

    utterance.onstart = () => setVoiceState(s => ({ ...s, isSpeaking: true }))
    utterance.onend   = () => setVoiceState(s => ({ ...s, isSpeaking: false }))
    utterance.onerror = () => setVoiceState(s => ({ ...s, isSpeaking: false }))

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [])

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel()
    setVoiceState(s => ({ ...s, isSpeaking: false }))
  }, [])

  const toggleTTS = useCallback(() => {
    setVoiceState(s => {
      if (s.ttsEnabled) window.speechSynthesis?.cancel()
      return { ...s, ttsEnabled: !s.ttsEnabled, isSpeaking: false }
    })
  }, [])

  // ── STT: usuario habla ──────────────────────────────────────
  const startListening = useCallback(() => {
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
    if (!SR) return

    const recognition = new SR()
    recognition.lang           = 'es-ES'
    recognition.interimResults = true   // resultados parciales en tiempo real
    recognition.maxAlternatives = 1

    recognition.onstart = () =>
      setVoiceState(s => ({ ...s, isListening: true, transcript: '' }))

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      let interim = ''
      let final   = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript
        if (e.results[i].isFinal) final += t
        else interim += t
      }
      setVoiceState(s => ({ ...s, transcript: final || interim }))

      // Cuando hay resultado final, mandarlo como mensaje
      if (final.trim()) {
        onTranscript(final.trim())
        setVoiceState(s => ({ ...s, transcript: '' }))
      }
    }

    recognition.onerror = () =>
      setVoiceState(s => ({ ...s, isListening: false, transcript: '' }))

    recognition.onend = () =>
      setVoiceState(s => ({ ...s, isListening: false }))

    recognitionRef.current = recognition
    recognition.start()
  }, [onTranscript])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setVoiceState(s => ({ ...s, isListening: false, transcript: '' }))
  }, [])

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel()
      recognitionRef.current?.stop()
    }
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