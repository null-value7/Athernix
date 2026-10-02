// lib/supabase/service.ts — cliente service_role (ignora RLS)
// SOLO server-side: NUNCA importar desde componentes de cliente ni exponer
// al browser. Se usa para operaciones que el usuario no puede hacer directo
// (generated_quizzes, escritura de user_node_progress).
import { createClient } from '@supabase/supabase-js';

export function createServiceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY no está configurada');
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    key,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
