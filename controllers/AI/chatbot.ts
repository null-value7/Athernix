'use client'

import { useCallback, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, isTextUIPart } from 'ai'
import { makeAltSessionTitle, AltChatSession } from '@/models/AI/chatbot'

// ── Helper: extrae texto de parts usando helper oficial del SDK ─
function getText(parts: any[]): string {
  return parts?.find(isTextUIPart)?.text ?? ''
}

// ── Sidebar / session state ───────────────────────────────────
interface SidebarState {
  sessions:       AltChatSession[]
  currentSession: string | null
  sidebarOpen:    boolean
}

const initialSidebar: SidebarState = {
  sessions: [
    {
      id: 's1', title: 'Historia VR · Joya de Cerén', date: 'Hoy',
      msgs: [
        { role: 'user', text: '¿Qué puedo ver en el tour de Joya de Cerén?' },
        { role: 'ai',   text: 'En el tour virtual de Joya de Cerén encontrarás reconstrucciones detalladas de las estructuras mayas, incluyendo hogares, depósitos de alimentos y la milpa. Todo en resolución 8K con guía IA multilingüe.' },
      ],
    },
    {
      id: 's2', title: 'Terapia XR · Biofeedback', date: 'Ayer',
      msgs: [
        { role: 'user', text: '¿Cómo funciona el biofeedback en MenteLibre?' },
        { role: 'ai',   text: 'El sistema XR monitorea tus señales fisiológicas en tiempo real y adapta el entorno virtual para reducir el estrés. Estudios muestran -40% en ansiedad tras 3 sesiones.' },
      ],
    },
    {
      id: 's3', title: 'STEM · Física Cuántica', date: 'Hace 3 días',
      msgs: [
        { role: 'user', text: 'Explícame el entrelazamiento cuántico' },
        { role: 'ai',   text: 'El entrelazamiento cuántico es un fenómeno donde dos partículas comparten estado cuántico sin importar la distancia. En QuantumLab puedes simularlo con pares EPR interactivos.' },
      ],
    },
  ],
  currentSession: null,
  sidebarOpen:    false,
}

export function useAltChatController() {
  const [sidebar, setSidebar] = useState<SidebarState>(initialSidebar)
  // AI SDK v6: input ya no viene de useChat — se maneja localmente
  const [input, setInput]     = useState('')
  const messagesEndRef         = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 30)
  }, [])

  // ── useChat (AI SDK v6) ───────────────────────────────────
  // onFinish recibe { message, messages } — usamos messages para tener la lista completa
  const { messages, status, setMessages, sendMessage: sdkSend } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    onFinish: ({ messages: finishedMsgs }) => {
      setSidebar(s => {
        const allMsgs = finishedMsgs
          .filter(m => m.role === 'user' || m.role === 'assistant')
          .map(m => ({
            role: (m.role === 'assistant' ? 'ai' : 'user') as 'user' | 'ai',
            text: getText(m.parts as any[]),
          }))
          .filter(m => m.text.length > 0)

        let sessions       = [...s.sessions]
        let currentSession = s.currentSession

        if (!currentSession) {
          const firstUser  = finishedMsgs.find(m => m.role === 'user')
          const titleText  = getText((firstUser?.parts ?? []) as any[]) || 'Nueva sesión'
          const newSess: AltChatSession = {
            id:    's' + Date.now(),
            title: makeAltSessionTitle(titleText),
            date:  'Ahora',
            msgs:  allMsgs,
          }
          sessions       = [newSess, ...sessions.slice(0, 9)]
          currentSession = newSess.id
        } else {
          sessions = sessions.map(sess =>
            sess.id === currentSession ? { ...sess, msgs: allMsgs } : sess
          )
        }
        return { ...s, sessions, currentSession }
      })
      scrollToBottom()
    },
  })

  const busy = status === 'streaming' || status === 'submitted'

  // ── Sidebar controls ──────────────────────────────────────
  const toggleSidebar = useCallback(() => {
    setSidebar(s => ({ ...s, sidebarOpen: !s.sidebarOpen }))
  }, [])

  const newChat = useCallback(() => {
    setMessages([])
    setInput('')
    setSidebar(s => ({ ...s, currentSession: null, sidebarOpen: false }))
  }, [setMessages])

  const loadSession = useCallback((id: string) => {
    setSidebar(s => {
      const session = s.sessions.find(x => x.id === id)
      if (!session) return { ...s, sidebarOpen: false }
      setMessages(session.msgs.map((m, i) => ({
        id:        String(i),
        role:      (m.role === 'ai' ? 'assistant' : 'user') as 'assistant' | 'user',
        parts:     [{ type: 'text' as const, text: m.text }],
        createdAt: new Date(),
      })))
      return { ...s, currentSession: id, sidebarOpen: false }
    })
    scrollToBottom()
  }, [setMessages, scrollToBottom])

  // ── Send ──────────────────────────────────────────────────
  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed || busy) return
    sdkSend({ text: trimmed })
    setInput('')
    scrollToBottom()
  }, [busy, sdkSend, scrollToBottom])

  // ── Form / key handlers ───────────────────────────────────
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }, [input, sendMessage])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }, [input, sendMessage])

  // ── Convertir SDK messages → formato de la view ───────────
  // NO filtramos texto vacío — mensajes vacíos muestran TypingDots durante streaming
  const altMessages = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({
      role: (m.role === 'assistant' ? 'ai' : 'user') as 'user' | 'ai',
      text: getText(m.parts as any[]),
    }))

  const state = {
    sessions:       sidebar.sessions,
    currentSession: sidebar.currentSession,
    messages:       altMessages,
    input,
    busy,
    sidebarOpen:    sidebar.sidebarOpen,
    hasMessages:    altMessages.length > 0,
  }

  return {
    state,
    messagesEndRef,
    toggleSidebar,
    newChat,
    loadSession,
    setInput,
    sendMessage,
    handleKeyDown,
    handleSubmit,
  }
}