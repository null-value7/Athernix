'use client';

import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function InteractiveCore() {
  const root = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Group>(null);
  const ringB = useRef<THREE.Group>(null);
  const ringC = useRef<THREE.Group>(null);
  const burst = useRef(0);
  const dragging = useRef(false);
  const [hovered, setHovered] = useState(false);

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (!root.current) return;
    const start = { x: e.clientX, y: e.clientY, rx: root.current.rotation.x, ry: root.current.rotation.y };
    burst.current = 1;
    dragging.current = true;
    const move = (ev: PointerEvent) => {
      if (!root.current) return;
      root.current.rotation.y = start.ry + (ev.clientX - start.x) * 0.008;
      root.current.rotation.x = start.rx + (ev.clientY - start.y) * 0.008;
    };
    const up = () => {
      dragging.current = false;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    burst.current = Math.max(0, burst.current - delta * 1.6);
    const energy = (hovered ? 1.9 : 1) + burst.current * 2.4;
    if (root.current && !dragging.current) {
      root.current.rotation.y += delta * 0.25 * energy;
      root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, 0, 0.02);
    }
    if (core.current) {
      const mat = core.current.material as THREE.MeshPhysicalMaterial & { distort?: number };
      if ('distort' in mat) {
        mat.distort = THREE.MathUtils.lerp(mat.distort ?? 0.4, 0.35 * energy, 0.08);
      }
      const s = 1 + Math.sin(t * 2) * 0.02 + burst.current * 0.22;
      core.current.scale.setScalar(THREE.MathUtils.lerp(core.current.scale.x, s, 0.12));
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.4 * energy;
      shell.current.rotation.z += delta * 0.18 * energy;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.9 * energy;
    if (ringB.current) { ringB.current.rotation.x += delta * 0.7 * energy; ringB.current.rotation.y += delta * 0.3; }
    if (ringC.current) ringC.current.rotation.y -= delta * 0.55 * energy;
  });

  const emissiveBoost = hovered ? 1.5 : 1;

  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
      <group
        ref={root}
        onPointerDown={onPointerDown}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh ref={core}>
          <icosahedronGeometry args={[1.15, 20]} />
          <MeshDistortMaterial
            color="#160208"
            emissive="#FF006E"
            emissiveIntensity={0.85 * emissiveBoost}
            distort={0.38}
            speed={3.2}
            roughness={0.2}
            metalness={0.55}
          />
        </mesh>
        <mesh ref={shell} scale={1.3}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshBasicMaterial color="#FF6B00" wireframe transparent opacity={hovered ? 0.4 : 0.22} />
        </mesh>
        <group ref={ringA} rotation={[Math.PI / 2.2, 0, 0]}>
          <mesh>
            <torusGeometry args={[1.85, 0.018, 8, 96]} />
            <meshBasicMaterial color="#FF6B00" transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
        <group ref={ringB} rotation={[Math.PI / 1.8, 0.5, 0]}>
          <mesh>
            <torusGeometry args={[2.1, 0.014, 8, 96]} />
            <meshBasicMaterial color="#FF006E" transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
        <group ref={ringC} rotation={[0.4, 0, Math.PI / 2.6]}>
          <mesh>
            <torusGeometry args={[2.35, 0.011, 8, 96]} />
            <meshBasicMaterial color="#FFD700" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
        <Sparkles count={40} scale={[3.4, 3.4, 3.4]} size={3} speed={hovered ? 1.6 : 0.5} color="#FFD700" opacity={0.8} />
        <pointLight color="#FF006E" intensity={10 * emissiveBoost} distance={12} />
      </group>
    </Float>
  );
}

export default function AtherCore3D() {
  return (
    <Canvas
      dpr={1}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ alpha: true, antialias: false }}
      style={{ width: '100%', height: '100%', cursor: 'grab', touchAction: 'none' }}
    >
      <ambientLight intensity={0.5} />
      <InteractiveCore />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.85} luminanceThreshold={0.15} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
