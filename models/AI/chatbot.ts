// model/altChatModel.ts

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
  sessions: [
    {
      id: 's1',
      title: 'Historia VR · Joya de Cerén',
      date:  'Hoy',
      msgs: [
        { role: 'user', text: '¿Qué puedo ver en el tour de Joya de Cerén?' },
        { role: 'ai',   text: 'En el tour virtual de Joya de Cerén encontrarás reconstrucciones detalladas de las estructuras mayas, incluyendo hogares, depósitos de alimentos y la milpa. Todo en resolución 8K con guía IA multilingüe.' },
      ],
    },
    {
      id: 's2',
      title: 'Terapia XR · Biofeedback',
      date:  'Ayer',
      msgs: [
        { role: 'user', text: '¿Cómo funciona el biofeedback en MenteLibre?' },
        { role: 'ai',   text: 'El sistema XR monitorea tus señales fisiológicas en tiempo real y adapta el entorno virtual para reducir el estrés. Estudios muestran -40% en ansiedad tras 3 sesiones.' },
      ],
    },
    {
      id: 's3',
      title: 'STEM · Física Cuántica',
      date:  'Hace 3 días',
      msgs: [
        { role: 'user', text: 'Explícame el entrelazamiento cuántico' },
        { role: 'ai',   text: 'El entrelazamiento cuántico es un fenómeno donde dos partículas comparten estado cuántico sin importar la distancia. En QuantumLab puedes simularlo con pares EPR interactivos.' },
      ],
    },
  ],
  currentSession: null,
  messages:       [],
  input:          '',
  busy:           false,
  sidebarOpen:    false,
  hasMessages:    false,
}

export const ALT_QUICK_PROMPTS: string[] = [
  '¿Qué módulos STEM están disponibles?',
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