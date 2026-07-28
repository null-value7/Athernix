'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

declare global {
  interface Window {
    Lenis?: new (options?: Record<string, unknown>) => {
      raf: (time: number) => void;
      on: (event: string, cb: () => void) => void;
      destroy: () => void;
    };
  }
}

interface AthernixScrollEngineProps {
  children: ReactNode;
  /** Show top gradient scroll progress bar */
  showProgress?: boolean;
  /** Show floating section counter HUD (01 / 07) */
  showSectionCounter?: boolean;
  /** Enable Lenis smooth scroll (uses CDN global) */
  enableLenis?: boolean;
}

export default function AthernixScrollEngine({
  children,
  showProgress = true,
  showSectionCounter = true,
  enableLenis = true,
}: AthernixScrollEngineProps) {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);

  // Skip auth pages to avoid loops
  if (pathname === '/login' || pathname === '/register' || pathname === '/about') {
    return <>{children}</>;
  }

  useEffect(() => {
    let lenis: InstanceType<NonNullable<typeof window.Lenis>> | null = null;
    let rafId: number | null = null;

    if (enableLenis && typeof window !== 'undefined' && window.Lenis) {
      lenis = new window.Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    const triggers: ScrollTrigger[] = [];

    if (showProgress && progressRef.current) {
      triggers.push(
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        })
      );
    }

    if (showSectionCounter) {
      const sections = document.querySelectorAll('main section, main [data-atx-section]');
      const total = Math.max(sections.length, 1);
      if (totalRef.current) {
        totalRef.current.textContent = String(total).padStart(2, '0');
      }

      sections.forEach((section, index) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(index + 1).padStart(2, '0');
              }
            },
            onEnterBack: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(index + 1).padStart(2, '0');
              }
            },
          })
        );
      });
    }

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      lenis?.destroy();
    };
  }, [enableLenis, showProgress, showSectionCounter]);

  return (
    <>
      {showProgress && (
        <div
          className="scroll-progress-track"
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            zIndex: 9999,
            background: 'rgba(255,255,255,0.035)',
            pointerEvents: 'none',
          }}
        >
          <div
            ref={progressRef}
            className="scroll-progress"
            style={{
              height: '100%',
              width: '0%',
              background: 'linear-gradient(90deg, rgba(255,0,110,0.9), rgba(255,107,0,0.95), rgba(0,217,255,0.75))',
              boxShadow: '0 0 10px rgba(255,0,110,0.28), 0 0 18px rgba(0,217,255,0.18)',
              transition: 'width 0.05s linear',
            }}
          />
        </div>
      )}

      {showSectionCounter && (
        <div
          className="atx-section-hud liquid-glass-subtle"
          aria-hidden="true"
          style={{
            position: 'fixed',
            bottom: 18,
            right: 18,
            zIndex: 9998,
            padding: '8px 12px',
            borderRadius: 10,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.5)',
            pointerEvents: 'none',
          }}
        >
          <span ref={counterRef} style={{ color: '#00D9FF', fontWeight: 700 }}>01</span>
          <span style={{ opacity: 0.35, margin: '0 6px' }}>/</span>
          <span ref={totalRef} style={{ opacity: 0.5 }}>01</span>
        </div>
      )}

      {children}
    </>
  );
}

export { AthernixScrollEngine };
