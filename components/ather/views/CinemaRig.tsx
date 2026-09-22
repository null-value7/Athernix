"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei/web/ScrollControls";
import * as THREE from "three";
import { cameraFromProgress } from "@/components/ather/models/scenes";

type Props = {
  progressRef: React.MutableRefObject<number>;
  yawRef: React.MutableRefObject<number>;
};

export function CinemaRig({ progressRef, yawRef }: Props) {
  const scroll = useScroll();
  const look = useRef(new THREE.Vector3());
  const pos = useRef(new THREE.Vector3());
  const roll = useRef(0);
  const { camera } = useThree();

  useFrame(({ pointer, size, clock }) => {
    const p = scroll.offset;
    progressRef.current = p;
    const shot = cameraFromProgress(p, size.width / Math.max(size.height, 1));
    yawRef.current = shot.characterYaw;

    const t = clock.elapsedTime;
    pos.current.set(...shot.position);
    pos.current.x += pointer.x * 0.08 + Math.sin(t * 0.43) * 0.007 + Math.sin(t * 1.17) * 0.0025;
    pos.current.y += pointer.y * 0.04 + Math.sin(t * 0.61 + 1.3) * 0.005 + Math.sin(t * 1.9) * 0.002;
    pos.current.z += Math.sin(t * 0.37 + 2.1) * 0.006;
    look.current.set(...shot.lookAt);
    look.current.x += pointer.x * 0.03 + Math.sin(t * 0.5 + 0.7) * 0.003;
    look.current.y += Math.sin(t * 0.44 + 2.4) * 0.002;

    camera.position.lerp(pos.current, 0.075);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov += (shot.fov - camera.fov) * 0.06;
      camera.updateProjectionMatrix();
    }
    camera.lookAt(look.current);
    roll.current += (shot.roll - roll.current) * 0.07;
    camera.rotateZ(roll.current);
  });

  return null;
}
