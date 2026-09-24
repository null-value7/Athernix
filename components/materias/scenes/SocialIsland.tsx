"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";
import { COLORS } from "@/lib/theme";
import { useIslandInteraction } from "@/components/canvas/shared/useIslandInteraction";
import { createGlobeMaterial, createAtmosphereMaterial } from "@/components/canvas/shared/materials";
import IslandLighting from "@/components/canvas/shared/IslandLighting";
import type { IslandSceneProps } from "./index";

function latLngToVec3(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

export default function SocialIsland({
  position = [0, 0, 0],
  scale = 1,
  reducedMotion = false,
  interactive = false,
}: IslandSceneProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const globeRef = useRef<THREE.Group>(null!);
  const scanRef = useRef<THREE.Mesh>(null!);
  const scanBRef = useRef<THREE.Mesh>(null!);
  const markerRef = useRef<THREE.Mesh>(null!);
  const ringsRef = useRef<THREE.Group>(null!);
  const satelliteRef = useRef<THREE.Mesh>(null!);

  const { boost, handlers } = useIslandInteraction(groupRef, scale, reducedMotion, interactive ?? false);

  const radius = 1.38;
  const globeMat = useMemo(() => createGlobeMaterial(), []);
  const atmosphereMat = useMemo(() => createAtmosphereMaterial(COLORS.orange), []);

  const markerPos = useMemo(() => latLngToVec3(13.8, -88.9, radius * 1.015), [radius]);
  const markerQuat = useMemo(() => {
    const normal = new THREE.Vector3(...markerPos).normalize();
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  }, [markerPos]);

  useFrame((state, delta) => {
    globeMat.uniforms.uTime.value += delta;
    const b = boost();

    if (!reducedMotion) {
      globeRef.current.rotation.y += delta * 0.14 * b;
      scanRef.current.rotation.y += delta * 0.38 * b;
      if (scanBRef.current) scanBRef.current.rotation.z -= delta * 0.28 * b;
    }

    const t = state.clock.getElapsedTime();
    if (markerRef.current) {
      markerRef.current.scale.setScalar(1 + Math.sin(t * 3.2) * 0.3);
    }

    ringsRef.current?.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const cycle = (t * 0.55 + i * 0.45) % 1;
      mesh.scale.setScalar(0.35 + cycle * 2.4);
      (mesh.material as THREE.MeshBasicMaterial).opacity = (1 - cycle) * 0.55;
    });

    if (satelliteRef.current && !reducedMotion) {
      const a = t * 0.5;
      satelliteRef.current.position.set(Math.cos(a) * radius * 1.7, Math.sin(t * 0.8) * 0.3, Math.sin(a) * radius * 1.7);
    }
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.05} rotationIntensity={0.08} floatIntensity={0.18}>
      <group ref={groupRef} position={position} scale={scale} {...handlers}>
        <IslandLighting color={COLORS.amber} position={[2, 1.2, 2]} />

        <group ref={globeRef}>
          {/* Globo con shader de continentes */}
          <mesh>
            <sphereGeometry args={[radius, 72, 72]} />
            <primitive object={globeMat} attach="material" />
          </mesh>

          {/* Atmósfera */}
          <mesh scale={1.06}>
            <sphereGeometry args={[radius, 48, 48]} />
            <primitive object={atmosphereMat} attach="material" />
          </mesh>

          {/* Rejilla geográfica sutil */}
          <lineSegments>
            <wireframeGeometry args={[new THREE.SphereGeometry(radius * 1.008, 28, 18)]} />
            <lineBasicMaterial color={COLORS.orange} transparent opacity={0.12} />
          </lineSegments>

          {/* Marcador El Salvador */}
          <mesh ref={markerRef} position={markerPos}>
            <sphereGeometry args={[0.07, 14, 14]} />
            <meshStandardMaterial color={COLORS.gold} emissive={COLORS.gold} emissiveIntensity={3} toneMapped={false} />
          </mesh>

          {/* Ondas expansivas */}
          <group ref={ringsRef} position={markerPos} quaternion={markerQuat}>
            {[0, 1, 2].map((i) => (
              <mesh key={i}>
                <ringGeometry args={[0.08, 0.095, 32]} />
                <meshBasicMaterial
                  color={COLORS.gold}
                  transparent
                  opacity={0.45}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                  side={THREE.DoubleSide}
                />
              </mesh>
            ))}
          </group>
        </group>

        {/* Satélite orbital */}
        <mesh ref={satelliteRef} scale={0.06}>
          <boxGeometry args={[1, 0.4, 0.6]} />
          <meshStandardMaterial color={COLORS.red} emissive={COLORS.red} emissiveIntensity={1.2} />
        </mesh>

        {/* Anillos de escaneo */}
        <mesh ref={scanRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius * 1.38, 0.012, 8, 128]} />
          <meshBasicMaterial color={COLORS.red} transparent opacity={0.55} />
        </mesh>
        <mesh ref={scanBRef} rotation={[Math.PI / 2.6, 0.4, 0]}>
          <torusGeometry args={[radius * 1.58, 0.008, 8, 128]} />
          <meshBasicMaterial color={COLORS.gold} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        <Sparkles
          count={reducedMotion ? 14 : 34}
          scale={[6, 5, 6]}
          size={2.6}
          speed={reducedMotion ? 0 : 0.32}
          color={COLORS.amber}
          opacity={0.7}
        />
      </group>
    </Float>
  );
}
