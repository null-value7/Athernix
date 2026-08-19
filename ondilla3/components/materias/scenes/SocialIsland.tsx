"use client";

import { useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { Vec3 } from "@/models/vr-viewer.model";
import { COLORS } from "@/lib/theme";

interface Props {
  position?: Vec3;
  scale?: number;
  reducedMotion?: boolean;
  interactive?: boolean;
}

// Posición aproximada de El Salvador sobre la esfera (lat/lng -> vector).
function latLngToVec3(lat: number, lng: number, radius: number): Vec3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

export default function SocialIsland({ position = [0, 0, 0], scale = 1, reducedMotion = false, interactive = false }: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const globeRef = useRef<THREE.Group>(null!);
  const scanRef = useRef<THREE.Mesh>(null!);
  const scanBRef = useRef<THREE.Mesh>(null!);
  const markerRef = useRef<THREE.Mesh>(null!);
  const ringsRef = useRef<THREE.Group>(null!);
  const hovered = useRef(false);
  const pulse = useRef(0);
  const zoom = useRef(1);

  const radius = 1.35;
  const markerPos = useMemo(() => latLngToVec3(13.8, -88.9, radius * 1.01), [radius]);
  const markerQuat = useMemo(() => {
    const normal = new THREE.Vector3(...markerPos).normalize();
    return new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  }, [markerPos]);

  const coreMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying vec3 vN;
          void main() {
            vN = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vN;
          uniform float uTime;
          void main() {
            float fr = pow(1.0 - abs(dot(vN, vec3(0.0, 0.0, 1.0))), 2.2);
            vec3 base = vec3(0.05, 0.008, 0.012);
            vec3 glow = mix(vec3(1.0, 0.17, 0.23), vec3(1.0, 0.62, 0.11), 0.5 + 0.5 * sin(uTime * 0.4));
            gl_FragColor = vec4(base + glow * fr * 0.75, 1.0);
          }
        `,
      }),
    []
  );

  useFrame((state, delta) => {
    coreMaterial.uniforms.uTime.value += delta;
    const boost = hovered.current ? 1.9 : 1;
    if (!reducedMotion) {
      globeRef.current.rotation.y += delta * 0.15 * boost;
      scanRef.current.rotation.y += delta * 0.4 * boost;
      if (scanBRef.current) scanBRef.current.rotation.z -= delta * 0.3 * boost;
    }
    const t = state.clock.getElapsedTime();
    if (markerRef.current) {
      const p = 1 + Math.sin(t * 3) * 0.25;
      markerRef.current.scale.setScalar(p);
    }
    // Ondas expansivas desde El Salvador
    ringsRef.current?.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const cycle = (t * 0.6 + i * 0.5) % 1;
      mesh.scale.setScalar(0.4 + cycle * 2.2);
      (mesh.material as THREE.MeshBasicMaterial).opacity = (1 - cycle) * 0.5;
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
      <pointLight color={COLORS.amber} intensity={2.4} distance={9} position={[2, 1, 2]} />

      <group ref={globeRef}>
        <mesh>
          <sphereGeometry args={[radius, 64, 64]} />
          <primitive object={coreMaterial} attach="material" />
        </mesh>
        <lineSegments>
          <wireframeGeometry args={[new THREE.SphereGeometry(radius * 1.01, 24, 16)]} />
          <lineBasicMaterial color={COLORS.orange} transparent opacity={0.14} />
        </lineSegments>
        <mesh ref={markerRef} position={markerPos}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color={COLORS.gold} emissive={COLORS.gold} emissiveIntensity={2.6} toneMapped={false} />
        </mesh>
        {/* Ondas que emanan de El Salvador */}
        <group ref={ringsRef} position={markerPos} quaternion={markerQuat}>
          {[0, 1].map((i) => (
            <mesh key={i}>
              <ringGeometry args={[0.09, 0.1, 32]} />
              <meshBasicMaterial color={COLORS.gold} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Anillos de escaneo */}
      <mesh ref={scanRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.35, 0.01, 8, 128]} />
        <meshBasicMaterial color={COLORS.red} transparent opacity={0.5} />
      </mesh>
      <mesh ref={scanBRef} rotation={[Math.PI / 2.6, 0.4, 0]}>
        <torusGeometry args={[radius * 1.55, 0.006, 8, 128]} />
        <meshBasicMaterial color={COLORS.gold} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <Sparkles count={reducedMotion ? 12 : 30} scale={[5.5, 4.5, 5.5]} size={2.4} speed={reducedMotion ? 0 : 0.3} color={COLORS.amber} opacity={0.65} />
    </group>
  );
}
