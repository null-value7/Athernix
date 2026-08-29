// app/api/classrooms/join/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { joinClassroomByCode } from '@/models/classroom'

export async function POST(req: NextRequest) {
  console.log('DEBUG POST /api/classrooms/join called')
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  console.log('DEBUG user:', user?.id, user?.email)
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const body = await req.json()
  console.log('DEBUG body:', body)
  const { code } = body
  if (!code) return NextResponse.json({ error: 'Código requerido' }, { status: 400 })

  try {
    const classroom = await joinClassroomByCode(supabase, user.id, code)
    console.log('DEBUG classroom joined:', classroom)
    return NextResponse.json({ classroom })
  } catch (e: any) {
    console.error('ERROR joinClassroomByCode:', e)
    if (e.message === 'CODE_NOT_FOUND') return NextResponse.json({ error: 'Código inválido' }, { status: 404 })
    if (e.message === 'ALREADY_JOINED') return NextResponse.json({ error: 'Ya estás en esta clase' }, { status: 409 })
    return NextResponse.json({ error: 'Error al unirse', details: e.message }, { status: 500 })
  }
}
