"use client";

// ═══════════════════════════════════════════
// VIEW — Página de inicio: el recorrido completo dentro del visor VR.
// Combina el canvas 3D fijo, el flash de transición, los textos
// superpuestos y la barra/puntos de progreso, todo sincronizado por
// el controlador useScrollJourney.
// ═══════════════════════════════════════════

import { useCallback } from "react";
import Link from "next/link";
import JourneyCanvas from "@/components/canvas/JourneyCanvas";
import PortalFlash from "@/components/canvas/PortalFlash";
import JourneyOverlay from "@/components/canvas/JourneyOverlay";
import ScrollProgress from "@/components/layout/ScrollProgress";
import { useScrollJourney } from "@/controllers/useScrollJourney";
import { useReducedMotion } from "@/controllers/useReducedMotion";
import { lenisInstance } from "@/controllers/lenisInstance";
import { SECTION_BOUNDARIES } from "@/models/vr-viewer.model";

export default function HomeExperience() {
  const reducedMotion = useReducedMotion();
  const { triggerRef, activeSection } = useScrollJourney();

  const goTo = useCallback(
    (index: number) => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const total = trigger.offsetHeight - window.innerHeight;
      const target = total * SECTION_BOUNDARIES[index] + (index > 0 ? 2 : 0);
      const lenis = lenisInstance.get();
      if (lenis) lenis.scrollTo(target, { duration: 1.4 });
      else window.scrollTo({ top: target, behavior: "smooth" });
    },
    [triggerRef]
  );

  return (
    <div className="relative" id="recorrido">
      <div className="fixed inset-0 z-0">
        <JourneyCanvas reducedMotion={reducedMotion} />
      </div>

      <PortalFlash />
      <JourneyOverlay activeSection={activeSection} goTo={goTo} />
      <ScrollProgress triggerRef={triggerRef} activeSection={activeSection} />

      {/* Tab de regreso al selector — fijo en el borde izquierdo durante todo el journey */}
      <Link href="/explore" className="ond-back-tab fire-border" aria-label="Regresar al selector" data-cursor-hover>
        <span className="ond-back-arrow">◄</span>
        <span className="ond-back-text">REGRESAR · SELECTOR</span>
      </Link>

      <div ref={triggerRef} style={{ height: "750vh" }} aria-hidden />
    </div>
  );
}
