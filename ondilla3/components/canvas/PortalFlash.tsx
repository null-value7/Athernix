"use client";

import { useEffect, useRef } from "react";
import { journeyStore } from "@/controllers/journeyStore";
import { PORTAL_FLASH_RANGE } from "@/models/vr-viewer.model";

/**
 * Capa DOM (no WebGL) que destella al cruzar el lente, ocultando el
 * "corte" de escena. Incluye un warp cónico giratorio para dar sensación
 * de túnel/hipervelocidad durante la transición.
 */
export default function PortalFlash() {
  const flashRef = useRef<HTMLDivElement>(null);
  const warpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const [start, peak, end] = PORTAL_FLASH_RANGE;
    return journeyStore.subscribe((t) => {
      const flash = flashRef.current;
      const warp = warpRef.current;
      let opacity = 0;
      if (t >= start && t <= peak) opacity = (t - start) / (peak - start);
      else if (t > peak && t <= end) opacity = 1 - (t - peak) / (end - peak);
      const clamped = Math.max(0, Math.min(1, opacity));
      if (flash) flash.style.opacity = String(clamped);
      if (warp) warp.style.opacity = String(clamped * 0.85);
    });
  }, []);

  return (
    <>
      <div ref={warpRef} className="portal-warp pointer-events-none fixed inset-0 z-[39] opacity-0" />
      <div
        ref={flashRef}
        className="pointer-events-none fixed inset-0 z-40 opacity-0"
        style={{
          background:
            "radial-gradient(circle at 38% 48%, #ffffff 0%, #ffd700 30%, #ff2b3a 66%, #0a0203 100%)",
        }}
      />
    </>
  );
}
