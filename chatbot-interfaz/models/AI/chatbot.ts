export interface AltChatMessage {
  role: 'user' | 'ai'
  text: string
  timestamp: number
  toolInvocations?: any[]
}

export const ALT_QUICK_PROMPTS = [
  'Explícame vectores',
  'Diagrama de flujo',
  'Calculadora física',
  'Análisis de datos',
]
