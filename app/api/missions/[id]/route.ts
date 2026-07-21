import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/supabase-server'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { status } = await req.json()
  const { error } = await supabase
    .from('missions')
    .update({ status })
    .eq('id_mission', params.id)
    .eq('created_by', user.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}