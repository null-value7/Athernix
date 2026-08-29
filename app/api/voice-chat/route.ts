// solo texto para que Ather lo hable. toTextStreamResponse() devuelve
// texto plano UTF-8 sin ninguna envoltura JSON — inmune a cambios de

export const maxDuration = 30;

export async function POST(req: Request) {
  const { groq } = await import('@ai-sdk/groq');
  const { streamText } = await import('ai');
  const { text }: { text: string } = await req.json();

  if (!text || !text.trim()) {
    return new Response('', { status: 400 });
  }

  const result = streamText({
    model: groq('openai/gpt-oss-120b'),
    system: `Eres Ather, un ajolote robot de Athernix, plataforma de aprendizaje de historia y STEM.
    Estás en una conversación por VOZ: responde de forma breve, clara y conversacional (2-4 frases),
    sin markdown, sin bloques de código, sin fórmulas LaTeX — todo debe poder LEERSE en voz alta tal cual.
    Tono épico, amigable y directo, como siempre.`,
    prompt: text,
    // Sin tools: en modo voz no generamos tarjetas/timelines, solo conversación hablada.
  });

  return result.toTextStreamResponse();
}
