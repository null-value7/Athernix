# Scroll Expansion Hero — Next.js (MVC-organized, shadcn-compatible)

A scroll-driven media hero section (video/image expands as you scroll) built
for Next.js App Router, TypeScript, and Tailwind, organized with an MVC
separation of concerns while staying 100% compatible with the shadcn
`/components/ui` convention.

## How the MVC mapping works in a Next.js app

Next.js doesn't have native MVC folders, so routes (`app/`) act as the entry
point that wires the three layers together:

| Layer | Folder | Responsibility |
|---|---|---|
| **Model** | `models/` | Plain TypeScript types + data (`media.model.ts`). No React, no JSX. Swap `getMediaContent()` for a real DB/CMS call and nothing else changes. |
| **Controller** | `controllers/hooks/` | Custom hooks holding interaction state and side effects (`useScrollExpandMedia.ts` — all wheel/touch/resize logic lives here, not in the component). |
| **View** | `components/ui/`, `components/views/` | Presentational components. `components/ui/scroll-expansion-hero.tsx` follows the **shadcn convention** (primitives live in `components/ui`). `components/views/` holds page-level composed views that consume the Model + Controller. |
| **Route** | `app/` | `app/page.tsx` simply renders the view — no logic lives in the route itself. |

```
app/
  layout.tsx
  page.tsx              -> renders <ScrollHeroDemo />
  globals.css
models/
  media.model.ts         -> types + sample content + getMediaContent()
controllers/
  hooks/
    useScrollExpandMedia.ts  -> all scroll/touch/resize state logic
components/
  ui/
    scroll-expansion-hero.tsx -> shadcn-style primitive, pure rendering
  views/
    media-content.tsx         -> renders Model data
    scroll-hero-demo.tsx      -> composes Model + Controller + View
lib/
  utils.ts               -> cn() helper (shadcn standard)
components.json          -> shadcn CLI config
```

## Project status

This project was **generated from scratch** — no existing shadcn/Tailwind/TS
project was found to add the component into, so a compatible one was
scaffolded for you, pre-wired with shadcn's structure and config
(`components.json`, `lib/utils.ts`, the `@/*` path alias, and `components/ui`
as the primitives folder). If you already have a Next.js project, just copy
these four folders into it: `models/`, `controllers/`, `components/`,
and merge `lib/utils.ts` + `components.json` + the Tailwind/PostCSS configs.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

### If you're adding this to an existing project instead

If your project isn't already a shadcn project (no `components.json`, no
`/components/ui`), run:

```bash
npx shadcn@latest init
```

This matters because shadcn (and this project) expects **`/components/ui`**
to hold framework-agnostic, copy-pasted primitives that you own and can edit
directly — as opposed to a `node_modules` dependency. Keeping new UI
primitives in that exact folder keeps them discoverable by the shadcn CLI
and consistent with any other shadcn components you add later (`npx shadcn
add button`, etc. will also install there).

### Dependencies used by this component

Already declared in `package.json`:

```bash
npm install framer-motion lucide-react clsx tailwind-merge
npm install -D tailwindcss-animate
```

## Notes on the demo content

- Images are served from `images.unsplash.com` and `images.pexels.com`;
  video/poster assets come from a `ufs.sh` file host used in the original
  demo. All three are whitelisted in `next.config.mjs` under
  `images.remotePatterns` — add any of your own domains there too.
- Swap the sample video/images by editing `models/media.model.ts` — nothing
  else needs to change.
