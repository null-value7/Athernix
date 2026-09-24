// app/api/transcribe/route.ts
import { createClient } from '@/lib/supabase/supabase-server';
import {
  apiError,
  AUDIO_UPLOAD,
  getClientIp,
  isRateLimited,
  logSecurityEvent,
  rateLimitResponse,
  validateUpload,
} from '@/lib/security';

export const maxDuration = 30;

const RATE_LIMIT = { limit: 20, windowMs: 60_000 }; // 20 transcripciones/min por usuario

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    logSecurityEvent('auth.required', { route: '/api/transcribe', ip: getClientIp(req) });
    return apiError(401, 'No autenticado');
  }

  const rlKey = `transcribe:${user.id}`;
  if (isRateLimited(rlKey, RATE_LIMIT.limit, RATE_LIMIT.windowMs)) {
    logSecurityEvent('rate_limited', { route: '/api/transcribe', userId: user.id });
    return rateLimitResponse(rlKey);
  }

  try {
    const formData = await req.formData();
    const audio = formData.get('audio');

    if (!(audio instanceof File)) {
      return apiError(400, 'No se recibió archivo de audio');
    }

    // Validación de subida: tipo MIME/extensión y tamaño máximo
    const rejection = validateUpload(audio, AUDIO_UPLOAD);
    if (rejection) {
      logSecurityEvent('upload.rejected', {
        route: '/api/transcribe',
        userId: user.id,
        size: audio.size,
        type: audio.type,
      });
      return apiError(400, rejection);
    }

    const groqFormData = new FormData();
    groqFormData.append('file', audio);
    groqFormData.append('model', 'whisper-large-v3-turbo');
    groqFormData.append('language', 'es');
    groqFormData.append('response_format', 'json');

    const res = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: groqFormData,
    });

    if (!res.ok) {
      console.error('[transcribe] Groq API error:', res.status);
      return apiError(502, 'La transcripción falló');
    }

    const data = await res.json() as { text?: string };
    return Response.json({ text: data.text ?? '' });
  } catch (err) {
    console.error('[transcribe]', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'La transcripción falló');
  }
}
