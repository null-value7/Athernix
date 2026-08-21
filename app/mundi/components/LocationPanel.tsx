'use client';

// ═══════════════════════════════════════════
// VIEW (UI) — Panel de información de ubicación
// ═══════════════════════════════════════════

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MundiLocation } from '../models/location.model';

interface LocationPanelProps {
  location: MundiLocation;
  onClose: () => void;
  onStart: () => void;
}

export default function LocationPanel({ location, onClose, onStart }: LocationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    gsap.fromTo(el, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'expo.out' });
    gsap.fromTo(
      el.querySelectorAll('.lp-stagger'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.7, delay: 0.15, ease: 'power3.out' }
    );
  }, [location.id]);

  return (
    <div ref={panelRef} className="location-panel" key={location.id}>
      <div className="lp-glow" style={{ background: `radial-gradient(circle at 20% 0%, ${location.color}22, transparent 60%)` }} />
      <span className="lp-corner tl" style={{ borderColor: location.color }} />
      <span className="lp-corner tr" style={{ borderColor: location.color }} />
      <span className="lp-corner bl" style={{ borderColor: location.color }} />
      <span className="lp-corner br" style={{ borderColor: location.color }} />

      <button className="lp-close" onClick={onClose} aria-label="Cerrar">
        ✕
      </button>

      <div className="lp-stagger lp-code mono">
        <span className="lp-dot" style={{ background: location.color, boxShadow: `0 0 10px ${location.color}` }} />
        {location.code} // {location.category}
      </div>

      <h2 className="lp-stagger lp-title">{location.name}</h2>

      <div className="lp-stagger lp-coords mono">
        LAT {location.lat.toFixed(3)}° · LNG {location.lng.toFixed(3)}° · {location.country.toUpperCase()}
      </div>

      <div className="lp-stagger lp-divider" style={{ background: `linear-gradient(90deg, ${location.color}, transparent)` }} />

      <p className="lp-stagger lp-desc">{location.description}</p>

      <div className="lp-stagger lp-stats">
        {location.stats.map((s) => (
          <div className="lp-stat" key={s.label}>
            <span className="lp-stat-label mono">{s.label}</span>
            <span className="lp-stat-value mono" style={{ color: location.color }}>
              {s.value}
            </span>
          </div>
        ))}
      </div>

      <button className="lp-stagger lp-cta" onClick={onStart}>
        <span className="lp-cta-shine" />
        INICIAR EXPERIENCIA
        <span className="lp-cta-arrow">→</span>
      </button>

      <div className="lp-stagger lp-hint mono">CONEXIÓN_SEGURA // ATHERNIX_VR_READY</div>
    </div>
  );
}
