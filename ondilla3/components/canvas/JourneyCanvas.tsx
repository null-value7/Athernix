"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import Backdrop from "./Backdrop";
import VrHeadset from "./VrHeadset";
import CameraRig from "./CameraRig";
import PathBeacons from "./PathBeacons";
import { MATERIAS } from "@/models/materia.model";
import { ISLAND_POSITIONS } from "@/models/vr-viewer.model";
import { ISLAND_SCENES } from "@/components/materias/scenes";

export default function JourneyCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.5, 9], fov: 42, near: 0.05, far: 200 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      className="pointer-events-none"
    >
      <ambientLight intensity={0.35} color="#2a0d10" />
      <directionalLight position={[4, 5, 6]} intensity={0.65} color="#ffdcb0" />
      <directionalLight position={[-4, 2, -8]} intensity={0.35} color="#ff2b3a" />

      <Backdrop reducedMotion={reducedMotion} />
      <VrHeadset reducedMotion={reducedMotion} />
      <PathBeacons reducedMotion={reducedMotion} />

      <Suspense fallback={null}>
        {MATERIAS.map((materia) => {
          const Scene = ISLAND_SCENES[materia.slug];
          return <Scene key={materia.slug} position={ISLAND_POSITIONS[materia.ordenViaje]} reducedMotion={reducedMotion} />;
        })}
      </Suspense>

      <CameraRig reducedMotion={reducedMotion} />

      {!reducedMotion && (
        <EffectComposer>
          <Bloom intensity={0.6} luminanceThreshold={0.65} luminanceSmoothing={0.4} mipmapBlur={false} />
          <Vignette eskil={false} offset={0.15} darkness={0.9} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
