"use client";

import { useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import type * as THREE from "three";

/** Hover + click pulse + scale zoom — compartido por todas las islas. */
export function useIslandInteraction(
  groupRef: React.RefObject<THREE.Group>,
  scale: number,
  reducedMotion: boolean,
  interactive: boolean
) {
  const hovered = useRef(false);
  const pulse = useRef(0);
  const zoom = useRef(1);

  useFrame((_, delta) => {
    if (pulse.current > 0) pulse.current = Math.max(0, pulse.current - delta * 1.4);
    const bonus = Math.sin(pulse.current * Math.PI) * 0.12;
    const target = (hovered.current ? 1.08 : 1) + bonus;
    zoom.current += (target - zoom.current) * Math.min(1, delta * 8);
    groupRef.current?.scale.setScalar(scale * zoom.current);
  });

  const boost = () => (hovered.current ? 1.9 : 1);

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

  return { hovered, pulse, zoom, boost, handlers, reducedMotion };
}
