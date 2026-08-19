// ═══════════════════════════════════════════
// CONTROLLER — Referencia compartida a la instancia activa de Lenis,
// para que otros elementos de UI (p. ej. los puntos de navegación
// del scroll) puedan pedirle un scroll suave a una sección.
// ═══════════════════════════════════════════

import type Lenis from "lenis";

let instance: Lenis | null = null;

export const lenisInstance = {
  set(l: Lenis | null) {
    instance = l;
  },
  get(): Lenis | null {
    return instance;
  },
};
