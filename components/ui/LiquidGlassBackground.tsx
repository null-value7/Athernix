// components/ui/LiquidGlassBackground.tsx — R3F 3D background with glass sphere, particles & energy rings
'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ── Glass Sphere ──────────────────────────────────────────────
function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2 + pointer.y * 0.1;
    meshRef.current.rotation.y = t * 0.15 + pointer.x * 0.15;

    // Subtle morphing via scale
    const s = 1 + Math.sin(t * 0.5) * 0.04;
    meshRef.current.scale.setScalar(s);
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 12]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          resolution={512}
          transmission={0.95}
          roughness={0.05}
          thickness={2}
          ior={1.5}
          chromaticAberration={0.15}
          anisotropy={0.3}
          distortion={0.4}
          distortionScale={0.5}
          temporalDistortion={0.2}
          color="#FF006E"
          attenuationColor="#FF6B00"
          attenuationDistance={3}
        />
      </mesh>
    </Float>
  );
}

// ── Particle Field ────────────────────────────────────────────
function ParticleField({ count = 2000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#FF006E'),
      new THREE.Color('#FF6B00'),
      new THREE.Color('#FFD700'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.random() * 15 + 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * 3)];
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ── Energy Ring ───────────────────────────────────────────────
function EnergyRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * speed;
    ref.current.rotation.z = t * speed * 0.7;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.015, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

// ── Main Background Component ─────────────────────────────────
interface LiquidGlassBackgroundProps {
  intensity?: 'full' | 'subtle' | 'particles-only';
  className?: string;
}

export default function LiquidGlassBackground({
  intensity = 'full',
  className = '',
}: LiquidGlassBackgroundProps) {
  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`} style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} color="#FF6B00" />
          <pointLight position={[-3, -2, 4]} intensity={0.4} color="#FF006E" />

          {intensity !== 'particles-only' && <GlassSphere />}
          <ParticleField count={intensity === 'subtle' ? 1200 : 2000} />
          {intensity === 'full' && (
            <>
              <EnergyRing radius={3} speed={0.3} color="#FF006E" />
              <EnergyRing radius={4} speed={-0.2} color="#FF6B00" />
              <EnergyRing radius={5.5} speed={0.15} color="#FFD700" />
            </>
          )}

          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export { LiquidGlassBackground };
