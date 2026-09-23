// models/mission.ts
import { SupabaseClient } from '@supabase/supabase-js'
import type { Mission, MissionType, MissionStatus } from '@/models/missions'

// ── Tipos de fila de Supabase (coinciden con el esquema de la BD) ──────────
export interface MissionRow {
  id_mission: number
  title: string | null
  description: string | null
  difficulty: string | null
  status: string | null
  progress: number | null
  gotpoints: bigint | number | null
  state: boolean | null
  due_date: string | null
  subject_id: string | null
  classroom_id: string | null
  created_by: string | null
}

export interface UserMissionRow {
  id: number
  user_id: string
  mission_id: number
  state: boolean
  progress: number
  completed_at: string | null
}

export async function createMission(supabase: SupabaseClient, teacherId: string, data: {
  classroomId: string; subjectId: string; title: string; description: string
  difficulty: string; xpReward: number; dueDate: string
}) {
  const { data: row, error } = await supabase
    .from('missions')
    .insert({
      created_by: teacherId,
      classroom_id: data.classroomId,
      subject_id: data.subjectId,
      description: data.description,
      title: data.title,
      difficulty: data.difficulty,
      gotpoints: data.xpReward,
      due_date: data.dueDate,
      status: 'publicada',
    })
    .select()
    .single()
  if (error) throw error
  return row
}

export async function getMissionsForClassroom(supabase: SupabaseClient, classroomId: string) {
  const { data, error } = await supabase
    .from('missions')
    .select('*')
    .eq('classroom_id', classroomId)
    .order('id_mission', { ascending: false })
  if (error) throw error
  return data
}

export async function getMissionsForStudent(supabase: SupabaseClient, studentId: string) {
  // misiones de todas las clases donde el estudiante está inscrito
  const { data, error } = await supabase
    .from('classroom_members')
    .select('classroom_id')
    .eq('student_id', studentId)
  if (error) throw error
  const classroomIds = data.map(d => d.classroom_id)
  if (classroomIds.length === 0) return []

  const { data: missions, error: mErr } = await supabase
    .from('missions')
    .select('*, user_mission(state, progress)')
    .in('classroom_id', classroomIds)
    .neq('status', 'borrador')
  if (mErr) throw mErr
  return missions
}

export async function toggleMissionCompletion(
  supabase: SupabaseClient, studentId: string, missionId: number, completed: boolean
) {
  const { error } = await supabase
    .from('user_mission')
    .upsert(
      { user_id: studentId, mission_id: missionId, state: completed, progress: completed ? 100 : 0,
        completed_at: completed ? new Date().toISOString() : null },
      { onConflict: 'user_id,mission_id' }
    )
  if (error) throw error
}

// ── Carga de misiones publicadas + progreso del usuario ────────────────────
// Sigue el mismo patrón que SupabaseBridge.CargarMisionesCoroutine() del juego Unity:
// 1) trae todas las misiones publicadas
// 2) trae las filas de user_mission del usuario actual
// 3) se mergean en JS
export async function getPublishedMissionsWithProgress(
  supabase: SupabaseClient,
  userId: string
): Promise<Mission[]> {
  // 1) Misiones publicadas (no borrador)
  const { data: missions, error: mErr } = await supabase
    .from('missions')
    .select('*')
    .neq('status', 'borrador')
    .order('id_mission', { ascending: true })
  if (mErr) throw mErr
  if (!missions || missions.length === 0) return []

  // 2) user_mission del usuario actual (igual que Unity:
  //    /rest/v1/user_mission?user_id=eq.{userId}&select=id,mission_id,state,progress,completed_at)
  const { data: userMissions, error: uErr } = await supabase
    .from('user_mission')
    .select('id, mission_id, state, progress, completed_at')
    .eq('user_id', userId)
  if (uErr) throw uErr

  // 3) Mapa mission_id → user_mission para lookup O(1)
  const progressMap = new Map<number, UserMissionRow>()
  for (const um of userMissions ?? []) {
    progressMap.set(um.mission_id, um as UserMissionRow)
  }

  // 4) Mapear cada fila de missions → Mission (modelo TS de la UI)
  return (missions as MissionRow[]).map(row =>
    supabaseRowToMission(row, progressMap.get(row.id_mission) ?? null)
  )
}

// ── Mapper: fila de Supabase → Mission (models/missions.ts) ────────────────
function mapDifficulty(raw: string | null): Mission['difficulty'] {
  const d = (raw ?? '').toLowerCase()
  if (['facil', 'easy', 'fácil'].some(s => d.includes(s))) return 'easy'
  if (['dificil', 'hard', 'difícil'].some(s => d.includes(s))) return 'hard'
  return 'medium' // 'media' / 'medium' / default
}

function mapType(subjectId: string | null): MissionType {
  const s = (subjectId ?? '').toLowerCase()
  if (['historia', 'history'].some(k => s.includes(k))) return 'history'
  if (['turismo', 'tourism', 'tour'].some(k => s.includes(k))) return 'tourism'
  if (['mente', 'brain', 'meditacion', 'meditation'].some(k => s.includes(k))) return 'brain'
  return 'history' // fallback
}

function mapStatus(
  missionStatus: string | null,
  userMission: UserMissionRow | null
): MissionStatus {
  if (userMission?.state) return 'completed'
  if (userMission && userMission.progress > 0) return 'in_progress'
  if (missionStatus === 'borrador') return 'locked'
  return 'available'
}

export function supabaseRowToMission(
  row: MissionRow,
  userMission: UserMissionRow | null
): Mission {
  const type = mapType(row.subject_id)
  const status = mapStatus(row.status, userMission)
  const xp = Number(row.gotpoints ?? 0)

  // ── Progreso consistente con el estado ──────────────────────────
  // El progreso del usuario vive en user_mission (0-100), NO en el campo
  // progress de la tabla missions (que es un default de plantilla).
  // Si no hay user_mission, el usuario no empezó → 0.
  // Si state=true (completada), forzamos 100 aunque progress diga otra cosa.
  let progress: number
  if (userMission?.state) {
    // Completada → siempre 100% (corrige barras vacías en misiones completadas)
    progress = 100
  } else if (userMission) {
    // En progreso → usar el valor de user_mission, clampeado 0-100
    progress = Math.max(0, Math.min(100, userMission.progress ?? 0))
  } else {
    // Sin user_mission → no empezó → 0%
    progress = 0
  }

  return {
    id: String(row.id_mission),
    type,
    title: row.title ?? 'Misión sin título',
    description: row.description ?? '',
    status,
    progress,
    totalXP: xp,
    subMissions: [], // la tabla missions no tiene subtareas; el juego las define en ScriptableObjects
    image: '',
    environment: row.subject_id ?? '',
    difficulty: mapDifficulty(row.difficulty),
    estimatedTime: row.due_date ?? 'N/A',
  }
}