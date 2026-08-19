"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getGlowTexture } from "./shared/glowTexture";
import { createRng } from "./shared/random";
import { COLORS } from "@/lib/theme";

const PALETTE = [COLORS.orange, COLORS.red, COLORS.gold, COLORS.amber, "#ffffff"];

/** Campo estelar + nebulosas cálidas + "sol ember" de fondo. Barato: solo Points + Sprites. */
export default function Backdrop({ reducedMotion }: { reducedMotion: boolean }) {
  const starsRef = useRef<THREE.Points>(null!);
  const nebulaRef = useRef<THREE.Group>(null!);
  const sunRef = useRef<THREE.Sprite>(null!);
  const glowTex = useMemo(() => getGlowTexture(), []);

  const starGeometry = useMemo(() => {
    const count = reducedMotion ? 900 : 1800;
    const rng = createRng(reducedMotion ? 0x5eed1 : 0x5eed2);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = PALETTE.map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      const r = 40 + rng() * 90;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 20;
      const c = palette[rng() < 0.72 ? 4 : Math.floor(rng() * 4)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [reducedMotion]);

  const nebulaSpecs = useMemo(() => {
    const count = reducedMotion ? 4 : 8;
    const rng = createRng(reducedMotion ? 0x5eed3 : 0x5eed4);
    return Array.from({ length: count }, () => ({
      color: PALETTE[Math.floor(rng() * PALETTE.length)],
      pos: [
        (rng() - 0.5) * 60,
        (rng() - 0.5) * 30,
        -10 - rng() * 55,
      ] as [number, number, number],
      scale: 14 + rng() * 20,
      phase: rng() * Math.PI * 2,
    }));
  }, [reducedMotion]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (starsRef.current && !reducedMotion) {
      starsRef.current.rotation.y = t * 0.005;
    }
    if (nebulaRef.current) {
      nebulaRef.current.children.forEach((child, i) => {
        const spec = nebulaSpecs[i];
        child.position.y = spec.pos[1] + Math.sin(t * 0.15 + spec.phase) * 1.5;
      });
    }
    if (sunRef.current) {
      const s = 46 + Math.sin(t * 0.5) * 2.5;
      sunRef.current.scale.set(s, s, 1);
    }
  });

  return (
    <group>
      <fogExp2 attach="fog" args={["#0c0204", 0.014]} />
      <points ref={starsRef} geometry={starGeometry}>
        <pointsMaterial
          size={0.5}
          map={glowTex}
          transparent
          vertexColors
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Sol ember lejano: da profundidad y calidez al horizonte */}
      <sprite ref={sunRef} position={[2, 7, -78]} scale={46}>
        <spriteMaterial
          map={glowTex}
          color="#ff4a2a"
          transparent
          opacity={0.26}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
      <sprite position={[2, 7, -77]} scale={26}>
        <spriteMaterial
          map={glowTex}
          color={COLORS.gold}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      <group ref={nebulaRef}>
        {nebulaSpecs.map((n, i) => (
          <sprite key={i} position={n.pos} scale={n.scale}>
            <spriteMaterial
              map={glowTex}
              color={n.color}
              transparent
              opacity={0.11}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </sprite>
        ))}
      </group>
    </group>
  );
}
