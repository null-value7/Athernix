"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { RobotState } from "./RobotCanvas";

const MOVE_SPEED = 0.06;
const INITIAL_POS = new THREE.Vector3(1.4, -2.5, 3);
const INITIAL_ROT_Y = -0.4;

const FACE_COLORS: Record<string, string> = {
  idle: "#ff003c",
  happy: "#00ff88",
  distracted: "#ffd700",
  pro: "#ff6b00",
  angry: "#ff006e",
  glitch: "#ffffff",
};

export function FallbackRobot({ robotState }: { robotState: RobotState }) {
  const groupRef = useRef<THREE.Group>(null!);
  const faceMeshRef = useRef<THREE.Mesh>(null!);
  const targetPosRef = useRef(INITIAL_POS.clone());
  const targetRotRef = useRef(INITIAL_ROT_Y);
  const bobRef = useRef(0);

  useEffect(() => {
    if (robotState.mode === "register") {
      targetPosRef.current.x = -1.4;
      targetRotRef.current = 0.5;
    } else {
      targetPosRef.current.x = 1.4;
      targetRotRef.current = -0.4;
    }
  }, [robotState.mode]);

  useEffect(() => {
    const mat = faceMeshRef.current?.material as THREE.MeshStandardMaterial | undefined;
    if (!mat) return;

    let color = FACE_COLORS.idle;
    if (robotState.focusedInput === "dance") color = FACE_COLORS.happy;
    if (robotState.focusedInput === "spy") color = FACE_COLORS.distracted;

    mat.emissive.set(color);
    mat.color.set(color);
  }, [robotState.focusedInput]);

  useFrame((state) => {
    if (!groupRef.current) return;

    bobRef.current += 0.04;
    groupRef.current.position.y =
      targetPosRef.current.y + Math.sin(bobRef.current) * 0.08;
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetPosRef.current.x,
      MOVE_SPEED
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetPosRef.current.z,
      MOVE_SPEED
    );

    const targetQuat = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      targetRotRef.current
    );
    groupRef.current.quaternion.slerp(targetQuat, MOVE_SPEED);

    if (robotState.autoRotate) {
      targetRotRef.current += 0.005;
    }

    const mat = faceMeshRef.current?.material as THREE.MeshStandardMaterial | undefined;
    if (mat) {
      const pulse = 4 + Math.sin(state.clock.getElapsedTime() * 2) * 1.5;
      mat.emissiveIntensity = robotState.neonActive ? pulse : 0.3;
    }
  });

  const bodyIntensity = robotState.neonActive ? 2.5 : 0.2;

  return (
    <group ref={groupRef} position={INITIAL_POS.toArray()}>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1.2, 1.4, 0.9]} />
        <meshStandardMaterial
          color="#1a0022"
          emissive="#440011"
          emissiveIntensity={bodyIntensity}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 1.55, 0]}>
        <boxGeometry args={[0.9, 0.7, 0.75]} />
        <meshStandardMaterial
          color="#120018"
          emissive="#330022"
          emissiveIntensity={bodyIntensity}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>
      <mesh ref={faceMeshRef} position={[0, 1.55, 0.38]}>
        <planeGeometry args={[0.55, 0.35]} />
        <meshStandardMaterial
          color={FACE_COLORS.idle}
          emissive={FACE_COLORS.idle}
          emissiveIntensity={6}
          transparent
          opacity={0.95}
        />
      </mesh>
      <mesh position={[-0.75, 0.2, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.12, 0.7, 4, 8]} />
        <meshStandardMaterial
          color="#1a0022"
          emissive="#ff006e"
          emissiveIntensity={bodyIntensity}
          metalness={0.7}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0.75, 0.2, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.12, 0.7, 4, 8]} />
        <meshStandardMaterial
          color="#1a0022"
          emissive="#ff6b00"
          emissiveIntensity={bodyIntensity}
          metalness={0.7}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}
