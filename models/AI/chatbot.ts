import { createBrowserClient } from "@supabase/ssr";
//DB Connection

function getSupabase(){
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}

export type MessageRole = 'user' | 'ai'

export interface AltChatMessage {
  role: MessageRole
  text: string
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
    role: row.role === 'assistant' ? 'ai' : 'user',
    text: row.content,
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
  content: string
): Promise<boolean> {
  if (!content.trim()) return false // evita guardar mensajes vacíos
  const supabase = getSupabase()
  const { error } = await supabase
    .from('chat_messages')
    .insert({ session_id: sessionId, role, content })
  return !error
}

