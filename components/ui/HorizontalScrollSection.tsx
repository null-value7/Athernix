// components/ui/HorizontalScrollSection.tsx — Award-winning pinned horizontal scroll
'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollSectionProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** how much vertical scroll height to scrub through */
  scrollMultiplier?: number;
}

export default function HorizontalScrollSection({
  children,
  className = '',
  style,
  scrollMultiplier = 3,
}: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth - window.innerWidth;

    // Stagger cards entrance
    const cards = track.querySelectorAll('.hs-card');
    gsap.set(cards, { opacity: 0, y: 60, rotateY: 8, transformPerspective: 1200 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * scrollMultiplier}`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      },
    });

    // Horizontal scroll
    tl.to(track, {
      x: -totalWidth,
      ease: 'none',
    });

    // Cards reveal as they come into view
    cards.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          containerAnimation: tl,
          start: 'left 90%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Update progress bar
    gsap.to('.hs-progress', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * scrollMultiplier}`,
        scrub: 1.2,
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger && track.contains(t.trigger as Element)) t.kill();
      });
    };
  }, [scrollMultiplier]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}
      style={{ height: '100vh', ...style }}>
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-px z-20"
        style={{ background: 'rgba(255,107,0,0.12)' }}>
        <div className="hs-progress h-full"
          style={{ width: '0%', background: 'linear-gradient(90deg, #FF006E, #FF6B00, #FFD700)', 
            boxShadow: '0 0 16px rgba(255,107,0,0.6)', transition: 'width 0.1s linear' }} />
      </div>

      <div ref={trackRef}
        className="flex items-center gap-8 h-full px-8"
        style={{ width: 'max-content', willChange: 'transform', transform: 'translateX(0)' }}>
        {children}
      </div>
    </div>
  );
}

export { HorizontalScrollSection };
