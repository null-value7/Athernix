import { createBrowserClient } from '@supabase/ssr'

// ── Client ────────────────────────────────────────────────────
function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
};

// ── Types ─────────────────────────────────────────────────────
export type AdminSection = 'overview' | 'users' | 'logs';
export type UserRole = 'admin' | 'Teacher' | 'Student' | 'Personal';

export interface AdminUser {
  id:           string
  first_name:   string | null
  last_name:    string | null
  email:        string | null
  phone:        string | null
  country_code: string | null
  avatar_url:   string | null
  role:         UserRole
  suspended:    boolean | null
  created_at:   string | null
  updated_at:   string | null
  vr_glasses:   VRGlassesModel | null  // ← tipo actualizado
  vr_glasses_set_at: string | null
}

export async function updateUserGlasses(
  userId:  string,
  glasses: VRGlassesModel          // ← tipo actualizado
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase()

  const { error } = await supabase
    .from('profiles')
    .update({
      vr_glasses:        glasses,
      vr_glasses_set_at: new Date().toISOString(),
      updated_at:        new Date().toISOString(),
    })
    .eq('id', userId)

  if (error) return { success: false, error: error.message }

  await supabase.from('activity_logs').insert({
    user_id:   (await supabase.auth.getUser()).data.user?.id,
    action:    'GLASSES_CHANGE',
    entity:    'user',
    entity_id: userId,
    metadata:  { new_glasses: glasses },
  })

  return { success: true }
}

export interface AdminStats {
  total_users:    number
  active_users:   number
  suspended:      number
  by_role: {
    admin:    number
    Teacher:  number
    Student:  number
    Personal: number
  }
  new_this_week:  number
  new_this_month: number
  logs_today:     number
}

export interface ChartPoint {
  day:   string   // 'DD MMM'
  count: number
}

export interface ActivityLog {
  id:         string
  user_id:    string | null
  action:     string
  entity:     string | null
  entity_id:  string | null
  metadata:   Record<string, unknown>
  ip_address: string | null
  created_at: string
  // joined from profiles
  user_name:  string | null
  user_email: string | null
  user_role:  string | null
}



export interface AdminState {
  section:      AdminSection
  sidebarOpen:  boolean
  // overview
  stats:        AdminStats | null
  chartData:    ChartPoint[]
  statsLoading: boolean
  // users
  users:        AdminUser[]
  usersLoading: boolean
  usersSearch:  string
  usersPage:    number
  usersTotal:   number
  editUser:     AdminUser | null
  editRole:     UserRole
  // logs
  logs:         ActivityLog[]
  logsLoading:  boolean
  logsPage:     number
  logsTotal:    number
  logsFilter:   string
}

export const PAGE_SIZE = 12

export const initialAdminState: AdminState = {
  section:      'overview',
  sidebarOpen:  true,
  stats:        null,
  chartData:    [],
  statsLoading: false,
  users:        [],
  usersLoading: false,
  usersSearch:  '',
  usersPage:    0,
  usersTotal:   0,
  editUser:     null,
  editRole:     'Personal',
  logs:         [],
  logsLoading:  false,
  logsPage:     0,
  logsTotal:    0,
  logsFilter:   '',
}

// ── Tipo del enum de gafas ────────────────────────────────────
export type VRGlassesModel =
  | 'meta-quest-2'
  | 'meta-quest-3'
  | 'meta-quest-3s'
  | 'meta-quest-pro'
  | 'apple-vision-pro'
  | 'playstation-vr2'
  | 'valve-index'
  | 'htc-vive-xr-elite'
  | 'htc-vive-focus-vision'
  | 'htc-vive-pro-2'
  | 'pico-4'
  | 'pico-4-ultra'
  | 'samsung-galaxy-xr'
  | 'hp-reverb-g2'
  | 'none'

// ── Metadatos por headset ─────────────────────────────────────
// (para mostrar en tabla de usuarios y en el selector del HomeView)
export interface VRHeadsetMeta {
  label:      string   // nombre comercial
  brand:      string   // fabricante
  type:       'standalone' | 'pcvr' | 'console'
  sdk:        string   // plugin Unity que usa
  color:      string   // color de acento en UI
  icon:       string   // emoji representativo
}

export const VR_HEADSET_META: Record<VRGlassesModel, VRHeadsetMeta> = {
  'meta-quest-2': {
    label: 'Meta Quest 2',      brand: 'Meta',      type: 'standalone',
    sdk: 'Meta OpenXR SDK',     color: '#1877f2',   icon: '🥽',
  },
  'meta-quest-3': {
    label: 'Meta Quest 3',      brand: 'Meta',      type: 'standalone',
    sdk: 'Meta OpenXR SDK',     color: '#1877f2',   icon: '🥽',
  },
  'meta-quest-3s': {
    label: 'Meta Quest 3S',     brand: 'Meta',      type: 'standalone',
    sdk: 'Meta OpenXR SDK',     color: '#1877f2',   icon: '🥽',
  },
  'meta-quest-pro': {
    label: 'Meta Quest Pro',    brand: 'Meta',      type: 'standalone',
    sdk: 'Meta OpenXR SDK',     color: '#1877f2',   icon: '🥽',
  },
  'apple-vision-pro': {
    label: 'Apple Vision Pro',  brand: 'Apple',     type: 'standalone',
    sdk: 'Unity PolySpatial',   color: '#f5f5f7',   icon: '🍎',
  },
  'playstation-vr2': {
    label: 'PlayStation VR2',   brand: 'Sony',      type: 'console',
    sdk: 'PSVR2 OpenXR Plugin', color: '#003087',   icon: '🎮',
  },
  'valve-index': {
    label: 'Valve Index',       brand: 'Valve',     type: 'pcvr',
    sdk: 'OpenVR XR Plugin',    color: '#1b2838',   icon: '🖥️',
  },
  'htc-vive-xr-elite': {
    label: 'VIVE XR Elite',     brand: 'HTC',       type: 'standalone',
    sdk: 'VIVE OpenXR SDK',     color: '#be1c2e',   icon: '🥽',
  },
  'htc-vive-focus-vision': {
    label: 'VIVE Focus Vision', brand: 'HTC',       type: 'standalone',
    sdk: 'VIVE OpenXR SDK',     color: '#be1c2e',   icon: '🥽',
  },
  'htc-vive-pro-2': {
    label: 'VIVE Pro 2',        brand: 'HTC',       type: 'pcvr',
    sdk: 'VIVE OpenXR SDK',     color: '#be1c2e',   icon: '🖥️',
  },
  'pico-4': {
    label: 'Pico 4',            brand: 'ByteDance', type: 'standalone',
    sdk: 'Pico OpenXR SDK',     color: '#00c8c8',   icon: '🥽',
  },
  'pico-4-ultra': {
    label: 'Pico 4 Ultra',      brand: 'ByteDance', type: 'standalone',
    sdk: 'Pico OpenXR SDK',     color: '#00c8c8',   icon: '🥽',
  },
  'samsung-galaxy-xr': {
    label: 'Samsung Galaxy XR', brand: 'Samsung',   type: 'standalone',
    sdk: 'Android XR OpenXR',   color: '#1428a0',   icon: '🥽',
  },
  'hp-reverb-g2': {
    label: 'HP Reverb G2',      brand: 'HP',        type: 'pcvr',
    sdk: 'Windows MR OpenXR',   color: '#0096d6',   icon: '🖥️',
  },
  'none': {
    label: 'Sin asignar',       brand: '—',         type: 'standalone',
    sdk: '—',                   color: '#ff6b35',   icon: '❓',
  },
}

// ── Helper ────────────────────────────────────────────────────
export function getVRMeta(model?: string | null): VRHeadsetMeta {
  return VR_HEADSET_META[model as VRGlassesModel] ?? VR_HEADSET_META['none']
}

export interface AdminStats {
  // Usuarios
  total_users:    number
  active_users:   number
  suspended:      number
  new_this_week:  number
  new_this_month: number

  // Por rol
  by_role: {
    admin:    number
    Teacher:  number
    Student:  number
    Personal: number
  }

  // Gafas VR
  by_glasses: {
    'ather-flash': number
    'ather-core':  number
    'ather-nova':  number
    'ather-apex':  number
  }
  glasses_unset: number
  missions_total:     number
  missions_completed: number
  missions_active:    number
  missions_abandoned: number
  xp_total:        number
  xp_avg_per_user: number
  xp_by_category:  Record<string, number>
  collectables_total:     number
  collectables_by_rarity: Record<string, number>
  chats_total:    number
  chats_active:   number
  chats_archived: number
  logs_today: number
}


// ── Role meta ─────────────────────────────────────────────────
export const ROLE_META: Record<string, { label: string; color: string; bg: string }> = {
  admin:    { label: 'ADMIN',      color: '#ff3060', bg: 'rgba(255,48,96,0.12)'   },
  Teacher:  { label: 'DOCENTE',    color: '#ffaa00', bg: 'rgba(255,170,0,0.12)'   },
  Student:  { label: 'ESTUDIANTE', color: '#00e5a0', bg: 'rgba(0,229,160,0.12)'   },
  Personal: { label: 'PERSONAL',   color: '#ff6b35', bg: 'rgba(255,107,53,0.12)'  },
}
export function getRoleMeta(role?: string | null) {
  return ROLE_META[role ?? ''] ?? { label: 'N/A', color: '#ff6b35', bg: 'rgba(255,107,53,0.1)' }
}

// ── Helpers ───────────────────────────────────────────────────
export function getFullName(u: AdminUser | null): string {
  if (!u) return '—'
  return `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim() || u.email?.split('@')[0] || '—'
}

export function getInitials(u: AdminUser | null): string {
  return getFullName(u).split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '??'
}

export function formatDateTime(iso: string | null): string {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('es-SV', {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(iso))
}

export function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('es-SV', {
    year: 'numeric', month: 'short', day: '2-digit',
  }).format(new Date(iso))
}

// ── ACTION colors for logs ────────────────────────────────────
export const ACTION_META: Record<string, { color: string; label: string }> = {
  LOGIN:          { color: '#00e5a0', label: 'LOGIN'          },
  LOGOUT:         { color: '#ff6b35', label: 'LOGOUT'         },
  PROFILE_UPDATE: { color: '#ffaa00', label: 'PERFIL'         },
  ROLE_CHANGE:    { color: '#ff3060', label: 'ROL'            },
  MODULE_ACCESS:  { color: '#c060ff', label: 'MÓDULO'         },
  PASSWORD_RESET: { color: '#00ccff', label: 'CONTRASEÑA'     },
  REGISTER:       { color: '#00e5a0', label: 'REGISTRO'       },
  SUSPENDED:      { color: '#ff3060', label: 'SUSPENDIDO'     },
  REACTIVATED:    { color: '#00e5a0', label: 'REACTIVADO'     },
}
export function getActionMeta(action: string) {
  return ACTION_META[action] ?? { color: '#ff6b35', label: action }
}

// ════════════════════════════════════════════════════════════════
// FETCHERS
// ════════════════════════════════════════════════════════════════

// ── Stats ─────────────────────────────────────────────────────
export async function fetchAdminStats(): Promise<{ stats: AdminStats; chart: ChartPoint[] }> {
  const supabase = getSupabase()

  const { data: statsRaw } = await supabase.rpc('get_admin_stats')
  const { data: chartRaw } = await supabase.rpc('get_registrations_chart')

  const stats: AdminStats = statsRaw ?? {
    total_users: 0, active_users: 0, suspended: 0,
    by_role: { admin: 0, Teacher: 0, Student: 0, Personal: 0 },
    new_this_week: 0, new_this_month: 0, logs_today: 0,
  }

  const chart: ChartPoint[] = (chartRaw ?? []).map((row: { day: string; count: number }) => ({
    day:   new Intl.DateTimeFormat('es-SV', { day: '2-digit', month: 'short' }).format(new Date(row.day)),
    count: Number(row.count),
  }))

  return { stats, chart }
}

// ── Users ─────────────────────────────────────────────────────
export async function fetchUsers(
  page: number,
  search: string
): Promise<{ users: AdminUser[]; total: number }> {
  const supabase = getSupabase()
  const from     = page * PAGE_SIZE
  const to       = from + PAGE_SIZE - 1

  let query = supabase
    .from('profiles')
    .select('id, first_name, last_name, email, phone, country_code, avatar_url, role, suspended, suspended_at, created_at, updated_at, vr_glasses, vr_glasses_set_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (search.trim()) {
    query = query.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`
    )
  }

  const { data, count, error } = await query
  if (error) return { users: [], total: 0 }
  return { users: (data ?? []) as AdminUser[], total: count ?? 0 }
}

export async function updateUserRole(
  userId: string,
  role: UserRole
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase()
  const { error } = await supabase
    .from('profiles')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', userId)
  if (error) return { success: false, error: error.message }

  // Log the action
  await supabase.from('activity_logs').insert({
    user_id:  (await supabase.auth.getUser()).data.user?.id,
    action:   'ROLE_CHANGE',
    entity:   'user',
    entity_id: userId,
    metadata: { new_role: role },
  })

  return { success: true }
}

export async function toggleUserSuspend(
  userId: string,
  suspend: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase()
  const { error } = await supabase
    .from('profiles')
    .update({
      suspended:    suspend,
      suspended_at: suspend ? new Date().toISOString() : null,
      updated_at:   new Date().toISOString(),
    })
    .eq('id', userId)
  if (error) return { success: false, error: error.message }

  await supabase.from('activity_logs').insert({
    user_id:  (await supabase.auth.getUser()).data.user?.id,
    action:   suspend ? 'SUSPENDED' : 'REACTIVATED',
    entity:   'user',
    entity_id: userId,
    metadata: {},
  })

  return { success: true }
}

// ── Logs ──────────────────────────────────────────────────────
export async function fetchLogs(
  page: number,
  filter: string
): Promise<{ logs: ActivityLog[]; total: number }> {
  const supabase = getSupabase()
  const from     = page * PAGE_SIZE
  const to       = from + PAGE_SIZE - 1

  // Fetch logs
  let query = supabase
    .from('activity_logs')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (filter.trim()) {
    query = query.ilike('action', `%${filter}%`)
  }

  const { data: logsRaw, count, error } = await query
  if (error) return { logs: [], total: 0 }

  // Enrich with user profile data
  const userIds = [...new Set((logsRaw ?? []).map((l: ActivityLog) => l.user_id).filter(Boolean))]
  let profileMap: Record<string, { name: string; email: string; role: string }> = {}

  if (userIds.length > 0) {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, email, role')
      .in('id', userIds as string[])

    profileMap = Object.fromEntries(
      (profiles ?? []).map(p => [
        p.id,
        {
          name:  `${p.first_name ?? ''} ${p.last_name ?? ''}`.trim() || p.email?.split('@')[0] || '—',
          email: p.email ?? '—',
          role:  p.role ?? '—',
        },
      ])
    )
  }

  const logs: ActivityLog[] = (logsRaw ?? []).map((l: ActivityLog) => ({
    ...l,
    user_name:  l.user_id ? (profileMap[l.user_id]?.name  ?? '—') : 'Sistema',
    user_email: l.user_id ? (profileMap[l.user_id]?.email ?? '—') : '—',
    user_role:  l.user_id ? (profileMap[l.user_id]?.role  ?? '—') : '—',
  }))

  return { logs, total: count ?? 0 }
}