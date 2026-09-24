"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
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
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.5, 9], fov: 42, near: 0.05, far: 200 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.3,
      }}
      className="pointer-events-none"
    >
      <color attach="background" args={["#0A0203"]} />
      <ambientLight intensity={0.45} color="#2a0d10" />
      <directionalLight position={[4, 5, 6]} intensity={0.7} color="#ffdcb0" castShadow={false} />
      <directionalLight position={[-4, 2, -8]} intensity={0.38} color="#ff2b3a" />
      <hemisphereLight args={["#ff6b35", "#0A0203", 0.25]} />

      <Suspense fallback={null}>
        <Environment preset="sunset" environmentIntensity={0.18} />
      </Suspense>

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


    </Canvas>
  );
}
