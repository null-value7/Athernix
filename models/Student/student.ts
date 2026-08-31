import { CLASSES, SUBJECTS, MISSIONS, type ClassGroup, type Subject, type Mission } from '@/models/teacher'

export type StudentSection      = 'clases' | 'misiones' | 'progreso'
export type StudentMissionState = 'pendiente' | 'completada'

export { CLASSES, SUBJECTS, MISSIONS }
export type { ClassGroup, Subject, Mission }

// ── Perfil del estudiante (mock — vendrá de auth/DB más adelante) ──
export interface StudentProfile {
  id:        string
  name:      string
  firstName: string
  initials:  string
  streakDays: number
}

export const STUDENT_PROFILE: StudentProfile = {
  id: 'me', name: 'Estudiante Athernix', firstName: 'Estudiante', initials: 'ES', streakDays: 3,
}

// ── Logros (calculados en el controller a partir del progreso) ──
export interface Badge {
  id:       string
  label:    string
  desc:     string
  icon:     string
  color:    string
}

export const BADGES: Badge[] = [
  { id: 'first-mission', label: 'Primeros Pasos',   desc: 'Completa tu primera misión.',              icon: '🌱', color: '#00E5A0' },
  { id: 'streak-3',      label: 'Racha de Fuego',    desc: 'Mantén una racha de 3 días o más.',        icon: '🔥', color: '#FF6B00' },
  { id: 'multi-class',   label: 'Explorador VR',     desc: 'Únete a 2 o más clases distintas.',        icon: '🧭', color: '#FF006E' },
  { id: 'halfway',       label: 'Medio Camino',      desc: 'Completa el 50% de tus misiones asignadas.', icon: '⚡', color: '#FFD700' },
  { id: 'all-done',      label: 'Leyenda Athernix',  desc: 'Completa todas tus misiones disponibles.', icon: '👑', color: '#FFD700' },
]

// ── Copys de interfaz ────────────────────────────────────────────
export const STUDENT_COPY = {
  eyebrow: 'PANEL_ESTUDIANTE // ATHERNIX CLASSROOM',
  heroSub: 'Únete a las clases de tus profesores con un código y completa misiones para ganar XP.',
  emptyState: 'Todavía no te has unido a ninguna clase. Pídele el código a tu profesor y únete para ver tus misiones.',
  joinLabel: 'Ingresa el código que te compartió tu profesor (ej. HIST-8A2K).',
  joinErrorInvalid: 'Ese código no coincide con ninguna clase activa. Revísalo con tu profesor.',
  joinErrorAlready: 'Ya formas parte de esta clase.',
  joinSuccess: '¡Te uniste a la clase! Ya puedes ver sus misiones.',
}

export const XP_PER_LEVEL = 150