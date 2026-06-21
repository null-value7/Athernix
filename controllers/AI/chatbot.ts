'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, isTextUIPart } from 'ai'
import {
  makeAltSessionTitle,
  AltChatSession,
  fetchUserSessions,
  fetchSessionMessages,
  createChatSession,
  insertChatMessage,
  formatRelativeDate,
} from '@/models/AI/chatbot'

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
  sessions:       [],
  currentSession: null,
  sidebarOpen:    false,
}

export function useAltChatController() {
  const [sidebar, setSidebar] = useState<SidebarState>(initialSidebar)
  const [input, setInput]     = useState('')
  const messagesEndRef         = useRef<HTMLDivElement>(null)

  // Ref con el id de sesión actual — necesario porque onFinish
  // es un closure que puede quedar con un valor stale de state.
  const currentSessionRef = useRef<string | null>(null)

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 30)
  }, [])

  // ── Cargar historial real desde Supabase al montar ────────
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const sessions = await fetchUserSessions()
      if (!cancelled) {
        setSidebar(s => ({ ...s, sessions }))
      }
    })()
    return () => { cancelled = true }
  }, [])

  // ── useChat (AI SDK v6) ───────────────────────────────────
  const { messages, status, setMessages, sendMessage: sdkSend } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),

    // Se dispara al terminar el streaming de cada respuesta.
    // Aquí persistimos en Supabase: user + assistant.
    onFinish: async ({ message, messages: finishedMsgs }) => {
      const userMsg      = [...finishedMsgs].reverse().find(m => m.role === 'user')
      const userText      = getText((userMsg?.parts ?? []) as any[])
      const assistantText = getText(message.parts as any[])

      let sessionId = currentSessionRef.current

      // 1. Si no hay sesión activa, crearla en Supabase ahora
      if (!sessionId) {
        const created = await createChatSession(makeAltSessionTitle(userText || 'Nueva sesión'))
        if (created) {
          sessionId = created.id
          currentSessionRef.current = sessionId
        }
      }

      // 2. Persistir ambos mensajes (si hay sesión válida)
      if (sessionId) {
        if (userText)      await insertChatMessage(sessionId, 'user', userText)
        if (assistantText) await insertChatMessage(sessionId, 'assistant', assistantText)
      }

      // 3. Actualizar UI del sidebar
      const allMsgs = finishedMsgs
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({
          role: (m.role === 'assistant' ? 'ai' : 'user') as 'user' | 'ai',
          text: getText(m.parts as any[]),
        }))
        .filter(m => m.text.length > 0)

      setSidebar(s => {
        let sessions = [...s.sessions]
        const exists = sessionId && sessions.some(sess => sess.id === sessionId)

        if (sessionId && !exists) {
          const newSess: AltChatSession = {
            id:    sessionId,
            title: makeAltSessionTitle(userText || 'Nueva sesión'),
            date:  'Ahora',
            msgs:  allMsgs,
          }
          sessions = [newSess, ...sessions]
        } else if (sessionId) {
          sessions = sessions.map(sess =>
            sess.id === sessionId
              ? { ...sess, msgs: allMsgs, date: 'Ahora' }
              : sess
          )
        }

        return { ...s, sessions, currentSession: sessionId }
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
    currentSessionRef.current = null
    setSidebar(s => ({ ...s, currentSession: null, sidebarOpen: false }))
  }, [setMessages])

  // ── Cargar una sesión pasada — ahora lee de Supabase ───────
  const loadSession = useCallback(async (id: string) => {
    const msgs = await fetchSessionMessages(id)

    setMessages(msgs.map((m, i) => ({
      id:        `${id}-${i}`,
      role:      (m.role === 'ai' ? 'assistant' : 'user') as 'assistant' | 'user',
      parts:     [{ type: 'text' as const, text: m.text }],
      createdAt: new Date(),
    })))

    currentSessionRef.current = id
    setSidebar(s => ({ ...s, currentSession: id, sidebarOpen: false }))
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