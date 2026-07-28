// components/ui/ScrollReveal.tsx — Award-winning scroll-triggered reveal wrapper
'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealEffect =
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeIn'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleIn'
  | 'rotateIn'
  | 'clipReveal'
  | 'glowIn'
  | 'splitFade'
  | 'parallaxUp';

interface ScrollRevealProps {
  children: ReactNode;
  effect?: RevealEffect;
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: string | number;   // ScrollTrigger start, e.g. "top 85%", or legacy ratio
  scrub?: boolean | number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: ElementType;
}

const EFFECT_FROM: Record<RevealEffect, gsap.TweenVars> = {
  fadeUp:      { y: 80, opacity: 0 },
  fadeDown:    { y: -60, opacity: 0 },
  fadeIn:      { opacity: 0 },
  slideLeft:   { x: -120, opacity: 0 },
  slideRight:  { x: 120, opacity: 0 },
  scaleIn:     { scale: 0.85, opacity: 0 },
  rotateIn:    { rotateX: -25, y: 60, opacity: 0, transformPerspective: 1200 },
  clipReveal:  { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
  glowIn:      { opacity: 0, filter: 'blur(20px) brightness(2)' },
  splitFade:   { y: 40, opacity: 0, rotateY: 8, transformPerspective: 800 },
  parallaxUp:  { y: 150, opacity: 0 },
};

const EFFECT_TO: Record<RevealEffect, gsap.TweenVars> = {
  fadeUp:      { y: 0, opacity: 1, ease: 'power3.out' },
  fadeDown:    { y: 0, opacity: 1, ease: 'power3.out' },
  fadeIn:      { opacity: 1, ease: 'power2.out' },
  slideLeft:   { x: 0, opacity: 1, ease: 'power3.out' },
  slideRight:  { x: 0, opacity: 1, ease: 'power3.out' },
  scaleIn:     { scale: 1, opacity: 1, ease: 'back.out(1.4)' },
  rotateIn:    { rotateX: 0, y: 0, opacity: 1, ease: 'power3.out' },
  clipReveal:  { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, ease: 'power4.inOut' },
  glowIn:      { opacity: 1, filter: 'blur(0px) brightness(1)', ease: 'power2.out' },
  splitFade:   { y: 0, opacity: 1, rotateY: 0, ease: 'power3.out' },
  parallaxUp:  { y: 0, opacity: 1, ease: 'none' },
};

export default function ScrollReveal({
  children,
  effect = 'fadeUp',
  delay = 0,
  duration = 1.2,
  stagger = 0,
  threshold = 'top 88%',
  scrub = false,
  once = true,
  className = '',
  style,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const targets = stagger > 0 ? el.children : el;

    const fromVars = { ...EFFECT_FROM[effect] };
    const start = typeof threshold === 'number' ? `top ${Math.round((1 - threshold) * 100)}%` : threshold;
    const toVars: gsap.TweenVars = {
      ...EFFECT_TO[effect],
      delay,
      duration,
      stagger: stagger > 0 ? stagger : undefined,
      scrollTrigger: {
        trigger: el,
        start,
        end: scrub ? 'bottom 20%' : undefined,
        scrub: scrub === true ? 1.5 : scrub || false,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    };

    gsap.set(targets, fromVars);
    const tween = gsap.to(targets, toVars);

    return () => {
      tween.kill();
      tween.scrollTrigger?.kill();
    };
  }, [effect, delay, duration, stagger, threshold, scrub, once]);

  const Component = Tag as any;

  return (
    <Component ref={ref} className={className} style={style}>
      {children}
    </Component>
  );
}

export { ScrollReveal };
