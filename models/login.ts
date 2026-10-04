import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@/lib/supabase/client";
export type UserRole = "Personal" | "Student" | "Teacher" | "admin";

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

const CONNECTION_ERROR =
  "No se pudo conectar con el servidor de autenticación. Revisa tu conexión o la configuración de Supabase (.env.local).";

function isConnectionError(msg: string) {
  return /failed to fetch|network|load failed|fetcherror/i.test(msg);
}

export async function signInWithCredentials(
  credentials: LoginCredentials
): Promise<AuthResult> {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) {
    return { success: false, error: isConnectionError(error.message) ? CONNECTION_ERROR : error.message };
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
    // Default to personal if no profile found
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
    return { success: false, error: isConnectionError(error.message) ? CONNECTION_ERROR : error.message };
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
    return { success: false, error: isConnectionError(error.message) ? CONNECTION_ERROR : error.message };
  }

  return { success: true };
}

export function getRoleDashboardPath(role: UserRole): string {
  const paths: Record<UserRole, string> = {
    admin: "/dashboard",
    Teacher: "/dashboard/teacher",
    Student: "/dashboard/student",
    Personal: "/home",
  };
  return paths[role] ?? "/dashboard";
}