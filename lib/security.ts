// lib/security.ts
// Utilidades de seguridad del lado del servidor para las rutas /api/*.
//
// Nota sobre el rate limiter: es un contador en memoria por aislado del
// Worker de Cloudflare. No es globalmente exacto (cada aislado lleva su
// propia cuenta), pero frena abusos triviales y ráfagas. Para límites
// estrictos globales conviene además una regla de Rate Limiting en el
// dashboard de Cloudflare (Security → WAF → Rate limiting rules).

// ── Tipos de eventos auditables ──────────────────────────────
export type SecurityEvent =
  | 'auth.required'          // request sin sesión a endpoint protegido
  | 'auth.forbidden'         // sesión válida pero sin permisos
  | 'rate_limited'           // límite de requests excedido
  | 'validation.failed'      // body/params inválidos
  | 'upload.rejected'        // archivo rechazado por tipo/tamaño
  | 'injection.suspected'    // posible prompt injection
  | 'csrf.blocked'           // Origin no coincide con el host

// ── Logger de eventos de seguridad ───────────────────────────
// Salida estructurada → visible en `wrangler tail` / dashboard de
// observabilidad de Workers. NUNCA loguear passwords, tokens ni el
// body completo de una petición.
export function logSecurityEvent(
  event: SecurityEvent,
  detail: Record<string, unknown> = {}
) {
  console.warn(
    JSON.stringify({
      atx_security: true,
      event,
      ts: new Date().toISOString(),
      ...detail,
    })
  )
}

// ── IP del cliente ───────────────────────────────────────────
export function getClientIp(req: Request): string {
  return (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  )
}

// ── Rate limiter (sliding window en memoria) ─────────────────
interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()
const MAX_BUCKETS = 5000

/**
 * Devuelve true si la key excede `limit` requests en `windowMs`.
 * Pensado para llamarse una vez por request.
 */
export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()

  // Limpieza oportunista para no crecer sin límite
  if (buckets.size > MAX_BUCKETS) {
    for (const [k, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(k)
    }
  }

  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return false
  }

  bucket.count += 1
  return bucket.count > limit
}

/** Segundos hasta que se reinicia la ventana de la key (para Retry-After). */
export function retryAfterSeconds(key: string): number {
  const bucket = buckets.get(key)
  if (!bucket) return 0
  return Math.max(0, Math.ceil((bucket.resetAt - Date.now()) / 1000))
}

// ── Respuestas de error genéricas ────────────────────────────
// Nunca exponer e.message ni detalles internos al cliente.
export function apiError(status: number, message: string): Response {
  return Response.json({ error: message }, { status })
}

export function rateLimitResponse(key: string): Response {
  const retry = retryAfterSeconds(key)
  return Response.json(
    { error: 'Demasiadas solicitudes. Intenta de nuevo en unos segundos.' },
    { status: 429, headers: { 'Retry-After': String(Math.max(retry, 1)) } }
  )
}

// ── Sanitización de input para prompts de IA ─────────────────
const isControlChar = (ch: string) => { const c = ch.codePointAt(0) ?? 32; return c < 32 || c === 127 }

export function sanitizeAiInput(raw: string, maxLen = 4000): string {
  let out = ''
  for (const ch of raw) out += isControlChar(ch) ? ' ' : ch
  return out.replace(/\s{3,}/g, '  ').slice(0, maxLen).trim()
}

// Patrones típicos de prompt injection (EN/ES). No bloquean por sí solos:
// sirven para auditar y para reforzar el system prompt con una advertencia.
const INJECTION_PATTERNS = [
  /ignore\s+(all|any|the)\s+(previous|above|prior|earlier)\s+(instructions?|prompts?|rules?)/i,
  /ignora\s+(todas?\s+)?(las\s+)?(instrucciones|reglas|indicaciones)/i,
  /olvida\s+(todo|tu\s+programaci[oó]n|las\s+instrucciones)/i,
  /disregard\s+(all|any)\s+(instructions?|rules?)/i,
  /reveal\s+(your|the)\s+(system\s+)?prompt/i,
  /muestra\s+(tu|el)\s+(prompt|system\s*prompt|instrucciones)/i,
  /you\s+are\s+now\s+(a|an|in)\s+/i,
  /ahora\s+eres\s+(un|una)\s+/i,
  /\bDAN\b\s*(mode|prompt)?/i,
  /jailbreak/i,
  /act\s+as\s+(if\s+)?(you\s+have\s+)?no\s+(rules|restrictions|limits)/i,
]

/** true si el texto parece un intento de prompt injection. */
export function looksLikeInjection(text: string): boolean {
  return INJECTION_PATTERNS.some((re) => re.test(text))
}

// ── Validación de archivos subidos ───────────────────────────
export const IMAGE_UPLOAD = {
  maxBytes: 2 * 1024 * 1024, // 2 MB
  mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  extensions: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
}

export const AUDIO_UPLOAD = {
  maxBytes: 10 * 1024 * 1024, // 10 MB
  mimeTypes: [
    'audio/webm', 'audio/mpeg', 'audio/mp4', 'audio/mp3',
    'audio/wav', 'audio/x-wav', 'audio/ogg', 'audio/m4a',
    'audio/x-m4a', 'audio/flac', 'video/webm', // algunos navegadores mandan video/webm en MediaRecorder
  ],
}

export function validateUpload(
  file: { size: number; type: string; name?: string },
  rules: { maxBytes: number; mimeTypes: string[]; extensions?: string[] }
): string | null {
  if (file.size <= 0) return 'El archivo está vacío'
  if (file.size > rules.maxBytes) return 'El archivo supera el tamaño máximo permitido'
  const mimeOk = rules.mimeTypes.includes(file.type)
  const ext = file.name?.split('.').pop()?.toLowerCase() ?? ''
  const extOk = rules.extensions ? rules.extensions.includes(ext) : true
  if (!mimeOk && !extOk) return 'Tipo de archivo no permitido'
  return null
}
