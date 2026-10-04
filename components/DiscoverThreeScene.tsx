"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function DiscoverThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGLError, setWebGLError] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return undefined;

    let renderer: THREE.WebGLRenderer | null = null;
    let geometry: THREE.IcosahedronGeometry | null = null;
    let material: THREE.MeshStandardMaterial | null = null;
    let frameId = 0;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 5;
      scene.add(camera);

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
        failIfMajorPerformanceCaveat: false,
        powerPreference: "low-power",
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);

      geometry = new THREE.IcosahedronGeometry(2, 16);
      material = new THREE.MeshStandardMaterial({
        color: 0xec0d1a,
        metalness: 0.3,
        roughness: 0.4,
        emissive: new THREE.Color(0xec0d1a),
        emissiveIntensity: 0.3,
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(0, 0, 0);
      scene.add(sphere);

      const positionAttribute = geometry.attributes.position;
      const vertex = new THREE.Vector3();
      const originalVertices: THREE.Vector3[] = [];
      for (let i = 0; i < positionAttribute.count; i += 1) {
        vertex.fromBufferAttribute(positionAttribute, i);
        originalVertices.push(vertex.clone());
      }

      scene.add(new THREE.AmbientLight(0xffffff, 0.5));

      const directionalLight = new THREE.DirectionalLight(0xec0d1a, 3);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      const secondaryLight = new THREE.DirectionalLight(0xd90429, 3);
      secondaryLight.position.set(-5, -5, 2);
      scene.add(secondaryLight);

      const pointLight = new THREE.PointLight(0xffffff, 2, 10);
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);

      const clock = new THREE.Clock();
      let mouseX = 0;
      let mouseY = 0;
      let frameCount = 0;
      let scrollP = 0;
      let smoothScroll = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = event.clientX - window.innerWidth / 2;
        mouseY = event.clientY - window.innerHeight / 2;
      };

      const handleScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollP = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      };

      /* Recorrido scroll-driven del blob: mismo recorrido que el timeline GSAP
         (posición, escala, color, luz) pero calculado a mano desde scrollY —
         determinístico, sin depender de que el CDN haya cargado a tiempo. */
      const POS_KEYS: [number, number, number][] = [
        [0, 0, 0],
        [-2.5, -0.5, 1],
        [2.5, 0.5, 1.5],
        [0, 0, 2],
      ];
      const SCALE_KEYS = [1, 1, 1.2, 0.8];
      const COLOR_KEYS: [number, number, number][] = [
        [0.93, 0.05, 0.1],   // rojo
        [1, 0.84, 0],        // amarillo
        [1, 0.42, 0],        // naranja
        [0.95, 0.2, 0.02],   // naranja-rojizo
      ];
      const lerpNum = (a: number, b: number, t: number) => a + (b - a) * t;
      const easeIO = (t: number) => t * t * (3 - 2 * t);
      function sampleKeys<T>(keys: T[], u: number, mix: (a: T, b: T, t: number) => T): T {
        const seg = Math.min(keys.length - 2, Math.floor(u * (keys.length - 1)));
        const local = easeIO(Math.min(1, Math.max(0, u * (keys.length - 1) - seg)));
        return mix(keys[seg], keys[seg + 1], local);
      }
      const mixV3 = (a: [number, number, number], b: [number, number, number], t: number): [number, number, number] => [
        lerpNum(a[0], b[0], t),
        lerpNum(a[1], b[1], t),
        lerpNum(a[2], b[2], t),
      ];

      const applyScrollPose = (u: number) => {
        const pos = sampleKeys(POS_KEYS, u, mixV3);
        sphere.position.set(pos[0], pos[1], pos[2]);
        const s = sampleKeys(SCALE_KEYS, u, lerpNum);
        sphere.scale.set(s, s, s);
        const col = sampleKeys(COLOR_KEYS, u, mixV3);
        material!.color.setRGB(col[0], col[1], col[2]);
        material!.emissive.setRGB(col[0], col[1], col[2]);
        // rotZ y luz solo viajan en el primer tramo (0 → 1/3)
        const first = easeIO(Math.min(1, u * 3));
        sphere.rotation.z = first * (Math.PI / 2);
        directionalLight.position.set(lerpNum(5, -5, first), 5, 5);
      };

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        frameCount++;

        if (frameCount % 2 === 0) {
          const positions = sphere.geometry.attributes.position;
          for (let i = 0; i < positions.count; i += 1) {
            const p = originalVertices[i];
            const noise =
              Math.sin(p.x * 2 + elapsedTime) * 0.1 +
              Math.cos(p.y * 2 + elapsedTime * 0.8) * 0.1 +
              Math.sin(p.z * 2 + elapsedTime * 1.2) * 0.1;
            const scale = 1 + noise;
            positions.setXYZ(i, p.x * scale, p.y * scale, p.z * scale);
          }
          positions.needsUpdate = true;
        }

        sphere.rotation.y += 0.002 + 0.05 * (mouseX * 0.001 - sphere.rotation.y);
        sphere.rotation.x += 0.001 + 0.05 * (mouseY * 0.001 - sphere.rotation.x);

        smoothScroll += (scrollP - smoothScroll) * 0.08; // ~scrub 1 de GSAP
        applyScrollPose(smoothScroll);

        renderer!.render(scene, camera);
      };

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer!.setSize(window.innerWidth, window.innerHeight);
        renderer!.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      };

      const setupScrollMotion = () => {
        if (!(window as any).gsap || !(window as any).ScrollTrigger) return;

        (window as any).gsap.registerPlugin((window as any).ScrollTrigger);

        // Solo las entradas de las cards — el blob se mueve manual arriba.
        (window as any).gsap.utils.toArray(".discover-page .discover-content-block").forEach((block: HTMLElement) => {
          (window as any).gsap.fromTo(block,
            { y: 30 },
            {
              scrollTrigger: {
                trigger: block,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            }
          );
        });
      };

      document.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      animate();

      // GSAP solo para las entradas de las cards — reintenta porque el CDN
      // carga con afterInteractive y puede no estar listo al montar.
      let gsapRetries = 0;
      const tryScrollMotion = () => {
        if ((window as any).gsap && (window as any).ScrollTrigger) {
          setupScrollMotion();
        } else if (gsapRetries < 60) {
          gsapRetries += 1;
          setTimeout(tryScrollMotion, 100);
        }
      };
      tryScrollMotion();

      return () => {
        gsapRetries = 60; // detiene reintentos pendientes
        cancelAnimationFrame(frameId);
        document.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll);
        if ((window as any).ScrollTrigger) {
          (window as any).ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
        }
        if (geometry) geometry.dispose();
        if (material) material.dispose();
      };
    } catch (error) {
      console.warn('DiscoverThreeScene: WebGL initialization failed:', error);
      setWebGLError(true);
      return undefined;
    }
  }, []);

  if (webGLError) {
    return (
      <div className="discover-webgl-fallback" style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 50%, rgba(255,0,110,0.08) 0%, transparent 60%)',
      }} />
    );
  }

  return <canvas ref={canvasRef} className="discover-webgl-canvas" />;
}
