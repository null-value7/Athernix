// controller/useAboutController.ts
'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  BRAND, CORE_VALUES, MODULES, MILESTONES,
  ROLE_CARDS, STAT_FACTS, FUTURE_VISIONS, ATHER_INFO,
} from '@/models/aboutus'

export interface AboutState {
  activeModule:  string | null
  activeMilestone: number | null
}

const initialState: AboutState = {
  activeModule:    null,
  activeMilestone: null,
}

export function useAboutController() {
  const router = useRouter()
  const [state, setState] = useState<AboutState>(initialState)

  const toggleModule = useCallback((id: string) => {
    setState(s => ({ ...s, activeModule: s.activeModule === id ? null : id }))
  }, [])

  const setActiveMilestone = useCallback((index: number | null) => {
    setState(s => ({ ...s, activeMilestone: index }))
  }, [])

  const goToChat = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ather_prefill_prompt', '¿Qué es Athernix y qué puedo aprender aquí?')
    }
    router.push('/chatbot')
  }, [router])

  const goToZonaDesarrollo = useCallback(() => {
    router.push('/development')
  }, [router])

  return {
    state,
    brand:          BRAND,
    values:         CORE_VALUES,
    modules:        MODULES,
    milestones:     MILESTONES,
    roles:          ROLE_CARDS,
    stats:          STAT_FACTS,
    futureVisions:  FUTURE_VISIONS,
    ather:          ATHER_INFO,
    toggleModule,
    setActiveMilestone,
    goToChat,
    goToZonaDesarrollo,
  }
}