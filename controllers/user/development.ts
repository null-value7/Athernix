// controller/useZonaDesarrolloController.ts
'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  DevZoneState,
  initialDevZoneState,
  STEM_AREAS,
  ROADMAP_CARDS,
  STEM_NEWS,
  STAT_CARDS,
  STEMTopic,
} from '@/models/development'
import { LearningContext } from '@/models/AI/chatbot'

export function useZonaDesarrolloController() {
  const router = useRouter()
  const [state, setState] = useState<DevZoneState>(initialDevZoneState)
  const areaRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // ── Toggle STEM area expansion ────────────────────────────
  const toggleArea = useCallback((id: string) => {
    setState(s => ({
      ...s,
      expandedAreas: { ...s.expandedAreas, [id]: !s.expandedAreas[id] },
    }))
  }, [])

  // ── Toggle topic expansion within area ────────────────────
  const toggleTopic = useCallback((id: string) => {
    setState(s => ({
      ...s,
      expandedTopics: { ...s.expandedTopics, [id]: !s.expandedTopics[id] },
    }))
  }, [])

  // ── Navigate to AI chat with pre-filled prompt ────────────
  // Uses sessionStorage so the chat page can read and pre-fill the input.
  // Si hay contexto de aprendizaje (nodo de roadmap, área, nivel) se guarda
  // como JSON { prompt, context } → el route lo inyecta al system prompt.
  const sendToChat = useCallback((prompt: string, context?: LearningContext) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'ather_prefill_prompt',
        context ? JSON.stringify({ prompt, context }) : prompt
      )
    }
    router.push('/chatbot')
  }, [router])

  // ── Search filter ─────────────────────────────────────────
  const setSearch = useCallback((q: string) => {
    setState(s => ({ ...s, searchQuery: q }))
  }, [])

  // ── Filtered areas based on search ────────────────────────
  const filteredAreas = state.searchQuery.trim()
    ? STEM_AREAS.filter(area =>
        area.area.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        area.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        area.topics.some(t => t.label.toLowerCase().includes(state.searchQuery.toLowerCase()))
      )
    : STEM_AREAS

  return {
    state,
    filteredAreas,
    roadmaps:   ROADMAP_CARDS,
    news:       STEM_NEWS,
    statCards:  STAT_CARDS,
    areaRefs,
    toggleArea,
    toggleTopic,
    sendToChat,
    setSearch,
  }
}