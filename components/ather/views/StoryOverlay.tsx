"use client";

import { useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useRouter } from "next/navigation";
import { SHOTS, smoothstep } from "@/components/ather/models/scenes";
import type { ScrollRefs } from "@/components/ather/views/Experience";
import { protectBrands } from '@/components/ui/ProtectedText';
import { useAuth } from "@/lib/supabase/useAuth";

const SHOT_PROGRESS = [0, 0.36, 0.62, 0.8, 1];

export function StoryOverlay({ progressRef, scrollElRef }: ScrollRefs) {
  const router = useRouter();
  const { user } = useAuth();
  const bar = useRef<HTMLDivElement>(null);
  const chapters = useRef<HTMLElement[]>([]);
  const statsRows = useRef<HTMLElement[]>([]);
  const hint = useRef<HTMLParagraphElement>(null);
  const dots = useRef<HTMLButtonElement[]>([]);
  const activeNumber = useRef<HTMLSpanElement>(null);
  const activeLabel = useRef<HTMLSpanElement>(null);
  const cta = useRef<HTMLButtonElement>(null);
  const previousShot = useRef(-1);

  const jumpTo = (target: number) => {
    const el = scrollElRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    el.scrollTo({ top: max * target, behavior: "smooth" });
  };

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const p = progressRef.current;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      if (hint.current) hint.current.style.opacity = `${Math.max(0, 1 - p * 6)}`;

      const weights = [
        1 - smoothstep(0.16, 0.3, p),
        Math.min(smoothstep(0.28, 0.38, p), 1 - smoothstep(0.46, 0.58, p)),
        Math.min(smoothstep(0.54, 0.62, p), 1 - smoothstep(0.68, 0.76, p)),
        Math.min(smoothstep(0.74, 0.8, p), 1 - smoothstep(0.82, 0.9, p)),
        smoothstep(0.86, 0.94, p),
      ];
      chapters.current.forEach((el, i) => {
        if (!el) return;
        const w = weights[i] ?? 0;
        el.style.opacity = `${w}`;
        el.style.transform = `translate3d(0, ${(1 - w) * 36}px, 0)`;
        // Counter-translate the stat chips: they fade in place with the
        // chapter but never float upward with it.
        const stats = statsRows.current[i];
        if (stats) stats.style.transform = `translate3d(0, ${(1 - w) * -36}px, 0)`;
      });
      dots.current.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle("is-active", (weights[i] ?? 0) > 0.55);
      });

      const shot = weights.reduce((best, weight, index) => (weight > weights[best] ? index : best), 0);
      if (shot !== previousShot.current) {
        previousShot.current = shot;
        if (activeNumber.current) activeNumber.current.textContent = String(shot + 1).padStart(2, "0");
        if (activeLabel.current) activeLabel.current.textContent = SHOTS[shot].kicker;
        cta.current?.classList.toggle("is-live", shot === SHOTS.length - 1);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [progressRef]);

  /** Magnetic tilt: the button leans toward the cursor and lifts on hover. */
  const ctaMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.transform = `perspective(700px) translate(${px * 14}px, ${py * 10}px) rotateX(${-py * 14}deg) rotateY(${px * 16}deg) scale(1.06)`;
  };

  const ctaLeave = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <div className="story">
      <header className="topbar">
        <span className="brand notranslate" translate="no">Athernixito</span>
        <span className="brand-sub">guía vr / 05</span>
      </header>

      <div className="live-badge" aria-hidden="true">
        <span className="live-dot" /> escena viva
      </div>

      <aside className="scene-readout" aria-live="polite">
        <span ref={activeNumber} className="scene-number">
          01
        </span>
        <span className="scene-divider">/ 05</span>
        <span ref={activeLabel} className="scene-label">
          {SHOTS[0].kicker}
        </span>
      </aside>

      <div className="hero-watermark" aria-hidden="true">
        ather
      </div>

      <div className="progress-track">
        <div ref={bar} className="progress-bar" />
      </div>

      <p ref={hint} className="hint">
        <span>Desliza para dirigir</span>
        <i />
      </p>

      {SHOTS.map((shot, i) => (
        <section
          key={shot.id}
          data-shot={shot.id}
          className={`chapter chapter-${shot.id}`}
          ref={(el) => {
            if (el) chapters.current[i] = el;
          }}
        >
          <p className="kicker">{protectBrands(shot.label)}</p>
          <h1>{protectBrands(shot.title)}</h1>
          <p className="body">{protectBrands(shot.body)}</p>
          {shot.stats && (
            <ul
              className="stats"
              ref={(el) => {
                if (el) statsRows.current[i] = el;
              }}
            >
              {shot.stats.map((stat) => (
                <li key={stat} className="stat-chip">
                  {protectBrands(stat)}
                </li>
              ))}
            </ul>
          )}
          <span className="chapter-rule" aria-hidden="true" />
          {i === SHOTS.length - 1 && (
            <button
              ref={cta}
              type="button"
              className="cta"
              onClick={() => router.push(user ? "/chatbot" : "/register")}
              onMouseMove={ctaMove}
              onMouseLeave={ctaLeave}
            >
              <span className="cta-pill">
                <span className="notranslate" translate="no">
                  Hablar con Ather
                </span>
                <span className="cta-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </button>
          )}
        </section>
      ))}

      <nav className="dots" aria-label="Escenas">
        {SHOTS.map((shot, i) => (
          <button
            key={shot.id}
            type="button"
            className="dot"
            ref={(el) => {
              if (el) dots.current[i] = el;
            }}
            onClick={() => jumpTo(SHOT_PROGRESS[i])}
          >
            {shot.kicker}
          </button>
        ))}
      </nav>
    </div>
  );
}
