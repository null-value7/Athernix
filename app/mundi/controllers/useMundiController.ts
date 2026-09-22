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
  const [experience, setExperience] = useState<MundiLocation | null>(null);

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
    // Experiencias Unity → overlay flotante in-page.
    // Rutas externas (p.ej. lobby → /explore) → navegación normal.
    if (loc.experienceUrl.startsWith('/mundi/experience/')) {
      setExperience(loc);
      return;
    }
    window.location.href = loc.experienceUrl;
  }, []);

  const closeExperience = useCallback(() => setExperience(null), []);

  return {
    locations: LOCATIONS,
    selected,
    hovered,
    entered,
    experience,
    setHovered,
    setEntered,
    selectLocation,
    closePanel,
    startExperience,
    closeExperience,
  };
}
