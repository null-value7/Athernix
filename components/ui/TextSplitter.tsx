// components/ui/TextSplitter.tsx — GSAP character/word split animation
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextSplitterProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  splitBy?: 'char' | 'word';
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  stagger?: number;
  scrollTrigger?: boolean;
  threshold?: string;
  effect?: 'rise' | 'flip' | 'cascade' | 'wave' | 'glitch';
  gradient?: boolean; // apply athernix gradient
}

export default function TextSplitter({
  text,
  as: Tag = 'h2',
  splitBy = 'char',
  className = '',
  style,
  delay = 0,
  duration = 0.8,
  stagger = 0.04,
  scrollTrigger = true,
  threshold = 'top 85%',
  effect = 'rise',
  gradient = false,
}: TextSplitterProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const spans = el.querySelectorAll('.ts-unit');
    if (!spans.length) return;

    const fromVars: gsap.TweenVars = (() => {
      switch (effect) {
        case 'flip':
          return { rotateX: -90, y: 40, opacity: 0, transformPerspective: 1000, transformOrigin: 'bottom center' };
        case 'cascade':
          return { y: 100, opacity: 0, scale: 0.5, rotateZ: -15 };
        case 'wave':
          return { y: 60, opacity: 0, scale: 0.8 };
        case 'glitch':
          return { x: () => gsap.utils.random(-30, 30), y: () => gsap.utils.random(-20, 20), opacity: 0, scale: 1.2 };
        case 'rise':
        default:
          return { y: 80, opacity: 0, rotateX: -45, transformPerspective: 1200 };
      }
    })();

    const toVars: gsap.TweenVars = {
      y: 0, x: 0, opacity: 1, scale: 1, rotateX: 0, rotateZ: 0,
      duration,
      stagger: effect === 'wave' ? { each: stagger, from: 'center' } : stagger,
      delay,
      ease: effect === 'glitch' ? 'power4.out' : 'back.out(1.7)',
      ...(scrollTrigger ? {
        scrollTrigger: {
          trigger: el,
          start: threshold,
          toggleActions: 'play none none none',
        },
      } : {}),
    };

    gsap.set(spans, fromVars);
    const tween = gsap.to(spans, toVars);

    return () => {
      tween.kill();
      tween.scrollTrigger?.kill();
    };
  }, [text, effect, delay, duration, stagger, scrollTrigger, threshold]);

  const units = splitBy === 'char'
    ? text.split('').map((char, i) => (
        <span key={i} className="ts-unit" style={{
          display: 'inline-block',
          whiteSpace: char === ' ' ? 'pre' : undefined,
          willChange: 'transform, opacity',
        }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))
    : text.split(' ').map((word, i) => (
        <span key={i} className="ts-unit" style={{
          display: 'inline-block',
          marginRight: '0.3em',
          willChange: 'transform, opacity',
        }}>
          {word}
        </span>
      ));

  const gradientStyle = gradient ? {
    background: 'linear-gradient(90deg, #FF006E, #FFD700, #FF6B00)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } : {};

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={className} style={{ ...gradientStyle, ...style, overflow: 'hidden' }}>
      {units}
    </Tag>
  );
}

export { TextSplitter };
