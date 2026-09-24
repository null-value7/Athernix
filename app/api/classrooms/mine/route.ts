// app/api/classrooms/mine/route.ts  (para el estudiante: sus clases unidas)
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { getStudentClassrooms } from '@/models/classroom'
import { apiError } from '@/lib/security'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return apiError(401, 'No autenticado')

  try {
    const classrooms = await getStudentClassrooms(supabase, user.id)
    return NextResponse.json({ classrooms })
  } catch (e) {
    console.error('[classrooms/mine]', e instanceof Error ? e.message : e)
    return apiError(500, 'Error al obtener tus clases')
  }
}
