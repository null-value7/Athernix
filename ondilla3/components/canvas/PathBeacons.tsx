"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getGlowTexture } from "./shared/glowTexture";
import { COLORS } from "@/lib/theme";

/**
 * Estela de balizas luminosas que serpentea entre las islas: marca la
 * dirección del viaje y añade profundidad. 18 sprites con pulso suave.
 */
const BEACONS = Array.from({ length: 18 }, (_, i) => ({
  pos: [
    Math.sin(i * 0.62) * 1.9,
    -1.35 + Math.sin(i * 1.7) * 0.25,
    -5.5 - i * 2.1,
  ] as [number, number, number],
  color: i % 3 === 0 ? COLORS.gold : i % 3 === 1 ? COLORS.orange : COLORS.red,
  phase: i * 0.55,
}));

export default function PathBeacons({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const glowTex = useMemo(() => getGlowTexture(), []);

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const spec = BEACONS[i];
      const sprite = child as THREE.Sprite;
      const pulse = 0.5 + 0.5 * Math.sin(t * 2 + spec.phase);
      sprite.material.opacity = 0.16 + pulse * 0.3;
      const s = 0.32 + pulse * 0.14;
      sprite.scale.set(s, s, 1);
      sprite.position.y = spec.pos[1] + Math.sin(t * 0.8 + spec.phase) * 0.08;
    });
  });

  return (
    <group ref={groupRef}>
      {BEACONS.map((b, i) => (
        <sprite key={i} position={b.pos} scale={0.38}>
          <spriteMaterial
            map={glowTex}
            color={b.color}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
}
