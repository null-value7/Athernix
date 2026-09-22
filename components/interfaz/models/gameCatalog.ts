export const gameFilters = ['Todos', 'Athernix', 'Educación'] as const

export type GameFilter = (typeof gameFilters)[number]

export type CoverSymbol = 'comet' | 'beast' | 'circuit' | 'skull' | 'blade' | 'orb'

export interface Game {
  id: string
  title: string
  subtitle: string
  category: Exclude<GameFilter, 'Todos'>
  description: string
  accent: string
  glow: string
  rating: string
  playtime: string
  players: string
  symbol: CoverSymbol
  route: string
}

export const gameCatalog: readonly Game[] = [
  {
    id: 'zen',
    title: 'ZEN',
    subtitle: 'GARDEN',
    category: 'Athernix',
    description: 'Zona de relajación y biofeedback 3D.',
    accent: '#ffc928',
    glow: '#ff6b19',
    rating: '9.8',
    playtime: '14 h',
    players: '1 jugador',
    symbol: 'comet',
    route: '/zen'
  },
  {
    id: 'mundi',
    title: 'MUNDI',
    subtitle: 'PLANET',
    category: 'Athernix',
    description: 'Explora el planeta interactivo y descubre nodos.',
    accent: '#ff5b2d',
    glow: '#ffc928',
    rating: '9.4',
    playtime: '22 h',
    players: '1–8 jugadores',
    symbol: 'circuit',
    route: '/mundi'
  },
  {
    id: 'ondilla3',
    title: 'ONDILLA',
    subtitle: 'EDUCACIÓN',
    category: 'Educación',
    description: 'Recorrido interactivo por las materias básicas.',
    accent: '#e52b27',
    glow: '#ff9d1c',
    rating: '9.6',
    playtime: '31 h',
    players: '1–4 jugadores',
    symbol: 'beast',
    route: '/ondilla3'
  },
]

export function filterGames(filter: GameFilter): readonly Game[] {
  return filter === 'Todos' ? gameCatalog : gameCatalog.filter((game) => game.category === filter)
}
