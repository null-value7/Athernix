-- ════════════════════════════════════════════════════════════════
-- Migración consolidada v2 — Tutor Ather
-- Ejecutar DESPUÉS del deploy con service_role. Idempotente.
-- ════════════════════════════════════════════════════════════════

-- ── A. study_artifacts ──────────────────────────────────────────

-- A0. Limpiar duplicados (por sesión; los de session_id NULL no se tocan)
DELETE FROM public.study_artifacts sa
USING (
  SELECT id,
         row_number() OVER (
           PARTITION BY user_id, session_id, type, title
           ORDER BY created_at DESC, id
         ) AS rn
  FROM public.study_artifacts
  WHERE session_id IS NOT NULL
) d
WHERE sa.id = d.id AND d.rn > 1;

-- A1. user_id obligatorio (ya aplicado; no-op)
ALTER TABLE public.study_artifacts ALTER COLUMN user_id SET NOT NULL;

-- A2. Borrar un chat NO borra sus artifacts
ALTER TABLE public.study_artifacts
  DROP CONSTRAINT IF EXISTS study_artifacts_session_id_fkey;
ALTER TABLE public.study_artifacts
  ADD CONSTRAINT study_artifacts_session_id_fkey
  FOREIGN KEY (session_id) REFERENCES public.chat_sessions(id) ON DELETE SET NULL;

-- A3. Rangos válidos (SM-2: ease_factor mínimo 1.3)
ALTER TABLE public.study_artifacts DROP CONSTRAINT IF EXISTS chk_sa_sr;
ALTER TABLE public.study_artifacts
  ADD CONSTRAINT chk_sa_sr
  CHECK (sr_ease_factor >= 1.3 AND sr_interval_days >= 0
         AND sr_repetitions >= 0 AND mastery BETWEEN 0 AND 100);

-- A4. Dedupe en BD, PARCIAL: solo filas con sesión.
--     (Un índice con COALESCE rompería el borrado de chats por el SET NULL.)
DROP INDEX IF EXISTS public.uq_study_artifacts_dedupe;
CREATE UNIQUE INDEX IF NOT EXISTS uq_study_artifacts_dedupe
  ON public.study_artifacts (user_id, session_id, type, title)
  WHERE session_id IS NOT NULL;

-- ── B. user_node_progress ───────────────────────────────────────

ALTER TABLE public.user_node_progress ALTER COLUMN user_id SET NOT NULL;

-- B1. Limpiar duplicados por nodo (conserva completed > mejor score > más reciente)
DELETE FROM public.user_node_progress a
USING (
  SELECT id,
         row_number() OVER (
           PARTITION BY user_id, area, node_id
           ORDER BY (status = 'completed') DESC, best_score DESC,
                    last_attempted_at DESC NULLS LAST, id
         ) AS rn
  FROM public.user_node_progress
) d
WHERE a.id = d.id AND d.rn > 1;

-- B2. Unicidad por nodo (requerida por el upsert)
CREATE UNIQUE INDEX IF NOT EXISTS uq_unp_user_area_node
  ON public.user_node_progress (user_id, area, node_id);

-- B3. Rangos válidos
ALTER TABLE public.user_node_progress DROP CONSTRAINT IF EXISTS chk_unp_scores;
ALTER TABLE public.user_node_progress
  ADD CONSTRAINT chk_unp_scores
  CHECK (best_score BETWEEN 0 AND 100 AND last_score BETWEEN 0 AND 100 AND attempts >= 0);

DROP INDEX IF EXISTS public.idx_user_node_progress_area;

-- B4. El cliente solo LEE; las escrituras pasan por service_role
DROP POLICY IF EXISTS "Users can insert own node progress" ON public.user_node_progress;
DROP POLICY IF EXISTS "Users can update own node progress" ON public.user_node_progress;
REVOKE INSERT, UPDATE, DELETE ON public.user_node_progress FROM anon, authenticated;

-- ── C. generated_quizzes (server-only) ──────────────────────────

ALTER TABLE public.generated_quizzes
  ADD COLUMN IF NOT EXISTS submitted_at timestamptz,
  ADD COLUMN IF NOT EXISTS answers      jsonb,
  ADD COLUMN IF NOT EXISTS score        int;

ALTER TABLE public.generated_quizzes ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE public.generated_quizzes DROP CONSTRAINT IF EXISTS chk_gq_score;
ALTER TABLE public.generated_quizzes
  ADD CONSTRAINT chk_gq_score CHECK (score IS NULL OR score BETWEEN 0 AND 100);

DROP INDEX IF EXISTS public.idx_generated_quizzes_user;
CREATE INDEX IF NOT EXISTS idx_generated_quizzes_user
  ON public.generated_quizzes(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_generated_quizzes_pending
  ON public.generated_quizzes(user_id, created_at DESC) WHERE submitted_at IS NULL;

ALTER TABLE public.generated_quizzes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own generated quizzes"   ON public.generated_quizzes;
DROP POLICY IF EXISTS "Users can insert own generated quizzes" ON public.generated_quizzes;
REVOKE ALL ON public.generated_quizzes FROM anon, authenticated;

-- ── D. node_attempts (cerrar escritura de cliente) ──────────────

ALTER TABLE public.node_attempts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own attempts"   ON public.node_attempts;
DROP POLICY IF EXISTS "Users can insert own attempts" ON public.node_attempts;
CREATE POLICY "Users can read own attempts" ON public.node_attempts
  FOR SELECT USING (auth.uid() = user_id);
REVOKE INSERT, UPDATE, DELETE ON public.node_attempts FROM anon, authenticated;