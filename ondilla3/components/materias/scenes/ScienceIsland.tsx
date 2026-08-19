"use client";

import { useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { Vec3 } from "@/models/vr-viewer.model";
import { COLORS } from "@/lib/theme";

interface Props {
  position?: Vec3;
  scale?: number;
  reducedMotion?: boolean;
  interactive?: boolean;
}

const HELIX_STEPS = 40;
const HELIX_HEIGHT = 3.2;
const HELIX_RADIUS = 0.55;

function helixPoint(i: number, strandOffset: number): Vec3 {
  const u = i / HELIX_STEPS;
  const angle = u * Math.PI * 4 + strandOffset;
  return [Math.cos(angle) * HELIX_RADIUS, u * HELIX_HEIGHT - HELIX_HEIGHT / 2, Math.sin(angle) * HELIX_RADIUS];
}

export default function ScienceIsland({ position = [0, 0, 0], scale = 1, reducedMotion = false, interactive = false }: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const helixRef = useRef<THREE.Group>(null!);
  const atomRef = useRef<THREE.Group>(null!);
  const hovered = useRef(false);
  const pulse = useRef(0);
  const zoom = useRef(1);

  const strandA = useMemo(() => Array.from({ length: HELIX_STEPS }, (_, i) => helixPoint(i, 0)), []);
  const strandB = useMemo(() => Array.from({ length: HELIX_STEPS }, (_, i) => helixPoint(i, Math.PI)), []);
  const rungs = useMemo(
    () => strandA.filter((_, i) => i % 4 === 0).map((p, idx) => ({ a: p, b: strandB[idx * 4] })),
    [strandA, strandB]
  );

  useFrame((state, delta) => {
    const boost = hovered.current ? 1.9 : 1;
    if (!reducedMotion) {
      helixRef.current.rotation.y += delta * 0.22 * boost;
      atomRef.current.rotation.x += delta * 0.3 * boost;
      atomRef.current.rotation.y += delta * 0.18 * boost;
    }
    const t = state.clock.getElapsedTime();
    if (atomRef.current && !reducedMotion) {
      atomRef.current.position.y = Math.sin(t * 0.7) * 0.15;
    }

    if (pulse.current > 0) pulse.current = Math.max(0, pulse.current - delta * 1.4);
    const bonus = Math.sin(pulse.current * Math.PI) * 0.1;
    const target = (hovered.current ? 1.06 : 1) + bonus;
    zoom.current += (target - zoom.current) * Math.min(1, delta * 8);
    groupRef.current.scale.setScalar(scale * zoom.current);
  });

  const handlers = interactive
    ? {
        onPointerOver: (e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          hovered.current = true;
          document.body.style.cursor = "pointer";
        },
        onPointerOut: () => {
          hovered.current = false;
          document.body.style.cursor = "auto";
        },
        onClick: (e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          pulse.current = 1;
        },
      }
    : {};

  return (
    <group ref={groupRef} position={position} scale={scale} {...handlers}>
      <pointLight color={COLORS.orange} intensity={2.4} distance={8} position={[0, 1, 2]} />

      <group ref={helixRef} position={[-1.3, 0, 0]}>
        {strandA.map((p, i) => (
          <mesh key={`a-${i}`} position={p}>
            <sphereGeometry args={[0.055, 8, 8]} />
            <meshStandardMaterial color={COLORS.red} emissive={COLORS.red} emissiveIntensity={1.2} />
          </mesh>
        ))}
        {strandB.map((p, i) => (
          <mesh key={`b-${i}`} position={p}>
            <sphereGeometry args={[0.055, 8, 8]} />
            <meshStandardMaterial color={COLORS.gold} emissive={COLORS.gold} emissiveIntensity={1.2} />
          </mesh>
        ))}
        {rungs.map((r, i) => {
          const mid: Vec3 = [(r.a[0] + r.b[0]) / 2, (r.a[1] + r.b[1]) / 2, (r.a[2] + r.b[2]) / 2];
          const dx = r.b[0] - r.a[0];
          const dz = r.b[2] - r.a[2];
          const len = Math.sqrt(dx * dx + dz * dz);
          return (
            <mesh key={`r-${i}`} position={mid} rotation={[0, Math.atan2(dx, dz), Math.PI / 2]}>
              <cylinderGeometry args={[0.018, 0.018, len, 6]} />
              <meshStandardMaterial color={COLORS.amber} transparent opacity={0.6} emissive={COLORS.amber} emissiveIntensity={0.4} />
            </mesh>
          );
        })}
      </group>

      <group ref={atomRef} position={[1.7, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.28, 24, 24]} />
          <meshStandardMaterial color={COLORS.orange} emissive={COLORS.orange} emissiveIntensity={1.6} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <group key={i} rotation={[(Math.PI / 3) * i, (Math.PI / 4) * i, 0]}>
            <mesh>
              <torusGeometry args={[0.85, 0.012, 8, 64]} />
              <meshStandardMaterial color={COLORS.red} transparent opacity={0.55} />
            </mesh>
            <mesh position={[0.85, 0, 0]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial color={COLORS.gold} emissive={COLORS.gold} emissiveIntensity={1.6} toneMapped={false} />
            </mesh>
          </group>
        ))}
      </group>

      <Sparkles count={reducedMotion ? 12 : 32} scale={[6.5, 4, 5]} size={2.4} speed={reducedMotion ? 0 : 0.35} color={COLORS.amber} opacity={0.65} />
    </group>
  );
}
