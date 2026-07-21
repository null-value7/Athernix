import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { createMission, getMissionsForStudent, getMissionsForClassroom } from '@/models/mission'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const classroomId = req.nextUrl.searchParams.get('classroomId')
  const missions = classroomId
    ? await getMissionsForClassroom(supabase, classroomId)
    : await getMissionsForStudent(supabase, user.id)

  return NextResponse.json({ missions })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const body = await req.json()
  try {
    const mission = await createMission(supabase, user.id, body)
    return NextResponse.json({ mission }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}