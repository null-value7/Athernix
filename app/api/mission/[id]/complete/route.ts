// app/api/missions/[id]/complete/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'
import { toggleMissionCompletion } from '@/models/mission'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { completed } = await req.json()
  await toggleMissionCompletion(supabase, user.id, Number(params.id), completed)
  return NextResponse.json({ ok: true })
}