// app/api/classrooms/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { createClassroom, getTeacherClassrooms } from '@/models/classroom'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const classrooms = await getTeacherClassrooms(supabase, user.id)
  return NextResponse.json({ classrooms })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const body = await req.json()
  if (!body.name || !body.subjectId) {
    return NextResponse.json({ error: 'name y subjectId son requeridos' }, { status: 400 })
  }

  try {
    const classroom = await createClassroom(supabase, user.id, body)
    return NextResponse.json({ classroom }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
