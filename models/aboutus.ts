
export interface CoreValue {
  id:    string
  icon:  string
  title: string
  desc:  string
  color: string
}

export interface Module {
  id:      string
  tag:     string
  icon:    string
  title:   string
  tagline: string
  desc:    string
  color:   string
  glow:    string
  status:  'activo' | 'en desarrollo' | 'próximamente'
}

export interface Milestone {
  year:  string
  title: string
  desc:  string
  color: string
}

export interface RoleCard {
  id:     string
  icon:   string
  role:   string
  label:  string
  desc:   string
  color:  string
}

export interface StatFact {
  value: string
  label: string
  color: string
}

export interface FutureVision {
  icon:  string
  title: string
  desc:  string
  color: string
}

// ── Brand identity ─────────────────────────────────────────────
export const BRAND = {
  name:       'Athernix',
  tagline:    'La plataforma virtual del futuro del aprendizaje',
  origin:     'El Salvador',
  mission:    'Democratizar el acceso a educación inmersiva de calidad en historia, cultura y ciencia STEM mediante tecnología de vanguardia: realidad virtual, inteligencia artificial y experiencias interactivas.',
  vision:     'Ser la plataforma líder de aprendizaje experiencial en Latinoamérica, donde cada estudiante, docente y profesional pueda explorar el conocimiento sin límites físicos, económicos o geográficos.',
  philosophy: 'Creemos que aprender no debería estar limitado por cuatro paredes. El conocimiento es un viaje — y Athernix es el vehículo.',
}

// ── Core values ────────────────────────────────────────────────
export const CORE_VALUES: CoreValue[] = [
  {
    id: 'v1', icon: '◈', color: '#ff6b35',
    title: 'Accesibilidad',
    desc:  'El conocimiento de calidad debe llegar a cualquier estudiante, sin importar su ubicación geográfica o recursos económicos. Diseñamos para todos.',
  },
  {
    id: 'v2', icon: '⬡', color: '#00e5a0',
    title: 'Innovación responsable',
    desc:  'Adoptamos IA, XR y tecnologías emergentes con propósito claro: potenciar el aprendizaje humano, nunca reemplazarlo.',
  },
  {
    id: 'v3', icon: '◎', color: '#a855f7',
    title: 'Identidad cultural',
    desc:  'Honramos el patrimonio de El Salvador y Latinoamérica como punto de partida, llevando nuestra historia al mundo mediante tecnología.',
  },
  {
    id: 'v4', icon: '△', color: '#ffaa00',
    title: 'Aprendizaje activo',
    desc:  'Rechazamos la pasividad educativa. Cada módulo de Athernix convierte al usuario en protagonista de su propio proceso de descubrimiento.',
  },
  {
    id: 'v5', icon: '◆', color: '#ff3060',
    title: 'Comunidad primero',
    desc:  'Construimos para y con nuestra comunidad de estudiantes, docentes y profesionales. Su retroalimentación define cada iteración.',
  },
  {
    id: 'v6', icon: '⊕', color: '#00ccff',
    title: 'Ciencia como lenguaje',
    desc:  'STEM no es una asignatura — es la forma en que entendemos el universo. Lo hacemos accesible, visual e inevitable de explorar.',
  },
]

// ── Modules ────────────────────────────────────────────────────
export const MODULES: Module[] = [
  {
    id: 'm1', tag: 'Cultural · Patrimonio VR', icon: '◈', color: '#ff3060', glow: 'rgba(255,48,96,0.25)',
    title:   'HISTORIA_VIVA',
    tagline: 'El pasado, presente en alta resolución',
    desc:    'Recorridos virtuales por sitios arqueológicos de El Salvador — Joya de Cerén, Tazumal y más — reconstruidos en 8K con fotogrametría avanzada. Guía IA multilingüe incluida.',
    status:  'activo',
  },
  {
    id: 'm2', tag: 'Turismo · IA Multilingüe', icon: '◎', color: '#ff6b35', glow: 'rgba(255,107,53,0.25)',
    title:   'SVIRTUAL_TOURS',
    tagline: 'Turismo sin fronteras, cultura sin límites',
    desc:    'Tours virtuales inteligentes por destinos de El Salvador y Latinoamérica. Una IA entrenada con más de 500 horas de contenido cultural responde preguntas en 12 idiomas en tiempo real.',
    status:  'activo',
  },
  {
    id: 'm3', tag: 'Salud · Biofeedback XR', icon: '⬡', color: '#ffaa00', glow: 'rgba(255,170,0,0.25)',
    title:   'MENTELIBRE_VR',
    tagline: 'Bienestar mental en realidad extendida',
    desc:    'Terapia XR con biofeedback en tiempo real: el entorno virtual se adapta a tus señales fisiológicas para reducir estrés y ansiedad. Estudios demuestran -40% en niveles de ansiedad tras 3 sesiones.',
    status:  'activo',
  },
  {
    id: 'm4', tag: 'STEM · Laboratorios XR', icon: '△', color: '#00e5a0', glow: 'rgba(0,229,160,0.25)',
    title:   'QUANTUM_LAB',
    tagline: 'Ciencia que puedes tocar',
    desc:    'Laboratorios virtuales de física, química y biología. Experimenta reacciones nucleares, simulaciones de física cuántica y disecciones celulares en entornos inmersivos completamente seguros.',
    status:  'en desarrollo',
  },
]

// ── Milestones (roadmap cronológico) ───────────────────────────
export const MILESTONES: Milestone[] = [
  {
    year: '2023', color: '#ff6b35',
    title: 'Fundación del proyecto',
    desc:  'Athernix nace como iniciativa universitaria en El Salvador con la visión de democratizar el acceso a la educación inmersiva para toda Latinoamérica.',
  },
  {
    year: '2024', color: '#ffaa00',
    title: 'Lanzamiento del núcleo IA — Ather',
    desc:  'Se desarrolla Ather, la mascota-robot ajolote que sirve como interfaz conversacional del sistema. Primera integración de Groq + modelos LLM propios.',
  },
  {
    year: '2025', color: '#00e5a0',
    title: 'Plataforma multi-módulo',
    desc:  'Historia Viva, SVirtual Tours y MenteLibre VR alcanzan versión beta funcional. Se implementa el sistema de roles, experiencia y misiones gamificadas.',
  },
  {
    year: '2026', color: '#a855f7',
    title: 'Sistema operativo completo',
    desc:  'Lanzamiento de Zona de Desarrollo STEM, historial persistente de IA, chat neuronal Athernix y el panel unificado con gamificación por roles.',
  },
  {
    year: '2027+', color: '#ff3060',
    title: 'Expansión Latinoamericana',
    desc:  'Alianzas con instituciones educativas de Guatemala, Honduras, Costa Rica y México. Laboratorios STEM físicos equipados con tecnología Athernix.',
  },
]

// ── Roles of the platform ──────────────────────────────────────
export const ROLE_CARDS: RoleCard[] = [
  {
    id: 'r1', icon: '◆', role: 'admin', label: 'ADMIN',
    color: '#ff3060',
    desc: 'Control total del sistema. Gestión de usuarios, contenido, métricas y configuración de la plataforma.',
  },
  {
    id: 'r2', icon: '△', role: 'Teacher', label: 'DOCENTE',
    color: '#ffaa00',
    desc: 'Crea rutas de aprendizaje, asigna misiones, supervisa el progreso de sus estudiantes y accede a módulos pedagógicos avanzados.',
  },
  {
    id: 'r3', icon: '⬡', role: 'Student', label: 'ESTUDIANTE',
    color: '#00e5a0',
    desc: 'Explora módulos, acumula XP, desbloquea logros y avanza en su mapa cerebral de conocimiento guiado por Ather IA.',
  },
  {
    id: 'r4', icon: '◈', role: 'Personal', label: 'PERSONAL',
    color: '#ff6b35',
    desc: 'Acceso autónomo a toda la plataforma. Ideal para profesionales, autodidactas y curiosos que exploran a su propio ritmo.',
  },
]

// ── Stats ──────────────────────────────────────────────────────
export const STAT_FACTS: StatFact[] = [
  { value: '4',   label: 'Módulos activos',     color: '#ff6b35' },
  { value: '12',  label: 'Idiomas soportados',  color: '#00e5a0' },
  { value: '8K',  label: 'Resolución VR',       color: '#a855f7' },
  { value: '-40%',label: 'Estrés en MenteLibre', color: '#ffaa00' },
  { value: '500h',label: 'Contenido cultural IA', color: '#ff3060' },
  { value: '∞',   label: 'Posibilidades STEM',  color: '#00ccff' },
]

// ── Future visions ─────────────────────────────────────────────
export const FUTURE_VISIONS: FutureVision[] = [
  {
    icon: '⬡', color: '#00e5a0',
    title: 'Laboratorios STEM físicos',
    desc:  'Espacios físicos en escuelas de El Salvador equipados con visores VR y acceso completo a la plataforma Athernix, financiados mediante alianzas público-privadas.',
  },
  {
    icon: '◈', color: '#ff6b35',
    title: 'Athernix para docentes',
    desc:  'Suite completa de creación de contenido para que cualquier docente pueda construir su propio módulo inmersivo sin conocimientos técnicos.',
  },
  {
    icon: '◎', color: '#a855f7',
    title: 'Red Latinoamericana',
    desc:  'Expansión a Guatemala, Honduras, Costa Rica y México con contenido cultural localizado y alianzas con ministerios de educación regionales.',
  },
  {
    icon: '△', color: '#ffaa00',
    title: 'Athernix Open Source',
    desc:  'Publicar el núcleo de la plataforma como proyecto de código abierto para que desarrolladores de toda Latinoamérica contribuyan a su evolución.',
  },
]

// ── Mascot info ────────────────────────────────────────────────
export const ATHER_INFO = {
  name:    'Ather',
  species: 'Ajolote Robot',
  role:    'Motor de Inteligencia Athernix',
  version: 'v2.0 · Fase I',
  desc:    'Ather es más que una mascota — es la interfaz viva entre el usuario y la plataforma. Un ajolote robot que simboliza la regeneración del conocimiento: la capacidad única del ajolote de reconstruirse a sí mismo es metáfora directa del aprendizaje continuo. Ather guía, responde, motiva y acompaña cada viaje dentro del universo Athernix.',
  abilities: [
    'Conversación contextual en español',
    'Integración con módulos STEM',
    'Generación de roadmaps personalizados',
    'Historial persistente de sesiones',
    'Herramientas de exploración del mundo Athernix',
  ],
}