'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LiquidGlassBackground from './LiquidGlassBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ENHANCED_ROUTES = [
  '/',
  '/ather',
  '/chatbot',
  '/dashboard',
  '/development',
  '/discover',
  '/experience',
  '/explore',
  '/forgotpassword',
  '/headsets',
  '/home',
  '/modulos',
  '/profile',
  '/resetpassword',
  '/student',
  '/teacher',
  '/update-password',
  '/vrtech',
];

function shouldEnhance(pathname: string) {
  return ENHANCED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export default function AthernixVisualEnhancer() {
  const pathname = usePathname();
  
  // Skip auth pages to avoid loops
  if (pathname === '/login' || pathname === '/register' || pathname === '/about') {
    return null;
  }
  
  const active = shouldEnhance(pathname);
  const heavyScene = ['/', '/ather', '/experience', '/discover', '/vrtech'].some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  useEffect(() => {
    if (!active) return;

    document.documentElement.classList.add('atx-award-mode');
    document.body.dataset.atxRoute = pathname;

    const ctx = gsap.context(() => {
      gsap.set('main section, main [data-atx-section]', {
        transformStyle: 'preserve-3d',
        transformPerspective: 1400,
      });

      gsap.utils.toArray<HTMLElement>('main section, main [data-atx-section]').forEach((section, index) => {
        section.classList.add('atx-section-shell');
        gsap.fromTo(
          section,
          { opacity: 0.72, y: 42, rotateX: index % 2 ? -1.8 : 1.8, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 86%',
              end: 'top 42%',
              scrub: 0.8,
            },
          }
        );
      });

      gsap.utils
        .toArray<HTMLElement>(
          'main h1, main h2, main .section-title, main .vrt-sec-title, main .exp-title, main .atx-title'
        )
        .forEach((heading) => {
          heading.classList.add('atx-premium-heading');
          gsap.fromTo(
            heading,
            { y: 34, opacity: 0, rotateX: -18, transformOrigin: '50% 100%' },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.95,
              ease: 'back.out(1.25)',
              scrollTrigger: {
                trigger: heading,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

      gsap.utils
        .toArray<HTMLElement>(
          'main .liquid-glass, main .glass-card, main .card-3d, main article, main button, main a'
        )
        .forEach((el, index) => {
          el.classList.add('atx-motion-surface');
          gsap.fromTo(
            el,
            { opacity: 0, y: 24, scale: 0.985 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.72,
              delay: Math.min((index % 8) * 0.035, 0.22),
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

      gsap.to('.atx-depth-orb-a', {
        x: 80,
        y: -120,
        scale: 1.18,
        rotate: 18,
        ease: 'none',
        scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 1.4 },
      });
      gsap.to('.atx-depth-orb-b', {
        x: -120,
        y: 160,
        scale: 0.88,
        rotate: -24,
        ease: 'none',
        scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 1.8 },
      });
      gsap.to('.atx-depth-grid', {
        yPercent: -16,
        opacity: 0.52,
        ease: 'none',
        scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 1.2 },
      });
    });

    const handlePointerMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      document.documentElement.style.setProperty('--atx-mx', `${x * 100}%`);
      document.documentElement.style.setProperty('--atx-my', `${y * 100}%`);

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('.atx-motion-surface');
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const rx = ((event.clientY - rect.top) / rect.height - 0.5) * -7;
      const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 9;
      target.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
      target.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
      gsap.to(target, { rotateX: rx, rotateY: ry, z: 18, duration: 0.45, ease: 'power3.out' });
    };

    const handlePointerOut = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('.atx-motion-surface');
      if (target) {
        gsap.to(target, { rotateX: 0, rotateY: 0, z: 0, duration: 0.75, ease: 'elastic.out(1, 0.45)' });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerout', handlePointerOut, { passive: true });
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerout', handlePointerOut);
      document.documentElement.classList.remove('atx-award-mode');
      delete document.body.dataset.atxRoute;
    };
  }, [active, pathname]);

  if (!active) return null;

  return (
    <div className="atx-global-stage" aria-hidden="true">
      <LiquidGlassBackground intensity={heavyScene ? 'subtle' : 'particles-only'} className="atx-route-three" />
      <div className="atx-depth-grid" />
      <div className="atx-depth-orb atx-depth-orb-a" />
      <div className="atx-depth-orb atx-depth-orb-b" />
      <div className="atx-scanline" />
    </div>
  );
}

export { AthernixVisualEnhancer };
