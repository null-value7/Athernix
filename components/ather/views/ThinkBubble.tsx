"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Glossy thought cloud: gradient body, amber keyline, soft inner glow,
 *  tail circles, pulsing dots and the thought text — all painted locally. */
function makeBubbleTexture() {
  const c = document.createElement("canvas");
  c.width = 768;
  c.height = 448;
  const ctx = c.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(c);

  const bx = 58;
  const by = 30;
  const bw = 652;
  const bh = 252;
  const r = 92;

  // Soft drop shadow under the cloud
  ctx.save();
  ctx.shadowColor = "rgba(20, 2, 0, 0.45)";
  ctx.shadowBlur = 34;
  ctx.shadowOffsetY = 14;
  ctx.beginPath();
  ctx.moveTo(bx + r, by);
  ctx.arcTo(bx + bw, by, bx + bw, by + bh, r);
  ctx.arcTo(bx + bw, by + bh, bx, by + bh, r);
  ctx.arcTo(bx, by + bh, bx, by, r);
  ctx.arcTo(bx, by, bx + bw, by, r);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, by, 0, by + bh);
  grad.addColorStop(0, "rgba(255, 250, 232, 0.99)");
  grad.addColorStop(0.55, "rgba(255, 240, 205, 0.98)");
  grad.addColorStop(1, "rgba(255, 224, 170, 0.98)");
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();

  // Amber keyline + faint inner glow
  ctx.beginPath();
  ctx.moveTo(bx + r, by);
  ctx.arcTo(bx + bw, by, bx + bw, by + bh, r);
  ctx.arcTo(bx + bw, by + bh, bx, by + bh, r);
  ctx.arcTo(bx, by + bh, bx, by, r);
  ctx.arcTo(bx, by, bx + bw, by, r);
  ctx.closePath();
  ctx.strokeStyle = "rgba(255, 170, 30, 0.85)";
  ctx.lineWidth = 7;
  ctx.stroke();

  // Top gloss streak
  ctx.beginPath();
  ctx.ellipse(384, by + 52, bw * 0.32, 30, 0, Math.PI, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fill();

  // Tail circles descending toward the head (bottom-left)
  ctx.fillStyle = "rgba(255, 240, 205, 0.98)";
  ctx.strokeStyle = "rgba(255, 170, 30, 0.85)";
  [
    [178, 330, 26],
    [128, 386, 14],
  ].forEach(([x, y, rad]) => {
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.stroke();
  });

  // Pulsing dots row
  ctx.fillStyle = "#ff6519";
  [304, 384, 464].forEach((x) => {
    ctx.beginPath();
    ctx.arc(x, 90, 13, 0, Math.PI * 2);
    ctx.fill();
  });

  // Thought text on two lines — "Hmm…" loud and large, the question below.
  // Two lines fit inside the cloud where a single line overflowed.
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#1d0701";
  ctx.font = "900 66px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("Hmm…", 384, 160);
  ctx.fillStyle = "#43130a";
  ctx.font = "800 46px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("¿qué aprendemos hoy?", 384, 228);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** A glossy amber droplet — rounded bottom, pointed top, specular dot. */
function makeDropTexture() {
  const c = document.createElement("canvas");
  c.width = 160;
  c.height = 200;
  const ctx = c.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(c);

  const grad = ctx.createRadialGradient(70, 128, 8, 80, 108, 78);
  grad.addColorStop(0, "rgba(255, 246, 220, 0.98)");
  grad.addColorStop(0.6, "rgba(255, 190, 60, 0.95)");
  grad.addColorStop(1, "rgba(255, 120, 20, 0.95)");

  ctx.beginPath();
  ctx.moveTo(80, 10);
  ctx.bezierCurveTo(104, 58, 134, 96, 134, 128);
  ctx.arc(80, 128, 54, 0, Math.PI, false);
  ctx.bezierCurveTo(26, 96, 56, 58, 80, 10);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 220, 140, 0.9)";
  ctx.lineWidth = 4;
  ctx.stroke();

  // Specular highlight
  ctx.beginPath();
  ctx.ellipse(58, 112, 12, 20, -0.5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.fill();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/**
 * Thought bubble as a real scene object. Entry choreography: a water droplet
 * falls from above the head, splashes, and morphs into the thought cloud.
 * Hovering the cloud makes it lean in; clicking gives it a jelly wiggle.
 */
export function ThinkBubble({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const drop = useRef<THREE.Mesh>(null);
  const cloud = useRef<THREE.Mesh>(null);
  const texBubble = useMemo(makeBubbleTexture, []);
  const texDrop = useMemo(makeDropTexture, []);
  const shown = useRef(0);
  const born = useRef<number | null>(null);
  const hoverT = useRef(0);
  const hover = useRef(0);
  const poke = useRef(0);

  useFrame(({ camera, clock }, delta) => {
    const g = group.current;
    if (!g) return;
    const p = progressRef.current;
    const on = p > 0.52 && p < 0.78;
    const t = clock.elapsedTime;

    // Re-arm the droplet entrance every time the thinking scene activates.
    if (on && born.current === null) born.current = t;
    if (!on && shown.current < 0.03) born.current = null;

    const s = THREE.MathUtils.damp(shown.current, on ? 1 : 0, 8, delta);
    shown.current = s;
    g.visible = s > 0.02;

    const age = born.current === null ? 99 : t - born.current;

    // Interactive state: hover lean + click jiggle.
    hover.current = THREE.MathUtils.damp(hover.current, hoverT.current, 10, delta);
    poke.current = THREE.MathUtils.damp(poke.current, 0, 4.5, delta);
    const jiggle = Math.sin(poke.current * 18) * poke.current * 0.1;

    // --- Droplet phase: falls 0→0.42s, then splashes away ---
    if (drop.current) {
      const fall = clamp01(age / 0.42); // accelerating fall
      const ease = fall * fall;
      const splash = clamp01((age - 0.4) / 0.16); // squash + fade at impact
      const d = drop.current;
      d.visible = s > 0.02 && splash < 1;
      d.position.y = 0.55 - ease * 0.55; // falls from above onto the anchor
      const stretch = 1 + (1 - fall) * 0.35; // elongated while falling
      d.scale.set(
        (1 - splash * 0.6) * (2 - stretch) * s,
        stretch * (1 - splash) * s,
        1
      );
      (d.material as THREE.MeshBasicMaterial).opacity = s * (1 - splash);
    }

    // --- Cloud phase: pops in with elastic overshoot from ~0.38s ---
    if (cloud.current) {
      const popT = clamp01((age - 0.38) / 0.55);
      const elastic = popT * (1 + Math.sin(popT * Math.PI) * 0.28);
      const wobble = 1 + Math.sin(t * 2.3) * 0.012 + hover.current * 0.07 + jiggle;
      const cs = Math.max(0.001, s * elastic * wobble);
      cloud.current.scale.set(cs, cs * (1 - jiggle * 0.6), 1);
      (cloud.current.material as THREE.MeshBasicMaterial).opacity = s;
    }

    // Gentle float + billboard wobble; lean toward the camera on hover.
    g.position.y = 0.98 + Math.sin(t * 1.7) * 0.02 + hover.current * 0.02;
    g.quaternion.copy(camera.quaternion);
    g.rotateZ(Math.sin(t * 1.2) * 0.05 + jiggle * 2);
    g.rotateX(-hover.current * 0.12);
  });

  return (
    <group ref={group} position={[0.4, 0.98, 0.06]} visible={false}>
      <mesh ref={drop} renderOrder={3} visible={false}>
        <planeGeometry args={[0.13, 0.17]} />
        <meshBasicMaterial map={texDrop} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh
        ref={cloud}
        renderOrder={2}
        onPointerOver={(e) => {
          e.stopPropagation();
          hoverT.current = 1;
        }}
        onPointerOut={() => {
          hoverT.current = 0;
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          poke.current = 1;
        }}
      >
        <planeGeometry args={[0.8, 0.47]} />
        <meshBasicMaterial map={texBubble} transparent depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}
