// app/api/classrooms/route.ts
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/supabase-server'
import { createClassroom, getTeacherClassrooms } from '@/models/classroom'
import { apiError, getClientIp, isRateLimited, logSecurityEvent, rateLimitResponse } from '@/lib/security'

const createClassroomSchema = z.object({
  name: z.string().trim().min(1).max(100),
  gradeLevel: z.string().trim().max(50).optional(),
  subjectId: z.string().trim().min(1).max(100),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
})

async function requireTeacherOrAdmin(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()
  return profile?.role === 'Teacher' || profile?.role === 'admin'
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return apiError(401, 'No autenticado')

  if (!(await requireTeacherOrAdmin(supabase, user.id))) {
    logSecurityEvent('auth.forbidden', { route: '/api/classrooms', userId: user.id })
    return apiError(403, 'Sin permisos')
  }

  try {
    const classrooms = await getTeacherClassrooms(supabase, user.id)
    return Response.json({ classrooms })
  } catch (e) {
    console.error('[classrooms] GET:', e instanceof Error ? e.message : e)
    return apiError(500, 'Error al obtener las clases')
  }
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return apiError(401, 'No autenticado')

  const rlKey = `classrooms-create:${user.id}`
  if (isRateLimited(rlKey, 10, 60_000)) {
    logSecurityEvent('rate_limited', { route: '/api/classrooms', userId: user.id })
    return rateLimitResponse(rlKey)
  }

  if (!(await requireTeacherOrAdmin(supabase, user.id))) {
    logSecurityEvent('auth.forbidden', { route: '/api/classrooms', userId: user.id, ip: getClientIp(req) })
    return apiError(403, 'Solo docentes pueden crear clases')
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return apiError(400, 'Cuerpo de petición inválido')
  }

  const parsed = createClassroomSchema.safeParse(body)
  if (!parsed.success) {
    return apiError(400, 'Datos de clase inválidos')
  }

  try {
    const classroom = await createClassroom(supabase, user.id, parsed.data)
    return Response.json({ classroom }, { status: 201 })
  } catch (e) {
    console.error('[classrooms] POST:', e instanceof Error ? e.message : e)
    return apiError(500, 'Error al crear la clase')
  }
}
