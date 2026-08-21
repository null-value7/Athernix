'use client';

// ═══════════════════════════════════════════
// CONTROLLER — Lógica de selección y estado
// ═══════════════════════════════════════════

import { useCallback, useRef, useState } from 'react';
import { LOCATIONS, MundiLocation } from '../models/location.model';

export function useMundiController() {
  const [selected, setSelected] = useState<MundiLocation | null>(null);
  const selectedRef = useRef<MundiLocation | null>(selected);
  selectedRef.current = selected;
  const [hovered, setHovered] = useState<string | null>(null);
  const [entered, setEntered] = useState(false);

  const selectLocation = useCallback((id: string | null) => {
    if (!id) {
      setSelected(null);
      return;
    }
    const loc = LOCATIONS.find((l) => l.id === id) || null;
    setSelected(loc);
  }, []);

  const closePanel = useCallback(() => setSelected(null), []);

  const startExperience = useCallback(() => {
    const loc = selectedRef.current;
    if (!loc) return;
    // Punto de integración con el ecosistema Athernix
    window.location.href = loc.experienceUrl;
  }, []);

  return {
    locations: LOCATIONS,
    selected,
    hovered,
    entered,
    setHovered,
    setEntered,
    selectLocation,
    closePanel,
    startExperience,
  };
}
