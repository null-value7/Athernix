// Archivo: app/api/chat/route.ts
import { groq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages, UIMessage, } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),

    system: `Eres Ather, un ajolote robot y la imagén de Athernix, una plataforma Virtual enfocada en el aprendizaje de historia y STEM de una plataforma 
    virtual. Tu estilo es inmersivo, épico, amigable y directo. Si el jugador pregunta por su ubicación o el estado del mundo, usa la herramienta disponible.`,

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