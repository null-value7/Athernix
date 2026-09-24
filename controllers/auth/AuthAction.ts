"use server";

import { createClient } from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import type { RegisterFormData, UserProfile } from "@/models/register";

// Origin del request entrante (athernix.com en prod, localhost en dev).
// Así el redirect de emails de recuperación siempre apunta al dominio real,
// sin depender de NEXT_PUBLIC_SITE_URL (que queda inlineado en el build).
async function getSiteOrigin(): Promise<string> {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}


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

export async function signOutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function forgotPasswordAction(
  email: string
): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const origin = await getSiteOrigin();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/update-password`,
  });

  if (error) return { error: error.message };
  return { error: null };
}

export async function resetPasswordAction(
  newPassword: string
): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) return { error: error.message };
  return { error: null };
}