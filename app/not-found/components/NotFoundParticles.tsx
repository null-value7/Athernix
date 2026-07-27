"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function NotFoundParticles() {
  const particlesRef = useRef<THREE.Points>(null!);
  const ringsRef = useRef<THREE.Mesh[]>([]);

  // Crear geometría de partículas
  const particlesGeometry = useMemo(() => {
    const N = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const speeds = new Float32Array(N * 2);
    const basePositions = new Float32Array(N * 3);

    const palette = [
      new THREE.Color(1, 0, 0.43), // Pink
      new THREE.Color(1, 0.42, 0), // Orange
      new THREE.Color(1, 0.84, 0), // Yellow
    ];

    for (let i = 0; i < N; i++) {
      const r = 10 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.6;

      basePositions[i * 3] = positions[i * 3];
      basePositions[i * 3 + 1] = positions[i * 3 + 1];
      basePositions[i * 3 + 2] = positions[i * 3 + 2];

      const color = palette[i % 3];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      speeds[i * 2] = 0.2 + Math.random() * 0.7;
      speeds[i * 2 + 1] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Guardar datos en userData para usar en useFrame
    geometry.userData = { speeds, basePositions };

    return geometry;
  }, []);

  // Crear anillos fantasma
  const rings = useMemo(() => {
    const ringData = [
      { r: 7, col: 0xFF006E, tilt: 0.35, spd: 0.0005 },
      { r: 11, col: 0xFF6B00, tilt: -0.2, spd: -0.0004 },
      { r: 15, col: 0xFFD700, tilt: 0.5, spd: 0.0003 },
    ];

    return ringData.map((d) => {
      const geometry = new THREE.TorusGeometry(d.r, 0.012, 8, 100);
      const material = new THREE.MeshBasicMaterial({
        color: d.col,
        transparent: true,
        opacity: 0.04,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = d.tilt;
      mesh.userData = { speed: d.spd };
      return mesh;
    });
  }, []);

  // Mouse tracking para parallax
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth - 0.5) * 0.3;
    mouseRef.current.y = (event.clientY / window.innerHeight - 0.5) * 0.3;
  };

  // Animación
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const geometry = particlesRef.current.geometry;
    const positions = geometry.attributes.position.array;
    const { speeds, basePositions } = geometry.userData as {
      speeds: Float32Array;
      basePositions: Float32Array;
    };

    // Animar partículas
    for (let i = 0; i < speeds.length / 2; i++) {
      const freq = speeds[i * 2];
      const phase = speeds[i * 2 + 1];

      positions[i * 3] = basePositions[i * 3] + Math.sin(time * freq * 0.12 + phase) * 0.4;
      positions[i * 3 + 1] = basePositions[i * 3 + 1] + Math.cos(time * freq * 0.1 + phase) * 0.3;
      positions[i * 3 + 2] = basePositions[i * 3 + 2] + Math.sin(time * freq * 0.15 + phase) * 0.22;
    }

    geometry.attributes.position.needsUpdate = true;

    // Animar anillos
    rings.forEach((ring) => {
      ring.rotation.y += ring.userData.speed;
      ring.rotation.z += ring.userData.speed * 0.4;
    });

    // Parallax de cámara
    const camera = state.camera as THREE.PerspectiveCamera;
    camera.position.x += (mouseRef.current.x - camera.position.x) * 0.02;
    camera.position.y += (-mouseRef.current.y - camera.position.y) * 0.02;
  });

  return (
    <>
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.13}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      {rings.map((ring, i) => (
        <primitive key={i} object={ring} />
      ))}
    </>
  );
}
