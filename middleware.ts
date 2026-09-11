import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

// ─────────────────────────────────────────────────────────────
// Se usa la convención `middleware.ts` (deprecada en Next 16) en lugar
// de `proxy.ts` de forma intencionada:
//
// - En Next 16 todo `proxy.ts` compila al runtime de Node.js y el
//   `runtime` config option no está disponible (Next lanza un error si
//   se intenta forzar 'edge').
// - @opennextjs/cloudflare todavía no soporta Node.js middleware y aborta
//   el build con "Node.js middleware is not currently supported"
//   (ver dist/cli/build/utils/middleware.js: exige middleware["/"] en el
//   middleware-manifest, que solo existe para Edge middleware).
// - `middleware.ts` sigue compilando a Edge runtime, que es lo que el
//   adaptador espera. El código de `updateSession` ya es Edge-compatible
//   (@supabase/ssr + NextResponse, sin APIs de Node).
//
// Migrar a `proxy.ts` cuando OpenNext publique el soporte de Node
// middleware (PRs opennextjs-cloudflare#1309 / #1320).
// ─────────────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|glb|gltf|fbx|br|wasm|data|json|js|css)$).*)',
  ],
}
