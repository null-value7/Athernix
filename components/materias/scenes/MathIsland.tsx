"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Sparkles, Float, Line, Sphere } from "@react-three/drei";
import * as THREE from "three";
import type { Vec3 } from "@/models/vr-viewer.model";
import { COLORS } from "@/lib/theme";
import { useIslandInteraction } from "@/components/canvas/shared/useIslandInteraction";
import { createFresnelMaterial, createPremiumMetal, createCrystalMaterial, createGemMaterial, createPlasmaMaterial, createPulseMaterial, createBrushedMetal } from "@/components/canvas/shared/materials";
import IslandLighting from "@/components/canvas/shared/IslandLighting";
import type { IslandSceneProps } from "./index";

const GLYPHS = ["π", "∑", "√", "∞", "½", "θ", "÷", "≠", "∫", "∂", "∇", "⊕"];

export default function MathIsland({
  position = [0, 0, 0],
  scale = 1,
  reducedMotion = false,
  interactive = false,
}: IslandSceneProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const knotRef = useRef<THREE.Mesh>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const ringBRef = useRef<THREE.Mesh>(null!);
  const shardsRef = useRef<THREE.Group>(null!);
  const glyphsRef = useRef<THREE.Group>(null!);
  const fresnelRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);
  const plasmaLinesRef = useRef<THREE.Group>(null!);
  const innerCoreRef = useRef<THREE.Mesh>(null!);

  const { boost, handlers } = useIslandInteraction(groupRef, scale, reducedMotion, interactive ?? false);

  const fresnelMat = useMemo(() => createFresnelMaterial(COLORS.gold, 1.6), []);
  const coreMat = useMemo(() => createCrystalMaterial(COLORS.red), []);
  const innerCoreMat = useMemo(() => createGemMaterial(COLORS.gold), []);
  const wireMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: COLORS.gold,
        emissive: COLORS.gold,
        emissiveIntensity: 0.8,
        metalness: 0.95,
        roughness: 0.1,
        wireframe: true,
      }),
    []
  );
  const shardMat = useMemo(() => createPremiumMetal(COLORS.orange, 0.8), []);
  const gemMat = useMemo(() => createGemMaterial(COLORS.amber), []);
  const plasmaMat = useMemo(() => createPlasmaMaterial(COLORS.gold), []);
  const particleMat = useMemo(() => createPulseMaterial(COLORS.gold, 1.2), []);

  const shardSpecs = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        radius: 2.2 + (i % 4) * 0.3,
        speed: 0.12 + i * 0.018,
        phase: (i / 12) * Math.PI * 2,
        yOffset: Math.sin(i * 1.1) * 0.6,
        geo: i % 4,
        size: 0.18 + (i % 3) * 0.05,
        pulsePhase: i * 0.5,
      })),
    []
  );

  const glyphSpecs = useMemo(
    () =>
      GLYPHS.map((g, i) => ({
        glyph: g,
        radius: 3.0 + (i % 3) * 0.3,
        phase: (i / GLYPHS.length) * Math.PI * 2,
        speed: 0.08 + (i % 4) * 0.015,
        color: i % 3 === 0 ? COLORS.gold : i % 3 === 1 ? COLORS.orange : COLORS.amber,
        size: 0.38 + (i % 2) * 0.06,
      })),
    []
  );

  const arcPoints = useMemo(() => {
    const pts: Vec3[] = [];
    for (let i = 0; i < shardSpecs.length; i++) {
      const a = shardSpecs[i].phase;
      const r = shardSpecs[i].radius;
      pts.push([Math.cos(a) * r * 0.5, 0.4, Math.sin(a) * r * 0.5]);
      pts.push([Math.cos(a) * r * 0.8, shardSpecs[i].yOffset * 0.5, Math.sin(a) * r * 0.8]);
      pts.push([Math.cos(a) * r, shardSpecs[i].yOffset, Math.sin(a) * r]);
    }
    return pts;
  }, [shardSpecs]);

  const particleCount = useMemo(() => reducedMotion ? 200 : 500, [reducedMotion]);
  const particleGeometry = useMemo(() => {
    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    const palette = [COLORS.gold, COLORS.orange, COLORS.amber, COLORS.red].map(c => new THREE.Color(c));
    
    for (let i = 0; i < count; i++) {
      const r = 1.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = 0.02 + Math.random() * 0.06;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.05 + Math.random() * 0.15;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("phase", new THREE.BufferAttribute(phases, 1));
    geo.setAttribute("speed", new THREE.BufferAttribute(speeds, 1));
    return geo;
  }, [reducedMotion]);

  useFrame((state, delta) => {
    const b = boost();
    fresnelMat.uniforms.uTime.value += delta;
    particleMat.uniforms.uTime.value += delta;
    plasmaMat.uniforms.uTime.value += delta;
    innerCoreMat.emissiveIntensity = 1.2 + Math.sin(state.clock.getElapsedTime() * 2.5) * 0.4;

    if (!reducedMotion) {
      knotRef.current.rotation.x += delta * 0.14 * b;
      knotRef.current.rotation.y += delta * 0.2 * b;
      coreRef.current.rotation.x -= delta * 0.25 * b;
      coreRef.current.rotation.z += delta * 0.16 * b;
      coreRef.current.scale.setScalar(0.38 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.02);
      innerCoreRef.current.rotation.y += delta * 0.35 * b;
      innerCoreRef.current.rotation.x += delta * 0.22 * b;
      ringRef.current.rotation.z += delta * 0.2 * b;
      ringBRef.current.rotation.x += delta * 0.13 * b;
      if (fresnelRef.current) fresnelRef.current.rotation.y -= delta * 0.1 * b;
    }

    const t = state.clock.getElapsedTime();
    
    shardsRef.current?.children.forEach((child, i) => {
      const s = shardSpecs[i];
      const a = s.phase + (reducedMotion ? 0 : t * s.speed * b);
      const pulse = 1 + Math.sin(t * 2.0 + s.pulsePhase) * 0.08;
      child.position.set(
        Math.cos(a) * s.radius,
        s.yOffset + Math.sin(t * 0.4 + i) * 0.22,
        Math.sin(a) * s.radius
      );
      child.scale.setScalar(s.size * pulse);
      if (!reducedMotion) {
        child.rotation.x += delta * 0.3;
        child.rotation.y += delta * 0.4;
      }
    });

    glyphsRef.current?.children.forEach((child, i) => {
      const s = glyphSpecs[i];
      const a = s.phase + (reducedMotion ? 0 : t * s.speed * b);
      child.position.set(
        Math.cos(a) * s.radius,
        Math.sin(t * 0.3 + i) * 0.7,
        Math.sin(a) * s.radius
      );
      child.rotation.y = -a + Math.PI / 2;
      child.scale.setScalar(1 + Math.sin(t * 1.5 + i) * 0.05);
    });

    if (particlesRef.current && !reducedMotion) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const phases = particlesRef.current.geometry.attributes.phase.array as Float32Array;
      const speeds = particlesRef.current.geometry.attributes.speed.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const phase = phases[i] + delta * speeds[i] * b;
        phases[i] = phase;
        const r = 1.5 + (i % 20) * 0.1;
        positions[i * 3] = Math.cos(phase) * r * (0.8 + Math.sin(t * 0.5 + i) * 0.2);
        positions[i * 3 + 1] = Math.sin(phase * 0.7) * 0.5 + Math.sin(t * 0.3 + i) * 0.3;
        positions[i * 3 + 2] = Math.sin(phase) * r * (0.8 + Math.cos(t * 0.5 + i) * 0.2);
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (plasmaLinesRef.current && !reducedMotion) {
      plasmaLinesRef.current.rotation.y += delta * 0.05 * b;
    }
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.1} rotationIntensity={0.12} floatIntensity={0.2}>
      <group ref={groupRef} position={position} scale={scale} {...handlers}>
        <IslandLighting color={COLORS.gold} intensity={3.2} position={[0, 2, 3]} />

        {/* Partículas ambientales */}
        <points ref={particlesRef} geometry={particleGeometry}>
          <primitive object={particleMat} attach="material" />
        </points>

        {/* Líneas de plasma conectando shards */}
        {!reducedMotion && (
          <group ref={plasmaLinesRef}>
            <Line
              points={arcPoints}
              color={COLORS.gold}
              lineWidth={2}
              transparent
              opacity={0.4}
              dashed
              dashSize={0.12}
              gapSize={0.06}
            />
            <Line
              points={arcPoints.map(p => [p[0] * 1.1, p[1], p[2] * 1.1])}
              color={COLORS.orange}
              lineWidth={1.5}
              transparent
              opacity={0.25}
              dashed
              dashSize={0.08}
              gapSize={0.04}
            />
          </group>
        )}

        {/* Nudo exterior wireframe metálico */}
        <mesh ref={knotRef}>
          <torusKnotGeometry args={[1.1, 0.35, 160, 28]} />
          <primitive object={wireMat} attach="material" />
        </mesh>

        {/* Capa fresnel holográfica */}
        <mesh ref={fresnelRef} scale={1.12}>
          <torusKnotGeometry args={[1.1, 0.37, 80, 20]} />
          <primitive object={fresnelMat} attach="material" />
        </mesh>

        {/* Núcleo cristalino interior */}
        <mesh ref={coreRef} scale={0.42}>
          <icosahedronGeometry args={[0.9, 3]} />
          <primitive object={coreMat} attach="material" />
        </mesh>

        {/* Núcleo interno gema */}
        <mesh ref={innerCoreRef} scale={0.18}>
          <octahedronGeometry args={[1, 1]} />
          <primitive object={innerCoreMat} attach="material" />
        </mesh>

        {/* Anillos orbitales dobles */}
        <mesh ref={ringRef} rotation={[1.2, 0.4, 0]}>
          <torusGeometry args={[2.5, 0.015, 12, 120]} />
          <meshBasicMaterial color={COLORS.orange} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh ref={ringBRef} rotation={[0.8, -0.6, 0.3]}>
          <torusGeometry args={[2.85, 0.01, 12, 120]} />
          <meshBasicMaterial color={COLORS.gold} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        {/* Anillo adicional */}
        {!reducedMotion && (
          <mesh rotation={[-0.5, 0.3, 0.7]} scale={1.0}>
            <torusGeometry args={[3.1, 0.006, 8, 96]} />
            <meshBasicMaterial color={COLORS.amber} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        )}

        {/* Cristales orbitales (gems) */}
        <group ref={shardsRef}>
          {shardSpecs.map((s, i) => (
            <mesh key={i} scale={s.size}>
              {s.geo === 0 && <octahedronGeometry args={[1, 0]} />}
              {s.geo === 1 && <dodecahedronGeometry args={[1, 0]} />}
              {s.geo === 2 && <icosahedronGeometry args={[1, 0]} />}
              {s.geo === 3 && <tetrahedronGeometry args={[1, 0]} />}
              <primitive object={i % 2 === 0 ? shardMat : gemMat} attach="material" />
            </mesh>
          ))}
        </group>

        {/* Glifos matemáticos flotantes */}
        <group ref={glyphsRef}>
          {glyphSpecs.map((s) => (
            <Text
              key={s.glyph}
              fontSize={s.size}
              color={s.color}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.012}
              outlineColor="#1a0508"
            >
              {s.glyph}
            </Text>
          ))}
        </group>

        <Sparkles
          count={reducedMotion ? 18 : 50}
          scale={[8, 6, 8]}
          size={3.5}
          speed={reducedMotion ? 0 : 0.5}
          color={COLORS.gold}
          opacity={0.85}
        />
      </group>
    </Float>
  );
}