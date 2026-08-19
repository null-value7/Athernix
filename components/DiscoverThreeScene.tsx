"use client";

import { useEffect, useRef } from "react";

export default function DiscoverThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return undefined;

    // Load THREE.js from CDN if not available
    const loadScript = (src: string) => new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = reject;
      document.body.appendChild(script);
    });

    // Wait for THREE to load from CDN
    const init = async () => {
      if (!(window as any).THREE) {
        console.log('THREE not loaded, loading from CDN...');
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js");
        // Wait for THREE to be available
        let attempts = 0;
        while (!(window as any).THREE && attempts < 20) {
          await new Promise(resolve => setTimeout(resolve, 50));
          attempts++;
        }
      }

      if (!(window as any).THREE) {
        console.error('THREE failed to load');
        return;
      }

      console.log('THREE loaded, initializing scene...');
      const scene = new (window as any).THREE.Scene();
      const camera = new (window as any).THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 5;
      scene.add(camera);

      const renderer = new (window as any).THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      
      // Force canvas size and background
      if (canvasRef.current) {
        canvasRef.current.style.width = '100vw';
        canvasRef.current.style.height = '100vh';
        canvasRef.current.style.display = 'block';
        canvasRef.current.style.position = 'fixed';
        canvasRef.current.style.top = '0';
        canvasRef.current.style.left = '0';
        canvasRef.current.style.zIndex = '1';
      }
      
      console.log('Renderer created:', renderer);
      console.log('Canvas element:', canvasRef.current);
      console.log('Canvas size:', canvasRef.current?.width, 'x', canvasRef.current?.height);
      console.log('Canvas style:', canvasRef.current?.style.cssText);

      const geometry = new (window as any).THREE.IcosahedronGeometry(2, 16);
      const material = new (window as any).THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.3,
        roughness: 0.4,
        emissive: new (window as any).THREE.Color(0xffd700),
        emissiveIntensity: 0.5,
      });

      const sphere = new (window as any).THREE.Mesh(geometry, material);
      sphere.position.set(0, 0, 0);
      scene.add(sphere);
      console.log('Sphere created and added to scene:', sphere);
      console.log('Sphere position:', sphere.position);
      console.log('Camera position:', camera.position);
      console.log('Sphere visible:', sphere.visible);
      console.log('Sphere material:', sphere.material);

      const positionAttribute = geometry.attributes.position;
      const vertex = new (window as any).THREE.Vector3();
      const originalVertices: any[] = [];
      for (let i = 0; i < positionAttribute.count; i += 1) {
        vertex.fromBufferAttribute(positionAttribute, i);
        originalVertices.push(vertex.clone());
      }

      scene.add(new (window as any).THREE.AmbientLight(0xffd700, 0.35));

      const directionalLight = new (window as any).THREE.DirectionalLight(0xffffff, 3);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      const secondaryLight = new (window as any).THREE.DirectionalLight(0xffaa00, 2.5);
      secondaryLight.position.set(-5, -5, 2);
      scene.add(secondaryLight);

      const pointLight = new (window as any).THREE.PointLight(0xffd700, 2, 10);
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);

      const clock = new (window as any).THREE.Clock();
      let mouseX = 0;
      let mouseY = 0;
      let frameId = 0;
      let frameCount = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = event.clientX - window.innerWidth / 2;
        mouseY = event.clientY - window.innerHeight / 2;
      };

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        frameCount++;

        // Update vertex animation every 2 frames to reduce CPU load
        if (frameCount % 2 === 0) {
          const positions = sphere.geometry.attributes.position;

          for (let i = 0; i < positions.count; i += 1) {
            const p = originalVertices[i];
            // Restored original noise calculation
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
        renderer.render(scene, camera);
        
        // Log render status periodically
        if (frameCount % 100 === 0) {
          console.log('Rendering frame:', frameCount, 'Sphere visible:', sphere.visible);
        }
      };

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      };

      const setupScrollMotion = () => {
        if (!(window as any).gsap || !(window as any).ScrollTrigger) {
          console.log('GSAP or ScrollTrigger not available');
          return;
        }

        (window as any).gsap.registerPlugin((window as any).ScrollTrigger);
        
        // Force initial visibility immediately
        (window as any).gsap.utils.toArray(".discover-page .discover-content-block").forEach((block: HTMLElement) => {
          (window as any).gsap.set(block, { 
            opacity: 1, 
            y: 0,
            clearProps: "all"
          });
        });
        
        // Only animate on scroll, don't touch opacity
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

        // 3D sphere animation on scroll
        const sphereTimeline = (window as any).gsap.timeline({
          scrollTrigger: {
            trigger: ".discover-page",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        // First section - move left and change to yellow
        sphereTimeline
          .to(sphere.position, { x: -2.5, y: -0.5, z: 1, ease: "power1.inOut" }, 0)
          .to(sphere.rotation, { z: Math.PI / 2, ease: "power1.inOut" }, 0)
          .to(directionalLight.position, { x: -5, y: 5, ease: "power1.inOut" }, 0)
          .to(material.color, { r: 1, g: 0.84, b: 0, ease: "power1.inOut" }, 0)
          .to(material.emissive, { r: 1, g: 0.84, b: 0, ease: "power1.inOut" }, 0)
          
          // Second section - move right and change to orange
          .to(sphere.position, { x: 2.5, y: 0.5, z: 1.5, ease: "power1.inOut" }, 0.5)
          .to(sphere.scale, { x: 1.2, y: 1.2, z: 1.2, ease: "power1.inOut" }, 0.5)
          .to(material.color, { r: 1, g: 0.42, b: 0, ease: "power1.inOut" }, 0.5)
          .to(material.emissive, { r: 1, g: 0.42, b: 0, ease: "power1.inOut" }, 0.5)
          
          // Third section - center and scale down
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
        // Safe cleanup - don't remove canvas, let React handle it
        if (renderer) {
          renderer.dispose();
        }
        if (geometry) {
          geometry.dispose();
        }
        if (material) {
          material.dispose();
        }
      };
    };

    init();
  }, []);

  return <canvas ref={canvasRef} className="discover-webgl-canvas" />;
}
