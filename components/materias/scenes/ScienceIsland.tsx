"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";
import { COLORS } from "@/lib/theme";
import { useIslandInteraction } from "@/components/canvas/shared/useIslandInteraction";
import { createFresnelMaterial, createCrystalMaterial, createPremiumMetal } from "@/components/canvas/shared/materials";
import IslandLighting from "@/components/canvas/shared/IslandLighting";
import type { IslandSceneProps } from "./index";

const HELIX_STEPS = 48;
const HELIX_HEIGHT = 3.4;
const HELIX_RADIUS = 0.58;

function helixPoint(i: number, strandOffset: number): THREE.Vector3 {
  const u = i / HELIX_STEPS;
  const angle = u * Math.PI * 4 + strandOffset;
  return new THREE.Vector3(
    Math.cos(angle) * HELIX_RADIUS,
    u * HELIX_HEIGHT - HELIX_HEIGHT / 2,
    Math.sin(angle) * HELIX_RADIUS
  );
}

export default function ScienceIsland({
  position = [0, 0, 0],
  scale = 1,
  reducedMotion = false,
  interactive = false,
}: IslandSceneProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const helixRef = useRef<THREE.Group>(null!);
  const atomRef = useRef<THREE.Group>(null!);
  const electronsRef = useRef<THREE.Group>(null!);

  const { boost, handlers } = useIslandInteraction(groupRef, scale, reducedMotion, interactive ?? false);

  const strandRedMat = useMemo(() => createPremiumMetal(COLORS.red, 0.8), []);
  const strandGoldMat = useMemo(() => createPremiumMetal(COLORS.gold, 0.8), []);
  const nucleusMat = useMemo(() => createCrystalMaterial(COLORS.orange), []);
  const fresnelMat = useMemo(() => createFresnelMaterial(COLORS.amber, 1.2), []);

  const strandACurve = useMemo(() => {
    const pts = Array.from({ length: HELIX_STEPS + 1 }, (_, i) => helixPoint(i, 0));
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  const strandBCurve = useMemo(() => {
    const pts = Array.from({ length: HELIX_STEPS + 1 }, (_, i) => helixPoint(i, Math.PI));
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  const rungSpecs = useMemo(() => {
    const specs: { mid: THREE.Vector3; len: number; rotY: number }[] = [];
    for (let i = 0; i <= HELIX_STEPS; i += 4) {
      const a = helixPoint(i, 0);
      const b = helixPoint(i, Math.PI);
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const dx = b.x - a.x;
      const dz = b.z - a.z;
      specs.push({ mid, len: Math.sqrt(dx * dx + dz * dz), rotY: Math.atan2(dx, dz) });
    }
    return specs;
  }, []);

  const electronOrbits = useMemo(
    () =>
      [0, 1, 2].map((i) => ({
        radius: 0.9 + i * 0.08,
        speed: 1.2 - i * 0.25,
        tilt: [(Math.PI / 3) * i, (Math.PI / 4) * i, 0] as [number, number, number],
        color: i === 0 ? COLORS.red : i === 1 ? COLORS.gold : COLORS.amber,
      })),
    []
  );

  useFrame((state, delta) => {
    const b = boost();
    fresnelMat.uniforms.uTime.value += delta;

    if (!reducedMotion) {
      helixRef.current.rotation.y += delta * 0.2 * b;
      atomRef.current.rotation.x += delta * 0.28 * b;
      atomRef.current.rotation.y += delta * 0.16 * b;
    }

    const t = state.clock.getElapsedTime();
    if (atomRef.current && !reducedMotion) {
      atomRef.current.position.y = Math.sin(t * 0.65) * 0.18;
    }

    electronsRef.current?.children.forEach((child, i) => {
      const o = electronOrbits[i];
      const a = reducedMotion ? 0 : t * o.speed * b;
      child.position.set(Math.cos(a) * o.radius, Math.sin(a * 1.3) * 0.08, Math.sin(a) * o.radius);
    });
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.15} rotationIntensity={0.1} floatIntensity={0.22}>
      <group ref={groupRef} position={position} scale={scale} {...handlers}>
        <IslandLighting color={COLORS.orange} />

        <group ref={helixRef} position={[-1.35, 0, 0]}>
          {/* Hebras ADN con tubos suaves */}
          <mesh>
            <tubeGeometry args={[strandACurve, 64, 0.045, 8, false]} />
            <primitive object={strandRedMat} attach="material" />
          </mesh>
          <mesh>
            <tubeGeometry args={[strandBCurve, 64, 0.045, 8, false]} />
            <primitive object={strandGoldMat} attach="material" />
          </mesh>

          {/* Escalones/base pairs */}
          {rungSpecs.map((r, i) => (
            <mesh key={i} position={r.mid} rotation={[0, r.rotY, Math.PI / 2]}>
              <cylinderGeometry args={[0.022, 0.022, r.len, 6]} />
              <meshStandardMaterial
                color={COLORS.amber}
                transparent
                opacity={0.75}
                emissive={COLORS.amber}
                emissiveIntensity={0.6}
              />
            </mesh>
          ))}

          {/* Nodos en los cruces */}
          {Array.from({ length: 6 }, (_, i) => {
            const idx = Math.floor((i / 5) * HELIX_STEPS);
            const p = helixPoint(idx, 0);
            return (
              <mesh key={i} position={p} scale={0.07}>
                <sphereGeometry args={[1, 10, 10]} />
                <meshStandardMaterial color={COLORS.red} emissive={COLORS.red} emissiveIntensity={1.5} toneMapped={false} />
              </mesh>
            );
          })}
        </group>

        {/* Átomo con electrones orbitando */}
        <group ref={atomRef} position={[1.75, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.32, 32, 32]} />
            <primitive object={nucleusMat} attach="material" />
          </mesh>

          {/* Aura fresnel del núcleo */}
          <mesh scale={1.25}>
            <sphereGeometry args={[0.32, 24, 24]} />
            <primitive object={fresnelMat} attach="material" />
          </mesh>

          {electronOrbits.map((o, i) => (
            <group key={i} rotation={o.tilt}>
              <mesh>
                <torusGeometry args={[o.radius, 0.01, 8, 64]} />
                <meshStandardMaterial color={o.color} transparent opacity={0.45} />
              </mesh>
            </group>
          ))}

          <group ref={electronsRef}>
            {electronOrbits.map((o, i) => (
              <mesh key={i} scale={0.065}>
                <sphereGeometry args={[1, 12, 12]} />
                <meshStandardMaterial color={o.color} emissive={o.color} emissiveIntensity={2} toneMapped={false} />
              </mesh>
            ))}
          </group>
        </group>

        <Sparkles
          count={reducedMotion ? 14 : 38}
          scale={[7, 4.5, 5.5]}
          size={2.8}
          speed={reducedMotion ? 0 : 0.38}
          color={COLORS.amber}
          opacity={0.7}
        />
      </group>
    </Float>
  );
}
