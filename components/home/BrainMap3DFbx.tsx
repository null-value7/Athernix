'use client';



import { useRef, useEffect } from 'react';

import * as THREE from 'three';

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';



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

  const introRef = useRef<number | null>(null);

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

        part.userData.baseEmissive = 0.6;

        material.opacity = 0.95;

      } else {

        // Bloqueado: naranja Athernix tenue, legible sin deslumbrar

        material.color.setHex(0xff7a1a);

        material.emissive.setHex(0xff5500);

        part.userData.baseEmissive = 0.28;

        material.opacity = 0.75;

      }

      material.emissiveIntensity = part.userData.baseEmissive as number;

      material.blending = THREE.AdditiveBlending;

      material.depthWrite = false;

      material.wireframe = true;

      material.needsUpdate = true;

    });

  };



  useEffect(() => {

    if (!containerRef.current) return;



    const container = containerRef.current;



    // Scene setup

    const scene = new THREE.Scene();

    sceneRef.current = scene;



    // Iluminaci├│n para el cerebro 3D

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);

    scene.add(ambientLight);



    const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);

    keyLight.position.set(5, 5, 5);

    scene.add(keyLight);



    const fillLight = new THREE.DirectionalLight(0xff8c5a, 0.65);

    fillLight.position.set(-5, 1, 4);

    scene.add(fillLight);



    const rimLight = new THREE.DirectionalLight(0xff006e, 0.55);

    rimLight.position.set(0, 4, -5);

    scene.add(rimLight);



    // Luz holográfica interna: potencia el brillo del wireframe

    const holoLight = new THREE.PointLight(0xff6b00, 1.2, 9);

    holoLight.position.set(0, 0.4, 1.2);

    scene.add(holoLight);



    const camera = new THREE.PerspectiveCamera(

      52,

      container.clientWidth / container.clientHeight,

      0.1,

      1000

    );

    camera.position.z = 4.2;

    camera.position.y = 0.2;

    cameraRef.current = camera;



    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        failIfMajorPerformanceCaveat: false,
        powerPreference: 'low-power',
      });
    } catch (e) {
      console.warn('BrainMap3DFbx: WebGL context unavailable, skipping 3D brain.');
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

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

    const ringMat = new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.22 });

    const ring1 = new THREE.Mesh(ringGeo, ringMat);

    ring1.rotation.x = Math.PI * 0.45;

    brainGroup.add(ring1);



    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xff006e, transparent: true, opacity: 0.18 });

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.005, 16, 100), ringMat2);

    ring2.rotation.y = Math.PI * 0.35;

    brainGroup.add(ring2);



    // Ambient particles

    const particleGeometry = new THREE.BufferGeometry();

    const particleCount = 160;

    const positions = new Float32Array(particleCount * 3);



    for (let i = 0; i < particleCount * 3; i += 3) {

      positions[i] = (Math.random() - 0.5) * 4;

      positions[i + 1] = (Math.random() - 0.5) * 4;

      positions[i + 2] = (Math.random() - 0.5) * 4;

    }



    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));



    const particleMaterial = new THREE.PointsMaterial({

      color: 0xff6b35,

      size: 0.025,

      transparent: true,

      opacity: 0.55,

    });



    const particles = new THREE.Points(particleGeometry, particleMaterial);

    scene.add(particles);



    // Load FBX brain

    const loader = new FBXLoader();

    loader.load(

      '/models/cerebro.fbx',

      (fbx: THREE.Group) => {

        // Collect all meshes

        const parts: THREE.Mesh[] = [];

        fbx.traverse((child: THREE.Object3D) => {

          if (child instanceof THREE.Mesh) {

            const mesh = child;

            parts.push(mesh);



            // Replace material with controllable wireframe material

            const oldMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;

            // Material holográfico: wireframe aditivo naranja brillante

            const material = new THREE.MeshStandardMaterial({

              color: 0xff7a1a,

              emissive: 0xff5500,

              emissiveIntensity: 0.28,

              roughness: 0.35,

              metalness: 0.2,

              transparent: true,

              opacity: 0.75,

              wireframe: true,

              blending: THREE.AdditiveBlending,

              depthWrite: false,

            });

            mesh.userData.baseEmissive = 0.28;



            // Preserve original color texture if available

            if ((oldMat as THREE.MeshStandardMaterial)?.map) {

              material.map = (oldMat as THREE.MeshStandardMaterial).map;

            }



            mesh.material = material;

          }

        });



        if (!parts.length) {

          console.warn('FBX has no meshes');

          return;

        }



        console.log('[BrainMap3D FBX meshes]', parts.map((p) => p.name));



        // Center and scale to fit

        const box = new THREE.Box3().setFromObject(fbx);

        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);

        const scale = 2.2 / maxDim;

        fbx.scale.setScalar(scale);



        const center = box.getCenter(new THREE.Vector3()).multiplyScalar(-scale);

        fbx.position.copy(center);



        brainGroup.add(fbx);

        brainPartsRef.current = parts;

        fbxLoadedRef.current = true;

        // Intro holográfica: el cerebro "arranca" desde cero con flash

        brainGroup.scale.setScalar(0.001);

        introRef.current = performance.now();

        updateColors();

      },

      undefined,

      (err: unknown) => {

        console.error('Error loading FBX brain:', err);

      }

    );



    // Animation loop

    let animationId: number;

    const animate = () => {

      animationId = requestAnimationFrame(animate);



      const t = Date.now() * 0.001;

      const brainGroup = brainGroupRef.current;

      if (brainGroup) {

        brainGroup.rotation.y = THREE.MathUtils.lerp(brainGroup.rotation.y, t * 0.35 + mx * 0.5, 0.06);

        brainGroup.rotation.x = THREE.MathUtils.lerp(brainGroup.rotation.x, my * 0.3, 0.06);



        // Intro "power-up": escala de 0 a 1 con flash de energía (1.6s)

        let introBoost = 0;

        if (introRef.current != null) {

          const p = Math.min(1, (performance.now() - introRef.current) / 1600);

          const eased = 1 - Math.pow(1 - p, 3);

          brainGroup.scale.setScalar(0.001 + eased * 0.999);

          introBoost = (1 - p) * 0.9;

        }



        // Flicker sutil de holograma sobre la intensidad emisiva base

        const flicker = 0.92 + Math.sin(t * 9) * 0.05 + Math.sin(t * 17.3) * 0.03;

        for (const part of brainPartsRef.current) {

          const mat = part.material as THREE.MeshStandardMaterial;

          const base = (part.userData.baseEmissive as number) ?? 0.5;

          mat.emissiveIntensity = base * flicker + introBoost;

        }

      }



      ring1.rotation.z -= 0.0015;

      ring2.rotation.z += 0.0012;



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

        height: '100%',

        minHeight: '300px',

        position: 'relative',

      }}

    />

  );

}

