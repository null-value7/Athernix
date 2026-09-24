"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Sparkles, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { COLORS } from "@/lib/theme";
import { useIslandInteraction } from "@/components/canvas/shared/useIslandInteraction";
import { createFresnelMaterial, createPremiumMetal } from "@/components/canvas/shared/materials";
import IslandLighting from "@/components/canvas/shared/IslandLighting";
import type { IslandSceneProps } from "./index";

const LETTERS = ["A", "Ñ", "¡", "¿", "S", "V", "l", "é"];

export default function LanguageIsland({
  position = [0, 0, 0],
  scale = 1,
  reducedMotion = false,
  interactive = false,
}: IslandSceneProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const bookRef = useRef<THREE.Group>(null!);
  const lettersRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const inkRef = useRef<THREE.Group>(null!);
  const quillRef = useRef<THREE.Group>(null!);

  const { boost, handlers } = useIslandInteraction(groupRef, scale, reducedMotion, interactive ?? false);

  const coverRedMat = useMemo(() => createPremiumMetal(COLORS.red, 0.3), []);
  const coverGoldMat = useMemo(() => createPremiumMetal(COLORS.gold, 0.3), []);
  const spineMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: COLORS.orange,
        emissive: COLORS.orange,
        emissiveIntensity: 2,
        toneMapped: false,
      }),
    []
  );
  const fresnelMat = useMemo(() => createFresnelMaterial(COLORS.red, 1.1), []);

  const pageCount = 9;
  const letterSpecs = useMemo(
    () =>
      LETTERS.map((l, i) => ({
        letter: l,
        radius: 2.3 + (i % 2) * 0.4,
        height: 0.85 + i * 0.2,
        phase: (i / LETTERS.length) * Math.PI * 2,
        speed: 0.16 + (i % 3) * 0.035,
        color: i % 3 === 0 ? COLORS.red : i % 3 === 1 ? COLORS.gold : COLORS.orange,
      })),
    []
  );

  const inkDrops = useMemo(
    () =>
      Array.from({ length: reducedMotion ? 4 : 10 }, (_, i) => ({
        phase: (i / 10) * Math.PI * 2,
        radius: 1.6 + (i % 3) * 0.3,
        speed: 0.2 + i * 0.03,
        size: 0.04 + (i % 2) * 0.02,
        color: i % 2 === 0 ? COLORS.red : COLORS.gold,
      })),
    [reducedMotion]
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const b = boost();
    fresnelMat.uniforms.uTime.value += delta;

    if (bookRef.current && !reducedMotion) {
      bookRef.current.rotation.y = Math.sin(t * 0.18) * 0.4;
      bookRef.current.position.y = Math.sin(t * 0.45) * 0.1;
    }
    if (ringRef.current && !reducedMotion) ringRef.current.rotation.z += delta * 0.18 * b;
    if (quillRef.current && !reducedMotion) {
      quillRef.current.rotation.z = Math.sin(t * 0.6) * 0.15 - 0.3;
      quillRef.current.position.y = 0.8 + Math.sin(t * 0.8) * 0.12;
    }

    lettersRef.current?.children.forEach((child, i) => {
      const s = letterSpecs[i];
      const a = s.phase + (reducedMotion ? 0 : t * s.speed * b);
      const rise = reducedMotion ? 0 : ((t * 0.32 + i) % 3.2) - 1.6;
      child.position.set(Math.cos(a) * s.radius, s.height * 0.4 + rise, Math.sin(a) * s.radius);
      child.rotation.y = -a + Math.PI / 2;
    });

    inkRef.current?.children.forEach((child, i) => {
      const d = inkDrops[i];
      const a = d.phase + (reducedMotion ? 0 : t * d.speed);
      child.position.set(
        Math.cos(a) * d.radius,
        Math.sin(t * 0.7 + i) * 0.5 + 0.2,
        Math.sin(a) * d.radius
      );
    });
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.1} rotationIntensity={0.12} floatIntensity={0.2}>
      <group ref={groupRef} position={position} scale={scale} {...handlers}>
        <IslandLighting color={COLORS.red} />

        <group ref={bookRef} rotation={[-0.45, 0, 0]}>
          {/* Tapas con bordes redondeados */}
          <RoundedBox args={[1.25, 1.7, 0.06]} radius={0.04} smoothness={4} position={[-0.64, 0, 0]} rotation={[0, 0.58, 0]}>
            <primitive object={coverRedMat} attach="material" />
          </RoundedBox>
          <RoundedBox args={[1.25, 1.7, 0.06]} radius={0.04} smoothness={4} position={[0.64, 0, 0]} rotation={[0, -0.58, 0]}>
            <primitive object={coverGoldMat} attach="material" />
          </RoundedBox>

          {/* Páginas abanicadas con curva */}
          {Array.from({ length: pageCount }).map((_, i) => {
            const side = i % 2 === 0 ? -1 : 1;
            const spread = 0.06 + (i / pageCount) * 0.55;
            const curl = Math.sin(i * 0.4) * 0.08;
            return (
              <mesh key={i} position={[side * 0.04, curl, 0.012 * i]} rotation={[curl * 2, side * spread, 0]}>
                <planeGeometry args={[1.08, 1.55, 1, 4]} />
                <meshStandardMaterial color="#fff5e8" side={THREE.DoubleSide} roughness={0.85} metalness={0.05} />
              </mesh>
            );
          })}

          {/* Lomo luminoso */}
          <mesh position={[0, 0, -0.025]}>
            <boxGeometry args={[0.07, 1.65, 0.07]} />
            <primitive object={spineMat} attach="material" />
          </mesh>

          {/* Aura fresnel alrededor del libro */}
          <mesh scale={1.35}>
            <boxGeometry args={[1.5, 1.9, 0.3]} />
            <primitive object={fresnelMat} attach="material" />
          </mesh>
        </group>

        {/* Pluma flotante */}
        <group ref={quillRef} position={[1.4, 0.8, 0.5]} rotation={[0.2, -0.5, -0.3]}>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.025, 0.04, 0.5, 8]} />
            <meshStandardMaterial color="#f5e6d0" roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.12, 0]} rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[0.06, 0.22, 6]} />
            <meshStandardMaterial color={COLORS.red} emissive={COLORS.red} emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* Gotas de tinta orbitales */}
        <group ref={inkRef}>
          {inkDrops.map((d, i) => (
            <mesh key={i} scale={d.size}>
              <sphereGeometry args={[1, 10, 10]} />
              <meshStandardMaterial color={d.color} emissive={d.color} emissiveIntensity={1.4} toneMapped={false} />
            </mesh>
          ))}
        </group>

        {/* Anillo orbital de tinta */}
        <mesh ref={ringRef} rotation={[1.35, -0.3, 0]}>
          <torusGeometry args={[2.2, 0.01, 8, 96]} />
          <meshBasicMaterial color={COLORS.red} transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        <group ref={lettersRef}>
          {letterSpecs.map((s) => (
            <Text
              key={s.letter}
              fontSize={0.52}
              color={s.color}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.018}
              outlineColor="#1a0508"
            >
              {s.letter}
            </Text>
          ))}
        </group>

        <Sparkles
          count={reducedMotion ? 14 : 36}
          scale={[6, 4.5, 6]}
          size={2.8}
          speed={reducedMotion ? 0 : 0.32}
          color={COLORS.red}
          opacity={0.7}
        />
      </group>
    </Float>
  );
}
