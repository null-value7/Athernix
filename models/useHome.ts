// models/useHome.ts

// ── Types ──────────────────────────────────────────────────────

export interface Achievement {
  id: string
  icon: string
  label: string
  desc: string
  xp: number
  color: string
  unlocked: boolean
}

export interface NewsItem {
  id: string
  tag: string
  tagColor: string
  date: string
  readTime: string
  title: string
  summary: string
  url?: string
}

export interface ExploreCard {
  id: string
  icon: string
  area: string
  title: string
  desc: string
  color: string
  glow: string
  route?: string
}

export interface StatBadge {
  icon: string
  label: string
  value: string
  color: string
}

// ── NEW: AI Glasses / Model ────────────────────────────────────

export interface AIGlassesModel {
  id: string
  name: string
  codename: string
  icon: string          // emoji or SVG id
  color: string         // accent hex
  glow: string          // rgba glow
  tier: 'BÁSICO' | 'AVANZADO' | 'EXPERTO' | 'ÉLITE'
  tierColor: string
  description: string
  strengths: string[]
  context: string       // context window label
  speed: 'Rápido' | 'Equilibrado' | 'Potente'
  speedColor: string
  badge?: string        // e.g. "NUEVO", "RECOMENDADO"
  locked: boolean
}

// ── Home state ─────────────────────────────────────────────────

export interface HomeState {
  isLoading: boolean
  activeNews: number
  expandedNews: string | null
  // Glasses
  activeGlassesId: string
  glassesHoverId: string | null
}

// ── Data: Achievements ─────────────────────────────────────────

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_login',   icon: '🔑', label: 'Primera Conexión', desc: 'Iniciaste sesión por primera vez en Athernix', xp: 50,  color: '#ff6b35', unlocked: true },
  { id: 'stem_explorer', icon: '🔭', label: 'Explorador STEM',  desc: 'Visitaste la Zona de Desarrollo',             xp: 100, color: '#a855f7', unlocked: true },
  { id: 'chat_ather',    icon: '🤖', label: 'Habló con Ather',  desc: 'Enviaste tu primer mensaje a la IA',           xp: 75,  color: '#00e5a0', unlocked: true },
  { id: 'roadmap_view',  icon: '🗺️', label: 'Cartógrafo',      desc: 'Revisaste un roadmap completo',                xp: 120, color: '#f7c59f', unlocked: false },
  { id: 'quiz_pass',     icon: '⚡', label: 'Mente Ágil',       desc: 'Completaste tu primer quiz sin errores',       xp: 200, color: '#60a5fa', unlocked: false },
  { id: 'streak_7',      icon: '🔥', label: 'Racha de 7 días',  desc: 'Aprendiste 7 días seguidos',                  xp: 300, color: '#fbbf24', unlocked: false },
  { id: 'bib_read',      icon: '📚', label: 'Devorador',        desc: 'Abriste 5 recursos bibliográficos',           xp: 150, color: '#f43f5e', unlocked: false },
  { id: 'collab',        icon: '🌐', label: 'Conector',         desc: 'Compartiste un recurso con otro usuario',     xp: 250, color: '#10b981', unlocked: false },
]

// ── Data: News ─────────────────────────────────────────────────

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1', tag: 'IA', tagColor: '#a855f7', date: 'Jun 2025', readTime: '3 min',
    title: 'Modelos de lenguaje alcanzan razonamiento matemático de nivel universitario',
    summary: 'Nuevas arquitecturas transformer logran resolver problemas de cálculo y álgebra lineal con precisión del 94 %, superando el promedio de estudiantes de ingeniería.',
  },
  {
    id: 'n2', tag: 'ROBÓTICA', tagColor: '#00e5a0', date: 'May 2025', readTime: '4 min',
    title: 'Robots bípedos aprenden a caminar en terrenos no estructurados con RL puro',
    summary: 'Un equipo de investigación demostró que con reinforcement learning puro, sin simulación previa, un robot puede aprender locomoción robusta en menos de 2 horas de entrenamiento real.',
  },
  {
    id: 'n3', tag: 'FÍSICA', tagColor: '#60a5fa', date: 'May 2025', readTime: '5 min',
    title: 'Fusión nuclear: primer reactor compacto genera más energía de la que consume',
    summary: 'Un laboratorio privado anunció el primer Q>1 sostenido durante 17 segundos en un reactor de confinamiento magnético de tamaño reducido, marcando un hito histórico.',
  },
  {
    id: 'n4', tag: 'BIO', tagColor: '#f43f5e', date: 'Abr 2025', readTime: '3 min',
    title: 'AlphaFold 3 predice interacciones proteína-ADN con precisión atómica',
    summary: 'La última versión de AlphaFold extiende sus capacidades para modelar complejos biomoleculares completos, abriendo nuevas rutas en diseño de fármacos.',
  },
]

// ── Data: Explore cards ─────────────────────────────────────────

export const EXPLORE_CARDS: ExploreCard[] = [
  { id: 'math', icon: '∑', area: 'Matemáticas', title: 'Cálculo & Álgebra', desc: 'Límites, derivadas, matrices y espacios vectoriales desde cero.', color: '#ff6b35', glow: 'rgba(255,107,53,0.25)' },
  { id: 'phys', icon: '⚛', area: 'Física', title: 'Mecánica Clásica', desc: 'Leyes de Newton, trabajo, energía y oscilaciones.', color: '#60a5fa', glow: 'rgba(96,165,250,0.25)' },
  { id: 'cs',   icon: '⌨', area: 'Computación', title: 'Algoritmos & DS', desc: 'Complejidad, grafos, árboles y programación dinámica.', color: '#a855f7', glow: 'rgba(168,85,247,0.25)' },
  { id: 'bio',  icon: '🧬', area: 'Biología', title: 'Genómica & Célula', desc: 'ADN, ARN, síntesis proteica y biología molecular.', color: '#10b981', glow: 'rgba(16,185,129,0.25)' },
]

// ── Data: Stat badges ──────────────────────────────────────────

export const STAT_BADGES: StatBadge[] = [
  { icon: '⚡', label: 'XP Total',   value: '425',  color: '#fbbf24' },
  { icon: '🔥', label: 'Racha',      value: '3d',   color: '#ff6b35' },
  { icon: '✦',  label: 'Logros',     value: '3/8',  color: '#a855f7' },
  { icon: '📖', label: 'Módulos',    value: '2',    color: '#60a5fa' },
]

// ── Data: AI Glasses Models ────────────────────────────────────

export const AI_GLASSES_MODELS: AIGlassesModel[] = [
  {
    id: 'ather-flash',
    name: 'Ather Flash',
    codename: 'FLASH-1',
    icon: '⚡',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.3)',
    tier: 'BÁSICO',
    tierColor: '#6b7280',
    description: 'Respuestas instantáneas para consultas rápidas y tareas simples del día a día.',
    strengths: ['Velocidad máxima', 'Bajo consumo', 'Ideal para preguntas directas'],
    context: '8K tokens',
    speed: 'Rápido',
    speedColor: '#fbbf24',
    locked: false,
  },
  {
    id: 'ather-core',
    name: 'Ather Core',
    codename: 'CORE-2',
    icon: '🔷',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.3)',
    tier: 'AVANZADO',
    tierColor: '#60a5fa',
    description: 'El modelo equilibrado de Athernix. Ideal para aprendizaje STEM general y explicaciones detalladas.',
    strengths: ['Balance velocidad/calidad', 'Explicaciones pedagógicas', 'Soporte multi-tema'],
    context: '32K tokens',
    speed: 'Equilibrado',
    speedColor: '#60a5fa',
    badge: 'RECOMENDADO',
    locked: false,
  },
  {
    id: 'ather-nova',
    name: 'Ather Nova',
    codename: 'NOVA-3',
    icon: '🌟',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.3)',
    tier: 'EXPERTO',
    tierColor: '#a855f7',
    description: 'Razonamiento profundo para problemas complejos de matemáticas, física y programación avanzada.',
    strengths: ['Razonamiento multi-paso', 'Matemáticas avanzadas', 'Debugging de código'],
    context: '128K tokens',
    speed: 'Equilibrado',
    speedColor: '#60a5fa',
    locked: false,
  },
  {
    id: 'ather-apex',
    name: 'Ather Apex',
    codename: 'APEX-∞',
    icon: '♾',
    color: '#f43f5e',
    glow: 'rgba(244,63,94,0.35)',
    tier: 'ÉLITE',
    tierColor: '#f43f5e',
    description: 'El modelo de frontera de Athernix. Investigación, síntesis de papers y razonamiento científico de nivel experto.',
    strengths: ['Investigación profunda', 'Síntesis de papers', 'Razonamiento científico élite'],
    context: '200K tokens',
    speed: 'Potente',
    speedColor: '#f43f5e',
    badge: 'NUEVO',
    locked: true,
  },
]