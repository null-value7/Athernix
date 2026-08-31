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

## Learn More

Para aprender más sobre las tecnologías utilizadas:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
