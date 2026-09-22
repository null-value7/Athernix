"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import Backdrop from "@/components/canvas/Backdrop";
import { ISLAND_SCENES } from "@/components/materias/scenes";
import { useReducedMotion } from "@/controllers/useReducedMotion";
import type { MateriaSlug } from "@/models/materia.model";

export default function MateriaDetailScene({ slug }: { slug: MateriaSlug }) {
  const reducedMotion = useReducedMotion();
  const Scene = ISLAND_SCENES[slug];

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.6, 6.5], fov: 45 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.3,
      }}
    >
      <color attach="background" args={["#0A0203"]} />
      <ambientLight intensity={0.5} color="#2a0d10" />
      <directionalLight position={[4, 5, 6]} intensity={0.65} color="#ffdcb0" />
      <directionalLight position={[-4, 2, -6]} intensity={0.35} color="#ff2b3a" />
      <hemisphereLight args={["#ff6b35", "#0A0203", 0.2]} />

      <Suspense fallback={null}>
        <Environment preset="sunset" environmentIntensity={0.22} />
      </Suspense>

      <Backdrop reducedMotion={reducedMotion} />

      <Suspense fallback={null}>
        <Scene scale={1.5} reducedMotion={reducedMotion} interactive />
      </Suspense>

      <OrbitControls enablePan={false} minDistance={4} maxDistance={11} autoRotate={!reducedMotion} autoRotateSpeed={0.7} />


    </Canvas>
  );
}
