// controller/useAltChatController.ts
'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useChat } from '@ai-sdk/react'
import {
  AltChatState, AltChatSession, AltChatMessage, initialAltChatState, parseAltStreamChunk, makeAltSessionTitle,
} from '@/models/AI/chatbot'


export function useAltChatController() {
  const [state, setState]   = useState<AltChatState>(initialAltChatState)
  const messagesEndRef       = useRef<HTMLDivElement>(null)
  const streamingTextRef     = useRef<string>('')

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 30)
  }, [])

  

  // ── Sidebar ───────────────────────────────────────────────
  const toggleSidebar = useCallback(() => {
    setState(s => ({ ...s, sidebarOpen: !s.sidebarOpen }))
  }, [])

  const closeSidebar = useCallback(() => {
    setState(s => ({ ...s, sidebarOpen: false }))
  }, [])

  // ── Load session ──────────────────────────────────────────
  const loadSession = useCallback((id: string) => {
    setState(s => {
      const session = s.sessions.find(x => x.id === id)
      if (!session) return s
      return {
        ...s,
        currentSession: id,
        messages:       session.msgs,
        hasMessages:    true,
        sidebarOpen:    false,
      }
    })
    scrollToBottom()
  }, [scrollToBottom])

  // ── New chat ──────────────────────────────────────────────
  const newChat = useCallback(() => {
    setState(s => ({
      ...s,
      currentSession: null,
      messages:       [],
      hasMessages:    false,
      input:          '',
      sidebarOpen:    false,
    }))
  }, [])

  // ── Input ─────────────────────────────────────────────────
  const setInput = useCallback((v: string) => {
    setState(s => ({ ...s, input: v }))
  }, [])

  // ── Send ──────────────────────────────────────────────────
  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    // Snapshot messages before state update
    let historySnapshot: AltChatMessage[] = []

    setState(s => {
      if (s.busy) return s
      historySnapshot = [...s.messages, { role: 'user' as const, text: trimmed }]
      return {
        ...s,
        busy:        true,
        hasMessages: true,
        input:       '',
        messages:    historySnapshot,
      }
    })

    // Give setState a tick to flush
    await new Promise<void>(r => setTimeout(r, 0))
    scrollToBottom()

    // Re-read snapshot from ref since setState is async
    setState(s => { historySnapshot = s.messages; return s })
    await new Promise<void>(r => setTimeout(r, 0))

    try {
      const res = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historySnapshot.map(m => ({
            role:    m.role === 'ai' ? 'assistant' : m.role,
            content: m.text,
          })),
        }),
      })

      if (!res.ok || !res.body) throw new Error('API error')

      // Append empty AI bubble that we'll stream into
      streamingTextRef.current = ''
      setState(s => ({
        ...s,
        messages: [...s.messages, { role: 'ai', text: '' }],
      }))
      scrollToBottom()

      const reader  = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        for (const line of chunk.split('\n')) {
          const delta = parseAltStreamChunk(line)
          if (delta) {
            streamingTextRef.current += delta
            const captured = streamingTextRef.current
            setState(s => {
              const msgs = [...s.messages]
              msgs[msgs.length - 1] = { role: 'ai', text: captured }
              return { ...s, messages: msgs }
            })
            scrollToBottom()
          }
        }
      }

      const finalText = streamingTextRef.current || 'Respuesta recibida del núcleo Ather.'

      // Persist to session
      setState(s => {
        const updatedMsgs: AltChatMessage[] = [
          ...s.messages.slice(0, -1),
          { role: 'ai', text: finalText },
        ]
        let sessions       = [...s.sessions]
        let currentSession = s.currentSession

        if (!currentSession) {
          const newSess: AltChatSession = {
            id:    's' + Date.now(),
            title: makeAltSessionTitle(trimmed),
            date:  'Ahora',
            msgs:  updatedMsgs,
          }
          sessions       = [newSess, ...sessions]
          currentSession = newSess.id
        } else {
          sessions = sessions.map(sess =>
            sess.id === currentSession ? { ...sess, msgs: updatedMsgs } : sess
          )
        }

        return { ...s, busy: false, sessions, currentSession, messages: updatedMsgs }
      })

    } catch {
      setState(s => ({
        ...s,
        busy:     false,
        messages: [
          ...s.messages,
          { role: 'ai', text: 'El enlace neural ha sido interrumpido. Verifica la conexión con /api/chat.' },
        ],
      }))
    }

    scrollToBottom()
  }, [scrollToBottom])

  // ── Key handler ───────────────────────────────────────────
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(state.input)
    }
  }, [state.input, sendMessage])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(state.input)
  }, [state.input, sendMessage])

  return {
    state,
    messagesEndRef,
    toggleSidebar,
    closeSidebar,
    loadSession,
    newChat,
    setInput,
    sendMessage,
    handleKeyDown,
    handleSubmit,
  }
}