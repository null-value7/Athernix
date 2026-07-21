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

// ── Design tokens ──────────────────────────────────────────────
const F_ORB = "'Orbitron', sans-serif"
const F_RAJ = "'Rajdhani', sans-serif"

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
      className="stat-badge flex flex-col items-center gap-1 px-4 py-3 rounded-2xl border cursor-default transition-all duration-300"
      style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(180,60,40,0.2)' }}
      onMouseEnter={e => {
        gsap.to(ref.current, { y: -3, duration: 0.2, ease: 'power2.out' });
        e.currentTarget.style.borderColor = color + '55';
        e.currentTarget.style.boxShadow = `0 0 20px ${color}20`;
      }}
      onMouseLeave={e => {
        gsap.to(ref.current, { y: 0, duration: 0.2, ease: 'power2.out' });
        e.currentTarget.style.borderColor = 'rgba(180,60,40,0.2)';
        e.currentTarget.style.boxShadow = 'none';
      }}>
      <span style={{ fontSize: '1.1rem', color, filter: `drop-shadow(0 0 5px ${color})` }}>{icon}</span>
      <span className="text-xl font-black" style={{ fontFamily: F_ORB, color, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>{value}</span>
      <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_RAJ, fontSize: '0.58rem', letterSpacing: '0.15em' }}>{label}</span>
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
      style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(180,60,40,0.2)', padding: '1.1rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)', textDecoration: 'none' }}
      onMouseEnter={e => {
        gsap.to(ref.current, { y: -4, duration: 0.25, ease: 'power2.out' });
        e.currentTarget.style.borderColor = color + '55';
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.6), 0 0 28px ${glow}`;
      }}
      onMouseLeave={e => {
        gsap.to(ref.current, { y: 0, duration: 0.25, ease: 'power2.out' });
        e.currentTarget.style.borderColor = 'rgba(180,60,40,0.2)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
      }}>
      <div className="absolute top-0 right-0 w-16 h-16 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle,${glow} 0%,transparent 70%)`, filter: 'blur(18px)', transform: 'translate(30%,-30%)' }}/>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-2.5"
        style={{ background: `${color}18`, border: `1px solid ${color}40`, color, filter: `drop-shadow(0 0 5px ${color})` }}>
        {icon}
      </div>
      <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: `${color}aa`, fontFamily: F_RAJ, fontSize: '0.6rem', letterSpacing: '0.18em' }}>{title}</p>
      <h4 className="font-black text-sm mb-1.5" style={{ fontFamily: F_ORB, color: '#e8d5c8', fontSize: '0.78rem', letterSpacing: '0.04em' }}>{desc}</h4>
      <div className="mt-3 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase" style={{ color, fontFamily: F_RAJ }}>
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
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
      `}</style>

      <div ref={containerRef} className="relative min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(135deg,#08040c 0%,#120818 50%,#08040c 100%)', fontFamily: F_RAJ }}>

        {/* Ambient orbs */}
        <div className="orb-home1 fixed pointer-events-none rounded-full"
          style={{ width: 600, height: 600, top: '-10%', right: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(180,30,30,0.15) 0%,transparent 70%)', filter: 'blur(60px)' }}/>
        <div className="orb-home2 fixed pointer-events-none rounded-full"
          style={{ width: 500, height: 500, bottom: '5%', left: '-8%', zIndex: 0,
            background: 'radial-gradient(circle,rgba(130,40,200,0.12) 0%,transparent 70%)', filter: 'blur(70px)' }}/>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

          {/* ── HERO ── */}
          <div className="text-center mb-12">
            <div className="hero-badge flex items-center justify-center gap-2 mb-6">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full"
                style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}>
                <span style={{ color: '#ff6b35', fontSize: '0.7rem' }}>◈</span>
                <span className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: 'rgba(255,120,70,0.7)', fontFamily: F_RAJ, letterSpacing: '0.25em', fontSize: '0.62rem' }}>
                  Bienvenido de nuevo
                </span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e5a0',
                  boxShadow: '0 0 8px #00e5a0', display: 'inline-block', animation: 'pulse 2s infinite' }}/>
              </div>
            </div>

            <h1 className="hero-title font-black leading-none mb-4"
              style={{ fontFamily: F_ORB, fontSize: 'clamp(2.2rem, 6vw, 4rem)', letterSpacing: '-0.02em' }}>
              <span style={{ background: 'linear-gradient(90deg,#ff6b35,#f7c59f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ATHERNIX
              </span>
            </h1>

            <p className="hero-sub text-base max-w-xl mx-auto mb-6 leading-relaxed"
              style={{ color: 'rgba(200,160,140,0.65)', fontFamily: F_RAJ, letterSpacing: '0.04em', fontSize: '0.9rem' }}>
              Tu plataforma de aprendizaje VR inmersivo. Explora, aprende y evoluciona con Ather IA.
            </p>
          </div>

          {/* ── USER STATS ── */}
          {userStats && (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-12">
              <StatBadge icon={<IconCalendar />} value={userStats.activeDays.toString()} label="Días Activos" color="#FF6B00" />
              <StatBadge icon={<IconZap />} value={userStats.totalXP.toString()} label="XP Total" color="#00E5A0" />
              <StatBadge icon={<IconTrophy />} value={userStats.level.toString()} label="Nivel" color="#FFD700" />
              <StatBadge icon="🎯" value={userStats.missionsCompleted.toString()} label="Misiones" color="#FF006E" />
              <StatBadge icon="📚" value={userStats.topicsExplored.toString()} label="Temas" color="#FF6B00" />
              <StatBadge icon="⏱️" value={`${userStats.hoursSpent}h`} label="Horas" color="#00E5A0" />
            </div>
          )}

          {/* ── MAIN GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

            {/* ── BRAIN MAP (3D Achievements) ── */}
            <div className="lg:col-span-2">
              <div className="section-hdr flex items-center gap-3 mb-5">
                <span style={{ color: '#FF6B00' }}>🧠</span>
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.2em' }}>
                  Mapa Cerebral
                </h2>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }}/>
                <span className="text-xs" style={{ color: 'rgba(200,150,120,0.35)', fontFamily: F_RAJ, fontSize: '0.62rem' }}>
                  {achievements.filter(a => a.unlocked).length}/{achievements.length} desbloqueados
                </span>
              </div>

              <div className="rounded-2xl border overflow-hidden"
                style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(180,60,40,0.2)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
                <BrainMap3D achievements={achievements} />
              </div>

              {/* Achievement Categories */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {Object.entries(ACHIEVEMENT_CATEGORIES).map(([key, cat]) => (
                  <div key={key} className="rounded-xl p-3 border"
                    style={{ background: 'rgba(18,8,22,0.7)', borderColor: 'rgba(180,60,40,0.15)' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ color: cat.color, fontSize: '1rem' }}>{cat.icon}</span>
                      <span className="text-xs font-bold" style={{ color: cat.color, fontFamily: F_RAJ }}>
                        {cat.label}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_RAJ }}>
                      {achievements.filter(a => a.category === key && a.unlocked).length} desbloqueados
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── QUICK ACTIONS ── */}
            <div>
              <div className="section-hdr flex items-center gap-3 mb-5">
                <span style={{ color: '#FF6B00' }}>⚡</span>
                <h2 className="font-black tracking-widest uppercase"
                  style={{ fontFamily: F_ORB, color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.2em' }}>
                  Acciones Rápidas
                </h2>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }}/>
              </div>

              <div className="flex flex-col gap-4">
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
                  color="#FF6B00"
                  glow="rgba(255,107,53,0.3)"
                />
                <QuickActionCard
                  icon={<IconMap />}
                  title="Desarrollo"
                  desc="Temarios STEM"
                  href="/development"
                  color="#FF006E"
                  glow="rgba(255,0,110,0.3)"
                />
              </div>

              {/* XP Progress */}
              {userStats && (
                <div className="mt-4 rounded-2xl border p-4"
                  style={{ background: 'rgba(18,8,22,0.7)', borderColor: 'rgba(180,60,40,0.15)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold" style={{ color: 'rgba(255,120,70,0.6)', fontFamily: F_RAJ, letterSpacing: '0.15em' }}>
                      PROGRESO NIVEL {userStats.level}
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(200,150,120,0.5)', fontFamily: F_RAJ }}>
                      {xpToNextLevel} XP para siguiente nivel
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden"
                    style={{ background: 'rgba(180,60,40,0.2)' }}>
                    <div className="h-full transition-all duration-500"
                      style={{ 
                        width: `${((userStats.totalXP % 100) / 100) * 100}%`,
                        background: 'linear-gradient(90deg,#FF6B00,#FFD700)',
                        boxShadow: '0 0 10px rgba(255,107,53,0.5)'
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
          <div className="text-center mt-14">
            <p className="text-xs tracking-widest uppercase"
              style={{ color: 'rgba(255,100,50,0.18)', fontFamily: F_RAJ, letterSpacing: '0.4em' }}>
              ✦ athernix · home · v3.0 ✦
            </p>
          </div>
        </div>
      </div>
    </>
  );
}