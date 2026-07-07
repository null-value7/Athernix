'use client'

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  PIPELINE_STAGES,
  HEADSET_ANATOMY,
  UNITY_HEADSETS,
  VR_TECH_INFO,
  initialVRTechState,
  type VRTechState,
} from '@/models/Vrtech';

export function useVRTechnologyController() {
  const router = useRouter()
  const [state, setState] = useState<VRTechState>(initialVRTechState)

  const toggleStage = useCallback((id: string) => {
    setState(s => ({ ...s, activeStage: s.activeStage === id ? null : id }))
  }, [])

  const toggleHeadset = useCallback((id: string) => {
    setState(s => ({ ...s, activeHeadset: s.activeHeadset === id ? null : id }))
  }, [])

  const goToModulos = useCallback(() => {
    router.push('/modulos')
  }, [router])

  const goToChat = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'ather_prefill_prompt',
        '¿Qué headset de VR me recomiendas para empezar a desarrollar en Unity?'
      )
    }
    router.push('/chatbot')
  }, [router])

  return {
    state,
    info:      VR_TECH_INFO,
    pipeline:  PIPELINE_STAGES,
    anatomy:   HEADSET_ANATOMY,
    headsets:  UNITY_HEADSETS,
    toggleStage,
    toggleHeadset,
    goToModulos,
    goToChat,
  }
}