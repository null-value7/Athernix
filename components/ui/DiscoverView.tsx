// @ts-nocheck
'use client';

import { useEffect } from 'react';
import DiscoverThreeScene from './DiscoverThreeScene';
import AwardWinning3D from './AwardWinning3D';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextSplitter from '@/components/ui/TextSplitter';
import MagneticElement from '@/components/ui/MagneticElement';
import LiquidGlassCard from './LiquidGlassCard';

function renderText(section) {
  if (!section.textParts) return <p>{section.text}</p>;

  return (
    <p>
      {section.textParts.map((part, index) =>
        typeof part === 'string' ? (
          part
        ) : (
          <span className={part.className} key={`${part.text}-${index}`}>
            {part.text}
          </span>
        )
      )}
    </p>
  );
}

export default function DiscoverView({ sections }) {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.gsap) return;

    // Enhanced GSAP ScrollTrigger animations
    const initAnimations = () => {
      if (!window.gsap || !window.ScrollTrigger) {
        setTimeout(initAnimations, 50);
        return;
      }

      window.gsap.registerPlugin(window.ScrollTrigger);

      // Smooth parallax effect on sections
      window.gsap.utils.toArray('.discover-section').forEach((section, i) => {
        window.gsap.to(section, {
          y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.05 * (i % 2 === 0 ? 1 : -1),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        });
      });

      // Enhanced magnetic effect with smooth easing
      window.gsap.utils.toArray('.discover-content-block').forEach(block => {
        block.addEventListener('mousemove', (e) => {
          const rect = block.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) / 15;
          const y = (e.clientY - rect.top - rect.height / 2) / 15;
          window.gsap.to(block, {
            rotationY: x,
            rotationX: -y,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
        block.addEventListener('mouseleave', () => {
          window.gsap.to(block, {
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
          });
        });
      });

      // Staggered reveal for cards
      window.gsap.utils.toArray('.liquid-glass-card').forEach((card, i) => {
        window.gsap.from(card, {
          opacity: 0,
          y: 60,
          scale: 0.9,
          rotationX: 15,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    };

    initAnimations();

    return () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []);

  return (
    <div className="discover-page relative">
      {/* Award-winning 3D background */}
      <AwardWinning3D 
        containerId="discover-3d-bg"
        variant="galaxy"
        colors={{ primary: '#FF6B00', secondary: '#FF006E', tertiary: '#FFD700' }}
        intensity={1.2}
        interactive={true}
      />
      
      <DiscoverThreeScene />
      
      <main className="discover-content-wrapper relative z-10">
        {sections.map((section, index) => (
          <section
            className={`discover-section ${section.className}`}
            key={section.title}
            data-atx-section
          >
            <ScrollReveal effect={index % 2 === 0 ? 'slideLeft' : 'slideRight'} delay={0.1}>
              <MagneticElement>
                <LiquidGlassCard 
                  intensity="medium"
                  glowColor="rgba(255, 107, 0, 0.4)"
                  className={`discover-content-block ${section.align}`}
                >
                  {section.glitch ? (
                    <h1 className="glitch text-shimmer" data-text={section.title}>
                      {section.title}
                    </h1>
                  ) : (
                    <TextSplitter
                      as="h2"
                      text={section.title}
                      effect="cascade"
                      scrollTrigger
                      gradient
                      className="discover-title-split"
                    />
                  )}
                  <ScrollReveal effect="fadeUp" delay={0.2}>
                    {renderText(section)}
                  </ScrollReveal>
                  {section.indicator && (
                    <div className="discover-scroll-indicator float-gentle">
                      <span className="mono">Desliza hacia abajo</span>
                      <div className="discover-arrow" aria-hidden="true">
                        ↓
                      </div>
                    </div>
                  )}
                </LiquidGlassCard>
              </MagneticElement>
            </ScrollReveal>
          </section>
        ))}
      </main>
    </div>
  );
}
