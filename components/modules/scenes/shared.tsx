'use client';

// ═══════════════════════════════════════════════════════════
// VISTAS 3D COMPARTIDAS — detalle de módulo
// Marcadores de hotspot, campo de partículas y utilidades
// comunes a las tres escenas. El movimiento vive en
// controllers/modules/useModuleScene.
// ═══════════════════════════════════════════════════════════

import { useEffect, useMemo, useRef, useState } from 'react';
import type * as React from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei/web/Html';
import { useGLTF } from '@react-three/drei/core/Gltf';
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as THREE from 'three';
import type { Vec3 } from '@/models/modules';
import { dampFactor, type ModuleMotion } from '@/controllers/modules/useModuleScene';

/* ── Cursor sobre mallas (limpio al desmontar) ── */
export function useMeshCursor() {
  useEffect(
    () => () => {
      document.body.style.cursor = '';
    },
    []
  );
  return useMemo(
    () => ({
      over: (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      },
      out: () => {
        document.body.style.cursor = '';
      },
    }),
    []
  );
}

/* ── Marcador de hotspot: esfera + anillo pulsante + etiqueta ── */
export function HotspotMarker({
  index,
  position,
  label,
  accent,
  motion,
  selected,
  onSelect,
}: {
  index: number;
  position: Vec3;
  label: string;
  accent: string;
  motion: ModuleMotion;
  selected: boolean;
  onSelect: (i: number) => void;
}) {
  const [hover, setHover] = useState(false);
  const cursor = useMeshCursor();
  const ring = useRef<THREE.Mesh>(null);
  const ringMat = useRef<THREE.MeshBasicMaterial>(null);
  const dotMat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, delta) => {
    const t = motion.timeRef.current;
    const k = motion.stillRef.current ? 1 : dampFactor(delta);
    if (ring.current) {
      const pulse = selected ? 1.35 + Math.sin(t * 4.2) * 0.18 : 1;
      const s = ring.current.scale.x + ((hover ? 1.3 : pulse) - ring.current.scale.x) * k;
      ring.current.scale.setScalar(s);
    }
    if (ringMat.current) {
      ringMat.current.opacity += (((selected ? 0.9 : hover ? 0.7 : 0.4) - ringMat.current.opacity) * k);
    }
    if (dotMat.current) {
      dotMat.current.opacity += (((selected || hover ? 1 : 0.75) - dotMat.current.opacity) * k);
    }
  });

  return (
    <group position={position}>
      {/* etiqueta DOM sobre el punto */}
      {(hover || selected) && (
        <Html distanceFactor={11} center position={[0, 0.55, 0]} occlude={false} zIndexRange={[30, 10]}>
          <div className="md-hs-label">{label}</div>
        </Html>
      )}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(index);
        }}
        onPointerOver={(e) => {
          cursor.over(e);
          setHover(true);
        }}
        onPointerOut={() => {
          cursor.out();
          setHover(false);
        }}
      >
        <sphereGeometry args={[0.16, 18, 18]} />
        <meshBasicMaterial ref={dotMat} color={accent} transparent opacity={0.85} toneMapped={false} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.015, 8, 40]} />
        <meshBasicMaterial
          ref={ringMat}
          color={accent}
          transparent
          opacity={0.45}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
      {/* halo vertical sutil para que el punto se lea a distancia */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 1.4, 6]} />
        <meshBasicMaterial color={accent} transparent opacity={selected ? 0.5 : 0.18} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ── Modelo GLTF ajustado a altura objetivo ──
   Clona con SkeletonUtils (la escena cacheada de useGLTF jamás se
   muta), escala a `height` unidades de mundo y normaliza la base:
   el objeto queda centrado en X/Z y apoyado sobre y=0 del grupo
   padre. Envolver cada uso en <Suspense fallback={null}>. */
export function FitModel({
  url,
  height,
  castShadow = false,
  receiveShadow = false,
}: {
  url: string;
  /** altura deseada en unidades de mundo */
  height: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
}) {
  const { scene } = useGLTF(url);
  const fitted = useMemo(() => {
    const c = skeletonClone(scene);
    c.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(c);
    const size = box.getSize(new THREE.Vector3());
    const k = size.y > 0 ? height / size.y : 1;
    c.scale.setScalar(k);
    c.updateWorldMatrix(true, true);
    const b2 = new THREE.Box3().setFromObject(c);
    c.position.set(
      -(b2.min.x + b2.max.x) / 2,
      -b2.min.y,
      -(b2.min.z + b2.max.z) / 2
    );
    if (castShadow || receiveShadow) {
      c.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          m.castShadow = castShadow;
          m.receiveShadow = receiveShadow;
        }
      });
    }
    return c;
  }, [scene, height, castShadow, receiveShadow]);
  return <primitive object={fitted} />;
}

/* RNG determinista con semilla — fábrica a nivel módulo. */
export function seededRng(seedStart: number) {
  let seed = seedStart;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

/* ── Campo de partículas determinista ── */
export function useParticleField(
  palette: readonly string[],
  count: number,
  radius: [number, number],
  height: [number, number]
) {
  return useMemo(() => {
    const rnd = seededRng(7);
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colors = palette.map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      const a = rnd() * Math.PI * 2;
      const r = radius[0] + rnd() * (radius[1] - radius[0]);
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = height[0] + rnd() * (height[1] - height[0]);
      pos[i * 3 + 2] = Math.sin(a) * r;
      const c = colors[i % colors.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return g;
  }, [palette, count, radius, height]);
}
