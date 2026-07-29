'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface BrainMap3DProps {
  achievements: Array<{
    id: string;
    unlocked: boolean;
    color: string;
    icon: string;
  }>;
}

export default function BrainMap3D({ achievements }: BrainMap3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const brainRef = useRef<THREE.Group | null>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Brain group
    const brainGroup = new THREE.Group();
    scene.add(brainGroup);
    brainRef.current = brainGroup;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xff6b35, 0.4);
    directionalLight2.position.set(-5, 3, -5);
    scene.add(directionalLight2);

    // Load 3D model
    const loader = new GLTFLoader();
    loader.load(
      '/models/brain.glb', // RUTA DEL MODELO: Coloca tu archivo .glb o .gltf en public/models/
      (gltf) => {
        const model = gltf.scene;
        
        // Scale and position the model
        model.scale.set(0.08, 0.08, 0.08);
        model.position.set(0, 0, 0);
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        brainGroup.add(model);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100).toFixed(2) + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
        // Fallback to simple brain shape if model fails to load
        createFallbackBrain(brainGroup);
      }
    );

    // Achievement nodes positions (adjusted for 3D model)
    const nodePositions = [
      { x: -0.8, y: 0.8, z: 0.5 },   // Frontal left
      { x: 0.8, y: 0.8, z: 0.5 },    // Frontal right
      { x: -1.0, y: 0.2, z: 0 },    // Parietal left
      { x: 1.0, y: 0.2, z: 0 },     // Parietal right
      { x: -0.6, y: -0.5, z: 0.3 }, // Temporal left
      { x: 0.6, y: -0.5, z: 0.3 },  // Temporal right
      { x: 0, y: -0.8, z: 0.5 },    // Occipital
      { x: 0, y: 0.3, z: 0.8 },     // Top center
    ];

    // Create achievement nodes
    const nodes: THREE.Mesh[] = [];
    achievements.forEach((achievement, i) => {
      if (i >= nodePositions.length) return;

      const pos = nodePositions[i];
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: achievement.unlocked 
          ? new THREE.Color(achievement.color) 
          : new THREE.Color(0x333333),
        transparent: true,
        opacity: achievement.unlocked ? 0.9 : 0.4,
      });

      const nodeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(pos.x, pos.y, pos.z);
      brainGroup.add(node);
      nodes.push(node);

      // Glow effect for unlocked nodes
      if (achievement.unlocked) {
        const glowGeometry = new THREE.SphereGeometry(0.25, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(achievement.color),
          transparent: true,
          opacity: 0.3,
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.set(pos.x, pos.y, pos.z);
        brainGroup.add(glow);
        nodes.push(glow);
      }

      // Connection lines
      if (i > 0) {
        const prevPos = nodePositions[i - 1];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(prevPos.x, prevPos.y, prevPos.z),
          new THREE.Vector3(pos.x, pos.y, pos.z),
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: achievement.unlocked 
            ? new THREE.Color(achievement.color) 
            : new THREE.Color(0x444444),
          transparent: true,
          opacity: achievement.unlocked ? 0.5 : 0.2,
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        brainGroup.add(line);
      }
    });

    nodesRef.current = nodes;

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
      size: 0.02,
      transparent: true,
      opacity: 0.6,
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate brain slowly
      if (brainGroup) {
        brainGroup.rotation.y += 0.002;
      }

      // Animate nodes
      nodesRef.current.forEach((node, i) => {
        const material = node.material as THREE.MeshBasicMaterial;
        if (material && material.opacity > 0.5) {
          const scale = 1 + Math.sin(Date.now() * 0.003 + i) * 0.1;
          node.scale.setScalar(scale);
        }
      });

      // Animate particles
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
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
      cancelAnimationFrame(animationId);
      
      if (renderer && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
      
      scene.clear();
    };
  }, [achievements]);

  // Fallback function if model fails to load
  const createFallbackBrain = (brainGroup: THREE.Group) => {
    const brainMaterial = new THREE.MeshBasicMaterial({
      color: 0x1a0a0e,
      transparent: true,
      opacity: 0.9,
      wireframe: false,
    });

    const brainWireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b35,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });

    // Main brain hemispheres
    const leftHemisphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      brainMaterial
    );
    leftHemisphere.position.x = -0.6;
    leftHemisphere.scale.set(1, 0.9, 1.1);
    brainGroup.add(leftHemisphere);

    const leftWireframe = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      brainWireframeMaterial
    );
    leftWireframe.position.x = -0.6;
    leftWireframe.scale.set(1, 0.9, 1.1);
    brainGroup.add(leftWireframe);

    const rightHemisphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      brainMaterial
    );
    rightHemisphere.position.x = 0.6;
    rightHemisphere.scale.set(1, 0.9, 1.1);
    brainGroup.add(rightHemisphere);

    const rightWireframe = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      brainWireframeMaterial
    );
    rightWireframe.position.x = 0.6;
    rightWireframe.scale.set(1, 0.9, 1.1);
    brainGroup.add(rightWireframe);

    // Brain stem
    const brainStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.4, 1.5, 16),
      brainMaterial
    );
    brainStem.position.y = -1.2;
    brainGroup.add(brainStem);

    const stemWireframe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.4, 1.5, 16),
      brainWireframeMaterial
    );
    stemWireframe.position.y = -1.2;
    brainGroup.add(stemWireframe);
  };

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '400px',
        position: 'relative'
      }}
    />
  );
}
