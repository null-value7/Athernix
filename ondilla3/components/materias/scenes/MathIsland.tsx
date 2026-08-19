"use client";

import { useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Text, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { Vec3 } from "@/models/vr-viewer.model";
import { COLORS } from "@/lib/theme";

const GLYPHS = ["π", "∑", "√", "∞", "½", "θ", "÷", "≠"];

interface Props {
  position?: Vec3;
  scale?: number;
  reducedMotion?: boolean;
  interactive?: boolean;
}

export default function MathIsland({ position = [0, 0, 0], scale = 1, reducedMotion = false, interactive = false }: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const knotRef = useRef<THREE.Mesh>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const shardsRef = useRef<THREE.Group>(null!);
  const glyphsRef = useRef<THREE.Group>(null!);
  const hovered = useRef(false);
  const pulse = useRef(0);
  const zoom = useRef(1);

  const shardSpecs = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        radius: 1.9 + (i % 2) * 0.5,
        speed: 0.15 + i * 0.03,
        phase: (i / 6) * Math.PI * 2,
        yOffset: Math.sin(i) * 0.6,
        geo: i % 3,
      })),
    []
  );

  const glyphSpecs = useMemo(
    () =>
      GLYPHS.map((g, i) => ({
        glyph: g,
        radius: 2.7,
        phase: (i / GLYPHS.length) * Math.PI * 2,
        speed: 0.12,
        color: i % 2 === 0 ? COLORS.gold : COLORS.orange,
      })),
    []
  );

  useFrame((state, delta) => {
    const boost = hovered.current ? 1.9 : 1;
    if (!reducedMotion) {
      knotRef.current.rotation.x += delta * 0.18 * boost;
      knotRef.current.rotation.y += delta * 0.24 * boost;
      if (coreRef.current) {
        coreRef.current.rotation.x -= delta * 0.3 * boost;
        coreRef.current.rotation.z += delta * 0.2 * boost;
      }
      if (ringRef.current) ringRef.current.rotation.z += delta * 0.25 * boost;
    }
    const t = state.clock.getElapsedTime();
    shardsRef.current?.children.forEach((child, i) => {
      const s = shardSpecs[i];
      const a = s.phase + (reducedMotion ? 0 : t * s.speed * boost);
      child.position.set(Math.cos(a) * s.radius, s.yOffset + Math.sin(t * 0.4 + i) * 0.15, Math.sin(a) * s.radius);
      if (!reducedMotion) {
        child.rotation.x += delta * 0.4;
        child.rotation.y += delta * 0.4;
      }
    });
    glyphsRef.current?.children.forEach((child, i) => {
      const s = glyphSpecs[i];
      const a = s.phase + (reducedMotion ? 0 : t * s.speed * boost);
      child.position.set(Math.cos(a) * s.radius, Math.sin(t * 0.3 + i) * 0.55, Math.sin(a) * s.radius);
    });

    // Interacción: escala suave al hover + pulso al click.
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
      <pointLight color={COLORS.gold} intensity={2.4} distance={8} position={[0, 1, 2]} />

      {/* Nudo exterior wireframe dorado */}
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[1, 0.32, 128, 24]} />
        <meshStandardMaterial
          color={COLORS.gold}
          emissive={COLORS.gold}
          emissiveIntensity={0.55}
          metalness={0.6}
          roughness={0.25}
          wireframe
        />
      </mesh>

      {/* Núcleo sólido rojo interior */}
      <mesh ref={coreRef} scale={0.42}>
        <torusKnotGeometry args={[1, 0.3, 96, 16]} />
        <meshStandardMaterial color={COLORS.red} emissive={COLORS.red} emissiveIntensity={0.9} metalness={0.4} roughness={0.3} />
      </mesh>

      {/* Anillo orbital fino */}
      <mesh ref={ringRef} rotation={[1.2, 0.4, 0]}>
        <torusGeometry args={[2.3, 0.008, 8, 96]} />
        <meshBasicMaterial color={COLORS.orange} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <group ref={shardsRef}>
        {shardSpecs.map((s, i) => (
          <mesh key={i}>
            {s.geo === 0 && <tetrahedronGeometry args={[0.28]} />}
            {s.geo === 1 && <octahedronGeometry args={[0.24]} />}
            {s.geo === 2 && <dodecahedronGeometry args={[0.22]} />}
            <meshStandardMaterial color={COLORS.orange} emissive={COLORS.orange} emissiveIntensity={0.9} />
          </mesh>
        ))}
      </group>

      <group ref={glyphsRef}>
        {glyphSpecs.map((s) => (
          <Text key={s.glyph} fontSize={0.42} color={s.color} anchorX="center" anchorY="middle">
            {s.glyph}
          </Text>
        ))}
      </group>

      <Sparkles count={reducedMotion ? 12 : 34} scale={[6, 4, 6]} size={2.6} speed={reducedMotion ? 0 : 0.35} color={COLORS.gold} opacity={0.7} />
    </group>
  );
}
