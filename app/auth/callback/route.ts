import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/supabase-server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  // Sin code → enlace inválido, ya usado o manipulado
  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=invalid_link", origin)
    );
  }

  const supabase = await createClient();

  // Intercambiar el code por una sesión activa.
  // Esto escribe las cookies de sesión en la respuesta
  // para que el middleware (proxy) las lea en el siguiente request.
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[auth/callback] error:", error.message);

    // Enlace expirado (>1h para reset, >24h para confirm)
    if (error.message.includes("expired")) {
      return NextResponse.redirect(
        new URL("/login?error=link_expired", origin)
      );
    }

    return NextResponse.redirect(
      new URL("/login?error=auth_error", origin)
    );
  }

  // Obtener el rol del usuario para redirigir al dashboard correcto
  if (data.user) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    let role = "Personal";
    
    if (!profileError && profile) {
      role = (profile.role as any) ?? "Personal";
    } else if (profileError?.code === 'PGRST116') {
      // Perfil no existe - crear automáticamente para usuarios OAuth
      const { error: insertError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          email: data.user.email,
          role: "Personal",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (!insertError) {
        console.log("[auth/callback] Created profile for new OAuth user:", data.user.email);
      }
    }

    // Mapear rol a la ruta correcta
    const rolePaths: Record<string, string> = {
      admin: "/dashboard",
      Teacher: "/teacher",
      Student: "/student",
      Personal: "/home",
    };

    const redirectPath = rolePaths[role] ?? "/home";
    return NextResponse.redirect(new URL(redirectPath, origin));
  }

  // Fallback - redirigir al destino original
  // Para reset password: next=/update-password
  // El proxy verificará que amr contiene "recovery" antes de mostrar la página
  return NextResponse.redirect(new URL(next, origin));
}
