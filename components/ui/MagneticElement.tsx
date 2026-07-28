// components/ui/MagneticElement.tsx — Magnetic cursor-following hover effect
'use client';

import { useRef, useCallback, type ElementType, type ReactNode } from 'react';
import { gsap } from 'gsap';

interface MagneticElementProps {
  children: ReactNode;
  strength?: number;       // 0–1 multiplier for attraction strength
  radius?: number;         // px radius for magnetic field
  className?: string;
  style?: React.CSSProperties;
  as?: ElementType;
}

export default function MagneticElement({
  children,
  strength = 0.35,
  radius = 150,
  className = '',
  style,
  as: Tag = 'div',
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      const pull = (1 - dist / radius) * strength;
      gsap.to(ref.current, {
        x: dx * pull,
        y: dy * pull,
        duration: 0.4,
        ease: 'power3.out',
      });
    }
  }, [strength, radius]);

  const handleLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  const Component = Tag as any;

  return (
    <Component
      ref={ref}
      className={className}
      style={{ ...style, willChange: 'transform' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </Component>
  );
}

export { MagneticElement };
