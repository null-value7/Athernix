// @ts-nocheck
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AwardWinning3DProps {
  containerId?: string;
  variant?: 'particles' | 'tunnel' | 'wave' | 'sphere' | 'galaxy';
  colors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
  intensity?: number;
  interactive?: boolean;
}

export default function AwardWinning3D({
  containerId = 'award-3d-container',
  variant = 'particles',
  colors = { primary: '#FF6B00', secondary: '#FF006E', tertiary: '#FFD700' },
  intensity = 1,
  interactive = true
}: AwardWinning3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current || document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08000a, 0.02);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Color objects
    const color1 = new THREE.Color(colors.primary);
    const color2 = new THREE.Color(colors.secondary);
    const color3 = new THREE.Color(colors.tertiary);

    let particles: THREE.Points;
    let geometry: THREE.BufferGeometry;
    let material: THREE.PointsMaterial;

    // Variant-specific particle systems
    switch (variant) {
      case 'tunnel':
        particles = createTunnelParticles(scene, color1, color2, color3, intensity);
        break;
      case 'wave':
        particles = createWaveParticles(scene, color1, color2, color3, intensity);
        break;
      case 'sphere':
        particles = createSphereParticles(scene, color1, color2, color3, intensity);
        break;
      case 'galaxy':
        particles = createGalaxyParticles(scene, color1, color2, color3, intensity);
        break;
      default:
        particles = createDefaultParticles(scene, color1, color2, color3, intensity);
    }

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    if (interactive) {
      document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });
    }

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (particles) {
        particles.rotation.z += 0.001 * intensity;
        particles.rotation.y += 0.0005 * intensity;
        
        if (interactive) {
          camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
          camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.02;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
      if (renderer) renderer.dispose();
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, [containerId, variant, colors, intensity, interactive]);

  return <div ref={containerRef} id={containerId} className="award-3d-container" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// Particle system creators
function createTunnelParticles(scene: any, c1: any, c2: any, c3: any, intensity: number) {
  const count = 8000 * intensity;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 8 + 2;
    const theta = Math.random() * Math.PI * 2;
    const z = Math.random() * 400 - 200;

    positions[i3] = Math.cos(theta) * radius;
    positions[i3 + 1] = Math.sin(theta) * radius;
    positions[i3 + 2] = z;

    const color = [c1, c2, c3][Math.floor(Math.random() * 3)].clone();
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  return particles;
}

function createWaveParticles(scene: any, c1: any, c2: any, c3: any, intensity: number) {
  const count = 15000 * intensity;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = (Math.random() - 0.5) * 20;
    const z = (Math.random() - 0.5) * 20;
    const y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 2;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    const t = Math.random();
    let color;
    if (t < 0.33) color = c1.clone();
    else if (t < 0.66) color = c2.clone();
    else color = c3.clone();

    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  return particles;
}

function createSphereParticles(scene: any, c1: any, c2: any, c3: any, intensity: number) {
  const count = 12000 * intensity;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = 3 + Math.random() * 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    const color = [c1, c2, c3][Math.floor(Math.random() * 3)].clone();
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  return particles;
}

function createGalaxyParticles(scene: any, c1: any, c2: any, c3: any, intensity: number) {
  const count = 20000 * intensity;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 10;
    const spinAngle = radius * 0.5;
    const branchAngle = (i % 3) * ((Math.PI * 2) / 3);

    const x = Math.cos(branchAngle + spinAngle) * radius;
    const y = (Math.random() - 0.5) * (radius * 0.2);
    const z = Math.sin(branchAngle + spinAngle) * radius;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    const color = [c1, c2, c3][Math.floor(Math.random() * 3)].clone();
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  return particles;
}

function createDefaultParticles(scene: any, c1: any, c2: any, c3: any, intensity: number) {
  return createTunnelParticles(scene, c1, c2, c3, intensity);
}
