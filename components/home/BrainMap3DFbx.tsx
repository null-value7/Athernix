'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface BrainMap3DFbxProps {
  achievements: Array<{
    id: string;
    unlocked: boolean;
    color: string;
    icon: string;
  }>;
}

// You can override the default index mapping by achievement id if the FBX
// contains named meshes. The fallback is the array index.
const BRAIN_PART_OVERRIDES: Record<string, string | number> = {};

export default function BrainMap3DFbx({ achievements }: BrainMap3DFbxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const brainGroupRef = useRef<THREE.Group | null>(null);
  const brainPartsRef = useRef<THREE.Mesh[]>([]);
  const fbxLoadedRef = useRef(false);
  const achievementsRef = useRef(achievements);
  achievementsRef.current = achievements;

  // Sync colors with unlocked achievements
  const updateColors = () => {
    const parts = brainPartsRef.current;
    if (!parts.length) return;

    achievementsRef.current.forEach((achievement, i) => {
      let part: THREE.Mesh | undefined;

      const override = BRAIN_PART_OVERRIDES[achievement.id];
      if (typeof override === 'string') {
        part = parts.find((p) => p.name.toLowerCase().includes(override.toLowerCase()));
      } else if (typeof override === 'number') {
        part = parts[override];
      } else {
        part = parts[i % parts.length];
      }

      if (!part) return;

      const material = part.material as THREE.MeshStandardMaterial;
      if (!material) return;

      if (achievement.unlocked) {
        const c = new THREE.Color(achievement.color);
        material.color.copy(c);
        material.emissive.copy(c);
        material.emissiveIntensity = 0.4;
        material.opacity = 1;
        material.wireframe = false;
      } else {
        material.color.setHex(0x3a1510);
        material.emissive.setHex(0x1a0a05);
        material.emissiveIntensity = 0.3;
        material.opacity = 0.92;
        material.wireframe = false;
      }
      material.needsUpdate = true;
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Iluminación mejorada para el cerebro 3D
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xff8c5a, 0.8);
    fillLight.position.set(-5, 1, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xff006e, 0.6);
    rimLight.position.set(0, 4, -5);
    scene.add(rimLight);

    const bottomLight = new THREE.DirectionalLight(0x4a1a0a, 0.4);
    bottomLight.position.set(0, -3, 2);
    scene.add(bottomLight);

    const pointLight = new THREE.PointLight(0xff6b35, 0.5, 5);
    pointLight.position.set(0, 0, 1.5);
    scene.add(pointLight);

    const camera = new THREE.PerspectiveCamera(
      52,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4.2;
    camera.position.y = 0.2;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const brainGroup = new THREE.Group();
    scene.add(brainGroup);
    brainGroupRef.current = brainGroup;

    // Mouse parallax
    let mx = 0, my = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      my = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener('mousemove', onMouseMove);

    // Constellation rings
    const ringGeo = new THREE.TorusGeometry(2.1, 0.006, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.15 });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI * 0.45;
    brainGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xff006e, transparent: true, opacity: 0.12 });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.005, 16, 100), ringMat2);
    ring2.rotation.y = Math.PI * 0.35;
    brainGroup.add(ring2);

    // Ambient particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 4;
      positions[i + 1] = (Math.random() - 0.5) * 4;
      positions[i + 2] = (Math.random() - 0.5) * 4;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff6b35,
      size: 0.015,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Procedural brain: organic blob with multi-frequency noise displacement
    const brainParts: THREE.Mesh[] = [];
    const lobePositions: [number, number, number][] = [
      [0, 0.35, 0.1],      // Frontal
      [0.55, 0.15, 0.25],  // Frontal right
      [-0.55, 0.15, 0.25], // Frontal left
      [0.35, -0.15, -0.35],// Temporal right
      [-0.35, -0.15, -0.35],// Temporal left
      [0, 0.55, -0.15],    // Parietal
      [0.25, -0.4, 0.15],  // Cerebellum right
      [-0.25, -0.4, 0.15], // Cerebellum left
    ];

    for (let i = 0; i < lobePositions.length; i++) {
      const geo = new THREE.IcosahedronGeometry(0.6, 4);
      const positions = geo.attributes.position as THREE.BufferAttribute;
      for (let v = 0; v < positions.count; v++) {
        const x = positions.getX(v);
        const y = positions.getY(v);
        const z = positions.getZ(v);
        const n1 = Math.sin(x * 5) * Math.cos(y * 5) * 0.06;
        const n2 = Math.sin(x * 11 + y * 7) * 0.03;
        const n3 = Math.cos(z * 9 + x * 3) * 0.025;
        const noise = n1 + n2 + n3;
        const len = Math.sqrt(x * x + y * y + z * z) || 1;
        const nx = (x / len) * noise;
        const ny = (y / len) * noise;
        const nz = (z / len) * noise;
        positions.setXYZ(v, x + nx, y + ny, z + nz);
      }
      positions.needsUpdate = true;
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: 0x3a1510,
        emissive: 0x1a0a05,
        emissiveIntensity: 0.3,
        roughness: 0.35,
        metalness: 0.6,
        transparent: true,
        opacity: 0.92,
        wireframe: false,
        flatShading: true,
      });

      const mesh = new THREE.Mesh(geo, mat);
      const [px, py, pz] = lobePositions[i];
      mesh.position.set(px, py, pz);
      const scale = 0.7 + (i % 3) * 0.15;
      mesh.scale.setScalar(scale);
      brainGroup.add(mesh);
      brainParts.push(mesh);

      // Wireframe overlay for definition
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xff6b35,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      });
      const wireMesh = new THREE.Mesh(geo, wireMat);
      wireMesh.position.copy(mesh.position);
      wireMesh.scale.copy(mesh.scale);
      brainGroup.add(wireMesh);
    }

    // Inner glow core
    const coreGeo = new THREE.IcosahedronGeometry(0.3, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff6b35,
      transparent: true,
      opacity: 0.08,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    brainGroup.add(core);

    // Synaptic connection lines between lobes
    const synapsePositions: number[] = [];
    for (let i = 0; i < lobePositions.length; i++) {
      for (let j = i + 1; j < lobePositions.length; j++) {
        if (Math.random() > 0.4) continue;
        const [x1, y1, z1] = lobePositions[i];
        const [x2, y2, z2] = lobePositions[j];
        synapsePositions.push(x1, y1, z1, x2, y2, z2);
      }
    }
    if (synapsePositions.length > 0) {
      const synGeo = new THREE.BufferGeometry();
      synGeo.setAttribute('position', new THREE.Float32BufferAttribute(synapsePositions, 3));
      const synMat = new THREE.LineBasicMaterial({
        color: 0xff6b35,
        transparent: true,
        opacity: 0.15,
      });
      const synapses = new THREE.LineSegments(synGeo, synMat);
      brainGroup.add(synapses);
    }

    brainPartsRef.current = brainParts;
    fbxLoadedRef.current = true;
    updateColors();

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const t = Date.now() * 0.001;
      const brainGroup = brainGroupRef.current;
      if (brainGroup) {
        brainGroup.rotation.y = THREE.MathUtils.lerp(brainGroup.rotation.y, t * 0.35 + mx * 0.5, 0.06);
        brainGroup.rotation.x = THREE.MathUtils.lerp(brainGroup.rotation.x, my * 0.3, 0.06);
      }

      ring1.rotation.z -= 0.0015;
      ring2.rotation.z += 0.0012;

      // Core pulse
      const pulseScale = 1 + Math.sin(t * 2) * 0.08;
      core.scale.setScalar(pulseScale);
      (core.material as THREE.MeshBasicMaterial).opacity = 0.06 + Math.sin(t * 2) * 0.04;

      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);

      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }

      scene.clear();
      brainGroup.traverse((obj: THREE.Object3D) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose());
          else mesh.material.dispose();
        }
      });
    };
  }, []);

  // React to achievements changes
  useEffect(() => {
    if (fbxLoadedRef.current) {
      updateColors();
    }
  }, [achievements]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '400px',
        position: 'relative',
      }}
    />
  );
}
