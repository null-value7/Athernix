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
        color: 0xff006e,
        metalness: 0.3,
        roughness: 0.4,
        emissive: new THREE.Color(0xff006e),
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

      const directionalLight = new THREE.DirectionalLight(0xff006e, 3);
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

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = event.clientX - window.innerWidth / 2;
        mouseY = event.clientY - window.innerHeight / 2;
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

        (window as any).gsap.utils.toArray(".discover-page .discover-content-block").forEach((block: HTMLElement) => {
          (window as any).gsap.set(block, { opacity: 1, y: 0, clearProps: "all" });
        });

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

        const sphereTimeline = (window as any).gsap.timeline({
          scrollTrigger: {
            trigger: ".discover-page",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        sphereTimeline
          .to(sphere.position, { x: -2.5, y: -0.5, z: 1, ease: "power1.inOut" }, 0)
          .to(sphere.rotation, { z: Math.PI / 2, ease: "power1.inOut" }, 0)
          .to(directionalLight.position, { x: -5, y: 5, ease: "power1.inOut" }, 0)
          .to(material!.color, { r: 1, g: 0.84, b: 0, ease: "power1.inOut" }, 0)
          .to(material!.emissive, { r: 1, g: 0.84, b: 0, ease: "power1.inOut" }, 0)
          .to(sphere.position, { x: 2.5, y: 0.5, z: 1.5, ease: "power1.inOut" }, 0.5)
          .to(sphere.scale, { x: 1.2, y: 1.2, z: 1.2, ease: "power1.inOut" }, 0.5)
          .to(material!.color, { r: 1, g: 0.42, b: 0, ease: "power1.inOut" }, 0.5)
          .to(material!.emissive, { r: 1, g: 0.42, b: 0, ease: "power1.inOut" }, 0.5)
          .to(sphere.position, { x: 0, y: 0, z: 2, ease: "power1.inOut" }, 1)
          .to(sphere.scale, { x: 0.8, y: 0.8, z: 0.8, ease: "power1.inOut" }, 1);
      };

      document.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", handleResize);
      animate();
      setupScrollMotion();

      return () => {
        cancelAnimationFrame(frameId);
        document.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        if ((window as any).ScrollTrigger) {
          (window as any).ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
        }
        if (renderer) renderer.dispose();
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
