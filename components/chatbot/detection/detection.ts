// components/chatbot/detection/detection.ts (agregar a lo que ya tienes)

export type EducationalToolName =
  | 'buscarFuentesAcademicas'
  | 'generarFlashcards'
  | 'compararConceptos'
  | 'generarLineaDeTiempo';

const PATTERNS: Array<{ tool: EducationalToolName; regex: RegExp }> = [
  {
    tool: 'generarLineaDeTiempo',
    regex: /l[ií]nea\s+de\s+tiempo|cronolog[ií]a|orden\s+cronol[oó]gico|evoluci[oó]n\s+de|historia\s+de\s+(los|las|el|la)/i,
  },
  {
    tool: 'compararConceptos',
    regex: /\bcompar[ae]\b|diferencia(s)?\s+entre|\bvs\.?\b|\bversus\b/i,
  },
  {
    tool: 'generarFlashcards',
    regex: /flashcards?|tarjetas?\s+de\s+estudio|repasar|memorizar|estudiar\s+(para|sobre)/i,
  },
  {
    tool: 'buscarFuentesAcademicas',
    regex: /fuentes?\s+(acad[eé]micas?|confiables?)|art[ií]culos?\s+(sobre|de)|investiga(r)?\s|buscar\s+informaci[oó]n|cita(s)?\s+confiables?/i,
  },
];

export function detectEducationalIntent(userText: string): EducationalToolName | null {
  for (const { tool, regex } of PATTERNS) {
    if (regex.test(userText)) return tool;
  }
  return null;
}

// Limpia el texto del usuario quitando las palabras "disparadoras" y de relleno,
// dejando solo el tema real. No es perfecto, pero es determinístico —
// mucho más confiable que dejar que el modelo lo invente bajo tool forcing.
function cleanTopic(text: string): string {
  return text
    .replace(
      /genera(me)?|dame|quiero|puedes?|podr[ií]as?|una?|el|la|los|las|de\s+la|de\s+los|sobre|acerca\s+de/gi,
      ' '
    )
    .replace(
      /l[ií]nea\s+de\s+tiempo|cronolog[ií]a|flashcards?|tarjetas?\s+de\s+estudio|fuentes?\s+(acad[eé]micas?|confiables?)|art[ií]culos?/gi,
      ' '
    )
    .replace(/\s+/g, ' ')
    .trim();
}

// Genera los argumentos exactos que cada tool necesita, a partir del texto del usuario.
// Se usan tanto para instruir al modelo explícitamente como para rellenar
// vía experimental_repairToolCall si el modelo igual los omite.
export function extractToolArgs(
  userText: string,
  tool: EducationalToolName
): Record<string, string> {
  const topic = cleanTopic(userText) || userText.trim();

  switch (tool) {
    case 'generarLineaDeTiempo':
    case 'generarFlashcards':
      return { topic };

    case 'buscarFuentesAcademicas':
      return { query: topic };

    case 'compararConceptos': {
      const parts = topic
        .split(/\bvs\.?\b|\bversus\b|\by\b|\bcon\b/i)
        .map((s) => s.trim())
        .filter(Boolean);
      return {
        itemA: parts[0] ?? topic,
        itemB: parts[1] ?? '',
      };
    }
  }
}