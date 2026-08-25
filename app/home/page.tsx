// view/HomeView.tsx - Nuevo Home con Mapa Cerebral 3D
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { 
  ArrowRight, 
  Bot, 
  Headphones, 
  Map, 
  Zap, 
  Calendar, 
  Trophy, 
  Package, 
  Rocket,
  FlaskConical,
  Shapes,
  CircuitBoard,
  Brain,
  Target,
  BookOpen,
  Clock,
  Compass,
  Users,
  Scroll,
  Globe
} from 'lucide-react';
import { useAchievementsController } from '@/controllers/home/achievementsController';
import { useMyHeadsetsController } from '@/controllers/information/headset';
import { useMissionsController } from '@/controllers/missions/missionsController';
import BrainMap3D from '@/components/home/BrainMap3DFbx';
import STEMNews from '@/components/home/STEMNews';
import { ACHIEVEMENT_CATEGORIES } from '@/models/achievements';
import { missionTypeMeta } from '@/models/missions';

// ── Design tokens (estética módulos) ────────────────────────
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif"
const F_MONO = "'Plus Jakarta Sans', monospace"

// ── Icon mapping for achievement categories ─────────────────────────
const CATEGORY_ICONS: Record<string, React.ElementType<{ size?: number }>> = {
  Compass,
  BookOpen,
  Users,
  Trophy
};

// ── Icon mapping for mission categories ───────────────────────────
const MISSION_CATEGORY_ICONS: Record<string, React.ElementType<{ size?: number }>> = {
  Scroll,
  Globe,
  Brain
};

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

function magneticMove(e: React.MouseEvent, strength = 0.25) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) * strength;
  const y = (e.clientY - rect.top - rect.height / 2) * strength;
  gsap.to(e.currentTarget, { x, y, duration: 0.3, ease: 'power2.out' });
}
function magneticReset(e: React.MouseEvent) {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' });
}
function tiltMove(e: React.MouseEvent, lift = -5, max = 12) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width - 0.5;
  const py = (e.clientY - rect.top) / rect.height - 0.5;
  gsap.to(e.currentTarget, { y: lift, rotationY: px * max, rotationX: -py * max, transformPerspective: 700, duration: 0.35, ease: 'power2.out' });
}
function tiltReset(e: React.MouseEvent) {
  gsap.to(e.currentTarget, { y: 0, rotationX: 0, rotationY: 0, duration: 0.45, ease: 'power2.out' });
}

// ── Stat Badge Component ─────────────────────────────────────
function StatBadge({ icon: Icon, value, label, color }: { icon: React.ElementType<{ size?: number }>; value: string; label: string; color: string }) {
  return (
    <div
      className="stat-badge flex flex-col items-center gap-1.5 px-4 py-4 rounded-2xl border cursor-default"
      style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(255,107,53,0.2)', transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={e => { (e.currentTarget as HTMLElement).style.borderColor = color + '60'; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${color}30`; tiltMove(e, -6, 14); }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,107,53,0.2)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; tiltReset(e); }}>
      <span style={{ fontSize: '1.25rem', color, filter: `drop-shadow(0 0 6px ${color})` }}><Icon size={20} /></span>
      <span className="text-2xl font-black" style={{ fontFamily: F_BE, color, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>{value}</span>
      <span className="text-xs uppercase tracking-widest font-bold" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: F_MONO, fontSize: '0.65rem', letterSpacing: '0.15em' }}>{label}</span>
    </div>
  );
}

// ── Quick Action Card Component ───────────────────────────────
function QuickActionCard({ icon: Icon, title, desc, href, color, glow }: { 
  icon: React.ElementType<{ size?: number }>; title: string; desc: string; href: string; color: string; glow: string 
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <Link href={href} ref={ref}
      className="quick-card relative overflow-hidden cursor-pointer rounded-2xl border"
      style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(255,107,53,0.2)', padding: '1.25rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)', textDecoration: 'none', transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={e => {
        e.currentTarget.style.borderColor = color + '60';
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.6), 0 0 30px ${glow}`;
        tiltMove(e, -8, 12);
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,107,53,0.2)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
        tiltReset(e);
      }}>
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle,${glow} 0%,transparent 70%)`, filter: 'blur(20px)', transform: 'translate(30%,-30%)' }}/>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
        style={{ background: `${color}20`, border: `1px solid ${color}50`, color, filter: `drop-shadow(0 0 6px ${color})` }}>
        <Icon size={20} />
      </div>
      <p className="text-xs tracking-widest uppercase mb-1 font-bold" style={{ color: `${color}aa`, fontFamily: F_MONO, fontSize: '0.65rem', letterSpacing: '0.18em' }}>{title}</p>
      <h4 className="font-black text-base mb-2" style={{ fontFamily: F_BE, color: '#e8d5c8', fontSize: '0.9rem', letterSpacing: '0.04em' }}>{desc}</h4>
      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase" style={{ color, fontFamily: F_MONO }}>
        Acceder <ArrowRight size={14} />
      </div>
    </Link>
  );
}

// ── MAIN VIEW ───────────────────────────────────────────────────
export default function HomeView() {
  const { state: achievementsState, achievements, userStats, xpToNextLevel, userName } = useAchievementsController();
  const { state: headsetState, currentMeta } = useMyHeadsetsController();
  const { state: missionsState, getFilteredMissions, getMissionStats } = useMissionsController();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let split: SplitText | null = null;

    const ctx = gsap.context(() => {
      // Ambient orb pulse + scroll parallax
      gsap.to('.orb-home1', { scale: 1.2, opacity: 0.5, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.orb-home2', { scale: 1.15, opacity: 0.35, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
      if (!prefersReduced) {
        gsap.to('.orb-home1', { y: -80, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 1 } });
        gsap.to('.orb-home2', { y: 120, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 1 } });
      }

      // Scroll progress bar
      gsap.set('.home-progress-bar', { scaleX: 0 });
      gsap.to('.home-progress-bar', {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      });

      // Hero entrance with SplitText
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-badge', { opacity: 0, y: -20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' });

      const titleEl = root.querySelector('.hero-title .grad-text') ?? null;
      if (titleEl && !prefersReduced) {
        split = new SplitText(titleEl, { type: 'chars' });
        tl.fromTo(split.chars,
          { opacity: 0, yPercent: 120, rotationX: -80 },
          { opacity: 1, yPercent: 0, rotationX: 0, duration: 0.9, stagger: 0.025, ease: 'back.out(1.7)' },
          '-=0.2');
      } else {
        tl.fromTo('.hero-title', { opacity: 0, y: 50, rotateX: 15 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3');
      }

      tl.fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4');

      if (userStats) {
        const statBadges = document.querySelectorAll('.stat-badge');
        if (statBadges.length > 0) {
          tl.fromTo('.stat-badge', { opacity: 0, y: 30, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.2');
        }
      }

      tl.fromTo('.section-hdr', { opacity: 0, x: -30 }, { opacity: 1, x: 0, stagger: 0.15, duration: 0.6 }, '-=0.1')
        .fromTo('.quick-card', { opacity: 0, y: 40, rotateY: -10 }, { opacity: 1, y: 0, rotateY: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, '-=0.3');

      tl.fromTo('.mission-progress-card', { opacity: 0, y: 30, rotateX: 20 }, { opacity: 1, y: 0, rotateX: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, '-=0.2');

      if (userStats) {
        tl.fromTo('.xp-progress-card', { opacity: 0, y: 30, rotateX: 20 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
      }

      // Scroll-triggered reveals for sections that come later
      const revealSelectors = ['.mission-card', '.objects-section', '.stem-news-wrap'];
      revealSelectors.forEach((sel) => {
        const els = document.querySelectorAll(sel);
        if (els.length === 0) return;
        gsap.fromTo(els, { opacity: 0, y: 36 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: els[0], start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });

      // Continuous floating effect for cards
      if (!prefersReduced) {
        gsap.to('.quick-card', { y: -3, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: { each: 0.2, from: 'random' } });
        gsap.to('.stat-badge', { y: -2, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: { each: 0.15, from: 'random' } });
        gsap.to('.mission-progress-card', { y: -2, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: { each: 0.1, from: 'random' } });
        gsap.to('.xp-progress-card', { y: -2, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      }
    }, containerRef);

    return () => { split?.revert(); ctx.revert(); };
  }, [userStats]);

  // ── Award-winning buttery smooth scroll (Lenis, synced with ScrollTrigger) ──
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    type LenisInstance = { raf: (t: number) => void; on: (e: string, cb: () => void) => void; destroy: () => void };
    let lenis: LenisInstance | null = null;
    let pollId: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const onTick = (time: number) => { lenis?.raf(time * 1000); };

    const trySetup = () => {
      if (cancelled) return;
      const LenisCtor = (window as unknown as { Lenis?: new (opts: object) => LenisInstance }).Lenis;
      if (!LenisCtor) { pollId = setTimeout(trySetup, 80); return; }
      lenis = new LenisCtor({ duration: 1.1, smoothWheel: true, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        :root {
          --pink: #FF006E;
          --orange: #FF6B00;
          --yellow: #FFD700;
        }
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        @keyframes sline{0%,100%{opacity:0.2;transform:scaleY(0.7)}50%{opacity:1;transform:scaleY(1)}}
      `}</style>

      <div ref={containerRef} className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(135deg,#08040c 0%,#120818 50%,#08040c 100%)', fontFamily: F_MONO }}>

        {/* Progress bar */}
        <div className="home-progress-bar fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
          style={{ background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))', boxShadow: '0 0 12px rgba(255,107,53,0.4)' }} />

        {/* Ambient grid + orbs */}
        <div className="home-bg-grid fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,107,53,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,53,0.03) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%,#000 0%,transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%,#000 0%,transparent 70%)'
          }} />

        {/* Ambient orbs */}
        <div className="orb-home1 fixed pointer-events-none rounded-full"
          style={{ width: 700, height: 700, top: '-10%', right: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(255,107,53,0.18) 0%,transparent 70%)', filter: 'blur(70px)' }}/>
        <div className="orb-home2 fixed pointer-events-none rounded-full"
          style={{ width: 600, height: 600, bottom: '5%', left: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(255,0,110,0.15) 0%,transparent 70%)', filter: 'blur(80px)' }}/>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

          {/* ── HERO ── */}
          <div className="text-center mb-16" style={{ position: 'relative' }}>
            <div className="hero-ring" aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(46vw,420px)', height: 'min(46vw,420px)', borderRadius: '50%', border: '1px solid rgba(255,107,53,0.15)', pointerEvents: 'none', zIndex: 0 }}>
              <style>{`
                .hero-ring::before,.hero-ring::after{content:'';position:absolute;border-radius:50%;inset:0;border:1px solid rgba(255,107,53,0.1);}
                .hero-ring::before{transform:rotateX(60deg) scale(.8)}
                .hero-ring::after{transform:rotateY(60deg) scale(.55);border-color:rgba(255,0,110,0.12)}
                @media (prefers-reduced-motion: no-preference){
                  @keyframes hero-ring-spin{from{transform:translate(-50%,-50%) rotateZ(0deg)}to{transform:translate(-50%,-50%) rotateZ(360deg)}}
                  .hero-ring{animation:hero-ring-spin 24s linear infinite}
                }
              `}</style>
            </div>
            <div className="hero-corner" style={{ position: 'absolute', top: '8%', left: '8%', width: 30, height: 30, border: '2px solid rgba(255,107,53,0.35)', borderRight: 'none', borderBottom: 'none' }} />
            <div className="hero-corner" style={{ position: 'absolute', top: '8%', right: '8%', width: 30, height: 30, border: '2px solid rgba(255,107,53,0.35)', borderLeft: 'none', borderBottom: 'none' }} />
            <div className="hero-corner" style={{ position: 'absolute', bottom: '8%', left: '8%', width: 30, height: 30, border: '2px solid rgba(255,107,53,0.35)', borderRight: 'none', borderTop: 'none' }} />
            <div className="hero-corner" style={{ position: 'absolute', bottom: '8%', right: '8%', width: 30, height: 30, border: '2px solid rgba(255,107,53,0.35)', borderLeft: 'none', borderTop: 'none' }} />
            <div className="hero-badge flex items-center justify-center gap-2 mb-8" style={{ position: 'relative', zIndex: 1 }}>
              <div className="flex items-center gap-2 px-5 py-2 rounded-full"
                style={{ background: 'rgba(255,107,53,0.1)', border: '2px solid rgba(255,107,53,0.25)' }}>
                <span style={{ color: 'var(--orange)', fontSize: '0.8rem' }}>◈</span>
                <span className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: 'rgba(255,107,53,0.8)', fontFamily: F_MONO, letterSpacing: '0.25em', fontSize: '0.7rem' }}>
                  {userName ? `Hola, ${userName}` : 'Bienvenido de nuevo'}
                </span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e5a0',
                  boxShadow: '0 0 10px #00e5a0', display: 'inline-block', animation: 'pulse 2s infinite' }}/>
              </div>
            </div>

            <h1 className="hero-title font-black leading-none mb-6"
              style={{ fontFamily: F_BE, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.02em' }}>
              <span className="grad-text" style={{ background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
                ATHERNIX
              </span>
            </h1>

            <p className="hero-sub text-base max-w-2xl mx-auto mb-8 leading-relaxed"
              style={{ color: 'rgba(200,160,140,0.7)', fontFamily: F_MONO, letterSpacing: '0.04em', fontSize: '1rem' }}>
              Tu plataforma de aprendizaje VR inmersivo. Explora, aprende y evoluciona con Ather IA.
            </p>
            <div className="hero-scroll" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 20, opacity: 0.45 }}>
              <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom,var(--orange),transparent)', animation: 'sline 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: F_MONO, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>DESCUBRIR</span>
            </div>
          </div>

          {/* ── USER STATS ── */}
          {userStats && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
              <StatBadge icon={Calendar} value={userStats.activeDays.toString()} label="Días Activos" color="var(--orange)" />
              <StatBadge icon={Zap} value={userStats.totalXP.toString()} label="XP Total" color="#00E5A0" />
              <StatBadge icon={Trophy} value={userStats.level.toString()} label="Nivel" color="var(--yellow)" />
              <StatBadge icon={Target} value={userStats.missionsCompleted.toString()} label="Misiones" color="var(--pink)" />
              <StatBadge icon={BookOpen} value={userStats.topicsExplored.toString()} label="Temas" color="var(--orange)" />
              <StatBadge icon={Clock} value={`${userStats.hoursSpent}h`} label="Horas" color="#00E5A0" />
            </div>
          )}

          {/* ── MAIN GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

            {/* ── BRAIN MAP (3D Achievements) ── */}
            <div className="lg:col-span-2">
              <div className="section-hdr flex items-center gap-3 mb-6">
                <Brain size={20} style={{ color: 'var(--orange)' }} />
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_BE, color: '#ffffff', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
                  MAPA CEREBRAL
                </h2>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }}/>
                <span className="text-xs font-bold" style={{ color: 'rgba(255,107,53,0.5)', fontFamily: F_MONO, fontSize: '0.7rem' }}>
                  {achievements.filter(a => a.unlocked).length}/{achievements.length} desbloqueados
                </span>
              </div>

              <div className="rounded-2xl border overflow-hidden"
                style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(255,107,53,0.2)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
                <BrainMap3D achievements={achievements} />
              </div>

              {/* Achievement Categories */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
                {Object.entries(ACHIEVEMENT_CATEGORIES).map(([key, cat]) => {
                  const IconComponent = CATEGORY_ICONS[cat.icon];
                  return (
                    <div key={key} className="rounded-xl p-4 border"
                      style={{ background: 'rgba(18,8,22,0.7)', borderColor: 'rgba(255,107,53,0.15)' }}>
                      <div className="flex items-center gap-2 mb-2">
                        {IconComponent && (
                          <span style={{ color: cat.color, fontSize: '1.2rem' }}>
                            <IconComponent size={20} />
                          </span>
                        )}
                        <span className="text-xs font-bold" style={{ color: cat.color, fontFamily: F_MONO }}>
                          {cat.label}
                        </span>
                      </div>
                      <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: F_MONO }}>
                        {achievements.filter(a => a.category === key && a.unlocked).length} desbloqueados
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── QUICK ACTIONS ── */}
            <div>
              <div className="section-hdr flex items-center gap-3 mb-6">
                <Zap size={20} style={{ color: 'var(--orange)' }} />
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_BE, color: '#ffffff', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
                  ACCIONES RÁPIDAS
                </h2>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }}/>
              </div>

              <div className="flex flex-col gap-5">
                <QuickActionCard
                  icon={Bot}
                  title="Ather IA"
                  desc="Chatbot inteligente"
                  href="/chatbot"
                  color="#00E5A0"
                  glow="rgba(0,229,160,0.3)"
                />
                <QuickActionCard
                  icon={Headphones}
                  title="Headsets"
                  desc="Configurar dispositivo VR"
                  href="/headsets"
                  color="var(--orange)"
                  glow="rgba(255,107,53,0.3)"
                />
                <QuickActionCard
                  icon={Map}
                  title="Desarrollo"
                  desc="Temarios STEM"
                  href="/development"
                  color="var(--pink)"
                  glow="rgba(255,0,110,0.3)"
                />
              </div>

              {/* XP Progress */}
              {userStats && (
                <div className="xp-progress-card mt-5 rounded-2xl border p-5"
                  style={{ background: 'rgba(18,8,22,0.7)', borderColor: 'rgba(255,107,53,0.15)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold" style={{ color: 'rgba(255,107,53,0.7)', fontFamily: F_MONO, letterSpacing: '0.15em' }}>
                      PROGRESO NIVEL {userStats.level}
                    </span>
                    <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: F_MONO }}>
                      {xpToNextLevel} XP para siguiente nivel
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,107,53,0.2)' }}>
                    <div className="h-full transition-all duration-500"
                      style={{ 
                        width: `${((userStats.totalXP % 100) / 100) * 100}%`,
                        background: 'linear-gradient(90deg,var(--orange),var(--yellow))',
                        boxShadow: '0 0 12px rgba(255,107,53,0.5)'
                      }}/>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── MISSION PROGRESS BY TYPE ── */}
          <div className="mission-progress-section mb-12">
            <div className="section-hdr flex items-center gap-3 mb-6">
              <Target size={20} style={{ color: 'var(--yellow)' }} />
              <h2 className="font-black tracking-widest uppercase"
                style={{ fontFamily: F_BE, color: '#ffffff', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
                PROGRESO POR CATEGORÍA
              </h2>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,215,0,0.15)' }}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {Object.entries(missionTypeMeta).map(([type, meta]) => {
                const typeMissions = getFilteredMissions().filter(m => m.type === type);
                const completed = typeMissions.filter(m => m.status === 'completed').length;
                const progress = typeMissions.length > 0 ? Math.round((completed / typeMissions.length) * 100) : 0;
                const IconComponent = MISSION_CATEGORY_ICONS[meta.icon];
                
                return (
                  <div key={type} className="mission-progress-card rounded-2xl border p-5"
                    style={{ background: 'rgba(18,8,22,0.9)', borderColor: `${meta.color}30`, boxShadow: '0 8px 32px rgba(0,0,0,0.5)', transformStyle: 'preserve-3d', willChange: 'transform' }}
                    onMouseMove={e => { (e.currentTarget as HTMLElement).style.borderColor = `${meta.color}70`; (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 44px rgba(0,0,0,0.55), 0 0 36px ${meta.color}25`; tiltMove(e, -6, 10); }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${meta.color}30`; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'; tiltReset(e); }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: `${meta.color}20`, border: `1px solid ${meta.color}50` }}>
                          {IconComponent && (
                            <span style={{ color: meta.color }}>
                              <IconComponent size={24} />
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-black text-lg" style={{ fontFamily: F_BE, color: '#e8d5c8', letterSpacing: '0.02em' }}>
                            {meta.label}
                          </h3>
                          <p className="text-xs" style={{ color: 'rgba(200,160,140,0.5)', fontFamily: F_MONO }}>
                            {completed}/{typeMissions.length} misiones
                          </p>
                        </div>
                      </div>
                      <span 
                        className="text-2xl font-black"
                        style={{ fontFamily: F_BE, color: meta.color }}
                      >
                        {progress}%
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div 
                        className="h-3 rounded-full overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.1)' }}
                      >
                        <div 
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{ 
                            width: `${progress}%`,
                            background: `linear-gradient(90deg,${meta.color},${meta.color}80)`,
                            boxShadow: `0 0 15px ${meta.color}40`
                          }}
                        />
                      </div>
                    </div>
                    
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,160,140,0.5)', fontFamily: F_MONO }}>
                      {meta.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── AVAILABLE MISSIONS ── */}
          <div className="mb-12 available-missions-section">
            <div className="section-hdr flex items-center gap-3 mb-6">
              <Rocket size={20} style={{ color: 'var(--pink)' }} />
              <h2 className="font-black tracking-widest uppercase"
                style={{ fontFamily: F_BE, color: '#ffffff', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
                MISIONES DISPONIBLES
              </h2>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,0,110,0.15)' }}/>
              <Link 
                href="/missions"
                className="text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:opacity-80"
                style={{ color: 'var(--pink)', fontFamily: F_MONO }}
              >
                Ver todas <ArrowRight size={12} className="inline ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Mission Card 1 */}
              <Link href="/missions" className="mission-card block">
                <div className="mission-inner rounded-2xl border p-5 cursor-pointer"
                  style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(255,0,110,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', textDecoration: 'none', transformStyle: 'preserve-3d', willChange: 'transform' }}
                  onMouseMove={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,0,110,0.45)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 44px rgba(0,0,0,0.55), 0 0 36px rgba(255,0,110,0.22)'; tiltMove(e, -6, 10); }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,0,110,0.2)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'; tiltReset(e); }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(255,0,110,0.15)', border: '1px solid rgba(255,0,110,0.3)' }}>
                      <FlaskConical size={24} style={{ color: 'var(--pink)' }} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                      style={{ background: 'rgba(255,107,53,0.15)', color: 'var(--orange)', fontFamily: F_MONO }}>
                      +50 XP
                    </span>
                  </div>
                  <h3 className="font-black text-lg mb-2" style={{ fontFamily: F_BE, color: '#e8d5c8', letterSpacing: '0.02em' }}>
                    Laboratorio Virtual
                  </h3>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(200,160,140,0.6)', fontFamily: F_MONO }}>
                    Realiza experimentos de química en entorno VR seguro
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: 'rgba(255,0,110,0.6)', fontFamily: F_MONO }}>
                      Dificultad: Media
                    </span>
                    <button className="px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200"
                      style={{ background: 'linear-gradient(135deg,var(--pink),var(--orange))', color: '#08040c', fontFamily: F_MONO }}>
                      Iniciar
                    </button>
                  </div>
                </div>
              </Link>

              {/* Mission Card 2 */}
              <Link href="/missions" className="mission-card block">
                <div className="mission-inner rounded-2xl border p-5 cursor-pointer"
                  style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(0,229,160,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', textDecoration: 'none', transformStyle: 'preserve-3d', willChange: 'transform' }}
                  onMouseMove={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,160,0.45)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 44px rgba(0,0,0,0.55), 0 0 36px rgba(0,229,160,0.22)'; tiltMove(e, -6, 10); }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,160,0.2)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'; tiltReset(e); }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(0,229,160,0.15)', border: '1px solid rgba(0,229,160,0.3)' }}>
                      <Shapes size={24} style={{ color: '#00E5A0' }} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                      style={{ background: 'rgba(0,229,160,0.15)', color: '#00E5A0', fontFamily: F_MONO }}>
                      +75 XP
                    </span>
                  </div>
                  <h3 className="font-black text-lg mb-2" style={{ fontFamily: F_BE, color: '#e8d5c8', letterSpacing: '0.02em' }}>
                    Geometría Espacial
                  </h3>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(200,160,140,0.6)', fontFamily: F_MONO }}>
                    Explora formas 3D y calcula volúmenes en tiempo real
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: 'rgba(0,229,160,0.6)', fontFamily: F_MONO }}>
                      Dificultad: Fácil
                    </span>
                    <button className="px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200"
                      style={{ background: 'linear-gradient(135deg,#00E5A0,var(--yellow))', color: '#08040c', fontFamily: F_MONO }}>
                      Iniciar
                    </button>
                  </div>
                </div>
              </Link>

              {/* Mission Card 3 */}
              <Link href="/missions" className="mission-card block">
                <div className="mission-inner rounded-2xl border p-5 cursor-pointer"
                  style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(255,215,0,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', textDecoration: 'none', transformStyle: 'preserve-3d', willChange: 'transform' }}
                  onMouseMove={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,215,0,0.45)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 44px rgba(0,0,0,0.55), 0 0 36px rgba(255,215,0,0.22)'; tiltMove(e, -6, 10); }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,215,0,0.2)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'; tiltReset(e); }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.3)' }}>
                      <CircuitBoard size={24} style={{ color: 'var(--yellow)' }} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                      style={{ background: 'rgba(255,215,0,0.15)', color: 'var(--yellow)', fontFamily: F_MONO }}>
                      +100 XP
                    </span>
                  </div>
                  <h3 className="font-black text-lg mb-2" style={{ fontFamily: F_BE, color: '#e8d5c8', letterSpacing: '0.02em' }}>
                    Circuitos Eléctricos
                  </h3>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(200,160,140,0.6)', fontFamily: F_MONO }}>
                      Construye y simula circuitos complejos en VR
                    </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: 'rgba(255,215,0,0.6)', fontFamily: F_MONO }}>
                      Dificultad: Difícil
                    </span>
                    <button className="px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200"
                      style={{ background: 'linear-gradient(135deg,var(--yellow),var(--orange))', color: '#08040c', fontFamily: F_MONO }}>
                      Iniciar
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* ── COLLECTED OBJECTS (Unity Integration Placeholder) ── */}
          <div className="mb-12 objects-section">
            <div className="section-hdr flex items-center gap-3 mb-6">
              <Package size={20} style={{ color: 'var(--yellow)' }} />
              <h2 className="font-black tracking-widest uppercase"
                style={{ fontFamily: F_BE, color: '#ffffff', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
                OBJETOS COLECCIONADOS
              </h2>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,215,0,0.15)' }}/>
              <span className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: 'rgba(255,215,0,0.1)', color: 'rgba(255,215,0,0.6)', fontFamily: F_MONO }}>
                Próximamente
              </span>
            </div>

            <div className="rounded-2xl border p-8 text-center"
              style={{ background: 'rgba(18,8,22,0.7)', borderColor: 'rgba(255,215,0,0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,215,0,0.1)', border: '2px dashed rgba(255,215,0,0.3)' }}>
                <Package size={32} style={{ color: 'var(--yellow)' }} />
              </div>
              <h3 className="font-black text-xl mb-3" style={{ fontFamily: F_BE, color: '#e8d5c8', letterSpacing: '0.02em' }}>
                Integración Unity
              </h3>
              <p className="text-sm max-w-md mx-auto mb-6 leading-relaxed"
                style={{ color: 'rgba(200,160,140,0.6)', fontFamily: F_MONO }}>
                Próximamente podrás ver los objetos 3D que hayas coleccionado durante tus misiones VR.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--yellow)', animation: 'pulse 2s infinite' }}/>
                <span className="text-xs font-bold tracking-wider uppercase" style={{ color: 'rgba(255,215,0,0.7)', fontFamily: F_MONO }}>
                  En desarrollo
                </span>
              </div>
            </div>
          </div>

          {/* ── STEM NEWS ── */}
          <div className="mb-12 stem-news-wrap">
            <STEMNews />
          </div>

          {/* Footer */}
          <div className="text-center mt-16">
            <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, var(--orange), transparent)', opacity: 0.5 }}></div>
            <p className="text-xs tracking-widest uppercase font-bold"
              style={{ color: 'rgba(255,107,53,0.3)', fontFamily: F_MONO, letterSpacing: '0.4em' }}>
              ✦ athernix · home · v3.0 ✦
            </p>
          </div>
        </div>
      </div>
    </>
  );
}