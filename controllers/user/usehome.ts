// controller/useHomeController.ts
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  HomeState,
  initialHomeState,
  fetchHomeUser,
  ACHIEVEMENTS,
  NEWS_ITEMS,
  EXPLORE_CARDS,
  getFirstName,
  getGreeting,
  getTotalXP,
} from '@/models/useHome'

export function useHomeController() {
  const [state, setState] = useState<HomeState>(initialHomeState)
  const carouselTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── Load user ─────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const user = await fetchHomeUser()
      if (cancelled) return
      setState(s => ({ ...s, isLoading: false, user }))
    })()
    return () => { cancelled = true }
  }, [])

  // ── News auto-advance ─────────────────────────────────────
  useEffect(() => {
    if (state.expandedNews) return // pause when reading
    carouselTimer.current = setInterval(() => {
      setState(s => ({
        ...s,
        activeNews: (s.activeNews + 1) % NEWS_ITEMS.length,
      }))
    }, 5000)
    return () => {
      if (carouselTimer.current) clearInterval(carouselTimer.current)
    }
  }, [state.expandedNews])

  // ── Carousel controls ─────────────────────────────────────
  const goToNews = useCallback((index: number) => {
    if (carouselTimer.current) clearInterval(carouselTimer.current)
    setState(s => ({ ...s, activeNews: index, expandedNews: null }))
  }, [])

  const prevNews = useCallback(() => {
    if (carouselTimer.current) clearInterval(carouselTimer.current)
    setState(s => ({
      ...s,
      activeNews: (s.activeNews - 1 + NEWS_ITEMS.length) % NEWS_ITEMS.length,
      expandedNews: null,
    }))
  }, [])

  const nextNews = useCallback(() => {
    if (carouselTimer.current) clearInterval(carouselTimer.current)
    setState(s => ({
      ...s,
      activeNews: (s.activeNews + 1) % NEWS_ITEMS.length,
      expandedNews: null,
    }))
  }, [])

  const toggleNews = useCallback((id: string) => {
    setState(s => ({
      ...s,
      expandedNews: s.expandedNews === id ? null : id,
    }))
  }, [])

  // ── Derived data ──────────────────────────────────────────
  const firstName  = getFirstName(state.user)
  const greeting   = getGreeting()
  const totalXP    = getTotalXP(ACHIEVEMENTS)
  const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length

  return {
    state,
    firstName,
    greeting,
    totalXP,
    unlockedCount,
    achievements: ACHIEVEMENTS,
    newsItems:    NEWS_ITEMS,
    exploreCards: EXPLORE_CARDS,
    goToNews,
    prevNews,
    nextNews,
    toggleNews,
  }
}