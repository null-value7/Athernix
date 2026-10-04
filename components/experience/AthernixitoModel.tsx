'use client';

// ═══════════════════════════════════════════
// VISTA — Athernixito (GLB clonado)
// Clona el esqueleto con SkeletonUtils para no tocar la escena
// cacheada; normaliza el modelo a ~2.6 unidades y lo posa con
// el controlador de pose procedural.
// ═══════════════════════════════════════════

import { useLayoutEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei/core/Gltf';
import * as THREE from 'three';
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { assetUrl } from '@/lib/assets';
import {
  useAthernixitoPose,
  type SceneMotion,
} from '@/controllers/experience/useExperienceScene';
import { useMeshCursor } from './SceneObjects';

const MODEL_URL = assetUrl('/models/Low-Poly.glb');

// Precarga al importar el módulo — evita la carrera de Suspense donde el
// parse del GLB se corta a mitad.
useGLTF.preload(MODEL_URL);

const MODEL_HEIGHT = 2.6;
const FEET_Y = -1.35;

// Bind pose por escena cacheada — sobrevive remounts y otras vistas.
const BIND_POSE = new WeakMap<THREE.Object3D, Record<string, number[]>>();

export function AthernixitoModel({
  motion,
  accent,
  onGreet,
}: {
  motion: SceneMotion;
  accent: number;
  onGreet: () => void;
}) {
  const { scene } = useGLTF(MODEL_URL);
  // SkeletonUtils.clone duplica huesos y skinned meshes — la escena
  // cacheada de useGLTF queda intacta para otros consumidores.
  const cloned = useMemo(() => {
    // Bind pose canónico: primer montaje lo captura en el WeakMap; si
    // algo posó la escena cacheada, la restauramos antes de clonar.
    let snap = BIND_POSE.get(scene);
    if (!snap) {
      snap = {};
      scene.traverse((o) => {
        if ((o as THREE.Bone).isBone)
          snap![o.name] = o.quaternion.toArray() as number[];
      });
      BIND_POSE.set(scene, snap);
    } else {
      scene.traverse((o) => {
        const q = snap![o.name];
        if ((o as THREE.Bone).isBone && q) o.quaternion.fromArray(q);
      });
    }
    return skeletonClone(scene);
  }, [scene]);
  const cursor = useMeshCursor();

  const norm = useMemo(() => {
    // Skinned bounds: computeBoundingBox() expands over bone-transformed
    // verts. If it misfires we fall back to the scale proven in the ather
    // views (~1m tall at .11 → .286 for 2.6 units).
    cloned.updateWorldMatrix(true, true);
    const box = new THREE.Box3();
    const tmp = new THREE.Box3();
    cloned.traverse((obj) => {
      const skinned = obj as THREE.SkinnedMesh;
      if (skinned.isSkinnedMesh) {
        skinned.skeleton.update();
        skinned.computeBoundingBox();
        if (skinned.boundingBox) {
          box.union(tmp.copy(skinned.boundingBox).applyMatrix4(skinned.matrixWorld));
        }
      }
    });
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    // Sane rendered height for this asset is ~5-12 world units — anything
    // outside that window means the skinned measure failed.
    const valid = !box.isEmpty() && size.y > 1 && size.y < 40 && Number.isFinite(size.y);
    const scale = valid ? MODEL_HEIGHT / size.y : 0.286;
    return {
      scale,
      position: [
        valid ? -center.x * scale : 0,
        valid ? -box.min.y * scale + FEET_Y : FEET_Y,
        valid ? -center.z * scale : 0,
      ] as [number, number, number],
    };
  }, [cloned]);

  useLayoutEffect(() => {
    cloned.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        mesh.frustumCulled = true;
      }
    });
  }, [cloned]);

  useAthernixitoPose(cloned, motion, accent);

  return (
    <group
      position={[0, 1.2, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onGreet();
      }}
      onPointerOver={cursor.over}
      onPointerOut={cursor.out}
    >
      <group scale={norm.scale} position={norm.position}>
        {/* dispose={null}: los materiales/geometría pertenecen al GLB
            cacheado de useGLTF — nunca los liberamos aquí. */}
        <primitive object={cloned} dispose={null} />
      </group>
    </group>
  );
}
