'use client'

// ── Controlador del Jardín Zen (MVC) ─────────────────────────────
import { useMemo, useState, useCallback } from 'react'
import { ZEN_POINTS, type ZenPointInfo } from '@/models/zen'

export function useZenController() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const selected: ZenPointInfo | null = useMemo(
    () => ZEN_POINTS.find(p => p.id === selectedId) ?? null,
    [selectedId]
  )

  /** Selecciona un punto; volver a tocarlo lo deselecciona (vista libre) */
  const select = useCallback((id: string | null) => {
    setSelectedId(prev => (prev === id ? null : id))
  }, [])

  const clearSelection = useCallback(() => setSelectedId(null), [])

  return {
    points: ZEN_POINTS,
    selected,
    selectedId,
    hoveredId,
    select,
    setHoveredId,
    clearSelection,
  }
}
