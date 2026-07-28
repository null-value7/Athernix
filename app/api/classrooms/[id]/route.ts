// app/api/classrooms/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const body = await req.json()
  const classroomId = params.id

  try {
    const { data, error } = await supabase
      .from('classrooms')
      .update({
        name: body.name,
        grade_level: body.gradeLevel,
      })
      .eq('id', classroomId)
      .eq('teacher_id', user.id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ classroom: data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const classroomId = params.id

  try {
    const { error } = await supabase
      .from('classrooms')
      .delete()
      .eq('id', classroomId)
      .eq('teacher_id', user.id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
