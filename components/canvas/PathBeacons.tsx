"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { getGlowTexture } from "./shared/glowTexture";
import { COLORS } from "@/lib/theme";

const BEACONS = Array.from({ length: 20 }, (_, i) => ({
  pos: [
    Math.sin(i * 0.58) * 1.95,
    -1.38 + Math.sin(i * 1.65) * 0.28,
    -5.2 - i * 2.05,
  ] as [number, number, number],
  color: i % 3 === 0 ? COLORS.gold : i % 3 === 1 ? COLORS.orange : COLORS.red,
  phase: i * 0.5,
}));

export default function PathBeacons({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const glowTex = useMemo(() => getGlowTexture(), []);
  const pathPoints = useMemo(() => BEACONS.map((b) => b.pos), []);

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const spec = BEACONS[i];
      const sprite = child as THREE.Sprite;
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.2 + spec.phase);
      sprite.material.opacity = 0.18 + pulse * 0.35;
      const s = 0.34 + pulse * 0.16;
      sprite.scale.set(s, s, 1);
      sprite.position.y = spec.pos[1] + Math.sin(t * 0.75 + spec.phase) * 0.1;
    });
  });

  return (
    <group>
      {!reducedMotion && (
        <Line
          points={pathPoints}
          color={COLORS.orange}
          lineWidth={1}
          transparent
          opacity={0.2}
          dashed
          dashSize={0.4}
          gapSize={0.25}
        />
      )}
      <group ref={groupRef}>
        {BEACONS.map((b, i) => (
          <sprite key={i} position={b.pos} scale={0.4}>
            <spriteMaterial
              map={glowTex}
              color={b.color}
              transparent
              opacity={0.32}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </sprite>
        ))}
      </group>
    </group>
  );
}
