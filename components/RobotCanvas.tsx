"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { RobotModel } from "./RobotModel";
import { CosmosParticles } from "./CosmosParticles";

/* ─── Tipos ─── */
export type RobotAction =
  | { type: "SET_MODE"; mode: "login" | "register" }
  | { type: "SET_FOCUS"; focus: "dance" | "spy" | null }
  | { type: "TRIGGER_SUBMIT" }
  | { type: "TOGGLE_ROTATE" }
  | { type: "TOGGLE_LIGHT" }
  | { type: "TOGGLE_NEON" }
  | { type: "SET_GLITCH"; glitch: boolean };

export type RobotState = {
  mode: "login" | "register";
  focusedInput: "dance" | "spy" | null;
  submitTrigger: number;
  autoRotate: boolean;
  neonMode: boolean;
  neonActive: boolean;
  isGlitched: boolean;
};

/* ─── Luces con pulsación animada ─── */
function AnimatedLights({ neonMode }: { neonMode: boolean }) {
  const pinkRef = useRef<THREE.PointLight>(null!);
  const orangeRef = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    const basePink = neonMode ? 2 : 0.2;
    const baseOrange = neonMode ? 1.5 : 0.2;
    if (pinkRef.current) {
      pinkRef.current.intensity = basePink + Math.sin(elapsedTime * 1.8) * 0.2;
    }
    if (orangeRef.current) {
      orangeRef.current.intensity = baseOrange + Math.cos(elapsedTime * 2.2) * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} color={0x220033} />
      <pointLight
        ref={pinkRef}
        position={[-6, 4, 5]}
        intensity={2}
        color={0xff006e}
        distance={20}
      />
      <pointLight
        ref={orangeRef}
        position={[6, -4, 6]}
        intensity={1.5}
        color={0xff6b00}
        distance={20}
      />
      <directionalLight position={[0, 4, -6]} intensity={1.0} color={0xffd700} />
    </>
  );
}

/* ─── Export: Canvas R3F completo ─── */
export function RobotCanvas({
  robotState,
  onLoadComplete,
  onProgress,
}: {
  robotState: RobotState;
  onLoadComplete: () => void;
  onProgress: (p: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      // Clean up any leftover canvas nodes to prevent removeChild errors
      if (containerRef.current) {
        const canvases = containerRef.current.querySelectorAll('canvas');
        canvases.forEach(c => {
          if (c.parentNode) c.parentNode.removeChild(c);
        });
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 14], fov: 45, near: 0.1, far: 1000 }}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 2,
      }}
    >
      <AnimatedLights neonMode={robotState.neonMode} />
      <CosmosParticles />

      <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />

      <Suspense fallback={null}>
        <RobotModel
          robotState={robotState}
          onProgress={onProgress}
          onLoadComplete={onLoadComplete}
        />
      </Suspense>

      <EffectComposer>
        <Bloom
          intensity={robotState.neonMode ? 0.25 : 0.5}
          luminanceThreshold={0.95}
          luminanceSmoothing={0.5}
          mipmapBlur={false}
        />
      </EffectComposer>
    </Canvas>
    </div>
  );
}
