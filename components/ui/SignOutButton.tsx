"use client";
// ============================================================
// VIEW — SignOutButton.tsx
// Botón reutilizable para cerrar sesión en navbar o dashboard
// ============================================================

import React from "react";
import { gsap } from "gsap";
import { useSignOut } from "@/controllers/auth/AuthController";

interface SignOutButtonProps {
  variant?: "full" | "icon"; // full = texto + icono, icon = solo icono
  className?: string;
}

const IconSignOut = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" strokeLinecap="round" />
    <polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" />
  </svg>
);

export default function SignOutButton({ variant = "full", className = "" }: SignOutButtonProps) {
  const { isLoading, handleSignOut } = useSignOut();

  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={btnRef}
      onClick={handleSignOut}
      disabled={isLoading}
      className={`flex items-center gap-2 transition-all duration-200 ${className}`}
      style={{
        color: "rgba(255,120,60,0.7)",
        fontFamily: "'Courier New', monospace",
        fontSize: "0.75rem",
        letterSpacing: "0.15em",
        background: "transparent",
        border: "1px solid rgba(255,80,20,0.2)",
        borderRadius: "0.5rem",
        padding: variant === "full" ? "0.5rem 1rem" : "0.5rem",
        cursor: isLoading ? "not-allowed" : "pointer",
        opacity: isLoading ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, { scale: 1.04, duration: 0.2 });
        e.currentTarget.style.color = "#ff6020";
        e.currentTarget.style.border = "1px solid rgba(255,80,20,0.5)";
        e.currentTarget.style.boxShadow = "0 0 12px rgba(255,80,20,0.2)";
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
        e.currentTarget.style.color = "rgba(255,120,60,0.7)";
        e.currentTarget.style.border = "1px solid rgba(255,80,20,0.2)";
        e.currentTarget.style.boxShadow = "none";
      }}
      title="Cerrar sesión"
    >
      {isLoading ? (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : (
        <IconSignOut />
      )}
      {variant === "full" && (
        <span className="uppercase tracking-widest">
          {isLoading ? "SALIENDO..." : "CERRAR SESIÓN"}
        </span>
      )}
    </button>
  );
}