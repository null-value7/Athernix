// app/api/classrooms/join/route.ts
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/supabase-server'
import { joinClassroomByCode } from '@/models/classroom'
import { apiError, isRateLimited, logSecurityEvent, rateLimitResponse } from '@/lib/security'

const joinSchema = z.object({
  code: z.string().trim().min(4).max(12).regex(/^[A-Za-z0-9\s-]+$/, 'Código inválido'),
})

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return apiError(401, 'No autenticado')

  // Anti fuerza bruta sobre los códigos de clase: 10 intentos/min por usuario
  const rlKey = `classroom-join:${user.id}`
  if (isRateLimited(rlKey, 10, 60_000)) {
    logSecurityEvent('rate_limited', { route: '/api/classrooms/join', userId: user.id })
    return rateLimitResponse(rlKey)
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return apiError(400, 'Cuerpo de petición inválido')
  }

  const parsed = joinSchema.safeParse(body)
  if (!parsed.success) {
    return apiError(400, 'Código inválido')
  }

  try {
    const classroom = await joinClassroomByCode(supabase, user.id, parsed.data.code)
    return Response.json({ classroom })
  } catch (e) {
    const msg = e instanceof Error ? e.message : ''
    if (msg === 'CODE_NOT_FOUND') return apiError(404, 'Código inválido')
    if (msg === 'ALREADY_JOINED') return apiError(409, 'Ya estás en esta clase')
    console.error('[classrooms/join]', e instanceof Error ? e.message : e)
    return apiError(500, 'Error al unirse a la clase')
  }
}
