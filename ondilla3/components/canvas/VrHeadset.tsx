"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { getGlowTexture } from "./shared/glowTexture";
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
            float swirl = 0.5 + 0.5 * sin(atan(c.y, c.x) * 3.0 + uTime * 1.6 + d * 7.0);
            vec3 col = mix(uColorA, uColorB, swirl);
            float core = smoothstep(0.42, 0.0, d) * 0.65;
            gl_FragColor = vec4(col * (ring * 0.85 + core), ring);
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

/** Órbitas decorativas: chispas que giran alrededor del visor. */
const ORBITALS = [
  { radius: 1.35, speed: 0.55, phase: 0, y: 0.15, color: COLORS.gold, size: 0.16 },
  { radius: 1.5, speed: -0.4, phase: 2.1, y: -0.1, color: COLORS.red, size: 0.13 },
  { radius: 1.2, speed: 0.7, phase: 4.2, y: 0.32, color: COLORS.orange, size: 0.12 },
  { radius: 1.65, speed: -0.3, phase: 1.2, y: -0.28, color: COLORS.amber, size: 0.14 },
];

/** El visor VR: cuerpo, banda, lentes fuego, anillos de energía y pedestal. */
export default function VrHeadset({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const ringARef = useRef<THREE.Mesh>(null!);
  const ringBRef = useRef<THREE.Mesh>(null!);
  const orbitalsRef = useRef<THREE.Group>(null!);
  const lensLeftMat = useLensMaterial(COLORS.red, COLORS.gold);
  const lensRightMat = useLensMaterial(COLORS.orange, COLORS.gold);
  const glowTex = useMemo(() => getGlowTexture(), []);

  const [lensX] = LENS_LOCAL_POSITION;
  const lensY = LENS_LOCAL_POSITION[1];
  const lensZ = LENS_LOCAL_POSITION[2];

  useFrame((state, delta) => {
    lensLeftMat.uniforms.uTime.value += delta;
    lensRightMat.uniforms.uTime.value += delta;

    const t = state.clock.getElapsedTime();
    if (groupRef.current && !reducedMotion) {
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.05;
      groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.09;
      groupRef.current.rotation.x = Math.sin(t * 0.35) * 0.03;
    }
    if (!reducedMotion) {
      if (ringARef.current) ringARef.current.rotation.z += delta * 0.35;
      if (ringBRef.current) ringBRef.current.rotation.z -= delta * 0.25;
    }
    orbitalsRef.current?.children.forEach((child, i) => {
      const o = ORBITALS[i];
      const a = o.phase + (reducedMotion ? 0 : t * o.speed);
      child.position.set(Math.cos(a) * o.radius, o.y + Math.sin(t * 0.9 + o.phase) * 0.06, Math.sin(a) * o.radius * 0.55);
    });
  });

  return (
    <group ref={groupRef}>
      {/* Cuerpo principal */}
      <RoundedBox args={[1.55, 0.62, 0.55]} radius={0.14} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a0508" metalness={0.75} roughness={0.25} />
      </RoundedBox>

      {/* Placa frontal biselada */}
      <RoundedBox args={[1.42, 0.5, 0.08]} radius={0.1} smoothness={3} position={[0, 0, 0.26]}>
        <meshStandardMaterial color="#26070c" metalness={0.85} roughness={0.2} />
      </RoundedBox>

      {/* Banda trasera */}
      <mesh position={[0, 0, -0.25]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.62, 0.045, 12, 48, Math.PI]} />
        <meshStandardMaterial color="#2a0a0e" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Franja inferior luminosa */}
      <mesh position={[0, -0.27, 0.15]}>
        <boxGeometry args={[1.2, 0.03, 0.05]} />
        <meshStandardMaterial
          color={COLORS.orange}
          emissive={COLORS.orange}
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>

      {/* Franja superior roja */}
      <mesh position={[0, 0.28, 0.12]}>
        <boxGeometry args={[0.9, 0.02, 0.04]} />
        <meshStandardMaterial color={COLORS.red} emissive={COLORS.red} emissiveIntensity={1.8} toneMapped={false} />
      </mesh>

      {/* Anillos de energía */}
      <mesh ref={ringARef} rotation={[0.5, 0.2, 0]}>
        <torusGeometry args={[1.25, 0.008, 8, 96]} />
        <meshBasicMaterial color={COLORS.gold} transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ringBRef} rotation={[-0.4, -0.3, 0.4]}>
        <torusGeometry args={[1.45, 0.006, 8, 96]} />
        <meshBasicMaterial color={COLORS.red} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Chispas orbitales */}
      <group ref={orbitalsRef}>
        {ORBITALS.map((o, i) => (
          <sprite key={i} scale={o.size}>
            <spriteMaterial map={glowTex} color={o.color} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
          </sprite>
        ))}
      </group>

      {/* Pedestal de luz */}
      <sprite position={[0, -1.05, 0]} scale={[2.6, 1.1, 1]}>
        <spriteMaterial map={glowTex} color={COLORS.ember} transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      <mesh position={[0, -0.92, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.85, 0.87, 64]} />
        <meshBasicMaterial color={COLORS.orange} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Lente izquierdo — el portal de entrada */}
      <group position={[lensX, lensY, lensZ]}>
        <mesh rotation={[0, 0, 0]}>
          <circleGeometry args={[0.19, 48]} />
          <primitive object={lensLeftMat} attach="material" />
        </mesh>
        <sprite position={[0, 0, 0.02]} scale={0.6}>
          <spriteMaterial map={glowTex} color={COLORS.red} transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      </group>

      {/* Lente derecho */}
      <group position={[-lensX, lensY, lensZ]}>
        <mesh>
          <circleGeometry args={[0.19, 48]} />
          <primitive object={lensRightMat} attach="material" />
        </mesh>
        <sprite position={[0, 0, 0.02]} scale={0.6}>
          <spriteMaterial map={glowTex} color={COLORS.gold} transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      </group>

      {/* Sensores decorativos */}
      {[-0.55, 0.55].map((x) => (
        <Sphere key={x} args={[0.035, 12, 12]} position={[x, 0.2, 0.24]}>
          <meshStandardMaterial color={COLORS.gold} emissive={COLORS.gold} emissiveIntensity={1.6} toneMapped={false} />
        </Sphere>
      ))}

      {/* Luz cálida frontal */}
      <pointLight position={[0, 0.2, 1.4]} intensity={1.6} distance={5} color={COLORS.orange} />
    </group>
  );
}
