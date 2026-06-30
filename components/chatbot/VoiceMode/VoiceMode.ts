// grabar → Groq Whisper STT → LLM → Web Speech TTS
// se cancela el TTS y se graba al usuario cuando se interrumpe.

'use client'

import { useCallback, useRef, useState } from 'react'

// ── Tipos ──────────────────────────────────────────────────────
export type VoiceTurn = 'idle' | 'listening' | 'processing' | 'speaking'

export interface VoiceModeState {
  active:      boolean      // overlay abierto
  turn:        VoiceTurn    // estado actual del ciclo
  transcript:  string       // último texto del usuario
  response:    string       // última respuesta de Ather
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
  // Callback para agregar mensajes al historial del chat principal
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

  // ── Abrir/cerrar overlay ────────────────────────────────────
  const openVoiceMode = useCallback(() => {
    abortRef.current = false
    setState(s => ({ ...s, active: true, turn: 'idle', error: null }))
  }, [])

  const closeVoiceMode = useCallback(() => {
    abortRef.current = true
    window.speechSynthesis?.cancel()
    mediaRecorderRef.current?.stop()
    streamRef.current?.getTracks().forEach(t => t.stop())
    if (silenceTimer.current) clearTimeout(silenceTimer.current)
    setState(s => ({ ...s, active: false, turn: 'idle' }))
  }, [])

  // ── TTS: Ather habla ────────────────────────────────────────
  const speak = useCallback((text: string, onEnd: () => void) => {
    if (!('speechSynthesis' in window)) { onEnd(); return }
    window.speechSynthesis.cancel()

    const clean = cleanForSpeech(text)
    if (!clean) { onEnd(); return }

    const utt    = new SpeechSynthesisUtterance(clean)
    utt.rate     = 0.9
    utt.pitch    = 0.7
    utt.volume   = 1
    const voice  = pickRoboticVoice()
    if (voice) utt.voice = voice

    utt.onstart = () => setState(s => ({ ...s, turn: 'speaking' }))
    utt.onend   = () => { if (!abortRef.current) onEnd() }
    utt.onerror = () => { if (!abortRef.current) onEnd() }

    window.speechSynthesis.speak(utt)
  }, [])

  // ── Grabar audio del usuario ────────────────────────────────
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

      // Detener automáticamente después de 8s de silencio
      // (el usuario puede interrumpir manualmente tocando el orb)
      silenceTimer.current = setTimeout(() => {
        if (recorder.state === 'recording') recorder.stop()
      }, 8000)

    } catch {
      setState(s => ({ ...s, error: 'No se pudo acceder al micrófono.', turn: 'idle' }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Transcribir + llamar al LLM ─────────────────────────────
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

      setState(s => ({ ...s, transcript: userText }))
      onMessage('user', userText)

      // 2. LLM (reutiliza /api/chat)
      const chatRes = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          messages: [{
            id:    crypto.randomUUID(),
            role:  'user',
            parts: [{ type: 'text', text: userText }],
          }],
        }),
      })

      if (!chatRes.ok || !chatRes.body) throw new Error('LLM error')

      // Leer el stream de texto
      const reader  = chatRes.body.getReader()
      const decoder = new TextDecoder()
      let aiText    = ''
      let buffer    = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        const lines = buffer.split('\n')
        buffer = lines.pop() ?? '' // guardar línea incompleta para el próximo chunk

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const json = line.slice(6).trim()
          if (json === '[DONE]') continue
          try {
            const parsed = JSON.parse(json)
            if (parsed.type === 'text-delta' && parsed.delta) {
              aiText += parsed.delta
            }
          } catch {
            // ignorar líneas que no son JSON válido
          }
        }
      }

      if (abortRef.current) return

      const cleanAI = aiText.trim()

      setState(s => ({ ...s, response: cleanAI }))
      onMessage('ai', cleanAI)

      // 3. TTS → al terminar, volver a escuchar (turno del usuario)
      speak(cleanAI, () => {
        if (!abortRef.current) startRecording()
      })

    } catch (err) {
      console.error('[voiceMode]', err)
      setState(s => ({ ...s, error: 'Error en la conexión neural.', turn: 'idle' }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onMessage, speak])

  // ── Interrupción: usuario corta a Ather ─────────────────────
  const interrupt = useCallback(() => {
    window.speechSynthesis?.cancel()
    if (silenceTimer.current) clearTimeout(silenceTimer.current)
    startRecording()
  }, [startRecording])

  // ── Iniciar ciclo de voz ────────────────────────────────────
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