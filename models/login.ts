import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@/lib/supabase/client";
export type UserRole = "personal" | "student" | "teacher" | "admin";

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
    // Default to personal if no profile found
    return { success: true, role: "personal" };
  }

  return { success: true, role: (profile.role as UserRole) ?? "personal" };
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
    admin: "/dashboard/admin",
    teacher: "/dashboard/teacher",
    student: "/dashboard/student",
    personal: "/dashboard",
  };
  return paths[role] ?? "/dashboard";
}