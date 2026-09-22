"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getGlowTexture } from "./shared/glowTexture";
import { createRng } from "./shared/random";
import { COLORS } from "@/lib/theme";

const PALETTE = [COLORS.orange, COLORS.red, COLORS.gold, COLORS.amber, "#ffffff"];

function createAuroraMaterial(color: string) {
  const c = new THREE.Color(color);
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: c },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec3 uColor;
      void main() {
        float wave = sin(vUv.x * 6.0 + uTime * 0.3) * 0.5 + 0.5;
        wave *= sin(vUv.y * 3.0 - uTime * 0.2) * 0.5 + 0.5;
        float alpha = wave * 0.12 * (1.0 - abs(vUv.y - 0.5) * 2.0);
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

export default function Backdrop({ reducedMotion }: { reducedMotion: boolean }) {
  const starsRef = useRef<THREE.Points>(null!);
  const nebulaRef = useRef<THREE.Group>(null!);
  const sunRef = useRef<THREE.Sprite>(null!);
  const auroraRef = useRef<THREE.Mesh>(null!);
  const glowTex = useMemo(() => getGlowTexture(), []);
  const auroraMat = useMemo(() => createAuroraMaterial(COLORS.red), []);

  const starGeometry = useMemo(() => {
    const count = reducedMotion ? 900 : 2200;
    const rng = createRng(reducedMotion ? 0x5eed1 : 0x5eed2);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const palette = PALETTE.map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      const r = 40 + rng() * 95;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 20;
      const c = palette[rng() < 0.68 ? 4 : Math.floor(rng() * 4)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = 0.3 + rng() * 0.7;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [reducedMotion]);

  const nebulaSpecs = useMemo(() => {
    const count = reducedMotion ? 4 : 10;
    const rng = createRng(reducedMotion ? 0x5eed3 : 0x5eed4);
    return Array.from({ length: count }, () => ({
      color: PALETTE[Math.floor(rng() * PALETTE.length)],
      pos: [(rng() - 0.5) * 65, (rng() - 0.5) * 32, -10 - rng() * 58] as [number, number, number],
      scale: 16 + rng() * 22,
      phase: rng() * Math.PI * 2,
    }));
  }, [reducedMotion]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    auroraMat.uniforms.uTime.value = t;

    if (starsRef.current && !reducedMotion) {
      starsRef.current.rotation.y = t * 0.004;
      starsRef.current.rotation.x = Math.sin(t * 0.1) * 0.002;
    }
    if (nebulaRef.current) {
      nebulaRef.current.children.forEach((child, i) => {
        const spec = nebulaSpecs[i];
        child.position.y = spec.pos[1] + Math.sin(t * 0.14 + spec.phase) * 1.8;
        child.rotation.z = Math.sin(t * 0.08 + spec.phase) * 0.05;
      });
    }
    if (sunRef.current) {
      const s = 48 + Math.sin(t * 0.45) * 3;
      sunRef.current.scale.set(s, s, 1);
    }
    if (auroraRef.current && !reducedMotion) {
      auroraRef.current.rotation.z = Math.sin(t * 0.06) * 0.08;
    }
  });

  return (
    <group>
      <fogExp2 attach="fog" args={["#0c0204", 0.013]} />

      <points ref={starsRef} geometry={starGeometry}>
        <pointsMaterial
          size={0.55}
          map={glowTex}
          transparent
          vertexColors
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      <sprite ref={sunRef} position={[2, 7, -78]} scale={48}>
        <spriteMaterial map={glowTex} color="#ff4a2a" transparent opacity={0.28} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      <sprite position={[2, 7, -77]} scale={28}>
        <spriteMaterial map={glowTex} color={COLORS.gold} transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>

      {/* Aurora atmosférica */}
      <mesh ref={auroraRef} position={[0, 4, -45]} rotation={[0.3, 0, 0.15]}>
        <planeGeometry args={[80, 20, 1, 1]} />
        <primitive object={auroraMat} attach="material" />
      </mesh>

      <group ref={nebulaRef}>
        {nebulaSpecs.map((n, i) => (
          <sprite key={i} position={n.pos} scale={n.scale}>
            <spriteMaterial map={glowTex} color={n.color} transparent opacity={0.13} blending={THREE.AdditiveBlending} depthWrite={false} />
          </sprite>
        ))}
      </group>
    </group>
  );
}
