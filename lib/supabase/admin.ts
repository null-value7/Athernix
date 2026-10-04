// lib/supabase/admin.ts — cliente service_role (ignora RLS por completo)
// SOLO server-side: este módulo lanza en build de cliente ('server-only').
// La key NUNCA lleva prefijo NEXT_PUBLIC_ y jamás debe importarse desde un
// componente 'use client', un hook, ni código que viaje al navegador.
// Uso: operaciones que el usuario no puede hacer directo — generated_quizzes
// y la escritura de user_node_progress (calificación de quizzes).
import 'server-only';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let admin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (admin) return admin;

  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY no está configurada. ' +
      'Defínela como secret en Cloudflare (producción) y en .env.local (desarrollo).'
    );
  }

  admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    key,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
  return admin;
}
