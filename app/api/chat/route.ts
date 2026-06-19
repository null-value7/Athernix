// Archivo: app/api/chat/route.ts
import { groq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages, UIMessage, } from 'ai';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/supabase-server';

export const maxDuration = 30;
export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const supabase = await createClient();

  const {data: {user}} = await supabase.auth.getUser();
  let userName = "Viajero desconocido";
  if (user) {
    const { data: profile, error } = await supabase.from('profiles').select('first_name, last_name').eq('id', user.id).single();
    if (profile) {
      userName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
    }
  }

  const systemPrompt = `Eres Ather, un ajolote robot y la imagen de Athernix, 
  una plataforma virtual enfocada en el aprendizaje de historia y STEM. 
  
  El usuario con el que estás interactuando se llama: ${userName}.
  
  Tu estilo es inmersivo, épico, amigable y directo. 
  Si el jugador pregunta por su ubicación, el estado del mundo o cosas sobre sí mismo, 
  usa las herramientas disponibles para responder. Mantén siempre tu personalidad de ajolote robot.`;

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),

    tools: {
      getGameInfo: {
        description: 'Obtiene información sobre la ubicación actual y el estado del mundo en el juego Athernix.',
        inputSchema: z.object({}),
        execute: async () => {
          return {
            location: "Valle de los Ecos",
            timeOfDay: "Atardecer",
            dangerLevel: "Alto",
            nearbyMonsters: ["Sombra de obsidiana", "Golem de roca"]
          };
        },
      },
    },
  });

  return result.toUIMessageStreamResponse();
}