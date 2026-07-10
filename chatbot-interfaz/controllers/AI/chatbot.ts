'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { ALT_QUICK_PROMPTS, AltChatMessage } from '@/models/AI/chatbot'

export function useAltChatController() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sessions, setSessions] = useState([
    { id: '1', title: 'Sesión Inicial', date: 'Hoy' },
    { id: '2', title: 'Análisis Vectorial', date: 'Ayer' },
  ])
  const [currentSession, setCurrentSession] = useState('1')
  const [messages, setMessages] = useState<AltChatMessage[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev)
  }, [])

  const loadSession = useCallback((id: string) => {
    setCurrentSession(id)
    // In a real app, load messages from storage
    setMessages([])
  }, [])

  const newChat = useCallback(() => {
    const newId = String(Date.now())
    setSessions(prev => [{ id: newId, title: 'Nueva Sesión', date: 'Hoy' }, ...prev])
    setCurrentSession(newId)
    setMessages([])
  }, [])

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return

    const userMsg: AltChatMessage = {
      role: 'user',
      text,
      timestamp: Date.now(),
    }

    setMessages(prev => [...prev, userMsg])
    setBusy(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: AltChatMessage = {
        role: 'ai',
        text: `Respuesta simulada para: "${text}". En una implementación real, esto se conectaría a la API de Ather.`,
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, aiMsg])
      setBusy(false)
    }, 1500)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !busy) {
      sendMessage(input)
      setInput('')
    }
  }, [input, busy, sendMessage])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return {
    state: { sidebarOpen, sessions, currentSession, messages, input, busy },
    messagesEndRef,
    toggleSidebar,
    loadSession,
    newChat,
    setInput,
    sendMessage,
    handleKeyDown,
    handleSubmit,
  }
}
