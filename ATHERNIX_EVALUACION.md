# Athernix — Evaluación de proyecto y checklist de presentación

> Documento de trabajo generado para preparar la evaluación del proyecto. Basado en una
> auditoría real del repositorio (estructura, dependencias, scripts, `README.md` y
> `ATHERNIX_PRESENTACION.md`) más comparación con plataformas EdTech VR de referencia
> (Labster, ENGAGE VR, VictoryXR, Google Arts & Culture).

---

## 1. Calificación actual: 6.5 / 10

**Interpretación:** el *concepto de producto* está en un nivel competitivo (8-9/10);
la *ejecución de ingeniería de software* está en un nivel de prototipo avanzado (4-5/10).
El promedio ponderado, pensando en cómo lo vería un jurado técnico, es **6.5/10**.

### Por qué no es más bajo (fortalezas reales)
- **Concepto diferenciado y no trivial.** La mayoría de proyectos estudiantiles "VR
  educativo" son una sola escena de Unity. Athernix integra: sitio informativo, auth,
  roles (estudiante/docente), progreso/logros, un chatbot con IA y voz, y múltiples
  mundos Unity lanzados desde una web — es un ecosistema, no una demo aislada.
- **Stack moderno y vigente**, no de relleno: Next.js 16 / React 19 / TypeScript,
  Supabase (auth + SSR), Vercel AI SDK + Groq + ElevenLabs, Three.js / React Three
  Fiber, Cloudflare Workers + R2.
- **Decisiones de infraestructura pensadas, no improvisadas**: los builds de Unity
  (119–505 MB) se sirven desde un bucket R2 porque Cloudflare Workers Assets limita a
  25 MiB por archivo; hay un worker dedicado (`workers/r2-assets`) y una función
  `assetUrl()` centralizada para resolver rutas. Eso es una solución de arquitectura
  real a un problema real, y se puede explicar y defender ante un jurado.
- **Manejo de variables de entorno correcto**: secretos en `.env.local` (ignorado por
  git), solo variables públicas versionadas, documentado en el propio README.

### Por qué no es más alto (debilidades que un jurado técnico va a encontrar)
1. **Cero pruebas automatizadas.** No existe `npm run test`, ni carpeta de tests, ni
   ningún framework de testing en `package.json`. No hay forma de demostrar "resultados
   obtenidos" verificables en el código; todo depende de una demo en vivo.
2. **Sin CI/CD.** No hay pipeline (`.github/workflows` u otro) que corra lint, typecheck
   o build en cada cambio. El único control de calidad es manual.
3. **Dos convenciones de arquitectura conviviendo sin criterio explícito**: patrón
   MVC clásico global (`controllers/`, `models/`) superpuesto a las convenciones nativas
   de Next.js App Router, más una tercera variante de "controllers locales" dentro de
   algunas rutas (`app/mundi/controllers/`, `components/ather/controllers/`). Un
   ingeniero externo no puede saber, sin preguntar, dónde debe ir código nuevo.
4. **`app/` con más de 30 rutas de primer nivel** sin agrupar por dominio (marketing,
   auth, app autenticada, legal). Next.js soporta *route groups* (`(marketing)`,
   `(app)`, `(legal)`) precisamente para esto, y no se están usando.
5. **Dependencia crítica de assets muy pesados (Unity, hasta 505 MB)** como parte
   central de la experiencia. Es defendible técnicamente, pero es un punto de fricción
   de costo/viabilidad que hay que cuantificar explícitamente en la presentación
   (ver sección de costos), porque un jurado va a preguntar "¿cuánto cuesta esto
   funcionando con 500 usuarios concurrentes?".
6. **Documentación de negocio vive en un solo archivo de guion de presentación**
   (`ATHERNIX_PRESENTACION.md`), no en documentación de producto formal (problema,
   objetivos, métricas de éxito). Es un excelente guion oral, pero no responde por sí
   solo al checklist de evaluación institucional.

### Comparación con proyectos profesionales de referencia

| Aspecto | Athernix (actual) | Labster / ENGAGE / VictoryXR (referencia industria) |
|---|---|---|
| Testing | Ninguno | Suites de integración + QA dedicado antes de cada release |
| CI/CD | Manual | Pipelines automatizados, entornos de staging |
| Onboarding sin fricción | Requiere descargar builds de cientos de MB | Diseño "lesson-first": carga progresiva, escenas ligeras, contenido modular |
| Métricas de aprendizaje | No hay analítica de uso/aprendizaje visible en el código | Checkpoints de evaluación embebidos, dashboards de progreso docente |
| Multi-tenant / gestión de aula | Roles básicos (estudiante/docente) | Herramientas de gestión de clase, asignación de contenido, reportes |
| Modelo de costos documentado | No | Modelo de licenciamiento/suscripción claro y público |

**Conclusión de la comparación:** Athernix no necesita "más tecnología" — ya tiene
más variedad tecnológica que muchos competidores establecidos. Lo que le falta es
**disciplina de producto y de ingeniería**: pruebas, medición de resultados, y una
narrativa de costos/viabilidad tan sólida como su narrativa técnica.

---

## 2. Mejoras de estructura de software (prioridad alta → baja)

1. **Elegir un único patrón de organización y aplicarlo consistentemente.**
   Recomendación: seguir la convención nativa de Next.js App Router (colocar
   lógica junto a la ruta que la usa: `app/mundi/_lib`, `app/mundi/_components`) para
   código específico de una página, y reservar una carpeta de nivel raíz
   (`lib/` o `services/`) solo para lógica verdaderamente compartida entre rutas
   (Supabase client, IA, assets). Esto elimina la ambigüedad entre `controllers/`
   global vs. local.
2. **Agrupar rutas por dominio con route groups**: `(marketing)` para landing/
   informativas, `(auth)` para login/registro/recuperación, `(app)` para
   dashboard/student/teacher/mundi/ather (autenticadas), `(legal)` para
   privacidad/términos. Reduce de 30+ carpetas planas a 4 dominios navegables.
3. **Introducir un framework de testing mínimo viable**: Vitest + React Testing
   Library para lógica de controllers/hooks y componentes críticos (auth, mundi
   controller), y un smoke test e2e (Playwright) del flujo principal:
   login → `/mundi` → seleccionar destino → lanzar experiencia PC_MODE.
   No hace falta cobertura alta; con 5-10 tests bien elegidos ya se puede mostrar
   "resultados obtenidos" verificables.
4. **CI básico** con GitHub Actions: `lint` + `typecheck` + `build` en cada push/PR.
   Es configuración de un solo archivo YAML y eleva mucho la percepción de madurez.
5. **Formalizar el modelo de costos de infraestructura** como parte del código/documentación
   (no solo mental): cuánto cuesta Cloudflare Workers + R2 a distintos niveles de
   tráfico, y una estrategia de reducción de peso de los builds Unity (compresión,
   streaming de assets, LOD) si el proyecto crece.
6. **Separar contenido de configuración**: mover roadmaps y contenido educativo
   (`astronomyRoadmap.ts`, `biologyRoadmap.ts`, `mathRoadmap.ts`, `quantumRoadmap.ts`)
   de `models/` a una capa de "contenido" (`content/` o CMS ligero), ya que
   conceptualmente no son modelos de dominio sino datos curriculares editables por
   no-programadores a futuro.

---

## 3. Plan de refactor priorizado (propuesto, no ejecutado)

| Fase | Acción | Esfuerzo | Impacto en evaluación |
|---|---|---|---|
| 1 | Agregar CI (lint+typecheck+build) vía GitHub Actions | Bajo (1 archivo) | Alto — señal inmediata de madurez |
| 2 | Agregar Vitest + 5-10 tests de humo en flujos críticos (auth, mundi, chatbot) | Medio | Alto — responde directamente a "resultados obtenidos" |
| 3 | Reagrupar `app/` en route groups por dominio | Medio (mover carpetas, sin lógica nueva) | Medio-alto — mejora legibilidad para cualquier revisor |
| 4 | Unificar `controllers/`/`models/` global vs. local bajo una sola convención documentada en `AGENTS.md`/`CLAUDE.md` | Medio-alto (toca imports en varias rutas) | Medio — mejora mantenibilidad a mediano plazo |
| 5 | Mover roadmaps/contenido curricular fuera de `models/` a `content/` | Bajo-medio | Bajo-medio — claridad conceptual |
| 6 | Documentar y, si es posible, medir el costo real de Cloudflare+R2 con tráfico simulado | Bajo (investigación) | Alto para el criterio de "viabilidad y costos" |

No se ha tocado código todavía; este plan queda pendiente de tu aprobación para
ejecutarlo fase por fase.

---

## 4. Checklist de evaluación — respuestas propuestas para Athernix

### ✅ El problema que busca resolver
En El Salvador (y en general en países en desarrollo), el acceso a experiencias
educativas inmersivas de alta calidad —laboratorios, sitios históricos, entornos de
bienestar mental— está limitado por costos de infraestructura física, distancia
geográfica a sitios culturales/históricos (Joya de Cerén, pirámides, etc.) y falta de
equipamiento especializado en las aulas. Además, el acceso a tecnología VR de punta
suele requerir instalación de software pesado y hardware costoso, lo que excluye a
la mayoría de estudiantes.

### ✅ Los objetivos del proyecto
- Objetivo general: crear un ecosistema web de realidad virtual e inteligencia
  artificial que permita a estudiantes salvadoreños acceder a experiencias
  educativas y culturales inmersivas sin necesidad de instalar software ni poseer
  hardware VR (funciona en PC y, opcionalmente, en visores vía WebXR).
- Objetivos específicos:
  1. Digitalizar sitios históricos/culturales relevantes (Joya de Cerén, Tazumal,
     pirámides de Egipto, etc.) como gemelos digitales navegables.
  2. Ofrecer un asistente de IA conversacional (voz y texto) como apoyo pedagógico.
  3. Dar seguimiento al progreso del estudiante (logros, coleccionables, roles
     diferenciados docente/estudiante).
  4. Garantizar acceso de bajo costo (sin instalación, ejecutable desde el navegador).

### ✅ La metodología utilizada
Desarrollo ágil e iterativo, con separación de responsabilidades: front-end web
(Next.js/React/TypeScript) para navegación, autenticación y orquestación; motor Unity
WebGL para las experiencias 3D inmersivas, comunicadas con la web vía mensajería
(`SendMessage`) para pasar sesión de usuario e idioma; modelado y animación 3D con
pipeline Blender → Mixamo → glTF; despliegue continuo en infraestructura edge
(Cloudflare Workers) con almacenamiento de objetos pesados en R2.
*(Recomendación honesta: formalizar esto también como metodología de gestión —
Scrum/Kanban, sprints— si se usó alguna, porque "metodología" en un checklist de
evaluación institucional casi siempre se refiere también a proceso de gestión del
proyecto, no solo a arquitectura técnica.)*

### ✅ Los resultados obtenidos
Aquí es donde el proyecto está **más débil hoy** y donde recomiendo invertir antes de
la evaluación: no hay métricas ni pruebas automatizadas que respalden resultados.
Sugerido mínimo antes de presentar:
- Número de rutas/experiencias funcionales completas end-to-end (ej. "14 ubicaciones
  navegables en `/mundi`, 3 builds de Unity operativos: History, Mental, Lobby").
- Capturas o video corto de al menos un flujo completo (login → selección →
  experiencia VR/PC) como evidencia reproducible.
- Si es posible, una prueba piloto informal con un grupo reducido de usuarios reales
  (aunque sea 5-10 personas) con retroalimentación cualitativa — esto vale mucho más
  ante un jurado que solo código.

### ✅ El impacto que puede generar
- Democratización del acceso a educación inmersiva y patrimonio cultural para
  estudiantes sin recursos para viajar o comprar hardware VR.
- Potencial de uso en salud mental estudiantil (módulo Zen/meditación guiada).
- Posicionamiento de El Salvador como productor (no solo consumidor) de tecnología
  EdTech/VR de exportación regional.

### ✅ La viabilidad de su implementación
Técnicamente viable y ya parcialmente implementada (no es solo una propuesta en
papel). El riesgo principal de viabilidad es el **peso de los assets Unity**
(119–505 MB por build) sobre una audiencia con conexiones de internet variables —
esto debe reconocerse explícitamente y presentarse con un plan de mitigación
(compresión adicional, streaming progresivo, versión "ligera" para conexiones
lentas).

### ✅ Los costos aproximados de desarrollo, implementación y operación
Recomendación: presentar un desglose real, aunque sea estimado, con estas categorías
(el jurado valora más una estimación honesta que ausencia de cifras):
- **Desarrollo**: horas de desarrollo web + horas de desarrollo Unity/3D + diseño.
- **Implementación/infraestructura recurrente**: Cloudflare Workers (plan pagado si
  se excede el free tier), almacenamiento R2 (por GB + egress), Supabase (plan según
  usuarios/DB), APIs de IA (Groq, ElevenLabs — cobran por uso/tokens/minutos de voz).
- **Operación**: mantenimiento de contenido educativo, soporte a usuarios, actualización
  de builds Unity.
*(Si no tienes cifras reales de Cloudflare/Supabase/Groq/ElevenLabs, puedo ayudarte a
estimarlas a partir de sus tablas de precios públicas y del uso proyectado.)*

### ✅ Los recursos necesarios para su instalación y funcionamiento
- Del lado del usuario: navegador moderno con soporte WebGL2/WebGL 2.0 y,
  opcionalmente, un visor compatible con WebXR (Meta Quest, Pico). No requiere
  instalación de software adicional.
- Del lado de operación: cuenta de Cloudflare (Workers + R2), proyecto Supabase,
  claves de API de Groq y ElevenLabs, dominio propio.

### ✅ Los requerimientos de mantenimiento y los costos asociados
- Actualización periódica de dependencias (Next.js, React, Three.js evolucionan
  rápido) y de builds de Unity cuando se agreguen nuevas ubicaciones/experiencias.
- Monitoreo de costos variables de IA (tokens de Groq, minutos de voz de ElevenLabs)
  y de egress de R2 a medida que crece el tráfico.
- Sin CI/tests, cada actualización de dependencias es un riesgo de regresión — otra
  razón concreta para priorizar la Fase 1-2 del plan de refactor antes de escalar
  el mantenimiento.

### ✅ La posibilidad de mantener el proyecto funcionando a mediano y largo plazo
Viable si se resuelven dos condiciones: (1) un modelo de sostenibilidad financiera
claro (¿institucional, freemium, alianzas con MINED/museos, patrocinios?), y (2) una
reducción de la deuda técnica actual (tests, CI, estructura) para que el
mantenimiento no dependa de memoria de un solo desarrollador.

### ✅ Objetivos de Desarrollo Sostenible (ODS) relacionados
- **ODS 4 — Educación de calidad**: eje central del proyecto; acceso equitativo a
  experiencias educativas inmersivas de calidad.
- **ODS 10 — Reducción de las desigualdades**: al eliminar la barrera de hardware VR
  costoso (funciona en PC estándar), amplía el acceso a estudiantes de bajos recursos.
- **ODS 3 — Salud y bienestar**: el módulo Zen/meditación guiada aporta directamente
  a salud mental estudiantil.
- **ODS 11 — Ciudades y comunidades sostenibles**: la digitalización de patrimonio
  cultural/histórico (Joya de Cerén, Tazumal) contribuye a la preservación y difusión
  del patrimonio salvadoreño sin poner en riesgo los sitios físicos.
- **ODS 9 — Industria, innovación e infraestructura**: desarrollo de tecnología EdTech/VR
  de origen salvadoreño con potencial de exportación regional.

---

## 5. Siguientes pasos sugeridos
1. Aprobar y priorizar cuáles fases del plan de refactor (sección 3) ejecutar antes
   de la evaluación.
2. Completar las cifras reales de costos (Cloudflare/Supabase/Groq/ElevenLabs) para
   la sección de costos — puedo ayudar a estimarlas.
3. Producir al menos 1 pieza de evidencia de "resultados obtenidos" (video/demo
   grabada) si no se puede hacer demo en vivo.
