"use client";
// ============================================================
// VIEW — ResetPasswordView.tsx
// Pantalla /update-password — nueva contraseña tras el enlace
// ============================================================

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import * as THREE from "three";
import { useResetPasswordController } from "@/controllers/auth/AuthController";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif";
const F_MONO = "'Plus Jakarta Sans', monospace";

function tiltMove(e: React.MouseEvent, lift = -4, max = 10) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width - 0.5;
  const py = (e.clientY - rect.top) / rect.height - 0.5;
  gsap.to(e.currentTarget, { y: lift, rotationY: px * max, rotationX: -py * max, transformPerspective: 800, duration: 0.28, ease: "power2.out" });
}
function tiltReset(e: React.MouseEvent) {
  gsap.to(e.currentTarget, { y: 0, rotationX: 0, rotationY: 0, duration: 0.35, ease: "power2.out" });
}
function magneticMove(e: React.MouseEvent, strength = 0.2) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) * strength;
  const y = (e.clientY - rect.top - rect.height / 2) * strength;
  gsap.to(e.currentTarget, { x, y, duration: 0.25, ease: "power2.out" });
}
function magneticReset(e: React.MouseEvent) {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1,0.4)" });
}

// ── Iconos ───────────────────────────────────────────────────
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 118 0v4" strokeLinecap="round" />
  </svg>
);

const IconEye = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
    {open ? (
      <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
    ) : (
      <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>
    )}
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9" stroke="currentColor" strokeWidth={1.5}>
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="9 12 11 14 15 10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.25, "rgba(255,255,255,0.5)");
  grad.addColorStop(0.6, "rgba(255,255,255,0.1)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

// ── 3D Fluid tubes background ──────────────────────────────────
function NeuralField3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050208);

    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 32);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Colored lights for glossy feel
    const ambient = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambient);
    const p1 = new THREE.PointLight(0xff4500, 2.2, 70);
    p1.position.set(10, 10, 12);
    scene.add(p1);
    const p2 = new THREE.PointLight(0xff8c00, 2.2, 70);
    p2.position.set(-12, -8, 10);
    scene.add(p2);
    const p3 = new THREE.PointLight(0xff0000, 1.8, 70);
    p3.position.set(0, 14, -8);
    scene.add(p3);

    // Custom gradient shader for glossy organic tubes
    const tubeUniforms = {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#ff4500") },
      uColor2: { value: new THREE.Color("#ff6020") },
      uColor3: { value: new THREE.Color("#ff8c00") },
      uColor4: { value: new THREE.Color("#ff0000") },
    };
    const tubeVertex = `
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const tubeFragment = `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform vec3 uColor4;
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        float t1 = sin(vPosition.x * 0.12 + vPosition.y * 0.08 + uTime * 0.4) * 0.5 + 0.5;
        float t2 = sin(vPosition.z * 0.1 - uTime * 0.3) * 0.5 + 0.5;
        float t3 = sin(vUv.x * 6.28 + uTime * 0.2) * 0.5 + 0.5;
        vec3 color = mix(uColor1, uColor2, t1);
        color = mix(color, uColor3, t2 * 0.7);
        color = mix(color, uColor4, t3 * 0.35);
        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
        float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);
        color += vec3(0.2) * fresnel;
        gl_FragColor = vec4(color, 0.96);
      }
    `;
    const tubeMat = new THREE.ShaderMaterial({
      uniforms: tubeUniforms,
      vertexShader: tubeVertex,
      fragmentShader: tubeFragment,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Twisted torus-knot tubes (image style)
    const tubeGroup = new THREE.Group();
    const knot1 = new THREE.Mesh(new THREE.TorusKnotGeometry(11, 2.5, 280, 26, 2, 3), tubeMat.clone());
    knot1.position.set(0, 0, -5);
    tubeGroup.add(knot1);

    const knot2 = new THREE.Mesh(new THREE.TorusKnotGeometry(7.8, 1.7, 240, 22, 3, 4), tubeMat.clone());
    knot2.position.set(0, 0, 2);
    tubeGroup.add(knot2);

    const knot3 = new THREE.Mesh(new THREE.TorusKnotGeometry(4.8, 0.9, 200, 18, 4, 5), tubeMat.clone());
    knot3.position.set(0, 0, 6);
    tubeGroup.add(knot3);

    scene.add(tubeGroup);

    // Floating glossy spheres
    const spheres: THREE.Mesh[] = [];
    const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
    const sphereColors = [0xff4500, 0xff6020, 0xff8c00, 0xff0000];
    for (let i = 0; i < 5; i++) {
      const mat = new THREE.MeshPhysicalMaterial({
        color: sphereColors[i % sphereColors.length],
        emissive: sphereColors[i % sphereColors.length],
        emissiveIntensity: 0.25,
        metalness: 0.6,
        roughness: 0.15,
        clearcoat: 0.8,
        transparent: true,
        opacity: 0.85,
      });
      const sphere = new THREE.Mesh(sphereGeo, mat);
      const a = Math.random() * Math.PI * 2;
      const r = 14 + Math.random() * 12;
      sphere.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 10, Math.sin(a) * r);
      const scale = 0.4 + Math.random() * 0.8;
      sphere.scale.setScalar(scale);
      spheres.push(sphere);
      scene.add(sphere);
    }

    // Subtle starfield
    const starCount = 300;
    const sPos = new Float32Array(starCount * 3);
    const sCol = new Float32Array(starCount * 3);
    const palette = [new THREE.Color("#ff4500"), new THREE.Color("#ff6020"), new THREE.Color("#ff8c00"), new THREE.Color("#ffffff")];
    for (let i = 0; i < starCount; i++) {
      const r = 50 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      sPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      sPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      sPos[i * 3 + 2] = r * Math.cos(phi);
      const col = palette[Math.floor(Math.random() * palette.length)];
      sCol[i * 3] = col.r;
      sCol[i * 3 + 1] = col.g;
      sCol[i * 3 + 2] = col.b;
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    sGeo.setAttribute("color", new THREE.BufferAttribute(sCol, 3));
    const glowTex = createGlowTexture();
    const sMat = new THREE.PointsMaterial({
      size: 0.45, map: glowTex, transparent: true, vertexColors: true,
      opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
    });
    const stars = new THREE.Points(sGeo, sMat);
    scene.add(stars);

    let mx = 0, my = 0, scrollY = 0, smoothScroll = 0;
    let smoothMx = 0, smoothMy = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      scrollY = y;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      const k = prefersReduced ? 0.2 : 1;

      smoothMx += (mx - smoothMx) * 0.04;
      smoothMy += (my - smoothMy) * 0.04;
      smoothScroll += (scrollY - smoothScroll) * 0.06;

      // Animate tube materials
      tubeGroup.children.forEach((mesh, i) => {
        const material = (mesh as THREE.Mesh).material as THREE.ShaderMaterial;
        material.uniforms.uTime.value = t;
        mesh.rotation.x = t * 0.05 * k * (i % 2 === 0 ? 1 : -1) + smoothMy * 0.05;
        mesh.rotation.y = t * 0.08 * k + smoothMx * 0.05;
      });
      tubeGroup.rotation.z = smoothScroll * 0.0002;

      // Orbit spheres
      spheres.forEach((sphere, i) => {
        const a = t * 0.25 * k + i * 1.2;
        const r = 16 + i * 3;
        sphere.position.x = Math.cos(a) * r;
        sphere.position.z = Math.sin(a) * r;
        sphere.position.y = Math.sin(t * 0.4 * k + i) * 4;
      });

      // Rotate starfield slowly
      stars.rotation.y = t * 0.03 * k;
      stars.rotation.x = smoothMy * 0.04;

      // Move lights for dynamic shading
      p1.position.x = Math.sin(t * 0.3 * k) * 14;
      p1.position.y = Math.cos(t * 0.25 * k) * 10;
      p2.position.x = Math.cos(t * 0.2 * k) * 12;
      p2.position.z = Math.sin(t * 0.2 * k) * 10;

      // Camera parallax + scroll zoom
      const targetX = smoothMx * 16;
      const targetY = smoothMy * 12;
      const targetZ = Math.max(10, 38 - smoothScroll * 0.15);
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.position.z += (targetZ - camera.position.z) * 0.05;
      camera.lookAt(0, smoothScroll * 0.01, 0);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      glowTex.dispose();
      renderer.dispose();
      tubeGroup.children.forEach(mesh => { mesh.geometry.dispose(); ((mesh as THREE.Mesh).material as THREE.Material).dispose(); });
      spheres.forEach(sphere => { sphere.geometry.dispose(); (sphere.material as THREE.Material).dispose(); });
      sGeo.dispose(); sMat.dispose();
    };
  }, []);

  return (
    <div className="pointer-events-none" style={{ position: "fixed", inset: 0, zIndex: 0 }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(8,0,8,0.3) 55%, rgba(8,0,8,0.9) 100%)" }} />
    </div>
  );
}

// ── Componente ───────────────────────────────────────────────
export default function ResetPasswordView() {
  const {
    formData, errors, status,
    showPassword, showConfirm,
    handleChange, handleSubmit,
    toggleShowPassword, toggleShowConfirm,
  } = useResetPasswordController();

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const fieldRefs = useRef<(HTMLDivElement | null)[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [particles] = useState(() =>
    typeof window === "undefined"
      ? []
      : Array.from({ length: 10 }, (_, i) => ({
          id: i,
          width: Math.random() * 3 + 1,
          height: Math.random() * 3 + 1,
          left: Math.random() * 100,
          top: Math.random() * 100,
          duration: 3 + Math.random() * 4,
          delay: Math.random() * 3,
          color: i % 2 === 0 ? "rgba(255,100,30,0.4)" : "rgba(220,40,40,0.3)",
        }))
  );

  useEffect(() => { setMounted(true); }, []);

  // ── Entrada ──────────────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.to(".orb-rp1", { scale: 1.2, opacity: 0.55, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".orb-rp2", { scale: 1.15, opacity: 0.35, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(cardRef.current,
        { y: 60, opacity: 0, scale: 0.92, rotationX: -10 },
        { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 0.8, ease: "back.out(1.4)" })
        .fromTo(subtitleRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.4");

      if (!prefersReduced) {
        const title = titleRef.current;
        if (title && title.textContent && title.textContent.trim().length > 0) {
          const split = new SplitText(title, { type: "chars" });
          gsap.fromTo(split.chars,
            { opacity: 0, yPercent: 120, rotationX: -70 },
            { opacity: 1, yPercent: 0, rotationX: 0, duration: 0.85, stagger: 0.03, ease: "back.out(1.7)", delay: 0.1 });
        }
      } else {
        tl.fromTo(titleRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.4");
      }

      tl.fromTo(fieldRefs.current.filter(Boolean), { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, "-=0.4")
        .fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.1");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // ── Éxito ────────────────────────────────────────────────
  useEffect(() => {
    if (status === "success" && cardRef.current && successRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0, scale: 0.9, duration: 0.4,
        onComplete: () => {
          gsap.fromTo(successRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
          );
        },
      });
    }
  }, [status]);

  // ── Shake errores ────────────────────────────────────────
  useEffect(() => {
    if (Object.keys(errors).length > 0 && cardRef.current) {
      gsap.fromTo(cardRef.current, { x: -8 }, { x: 0, duration: 0.4, ease: "elastic.out(1,0.3)" });
    }
  }, [errors]);

  return (
    <div ref={containerRef} className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "transparent" }}>

      <NeuralField3D />

      {/* Progress bar */}
      <div className="rp-progress-bar fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
        style={{ background: 'linear-gradient(90deg,#ff4500,#ff6020,#ff8c00)' }}>
        <div className="rp-progress-bar-inner" style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg,#ff4500,#ff6020,#ff8c00)', boxShadow: '0 0 12px rgba(255,96,32,0.4)', transform: 'scaleX(0)', transformOrigin: 'left' }} />
      </div>

      {/* Ambient grid */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.16,
          backgroundImage: 'linear-gradient(rgba(255,80,30,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,80,30,0.05) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,#000 0%,transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,#000 0%,transparent 85%)'
        }} />

      {/* Ambient orbs */}
      <div className="orb-rp1 fixed pointer-events-none rounded-full"
        style={{ width: 550, height: 550, top: '-8%', right: '-12%', zIndex: 0,
          background: 'radial-gradient(circle,rgba(255,69,0,0.22) 0%,transparent 70%)',
          filter: 'blur(50px)' }} />
      <div className="orb-rp2 fixed pointer-events-none rounded-full"
        style={{ width: 450, height: 450, bottom: '-5%', left: '-8%', zIndex: 0,
          background: 'radial-gradient(circle,rgba(220,40,40,0.18) 0%,transparent 70%)',
          filter: 'blur(60px)' }} />

      {/* Scanlines */}
      <div className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: 0.04,
        background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.05) 2px,rgba(255,255,255,0.05) 4px)',
        mixBlendMode: 'overlay' }} />

      {/* Corner brackets */}
      {(['tl','tr','bl','br'] as const).map(pos => (
        <div key={pos} className="fixed pointer-events-none z-10"
          style={{
            width: 22, height: 22, opacity: 0.5,
            top: pos.startsWith('t') ? 18 : undefined,
            bottom: pos.startsWith('b') ? 18 : undefined,
            left: pos.endsWith('l') ? 18 : undefined,
            right: pos.endsWith('r') ? 18 : undefined,
            borderTop: pos.startsWith('t') ? '2px solid #ff6020' : undefined,
            borderBottom: pos.startsWith('b') ? '2px solid #ff6020' : undefined,
            borderLeft: pos.endsWith('l') ? '2px solid #ff6020' : undefined,
            borderRight: pos.endsWith('r') ? '2px solid #ff6020' : undefined,
          }} />
      ))}

      {/* Pantalla éxito */}
      {status === "success" && (
        <div ref={successRef} className="absolute z-50 flex flex-col items-center gap-4 opacity-0 text-center px-8">
          <div className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #ff4500, #ff8c00)", boxShadow: "0 0 40px rgba(255,69,0,0.6)" }}>
            <IconShield />
          </div>
          <p className="text-xl font-black tracking-widest uppercase"
            style={{ color: "#ff6020", fontFamily: "'Courier New', monospace", textShadow: "0 0 20px rgba(255,96,32,0.8)" }}>
            CONTRASEÑA ACTUALIZADA
          </p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Courier New', monospace" }}>
            Redirigiendo al inicio de sesión...
          </p>
        </div>
      )}

      {/* Card */}
      <div ref={cardRef} className="relative w-full max-w-sm mx-4 rounded-2xl overflow-hidden"
        style={{ background: "rgba(12,4,4,0.75)", border: "2px solid rgba(220,60,20,0.22)", boxShadow: "0 16px 60px rgba(0,0,0,0.7), 0 0 40px rgba(255,80,20,0.08), inset 0 1px 0 rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", transformStyle: "preserve-3d", willChange: "transform" }}
        onMouseMove={e => { tiltMove(e, -5, 8); e.currentTarget.style.borderColor = 'rgba(220,60,20,0.5)'; e.currentTarget.style.boxShadow = '0 20px 70px rgba(0,0,0,0.8), 0 0 50px rgba(255,80,20,0.12), inset 0 1px 0 rgba(255,255,255,0.07)' }}
        onMouseLeave={e => { tiltReset(e); e.currentTarget.style.borderColor = 'rgba(220,60,20,0.22)'; e.currentTarget.style.boxShadow = '0 16px 60px rgba(0,0,0,0.7), 0 0 40px rgba(255,80,20,0.08), inset 0 1px 0 rgba(255,255,255,0.05)' }}>

        <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent, #ff4500, #ff8c00, #ff4500, transparent)" }} />

        <div className="px-8 pt-8 pb-7">
          <div className="text-center mb-7">
            <h1 ref={titleRef} className="rp-title text-2xl font-black tracking-widest uppercase mb-2"
              style={{ fontFamily: "'Courier New', monospace", background: "linear-gradient(90deg, #ff6020, #ffaa00, #ff4500)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.15em" }}>
              NUEVA CONTRASEÑA
            </h1>
            <p ref={subtitleRef} className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase"
              style={{ color: "rgba(255,140,80,0.7)" }}>
              <span style={{ color: "rgba(255,80,20,0.5)" }}>◆</span>
              ACTUALIZACIÓN SEGURA
              <span style={{ color: "rgba(255,80,20,0.5)" }}>◆</span>
            </p>
          </div>

          {errors.general && (
            <div className="mb-4 px-4 py-2 rounded-lg text-xs tracking-wider text-center"
              style={{ background: "rgba(220,20,20,0.15)", border: "1px solid rgba(220,20,20,0.4)", color: "#ff6060", fontFamily: "'Courier New', monospace" }}>
              ⚠ {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Nueva contraseña */}
            <div ref={(el) => { fieldRefs.current[0] = el; }}>
              <label className="flex items-center gap-1.5 text-xs tracking-widest uppercase mb-1.5"
                style={{ color: "rgba(255,120,60,0.8)", fontFamily: "'Courier New', monospace" }}>
                <IconLock /> NUEVA_CLAVE
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange("password")}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full px-4 py-3 pr-10 rounded-lg text-sm outline-none transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.04)", border: errors.password ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)", color: "rgba(255,255,255,0.85)", fontFamily: "'Courier New', monospace", caretColor: "#ff6020", transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s" }}
                  onFocus={(e) => { e.target.style.border = "1px solid rgba(255,120,30,0.85)"; e.target.style.boxShadow = "0 0 0 3px rgba(255,80,20,0.25), 0 0 20px rgba(255,80,20,0.15)"; e.target.style.transform = "translateZ(8px)"; }}
                  onBlur={(e) => { e.target.style.border = errors.password ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)"; e.target.style.boxShadow = "none"; e.target.style.transform = "translateZ(0)"; }}
                />
                <button type="button" onClick={toggleShowPassword} className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,120,60,0.6)", transformStyle: "preserve-3d", willChange: "transform" }}
                  onMouseMove={e => { magneticMove(e, 0.3); tiltMove(e, -2, 12) }}
                  onMouseLeave={e => { magneticReset(e); tiltReset(e) }}>
                  <IconEye open={showPassword} />
                </button>
                <div className="absolute bottom-0 left-0 h-px transition-all duration-300"
                  style={{ background: "linear-gradient(90deg, #ff4500, #ff8c00)", width: formData.password ? "100%" : "0%" }} />
              </div>
              {errors.password && <p className="mt-1 text-xs" style={{ color: "#ff5555", fontFamily: "'Courier New', monospace" }}>✕ {errors.password}</p>}
            </div>

            {/* Confirmar contraseña */}
            <div ref={(el) => { fieldRefs.current[1] = el; }}>
              <label className="flex items-center gap-1.5 text-xs tracking-widest uppercase mb-1.5"
                style={{ color: "rgba(255,120,60,0.8)", fontFamily: "'Courier New', monospace" }}>
                <IconLock /> CONFIRMAR_CLAVE
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full px-4 py-3 pr-10 rounded-lg text-sm outline-none transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.04)", border: errors.confirmPassword ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)", color: "rgba(255,255,255,0.85)", fontFamily: "'Courier New', monospace", caretColor: "#ff6020", transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s" }}
                  onFocus={(e) => { e.target.style.border = "1px solid rgba(255,120,30,0.85)"; e.target.style.boxShadow = "0 0 0 3px rgba(255,80,20,0.25), 0 0 20px rgba(255,80,20,0.15)"; e.target.style.transform = "translateZ(8px)"; }}
                  onBlur={(e) => { e.target.style.border = errors.confirmPassword ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)"; e.target.style.boxShadow = "none"; e.target.style.transform = "translateZ(0)"; }}
                />
                <button type="button" onClick={toggleShowConfirm} className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,120,60,0.6)", transformStyle: "preserve-3d", willChange: "transform" }}
                  onMouseMove={e => { magneticMove(e, 0.3); tiltMove(e, -2, 12) }}
                  onMouseLeave={e => { magneticReset(e); tiltReset(e) }}>
                  <IconEye open={showConfirm} />
                </button>
                <div className="absolute bottom-0 left-0 h-px transition-all duration-300"
                  style={{ background: "linear-gradient(90deg, #ff4500, #ff8c00)", width: formData.confirmPassword ? "100%" : "0%" }} />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs" style={{ color: "#ff5555", fontFamily: "'Courier New', monospace" }}>✕ {errors.confirmPassword}</p>}
            </div>

            <button ref={btnRef} type="submit" disabled={status === "loading"}
              className="w-full py-3.5 rounded-xl text-sm font-black tracking-widest uppercase mt-2"
              style={{ backgroundImage: status === "loading" ? "none" : "linear-gradient(90deg, #e83500, #ff6020, #ff9500, #ff6020, #e83500)", backgroundColor: status === "loading" ? "rgba(180,50,10,0.5)" : "transparent", backgroundSize: "200% 100%", color: "#fff", fontFamily: "'Courier New', monospace", letterSpacing: "0.2em", boxShadow: status === "loading" ? "none" : "0 0 20px rgba(255,80,20,0.4)", animation: status === "loading" ? "none" : "btn-shine 2s linear infinite", cursor: status === "loading" ? "not-allowed" : "pointer", border: "1px solid rgba(255,120,50,0.3)", transformStyle: "preserve-3d", willChange: "transform" }}
              onMouseMove={e => { if (status !== "loading") { magneticMove(e, 0.12); tiltMove(e, -2, 6) } }}
              onMouseEnter={(e) => { if (status !== "loading") gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2 }) }}
              onMouseLeave={(e) => { magneticReset(e); tiltReset(e); if (status !== "loading") gsap.to(e.currentTarget, { scale: 1, duration: 0.2 }) }}>
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  ACTUALIZANDO...
                </span>
              ) : "ACTUALIZAR CONTRASEÑA"}
            </button>
          </form>
        </div>
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(180,50,10,0.4), transparent)" }} />

        <style jsx global>{`
          main { background-color: transparent !important; }
          input::placeholder { color: rgba(255,255,255,0.2); }
          input:-webkit-autofill { -webkit-box-shadow: 0 0 0 50px rgba(18,5,5,0.95) inset; -webkit-text-fill-color: rgba(255,255,255,0.85); }
        `}</style>
      </div>
    </div>
  );
}