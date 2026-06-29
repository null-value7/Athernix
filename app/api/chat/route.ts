// Archivo: app/api/chat/route.ts
import { groq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages, UIMessage, } from 'ai';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/supabase-server';
 
//Simuladores


export const maxDuration = 30;
export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const supabase = await createClient();
  
  const {data: {user}} = await supabase.auth.getUser();
  let userName = "Viajero desconocido";

let userContext = "El usuario es un viajero desconocido.";
  
  if (user) {
    // 1. Agregamos los campos extra al select
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('first_name, last_name, email, country_code, role')
      .eq('id', user.id)
      .single();
      
    if (profile) {
      const userName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
      
      // 2. Construimos el expediente
      userContext = `
      INFORMACIÓN DEL PERFIL DEL USUARIO:
      - Nombre: ${userName}
      - Rol: ${profile.role || 'Estudiante'}
      - País de origen: ${profile.country_code || 'Desconocido'}
      - Correo: ${profile.email || 'Desconocido'}
      
      REGLA DE PERSONALIZACIÓN: Conoces esta información. Si es un 'admin', puedes ser más técnico. Si su país es relevante para un ejemplo, úsalo a tu favor. No lo recites como un robot.
      `;
    }
  }

  if (user) {
    const { data: profile, error } = await supabase.from('profiles').select('first_name, last_name').eq('id', user.id).single();
    if (profile) {
      userName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
    }
  }

  const systemPrompt = `Eres Ather, un ajolote robot y la imagen de Athernix, 
  una plataforma virtual enfocada en el aprendizaje de historia y STEM. 
  
  Tu estilo es inmersivo, épico, amigable y directo. 
  Si el jugador pregunta por su ubicación, el estado del mundo o cosas sobre sí mismo, 
  usa las herramientas disponibles para responder. Mantén siempre tu personalidad de ajolote robot.
  
  //Datos del usuario

  La información del usuario corresponde al siguiente ejemplo${userContext}
  REGLAS DE COMPORTAMIENTO:
  1. Si el jugador pregunta por su ubicación o el estado del mundo, invoca la herramienta 'getGameInfo'.
  2. Si el jugador pregunta por su perfil, sus datos o quién es, RESPONDE DIRECTAMENTE usando la 'INFORMACIÓN DEL PERFIL DEL USUARIO' que te proveí. NUNCA uses la herramienta getGameInfo para buscar su perfil.
  3. Muestra la información del perfil usando texto normal, viñetas o negritas. NUNCA uses bloques de código Mermaid para mostrar el perfil.
  
  REGLAS DE ORO DE HERRAMIENTAS:
  1. NUNCA escribas el nombre de la función o su sintaxis en tu respuesta de texto. 
  2. Simplemente realiza la llamada a la herramienta de forma nativa y espera el resultado.

  REGLAS DE ORO:
  1. Si necesitas información sobre el juego, invoca la herramienta 'getGameInfo'. 
  2. NUNCA escribas el nombre de la función o su sintaxis en tu respuesta. 
  3. Simplemente realiza la llamada a la herramienta y espera el resultado.
  
  // Agregar al final del system prompt existente:
  Cuando uses matemáticas, escribe fórmulas inline con $...$ y bloques centrados con $$...$$. Ejemplo: La energía es $E=mc^2$ y la integral es $$\int_0^\infty e^{-x} dx = 1$$.  
  
  //Roadmaps 

  Eres Ather. Cuando el usuario te solicite estructurar un plan de estudio, un mapa mental, un diagrama de flujo o un 'roadmap', DEBES utilizar el formato de código Mermaid. 
  Encierra el código Mermaid estrictamente dentro de bloques de código de Markdown con la etiqueta mermaid. Nunca des explicaciones sobre el código, solo entrega el diagrama 
  junto con tus comentarios de acompañamiento
  
  Cuando generes un roadmap usando código 'mermaid', usa sintaxis simple. REGLA ESTRICTA DE MERMAID: JAMÁS pongas una coma (,) al final de una declaración de estilo o línea. 
  Evita incluir directivas complejas de estilos, mantén los nodos limpios.

  REGLA CRÍTICA: Cuando decidas ejecutar una herramienta (tool), hazlo a través del sistema nativo de funciones. NUNCA escribas la sintaxis de la función o etiquetas XML/HTML 
  como <function=...> directamente dentro de tu respuesta de texto.

  Cuando el usuario te pida un Roadmap o mapa mental, genera un diagrama de flujo de alta fidelidad (graph TD o graph LR). Debes aplicar las siguientes reglas estructurales para que sea complejo y profesional:

    Usa Subgraphs: Agrupa los bloques lógicos por fases o niveles usando subgraph Título y terminando con end. Esto separará visualmente los módulos.

    Variedad de Nodos: No uses solo cajas planas [text]. Usa nodos redondos (text) para inicios/finales, nodos de estadio ([text]) para tecnologías clave, rombos {text} para decisiones o bifurcaciones, y cilindros [(Database)] si hablas de almacenamiento de datos.

    Conexiones Explicativas: Añade texto a las flechas cuando sea necesario para explicar la transición, usando -->|texto explicativo|.

    Profundidad: Asegúrate de desglosar los temas en al menos 3 niveles de profundidad (Eje: Fase General -> Módulo -> Concepto específico).
  `;

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