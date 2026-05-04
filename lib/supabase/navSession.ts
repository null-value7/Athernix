import { createClient } from "@/lib/supabase/supabase-server";
import type { NavUser } from "@/models/navbarModel";

export async function getNavSession(): Promise<NavUser | null> {
  const supabase = await createClient();

  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) return null;

  const userId = sessionData.session.user.id;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, email, role, avatar_url")
    .eq("id", userId)
    .single();

  if (!profile) return null;

  return {
    id:        profile.id,
    name:      `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim() || "Operador",
    email:     profile.email ?? sessionData.session.user.email ?? "",
    role:      profile.role  ?? "Personal",
    avatarUrl: profile.avatar_url ?? null,
  };
}