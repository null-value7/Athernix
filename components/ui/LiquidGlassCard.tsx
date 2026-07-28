// components/ui/LiquidGlassCard.tsx — Enhanced liquid glass card with 3D tilt and GSAP animations
'use client';

import { useRef, useEffect, useState } from 'react';
import MagneticElement from './MagneticElement';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  hoverEffect?: boolean;
  glowColor?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function LiquidGlassCard({
  children,
  className = '',
  intensity = 'medium',
  hoverEffect = true,
  glowColor = 'rgba(255, 107, 0, 0.3)',
  onClick,
  style
}: LiquidGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const intensityMap = {
    subtle: { blur: 16, opacity: 0.08, border: 0.06, tilt: 5 },
    medium: { blur: 24, opacity: 0.12, border: 0.10, tilt: 10 },
    strong: { blur: 32, opacity: 0.18, border: 0.15, tilt: 15 }
  };

  const config = intensityMap[intensity];

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !hoverEffect) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });

      // 3D tilt effect
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = ((e.clientY - centerY) / rect.height) * config.tilt;
      const rotateY = ((centerX - e.clientX) / rect.width) * config.tilt;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 50, y: 50 });
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [hoverEffect, config.tilt]);

  return (
    <MagneticElement strength={hoverEffect ? 8 : 0}>
      <div
        ref={cardRef}
        className={`liquid-glass-card ${className}`}
        onClick={onClick}
        style={{
          background: `rgba(18, 8, 12, ${config.opacity})`,
          backdropFilter: `blur(${config.blur}px) saturate(150%)`,
          WebkitBackdropFilter: `blur(${config.blur}px) saturate(150%)`,
          border: `1px solid rgba(255, 255, 255, ${config.border})`,
          borderRadius: '24px',
          boxShadow: isHovered
            ? `0 25px 70px rgba(0, 0, 0, 0.5), 0 0 50px ${glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.08)`
            : `0 15px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
          transition: 'box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          overflow: 'hidden',
          cursor: onClick ? 'pointer' : 'default',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          ...style
        }}
      >
        {/* Gradient overlay that follows mouse */}
        {hoverEffect && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${glowColor} 0%, transparent 50%)`,
              opacity: isHovered ? 0.4 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
        )}

        {/* Glass shine effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.04) 100%)',
            opacity: isHovered ? 0.5 : 0.25,
            transition: 'opacity 0.3s ease'
          }}
        />

        {/* Content */}
        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
          {children}
        </div>
      </div>
    </MagneticElement>
  );
}
