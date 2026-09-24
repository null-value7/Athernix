import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { filterGames, gameCatalog, type Game, type GameFilter } from '../models/gameCatalog'
import { initialSelectionState, selectionReducer } from '../models/selectionModel'

function canHandleShortcuts(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return true
  if (target.isContentEditable) return false
  return !['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

export function useGameSelectorController() {
  const [state, dispatch] = useReducer(selectionReducer, initialSelectionState)

  const visibleGames = useMemo(() => filterGames(state.filter), [state.filter])
  const selectedGame = useMemo(
    () => visibleGames.find((game) => game.id === state.activeGameId) ?? visibleGames[0],
    [state.activeGameId, visibleGames],
  )

  const selectGame = useCallback((game: Game) => {
    dispatch({ type: 'select', gameId: game.id })
    dispatch({ type: 'announce', message: `${game.title} ${game.subtitle} seleccionado.` })
  }, [])

  const step = useCallback(
    (direction: 1 | -1) => {
      dispatch({ type: 'step', direction, gameIds: visibleGames.map((game) => game.id) })
    },
    [visibleGames],
  )

  const setFilter = useCallback(
    (filter: GameFilter) => {
      const filteredGames = filterGames(filter)
      if (filteredGames.length === 0) {
        dispatch({ type: 'announce', message: `No hay juegos disponibles para ${filter}.` })
        return
      }
      const nextGame = filteredGames.find((game) => game.id === state.activeGameId) ?? filteredGames[0]
      dispatch({ type: 'filter', filter, fallbackGameId: nextGame.id })
      dispatch({ type: 'announce', message: `Filtro ${filter}. ${nextGame.title} ${nextGame.subtitle} seleccionado.` })
    },
    [state.activeGameId],
  )

  const toggleFavorite = useCallback(() => {
    const isFavorite = state.favoriteIds.includes(selectedGame.id)
    dispatch({ type: 'toggleFavorite', gameId: selectedGame.id })
    dispatch({
      type: 'announce',
      message: isFavorite
        ? `${selectedGame.title} eliminado de favoritos.`
        : `${selectedGame.title} guardado en favoritos.`,
    })
  }, [selectedGame, state.favoriteIds])

  const launchSelected = useCallback(() => {
    dispatch({ type: 'announce', message: `${selectedGame.title} ${selectedGame.subtitle}: misión lista para iniciar.` })
  }, [selectedGame])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!canHandleShortcuts(event.target)) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        step(-1)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        step(1)
      }
      if (event.key === 'Home') {
        event.preventDefault()
        selectGame(visibleGames[0])
      }
      if (event.key === 'End') {
        event.preventDefault()
        selectGame(visibleGames[visibleGames.length - 1])
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectGame, step, visibleGames])

  return {
    games: visibleGames,
    selectedGame,
    activeGameId: selectedGame.id,
    filter: state.filter,
    favoriteIds: state.favoriteIds,
    announcement: state.announcement,
    allGamesCount: gameCatalog.length,
    selectGame,
    step,
    setFilter,
    toggleFavorite,
    launchSelected,
  }
}
