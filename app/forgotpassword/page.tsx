"use client";
// ============================================================
// VIEW — ForgotPasswordView.tsx
// Mismos colores, tipografía y animaciones que RegisterView
// ============================================================

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useForgotPasswordController } from "@/controllers/auth/AuthController";

// ── Iconos ───────────────────────────────────────────────────
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" strokeLinecap="round" />
  </svg>
);

const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
    <path d="M19 12H5M5 12l7-7M5 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMailSent = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9" stroke="currentColor" strokeWidth={1.5}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" strokeLinecap="round" />
    <path d="M16 13l3 3m0 0l3-3m-3 3V9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Componente ───────────────────────────────────────────────
export default function ForgotPasswordView() {
  const { formData, errors, status, handleChange, handleSubmit } =
    useForgotPasswordController();

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
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
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        scale: 1.15, opacity: 0.6, duration: 3,
        repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(cardRef.current, { y: 60, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.8 })
        .fromTo(titleRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.4")
        .fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.2")
        .fromTo(fieldRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 }, "-=0.2")
        .fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.1");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // ── Éxito ────────────────────────────────────────────────
  useEffect(() => {
    if (status === "email_sent" && cardRef.current && successRef.current) {
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

  // ── Shake en error ───────────────────────────────────────
  useEffect(() => {
    if (Object.keys(errors).length > 0 && cardRef.current) {
      gsap.fromTo(cardRef.current, { x: -8 }, { x: 0, duration: 0.4, ease: "elastic.out(1,0.3)" });
    }
  }, [errors]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a0505 0%, #2d0a0a 40%, #1a0a0a 70%, #0d0505 100%)" }}
    >
      {/* Glow */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(220,40,40,0.18) 0%, rgba(180,60,10,0.10) 40%, transparent 70%)" }}
      />

      {/* Partículas */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <div key={p.id} className="absolute rounded-full"
              style={{ width: `${p.width}px`, height: `${p.height}px`, left: `${p.left}%`, top: `${p.top}%`, background: p.color, animation: `float-${p.id % 3} ${p.duration}s ease-in-out infinite`, animationDelay: `${p.delay}s` }}
            />
          ))}
        </div>
      )}

      {/* Pantalla email enviado */}
      {status === "email_sent" && (
        <div ref={successRef} className="absolute z-50 flex flex-col items-center gap-5 opacity-0 px-8 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1a3a6b, #2563eb)", boxShadow: "0 0 40px rgba(37,99,235,0.5)" }}>
            <IconMailSent />
          </div>
          <p className="text-xl font-black tracking-widest uppercase"
            style={{ color: "#60a5fa", fontFamily: "'Courier New', monospace", textShadow: "0 0 20px rgba(96,165,250,0.6)" }}>
            ENLACE ENVIADO
          </p>
          <p className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Courier New', monospace" }}>
            Revisa tu bandeja de entrada en
          </p>
          <p className="text-sm font-bold px-4 py-2 rounded-lg"
            style={{ color: "#60a5fa", background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", fontFamily: "'Courier New', monospace" }}>
            {formData.email}
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Courier New', monospace" }}>
            Haz clic en el enlace para restablecer tu contraseña
          </p>
          <a href="/login" className="flex items-center gap-2 text-xs tracking-widest uppercase mt-2 transition-colors duration-200"
            style={{ color: "rgba(255,120,50,0.7)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6020")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,120,50,0.7)")}>
            <IconArrowLeft /> VOLVER AL INICIO
          </a>
        </div>
      )}

      {/* Card */}
      <div ref={cardRef} className="relative w-full max-w-sm mx-4 rounded-2xl overflow-hidden"
        style={{ background: "rgba(18,5,5,0.92)", border: "1px solid rgba(220,60,20,0.25)", boxShadow: "0 0 60px rgba(180,30,10,0.25), 0 0 120px rgba(180,30,10,0.10), inset 0 1px 0 rgba(255,100,50,0.1)", backdropFilter: "blur(20px)" }}>

        <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent, #ff4500, #ff8c00, #ff4500, transparent)" }} />

        <div className="px-8 pt-8 pb-7">
          {/* Título */}
          <div className="text-center mb-7">
            <h1 ref={titleRef} className="text-2xl font-black tracking-widest uppercase mb-2"
              style={{ fontFamily: "'Courier New', monospace", background: "linear-gradient(90deg, #ff6020, #ffaa00, #ff4500)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.15em" }}>
              RECUPERAR ACCESO
            </h1>
            <p ref={subtitleRef} className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase"
              style={{ color: "rgba(255,140,80,0.7)" }}>
              <span style={{ color: "rgba(255,80,20,0.5)" }}>◆</span>
              RESTAURACIÓN SEGURA
              <span style={{ color: "rgba(255,80,20,0.5)" }}>◆</span>
            </p>
          </div>

          <p className="text-xs text-center mb-6 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Courier New', monospace" }}>
            Ingresa tu email y recibirás un enlace para restablecer tu contraseña
          </p>

          {/* Error general */}
          {errors.general && (
            <div className="mb-4 px-4 py-2 rounded-lg text-xs tracking-wider text-center"
              style={{ background: "rgba(220,20,20,0.15)", border: "1px solid rgba(220,20,20,0.4)", color: "#ff6060", fontFamily: "'Courier New', monospace" }}>
              ⚠ {errors.general}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div ref={fieldRef}>
              <label className="flex items-center gap-1.5 text-xs tracking-widest uppercase mb-1.5"
                style={{ color: "rgba(255,120,60,0.8)", fontFamily: "'Courier New', monospace" }}>
                <IconMail />
                IDENTIFICADOR_DIGITAL
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="operador@sistema.io"
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.04)", border: errors.email ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)", color: "rgba(255,255,255,0.85)", fontFamily: "'Courier New', monospace", caretColor: "#ff6020" }}
                  onFocus={(e) => { e.target.style.border = "1px solid rgba(255,120,30,0.7)"; e.target.style.boxShadow = "0 0 0 2px rgba(255,80,20,0.12)"; }}
                  onBlur={(e) => { e.target.style.border = errors.email ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)"; e.target.style.boxShadow = "none"; }}
                />
                <div className="absolute bottom-0 left-0 h-px transition-all duration-300"
                  style={{ background: "linear-gradient(90deg, #ff4500, #ff8c00)", width: formData.email ? "100%" : "0%" }} />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs" style={{ color: "#ff5555", fontFamily: "'Courier New', monospace" }}>✕ {errors.email}</p>
              )}
            </div>

            {/* Botón */}
            <button ref={btnRef} type="submit" disabled={status === "loading"}
              className="w-full py-3.5 rounded-xl text-sm font-black tracking-widest uppercase mt-2"
              style={{ backgroundImage: status === "loading" ? "none" : "linear-gradient(90deg, #e83500, #ff6020, #ff9500, #ff6020, #e83500)", backgroundColor: status === "loading" ? "rgba(180,50,10,0.5)" : "transparent", backgroundSize: "200% 100%", color: "#fff", fontFamily: "'Courier New', monospace", letterSpacing: "0.2em", boxShadow: status === "loading" ? "none" : "0 0 20px rgba(255,80,20,0.4), 0 4px 15px rgba(200,50,0,0.3)", animation: status === "loading" ? "none" : "btn-shine 2s linear infinite", cursor: status === "loading" ? "not-allowed" : "pointer", border: "1px solid rgba(255,120,50,0.3)" }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}>
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  ENVIANDO...
                </span>
              ) : "ENVIAR ENLACE"}
            </button>
          </form>

          {/* Volver */}
          <div className="mt-5 text-center">
            <a href="/login" className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: "rgba(255,120,50,0.6)", fontFamily: "'Courier New', monospace" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6020")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,120,50,0.6)")}>
              <IconArrowLeft /> VOLVER AL INICIO DE SESIÓN
            </a>
          </div>
        </div>

        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(180,50,10,0.4), transparent)" }} />
      </div>

      <style jsx global>{`
        @keyframes btn-shine { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 50px rgba(18,5,5,0.95) inset; -webkit-text-fill-color: rgba(255,255,255,0.85); }
      `}</style>
    </div>
  );
}