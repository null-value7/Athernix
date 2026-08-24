// ElevenLabs files and imports
import { experimental_generateSpeech as generateSpeech } from 'ai';
import { elevenlabs } from '@ai-sdk/elevenlabs';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string' || !text.trim()) {
      return new Response(JSON.stringify({ error: 'Texto vacío' }), { status: 400 });
    }

    // Límite defensivo: evita generar audio de mensajes gigantes por accidente
    // (costo por caracter en ElevenLabs). Ajusta según tu caso de uso.
    const safeText = text.slice(0, 2000);

    const { audio } = await generateSpeech({
      model: elevenlabs.speech('eleven_multilingual_v2'),
      text: safeText,
      voice: process.env.ELEVENLABS_VOICE_ID!,
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
  } catch (err: any) {
    console.error('[TTS] Error generando audio con ElevenLabs:', err?.message ?? err);
    return new Response(JSON.stringify({ error: 'No se pudo generar el audio' }), { status: 500 });
  }
}
export const runtime = 'edge';
