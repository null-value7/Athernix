"use client";
// ============================================================
// VIEW — ResetPasswordView.tsx
// Pantalla /update-password — nueva contraseña tras el enlace.
// Escena 3D reactiva + card glass con tilt + medidor de fuerza.
// ============================================================

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import { useResetPasswordController } from "@/controllers/auth/AuthController";
import type { RecoveryPhase } from "@/components/auth/RecoveryBackdrop3D";

const RecoveryBackdrop3D = dynamic(() => import("@/components/auth/RecoveryBackdrop3D"), { ssr: false });

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

// ── Fuerza de contraseña ─────────────────────────────────────
function passwordStrength(pw: string): { score: 0 | 1 | 2 | 3; label: string; color: string } {
  if (!pw) return { score: 0, label: "", color: "rgba(255,255,255,0.15)" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "DÉBIL", color: "#ff3355" },
    { label: "DÉBIL", color: "#ff3355" },
    { label: "MEDIA", color: "#ffd700" },
    { label: "FUERTE", color: "#00e5a0" },
  ] as const;
  return { score: score as 0 | 1 | 2 | 3, ...map[score] };
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
  const successRef = useRef<HTMLDivElement>(null);
  const errorCount = useRef(0);

  const phase: RecoveryPhase =
    status === "success" ? "success"
    : status === "loading" ? "loading"
    : Object.keys(errors).length > 0 ? "error"
    : "idle";

  const strength = passwordStrength(formData.password);

  // ── Entrada ──────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(cardRef.current, { y: 80, opacity: 0, scale: 0.94, rotateX: 8 }, { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 1 })
        .fromTo(titleRef.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, "-=0.5")
        .fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45 }, "-=0.3")
        .fromTo(fieldRefs.current.filter(Boolean), { x: -34, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, stagger: 0.1 }, "-=0.25")
        .fromTo(btnRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, "-=0.2");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // ── Tilt 3D de la card ───────────────────────────────────
  const onCardMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotationY: px * 6, rotationX: -py * 6, transformPerspective: 900, duration: 0.4, ease: "power2.out" });
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };
  const onCardLeave = () => {
    if (cardRef.current) gsap.to(cardRef.current, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power3.out" });
  };

  // ── Éxito ────────────────────────────────────────────────
  useEffect(() => {
    if (status === "success" && cardRef.current && successRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0, scale: 0.9, rotationY: 12, duration: 0.45,
        onComplete: () => {
          gsap.fromTo(successRef.current,
            { scale: 0.6, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.7)" }
          );
        },
      });
    }
  }, [status]);

  // ── Shake errores + pulso para la escena ─────────────────
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      errorCount.current += 1;
      if (cardRef.current) {
        gsap.fromTo(cardRef.current, { x: -10 }, { x: 0, duration: 0.5, ease: "elastic.out(1,0.3)" });
      }
    }
  }, [errors]);

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    background: "rgba(255,255,255,0.04)",
    border: hasError ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)",
    color: "rgba(255,255,255,0.85)",
    fontFamily: "'Courier New', monospace",
    caretColor: "#ff6020",
  });

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse 90% 70% at 50% 110%, rgba(0,229,160,0.07) 0%, transparent 60%), linear-gradient(160deg, #0a0410 0%, #140818 45%, #0a0512 100%)" }}>

      {/* Fondo 3D interactivo */}
      <RecoveryBackdrop3D phase={phase} errorPulse={errorCount.current} />

      {/* Grid de fondo sutil */}
      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,229,160,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 75%)",
        }}
      />

      {/* Pantalla éxito */}
      {status === "success" && (
        <div ref={successRef} className="absolute z-50 flex flex-col items-center gap-5 opacity-0 text-center px-8">
          <div className="w-24 h-24 rounded-full flex items-center justify-center relative"
            style={{ background: "linear-gradient(135deg, #00e5a0, #0ea5e9)", boxShadow: "0 0 60px rgba(0,229,160,0.5), 0 0 120px rgba(14,165,233,0.25)" }}>
            <IconShield />
            <span className="absolute inset-0 rounded-full border border-emerald-400/40 animate-ping" />
          </div>
          <p className="text-2xl font-black tracking-widest uppercase"
            style={{ color: "#6ffbd2", fontFamily: "'Courier New', monospace", textShadow: "0 0 24px rgba(0,229,160,0.7)" }}>
            CONTRASEÑA ACTUALIZADA
          </p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Courier New', monospace" }}>
            Redirigiendo al inicio de sesión...
          </p>
          <div className="flex gap-1.5 mt-1">
            {[0, 1, 2].map(i => (
              <span key={i} className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#00e5a0", animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      )}

      {/* Card */}
      <div
        ref={cardRef}
        onMouseMove={onCardMove}
        onMouseLeave={onCardLeave}
        className="relative w-full max-w-md mx-4 rounded-2xl overflow-hidden z-10"
        style={{
          background: "rgba(14,6,18,0.78)",
          border: "1px solid rgba(255,107,0,0.22)",
          boxShadow: "0 0 80px rgba(255,0,110,0.14), 0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,140,80,0.12)",
          backdropFilter: "blur(24px) saturate(160%)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glare que sigue al mouse */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(255,140,60,0.08), transparent 60%)" }} />

        {/* Esquinas HUD */}
        {(["tl","tr","bl","br"] as const).map(pos => (
          <span key={pos} className="absolute w-4 h-4 pointer-events-none"
            style={{
              borderStyle: "solid", borderColor: "rgba(255,107,0,0.6)", opacity: 0.8,
              top: pos.startsWith("t") ? 10 : undefined, bottom: pos.startsWith("b") ? 10 : undefined,
              left: pos.endsWith("l") ? 10 : undefined, right: pos.endsWith("r") ? 10 : undefined,
              borderTopWidth: pos.startsWith("t") ? 2 : 0, borderBottomWidth: pos.startsWith("b") ? 2 : 0,
              borderLeftWidth: pos.endsWith("l") ? 2 : 0, borderRightWidth: pos.endsWith("r") ? 2 : 0,
            }} />
        ))}

        <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent, #ff006e, #ff6b00, #ffd700, transparent)" }} />

        <div className="px-8 pt-8 pb-7 relative">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <IconShield />
              <span className="text-[10px] tracking-[0.35em] uppercase" style={{ color: "rgba(255,107,0,0.6)", fontFamily: "'Courier New', monospace" }}>
                ATHERNIX_SECURITY_NODE
              </span>
            </div>
            <h1 ref={titleRef} className="text-3xl font-black tracking-widest uppercase mb-2"
              style={{ fontFamily: "'Courier New', monospace", background: "linear-gradient(90deg, #ff006e, #ff6b00, #ffd700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.12em" }}>
              NUEVA CONTRASEÑA
            </h1>
            <p ref={subtitleRef} className="flex items-center justify-center gap-2 text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "rgba(255,140,80,0.65)" }}>
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
                  style={inputStyle(!!errors.password)}
                  onFocus={(e) => { e.target.style.border = "1px solid rgba(255,120,30,0.7)"; e.target.style.boxShadow = "0 0 0 2px rgba(255,80,20,0.12)"; }}
                  onBlur={(e) => { e.target.style.border = errors.password ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)"; e.target.style.boxShadow = "none"; }}
                />
                <button type="button" onClick={toggleShowPassword} className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,120,60,0.6)" }}>
                  <IconEye open={showPassword} />
                </button>
              </div>
              {/* Medidor de fuerza */}
              {formData.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ background: i < strength.score ? strength.color : "rgba(255,255,255,0.08)" }} />
                    ))}
                  </div>
                  <span className="text-[9px] tracking-[0.2em] uppercase font-bold"
                    style={{ color: strength.color, fontFamily: "'Courier New', monospace" }}>
                    {strength.label}
                  </span>
                </div>
              )}
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
                  style={inputStyle(!!errors.confirmPassword)}
                  onFocus={(e) => { e.target.style.border = "1px solid rgba(255,120,30,0.7)"; e.target.style.boxShadow = "0 0 0 2px rgba(255,80,20,0.12)"; }}
                  onBlur={(e) => { e.target.style.border = errors.confirmPassword ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)"; e.target.style.boxShadow = "none"; }}
                />
                <button type="button" onClick={toggleShowConfirm} className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,120,60,0.6)" }}>
                  <IconEye open={showConfirm} />
                </button>
              </div>
              {formData.confirmPassword.length > 0 && !errors.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="mt-1 text-xs flex items-center gap-1" style={{ color: "#00e5a0", fontFamily: "'Courier New', monospace" }}>✓ COINCIDEN</p>
              )}
              {errors.confirmPassword && <p className="mt-1 text-xs" style={{ color: "#ff5555", fontFamily: "'Courier New', monospace" }}>✕ {errors.confirmPassword}</p>}
            </div>

            <button ref={btnRef} type="submit" disabled={status === "loading"}
              className="w-full py-3.5 rounded-xl text-sm font-black tracking-widest uppercase mt-2"
              style={{ backgroundImage: status === "loading" ? "none" : "linear-gradient(90deg, #ff006e, #ff6b00, #ffd700, #ff6b00, #ff006e)", backgroundColor: status === "loading" ? "rgba(180,50,10,0.5)" : "transparent", backgroundSize: "200% 100%", color: "#fff", fontFamily: "'Courier New', monospace", letterSpacing: "0.2em", boxShadow: status === "loading" ? "none" : "0 0 24px rgba(255,0,110,0.35), 0 4px 18px rgba(255,107,0,0.25)", animation: status === "loading" ? "none" : "btn-shine 2.4s linear infinite", cursor: status === "loading" ? "not-allowed" : "pointer", border: "1px solid rgba(255,120,50,0.3)" }}
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

          {/* Volver */}
          <div className="mt-5 text-center">
            <a href="/login" className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: "rgba(255,120,50,0.6)", fontFamily: "'Courier New', monospace" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6020")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,120,50,0.6)")}>
              <IconArrowLeftInline /> VOLVER AL INICIO DE SESIÓN
            </a>
          </div>
        </div>
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,0,0.35), transparent)" }} />
      </div>

      <style jsx global>{`
        @keyframes btn-shine { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 50px rgba(14,6,18,0.95) inset; -webkit-text-fill-color: rgba(255,255,255,0.85); }
      `}</style>
    </div>
  );
}

const IconArrowLeftInline = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
    <path d="M19 12H5M5 12l7-7M5 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
