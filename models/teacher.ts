export type TeacherSection   = 'resumen' | 'misiones' | 'estudiantes' | 'materias'
export type MissionStatus    = 'borrador' | 'publicada' | 'cerrada'
export type MissionDifficulty = 'fácil' | 'media' | 'difícil'
export type StudentStatus    = 'al_dia' | 'atrasado' | 'en_riesgo'

// ── Materias (ligadas a los módulos VR reales de Athernix) ─────
export interface Subject {
  id:          string
  name:        string
  moduleId:    string   // 'historia' | 'tours' | 'mente' | 'quantum'
  moduleLabel: string
  icon:        string
  color:       string
  classIds:    string[]
}

export const SUBJECTS: Subject[] = [
  {
    id: 'sub-historia', name: 'Estudios Sociales', moduleId: 'historia',
    moduleLabel: 'Historia Viva VR', icon: '🏛️', color: '#FF006E',
    classIds: ['c-8a', 'c-9b'],
  },
  {
    id: 'sub-turismo', name: 'Geografía y Turismo', moduleId: 'tours',
    moduleLabel: 'SVirtual Tours', icon: '🌎', color: '#FF6B00',
    classIds: ['c-9b', 'c-b1a'],
  },
  {
    id: 'sub-bienestar', name: 'Orientación y Bienestar', moduleId: 'mente',
    moduleLabel: 'MenteLibre VR', icon: '🧠', color: '#FFD700',
    classIds: ['c-8a', 'c-9b', 'c-b1a'],
  },
  {
    id: 'sub-ciencias', name: 'Ciencias y Física', moduleId: 'quantum',
    moduleLabel: 'Quantum Lab', icon: '⚛️', color: '#00E5A0',
    classIds: [],
  },
]

// ── Clases / secciones ──────────────────────────────────────────
export interface ClassGroup {
  id:          string
  name:        string
  gradeLevel:  string
  color:       string
  joinCode:    string   // código que los estudiantes usan para unirse
  teacherName: string
}

export const CLASSES: ClassGroup[] = [
  { id: 'c-8a',  name: '8vo Grado — Sección A',   gradeLevel: 'Básico',       color: '#FF006E', joinCode: 'HIST-8A2K', teacherName: 'Prof. Ana Martínez' },
  { id: 'c-9b',  name: '9no Grado — Sección B',    gradeLevel: 'Básico',       color: '#FF6B00', joinCode: 'TOUR-9B7L', teacherName: 'Prof. Ana Martínez' },
  { id: 'c-b1a', name: 'Bachillerato — 1ro A',     gradeLevel: 'Bachillerato', color: '#FFD700', joinCode: 'MENT-B1A5', teacherName: 'Prof. Carlos Rivas' },
]

// ── Estudiantes ──────────────────────────────────────────────────
export interface Student {
  id:            string
  name:          string
  initials:      string
  classId:       string
  xp:            number
  level:         number
  streakDays:    number
  missionsDone:  number
  missionsTotal: number
  status:        StudentStatus
  lastActive:    string
}

export const STUDENTS: Student[] = [
  { id: 's1', name: 'Ana Sofía Guevara',   initials: 'AG', classId: 'c-8a',  xp: 640, level: 5, streakDays: 6, missionsDone: 8,  missionsTotal: 10, status: 'al_dia',   lastActive: 'hace 2h' },
  { id: 's2', name: 'Diego Alexander Ruiz', initials: 'DR', classId: 'c-8a',  xp: 210, level: 2, streakDays: 0, missionsDone: 2,  missionsTotal: 10, status: 'en_riesgo', lastActive: 'hace 6 días' },
  { id: 's3', name: 'Fernanda Escobar',     initials: 'FE', classId: 'c-8a',  xp: 480, level: 4, streakDays: 3, missionsDone: 6,  missionsTotal: 10, status: 'al_dia',   lastActive: 'hace 1 día' },
  { id: 's4', name: 'José Manuel Portillo', initials: 'JP', classId: 'c-9b',  xp: 355, level: 3, streakDays: 1, missionsDone: 5,  missionsTotal: 9,  status: 'atrasado', lastActive: 'hace 3 días' },
  { id: 's5', name: 'Camila Hernández',     initials: 'CH', classId: 'c-9b',  xp: 810, level: 6, streakDays: 9, missionsDone: 9,  missionsTotal: 9,  status: 'al_dia',   lastActive: 'hace 20 min' },
  { id: 's6', name: 'Kevin Alberto Flores', initials: 'KF', classId: 'c-9b',  xp: 95,  level: 1, streakDays: 0, missionsDone: 1,  missionsTotal: 9,  status: 'en_riesgo', lastActive: 'hace 9 días' },
  { id: 's7', name: 'María José Recinos',   initials: 'MR', classId: 'c-b1a', xp: 720, level: 6, streakDays: 5, missionsDone: 7,  missionsTotal: 8,  status: 'al_dia',   lastActive: 'hace 4h' },
  { id: 's8', name: 'Óscar Iván Martínez',  initials: 'OM', classId: 'c-b1a', xp: 430, level: 4, streakDays: 2, missionsDone: 4,  missionsTotal: 8,  status: 'atrasado', lastActive: 'hace 2 días' },
]

// ── Misiones (tareas asignadas) ─────────────────────────────────
export interface Mission {
  id:             string
  title:          string
  description:    string
  subjectId:      string
  classId:        string
  difficulty:     MissionDifficulty
  xpReward:       number
  dueDate:        string
  status:         MissionStatus
  assignedCount:  number
  completedCount: number
  createdAt:      string
}

export const MISSIONS: Mission[] = [
  {
    id: 'm1', title: 'Recorre la Acrópolis Maya de Copán',
    description: 'Completa el recorrido guiado en Historia Viva VR y responde el cuestionario final sobre arquitectura maya.',
    subjectId: 'sub-historia', classId: 'c-8a', difficulty: 'media', xpReward: 80,
    dueDate: '14 jul', status: 'publicada', assignedCount: 24, completedCount: 16, createdAt: 'hace 3 días',
  },
  {
    id: 'm2', title: 'Tour virtual: Ruta de las Flores',
    description: 'Explora el recorrido turístico guiado por IA y escribe 3 datos que no conocías de la ruta.',
    subjectId: 'sub-turismo', classId: 'c-9b', difficulty: 'fácil', xpReward: 50,
    dueDate: '10 jul', status: 'publicada', assignedCount: 28, completedCount: 22, createdAt: 'hace 5 días',
  },
  {
    id: 'm3', title: 'Sesión de respiración guiada',
    description: 'Completa una sesión de MenteLibre VR sobre manejo de ansiedad antes de exámenes.',
    subjectId: 'sub-bienestar', classId: 'c-b1a', difficulty: 'fácil', xpReward: 40,
    dueDate: '9 jul', status: 'cerrada', assignedCount: 20, completedCount: 20, createdAt: 'hace 9 días',
  },
  {
    id: 'm4', title: 'Ensayo: identidad cultural salvadoreña',
    description: 'A partir del módulo de Historia Viva VR, redacta un ensayo corto sobre patrimonio cultural.',
    subjectId: 'sub-historia', classId: 'c-9b', difficulty: 'difícil', xpReward: 120,
    dueDate: '20 jul', status: 'borrador', assignedCount: 0, completedCount: 0, createdAt: 'hace 1 día',
  },
  {
    id: 'm5', title: 'Diario de bienestar — semana 1',
    description: 'Registra tu estado de ánimo diario usando el módulo MenteLibre VR y comparte una reflexión.',
    subjectId: 'sub-bienestar', classId: 'c-8a', difficulty: 'media', xpReward: 60,
    dueDate: '16 jul', status: 'publicada', assignedCount: 24, completedCount: 5, createdAt: 'hace 2 días',
  },
  {
    id: 'm6', title: 'Explora el corredor turístico oriental',
    description: 'Recorrido virtual guiado + quiz final sobre atractivos naturales de la zona oriental.',
    subjectId: 'sub-turismo', classId: 'c-b1a', difficulty: 'media', xpReward: 70,
    dueDate: '18 jul', status: 'publicada', assignedCount: 20, completedCount: 11, createdAt: 'hace 4 días',
  },
]

// ── Borrador de nueva misión (form state) ───────────────────────
export interface NewMissionDraft {
  title:       string
  description: string
  subjectId:   string
  classId:     string
  difficulty:  MissionDifficulty
  xpReward:    number
  dueDate:     string
}

export const EMPTY_MISSION_DRAFT: NewMissionDraft = {
  title: '', description: '', subjectId: SUBJECTS[0].id, classId: CLASSES[0].id,
  difficulty: 'media', xpReward: 50, dueDate: '',
}

// ── Copys de interfaz ────────────────────────────────────────────
export const TEACHER_COPY = {
  eyebrow: 'PANEL_DOCENTE // ATHERNIX CLASSROOM',
  heroSub: 'Diseña misiones, asigna materias y da seguimiento al progreso de tus estudiantes en tiempo real.',
  comingSoon: 'Próximamente: tus estudiantes podrán unirse con un código de clase y ver sus misiones desde su propio portal.',
}

export const STATUS_META: Record<StudentStatus, { label: string; color: string }> = {
  al_dia:    { label: 'Al día',    color: '#00E5A0' },
  atrasado:  { label: 'Atrasado',  color: '#FFD700' },
  en_riesgo: { label: 'En riesgo', color: '#FF006E' },
}

export const MISSION_STATUS_META: Record<MissionStatus, { label: string; color: string }> = {
  borrador:  { label: 'Borrador',  color: 'rgba(255,255,255,.5)' },
  publicada: { label: 'Publicada', color: '#00E5A0' },
  cerrada:   { label: 'Cerrada',   color: '#FF6B00' },
}

export const DIFFICULTY_META: Record<MissionDifficulty, { label: string; color: string }> = {
  'fácil':   { label: 'Fácil',   color: '#00E5A0' },
  'media':   { label: 'Media',   color: '#FFD700' },
  'difícil': { label: 'Difícil', color: '#FF006E' },
}