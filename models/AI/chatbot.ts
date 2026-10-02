import { createBrowserClient } from "@supabase/ssr";
import { UIMessage } from 'ai';

//DB Connection

function getSupabase(){
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}

export type MessageRole = 'user' | 'ai'

export interface AltChatMessage {
  id: string | number
  role: MessageRole
  text: string
  toolInvocations?: any[]
  parts?: any[]            // UIMessage parts completos (texto + tool outputs) — persistidos en DB
}

// Contexto de aprendizaje que viaja en ather_prefill_prompt → /api/chat
export interface LearningContext {
  area?:   string   // 'fisica' | 'biologia' | 'astronomia' | 'matematicas' | 'programacion' | 'quimica'
  nodeId?: string   // id del nodo de roadmap
  label?:  string   // nombre legible del nodo/tema
  level?:  string   // 'básico' | 'intermedio' | 'avanzado'
}

// Payload que puede guardarse en sessionStorage('ather_prefill_prompt'):
// un string plano (legacy) o un objeto { prompt, context }
export interface PrefillPayload {
  prompt:  string
  context?: LearningContext
}

export interface AltChatSession {
  id:    string
  title: string
  date:  string
  msgs:  AltChatMessage[]
}

export interface AltChatState {
  sessions:       AltChatSession[]
  currentSession: string | null
  messages:       AltChatMessage[]
  input:          string
  busy:           boolean
  sidebarOpen:    boolean
  hasMessages:    boolean
}

export const initialAltChatState: AltChatState = {
  sessions: [],
  currentSession: null,
  messages:       [],
  input:          '',
  busy:           false,
  sidebarOpen:    false,
  hasMessages:    false,

}

export const ALT_QUICK_PROMPTS: string[] = [
  '¿Qué puedes hacer como asistente?',
  '¿Qué logros puedo desbloquear?',
  'Explícame qué es Athernix',
  '¿Cómo funciona la terapia XR?',
]

// ── Stream parser — SSE / JSON delta / plain text ─────────────
export function parseAltStreamChunk(line: string): string {
  if (line.startsWith('data: ')) {
    const data = line.slice(6).trim()
    if (data === '[DONE]') return ''
    try {
      const j = JSON.parse(data)
      return j.choices?.[0]?.delta?.content ?? j.delta?.text ?? ''
    } catch {
      return data
    }
  }
  if (line && !line.startsWith(':') && !line.startsWith('event:')) {
    try {
      const j = JSON.parse(line)
      return j.content ?? j.text ?? ''
    } catch {
      return line.length > 1 ? line : ''
    }
  }
  return ''
}

export function makeAltSessionTitle(text: string): string {
  return text.split(' ').slice(0, 5).join(' ') + '…'
}

//DB sessions and querys

export interface ChatSessionRow{
  id: string
  user_id: string
  title: string 
  created_at: string 
  updated_at: string
  is_archived: boolean
}

export interface ChatMessageRow{
  id: number
  session_id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  parts?: any[] | null
  created_at: string
}

//Date Classify 
export function formatRelativeDate(iso: string): string {
  const date     = new Date(iso)
  const now      = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86_400_000)
 
  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7)   return `Hace ${diffDays} días`
  return new Intl.DateTimeFormat('es-SV', { day: 'numeric', month: 'short' }).format(date)
}

// Session List 
export async function fetchUserSessions(): Promise<AltChatSession[]> {
  const supabase = getSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
 
  const { data, error } = await supabase.from('chat_sessions').select('*').eq('user_id', user.id).eq('is_archived', false).order('updated_at', { ascending: false })
 
  if (error || !data) return []
 
  return (data as ChatSessionRow[]).map(row => ({
    id:    row.id,
    title: row.title,
    date:  formatRelativeDate(row.updated_at),
    msgs:  [], // se llenan al hacer loadSession()
  }))
}

//Update all messages
export async function fetchSessionMessages(sessionId: string): Promise<AltChatMessage[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase.from('chat_messages').select('*').eq('session_id', sessionId).order('created_at', { ascending: true })
  if (error || !data) return []
 
  return (data as ChatMessageRow[]).map(row => ({
    id: row.id,
    role: row.role === 'assistant' ? 'ai' : 'user',
    text: row.content,
    parts: row.parts ?? undefined,
  }))
}

// New Session
export async function createChatSession(title: string): Promise<{ id: string } | null> {
  const supabase = getSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
 
  const { data, error } = await supabase.from('chat_sessions').insert({ user_id: user.id, title }).select('id').single()
 
  if (error || !data) return null
  return { id: data.id }
}
 
// Update Messages
 
export async function insertChatMessage(
  sessionId: string,
  role: 'user' | 'assistant',
  content: string,
  parts?: any[]
): Promise<boolean> {
  if (!content.trim() && !parts?.length) return false // evita guardar mensajes vacíos
  const supabase = getSupabase()
  const { error } = await supabase
    .from('chat_messages')
    .insert({ session_id: sessionId, role, content, parts: parts ?? null })
  return !error
}

// ── Study artifacts (Fase 1: biblioteca de repaso + base SM-2) ──

export interface StudyArtifactRow {
  id:         string
  user_id:    string
  session_id: string | null
  area:       string | null
  type:       'flashcards' | 'timeline' | 'comparison' | 'sources' | 'quiz'
  title:      string
  payload:    any
  sr_ease_factor:    number
  sr_interval_days:  number
  sr_repetitions:    number
  sr_next_review_at: string
  sr_last_reviewed_at: string | null
  mastery:    number
  created_at: string
}

// Guarda (o actualiza si ya existe mismo type+title en la sesión) un artifact.
// Devuelve el id persistido o null si no hay usuario.
export async function upsertStudyArtifact(input: {
  sessionId?: string | null
  area?:      string | null
  type:       StudyArtifactRow['type']
  title:      string
  payload:    any
}): Promise<string | null> {
  const supabase = getSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Dedupe: mismo usuario+sesión+tipo+título → actualiza payload en vez de duplicar
  let q = supabase
    .from('study_artifacts')
    .select('id')
    .eq('user_id', user.id)
    .eq('type', input.type)
    .eq('title', input.title)

  // session_id es uuid nullable: .eq(col, '') jamás matchea — usar .is para null
  q = input.sessionId ? q.eq('session_id', input.sessionId) : q.is('session_id', null)

  const { data: existing } = await q.maybeSingle()

  if (existing?.id) {
    await supabase
      .from('study_artifacts')
      .update({ payload: input.payload })
      .eq('id', existing.id)
    return existing.id
  }

  const { data, error } = await supabase
    .from('study_artifacts')
    .insert({
      user_id:    user.id,
      session_id: input.sessionId ?? null,
      area:       input.area ?? null,
      type:       input.type,
      title:      input.title,
      payload:    input.payload,
    })
    .select('id')
    .single()

  return error ? null : data.id
}

export async function fetchStudyArtifacts(): Promise<StudyArtifactRow[]> {
  const supabase = getSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  const { data, error } = await supabase
    .from('study_artifacts')
    .select('*')
    .eq('user_id', user.id)
    .order('sr_next_review_at', { ascending: true })
  return (error || !data) ? [] : data as StudyArtifactRow[]
}

// ── User node progress (Fase 2: desbloqueo real de roadmaps) ──

export type NodeProgressStatus = 'locked' | 'available' | 'completed' | 'needs_review'

export interface UserNodeProgressRow {
  user_id:           string
  area:              string
  node_id:           string
  status:            NodeProgressStatus
  attempts:          number
  best_score:        number
  last_score:        number
  last_attempted_at: string | null
  completed_at:      string | null
}

// Mapa node_id → row para un área. null si no hay usuario autenticado
// (los roadmaps conservan su comportamiento estático como fallback).
export async function fetchNodeProgress(area: string): Promise<Record<string, UserNodeProgressRow> | null> {
  const supabase = getSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('user_node_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('area', area)

  if (error || !data) return {}
  const map: Record<string, UserNodeProgressRow> = {}
  for (const row of data as UserNodeProgressRow[]) map[row.node_id] = row
  return map
}

// Nota: el resultado del quiz NO se envía desde el cliente — se califica
// server-side en /api/quiz/submit contra generated_quizzes (integridad).

