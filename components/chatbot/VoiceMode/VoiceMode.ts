// components/chatbot/VoiceMode/VoiceMode.ts
// grabar → Groq Whisper STT → LLM (texto plano) → Web Speech TTS
// se cancela el TTS y se graba al usuario cuando se interrumpe.

'use client'

import { useCallback, useRef, useState } from 'react'

// ── Tipos ──────────────────────────────────────────────────────
export type VoiceTurn = 'idle' | 'listening' | 'processing' | 'speaking'

export interface VoiceModeState {
  active:      boolean
  turn:        VoiceTurn
  transcript:  string
  response:    string
  error:       string | null
}

// ── Helpers ────────────────────────────────────────────────────
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

function pickRoboticVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null
  const preferred = ['Google UK English Male', 'Microsoft David', 'Microsoft Mark', 'Alex']
  for (const name of preferred) {
    const v = voices.find(v => v.name.includes(name))
    if (v) return v
  }
  return voices.find(v => v.lang.startsWith('es')) ?? voices[0]
}

// ── Hook ───────────────────────────────────────────────────────
export function useVoiceMode(
  onMessage: (role: 'user' | 'ai', text: string) => void
) {
  const [state, setState] = useState<VoiceModeState>({
    active:     false,
    turn:       'idle',
    transcript: '',
    response:   '',
    error:      null,
  })

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef        = useRef<Blob[]>([])
  const streamRef        = useRef<MediaStream | null>(null)
  const silenceTimer     = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef         = useRef(false)
  const audioRef         = useRef<HTMLAudioElement | null>(null)
  const audioUrlRef      = useRef<string | null>(null)

  // Corta cualquier audio de ElevenLabs en curso (usado por closeVoiceMode,
  // interrupt y antes de reproducir uno nuevo). Debe ir ANTES de cualquier
  // useCallback que la referencie en su deps array.
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

  const openVoiceMode = useCallback(() => {
    abortRef.current = false
    setState(s => ({ ...s, active: true, turn: 'idle', error: null }))
  }, [])

  const closeVoiceMode = useCallback(() => {
    abortRef.current = true
    window.speechSynthesis?.cancel()
    cleanupAudio()
    mediaRecorderRef.current?.stop()
    streamRef.current?.getTracks().forEach(t => t.stop())
    if (silenceTimer.current) clearTimeout(silenceTimer.current)
    setState(s => ({ ...s, active: false, turn: 'idle' }))
  }, [cleanupAudio])

  // ElevenLabs primero (misma voz que el resto de Ather); si falla,
  // cae automáticamente a la voz sintética del navegador.
  const speak = useCallback((text: string, onEnd: () => void) => {
    const clean = cleanForSpeech(text)
    if (!clean) { onEnd(); return }

    cleanupAudio()
    window.speechSynthesis?.cancel()

    setState(s => ({ ...s, turn: 'speaking' }))

    fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: clean }),
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
        console.warn('[VoiceMode] ElevenLabs falló, usando voz del navegador:', err?.message ?? err)
        return new Promise<void>((resolve) => {
          const utt   = new SpeechSynthesisUtterance(clean)
          utt.rate    = 0.9
          utt.pitch   = 0.7
          utt.volume  = 1
          const voice = pickRoboticVoice()
          if (voice) utt.voice = voice
          utt.onend   = () => resolve()
          utt.onerror = () => resolve()
          window.speechSynthesis.speak(utt)
        })
      })
      .finally(() => {
        cleanupAudio()
        if (!abortRef.current) onEnd()
      })
  }, [cleanupAudio])

  const startRecording = useCallback(async () => {
    if (abortRef.current) return
    setState(s => ({ ...s, turn: 'listening', transcript: '' }))

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current  = stream
      chunksRef.current  = []

      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      mediaRecorderRef.current = recorder

      recorder.ondataavailable = e => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        if (abortRef.current) return

        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        await transcribeAndRespond(blob)
      }

      recorder.start()

      silenceTimer.current = setTimeout(() => {
        if (recorder.state === 'recording') recorder.stop()
      }, 8000)

    } catch {
      setState(s => ({ ...s, error: 'No se pudo acceder al micrófono.', turn: 'idle' }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Transcribir + llamar al LLM (texto plano, sin parseo de protocolo) ──
  const transcribeAndRespond = useCallback(async (blob: Blob) => {
    if (abortRef.current) return
    setState(s => ({ ...s, turn: 'processing' }))

    try {
      // 1. Groq Whisper STT
      const form = new FormData()
      form.append('audio', blob, 'recording.webm')
      const sttRes  = await fetch('/api/transcribe', { method: 'POST', body: form })
      const sttData = await sttRes.json()
      const userText: string = sttData.text ?? ''

      if (!userText.trim() || abortRef.current) {
        setState(s => ({ ...s, turn: 'idle' }))
        return
      }

      // Limpiamos la ronda anterior ANTES de pedir la nueva respuesta,
      // así si algo falla no se queda pegado el estado viejo en pantalla.
      setState(s => ({ ...s, transcript: userText, response: '', error: null }))
      onMessage('user', userText)

      // 2. LLM — endpoint dedicado de texto plano (sin tools, sin framing UIMessage)
      const chatRes = await fetch('/api/voice-chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ text: userText }),
      })

      if (!chatRes.ok || !chatRes.body) throw new Error('LLM error')

      const reader  = chatRes.body.getReader()
      const decoder = new TextDecoder()
      let aiText    = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        aiText += decoder.decode(value, { stream: true })
      }

      if (abortRef.current) return

      const cleanAI = aiText.trim()
      if (!cleanAI) {
        setState(s => ({ ...s, turn: 'idle', error: 'Ather no generó respuesta. Intenta de nuevo.' }))
        return
      }

      setState(s => ({ ...s, response: cleanAI }))
      onMessage('ai', cleanAI)

      // 3. TTS
      speak(cleanAI, () => {
        if (!abortRef.current) startRecording()
      })

    } catch (err) {
      console.error('[voiceMode]', err)
      setState(s => ({ ...s, error: 'Error en la conexión neural.', turn: 'idle' }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onMessage, speak])

  const interrupt = useCallback(() => {
    window.speechSynthesis?.cancel()
    cleanupAudio()
    if (silenceTimer.current) clearTimeout(silenceTimer.current)
    startRecording()
  }, [startRecording, cleanupAudio])

  const startVoiceCycle = useCallback(() => {
    abortRef.current = false
    startRecording()
  }, [startRecording])

  return {
    state,
    openVoiceMode,
    closeVoiceMode,
    startVoiceCycle,
    interrupt,
  }
}