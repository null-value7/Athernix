"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Paleta de marca (privacidad: púrpura + naranja) ─── */
const SHELL_COLORS = ["#a855f7", "#ff6b35", "#ff3060"];

/* ─── Bóveda: octaedro wireframe girando (el "núcleo de datos") ─── */
function VaultCore() {
  const outer = useRef<THREE.Mesh>(null!);
  const inner = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }, delta) => {
    if (!outer.current || !inner.current) return;
    const t = clock.getElapsedTime();
    outer.current.rotation.y += delta * 0.3;
    outer.current.rotation.x = Math.sin(t * 0.4) * 0.25;
    inner.current.rotation.y -= delta * 0.55;
    inner.current.rotation.z += delta * 0.2;
    const s = 1 + Math.sin(t * 1.4) * 0.04;
    inner.current.scale.set(s, s, s);
  });

  return (
    <group>
      <mesh ref={outer}>
        <octahedronGeometry args={[1.35, 0]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.62, 0]} />
        <meshBasicMaterial color="#ff6b35" wireframe transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

/* ─── Escudo: cascarón de partículas alrededor de la bóveda ─── */
function ShieldShell({ count = 2400 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = SHELL_COLORS.map((c) => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 2.05 + (Math.random() - 0.5) * 0.1;
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

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y -= delta * 0.08;
    points.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.7}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Escáner: aro que recorre el escudo verticalmente ─── */
function ScanRing() {
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame(({ clock }) => {
    if (!mesh.current || !mat.current) return;
    const t = clock.getElapsedTime();
    const y = Math.sin(t * 0.7) * 1.7;
    const r = Math.sqrt(Math.max(0.05, 2.05 * 2.05 - y * y)) / 2.05;
    mesh.current.position.y = y;
    mesh.current.scale.set(r, r, r);
    mat.current.opacity = 0.5 + Math.sin(t * 3) * 0.18;
  });

  return (
    <mesh ref={mesh} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[2.05, 0.012, 8, 128]} />
      <meshBasicMaterial ref={mat} color="#ffd700" transparent depthWrite={false} />
    </mesh>
  );
}

/* ─── Paquetes de datos orbitando (cubos protegidos) ─── */
function DataPackets({ count = 5 }: { count?: number }) {
  const group = useRef<THREE.Group>(null!);
  const packets = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        radius: 2.7 + (i % 3) * 0.35,
        speed: 0.35 + (i % 4) * 0.12,
        offset: (i / count) * Math.PI * 2,
        tilt: (i / count) * Math.PI,
        color: SHELL_COLORS[i % SHELL_COLORS.length],
      })),
    [count]
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const p = packets[i];
      const a = t * p.speed + p.offset;
      child.position.set(
        Math.cos(a) * p.radius,
        Math.sin(a) * Math.sin(p.tilt) * p.radius * 0.55,
        Math.sin(a) * Math.cos(p.tilt) * p.radius
      );
      child.rotation.x += 0.01;
      child.rotation.y += 0.014;
    });
  });

  return (
    <group ref={group}>
      {packets.map((p, i) => (
        <mesh key={i}>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
          <meshBasicMaterial color={p.color} wireframe transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Parallax con el puntero ─── */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null!);
  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.x * 0.4 - group.current.rotation.y) * 0.045;
    group.current.rotation.x += (-pointer.y * 0.28 - group.current.rotation.x) * 0.045;
  });
  return <group ref={group}>{children}</group>;
}

export default function PrivacyScene() {
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
    <div className="privacy-hero-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        frameloop={active ? "always" : "never"}
      >
        <Rig>
          <VaultCore />
          <ShieldShell />
          <ScanRing />
          <DataPackets />
        </Rig>
      </Canvas>
    </div>
  );
}
