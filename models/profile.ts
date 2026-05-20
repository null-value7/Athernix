import { createBrowserClient } from '@supabase/ssr'
import type { UserRole } from '@/models/navbarModel'

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}

// ── Tipos ────────────────────────────────────────────────────
export interface ProfileData {
  id:           string
  first_name:   string | null
  last_name:    string | null
  email:        string | null
  phone:        string | null
  country_code: string | null   // ← columna en public.profiles
  avatar_url:   string | null
  role:         UserRole
  created_at:   string | null
  updated_at:   string | null
}

export interface ProfileFormState {
  isLoading:    boolean
  isSaving:     boolean
  error:        string | null
  successMsg:   string | null
  profile:      ProfileData | null
  // Edit modal
  editOpen:     boolean
  editFirst:    string
  editLast:     string
  editPhone:    string
  editCountry:  string           // ← country_code
  avatarFile:   File | null
  avatarPreview: string | null
}

export const initialProfileState: ProfileFormState = {
  isLoading:     true,
  isSaving:      false,
  error:         null,
  successMsg:    null,
  profile:       null,
  editOpen:      false,
  editFirst:     '',
  editLast:      '',
  editPhone:     '',
  editCountry:   '',
  avatarFile:    null,
  avatarPreview: null,
}

// ── Helpers ──────────────────────────────────────────────────
export function getFullName(profile: ProfileData | null): string {
  if (!profile) return 'PERSONAL'
  return `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim() || 'PERSONAL'
}

export function getInitials(profile: ProfileData | null): string {
  return getFullName(profile)
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'OP'
}

export function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('es-SV', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(iso))
}

export const ROLE_META: Record<string, { label: string; color: string; glow: string }> = {
  admin:    { label: 'ADMIN',      color: '#ff3060', glow: 'rgba(255,48,96,0.4)'   },
  Teacher:  { label: 'DOCENTE',    color: '#ffaa00', glow: 'rgba(255,170,0,0.4)'   },
  Student:  { label: 'ESTUDIANTE', color: '#00e5a0', glow: 'rgba(0,229,160,0.4)'   },
  Personal: { label: 'PERSONAL',   color: '#ff6b35', glow: 'rgba(255,107,53,0.4)'  },
}

export function getRoleMeta(role?: string) {
  return ROLE_META[role ?? ''] ?? {
    label: 'OPERADOR', color: '#ff6b35', glow: 'rgba(255,107,53,0.4)',
  }
}

// ── Supabase fetchers ────────────────────────────────────────
export async function fetchProfile(): Promise<ProfileData | null> {
  const supabase = getSupabase()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null

  const { data, error: dbError } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, email, phone, country_code, avatar_url, role, created_at, updated_at')
    .eq('id', user.id)
    .single()
  console.log("PROFILE DATA:", data, "DB ERROR:", dbError?.message)  
  if (dbError || !data) return null
  return {
    ...data,
    email:        data.email        ?? user.email ?? null,
    country_code: data.country_code ?? null,
  } as ProfileData
}

export async function updateProfile(
  id: string,
  updates: Partial<Pick<ProfileData, 'first_name' | 'last_name' | 'phone' | 'country_code' | 'avatar_url'>>
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase()
  const { error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function uploadAvatar(
  userId: string,
  file: File
): Promise<{ url: string | null; error?: string }> {
  const supabase = getSupabase()
  const ext  = file.name.split('.').pop()
  const path = `avatars/${userId}/avatar.${ext}`
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true })
  if (uploadError) return { url: null, error: uploadError.message }
  const { data } = supabase.storage.from('avatars').getPublicUrl(path)
  return { url: data.publicUrl }
}

export async function signOutUser(): Promise<void> {
  const supabase = getSupabase()
  await supabase.auth.signOut()
}