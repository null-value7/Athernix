// view/HomeView.tsx - Nuevo Home con Mapa Cerebral 3D
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useAchievementsController } from '@/controllers/home/achievementsController';
import { useMyHeadsetsController } from '@/controllers/information/headset';
import BrainMap3D from '@/components/home/BrainMap3D';
import STEMNews from '@/components/home/STEMNews';
import { ACHIEVEMENT_CATEGORIES } from '@/models/achievements';

// ── Design tokens (estética módulos) ────────────────────────
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif"
const F_MONO = "'Plus Jakarta Sans', monospace"

// ── Icons ──────────────────────────────────────────────────────
const IconArrowR = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>
const IconBot = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"/></svg>
const IconHeadset = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
const IconMap = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"/></svg>
const IconZap = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/></svg>
const IconCalendar = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/></svg>
const IconTrophy = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0V9.75a2.25 2.25 0 0 0-2.25-2.25H9.75A2.25 2.25 0 0 0 7.5 9.75v4.875c0 .621.504-1.125 1.125-1.125h6.75c.621 0 1.125-.504 1.125-1.125V9.75a2.25 2.25 0 0 0-2.25-2.25h-3.75m-3 6h3"/></svg>

// ── Stat Badge Component ─────────────────────────────────────
function StatBadge({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref}
      className="stat-badge flex flex-col items-center gap-1.5 px-4 py-4 rounded-2xl border cursor-default transition-all duration-300"
      style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(255,107,53,0.2)' }}
      onMouseEnter={e => {
        gsap.to(ref.current, { y: -4, duration: 0.2, ease: 'power2.out' });
        e.currentTarget.style.borderColor = color + '60';
        e.currentTarget.style.boxShadow = `0 0 25px ${color}25`;
      }}
      onMouseLeave={e => {
        gsap.to(ref.current, { y: 0, duration: 0.2, ease: 'power2.out' });
        e.currentTarget.style.borderColor = 'rgba(255,107,53,0.2)';
        e.currentTarget.style.boxShadow = 'none';
      }}>
      <span style={{ fontSize: '1.25rem', color, filter: `drop-shadow(0 0 6px ${color})` }}>{icon}</span>
      <span className="text-2xl font-black" style={{ fontFamily: F_BE, color, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>{value}</span>
      <span className="text-xs uppercase tracking-widest font-bold" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_MONO, fontSize: '0.65rem', letterSpacing: '0.15em' }}>{label}</span>
    </div>
  );
}

// ── Quick Action Card Component ───────────────────────────────
function QuickActionCard({ icon, title, desc, href, color, glow }: { 
  icon: React.ReactNode; title: string; desc: string; href: string; color: string; glow: string 
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <Link href={href} ref={ref}
      className="quick-card relative overflow-hidden cursor-pointer rounded-2xl border transition-all duration-300"
      style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(255,107,53,0.2)', padding: '1.25rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)', textDecoration: 'none' }}
      onMouseEnter={e => {
        gsap.to(ref.current, { y: -6, duration: 0.25, ease: 'power2.out' });
        e.currentTarget.style.borderColor = color + '60';
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.6), 0 0 30px ${glow}`;
      }}
      onMouseLeave={e => {
        gsap.to(ref.current, { y: 0, duration: 0.25, ease: 'power2.out' });
        e.currentTarget.style.borderColor = 'rgba(255,107,53,0.2)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
      }}>
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle,${glow} 0%,transparent 70%)`, filter: 'blur(20px)', transform: 'translate(30%,-30%)' }}/>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
        style={{ background: `${color}20`, border: `1px solid ${color}50`, color, filter: `drop-shadow(0 0 6px ${color})` }}>
        {icon}
      </div>
      <p className="text-xs tracking-widest uppercase mb-1 font-bold" style={{ color: `${color}aa`, fontFamily: F_MONO, fontSize: '0.65rem', letterSpacing: '0.18em' }}>{title}</p>
      <h4 className="font-black text-base mb-2" style={{ fontFamily: F_BE, color: '#e8d5c8', fontSize: '0.9rem', letterSpacing: '0.04em' }}>{desc}</h4>
      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase" style={{ color, fontFamily: F_MONO }}>
        Acceder <IconArrowR />
      </div>
    </Link>
  );
}

// ── MAIN VIEW ───────────────────────────────────────────────────
export default function HomeView() {
  const { state: achievementsState, achievements, userStats, xpToNextLevel } = useAchievementsController();
  const { state: headsetState, currentMeta } = useMyHeadsetsController();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        // Ambient orb pulse
        gsap.to('.orb-home1', { scale: 1.2, opacity: 0.5, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.orb-home2', { scale: 1.15, opacity: 0.35, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });

        // Entrance animations
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo('.hero-badge', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 })
          .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.2')
          .fromTo('.hero-sub', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.3')
          .fromTo('.stat-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, '-=0.1')
          .fromTo('.section-hdr', { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 }, '-=0.1')
          .fromTo('.quick-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.4 }, '-=0.3');
      }, containerRef);
      return () => ctx.revert();
    }
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
      `}</style>

      <div ref={containerRef} className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(135deg,#08040c 0%,#120818 50%,#08040c 100%)', fontFamily: F_MONO }}>

        {/* Ambient orbs */}
        <div className="orb-home1 fixed pointer-events-none rounded-full"
          style={{ width: 700, height: 700, top: '-10%', right: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(255,107,53,0.18) 0%,transparent 70%)', filter: 'blur(70px)' }}/>
        <div className="orb-home2 fixed pointer-events-none rounded-full"
          style={{ width: 600, height: 600, bottom: '5%', left: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(255,0,110,0.15) 0%,transparent 70%)', filter: 'blur(80px)' }}/>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

          {/* ── HERO ── */}
          <div className="text-center mb-16">
            <div className="hero-badge flex items-center justify-center gap-2 mb-8">
              <div className="flex items-center gap-2 px-5 py-2 rounded-full"
                style={{ background: 'rgba(255,107,53,0.1)', border: '2px solid rgba(255,107,53,0.25)' }}>
                <span style={{ color: 'var(--orange)', fontSize: '0.8rem' }}>◈</span>
                <span className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: 'rgba(255,107,53,0.8)', fontFamily: F_MONO, letterSpacing: '0.25em', fontSize: '0.7rem' }}>
                  Bienvenido de nuevo
                </span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e5a0',
                  boxShadow: '0 0 10px #00e5a0', display: 'inline-block', animation: 'pulse 2s infinite' }}/>
              </div>
            </div>

            <h1 className="hero-title font-black leading-none mb-6"
              style={{ fontFamily: F_BE, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.02em' }}>
              <span style={{ background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ATHERNIX
              </span>
            </h1>

            <p className="hero-sub text-base max-w-2xl mx-auto mb-8 leading-relaxed"
              style={{ color: 'rgba(200,160,140,0.7)', fontFamily: F_MONO, letterSpacing: '0.04em', fontSize: '1rem' }}>
              Tu plataforma de aprendizaje VR inmersivo. Explora, aprende y evoluciona con Ather IA.
            </p>
          </div>

          {/* ── USER STATS ── */}
          {userStats && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
              <StatBadge icon={<IconCalendar />} value={userStats.activeDays.toString()} label="Días Activos" color="var(--orange)" />
              <StatBadge icon={<IconZap />} value={userStats.totalXP.toString()} label="XP Total" color="#00E5A0" />
              <StatBadge icon={<IconTrophy />} value={userStats.level.toString()} label="Nivel" color="var(--yellow)" />
              <StatBadge icon="🎯" value={userStats.missionsCompleted.toString()} label="Misiones" color="var(--pink)" />
              <StatBadge icon="📚" value={userStats.topicsExplored.toString()} label="Temas" color="var(--orange)" />
              <StatBadge icon="⏱️" value={`${userStats.hoursSpent}h`} label="Horas" color="#00E5A0" />
            </div>
          )}

          {/* ── MAIN GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

            {/* ── BRAIN MAP (3D Achievements) ── */}
            <div className="lg:col-span-2">
              <div className="section-hdr flex items-center gap-3 mb-6">
                <span style={{ color: 'var(--orange)', fontSize: '1.2rem' }}>🧠</span>
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
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
                {Object.entries(ACHIEVEMENT_CATEGORIES).map(([key, cat]) => (
                  <div key={key} className="rounded-xl p-4 border"
                    style={{ background: 'rgba(18,8,22,0.7)', borderColor: 'rgba(255,107,53,0.15)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span style={{ color: cat.color, fontSize: '1.2rem' }}>{cat.icon}</span>
                      <span className="text-xs font-bold" style={{ color: cat.color, fontFamily: F_MONO }}>
                        {cat.label}
                      </span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_MONO }}>
                      {achievements.filter(a => a.category === key && a.unlocked).length} desbloqueados
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── QUICK ACTIONS ── */}
            <div>
              <div className="section-hdr flex items-center gap-3 mb-6">
                <span style={{ color: 'var(--orange)', fontSize: '1.2rem' }}>⚡</span>
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_BE, color: '#ede0d4', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
                  ACCIONES RÁPIDAS
                </h2>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }}/>
              </div>

              <div className="flex flex-col gap-5">
                <QuickActionCard
                  icon={<IconBot />}
                  title="Ather IA"
                  desc="Chatbot inteligente"
                  href="/chatbot"
                  color="#00E5A0"
                  glow="rgba(0,229,160,0.3)"
                />
                <QuickActionCard
                  icon={<IconHeadset />}
                  title="Headsets"
                  desc="Configurar dispositivo VR"
                  href="/headsets"
                  color="var(--orange)"
                  glow="rgba(255,107,53,0.3)"
                />
                <QuickActionCard
                  icon={<IconMap />}
                  title="Desarrollo"
                  desc="Temarios STEM"
                  href="/development"
                  color="var(--pink)"
                  glow="rgba(255,0,110,0.3)"
                />
              </div>

              {/* XP Progress */}
              {userStats && (
                <div className="mt-5 rounded-2xl border p-5"
                  style={{ background: 'rgba(18,8,22,0.7)', borderColor: 'rgba(255,107,53,0.15)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold" style={{ color: 'rgba(255,107,53,0.7)', fontFamily: F_MONO, letterSpacing: '0.15em' }}>
                      PROGRESO NIVEL {userStats.level}
                    </span>
                    <span className="text-xs font-bold" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_MONO }}>
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

          {/* ── STEM NEWS ── */}
          <div className="mb-12">
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