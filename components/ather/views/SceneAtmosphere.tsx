"use client";

import { Sparkles } from "@react-three/drei/core/Sparkles";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function SceneAtmosphere({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const key = useRef<THREE.PointLight>(null);
  const rim = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const pulse = 0.55 + Math.sin(clock.elapsedTime * 1.4) * 0.12;
    const p = progressRef.current;
    if (key.current) key.current.intensity = 18 + p * 8 + pulse;
    if (rim.current) rim.current.intensity = 10 + (1 - p) * 6;
  });

  return (
    <>
      <color attach="background" args={["#1a0502"]} />
      <fog attach="fog" args={["#210806", 3.4, 11]} />
      <ambientLight intensity={0.28} color="#ff9b54" />
      <directionalLight
        castShadow
        position={[2.4, 4.2, 2.2]}
        intensity={2.4}
        color="#ffe08a"
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
      />
      <pointLight ref={key} position={[-1.2, 1.6, 1.4]} color="#ff3b1f" distance={8} />
      <pointLight ref={rim} position={[1.6, 1.1, -1.4]} color="#ffb703" distance={7} />
      <spotLight
        position={[0, 3.4, 2.2]}
        angle={0.45}
        penumbra={0.7}
        intensity={32}
        color="#ffdd57"
        castShadow
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <circleGeometry args={[6.5, 64]} />
        <meshStandardMaterial color="#4a1208" roughness={0.92} metalness={0.05} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[0.55, 1.35, 64]} />
        <meshBasicMaterial color="#ff7a18" transparent opacity={0.22} />
      </mesh>
      <Sparkles count={70} scale={[5, 3.2, 5]} size={3.5} speed={0.4} color="#ffd166" opacity={0.65} />
    </>
  );
}
