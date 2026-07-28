// view/HomeView.tsx - Overhaul Award-Winning 3D Interactive (v6 - Cinematic Scroll)
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAchievementsController } from '@/controllers/home/achievementsController';
import { useMyHeadsetsController } from '@/controllers/information/headset';
import BrainMap3D from '@/components/home/BrainMap3D';
import STEMNews from '@/components/home/STEMNews';
import { ACHIEVEMENT_CATEGORIES } from '@/models/achievements';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextSplitter from '@/components/ui/TextSplitter';
import MagneticElement from '@/components/ui/MagneticElement';
import ParallaxLayer from '@/components/ui/ParallaxLayer';

const LiquidGlassBackground = dynamic(() => import('@/components/ui/LiquidGlassBackground'), { ssr: false });

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const F_ORB = "'Orbitron', sans-serif";
const F_RAJ = "'Rajdhani', sans-serif";
const F_INTER = "'Inter', sans-serif";

// ── Icons ──────────────────────────────────────────────────────
const IconArrowR = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>;
const IconBot = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"/></svg>;
const IconHeadset = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>;
const IconMap = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"/></svg>;
const IconZap = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/></svg>;
const IconCalendar = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/></svg>;
const IconTrophy = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0V9.75a2.25 2.25 0 0 0-2.25-2.25H9.75A2.25 2.25 0 0 0 7.5 9.75v4.875c0 .621.504-1.125 1.125-1.125h6.75c.621 0 1.125-.504 1.125-1.125V9.75a2.25 2.25 0 0 0-2.25-2.25h-3.75m-3 6h3"/></svg>;
const IconChevronDown = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>;
const IconSparkle = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z"/></svg>;

// ═══════════════════════════════════════════════════════════════
// PARTICLE FIELD — Interactive floating particles
// ═══════════════════════════════════════════════════════════════
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.parentElement!.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);

    const particles: { x: number; y: number; ox: number; oy: number; r: number; speed: number; hue: number; alpha: number; phase: number }[] = [];
    const count = 60;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        ox: Math.random() * rect.width,
        oy: Math.random() * rect.height,
        r: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        hue: Math.random() > 0.5 ? 25 : 340,
        alpha: Math.random() * 0.5 + 0.15,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMouse);

    let animId: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repel = dist < 180 ? (1 - dist / 180) * 40 : 0;
        const angle = Math.atan2(dy, dx);

        p.x += Math.cos(p.phase + time * 0.001 * p.speed) * 0.3 - (repel ? Math.cos(angle) * repel * 0.02 : 0);
        p.y += Math.sin(p.phase + time * 0.001 * p.speed) * 0.3 - (repel ? Math.sin(angle) * repel * 0.02 : 0);

        // Wrap around
        if (p.x < -20) p.x = rect.width + 20;
        if (p.x > rect.width + 20) p.x = -20;
        if (p.y < -20) p.y = rect.height + 20;
        if (p.y > rect.height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 55%, ${p.alpha})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 55%, ${p.alpha * 0.2})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,107,53,${0.06 * (1 - d / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    const onResize = () => {
      const r = canvas.parentElement!.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = r.width + 'px';
      canvas.style.height = r.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[5]" />;
}

// ═══════════════════════════════════════════════════════════════
// CURSOR AURA — Enhanced with trail particles & magnetic ring
// ═══════════════════════════════════════════════════════════════
function CursorAura() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const trails = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const dot = dotRef.current, ring = ringRef.current, trailContainer = trailRef.current;
    if (!dot || !ring || !trailContainer) return;

    // Create trail dots pool
    const trailCount = 8;
    for (let i = 0; i < trailCount; i++) {
      const t = document.createElement('div');
      t.style.cssText = `position:fixed;pointer-events:none;z-index:99;width:${3 - i * 0.3}px;height:${3 - i * 0.3}px;border-radius:50%;background:rgba(255,107,53,${0.4 - i * 0.05});box-shadow:0 0 ${4 - i * 0.4}px rgba(255,107,53,0.5);top:0;left:0;transform:translate(-50%,-50%);opacity:0;`;
      trailContainer.appendChild(t);
      trails.current.push(t);
    }

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    const trailHistory: { x: number; y: number }[] = Array(trailCount).fill({ ...pos });

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const move = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };
    window.addEventListener('mousemove', move);

    const ticker = gsap.ticker.add(() => {
      ringPos.x += (pos.x - ringPos.x) * 0.12;
      ringPos.y += (pos.y - ringPos.y) * 0.12;
      gsap.set(dot, { x: pos.x, y: pos.y });
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });

      // Update trail
      trailHistory.unshift({ x: pos.x, y: pos.y });
      trailHistory.pop();
      trails.current.forEach((t, i) => {
        const tp = trailHistory[Math.min(i * 2, trailHistory.length - 1)];
        if (tp) {
          gsap.set(t, { x: tp.x, y: tp.y, opacity: 0.5 - i * 0.06 });
        }
      });
    });

    const growables = document.querySelectorAll('[data-cursor="grow"]');
    const onEnter = () => {
      gsap.to(ring, { scale: 2.5, opacity: 0.4, borderColor: 'rgba(255,215,0,0.7)', duration: 0.4, ease: 'power2.out' });
      gsap.to(dot, { scale: 1.8, duration: 0.4, ease: 'power2.out' });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, borderColor: 'rgba(255,120,70,0.7)', duration: 0.4, ease: 'power2.out' });
      gsap.to(dot, { scale: 1, duration: 0.4, ease: 'power2.out' });
    };

    growables.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      gsap.ticker.remove(ticker);
      growables.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      trails.current.forEach(t => t.remove());
    };
  }, []);

  return (
    <div className="hidden lg:block">
      <div ref={trailRef} />
      <div ref={ringRef} className="fixed top-0 left-0 pointer-events-none z-[100] rounded-full"
        style={{ width: 36, height: 36, border: '1.5px solid rgba(255,120,70,0.7)', boxShadow: '0 0 20px rgba(255,107,53,0.3), inset 0 0 8px rgba(255,107,53,0.1)' }} />
      <div ref={dotRef} className="fixed top-0 left-0 pointer-events-none z-[100] rounded-full"
        style={{ width: 5, height: 5, background: '#FF6B00', boxShadow: '0 0 12px #FF6B00, 0 0 24px rgba(255,107,53,0.5)' }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCROLL PROGRESS — Enhanced with glow pulse
// ═══════════════════════════════════════════════════════════════
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => {
        gsap.set(barRef.current, { scaleX: self.progress });
        if (glowRef.current) {
          gsap.set(glowRef.current, {
            left: `${self.progress * 100}%`,
            opacity: 0.7 + Math.sin(self.progress * 20) * 0.3,
          });
        }
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50" style={{ background: 'rgba(255,107,53,0.06)' }}>
      <div ref={barRef} className="h-full origin-left relative" style={{ transform: 'scaleX(0)', background: 'linear-gradient(90deg,#FF006E,#FF6B00,#FFD700,#FF6B00)', boxShadow: '0 0 14px rgba(255,107,53,0.7)' }}>
        <div ref={glowRef} className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(255,215,0,0.6),transparent 70%)', left: '0%', transform: 'translate(-50%,-50%)', filter: 'blur(2px)' }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCROLL INDICATOR — "Discover more" animated
// ═══════════════════════════════════════════════════════════════
function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { y: 8, opacity: 0.4, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: '10%',
      onUpdate: self => {
        gsap.to(el, { opacity: 1 - self.progress * 3, duration: 0.2 });
      },
    });
  }, []);

  return (
    <div ref={ref} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
      <span className="text-[0.6rem] tracking-[0.35em] uppercase" style={{ color: 'rgba(255,180,140,0.5)', fontFamily: F_RAJ }}>Descubre</span>
      <div className="flex flex-col items-center gap-1">
        <IconChevronDown />
        <div className="w-[1px] h-10" style={{ background: 'linear-gradient(to bottom,rgba(255,107,53,0.4),transparent)' }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// GLITCH TEXT — Subtle glitch effect on hover
// ═══════════════════════════════════════════════════════════════
function GlitchText({ text, className = '', style = {}, as: Tag = 'span' }: {
  text: string; className?: string; style?: React.CSSProperties; as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}) {
  const ref = useRef<HTMLElement>(null);

  const onEnter = useCallback(() => {
    if (!ref.current) return;
    const el = ref.current;
    const tl = gsap.timeline();
    tl.to(el, { skewX: 1.5, x: 1.5, duration: 0.05 })
      .to(el, { skewX: -1, x: -1, duration: 0.05 })
      .to(el, { skewX: 0.5, x: 0.5, duration: 0.04 })
      .to(el, { skewX: 0, x: 0, duration: 0.06 });
  }, []);

  return (
    <Tag ref={ref as any} className={className} style={style} onMouseEnter={onEnter}>
      {text}
    </Tag>
  );
}

// ═══════════════════════════════════════════════════════════════
// FLOATING SHAPES — 3D geometric shapes drifting
// ═══════════════════════════════════════════════════════════════
function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const shapes = containerRef.current.querySelectorAll('.float-shape');
    shapes.forEach((shape, i) => {
      gsap.to(shape, {
        y: gsap.utils.random(-25, 25),
        x: gsap.utils.random(-15, 15),
        rotate: gsap.utils.random(-15, 15),
        duration: gsap.utils.random(5, 9),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.7,
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {/* Diamond */}
      <div className="float-shape absolute top-[15%] left-[8%] w-8 h-8 opacity-[0.12]"
        style={{ clipPath: 'polygon(50% 0%,100% 50%,50% 100%,0% 50%)', background: 'linear-gradient(135deg,#FF6B00,#FF006E)', filter: 'blur(1px)' }} />
      {/* Hexagon */}
      <div className="float-shape absolute top-[60%] right-[10%] w-10 h-10 opacity-[0.1]"
        style={{ clipPath: 'polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)', background: 'linear-gradient(135deg,#FFD700,#FF6B00)', filter: 'blur(1px)' }} />
      {/* Triangle */}
      <div className="float-shape absolute top-[30%] right-[25%] w-6 h-6 opacity-[0.08]"
        style={{ clipPath: 'polygon(50% 0%,100% 100%,0% 100%)', background: '#00E5A0', filter: 'blur(1px)' }} />
      {/* Small diamond */}
      <div className="float-shape absolute top-[75%] left-[20%] w-5 h-5 opacity-[0.1]"
        style={{ clipPath: 'polygon(50% 0%,100% 50%,50% 100%,0% 50%)', background: '#FF006E', filter: 'blur(1px)' }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// COUNT UP — Slot machine style
// ═══════════════════════════════════════════════════════════════
function CountUp({ value, suffix = '', decimals = false }: { value: number; suffix?: string; decimals?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { v: 0 };
    const el = ref.current;
    if (!el) return;
    const tween = gsap.to(obj, {
      v: value,
      duration: 1.6,
      ease: 'power3.out',
      onUpdate: () => {
        if (el) el.textContent = (decimals ? obj.v.toFixed(1) : Math.round(obj.v).toString()) + suffix;
      },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
    return () => { tween.kill(); };
  }, [value, suffix, decimals]);

  return <span ref={ref}>0{suffix}</span>;
}

// ═══════════════════════════════════════════════════════════════
// TILT 3D — Advanced with shine sweep
// ═══════════════════════════════════════════════════════════════
function Tilt3D({ children, max = 12, className = '', style = {}, perspective = 900 }: {
  children: React.ReactNode; max?: number; className?: string; style?: React.CSSProperties; perspective?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    gsap.to(el, {
      rotateX: (0.5 - py) * max,
      rotateY: (px - 0.5) * max,
      transformPerspective: perspective,
      duration: 0.5,
      ease: 'power2.out',
    });
    if (glowRef.current) gsap.to(glowRef.current, { x: px * r.width, y: py * r.height, opacity: 0.7, duration: 0.35 });
    if (shineRef.current) gsap.to(shineRef.current, { left: `${px * 100}%`, opacity: 0.25, duration: 0.35 });
  };

  const onLeave = () => {
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out' });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
    if (shineRef.current) gsap.to(shineRef.current, { opacity: 0, duration: 0.5 });
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} data-cursor="grow"
      className={`relative ${className}`} style={{ transformStyle: 'preserve-3d', height: '100%', ...style }}>
      <div ref={glowRef} className="absolute w-44 h-44 rounded-full pointer-events-none opacity-0 z-10"
        style={{ background: 'radial-gradient(circle,rgba(255,255,255,0.12) 0%,transparent 70%)', transform: 'translate(-50%,-50%)', top: 0, left: 0 }} />
      <div ref={shineRef} className="absolute inset-0 pointer-events-none z-20 opacity-0 transition-opacity duration-500"
        style={{ background: 'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.08) 45%,rgba(255,255,255,0.12) 50%,rgba(255,255,255,0.08) 55%,transparent 65%)', backgroundSize: '200% 100%' }} />
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// GRAIN OVERLAY
// ═══════════════════════════════════════════════════════════════
function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 mix-blend-overlay opacity-[0.045]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION DIVIDER — Angled cinematic
// ═══════════════════════════════════════════════════════════════
function SectionDivider({ label, icon, count, accent = '#FF6B00' }: {
  label: string; icon: React.ReactNode; count?: string; accent?: string;
}) {
  return (
    <div className="section-hdr flex items-center gap-4 mb-6 group">
      <div className="flex items-center gap-2.5 pl-1">
        <div className="relative flex items-center justify-center w-10 h-10 transition-all duration-300 group-hover:scale-110"
          style={{
            clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
            background: `linear-gradient(135deg,${accent}22,${accent}08)`,
            border: `1px solid ${accent}40`,
          }}>
          <span style={{ color: accent, fontSize: '1rem', filter: `drop-shadow(0 0 6px ${accent})` }}>{icon}</span>
        </div>
        <h2 className="font-black tracking-widest uppercase whitespace-nowrap"
          style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.7rem', letterSpacing: '0.22em' }}>
          {label}
        </h2>
      </div>
      <div className="flex-1 h-[2px] relative overflow-hidden"
        style={{ background: `repeating-linear-gradient(90deg, ${accent}30 0 6px, transparent 6px 12px)` }} />
      {count && (
        <span className="text-xs whitespace-nowrap px-2.5 py-1 rounded-full transition-all duration-300 group-hover:scale-105"
          style={{ color: 'rgba(255,180,140,0.7)', fontFamily: F_RAJ, fontSize: '0.6rem', background: `${accent}10`, border: `1px solid ${accent}22` }}>
          {count}
        </span>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BENTO STAT — Redesigned with depth
// ═══════════════════════════════════════════════════════════════
function BentoStat({ icon, value, numeric, suffix = '', label, color, span = 1, big = false, decimals = false }: {
  icon: React.ReactNode; value: string; numeric?: number; suffix?: string; label: string; color: string; span?: number; big?: boolean; decimals?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Tilt3D max={10} className={span === 2 ? 'col-span-2' : ''}>
      <div ref={ref}
        className="stat-badge relative overflow-hidden h-full flex flex-col justify-between px-4 py-4 border transition-all duration-500"
        style={{
          background: 'linear-gradient(155deg,rgba(24,10,28,0.96),rgba(14,6,18,0.96))',
          borderColor: 'rgba(180,60,40,0.18)',
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)',
          transition: 'border-color 0.4s, box-shadow 0.4s, transform 0.4s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = color + '88';
          e.currentTarget.style.boxShadow = `0 0 30px ${color}22, inset 0 0 40px ${color}08, 0 12px 40px rgba(0,0,0,0.5)`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(180,60,40,0.18)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
        {/* Ambient glow orb */}
        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none transition-opacity duration-500"
          style={{ background: `radial-gradient(circle,${color}18 0%,transparent 70%)`, filter: 'blur(12px)', opacity: 0.6 }} />
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-3 h-3 pointer-events-none"
          style={{ background: `linear-gradient(135deg,transparent 50%,${color}40 50%)` }} />
        <div className="flex items-center justify-between relative z-10">
          <span style={{ color, fontSize: big ? '1.4rem' : '1rem', filter: `drop-shadow(0 0 8px ${color}66)` }}>{icon}</span>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color, boxShadow: `0 0 8px ${color}`, animationDuration: '2.5s' }} />
        </div>
        <div className="relative z-10">
          <div className="font-black leading-none" style={{ fontFamily: F_ORB, color, fontSize: big ? '2rem' : '1.35rem', letterSpacing: '-0.02em' }}>
            {numeric !== undefined ? <CountUp value={numeric} suffix={suffix} decimals={decimals} /> : value}
          </div>
          <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_RAJ, fontSize: '0.58rem', letterSpacing: '0.16em' }}>{label}</span>
        </div>
      </div>
    </Tilt3D>
  );
}

// ═══════════════════════════════════════════════════════════════
// QUICK ACTION ROW — Enhanced with reveal line
// ═══════════════════════════════════════════════════════════════
function QuickActionRow({ index, icon, title, desc, href, color, glow }: {
  index: string; icon: React.ReactNode; title: string; desc: string; href: string; color: string; glow: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  return (
    <Tilt3D max={6}>
      <Link href={href} ref={ref} data-cursor="grow"
        className="quick-card relative flex items-center gap-4 overflow-hidden border transition-all duration-500 h-full group"
        style={{
          background: 'linear-gradient(120deg,rgba(20,9,24,0.96),rgba(12,5,16,0.96))',
          borderColor: 'rgba(180,60,40,0.2)',
          padding: '1.15rem 1.3rem',
          textDecoration: 'none',
          clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)',
          transition: 'border-color 0.4s, box-shadow 0.4s, transform 0.4s',
        }}
        onMouseEnter={e => {
          gsap.to(ref.current, { x: 6, duration: 0.3, ease: 'power2.out' });
          gsap.to(lineRef.current, { scaleY: 1, duration: 0.3, ease: 'power2.out' });
          e.currentTarget.style.borderColor = color + '77';
          e.currentTarget.style.boxShadow = `0 10px 35px rgba(0,0,0,0.5), 0 0 35px ${glow}`;
        }}
        onMouseLeave={e => {
          gsap.to(ref.current, { x: 0, duration: 0.3, ease: 'power2.out' });
          gsap.to(lineRef.current, { scaleY: 0, duration: 0.3, ease: 'power2.out' });
          e.currentTarget.style.borderColor = 'rgba(180,60,40,0.2)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
        {/* Background index */}
        <span className="absolute top-2 right-3 font-black opacity-[0.12] transition-opacity duration-500 group-hover:opacity-[0.2]"
          style={{ fontFamily: F_ORB, fontSize: '2.2rem', color }}>{index}</span>
        {/* Left accent line */}
        <div ref={lineRef} className="absolute left-0 top-0 bottom-0 w-[3px] origin-top transition-transform duration-300"
          style={{ background: `linear-gradient(to bottom,${color},transparent)`, boxShadow: `0 0 12px ${color}`, transform: 'scaleY(0)' }} />
        {/* Icon container */}
        <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${color}15`, border: `1px solid ${color}35`, color, clipPath: 'polygon(20% 0%,100% 0%,80% 100%,0% 100%)', filter: `drop-shadow(0 0 5px ${color}66)` }}>
          {icon}
        </div>
        <div className="relative z-10 flex-1 min-w-0">
          <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: `${color}aa`, fontFamily: F_RAJ, fontSize: '0.6rem', letterSpacing: '0.18em' }}>{title}</p>
          <h4 className="font-black text-sm truncate" style={{ fontFamily: F_ORB, color: '#e8d5c8', fontSize: '0.82rem', letterSpacing: '0.02em' }}>{desc}</h4>
        </div>
        <span style={{ color }} className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"><IconArrowR /></span>
      </Link>
    </Tilt3D>
  );
}

// ═══════════════════════════════════════════════════════════════
// STACKING CARD — For sections that reveal on scroll
// ═══════════════════════════════════════════════════════════════
function StackingReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      { y: 60, opacity: 0, rotateX: 5, scale: 0.95 },
      {
        y: 0, opacity: 1, rotateX: 0, scale: 1,
        duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  }, []);

  return (
    <div ref={ref} className={className} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// INTERACTIVE GRID BACKGROUND
// ═══════════════════════════════════════════════════════════════
function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.parentElement!.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);

    const gridSize = 60;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.strokeStyle = 'rgba(255,107,53,0.04)';
      ctx.lineWidth = 0.5;

      for (let x = 0; x < rect.width; x += gridSize) {
        for (let y = 0; y < rect.height; y += gridSize) {
          const pulse = Math.sin(time * 0.5 + x * 0.02 + y * 0.02) * 0.5 + 0.5;
          ctx.strokeStyle = `rgba(255,107,53,${0.02 + pulse * 0.04})`;
          ctx.strokeRect(x, y, gridSize, gridSize);

          // Dot at intersection
          if (pulse > 0.65) {
            ctx.fillStyle = `rgba(255,107,53,${pulse * 0.15})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      time += 0.01;
      requestAnimationFrame(draw);
    };
    const anim = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[1]" />;
}

// ═══════════════════════════════════════════════════════════════
// MAIN VIEW
// ═══════════════════════════════════════════════════════════════
export default function HomeView() {
  const { state: achievementsState, achievements, userStats, xpToNextLevel } = useAchievementsController();
  const { state: headsetState, currentMeta } = useMyHeadsetsController();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isLoaded) return;

    const ctx = gsap.context(() => {
      // Master timeline for hero entrance
      const masterTL = gsap.timeline({ defaults: { ease: 'power4.out' } });

      masterTL
        .fromTo('.hero-badge', { opacity: 0, y: -15, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 })
        .fromTo('.hero-title-char', { opacity: 0, y: 40, rotateX: -80 }, { opacity: 1, y: 0, rotateX: 0, stagger: 0.04, duration: 0.9 }, '-=0.3')
        .fromTo('.hero-sub', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-cta', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('.stat-badge', { opacity: 0, y: 30, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.55, ease: 'back.out(1.3)' }, '-=0.1')
        .fromTo('.section-hdr', { opacity: 0, x: -25 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 }, '-=0.1')
        .fromTo('.quick-card', { opacity: 0, x: 30 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.45, ease: 'power2.out' }, '-=0.3');

      // Hero parallax on scroll
      gsap.to(heroRef.current, {
        yPercent: -20,
        opacity: 0.35,
        scale: 0.94,
        filter: 'blur(3px)',
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.7 },
      });

      // Section headers reveal
      gsap.utils.toArray<HTMLElement>('.section-hdr').forEach(hdr => {
        gsap.fromTo(hdr,
          { opacity: 0, x: -35, filter: 'blur(4px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: hdr, start: 'top 88%' } }
        );
      });

      // Brain map reveal
      gsap.fromTo('.brainmap-panel',
        { opacity: 0, y: 80, rotateX: 8, scale: 0.9 },
        { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: '.brainmap-panel', start: 'top 88%' } }
      );

      // Category cards stagger
      gsap.fromTo('.cat-card',
        { opacity: 0, y: 30, scale: 0.88, rotateY: 15 },
        { opacity: 1, y: 0, scale: 1, rotateY: 0, duration: 0.6, stagger: 0.07, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.cat-grid', start: 'top 90%' } }
      );

      // XP fill bar
      gsap.fromTo('.xp-fill',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power3.inOut', transformOrigin: 'left', scrollTrigger: { trigger: '.xp-fill', start: 'top 92%' } }
      );

      // News panel
      gsap.fromTo('.news-panel',
        { opacity: 0, y: 60, filter: 'blur(3px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.news-panel', start: 'top 90%' } }
      );

      // Parallax orbs
      gsap.to('.orb-home1', { scale: 1.25, opacity: 0.45, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.orb-home2', { scale: 1.2, opacity: 0.3, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.5 });
      gsap.to('.orb-home3', { scale: 1.15, opacity: 0.35, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });

      // Floating badges in hero
      gsap.to('.hero-floating-badge', {
        y: gsap.utils.random(-8, 8),
        rotate: gsap.utils.random(-3, 3),
        duration: gsap.utils.random(3, 5),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=Rajdhani:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        html{scroll-behavior:smooth}
        * { cursor: none; }
        @media (pointer: coarse) { * { cursor: auto; } }
        ::selection { background: rgba(255,107,53,0.3); color: #fff; }
        @keyframes float-gentle {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1.5deg); }
        }
        @keyframes pulse-glow {
          0%,100% { box-shadow: 0 0 8px currentColor; }
          50% { box-shadow: 0 0 22px currentColor, 0 0 40px currentColor; }
        }
        .animate-float-gentle { animation: float-gentle 6s ease-in-out infinite; }
      `}</style>

      <ScrollProgress />
      <CursorAura />
      <GrainOverlay />
      <LiquidGlassBackground intensity="particles-only" />

      <div ref={containerRef} className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(165deg,#07030b 0%,#0f0616 30%,#0a0410 60%,#060209 100%)', fontFamily: F_RAJ }}>

        {/* Ambient orbs */}
        <ParallaxLayer speed={0.35} direction="up">
          <div className="orb-home1 fixed pointer-events-none rounded-full"
            style={{ width: 650, height: 650, top: '-12%', right: '-10%', zIndex: 0, background: 'radial-gradient(circle,rgba(255,0,110,0.1) 0%,transparent 65%)', filter: 'blur(70px)' }} />
        </ParallaxLayer>
        <ParallaxLayer speed={0.55} direction="down">
          <div className="orb-home2 fixed pointer-events-none rounded-full"
            style={{ width: 550, height: 550, bottom: '8%', left: '-10%', zIndex: 0, background: 'radial-gradient(circle,rgba(255,107,0,0.09) 0%,transparent 65%)', filter: 'blur(75px)' }} />
        </ParallaxLayer>
        <ParallaxLayer speed={0.25} direction="left">
          <div className="orb-home3 fixed pointer-events-none rounded-full"
            style={{ width: 350, height: 350, top: '45%', left: '55%', zIndex: 0, background: 'radial-gradient(circle,rgba(255,215,0,0.05) 0%,transparent 65%)', filter: 'blur(55px)' }} />
        </ParallaxLayer>

        <GridBackground />
        <ParticleField />
        <FloatingShapes />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

          {/* ── HERO ── */}
          <div ref={heroRef} className="relative text-center mb-16 pt-6" style={{ transformOrigin: 'center top' }}>
            {/* Cinematic frame corners */}
            <div className="hidden sm:block absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 opacity-25" style={{ borderColor: '#FF6B00' }} />
            <div className="hidden sm:block absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 opacity-25" style={{ borderColor: '#FF006E' }} />
            <div className="hidden sm:block absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 opacity-25" style={{ borderColor: '#FFD700' }} />
            <div className="hidden sm:block absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 opacity-25" style={{ borderColor: '#FF6B00' }} />

            {/* Floating badges */}
            <div className="hero-floating-badge absolute top-0 right-[15%] hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full z-10"
              style={{ background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.2)', backdropFilter: 'blur(8px)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00E5A0', boxShadow: '0 0 8px #00E5A0' }} />
              <span className="text-[0.6rem] font-bold tracking-wider uppercase" style={{ color: '#00E5A0', fontFamily: F_RAJ }}>Online</span>
            </div>

            <ScrollReveal effect="fadeUp" delay={0.15}>
              <div className="hero-badge flex items-center justify-center gap-2 mb-7">
                <div className="flex items-center gap-2 px-5 py-2 transition-all duration-500 hover:scale-105"
                  style={{ background: 'rgba(255,107,53,0.07)', border: '1px solid rgba(255,107,53,0.22)', clipPath: 'polygon(14px 0,100% 0,calc(100% - 14px) 100%,0 100%)', backdropFilter: 'blur(4px)' }}>
                  <IconSparkle />
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255,120,70,0.75)', fontFamily: F_RAJ, letterSpacing: '0.28em', fontSize: '0.6rem' }}>
                    Bienvenido de nuevo
                  </span>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00e5a0', boxShadow: '0 0 10px #00e5a0', display: 'inline-block', animation: 'pulse-glow 2.5s infinite' }} />
                </div>
              </div>
            </ScrollReveal>

            <TextSplitter
              text="ATHERNIX" as="h1" splitBy="char" effect="flip" gradient scrollTrigger={false} delay={0.4} stagger={0.05}
              className="hero-title font-black leading-none mb-5"
              style={{ fontFamily: F_ORB, fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', letterSpacing: '-0.03em' }}
            />

            <ScrollReveal effect="fadeIn" delay={0.7}>
              <p className="hero-sub text-base max-w-xl mx-auto mb-3 leading-relaxed"
                style={{ color: 'rgba(200,160,140,0.6)', fontFamily: F_RAJ, letterSpacing: '0.05em', fontSize: '0.92rem' }}>
                Tu plataforma de aprendizaje VR inmersivo. Explora, aprende y evoluciona con Ather IA.
              </p>
            </ScrollReveal>

            <ScrollIndicator />
          </div>

          {/* ── USER STATS — Bento Grid ── */}
          {userStats && (
            <StackingReveal className="mb-16">
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 auto-rows-[110px]">
                <BentoStat icon={<IconZap />} numeric={userStats.totalXP} label="XP Total" color="#00E5A0" span={2} big />
                <BentoStat icon={<IconTrophy />} numeric={userStats.level} label="Nivel" color="#FFD700" value={userStats.level.toString()} />
                <BentoStat icon={<IconCalendar />} numeric={userStats.activeDays} label="Días Activos" color="#FF6B00" value={userStats.activeDays.toString()} />
                <BentoStat icon="🎯" numeric={userStats.missionsCompleted} label="Misiones" color="#FF006E" value={userStats.missionsCompleted.toString()} />
                <BentoStat icon="📚" numeric={userStats.topicsExplored} label="Temas" color="#FF6B00" value={userStats.topicsExplored.toString()} />
                <BentoStat icon="⏱️" numeric={userStats.hoursSpent} suffix="h" label="Horas" color="#00E5A0" value={`${userStats.hoursSpent}h`} span={2} decimals />
              </div>
            </StackingReveal>
          )}

          {/* ── MAIN GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

            {/* ── BRAIN MAP ── */}
            <div className="lg:col-span-2">
              <SectionDivider label="Mapa Cerebral" icon="🧠" count={`${achievements.filter(a => a.unlocked).length}/${achievements.length}`} accent="#FF6B00" />

              <div className="brainmap-panel relative overflow-hidden border transition-all duration-700"
                style={{
                  background: 'linear-gradient(160deg,rgba(22,10,26,0.97),rgba(10,4,14,0.97))',
                  borderColor: 'rgba(180,60,40,0.22)',
                  boxShadow: '0 25px 70px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)',
                  clipPath: 'polygon(0 24px, 24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)',
                  transformStyle: 'preserve-3d',
                }}>
                {/* Inner glow */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 25% 0%,rgba(255,107,0,0.07),transparent 55%)' }} />
                <BrainMap3D achievements={achievements} />
              </div>

              {/* Achievement Categories */}
              <div className="cat-grid grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {Object.entries(ACHIEVEMENT_CATEGORIES).map(([key, cat], i) => (
                  <Tilt3D key={key} max={14} className={i % 3 === 0 ? 'sm:-translate-y-1' : ''}>
                    <div className="cat-card relative p-3 border transition-all duration-500 h-full overflow-hidden group"
                      style={{
                        background: 'linear-gradient(145deg,rgba(20,9,24,0.88),rgba(12,5,16,0.88))',
                        borderColor: 'rgba(180,60,40,0.15)',
                        clipPath: 'polygon(0 0,100% 0,100% 100%,10px 100%,0 calc(100% - 10px))',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = cat.color + '77';
                        e.currentTarget.style.boxShadow = `0 0 22px ${cat.color}22, 0 8px 30px rgba(0,0,0,0.4)`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(180,60,40,0.15)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}>
                      <div className="absolute bottom-0 left-0 w-full h-[2px] transition-all duration-500 group-hover:h-[3px]"
                        style={{ background: `linear-gradient(90deg,${cat.color},transparent)` }} />
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="transition-transform duration-300 group-hover:scale-125" style={{ color: cat.color, fontSize: '1.1rem' }}>{cat.icon}</span>
                        <span className="text-xs font-bold" style={{ color: cat.color, fontFamily: F_RAJ }}>{cat.label}</span>
                      </div>
                      <span className="text-xs" style={{ color: 'rgba(200,150,120,0.45)', fontFamily: F_RAJ }}>
                        {achievements.filter(a => a.category === key && a.unlocked).length} desbloqueados
                      </span>
                    </div>
                  </Tilt3D>
                ))}
              </div>
            </div>

            {/* ── QUICK ACTIONS ── */}
            <div>
              <SectionDivider label="Acciones Rápidas" icon="⚡" accent="#FFD700" />

              <div className="flex flex-col gap-3">
                <MagneticElement strength={0.25} radius={120}>
                  <QuickActionRow index="01" icon={<IconBot />} title="Ather IA" desc="Chatbot inteligente" href="/chatbot" color="#00E5A0" glow="rgba(0,229,160,0.25)" />
                </MagneticElement>
                <MagneticElement strength={0.25} radius={120}>
                  <QuickActionRow index="02" icon={<IconHeadset />} title="Headsets" desc="Configurar dispositivo VR" href="/headsets" color="#FF6B00" glow="rgba(255,107,53,0.25)" />
                </MagneticElement>
                <MagneticElement strength={0.25} radius={120}>
                  <QuickActionRow index="03" icon={<IconMap />} title="Desarrollo" desc="Temarios STEM" href="/development" color="#FF006E" glow="rgba(255,0,110,0.25)" />
                </MagneticElement>
              </div>

              {/* XP Progress */}
              {userStats && (
                <Tilt3D max={8}>
                  <div className="relative mt-4 border p-4 overflow-hidden group transition-all duration-500"
                    style={{
                      background: 'linear-gradient(135deg,rgba(20,9,24,0.88),rgba(12,5,16,0.88))',
                      borderColor: 'rgba(180,60,40,0.15)',
                      clipPath: 'polygon(16px 0,100% 0,100% 100%,0 100%,0 16px)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(180,60,40,0.15)'; }}>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-80"
                      style={{ background: 'radial-gradient(circle,rgba(255,107,0,0.14),transparent 70%)', filter: 'blur(10px)', opacity: 0.5 }} />
                    <div className="flex items-center justify-between mb-2.5 relative z-10">
                      <span className="text-xs font-bold" style={{ color: 'rgba(255,120,70,0.6)', fontFamily: F_RAJ, letterSpacing: '0.16em' }}>
                        PROGRESO NIVEL {userStats.level}
                      </span>
                      <span className="text-xs" style={{ color: 'rgba(200,150,120,0.45)', fontFamily: F_RAJ }}>
                        {xpToNextLevel} XP
                      </span>
                    </div>
                    <div className="w-full h-3 overflow-hidden relative z-10 rounded-full" style={{ background: 'rgba(180,60,40,0.18)' }}>
                      <div className="xp-fill h-full rounded-full relative" style={{
                        width: `${((userStats.totalXP % 100) / 100) * 100}%`,
                        background: 'linear-gradient(90deg,#FF6B00,#FFD700)',
                        boxShadow: '0 0 14px rgba(255,107,53,0.5)',
                        transformOrigin: 'left',
                      }}>
                        <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.2),transparent 60%)' }} />
                      </div>
                    </div>
                  </div>
                </Tilt3D>
              )}
            </div>
          </div>

          {/* ── STEM NEWS ── */}
          <div className="news-panel mb-14">
            <SectionDivider label="STEM News" icon="📡" accent="#00E5A0" />
            <STEMNews />
          </div>

          {/* Footer */}
          <div className="text-center mt-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-[1px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,107,53,0.3))' }} />
              <span className="text-[0.6rem] tracking-[0.5em] uppercase" style={{ color: 'rgba(255,100,50,0.2)', fontFamily: F_RAJ }}>
                ✦ athernix · home · v6.0 ✦
              </span>
              <span className="w-8 h-[1px]" style={{ background: 'linear-gradient(90deg,rgba(255,107,53,0.3),transparent)' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}