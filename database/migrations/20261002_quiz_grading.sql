-- Migración — Quiz grading server-side (fix de integridad de progreso)
-- Las preguntas generadas por evaluarConQuiz se persisten con sus
-- correctIndex/explanation aquí, accesibles SOLO vía service_role en el
-- servidor (RLS sin políticas + REVOKE = el cliente anon/authenticated no
-- puede leer ni escribir). El cliente recibe pregunta+opciones únicamente;
-- /api/quiz/submit califica contra este registro — el score nunca es
-- auto-reportado por el cliente.
--
-- REQUIERE: SUPABASE_SERVICE_ROLE_KEY como variable de entorno del servidor
-- (Supabase Dashboard → Settings → API → service_role). Sin ella, el flujo
-- de quiz falla visiblemente.
--
-- Ejecutar en Supabase SQL Editor. Idempotente.

CREATE TABLE IF NOT EXISTS public.generated_quizzes (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  area         text not null,
  node_id      text not null,
  topic        text,
  questions    jsonb not null,   -- [{question, options[], correctIndex, explanation}]
  created_at   timestamptz not null default now(),
  submitted_at timestamptz,      -- NULL = pendiente; un quiz solo se califica una vez
  answers      jsonb,
  score        int check (score between 0 and 100)
);

CREATE INDEX IF NOT EXISTS idx_generated_quizzes_user
  ON public.generated_quizzes(user_id, created_at DESC);

-- RLS activo y SIN políticas: el cliente no puede leer ni escribir.
-- El service_role (solo en el servidor) ignora RLS.
ALTER TABLE public.generated_quizzes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own generated quizzes"   ON public.generated_quizzes;
DROP POLICY IF EXISTS "Users can insert own generated quizzes" ON public.generated_quizzes;
REVOKE ALL ON public.generated_quizzes FROM anon, authenticated;

-- Cerrar la escritura directa del progreso (el cliente solo lee;
-- los writes ocurren en /api/quiz/submit vía service_role)
DROP POLICY IF EXISTS "Users can insert own node progress" ON public.user_node_progress;
DROP POLICY IF EXISTS "Users can update own node progress" ON public.user_node_progress;
