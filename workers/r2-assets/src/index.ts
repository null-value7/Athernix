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

// Build5V.data descomprimido, dividido en partes
const SPLIT_FILE = 'Unity/Build/Build5V.data';
const SPLIT_PARTS = 4;
const SPLIT_TOTAL_SIZE = 654120719;

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

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const meta = getMeta(key);

    // ── Archivo dividido en partes: streamtea secuencialmente (SIN Content-Encoding) ──
    if (key === SPLIT_FILE) {
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for (let i = 0; i < SPLIT_PARTS; i++) {
              const partKey = `${SPLIT_FILE}.rawpart${i}`;
              const obj = await env.ASSETS_BUCKET.get(partKey);
              if (!obj) {
                controller.error(new Error(`Part ${i} not found`));
                return;
              }
              const reader = obj.body.getReader();
              for (;;) {
                const { done, value } = await reader.read();
                if (done) break;
                controller.enqueue(value);
              }
            }
            controller.close();
          } catch (e) {
            controller.error(e);
          }
        },
      });

      const headers = new Headers();
      headers.set('Content-Type', 'application/octet-stream');
      // SIN Content-Encoding — el archivo ya está descomprimido
      headers.set('Content-Length', SPLIT_TOTAL_SIZE.toString());
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      headers.set('Access-Control-Allow-Origin', '*');

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
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('ETag', object.etag);

    return new Response(request.method === 'HEAD' ? null : object.body, {
      headers,
      status: 200,
    });
  },
};
