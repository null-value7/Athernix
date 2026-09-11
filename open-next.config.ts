// ─────────────────────────────────────────────────────────────
// Athernix — configuración de OpenNext para Cloudflare Workers
// Docs: https://opennext.js.org/cloudflare
//
// Este proyecto se despliega EXCLUSIVAMENTE en Cloudflare Workers.
// No usar @cloudflare/next-on-pages ni Cloudflare Pages.
// ─────────────────────────────────────────────────────────────

import { defineCloudflareConfig, type OpenNextConfig } from "@opennextjs/cloudflare";

// ── Caché incremental (ISR/SSG) ──
// Descomentar junto con el binding `NEXT_INC_CACHE_KV` en wrangler.jsonc.
// import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
// import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";

const config: OpenNextConfig = defineCloudflareConfig({
  // incrementalCache: withRegionalCache(kvIncrementalCache, { mode: "long-lived" }),

  // Sin PPR en el proyecto: interceptar la caché evita ejecutar el
  // handler de Next en páginas ya prerenderizadas.
  enableCacheInterception: true,
});

// Bundle minificado para reducir el tamaño del worker y el cold start.
config.default.minify = true;

export default config;
