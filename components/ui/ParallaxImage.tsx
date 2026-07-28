'use client';

import Image from 'next/image';
import { useEffect, useRef, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  speed?: number;
  scale?: { from: number; to: number };
  rotate?: { from: number; to: number };
  clipReveal?: boolean;
  className?: string;
  style?: CSSProperties;
  fill?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  width = 800,
  height = 600,
  speed = 0.4,
  scale,
  rotate,
  clipReveal = true,
  className = '',
  style,
  fill = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const container = containerRef.current;
    const image = imageRef.current;

    if (clipReveal) {
      gsap.fromTo(
        container,
        { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
        {
          clipPath: 'circle(150% at 50% 50%)',
          opacity: 1,
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    const tweenVars: gsap.TweenVars = {
      y: -80 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    };

    if (scale) tweenVars.scale = scale.to;
    if (rotate) tweenVars.rotate = rotate.to;

    const tween = gsap.fromTo(
      image,
      {
        y: 80 * speed,
        scale: scale?.from ?? 1,
        rotate: rotate?.from ?? 0,
      },
      tweenVars
    );

    return () => {
      tween.kill();
      tween.scrollTrigger?.kill();
    };
  }, [speed, scale, rotate, clipReveal]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ ...style, willChange: 'transform' }}
    >
      <div ref={imageRef} className="relative w-full h-full" style={{ willChange: 'transform' }}>
        {fill ? (
          <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
        ) : (
          <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
        )}
      </div>
    </div>
  );
}

export { ParallaxImage };
