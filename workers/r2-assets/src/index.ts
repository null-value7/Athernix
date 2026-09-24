// Worker que proxya el bucket R2 athernix-assets.
// Los archivos de Unity se sirven DESCOMPRIMIDOS (sin .br) para máxima compatibilidad.
// El archivo Build5V.data (624 MiB) se almacena en partes y se streamtea al vuelo.

const META: Record<string, { contentType: string }> = {
  '.glb': { contentType: 'model/gltf-binary' },
  '.gltf': { contentType: 'model/gltf+json' },
  '.fbx': { contentType: 'application/octet-stream' },
  '.obj': { contentType: 'model/obj' },
  '.mtl': { contentType: 'text/plain' },
  '.png': { contentType: 'image/png' },
  '.jpg': { contentType: 'image/jpeg' },
  '.jpeg': { contentType: 'image/jpeg' },
  '.webp': { contentType: 'image/webp' },
  '.gif': { contentType: 'image/gif' },
  '.svg': { contentType: 'image/svg+xml' },
  '.ktx': { contentType: 'image/ktx' },
  '.ktx2': { contentType: 'image/ktx2' },
  '.mp3': { contentType: 'audio/mpeg' },
  '.wav': { contentType: 'audio/wav' },
  '.ogg': { contentType: 'audio/ogg' },
  '.mp4': { contentType: 'video/mp4' },
  '.webm': { contentType: 'video/webm' },
  '.js': { contentType: 'application/javascript' },
  '.wasm': { contentType: 'application/wasm' },
  '.data': { contentType: 'application/octet-stream' },
  '.json': { contentType: 'application/json' },
  '.bin': { contentType: 'application/octet-stream' },
};

// Archivos .data descomprimidos que superan el límite de 300 MiB por objeto
// de Wrangler: se suben como `${key}.rawpart{i}` y se streamtean en orden.
const SPLIT_FILES: Record<string, { parts: number; totalSize: number }> = {
  'Unity/Build/Build5V.data': { parts: 4, totalSize: 654120719 },
  'Unity/Build/LobbyV4.data': { parts: 3, totalSize: 545757462 },
};

// ── CORS restringido ─────────────────────────────────────────
// Solo orígenes autorizados pueden LEER las respuestas via fetch/XHR
// (Unity WebGL y three.js cargan assets cross-origin desde este worker).
// Lista configurable con la var ALLOWED_ORIGINS="https://a.com,https://b.com".
const DEFAULT_ALLOWED_ORIGINS = [
  'https://athernix.com',
  'https://www.athernix.com',
  'https://athernix.workers.dev',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

function allowedOrigin(request: Request, env: any): string | null {
  const origin = request.headers.get('Origin');
  if (!origin) return null; // sin Origin (img/script/no-cors) → no CORS necesario
  const list = (env?.ALLOWED_ORIGINS as string | undefined)
    ?.split(',')
    .map((o) => o.trim())
    .filter(Boolean) ?? DEFAULT_ALLOWED_ORIGINS;
  return list.includes(origin) ? origin : null;
}

function applyCors(headers: Headers, request: Request, env: any) {
  const origin = allowedOrigin(request, env);
  if (origin) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
  }
}

function getMeta(key: string) {
  const lower = key.toLowerCase();
  const sorted = Object.keys(META).sort((a, b) => b.length - a.length);
  for (const suffix of sorted) {
    if (lower.endsWith(suffix)) return META[suffix];
  }
  return null;
}

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);
    if (!key) return new Response('Not Found', { status: 404 });

    // Preflight CORS
    if (request.method === 'OPTIONS') {
      const headers = new Headers();
      applyCors(headers, request, env);
      headers.set('Access-Control-Allow-Methods', 'GET, HEAD');
      headers.set('Access-Control-Max-Age', '86400');
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const meta = getMeta(key);

    // ── Archivo dividido en partes: streamtea secuencialmente (SIN Content-Encoding) ──
    // IMPORTANTE: pull-based. Con push (leer todo y enqueue en start()) el
    // buffer interno crece más rápido de lo que el cliente drena → el worker
    // revienta por memoria y la respuesta se trunca (~40 MB). Con pull() R2
    // solo se lee cuando el consumidor pide más datos.
    const split = SPLIT_FILES[key];
    if (split) {
      let partIndex = 0;
      let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
      const stream = new ReadableStream<Uint8Array>({
        async pull(controller) {
          for (;;) {
            if (!reader) {
              if (partIndex >= split.parts) {
                controller.close();
                return;
              }
              const partKey = `${key}.rawpart${partIndex}`;
              const obj = await env.ASSETS_BUCKET.get(partKey);
              if (!obj) {
                controller.error(new Error(`Part ${partIndex} not found`));
                return;
              }
              reader = obj.body.getReader();
              partIndex++;
            }
            const { done, value } = await reader.read();
            if (done) {
              reader = null;
              continue;
            }
            controller.enqueue(value);
            return;
          }
        },
        async cancel() {
          try { await reader?.cancel(); } catch {}
        },
      });

      const headers = new Headers();
      headers.set('Content-Type', 'application/octet-stream');
      // SIN Content-Encoding — el archivo ya está descomprimido
      headers.set('Content-Length', split.totalSize.toString());
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      applyCors(headers, request, env);

      return new Response(request.method === 'HEAD' ? null : stream, {
        headers,
        status: 200,
      });
    }

    // ── Archivo normal ──
    const object = await env.ASSETS_BUCKET.get(key);
    if (!object) return new Response('Not Found', { status: 404 });

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    if (meta) headers.set('Content-Type', meta.contentType);
    headers.set('Content-Length', object.size.toString());
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    applyCors(headers, request, env);
    headers.set('ETag', object.etag);

    return new Response(request.method === 'HEAD' ? null : object.body, {
      headers,
      status: 200,
    });
  },
};
