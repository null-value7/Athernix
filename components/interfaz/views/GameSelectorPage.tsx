import { lazy, Suspense, useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { gameFilters, type Game } from '../models/gameCatalog'
import { protectBrands } from '@/components/ui/ProtectedText'
import { LaunchOverlay } from './LaunchOverlay'

const ArcadeScene = lazy(async () => {
  const module = await import('./ArcadeScene')
  return { default: module.ArcadeScene }
})

interface GameSelectorPageProps {
  games: readonly Game[]
  selectedGame: Game
  activeGameId: string
  filter: (typeof gameFilters)[number]
  favoriteIds: readonly string[]
  totalGames: number
  announcement: string
  onSelect: (game: Game) => void
  onStep: (direction: 1 | -1) => void
  onFilter: (filter: (typeof gameFilters)[number]) => void
  onToggleFavorite: () => void
  onLaunch: () => void
}

function Icon({ name }: { name: 'arrow-left' | 'arrow-right' | 'heart' | 'play' | 'spark' }) {
  if (name === 'heart') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" /></svg>
  }

  if (name === 'play') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" /></svg>
  }

  if (name === 'spark') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.64 6.36L20 10l-6.36 1.64L12 18l-1.64-6.36L4 10l6.36-1.64L12 2Zm7 13 .82 3.18L23 19l-3.18.82L19 23l-.82-3.18L15 19l3.18-.82L19 15Z" /></svg>
  }

  return name === 'arrow-left'
    ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
    : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
}

export function GameSelectorPage({
  games,
  selectedGame,
  activeGameId,
  filter,
  favoriteIds,
  totalGames,
  announcement,
  onSelect,
  onStep,
  onFilter,
  onToggleFavorite,
  onLaunch,
}: GameSelectorPageProps) {
  const router = useRouter()
  const [isLaunching, setIsLaunching] = useState(false)

  const handleLaunch = () => {
    if (isLaunching) return
    setIsLaunching(true)
    onLaunch()
    setTimeout(() => {
      router.push(selectedGame.route)
    }, 2900)
  }

  const lastWheelAt = useRef(0)
  const handleWheel = useCallback((event: React.WheelEvent<HTMLElement>) => {
    if (Math.abs(event.deltaY) < 10) return
    const now = performance.now()
    if (now - lastWheelAt.current < 430) return
    event.preventDefault()
    lastWheelAt.current = now
    onStep(event.deltaY > 0 ? 1 : -1)
  }, [onStep])

  const selectedIndex = games.findIndex((game) => game.id === activeGameId) + 1
  const isFavorite = favoriteIds.includes(selectedGame.id)

  return (
    <main className="app-shell">
      <section id="selector" className="selector-experience" data-theme={activeGameId} aria-label="Selector de experiencias Athernix" onWheel={handleWheel}>
        <div className="heat heat-one" aria-hidden="true" />
        <div className="heat heat-two" aria-hidden="true" />
        <Suspense fallback={<div className="scene-loading" aria-hidden="true" />}>
          <ArcadeScene games={games} activeGameId={activeGameId} onSelect={onSelect} onStep={onStep} isLaunching={isLaunching} />
        </Suspense>

        <header className="top-bar">
          <a className="brand" href="#selector" aria-label="Athernix Explora, inicio">
            <span className="brand-mark"><i /><i /><i /></span>
            <span><span className="notranslate" translate="no">ATHERNIX</span><span className="brand-slash">//</span><span className="notranslate" translate="no">EXPLORA</span></span>
          </a>
          <div className="top-status"><span className="status-pulse" /> SELECCIÓN EN VIVO</div>
        </header>

        <div className="intro-copy">
          <p className="eyebrow"><span className="tiny-spark"><Icon name="spark" /></span> ESTACIÓN ARCADE 06</p>
          <h1>Elige tu próxima<br /><em>aventura.</em></h1>
          <p className="instruction">Arrastra, usa la rueda o toca una portada para explorar.</p>
        </div>



        <section className="game-detail" aria-labelledby="selected-title">
          <div className="selection-count" aria-label={`Juego ${selectedIndex} de ${games.length}`}>
            <strong>{String(selectedIndex).padStart(2, '0')}</strong><span>/ {String(games.length).padStart(2, '0')}</span>
            <i />
          </div>
          <div className="game-copy">
            <p className="category-label">{protectBrands(selectedGame.category)} <span /> SELECCIONADO</p>
            <h2 id="selected-title">{protectBrands(selectedGame.title)} <span>{protectBrands(selectedGame.subtitle)}</span></h2>
            <p className="game-description">{selectedGame.description}</p>
            <div className="meta-row" aria-label="Datos del juego">
              <span><b>{selectedGame.rating}</b> SCORE</span>
              <span><b>{selectedGame.playtime}</b> CAMPAÑA</span>
              <span><b>{selectedGame.players}</b></span>
            </div>
          </div>
          <div className="detail-actions">
            <button className="play-button" type="button" onClick={handleLaunch}>
              <Icon name="play" /> INICIAR MISIÓN
            </button>
            <button
              className={isFavorite ? 'favorite-button is-saved' : 'favorite-button'}
              type="button"
              aria-pressed={isFavorite}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
              onClick={onToggleFavorite}
            >
              <Icon name="heart" />
            </button>
          </div>
        </section>

        <nav className="carousel-controls" aria-label="Navegar juegos">
          <button className="round-control" type="button" onClick={() => onStep(-1)} aria-label="Juego anterior">
            <Icon name="arrow-left" />
          </button>
          <div className="game-pips" aria-label="Elegir juego">
            {games.map((game) => (
              <button
                key={game.id}
                type="button"
                className={game.id === activeGameId ? 'pip is-active' : 'pip'}
                aria-label={`Seleccionar ${game.title} ${game.subtitle}`}
                aria-pressed={game.id === activeGameId}
                onClick={() => onSelect(game)}
              />
            ))}
          </div>
          <button className="round-control" type="button" onClick={() => onStep(1)} aria-label="Siguiente juego">
            <Icon name="arrow-right" />
          </button>
        </nav>

        <div className="collection-label"><span>{String(totalGames).padStart(2, '0')} TÍTULOS</span><i /> <span>VOL. 01</span></div>
        <p className="sr-only" aria-live="polite">{announcement}</p>

        <LaunchOverlay game={selectedGame} active={isLaunching} />
      </section>
    </main>
  )
}
