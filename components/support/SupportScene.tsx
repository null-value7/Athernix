"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Paleta de marca ─── */
const CORE_COLORS = ["#ff6b35", "#ffd700", "#ff006e"];

/* ─── Núcleo: esfera de partículas que pulsa como una señal ─── */
function SignalCore({ count = 2800 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = CORE_COLORS.map((c) => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.5 + (Math.random() - 0.5) * 0.08;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame(({ clock }, delta) => {
    if (!points.current) return;
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 1.6) * 0.045;
    points.current.scale.set(s, s, s);
    points.current.rotation.y += delta * 0.16;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Anillo orbital con satélite luminoso ─── */
function OrbitRing({
  radius, tiltX, tiltZ, speed, color, satColor,
}: {
  radius: number; tiltX: number; tiltZ: number; speed: number; color: string; satColor: string;
}) {
  const group = useRef<THREE.Group>(null!);
  const sat = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!group.current || !sat.current) return;
    const t = clock.getElapsedTime() * speed;
    group.current.rotation.y += 0.0012;
    sat.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius, 0);
  });

  return (
    <group ref={group} rotation={[tiltX, 0, tiltZ]}>
      <mesh>
        <torusGeometry args={[radius, 0.008, 8, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <mesh ref={sat}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color={satColor} />
      </mesh>
    </group>
  );
}

/* ─── Ondas expansivas (señal saliendo del núcleo) ─── */
function PulseWave({ delay, color }: { delay: number; color: string }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame(({ clock }) => {
    if (!mesh.current || !mat.current) return;
    const t = ((clock.getElapsedTime() + delay) % 3.2) / 3.2;
    const s = 1.7 + t * 2.6;
    mesh.current.scale.set(s, s, s);
    mat.current.opacity = 0.35 * (1 - t);
  });

  return (
    <mesh ref={mesh}>
      <ringGeometry args={[1, 1.015, 96]} />
      <meshBasicMaterial ref={mat} color={color} transparent side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

/* ─── Parallax con el puntero ─── */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null!);
  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.x * 0.45 - group.current.rotation.y) * 0.045;
    group.current.rotation.x += (-pointer.y * 0.3 - group.current.rotation.x) * 0.045;
  });
  return <group ref={group}>{children}</group>;
}

export default function SupportScene() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    let hasWebGL = true;
    try {
      const c = document.createElement("canvas");
      hasWebGL = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      hasWebGL = false;
    }

    const compute = () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const no3d = document.documentElement.classList.contains("a11y-no3d");
      setMounted(hasWebGL && !reduceMotion && !no3d);
    };
    compute();

    const handleVisibility = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("atx-a11y-changed", compute);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("atx-a11y-changed", compute);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="support-hero-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        frameloop={active ? "always" : "never"}
      >
        <Rig>
          <SignalCore />
          <OrbitRing radius={2.3} tiltX={Math.PI / 2.6} tiltZ={0.3} speed={0.55} color="#ff6b35" satColor="#ffd700" />
          <OrbitRing radius={2.8} tiltX={Math.PI / 1.9} tiltZ={-0.5} speed={-0.38} color="#ff006e" satColor="#ff6b35" />
          <OrbitRing radius={3.3} tiltX={Math.PI / 3.4} tiltZ={0.9} speed={0.26} color="#ffd700" satColor="#ff006e" />
          <PulseWave delay={0} color="#ff6b35" />
          <PulseWave delay={1.1} color="#ff006e" />
          <PulseWave delay={2.2} color="#ffd700" />
        </Rig>
      </Canvas>
    </div>
  );
}
