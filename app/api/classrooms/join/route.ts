// app/api/classrooms/join/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { joinClassroomByCode } from '@/models/classroom'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { code } = await req.json()
  if (!code) return NextResponse.json({ error: 'Código requerido' }, { status: 400 })

  try {
    const classroom = await joinClassroomByCode(supabase, user.id, code)
    return NextResponse.json({ classroom })
  } catch (e: any) {
    if (e.message === 'CODE_NOT_FOUND') return NextResponse.json({ error: 'Código inválido' }, { status: 404 })
    if (e.message === 'ALREADY_JOINED') return NextResponse.json({ error: 'Ya estás en esta clase' }, { status: 409 })
    return NextResponse.json({ error: 'Error al unirse' }, { status: 500 })
  }
}   