// app/missions/page.tsx - VR Missions Page
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { 
  ScrollTrigger 
} from 'gsap/ScrollTrigger';
import { 
  BookOpen, 
  Map, 
  Brain, 
  Play, 
  Clock, 
  Star, 
  Lock, 
  CheckCircle,
  ArrowRight,
  X,
  ChevronRight,
  User,
  Package,
  Navigation,
  Sparkles
} from 'lucide-react';
import { useMissionsController } from '@/controllers/missions/missionsController';
import { MissionType, missionTypeMeta } from '@/models/missions';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Design tokens (estética módulos) ────────────────────────
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif";
const F_MONO = "'Plus Jakarta Sans', monospace";

const C_PINK = '#FF006E';
const C_ORANGE = '#FF6B00';
const C_YELLOW = '#FFD700';
const C_GREEN = '#00E5A0';

// ── Category Card Component ─────────────────────────────────
function CategoryCard({ 
  type, 
  label, 
  color, 
  icon: Icon, 
  description, 
  count, 
  isSelected, 
  onClick 
}: { 
  type: MissionType; 
  label: string; 
  color: string; 
  icon: React.ElementType; 
  description: string; 
  count: number; 
  isSelected: boolean; 
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={ref}
      onClick={onClick}
      className="category-card cursor-pointer rounded-2xl border p-6 transition-all duration-300"
      style={{
        background: isSelected ? `${color}15` : 'rgba(18,8,22,0.9)',
        borderColor: isSelected ? `${color}60` : 'rgba(255,107,53,0.2)',
        boxShadow: isSelected ? `0 0 30px ${color}25` : '0 8px 32px rgba(0,0,0,0.5)',
      }}
      onMouseEnter={e => {
        if (!isSelected) {
          gsap.to(ref.current, { y: -4, duration: 0.2, ease: 'power2.out' });
          e.currentTarget.style.borderColor = `${color}40`;
        }
      }}
      onMouseLeave={e => {
        if (!isSelected) {
          gsap.to(ref.current, { y: 0, duration: 0.2, ease: 'power2.out' });
          e.currentTarget.style.borderColor = 'rgba(255,107,53,0.2)';
        }
      }}
    >
      <div className="flex items-start gap-4">
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}20`, border: `1px solid ${color}50` }}
        >
          <Icon size={28} style={{ color }} />
        </div>
        <div className="flex-1">
          <h3 
            className="font-black text-lg mb-1"
            style={{ fontFamily: F_BE, color: '#e8d5c8', letterSpacing: '0.02em' }}
          >
            {label}
          </h3>
          <p 
            className="text-sm mb-3 leading-relaxed"
            style={{ color: 'rgba(200,160,140,0.6)', fontFamily: F_MONO }}
          >
            {description}
          </p>
          <div className="flex items-center gap-2">
            <span 
              className="text-xs font-bold px-2 py-1 rounded-full"
              style={{ 
                background: `${color}15`, 
                color, 
                fontFamily: F_MONO,
                border: `1px solid ${color}30`
              }}
            >
              {count} misiones
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mission Card Component ───────────────────────────────────
function MissionCard({ 
  mission, 
  onStart, 
  onView 
}: { 
  mission: any; 
  onStart: (id: string) => void; 
  onView: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const meta = missionTypeMeta[mission.type];
  
  const isLocked = mission.status === 'locked';
  const isCompleted = mission.status === 'completed';
  const isInProgress = mission.status === 'in_progress';
  
  return (
    <div 
      ref={ref}
      className="mission-card rounded-2xl border overflow-hidden transition-all duration-300"
      style={{
        background: 'rgba(18,8,22,0.9)',
        borderColor: isLocked 
          ? 'rgba(255,255,255,0.1)' 
          : isInProgress 
            ? `${meta.color}60` 
            : 'rgba(255,107,53,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        opacity: isLocked ? 0.6 : 1,
      }}
      onMouseEnter={e => {
        if (!isLocked) {
          gsap.to(ref.current, { y: -6, duration: 0.25, ease: 'power2.out' });
          e.currentTarget.style.borderColor = `${meta.color}60`;
          e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.6), 0 0 30px ${meta.color}20`;
        }
      }}
      onMouseLeave={e => {
        if (!isLocked) {
          gsap.to(ref.current, { y: 0, duration: 0.25, ease: 'power2.out' });
          e.currentTarget.style.borderColor = isInProgress 
            ? `${meta.color}60` 
            : 'rgba(255,107,53,0.2)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
        }
      }}
    >
      {/* Mission Image Placeholder */}
      <div 
        className="relative h-48 w-full"
        style={{ 
          background: `linear-gradient(135deg,${meta.color}20,${meta.color}05)`,
          border: `1px solid ${meta.color}20`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: `${meta.color}15`, border: `2px dashed ${meta.color}30` }}
          >
            <Sparkles size={40} style={{ color: meta.color }} />
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          {isLocked && (
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
            >
              <Lock size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />
              <span 
                className="text-xs font-bold"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: F_MONO }}
              >
                BLOQUEADO
              </span>
            </div>
          )}
          {isCompleted && (
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: `${C_GREEN}20`, backdropFilter: 'blur(10px)' }}
            >
              <CheckCircle size={14} style={{ color: C_GREEN }} />
              <span 
                className="text-xs font-bold"
                style={{ color: C_GREEN, fontFamily: F_MONO }}
              >
                COMPLETADO
              </span>
            </div>
          )}
          {isInProgress && (
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: `${meta.color}20`, backdropFilter: 'blur(10px)' }}
            >
              <Play size={14} style={{ color: meta.color }} />
              <span 
                className="text-xs font-bold"
                style={{ color: meta.color, fontFamily: F_MONO }}
              >
                EN PROGRESO
              </span>
            </div>
          )}
        </div>
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: `${meta.color}20`, backdropFilter: 'blur(10px)' }}
          >
            <span style={{ fontSize: '1rem' }}>{meta.icon}</span>
            <span 
              className="text-xs font-bold"
              style={{ color: meta.color, fontFamily: F_MONO }}
            >
              {meta.label}
            </span>
          </div>
        </div>
      </div>
      
      {/* Mission Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 
            className="font-black text-xl"
            style={{ fontFamily: F_BE, color: '#e8d5c8', letterSpacing: '0.02em' }}
          >
            {mission.title}
          </h3>
          <div 
            className="flex items-center gap-1 px-2 py-1 rounded-lg"
            style={{ background: `${meta.color}10` }}
          >
            <Star size={14} style={{ color: meta.color }} />
            <span 
              className="text-xs font-bold"
              style={{ color: meta.color, fontFamily: F_MONO }}
            >
              {mission.totalXP} XP
            </span>
          </div>
        </div>
        
        <p 
          className="text-sm mb-4 leading-relaxed"
          style={{ color: 'rgba(200,160,140,0.6)', fontFamily: F_MONO }}
        >
          {mission.description}
        </p>
        
        {/* Progress Bar */}
        {!isLocked && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span 
                className="text-xs font-bold"
                style={{ color: 'rgba(200,160,140,0.5)', fontFamily: F_MONO }}
              >
                PROGRESO
              </span>
              <span 
                className="text-xs font-bold"
                style={{ color: meta.color, fontFamily: F_MONO }}
              >
                {mission.progress}%
              </span>
            </div>
            <div 
              className="h-2 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <div 
                className="progress-bar-fill h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${mission.progress}%`,
                  background: `linear-gradient(90deg,${meta.color},${meta.color}80)`,
                }}
              />
            </div>
          </div>
        )}
        
        {/* Mission Details */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock size={14} style={{ color: 'rgba(200,160,140,0.5)' }} />
            <span 
              className="text-xs"
              style={{ color: 'rgba(200,160,140,0.5)', fontFamily: F_MONO }}
            >
              {mission.estimatedTime}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Package size={14} style={{ color: 'rgba(200,160,140,0.5)' }} />
            <span 
              className="text-xs"
              style={{ color: 'rgba(200,160,140,0.5)', fontFamily: F_MONO }}
            >
              {mission.subMissions.length} subtareas
            </span>
          </div>
          <div 
            className="flex items-center gap-1.5"
            style={{ color: mission.difficulty === 'easy' ? C_GREEN : mission.difficulty === 'medium' ? C_YELLOW : C_PINK }}
          >
            <Sparkles size={14} />
            <span 
              className="text-xs font-bold"
              style={{ fontFamily: F_MONO }}
            >
              {mission.difficulty === 'easy' ? 'Fácil' : mission.difficulty === 'medium' ? 'Medio' : 'Difícil'}
            </span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          {isLocked ? (
            <button 
              className="flex-1 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-not-allowed"
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                color: 'rgba(255,255,255,0.3)', 
                fontFamily: F_MONO,
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <Lock size={14} className="inline mr-2" />
              Bloqueado
            </button>
          ) : isCompleted ? (
            <>
              <button 
                onClick={() => onView(mission.id)}
                className="flex-1 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200"
                style={{ 
                  background: `${meta.color}15`, 
                  color: meta.color, 
                  fontFamily: F_MONO,
                  border: `1px solid ${meta.color}40`
                }}
              >
                <CheckCircle size={14} className="inline mr-2" />
                Ver detalles
              </button>
              <button 
                onClick={() => onStart(mission.id)}
                className="px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200"
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  color: 'rgba(255,255,255,0.5)', 
                  fontFamily: F_MONO,
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                Repetir
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => onView(mission.id)}
                className="flex-1 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200"
                style={{ 
                  background: `${meta.color}15`, 
                  color: meta.color, 
                  fontFamily: F_MONO,
                  border: `1px solid ${meta.color}40`
                }}
              >
                <ArrowRight size={14} className="inline mr-2" />
                Ver detalles
              </button>
              <button 
                onClick={() => onStart(mission.id)}
                className="px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200"
                style={{ 
                  background: `linear-gradient(135deg,${meta.color},${meta.color}80)`, 
                  color: '#08040c', 
                  fontFamily: F_MONO
                }}
              >
                <Play size={14} className="inline mr-2" />
                Iniciar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Mission Detail Modal Component ───────────────────────────
function MissionDetailModal({ 
  mission, 
  onClose, 
  onStart, 
  onCompleteSub 
}: { 
  mission: any; 
  onClose: () => void; 
  onStart: () => void;
  onCompleteSub: (subId: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const meta = missionTypeMeta[mission.type];
  
  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, []);
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div 
        ref={ref}
        className="rounded-2xl border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        style={{ 
          background: 'rgba(18,8,22,0.95)', 
          borderColor: `${meta.color}30`,
          boxShadow: `0 0 50px ${meta.color}20`
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="p-6 border-b"
          style={{ borderColor: `${meta.color}20` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${meta.color}20`, border: `1px solid ${meta.color}50` }}
              >
                <span style={{ fontSize: '2rem' }}>{meta.icon}</span>
              </div>
              <div>
                <div 
                  className="text-xs font-bold mb-2"
                  style={{ color: meta.color, fontFamily: F_MONO }}
                >
                  {meta.label}
                </div>
                <h2 
                  className="font-black text-2xl mb-2"
                  style={{ fontFamily: F_BE, color: '#e8d5c8', letterSpacing: '0.02em' }}
                >
                  {mission.title}
                </h2>
                <p 
                  className="text-sm"
                  style={{ color: 'rgba(200,160,140,0.6)', fontFamily: F_MONO }}
                >
                  {mission.environment}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <X size={20} style={{ color: 'rgba(255,255,255,0.5)' }} />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span 
                className="text-xs font-bold"
                style={{ color: 'rgba(200,160,140,0.5)', fontFamily: F_MONO }}
              >
                PROGRESO GENERAL
              </span>
              <span 
                className="text-xs font-bold"
                style={{ color: meta.color, fontFamily: F_MONO }}
              >
                {mission.progress}%
              </span>
            </div>
            <div 
              className="h-3 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${mission.progress}%`,
                  background: `linear-gradient(90deg,${meta.color},${meta.color}80)`,
                }}
              />
            </div>
          </div>
          
          {/* Sub-missions */}
          <div className="space-y-3 mb-6">
            <h3 
              className="font-black text-lg"
              style={{ fontFamily: F_BE, color: '#e8d5c8', letterSpacing: '0.02em' }}
            >
              Subtareas
            </h3>
            {mission.subMissions.map((sub: any) => (
              <div 
                key={sub.id}
                className="rounded-xl border p-4 transition-all duration-200"
                style={{ 
                  background: sub.completed ? `${meta.color}10` : 'rgba(255,255,255,0.02)',
                  borderColor: sub.completed ? `${meta.color}40` : 'rgba(255,255,255,0.1)'
                }}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ 
                      background: sub.completed ? meta.color : 'rgba(255,255,255,0.1)',
                      border: sub.completed ? 'none' : `1px solid ${meta.color}30`
                    }}
                  >
                    {sub.completed ? (
                      <CheckCircle size={14} style={{ color: '#08040c' }} />
                    ) : (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: meta.color }} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 
                        className="font-bold text-sm"
                        style={{ 
                          color: sub.completed ? meta.color : '#e8d5c8',
                          fontFamily: F_MONO
                        }}
                      >
                        {sub.title}
                      </h4>
                      <span 
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ 
                          background: `${meta.color}15`, 
                          color: meta.color, 
                          fontFamily: F_MONO
                        }}
                      >
                        +{sub.xpReward} XP
                      </span>
                    </div>
                    <p 
                      className="text-xs mb-2"
                      style={{ color: 'rgba(200,160,140,0.5)', fontFamily: F_MONO }}
                    >
                      {sub.description}
                    </p>
                    <div className="flex items-center gap-3">
                      {sub.location && (
                        <div className="flex items-center gap-1">
                          <Navigation size={12} style={{ color: 'rgba(200,160,140,0.4)' }} />
                          <span 
                            className="text-xs"
                            style={{ color: 'rgba(200,160,140,0.4)', fontFamily: F_MONO }}
                          >
                            {sub.location}
                          </span>
                        </div>
                      )}
                      {sub.npcName && (
                        <div className="flex items-center gap-1">
                          <User size={12} style={{ color: 'rgba(200,160,140,0.4)' }} />
                          <span 
                            className="text-xs"
                            style={{ color: 'rgba(200,160,140,0.4)', fontFamily: F_MONO }}
                          >
                            {sub.npcName}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {!sub.completed && mission.status !== 'locked' && (
                    <button 
                      onClick={() => onCompleteSub(sub.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200"
                      style={{ 
                        background: `${meta.color}15`, 
                        color: meta.color, 
                        fontFamily: F_MONO,
                        border: `1px solid ${meta.color}30`
                      }}
                    >
                      Completar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Start Button */}
          {mission.status !== 'locked' && mission.status !== 'completed' && (
            <button 
              onClick={onStart}
              className="w-full py-4 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-200"
              style={{ 
                background: `linear-gradient(135deg,${meta.color},${meta.color}80)`, 
                color: '#08040c', 
                fontFamily: F_MONO
              }}
            >
              <Play size={16} className="inline mr-2" />
              Iniciar Misión
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN VIEW ─────────────────────────────────────────────────
export default function MissionsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    state,
    selectCategory,
    selectMission,
    startMission,
    completeSubMission,
    getFilteredMissions,
    getMissionStats,
  } = useMissionsController();
  
  const [showDetail, setShowDetail] = useState(false);
  
  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation with stagger
      gsap.fromTo('.mission-hero', 
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
      
      // Stats cards with creative entrance
      const missionStats = document.querySelector('.mission-stats');
      if (missionStats) {
        gsap.fromTo('.mission-stats > div',
          { opacity: 0, y: 30, rotateX: 10 },
          { 
            opacity: 1, 
            y: 0, 
            rotateX: 0, 
            duration: 0.6, 
            stagger: 0.1, 
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: '.mission-stats', start: 'top 85%' }
          }
        );
      }
      
      // Category cards with 3D effect
      gsap.fromTo('.category-card',
        { opacity: 0, y: 40, rotateY: -15 },
        { 
          opacity: 1, 
          y: 0, 
          rotateY: 0, 
          duration: 0.7, 
          stagger: 0.15, 
          ease: 'power3.out',
          scrollTrigger: { trigger: '.category-cards', start: 'top 90%' }
        }
      );
      
      // Mission cards with floating effect
      gsap.fromTo('.mission-card',
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'elastic.out(1, 0.8)',
          scrollTrigger: { trigger: '.mission-cards', start: 'top 90%' }
        }
      );
      
      // Continuous floating animation for mission cards
      gsap.to('.mission-card', {
        y: -5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2
      });
      
      // Progress bar animations
      gsap.fromTo('.progress-bar-fill',
        { width: 0 },
        { 
          width: (i) => i * 100 + '%',
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.mission-cards', start: 'top 80%' }
        }
      );
      
    }, containerRef);
    
    return () => ctx.revert();
  }, [state.selectedCategory]);
  
  const stats = getMissionStats();
  const filteredMissions = getFilteredMissions();
  
  const handleStartMission = (missionId: string) => {
    startMission(missionId);
    // Here you would navigate to the VR experience
    console.log('Starting mission:', missionId);
  };
  
  const handleViewMission = (missionId: string) => {
    selectMission(missionId);
    setShowDetail(true);
  };
  
  const handleCompleteSub = (subId: string) => {
    if (state.selectedMission) {
      completeSubMission(state.selectedMission.id, subId);
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="min-h-screen"
      style={{ 
        background: 'linear-gradient(180deg, #0a0508 0%, #120816 100%)',
        paddingTop: '100px'
      }}
    >
      {/* Background Orbs */}
      <div 
        className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle,rgba(255,0,110,0.08) 0%,transparent 70%)',
          transform: 'translate(30%,-30%)'
        }}
      />
      <div 
        className="fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle,rgba(0,229,160,0.06) 0%,transparent 70%)',
          transform: 'translate(-30%,30%)'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className="mission-hero mb-12">
          <Link 
            href="/home"
            className="inline-flex items-center gap-2 text-sm mb-6 transition-all duration-200"
            style={{ color: 'rgba(200,160,140,0.5)', fontFamily: F_MONO }}
          >
            <ArrowRight size={14} className="rotate-180" />
            Volver al inicio
          </Link>
          
          <h1 
            className="font-black text-5xl md:text-6xl mb-4"
            style={{ 
              fontFamily: F_BE, 
              color: '#e8d5c8', 
              letterSpacing: '0.02em',
              background: 'linear-gradient(90deg, #FF006E, #FF6B00, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            MISIONES VR
          </h1>
          
          <p 
            className="text-lg max-w-2xl mb-8 leading-relaxed"
            style={{ color: 'rgba(200,160,140,0.6)', fontFamily: F_MONO }}
          >
            Explora mundos virtuales, viaja a través del tiempo y desarrolla tu mente con experiencias inmersivas.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              className="rounded-xl border p-4"
              style={{ 
                background: 'rgba(18,8,22,0.9)', 
                borderColor: 'rgba(255,107,53,0.2)' 
              }}
            >
              <div className="text-2xl font-black mb-1" style={{ fontFamily: F_BE, color: C_ORANGE }}>
                {stats.total}
              </div>
              <div className="text-xs" style={{ color: 'rgba(200,160,140,0.5)', fontFamily: F_MONO }}>
                Total misiones
              </div>
            </div>
            <div 
              className="rounded-xl border p-4"
              style={{ 
                background: 'rgba(18,8,22,0.9)', 
                borderColor: 'rgba(0,229,160,0.2)' 
              }}
            >
              <div className="text-2xl font-black mb-1" style={{ fontFamily: F_BE, color: C_GREEN }}>
                {stats.completed}
              </div>
              <div className="text-xs" style={{ color: 'rgba(200,160,140,0.5)', fontFamily: F_MONO }}>
                Completadas
              </div>
            </div>
            <div 
              className="rounded-xl border p-4"
              style={{ 
                background: 'rgba(18,8,22,0.9)', 
                borderColor: 'rgba(255,215,0,0.2)' 
              }}
            >
              <div className="text-2xl font-black mb-1" style={{ fontFamily: F_BE, color: C_YELLOW }}>
                {stats.inProgress}
              </div>
              <div className="text-xs" style={{ color: 'rgba(200,160,140,0.5)', fontFamily: F_MONO }}>
                En progreso
              </div>
            </div>
            <div 
              className="rounded-xl border p-4"
              style={{ 
                background: 'rgba(18,8,22,0.9)', 
                borderColor: 'rgba(255,0,110,0.2)' 
              }}
            >
              <div className="text-2xl font-black mb-1" style={{ fontFamily: F_BE, color: C_PINK }}>
                {stats.totalXP}
              </div>
              <div className="text-xs" style={{ color: 'rgba(200,160,140,0.5)', fontFamily: F_MONO }}>
                XP ganado
              </div>
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div className="category-cards mb-12">
          <h2 
            className="font-black text-2xl mb-6"
            style={{ fontFamily: F_BE, color: '#e8d5c8', letterSpacing: '0.02em' }}
          >
            Categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CategoryCard
              type="history"
              label="Historia"
              color={C_YELLOW}
              icon={BookOpen}
              description={missionTypeMeta.history.description}
              count={3}
              isSelected={state.selectedCategory === 'history'}
              onClick={() => selectCategory('history')}
            />
            <CategoryCard
              type="tourism"
              label="Turismo"
              color={C_GREEN}
              icon={Map}
              description={missionTypeMeta.tourism.description}
              count={3}
              isSelected={state.selectedCategory === 'tourism'}
              onClick={() => selectCategory('tourism')}
            />
            <CategoryCard
              type="brain"
              label="Mente"
              color={C_PINK}
              icon={Brain}
              description={missionTypeMeta.brain.description}
              count={3}
              isSelected={state.selectedCategory === 'brain'}
              onClick={() => selectCategory('brain')}
            />
          </div>
        </div>
        
        {/* Missions Grid */}
        <div className="mission-cards">
          <div className="flex items-center justify-between mb-6">
            <h2 
              className="font-black text-2xl"
              style={{ fontFamily: F_BE, color: '#e8d5c8', letterSpacing: '0.02em' }}
            >
              {state.selectedCategory === 'all' ? 'Todas las Misiones' : missionTypeMeta[state.selectedCategory].label}
            </h2>
            {state.selectedCategory !== 'all' && (
              <button 
                onClick={() => selectCategory('all')}
                className="text-sm font-bold transition-all duration-200"
                style={{ color: C_ORANGE, fontFamily: F_MONO }}
              >
                Ver todas
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMissions.map(mission => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onStart={handleStartMission}
                onView={handleViewMission}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Detail Modal */}
      {showDetail && state.selectedMission && (
        <MissionDetailModal
          mission={state.selectedMission}
          onClose={() => setShowDetail(false)}
          onStart={() => {
            handleStartMission(state.selectedMission!.id);
            setShowDetail(false);
          }}
          onCompleteSub={handleCompleteSub}
        />
      )}
    </div>
  );
}
