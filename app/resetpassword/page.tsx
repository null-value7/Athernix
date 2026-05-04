"use client";
// ============================================================
// VIEW — ResetPasswordView.tsx
// Pantalla /update-password — nueva contraseña tras el enlace
// ============================================================

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useResetPasswordController } from "@/controllers/auth/AuthController";

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
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, { scale: 1.15, opacity: 0.6, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(cardRef.current, { y: 60, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.8 })
        .fromTo(titleRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.4")
        .fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.2")
        .fromTo(fieldRefs.current.filter(Boolean), { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, "-=0.2")
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
    <div ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a0505 0%, #2d0a0a 40%, #1a0a0a 70%, #0d0505 100%)" }}>

      {/* Glow */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(220,40,40,0.18) 0%, rgba(180,60,10,0.10) 40%, transparent 70%)" }} />

      {/* Partículas */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <div key={p.id} className="absolute rounded-full"
              style={{ width: `${p.width}px`, height: `${p.height}px`, left: `${p.left}%`, top: `${p.top}%`, background: p.color }} />
          ))}
        </div>
      )}

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
        style={{ background: "rgba(18,5,5,0.92)", border: "1px solid rgba(220,60,20,0.25)", boxShadow: "0 0 60px rgba(180,30,10,0.25), inset 0 1px 0 rgba(255,100,50,0.1)", backdropFilter: "blur(20px)" }}>

        <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent, #ff4500, #ff8c00, #ff4500, transparent)" }} />

        <div className="px-8 pt-8 pb-7">
          <div className="text-center mb-7">
            <h1 ref={titleRef} className="text-2xl font-black tracking-widest uppercase mb-2"
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
                  style={{ background: "rgba(255,255,255,0.04)", border: errors.password ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)", color: "rgba(255,255,255,0.85)", fontFamily: "'Courier New', monospace", caretColor: "#ff6020" }}
                  onFocus={(e) => { e.target.style.border = "1px solid rgba(255,120,30,0.7)"; e.target.style.boxShadow = "0 0 0 2px rgba(255,80,20,0.12)"; }}
                  onBlur={(e) => { e.target.style.border = errors.password ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)"; e.target.style.boxShadow = "none"; }}
                />
                <button type="button" onClick={toggleShowPassword} className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,120,60,0.6)" }}>
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
                  style={{ background: "rgba(255,255,255,0.04)", border: errors.confirmPassword ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)", color: "rgba(255,255,255,0.85)", fontFamily: "'Courier New', monospace", caretColor: "#ff6020" }}
                  onFocus={(e) => { e.target.style.border = "1px solid rgba(255,120,30,0.7)"; e.target.style.boxShadow = "0 0 0 2px rgba(255,80,20,0.12)"; }}
                  onBlur={(e) => { e.target.style.border = errors.confirmPassword ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)"; e.target.style.boxShadow = "none"; }}
                />
                <button type="button" onClick={toggleShowConfirm} className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,120,60,0.6)" }}>
                  <IconEye open={showConfirm} />
                </button>
                <div className="absolute bottom-0 left-0 h-px transition-all duration-300"
                  style={{ background: "linear-gradient(90deg, #ff4500, #ff8c00)", width: formData.confirmPassword ? "100%" : "0%" }} />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs" style={{ color: "#ff5555", fontFamily: "'Courier New', monospace" }}>✕ {errors.confirmPassword}</p>}
            </div>

            <button ref={btnRef} type="submit" disabled={status === "loading"}
              className="w-full py-3.5 rounded-xl text-sm font-black tracking-widest uppercase mt-2"
              style={{ backgroundImage: status === "loading" ? "none" : "linear-gradient(90deg, #e83500, #ff6020, #ff9500, #ff6020, #e83500)", backgroundColor: status === "loading" ? "rgba(180,50,10,0.5)" : "transparent", backgroundSize: "200% 100%", color: "#fff", fontFamily: "'Courier New', monospace", letterSpacing: "0.2em", boxShadow: status === "loading" ? "none" : "0 0 20px rgba(255,80,20,0.4)", animation: status === "loading" ? "none" : "btn-shine 2s linear infinite", cursor: status === "loading" ? "not-allowed" : "pointer", border: "1px solid rgba(255,120,50,0.3)" }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}>
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
      </div>

      <style jsx global>{`
        @keyframes btn-shine { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 50px rgba(18,5,5,0.95) inset; -webkit-text-fill-color: rgba(255,255,255,0.85); }
      `}</style>
    </div>
  );
}