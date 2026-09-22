
// ── Roles del sistema ────────────────────────────────────────
export type UserRole =
  | "admin" | "Personal" | "Teacher" | "Student";

// ── Schema del formulario ────────────────────────────────────
export interface RegisterFormData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

// ── Errores de validación ────────────────────────────────────
export interface RegisterFormErrors {
  nombre?: string;
  apellido?: string;
  email?: string;
  password?: string;
  general?: string;
}

// ── Perfil insertado en tabla `profiles` ─────────────────────
export interface UserProfile {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  role: UserRole;
  created_at?: string;
}

// ── Validación local (sin red) ───────────────────────────────
export function validateRegisterForm(
  data: RegisterFormData
): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  if (!data.nombre.trim()) {
    errors.nombre = "El nombre es requerido";
  } else if (data.nombre.trim().length < 2) {
    errors.nombre = "Mínimo 2 caracteres";
  }

  if (!data.apellido.trim()) {
    errors.apellido = "El apellido es requerido";
  } else if (data.apellido.trim().length < 2) {
    errors.apellido = "Mínimo 2 caracteres";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "El email es requerido";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Email inválido";
  }

  if (!data.password) {
    errors.password = "La contraseña es requerida";
  } else if (data.password.length < 8) {
    errors.password = "Mínimo 8 caracteres";
  } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(data.password)) {
    errors.password = "Debe incluir mayúscula y número";
  }

  return errors;
}

export async function registerWithGoogle(): Promise<{ error: string | null }> {
  const { createClient } = await import("@/lib/supabase/client");
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  return { error: error?.message ?? null };
}

export async function registerWithGitHub(): Promise<{ error: string | null }> {
  const { createClient } = await import("@/lib/supabase/client");
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  return { error: error?.message ?? null };
}