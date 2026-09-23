"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { journeyStore } from "@/controllers/journeyStore";
import { sampleCameraPath } from "@/controllers/cameraPath";

/**
 * Sin salida visual: cada frame lee el progreso global y mueve la cámara
 * a lo largo de la coreografía, con parallax sutil de mouse y un leve
 * "roll" cinematográfico según la dirección lateral del recorrido.
 */
export default function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const currentLook = useRef(new THREE.Vector3());
  const mouse = useRef({ x: 0, y: 0 });
  const roll = useRef(0);
  const prevX = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    const t = journeyStore.get();
    const sample = sampleCameraPath(t);
    const par = reducedMotion ? 0 : 1;

    targetPos.current.set(
      sample.pos[0] + mouse.current.x * 0.16 * par,
      sample.pos[1] - mouse.current.y * 0.1 * par,
      sample.pos[2]
    );
    targetLook.current.set(
      sample.look[0] + mouse.current.x * 0.22 * par,
      sample.look[1] - mouse.current.y * 0.12 * par,
      sample.look[2]
    );

    const damp = reducedMotion ? 1 : 0.09;
    camera.position.lerp(targetPos.current, damp);
    currentLook.current.lerp(targetLook.current, damp);
    camera.lookAt(currentLook.current);

    // Roll: se inclina levemente hacia el lado al que viaja la cámara.
    const vx = camera.position.x - prevX.current;
    prevX.current = camera.position.x;
    const rollTarget = THREE.MathUtils.clamp(-vx * 1.4 - mouse.current.x * 0.02, -0.06, 0.06) * par;
    roll.current += (rollTarget - roll.current) * 0.06;
    camera.rotation.z += roll.current;

    const persp = camera as THREE.PerspectiveCamera;
    persp.fov += (sample.fov - persp.fov) * damp;
    persp.updateProjectionMatrix();
  });

  return null;
}
