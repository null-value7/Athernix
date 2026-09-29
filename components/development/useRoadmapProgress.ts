// components/development/useRoadmapProgress.ts
'use client'

import { useEffect, useMemo, useState } from 'react'
import { fetchNodeProgress, UserNodeProgressRow } from '@/models/AI/chatbot'

interface NodeLike {
  id: string
  prerequisites: string[]
  status: 'locked' | 'available' | 'completed'
}

// Resuelve el status real de cada nodo leyendo user_node_progress.
// - Sin sesión o mientras carga → conserva los status estáticos del modelo
//   (fallback público, no rompe la vista).
// - completed en DB → 'completed'.
// - needs_review → se trata como 'available' (re-intentable).
// - Resto: 'available' solo si TODOS sus prerequisitos están completados.
export function useRoadmapProgress<N extends NodeLike>(area: string, nodes: N[]): N[] {
  const [progress, setProgress] = useState<Record<string, UserNodeProgressRow> | null | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    fetchNodeProgress(area).then(m => { if (!cancelled) setProgress(m) })
    return () => { cancelled = true }
  }, [area])

  return useMemo(() => {
    if (progress == null) return nodes

    return nodes.map(n => {
      if (progress[n.id]?.status === 'completed') return { ...n, status: 'completed' as const }
      const prereqsDone = n.prerequisites.every(p => progress[p]?.status === 'completed')
      return { ...n, status: prereqsDone ? 'available' as const : 'locked' as const }
    })
  }, [nodes, progress])
}
