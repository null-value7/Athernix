// lib/supabase/navSession.ts
// ─────────────────────────────────────────────────────────────
// Server-only helper — obtiene el usuario autenticado y su perfil
// para la navbar. Usa getUser() (valida contra el servidor Auth)
// NUNCA getSession() (lee solo cookies, inseguro).
// ─────────────────────────────────────────────────────────────
import { createClient } from '@/lib/supabase/supabase-server';
import type { NavUser } from '@/models/navbarModel';

export async function getNavSession(): Promise<NavUser | null> {
  const supabase = await createClient()

  // ✅ getUser() — autentica el token contra Supabase Auth server
  // ❌ NUNCA: supabase.auth.getSession() 
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) return null

  // Obtener perfil con rol y datos adicionales
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('first_name, last_name, role, avatar_url')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    // Si no hay perfil aún, devolver datos mínimos del auth user
    return {
      id:       user.id,
      name:     user.email?.split('@')[0] ?? 'Operador',
      email:    user.email ?? '',
      role:     'Personal',
      avatarUrl: null,
    }
  }

  return {
    id:        user.id,
    name:      `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim() || 'Operador',
    email:     user.email ?? '',
    role:      profile.role ?? 'Personal',
    avatarUrl: profile.avatar_url ?? null,
  }
}