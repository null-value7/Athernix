// controllers/user/usehome.ts
'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  HomeState,
  Achievement,
  NewsItem,
  ExploreCard,
  StatBadge,
  AIGlassesModel,
  ACHIEVEMENTS,
  NEWS_ITEMS,
  EXPLORE_CARDS,
  STAT_BADGES,
  AI_GLASSES_MODELS,
} from '@/models/useHome'

// ── Controller hook ────────────────────────────────────────────

export function useHomeController() {
  const [state, setState] = useState<HomeState>({
    isLoading: false,
    activeNews: 0,
    expandedNews: null,
    activeGlassesId: 'ather-core',   // default model
    glassesHoverId: null,
  })

  // ── Derived ──────────────────────────────────────────────────
  const firstName       = 'Operador'   // replace with auth context
  const greeting        = getGreeting()
  const achievements    = ACHIEVEMENTS
  const newsItems       = NEWS_ITEMS
  const exploreCards    = EXPLORE_CARDS
  const statBadges      = STAT_BADGES
  const glassesModels   = AI_GLASSES_MODELS

  const totalXP = useMemo(
    () => achievements.filter(a => a.unlocked).reduce((s, a) => s + a.xp, 0),
    [achievements],
  )

  const unlockedCount = useMemo(
    () => achievements.filter(a => a.unlocked).length,
    [achievements],
  )

  const activeGlasses = useMemo(
    () => glassesModels.find(g => g.id === state.activeGlassesId) ?? glassesModels[1],
    [glassesModels, state.activeGlassesId],
  )

  // ── News actions ─────────────────────────────────────────────
  const prevNews = useCallback(() =>
    setState(s => ({ ...s, activeNews: (s.activeNews - 1 + newsItems.length) % newsItems.length, expandedNews: null }))
  , [newsItems.length])

  const nextNews = useCallback(() =>
    setState(s => ({ ...s, activeNews: (s.activeNews + 1) % newsItems.length, expandedNews: null }))
  , [newsItems.length])

  const goToNews = useCallback((i: number) =>
    setState(s => ({ ...s, activeNews: i, expandedNews: null }))
  , [])

  const toggleNews = useCallback((id: string) =>
    setState(s => ({ ...s, expandedNews: s.expandedNews === id ? null : id }))
  , [])

  // ── Glasses actions ──────────────────────────────────────────
  const selectGlasses = useCallback((id: string) => {
    const model = glassesModels.find(g => g.id === id)
    if (!model || model.locked) return
    setState(s => ({ ...s, activeGlassesId: id }))
  }, [glassesModels])

  const hoverGlasses = useCallback((id: string | null) =>
    setState(s => ({ ...s, glassesHoverId: id }))
  , [])

  return {
    state,
    firstName,
    greeting,
    totalXP,
    unlockedCount,
    activeGlasses,
    achievements,
    newsItems,
    exploreCards,
    statBadges,
    glassesModels,
    // actions
    prevNews,
    nextNews,
    goToNews,
    toggleNews,
    selectGlasses,
    hoverGlasses,
  }
}

// ── Helpers ────────────────────────────────────────────────────

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 5)  return 'Buenas noches'
  if (h < 12) return 'Buenos días'
  if (h < 18) return 'Buenas tardes'
  return 'Buenas noches'
}