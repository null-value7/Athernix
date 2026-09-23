// app/api/missions/route.ts
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/supabase-server'
import { createMission, getMissionsForStudent, getMissionsForClassroom } from '@/models/mission'
import { apiError, isRateLimited, logSecurityEvent, rateLimitResponse } from '@/lib/security'

const createMissionSchema = z.object({
  classroomId: z.string().trim().min(1).max(100),
  subjectId: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).optional().default(''),
  difficulty: z.enum(['fácil', 'media', 'difícil', 'facil', 'dificil', 'easy', 'medium', 'hard']).optional().default('media'),
  xpReward: z.number().int().min(0).max(100000).optional().default(0),
  dueDate: z.string().trim().max(50).optional().default(''),
})

// ¿El usuario es docente de la clase o estudiante inscrito en ella?
async function canReadClassroom(supabase: Awaited<ReturnType<typeof createClient>>, classroomId: string, userId: string) {
  const { data: classroom } = await supabase
    .from('classrooms')
    .select('teacher_id')
    .eq('id', classroomId)
    .single()

  if (!classroom) return 'not_found' as const
  if (classroom.teacher_id === userId) return 'ok' as const

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()
  if (profile?.role === 'admin') return 'ok' as const

  const { data: membership } = await supabase
    .from('classroom_members')
    .select('student_id')
    .eq('classroom_id', classroomId)
    .eq('student_id', userId)
    .maybeSingle()

  return membership ? 'ok' as const : 'forbidden' as const
}

async function canWriteClassroom(supabase: Awaited<ReturnType<typeof createClient>>, classroomId: string, userId: string) {
  const { data: classroom } = await supabase
    .from('classrooms')
    .select('teacher_id')
    .eq('id', classroomId)
    .single()

  if (!classroom) return 'not_found' as const
  if (classroom.teacher_id === userId) return 'ok' as const

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()
  return profile?.role === 'admin' ? 'ok' as const : 'forbidden' as const
}

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return apiError(401, 'No autenticado')

  const classroomId = req.nextUrl.searchParams.get('classroomId')

  try {
    if (classroomId) {
      const access = await canReadClassroom(supabase, classroomId, user.id)
      if (access === 'not_found') return apiError(404, 'Clase no encontrada')
      if (access === 'forbidden') {
        logSecurityEvent('auth.forbidden', { route: '/api/missions', userId: user.id })
        return apiError(403, 'Sin permisos')
      }
      const missions = await getMissionsForClassroom(supabase, classroomId)
      return Response.json({ missions })
    }

    const missions = await getMissionsForStudent(supabase, user.id)
    return Response.json({ missions })
  } catch (e) {
    console.error('[missions] GET:', e instanceof Error ? e.message : e)
    return apiError(500, 'Error al obtener las misiones')
  }
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return apiError(401, 'No autenticado')

  const rlKey = `missions-create:${user.id}`
  if (isRateLimited(rlKey, 20, 60_000)) {
    logSecurityEvent('rate_limited', { route: '/api/missions', userId: user.id })
    return rateLimitResponse(rlKey)
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return apiError(400, 'Cuerpo de petición inválido')
  }

  const parsed = createMissionSchema.safeParse(body)
  if (!parsed.success) {
    return apiError(400, 'Datos de misión inválidos')
  }

  // Solo el docente dueño de la clase (o admin) puede crear misiones en ella
  const access = await canWriteClassroom(supabase, parsed.data.classroomId, user.id)
  if (access === 'not_found') return apiError(404, 'Clase no encontrada')
  if (access === 'forbidden') {
    logSecurityEvent('auth.forbidden', { route: '/api/missions', userId: user.id })
    return apiError(403, 'Sin permisos')
  }

  try {
    const mission = await createMission(supabase, user.id, parsed.data)
    return Response.json({ mission }, { status: 201 })
  } catch (e) {
    console.error('[missions] POST:', e instanceof Error ? e.message : e)
    return apiError(500, 'Error al crear la misión')
  }
}
