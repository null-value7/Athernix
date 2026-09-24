import { useGameSelectorController } from './controllers/useGameSelectorController'
import { GameSelectorPage } from './views/GameSelectorPage'

function App() {
  const controller = useGameSelectorController()

  return (
    <GameSelectorPage
      games={controller.games}
      selectedGame={controller.selectedGame}
      activeGameId={controller.activeGameId}
      filter={controller.filter}
      favoriteIds={controller.favoriteIds}
      totalGames={controller.allGamesCount}
      announcement={controller.announcement}
      onSelect={controller.selectGame}
      onStep={controller.step}
      onFilter={controller.setFilter}
      onToggleFavorite={controller.toggleFavorite}
      onLaunch={controller.launchSelected}
    />
  )
}

export default App
