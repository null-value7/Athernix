# Athernix VR App

Ecosistema de Realidad Virtual e Inteligencia Artificial en El Salvador.

## Tecnologías y Dependencias

### Framework y Core
- **Next.js** 16.2.4 - Framework de React
- **React** 19.2.4 - Biblioteca de UI
- **TypeScript** 5 - Tipado estático

### 3D y Gráficos
- **Three.js** 0.185.1 - Motor 3D
- **@react-three/fiber** 9.6.1 - Renderer de Three.js para React
- **@react-three/drei** 10.7.7 - Helpers para React Three Fiber
- **@splinetool/react-spline** - Visualizador 3D Spline

### Autenticación y Base de Datos
- **@supabase/supabase-js** 2.104.1 - Cliente Supabase
- **@supabase/ssr** 0.10.2 - Soporte SSR para Supabase

### Inteligencia Artificial
- **ai** 6.0.197 - SDK de Vercel AI
- **@ai-sdk/react** 3.0.199 - Hooks de React para AI SDK
- **@ai-sdk/google** 3.0.80 - Integración con Google AI
- **@ai-sdk/groq** 3.0.39 - Integración con Groq
- **groq-sdk** 1.3.0 - SDK de Groq

### UI y Animaciones
- **Framer Motion** 12.42.2 - Animaciones
- **GSAP** 3.15.0 - Animaciones web
- **Tailwind CSS** 4 - Framework CSS
- **shadcn** 4.10.0 - Componentes UI
- **Radix UI** - Componentes accesibles
- **Lucide React** 1.17.0 - Iconos

### Formularios y Validación
- **react-hook-form** 7.74.0 - Gestión de formularios
- **zod** 4.3.6 - Validación de esquemas
- **@hookform/resolvers** 5.2.2 - Resolvers para react-hook-form

### Markdown y Matemáticas
- **react-markdown** 10.1.0 - Renderizado Markdown
- **remark-math** 6.0.0 - Soporte matemático
- **rehype-katex** 7.0.1 - Renderizado KaTeX
- **katex** 0.17.0 - Renderizado LaTeX
- **react-katex** 3.1.0 - React wrapper para KaTeX
- **mermaid** 11.16.0 - Diagramas

### Utilidades
- **clsx** 2.1.1 - Clases condicionales
- **tailwind-merge** 3.6.0 - Merge de clases Tailwind
- **class-variance-authority** 0.7.1 - Variantes de componentes
- **react-hot-toast** 2.6.0 - Notificaciones

## Getting Started

Primero, instala las dependencias:

```bash
npm install
```

Luego, ejecuta el servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Estructura del Proyecto

- `app/` - Páginas y layouts de Next.js
- `components/` - Componentes React reutilizables
- `controllers/` - Lógica de negocio y hooks
- `models/` - Tipos y modelos de datos
- `lib/` - Utilidades y configuraciones

## Despliegue — Cloudflare Workers

El proyecto se despliega **exclusivamente en Cloudflare Workers** mediante
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).

> `@cloudflare/next-on-pages` y Cloudflare Pages quedaron descartados de forma
> definitiva. No añadir `pages_build_output_dir` ni configuraciones de Pages.

### Archivos de configuración

| Archivo | Rol |
| --- | --- |
| `wrangler.jsonc` | Config del Worker: `main`, assets, observability, smart placement |
| `open-next.config.ts` | Adaptador OpenNext: overrides de caché, minify |
| `public/.assetsignore` | Excluye del upload los archivos que superan 25 MiB |

### Comandos

```bash
npm run cf:build   # next build + bundle del worker en .open-next/
npm run preview    # build + workerd local (runtime real de Workers)
npm run deploy     # build + deploy a producción
npm run upload     # build + sube una versión sin activarla
npm run cf:tail    # logs en vivo del worker en producción
npm run cf-typegen # regenera cloudflare-env.d.ts desde wrangler.jsonc
```

### Variables de entorno

- **Públicas** (`NEXT_PUBLIC_*`): se inlinean en `next build`, por lo que deben
  existir como *build variables* del proyecto en Cloudflare.
- **Secretos** (`GROQ_API_KEY`, `ELEVENLABS_API_KEY`, …): se cargan con
  `npx wrangler secret put <NOMBRE>`. En local van en `.env.local` (para
  `next dev`) y en `.dev.vars` (para `npm run preview`).

Ver `.env.local.example` para el listado completo.

### Assets pesados (>25 MiB)

Workers Assets impone un límite de **25 MiB por archivo**. Los builds de Unity
(`*.data.br`, de 119 MB a 505 MB) y algunos modelos 3D se sirven desde el bucket
R2 `athernix-assets` a través del worker `workers/r2-assets`.

En el cliente se resuelven con `assetUrl()` (`lib/assets.ts`), que usa
`NEXT_PUBLIC_ASSETS_URL` en producción y rutas de `/public` en desarrollo.

### Caché incremental (ISR/SSG) — opcional

```bash
npx wrangler kv namespace create NEXT_INC_CACHE_KV
```

Luego descomentar el bloque `kv_namespaces` en `wrangler.jsonc` y el
`incrementalCache` en `open-next.config.ts`.

## Learn More

- [OpenNext for Cloudflare](https://opennext.js.org/cloudflare)
- [Cloudflare Workers docs](https://developers.cloudflare.com/workers/)
- [Next.js Documentation](https://nextjs.org/docs)