"use client";

// ═══════════════════════════════════════════
// CONTROLLER — Orquesta el scroll suave (Lenis) + GSAP ScrollTrigger
// y publica el progreso global (0–1) en journeyStore. También
// deriva la sección narrativa activa (para los textos superpuestos)
// a partir del mismo progreso, para que todo quede perfectamente
// sincronizado.
// ═══════════════════════════════════════════

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { journeyStore } from "./journeyStore";
import { lenisInstance } from "./lenisInstance";
import { sectionIndexForProgress } from "@/models/vr-viewer.model";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollJourney() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: prefersReduced ? 0.35 : 1.15,
      smoothWheel: true,
      syncTouch: true,
    });

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);
    lenisInstance.set(lenis);

    const prevIndexRef = { current: 0 };
    const mainTrigger = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        journeyStore.set(self.progress);
        const idx = sectionIndexForProgress(self.progress);
        if (idx !== prevIndexRef.current) {
          prevIndexRef.current = idx;
          setActiveSection(idx);
        }
      },
    });

    setReady(true);

    return () => {
      mainTrigger.kill();
      gsap.ticker.remove(tickerFn);
      lenisInstance.set(null);
      lenis.destroy();
    };
  }, []);

  return { triggerRef, activeSection, ready };
}
