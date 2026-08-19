"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import Backdrop from "@/components/canvas/Backdrop";
import { ISLAND_SCENES } from "@/components/materias/scenes";
import { useReducedMotion } from "@/controllers/useReducedMotion";
import type { MateriaSlug } from "@/models/materia.model";

/** Escena 3D grande e interactiva (arrastrar para orbitar, hover y click sobre el objeto) para la página de detalle. */
export default function MateriaDetailScene({ slug }: { slug: MateriaSlug }) {
  const reducedMotion = useReducedMotion();
  const Scene = ISLAND_SCENES[slug];

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.6, 6.5], fov: 45 }}
      gl={{ antialias: false, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <ambientLight intensity={0.4} color="#2a0d10" />
      <directionalLight position={[4, 5, 6]} intensity={0.6} color="#ffdcb0" />
      <directionalLight position={[-4, 2, -6]} intensity={0.3} color="#ff2b3a" />
      <Backdrop reducedMotion={reducedMotion} />

      <Suspense fallback={null}>
        <Scene scale={1.5} reducedMotion={reducedMotion} interactive />
      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={11}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.6}
      />

      {!reducedMotion && (
        <EffectComposer>
          <Bloom intensity={0.55} luminanceThreshold={0.65} luminanceSmoothing={0.4} mipmapBlur={false} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
