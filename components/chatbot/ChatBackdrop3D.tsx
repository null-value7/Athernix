'use client';

import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const PALETTE = ['#FF6B00', '#FF006E', '#FFD700'];

// Mouse global (el canvas tiene pointer-events:none)
const mouse = { x: 0, y: 0 };
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

// Estado de energía compartido dentro de la escena
interface Energy { current: number; burst: number }

function NeuralNetwork({ energy }: { energy: React.MutableRefObject<Energy> }) {
  const group = useRef<THREE.Group>(null);

  const { nodeGeo, lineGeo } = useMemo(() => {
    const count = 140;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = PALETTE.map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 36;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const linePositions: number[] = [];
    for (let i = 0; i < count; i++) {
      const ax = positions[i * 3], ay = positions[i * 3 + 1], az = positions[i * 3 + 2];
      for (let j = i + 1; j < count; j++) {
        const bx = positions[j * 3], by = positions[j * 3 + 1], bz = positions[j * 3 + 2];
        if (Math.hypot(ax - bx, ay - by, az - bz) < 5.5) linePositions.push(ax, ay, az, bx, by, bz);
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    return { nodeGeo, lineGeo };
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    const e = energy.current.current + energy.current.burst;
    group.current.rotation.y += delta * 0.05 * e;
    group.current.rotation.y += mouse.x * 0.0015;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -mouse.y * 0.1, 3, delta);
    // En burst la red se contrae un instante (efecto "latido")
    const s = 1 - energy.current.burst * 0.08;
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, s, 6, delta));
  });

  return (
    <group ref={group}>
      <points geometry={nodeGeo}>
        <pointsMaterial size={0.14} vertexColors transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#ff6b35" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

function CoreSun({ energy }: { energy: React.MutableRefObject<Energy> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const cHot = useMemo(() => new THREE.Color('#ff006e'), []);
  const cIdle = useMemo(() => new THREE.Color('#a02838'), []);
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const e = energy.current.current;
    const burst = energy.current.burst;
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.12 * (e + burst * 2);
      mesh.current.rotation.x = Math.sin(t * 0.2) * 0.2;
      const pulse = 1 + Math.sin(t * (1.4 + e)) * 0.025 + burst * 0.1;
      mesh.current.scale.setScalar(THREE.MathUtils.damp(mesh.current.scale.x, pulse, 8, delta));
      const mat = mesh.current.material as unknown as { distort: number; speed: number; emissive: THREE.Color; emissiveIntensity: number };
      tmp.copy(cIdle).lerp(cHot, Math.min(1, (e - 1) / 2 + burst));
      mat.emissive.copy(tmp);
      mat.emissiveIntensity = 0.6 + e * 0.35 + burst * 0.9;
      mat.distort = THREE.MathUtils.damp(mat.distort, 0.32 + e * 0.07 + burst * 0.25, 4, delta);
      mat.speed = 1.8 + e * 1.1;
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.08 * e;
      shell.current.rotation.z += delta * 0.05 * e;
      const sm = shell.current.material as THREE.MeshBasicMaterial;
      sm.opacity = 0.08 + e * 0.05 + burst * 0.2;
    }
    if (halo.current) {
      const hm = halo.current.material as THREE.MeshBasicMaterial;
      hm.opacity = 0.05 + Math.sin(t * 1.2) * 0.015 + burst * 0.12;
      halo.current.scale.setScalar(1 + burst * 0.3 + Math.sin(t * 0.9) * 0.03);
    }
  });

  return (
    <group position={[0, 0.5, -6]}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[4.4, 20]} />
        <MeshDistortMaterial color="#1a0208" emissive="#a02838" emissiveIntensity={0.9} distort={0.35} speed={2} roughness={0.25} metalness={0.6} />
      </mesh>
      <mesh ref={shell} scale={1.16}>
        <icosahedronGeometry args={[4.4, 1]} />
        <meshBasicMaterial color="#FF6B00" wireframe transparent opacity={0.1} />
      </mesh>
      {/* Halo exterior suave */}
      <mesh ref={halo} scale={1.45}>
        <icosahedronGeometry args={[4.4, 2]} />
        <meshBasicMaterial color="#FF006E" wireframe transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight color="#FF006E" intensity={14} distance={30} />
    </group>
  );
}

// Onda expansiva al llegar/enviar mensaje
function Shockwave({ energy }: { energy: React.MutableRefObject<Energy> }) {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const prog = useRef(1.01);
  const lastBurst = useRef(0);

  useFrame((_, delta) => {
    if (energy.current.burst > lastBurst.current + 0.05) prog.current = 0;
    lastBurst.current = energy.current.burst;
    if (prog.current <= 1) prog.current = Math.min(1.01, prog.current + delta * 0.9);
    const p = prog.current;
    const ease = 1 - Math.pow(1 - p, 3);
    [r1, r2].forEach((r, i) => {
      if (!r.current) return;
      const lp = Math.min(1, Math.max(0, p - i * 0.14) / (1 - i * 0.14));
      const e2 = 1 - Math.pow(1 - lp, 3);
      r.current.scale.setScalar(1 + e2 * 9);
      (r.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, (1 - lp) * 0.5);
      r.current.rotation.z += delta * 0.4;
    });
    void ease;
  });

  return (
    <group position={[0, 0.5, -6]} rotation={[Math.PI / 2.6, 0, 0]}>
      <mesh ref={r1}>
        <torusGeometry args={[5.6, 0.05, 8, 128]} />
        <meshBasicMaterial color="#FF006E" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[6.2, 0.03, 8, 128]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

// Satélites orbitando el núcleo — aceleran con la energía
function Satellites({ energy }: { energy: React.MutableRefObject<Energy> }) {
  const group = useRef<THREE.Group>(null);
  const orbit = useRef(0);

  const sats = useMemo(() => [
    { r: 6.8, size: 0.16, color: '#FFD700', speed: 0.55, tilt: 0.5, phase: 0 },
    { r: 7.5, size: 0.12, color: '#FF6B00', speed: 0.4, tilt: -0.9, phase: 2.1 },
    { r: 8.3, size: 0.2, color: '#FF006E', speed: 0.3, tilt: 1.4, phase: 4.2 },
    { r: 6.2, size: 0.1, color: '#FF6B00', speed: 0.7, tilt: 0.9, phase: 5.3 },
    { r: 9, size: 0.14, color: '#FFD700', speed: 0.25, tilt: -0.4, phase: 1.2 },
  ], []);

  useFrame((_, delta) => {
    orbit.current += delta * energy.current.current * 0.6;
    if (!group.current) return;
    group.current.children.forEach((sat, i) => {
      const s = sats[i];
      const a = orbit.current * s.speed * 3 + s.phase;
      sat.position.set(
        Math.cos(a) * s.r,
        Math.sin(a) * s.r * Math.sin(s.tilt),
        Math.sin(a) * s.r * Math.cos(s.tilt) * 0.4,
      );
      const m = (sat as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
      if (m) m.opacity = 0.5 + Math.sin(a * 3) * 0.3 + energy.current.burst * 0.4;
    });
  });

  return (
    <group ref={group} position={[0, 0.5, -6]}>
      {sats.map((s, i) => (
        <mesh key={i}>
          <sphereGeometry args={[s.size, 12, 12]} />
          <meshBasicMaterial color={s.color} transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function OrbitRings({ energy }: { energy: React.MutableRefObject<Energy> }) {
  const g1 = useRef<THREE.Group>(null);
  const g2 = useRef<THREE.Group>(null);
  const g3 = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const e = energy.current.current + energy.current.burst;
    if (g1.current) g1.current.rotation.z += delta * 0.35 * e;
    if (g2.current) { g2.current.rotation.x += delta * 0.22 * e; g2.current.rotation.y += delta * 0.12 * e; }
    if (g3.current) g3.current.rotation.y -= delta * 0.18 * e;
  });

  return (
    <group position={[0, 0.5, -6]}>
      <group ref={g1} rotation={[Math.PI / 2.4, 0, 0]}>
        <mesh>
          <torusGeometry args={[6.4, 0.02, 8, 128]} />
          <meshBasicMaterial color="#FF6B00" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
      <group ref={g2} rotation={[Math.PI / 1.7, 0.4, 0]}>
        <mesh>
          <torusGeometry args={[7.6, 0.015, 8, 128]} />
          <meshBasicMaterial color="#FF006E" transparent opacity={0.28} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
      <group ref={g3} rotation={[0.3, 0, Math.PI / 3]}>
        <mesh>
          <torusGeometry args={[8.8, 0.012, 8, 128]} />
          <meshBasicMaterial color="#FFD700" transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

const DEBRIS: { pos: [number, number, number]; geo: 'ico' | 'octa' | 'torus' | 'knot'; color: string; speed: number; scale: number }[] = [
  { pos: [-11, 3.5, -4], geo: 'ico', color: '#FF6B00', speed: 1.4, scale: 0.55 },
  { pos: [10.5, -2.5, -3], geo: 'octa', color: '#FF006E', speed: 1.8, scale: 0.7 },
  { pos: [-9, -4, -6], geo: 'torus', color: '#FFD700', speed: 1.1, scale: 0.5 },
  { pos: [12, 4.5, -7], geo: 'knot', color: '#FF6B00', speed: 1.6, scale: 0.45 },
  { pos: [-13, 0.5, -8], geo: 'octa', color: '#FF006E', speed: 1.2, scale: 0.8 },
  { pos: [8, -4.5, -5], geo: 'ico', color: '#FFD700', speed: 2, scale: 0.4 },
  { pos: [-6, 5.5, -9], geo: 'torus', color: '#FF006E', speed: 0.9, scale: 0.6 },
  { pos: [6.5, 5, -4.5], geo: 'knot', color: '#FF006E', speed: 1.5, scale: 0.35 },
  { pos: [14, -1, -9], geo: 'ico', color: '#FF6B00', speed: 1.3, scale: 0.5 },
  { pos: [-4, -5.5, -7], geo: 'octa', color: '#FFD700', speed: 1.7, scale: 0.45 },
];

function DebrisField({ energy }: { energy: React.MutableRefObject<Energy> }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    const e = energy.current.current;
    group.current.traverse((obj) => {
      const m = (obj as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      if (m && 'emissiveIntensity' in m) {
        m.emissiveIntensity = THREE.MathUtils.damp(m.emissiveIntensity, 0.5 + e * 0.35, 4, delta);
      }
    });
  });

  return (
    <group ref={group}>
      {DEBRIS.map((d, i) => (
        <Float key={i} speed={d.speed} rotationIntensity={1.6} floatIntensity={2.2} position={d.pos}>
          <mesh scale={d.scale}>
            {d.geo === 'ico' && <icosahedronGeometry args={[1, 0]} />}
            {d.geo === 'octa' && <octahedronGeometry args={[1, 0]} />}
            {d.geo === 'torus' && <torusGeometry args={[1, 0.28, 12, 32]} />}
            {d.geo === 'knot' && <torusKnotGeometry args={[0.8, 0.24, 64, 12]} />}
            <meshStandardMaterial color="#0a040c" emissive={d.color} emissiveIntensity={0.7} wireframe transparent opacity={0.8} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function CameraRig({ energy }: { energy: React.MutableRefObject<Energy> }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const e = energy.current.current;
    const k = 1 - Math.exp(-delta * 2.5);
    camera.position.x += (mouse.x * (1.2 + e * 0.5) - camera.position.x) * k;
    camera.position.y += (mouse.y * (0.9 + e * 0.3) - camera.position.y) * k;
    // Zoom punch sutil en burst
    const targetZ = 18 - energy.current.burst * 1.2;
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 5, delta);
    camera.lookAt(0, 0, -4);
  });
  return null;
}

export default function ChatBackdrop3D({ thinking = false, typing = false, pulse = 0 }: { thinking?: boolean; typing?: boolean; pulse?: number }) {
  const energy = useRef<Energy>({ current: 1, burst: 0 });
  const lastPulse = useRef(pulse);
  const bloomRef = useRef<any>(null);
  const [visible, setVisible] = useState(true);

  // Pausar render cuando la pestaña está oculta
  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Cada mensaje nuevo dispara un burst
  useEffect(() => {
    if (pulse !== lastPulse.current) {
      lastPulse.current = pulse;
      energy.current.burst = Math.min(1.4, energy.current.burst + 1);
    }
  }, [pulse]);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 18], fov: 55 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <EnergyDriver energy={energy} thinking={thinking} typing={typing} bloomRef={bloomRef} />
        <ambientLight intensity={0.4} />
        <NeuralNetwork energy={energy} />
        <CoreSun energy={energy} />
        <Shockwave energy={energy} />
        <OrbitRings energy={energy} />
        <Satellites energy={energy} />
        <DebrisField energy={energy} />
        <Sparkles count={90} scale={[34, 20, 18]} size={2.4} speed={0.4} color="#FFD700" opacity={0.55} />
        <Sparkles count={50} scale={[30, 16, 14]} size={3.2} speed={0.3} color="#FF006E" opacity={0.4} />
        <CameraRig energy={energy} />
        <EffectComposer multisampling={0}>
          <Bloom ref={bloomRef} intensity={0.55} luminanceThreshold={0.18} mipmapBlur />
        </EffectComposer>
      </Canvas>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(8,0,10,0.5) 72%, rgba(8,0,10,0.92) 100%)',
      }} />
    </div>
  );
}

// Suaviza la energía: idle=1, typing=1.6, thinking=2.8, burst decae exponencialmente
function EnergyDriver({ energy, thinking, typing, bloomRef }: { energy: React.MutableRefObject<Energy>; thinking: boolean; typing: boolean; bloomRef: React.MutableRefObject<any> }) {
  useFrame((_, delta) => {
    const target = thinking ? 2.8 : typing ? 1.6 : 1;
    energy.current.current = THREE.MathUtils.damp(energy.current.current, target, 2.2, delta);
    energy.current.burst = Math.max(0, energy.current.burst - delta * 1.1);
    if (bloomRef.current) {
      bloomRef.current.intensity = THREE.MathUtils.damp(
        bloomRef.current.intensity ?? 0.55,
        0.5 + energy.current.current * 0.15 + energy.current.burst * 0.5,
        4, delta,
      );
    }
  });
  return null;
}
