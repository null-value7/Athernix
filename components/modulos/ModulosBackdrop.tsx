'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/* Pointer global (el canvas es pointer-events:none) */
function useGlobalPointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return pointer;
}

/* ── Camera rig: parallax con mouse + deriva con scroll ── */
function CameraRig({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const scroll = useRef(0);

  useFrame((state, delta) => {
    const doc = document.documentElement;
    const max = Math.max(doc.scrollHeight - window.innerHeight, 1);
    scroll.current += (window.scrollY / max - scroll.current) * Math.min(delta * 3, 1);

    const { x, y } = pointer.current;
    const cam = state.camera;
    cam.position.x += (x * 2.4 - cam.position.x) * Math.min(delta * 2.5, 1);
    cam.position.y += (y * 1.6 - scroll.current * 3 - cam.position.y) * Math.min(delta * 2.5, 1);
    cam.lookAt(0, 0, -6);
  });
  return null;
}

/* ── Geometrías flotantes: wireframes holográficos ── */
function FloatingShapes({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.03 + pointer.current.x * 0.05;
  });
  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.9} floatIntensity={2.4}>
        <mesh position={[-7.5, 2.2, -9]}>
          <icosahedronGeometry args={[2.1, 1]} />
          <MeshDistortMaterial
            color="#FF006E"
            emissive="#FF006E"
            emissiveIntensity={0.35}
            wireframe
            transparent
            opacity={0.34}
            distort={0.35}
            speed={1.8}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={1.4} floatIntensity={1.8}>
        <mesh position={[7.8, -2.4, -11]} rotation={[0.6, 0.2, 0.4]}>
          <torusKnotGeometry args={[1.5, 0.35, 128, 16]} />
          <meshStandardMaterial
            color="#FF6B00"
            emissive="#FF6B00"
            emissiveIntensity={0.5}
            wireframe
            transparent
            opacity={0.26}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.6} floatIntensity={3}>
        <mesh position={[6.4, 3.4, -7]} rotation={[1.1, 0, 0.4]}>
          <torusGeometry args={[1.7, 0.02, 8, 90]} />
          <meshBasicMaterial color="#FFD700" transparent opacity={0.5} />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-6, -3.4, -8]} rotation={[0.9, 0.3, 0]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={0.55}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ── Anillo orbital inclinado que gira lento ── */
function OrbitRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.05;
  });
  return (
    <mesh ref={ref} position={[0, 0, -14]} rotation={[Math.PI / 2.4, 0.3, 0]}>
      <torusGeometry args={[9.5, 0.015, 8, 200]} />
      <meshBasicMaterial color="#FF006E" transparent opacity={0.22} />
    </mesh>
  );
}

export function ModulosBackdrop() {
  const pointer = useGlobalPointer();
  return (
    <div className="mx-backdrop" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 55, near: 0.1, far: 120 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <ambientLight intensity={0.5} color={0x331133} />
        <pointLight position={[8, 6, 2]} intensity={30} color="#FF6B00" distance={40} />
        <pointLight position={[-8, -4, 0]} intensity={26} color="#FF006E" distance={40} />

        <Stars radius={55} depth={40} count={2600} factor={3.2} saturation={0.55} fade speed={0.6} />
        <Sparkles count={140} scale={[26, 18, 14]} size={2.6} speed={0.35} color="#FF6B00" opacity={0.6} />
        <Sparkles count={110} scale={[24, 16, 12]} size={2} speed={0.28} color="#FF006E" opacity={0.55} />
        <Sparkles count={80} scale={[22, 14, 10]} size={1.7} speed={0.22} color="#FFD700" opacity={0.5} />

        <FloatingShapes pointer={pointer} />
        <OrbitRing />
        <CameraRig pointer={pointer} />

        <EffectComposer>
          <Bloom intensity={0.7} luminanceThreshold={0.18} luminanceSmoothing={0.7} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
