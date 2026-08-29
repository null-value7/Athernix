// app/api/classrooms/mine/route.ts  (para el estudiante: sus clases unidas)
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { getStudentClassrooms } from '@/models/classroom'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const classrooms = await getStudentClassrooms(supabase, user.id)
  return NextResponse.json({ classrooms })
}
