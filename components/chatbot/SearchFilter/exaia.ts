const EXA_API_KEY = process.env.EXA_API_KEY;
const EXA_BASE_URL = 'https://api.exa.ai';

export const TRUSTED_STEM_DOMAINS = [
  'khanacademy.org',
  'nature.com',
  'sciencedirect.com',
  'arxiv.org',
  'nasa.gov',
  'nih.gov',
  'mit.edu',
  'stanford.edu',
  'ieee.org',
  'phys.org',
  'techxplore.com',
  'scitechdaily.com',
  'sciencedaily.com',
  'technologyreview.com',
  'spectrum.ieee.org',
  'arstechnica.com',
  'science.org',
  'sciencedirect.com',
  'tryengineering.org',
  'labroots.com',
  'scientificamerican.com',
  'quantamagazine.org',
  'plos.org',
  'newscientist.com',
  'cern.ch',
  'space.com',
  'livescience.com',
  'wired.com',
  'cell.com',
  'brilliant.org',
  'wolframalpha.com',
  'edx.org',
  'coursera.org',
  'geeksforgeeks.org',
  'leetcode.com',
  'omegaup.com',
  'paperswithcode.com',
  'huggingface.co',
  'kdnuggets.com',
  'towardsdatascience.com',
  'pnas.org',
  'acm.org',
  'biorxiv.org',
  'medrxiv.org',
  'eurekalert.org',
  'aps.org',
  'acs.org',
  'ams.org',
  'siam.org',
  'iop.org',
  'rsc.org',
  'esa.int',
  'eso.org',
  'noaa.gov',
  'theconversation.com',
  'distill.pub',
  'annualreviews.org',
  'researchgate.net',
  'frontiersin.org',
  'caltech.edu',
  'ethz.ch',
  'ox.ac.uk',
  'cam.ac.uk',
  'popsci.com',
  'popularmechanics.com',
  'biomedcentral.com',
  'worldscientific.com',
  'scimagojr.com',
  'springer.com',
  'wiley.com',
  'britannica.com',
  'smithsonianmag.com',
  'si.edu',
  'nationalgeographic.com',
  'worldhistory.org',
  'loc.gov',
  'jstor.org',
  'archaeology.org',
  'metmuseum.org',
  'britishmuseum.org',
  'louvre.fr',
  'museodelprado.es',
  'cervantesvirtual.com',
  'unesco.org',
  'gutenberg.org',
  'archive.org',
  'europeana.eu',
  'historytoday.com',
  'getty.edu',
  'moma.org',
  'vam.ac.uk',
  'tate.org.uk',
  'rae.es',
  'openstax.org',
  'archives.gov',
  'iep.utm.edu',
  'plato.stanford.edu',
  'muse.jhu.edu',
  'philpapers.org',
  'worldbank.org',
  'ourworldindata.org',
  'pewresearch.org',
  'dp.la',
  'archives.gov',
  'museodelprado.es',
  'getty.edu',
  'cairn.info',
  'dialnet.unirioja.es',
  'scielo.org',
  'redalyc.org',
  'bne.es',
  'bnf.fr',
  'ted.com',
  'pbs.org',
  'history.com',
  'nypl.org',
  'nationalarchives.gov.uk',
  'muse.jhu.edu',
  'perseus.tufts.edu',
  'ssrn.com',
  'nber.org',
  'worldbank.org',
  'harvard.edu',
  'yale.edu',
  'cambridge.org',
  'philosophynow.org',
  'vam.ac.uk',
  'rijksmuseum.nl',
  'nga.gov',
  'un.org',
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

// Queries que piden información reciente → activan startPublishedDate + livecrawl
const RECENCY_PATTERN = /\b(últim\w*|recient\w*|actual|actualidad|nuevo|nueva|novedad\w*|noticia\w*|latest|recent|news|breaking|breakthrough|descubrimiento|este (año|mes|semana)|hoy)\b/i;

const RECENCY_WINDOW_DAYS = 180;

function mapRawResults(res: ExaApiResponse): ExaSourceResult[] {
  return res.results
    .filter((r) => {
      // Descarta URLs muertas/malformadas del índice antes de validar con Zod
      try { const u = new URL(r.url); return u.protocol === 'http:' || u.protocol === 'https:'; }
      catch { return false; }
    })
    .map((r) => ({
      id: r.id,
      title: sanitizeForModel(r.title ?? 'Sin título', 120),
      url: r.url,
      author: r.author ?? null,
      publishedDate: r.publishedDate ?? null,
      highlight: sanitizeForModel((r.highlights ?? []).join(' ') || r.summary || '', 900),
      sourceType: classifySourceType(r.url),
    }));
}

async function exaPost(path: string, body: Record<string, unknown>): Promise<ExaApiResponse> {
  const res = await withTimeout(
    fetch(`${EXA_BASE_URL}/${path}`, {
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

async function runExaSearch(
  query: string,
  numResults: number,
  freshOnly: boolean,
  domains: string[],
  sinceDays?: number
): Promise<ExaApiResponse> {
  const body: Record<string, unknown> = {
    query,
    numResults,
    type: 'auto',
    highlights: { numSentences: 5, highlightsPerUrl: 2 },
    summary: true,
    livecrawl: freshOnly ? 'always' : 'fallback',
  };
  if (sinceDays) {
    body.startPublishedDate = new Date(Date.now() - sinceDays * 86400000).toISOString();
  }
  if (domains.length > 0) {
    body.includeDomains = domains;
  }

  return exaPost('search', body);
}

export async function searchTrustedSources(
  query: string,
  opts: { numResults?: number; freshOnly?: boolean } = {}
): Promise<ExaSourceResult[]> {
  const { numResults = 5 } = opts;
  // Recencia autónoma: la query pide info fresca → livecrawl + ventana de 180 días
  const freshOnly = opts.freshOnly || RECENCY_PATTERN.test(query);
  const sinceDays = freshOnly ? RECENCY_WINDOW_DAYS : undefined;
  let domains = [...new Set(TRUSTED_STEM_DOMAINS)];

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await runExaSearch(query, numResults, freshOnly, domains, sinceDays);
      return mapRawResults(res);
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

// /findSimilar — fuentes semánticamente relacionadas a una URL dada.
// Más preciso que re-buscar por título: Exa compara el embedding del documento.
export async function findSimilarSources(
  url: string,
  opts: { numResults?: number } = {}
): Promise<ExaSourceResult[]> {
  const { numResults = 6 } = opts;
  let domains = [...new Set(TRUSTED_STEM_DOMAINS)];

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const body: Record<string, unknown> = {
        url,
        numResults,
        highlights: { numSentences: 5, highlightsPerUrl: 2 },
        summary: true,
        livecrawl: 'fallback',
        excludeSourceDomain: true,
      };
      if (domains.length > 0) {
        body.includeDomains = domains;
      }
      return mapRawResults(await exaPost('findSimilar', body));
    } catch (err: any) {
      const msg = err?.message ?? String(err);

      const rejected = extractRejectedDomains(msg);
      if (rejected.length > 0 && domains.length > 0) {
        console.warn('[Exa] dominios rechazados en findSimilar, reintentando sin ellos:', rejected);
        domains = domains.filter((d) => !rejected.includes(d));
        continue;
      }

      if (attempt === 2) {
        console.error('[Exa] findSimilar falló tras reintentos:', err);
        return [];
      }
    }
  }
  return [];
}