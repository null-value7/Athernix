"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useRegisterController } from "@/controllers/auth/register";

// ── Iconos SVG inline ─────────────────────────────────────────
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 118 0v4" strokeLinecap="round" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" strokeLinecap="round" />
  </svg>
);

const IconEye = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={2}>
    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MailSentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" strokeLinecap="round" />
    <path d="M16 14l3 3m0 0l3-3m-3 3V10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Componente principal ──────────────────────────────────────
export default function RegisterView() {
  const {
    state,
    formRef,
    handleChange,
    handleSubmit,
    handleGoogleRegister,
    handleGitHubRegister,
    togglePasswordVisibility,
  } = useRegisterController();

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const fieldRefs = useRef<(HTMLDivElement | null)[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const oauthRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  // ── Partículas generadas solo en el cliente ─────────────────
  // Evita hydration mismatch: Math.random() da valores distintos
  // en servidor y cliente, por eso se genera solo tras el mount.
  const [particles] = useState(() =>
    typeof window === "undefined"
      ? []
      : Array.from({ length: 12 }, (_, i) => ({
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // ── Animación de entrada ────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Glow pulsante de fondo
      gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Card entrada
      tl.fromTo(
        cardRef.current,
        { y: 60, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8 }
      )
        .fromTo(
          titleRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.2"
        )
        .fromTo(
          fieldRefs.current.filter(Boolean),
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
          "-=0.2"
        )
        .fromTo(
          btnRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.1"
        )
        .fromTo(
          oauthRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          "-=0.1"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ── Animación de éxito ──────────────────────────────────────
  useEffect(() => {
    if (state.success && cardRef.current && successRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        onComplete: () => {
          gsap.fromTo(
            successRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
          );
        },
      });
    }
  }, [state.success]);

  // ── Animación confirm_email ─────────────────────────────────
  useEffect(() => {
    const isConfirm = (state as any).submitStatus === "confirm_email";
    if (isConfirm && cardRef.current && confirmRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0, scale: 0.9, duration: 0.4,
        onComplete: () => {
          gsap.fromTo(
            confirmRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
          );
        },
      });
    }
  }, [(state as any).submitStatus]);

  // ── Shake al haber errores ──────────────────────────────────
  useEffect(() => {
    if (Object.keys(state.errors).length > 0 && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { x: -8 },
        { x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" }
      );
    }
  }, [state.errors]);

  // ── Hover del botón principal ───────────────────────────────
  const handleBtnEnter = () => {
    gsap.to(btnRef.current, { scale: 1.03, duration: 0.2 });
  };
  const handleBtnLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.2 });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a0505 0%, #2d0a0a 40%, #1a0a0a 70%, #0d0505 100%)" }}
    >
      {/* ── Glow de fondo ─────────────────────────────────── */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(220,40,40,0.18) 0%, rgba(180,60,10,0.10) 40%, transparent 70%)",
        }}
      />

      {/* ── Partículas decorativas (solo cliente) ─────────── */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: `${p.width}px`,
                height: `${p.height}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                background: p.color,
                animation: `float-${p.id % 3} ${p.duration}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* ── Pantalla: registro completo (sin confirm email) ─── */}
      {state.success && (
        <div
          ref={successRef}
          className="absolute z-50 flex flex-col items-center gap-4 opacity-0"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #ff4500, #ff8c00)", boxShadow: "0 0 40px rgba(255,69,0,0.6)" }}
          >
            <CheckIcon />
          </div>
          <p className="text-xl font-bold tracking-widest uppercase"
            style={{ color: "#ff6020", fontFamily: "'Courier New', monospace", textShadow: "0 0 20px rgba(255,96,32,0.8)" }}>
            OPERADOR REGISTRADO
          </p>
          <p className="text-sm tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
            Redirigiendo al sistema...
          </p>
        </div>
      )}

      {/* ── Pantalla: email de confirmación enviado ────────── */}
      {(state as any).submitStatus === "confirm_email" && (
        <div
          ref={confirmRef}
          className="absolute z-50 flex flex-col items-center gap-5 opacity-0 px-8 text-center"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1a3a6b, #2563eb)", boxShadow: "0 0 40px rgba(37,99,235,0.5)" }}
          >
            <MailSentIcon />
          </div>
          <p className="text-xl font-bold tracking-widest uppercase"
            style={{ color: "#60a5fa", fontFamily: "'Courier New', monospace", textShadow: "0 0 20px rgba(96,165,250,0.6)" }}>
            CORREO ENVIADO
          </p>
          <p className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Courier New', monospace" }}>
            Revisa tu bandeja de entrada en
          </p>
          <p className="text-sm font-bold px-4 py-2 rounded-lg"
            style={{ color: "#60a5fa", background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", fontFamily: "'Courier New', monospace" }}>
            {(state as any).confirmEmail}
          </p>
          <p className="text-xs"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Courier New', monospace" }}>
            Haz clic en el enlace del correo para activar tu cuenta
          </p>
        </div>
      )}

      {/* ── Card principal ─────────────────────────────────── */}
      <div
        ref={cardRef}
        className="relative w-full max-w-sm mx-4 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(18, 5, 5, 0.92)",
          border: "1px solid rgba(220,60,20,0.25)",
          boxShadow: "0 0 60px rgba(180,30,10,0.25), 0 0 120px rgba(180,30,10,0.10), inset 0 1px 0 rgba(255,100,50,0.1)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Línea superior decorativa */}
        <div
          className="h-0.5 w-full"
          style={{ background: "linear-gradient(90deg, transparent, #ff4500, #ff8c00, #ff4500, transparent)" }}
        />

        <div className="px-8 pt-8 pb-7">
          {/* ── Título ──────────────────────────────────────── */}
          <div className="text-center mb-7">
            <h1
              ref={titleRef}
              className="text-3xl font-black tracking-widest uppercase mb-2"
              style={{
                fontFamily: "'Courier New', monospace",
                background: "linear-gradient(90deg, #ff6020, #ffaa00, #ff4500)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(255,96,32,0.4)",
                letterSpacing: "0.2em",
              }}
            >
              NUEVO OPERADOR
            </h1>
            <p
              ref={subtitleRef}
              className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase"
              style={{ color: "rgba(255,140,80,0.7)" }}
            >
              <span style={{ color: "rgba(255,80,20,0.5)" }}>◆</span>
              REGISTRO SEGURO
              <span style={{ color: "rgba(255,80,20,0.5)" }}>◆</span>
            </p>
          </div>

          {/* ── Error general ───────────────────────────────── */}
          {state.errors.general && (
            <div
              className="mb-4 px-4 py-2 rounded-lg text-xs tracking-wider text-center"
              style={{
                background: "rgba(220,20,20,0.15)",
                border: "1px solid rgba(220,20,20,0.4)",
                color: "#ff6060",
                fontFamily: "'Courier New', monospace",
              }}
            >
              ⚠ {state.errors.general}
            </div>
          )}

          {/* ── Formulario ──────────────────────────────────── */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* Nombre */}
            <div ref={(el) => { fieldRefs.current[0] = el; }}>
              <label
                className="flex items-center gap-1.5 text-xs tracking-widest uppercase mb-1.5"
                style={{ color: "rgba(255,120,60,0.8)", fontFamily: "'Courier New', monospace" }}
              >
                <IconUser />
                NOMBRE_OPERADOR
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={state.formData.nombre}
                  onChange={handleChange("nombre")}
                  placeholder="nombre"
                  autoComplete="given-name"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: state.errors.nombre
                      ? "1px solid rgba(255,60,60,0.7)"
                      : "1px solid rgba(255,80,30,0.25)",
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "'Courier New', monospace",
                    caretColor: "#ff6020",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid rgba(255,120,30,0.7)";
                    e.target.style.boxShadow = "0 0 0 2px rgba(255,80,20,0.12), 0 0 20px rgba(255,80,20,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = state.errors.nombre
                      ? "1px solid rgba(255,60,60,0.7)"
                      : "1px solid rgba(255,80,30,0.25)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 h-px transition-all duration-300"
                  style={{ background: "linear-gradient(90deg, #ff4500, #ff8c00)", width: state.formData.nombre ? "100%" : "0%" }}
                />
              </div>
              {state.errors.nombre && (
                <p className="mt-1 text-xs" style={{ color: "#ff5555", fontFamily: "'Courier New', monospace" }}>
                  ✕ {state.errors.nombre}
                </p>
              )}
            </div>

            {/* Apellido */}
            <div ref={(el) => { fieldRefs.current[1] = el; }}>
              <label
                className="flex items-center gap-1.5 text-xs tracking-widest uppercase mb-1.5"
                style={{ color: "rgba(255,120,60,0.8)", fontFamily: "'Courier New', monospace" }}
              >
                <IconUser />
                APELLIDO_OPERADOR
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={state.formData.apellido}
                  onChange={handleChange("apellido")}
                  placeholder="apellido"
                  autoComplete="family-name"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: state.errors.apellido
                      ? "1px solid rgba(255,60,60,0.7)"
                      : "1px solid rgba(255,80,30,0.25)",
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "'Courier New', monospace",
                    caretColor: "#ff6020",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid rgba(255,120,30,0.7)";
                    e.target.style.boxShadow = "0 0 0 2px rgba(255,80,20,0.12), 0 0 20px rgba(255,80,20,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = state.errors.apellido
                      ? "1px solid rgba(255,60,60,0.7)"
                      : "1px solid rgba(255,80,30,0.25)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 h-px transition-all duration-300"
                  style={{ background: "linear-gradient(90deg, #ff4500, #ff8c00)", width: state.formData.apellido ? "100%" : "0%" }}
                />
              </div>
              {state.errors.apellido && (
                <p className="mt-1 text-xs" style={{ color: "#ff5555", fontFamily: "'Courier New', monospace" }}>
                  ✕ {state.errors.apellido}
                </p>
              )}
            </div>

            {/* Email */}
            <div ref={(el) => { fieldRefs.current[2] = el; }}>
              <label
                className="flex items-center gap-1.5 text-xs tracking-widest uppercase mb-1.5"
                style={{ color: "rgba(255,120,60,0.8)", fontFamily: "'Courier New', monospace" }}
              >
                <IconMail />
                IDENTIFICADOR_DIGITAL
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={state.formData.email}
                  onChange={handleChange("email")}
                  placeholder="operador@sistema.io"
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: state.errors.email
                      ? "1px solid rgba(255,60,60,0.7)"
                      : "1px solid rgba(255,80,30,0.25)",
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "'Courier New', monospace",
                    caretColor: "#ff6020",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid rgba(255,120,30,0.7)";
                    e.target.style.boxShadow = "0 0 0 2px rgba(255,80,20,0.12), 0 0 20px rgba(255,80,20,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = state.errors.email
                      ? "1px solid rgba(255,60,60,0.7)"
                      : "1px solid rgba(255,80,30,0.25)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 h-px transition-all duration-300"
                  style={{ background: "linear-gradient(90deg, #ff4500, #ff8c00)", width: state.formData.email ? "100%" : "0%" }}
                />
              </div>
              {state.errors.email && (
                <p className="mt-1 text-xs" style={{ color: "#ff5555", fontFamily: "'Courier New', monospace" }}>
                  ✕ {state.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div ref={(el) => { fieldRefs.current[3] = el; }}>
              <label
                className="flex items-center gap-1.5 text-xs tracking-widest uppercase mb-1.5"
                style={{ color: "rgba(255,120,60,0.8)", fontFamily: "'Courier New', monospace" }}
              >
                <IconLock />
                CLAVE_CRIPTOGRÁFICA
              </label>
              <div className="relative">
                <input
                  type={state.showPassword ? "text" : "password"}
                  value={state.formData.password}
                  onChange={handleChange("password")}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full px-4 py-3 pr-10 rounded-lg text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: state.errors.password
                      ? "1px solid rgba(255,60,60,0.7)"
                      : "1px solid rgba(255,80,30,0.25)",
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "'Courier New', monospace",
                    caretColor: "#ff6020",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid rgba(255,120,30,0.7)";
                    e.target.style.boxShadow = "0 0 0 2px rgba(255,80,20,0.12), 0 0 20px rgba(255,80,20,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = state.errors.password
                      ? "1px solid rgba(255,60,60,0.7)"
                      : "1px solid rgba(255,80,30,0.25)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                {/* Toggle visibilidad */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: "rgba(255,120,60,0.6)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,120,60,1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,120,60,0.6)")}
                >
                  <IconEye open={state.showPassword} />
                </button>
                <div
                  className="absolute bottom-0 left-0 h-px transition-all duration-300"
                  style={{ background: "linear-gradient(90deg, #ff4500, #ff8c00)", width: state.formData.password ? "100%" : "0%" }}
                />
              </div>
              {state.errors.password && (
                <p className="mt-1 text-xs" style={{ color: "#ff5555", fontFamily: "'Courier New', monospace" }}>
                  ✕ {state.errors.password}
                </p>
              )}
            </div>

            {/* ── Botón principal ─────────────────────────────── */}
            <button
              ref={btnRef}
              type="submit"
              disabled={state.isLoading}
              onMouseEnter={handleBtnEnter}
              onMouseLeave={handleBtnLeave}
              className="w-full py-3.5 rounded-xl text-sm font-black tracking-widest uppercase relative overflow-hidden mt-2"
              style={{
                backgroundImage: state.isLoading
                  ? "none"
                  : "linear-gradient(90deg, #e83500, #ff6020, #ff9500, #ff6020, #e83500)",
                backgroundColor: state.isLoading
                  ? "rgba(180,50,10,0.5)"
                  : "transparent",
                backgroundSize: "200% 100%",
                color: "#fff",
                fontFamily: "'Courier New', monospace",
                letterSpacing: "0.2em",
                boxShadow: state.isLoading
                  ? "none"
                  : "0 0 20px rgba(255,80,20,0.4), 0 4px 15px rgba(200,50,0,0.3)",
                animation: state.isLoading ? "none" : "btn-shine 2s linear infinite",
                cursor: state.isLoading ? "not-allowed" : "pointer",
                border: "1px solid rgba(255,120,50,0.3)",
              }}
            >
              {state.isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  PROCESANDO...
                </span>
              ) : (
                "REGISTRAR OPERADOR"
              )}
            </button>
          </form>

          {/* ── Divisor ─────────────────────────────────────── */}
          <div ref={oauthRef} className="mt-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px" style={{ background: "rgba(255,80,20,0.2)" }} />
              <span
                className="text-xs tracking-widest uppercase px-2"
                style={{ color: "rgba(255,120,60,0.4)", fontFamily: "'Courier New', monospace" }}
              >
                ACCESO ALTERNATIVO
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,80,20,0.2)" }} />
            </div>

            {/* OAuth Buttons */}
            <div className="flex items-center justify-center gap-4">
              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleRegister}
                disabled={!!state.isOAuthLoading}
                className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,80,20,0.2)",
                  opacity: state.isOAuthLoading === "github" ? 0.4 : 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,120,50,0.5)";
                  e.currentTarget.style.background = "rgba(255,80,20,0.1)";
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(255,80,20,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,80,20,0.2)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                title="Registrarse con Google"
              >
                {state.isOAuthLoading === "google" ? (
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                ) : (
                  <GoogleIcon />
                )}
              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={handleGitHubRegister}
                disabled={!!state.isOAuthLoading}
                className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,80,20,0.2)",
                  color: "rgba(255,255,255,0.8)",
                  opacity: state.isOAuthLoading === "google" ? 0.4 : 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,120,50,0.5)";
                  e.currentTarget.style.background = "rgba(255,80,20,0.1)";
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(255,80,20,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,80,20,0.2)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                title="Registrarse con GitHub"
              >
                {state.isOAuthLoading === "github" ? (
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                ) : (
                  <GitHubIcon />
                )}
              </button>
            </div>

            {/* Link de login */}
            <p
              className="text-center mt-5 text-xs tracking-wider"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Courier New', monospace" }}
            >
              ¿YA TIENES ACCESO?{" "}
              <a
                href="/login"
                className="transition-colors duration-200"
                style={{ color: "rgba(255,120,50,0.8)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6020")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,120,50,0.8)")}
              >
                INICIAR VIAJE
              </a>
            </p>
          </div>
        </div>

        {/* Línea inferior decorativa */}
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(180,50,10,0.4), transparent)" }}
        />
      </div>

      {/* ── CSS keyframes ─────────────────────────────────────── */}
      <style jsx global>{`
        @keyframes btn-shine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        input::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 50px rgba(18, 5, 5, 0.95) inset;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.85);
        }
      `}</style>
    </div>
  );
}