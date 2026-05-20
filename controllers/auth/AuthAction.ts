"use server";

import { createClient } from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";
import type { RegisterFormData, UserProfile } from "@/models/register";


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

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/update-password`,
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

  redirect("@/app/resetpassword/page?message=Contraseña actualizada correctamente");
}