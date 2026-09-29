-- Migración Fase 1+2 — Tutor adaptativo Ather
-- Persistencia de artifacts (parts completos), biblioteca de repaso con
-- campos SM-2 (algoritmo activo en Fase 3) y progreso real por nodo.
-- Ejecutar en Supabase SQL Editor. Idempotente (IF NOT EXISTS / IF NOT EXISTS col).

-- ── 1.1 chat_messages: persistir parts completos (texto + tool outputs) ──
ALTER TABLE public.chat_messages
  ADD COLUMN IF NOT EXISTS parts jsonb;

-- ── 1.2 study_artifacts — diseñada para repetición espaciada (SM-2) ─────
CREATE TABLE IF NOT EXISTS public.study_artifacts (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade,
  session_id    uuid references public.chat_sessions(id) on delete cascade,
  area          text,             -- 'fisica' | 'biologia' | 'astronomia' | 'matematicas' | 'programacion' | 'quimica'
  type          text not null,    -- 'flashcards' | 'timeline' | 'comparison' | 'sources' | 'quiz'
  title         text not null,
  payload       jsonb not null,
  -- Campos SM-2 (algoritmo activo en Fase 3)
  sr_ease_factor    numeric default 2.5,
  sr_interval_days  int     default 0,
  sr_repetitions    int     default 0,
  sr_next_review_at timestamptz default now(),
  sr_last_reviewed_at timestamptz,
  mastery         int default 0,
  created_at      timestamptz default now()
);

CREATE INDEX IF NOT EXISTS idx_study_artifacts_next_review
  ON public.study_artifacts(user_id, sr_next_review_at);
CREATE INDEX IF NOT EXISTS idx_study_artifacts_session
  ON public.study_artifacts(user_id, session_id);

ALTER TABLE public.study_artifacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own study artifacts" ON public.study_artifacts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own study artifacts" ON public.study_artifacts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own study artifacts" ON public.study_artifacts
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own study artifacts" ON public.study_artifacts
  FOR DELETE USING (auth.uid() = user_id);

-- ── 2.1 user_node_progress — progreso real por nodo de roadmap ──────────
CREATE TABLE IF NOT EXISTS public.user_node_progress (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade,
  area       text not null,     -- 'fisica' | 'biologia' | 'astronomia' | 'matematicas' | 'programacion' | 'quimica'
  node_id    text not null,     -- id del nodo dentro del roadmap de esa área
  status     text default 'locked',  -- 'locked' | 'available' | 'completed' | 'needs_review'
  attempts   int default 0,
  best_score int default 0,
  last_score int default 0,
  last_attempted_at timestamptz,
  completed_at      timestamptz,
  unique(user_id, area, node_id)
);

CREATE INDEX IF NOT EXISTS idx_user_node_progress_area
  ON public.user_node_progress(user_id, area);

ALTER TABLE public.user_node_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own node progress" ON public.user_node_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own node progress" ON public.user_node_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own node progress" ON public.user_node_progress
  FOR UPDATE USING (auth.uid() = user_id);
