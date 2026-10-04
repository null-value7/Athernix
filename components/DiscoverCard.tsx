"use client";

import { useCallback, useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

type Props = {
  align: string;
  children: ReactNode;
};

export default function DiscoverCard({ align, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const innerRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
    // El tilt va al inner: GSAP sigue animando `transform` del bloque exterior
    inner.style.transform = `perspective(1100px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg) translateZ(14px)`;
  }, []);

  const onLeave = useCallback(() => {
    if (innerRef.current) innerRef.current.style.transform = "";
  }, []);

  return (
    <div
      ref={ref}
      className={`discover-content-block ${align}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div ref={innerRef} className="discover-card-inner">
        {children}
      </div>
    </div>
  );
}
