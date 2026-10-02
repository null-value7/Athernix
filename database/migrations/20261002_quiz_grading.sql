-- Migración — Quiz grading server-side (fix de integridad de progreso)
-- Las preguntas generadas por evaluarConQuiz se persisten con sus
-- correctIndex/explanation aquí (server-side only). El cliente solo recibe
-- pregunta + opciones; al enviar respuestas, /api/quiz/submit califica
-- contra este registro — el score nunca es auto-reportado por el cliente.
-- Ejecutar en Supabase SQL Editor. Idempotente.

CREATE TABLE IF NOT EXISTS public.generated_quizzes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade,
  area       text not null,
  node_id    text not null,
  topic      text,
  questions  jsonb not null,  -- [{question, options[], correctIndex, explanation}]
  created_at timestamptz default now()
);

CREATE INDEX IF NOT EXISTS idx_generated_quizzes_user
  ON public.generated_quizzes(user_id, created_at);

ALTER TABLE public.generated_quizzes ENABLE ROW LEVEL SECURITY;

-- Solo lectura/inserción del propio usuario. Sin UPDATE/DELETE: los quizzes
-- generados son inmutables (auditoría del intento evaluado).
DROP POLICY IF EXISTS "Users can read own generated quizzes"   ON public.generated_quizzes;
DROP POLICY IF EXISTS "Users can insert own generated quizzes" ON public.generated_quizzes;

CREATE POLICY "Users can read own generated quizzes" ON public.generated_quizzes
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own generated quizzes" ON public.generated_quizzes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
