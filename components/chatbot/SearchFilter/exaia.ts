const EXA_API_KEY = process.env.EXA_API_KEY;
const EXA_BASE_URL = 'https://api.exa.ai';

export const TRUSTED_STEM_DOMAINS = [
  'wikipedia.org',
  'khanacademy.org',
  'nature.com',
  'sciencedirect.com',
  'arxiv.org',
  'nasa.gov',
  'nih.gov',
  'mit.edu',
  'stanford.edu',
  'ieee.org',
];

export interface ExaSourceResult {
  id: string;
  title: string;
  url: string;
  author: string | null;
  publishedDate: string | null;
  highlight: string;
  sourceType: 'article' | 'paper' | 'pdf' | 'web';
}

function classifySourceType(url: string): ExaSourceResult['sourceType'] {
  if (url.endsWith('.pdf')) return 'pdf';
  if (url.includes('arxiv.org') || url.includes('sciencedirect') || url.includes('ieee.org')) return 'paper';
  if (url.includes('wikipedia.org')) return 'article';
  return 'web';
}

function sanitizeForModel(text: string, maxLen = 600): string {
  return text
    .replace(/```/g, '\u200b```')
    .replace(/<\/?system>/gi, '')
    .replace(/\bignora(?:s)?\s+(tus|las)\s+instrucciones/gi, '[contenido filtrado]')
    .slice(0, maxLen);
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('EXA_TIMEOUT')), ms)
  );
  return Promise.race([promise, timeout]);
}

// Extrae los dominios que Exa marcó como "not available" del mensaje de error.
function extractRejectedDomains(message: string): string[] {
  const match = message.match(/not available:\s*([^.]+(?:\.[a-z]+)?(?:,\s*[^.]+(?:\.[a-z]+)?)*)/i);
  if (!match) return [];
  return match[1].split(',').map((d) => d.trim());
}

interface ExaRawResult {
  id: string;
  title: string | null;
  url: string;
  author: string | null;
  publishedDate: string | null;
  highlights?: string[];
  summary?: string;
}

interface ExaApiResponse {
  results: ExaRawResult[];
}

async function runExaSearch(query: string, numResults: number, freshOnly: boolean, domains: string[]): Promise<ExaApiResponse> {
  const body: Record<string, unknown> = {
    query,
    numResults,
    type: 'auto',
    highlights: { numSentences: 2, highlightsPerUrl: 1 },
    summary: true,
    livecrawl: freshOnly ? 'always' : 'fallback',
  };
  if (domains.length > 0) {
    body.includeDomains = domains;
  }

  const res = await withTimeout(
    fetch(`${EXA_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': EXA_API_KEY!,
      },
      body: JSON.stringify(body),
    }),
    20000
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Exa API error ${res.status}: ${text}`);
  }

  return res.json() as Promise<ExaApiResponse>;
}

export async function searchTrustedSources(
  query: string,
  opts: { numResults?: number; freshOnly?: boolean } = {}
): Promise<ExaSourceResult[]> {
  const { numResults = 5, freshOnly = false } = opts;
  let domains = [...TRUSTED_STEM_DOMAINS];

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await runExaSearch(query, numResults, freshOnly, domains);
      return res.results.map((r) => ({
        id: r.id,
        title: sanitizeForModel(r.title ?? 'Sin título', 120),
        url: r.url,
        author: r.author ?? null,
        publishedDate: r.publishedDate ?? null,
        highlight: sanitizeForModel(r.highlights?.[0] ?? r.summary ?? '', 400),
        sourceType: classifySourceType(r.url),
      }));
    } catch (err: any) {
      const msg = err?.message ?? String(err);

      // Si Exa rechazó dominios específicos, quítalos de la lista y reintenta
      // sin tumbar toda la búsqueda. Esto hace que la lista de dominios "envejezca"
      // sin romper producción cuando Exa deprecia alguno.
      const rejected = extractRejectedDomains(msg);
      if (rejected.length > 0 && domains.length > 0) {
        console.warn('[Exa] dominios rechazados, reintentando sin ellos:', rejected);
        domains = domains.filter((d) => !rejected.includes(d));
        continue;
      }

      if (attempt === 2) {
        console.error('[Exa] búsqueda falló tras reintentos:', err);
        return [];
      }
    }
  }
  return [];
}