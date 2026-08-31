"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useNavbarController } from "@/controllers/navBar/navbarController";
import {
  type NavUser,
  NAV_MODULES,
  USER_MENU_ITEMS,
  getRoleLabel,
  getRoleColor,
} from "@/models/navbarModel";

// ── Design tokens (estética módulos) ────────────────────────
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif"
const F_MONO = "'Plus Jakarta Sans', monospace"

// ── Iconos ────────────────────────────────────────────────────
const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="10" height="10" viewBox="0 0 10 10" fill="none"
    className="transition-transform duration-200"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.5 }}
  >
    <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SignOutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const BurgerIcon = ({ open }: { open: boolean }) => (
  <div className="flex flex-col justify-center gap-[4px] w-5">
    <span className="block h-[1.5px] rounded-full bg-white/50 transition-all duration-300 origin-center"
      style={{ transform: open ? "rotate(45deg) translate(3px, 3px)" : "none" }} />
    <span className="block h-[1.5px] rounded-full bg-white/50 transition-all duration-300"
      style={{ opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "none" }} />
    <span className="block h-[1.5px] rounded-full bg-white/50 transition-all duration-300 origin-center"
      style={{ transform: open ? "rotate(-45deg) translate(3px, -3px)" : "none" }} />
  </div>
);

// ── Avatar ────────────────────────────────────────────────────
function Avatar({
  avatarUrl, initials, roleColor, size = "md",
}: {
  avatarUrl?: string | null;
  initials: string;
  roleColor: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims = { sm: "w-8 h-8 text-xs", md: "w-9 h-9 text-xs", lg: "w-12 h-12 text-sm" };

  return (
    <div className={`relative flex-shrink-0 ${dims[size]}`}>
      <div
        className={`${dims[size]} rounded-full flex items-center justify-center font-bold overflow-hidden`}
        style={{
          background: avatarUrl ? "transparent" : `linear-gradient(135deg, ${roleColor}33, ${roleColor}66)`,
          border: `1.5px solid ${roleColor}55`,
          boxShadow: `0 0 12px ${roleColor}22`,
          fontFamily: "'Courier New', monospace",
          color: roleColor,
        }}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover rounded-full" />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {/* Indicador online */}
      <span
        className="absolute bottom-0 right-0 w-2 h-2 rounded-full border-2"
        style={{
          background: "#00e676",
          borderColor: "#0a0404",
          boxShadow: "0 0 6px rgba(0,230,118,0.6)",
        }}
      />
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────
interface NavBarProps {
  user: NavUser;
}

export default function NavBar({ user }: NavBarProps) {
  const {
    scrolled, modOpen, userOpen, mobileOpen, isSigningOut,
    dropModRef, dropUserRef,
    isActive, initials,
    toggleMod, toggleUser, toggleMobile, closeAll,
    handleSignOut,
  } = useNavbarController(user);

  const navRef = useRef<HTMLElement>(null);
  const roleColor = getRoleColor(user.role);

  // ── Animación de entrada ──────────────────────────────────
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        :root {
          --pink: #FF006E;
          --orange: #FF6B00;
          --yellow: #FFD700;
        }
      `}</style>

      {/* ── NAV PRINCIPAL ──────────────────────────────────── */}
      <nav
        ref={navRef}
        role="navigation"
        aria-label="Navegación principal"
        className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex items-center justify-between gap-4 px-5 py-3 rounded-2xl transition-all duration-400"
        style={{
          width: "min(92%, 1100px)",
          fontFamily: F_MONO,
          background: scrolled
            ? "rgba(8, 2, 2, 0.9)"
            : "rgba(8, 2, 2, 0.5)",
          backdropFilter: "blur(48px) saturate(180%)",
          WebkitBackdropFilter: "blur(48px) saturate(180%)",
          border: scrolled
            ? "2px solid rgba(255, 107, 53, 0.3)"
            : "2px solid rgba(255, 107, 53, 0.15)",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(255,107,53,0.15)"
            : "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* ── LOGO ──────────────────────────────────────────── */}
        <Link
          href="/home"
          onClick={closeAll}
          className="flex-shrink-0 text-xl font-black tracking-[0.15em] select-none"
          style={{
            fontFamily: F_BE,
            background: "linear-gradient(90deg, var(--pink), var(--orange), var(--yellow))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none",
          }}
        >
          ATHERNIX
        </Link>

        {/* ── LINKS CENTRO (desktop) ─────────────────────── */}
        <ul className="hidden md:flex items-center gap-2 list-none">

          {/* Home */}
          <li>
            <Link
              href="/home"
              onClick={closeAll}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs tracking-[0.15em] transition-all duration-200 font-bold"
              style={{
                color: isActive("/home") ? "var(--orange)" : "rgba(255,255,255,0.5)",
                background: isActive("/home") ? "rgba(255,107,53,0.15)" : "transparent",
                border: isActive("/home") ? "1px solid rgba(255,107,53,0.3)" : "1px solid transparent",
              }}
              onMouseEnter={e => !isActive("/home") && (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
              onMouseLeave={e => !isActive("/home") && (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: isActive("/home") ? "var(--orange)" : roleColor }} />
              HOME
            </Link>
          </li>

          {/* Módulos dropdown */}
          <li className="relative">
            <div ref={dropModRef} className="relative">
              <button
                onClick={toggleMod}
                aria-expanded={modOpen}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs tracking-[0.15em] transition-all duration-200 cursor-pointer font-bold"
                style={{
                  color: modOpen || NAV_MODULES.some(m => isActive(m.href))
                    ? "var(--orange)"
                    : "rgba(255,255,255,0.5)",
                  background: modOpen ? "rgba(255,107,53,0.15)" : "transparent",
                  border: modOpen ? "1px solid rgba(255,107,53,0.3)" : "1px solid transparent",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                onMouseLeave={e => {
                  if (!modOpen && !NAV_MODULES.some(m => isActive(m.href))) {
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  }
                }}
              >
                MÓDULOS
                <ChevronIcon open={modOpen} />
              </button>

              {/* Dropdown módulos */}
              <div
                className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 rounded-2xl p-3 min-w-[280px] transition-all duration-200"
                style={{
                  background: "rgba(6, 1, 1, 0.95)",
                  backdropFilter: "blur(60px)",
                  border: "2px solid rgba(255,107,53,0.2)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)",
                  opacity: modOpen ? 1 : 0,
                  pointerEvents: modOpen ? "all" : "none",
                  transform: `translateX(-50%) translateY(${modOpen ? "0" : "-8px"})`,
                }}
              >
                <p className="px-3 py-2 text-xs tracking-[0.3em] uppercase font-bold" style={{ color: "rgba(255,107,53,0.6)", fontFamily: F_MONO }}>
                  PLATAFORMA_XR · {NAV_MODULES.length} MÓDULOS
                </p>

                {NAV_MODULES.map((mod) => (
                  <Link
                    key={mod.href}
                    href={mod.href}
                    onClick={closeAll}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 group"
                    style={{
                      color: isActive(mod.href) ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                      background: isActive(mod.href) ? `${mod.color}15` : "transparent",
                      border: isActive(mod.href) ? `1px solid ${mod.color}40` : "1px solid transparent",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                      e.currentTarget.style.background = `${mod.color}12`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = isActive(mod.href) ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)";
                      e.currentTarget.style.background = isActive(mod.href) ? `${mod.color}15` : "transparent";
                    }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: mod.color, boxShadow: `0 0 10px ${mod.color}` }}
                    />
                    <span className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span className="text-xs tracking-[0.15em] font-bold" style={{ fontFamily: F_MONO }}>{mod.label}</span>
                      <span className="text-[10px] tracking-[0.1em] text-white/30 truncate" style={{ fontFamily: F_MONO }}>{mod.desc}</span>
                    </span>
                    <span className="text-[10px] tracking-[0.15em] flex-shrink-0 opacity-70 font-bold" style={{ color: mod.color, fontFamily: F_MONO }}>
                      {mod.tag}
                    </span>
                  </Link>
                ))}

                <div className="border-t border-white/[0.08] mt-2 pt-2 px-1">
                  <Link
                    href="/modulos"
                    onClick={closeAll}
                    className="block px-3 py-2 text-xs tracking-[0.2em] font-bold transition-colors"
                    style={{ color: "rgba(255,107,53,0.5)", fontFamily: F_MONO }}
                  >
                    VER TODOS LOS MÓDULOS →
                  </Link>
                </div>
              </div>
            </div>
          </li>

          {/* Headsets */}
          <li>
            <Link
              href="/headsets"
              onClick={closeAll}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs tracking-[0.15em] transition-all duration-200 font-bold"
              style={{
                color: isActive("/headsets") ? "var(--orange)" : "rgba(255,255,255,0.5)",
                background: isActive("/headsets") ? "rgba(255,107,53,0.15)" : "transparent",
                border: isActive("/headsets") ? "1px solid rgba(255,107,53,0.3)" : "1px solid transparent",
              }}
              onMouseEnter={e => !isActive("/headsets") && (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
              onMouseLeave={e => !isActive("/headsets") && (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: isActive("/headsets") ? "var(--orange)" : roleColor }} />
              HEADSETS
            </Link>
          </li>
        </ul>

        {/* ── LADO DERECHO ──────────────────────────────────── */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* ── Avatar + Dropdown usuario ─────────────────── */}
          <div className="relative" ref={dropUserRef}>
            <button
              onClick={toggleUser}
              aria-expanded={userOpen}
              aria-label="Menú de usuario"
              className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: userOpen ? "rgba(255,80,20,0.08)" : "rgba(255,255,255,0.04)",
                border: userOpen
                  ? `1px solid ${roleColor}44`
                  : "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = `1px solid ${roleColor}33`;
                e.currentTarget.style.background = "rgba(255,80,20,0.06)";
              }}
              onMouseLeave={e => {
                if (!userOpen) {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }
              }}
            >
              <Avatar avatarUrl={user.avatarUrl} initials={initials} roleColor={roleColor} size="sm" />

              {/* Info usuario (solo desktop) */}
              <span className="hidden md:flex flex-col items-start gap-0.5">
                <span className="text-xs font-bold text-white/80 tracking-[0.04em] leading-none" style={{ fontFamily: F_MONO }}>
                  {user.name.split(" ")[0]}
                </span>
                <span className="text-[10px] tracking-[0.18em] leading-none" style={{ color: roleColor + "aa", fontFamily: F_MONO }}>
                  {getRoleLabel(user.role)}
                </span>
              </span>

              <ChevronIcon open={userOpen} />
            </button>

            {/* ── Dropdown usuario ─────────────────────────── */}
            <div
              className="absolute top-[calc(100%+10px)] right-0 rounded-2xl p-3 w-72 transition-all duration-200"
              style={{
                background: "rgba(6, 1, 1, 0.95)",
                backdropFilter: "blur(60px)",
                border: "2px solid rgba(255,107,53,0.2)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)",
                opacity: userOpen ? 1 : 0,
                pointerEvents: userOpen ? "all" : "none",
                transform: `translateY(${userOpen ? "0" : "-6px"})`,
              }}
            >
              {/* Header perfil */}
              <div className="flex items-center gap-3 px-3 py-3">
                <Avatar avatarUrl={user.avatarUrl} initials={initials} roleColor={roleColor} size="lg" />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-bold text-white/80 truncate" style={{ fontFamily: F_MONO }}>
                    {user.name}
                  </span>
                  <span className="text-xs text-white/25 truncate tracking-wide" style={{ fontFamily: F_MONO }}>
                    {user.email}
                  </span>
                  <span
                    className="text-[10px] tracking-[0.2em] mt-0.5 px-2 py-0.5 rounded-full w-fit font-bold"
                    style={{
                      color: roleColor,
                      background: `${roleColor}18`,
                      border: `1px solid ${roleColor}30`,
                      fontFamily: F_MONO,
                    }}
                  >
                    {getRoleLabel(user.role)}
                  </span>
                </div>
              </div>

              <div className="h-px mx-2 mb-2" style={{ background: "rgba(255,255,255,0.08)" }} />

              {/* Items de menú */}
              {USER_MENU_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => closeAll()}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs tracking-[0.15em] transition-all duration-150 font-bold"
                  style={{ color: "rgba(255,255,255,0.4)", fontFamily: F_MONO }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                    e.currentTarget.style.background = "rgba(255,107,53,0.1)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span className="w-4 text-center opacity-50 text-sm">{item.icon}</span>
                  {item.label}
                </Link>
              ))}

              <div className="h-px mx-2 my-2" style={{ background: "rgba(255,255,255,0.08)" }} />

              {/* Cerrar sesión */}
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs tracking-[0.15em] transition-all duration-150 font-bold"
                style={{
                  color: isSigningOut ? "rgba(255,0,80,0.3)" : "rgba(255,0,80,0.6)",
                  fontFamily: F_MONO,
                  cursor: isSigningOut ? "not-allowed" : "pointer",
                  background: "transparent",
                  border: "none",
                }}
                onMouseEnter={e => {
                  if (!isSigningOut) {
                    e.currentTarget.style.color = "#ff3060";
                    e.currentTarget.style.background = "rgba(255,0,80,0.1)";
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = isSigningOut ? "rgba(255,0,80,0.3)" : "rgba(255,0,80,0.6)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <SignOutIcon />
                {isSigningOut ? "SALIENDO..." : "CERRAR_SESIÓN"}
              </button>
            </div>
          </div>

          {/* ── Burger (mobile) ───────────────────────────── */}
          <button
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
            style={{
              background: mobileOpen ? "rgba(255,107,53,0.15)" : "rgba(255,255,255,0.05)",
              border: mobileOpen ? "2px solid rgba(255,107,53,0.3)" : "2px solid rgba(255,255,255,0.1)",
            }}
          >
            <BurgerIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* ── MENÚ MÓVIL ────────────────────────────────────── */}
      <div
        className="fixed top-0 right-0 h-dvh w-[320px] max-w-[90vw] z-[9998] overflow-y-auto transition-transform duration-400"
        style={{
          background: "rgba(5, 1, 1, 0.97)",
          backdropFilter: "blur(60px)",
          borderLeft: "2px solid rgba(255,107,53,0.2)",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        }}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col gap-1 pt-24 pb-10 px-5">

          {/* Perfil en móvil */}
          <div
            className="flex items-center gap-3 p-4 rounded-2xl mb-4"
            style={{
              background: `${roleColor}12`,
              border: `2px solid ${roleColor}30`,
            }}
          >
            <Avatar avatarUrl={user.avatarUrl} initials={initials} roleColor={roleColor} size="md" />
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-sm font-bold text-white/75 truncate" style={{ fontFamily: F_MONO }}>
                {user.name}
              </span>
              <span className="text-xs tracking-[0.2em]" style={{ color: roleColor + "90", fontFamily: F_MONO }}>
                {getRoleLabel(user.role)}
              </span>
            </div>
          </div>

          {/* Links */}
          {[
            { href: "/home", label: "HOME", icon: "⬡" },
            ...NAV_MODULES.map(m => ({ href: m.href, label: m.label, icon: "▸" })),
            { href: "/headsets", label: "HEADSETS", icon: "⬢" },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeAll}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs tracking-[0.15em] transition-all duration-150 font-bold"
              style={{
                color: isActive(item.href) ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
                background: isActive(item.href) ? "rgba(255,107,53,0.15)" : "transparent",
                border: isActive(item.href) ? "1px solid rgba(255,107,53,0.3)" : "1px solid transparent",
                fontFamily: F_MONO,
              }}
            >
              <span className="opacity-50">{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div className="h-px my-3" style={{ background: "rgba(255,255,255,0.08)" }} />

          {/* Perfil y config */}
          {USER_MENU_ITEMS.filter(i => i.href !== "/home").map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeAll}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs tracking-[0.15em] text-white/40 transition-all duration-150 hover:text-white/80 hover:bg-orange-500/5 font-bold"
              style={{ fontFamily: F_MONO }}
            >
              <span className="opacity-40">{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div className="h-px my-3" style={{ background: "rgba(255,255,255,0.08)" }} />

          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs tracking-[0.15em] transition-all duration-150 w-full text-left font-bold"
            style={{
              color: "rgba(255,0,80,0.6)",
              fontFamily: F_MONO,
              background: "transparent",
              border: "none",
              cursor: isSigningOut ? "not-allowed" : "pointer",
            }}
          >
            <SignOutIcon />
            {isSigningOut ? "SALIENDO..." : "CERRAR_SESIÓN"}
          </button>
        </div>
      </div>

      {/* Overlay móvil */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[9997] cursor-pointer"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={closeAll}
          aria-hidden="true"
        />
      )}
    </>
  );
}