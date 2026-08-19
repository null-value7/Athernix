"use client";

import { useEffect, useRef, type RefObject } from "react";
import { journeyStore } from "@/controllers/journeyStore";
import { lenisInstance } from "@/controllers/lenisInstance";
import { SECTION_BOUNDARIES, SECTION_LABELS, SECTION_ACCENTS } from "@/models/vr-viewer.model";
import { cn } from "@/lib/utils";

export default function ScrollProgress({
  triggerRef,
  activeSection,
}: {
  triggerRef: RefObject<HTMLDivElement | null>;
  activeSection: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return journeyStore.subscribe((p) => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    });
  }, []);

  const goTo = (index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const total = trigger.offsetHeight - window.innerHeight;
    const target = total * SECTION_BOUNDARIES[index];
    const lenis = lenisInstance.get();
    if (lenis) lenis.scrollTo(target, { duration: 1.3 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-white/5">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-gradient-to-r from-brand-red via-brand-orange to-brand-gold"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-3 sm:right-6 md:flex">
        {SECTION_LABELS.map((label, i) => {
          const accent = SECTION_ACCENTS[i];
          const isActive = activeSection === i;
          return (
            <button
              key={label}
              onClick={() => goTo(i)}
              className="group flex items-center gap-2"
              aria-label={label}
              data-cursor-hover
            >
              <span
                className={cn(
                  "font-mono-label text-[9px] uppercase tracking-widest text-white/0 transition-all group-hover:text-white/70",
                  isActive && "text-white/80"
                )}
              >
                {label}
              </span>
              <span
                className="relative h-1.5 w-1.5 rounded-full border transition-all duration-300 group-hover:scale-125"
                style={{
                  borderColor: isActive ? accent : "rgba(255,255,255,0.4)",
                  background: isActive ? accent : "transparent",
                  boxShadow: isActive ? `0 0 12px ${accent}` : "none",
                  transform: isActive ? "scale(1.4)" : undefined,
                }}
              />
            </button>
          );
        })}
      </div>
    </>
  );
}
