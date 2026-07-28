"use client";
// ============================================================
// CONTROLLER — navbarController.ts
// Hook con toda la lógica de interacción de la navbar:
// scroll, dropdowns, mobile, signOut
// ============================================================

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/controllers/auth/AuthAction";
import type { NavUser } from "@/models/navbarModel";

export function useNavbarController(user: NavUser) {
  const pathname = usePathname();

  // ── Estado ───────────────────────────────────────────────
  const [scrolled,    setScrolled]    = useState(false);
  const [modOpen,     setModOpen]     = useState(false);
  const [userOpen,    setUserOpen]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [isSigningOut,setIsSigningOut] = useState(false);

  // ── Refs para cerrar dropdowns al click fuera ────────────
  const dropModRef  = useRef<HTMLDivElement>(null);
  const dropUserRef = useRef<HTMLDivElement>(null);

  // ── Scroll shrink ────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Cerrar dropdowns al clic fuera ───────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropModRef.current  && !dropModRef.current.contains(e.target as Node))  setModOpen(false);
      if (dropUserRef.current && !dropUserRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Cerrar todo al cambiar ruta ──────────────────────────
  useEffect(() => {
    setMobileOpen(false);
    setModOpen(false);
    setUserOpen(false);
  }, [pathname]);

  // ── Bloquear scroll del body en móvil ───────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // ── Helpers ──────────────────────────────────────────────
  const isActive = useCallback(
    (href: string) => pathname === href || pathname.startsWith(href + "/"),
    [pathname]
  );

  const toggleMod   = () => { setModOpen(v => !v); setUserOpen(false); };
  const toggleUser  = () => { setUserOpen(v => !v); setModOpen(false); };
  const toggleMobile = () => setMobileOpen(v => !v);
  const closeAll    = () => { setModOpen(false); setUserOpen(false); setMobileOpen(false); };

  // ── Iniciales para avatar fallback ───────────────────────
  const initials = user.name
    .split(" ")
    .map(w => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "OP";

  // ── Sign out ─────────────────────────────────────────────
  const handleSignOut = useCallback(async () => {
    setIsSigningOut(true);
    closeAll();
    await signOutAction();
  }, []);

  return {
    // state
    scrolled,
    modOpen,
    userOpen,
    mobileOpen,
    isSigningOut,
    // refs
    dropModRef,
    dropUserRef,
    // helpers
    isActive,
    initials,
    // handlers
    toggleMod,
    toggleUser,
    toggleMobile,
    closeAll,
    handleSignOut,
  };
}