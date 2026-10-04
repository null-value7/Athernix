'use client';

// ═══════════════════════════════════════════════════════════
// ESCENA — MENTE LIBRE VR
// Dos hemisferios deformados, 60 neuronas con pulsos sinápticos
// cada ~1.2s, ola radial al clicar el cerebro (10 pulsos),
// 9 anillos de respiración y guía INHALA/EXHALA sincronizada.
// Los tres entornos lerpean luz, niebla y partículas.
// ═══════════════════════════════════════════════════════════

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { Stars } from '@react-three/drei/core/Stars';
import { Sparkles } from '@react-three/drei/core/Sparkles';
import { Float } from '@react-three/drei/core/Float';
import { Html } from '@react-three/drei/web/Html';
import { useGLTF } from '@react-three/drei/core/Gltf';
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as THREE from 'three';
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

const GOLD = '#FFD700';
const ORANGE = '#FF6B00';
const PINK = '#FF006E';

// entornos terapéuticos → paleta de luz / niebla
const ENV = [
  { light: '#8fd0ff', fog: '#04121c', spark: '#8fd0ff' }, // playa serena
  { light: '#7ee0a8', fog: '#05140c', spark: '#7ee0a8' }, // bosque nublado
  { light: '#b48cff', fog: '#0a0214', spark: '#ffd76b' }, // cielo nocturno
];
const PULSE_N = 14;

const BRAIN_URL = assetUrl('/models/brain.glb');
useGLTF.preload(BRAIN_URL);

/* ── Entornos calmantes reales (CC0 Poly Haven, 1k) ── */
const PH = '/models/ph/';
const PROPS = {
  potted: assetUrl(`${PH}potted_plant_01/potted_plant_01_1k.gltf`),
  calathea: assetUrl(`${PH}calathea_orbifolia_01/calathea_orbifolia_01_1k.gltf`),
  fern: assetUrl(`${PH}fern_02/fern_02_1k.gltf`),
  lantern1: assetUrl(`${PH}Lantern_01/Lantern_01_1k.gltf`),
  lantern2: assetUrl(`${PH}wooden_lantern_01/wooden_lantern_01_1k.gltf`),
  candles: assetUrl(`${PH}brass_candleholders/brass_candleholders_1k.gltf`),
  moss: assetUrl(`${PH}moss_01/moss_01_1k.gltf`),
} as const;
Object.values(PROPS).forEach((u) => useGLTF.preload(u));

interface Pulse {
  curve: THREE.CatmullRomCurve3 | null;
  t0: number;
  active: boolean;
}

/* Cerebro real (brain.glb): centrado vía Box3, escala a ~4.5 de ancho,
   material físico rosa-dorado con clearcoat + sheen. Suspende solo él. */
function RealBrain() {
  const { scene } = useGLTF(BRAIN_URL);
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#e88bb0',
        roughness: 0.45,
        clearcoat: 0.5,
        clearcoatRoughness: 0.35,
        sheen: 0.6,
        sheenColor: new THREE.Color('#ffd700'),
        emissive: new THREE.Color('#ff4d94'),
        emissiveIntensity: 0.15,
      }),
    []
  );
  // El material es nuestro (no viene del GLB) → sí se libera al desmontar.
  useEffect(() => () => material.dispose(), [material]);

  const fitted = useMemo(() => {
    const c = skeletonClone(scene);
    c.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(c);
    const size = box.getSize(new THREE.Vector3());
    const k = size.x > 0 ? 4.5 / size.x : 1;
    c.scale.setScalar(k);
    c.updateWorldMatrix(true, true);
    const b2 = new THREE.Box3().setFromObject(c);
    c.position.set(
      -(b2.min.x + b2.max.x) / 2,
      -(b2.min.y + b2.max.y) / 2,
      -(b2.min.z + b2.max.z) / 2
    );
    c.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) m.material = material;
    });
    return c;
  }, [scene, material]);

  return <primitive object={fitted} />;
}

/* Entorno de calma real: plantas, faroles con luz cálida y musgo
   bajo el cerebro. Todo suspende por pieza; nada opaca al héroe. */
function CalmProps() {
  return (
    <>
      {/* alfombra de musgo bajo el cerebro */}
      <Suspense fallback={null}>
        <group position={[0, -1.66, 0]}>
          <FitModel url={PROPS.moss} height={0.22} />
        </group>
      </Suspense>

      {/* plantas en maceta a los flancos */}
      <Suspense fallback={null}>
        <group position={[-4.4, -1.62, 2.6]} rotation={[0, 0.5, 0]}>
          <FitModel url={PROPS.potted} height={1.05} />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[4.3, -1.62, 2.0]} rotation={[0, -0.4, 0]}>
          <FitModel url={PROPS.calathea} height={0.85} />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[3.9, -1.62, -3.2]} rotation={[0, 1.2, 0]}>
          <FitModel url={PROPS.fern} height={0.55} />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[-4.2, -1.62, -2.8]} rotation={[0, 2.0, 0]}>
          <FitModel url={PROPS.fern} height={0.5} />
        </group>
      </Suspense>

      {/* faroles con luz cálida propia */}
      <Suspense fallback={null}>
        <group position={[-2.8, -1.62, 4.0]}>
          <FitModel url={PROPS.lantern1} height={0.5} />
          <pointLight position={[0, 0.55, 0]} intensity={3} distance={7} decay={2} color="#ffb84d" />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[2.7, -1.62, 4.3]} rotation={[0, 0.8, 0]}>
          <FitModel url={PROPS.lantern2} height={0.55} />
          <pointLight position={[0, 0.6, 0]} intensity={3} distance={7} decay={2} color="#ffc36b" />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[0, -1.62, -4.3]} rotation={[0, 0.3, 0]}>
          <FitModel url={PROPS.candles} height={0.45} />
          <pointLight position={[0, 0.5, 0]} intensity={2.2} distance={5.5} decay={2} color="#ffca7a" />
        </group>
      </Suspense>
    </>
  );
}

export default function MindScene({
  motion,
  hotspots,
  active,
  onSelect,
  still,
}: ModuleSceneProps & { still: boolean }) {
  const rootRef = useRef<THREE.Group>(null);
  const brainScaleRef = useRef<THREE.Group>(null);
  const pulseRefs = useRef<Array<THREE.Mesh | null>>([]);
  const pulses = useRef<Pulse[]>(
    Array.from({ length: PULSE_N }, () => ({ curve: null, t0: 0, active: false }))
  );
  const waveRef = useRef<THREE.Mesh>(null);
  const waveMat = useRef<THREE.MeshBasicMaterial>(null);
  const waveT = useRef(-10);
  const nextSynapse = useRef(1.2);
  const guideRef = useRef<THREE.Mesh>(null);
  const breathRings = useRef<Array<THREE.Mesh | null>>([]);
  const breathMats = useRef<Array<THREE.MeshBasicMaterial | null>>([]);
  const ambRef = useRef<THREE.AmbientLight>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const fogRef = useRef<THREE.Fog>(null);
  const sparkColor = useMemo(() => new THREE.Color('#ffd76b'), []);
  const sparkTarget = useMemo(() => new THREE.Color(), []);
  const lightTarget = useMemo(() => new THREE.Color(), []);
  const fieldMat = useRef<THREE.PointsMaterial>(null);
  const fieldRef = useRef<THREE.Points>(null);
  const [inhale, setInhale] = useState(true);
  const cursor = useMeshCursor();

  const neurons = useMemo(() => {
    const rnd = seededRng(31);
    return Array.from({ length: 60 }, () => {
      const a = rnd() * Math.PI * 2;
      const b = Math.acos(2 * rnd() - 1);
      const r = 0.35 + rnd() * 0.85;
      return new THREE.Vector3(
        Math.sin(b) * Math.cos(a) * 3.4 * r,
        Math.cos(b) * 1.15 * r,
        Math.sin(b) * Math.sin(a) * 1.9 * r
      );
    });
  }, []);

  const neuronGeo = useMemo(() => new THREE.SphereGeometry(0.05, 8, 8), []);
  useEffect(() => () => neuronGeo.dispose(), [neuronGeo]);

  const dustGeo = useParticleField(['#ffd76b', GOLD, ORANGE], 340, [6, 18], [-3, 8]);
  useEffect(() => () => dustGeo.dispose(), [dustGeo]);

  usePointerParallax(rootRef, motion, 0.08);
  useCameraDolly(
    motion,
    { heroPos: [8, 5.5, 12], nearPos: [4.5, 3.4, 7.5], targetY: 0.6 },
    hotspots.map((h) => h.position)
  );

  const firePulse = (a: THREE.Vector3, b: THREE.Vector3, now: number) => {
    const mid = a
      .clone()
      .add(b)
      .multiplyScalar(0.5)
      .add(new THREE.Vector3(0, 0.5 + Math.random() * 0.6, 0));
    const curve = new THREE.CatmullRomCurve3([a, mid, b]);
    const slot = pulses.current.find((p) => !p.active);
    if (slot) {
      slot.curve = curve;
      slot.t0 = now;
      slot.active = true;
    }
  };

  const brainClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const now = motion.timeRef.current;
    waveT.current = now;
    for (let i = 0; i < 10; i++) {
      const a = neurons[(Math.random() * neurons.length) | 0];
      let b = neurons[(Math.random() * neurons.length) | 0];
      if (a === b) b = neurons[(Math.random() * neurons.length) | 0];
      firePulse(a, b, now);
    }
  };

  useFrame((_, delta) => {
    const t = motion.timeRef.current;
    const k = motion.stillRef.current ? 1 : dampFactor(delta);

    // entorno seleccionado → luz/niebla/partículas (~1s)
    const env = active >= 0 && active < 3 ? ENV[active] : null;
    lightTarget.set(env ? env.light : '#fff0d0');
    sparkTarget.set(env ? env.spark : '#ffd76b');
    sparkColor.lerp(sparkTarget, k * 0.5);
    if (ambRef.current) {
      ambRef.current.color.lerp(lightTarget, k * 0.5);
      ambRef.current.intensity += ((env ? 0.85 : 0.7) - ambRef.current.intensity) * k;
    }
    if (keyRef.current) keyRef.current.color.lerp(lightTarget, k * 0.4);
    if (fogRef.current) {
      const f = new THREE.Color(env ? env.fog : '#0a0108');
      fogRef.current.color.lerp(f, k * 0.5);
    }
    if (fieldMat.current) fieldMat.current.color.lerp(sparkColor, k);
    if (fieldRef.current && !motion.stillRef.current) fieldRef.current.rotation.y += delta * 0.01;

    // respiración 8s: 4s inhala / 4s exhala
    const phase = (t % 8) / 8;
    const breathe = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
    const nowInhale = phase < 0.5;
    if (nowInhale !== inhale) setInhale(nowInhale);
    if (guideRef.current) {
      const s = still ? 1.15 : 0.85 + breathe * 0.55;
      guideRef.current.scale.setScalar(s);
    }
    for (let i = 0; i < breathRings.current.length; i++) {
      const ring = breathRings.current[i];
      const mat = breathMats.current[i];
      if (!ring || !mat) continue;
      const off = still ? 0 : Math.sin(t * 0.9 - i * 0.42) * 0.12;
      ring.scale.setScalar(1 + off);
      mat.opacity = 0.14 + (still ? 0 : (0.5 + Math.sin(t * 0.9 - i * 0.42) * 0.5) * 0.16);
    }

    // latido suave del cerebro
    if (brainScaleRef.current && !motion.stillRef.current) {
      brainScaleRef.current.scale.setScalar(1 + Math.sin(t * 1.6) * 0.025);
    }

    // sinapsis periódica
    if (!motion.stillRef.current && t > nextSynapse.current) {
      nextSynapse.current = t + 1.2;
      const a = neurons[(Math.random() * neurons.length) | 0];
      let b = neurons[(Math.random() * neurons.length) | 0];
      if (a === b) b = neurons[(Math.random() * neurons.length) | 0];
      firePulse(a, b, t);
    }

    // viaje de los pulsos
    for (let i = 0; i < PULSE_N; i++) {
      const mesh = pulseRefs.current[i];
      const p = pulses.current[i];
      if (!mesh || !p) continue;
      if (!p.active || !p.curve) {
        mesh.visible = false;
        continue;
      }
      const u = (t - p.t0) / 0.6;
      if (u >= 1 || u < 0) {
        p.active = false;
        mesh.visible = false;
        continue;
      }
      mesh.visible = true;
      const pt = p.curve.getPointAt(u);
      mesh.position.copy(pt);
      mesh.scale.setScalar(0.5 + Math.sin(u * Math.PI) * 1);
    }

    // ola radial tras clic en el cerebro
    const waveAge = t - waveT.current;
    if (waveRef.current && waveMat.current) {
      if (waveAge >= 0 && waveAge < 1.2) {
        waveRef.current.visible = true;
        waveRef.current.scale.setScalar(0.5 + waveAge * 6);
        waveMat.current.opacity = (1 - waveAge / 1.2) * 0.8;
      } else {
        waveRef.current.visible = false;
      }
    }
  });

  return (
    <>
      <fog ref={fogRef} attach="fog" args={['#0a0108', 16, 40]} />
      <ambientLight ref={ambRef} intensity={0.7} color="#fff0d0" />
      <directionalLight ref={keyRef} position={[8, 12, 8]} intensity={1.5} color="#fff0d0" />
      <pointLight position={[-8, 3, 6]} intensity={20} distance={26} decay={2} color={GOLD} />
      <pointLight position={[6, 6, -5]} intensity={14} distance={24} decay={2} color={PINK} />

      <Stars radius={60} depth={30} count={1500} factor={3} saturation={0.4} fade speed={0.5} />
      <Sparkles count={70} scale={[26, 10, 26]} size={2.4} speed={0.3} color={envSpark(active)} opacity={0.5} />

      <group ref={rootRef}>
        {/* cerebro real (brain.glb) dentro del mismo grupo clicable */}
        <Float speed={0.7} floatIntensity={0.5} rotationIntensity={0}>
          <group
            onClick={brainClick}
            onPointerOver={cursor.over}
            onPointerOut={cursor.out}
          >
            <group ref={brainScaleRef} position={[0, 0.4, 0]}>
              <Suspense fallback={null}>
                <RealBrain />
              </Suspense>
            </group>
            {/* núcleo dorado latente tras la corteza */}
            <mesh position={[0, 0.38, 0]}>
              <sphereGeometry args={[0.42, 20, 16]} />
              <meshBasicMaterial color={GOLD} toneMapped={false} transparent opacity={0.6} />
            </mesh>
          </group>
        </Float>

        {/* ola radial del clic */}
        <mesh ref={waveRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.4, 0]} visible={false}>
          <torusGeometry args={[1, 0.03, 8, 80]} />
          <meshBasicMaterial ref={waveMat} color={GOLD} transparent toneMapped={false} depthWrite={false} />
        </mesh>

        {/* neuronas */}
        {neurons.map((p, i) => (
          <mesh key={i} position={p} geometry={neuronGeo}>
            <meshStandardMaterial
              color="#fff0c8"
              emissive={GOLD}
              emissiveIntensity={0.9}
              roughness={0.3}
            />
          </mesh>
        ))}

        {/* pulsos sinápticos */}
        {Array.from({ length: PULSE_N }, (_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              pulseRefs.current[i] = el;
            }}
            visible={false}
          >
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshBasicMaterial color={GOLD} toneMapped={false} />
          </mesh>
        ))}

        {/* 9 anillos concéntricos de respiración */}
        {Array.from({ length: 9 }, (_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              breathRings.current[i] = el;
            }}
            position={[0, -1.6 + i * 0.02, 0]}
            rotation={[Math.PI / 2, 0, i * 0.1]}
          >
            <torusGeometry args={[2.4 + i * 0.55, 0.012, 8, 90]} />
            <meshBasicMaterial
              ref={(m) => {
                breathMats.current[i] = m;
              }}
              color={i % 3 === 0 ? PINK : i % 3 === 1 ? ORANGE : GOLD}
              transparent
              opacity={0.16}
              toneMapped={false}
              depthWrite={false}
            />
          </mesh>
        ))}

        {/* entorno calmante real alrededor del héroe */}
        <CalmProps />

        {/* guía de respiración */}
        <mesh ref={guideRef} position={[0, -0.4, 3.6]}>
          <torusGeometry args={[1, 0.045, 12, 90]} />
          <meshBasicMaterial color={GOLD} transparent opacity={0.85} toneMapped={false} />
        </mesh>
        <Html position={[0, -0.4, 3.6]} center distanceFactor={11} zIndexRange={[30, 10]}>
          <div className="md-breath-label">{still ? 'RESPIRA' : inhale ? 'INHALA' : 'EXHALA'}</div>
        </Html>

        {/* polvo ambiental */}
        <points ref={fieldRef} geometry={dustGeo}>
          <pointsMaterial
            ref={fieldMat}
            size={0.05}
            vertexColors
            transparent
            opacity={0.7}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* marcadores */}
        {hotspots.map((h, i) => (
          <HotspotMarker
            key={h.id}
            index={i}
            position={h.position}
            label={h.label}
            accent={i < 3 ? ENV[i].light : GOLD}
            motion={motion}
            selected={active === i}
            onSelect={onSelect}
          />
        ))}
      </group>
    </>
  );
}

// color de las chispas según entorno activo (prop reactiva)
function envSpark(active: number) {
  return active >= 0 && active < 3 ? ENV[active].spark : '#ffd76b';
}
