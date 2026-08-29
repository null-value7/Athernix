// view/HomeView.tsx - Athernix Command Center
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import * as THREE from 'three';
import {
  ArrowRight,
  Bot,
  Headphones,
  Rocket,
  Code2,
  Sparkles,
  Brain,
  Target,
  Clock,
  Flame,
} from 'lucide-react';
import { useAuth } from '@/lib/supabase/useAuth';
import { useAchievementsController } from '@/controllers/home/achievementsController';
import { useMissionsController } from '@/controllers/missions/missionsController';
import { missionTypeMeta, type Mission } from '@/models/missions';
import BrainMap3D from '@/components/home/BrainMap3DFbx';

const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif";
const F_MONO = "'Plus Jakarta Sans', monospace";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// ── Interaction helpers ────────────────────────────────────────
function tiltMove(e: React.MouseEvent, lift = -5, max = 12) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width - 0.5;
  const py = (e.clientY - rect.top) / rect.height - 0.5;
  gsap.to(e.currentTarget, {
    y: lift,
    rotationY: px * max,
    rotationX: -py * max,
    transformPerspective: 800,
    duration: 0.35,
    ease: 'power2.out',
  });
}
function tiltReset(e: React.MouseEvent) {
  gsap.to(e.currentTarget, {
    y: 0,
    rotationX: 0,
    rotationY: 0,
    duration: 0.45,
    ease: 'power2.out',
  });
}

// ── 3D Neural Field background ─────────────────────────────────
function NeuralField3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const nodeCount = 140;
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const palette = [
      new THREE.Color('#FF6B00'),
      new THREE.Color('#FF006E'),
      new THREE.Color('#FFD700'),
    ];
    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 38;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22;
      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xff6b35,
      transparent: true,
      opacity: 0.05,
    });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    const maxDist = 5.5;
    for (let i = 0; i < nodeCount; i++) {
      const ax = positions[i * 3],
        ay = positions[i * 3 + 1],
        az = positions[i * 3 + 2];
      for (let j = i + 1; j < nodeCount; j++) {
        const bx = positions[j * 3],
          by = positions[j * 3 + 1],
          bz = positions[j * 3 + 2];
        const d = Math.hypot(ax - bx, ay - by, az - bz);
        if (d < maxDist) {
          linePositions.push(ax, ay, az, bx, by, bz);
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    let mx = 0,
      my = 0;
    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      my = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener('mousemove', onMove);

    let raf = 0;
    const t0 = performance.now();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = (performance.now() - t0) * 0.0005;
      if (!prefersReduced) {
        particles.rotation.y = t * 0.05 + mx * 0.15;
        particles.rotation.x = my * 0.08;
        lines.rotation.y = t * 0.05 + mx * 0.15;
        lines.rotation.x = my * 0.08;
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      if (container.contains(renderer.domElement))
        container.removeChild(renderer.domElement);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(8,4,12,0.5) 70%, rgba(8,4,12,0.92) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

// ── Portal Card Component ──────────────────────────────────────
function PortalCard({
  icon: Icon,
  label,
  title,
  desc,
  href,
  color,
  glow,
  index,
}: {
  icon: React.ElementType<{ size?: number }>;
  label: string;
  title: string;
  desc: string;
  href: string;
  color: string;
  glow: string;
  index: number;
}) {
  return (
    <Link
      href={href}
      className="portal-card relative overflow-hidden cursor-pointer rounded-2xl border block"
      style={{
        background: 'rgba(18,8,22,0.92)',
        borderColor: `${color}25`,
        padding: '2rem',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        textDecoration: 'none',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseMove={(e) => {
        e.currentTarget.style.borderColor = `${color}70`;
        e.currentTarget.style.boxShadow = `0 16px 50px rgba(0,0,0,0.6), 0 0 40px ${glow}`;
        tiltMove(e, -10, 14);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${color}25`;
        e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5)';
        tiltReset(e);
      }}
    >
      {/* Corner brackets */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          width: 18,
          height: 18,
          borderTop: `2px solid ${color}50`,
          borderLeft: `2px solid ${color}50`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          width: 18,
          height: 18,
          borderBottom: `2px solid ${color}50`,
          borderRight: `2px solid ${color}50`,
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle,${glow} 0%,transparent 70%)`,
          filter: 'blur(25px)',
          transform: 'translate(30%,-30%)',
        }}
      />

      {/* Index number */}
      <span
        className="absolute top-5 right-6 font-black opacity-20"
        style={{
          fontFamily: F_BE,
          color,
          fontSize: '3.5rem',
          lineHeight: 1,
        }}
      >
        0{index + 1}
      </span>

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
        style={{
          background: `${color}18`,
          border: `1px solid ${color}45`,
          color,
          filter: `drop-shadow(0 0 8px ${color}60)`,
        }}
      >
        <Icon size={28} />
      </div>

      {/* Label */}
      <p
        className="text-xs tracking-widest uppercase mb-2 font-bold"
        style={{
          color: `${color}cc`,
          fontFamily: F_MONO,
          fontSize: '0.65rem',
          letterSpacing: '0.22em',
        }}
      >
        {label}
      </p>

      {/* Title */}
      <h3
        className="font-black mb-3"
        style={{
          fontFamily: F_BE,
          color: '#e8d5c8',
          fontSize: '1.6rem',
          letterSpacing: '0.03em',
          lineHeight: 1.1,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-6"
        style={{
          color: 'rgba(200,160,140,0.6)',
          fontFamily: F_MONO,
          fontSize: '0.85rem',
        }}
      >
        {desc}
      </p>

      {/* CTA */}
      <div
        className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase"
        style={{ color, fontFamily: F_MONO }}
      >
        Acceder <ArrowRight size={14} />
      </div>
    </Link>
  );
}

// ── MAIN VIEW ───────────────────────────────────────────────────
export default function HomeView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, loading } = useAuth();
  const { state: achievementsState, achievements, userName } = useAchievementsController();
  const { state: missionsState, getFilteredMissions, getMissionStats } = useMissionsController();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    let split: SplitText | null = null;

    const ctx = gsap.context(() => {
      // Ambient orb pulse
      gsap.to('.orb-cc1', {
        scale: 1.2,
        opacity: 0.45,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.orb-cc2', {
        scale: 1.15,
        opacity: 0.3,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });

      // Scroll progress bar
      gsap.set('.cc-progress-bar', { scaleX: 0 });
      gsap.to('.cc-progress-bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });

      // Hero entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.cc-badge',
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );

      const titleEl = root.querySelector('.cc-title .grad-text');
      if (titleEl && !prefersReduced) {
        split = new SplitText(titleEl, { type: 'chars' });
        tl.fromTo(
          split.chars,
          { opacity: 0, yPercent: 120, rotationX: -80 },
          {
            opacity: 1,
            yPercent: 0,
            rotationX: 0,
            duration: 0.9,
            stagger: 0.025,
            ease: 'back.out(1.7)',
          },
          '-=0.2'
        );
      } else {
        tl.fromTo(
          '.cc-title',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        );
      }

      tl.fromTo(
        '.cc-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.4'
      );

      tl.fromTo(
        '.cc-section-label',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.12 },
        '-=0.2'
      );

      tl.fromTo(
        '.portal-card',
        { opacity: 0, y: 50, rotateY: -10 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // Brain section reveal
      tl.fromTo(
        '.brain-section',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      );

      // Mission preview cards reveal on scroll
      const missionCards = root.querySelectorAll('.mission-preview-card');
      if (missionCards.length > 0) {
        gsap.fromTo(
          missionCards,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: missionCards[0],
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      tl.fromTo(
        '.cc-footer',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.2'
      );

      // Continuous floating
      if (!prefersReduced) {
        gsap.to('.portal-card', {
          y: -4,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: { each: 0.25, from: 'random' },
        });
      }
    }, containerRef);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  // ── Lenis smooth scroll ──
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;

    type LenisInstance = {
      raf: (t: number) => void;
      on: (e: string, cb: () => void) => void;
      destroy: () => void;
    };
    let lenis: LenisInstance | null = null;
    let pollId: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const onTick = (time: number) => {
      lenis?.raf(time * 1000);
    };

    const trySetup = () => {
      if (cancelled) return;
      const LenisCtor = (window as unknown as {
        Lenis?: new (opts: object) => LenisInstance;
      }).Lenis;
      if (!LenisCtor) {
        pollId = setTimeout(trySetup, 80);
        return;
      }
      lenis = new LenisCtor({
        duration: 1.1,
        smoothWheel: true,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
      lenis.on('scroll', () => ScrollTrigger.update());
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
    };
    trySetup();

    return () => {
      cancelled = true;
      if (pollId) clearTimeout(pollId);
      gsap.ticker.remove(onTick);
      lenis?.destroy();
    };
  }, []);

  const portals = [
    {
      icon: Rocket,
      label: 'Misiones',
      title: 'Centro de Misiones',
      desc: 'Explora desafíos STEM inmersivos, completa objetivos y gana experiencia en entornos VR.',
      href: '/missions',
      color: '#FF006E',
      glow: 'rgba(255,0,110,0.3)',
    },
    {
      icon: Bot,
      label: 'Ather IA',
      title: 'Asistente Neural',
      desc: 'Conversa con Ather, tu IA tutor. Resuelve dudas, genera roadmaps y aprende en tiempo real.',
      href: '/chatbot',
      color: '#00E5A0',
      glow: 'rgba(0,229,160,0.3)',
    },
    {
      icon: Headphones,
      label: 'Headsets',
      title: 'Dispositivos VR',
      desc: 'Configura y gestiona tus headsets. Sincroniza tu hardware para una experiencia óptima.',
      href: '/headsets',
      color: '#FF6B00',
      glow: 'rgba(255,107,53,0.3)',
    },
    {
      icon: Code2,
      label: 'Desarrollo',
      title: 'Laboratorio STEM',
      desc: 'Temarios, roadmaps y recursos de desarrollo. Avanza en ciencia, tecnología, ingeniería y matemáticas.',
      href: '/development',
      color: '#FFD700',
      glow: 'rgba(255,215,0,0.3)',
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        :root {
          --pink: #FF006E;
          --orange: #FF6B00;
          --yellow: #FFD700;
        }
        @keyframes sline{0%,100%{opacity:0.2;transform:scaleY(0.7)}50%{opacity:1;transform:scaleY(1)}}
        @keyframes cc-scan{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
      `}</style>

      <div
        ref={containerRef}
        className="relative min-h-screen overflow-x-hidden"
        style={{
          background:
            'linear-gradient(135deg,#08040c 0%,#120818 50%,#08040c 100%)',
          fontFamily: F_MONO,
        }}
      >
        {/* Progress bar */}
        <div
          className="cc-progress-bar fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
          style={{
            background:
              'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))',
            boxShadow: '0 0 12px rgba(255,107,53,0.4)',
          }}
        />

        {/* Neural field 3D background */}
        <NeuralField3D />

        {/* Scanlines */}
        <div
          className="fixed inset-0 pointer-events-none z-[1]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent 0px,transparent 3px,rgba(255,107,53,0.012) 3px,rgba(255,107,53,0.012) 4px)',
          }}
        />

        {/* Ambient grid */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,107,53,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,53,0.025) 1px,transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage:
              'radial-gradient(ellipse 60% 60% at 50% 50%,#000 0%,transparent 70%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 60% at 50% 50%,#000 0%,transparent 70%)',
          }}
        />

        {/* Ambient orbs */}
        <div
          className="orb-cc1 fixed pointer-events-none rounded-full"
          style={{
            width: 700,
            height: 700,
            top: '-10%',
            right: '-8%',
            zIndex: 0,
            background:
              'radial-gradient(circle,rgba(255,107,53,0.16) 0%,transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
        <div
          className="orb-cc2 fixed pointer-events-none rounded-full"
          style={{
            width: 600,
            height: 600,
            bottom: '5%',
            left: '-8%',
            zIndex: 0,
            background:
              'radial-gradient(circle,rgba(255,0,110,0.14) 0%,transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          {/* ── HERO: Saludo + Cerebro 3D ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20" style={{ position: 'relative' }}>
            {/* Corner brackets */}
            <div
              style={{
                position: 'absolute',
                top: -10,
                left: -10,
                width: 28,
                height: 28,
                borderTop: '2px solid rgba(255,107,53,0.35)',
                borderLeft: '2px solid rgba(255,107,53,0.35)',
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: -10,
                right: -10,
                width: 28,
                height: 28,
                borderTop: '2px solid rgba(255,107,53,0.35)',
                borderRight: '2px solid rgba(255,107,53,0.35)',
                zIndex: 2,
              }}
            />

            {/* Left: Greeting + Title */}
            <div className="flex flex-col items-start text-left">
              {/* Badge */}
              <div
                className="cc-badge flex items-center gap-2 mb-6"
                style={{ position: 'relative', zIndex: 1 }}
              >
                <div
                  className="flex items-center gap-2 px-5 py-2 rounded-full"
                  style={{
                    background: 'rgba(255,107,53,0.1)',
                    border: '2px solid rgba(255,107,53,0.25)',
                  }}
                >
                  <Sparkles size={14} style={{ color: 'var(--orange)' }} />
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{
                      color: 'rgba(255,107,53,0.8)',
                      fontFamily: F_MONO,
                      letterSpacing: '0.25em',
                      fontSize: '0.7rem',
                    }}
                  >
                    {userName ? `Hola, ${userName}` : 'Centro de Mando'}
                  </span>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#00e5a0',
                      boxShadow: '0 0 10px #00e5a0',
                      display: 'inline-block',
                      animation: 'pulse 2s infinite',
                    }}
                  />
                </div>
              </div>

              {/* Title */}
              <h1
                className="cc-title font-black leading-none mb-4"
                style={{
                  fontFamily: F_BE,
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                <span
                  className="grad-text"
                  style={{
                    background:
                      'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  ATHERNIX
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="cc-sub text-base max-w-lg mb-6 leading-relaxed"
                style={{
                  color: 'rgba(200,160,140,0.65)',
                  fontFamily: F_MONO,
                  letterSpacing: '0.04em',
                  fontSize: '1rem',
                }}
              >
                Tu portal de aprendizaje inmersivo VR. Selecciona un módulo para
                comenzar tu próxima sesión.
              </p>

              {/* Achievement counter */}
              <div
                className="flex items-center gap-3 mb-2"
                style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(255,107,53,0.08)',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255,107,53,0.15)',
                }}
              >
                <Brain size={16} style={{ color: 'var(--orange)' }} />
                <span
                  className="text-xs font-bold"
                  style={{
                    color: 'rgba(255,107,53,0.7)',
                    fontFamily: F_MONO,
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                  }}
                >
                  {achievements.filter(a => a.unlocked).length}/{achievements.length} logros desbloqueados
                </span>
              </div>

              {/* Scroll indicator */}
              <div
                className="flex flex-col items-start gap-2.5"
                style={{ marginTop: 16, opacity: 0.4 }}
              >
                <div
                  style={{
                    width: 1,
                    height: 48,
                    background:
                      'linear-gradient(to bottom,var(--orange),transparent)',
                    animation: 'sline 2s ease-in-out infinite',
                  }}
                />
                <span
                  style={{
                    fontFamily: F_MONO,
                    fontSize: 9,
                    letterSpacing: '0.2em',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  EXPLORAR
                </span>
              </div>
            </div>

            {/* Right: Brain 3D */}
            <div
              className="brain-section rounded-2xl border overflow-hidden relative"
              style={{
                background: 'rgba(18,8,22,0.85)',
                borderColor: 'rgba(255,107,53,0.2)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                height: '420px',
                minHeight: '320px',
              }}
            >
              {/* Corner brackets on brain container */}
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  width: 16,
                  height: 16,
                  borderTop: '2px solid rgba(255,107,53,0.4)',
                  borderLeft: '2px solid rgba(255,107,53,0.4)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  width: 16,
                  height: 16,
                  borderBottom: '2px solid rgba(255,107,53,0.4)',
                  borderRight: '2px solid rgba(255,107,53,0.4)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />
              <BrainMap3D achievements={achievements} />
            </div>
          </div>

          {/* ── SECTION LABEL ── */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="cc-section-label flex items-center gap-3"
              style={{ opacity: 0 }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: 'var(--orange)',
                  boxShadow: '0 0 8px var(--orange)',
                }}
              />
              <h2
                className="font-black tracking-widest uppercase"
                style={{
                  fontFamily: F_BE,
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  letterSpacing: '0.2em',
                }}
              >
                Módulos del Sistema
              </h2>
            </div>
            <div
              className="flex-1 h-px"
              style={{ background: 'rgba(255,107,53,0.15)' }}
            />
            <span
              className="text-xs font-bold"
              style={{
                color: 'rgba(255,107,53,0.5)',
                fontFamily: F_MONO,
                fontSize: '0.7rem',
              }}
            >
              04 PORTALES
            </span>
          </div>

          {/* ── PORTAL GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {portals.map((p, i) => (
              <PortalCard key={p.href} {...p} index={i} />
            ))}
          </div>

          {/* ── MISSION PREVIEW ── */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <Target size={20} style={{ color: 'var(--pink)' }} />
              <h2
                className="font-black tracking-widest uppercase cc-section-label"
                style={{
                  fontFamily: F_BE,
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  letterSpacing: '0.2em',
                }}
              >
                Misiones Activas
              </h2>
              <div
                className="flex-1 h-px"
                style={{ background: 'rgba(255,0,110,0.15)' }}
              />
              <Link
                href="/missions"
                className="text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:opacity-80"
                style={{ color: 'var(--pink)', fontFamily: F_MONO }}
              >
                Ver todas <ArrowRight size={12} className="inline ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {getFilteredMissions().slice(0, 3).map((mission) => {
                const meta = missionTypeMeta[mission.type];
                const difficultyColor =
                  mission.difficulty === 'easy' ? '#00E5A0' :
                  mission.difficulty === 'medium' ? 'var(--orange)' :
                  'var(--pink)';
                const difficultyLabel =
                  mission.difficulty === 'easy' ? 'Fácil' :
                  mission.difficulty === 'medium' ? 'Media' :
                  'Difícil';

                return (
                  <Link
                    key={mission.id}
                    href="/missions"
                    className="mission-preview-card block"
                  >
                    <div
                      className="rounded-2xl border p-5 cursor-pointer relative overflow-hidden"
                      style={{
                        background: 'rgba(18,8,22,0.9)',
                        borderColor: `${meta.color}25`,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                        textDecoration: 'none',
                        transformStyle: 'preserve-3d',
                        willChange: 'transform',
                      }}
                      onMouseMove={(e) => {
                        e.currentTarget.style.borderColor = `${meta.color}70`;
                        e.currentTarget.style.boxShadow = `0 16px 44px rgba(0,0,0,0.55), 0 0 36px ${meta.color}22`;
                        tiltMove(e, -6, 10);
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${meta.color}25`;
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
                        tiltReset(e);
                      }}
                    >
                      {/* Glow orb */}
                      <div
                        className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                        style={{
                          background: `radial-gradient(circle,${meta.color}25 0%,transparent 70%)`,
                          filter: 'blur(20px)',
                          transform: 'translate(30%,-30%)',
                        }}
                      />

                      {/* Top row: type label + XP */}
                      <div className="flex items-start justify-between mb-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                          style={{
                            background: `${meta.color}15`,
                            color: meta.color,
                            fontFamily: F_MONO,
                            fontSize: '0.65rem',
                            letterSpacing: '0.15em',
                          }}
                        >
                          {meta.label}
                        </span>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                          style={{
                            background: 'rgba(255,107,53,0.12)',
                            color: 'var(--orange)',
                            fontFamily: F_MONO,
                            fontSize: '0.65rem',
                          }}
                        >
                          +{mission.totalXP} XP
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className="font-black text-lg mb-2"
                        style={{
                          fontFamily: F_BE,
                          color: '#e8d5c8',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {mission.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-sm mb-4 leading-relaxed"
                        style={{
                          color: 'rgba(200,160,140,0.55)',
                          fontFamily: F_MONO,
                          fontSize: '0.8rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {mission.description}
                      </p>

                      {/* Bottom row: difficulty + time + status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className="flex items-center gap-1 text-xs font-bold"
                            style={{
                              color: difficultyColor,
                              fontFamily: F_MONO,
                              fontSize: '0.7rem',
                            }}
                          >
                            <Flame size={12} /> {difficultyLabel}
                          </span>
                          <span
                            className="flex items-center gap-1 text-xs font-bold"
                            style={{
                              color: 'rgba(200,160,140,0.5)',
                              fontFamily: F_MONO,
                              fontSize: '0.7rem',
                            }}
                          >
                            <Clock size={12} /> {mission.estimatedTime}
                          </span>
                        </div>
                        {mission.status === 'completed' ? (
                          <span
                            className="text-xs font-bold tracking-wider uppercase"
                            style={{
                              color: '#00E5A0',
                              fontFamily: F_MONO,
                              fontSize: '0.65rem',
                            }}
                          >
                            ✓ Completada
                          </span>
                        ) : mission.status === 'in_progress' ? (
                          <span
                            className="text-xs font-bold tracking-wider uppercase"
                            style={{
                              color: 'var(--orange)',
                              fontFamily: F_MONO,
                              fontSize: '0.65rem',
                            }}
                          >
                            En progreso
                          </span>
                        ) : (
                          <span
                            className="text-xs font-bold tracking-wider uppercase"
                            style={{
                              color: `${meta.color}80`,
                              fontFamily: F_MONO,
                              fontSize: '0.65rem',
                            }}
                          >
                            Disponible
                          </span>
                        )}
                      </div>

                      {/* Progress bar if in progress */}
                      {mission.status === 'in_progress' && (
                        <div className="mt-3">
                          <div
                            className="h-1.5 rounded-full overflow-hidden"
                            style={{ background: 'rgba(255,255,255,0.08)' }}
                          >
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${mission.progress}%`,
                                background: `linear-gradient(90deg,${meta.color},${meta.color}80)`,
                                boxShadow: `0 0 10px ${meta.color}40`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* See more link */}
            <div className="text-center mt-8">
              <Link
                href="/missions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-200 hover:opacity-80"
                style={{
                  background: 'rgba(255,0,110,0.08)',
                  borderColor: 'rgba(255,0,110,0.25)',
                  color: 'var(--pink)',
                  fontFamily: F_MONO,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Ver todas las misiones <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div className="cc-footer text-center">
            <div
              className="h-px mb-8"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--orange), transparent)',
                opacity: 0.4,
              }}
            />
            <div
              className="flex items-center justify-center gap-4 mb-4"
              style={{ opacity: 0.5 }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--pink)',
                }}
              />
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--orange)',
                }}
              />
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--yellow)',
                }}
              />
            </div>
            <p
              className="text-xs tracking-widest uppercase font-bold"
              style={{
                color: 'rgba(255,107,53,0.3)',
                fontFamily: F_MONO,
                letterSpacing: '0.4em',
              }}
            >
              ✦ athernix · command center · v4.0 ✦
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
