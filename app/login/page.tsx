// view/LoginView.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLoginController } from "@/controllers/auth/login";

// ── SVG Icons ────────────────────────────────────────────────────────────────

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
}

function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    </svg>
  );
}

function IconGoogle() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
    </svg>
  );
}

// ── Main View ─────────────────────────────────────────────────────────────────

export default function LoginView() {
  const {
    formState,
    setField,
    handleSubmit,
    handleGoogleLogin,
    handleGithubLogin,
    handleForgotPassword,
    handleRegister,
  } = useLoginController();

  // Refs for GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background ambient orbs pulse
      gsap.to(".orb-1", {
        scale: 1.15,
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".orb-2", {
        scale: 1.2,
        opacity: 0.4,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });

      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: -20, letterSpacing: "0.3em" },
          { opacity: 1, y: 0, letterSpacing: "0.05em", duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".form-field",
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, stagger: 0.12, duration: 0.5 },
          "-=0.2"
        )
        .fromTo(
          ".form-extras",
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.1"
        )
        .fromTo(
          ".submit-btn",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.5 },
          "-=0.1"
        )
        .fromTo(
          ".divider-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, transformOrigin: "center" },
          "-=0.1"
        )
        .fromTo(
          ".social-btn",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 },
          "-=0.2"
        )
        .fromTo(
          footerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.1"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Button hover ripple
  function handleButtonHover(e: React.MouseEvent<HTMLButtonElement>) {
    gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2, ease: "power2.out" });
  }
  function handleButtonLeave(e: React.MouseEvent<HTMLButtonElement>) {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out" });
  }

  // Input focus glow
  function handleInputFocus(e: React.FocusEvent<HTMLInputElement>) {
    gsap.to(e.currentTarget.parentElement, {
      boxShadow: "0 0 0 1px rgba(255,100,50,0.5)",
      duration: 0.25,
    });
  }
  function handleInputBlur(e: React.FocusEvent<HTMLInputElement>) {
    gsap.to(e.currentTarget.parentElement, {
      boxShadow: "0 0 0 0px rgba(255,100,50,0)",
      duration: 0.25,
    });
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d0608 0%, #1a0810 40%, #120508 100%)" }}
    >
      {/* Ambient background orbs */}
      <div
        className="orb-1 absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: "-10%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(180,30,30,0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="orb-2 absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          bottom: "-5%",
          right: "-5%",
          background: "radial-gradient(circle, rgba(200,60,20,0.2) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-sm mx-4 rounded-2xl px-8 py-10"
        style={{
          background: "rgba(18, 8, 12, 0.92)",
          border: "1px solid rgba(180,60,40,0.25)",
          boxShadow: "0 8px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Title */}
        <div className="text-center mb-8">
          <h1
            ref={titleRef}
            className="text-3xl font-black tracking-widest mb-2"
            style={{
              fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
              background: "linear-gradient(90deg, #ff6b35, #f7c59f, #ff8c42)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            INICIAR VIAJE
          </h1>
          <p
            ref={subtitleRef}
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "rgba(255,120,70,0.6)" }}
          >
            ✦ acceso autorizado ✦
          </p>
        </div>

        {/* Error */}
        {formState.error && (
          <div
            className="mb-4 px-4 py-2 rounded-lg text-xs text-center"
            style={{
              background: "rgba(220,40,40,0.15)",
              border: "1px solid rgba(220,40,40,0.35)",
              color: "#ff6b6b",
            }}
          >
            {formState.error}
          </div>
        )}

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="form-field">
            <label
              className="block text-xs font-semibold tracking-[0.2em] uppercase mb-2"
              style={{ color: "rgba(255,120,70,0.7)", fontFamily: "'Rajdhani', sans-serif" }}
            >
              <span className="inline-flex items-center gap-2">
                <IconUser />
                identificador_biométrico
              </span>
            </label>
            <div
              className="flex items-center rounded-lg px-3 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(180,60,40,0.3)",
                borderBottom: "2px solid rgba(255,100,50,0.6)",
              }}
            >
              <input
                type="email"
                autoComplete="email"
                placeholder="operador@sistema.io"
                value={formState.email}
                onChange={(e) => setField("email", e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="flex-1 bg-transparent py-3 text-sm outline-none placeholder-opacity-30"
                style={{
                  color: "#e8d5c8",
                  fontFamily: "'Rajdhani', 'Courier New', monospace",
                  caretColor: "#ff6b35",
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-field">
            <label
              className="block text-xs font-semibold tracking-[0.2em] uppercase mb-2"
              style={{ color: "rgba(255,120,70,0.7)", fontFamily: "'Rajdhani', sans-serif" }}
            >
              <span className="inline-flex items-center gap-2">
                <IconLock />
                clave_criptográfica
              </span>
            </label>
            <div
              className="flex items-center rounded-lg px-3 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(180,60,40,0.3)",
                borderBottom: "2px solid rgba(255,100,50,0.6)",
              }}
            >
              <input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••••"
                value={formState.password}
                onChange={(e) => setField("password", e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="flex-1 bg-transparent py-3 text-sm outline-none"
                style={{
                  color: "#e8d5c8",
                  fontFamily: "'Rajdhani', 'Courier New', monospace",
                  caretColor: "#ff6b35",
                }}
              />
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="form-extras flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formState.rememberSession}
                  onChange={(e) => setField("rememberSession", e.target.checked)}
                  className="sr-only"
                />
                <div
                  className="w-4 h-4 rounded-sm flex items-center justify-center transition-all duration-200"
                  style={{
                    background: formState.rememberSession
                      ? "linear-gradient(135deg, #ff6b35, #f7931e)"
                      : "rgba(255,255,255,0.06)",
                    border: formState.rememberSession
                      ? "1px solid #ff6b35"
                      : "1px solid rgba(255,100,50,0.4)",
                  }}
                >
                  {formState.rememberSession && (
                    <svg viewBox="0 0 10 10" className="w-3 h-3" fill="white">
                      <path d="M1.5 5l2.5 2.5L8.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                    </svg>
                  )}
                </div>
              </div>
              <span
                className="text-xs tracking-wider uppercase"
                style={{ color: "rgba(200,150,120,0.7)", fontFamily: "'Rajdhani', sans-serif" }}
              >
                mantener sesión
              </span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs tracking-wider uppercase transition-colors duration-200"
              style={{
                color: "rgba(200,150,120,0.6)",
                fontFamily: "'Rajdhani', sans-serif",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,120,70,1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(200,150,120,0.6)")
              }
            >
              ¿Olvidaste la clave?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formState.isLoading}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            className="submit-btn w-full py-3.5 rounded-xl font-black text-sm tracking-[0.3em] uppercase mt-2 transition-opacity duration-200 disabled:opacity-60"
            style={{
              background: formState.isLoading
                ? "rgba(180,60,30,0.5)"
                : "linear-gradient(135deg, #ff4e50 0%, #f7931e 50%, #ff6b35 100%)",
              color: "#fff",
              fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
              boxShadow: "0 4px 20px rgba(255,100,50,0.4), 0 1px 0 rgba(255,255,255,0.1) inset",
              letterSpacing: "0.2em",
              border: "none",
              cursor: formState.isLoading ? "not-allowed" : "pointer",
            }}
          >
            {formState.isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                Accediendo...
              </span>
            ) : (
              "Acceder al Sistema"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div
            className="divider-line flex-1 h-px"
            style={{ background: "rgba(255,100,50,0.2)" }}
          />
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "rgba(200,130,100,0.5)", fontFamily: "'Rajdhani', sans-serif" }}
          >
            acceso alternativo
          </span>
          <div
            className="divider-line flex-1 h-px"
            style={{ background: "rgba(255,100,50,0.2)" }}
          />
        </div>

        {/* Social buttons */}
        <div ref={socialRef} className="flex justify-center gap-4">
          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={formState.isLoading}
            className="social-btn w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-50"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,100,50,0.25)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 });
              e.currentTarget.style.borderColor = "rgba(66,133,244,0.7)";
              e.currentTarget.style.background = "rgba(66,133,244,0.1)";
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
              e.currentTarget.style.borderColor = "rgba(255,100,50,0.25)";
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
            title="Continuar con Google"
          >
            <IconGoogle />
          </button>

          {/* GitHub */}
          <button
            onClick={handleGithubLogin}
            disabled={formState.isLoading}
            className="social-btn w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-50"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,100,50,0.25)",
              color: "#e8d5c8",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 });
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
              e.currentTarget.style.borderColor = "rgba(255,100,50,0.25)";
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
            title="Continuar con GitHub"
          >
            <IconGithub />
          </button>
        </div>

        {/* Register link */}
        <p
          ref={footerRef}
          className="text-center text-xs mt-6 tracking-wider"
          style={{ color: "rgba(200,150,120,0.5)", fontFamily: "'Rajdhani', sans-serif" }}
        >
          ¿No tienes acceso?{" "}
          <button
            onClick={handleRegister}
            style={{
              color: "rgba(255,120,70,0.9)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6b35")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,120,70,0.9)")}
          >
            Registrar nuevo operador
          </button>
        </p>
      </div>
    </div>
  );
}