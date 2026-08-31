
import { createClient } from "@/lib/supabase/client"; 

export type UserRole = "admin" | "Personal" | "Teacher" | "Student";


export interface LoginCredentials {
  email: string;
  password: string;
  rememberSession?: boolean;
}
 
export interface AuthResult {
  success: boolean;
  error?: string;
  role?: UserRole;
}
 
export interface LoginFormState {
  email: string;
  password: string;
  rememberSession: boolean;
  isLoading: boolean;
  error: string | null;
}


export const initialLoginFormState: LoginFormState = {
  email: "",
  password: "",
  rememberSession: false,
  isLoading: false,
  error: null,
};


export async function signInWithCredentials(
  credentials: LoginCredentials
): Promise<AuthResult> {
  const supabase = createClient();
 
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });
 
  if (error) {
    return { success: false, error: error.message };
  }
 
  if (!data.user) {
    return { success: false, error: "No se encontró el usuario." };
  }
 
  // Fetch role from profiles table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();
 
  if (profileError || !profile) {
    // Default to Personal if no profile found
    return { success: true, role: "Personal" };
  }
 
  return { success: true, role: (profile.role as UserRole) ?? "Personal" };
}


export async function signInWithGoogle(): Promise<AuthResult> {
  const supabase = createClient();
 
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
 
  if (error) {
    return { success: false, error: error.message };
  }
 
  return { success: true };
}
 
export async function signInWithGithub(): Promise<AuthResult> {
  const supabase = createClient();
 
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
 
  if (error) {
    return { success: false, error: error.message };
  }
 
  return { success: true };
}
 
export function getRoleDashboardPath(role: UserRole): string {
  const paths: Record<UserRole, string> = {
    admin:    "/dashboard/admin",
    Teacher:  "/dashboard/teacher",
    Student:  "/dashboard/student",
    Personal: "/dashboard",
  };
  return paths[role] ?? "/dashboard";
}
 



//Acá se ha modificado
export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordErrors {
  email?: string;
  general?: string;
}

export interface ResetPasswordErrors {
  password?: string;
  confirmPassword?: string;
  general?: string;
}

// ── Validación: forgot password ──────────────────────────────
export function validateForgotPasswordForm(
  data: ForgotPasswordFormData
): ForgotPasswordErrors {
  const errors: ForgotPasswordErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.email.trim()) {
    errors.email = "El email es requerido";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Email inválido";
  }

  return errors;
}

// ── Validación: reset password ───────────────────────────────
export function validateResetPasswordForm(
  data: ResetPasswordFormData
): ResetPasswordErrors {
  const errors: ResetPasswordErrors = {};

  if (!data.password) {
    errors.password = "La contraseña es requerida";
  } else if (data.password.length < 8) {
    errors.password = "Mínimo 8 caracteres";
  } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(data.password)) {
    errors.password = "Debe incluir mayúscula y número";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Confirma tu contraseña";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
}

// ── Mapeo de errores Supabase → español ──────────────────────
export function mapAuthError(error: string): string {
  const map: Record<string, string> = {
    "User not found": "No existe una cuenta con ese email",
    "Email rate limit exceeded": "Demasiados intentos. Espera un momento",
    "Invalid email": "El formato del email no es válido",
    "Auth session missing": "Sesión expirada, solicita un nuevo enlace",
    "New password should be different from the old password":
      "La nueva contraseña debe ser diferente a la anterior",
    "Password should be at least 6 characters":
      "La contraseña debe tener al menos 6 caracteres",
    "Token has expired or is invalid":
      "El enlace expiró. Solicita uno nuevo",
  };
  return map[error] ?? "Error inesperado. Intenta de nuevo";
}