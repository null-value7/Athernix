"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Sphere, Float } from "@react-three/drei";
import * as THREE from "three";
import { getGlowTexture } from "./shared/glowTexture";
import { createPremiumMetal } from "./shared/materials";
import { LENS_LOCAL_POSITION } from "@/models/vr-viewer.model";
import { COLORS } from "@/lib/theme";

function useLensMaterial(colorA: string, colorB: string) {
  return useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color(colorA) },
          uColorB: { value: new THREE.Color(colorB) },
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
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          void main() {
            vec2 c = vUv - 0.5;
            float d = length(c);
            float ring = smoothstep(0.5, 0.0, d);
            float swirl = 0.5 + 0.5 * sin(atan(c.y, c.x) * 4.0 + uTime * 1.8 + d * 9.0);
            float scan = 0.7 + 0.3 * sin(c.y * 40.0 + uTime * 3.0);
            vec3 col = mix(uColorA, uColorB, swirl);
            float chroma = sin(d * 20.0 - uTime * 2.0) * 0.08;
            col.r += chroma;
            col.b -= chroma * 0.5;
            float core = smoothstep(0.4, 0.0, d) * 0.7;
            gl_FragColor = vec4(col * (ring * 0.9 + core) * scan, ring);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [colorA, colorB]
  );
}

const ORBITALS = [
  { radius: 1.38, speed: 0.58, phase: 0, y: 0.18, color: COLORS.gold, size: 0.17 },
  { radius: 1.55, speed: -0.42, phase: 2.1, y: -0.12, color: COLORS.red, size: 0.14 },
  { radius: 1.22, speed: 0.72, phase: 4.2, y: 0.35, color: COLORS.orange, size: 0.13 },
  { radius: 1.68, speed: -0.32, phase: 1.2, y: -0.3, color: COLORS.amber, size: 0.15 },
];

export default function VrHeadset({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const ringARef = useRef<THREE.Mesh>(null!);
  const ringBRef = useRef<THREE.Mesh>(null!);
  const ringCRef = useRef<THREE.Mesh>(null!);
  const orbitalsRef = useRef<THREE.Group>(null!);
  const stripRef = useRef<THREE.Mesh>(null!);
  const lensLeftMat = useLensMaterial(COLORS.red, COLORS.gold);
  const lensRightMat = useLensMaterial(COLORS.orange, COLORS.gold);
  const bodyMat = useMemo(() => createPremiumMetal("#1a0508", 0.05), []);
  const frontMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#26070c",
        metalness: 0.9,
        roughness: 0.15,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      }),
    []
  );
  const glowTex = useMemo(() => getGlowTexture(), []);

  const [lensX] = LENS_LOCAL_POSITION;
  const lensY = LENS_LOCAL_POSITION[1];
  const lensZ = LENS_LOCAL_POSITION[2];

  useFrame((state, delta) => {
    lensLeftMat.uniforms.uTime.value += delta;
    lensRightMat.uniforms.uTime.value += delta;

    const t = state.clock.getElapsedTime();
    if (groupRef.current && !reducedMotion) {
      groupRef.current.position.y = Math.sin(t * 0.55) * 0.06;
      groupRef.current.rotation.y = Math.sin(t * 0.22) * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.32) * 0.035;
    }
    if (!reducedMotion) {
      ringARef.current.rotation.z += delta * 0.38;
      ringBRef.current.rotation.z -= delta * 0.28;
      ringCRef.current.rotation.x += delta * 0.2;
    }
    if (stripRef.current) {
      const mat = stripRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.2 + Math.sin(t * 2.5) * 0.8;
    }

    orbitalsRef.current?.children.forEach((child, i) => {
      const o = ORBITALS[i];
      const a = o.phase + (reducedMotion ? 0 : t * o.speed);
      child.position.set(
        Math.cos(a) * o.radius,
        o.y + Math.sin(t * 0.85 + o.phase) * 0.07,
        Math.sin(a) * o.radius * 0.55
      );
    });
  });

  return (
    <Float speed={reducedMotion ? 0 : 0.8} rotationIntensity={0.05} floatIntensity={0.08}>
      <group ref={groupRef}>
        <RoundedBox args={[1.58, 0.64, 0.56]} radius={0.15} smoothness={4}>
          <primitive object={bodyMat} attach="material" />
        </RoundedBox>

        <RoundedBox args={[1.44, 0.52, 0.09]} radius={0.11} smoothness={3} position={[0, 0, 0.27]}>
          <primitive object={frontMat} attach="material" />
        </RoundedBox>

        <mesh position={[0, 0, -0.26]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.64, 0.048, 12, 48, Math.PI]} />
          <meshStandardMaterial color="#2a0a0e" metalness={0.6} roughness={0.35} />
        </mesh>

        <mesh ref={stripRef} position={[0, -0.28, 0.16]}>
          <boxGeometry args={[1.25, 0.035, 0.055]} />
          <meshStandardMaterial color={COLORS.orange} emissive={COLORS.orange} emissiveIntensity={2.4} toneMapped={false} />
        </mesh>

        <mesh position={[0, 0.29, 0.13]}>
          <boxGeometry args={[0.95, 0.022, 0.045]} />
          <meshStandardMaterial color={COLORS.red} emissive={COLORS.red} emissiveIntensity={1.9} toneMapped={false} />
        </mesh>

        {/* Rejillas de ventilación */}
        {[-0.35, 0.35].map((x) => (
          <mesh key={x} position={[x, -0.1, 0.28]}>
            <boxGeometry args={[0.15, 0.08, 0.01]} />
            <meshStandardMaterial color="#0d0204" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}

        <mesh ref={ringARef} rotation={[0.5, 0.2, 0]}>
          <torusGeometry args={[1.28, 0.009, 8, 96]} />
          <meshBasicMaterial color={COLORS.gold} transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh ref={ringBRef} rotation={[-0.4, -0.3, 0.4]}>
          <torusGeometry args={[1.48, 0.007, 8, 96]} />
          <meshBasicMaterial color={COLORS.red} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh ref={ringCRef} rotation={[0.2, 0.8, -0.3]}>
          <torusGeometry args={[1.12, 0.006, 8, 96]} />
          <meshBasicMaterial color={COLORS.orange} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        <group ref={orbitalsRef}>
          {ORBITALS.map((o, i) => (
            <sprite key={i} scale={o.size}>
              <spriteMaterial map={glowTex} color={o.color} transparent opacity={0.92} blending={THREE.AdditiveBlending} depthWrite={false} />
            </sprite>
          ))}
        </group>

        <sprite position={[0, -1.08, 0]} scale={[2.8, 1.15, 1]}>
          <spriteMaterial map={glowTex} color={COLORS.ember} transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
        <mesh position={[0, -0.94, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.88, 0.905, 64]} />
          <meshBasicMaterial color={COLORS.orange} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>

        <group position={[lensX, lensY, lensZ]}>
          <mesh>
            <circleGeometry args={[0.2, 56]} />
            <primitive object={lensLeftMat} attach="material" />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <ringGeometry args={[0.17, 0.2, 48]} />
            <meshStandardMaterial color={COLORS.gold} emissive={COLORS.gold} emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
          </mesh>
          <sprite position={[0, 0, 0.025]} scale={0.65}>
            <spriteMaterial map={glowTex} color={COLORS.red} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
          </sprite>
        </group>

        <group position={[-lensX, lensY, lensZ]}>
          <mesh>
            <circleGeometry args={[0.2, 56]} />
            <primitive object={lensRightMat} attach="material" />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <ringGeometry args={[0.17, 0.2, 48]} />
            <meshStandardMaterial color={COLORS.gold} emissive={COLORS.gold} emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
          </mesh>
          <sprite position={[0, 0, 0.025]} scale={0.65}>
            <spriteMaterial map={glowTex} color={COLORS.gold} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
          </sprite>
        </group>

        {[-0.56, 0.56].map((x) => (
          <Sphere key={x} args={[0.038, 14, 14]} position={[x, 0.22, 0.25]}>
            <meshStandardMaterial color={COLORS.gold} emissive={COLORS.gold} emissiveIntensity={1.8} toneMapped={false} />
          </Sphere>
        ))}

        <pointLight position={[0, 0.2, 1.5]} intensity={1.8} distance={5.5} color={COLORS.orange} />
      </group>
    </Float>
  );
}
