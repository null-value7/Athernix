// controller/useAdminController.ts
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import {
  AdminState,
  AdminSection,
  AdminUser,
  UserRole,
  initialAdminState,
  fetchAdminStats,
  fetchUsers,
  fetchLogs,
  updateUserRole,
  toggleUserSuspend,
  PAGE_SIZE,
} from '@/models/Admin/dashboard'

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}

export function useAdminController() {
  const router               = useRouter()
  const [state, setState]    = useState<AdminState>(initialAdminState)
  const searchTimeout        = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Guard: verify admin role on mount ────────────────────
  useEffect(() => {
    ;(async () => {
      const supabase = getSupabase()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: profile } = await supabase
        .from('profiles').select('role').eq('id', user.id).single()
      if (profile?.role !== 'admin') { router.push('/dashboard'); return }
    })()
  }, [router])

  // ── Load data when section changes ────────────────────────
  useEffect(() => {
    const { section } = state
    if (section === 'overview') loadStats()
    if (section === 'users')    loadUsers(0, state.usersSearch)
    if (section === 'logs')     loadLogs(0, state.logsFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.section])

  // ── Stats ─────────────────────────────────────────────────
  const loadStats = useCallback(async () => {
    setState(s => ({ ...s, statsLoading: true }))
    const { stats, chart } = await fetchAdminStats()
    setState(s => ({ ...s, statsLoading: false, stats, chartData: chart }))
  }, [])

  // ── Users ─────────────────────────────────────────────────
  const loadUsers = useCallback(async (page: number, search: string) => {
    setState(s => ({ ...s, usersLoading: true }))
    const { users, total } = await fetchUsers(page, search)
    setState(s => ({ ...s, usersLoading: false, users, usersTotal: total, usersPage: page }))
  }, [])

  const handleUsersSearch = useCallback((v: string) => {
    setState(s => ({ ...s, usersSearch: v }))
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => loadUsers(0, v), 400)
  }, [loadUsers])

  const handleUsersPage = useCallback((page: number) => {
    loadUsers(page, state.usersSearch)
  }, [state.usersSearch, loadUsers])

  const openEditUser = useCallback((user: AdminUser) => {
    setState(s => ({ ...s, editUser: user, editRole: user.role }))
  }, [])

  const closeEditUser = useCallback(() => {
    setState(s => ({ ...s, editUser: null }))
  }, [])

  const setEditRole = useCallback((role: UserRole) => {
    setState(s => ({ ...s, editRole: role }))
  }, [])

  const handleSaveRole = useCallback(async () => {
    const { editUser, editRole } = state
    if (!editUser) return
    setState(s => ({ ...s, usersLoading: true }))
    const result = await updateUserRole(editUser.id, editRole)
    if (result.success) {
      setState(s => ({
        ...s,
        usersLoading: false,
        editUser: null,
        users: s.users.map(u => u.id === editUser.id ? { ...u, role: editRole } : u),
      }))
    } else {
      setState(s => ({ ...s, usersLoading: false }))
    }
  }, [state])

  const handleToggleSuspend = useCallback(async (user: AdminUser) => {
    const suspend = !user.suspended
    setState(s => ({ ...s, usersLoading: true }))
    const result = await toggleUserSuspend(user.id, suspend)
    if (result.success) {
      setState(s => ({
        ...s,
        usersLoading: false,
        users: s.users.map(u => u.id === user.id ? { ...u, suspended: suspend } : u),
      }))
    } else {
      setState(s => ({ ...s, usersLoading: false }))
    }
  }, [])

  // ── Logs ──────────────────────────────────────────────────
  const loadLogs = useCallback(async (page: number, filter: string) => {
    setState(s => ({ ...s, logsLoading: true }))
    const { logs, total } = await fetchLogs(page, filter)
    setState(s => ({ ...s, logsLoading: false, logs, logsTotal: total, logsPage: page }))
  }, [])

  const handleLogsFilter = useCallback((v: string) => {
    setState(s => ({ ...s, logsFilter: v }))
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => loadLogs(0, v), 400)
  }, [loadLogs])

  const handleLogsPage = useCallback((page: number) => {
    loadLogs(page, state.logsFilter)
  }, [state.logsFilter, loadLogs])

  // ── Navigation ────────────────────────────────────────────
  const setSection = useCallback((section: AdminSection) => {
    setState(s => ({ ...s, section }))
  }, [])

  const toggleSidebar = useCallback(() => {
    setState(s => ({ ...s, sidebarOpen: !s.sidebarOpen }))
  }, [])

  // ── Sign out ──────────────────────────────────────────────
  const handleSignOut = useCallback(async () => {
    const supabase = getSupabase()
    await supabase.auth.signOut()
    router.push('/login')
  }, [router])

  // ── Refresh current section ───────────────────────────────
  const handleRefresh = useCallback(() => {
    const { section } = state
    if (section === 'overview') loadStats()
    if (section === 'users')    loadUsers(state.usersPage, state.usersSearch)
    if (section === 'logs')     loadLogs(state.logsPage, state.logsFilter)
  }, [state, loadStats, loadUsers, loadLogs])

  const totalPages = (total: number) => Math.ceil(total / PAGE_SIZE)

  return {
    state,
    setSection,
    toggleSidebar,
    handleSignOut,
    handleRefresh,
    // users
    handleUsersSearch,
    handleUsersPage,
    openEditUser,
    closeEditUser,
    setEditRole,
    handleSaveRole,
    handleToggleSuspend,
    totalPages,
    // logs
    handleLogsFilter,
    handleLogsPage,
  }
}