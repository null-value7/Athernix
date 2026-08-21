'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
export interface VoiceState {
  ttsEnabled:   boolean
  isSpeaking:   boolean
  isListening:  boolean
  transcript:   string
  supported:    { tts: boolean; stt: boolean }
}

// ── Helpers ────────────────────────────────────────────────────
function pickRoboticVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null

  const preferred = [
    'Google UK English Male',
    'Microsoft David',
    'Microsoft Mark',
    'Alex',
    'Google US English',
  ]
  for (const name of preferred) {
    const found = voices.find(v => v.name.includes(name))
    if (found) return found
  }
  return voices.find(v => v.lang.startsWith('es')) ?? voices[0]
}

// Limpia el texto para TTS: quita markdown, LaTeX, bloques de código.
// Se aplica ANTES de mandarlo tanto a ElevenLabs como al fallback del navegador
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

// Reproduce Web Speech API como Promise, para poder await-earlo igual que ElevenLabs.
function speakWithBrowserTTS(clean: string): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) return resolve()
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(clean)
    utterance.rate   = 0.92
    utterance.pitch  = 0.75
    utterance.volume = 1

    const voice = pickRoboticVoice()
    if (voice) utterance.voice = voice

    utterance.onend   = () => resolve()
    utterance.onerror = () => resolve() // no rompemos el flujo por un error de voz

    window.speechSynthesis.speak(utterance)
  })
}

// ── Hook principal ─────────────────────────────────────────────
export function useAtherVoice(onTranscript: (text: string) => void, voiceModeActive: boolean = false) {
  const [voiceState, setVoiceState] = useState<VoiceState>({
    ttsEnabled:  false,
    isSpeaking:  false,
    isListening: false,
    transcript:  '',
    supported:   { tts: false, stt: false },
  })

  const recognitionRef  = useRef<SpeechRecognition | null>(null)
  const audioRef        = useRef<HTMLAudioElement | null>(null)
  const audioUrlRef     = useRef<string | null>(null)
  const abortRef        = useRef<AbortController | null>(null)

  // ── Detectar soporte al montar ──────────────────────────────
  useEffect(() => {
    const tts = typeof window !== 'undefined' && 'speechSynthesis' in window
    const stt = typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    setVoiceState(s => ({ ...s, supported: { tts, stt } }))
  }, [])

  // Limpieza de un audio de ElevenLabs previo (si lo hay) antes de reproducir uno nuevo
  const cleanupAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.onended = null
      audioRef.current.onerror = null
      audioRef.current = null
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current)
      audioUrlRef.current = null
    }
  }, [])

  // ── TTS: Ather habla (ElevenLabs primero, navegador como respaldo) ──
  const speak = useCallback((text: string): Promise<void> => {
    const clean = cleanForSpeech(text)
    if (!clean) return Promise.resolve()

    // Cancela cualquier audio/voz en curso antes de empezar uno nuevo
    cleanupAudio()
    window.speechSynthesis?.cancel()
    abortRef.current?.abort()

    const controller = new AbortController()
    abortRef.current = controller

    setVoiceState(s => ({ ...s, isSpeaking: true }))

    return fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: clean }),
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`TTS respondió ${res.status}`)
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        audioUrlRef.current = url

        const audio = new Audio(url)
        audioRef.current = audio

        return new Promise<void>((resolve, reject) => {
          audio.onended = () => resolve()
          audio.onerror = () => reject(new Error('Error reproduciendo audio de ElevenLabs'))
          audio.play().catch(reject)
        })
      })
      .catch((err) => {
        if (controller.signal.aborted) return // fue interrumpido a propósito, no es un fallo real
        console.warn('[speak] ElevenLabs falló, usando voz del navegador como respaldo:', err?.message ?? err)
        return speakWithBrowserTTS(clean)
      })
      .finally(() => {
        cleanupAudio()
        setVoiceState(s => ({ ...s, isSpeaking: false }))
      })
  }, [cleanupAudio])

  const stopSpeaking = useCallback(() => {
    abortRef.current?.abort()
    cleanupAudio()
    window.speechSynthesis?.cancel()
    setVoiceState(s => ({ ...s, isSpeaking: false }))
  }, [cleanupAudio])

  const toggleTTS = useCallback(() => {
    setVoiceState(s => {
      if (s.ttsEnabled) {
        abortRef.current?.abort()
        cleanupAudio()
        window.speechSynthesis?.cancel()
      }
      return { ...s, ttsEnabled: !s.ttsEnabled, isSpeaking: false }
    })
  }, [cleanupAudio])

  // ── STT: usuario habla (sin cambios, Web Speech API) ────────
  const startListening = useCallback(() => {
    if (voiceModeActive) return
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition
    if (!SR) return

    const recognition = new SR()
    recognition.lang = 'es-ES'
    recognition.interimResults = true
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
  }, [onTranscript, voiceModeActive])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setVoiceState(s => ({ ...s, isListening: false, transcript: '' }))
  }, [])

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      abortRef.current?.abort()
      cleanupAudio()
      window.speechSynthesis?.cancel()
      recognitionRef.current?.stop()
    }
  }, [cleanupAudio])

  return {
    voiceState,
    speak,
    stopSpeaking,
    toggleTTS,
    startListening,
    stopListening,
  }
}