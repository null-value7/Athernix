'use client';

// ═══════════════════════════════════════════════════════════
// ESCENA — HISTORIA VIVA VR
// Pirámide maya escalonada, templo con puerta luminosa, estelas,
// glifos orbitando, anillo solar, selva low-poly. Clic en un
// escalón lo eleva; clic en el suelo dispara una ráfaga dorada.
// ═══════════════════════════════════════════════════════════

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type * as React from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { Stars } from '@react-three/drei/core/Stars';
import { Sparkles } from '@react-three/drei/core/Sparkles';
import { Float } from '@react-three/drei/core/Float';
import { Html } from '@react-three/drei/web/Html';
import { useGLTF } from '@react-three/drei/core/Gltf';
import * as THREE from 'three';
import type { ModuleHotspot } from '@/models/modules';
import { assetUrl } from '@/lib/assets';
import {
  dampFactor,
  useCameraDolly,
  usePointerParallax,
  type ModuleMotion,
} from '@/controllers/modules/useModuleScene';
import {
  FitModel,
  HotspotMarker,
  seededRng,
  useMeshCursor,
  useParticleField,
} from './shared';

const PINK = '#FF006E';
const ORANGE = '#FF6B00';
const GOLD = '#FFD700';
const STEP_COLORS = [PINK, ORANGE, GOLD];

/* ── Assets reales (CC0 Poly Haven, 1k) ── */
const PH = '/models/ph/';
const ASSET = {
  bust: assetUrl(`${PH}marble_bust_01/marble_bust_01_1k.gltf`),
  vase: assetUrl(`${PH}antique_ceramic_vase_01/antique_ceramic_vase_01_1k.gltf`),
  elephant: assetUrl(`${PH}carved_wooden_elephant/carved_wooden_elephant_1k.gltf`),
  lantern: assetUrl(`${PH}brass_diya_lantern/brass_diya_lantern_1k.gltf`),
  statue: assetUrl(`${PH}gothic_statue/gothic_statue_1k.gltf`),
  chest: assetUrl(`${PH}treasure_chest/treasure_chest_1k.gltf`),
  shield: assetUrl(`${PH}kite_shield/kite_shield_1k.gltf`),
  plate: assetUrl(`${PH}carved_wooden_plate/carved_wooden_plate_1k.gltf`),
  candles: assetUrl(`${PH}brass_candleholders/brass_candleholders_1k.gltf`),
  stick: assetUrl(`${PH}wooden_candlestick/wooden_candlestick_1k.gltf`),
  rockset1: assetUrl(`${PH}rock_moss_set_01/rock_moss_set_01_1k.gltf`),
  rockset2: assetUrl(`${PH}rock_moss_set_02/rock_moss_set_02_1k.gltf`),
  trunk: assetUrl(`${PH}dead_tree_trunk/dead_tree_trunk_1k.gltf`),
  quiver: assetUrl(`${PH}dead_quiver_trunk/dead_quiver_trunk_1k.gltf`),
  fern: assetUrl(`${PH}fern_02/fern_02_1k.gltf`),
  shrub: assetUrl(`${PH}shrub_03/shrub_03_1k.gltf`),
  rock1: assetUrl(`${PH}moon_rock_01/moon_rock_01_1k.gltf`),
  rock2: assetUrl(`${PH}moon_rock_02/moon_rock_02_1k.gltf`),
  rock3: assetUrl(`${PH}moon_rock_03/moon_rock_03_1k.gltf`),
  rock4: assetUrl(`${PH}moon_rock_04/moon_rock_04_1k.gltf`),
  rock5: assetUrl(`${PH}moon_rock_05/moon_rock_05_1k.gltf`),
} as const;
const BRICK = {
  diff: assetUrl(`${PH}textures/brick_moss_001/diffuse.jpg`),
  nor: assetUrl(`${PH}textures/brick_moss_001/nor_gl.jpg`),
  rough: assetUrl(`${PH}textures/brick_moss_001/rough.jpg`),
} as const;

// Precarga al importar el módulo — evita la carrera de Suspense.
Object.values(ASSET).forEach((u) => useGLTF.preload(u));

/* Escombro de rocas lunares en las esquinas de la base (x, z, ry, altura). */
const RUBBLE: ReadonlyArray<{ url: string; x: number; z: number; ry: number; h: number }> = [
  { url: ASSET.rock1, x: 5.9, z: 4.9, ry: 0.4, h: 0.62 },
  { url: ASSET.rock2, x: 5.2, z: 5.7, ry: 1.9, h: 0.4 },
  { url: ASSET.rock4, x: -6.2, z: 4.7, ry: 2.6, h: 0.55 },
  { url: ASSET.rock1, x: -5.5, z: 5.6, ry: 0.9, h: 0.38 },
  { url: ASSET.rock3, x: -4.9, z: 5.1, ry: 1.4, h: 0.46 },
  { url: ASSET.rock2, x: 5.8, z: -5.3, ry: 1.2, h: 0.5 },
  { url: ASSET.rock5, x: 6.6, z: -5.0, ry: 2.2, h: 0.42 },
  { url: ASSET.rock1, x: 6.4, z: -4.6, ry: 2.9, h: 0.34 },
  { url: ASSET.rock4, x: -5.9, z: -4.9, ry: 3.4, h: 0.6 },
  { url: ASSET.rock3, x: -5.4, z: -5.5, ry: 0.6, h: 0.44 },
  { url: ASSET.rock1, x: -5.1, z: -5.8, ry: 2.1, h: 0.36 },
  { url: ASSET.rock5, x: 4.7, z: -5.9, ry: 4.1, h: 0.5 },
];

export interface ModuleSceneProps {
  motion: ModuleMotion;
  hotspots: readonly ModuleHotspot[];
  active: number;
  onSelect: (i: number) => void;
}

/* Ráfaga dorada de 120 puntos al clicar el suelo. */
function ClickBurst({ motion }: { motion: ModuleMotion }) {
  const ref = useRef<THREE.Points>(null);
  const mat = useRef<THREE.PointsMaterial>(null);
  const burst = useRef({ x: 0, y: 0, z: 0, t0: -10 });
  const dirs = useMemo(() => {
    const rnd = seededRng(19);
    const d = new Float32Array(120 * 3);
    for (let i = 0; i < 120; i++) {
      const a = rnd() * Math.PI * 2;
      const up = 0.4 + rnd() * 1.6;
      const sp = 1 + rnd() * 2.6;
      d[i * 3] = Math.cos(a) * sp;
      d[i * 3 + 1] = up * sp;
      d[i * 3 + 2] = Math.sin(a) * sp;
    }
    return d;
  }, []);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(120 * 3), 3));
    return g;
  }, []);
  useEffect(() => () => geo.dispose(), [geo]);

  const fire = (p: THREE.Vector3) => {
    burst.current = { x: p.x, y: p.y, z: p.z, t0: motion.timeRef.current };
  };

  useFrame(() => {
    if (!ref.current || !mat.current) return;
    const age = motion.timeRef.current - burst.current.t0;
    if (age < 0 || age > 1) {
      ref.current.visible = false;
      return;
    }
    ref.current.visible = true;
    const attr = ref.current.geometry.getAttribute('position');
    for (let i = 0; i < 120; i++) {
      attr.setXYZ(
        i,
        burst.current.x + dirs[i * 3] * age,
        burst.current.y + dirs[i * 3 + 1] * age - age * age * 2.2,
        burst.current.z + dirs[i * 3 + 2] * age
      );
    }
    attr.needsUpdate = true;
    mat.current.opacity = 1 - age;
  });

  return (
    <>
      <points ref={ref} geometry={geo} visible={false}>
        <pointsMaterial
          ref={mat}
          color={GOLD}
          size={0.09}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
      {/* plano receptor del clic "vacío" */}
      <mesh
        position={[0, -1.2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          fire(e.point);
        }}
      >
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </>
  );
}

/* Escalones de la pirámide con PBR de ladrillo musgoso real.
   Suspende solo este bloque — el resto de la escena no espera. */
function BrickSteps({
  stepsRef,
  stepMats,
  stepTip,
  onStepClick,
  cursor,
}: {
  stepsRef: React.RefObject<Array<THREE.Mesh | null>>;
  stepMats: React.RefObject<Array<THREE.MeshStandardMaterial | null>>;
  stepTip: number | null;
  onStepClick: (i: number) => (e: ThreeEvent<MouseEvent>) => void;
  cursor: ReturnType<typeof useMeshCursor>;
}) {
  const [diff, nor, rough] = useLoader(THREE.TextureLoader, [
    BRICK.diff,
    BRICK.nor,
    BRICK.rough,
  ]);
  /* Clones propios: la textura cacheada por useLoader no se muta. */
  const maps = useMemo(() => {
    const d = diff.clone();
    const n = nor.clone();
    const r = rough.clone();
    d.colorSpace = THREE.SRGBColorSpace;
    for (const t of [d, n, r]) {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(3, 3);
      t.anisotropy = 8;
      t.needsUpdate = true;
    }
    return [d, n, r];
  }, [diff, nor, rough]);
  useEffect(() => () => maps.forEach((t) => t.dispose()), [maps]);

  return (
    <>
      {Array.from({ length: 6 }, (_, i) => {
        const size = 8.6 - i * 1.15;
        return (
          <mesh
            key={i}
            ref={(el) => {
              stepsRef.current[i] = el;
            }}
            position={[0, -0.65 + i * 0.75, 0]}
            onClick={onStepClick(i)}
            onPointerOver={cursor.over}
            onPointerOut={cursor.out}
          >
            <boxGeometry args={[size, 0.72, size * 0.82]} />
            <meshStandardMaterial
              ref={(m) => {
                stepMats.current[i] = m;
              }}
              map={maps[0]}
              normalMap={maps[1]}
              roughnessMap={maps[2]}
              color="#cdb9ac"
              emissive={STEP_COLORS[i % 3]}
              emissiveIntensity={0.22}
            />
            {stepTip === i && (
              <Html distanceFactor={12} center position={[0, 0.75, 0]}>
                <div className="md-hs-label md-hs-label--chalk">Nivel {i + 1} · estructura ritual</div>
              </Html>
            )}
          </mesh>
        );
      })}
    </>
  );
}

/* Artefactos reales CC0 sobre la escena — cada uno suspende por su lado. */
function RealArtifacts() {
  return (
    <>
      {/* busto de mármol sobre pedestal junto a la estela */}
      <Suspense fallback={null}>
        <group position={[6.3, -1.15, 4.6]} rotation={[0, -0.65, 0]}>
          <mesh position={[0, 0.28, 0]}>
            <boxGeometry args={[0.72, 0.56, 0.72]} />
            <meshStandardMaterial color="#4a3540" roughness={0.62} metalness={0.25} />
          </mesh>
          <group position={[0, 0.56, 0]}>
            <FitModel url={ASSET.bust} height={0.95} />
          </group>
        </group>
      </Suspense>

      {/* ofrendas en la repisa del primer escalón */}
      <Suspense fallback={null}>
        <group position={[4.02, -0.29, 3.15]} rotation={[0, 0.5, 0]}>
          <FitModel url={ASSET.vase} height={0.5} />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[3.25, -0.29, 3.42]} rotation={[0, -0.4, 0]}>
          <FitModel url={ASSET.elephant} height={0.42} />
        </group>
      </Suspense>

      {/* lámpara de latón ardiendo sobre el altar solar */}
      <Suspense fallback={null}>
        <group position={[-4.55, -0.45, 2.55]}>
          <FitModel url={ASSET.lantern} height={0.5} />
          <pointLight position={[0, 0.55, 0]} intensity={7} distance={9} decay={2} color="#ffb84d" />
        </group>
      </Suspense>

      {/* ofrendas del altar: candelabros sobre la repisa opuesta */}
      <Suspense fallback={null}>
        <group position={[-3.7, -0.29, 3.05]} rotation={[0, 0.4, 0]}>
          <FitModel url={ASSET.candles} height={0.4} />
          <pointLight position={[0, 0.45, 0]} intensity={2.4} distance={5} decay={2} color="#ffca7a" />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[-3.25, -0.29, 3.3]} rotation={[0, -0.7, 0]}>
          <FitModel url={ASSET.stick} height={0.5} />
          <pointLight position={[0, 0.55, 0]} intensity={1.8} distance={4} decay={2} color="#ffb86b" />
        </group>
      </Suspense>

      {/* escudo y plato ritual junto al busto, en la repisa */}
      <Suspense fallback={null}>
        <group position={[3.62, -0.29, 3.28]} rotation={[0.1, -0.8, -0.22]}>
          <FitModel url={ASSET.shield} height={0.62} />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[2.7, -0.29, 3.2]} rotation={[0, 0.9, 0]}>
          <FitModel url={ASSET.plate} height={0.14} />
        </group>
      </Suspense>

      {/* guardián en ruinas junto al juego de pelota */}
      <Suspense fallback={null}>
        <group position={[-6.4, -1.16, -5.6]} rotation={[0, 0.7, 0]}>
          <FitModel url={ASSET.statue} height={1.9} />
        </group>
      </Suspense>

      {/* cofre semienterrado junto a la casa de Cerén */}
      <Suspense fallback={null}>
        <group position={[5.5, -1.3, -4.0]} rotation={[0.08, -0.5, 0.1]}>
          <FitModel url={ASSET.chest} height={0.55} />
        </group>
      </Suspense>

      {/* afloramientos de roca musgosa en la base */}
      <Suspense fallback={null}>
        <group position={[7.6, -1.16, -7.2]} rotation={[0, 0.6, 0]}>
          <FitModel url={ASSET.rockset1} height={1.3} />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[-7.8, -1.16, 7.0]} rotation={[0, 2.4, 0]}>
          <FitModel url={ASSET.rockset2} height={1.5} />
        </group>
      </Suspense>

      {/* troncos muertos: uno caído, un tocón y un segundo caído */}
      <Suspense fallback={null}>
        <group position={[7.9, -1.16, 1.6]} rotation={[0, 0.4, 0]}>
          <group rotation={[1.45, 0, 0]}>
            <FitModel url={ASSET.trunk} height={1.9} />
          </group>
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[-8.3, -1.16, -1.2]} rotation={[0, 1.1, 0]}>
          <FitModel url={ASSET.quiver} height={2.2} />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[-1.9, -1.16, 8.0]} rotation={[0, -0.6, 0]}>
          <group rotation={[1.5, 0, 0]}>
            <FitModel url={ASSET.quiver} height={1.6} />
          </group>
        </group>
      </Suspense>

      {/* escombro lunar en las esquinas de la base */}
      {RUBBLE.map((r, i) => (
        <Suspense key={i} fallback={null}>
          <group position={[r.x, -1.16, r.z]} rotation={[0, r.ry, 0]}>
            <FitModel url={r.url} height={r.h} />
          </group>
        </Suspense>
      ))}
    </>
  );
}

/* Sotobosque real: helechos y arbustos entre los árboles neón. */
function JungleFlora() {
  const plants = useMemo(() => {
    const rnd = seededRng(23);
    return Array.from({ length: 14 }, (_, i) => {
      const a = rnd() * Math.PI * 2;
      const r = 9.6 + rnd() * 5.4;
      return {
        x: Math.cos(a) * r,
        z: Math.sin(a) * r,
        ry: rnd() * Math.PI * 2,
        h: 0.3 + rnd() * 0.28,
        url: i % 2 ? ASSET.shrub : ASSET.fern,
      };
    });
  }, []);
  return (
    <>
      {plants.map((p, i) => (
        <Suspense key={i} fallback={null}>
          <group position={[p.x, -1.16, p.z]} rotation={[0, p.ry, 0]}>
            <FitModel url={p.url} height={p.h} />
          </group>
        </Suspense>
      ))}
    </>
  );
}

export default function HistoryScene({ motion, hotspots, active, onSelect }: ModuleSceneProps) {
  const rootRef = useRef<THREE.Group>(null);
  const stepsRef = useRef<Array<THREE.Mesh | null>>([]);
  const stepMats = useRef<Array<THREE.MeshStandardMaterial | null>>([]);
  const glyphRefs = useRef<Array<THREE.Mesh | null>>([]);
  const sunRef = useRef<THREE.Mesh>(null);
  const fieldRef = useRef<THREE.Points>(null);
  const stepRise = useRef<number[]>([]);
  const [stepTip, setStepTip] = useState<number | null>(null);
  const tipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cursor = useMeshCursor();
  const glyphs = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        angle: (i / 14) * Math.PI * 2,
        radius: 7 + (i % 4) * 0.55,
        y: 0.8 + (i % 5) * 0.9,
        speed: 0.14 + (i % 3) * 0.07,
        size: 0.14 + (i % 3) * 0.05,
      })),
    []
  );
  const trees = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => {
        const a = (i / 26) * Math.PI * 2 + (i % 3) * 0.2;
        const r = 8.5 + (i % 5) * 1.6;
        return {
          x: Math.cos(a) * r,
          z: Math.sin(a) * r,
          h: 0.7 + (i % 4) * 0.35,
        };
      }),
    []
  );
  const dustGeo = useParticleField([PINK, ORANGE, GOLD], 380, [9, 20], [-0.5, 7]);
  useEffect(() => () => dustGeo.dispose(), [dustGeo]);
  usePointerParallax(rootRef, motion, 0.1);
  useCameraDolly(
    motion,
    { heroPos: [11, 7.5, 14], nearPos: [6.5, 4.6, 9], targetY: 1 },
    hotspots.map((h) => h.position)
  );

  const stepClick = (i: number) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    stepRise.current[i] = motion.timeRef.current;
    setStepTip(i);
    if (tipTimer.current) clearTimeout(tipTimer.current);
    tipTimer.current = setTimeout(() => setStepTip(null), 1400);
  };

  useEffect(
    () => () => {
      if (tipTimer.current) clearTimeout(tipTimer.current);
    },
    []
  );

  useFrame((_, delta) => {
    const t = motion.timeRef.current;
    const k = motion.stillRef.current ? 1 : dampFactor(delta);
    // escalones: ascenso y brillo breve tras el clic
    for (let i = 0; i < 6; i++) {
      const m = stepsRef.current[i];
      const age = t - (stepRise.current[i] ?? -10);
      const lift = age > 0 && age < 1.6 ? Math.sin(Math.min(age / 1.6, 1) * Math.PI) * 0.34 : 0;
      if (m) m.position.y = -0.65 + i * 0.75 + lift * (motion.stillRef.current ? 1 : 1);
      const mat = stepMats.current[i];
      if (mat) mat.emissiveIntensity += ((lift > 0 ? 0.9 : 0.22) - mat.emissiveIntensity) * k;
    }
    if (sunRef.current) sunRef.current.rotation.z += motion.stillRef.current ? 0 : delta * 0.25;
    if (fieldRef.current && !motion.stillRef.current) fieldRef.current.rotation.y += delta * 0.01;
    for (let i = 0; i < glyphRefs.current.length; i++) {
      const g = glyphRefs.current[i];
      if (!g) continue;
      const d = glyphs[i];
      const a = d.angle + t * d.speed;
      g.position.set(Math.cos(a) * d.radius, d.y + Math.sin(t * 0.8 + i) * 0.15, Math.sin(a) * d.radius);
      g.rotation.x = t * 0.6 + i;
      g.rotation.y = t * 0.8;
    }
  });

  return (
    <>
      <fog attach="fog" args={['#0a0108', 18, 42]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 14, 8]} intensity={1.6} color="#ffd9b0" />
      <pointLight position={[-8, 4, 6]} intensity={22} distance={26} decay={2} color={PINK} />
      <pointLight position={[6, 7, -6]} intensity={14} distance={24} decay={2} color={GOLD} />

      <Stars radius={60} depth={30} count={1600} factor={3} saturation={0.4} fade speed={0.6} />
      <Sparkles count={60} scale={[26, 10, 26]} size={2.2} speed={0.25} color={GOLD} opacity={0.55} />

      <group ref={rootRef}>
        {/* suelo + rejilla */}
        <mesh position={[0, -1.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#12061a" roughness={0.92} metalness={0.05} />
        </mesh>
        <gridHelper
          args={[52, 46, '#ff006e', '#2a1024']}
          position={[0, -1.08, 0]}
          material-transparent
          material-opacity={0.15}
        />

        {/* pirámide escalonada — ladrillo musgoso PBR, suspende aparte */}
        <Suspense fallback={null}>
          <BrickSteps
            stepsRef={stepsRef}
            stepMats={stepMats}
            stepTip={stepTip}
            onStepClick={stepClick}
            cursor={cursor}
          />
        </Suspense>

        {/* artefactos reales (CC0 Poly Haven) sobre la base neón */}
        <RealArtifacts />

        {/* sotobosque real entre la selva estilizada */}
        <JungleFlora />

        {/* templo + puerta luminosa */}
        <group position={[0, 4.15, 0]}>
          <mesh position={[0, 0.55, 0]}>
            <boxGeometry args={[2.5, 1.5, 2.2]} />
            <meshStandardMaterial color="#f4d6a0" emissive="#221000" roughness={0.54} />
          </mesh>
          <mesh position={[0, 0.35, 1.12]}>
            <boxGeometry args={[0.62, 0.95, 0.04]} />
            <meshBasicMaterial color={GOLD} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0.35, 1.14]}>
            <boxGeometry args={[0.78, 1.1, 0.02]} />
            <meshBasicMaterial color={ORANGE} transparent opacity={0.35} toneMapped={false} />
          </mesh>
        </group>

        {/* estelas en las esquinas con franjas de glifos */}
        {[
          [4.8, 3.6],
          [-4.8, 3.6],
          [4.8, -3.6],
          [-4.8, -3.6],
        ].map(([x, z], i) => (
          <group key={i} position={[x, 0, z]}>
            <mesh position={[0, 0.6, 0]}>
              <boxGeometry args={[0.5, 2.4, 0.3]} />
              <meshStandardMaterial color="#3a2a3a" roughness={0.6} metalness={0.3} />
            </mesh>
            {[0.2, 0.7, 1.2].map((y, j) => (
              <mesh key={j} position={[0, y + 0.25, 0.17]}>
                <boxGeometry args={[0.34, 0.16, 0.02]} />
                <meshBasicMaterial color={j % 2 ? GOLD : PINK} toneMapped={false} />
              </mesh>
            ))}
          </group>
        ))}

        {/* altar solar bajo el anillo */}
        <mesh position={[-4.9, -0.7, 2.9]}>
          <cylinderGeometry args={[0.8, 1.1, 0.5, 8]} />
          <meshStandardMaterial color="#4a3540" roughness={0.55} metalness={0.4} />
        </mesh>
        <mesh position={[-4.9, -0.38, 2.9]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color={GOLD} toneMapped={false} />
        </mesh>

        {/* Joya de Cerén: casita con techo */}
        <group position={[4.2, -0.7, -4.8]}>
          <mesh>
            <boxGeometry args={[1.4, 0.9, 1.1]} />
            <meshStandardMaterial color="#5a4632" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.65, 0]} rotation={[0, 0, 0.0]}>
            <coneGeometry args={[1.05, 0.6, 4]} />
            <meshStandardMaterial color="#7a5a38" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.05, 0.57]}>
            <boxGeometry args={[0.3, 0.45, 0.02]} />
            <meshBasicMaterial color={ORANGE} toneMapped={false} />
          </mesh>
        </group>

        {/* juego de pelota: dos aros de piedra */}
        {[-1.1, 1.1].map((dx, i) => (
          <mesh key={i} position={[-4.2 + dx, -0.3, -4.6]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.34, 0.1, 10, 24]} />
            <meshStandardMaterial color="#4a3a4a" roughness={0.6} metalness={0.3} />
          </mesh>
        ))}

        {/* glifos octaédricos en órbita */}
        {glyphs.map((d, i) => (
          <mesh
            key={i}
            ref={(el) => {
              glyphRefs.current[i] = el;
            }}
          >
            <octahedronGeometry args={[d.size, 0]} />
            <meshStandardMaterial
              color={i % 2 ? GOLD : PINK}
              emissive={i % 2 ? GOLD : PINK}
              emissiveIntensity={0.9}
              roughness={0.2}
            />
          </mesh>
        ))}

        {/* gran anillo solar inclinado */}
        <Float speed={0.6} floatIntensity={0.4} rotationIntensity={0}>
          <mesh ref={sunRef} position={[0, 3.4, -3]} rotation={[Math.PI / 2.1, 0, 0]}>
            <torusGeometry args={[5.6, 0.04, 12, 160]} />
            <meshStandardMaterial
              color={GOLD}
              emissive={ORANGE}
              emissiveIntensity={0.5}
              transparent
              opacity={0.5}
            />
          </mesh>
        </Float>

        {/* selva low-poly alrededor */}
        {trees.map((tr, i) => (
          <group key={i} position={[tr.x, -1.1, tr.z]}>
            <mesh position={[0, tr.h * 0.25, 0]}>
              <cylinderGeometry args={[0.06, 0.09, tr.h * 0.5, 5]} />
              <meshStandardMaterial color="#2a1a1a" roughness={0.9} />
            </mesh>
            <mesh position={[0, tr.h * 0.75, 0]}>
              <coneGeometry args={[tr.h * 0.45, tr.h, 6]} />
              <meshStandardMaterial
                color={i % 3 ? '#17301c' : '#1e3a22'}
                flatShading
                roughness={0.9}
              />
            </mesh>
          </group>
        ))}

        {/* polvo ambiental */}
        <points ref={fieldRef} geometry={dustGeo}>
          <pointsMaterial
            size={0.05}
            vertexColors
            transparent
            opacity={0.7}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* marcadores de hotspots */}
        {hotspots.map((h, i) => (
          <HotspotMarker
            key={h.id}
            index={i}
            position={h.position}
            label={h.label}
            accent={PINK}
            motion={motion}
            selected={active === i}
            onSelect={onSelect}
          />
        ))}
      </group>

      <ClickBurst motion={motion} />
    </>
  );
}
