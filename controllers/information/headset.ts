// controllers/user/useheadsets.ts
'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  MyHeadsetState, initialMyHeadsetState, VRGlassesModel,
  fetchMyHeadset, updateMyHeadset, HEADSET_META, ATHERNIX_MODULES, getHeadsetMeta,
} from '@/models/headset';

export function useMyHeadsetsController() {
  const [state, setState]       = useState<MyHeadsetState>(initialMyHeadsetState)
  const [hoveredId, setHovered] = useState<string | null>(null)
  const [toast, setToast]       = useState<{ text: string; ok: boolean } | null>(null)

  const load = useCallback(async () => {
    setState(s => ({ ...s, loading: true }))
    const { model, setAt } = await fetchMyHeadset()
    setState(s => ({ ...s, loading: false, current: model, setAt }))
  }, [])

  useEffect(() => { load() }, [load])

  const selectHeadset = useCallback(async (model: VRGlassesModel) => {
    if (model === state.current) return
    setState(s => ({ ...s, saving: true }))
    const result = await updateMyHeadset(model)
    if (result.success) {
      setState(s => ({ ...s, saving: false, current: model, setAt: new Date().toISOString() }))
      setToast({ text: `Headset actualizado a ${getHeadsetMeta(model).label}`, ok: true })
    } else {
      setState(s => ({ ...s, saving: false }))
      setToast({ text: result.error ?? 'No se pudo actualizar tu headset', ok: false })
    }
    setTimeout(() => setToast(null), 3200)
  }, [state.current])

  const currentMeta = getHeadsetMeta(state.current)
  const models = (Object.keys(HEADSET_META) as VRGlassesModel[]).filter(id => id !== 'none')

  const compatibility = ATHERNIX_MODULES.map(m => ({
    ...m,
    compatible: state.current !== 'none' && m.supports.includes(currentMeta.type),
  }))

  return {
    state, hoveredId, setHovered, toast,
    currentMeta, models, compatibility,
    selectHeadset, reload: load,
  }
}