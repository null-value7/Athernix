"use client";

// ── RecoveryBackdrop3D ────────────────────────────────────────
// Fondo 3D interactivo para el flujo de recuperación de acceso.
// Reacciona a: movimiento del mouse (parallax), estado del formulario
// (idle/loading/sent/success/error) y scroll sutil de la página.
// Optimizado: ~700 partículas, pixelRatio cap 1.5, pausa en pestaña oculta.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type RecoveryPhase = "idle" | "loading" | "sent" | "success" | "error";

interface Props {
  phase: RecoveryPhase;
  /** Contador que se incrementa para disparar un pulso de error */
  errorPulse?: number;
}

// Paletas por fase (color principal, acento, partículas)
const PHASE_COLORS: Record<RecoveryPhase, { core: number; accent: number; particles: number }> = {
  idle:    { core: 0xff6b00, accent: 0xff006e, particles: 0xff8c50 },
  loading: { core: 0xffd700, accent: 0xff6b00, particles: 0xffd080 },
  sent:    { core: 0x38bdf8, accent: 0x818cf8, particles: 0x7dd3fc },
  success: { core: 0x00e5a0, accent: 0xffd700, particles: 0x6ffbd2 },
  error:   { core: 0xff3355, accent: 0xff006e, particles: 0xff6b7a },
};

export default function RecoveryBackdrop3D({ phase, errorPulse = 0 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef<RecoveryPhase>(phase);
  const pulseRef = useRef(0);
  const pulseStrength = useRef(0);

  phaseRef.current = phase;

  useEffect(() => {
    if (errorPulse > 0) pulseStrength.current = 1;
  }, [errorPulse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      return; // sin WebGL → la página sigue funcionando con el gradiente CSS
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 60);
    camera.position.set(0, 0, 7);

    // ── Núcleo: torus knot wireframe ──
    const knotGeo = new THREE.TorusKnotGeometry(1.35, 0.34, 140, 20);
    const knotMat = new THREE.MeshBasicMaterial({
      color: PHASE_COLORS.idle.core,
      wireframe: true,
      transparent: true,
      opacity: 0.34,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    // ── Anillos orbitales ──
    const ringMat = new THREE.MeshBasicMaterial({
      color: PHASE_COLORS.idle.accent,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.012, 8, 96), ringMat);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.3, 0.010, 8, 96), ringMat.clone());
    ring1.rotation.x = Math.PI / 2.4;
    ring2.rotation.x = Math.PI / 1.8;
    ring2.rotation.y = 0.6;
    scene.add(ring1, ring2);

    // ── Campo de partículas ──
    const COUNT = 700;
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 4 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 6;
      seeds[i * 3] = Math.random() * Math.PI * 2;
      seeds[i * 3 + 1] = 0.15 + Math.random() * 0.5;
      seeds[i * 3 + 2] = Math.random();
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: PHASE_COLORS.idle.particles,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particlesMesh = new THREE.Points(pGeo, pMat);
    scene.add(particlesMesh);

    // ── Interacción ──
    let mouseX = 0, mouseY = 0;
    let camX = 0, camY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", onResize);

    const targetCore = new THREE.Color();
    const targetAccent = new THREE.Color();
    const targetParticles = new THREE.Color();
    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;

    const onVisibility = () => {
      running = !document.hidden;
      if (running) { clock.getDelta(); raf = requestAnimationFrame(tick); }
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVisibility);

    const tick = () => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      const ph = phaseRef.current;
      const palette = PHASE_COLORS[ph];

      // Pulso de error: flash rojo momentáneo
      if (pulseStrength.current > 0.01) {
        pulseStrength.current *= 0.94;
        knotMat.color.setHex(0xff3355).lerp(new THREE.Color(palette.core), 1 - pulseStrength.current);
      } else {
        targetCore.setHex(palette.core);
        knotMat.color.lerp(targetCore, 0.04);
      }
      targetAccent.setHex(palette.accent);
      ringMat.color.lerp(targetAccent, 0.04);
      (ring2.material as THREE.MeshBasicMaterial).color.lerp(targetAccent, 0.04);
      targetParticles.setHex(palette.particles);
      pMat.color.lerp(targetParticles, 0.03);

      // Velocidad y energía según fase
      const speed = ph === "loading" ? 0.012 : ph === "success" || ph === "sent" ? 0.007 : 0.0035;
      const wobble = ph === "loading" ? 0.18 : ph === "success" ? 0.12 : 0.07;

      knot.rotation.x += speed;
      knot.rotation.y += speed * 1.4;
      knot.position.y = Math.sin(t * 0.6) * wobble;
      knot.scale.setScalar(1 + Math.sin(t * 1.4) * 0.04 + pulseStrength.current * 0.25);

      ring1.rotation.z += speed * 0.6;
      ring2.rotation.z -= speed * 0.5;

      // Deriva de partículas
      particlesMesh.rotation.y = t * 0.012;
      particlesMesh.rotation.x = Math.sin(t * 0.05) * 0.06;

      // Parallax de cámara + scroll sutil
      const scrollDrift = Math.min(window.scrollY / window.innerHeight, 1) * 0.8;
      camX += (mouseX * 0.7 - camX) * 0.04;
      camY += (-mouseY * 0.5 - scrollDrift - camY) * 0.04;
      camera.position.x = camX;
      camera.position.y = camY;
      camera.lookAt(0, 0, 0);

      // En éxito: el núcleo se expande suavemente
      if (ph === "success") {
        knot.scale.setScalar(knot.scale.x + Math.sin(t * 2) * 0.05 + 0.06);
      }

      renderer.render(scene, camera);
    };

    if (reducedMotion) {
      renderer.render(scene, camera); // frame estático, sin loop
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      knotGeo.dispose();
      knotMat.dispose();
      ringMat.dispose();
      (ring2.material as THREE.Material).dispose();
      ring1.geometry.dispose();
      ring2.geometry.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
