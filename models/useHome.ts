// model/homeModel.ts
import { createBrowserClient } from '@supabase/ssr'
import type { UserRole } from '@/models/navbarModel'

// ── Client ───────────────────────────────────────────────────
function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}

// ── Types ─────────────────────────────────────────────────────
export interface HomeUser {
  id:         string
  first_name: string | null
  last_name:  string | null
  role:       UserRole
  avatar_url: string | null
}

export interface Achievement {
  id:       string
  label:    string
  desc:     string
  icon:     string
  color:    string
  unlocked: boolean
  xp:       number
}

export interface NewsItem {
  id:       string
  tag:      string
  tagColor: string
  title:    string
  summary:  string
  date:     string
  readTime: string
}

export interface ExploreCard {
  id:    string
  area:  string
  title: string
  desc:  string
  icon:  string
  color: string
  glow:  string
}

export interface HomeState {
  isLoading: boolean
  user:      HomeUser | null
  // carousel
  activeNews:    number
  expandedNews:  string | null
}

// ── Initial state ─────────────────────────────────────────────
export const initialHomeState: HomeState = {
  isLoading:    true,
  user:         null,
  activeNews:   0,
  expandedNews: null,
}

// ── Supabase fetch ────────────────────────────────────────────
export async function fetchHomeUser(): Promise<HomeUser | null> {
  const supabase = getSupabase()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null

  const { data } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, role, avatar_url')
    .eq('id', user.id)
    .single()

  if (!data) return null
  return data as HomeUser
}

// ── Static content ────────────────────────────────────────────
export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', label: 'PRIMER_ACCESO',   desc: 'Ingresaste al sistema por primera vez',         icon: '◈', color: '#ff6b35', unlocked: true,  xp: 50  },
  { id: 'a2', label: 'EXPLORADOR',      desc: 'Visitaste todos los módulos disponibles',        icon: '◎', color: '#ffaa00', unlocked: true,  xp: 120 },
  { id: 'a3', label: 'HISTORIA_VIVA',   desc: 'Completaste el recorrido de Joya de Cerén',     icon: '⬡', color: '#ff3060', unlocked: true,  xp: 200 },
  { id: 'a4', label: 'SVIRTUAL_TOUR',   desc: 'Realizaste tu primer tour virtual',              icon: '◐', color: '#00e5a0', unlocked: false, xp: 300 },
  { id: 'a5', label: 'MENTE_LIBRE',     desc: 'Completaste una sesión de biofeedback XR',      icon: '△', color: '#a855f7', unlocked: false, xp: 400 },
  { id: 'a6', label: 'MAESTRO_STEM',    desc: 'Obtuviste puntaje perfecto en un módulo STEM',  icon: '✦', color: '#ff6b35', unlocked: false, xp: 500 },
  { id: 'a7', label: 'COLABORADOR',     desc: 'Trabajaste en equipo en un proyecto conjunto',  icon: '⊕', color: '#ffaa00', unlocked: false, xp: 350 },
  { id: 'a8', label: 'INNOVADOR',       desc: 'Propusiste una mejora que fue implementada',    icon: '◆', color: '#00e5a0', unlocked: false, xp: 600 },
]

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1',
    tag: 'Patrimonio VR',
    tagColor: '#ff3060',
    title: 'Joya de Cerén ahora en resolución 8K',
    summary: 'El sitio arqueológico más importante de El Salvador ahora puede ser explorado en detalle con nuestra nueva actualización de resolución 8K. Cada piedra, cada vasija y cada estructura ha sido digitalizada con precisión milimétrica usando fotogrametría avanzada.',
    date: '08 Jun 2026',
    readTime: '3 min',
  },
  {
    id: 'n2',
    tag: 'Salud XR',
    tagColor: '#00e5a0',
    title: 'Nuevas terapias de biofeedback disponibles',
    summary: 'MenteLibre VR incorpora 4 nuevas sesiones de terapia basadas en realidad extendida. Los estudios clínicos demuestran una reducción del 40% en niveles de estrés después de solo 3 sesiones. Disponible para todos los roles desde esta semana.',
    date: '05 Jun 2026',
    readTime: '4 min',
  },
  {
    id: 'n3',
    tag: 'Turismo IA',
    tagColor: '#ffaa00',
    title: 'SVirtual Tours lanza guía multilingüe con IA',
    summary: 'Nuestro módulo de turismo virtual ahora cuenta con un guía inteligente que habla 12 idiomas y puede responder preguntas en tiempo real sobre los destinos. La IA fue entrenada con más de 500 horas de contenido cultural salvadoreño.',
    date: '01 Jun 2026',
    readTime: '5 min',
  },
  {
    id: 'n4',
    tag: 'STEM',
    tagColor: '#a855f7',
    title: 'Laboratorios virtuales de física y química',
    summary: 'Athernix lanza su primera colección de laboratorios STEM en entorno virtual. Los estudiantes pueden realizar experimentos imposibles en el mundo físico, desde reacciones nucleares a escala hasta simulaciones de física cuántica interactiva.',
    date: '28 May 2026',
    readTime: '6 min',
  },
]

export const EXPLORE_CARDS: ExploreCard[] = [
  {
    id: 'e1',
    area:  'Física Cuántica',
    title: 'QUANTUM_LAB',
    desc:  'Simula partículas subatómicas y experimenta con entrelazamiento cuántico en entorno inmersivo.',
    icon:  '⬡',
    color: '#00e5a0',
    glow:  'rgba(0,229,160,0.3)',
  },
  {
    id: 'e2',
    area:  'Biología Celular',
    title: 'CELL_EXPLORER',
    desc:  'Navega el interior de una célula humana en escala 1:1 millón. Mitocondrias, ADN y más.',
    icon:  '◈',
    color: '#ff6b35',
    glow:  'rgba(255,107,53,0.3)',
  },
  {
    id: 'e3',
    area:  'Astronomía',
    title: 'COSMOS_MAP',
    desc:  'Viaja a cualquier punto del universo observable. Más de 2 millones de cuerpos celestes catalogados.',
    icon:  '◎',
    color: '#a855f7',
    glow:  'rgba(168,85,247,0.3)',
  },
  {
    id: 'e4',
    area:  'Matemáticas',
    title: 'MATH_FORGE',
    desc:  'Visualiza conceptos abstractos: topología, números complejos y geometría no euclidiana en 3D.',
    icon:  '△',
    color: '#ffaa00',
    glow:  'rgba(255,170,0,0.3)',
  },
]

// ── Helpers ───────────────────────────────────────────────────
export function getFirstName(user: HomeUser | null): string {
  return user?.first_name?.split(' ')[0] ?? 'Operador'
}

export function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Buenos días'
  if (h < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

export function getTotalXP(achievements: Achievement[]): number {
  return achievements.filter(a => a.unlocked).reduce((acc, a) => acc + a.xp, 0)
}