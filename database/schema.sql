-- Schema para Athernix - Tablas principales
-- Ejecutar esto en Supabase SQL Editor

-- Tabla de logros de usuario
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id VARCHAR(100) NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}',
  UNIQUE(user_id, achievement_id)
);

-- Tabla de miembros de classroom (estudiantes)
CREATE TABLE IF NOT EXISTS public.classroom_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id UUID NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(classroom_id, student_id)
);

-- Tabla de experiencia (XP)
CREATE TABLE IF NOT EXISTS public.experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  total_xp_earned INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Tabla de progreso de misiones de usuario
CREATE TABLE IF NOT EXISTS public.user_mission (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  state BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  xp_earned INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, mission_id)
);

-- Tabla de logs de actividad
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL,
  entity VARCHAR(50) NOT NULL,
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para rendimiento
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON public.user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_classroom_members_classroom_id ON public.classroom_members(classroom_id);
CREATE INDEX IF NOT EXISTS idx_classroom_members_student_id ON public.classroom_members(student_id);
CREATE INDEX IF NOT EXISTS idx_experience_user_id ON public.experience(user_id);
CREATE INDEX IF NOT EXISTS idx_user_mission_user_id ON public.user_mission(user_id);
CREATE INDEX IF NOT EXISTS idx_user_mission_mission_id ON public.user_mission(mission_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at);

-- Row Level Security (RLS)
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_mission ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para user_achievements
CREATE POLICY "Users can view own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own achievements" ON public.user_achievements
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas RLS para classroom_members
CREATE POLICY "Users can view classroom members" ON public.classroom_members
  FOR SELECT USING (auth.uid() = student_id OR EXISTS (
    SELECT 1 FROM classrooms WHERE id = classroom_id AND teacher_id = auth.uid()
  ));
CREATE POLICY "Users can insert own classroom membership" ON public.classroom_members
  FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Teachers can delete classroom members" ON public.classroom_members
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM classrooms WHERE id = classroom_id AND teacher_id = auth.uid()
  ));

-- Políticas RLS para experience
CREATE POLICY "Users can view own experience" ON public.experience
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own experience" ON public.experience
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own experience" ON public.experience
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas RLS para user_mission
CREATE POLICY "Users can view own mission progress" ON public.user_mission
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own mission progress" ON public.user_mission
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own mission progress" ON public.user_mission
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas RLS para activity_logs
CREATE POLICY "Users can view own activity logs" ON public.activity_logs
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own activity logs" ON public.activity_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger para actualizar updated_at en experience
CREATE OR REPLACE FUNCTION update_experience_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_experience_updated_at
  BEFORE UPDATE ON public.experience
  FOR EACH ROW
  EXECUTE FUNCTION update_experience_updated_at();

-- Trigger para actualizar updated_at en user_mission
CREATE OR REPLACE FUNCTION update_user_mission_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_mission_updated_at
  BEFORE UPDATE ON public.user_mission
  FOR EACH ROW
  EXECUTE FUNCTION update_user_mission_updated_at();
