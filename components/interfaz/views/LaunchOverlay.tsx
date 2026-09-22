import { useEffect, useState, type CSSProperties } from 'react'
import type { Game } from '../models/gameCatalog'

const LAUNCH_COPY: Record<string, { lines: readonly string[]; done: string }> = {
  zen: {
    lines: ['ENCENDIENDO JARDÍN', 'SINCRONIZANDO BIOFEEDBACK', 'CULTIVANDO PÉTALOS', 'CALIBRANDO RESPIRACIÓN'],
    done: 'JARDÍN LISTO',
  },
  mundi: {
    lines: ['INICIANDO ÓRBITA', 'SINCRONIZANDO NODOS', 'DESPLEGANDO PLANETA', 'CALIBRANDO GRAVEDAD'],
    done: 'MUNDO LISTO',
  },
  ondilla3: {
    lines: ['ABRIENDO CÓDICE', 'SINCRONIZANDO MATERIAS', 'CARGANDO SABER', 'CALIBRANDO LENTE'],
    done: 'LECCIÓN LISTA',
  },
}

const GENERIC_COPY = {
  lines: ['INICIALIZANDO NÚCLEO', 'SINCRONIZANDO SISTEMAS', 'CARGANDO MUNDO 3D', 'CALIBRANDO VISOR'],
  done: 'MISIÓN LISTA',
} as const

const PROGRESS_MS = 2300

interface LaunchOverlayProps {
  game: Game
  active: boolean
}

export function LaunchOverlay({ game, active }: LaunchOverlayProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!active) {
      setProgress(0)
      return
    }
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const raw = Math.min(1, (now - start) / PROGRESS_MS)
      // ease-out: arranque rápido, aterrizaje suave en 100%
      setProgress((1 - Math.pow(1 - raw, 1.6)) * 100)
      if (raw < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])

  if (!active) return null

  const copy = LAUNCH_COPY[game.id] ?? GENERIC_COPY
  const letters = `${game.title} ${game.subtitle}`.split('')
  const complete = progress >= 100
  const statusIndex = Math.min(copy.lines.length - 1, Math.floor((progress / 100) * copy.lines.length))
  const statusText = complete ? copy.done : copy.lines[statusIndex]

  return (
    <div
      className={complete ? 'launch-overlay is-active is-complete' : 'launch-overlay is-active'}
      role="alert"
      aria-busy="true"
      style={{ '--accent': game.accent, '--glow': game.glow } as CSSProperties}
    >
      <div className="launch-backdrop" aria-hidden="true" />
      <div className="launch-rays" aria-hidden="true" />
      <div className="launch-bar top" aria-hidden="true" />
      <div className="launch-bar bottom" aria-hidden="true" />
      <div className="launch-flash" aria-hidden="true" />
      <div className="launch-scan" aria-hidden="true"><i /></div>
      <div className="launch-bloom" aria-hidden="true" />

      <span className="launch-corner tl" aria-hidden="true" />
      <span className="launch-corner tr" aria-hidden="true" />
      <span className="launch-corner bl" aria-hidden="true" />
      <span className="launch-corner br" aria-hidden="true" />

      <div className="launch-hud">
        <p className="launch-eyebrow"><span className="notranslate" translate="no">ATHERNIX//EXPLORA</span> · SECUENCIA DE LANZAMIENTO</p>
        <h2 className="launch-title notranslate" translate="no" aria-label={`${game.title} ${game.subtitle}`}>
          {letters.map((ch, i) => (
            <span key={i} className="lt" aria-hidden="true" style={{ '--i': i } as CSSProperties}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </h2>
        <p className="launch-sub">
          INICIANDO MISIÓN<span className="launch-dots"><i>.</i><i>.</i><i>.</i></span>
        </p>
        <p className="launch-tags"><span className="notranslate" translate="no">{game.category}</span> · {game.players} · SCORE {game.rating}</p>
        <div className="launch-progress" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <i style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <div className="launch-meta">
          <span className="launch-status">{statusText}</span>
          <span className="launch-pct">{String(Math.floor(progress)).padStart(3, '0')}%</span>
        </div>
      </div>
    </div>
  )
}
