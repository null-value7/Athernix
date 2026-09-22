"use client";

import { COLORS } from "@/lib/theme";

interface Props {
  color: string;
  intensity?: number;
  position?: [number, number, number];
}

/** Iluminación local coherente para cada isla — point + spot suave. */
export default function IslandLighting({ color, intensity = 2.6, position = [0, 1.2, 2] }: Props) {
  return (
    <>
      <pointLight color={color} intensity={intensity} distance={10} decay={2} position={position} />
      <spotLight
        color={COLORS.gold}
        intensity={0.8}
        angle={0.5}
        penumbra={0.8}
        distance={12}
        position={[position[0] + 2, position[1] + 3, position[2] + 1]}
      />
    </>
  );
}
