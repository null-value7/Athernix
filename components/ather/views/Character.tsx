"use client";

import { useLayoutEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei/core/Gltf";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CHARACTER_MODEL_PATH, CHARACTER_OFFSET, CHARACTER_SCALE } from "@/components/ather/models/character";
import { jumpLiftAt, phaseWeights } from "@/components/ather/models/scenes";
import { useCharacterPerformance } from "@/components/ather/controllers/useCharacterPerformance";

useGLTF.preload(CHARACTER_MODEL_PATH);

type Props = {
  progressRef: React.MutableRefObject<number>;
  yawRef: React.MutableRefObject<number>;
};

export function Character({ progressRef, yawRef }: Props) {
  const { scene } = useGLTF(CHARACTER_MODEL_PATH);
  const yawGroup = useRef<THREE.Group>(null);
  const jumpStart = useRef<number | null>(null);

  useLayoutEffect(() => {
    scene.traverse((obj: THREE.Object3D) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((mat) => {
        const std = mat as THREE.MeshStandardMaterial;
        if (std.isMeshStandardMaterial) {
          std.envMapIntensity = 1.25;
          std.roughness = Math.min(std.roughness ?? 0.7, 0.72);
          std.metalness = Math.min(std.metalness ?? 0.12, 0.18);
        }
      });
    });
  }, [scene]);

  useCharacterPerformance(scene, progressRef);

  useFrame(({ clock }) => {
    const g = yawGroup.current;
    if (!g) return;
    const { actW, waveW, spinW, closeW, thinkW, jumpW } = phaseWeights(progressRef.current);
    const t = clock.elapsedTime;
    // Slow meditative drift on the vertical axis while levitating.
    const yawTarget = yawRef.current + Math.sin(t * 0.5) * 0.12 * thinkW;
    g.rotation.y += (yawTarget - g.rotation.y) * 0.085;
    const bounce = Math.abs(Math.sin(t * 3.1));
    // Timed double-hop: fires when the jump phase takes over, replays on re-entry.
    if (jumpW > 0.4 && jumpStart.current === null) jumpStart.current = t;
    if (jumpW < 0.05) jumpStart.current = null;
    const lift = jumpStart.current === null ? 0 : jumpLiftAt(t - jumpStart.current);
    const liftN = Math.min(lift / 0.42, 1);
    // Whole-body bounce while acting, subtle breathing bob in close-ups.
    // Meditation stays grounded — only the legs fold into lotus.
    g.position.y =
      CHARACTER_OFFSET[1] +
      bounce * 0.028 * actW +
      Math.abs(Math.sin(t * 3.4)) * 0.012 * waveW +
      Math.sin(t * 1.55) * 0.005 * closeW +
      lift;
    // Lean into the turn; gentle idle lean otherwise.
    g.rotation.z = Math.sin(t * 0.8) * 0.012 * (closeW + waveW) + spinW * 0.045;
    // Forward pitch at the top of the jump; faint hover sway while meditating.
    g.rotation.x = liftN * 0.09 + Math.sin(t * 0.8) * 0.03 * thinkW;
    // Squash & stretch: stretch slightly at the top of each bounce, more in air.
    const squash = 1 + bounce * 0.014 * actW + Math.sin(t * 1.55) * 0.004 * closeW + liftN * 0.07;
    g.scale.setScalar(CHARACTER_SCALE * squash);
  });

  return (
    <group ref={yawGroup} scale={CHARACTER_SCALE} position={CHARACTER_OFFSET}>
      <primitive object={scene} />
    </group>
  );
}
