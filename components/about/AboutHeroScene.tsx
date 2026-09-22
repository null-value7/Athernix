"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ─── Brand palette (About page) ─── */
const PALETTE = ["#ff6b35", "#a855f7", "#ff3060"];

/* ─── Shared pointer + scroll progress tracker (no React re-renders) ─── */
function usePointerAndScroll(rootRef: React.RefObject<HTMLDivElement | null>) {
  const pointer = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = rootRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height + window.innerHeight;
        const passed = window.innerHeight - rect.top;
        scrollProgress.current = Math.min(1, Math.max(0, passed / total));
      });
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, [rootRef]);

  return { pointer, scrollProgress };
}

/* ─── Central glowing core + wireframe shell ─── */
function Core({
  pointer,
  scrollProgress,
  reduceMotion,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress: React.MutableRefObject<number>;
  reduceMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null!);
  const shell = useRef<THREE.Mesh>(null!);
  const distortMat = useRef<any>(null!);
  const color = useMemo(() => new THREE.Color(PALETTE[0]), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const sp = scrollProgress.current;

    if (group.current) {
      const idleSpeed = reduceMotion ? 0.02 : 0.12;
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.current.x * 0.5 + t * idleSpeed,
        0.04
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -pointer.current.y * 0.3 + sp * 1.1,
        0.04
      );
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, sp * 1.4, 0.06);
      const s = 1 - sp * 0.35;
      group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, s, 0.06));
    }

    if (shell.current) {
      shell.current.rotation.y -= delta * 0.15;
      shell.current.rotation.z += delta * 0.05;
    }

    if (distortMat.current) {
      const cycle = (Math.sin(t * 0.25) + 1) / 2;
      const idx = Math.floor(cycle * (PALETTE.length - 1));
      const nextIdx = Math.min(idx + 1, PALETTE.length - 1);
      const localT = cycle * (PALETTE.length - 1) - idx;
      tmpColor.copy(new THREE.Color(PALETTE[idx])).lerp(new THREE.Color(PALETTE[nextIdx]), localT);
      distortMat.current.color.lerp(tmpColor, 0.05);
      distortMat.current.emissive.lerp(tmpColor, 0.05);
      distortMat.current.distort = 0.35 + Math.sin(t * 0.6) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.05, 4]} />
        <MeshDistortMaterial
          ref={distortMat}
          color={color}
          emissive={color}
          emissiveIntensity={0.55}
          roughness={0.25}
          metalness={0.4}
          distort={0.35}
          speed={1.4}
        />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

/* ─── Orbiting particle ring ─── */
function ParticleRing({ count = 450 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = PALETTE.map((c) => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = r * Math.cos(phi);

      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.035;
      points.current.rotation.x = Math.sin(Date.now() * 0.0001) * 0.15;
    }
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
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Camera parallax rig ─── */
function CameraRig({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.current.x * 0.4, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -pointer.current.y * 0.25, 0.04);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene({ rootRef, dprBoost, reduceMotion }: { rootRef: React.RefObject<HTMLDivElement | null>; dprBoost: boolean; reduceMotion: boolean }) {
  const { pointer, scrollProgress } = usePointerAndScroll(rootRef);
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[-4, 3, 4]} intensity={2} color={PALETTE[0]} distance={14} />
      <pointLight position={[4, -2, 3]} intensity={1.6} color={PALETTE[1]} distance={14} />
      <CameraRig pointer={pointer} />
      <Core pointer={pointer} scrollProgress={scrollProgress} reduceMotion={reduceMotion} />
      <ParticleRing count={dprBoost ? 450 : 220} />
      <EffectComposer>
        <Bloom intensity={0.55} luminanceThreshold={0.35} luminanceSmoothing={0.6} mipmapBlur={false} />
      </EffectComposer>
    </>
  );
}

/* ─── Public component ─── */
export default function AboutHeroScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [inView, setInView] = useState(true);
  const [dpr, setDpr] = useState(1.5);

  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tooSmall = window.innerWidth < 380;
    let hasWebGL = true;
    try {
      const c = document.createElement("canvas");
      hasWebGL = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      hasWebGL = false;
    }
    if (!tooSmall && hasWebGL) setShouldMount(true);
  }, []);

  useEffect(() => {
    if (!shouldMount || !rootRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "50% 0px 50% 0px", threshold: 0 }
    );
    io.observe(rootRef.current);

    const handleVisibility = () => setInView((v) => v && !document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [shouldMount]);

  return (
    <div ref={rootRef} className="about-hero-scene" aria-hidden="true">
      {shouldMount && inView && (
        <Canvas
          dpr={[1, dpr]}
          camera={{ position: [0, 0, 6], fov: 42, near: 0.1, far: 100 }}
          gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
          frameloop="always"
        >
          <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
          <Suspense fallback={null}>
            <Scene rootRef={rootRef} dprBoost={dpr > 1} reduceMotion={reduceMotionRef.current} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
