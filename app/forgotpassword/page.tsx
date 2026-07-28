"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useForgotPasswordController } from "@/controllers/auth/AuthController";

// ═══════════════════════════════════════════════════════════════
//  PERSPECTIVE 3D SCENE - Toda la vista reacciona al mouse
// ═══════════════════════════════════════════════════════════════
function Perspective3DContainer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const layers = layersRef.current;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2; // -1 a 1
      const y = (clientY / innerHeight - 0.5) * 2;

      layers.forEach((layer, i) => {
        const speed = (i + 1) * 0.03;
        const translateX = x * speed * 20;
        const translateY = y * speed * 20;
        const rotateX = -y * speed * 3;
        const rotateY = x * speed * 3;
        gsap.to(layer, {
          x: translateX,
          y: translateY,
          rotateX,
          rotateY,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const addLayerRef = (el: HTMLDivElement | null) => {
    if (el && !layersRef.current.includes(el)) {
      layersRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden"
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}>
      {/* Capa profunda (fondo) */}
      <div ref={addLayerRef} className="absolute inset-0 z-0" style={{ transform: "translateZ(-120px) scale(1.2)" }}>
        <div className="w-full h-full" style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,60,20,0.12) 0%, transparent 60%)" }} />
      </div>
      {/* Capa media (grid y partículas) */}
      <div ref={addLayerRef} className="absolute inset-0 z-10" style={{ transform: "translateZ(-40px) scale(1.05)" }}>
        <GridBackground3D />
      </div>
      {/* Capa superficial (contenido) */}
      <div ref={addLayerRef} className="relative z-20 flex items-center justify-center min-h-screen" style={{ transform: "translateZ(0px)" }}>
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  GRID 3D DE FONDO (Canvas) que rota con la perspectiva
// ═══════════════════════════════════════════════════════════════
function GridBackground3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.parentElement!.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    ctx.scale(dpr, dpr);

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      const step = 40;
      ctx.strokeStyle = `rgba(255,107,53,${0.07 + Math.sin(time * 0.5) * 0.03})`;
      ctx.lineWidth = 0.6;
      // Líneas horizontales y verticales que se "curvan" con el tiempo (simula 3D)
      for (let x = -step; x < rect.width + step; x += step) {
        const offset = Math.sin(time + x * 0.01) * 3;
        ctx.beginPath();
        ctx.moveTo(x, -step + offset);
        ctx.lineTo(x, rect.height + step + offset);
        ctx.stroke();
      }
      for (let y = -step; y < rect.height + step; y += step) {
        const offset = Math.cos(time + y * 0.01) * 3;
        ctx.beginPath();
        ctx.moveTo(-step + offset, y);
        ctx.lineTo(rect.width + step + offset, y);
        ctx.stroke();
      }
      time += 0.02;
      requestAnimationFrame(draw);
    };
    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

// ═══════════════════════════════════════════════════════════════
//  CURSOR CINEMATOGRÁFICO (mejorado con trail + distorsión)
// ═══════════════════════════════════════════════════════════════
function CinematicCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const trails = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current, ring = ringRef.current, glow = glowRef.current, trailContainer = trailContainerRef.current;
    if (!dot || !ring || !glow || !trailContainer) return;

    const trailCount = 12;
    for (let i = 0; i < trailCount; i++) {
      const t = document.createElement("div");
      t.style.cssText = `
        position:fixed; pointer-events:none; z-index:9999;
        width:${4 - i * 0.3}px; height:${4 - i * 0.3}px;
        border-radius:50%;
        background:rgba(255,107,53,${0.5 - i * 0.04});
        box-shadow:0 0 ${6 - i * 0.4}px rgba(255,107,53,0.8);
        top:0; left:0; transform:translate(-50%,-50%); opacity:0;
      `;
      trailContainer.appendChild(t);
      trails.current.push(t);
    }

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    const trailHistory: { x: number; y: number }[] = Array(trailCount).fill({ ...pos });

    gsap.set([dot, ring, glow], { xPercent: -50, yPercent: -50 });
    gsap.set(glow, { opacity: 0.5, scale: 2 });

    const move = (e: MouseEvent) => { pos.x = e.clientX; pos.y = e.clientY; };
    window.addEventListener("mousemove", move);

    const ticker = gsap.ticker.add(() => {
      ringPos.x += (pos.x - ringPos.x) * 0.08;
      ringPos.y += (pos.y - ringPos.y) * 0.08;
      gsap.set(dot, { x: pos.x, y: pos.y });
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
      gsap.set(glow, { x: pos.x, y: pos.y });

      trailHistory.unshift({ x: pos.x, y: pos.y });
      trailHistory.pop();
      trails.current.forEach((t, i) => {
        const tp = trailHistory[Math.min(i * 2, trailHistory.length - 1)];
        if (tp) {
          gsap.set(t, { x: tp.x, y: tp.y, opacity: 0.5 - i * 0.04 });
        }
      });
    });

    const growables = document.querySelectorAll("[data-cursor='grow']");
    const onEnter = () => {
      gsap.to(ring, { scale: 3, opacity: 0.3, borderColor: "rgba(255,215,0,0.8)", duration: 0.4, ease: "power2.out" });
      gsap.to(dot, { scale: 2.5, duration: 0.4, ease: "power2.out" });
      gsap.to(glow, { scale: 4, opacity: 0.8, duration: 0.4 });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, borderColor: "rgba(255,120,70,0.7)", duration: 0.4, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(glow, { scale: 2, opacity: 0.5, duration: 0.4 });
    };

    growables.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      gsap.ticker.remove(ticker);
      growables.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      trails.current.forEach(t => t.remove());
    };
  }, []);

  return (
    <div className="hidden lg:block">
      <div ref={trailContainerRef} />
      <div ref={glowRef} className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{ width: 40, height: 40, background: "radial-gradient(circle, rgba(255,107,0,0.5) 0%, transparent 70%)", filter: "blur(8px)" }} />
      <div ref={ringRef} className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{ width: 36, height: 36, border: "2px solid rgba(255,120,70,0.7)", boxShadow: "0 0 20px rgba(255,107,53,0.4), inset 0 0 10px rgba(255,107,53,0.2)" }} />
      <div ref={dotRef} className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{ width: 6, height: 6, background: "#FF6B00", boxShadow: "0 0 15px #FF6B00, 0 0 30px rgba(255,107,53,0.8)" }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  TILT CARD 3D ULTRA (glow en bordes, sombra dinámica)
// ═══════════════════════════════════════════════════════════════
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const edgeGlowRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;

    gsap.to(el, {
      rotateX: (0.5 - y) * 12,
      rotateY: (x - 0.5) * 12,
      transformPerspective: 800,
      duration: 0.5,
      ease: "power2.out",
    });

    // Sombra dinámica
    gsap.to(shadowRef.current, {
      x: (x - 0.5) * 30,
      y: (y - 0.5) * 30,
      opacity: 0.6 + Math.abs(x - 0.5) * 0.4,
      duration: 0.5,
    });

    // Glow en bordes según posición
    if (edgeGlowRef.current) {
      const borderGlow = `0 0 ${20 + x * 20}px rgba(255,107,0,${0.3 + y * 0.3})`;
      edgeGlowRef.current.style.boxShadow = borderGlow;
    }

    // Shine
    if (shineRef.current) {
      gsap.to(shineRef.current, {
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        opacity: 0.3,
        duration: 0.3,
      });
    }
  };

  const onLeave = () => {
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" });
    gsap.to(shadowRef.current, { x: 0, y: 0, opacity: 0.4, duration: 0.7 });
    if (edgeGlowRef.current) edgeGlowRef.current.style.boxShadow = "0 0 0px transparent";
    if (shineRef.current) gsap.to(shineRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d" }} data-cursor="grow">
      {/* Sombra 3D */}
      <div ref={shadowRef} className="absolute inset-0 -z-10 rounded-2xl opacity-40"
        style={{ background: "linear-gradient(135deg, rgba(255,60,10,0.5), transparent)", filter: "blur(20px)", transform: "translateZ(-10px)" }} />
      {/* Glow de borde */}
      <div ref={edgeGlowRef} className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-shadow duration-300"
        style={{ boxShadow: "0 0 0px transparent" }} />
      {/* Brillo interior */}
      <div ref={shineRef} className="absolute w-24 h-24 rounded-full pointer-events-none z-20 opacity-0"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)", transform: "translate(-50%,-50%)" }} />
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PARTÍCULAS INTERACTIVAS (canvas con repulsión al mouse)
// ═══════════════════════════════════════════════════════════════
function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.parentElement!.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    ctx.scale(dpr, dpr);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.5 + 0.8,
      hue: Math.random() > 0.5 ? 25 : 340,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouse);

    let anim: number;
    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      particles.forEach(p => {
        // Repulsión del cursor
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - dist) / 100;
          p.vx += Math.cos(angle) * force * 0.1;
          p.vy += Math.sin(angle) * force * 0.1;
        }

        p.x += p.vx;
        p.y += p.vy;
        // Amortiguación
        p.vx *= 0.99;
        p.vy *= 0.99;
        // Rebote en bordes
        if (p.x < 0 || p.x > rect.width) p.vx *= -1;
        if (p.y < 0 || p.y > rect.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 55%, ${p.alpha})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 55%, ${p.alpha * 0.15})`;
        ctx.fill();
      });

      // Conexiones cercanas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < 60) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,107,53,${0.06 * (1 - d / 60)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      anim = requestAnimationFrame(animate);
    };
    anim = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(anim);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
}

// ═══════════════════════════════════════════════════════════════
//  ORBE 3D FLOTANTE (icono de correo giratorio)
// ═══════════════════════════════════════════════════════════════
function Floating3DOrb() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to(ref.current, {
      y: -15,
      rotateY: 360,
      rotateX: 20,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);
  return (
    <div ref={ref} className="absolute -top-12 right-0 w-24 h-24 rounded-full flex items-center justify-center pointer-events-none"
      style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,107,0,0.4), rgba(200,30,10,0.2))", boxShadow: "0 0 60px rgba(255,107,0,0.5), inset 0 0 30px rgba(255,107,0,0.3)", transformStyle: "preserve-3d" }}>
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" stroke="white" strokeWidth={1.5}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" strokeLinecap="round" />
        <path d="M16 13l3 3m0 0l3-3m-3 3V9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CAMPO DE ENTRADA CON GLOW REACTIVO
// ═══════════════════════════════════════════════════════════════
function ReactiveInput({ value, onChange, error, placeholder }: {
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string; placeholder: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const input = containerRef.current.querySelector("input");
    if (!input) return;

    const onFocus = () => {
      gsap.to(containerRef.current, { scale: 1.02, duration: 0.3, ease: "power2.out" });
      gsap.to(glowRef.current, { opacity: 0.8, duration: 0.3 });
    };
    const onBlur = () => {
      gsap.to(containerRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(glowRef.current, { opacity: 0.3, duration: 0.3 });
    };

    input.addEventListener("focus", onFocus);
    input.addEventListener("blur", onBlur);
    return () => {
      input.removeEventListener("focus", onFocus);
      input.removeEventListener("blur", onBlur);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div ref={glowRef} className="absolute -inset-0.5 rounded-lg opacity-30 transition-opacity duration-300 pointer-events-none"
        style={{ background: "linear-gradient(45deg, #ff4500, #ff8c00)", filter: "blur(8px)" }} />
      <input
        type="email"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="email"
        className="relative w-full px-4 py-3 rounded-lg text-sm outline-none"
        style={{ background: "rgba(14,4,8,0.95)", border: error ? "1px solid rgba(255,60,60,0.8)" : "1px solid rgba(255,80,30,0.4)", color: "#fff", fontFamily: "'Courier New', monospace", caretColor: "#ff6020" }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ICONOS
// ═══════════════════════════════════════════════════════════════
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
    <path d="M19 12H5M5 12l7-7M5 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMailSent = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.5}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" strokeLinecap="round" />
    <path d="M16 13l3 3m0 0l3-3m-3 3V9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
//  COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════
export default function ForgotPasswordView() {
  const { formData, errors, status, handleChange, handleSubmit } = useForgotPasswordController();

  const cardRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Animaciones de entrada
  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(cardRef.current, { y: 120, opacity: 0, rotateX: 60, scale: 0.8 }, { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.2, ease: "back.out(1.4)" })
        .fromTo(".field-reveal", { x: -60, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.6 }, "-=0.5")
        .fromTo(".btn-reveal", { y: 30, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" }, "-=0.2");
    }, cardRef);
    return () => ctx.revert();
  }, []);

  // Transición al éxito con explosión de partículas (simulada)
  useEffect(() => {
    if (status === "email_sent" && cardRef.current && successRef.current) {
      // Efecto de partículas alrededor de la tarjeta
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div");
        particle.style.cssText = `
          position:fixed; width:6px; height:6px; border-radius:50%;
          background:hsl(${Math.random() * 60 + 15}, 90%, 55%);
          top:${centerY}px; left:${centerX}px;
          z-index:10000; pointer-events:none;
        `;
        document.body.appendChild(particle);
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => particle.remove(),
        });
      }

      gsap.to(card, {
        scale: 0.85, opacity: 0, filter: "blur(10px)", duration: 0.5,
        onComplete: () => {
          gsap.fromTo(successRef.current, { scale: 0, rotateY: 120 }, { scale: 1, rotateY: 0, duration: 1, ease: "elastic.out(1,0.5)" });
        },
      });
    }
  }, [status]);

  // Shake en error
  useEffect(() => {
    if (Object.keys(errors).length > 0 && cardRef.current) {
      gsap.fromTo(cardRef.current, { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1,0.2)" });
    }
  }, [errors]);

  return (
    <Perspective3DContainer>
      <CinematicCursor />
      <InteractiveParticles />
      {/* Orbe 3D flotante */}
      <Floating3DOrb />

      {/* Pantalla de éxito */}
      {status === "email_sent" && (
        <div ref={successRef} className="absolute z-50 flex flex-col items-center gap-5 text-center"
          style={{ transformStyle: "preserve-3d" }}>
          <div className="w-24 h-24 rounded-full flex items-center justify-center animate-pulse"
            style={{ background: "conic-gradient(from 0deg, #2563eb, #60a5fa, #2563eb)", boxShadow: "0 0 60px rgba(37,99,235,0.7)" }}>
            <IconMailSent />
          </div>
          <h2 className="text-2xl font-black tracking-widest" style={{ color: "#60a5fa", fontFamily: "'Orbitron', sans-serif", textShadow: "0 0 20px #60a5fa" }}>
            ENLACE ENVIADO
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>Revisa <strong>{formData.email}</strong></p>
          <a href="/login" className="flex items-center gap-2 text-sm tracking-widest uppercase hover:text-orange-400 transition-colors"
            style={{ color: "rgba(255,120,50,0.8)" }}>
            <IconArrowLeft /> VOLVER
          </a>
        </div>
      )}

      {/* Tarjeta de recuperación */}
      <div ref={cardRef} className="w-full max-w-sm px-4" style={{ transformStyle: "preserve-3d" }}>
        <TiltCard>
          <div className="rounded-2xl overflow-hidden relative"
            style={{ background: "rgba(10,2,4,0.9)", border: "1px solid rgba(255,70,20,0.3)", boxShadow: "0 0 80px rgba(255,70,20,0.2), inset 0 1px 0 rgba(255,100,50,0.2)", backdropFilter: "blur(10px)" }}>
            
            <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #ff4500, #ffaa00, #ff4500, transparent)" }} />
            <div className="px-8 pt-8 pb-7">
              <h1 className="text-center text-xl font-black tracking-widest uppercase mb-6"
                style={{ fontFamily: "'Orbitron', sans-serif", background: "linear-gradient(90deg, #ff6020, #ffaa00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", transform: "translateZ(40px)" }}
                onMouseEnter={(e) => { gsap.to(e.currentTarget, { skewX: 2, duration: 0.1, yoyo: true, repeat: 1 }); }}>
                Recuperar Acceso
              </h1>
              <p className="text-xs text-center mb-6" style={{ color: "rgba(255,255,255,0.4)", transform: "translateZ(20px)" }}>
                Ingresa tu email para recibir un enlace de restablecimiento.
              </p>

              {errors.general && (
                <div className="mb-4 p-3 rounded-lg text-xs text-center"
                  style={{ background: "rgba(220,20,20,0.2)", border: "1px solid rgba(220,20,20,0.5)", color: "#ff6060" }}>
                  ⚠ {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="field-reveal" style={{ transform: "translateZ(30px)" }}>
                  <label className="text-xs tracking-widest uppercase mb-1 block" style={{ color: "rgba(255,120,60,0.8)" }}>
                    Email
                  </label>
                  <ReactiveInput value={formData.email} onChange={handleChange} error={errors.email} placeholder="operador@sistema.io" />
                  {errors.email && <p className="text-xs mt-1" style={{ color: "#ff5555" }}>{errors.email}</p>}
                </div>

                <button type="submit" disabled={status === "loading"}
                  className="btn-reveal w-full py-3 rounded-xl text-sm font-black tracking-widest uppercase transition-transform duration-200"
                  style={{ background: "linear-gradient(90deg, #e83500, #ff6020, #ff9500, #ff6020, #e83500)", backgroundSize: "200% 100%", color: "#fff", boxShadow: "0 0 25px rgba(255,80,20,0.5), 0 4px 15px rgba(200,50,0,0.4)", animation: "btn-shine 2s linear infinite", transform: "translateZ(50px)" }}
                  onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, y: -2 })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0 })}>
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>
                      ENVIANDO...
                    </span>
                  ) : "ENVIAR ENLACE"}
                </button>
              </form>

              <div className="text-center mt-5" style={{ transform: "translateZ(10px)" }}>
                <a href="/login" className="text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:text-orange-400 transition-colors"
                  style={{ color: "rgba(255,120,50,0.7)" }}>
                  <IconArrowLeft /> Volver al inicio de sesión
                </a>
              </div>
            </div>
            <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,70,20,0.5), transparent)" }} />
          </div>
        </TiltCard>
      </div>

      <style jsx global>{`
        @keyframes btn-shine { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 50px rgba(10,2,4,0.9) inset; -webkit-text-fill-color: #fff; }
      `}</style>
    </Perspective3DContainer>
  );
}