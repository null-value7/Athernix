// ElevenLabs files and imports
import { createClient } from '@/lib/supabase/supabase-server';
import {
  apiError,
  getClientIp,
  isRateLimited,
  logSecurityEvent,
  rateLimitResponse,
  sanitizeAiInput,
} from '@/lib/security';

export const maxDuration = 30;

// ElevenLabs cobra por carácter: límites estrictos de texto y de frecuencia.
const MAX_TEXT_CHARS = 2000;
const RATE_LIMIT = { limit: 30, windowMs: 60_000 }; // 30 audios/min por usuario

// Voz premade gratuita de ElevenLabs ("Brian") — bilingüe ES/EN con
// eleven_multilingual_v2. Se puede sobreescribir con ELEVENLABS_VOICE_ID.
const DEFAULT_VOICE_ID = 'nPczCjzI2devNBz1zQrb';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    logSecurityEvent('auth.required', { route: '/api/tts', ip: getClientIp(req) });
    return apiError(401, 'No autenticado');
  }

  const rlKey = `tts:${user.id}`;
  if (isRateLimited(rlKey, RATE_LIMIT.limit, RATE_LIMIT.windowMs)) {
    logSecurityEvent('rate_limited', { route: '/api/tts', userId: user.id });
    return rateLimitResponse(rlKey);
  }

  const ai = await import('ai');
  const { elevenlabs } = await import('@ai-sdk/elevenlabs');
  const generateSpeech = ai.experimental_generateSpeech;

  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string' || !text.trim()) {
      return apiError(400, 'Texto vacío');
    }

    // Límite defensivo: evita generar audio de mensajes gigantes por accidente
    // (costo por caracter en ElevenLabs). Ajusta según tu caso de uso.
    const safeText = sanitizeAiInput(text, MAX_TEXT_CHARS);

    const { audio } = await generateSpeech({
      model: elevenlabs.speech('eleven_multilingual_v2'),
      text: safeText,
      voice: process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID,
      providerOptions: {
        elevenlabs: {
          stability: 0.5,
          similarity_boost: 0.75,
          use_speaker_boost: true,
        },
      },
    });

    // Uint8Array nuevo: garantiza un ArrayBuffer plano (no SharedArrayBuffer),
    const audioBytes = new Uint8Array(audio.uint8Array);

    const audioBlob = new Blob([audioBytes], {
      type: audio.mediaType ?? 'audio/mpeg',
    });

    return new Response(audioBlob, {
      headers: {
        'Content-Type': audio.mediaType ?? 'audio/mpeg',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[TTS] Error generando audio con ElevenLabs:', err instanceof Error ? err.message : err);
    return apiError(500, 'No se pudo generar el audio');
  }
}
