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
  const { error } = await supabase.auth.exchangeCodeForSession(code);

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

  // Sesión creada → redirigir al destino
  // Para reset password: next=/update-password
  // El proxy verificará que amr contiene "recovery" antes de mostrar la página
  return NextResponse.redirect(new URL(next, origin));
}