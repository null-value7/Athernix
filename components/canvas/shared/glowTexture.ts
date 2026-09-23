import * as THREE from "three";

let cached: THREE.CanvasTexture | null = null;

/** Textura radial reutilizable para partículas/sprites con resplandor (barata, generada una sola vez). */
export function getGlowTexture(): THREE.CanvasTexture {
  if (cached) return cached;
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,0.9)");
  grad.addColorStop(0.25, "rgba(255,255,255,0.45)");
  grad.addColorStop(0.6, "rgba(255,255,255,0.08)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  cached = new THREE.CanvasTexture(canvas);
  return cached;
}
