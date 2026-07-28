// components/ui/ParallaxLayer.tsx — Scroll-driven parallax depth
'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxLayerProps {
  children?: ReactNode;
  speed?: number;          // multiplier: 0.5 = half speed, 2 = double speed
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: { from: number; to: number };
  rotate?: { from: number; to: number };
  className?: string;
  style?: React.CSSProperties;
}

export default function ParallaxLayer({
  children,
  speed = 0.5,
  direction = 'up',
  scale,
  rotate,
  className = '',
  style,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const distance = speed * 200;
    const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
    const sign = direction === 'up' || direction === 'left' ? -1 : 1;

    const toVars: gsap.TweenVars = {
      [axis]: sign * distance,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    };

    if (scale) {
      toVars.scale = scale.to;
      gsap.set(ref.current, { scale: scale.from });
    }

    if (rotate) {
      toVars.rotate = rotate.to;
      gsap.set(ref.current, { rotate: rotate.from });
    }

    const tween = gsap.to(ref.current, toVars);

    return () => {
      tween.kill();
      tween.scrollTrigger?.kill();
    };
  }, [speed, direction, scale, rotate]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform', ...style }}>
      {children}
    </div>
  );
}

export { ParallaxLayer };
