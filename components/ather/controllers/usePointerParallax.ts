"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

export function usePointerParallax(intensity = 0.18) {
  const group = useRef<Group>(null);
  const target = useMemo(() => ({ x: 0, y: 0 }), []);

  useFrame(({ pointer }) => {
    target.x += (pointer.x * intensity - target.x) * 0.06;
    target.y += (pointer.y * intensity - target.y) * 0.06;
    if (!group.current) return;
    group.current.rotation.y = target.x;
    group.current.rotation.x = -target.y * 0.35;
  });

  return group;
}
