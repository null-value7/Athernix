// ═══════════════════════════════════════════
// CONTROLLER — Interpola la coreografía de cámara (models/vr-viewer)
// para un progreso de scroll arbitrario t ∈ [0,1].
// ═══════════════════════════════════════════

import { CAMERA_KEYFRAMES, type Vec3 } from "@/models/vr-viewer.model";

export interface SampledCamera {
  pos: Vec3;
  look: Vec3;
  fov: number;
}

function smoothstep(x: number): number {
  const c = Math.min(1, Math.max(0, x));
  return c * c * (3 - 2 * c);
}

function lerp(a: number, b: number, u: number): number {
  return a + (b - a) * u;
}

function lerpVec3(a: Vec3, b: Vec3, u: number): Vec3 {
  return [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
}

export function sampleCameraPath(t: number): SampledCamera {
  const clamped = Math.min(1, Math.max(0, t));
  const kfs = CAMERA_KEYFRAMES;

  let i = 0;
  while (i < kfs.length - 2 && clamped > kfs[i + 1].t) i++;

  const a = kfs[i];
  const b = kfs[i + 1];
  const span = b.t - a.t || 1;
  const u = smoothstep((clamped - a.t) / span);

  return {
    pos: lerpVec3(a.pos, b.pos, u),
    look: lerpVec3(a.look, b.look, u),
    fov: lerp(a.fov, b.fov, u),
  };
}
