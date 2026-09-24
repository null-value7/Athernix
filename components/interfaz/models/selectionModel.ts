import type { GameFilter } from './gameCatalog'

export interface SelectionState {
  activeGameId: string
  filter: GameFilter
  favoriteIds: readonly string[]
  announcement: string
}

export type SelectionAction =
  | { type: 'select'; gameId: string }
  | { type: 'step'; direction: 1 | -1; gameIds: readonly string[] }
  | { type: 'filter'; filter: GameFilter; fallbackGameId: string }
  | { type: 'toggleFavorite'; gameId: string }
  | { type: 'announce'; message: string }

export const initialSelectionState: SelectionState = {
  activeGameId: 'zen',
  filter: 'Todos',
  favoriteIds: [],
  announcement: 'ZEN seleccionado.',
}

export function selectionReducer(state: SelectionState, action: SelectionAction): SelectionState {
  switch (action.type) {
    case 'select':
      return { ...state, activeGameId: action.gameId }
    case 'step': {
      if (action.gameIds.length === 0) return state
      const currentIndex = Math.max(0, action.gameIds.indexOf(state.activeGameId))
      const nextIndex = (currentIndex + action.direction + action.gameIds.length) % action.gameIds.length
      return { ...state, activeGameId: action.gameIds[nextIndex] }
    }
    case 'filter':
      return {
        ...state,
        filter: action.filter,
        activeGameId: action.fallbackGameId,
      }
    case 'toggleFavorite': {
      const isFavorite = state.favoriteIds.includes(action.gameId)
      return {
        ...state,
        favoriteIds: isFavorite
          ? state.favoriteIds.filter((id) => id !== action.gameId)
          : [...state.favoriteIds, action.gameId],
      }
    }
    case 'announce':
      return { ...state, announcement: action.message }
    default:
      return state
  }
}
