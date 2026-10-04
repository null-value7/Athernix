'use client';

// ═══════════════════════════════════════════════════════════
// ESCENA — SVIRTUAL TOURS
// Terreno procedural con colores por altura, agua, volcanes,
// lago, balizas-destino, globo de rutas y nubes flotantes.
// DÍA/NOCHE lerpea cielo, luces y brillo de las balizas.
// ═══════════════════════════════════════════════════════════

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type * as React from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Stars } from '@react-three/drei/core/Stars';
import { Sparkles } from '@react-three/drei/core/Sparkles';
import { Float } from '@react-three/drei/core/Float';
import { Line } from '@react-three/drei/core/Line';
import { useGLTF } from '@react-three/drei/core/Gltf';
import * as THREE from 'three';
import type { Line2, LineMaterial } from 'three-stdlib';
import { assetUrl } from '@/lib/assets';
import {
  dampFactor,
  useCameraDolly,
  usePointerParallax,
} from '@/controllers/modules/useModuleScene';
import {
  FitModel,
  HotspotMarker,
  seededRng,
  useMeshCursor,
  useParticleField,
} from './shared';
import type { ModuleSceneProps } from './HistoryScene';

const ORANGE = '#FF6B00';
const GOLD = '#FFD700';
const PINK = '#FF006E';
const NIGHT = '#0a0110';
const DAY = '#2b1436';
const WATER_N = '#132032';
const WATER_D = '#1a4a66';

/* ── Assets reales (CC0 Poly Haven, 1k) ── */
const PH = '/models/ph/';
const ASSET = {
  trunk: assetUrl(`${PH}dead_tree_trunk/dead_tree_trunk_1k.gltf`),
  stump: assetUrl(`${PH}tree_stump_01/tree_stump_01_1k.gltf`),
  quiver: assetUrl(`${PH}quiver_tree_02/quiver_tree_02_1k.gltf`),
  rock2: assetUrl(`${PH}moon_rock_02/moon_rock_02_1k.gltf`),
  rock3: assetUrl(`${PH}moon_rock_03/moon_rock_03_1k.gltf`),
  rock4: assetUrl(`${PH}moon_rock_04/moon_rock_04_1k.gltf`),
  rock5: assetUrl(`${PH}moon_rock_05/moon_rock_05_1k.gltf`),
  rock7: assetUrl(`${PH}rock_07/rock_07_1k.gltf`),
  mountain: assetUrl(`${PH}mountainside/mountainside_1k.gltf`),
  cliff: assetUrl(`${PH}namaqualand_cliff_01/namaqualand_cliff_01_1k.gltf`),
  shrub: assetUrl(`${PH}shrub_03/shrub_03_1k.gltf`),
  fern: assetUrl(`${PH}fern_02/fern_02_1k.gltf`),
  grass: assetUrl(`${PH}grass_bermuda_01/grass_bermuda_01_1k.gltf`),
  car: assetUrl(`${PH}covered_car/covered_car_1k.gltf`),
  table: assetUrl(`${PH}wooden_picnic_table/wooden_picnic_table_1k.gltf`),
  bench: assetUrl(`${PH}painted_wooden_bench/painted_wooden_bench_1k.gltf`),
  cart: assetUrl(`${PH}coffeecart_01/CoffeeCart_01_1k.gltf`),
} as const;
const SAND = {
  diff: assetUrl(`${PH}textures/aerial_sand/diffuse.jpg`),
  nor: assetUrl(`${PH}textures/aerial_sand/nor_gl.jpg`),
  rough: assetUrl(`${PH}textures/aerial_sand/rough.jpg`),
} as const;

Object.values(ASSET).forEach((u) => useGLTF.preload(u));

function terrainHeight(x: number, y: number) {
  return (
    Math.sin(x * 0.2) * Math.cos(y * 0.16) * 1.8 +
    Math.sin((x + y) * 0.09) * 2.2 +
    Math.sin(x * 0.05) * Math.cos(y * 0.07) * 1.2
  );
}

/* Altura de la superficie del terreno en coords del grupo raíz. */
const groundAt = (x: number, z: number) => -1.4 + terrainHeight(x, -z);

/* Candidatos deterministas — se filtran por altura real del terreno. */
const TREE_SPOTS: ReadonlyArray<[number, number, number]> = [
  [-14, -9, 0.4], [9, -13, 1.8], [-2, -15, 2.7], [14, 4, 0.9],
  [-18, -3, 1.3], [11, 12, 2.2], [-13, 13, 0.6], [3, 15, 3.1],
];
const STUMP_SPOTS: ReadonlyArray<[number, number, number]> = [
  [-10, -13, 0.8], [15, -4, 2.4], [8, 9, 1.1], [-16, 7, 2.9],
];
const CART_CANDIDATES: ReadonlyArray<[number, number]> = [
  [-5.4, 12.4], [-9.2, 13.2], [-4.2, 10.2], [7, 11],
];
const QUIVER_SPOTS: ReadonlyArray<[number, number, number]> = [
  [-7, -11, 0.5], [12, -9, 2.1], [-15, 9, 1.4], [6, 14, 2.9],
];
const CAR_CANDIDATES: ReadonlyArray<[number, number]> = [
  [10, 8], [13, -7], [6, -13], [-12, 10],
];
/* Mesas de descanso junto a balizas: 'ceren' [5,1.6,9] y 'flores' [-7,2.2,11]. */
const PICNIC_SPOTS = {
  table: [2.9, 7.2] as readonly [number, number],
  bench: [-5.3, 9.6] as readonly [number, number],
};
/* Cordillera de fondo — fuera del terreno, dentro de la niebla. */
const BACKDROP: ReadonlyArray<{ url: string; x: number; z: number; y: number; ry: number; h: number }> = [
  { url: ASSET.mountain, x: 0, z: -33, y: -2.6, ry: 0.2, h: 28 },
  { url: ASSET.mountain, x: -30, z: -16, y: -2.7, ry: 1.9, h: 26 },
  { url: ASSET.mountain, x: 31, z: -18, y: -2.6, ry: -1.8, h: 27 },
  { url: ASSET.cliff, x: 26, z: 12, y: -2.2, ry: -2.2, h: 15 },
];

/* Terreno con arena aérea PBR real — suspende solo este mesh. */
function TerrainMesh({
  geo,
  matRef,
}: {
  geo: THREE.BufferGeometry;
  matRef: React.RefObject<THREE.MeshStandardMaterial | null>;
}) {
  const [diff, nor, rough] = useLoader(THREE.TextureLoader, [
    SAND.diff,
    SAND.nor,
    SAND.rough,
  ]);
  /* Clones propios: la textura cacheada por useLoader no se muta. */
  const maps = useMemo(() => {
    const d = diff.clone();
    const n = nor.clone();
    const r = rough.clone();
    d.colorSpace = THREE.SRGBColorSpace;
    for (const t of [d, n, r]) {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(14, 14);
      t.anisotropy = 8;
      t.needsUpdate = true;
    }
    return [d, n, r];
  }, [diff, nor, rough]);
  useEffect(() => () => maps.forEach((t) => t.dispose()), [maps]);

  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]}>
      <meshStandardMaterial
        ref={matRef}
        map={maps[0]}
        normalMap={maps[1]}
        roughnessMap={maps[2]}
        color="#8f837a"
        roughness={1}
        metalness={0.05}
      />
    </mesh>
  );
}

/* Paisaje real CC0: cordillera de fondo, troncos, tocones, carcavas,
   rocas costeras, vegetación baja, carro cubierto, picnic y carrito. */
function RealLandscape({
  treeSpots,
  stumpSpots,
  quiverSpots,
  rockSpots,
  floraSpots,
  cartSpot,
  carSpot,
}: {
  treeSpots: ReadonlyArray<[number, number, number]>;
  stumpSpots: ReadonlyArray<[number, number, number]>;
  quiverSpots: ReadonlyArray<[number, number, number]>;
  rockSpots: ReadonlyArray<{ x: number; z: number; y: number; url: string; ry: number; h: number }>;
  floraSpots: ReadonlyArray<{ x: number; z: number; y: number; url: string; ry: number; h: number }>;
  cartSpot: readonly [number, number];
  carSpot: readonly [number, number];
}) {
  return (
    <>
      {/* cordillera + acantilado como telón de horizonte */}
      {BACKDROP.map((b, i) => (
        <Suspense key={`b${i}`} fallback={null}>
          <group position={[b.x, b.y, b.z]} rotation={[0, b.ry, 0]}>
            <FitModel url={b.url} height={b.h} />
          </group>
        </Suspense>
      ))}

      {treeSpots.map(([x, z, ry], i) => (
        <Suspense key={`t${i}`} fallback={null}>
          <group position={[x, groundAt(x, z) - 0.05, z]} rotation={[0, ry, 0]}>
            <FitModel url={ASSET.trunk} height={2.4 + (i % 3) * 0.5} />
          </group>
        </Suspense>
      ))}
      {stumpSpots.map(([x, z, ry], i) => (
        <Suspense key={`s${i}`} fallback={null}>
          <group position={[x, groundAt(x, z) - 0.04, z]} rotation={[0, ry, 0]}>
            <FitModel url={ASSET.stump} height={1 + (i % 2) * 0.3} />
          </group>
        </Suspense>
      ))}
      {quiverSpots.map(([x, z, ry], i) => (
        <Suspense key={`q${i}`} fallback={null}>
          <group position={[x, groundAt(x, z) - 0.06, z]} rotation={[0, ry, 0]}>
            <FitModel url={ASSET.quiver} height={3.2 + (i % 2) * 0.7} />
          </group>
        </Suspense>
      ))}
      {rockSpots.map((r, i) => (
        <Suspense key={`r${i}`} fallback={null}>
          <group position={[r.x, r.y, r.z]} rotation={[0, r.ry, 0]}>
            <FitModel url={r.url} height={r.h} />
          </group>
        </Suspense>
      ))}
      {floraSpots.map((p, i) => (
        <Suspense key={`f${i}`} fallback={null}>
          <group position={[p.x, p.y, p.z]} rotation={[0, p.ry, 0]}>
            <FitModel url={p.url} height={p.h} />
          </group>
        </Suspense>
      ))}

      {/* carro cubierto estacionado en un alto */}
      <Suspense fallback={null}>
        <group
          position={[carSpot[0], groundAt(carSpot[0], carSpot[1]) - 0.06, carSpot[1]]}
          rotation={[0, -0.7, 0]}
        >
          <FitModel url={ASSET.car} height={2.1} />
        </group>
      </Suspense>

      {/* descanso junto a la baliza 'ceren' y banco junto a 'flores' */}
      <Suspense fallback={null}>
        <group
          position={[PICNIC_SPOTS.table[0], groundAt(PICNIC_SPOTS.table[0], PICNIC_SPOTS.table[1]) - 0.04, PICNIC_SPOTS.table[1]]}
          rotation={[0, 0.5, 0]}
        >
          <FitModel url={ASSET.table} height={0.95} />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group
          position={[PICNIC_SPOTS.bench[0], groundAt(PICNIC_SPOTS.bench[0], PICNIC_SPOTS.bench[1]) - 0.04, PICNIC_SPOTS.bench[1]]}
          rotation={[0, -1.1, 0]}
        >
          <FitModel url={ASSET.bench} height={0.85} />
        </group>
      </Suspense>

      <Suspense fallback={null}>
        <group
          position={[cartSpot[0], groundAt(cartSpot[0], cartSpot[1]) - 0.04, cartSpot[1]]}
          rotation={[0, 0.9, 0]}
        >
          <FitModel url={ASSET.cart} height={1.9} />
        </group>
      </Suspense>
    </>
  );
}

export default function ToursScene({ motion, hotspots, active, onSelect }: ModuleSceneProps) {
  const rootRef = useRef<THREE.Group>(null);
  const beaconRefs = useRef<Array<THREE.Group | null>>([]);
  const beaconLights = useRef<Array<THREE.PointLight | null>>([]);
  const beaconMats = useRef<Array<THREE.MeshStandardMaterial | null>>([]);
  const globeRef = useRef<THREE.Group>(null);
  const fieldRef = useRef<THREE.Points>(null);
  const waterMat = useRef<THREE.MeshStandardMaterial>(null);
  const waterRef = useRef<THREE.Mesh>(null);
  const terrainMat = useRef<THREE.MeshStandardMaterial>(null);
  const dirRef = useRef<THREE.DirectionalLight>(null);
  const ambRef = useRef<THREE.AmbientLight>(null);
  const fogRef = useRef<THREE.Fog>(null);
  const dashRef = useRef<Line2 | null>(null);
  const skyColor = useMemo(() => new THREE.Color(NIGHT), []);
  const skyTarget = useMemo(() => new THREE.Color(), []);
  const waterColor = useMemo(() => new THREE.Color(WATER_N), []);
  const waterTarget = useMemo(() => new THREE.Color(), []);
  const terrainColor = useMemo(() => new THREE.Color('#8f837a'), []);
  const terrainTarget = useMemo(() => new THREE.Color(), []);
  const [hoverBeacon, setHoverBeacon] = useState(-1);
  const cursor = useMeshCursor();

  const terrainGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(60, 60, 96, 96);
    const pos = g.getAttribute('position');
    const colors = new Float32Array(pos.count * 3);
    const sea = new THREE.Color('#1a3550');
    const low = new THREE.Color('#3a2a20');
    const mid = new THREE.Color('#5a4326');
    const high = new THREE.Color('#c98a2a');
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const h = terrainHeight(x, y);
      pos.setZ(i, h);
      if (h < -0.6) c.copy(sea);
      else if (h < 0.4) c.copy(low);
      else if (h < 1.8) c.copy(mid);
      else c.copy(high);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    g.computeVertexNormals();
    return g;
  }, []);
  useEffect(() => () => terrainGeo.dispose(), [terrainGeo]);

  const dustGeo = useParticleField([ORANGE, GOLD, PINK], 320, [12, 30], [-1, 9]);
  useEffect(() => () => dustGeo.dispose(), [dustGeo]);

  /* Spots reales filtrados por la altura real del terreno. */
  const treeSpots = useMemo(
    () => TREE_SPOTS.filter(([x, z]) => groundAt(x, z) > 0.3),
    []
  );
  const stumpSpots = useMemo(
    () => STUMP_SPOTS.filter(([x, z]) => groundAt(x, z) > -0.7),
    []
  );
  const quiverSpots = useMemo(
    () => QUIVER_SPOTS.filter(([x, z]) => groundAt(x, z) > 0.25),
    []
  );
  const rockSpots = useMemo(() => {
    const urls = [ASSET.rock2, ASSET.rock3, ASSET.rock4, ASSET.rock5, ASSET.rock7];
    const out: Array<{ x: number; z: number; y: number; url: string; ry: number; h: number }> = [];
    const rnd = seededRng(17);
    for (let i = 0; i < 90 && out.length < 14; i++) {
      const a = rnd() * Math.PI * 2;
      const r = 7 + rnd() * 20;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const g = groundAt(x, z);
      if (g > -1.6 && g < -0.7) {
        out.push({ x, z, y: g - 0.12, url: urls[i % urls.length], ry: rnd() * Math.PI * 2, h: 0.35 + rnd() * 0.45 });
      }
    }
    return out;
  }, []);
  /* Vegetación baja (arbusto/helecho/pasto) sobre terreno de altura media. */
  const floraSpots = useMemo(() => {
    const urls = [ASSET.shrub, ASSET.fern, ASSET.grass];
    const out: Array<{ x: number; z: number; y: number; url: string; ry: number; h: number }> = [];
    const rnd = seededRng(41);
    for (let i = 0; i < 120 && out.length < 16; i++) {
      const a = rnd() * Math.PI * 2;
      const r = 4 + rnd() * 20;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const g = groundAt(x, z);
      if (g > -0.2 && g < 1.8) {
        const kind = i % urls.length;
        out.push({
          x, z,
          y: g - 0.04,
          url: urls[kind],
          ry: rnd() * Math.PI * 2,
          h: kind === 2 ? 0.5 + rnd() * 0.3 : 0.4 + rnd() * 0.35,
        });
      }
    }
    return out;
  }, []);
  const cartSpot = useMemo(
    () => CART_CANDIDATES.find(([x, z]) => groundAt(x, z) > -0.6) ?? CART_CANDIDATES[0],
    []
  );
  const carSpot = useMemo(
    () => CAR_CANDIDATES.find(([x, z]) => groundAt(x, z) > 0.5) ?? CAR_CANDIDATES[0],
    []
  );

  // Ruta animada: baliza anterior → baliza seleccionada.
  const routePoints = useMemo(() => {
    if (active <= 0) return null;
    const a = hotspots[active - 1].position;
    const b = hotspots[active].position;
    const mid: [number, number, number] = [
      (a[0] + b[0]) / 2,
      Math.max(a[1], b[1]) + 2.2,
      (a[2] + b[2]) / 2,
    ];
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...a),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...b)
    );
    return curve.getPoints(40).map((v): [number, number, number] => [v.x, v.y, v.z]);
  }, [active, hotspots]);

  usePointerParallax(rootRef, motion, 0.08);
  useCameraDolly(
    motion,
    { heroPos: [0, 16, 34], nearPos: [0, 10, 22], targetY: 0.5 },
    hotspots.map((h) => h.position)
  );

  useFrame((_, delta) => {
    const t = motion.timeRef.current;
    const k = motion.stillRef.current ? 1 : dampFactor(delta);
    const day = motion.frameRef.current.day;
    skyTarget.set(day > 0.5 ? DAY : NIGHT);
    skyColor.lerp(skyTarget, k * 0.5);
    if (fogRef.current) fogRef.current.color.copy(skyColor);
    if (ambRef.current) ambRef.current.intensity += ((day > 0.5 ? 1.15 : 0.5) - ambRef.current.intensity) * k * 0.5;
    if (dirRef.current) dirRef.current.intensity += ((day > 0.5 ? 2.4 : 1.5) - dirRef.current.intensity) * k * 0.5;
    waterTarget.set(day > 0.5 ? WATER_D : WATER_N);
    waterColor.lerp(waterTarget, k * 0.5);
    if (waterMat.current) waterMat.current.color.copy(waterColor);
    terrainTarget.set(day > 0.5 ? '#ffffff' : '#8f837a');
    terrainColor.lerp(terrainTarget, k * 0.5);
    if (terrainMat.current) terrainMat.current.color.copy(terrainColor);
    if (waterRef.current && !motion.stillRef.current) {
      waterRef.current.position.y = -0.35 + Math.sin(t * 0.5) * 0.04;
    }
    if (globeRef.current && !motion.stillRef.current) globeRef.current.rotation.y += delta * 0.06;
    if (fieldRef.current && !motion.stillRef.current) fieldRef.current.rotation.y -= delta * 0.008;
    for (let i = 0; i < beaconRefs.current.length; i++) {
      const b = beaconRefs.current[i];
      if (!b) continue;
      const selected = i === active;
      const hover = i === hoverBeacon;
      const lift = selected ? 0.7 : hover ? 0.35 : 0;
      b.position.y += (-2 + lift + Math.sin(t * 1.4 + i * 1.3) * 0.08 - b.position.y) * k;
      const s = b.scale.x + ((selected ? 1.35 : hover ? 1.15 : 1) - b.scale.x) * k;
      b.scale.setScalar(s);
      const light = beaconLights.current[i];
      if (light) {
        const base = day > 0.5 ? 0.8 : 1.9;
        light.intensity += ((selected ? base * 2.2 : base) - light.intensity) * k;
      }
      const mat = beaconMats.current[i];
      if (mat) mat.emissiveIntensity += ((selected ? 1.4 : 0.4) - mat.emissiveIntensity) * k;
    }
    // línea de ruta: guionado animado
    const line = dashRef.current as (Line2 & {
      material: LineMaterial;
    }) | null;
    if (line && !motion.stillRef.current) {
      line.material.dashOffset -= delta * 0.6;
    }
  });

  return (
    <>
      <fog ref={fogRef} attach="fog" args={[NIGHT, 30, 90]} />
      <ambientLight ref={ambRef} intensity={0.5} />
      <directionalLight ref={dirRef} position={[10, 18, 8]} intensity={1.5} color="#ffd9b0" />
      <pointLight position={[-12, 6, 4]} intensity={20} distance={34} decay={2} color={ORANGE} />

      <Stars radius={70} depth={30} count={1800} factor={3.4} saturation={0.35} fade speed={0.5} />
      <Sparkles count={70} scale={[36, 12, 36]} size={2.4} speed={0.3} color={ORANGE} opacity={0.5} />

      <group ref={rootRef} position={[0, -3.4, 0]}>
        {/* terreno procedural con arena aérea PBR real */}
        <Suspense fallback={null}>
          <TerrainMesh geo={terrainGeo} matRef={terrainMat} />
        </Suspense>

        {/* paisaje real: cordillera, troncos, carcavas, rocas, flora, vehículos */}
        <RealLandscape
          treeSpots={treeSpots}
          stumpSpots={stumpSpots}
          quiverSpots={quiverSpots}
          rockSpots={rockSpots}
          floraSpots={floraSpots}
          cartSpot={cartSpot}
          carSpot={carSpot}
        />

        {/* mar */}
        <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0]}>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial
            ref={waterMat}
            color={WATER_N}
            transparent
            opacity={0.55}
            roughness={0.15}
            metalness={0.5}
          />
        </mesh>

        {/* volcanes — el mayor lleva corona de lava */}
        <group position={[-11, -0.8, -6]}>
          <mesh position={[0, 1.9, 0]}>
            <coneGeometry args={[3.2, 4.6, 7]} />
            <meshStandardMaterial color="#2e2226" flatShading roughness={0.85} />
          </mesh>
          <mesh position={[0, 4.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.55, 0.09, 8, 24]} />
            <meshBasicMaterial color={ORANGE} toneMapped={false} />
          </mesh>
          <mesh position={[0, 4.2, 0]}>
            <sphereGeometry args={[0.28, 12, 12]} />
            <meshBasicMaterial color={GOLD} toneMapped={false} />
          </mesh>
        </group>
        <mesh position={[-3, 0.2, -12]}>
          <coneGeometry args={[1.9, 2.4, 7]} />
          <meshStandardMaterial color="#33262b" flatShading roughness={0.85} />
        </mesh>

        {/* lago */}
        <mesh position={[8, 0.18, -10]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.6, 28]} />
          <meshStandardMaterial color="#1d5f7a" transparent opacity={0.85} roughness={0.1} metalness={0.4} />
        </mesh>

        {/* balizas-destino (clic = hotspot) */}
        {hotspots.map((h, i) => (
          <group
            key={h.id}
            ref={(el) => {
              beaconRefs.current[i] = el;
            }}
            position={[h.position[0], -2, h.position[2]]}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(i);
            }}
            onPointerOver={(e) => {
              cursor.over(e);
              setHoverBeacon(i);
            }}
            onPointerOut={() => {
              cursor.out();
              setHoverBeacon(-1);
            }}
          >
            <mesh position={[0, 1.1, 0]}>
              <coneGeometry args={[0.5, 2.2, 12]} />
              <meshStandardMaterial
                ref={(m) => {
                  beaconMats.current[i] = m;
                }}
                color={[ORANGE, '#1d8fbf', PINK, GOLD, '#ff8844'][i]}
                emissive={[ORANGE, '#1d8fbf', PINK, GOLD, '#ff8844'][i]}
                emissiveIntensity={0.4}
                transparent
                opacity={0.9}
              />
            </mesh>
            <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.8, 0.92, 40]} />
              <meshBasicMaterial color={ORANGE} transparent opacity={0.5} toneMapped={false} side={THREE.DoubleSide} />
            </mesh>
            <pointLight ref={(l) => { beaconLights.current[i] = l; }} position={[0, 2.6, 0]} intensity={1.6} distance={14} decay={2} color={[ORANGE, '#4db8e8', PINK, GOLD, '#ff8844'][i]} />
          </group>
        ))}

        {/* marcadores Html por encima de las balizas */}
        {hotspots.map((h, i) => (
          <HotspotMarker
            key={h.id}
            index={i}
            position={[h.position[0], 2.1, h.position[2]]}
            label={h.label}
            accent={ORANGE}
            motion={motion}
            selected={active === i}
            onSelect={onSelect}
          />
        ))}

        {/* ruta animada baliza anterior → seleccionada */}
        {routePoints && (
          <Line
            ref={(l) => {
              dashRef.current = l as Line2 | null;
            }}
            points={routePoints}
            color={GOLD}
            lineWidth={1.6}
            dashed
            dashScale={6}
            dashSize={0.7}
            gapSize={0.45}
            transparent
            opacity={0.85}
          />
        )}

        {/* globo de rutas al fondo */}
        <group ref={globeRef} position={[0, 11, -16]}>
          <mesh>
            <sphereGeometry args={[4.2, 40, 40]} />
            <meshStandardMaterial color="#102044" emissive="#061224" metalness={0.25} transparent opacity={0.62} />
          </mesh>
          <mesh>
            <sphereGeometry args={[4.28, 20, 20]} />
            <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.16} />
          </mesh>
          {Array.from({ length: 7 }, (_, i) => (
            <mesh key={i} rotation={[Math.PI / 2 + i * 0.12, 0, i * 0.35]}>
              <torusGeometry args={[5.1 + i * 0.42, 0.016, 8, 120]} />
              <meshBasicMaterial color={i % 2 ? PINK : ORANGE} transparent opacity={0.2} toneMapped={false} />
            </mesh>
          ))}
        </group>

        {/* nubes suaves */}
        {[
          [-12, 6.5, -8],
          [9, 7.5, -12],
          [16, 5.6, 2],
          [-18, 6, 8],
          [2, 8.5, 6],
          [-4, 6.8, -16],
        ].map((p, i) => (
          <Float key={i} speed={0.5 + (i % 3) * 0.2} floatIntensity={0.8} rotationIntensity={0}>
            <mesh position={p as [number, number, number]} scale={[2.4 + (i % 3), 0.4, 1.4 + (i % 2)]}>
              <sphereGeometry args={[1, 16, 12]} />
              <meshStandardMaterial color="#3d2a44" transparent opacity={0.4} roughness={1} />
            </mesh>
          </Float>
        ))}

        {/* polvo ambiental */}
        <points ref={fieldRef} geometry={dustGeo}>
          <pointsMaterial
            size={0.05}
            vertexColors
            transparent
            opacity={0.65}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </>
  );
}
