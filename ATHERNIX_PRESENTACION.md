# Athernix — Presentation Document (~10 min)

> **Elevator pitch (30 sec):**
> *Athernix is a virtual reality and artificial intelligence education ecosystem, built in El Salvador. It's a web platform where the user explores an interactive planet, picks a destination — like Joya de Cerén or the Pyramids of Giza — and steps into a 3D digital twin, from a computer or a VR headset, without installing anything.*

---

## 1. What is Athernix? (1 min)

- A **VR + AI** ecosystem for education and culture, developed in **El Salvador**.
- A single website brings together: the informational site, the virtual classroom, the AI chatbot, and the immersive Unity experiences.
- Key idea: **bring museums, archaeological sites, and classrooms into the browser** — and into a VR headset if the user has one.

---

## 2. The site's journey (3 min)

The site is designed as a journey, not a menu:

1. **`/` — Cinematic landing.** Intro screen with particles, an "impact flash" entry button, and the ATHERNIX name revealed letter by letter in 3D (GSAP + Three.js).
2. **Informational sections.** `/about`, `/discover`, `/explore`, `/development`, `/headsets`, `/vrtech`, `/missions`, `/modulos` — they explain the project, the compatible hardware, and the educational missions/modules.
3. **Access.** `/login` and `/register` with Supabase (email, password recovery). Middleware protects the private routes.
4. **Roles.** `/student`, `/teacher`, `/dashboard`, `/profile` — separate dashboards for students and teachers, with progress, achievements, and collectibles.
5. **`/mundi` — The heart of the project.** An interactive 3D planet Earth with **14 marked locations** (Joya de Cerén, Tazumal, Temple of Zeus, El Tunco, Pyramids of Egypt, Eiffel Tower, Tokyo, Meanguera Island, the central Lobby, and the Kyoto Zen Sanctuary, among others). The user spins the planet, taps a point, sees its profile card, and launches the experience.
6. **`/ondilla3/materias` — The school journey.** Core school subjects, each with its own draggable 3D scene; every subject links to the next one like stations on a trip.
7. **`/zen` and `/ather`.** Mental wellness (guided meditation) and the voice-enabled AI assistant.

---

## 3. Technologies (3 min)

Sentence to memorize the stack: **"Next.js on the front, Supabase on the back, Unity in the world, Vercel AI, all on Cloudflare."**

| Layer | Technology | What for |
|---|---|---|
| Framework | **Next.js 16 + React 19 + TypeScript** | The entire web app |
| Styling | **Tailwind CSS 4 + shadcn/Radix** | Fast, consistent UI |
| Web 3D | **Three.js + React Three Fiber + Spline** | The planet, subject scenes, the robot |
| Animation | **GSAP + Framer Motion + Lenis** | Intros, cinematic scrolling |
| VR worlds | **Unity WebGL + react-unity-webgl** | The .wasm builds run in the browser |
| Auth / data | **Supabase** (SSR + middleware) | Login, sessions, progress |
| AI | **Vercel AI SDK + Groq + ElevenLabs** | The "Ather" chatbot with text and voice |
| Educational content | **KaTeX + react-markdown + Mermaid** | Formulas, lessons, and diagrams |
| Deployment | **Cloudflare Workers (OpenNext) + R2** | Global edge; the heavy Unity builds (>25 MB) are served from the R2 bucket |

Standout technical detail: the app **detects WebXR automatically** — if the user visits from a Meta Quest or Pico, it jumps straight into VR mode.

---

## 4. The experience (simple explanation) (2 min)

**Version to memorize:**

> "The user spins a planet, taps a place, chooses **PC or VR**, and the world downloads and runs inside the browser. If they're already logged in, they go in identified; if they have a headset, they go in walking."

**What happens under the hood (if they ask):**

1. `/mundi` renders the 3D Earth (`EarthScene`); each point is a `MundiLocation` with its profile card and its assigned Unity build.
2. When launching the experience, `UnityExperience.tsx` asks to pick **PC_MODE or VR_MODE** (WebXR decides whether the VR button is enabled).
3. The matching Unity build downloads: **HistoryV2** ("Historia Viva VR", historical sites), **MentalV2** ("MenteLibre VR", wellness), or **LobbyV4** (central hub). Progress bar: "DEPLOYING_DIGITAL_TWIN".
4. Once loaded, the website talks to Unity via `SendMessage`:
   - `SupabaseAuthBridge.SetSessionFromWeb` → the user enters **already logged in** (Supabase access token).
   - `TranslationManager.SetLanguage` → Unity starts in the **same language** as the page.
   - `WebXRManager.ToggleVR` → the "ENTER_VR" button activates the immersive session.
5. On exit, `unload()` frees the engine's memory.

**Web ↔ Unity bridge in one line:** *the website is the remote control; Unity is the screen — they understand each other through messages addressed to GameObject names.*

---

## 5. Closing — 3 sentences to remember (30 sec)

1. **"One planet, fourteen destinations, zero installs."** — everything runs in the browser.
2. **"Your session walks into the virtual world with you."** — Supabase is injected inside Unity.
3. **"PC today, VR when you get a headset."** — the same build serves both modes thanks to WebXR.

---

## Quick cheat sheet

- Name: **Athernix** · Country: **El Salvador** · Sector: **EdTech VR + AI**
- Star route: `/mundi` → planet → `UnityExperience`
- 3 Unity builds: **History** (history), **Mental** (wellness), **Lobby** (hub)
- Infra: **Cloudflare Workers + R2** (Unity `.data` files weigh 119–505 MB, served via R2)
- Auth: **Supabase**; AI: **Groq + ElevenLabs**; web 3D: **Three.js**

