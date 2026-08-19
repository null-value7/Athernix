"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, [data-cursor-hover], input, textarea, select";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    let x = 0;
    let y = 0;
    let pending = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!pending) {
        pending = true;
        requestAnimationFrame(() => {
          if (dotRef.current) {
            dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
          }
          if (ringRef.current) {
            ringRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
          }
          pending = false;
        });
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest(INTERACTIVE_SELECTOR);
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;
      if (isInteractive) {
        dot.style.width = "14px";
        dot.style.height = "14px";
        ring.style.width = "56px";
        ring.style.height = "56px";
        ring.style.opacity = "0.9";
        ring.style.borderColor = "var(--brand-gold)";
      } else {
        dot.style.width = "8px";
        dot.style.height = "8px";
        ring.style.width = "40px";
        ring.style.height = "40px";
        ring.style.opacity = "0.5";
        ring.style.borderColor = "var(--brand-red)";
      }
    };

    const onDown = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot) dot.style.background = "var(--brand-red)";
      if (ring) ring.style.width = ring.style.height = "26px";
    };
    const onUp = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot) dot.style.background = "var(--brand-gold)";
      if (ring) ring.style.width = ring.style.height = "40px";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
