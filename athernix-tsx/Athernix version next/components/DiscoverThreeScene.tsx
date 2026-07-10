// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function DiscoverThreeScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.IcosahedronGeometry(2, 64);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xff006e,
      transmission: 1,
      opacity: 1,
      metalness: 0,
      roughness: 0.05,
      ior: 1.5,
      thickness: 2,
      specularIntensity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      emissive: new THREE.Color(0xff006e),
      emissiveIntensity: 0.2,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    const originalVertices = [];
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
    let frameId = 0;

    const handleMouseMove = (event) => {
      mouseX = event.clientX - window.innerWidth / 2;
      mouseY = event.clientY - window.innerHeight / 2;
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
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
      sphere.rotation.y += 0.002 + 0.05 * (mouseX * 0.001 - sphere.rotation.y);
      sphere.rotation.x += 0.001 + 0.05 * (mouseY * 0.001 - sphere.rotation.x);
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const setupScrollMotion = () => {
      if (!window.gsap || !window.ScrollTrigger) return;

      window.gsap.registerPlugin(window.ScrollTrigger);
      window.gsap.utils.toArray(".discover-page .discover-content-block").forEach((block) => {
        window.gsap.to(block, {
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });
      });

      window.gsap
        .timeline({
          scrollTrigger: {
            trigger: ".discover-page .discover-content-wrapper",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        })
        .to(sphere.position, { x: -2.5, y: -0.5, z: 1, ease: "power1.inOut" }, 0)
        .to(sphere.rotation, { z: Math.PI / 2, ease: "power1.inOut" }, 0)
        .to(directionalLight.position, { x: -5, y: 5, ease: "power1.inOut" }, 0)
        .to(material.color, { r: 1, g: 0.84, b: 0, ease: "power1.inOut" }, 0)
        .to(material.emissive, { r: 1, g: 0.84, b: 0, ease: "power1.inOut" }, 0)
        .to(sphere.position, { x: 2.5, y: 0.5, z: 1.5, ease: "power1.inOut" }, 0.5)
        .to(sphere.scale, { x: 1.2, y: 1.2, z: 1.2, ease: "power1.inOut" }, 0.5)
        .to(material.color, { r: 1, g: 0.42, b: 0, ease: "power1.inOut" }, 0.5)
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
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="discover-webgl-canvas" />;
}
