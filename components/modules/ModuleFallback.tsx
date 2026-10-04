'use client';

// ═══════════════════════════════════════════════════════════
// FALLBACK — detalle de módulo sin WebGL
// Mismo contenido (hero, tarjetas, métricas, CTA) sobre un
// fondo degradado CSS. Sin canvas, sin observadores, sin 3D.
// ═══════════════════════════════════════════════════════════

import { useState } from 'react';
import type * as React from 'react';
import Link from 'next/link';
import {
  MODULES,
  MODULE_ROUTES,
  MODULE_SECTIONS,
  type ModuleKey,
} from '@/models/modules';
import { protectBrands } from '@/components/ui/ProtectedText';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

const SWITCHER: ReadonlyArray<{ key: ModuleKey; label: string }> = [
  { key: 'history', label: 'HISTORIA' },
  { key: 'tours', label: 'TOURS' },
  { key: 'mind', label: 'MENTELIBRE' },
];

export default function ModuleFallback({
  moduleKey,
  activeHotspot,
  onSelectHotspot,
}: {
  moduleKey: ModuleKey;
  activeHotspot?: number;
  onSelectHotspot?: (i: number) => void;
}) {
  const { config, hotspots } = MODULES[moduleKey];
  const [localActive, setLocalActive] = useState(-1);
  const active = onSelectHotspot ? (activeHotspot ?? -1) : localActive;

  const select = (i: number) => {
    if (onSelectHotspot) onSelectHotspot(i);
    else setLocalActive((a) => (a === i ? -1 : i));
  };

  return (
    <div
      className="md-root md-root--fallback"
      style={{
        '--md-accent': config.accent,
        '--md-accent-soft': config.accentSoft,
        '--md-gradient': config.gradient,
      }}
    >
      {/* fondo degradado en lugar del canvas */}
      <div className="md-fallback-bg" aria-hidden="true" />

      {/* navegación flotante fija — regresar / siguiente módulo */}
      <nav className="md-nav" aria-label="Navegación de módulos">
        <Link href="/modulos" className="md-nav-btn mono">
          ← REGRESAR A MÓDULOS
        </Link>
        <Link
          href={config.next}
          className="md-nav-btn md-nav-btn--next mono"
        >
          SIGUIENTE MÓDULO →
        </Link>
      </nav>

      <div className="md-content">
        <section className="md-hero">
          <p className="md-number mono">{config.number}</p>
          <p className="md-eyebrow mono">
            [ {protectBrands(config.tag)} / {protectBrands(config.eyebrow)} ]
          </p>
          <h1 className="md-title">
            <span className="md-title-line">{config.title[0]}</span>
            <span className="md-title-line md-grad">{config.title[1]}</span>
          </h1>
          <p className="md-desc">{protectBrands(config.description)}</p>
          <p className="md-status mono">
            <span className="md-status-dot" />
            {protectBrands(config.status)}
          </p>
          <div className="md-chips">
            {config.features.map((f) => (
              <span key={f} className="md-chip mono">
                {protectBrands(f)}
              </span>
            ))}
          </div>
        </section>

        <section className="md-section">
          <p className="md-sec-eyebrow mono">
            {MODULE_SECTIONS.hotspotsEyebrow}
          </p>
          <h2 className="md-sec-title">{MODULE_SECTIONS.hotspotsTitle}</h2>
          <p className="md-sec-lead">{MODULE_SECTIONS.hotspotsLead}</p>
          <div className="md-hs-grid">
            {hotspots.map((h, i) => (
              <button
                key={h.id}
                type="button"
                className={`md-hs-card ${active === i ? 'active' : ''}`}
                onClick={() => select(i)}
                aria-pressed={active === i}
              >
                <span className="md-hs-idx mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="md-hs-name">{protectBrands(h.label)}</span>
                <span className="md-hs-desc">{protectBrands(h.description)}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="md-section">
          <p className="md-sec-eyebrow mono">
            {MODULE_SECTIONS.metricsEyebrow}
          </p>
          <h2 className="md-sec-title">{MODULE_SECTIONS.metricsTitle}</h2>
          <div className="md-metrics">
            {config.metrics.map(([v, l]) => (
              <div key={l} className="md-metric">
                <strong>{v}</strong>
                <small className="mono">{protectBrands(l)}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="md-section md-cta-sec">
          <div className="md-cta">
            <Link href="/modulos" className="md-btn md-btn--ghost mono">
              ← VOLVER A MÓDULOS
            </Link>
            <Link href={config.next} className="md-btn md-btn--primary mono">
              SIGUIENTE EJE →
            </Link>
          </div>
          <nav className="md-switcher" aria-label="Cambiar de módulo">
            {SWITCHER.map((s) => (
              <Link
                key={s.key}
                href={MODULE_ROUTES[s.key]}
                className={`mono ${s.key === moduleKey ? 'active' : ''}`}
                aria-current={s.key === moduleKey ? 'page' : undefined}
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </section>
      </div>
    </div>
  );
}
