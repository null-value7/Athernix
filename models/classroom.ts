// models/classroom.ts
import { SupabaseClient } from '@supabase/supabase-js'

export interface ClassroomRow {
  id: string
  teacher_id: string
  name: string
  grade_level: string | null
  subject_id: string
  join_code: string
  color: string
}

function generateJoinCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' 
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export async function createClassroom(
  supabase: SupabaseClient,
  teacherId: string,
  data: { name: string; gradeLevel?: string; subjectId: string; color?: string }
) {
  let code = generateJoinCode()
  // reintenta si hay colisión (rarísimo, pero por las dudas)
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data: row, error } = await supabase
      .from('classrooms')
      .insert({
        teacher_id: teacherId,
        name: data.name,
        grade_level: data.gradeLevel ?? null,
        subject_id: data.subjectId,
        join_code: code,
        color: data.color ?? '#FF6B00',
      })
      .select()
      .single()

    if (!error) return row
    if (error.code === '23505') { code = generateJoinCode(); continue } // unique_violation
    throw error
  }
  throw new Error('No se pudo generar un código único, intenta de nuevo.')
}

export async function getTeacherClassrooms(supabase: SupabaseClient, teacherId: string) {
  const { data, error } = await supabase
    .from('classrooms')
    .select('*, classroom_members(count)')
    .eq('teacher_id', teacherId)
    .eq('archived', false)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getStudentClassrooms(supabase: SupabaseClient, studentId: string) {
  const { data, error } = await supabase
    .from('classroom_members')
    .select('classroom:classrooms(*, teacher:profiles!classrooms_teacher_id_fkey(first_name,last_name))')
    .eq('student_id', studentId)
  if (error) throw error
  return data.map(d => d.classroom)
}

export async function joinClassroomByCode(supabase: SupabaseClient, studentId: string, rawCode: string) {
  const code = rawCode.trim().toUpperCase().replace(/\s+/g, '')

  const { data: classroom, error: findError } = await supabase
    .from('classrooms')
    .select('id, name')
    .eq('join_code', code)
    .eq('archived', false)
    .single()

  if (findError || !classroom) {
    throw new Error('CODE_NOT_FOUND')
  }

  const { error: insertError } = await supabase
    .from('classroom_members')
    .insert({ classroom_id: classroom.id, student_id: studentId })

  if (insertError) {
    if (insertError.code === '23505') throw new Error('ALREADY_JOINED')
    throw insertError
  }

  return classroom
}

export async function leaveClassroom(supabase: SupabaseClient, studentId: string, classroomId: string) {
  const { error } = await supabase
    .from('classroom_members')
    .delete()
    .eq('classroom_id', classroomId)
    .eq('student_id', studentId)
  if (error) throw error
}