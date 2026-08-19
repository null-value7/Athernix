"use client";

import { useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Text, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { Vec3 } from "@/models/vr-viewer.model";
import { COLORS } from "@/lib/theme";

const LETTERS = ["A", "Ñ", "¡", "¿", "S", "V", "l", "é"];

interface Props {
  position?: Vec3;
  scale?: number;
  reducedMotion?: boolean;
  interactive?: boolean;
}

export default function LanguageIsland({ position = [0, 0, 0], scale = 1, reducedMotion = false, interactive = false }: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const bookRef = useRef<THREE.Group>(null!);
  const lettersRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const hovered = useRef(false);
  const pulse = useRef(0);
  const zoom = useRef(1);
  const pageCount = 7;

  const letterSpecs = useMemo(
    () =>
      LETTERS.map((l, i) => ({
        letter: l,
        radius: 2.2 + (i % 2) * 0.45,
        height: 0.9 + i * 0.22,
        phase: (i / LETTERS.length) * Math.PI * 2,
        speed: 0.18 + (i % 3) * 0.04,
        color: i % 3 === 0 ? COLORS.red : i % 3 === 1 ? COLORS.gold : COLORS.orange,
      })),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const boost = hovered.current ? 1.8 : 1;
    if (bookRef.current && !reducedMotion) {
      bookRef.current.rotation.y = Math.sin(t * 0.2) * 0.35;
      bookRef.current.position.y = Math.sin(t * 0.5) * 0.08;
    }
    if (ringRef.current && !reducedMotion) ringRef.current.rotation.z += delta * 0.2 * boost;
    lettersRef.current?.children.forEach((child, i) => {
      const s = letterSpecs[i];
      const a = s.phase + (reducedMotion ? 0 : t * s.speed * boost);
      const rise = reducedMotion ? 0 : ((t * 0.35 + i) % 3) - 1.5;
      child.position.set(Math.cos(a) * s.radius, s.height * 0.4 + rise, Math.sin(a) * s.radius);
      child.rotation.y = -a + Math.PI / 2;
    });

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
      <pointLight color={COLORS.red} intensity={2.4} distance={8} position={[0, 1.2, 1.5]} />

      <group ref={bookRef} rotation={[-0.5, 0, 0]}>
        {/* Tapas */}
        <mesh position={[-0.62, 0, 0]} rotation={[0, 0.55, 0]}>
          <boxGeometry args={[1.2, 1.6, 0.05]} />
          <meshStandardMaterial color={COLORS.red} metalness={0.3} roughness={0.5} emissive={COLORS.red} emissiveIntensity={0.25} />
        </mesh>
        <mesh position={[0.62, 0, 0]} rotation={[0, -0.55, 0]}>
          <boxGeometry args={[1.2, 1.6, 0.05]} />
          <meshStandardMaterial color={COLORS.gold} metalness={0.3} roughness={0.5} emissive={COLORS.gold} emissiveIntensity={0.25} />
        </mesh>
        {/* Páginas abanicadas */}
        {Array.from({ length: pageCount }).map((_, i) => {
          const side = i % 2 === 0 ? -1 : 1;
          const spread = 0.08 + (i / pageCount) * 0.5;
          return (
            <mesh key={i} position={[side * 0.05, 0, 0.01 * i]} rotation={[0, side * spread, 0]}>
              <planeGeometry args={[1.05, 1.5]} />
              <meshStandardMaterial color="#fff2e0" side={THREE.DoubleSide} roughness={0.9} />
            </mesh>
          );
        })}
        {/* Lomo luminoso */}
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[0.06, 1.58, 0.06]} />
          <meshStandardMaterial color={COLORS.orange} emissive={COLORS.orange} emissiveIntensity={1.6} toneMapped={false} />
        </mesh>
      </group>

      {/* Anillo orbital de tinta */}
      <mesh ref={ringRef} rotation={[1.35, -0.3, 0]}>
        <torusGeometry args={[2.15, 0.008, 8, 96]} />
        <meshBasicMaterial color={COLORS.red} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <group ref={lettersRef}>
        {letterSpecs.map((s) => (
          <Text key={s.letter} fontSize={0.5} color={s.color} anchorX="center" anchorY="middle">
            {s.letter}
          </Text>
        ))}
      </group>

      <Sparkles count={reducedMotion ? 12 : 30} scale={[5.5, 4, 5.5]} size={2.4} speed={reducedMotion ? 0 : 0.3} color={COLORS.red} opacity={0.65} />
    </group>
  );
}
