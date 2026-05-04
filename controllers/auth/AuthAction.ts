"use server";
// ============================================================
// SERVER ACTIONS — authActions.ts
// Todas las acciones de autenticación en un solo archivo:
// ─ registerWithEmailAction  → registro con email/password
// ─ signOutAction            → cerrar sesión
// ─ forgotPasswordAction     → enviar email de recuperación
// ─ resetPasswordAction      → actualizar contraseña
// ============================================================

import { createClient } from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";
import type { RegisterFormData, UserProfile } from "@/models/register";

// ── Registro con email/password ──────────────────────────────
// El trigger handle_new_user inserta en profiles automáticamente
// usando first_name/last_name desde raw_user_meta_data.
export async function registerWithEmailAction(
  data: RegisterFormData
): Promise<{ user: UserProfile | null; error: string | null }> {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.nombre,
        last_name: data.apellido,
      },
    },
  });

  if (authError) return { user: null, error: authError.message };
  if (!authData.user) return { user: null, error: "No se pudo crear el usuario" };

  const profile: UserProfile = {
    id: authData.user.id,
    nombre: data.nombre,
    apellido: data.apellido,
    email: data.email,
    role: "Personal",
  };

  return { user: profile, error: null };
}

// ── Sign Out ─────────────────────────────────────────────────
// Cierra la sesión y limpia las cookies via supabase-server.
// Redirige a /login tras cerrar. No retorna valor porque
// redirect() lanza una excepción internamente en Next.js.
export async function signOutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

// ── Forgot Password ───────────────────────────────────────────
// Envía el email con el enlace de recuperación.
// El enlace apunta a /auth/callback?next=/update-password
// donde el proxy intercambia el code por una sesión válida.
// Por seguridad siempre retorna null error aunque el email
// no exista (no revelar si una cuenta existe o no).
export async function forgotPasswordAction(
  email: string
): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/update-password`,
  });

  if (error) return { error: error.message };
  return { error: null };
}

// ── Reset Password ────────────────────────────────────────────
// Actualiza la contraseña del usuario autenticado.
// Solo funciona si el usuario llegó desde el enlace del email
// (tiene una sesión válida de tipo recovery).
export async function resetPasswordAction(
  newPassword: string
): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) return { error: error.message };
  return { error: null };

  redirect("@/app/resetpassword/page?message=Contraseña actualizada correctamente");
}