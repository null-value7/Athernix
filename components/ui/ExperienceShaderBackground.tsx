// @ts-nocheck
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.y += sin(pos.x * 5.5 + time) * 0.12 * intensity;
    pos.x += cos(pos.y * 4.0 + time * 1.4) * 0.08 * intensity;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float wave = sin(uv.x * 12.0 + time * 0.75) * cos(uv.y * 10.0 - time * 0.55);
    wave += sin((uv.x + uv.y) * 18.0 - time * 1.2) * 0.35;

    vec3 color = mix(color1, color2, wave * 0.5 + 0.5);
    color = mix(color, color3, smoothstep(0.45, 0.95, uv.y) * 0.45);

    float vignette = 1.0 - length(uv - 0.5) * 1.45;
    float glow = pow(max(vignette, 0.0), 2.2);
    float alpha = glow * (0.22 + abs(wave) * 0.16) * intensity;

    gl_FragColor = vec4(color, alpha);
  }
`;

function ShaderPlane({ position, rotation = [0, 0, 0], scale = [1, 1, 1] }) {
  const mesh = useRef(null);
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      intensity: { value: 0.9 },
      color1: { value: new THREE.Color('#FF006E') },
      color2: { value: new THREE.Color('#FF6B00') },
      color3: { value: new THREE.Color('#FFD700') },
    }),
    []
  );

  useFrame((state) => {
    uniforms.time.value = state.clock.elapsedTime;
    uniforms.intensity.value = 0.75 + Math.sin(state.clock.elapsedTime * 0.8) * 0.18;
    if (mesh.current) {
      mesh.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 0.18) * 0.04;
    }
  });

  return (
    <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[3, 3, 48, 48]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function EnergyRing({ radius = 1, position = [0, 0, 0], color = '#FF6B00', speed = 1 }) {
  const mesh = useRef(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z = state.clock.elapsedTime * speed;
      mesh.current.material.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 1.8) * 0.05;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <ringGeometry args={[radius * 0.94, radius, 96]} />
      <meshBasicMaterial color={color} transparent opacity={0.14} side={THREE.DoubleSide} />
    </mesh>
  );
}

function BackgroundParticles({ count = 260 }) {
  const points = useRef(null);
  const { positions, colors } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const palette = [new THREE.Color('#FF006E'), new THREE.Color('#FF6B00'), new THREE.Color('#FFD700')];
    const rand = (seed) => {
      const value = Math.sin(seed * 78.233) * 43758.5453;
      return value - Math.floor(value);
    };

    for (let i = 0; i < count; i++) {
      p[i * 3] = (rand(i + 1) - 0.5) * 14;
      p[i * 3 + 1] = (rand(i + 5) - 0.5) * 8;
      p[i * 3 + 2] = (rand(i + 9) - 0.5) * 5;
      const color = palette[i % palette.length];
      c[i * 3] = color.r;
      c[i * 3 + 1] = color.g;
      c[i * 3 + 2] = color.b;
    }

    return { positions: p, colors: c };
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.025;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        vertexColors
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ExperienceShaderBackground() {
  return (
    <div className="exp-shader-bg" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 7], fov: 55 }} gl={{ alpha: true, antialias: true }}>
        <ShaderPlane position={[-3.2, 1.2, -1.2]} rotation={[0.1, 0.2, -0.22]} scale={[2.4, 1.5, 1]} />
        <ShaderPlane position={[3.4, -1.4, -1.8]} rotation={[0.05, -0.25, 0.28]} scale={[2.1, 1.8, 1]} />
        <EnergyRing radius={2.5} position={[2.8, 1.4, -1]} color="#FF006E" speed={0.22} />
        <EnergyRing radius={3.2} position={[-2.6, -1.5, -1.6]} color="#FFD700" speed={-0.16} />
        <BackgroundParticles />
      </Canvas>
    </div>
  );
}
