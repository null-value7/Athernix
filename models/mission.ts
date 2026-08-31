// models/mission.ts
import { SupabaseClient } from '@supabase/supabase-js'

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