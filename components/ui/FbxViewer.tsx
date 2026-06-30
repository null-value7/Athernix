// @ts-nocheck
'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useFBX, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ── Athernix FBX Model ── */
function AthernixModel({ url, scale = 0.02, position = [0, -2, 0] }) {
  const fbx = useFBX(url);
  const ref = useRef();

  useMemo(() => {
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((mat) => {
            mat.metalness = 0.3;
            mat.roughness = 0.5;
          });
        }
      }
    });
  }, [fbx]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
  });

  return (
    <primitive
      ref={ref}
      object={fbx}
      scale={scale}
      position={position}
      dispose={null}
    />
  );
}

/* ── Floating Particles ── */
function Particles({ count = 600 }) {
  const mesh = useRef();
  const { positions, colors } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#FF006E'),
      new THREE.Color('#FF6B00'),
      new THREE.Color('#FFD700'),
    ];

    const pseudoRandom = (seed) => {
      const value = Math.sin(seed * 12.9898) * 43758.5453;
      return value - Math.floor(value);
    };

    for (let i = 0; i < count; i++) {
      p[i * 3]     = (pseudoRandom(i + 1) - 0.5) * 30;
      p[i * 3 + 1] = (pseudoRandom(i + 2) - 0.5) * 20;
      p[i * 3 + 2] = (pseudoRandom(i + 3) - 0.5) * 20;
      const col = palette[i % 3];
      c[i * 3]     = col.r;
      c[i * 3 + 1] = col.g;
      c[i * 3 + 2] = col.b;
    }
    return { positions: p, colors: c };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.015) * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Energy Rings ── */
function EnergyRings() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.2, i * 0.3, 0]}>
          <torusGeometry args={[3.5 + i * 0.6, 0.015, 8, 100]} />
          <meshBasicMaterial
            color={['#FF006E', '#FF6B00', '#FFD700'][i]}
            transparent
            opacity={0.18 - i * 0.04}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Loading Fallback ── */
function Loader() {
  return (
    <div className="fbx-loader">
      <div className="fbx-loader-spinner" />
      <span className="fbx-loader-text mono">CARGANDO MODELO 3D...</span>
    </div>
  );
}

/* ── Main Viewer Component ── */
export default function FbxViewer({
  modelUrl = '/models/AthernixitoUnityVer.fbx',
  className = '',
  scale = 0.02,
  position = [0, -2, 0],
  showControls = true,
  showParticles = true,
}) {
  return (
    <div className={`fbx-viewer ${className}`}>
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{ position: [0, 1, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
          style={{ background: 'transparent' }}
        >
          {/* Lighting — Athernix palette */}
          <ambientLight intensity={0.4} color="#281018" />
          <pointLight position={[-5, 5, 5]} intensity={3} color="#FF006E" distance={20} />
          <pointLight position={[5, -3, 4]} intensity={2.5} color="#FF6B00" distance={18} />
          <pointLight position={[0, 6, 3]} intensity={2} color="#FFD700" distance={15} />
          <directionalLight position={[2, 5, 3]} intensity={1.2} color="#ffffff" />

          {/* Model */}
          <AthernixModel url={modelUrl} scale={scale} position={position} />

          {/* Decorative */}
          <EnergyRings />
          {showParticles && <Particles />}

          {/* Controls */}
          {showControls && (
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={4}
              maxDistance={14}
              autoRotate={false}
              target={[0, 0, 0]}
            />
          )}
        </Canvas>
      </Suspense>
    </div>
  );
}
