// ============================================================
// PAGE — app/(auth)/update-password/page.tsx
// Segunda capa de protección: verifica que la sesión sea
// de tipo recovery antes de renderizar la UI.
// ============================================================

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/supabase-server";
import ResetPasswordView from "@/app/resetpassword/page";

export default async function UpdatePasswordPage() {
  const supabase = await createClient();

  // Verificar sesión activa
  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData?.session?.access_token;

  if (!accessToken) {
    redirect("/login");
  }

  // Decodificar el JWT para leer amr sin depender del tipo Session.
  // amr:[{ method:"recovery" }] solo existe si el usuario llegó
  // desde el enlace del correo de reset password.
  let isRecoverySession = false;

  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split(".")[1], "base64").toString("utf-8")
    );
    const amr = payload?.amr as { method: string }[] | undefined;
    isRecoverySession = amr?.some((m) => m.method === "recovery") ?? false;
  } catch {
    isRecoverySession = false;
  }

  if (!isRecoverySession) {
    redirect("/dashboard");
  }

  // Solo llega aquí si vino del enlace del correo ✓
  return <ResetPasswordView />;
}