// ═══════════════════════════════════════════
// Design tokens — paleta "fuego" (rojo, naranja, amarillo) inspirada
// en la identidad visual de Athernix. Fuente única de verdad para los
// valores usados tanto en CSS (globals.css) como en materiales/luces
// de Three.js (donde no se pueden usar clases de Tailwind).
// ═══════════════════════════════════════════

export const COLORS = {
  background: "#0A0203",
  backgroundAlt: "#120405",
  surface: "rgba(24,8,8,0.9)",
  border: "rgba(255,255,255,0.1)",
  foreground: "#ffffff",
  muted: "rgba(255,255,255,0.6)",

  red: "#FF2B3A",
  orange: "#FF6B35",
  gold: "#FFD700",
  amber: "#FF9F1C",
  ember: "#B3121F",

  // Alias de compatibilidad: la paleta anterior mapeada al fuego actual.
  pink: "#FF2B3A",
  purple: "#B3121F",
  mint: "#FF9F1C",
  deepBlue: "#5A0A12",
} as const;

export const FONTS = {
  display: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
  sans: "var(--font-sans), sans-serif",
  mono: "var(--font-mono), monospace",
} as const;

export type MateriaColorKey = "gold" | "red" | "orange" | "amber";

export const MATERIA_COLORS: Record<MateriaColorKey, { main: string; secondary: string }> = {
  gold: { main: COLORS.gold, secondary: COLORS.orange },
  red: { main: COLORS.red, secondary: COLORS.gold },
  orange: { main: COLORS.orange, secondary: COLORS.gold },
  amber: { main: COLORS.amber, secondary: COLORS.red },
};
