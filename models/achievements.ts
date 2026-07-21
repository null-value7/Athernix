export interface Achievement {
  id: string;
  label: string;
  desc: string;
  icon: string;
  color: string;
  xp: number;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'exploration' | 'learning' | 'social' | 'mastery';
  requirement: string;
}

export interface UserStats {
  activeDays: number;
  totalXP: number;
  level: number;
  missionsCompleted: number;
  topicsExplored: number;
  hoursSpent: number;
  streakDays: number;
  joinedDate: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-login',
    label: 'Primer Paso',
    desc: 'Inicia sesión por primera vez en Athernix',
    icon: '🚀',
    color: '#FF6B00',
    xp: 50,
    unlocked: false,
    category: 'exploration',
    requirement: 'Iniciar sesión'
  },
  {
    id: 'first-module',
    label: 'Explorador',
    desc: 'Accede a tu primer módulo VR',
    icon: '🧭',
    color: '#FF006E',
    xp: 100,
    unlocked: false,
    category: 'exploration',
    requirement: 'Completar 1 módulo'
  },
  {
    id: 'first-ai-chat',
    label: 'Conexión Neural',
    desc: 'Inicia tu primera conversación con Ather IA',
    icon: '🤖',
    color: '#00E5A0',
    xp: 75,
    unlocked: false,
    category: 'learning',
    requirement: 'Usar chatbot IA'
  },
  {
    id: 'streak-3',
    label: 'Racha de Fuego',
    desc: 'Mantén una racha de 3 días consecutivos',
    icon: '🔥',
    color: '#FF6B00',
    xp: 150,
    unlocked: false,
    category: 'mastery',
    requirement: '3 días consecutivos'
  },
  {
    id: 'streak-7',
    label: 'Semana Perfecta',
    desc: 'Mantén una racha de 7 días consecutivos',
    icon: '⭐',
    color: '#FFD700',
    xp: 300,
    unlocked: false,
    category: 'mastery',
    requirement: '7 días consecutivos'
  },
  {
    id: 'modules-5',
    label: 'Viajero VR',
    desc: 'Explora 5 módulos diferentes',
    icon: '🌐',
    color: '#FF006E',
    xp: 200,
    unlocked: false,
    category: 'exploration',
    requirement: 'Completar 5 módulos'
  },
  {
    id: 'modules-10',
    label: 'Maestro VR',
    desc: 'Explora 10 módulos diferentes',
    icon: '🏆',
    color: '#FFD700',
    xp: 500,
    unlocked: false,
    category: 'exploration',
    requirement: 'Completar 10 módulos'
  },
  {
    id: 'xp-500',
    label: 'Nivel 5',
    desc: 'Alcanza 500 XP totales',
    icon: '⚡',
    color: '#00E5A0',
    xp: 0,
    unlocked: false,
    category: 'mastery',
    requirement: '500 XP'
  },
  {
    id: 'xp-1000',
    label: 'Nivel 10',
    desc: 'Alcanza 1000 XP totales',
    icon: '💎',
    color: '#FFD700',
    xp: 0,
    unlocked: false,
    category: 'mastery',
    requirement: '1000 XP'
  },
  {
    id: 'headset-registered',
    label: 'Conectado',
    desc: 'Registra tu primer headset VR',
    icon: '🥽',
    color: '#FF6B00',
    xp: 100,
    unlocked: false,
    category: 'exploration',
    requirement: 'Registrar headset'
  },
  {
    id: 'classroom-joined',
    label: 'Estudiante',
    desc: 'Únete a tu primera clase en Classroom',
    icon: '📚',
    color: '#00E5A0',
    xp: 150,
    unlocked: false,
    category: 'social',
    requirement: 'Unirse a clase'
  },
  {
    id: 'mission-completed',
    label: 'Primera Misión',
    desc: 'Completa tu primera misión de clase',
    icon: '✅',
    color: '#FF006E',
    xp: 200,
    unlocked: false,
    category: 'learning',
    requirement: 'Completar misión'
  },
  {
    id: 'missions-10',
    label: 'Misionero',
    desc: 'Completa 10 misiones en total',
    icon: '🎯',
    color: '#FFD700',
    xp: 400,
    unlocked: false,
    category: 'mastery',
    requirement: '10 misiones'
  },
  {
    id: 'development-explored',
    label: 'Investigador',
    desc: 'Explora la zona de desarrollo',
    icon: '🔬',
    color: '#00E5A0',
    xp: 100,
    unlocked: false,
    category: 'learning',
    requirement: 'Visitar /development'
  },
  {
    id: 'topic-learned',
    label: 'Sabio',
    desc: 'Completa tu primer tema de estudio',
    icon: '📖',
    color: '#FF6B00',
    xp: 150,
    unlocked: false,
    category: 'learning',
    requirement: 'Completar tema'
  },
  {
    id: 'ai-questions-10',
    label: 'Curioso',
    desc: 'Haz 10 preguntas a Ather IA',
    icon: '❓',
    color: '#FF006E',
    xp: 200,
    unlocked: false,
    category: 'learning',
    requirement: '10 preguntas'
  },
];

export const ACHIEVEMENT_CATEGORIES = {
  exploration: { label: 'Exploración', color: '#FF6B00', icon: '🧭' },
  learning: { label: 'Aprendizaje', color: '#00E5A0', icon: '📚' },
  social: { label: 'Social', color: '#FF006E', icon: '👥' },
  mastery: { label: 'Maestría', color: '#FFD700', icon: '🏆' },
};

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function getXPForLevel(level: number): number {
  return (level - 1) * 100;
}

export function getXPToNextLevel(currentXP: number): number {
  const currentLevel = calculateLevel(currentXP);
  const nextLevelXP = getXPForLevel(currentLevel + 1);
  return nextLevelXP - currentXP;
}
