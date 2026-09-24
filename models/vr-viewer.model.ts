// ═══════════════════════════════════════════
// MODEL — Coreografía de cámara del recorrido 3D.
// Puntos puros (sin THREE.js) que describen cómo la cámara viaja
// desde el visor VR, a través de uno de sus lentes, hasta las 4
// islas de materias y el cierre. Los controladores/vistas 3D
// interpretan estos datos.
// ═══════════════════════════════════════════

import { COLORS } from "@/lib/theme";
import { MATERIAS } from "./materia.model";

export type Vec3 = [number, number, number];

export interface CameraKeyframe {
  /** Progreso global del scroll, 0 a 1. */
  t: number;
  pos: Vec3;
  look: Vec3;
  fov: number;
}

/** Posición local del lente izquierdo del visor (por donde "entramos"). */
export const LENS_LOCAL_POSITION: Vec3 = [-0.42, 0.05, 0.18];

/**
 * Posiciones de las 4 islas de materias en el mundo 3D, en orden de
 * aparición. Alternan de lado (weave) para que la cámara serpentee.
 */
export const ISLAND_POSITIONS: Record<number, Vec3> = {
  0: [1.6, 0, -10], // Matemática (derecha)
  1: [-1.6, 0, -20], // Lenguaje (izquierda)
  2: [1.6, 0, -30], // Ciencia (derecha)
  3: [-1.6, 0, -40], // Sociales (izquierda)
};

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { t: 0.0, pos: [0, 0.5, 9], look: [0, 0, 0], fov: 42 },
  { t: 0.15, pos: [0.4, 0.28, 4.2], look: [0, 0.05, 0], fov: 40 },
  { t: 0.24, pos: [-0.15, 0.1, 1.4], look: [-0.42, 0.05, 0.18], fov: 34 },
  { t: 0.29, pos: [-0.36, 0.06, 0.35], look: [-0.42, 0.05, -0.2], fov: 24 },
  { t: 0.315, pos: [-0.4, 0.05, -0.05], look: [-0.4, 0.05, -3], fov: 70 },
  { t: 0.34, pos: [0.4, 1.3, -4.2], look: [1.6, 0.1, -10], fov: 55 },
  { t: 0.46, pos: [-0.7, 0.45, -7.4], look: [1.6, 0.15, -10], fov: 44 },
  { t: 0.6, pos: [1.3, 0.2, -17.3], look: [-1.6, 0, -20], fov: 44 },
  { t: 0.74, pos: [-0.7, 0.85, -27.3], look: [1.6, 0.3, -30], fov: 44 },
  { t: 0.88, pos: [1.3, 0.5, -37.3], look: [-1.6, 0, -40], fov: 44 },
  { t: 1.0, pos: [0, 5.2, -18], look: [0, -1.2, -34], fov: 58 },
];

/** Rango [inicio, pico, fin] del flash de "transición de portal" al entrar al lente. */
export const PORTAL_FLASH_RANGE: [number, number, number] = [0.28, 0.315, 0.35];

/** Límites de progreso (t) para cada una de las 7 secciones narrativas. */
export const SECTION_BOUNDARIES = [0, 0.2, 0.4, 0.53, 0.67, 0.81, 0.94, 1.0001];

export const SECTION_LABELS = [
  "Visor VR",
  "Entrando al lente",
  "Matemática",
  "Lenguaje y Literatura",
  "Ciencia y Tecnología",
  "Estudios Sociales",
  "El programa completo",
];

/** Color de acento de cada sección (tinte de UI, puntos de progreso…). */
export const SECTION_ACCENTS: string[] = [
  COLORS.gold,
  COLORS.orange,
  ...MATERIAS.map((m) => m.color),
  COLORS.red,
];

export function sectionIndexForProgress(t: number): number {
  for (let i = SECTION_BOUNDARIES.length - 2; i >= 0; i--) {
    if (t >= SECTION_BOUNDARIES[i]) return i;
  }
  return 0;
}
