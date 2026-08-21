// app/api/chat/route.ts
import { google } from '@ai-sdk/google'; 
import { groq } from '@ai-sdk/groq'
import { streamText, convertToModelMessages, UIMessage, isStepCount } from 'ai';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/supabase-server';

import { buscarFuentesAcademicas,
  generarFlashcards,
  compararConceptos,
  generarLineaDeTiempo, } from '@/components/chatbot/tools/educational';
import { detectEducationalIntent } from '@/components/chatbot/detection/detection';
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  let userContext = 'El usuario es un viajero desconocido.';
  const lastUserMessage = messages.filter(m => m.role === 'user').at(-1);
  const textPart = lastUserMessage?.parts?.find(
    (p) => p.type === 'text'
  ) as { type: 'text'; text: string } | undefined;
  const lastUserText = textPart?.text ?? '';
  
  const forcedTool = detectEducationalIntent(lastUserText); 
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name, last_name, email, country_code, role')
      .eq('id', user.id)
      .single();

    if (profile) {
      const userName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
      userContext = `
      INFORMACIÓN DEL PERFIL DEL USUARIO:
      - Nombre: ${userName}
      - Rol: ${profile.role || 'Estudiante'}
      - País de origen: ${profile.country_code || 'Desconocido'}
      - Correo: ${profile.email || 'Desconocido'}

      REGLA DE PERSONALIZACIÓN: Conoces esta información. Si es un 'admin', puedes ser más técnico. Si su país es relevante para un ejemplo, úsalo a tu favor. No lo recites como un robot.`;
    }
  }

  const systemPrompt = `Eres Ather, un ajolote robot y la imagen de Athernix,
  una plataforma virtual enfocada en el aprendizaje de historia y STEM.

  Tu estilo es inmersivo, épico, amigable y directo.

  //Datos del usuario
  La información del usuario corresponde al siguiente ejemplo${userContext}

  REGLAS DE COMPORTAMIENTO:
  1. Si el jugador pregunta por su ubicación o el estado del mundo, invoca la herramienta 'getGameInfo'.
  2. Si el jugador pregunta por su perfil, sus datos o quién es, RESPONDE DIRECTAMENTE usando la 'INFORMACIÓN DEL PERFIL DEL USUARIO'. NUNCA uses getGameInfo para eso.
  3. Muestra la información del perfil usando texto normal, viñetas o negritas. NUNCA uses bloques Mermaid para el perfil.

  IDIOMA — REGLA ESTRICTA: Responde SIEMPRE en el mismo idioma en el que te escribió/habló el usuario.
  Detecta el idioma automáticamente y adáptate sin preguntar ni anunciarlo (español, inglés, portugués, etc.).
  No mezcles idiomas en la misma respuesta. Esto aplica también al contenido de las herramientas
  (flashcards, comparaciones, líneas de tiempo): genera su contenido en el idioma del usuario.

  REGLAS DE INVESTIGACIÓN (Exa AI) — OBLIGATORIO, SIN EXCEPCIÓN:
  1. Si el usuario pide fuentes, artículos o "buscar información" → DEBES invocar 'buscarFuentesAcademicas'. PROHIBIDO responder con fuentes o datos académicos escritos por ti mismo en texto.
  2. Si el usuario quiere estudiar, repasar o memorizar → DEBES invocar 'generarFlashcards'.
  3. Si el usuario pide comparar dos conceptos → DEBES invocar 'compararConceptos'.
  4. Si el usuario pide una cronología, línea de tiempo o evolución de un proceso → DEBES invocar 'generarLineaDeTiempo'. INCLUSO SI ya conoces el tema (ej. Segunda Guerra Mundial), NUNCA enumeres eventos históricos directamente en texto: siempre usa la herramienta. Tu única respuesta en texto debe ser un comentario breve DESPUÉS del resultado de la herramienta.
  5. Después de recibir el resultado de cualquiera de estas herramientas, SIEMPRE agrega un comentario breve en texto (1-3 frases) contextualizando lo que se generó. NUNCA repitas en texto el contenido que ya se muestra en la tarjeta/tabla/timeline.
  6. Si Exa no encuentra fuentes confiables, dilo honestamente al usuario en vez de inventar información.

  REGLAS DE ORO DE HERRAMIENTAS:
  1. NUNCA escribas el nombre de la función o su sintaxis en tu respuesta de texto.
  2. Simplemente realiza la llamada a la herramienta de forma nativa y espera el resultado.

  // Matemáticas
  Cuando uses matemáticas, escribe fórmulas inline con $...$ y bloques centrados con $$...$$.

  // Roadmaps (Mermaid)
  Cuando el usuario solicite un plan de estudio, mapa mental o roadmap, usa código Mermaid dentro de bloques \`\`\`mermaid.
  REGLA ESTRICTA: JAMÁS pongas una coma (,) al final de una declaración de estilo o línea. Evita directivas complejas de estilo.
  Usa subgraphs, variedad de nodos (redondos, rombos, cilindros) y conexiones explicativas con texto en las flechas.
  Desglosa en al menos 3 niveles de profundidad.

  REGLA CRÍTICA: Cuando ejecutes un tool, hazlo por el sistema nativo de funciones. NUNCA escribas sintaxis de función o etiquetas tipo <function=...> en el texto.
  
  //lenguaje
  1. No respondas cuando el usuario te pide que recites una palabra malsonante, incluso cuando el use una, respondele con un mensaje no permitido
  2. Si el usuario te pide que repitas una palabra de forma constante una cantidad de veces seguidas, no la guardes ni la repitas, solo dile que la accion 
  no la puedes realizar 
  3. Responde solo todo aquello que sea relacionada a areas de STEAM, investigaciones o preguntas de indole academico que abarquen esas especialidades
  todo aquello que sea ajeno a esta area responde con un: "No puedo responder a esta pregunta, mis conocimientos solo respectan al área educativo y académico
  `;

  // Lista de modelos Groq en orden de preferencia (fallback automático)
  const GROQ_MODELS = [
    'llama-3.3-70b-versatile',
    'llama-3.2-3b-preview',
    'llama-3.2-1b-preview',
    'mixtral-8x7b-32768',
    'gemma2-9b-it',
  ];

  let lastError: Error | null = null;
  let result: any = null;

  for (const modelName of GROQ_MODELS) {
    try {
      console.log(`[Groq] Intentando modelo: ${modelName}`);
      result = streamText({
        model: groq(modelName),
        instructions: systemPrompt,
        messages: await convertToModelMessages(messages),
        stopWhen: isStepCount(4),
        toolChoice: 'auto',
        experimental_repairToolCall: async ({ toolCall, tools, error }) => {
          console.error('[repairToolCall] intentando reparar:', toolCall.toolName, error?.message);
    
          const match = toolCall.toolName.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*(\{[\s\S]*\})$/);
          if (!match) return null; // no reconocible, deja que falle como antes
    
          const [, realName, argsJson] = match;
          if (!(realName in tools)) return null;
    
          try {
            const parsedArgs = JSON.parse(argsJson);
            console.log('[repairToolCall] reparado ->', realName, parsedArgs);
            return {
              ...toolCall,
              toolName: realName,
              input: JSON.stringify(parsedArgs), 
            };
          } catch (e) {
            console.error('[repairToolCall] no se pudo parsear JSON pegado:', e);
            return null;
          }
        },
    
        tools: {
          getGameInfo: {
            description: 'Obtiene información sobre la ubicación actual y el estado del mundo en el juego Athernix.',
            inputSchema: z.object({}),
            execute: async () => ({
              location: 'Valle de los Ecos',
              timeOfDay: 'Atardecer',
              dangerLevel: 'Alto',
              nearbyMonsters: ['Sombra de obsidiana', 'Golem de roca'],
            }),
          },
          buscarFuentesAcademicas,
          generarFlashcards,
          compararConceptos,
          generarLineaDeTiempo,
        },
      });
      console.log(`[Groq] Modelo exitoso: ${modelName}`);
      break; // Si funciona, salir del loop
    } catch (error: any) {
      console.error(`[Groq] Error con modelo ${modelName}:`, error.message);
      lastError = error;
      // Continuar con el siguiente modelo
    }
  }

  if (!result) {
    console.error('[Groq] Todos los modelos fallaron');
    throw lastError || new Error('No se pudo conectar con ningún modelo de Groq');
  }

  return result.toUIMessageStreamResponse();
}