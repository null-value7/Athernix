"use client";

import { useEffect, useMemo, useRef, useState, type ComponentRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Sparkles, Html } from "@react-three/drei";
import * as THREE from "three";
import type { ZenPointInfo } from "@/models/zen";
import { protectBrands } from '@/components/ui/ProtectedText';

/*
 * ZenTreeScene — Bonsái zen premium 3D (módulo de relajación).
 *
 * · Bonsái en maceta de cerámica con borde dorado, tronco en S gnarled,
 *   copas tipo "cloud pads" con ~850 hojas instanciadas (1 draw call).
 * · Viento por GPU inyectado en el material de las hojas (onBeforeCompile).
 * · Pétalos rosados cayendo en hélice (InstancedMesh animado por frame).
 * · Halo de atardecer, arena rastrillada, rocas y musgo.
 * · Animación de crecimiento (easeOutBack) desde la base de la maceta.
 * · prefers-reduced-motion: detiene viento/pétalos/auto-rotación, sin ocultar.
 */

// ── Constantes de composición ─────────────────────────────────────
const TREE_SCALE = 1.15;
const TREE_LIFT = 0.23;
const POT_BASE_Y = -1.85; // base de la maceta (pivote del crecimiento)
const TRUNK_PIVOT_Y = -1.25; // pivote del vaivén (base del tronco)
const GROUND_Y = -1.9; // arena (coordenadas de mundo, fuera del grupo escalado)

const UP = new THREE.Vector3(0, 1, 0);

/** Transforma coords locales del árbol → mundo (escala + elevación) */
function toWorld(p: [number, number, number], out: THREE.Vector3) {
  return out.set(p[0] * TREE_SCALE, p[1] * TREE_SCALE + TREE_LIFT, p[2] * TREE_SCALE);
}

// ── RNG determinista para que el árbol sea siempre el mismo ──────
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Texturas radiales (halos / sombras suaves) ───────────────────
const texCache = new Map<string, THREE.CanvasTexture>();

function makeRadialTexture(key: string, stops: Array<[number, string]>, size = 256) {
  const cached = texCache.get(key);
  if (cached) return cached;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([o, c]) => g.addColorStop(o, c));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  texCache.set(key, tex);
  return tex;
}

function glowTexture(color: string) {
  const c = new THREE.Color(color);
  const rgb = `${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)}`;
  return makeRadialTexture(`glow:${color}`, [
    [0, `rgba(${rgb},0.95)`],
    [0.3, `rgba(${rgb},0.35)`],
    [1, `rgba(${rgb},0)`],
  ]);
}

// ── Generación del bonsái ─────────────────────────────────────────
type SegInst = { pos: THREE.Vector3; quat: THREE.Quaternion; radius: number; len: number; color: THREE.Color };
type JointInst = { pos: THREE.Vector3; r: number; color: THREE.Color };
type LeafInst = { pos: THREE.Vector3; quat: THREE.Quaternion; scale: THREE.Vector3; color: THREE.Color };

const C_TRUNK_A = new THREE.Color("#38221c");
const C_TRUNK_B = new THREE.Color("#6b4a38");
const C_LEAF_LOW = new THREE.Color("#b02867");
const C_LEAF_HIGH = new THREE.Color("#f06ba8");
const C_LEAF_LIGHT = new THREE.Color("#ffc9dd");
const ACCENTS = ["#ffe9f2", "#ffb7d5"];

function generateBonsai(seed = 11) {
  const rng = mulberry32(seed);
  const segs: SegInst[] = [];
  const joints: JointInst[] = [];
  const leaves: LeafInst[] = [];
  const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

  const trunkColor = (y: number) => {
    const h = THREE.MathUtils.clamp((y + 1.3) / 3.6, 0, 1);
    const c = C_TRUNK_A.clone().lerp(C_TRUNK_B, h);
    c.offsetHSL(0, 0, (rng() - 0.5) * 0.05);
    return c;
  };

  /** Muestrea una curva Catmull-Rom en segmentos cónicos + juntas esféricas */
  const addCurve = (pts: THREE.Vector3[], samples: number, r0: number, r1: number) => {
    const curve = new THREE.CatmullRomCurve3(pts);
    const p = curve.getPoints(samples);
    for (let i = 0; i < p.length - 1; i++) {
      const a = p[i];
      const b = p[i + 1];
      const f = i / (p.length - 1);
      const r = THREE.MathUtils.lerp(r0, r1, Math.pow(f, 0.85)) * (1 + (rng() - 0.5) * 0.16);
      const dir = b.clone().sub(a);
      const len = dir.length();
      if (len < 1e-5) continue;
      segs.push({
        pos: a.clone().lerp(b, 0.5),
        quat: new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize()),
        radius: r,
        len: len * 1.18,
        color: trunkColor(a.y),
      });
      joints.push({ pos: b.clone(), r: r * 0.92, color: trunkColor(b.y) });
    }
    return curve;
  };

  // Tronco en "S" gnarled (estilo bonsái moyogi)
  const trunkCurve = addCurve(
    [
      V(0, -1.25, 0), V(0.22, -0.9, 0.08), V(0.42, -0.42, 0.12), V(0.28, 0.12, 0.04),
      V(-0.05, 0.58, -0.06), V(-0.16, 1.02, 0), V(-0.02, 1.5, 0.1), V(0.1, 1.95, 0.15),
    ],
    30, 0.27, 0.06
  );

  // Nebari: raíces visibles que se hunden en el musgo
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + rng() * 0.6;
    const dir = V(Math.cos(a), -0.42, Math.sin(a)).normalize();
    const start = V(Math.cos(a) * 0.12, -1.14, Math.sin(a) * 0.12);
    addCurve(
      [start, start.clone().add(dir.clone().multiplyScalar(0.22 + rng() * 0.1)), start.clone().add(dir.clone().multiplyScalar(0.42 + rng() * 0.14))],
      4, 0.085, 0.028
    );
  }

  // Copas "cloud pad": ápice + 6 ramas diseñadas hacia los hotspots
  const pads: { c: THREE.Vector3; r: number; ry: number; n: number }[] = [
    { c: V(0.06, 2.3, 0.16), r: 0.88, ry: 0.3, n: 255 }, // corona (insomnio)
  ];
  const branchSpecs: { t: number; via: [number, number, number][]; pad: { c: [number, number, number]; r: number; ry: number; n: number }; r0: number }[] = [
    { t: 0.6, via: [[-0.5, 0.72, 0.05], [-1.02, 0.95, 0.1]], pad: { c: [-1.38, 1.22, 0.12], r: 0.62, ry: 0.21, n: 130 }, r0: 0.105 }, // oeste (burnout)
    { t: 0.5, via: [[0.62, 0.4, -0.05], [1.06, 0.95, -0.1]], pad: { c: [1.45, 1.56, -0.12], r: 0.66, ry: 0.22, n: 145 }, r0: 0.11 }, // este (tensión)
    { t: 0.78, via: [[-0.38, 1.28, 0.34]], pad: { c: [-0.55, 1.62, 0.78], r: 0.48, ry: 0.16, n: 80 }, r0: 0.075 }, // frontal
    { t: 0.84, via: [[0.22, 1.6, -0.28]], pad: { c: [0.55, 1.95, -0.62], r: 0.5, ry: 0.17, n: 85 }, r0: 0.075 }, // trasera
    { t: 0.92, via: [[0.42, 1.95, 0.25]], pad: { c: [0.85, 2.12, 0.42], r: 0.5, ry: 0.17, n: 85 }, r0: 0.07 }, // este-alta
    { t: 0.88, via: [[-0.42, 1.78, -0.16]], pad: { c: [-0.85, 2.0, -0.3], r: 0.46, ry: 0.16, n: 72 }, r0: 0.07 }, // oeste-alta
  ];
  for (const b of branchSpecs) {
    const attach = trunkCurve.getPointAt(b.t);
    const padC = V(...b.pad.c);
    const tip = padC.clone().add(V(0, -b.pad.ry * 0.4, 0));
    addCurve([attach, ...b.via.map((v) => V(...v)), tip], 12, b.r0, 0.026);
    pads.push({ c: padC, r: b.pad.r, ry: b.pad.ry, n: b.pad.n });
  }

  // Ramitas finas + hojas dentro de cada copa
  for (const pad of pads) {
    const tipBase = pad.c.clone().add(V(0, -pad.ry * 0.5, 0));
    for (let i = 0; i < 4; i++) {
      const a = rng() * Math.PI * 2;
      const rr = pad.r * (0.35 + rng() * 0.45);
      const end = pad.c.clone().add(V(Math.cos(a) * rr, (rng() - 0.35) * pad.ry * 0.8, Math.sin(a) * rr));
      addCurve([tipBase, tipBase.clone().lerp(end, 0.5).add(V(0, 0.03, 0)), end], 3, 0.02, 0.008);
    }
    for (let i = 0; i < pad.n; i++) {
      const a = rng() * Math.PI * 2;
      const rr = pad.r * Math.sqrt(rng());
      const yy = (rng() * 2 - 0.72) * pad.ry * (1 - 0.3 * (rr / pad.r));
      const pos = pad.c.clone().add(V(Math.cos(a) * rr, yy, Math.sin(a) * rr));

      // Gradiente vertical: rosa profundo abajo → rosa pálido arriba
      const h = THREE.MathUtils.clamp((pos.y - 0.9) / 1.7, 0, 1);
      let color = C_LEAF_LOW.clone().lerp(C_LEAF_HIGH, h * 0.85);
      if (yy > pad.ry * 0.3 || rng() < 0.25) color.lerp(C_LEAF_LIGHT, 0.15 + rng() * 0.3);
      // Pétalos casi blancos / rosa claro en los bordes de las copas
      const edge = rr / pad.r;
      if (edge > 0.72 && rng() < 0.28) color = new THREE.Color(ACCENTS[rng() < 0.72 ? 0 : 1]);
      color.offsetHSL((rng() - 0.5) * 0.03, 0, (rng() - 0.5) * 0.07);

      const s = (0.055 + rng() * 0.055) * (edge > 0.72 ? 0.88 : 1);
      const quat = new THREE.Quaternion().setFromEuler(new THREE.Euler(rng() * Math.PI, rng() * Math.PI, rng() * Math.PI));
      leaves.push({ pos, quat, scale: new THREE.Vector3(s, s * 0.72, s), color });
    }
  }

  return { segs, joints, leaves, pads };
}

// El bonsái se genera una sola vez (determinista) y se comparte entre componentes
const BONSAI = generateBonsai(11);

// ── Árbol: tronco/ramas + hojas con viento GPU (3 draw calls) ────
type LeafShader = { uniforms: Record<string, THREE.IUniform> };

function BonsaiTree({ windOn }: { windOn: boolean }) {
  const { segs, joints, leaves } = BONSAI;
  const segRef = useRef<THREE.InstancedMesh>(null!);
  const jointRef = useRef<THREE.InstancedMesh>(null!);
  const leafRef = useRef<THREE.InstancedMesh>(null!);
  const shaderRef = useRef<LeafShader | null>(null);

  // Material de hojas con vaivén de viento inyectado por GPU
  const leafMat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({ roughness: 0.6, metalness: 0.05, flatShading: true });
    m.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uWind = { value: 1 };
      shader.vertexShader =
        `uniform float uTime;\nuniform float uWind;\n` +
        shader.vertexShader.replace(
          "#include <project_vertex>",
          `
          vec4 mvPosition = vec4( transformed, 1.0 );
          #ifdef USE_INSTANCING
            mvPosition = instanceMatrix * mvPosition;
          #endif
          float wPhase = mvPosition.x * 1.8 + mvPosition.z * 1.4 + mvPosition.y;
          float wAmp = 0.05 * uWind * smoothstep(-1.2, 2.4, mvPosition.y);
          mvPosition.x += sin(uTime * 1.7 + wPhase) * wAmp;
          mvPosition.z += cos(uTime * 1.35 + wPhase * 1.2) * wAmp * 0.8;
          mvPosition.y += sin(uTime * 2.3 + wPhase * 1.45) * wAmp * 0.4;
          mvPosition = modelViewMatrix * mvPosition;
          gl_Position = projectionMatrix * mvPosition;
          `
        );
      shaderRef.current = shader as unknown as LeafShader;
    };
    return m;
  }, []);

  useEffect(() => () => leafMat.dispose(), [leafMat]);

  useEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3();
    segs.forEach((seg, i) => {
      s.set(seg.radius, seg.len, seg.radius);
      m.compose(seg.pos, seg.quat, s);
      segRef.current.setMatrixAt(i, m);
      segRef.current.setColorAt(i, seg.color);
    });
    segRef.current.instanceMatrix.needsUpdate = true;
    if (segRef.current.instanceColor) segRef.current.instanceColor.needsUpdate = true;

    joints.forEach((j, i) => {
      s.setScalar(j.r);
      m.compose(j.pos, q.identity(), s);
      jointRef.current.setMatrixAt(i, m);
      jointRef.current.setColorAt(i, j.color);
    });
    jointRef.current.instanceMatrix.needsUpdate = true;
    if (jointRef.current.instanceColor) jointRef.current.instanceColor.needsUpdate = true;

    leaves.forEach((l, i) => {
      m.compose(l.pos, l.quat, l.scale);
      leafRef.current.setMatrixAt(i, m);
      leafRef.current.setColorAt(i, l.color);
    });
    leafRef.current.instanceMatrix.needsUpdate = true;
    if (leafRef.current.instanceColor) leafRef.current.instanceColor.needsUpdate = true;
  }, [segs, joints, leaves]);

  useFrame(({ clock }) => {
    const sh = shaderRef.current;
    if (sh) {
      sh.uniforms.uTime.value = clock.getElapsedTime();
      sh.uniforms.uWind.value = windOn ? 1 : 0;
    }
  });

  return (
    <group>
      <instancedMesh ref={segRef} args={[undefined, undefined, segs.length]} frustumCulled={false}>
        <cylinderGeometry args={[0.86, 1, 1, 10, 1, true]} />
        <meshStandardMaterial color="#ffffff" roughness={0.92} metalness={0.04} />
      </instancedMesh>
      <instancedMesh ref={jointRef} args={[undefined, undefined, joints.length]} frustumCulled={false}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.92} metalness={0.04} />
      </instancedMesh>
      <instancedMesh ref={leafRef} args={[undefined, undefined, leaves.length]} frustumCulled={false}>
        <icosahedronGeometry args={[1, 0]} />
        <primitive object={leafMat} attach="material" />
      </instancedMesh>
    </group>
  );
}

// ── Resplandor rosa detrás de cada copa (falso bloom sakura) ─────
function PadGlows() {
  const tex = useMemo(() => glowTexture("#ff8fab"), []);
  const sprites = useRef<(THREE.Sprite | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    BONSAI.pads.forEach((_, i) => {
      const s = sprites.current[i];
      if (s) {
        (s.material as THREE.SpriteMaterial).opacity = 0.11 + Math.sin(t * 0.9 + i * 1.35) * 0.045;
      }
    });
  });
  return (
    <group>
      {BONSAI.pads.map((p, i) => (
        <sprite
          key={i}
          ref={(el) => { sprites.current[i] = el; }}
          position={p.c}
          scale={[p.r * 2.7, p.r * 2.7, 1]}
        >
          <spriteMaterial map={tex} transparent opacity={0.13} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
      ))}
    </group>
  );
}

// ── Maceta de cerámica con borde dorado, tierra y musgo ──────────
function BonsaiPot() {
  const mossRef = useRef<THREE.InstancedMesh>(null!);
  const moss = useMemo(() => {
    const rng = mulberry32(5);
    return Array.from({ length: 26 }, () => {
      const a = rng() * Math.PI * 2;
      const r = 0.12 + rng() * 0.68;
      const s = 0.05 + rng() * 0.09;
      const y = -1.28 + 0.9 * 0.14 * Math.sqrt(Math.max(0, 1 - (r / 0.9) ** 2)) + s * 0.1;
      return {
        pos: new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r),
        s,
        color: new THREE.Color("#2f6b3a").lerp(new THREE.Color("#57a35f"), rng()),
      };
    });
  }, []);

  useEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3();
    moss.forEach((mo, i) => {
      s.set(mo.s, mo.s * 0.38, mo.s);
      m.compose(mo.pos, q, s);
      mossRef.current.setMatrixAt(i, m);
      mossRef.current.setColorAt(i, mo.color);
    });
    mossRef.current.instanceMatrix.needsUpdate = true;
    if (mossRef.current.instanceColor) mossRef.current.instanceColor.needsUpdate = true;
  }, [moss]);

  return (
    <group>
      {/* patas */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.62, -1.82, Math.sin(a) * 0.62]}>
            <cylinderGeometry args={[0.1, 0.12, 0.07, 12]} />
            <meshStandardMaterial color="#140b18" roughness={0.5} metalness={0.3} />
          </mesh>
        );
      })}
      {/* cuerpo cerámico */}
      <mesh position={[0, -1.54, 0]}>
        <cylinderGeometry args={[1.04, 0.78, 0.52, 48]} />
        <meshPhysicalMaterial color="#1a0f1e" roughness={0.34} metalness={0.25} clearcoat={0.6} clearcoatRoughness={0.25} />
      </mesh>
      {/* borde dorado */}
      <mesh position={[0, -1.28, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.05, 0.028, 12, 64]} />
        <meshStandardMaterial color="#FFD700" roughness={0.28} metalness={0.65} emissive="#7a5c00" emissiveIntensity={0.35} />
      </mesh>
      {/* filete dorado inferior */}
      <mesh position={[0, -1.72, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.84, 0.012, 8, 48]} />
        <meshStandardMaterial color="#FFD700" roughness={0.32} metalness={0.6} emissive="#5c4400" emissiveIntensity={0.3} />
      </mesh>
      {/* tierra + domo de sustrato */}
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.98, 0.98, 0.06, 40]} />
        <meshStandardMaterial color="#161009" roughness={1} />
      </mesh>
      <mesh position={[0, -1.28, 0]} scale={[1, 0.155, 1]}>
        <sphereGeometry args={[0.9, 32, 16]} />
        <meshStandardMaterial color="#1c130c" roughness={1} />
      </mesh>
      {/* musgo */}
      <instancedMesh ref={mossRef} args={[undefined, undefined, moss.length]}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.95} />
      </instancedMesh>
    </group>
  );
}

// ── Jardín de arena zen: suelo, anillos, rocas y sombra suave ────
function ZenGround() {
  const rockRef = useRef<THREE.InstancedMesh>(null!);
  const rocks = useMemo(() => {
    const rng = mulberry32(7);
    return Array.from({ length: 9 }, () => {
      const a = rng() * Math.PI * 2;
      const r = 1.55 + rng() * 2.5;
      const s = 0.1 + rng() * 0.2;
      return {
        pos: new THREE.Vector3(Math.cos(a) * r, s * 0.42, Math.sin(a) * r),
        s,
        rot: rng() * Math.PI * 2,
        color: new THREE.Color().setHSL(0.78, 0.12 + rng() * 0.08, 0.1 + rng() * 0.07),
      };
    });
  }, []);
  const shadowTex = useMemo(
    () =>
      makeRadialTexture("groundShadow", [
        [0, "rgba(0,0,0,0.62)"],
        [0.55, "rgba(0,0,0,0.28)"],
        [1, "rgba(0,0,0,0)"],
      ]),
    []
  );

  useEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const s = new THREE.Vector3();
    rocks.forEach((ro, i) => {
      e.set(0, ro.rot, 0);
      q.setFromEuler(e);
      s.set(ro.s, ro.s * 0.62, ro.s);
      m.compose(ro.pos, q, s);
      rockRef.current.setMatrixAt(i, m);
      rockRef.current.setColorAt(i, ro.color);
    });
    rockRef.current.instanceMatrix.needsUpdate = true;
    if (rockRef.current.instanceColor) rockRef.current.instanceColor.needsUpdate = true;
  }, [rocks]);

  return (
    <group position={[0, GROUND_Y, 0]}>
      <mesh rotation-x={-Math.PI / 2}>
        <circleGeometry args={[4.6, 64]} />
        <meshStandardMaterial color="#151019" roughness={1} />
      </mesh>
      {/* anillos rastrillados */}
      {[1.5, 2.15, 2.85, 3.6, 4.25].map((r, i) => (
        <mesh key={r} rotation-x={-Math.PI / 2} position={[0, 0.006 + i * 0.001, 0]}>
          <ringGeometry args={[r, r + 0.02, 80]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#FFD700" : "#00e5a0"} transparent opacity={0.09} depthWrite={false} />
        </mesh>
      ))}
      {/* sombra suave bajo la maceta */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.004, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial map={shadowTex} transparent opacity={0.5} depthWrite={false} />
      </mesh>
      {/* rocas */}
      <instancedMesh ref={rockRef} args={[undefined, undefined, rocks.length]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.95} flatShading />
      </instancedMesh>
    </group>
  );
}

// ── Halo de atardecer detrás del árbol ───────────────────────────
function SunsetHalo() {
  const tex = useMemo(
    () =>
      makeRadialTexture("sunsetHalo", [
        [0, "rgba(255,190,110,0.85)"],
        [0.25, "rgba(255,140,80,0.5)"],
        [0.55, "rgba(150,80,200,0.22)"],
        [1, "rgba(10,7,16,0)"],
      ]),
    []
  );
  return (
    <sprite position={[0, 0.9, 0]} scale={[10.5, 10.5, 1]} renderOrder={-2}>
      <spriteMaterial map={tex} transparent opacity={0.55} depthWrite={false} depthTest={false} blending={THREE.AdditiveBlending} />
    </sprite>
  );
}

// ── Pétalos rosados cayendo en trayectoria helicoidal ────────────
const PETAL_COUNT = 72;

function FallingPetals({ paused }: { paused: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const petals = useMemo(() => {
    const rng = mulberry32(99);
    return Array.from({ length: PETAL_COUNT }, () => ({
      r0: 0.7 + rng() * 1.9,
      a0: rng() * Math.PI * 2,
      w: (0.12 + rng() * 0.25) * (rng() < 0.5 ? 1 : -1),
      vy: 0.16 + rng() * 0.22,
      y0: rng() * 5.4,
      helix: 0.3 + rng() * 0.4,
      s: 0.05 + rng() * 0.05,
      rx: 0.6 + rng() * 1.8,
      rz: 0.5 + rng() * 1.5,
      color: new THREE.Color(rng() < 0.55 ? "#ffc2d4" : rng() < 0.6 ? "#ff8fab" : "#ffe3ef"),
    }));
  }, []);

  const tmp = useMemo(
    () => ({ m: new THREE.Matrix4(), q: new THREE.Quaternion(), e: new THREE.Euler(), v: new THREE.Vector3(), s: new THREE.Vector3() }),
    []
  );

  const layout = (t: number) => {
    const TOP = 3.4;
    const RANGE = 5.4;
    const { m, q, e, v, s } = tmp;
    petals.forEach((p, i) => {
      const fall = (p.y0 + t * p.vy) % RANGE;
      const y = TOP - fall;
      const ang = p.a0 + t * p.w + fall * p.helix;
      const sway = Math.sin(t * 0.7 + p.a0 * 3) * 0.18;
      v.set(Math.cos(ang) * (p.r0 + sway), y, Math.sin(ang) * (p.r0 + sway));
      e.set(t * p.rx + i, t * p.rz, Math.sin(t + i) * 0.6);
      q.setFromEuler(e);
      const fade =
        THREE.MathUtils.clamp((y + 1.85) / 0.6, 0, 1) * THREE.MathUtils.clamp((TOP - y) / 0.8, 0, 1);
      s.set(p.s * fade, p.s * 1.5 * fade, p.s * fade);
      m.compose(v, q, s);
      ref.current.setMatrixAt(i, m);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  };

  useEffect(() => {
    petals.forEach((p, i) => ref.current.setColorAt(i, p.color));
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
    layout(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petals]);

  useFrame(({ clock }) => {
    if (!paused) layout(clock.getElapsedTime());
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, PETAL_COUNT]} frustumCulled={false}>
      <circleGeometry args={[0.55, 7]} />
      <meshBasicMaterial side={THREE.DoubleSide} transparent opacity={0.85} depthWrite={false} toneMapped={false} />
    </instancedMesh>
  );
}

// ── Punto interactivo (condición) con halo brillante ─────────────
function Hotspot({
  point, active, lit, onSelect, onHover,
}: {
  point: ZenPointInfo;
  active: boolean;
  lit: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  const pulse = useRef<THREE.Group>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  const ripple = useRef<THREE.Mesh>(null!);
  const beam = useRef<THREE.Mesh>(null!);
  const halo = useRef<THREE.Sprite>(null!);
  const [hover, setHover] = useState(false);
  const tex = useMemo(() => glowTexture(point.color), [point.color]);

  useFrame(({ clock, camera }) => {
    if (!pulse.current || !ring.current || !ripple.current || !beam.current || !halo.current) return;
    const t = clock.getElapsedTime();
    const phase = Number(point.num) * 1.7;
    const litNow = hover || lit;
    const s = (litNow || active ? 1.45 : 1) + Math.sin(t * 2.6 + phase) * 0.09;
    pulse.current.scale.setScalar(s);
    ring.current.lookAt(camera.position);

    // Onda expansiva tipo ripple (siempre, más visible al seleccionar)
    const rip = (t * (active ? 0.85 : 0.5) + phase * 0.13) % 1;
    ripple.current.scale.setScalar(1 + rip * 2.1);
    ripple.current.lookAt(camera.position);
    (ripple.current.material as THREE.MeshBasicMaterial).opacity =
      (active ? 0.55 : litNow ? 0.42 : 0.2) * (1 - rip);

    // Haz de luz vertical que asciende cuando el punto está activo
    beam.current.visible = !!active;
    if (active) {
      (beam.current.material as THREE.MeshBasicMaterial).opacity =
        0.17 + Math.sin(t * 3 + phase) * 0.07;
      halo.current.scale.set(0.95, 0.95, 1);
    } else {
      halo.current.scale.set(0.62, 0.62, 1);
    }

    (halo.current.material as THREE.SpriteMaterial).opacity =
      (active ? 0.9 : litNow ? 0.78 : 0.5) + Math.sin(t * 2.6 + phase) * 0.08;
  });

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHover(true);
    onHover(point.id);
    document.body.style.cursor = "pointer";
  };
  const out = () => {
    setHover(false);
    onHover(null);
    document.body.style.cursor = "auto";
  };

  return (
    <group position={point.position}>
      <group
        ref={pulse}
        onClick={(e) => { e.stopPropagation(); onSelect(point.id); }}
        onPointerOver={over}
        onPointerOut={out}
      >
        {/* zona de clic amplia (invisible) */}
        <mesh visible={false}>
          <sphereGeometry args={[0.21, 8, 8]} />
        </mesh>
        {/* halo aditivo */}
        <sprite ref={halo} scale={[0.62, 0.62, 1]}>
          <spriteMaterial map={tex} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
        {/* núcleo brillante */}
        <mesh>
          <sphereGeometry args={[0.062, 16, 16]} />
          <meshBasicMaterial color={point.color} toneMapped={false} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.105, 14, 14]} />
          <meshBasicMaterial color={point.color} transparent opacity={0.22} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        {/* anillo orientado a cámara */}
        <mesh ref={ring}>
          <ringGeometry args={[0.13, 0.148, 44]} />
          <meshBasicMaterial color={point.color} transparent opacity={active ? 0.95 : 0.5} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
        </mesh>
        {/* onda expansiva */}
        <mesh ref={ripple}>
          <ringGeometry args={[0.165, 0.18, 48]} />
          <meshBasicMaterial color={point.color} transparent opacity={0.25} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
        </mesh>
        {/* etiqueta flotante al pasar el cursor */}
        {hover && !active && (
          <Html center distanceFactor={7} zIndexRange={[6, 0]} style={{ pointerEvents: "none" }}>
            <div
              style={{
                transform: "translateY(-34px)",
                whiteSpace: "nowrap",
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.18em",
                fontFamily: "'Plus Jakarta Sans', monospace",
                color: point.color,
                background: "rgba(10,7,16,0.85)",
                border: `1px solid ${point.color}66`,
                boxShadow: `0 0 18px ${point.color}30`,
              }}
            >
              {point.num} · {protectBrands(point.title)}
            </div>
          </Html>
        )}
      </group>
      {/* haz de luz ascendente al seleccionar */}
      <mesh ref={beam} position={[0, 0.82, 0]} visible={false}>
        <cylinderGeometry args={[0.012, 0.05, 1.6, 8, 1, true]} />
        <meshBasicMaterial color={point.color} transparent opacity={0.2} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
    </group>
  );
}

// ── Explosión de pétalos al seleccionar un punto ─────────────────
const BURST_COUNT = 26;

function SelectionBurst({ selected }: { selected: ZenPointInfo | null }) {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const t0 = useRef(-1);
  const origin = useRef(new THREE.Vector3());
  const tmp = useMemo(
    () => ({ m: new THREE.Matrix4(), q: new THREE.Quaternion(), e: new THREE.Euler(), v: new THREE.Vector3(), s: new THREE.Vector3() }),
    []
  );
  const zero = useMemo(() => new THREE.Matrix4().makeScale(0, 0, 0), []);
  const parts = useMemo(() => {
    const rng = mulberry32(31);
    return Array.from({ length: BURST_COUNT }, () => {
      const a = rng() * Math.PI * 2;
      return {
        dir: new THREE.Vector3(Math.cos(a) * (0.6 + rng() * 1.0), 0.5 + rng() * 0.9, Math.sin(a) * (0.6 + rng() * 1.0)),
        delay: rng() * 0.14,
        life: 0.85 + rng() * 0.55,
        s: 0.05 + rng() * 0.05,
        rx: 3 + rng() * 4,
        rz: 2 + rng() * 4,
      };
    });
  }, []);

  useEffect(() => {
    if (!selected) {
      // limpiar todas las instancias
      parts.forEach((_, i) => ref.current?.setMatrixAt(i, zero));
      if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
      t0.current = -1;
      return;
    }
    toWorld(selected.position, origin.current);
    t0.current = Number.NaN; // se fija en el primer frame
    const c = new THREE.Color();
    const white = new THREE.Color("#ffffff");
    parts.forEach((_, i) => {
      c.set(selected.color).lerp(white, (i % 5) * 0.12);
      ref.current?.setColorAt(i, c);
    });
    if (ref.current?.instanceColor) ref.current.instanceColor.needsUpdate = true;
  }, [selected, parts, zero]);

  useFrame(({ clock }) => {
    if (!selected || Number.isNaN(t0.current)) {
      if (selected && Number.isNaN(t0.current)) t0.current = clock.getElapsedTime();
      else if (!selected) return;
    }
    if (!selected || t0.current < 0) return;
    const now = clock.getElapsedTime();
    const { m, q, e, v, s } = tmp;
    parts.forEach((p, i) => {
      const pr = (now - t0.current - p.delay) / p.life;
      if (pr <= 0 || pr >= 1) {
        ref.current.setMatrixAt(i, zero);
        return;
      }
      v.copy(p.dir).multiplyScalar(pr * 1.7).add(origin.current);
      v.y -= 0.85 * pr * pr;
      e.set(now * p.rx + i, now * p.rz, i);
      q.setFromEuler(e);
      const k = Math.min(pr * 5, 1) * (1 - pr);
      s.set(p.s * k * 2.1, p.s * k * 2.8, p.s * k * 2.1);
      m.compose(v, q, s);
      ref.current.setMatrixAt(i, m);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, BURST_COUNT]} frustumCulled={false}>
      <circleGeometry args={[0.5, 7]} />
      <meshBasicMaterial side={THREE.DoubleSide} transparent opacity={0.9} depthWrite={false} toneMapped={false} />
    </instancedMesh>
  );
}

// ── Luz de foco: sigue al punto seleccionado ─────────────────────
function FocusLight({ selected }: { selected: ZenPointInfo | null }) {
  const ref = useRef<THREE.PointLight>(null!);
  const dest = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  useFrame(() => {
    if (selected) {
      toWorld(selected.position, dest);
      ref.current.color.set(selected.color);
    } else {
      dest.set(0, 1, 0);
    }
    ref.current.position.lerp(dest, 0.08);
    ref.current.intensity = THREE.MathUtils.lerp(ref.current.intensity, selected ? 2.4 : 0, 0.08);
  });
  return <pointLight ref={ref} intensity={0} distance={2.6} decay={2} />;
}

// ── Cámara: órbita suave + enfoque + parallax + dolly de entrada ──
function CameraRig({ selected, reduceMotion }: { selected: ZenPointInfo | null; reduceMotion: boolean }) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const { camera, pointer } = useThree();
  const homeTarget = useMemo(() => new THREE.Vector3(0, 0.5, 0), []);
  const homePos = useMemo(() => new THREE.Vector3(4.1, 1.5, 4.75), []);
  const introStart = useRef<number | null>(null);
  const tmpTarget = useMemo(() => new THREE.Vector3(), []);
  const tmpCam = useMemo(() => new THREE.Vector3(), []);
  const tmpPar = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    if (!controls.current) return;
    const t = clock.getElapsedTime();
    if (introStart.current === null) introStart.current = t;

    if (selected) {
      toWorld(selected.position, tmpTarget);
    } else {
      // Parallax sutil: el objetivo se desplaza con el ratón en vista libre
      tmpTarget.copy(homeTarget).add(tmpPar.set(pointer.x * 0.42, pointer.y * 0.2, 0));
    }
    controls.current.target.lerp(tmpTarget, 0.06);

    if (selected) {
      camera.position.lerp(toWorld(selected.camera, tmpCam), 0.045);
    } else if (t - introStart.current < 1.9) {
      // Dolly cinematográfico de entrada (o snap si hay reduced-motion)
      if (reduceMotion) camera.position.copy(homePos);
      else camera.position.lerp(homePos, 0.05);
    }
    controls.current.update();
  });

  return (
    <OrbitControls
      ref={controls}
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      autoRotate={!selected && !reduceMotion}
      autoRotateSpeed={0.5}
      minDistance={2.4}
      maxDistance={10.5}
      maxPolarAngle={1.53}
    />
  );
}

// ── Crecimiento inicial (easeOutBack desde la base de la maceta) ──
function GrowIn({ children, enabled }: { children: ReactNode; enabled: boolean }) {
  const g = useRef<THREE.Group>(null!);
  const t0 = useRef<number | null>(null);
  const done = useRef(!enabled);

  useFrame(({ clock }) => {
    if (done.current) return;
    if (t0.current === null) t0.current = clock.getElapsedTime();
    const t = THREE.MathUtils.clamp((clock.getElapsedTime() - t0.current - 0.25) / 1.9, 0, 1);
    const c1 = 1.4;
    const c3 = c1 + 1;
    const k = t - 1;
    const e = 1 + c3 * k * k * k + c1 * k * k;
    g.current.scale.setScalar(Math.max(e, 0.0001));
    if (t >= 1) {
      g.current.scale.setScalar(1);
      done.current = true;
    }
  });

  return (
    <group position={[0, POT_BASE_Y, 0]}>
      <group ref={g} scale={enabled ? 0.0001 : 1}>
        <group position={[0, -POT_BASE_Y, 0]}>{children}</group>
      </group>
    </group>
  );
}

// ── Vaivén sutil del árbol (viento zen, pivote en la base) ───────
function Sway({ children, enabled }: { children: ReactNode; enabled: boolean }) {
  const g = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!enabled) return;
    const t = clock.getElapsedTime();
    g.current.rotation.z = Math.sin(t * 0.35) * 0.008;
    g.current.rotation.x = Math.cos(t * 0.28) * 0.005;
  });
  return (
    <group position={[0, TRUNK_PIVOT_Y, 0]}>
      <group ref={g}>
        <group position={[0, -TRUNK_PIVOT_Y, 0]}>{children}</group>
      </group>
    </group>
  );
}

// ── Escena completa ──────────────────────────────────────────────
export default function ZenTreeScene({
  points, selected, hovered, onSelect, onHover,
}: {
  points: ZenPointInfo[];
  selected: ZenPointInfo | null;
  hovered?: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  // El árbol es el contenido principal: solo se desactiva si no hay WebGL.
  const [mounted] = useState(() => {
    if (typeof document === "undefined") return true;
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      return false;
    }
  });
  const [active, setActive] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onMq);

    const handleVisibility = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      mq.removeEventListener?.("change", onMq);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!mounted) {
    return (
      <div className="zen-scene-fallback" style={{
        display: "flex", alignItems: "center", justifyContent: "center", height: "100%",
        color: "rgba(200,150,120,0.5)", fontSize: "0.7rem", letterSpacing: "0.2em", textAlign: "center", padding: "2rem",
      }}>
        TU NAVEGADOR NO SOPORTA WEBGL · USA LA LISTA DE PUNTOS PARA EXPLORAR
      </div>
    );
  }

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [6.6, 3.1, 7.9], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      onPointerMissed={() => onSelect("")}
    >
      {/* Iluminación profesional: key cálida, rim púrpura, fills de acento */}
      <ambientLight intensity={0.5} color="#ffeedd" />
      <directionalLight position={[5, 8, 4]} intensity={1.7} color="#ffd9a8" />
      <directionalLight position={[-6, 3, -5]} intensity={0.55} color="#a855f7" />
      <pointLight position={[-4, 1.5, 3]} intensity={0.5} color="#00e5a0" distance={12} />
      <pointLight position={[0, -1.2, 2.4]} intensity={0.6} color="#FFD700" distance={6} />
      <pointLight position={[0, 2.2, 0.5]} intensity={0.4} color="#ff8fab" distance={7} />
      <FocusLight selected={selected} />

      <SunsetHalo />

      {/* Bonsái completo: escalado + elevado como un solo conjunto */}
      <group scale={TREE_SCALE} position={[0, TREE_LIFT, 0]}>
        <GrowIn enabled={!reduceMotion}>
          <BonsaiPot />
          <Sway enabled={!reduceMotion}>
            <PadGlows />
            <BonsaiTree windOn={!reduceMotion} />
            {points.map((p) => (
              <Hotspot key={p.id} point={p} active={selected?.id === p.id} lit={hovered === p.id} onSelect={onSelect} onHover={onHover} />
            ))}
          </Sway>
        </GrowIn>
      </group>

      <SelectionBurst selected={selected} />

      <ZenGround />
      <ContactShadows position={[0, GROUND_Y + 0.012, 0]} opacity={0.5} scale={9} blur={2.8} far={2.6} frames={190} />

      <FallingPetals paused={reduceMotion} />

      {/* Polvo dorado / esporas flotando (GPU) */}
      <Sparkles count={90} scale={[7, 5, 7]} size={2.8} speed={reduceMotion ? 0 : 0.22} color="#FFD700" opacity={0.5} position={[0, 0.8, 0]} />
      <Sparkles count={50} scale={[6, 4.5, 6]} size={2.4} speed={reduceMotion ? 0 : 0.18} color="#ff8fab" opacity={0.4} position={[0, 1, 0]} />
      <Sparkles count={40} scale={[5.5, 4, 5.5]} size={2} speed={reduceMotion ? 0 : 0.16} color="#00e5a0" opacity={0.35} position={[0, 0.5, 0]} />

      <fog attach="fog" args={["#0a0710", 11, 22]} />
      <CameraRig selected={selected} reduceMotion={reduceMotion} />
    </Canvas>
  );
}
