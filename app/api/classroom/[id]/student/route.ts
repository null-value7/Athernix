// app/api/classrooms/[id]/students/route.ts (ampliado)
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { data: members, error } = await supabase
    .from('classroom_members')
    .select('student:profiles!classroom_members_student_id_fkey(id, first_name, last_name)')
    .eq('classroom_id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const studentIds = members.map((m: any) => m.student.id)
  if (studentIds.length === 0) return NextResponse.json({ students: [] })

  const { data: missionRows } = await supabase
    .from('missions')
    .select('id_mission')
    .eq('classroom_id', params.id)
  const missionIds = (missionRows ?? []).map(m => m.id_mission)

  const { data: progressRows } = await supabase
    .from('user_mission')
    .select('user_id, state')
    .in('mission_id', missionIds.length ? missionIds : [-1])
    .in('user_id', studentIds)

  const { data: xpRows } = await supabase
    .from('experience')
    .select('user_id, current_points')
    .in('user_id', studentIds)

  const students = members.map((m: any) => {
    const done = (progressRows ?? []).filter(p => p.user_id === m.student.id && p.state).length
    const xp = (xpRows ?? []).find(x => x.user_id === m.student.id)?.current_points ?? 0
    return {
      id: m.student.id,
      name: `${m.student.first_name ?? ''} ${m.student.last_name ?? ''}`.trim(),
      initials: `${m.student.first_name?.[0] ?? ''}${m.student.last_name?.[0] ?? ''}`.toUpperCase(),
      missionsDone: done,
      missionsTotal: missionIds.length,
      xp,
      level: Math.max(1, Math.floor(xp / 500) + 1),
      streakDays: 0, // no existe en tu schema aún
      lastActive: '—', // no existe en tu schema aún
      status: missionIds.length && done / missionIds.length < 0.3 ? 'en_riesgo' : 'al_dia',
    }
  })

  return NextResponse.json({ students })
}