"use client";
// ════════════════════════════════════════════════════════════
// VIEW — ForgotPasswordView
// Flujo de recuperación: escena 3D reactiva + card glass con tilt.
// La escena cambia de paleta según la fase (idle/loading/email_sent).
// ════════════════════════════════════════════════════════════
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import { useForgotPasswordController } from "@/controllers/auth/AuthController";
import type { RecoveryPhase } from "@/components/auth/RecoveryBackdrop3D";

const RecoveryBackdrop3D = dynamic(() => import("@/components/auth/RecoveryBackdrop3D"), { ssr: false });

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

const IconScan = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={1.5}>
    <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" />
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
  const successRef = useRef<HTMLDivElement>(null);
  const errorCount = useRef(0);

  // Fase para la escena 3D
  const phase: RecoveryPhase =
    status === "email_sent" ? "sent"
    : status === "loading" ? "loading"
    : Object.keys(errors).length > 0 ? "error"
    : "idle";

  // ── Entrada ──────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(cardRef.current, { y: 80, opacity: 0, scale: 0.94, rotateX: 8 }, { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 1 })
        .fromTo(titleRef.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, "-=0.5")
        .fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45 }, "-=0.3")
        .fromTo(fieldRef.current, { x: -34, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45 }, "-=0.25")
        .fromTo(btnRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, "-=0.2")
        .fromTo(".fp-step", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, "-=0.3");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // ── Tilt 3D de la card siguiendo el mouse ────────────────
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
    if (status === "email_sent" && cardRef.current && successRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0, scale: 0.9, rotationY: -12, duration: 0.45,
        onComplete: () => {
          gsap.fromTo(successRef.current,
            { scale: 0.6, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.7)" }
          );
        },
      });
    }
  }, [status]);

  // ── Shake en error + pulso para la escena ────────────────
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      errorCount.current += 1;
      if (cardRef.current) {
        gsap.fromTo(cardRef.current, { x: -10 }, { x: 0, duration: 0.5, ease: "elastic.out(1,0.3)" });
      }
    }
  }, [errors]);

  const STEPS = [
    { n: "01", label: "IDENTIFÍCATE" },
    { n: "02", label: "REVISA TU EMAIL" },
    { n: "03", label: "NUEVA CLAVE" },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse 90% 70% at 50% 110%, rgba(255,0,110,0.10) 0%, transparent 60%), linear-gradient(160deg, #0a0410 0%, #140818 45%, #0a0512 100%)" }}
    >
      {/* Fondo 3D interactivo */}
      <RecoveryBackdrop3D phase={phase} errorPulse={errorCount.current} />

      {/* Grid de fondo sutil */}
      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,107,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 75%)",
        }}
      />

      {/* Pantalla email enviado */}
      {status === "email_sent" && (
        <div ref={successRef} className="absolute z-50 flex flex-col items-center gap-5 opacity-0 px-8 text-center max-w-md">
          <div className="w-24 h-24 rounded-full flex items-center justify-center relative"
            style={{ background: "linear-gradient(135deg, #0ea5e9, #6366f1)", boxShadow: "0 0 60px rgba(56,189,248,0.5), 0 0 120px rgba(99,102,241,0.25)" }}>
            <IconMailSent />
            <span className="absolute inset-0 rounded-full border border-sky-400/40 animate-ping" />
          </div>
          <p className="text-2xl font-black tracking-widest uppercase"
            style={{ color: "#7dd3fc", fontFamily: "'Courier New', monospace", textShadow: "0 0 24px rgba(125,211,252,0.7)" }}>
            ENLACE ENVIADO
          </p>
          <p className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Courier New', monospace" }}>
            Revisa tu bandeja de entrada en
          </p>
          <p className="text-sm font-bold px-4 py-2 rounded-lg"
            style={{ color: "#7dd3fc", background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.3)", fontFamily: "'Courier New', monospace" }}>
            {formData.email}
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Courier New', monospace" }}>
            Haz clic en el enlace para restablecer tu contraseña
          </p>
          <a href="/login" className="flex items-center gap-2 text-xs tracking-widest uppercase mt-2 transition-colors duration-200"
            style={{ color: "rgba(125,211,252,0.7)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(125,211,252,0.7)")}>
            <IconArrowLeft /> VOLVER AL INICIO
          </a>
        </div>
      )}

      {/* Card principal */}
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
          {/* Título */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <IconScan />
              <span className="text-[10px] tracking-[0.35em] uppercase" style={{ color: "rgba(255,107,0,0.6)", fontFamily: "'Courier New', monospace" }}>
                ATHERNIX_SECURITY_NODE
              </span>
            </div>
            <h1 ref={titleRef} className="text-3xl font-black tracking-widest uppercase mb-2"
              style={{ fontFamily: "'Courier New', monospace", background: "linear-gradient(90deg, #ff006e, #ff6b00, #ffd700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.12em" }}>
              RECUPERAR ACCESO
            </h1>
            <p ref={subtitleRef} className="flex items-center justify-center gap-2 text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "rgba(255,140,80,0.65)" }}>
              <span style={{ color: "rgba(255,80,20,0.5)" }}>◆</span>
              RESTAURACIÓN SEGURA
              <span style={{ color: "rgba(255,80,20,0.5)" }}>◆</span>
            </p>
          </div>

          {/* Indicador de pasos */}
          <div className="flex items-center justify-center gap-2 mb-7">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.n}>
                <div className="fp-step flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black"
                    style={{
                      fontFamily: "'Courier New', monospace",
                      background: i === 0 ? "linear-gradient(135deg,#ff006e,#ff6b00)" : "rgba(255,255,255,0.05)",
                      color: i === 0 ? "#fff" : "rgba(255,255,255,0.3)",
                      border: `1px solid ${i === 0 ? "transparent" : "rgba(255,255,255,0.12)"}`,
                    }}>
                    {s.n}
                  </span>
                  <span className="text-[8px] tracking-[0.2em] uppercase hidden sm:inline"
                    style={{ color: i === 0 ? "rgba(255,160,90,0.8)" : "rgba(255,255,255,0.25)", fontFamily: "'Courier New', monospace" }}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && <div className="w-6 h-px" style={{ background: "rgba(255,107,0,0.2)" }} />}
              </React.Fragment>
            ))}
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
                  style={{ background: "linear-gradient(90deg, #ff006e, #ff6b00)", width: formData.email ? "100%" : "0%" }} />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs" style={{ color: "#ff5555", fontFamily: "'Courier New', monospace" }}>✕ {errors.email}</p>
              )}
            </div>

            {/* Botón */}
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

        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,0,0.35), transparent)" }} />
      </div>

      <style jsx global>{`
        @keyframes btn-shine { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 50px rgba(14,6,18,0.95) inset; -webkit-text-fill-color: rgba(255,255,255,0.85); }
      `}</style>
    </div>
  );
}
