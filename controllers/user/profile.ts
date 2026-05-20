// controller/useProfileController.ts
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  ProfileFormState,
  initialProfileState,
  fetchProfile,
  updateProfile,
  uploadAvatar,
  signOutUser,
} from '@/models/profile'

export function useProfileController() {
  const router  = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<ProfileFormState>(initialProfileState)

  // ── Load profile on mount ─────────────────────────────────
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const profile = await fetchProfile()
      if (cancelled) return
      if (!profile) {
        setState((s) => ({ ...s, isLoading: false, error: 'No se pudo cargar el perfil.' }))
        return
      }
      setState((s) => ({
        ...s,
        isLoading:   false,
        profile,
        editFirst:   profile.first_name   ?? '',
        editLast:    profile.last_name    ?? '',
        editPhone:   profile.phone        ?? '',
        editCountry: profile.country_code ?? '',
      }))
    })()
    return () => { cancelled = true }
  }, [])

  // ── Open / close edit modal ───────────────────────────────
  const openEdit = useCallback(() => {
    setState((s) => ({
      ...s,
      editOpen:      true,
      editFirst:     s.profile?.first_name   ?? '',
      editLast:      s.profile?.last_name    ?? '',
      editPhone:     s.profile?.phone        ?? '',
      editCountry:   s.profile?.country_code ?? '',
      avatarPreview: null,
      avatarFile:    null,
      error:         null,
      successMsg:    null,
    }))
  }, [])

  const closeEdit = useCallback(() => {
    setState((s) => ({ ...s, editOpen: false, avatarPreview: null, avatarFile: null }))
  }, [])

  // ── Field setters ─────────────────────────────────────────
  const setEditFirst   = useCallback((v: string) =>
    setState((s) => ({ ...s, editFirst:   v })), [])
  const setEditLast    = useCallback((v: string) =>
    setState((s) => ({ ...s, editLast:    v })), [])
  const setEditPhone   = useCallback((v: string) =>
    setState((s) => ({ ...s, editPhone:   v })), [])
  const setEditCountry = useCallback((v: string) =>
    setState((s) => ({ ...s, editCountry: v })), [])

  // ── Avatar file picker ────────────────────────────────────
  const triggerFileInput = useCallback(() => fileRef.current?.click(), [])

  const handleAvatarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const preview = URL.createObjectURL(file)
    setState((s) => ({ ...s, avatarFile: file, avatarPreview: preview }))
  }, [])

  // ── Save profile ──────────────────────────────────────────
  const handleSave = useCallback(async () => {
    if (!state.profile) return
    setState((s) => ({ ...s, isSaving: true, error: null, successMsg: null }))

    let avatarUrl = state.profile.avatar_url

    // Upload avatar if changed
    if (state.avatarFile) {
      const { url, error } = await uploadAvatar(state.profile.id, state.avatarFile)
      if (error || !url) {
        setState((s) => ({ ...s, isSaving: false, error: 'Error al subir el avatar.' }))
        return
      }
      avatarUrl = url
    }

    const result = await updateProfile(state.profile.id, {
      first_name:   state.editFirst   || null,
      last_name:    state.editLast    || null,
      phone:        state.editPhone   || null,
      country_code: state.editCountry || null,
      avatar_url:   avatarUrl,
    })

    if (!result.success) {
      setState((s) => ({ ...s, isSaving: false, error: result.error ?? 'Error al guardar.' }))
      return
    }

    // Refresh profile data
    const updated = await fetchProfile()
    setState((s) => ({
      ...s,
      isSaving:   false,
      editOpen:   false,
      successMsg: 'Perfil actualizado correctamente.',
      profile:    updated ?? s.profile,
      avatarFile: null,
      avatarPreview: null,
    }))

    setTimeout(() => setState((s) => ({ ...s, successMsg: null })), 3500)
  }, [state])

  // ── Sign out ──────────────────────────────────────────────
  const handleSignOut = useCallback(async () => {
    await signOutUser()
    router.push('/login')
  }, [router])

  // ── Change password ───────────────────────────────────────
  const handleChangePassword = useCallback(() => {
    router.push('/update-password')
  }, [router])

  return {
    state,
    fileRef,
    openEdit,
    closeEdit,
    setEditFirst,
    setEditLast,
    setEditPhone,
    setEditCountry,
    triggerFileInput,
    handleAvatarChange,
    handleSave,
    handleSignOut,
    handleChangePassword,
  }
}