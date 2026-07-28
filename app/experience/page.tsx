// @ts-nocheck
'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { Eye, Cpu, Globe, Brain, Zap, Shield, Sparkles, ChevronDown } from 'lucide-react';
import Spotlight from '@/components/ui/Spotlight';
import DisplayCards from '@/components/ui/DisplayCards';
import { ContainerScroll } from '@/components/ui/ContainerScroll';
import ExpandableTabs from '@/components/ui/ExpandableTabs';
import ExperienceShaderBackground from '@/components/ui/ExperienceShaderBackground';
import SectionWithMockup from '@/components/ui/SectionWithMockup';
import { SmokeBackground } from '@/components/ui/spooky-smoke-animation';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextSplitter from '@/components/ui/TextSplitter';
import MagneticElement from '@/components/ui/MagneticElement';
import ParallaxLayer from '@/components/ui/ParallaxLayer';
import AwardWinning3D from '@/components/ui/AwardWinning3D';
import LiquidGlassCard from '@/components/ui/LiquidGlassCard';
import '../styles/experience.css';

/* Dynamic import for FbxViewer — SSR disabled since it needs WebGL */
const FbxViewer = dynamic(() => import('@/components/ui/FbxViewer'), {
  ssr: false,
  loading: () => (
    <div className="fbx-loader">
      <div className="fbx-loader-spinner" />
      <span className="fbx-loader-text mono">CARGANDO MODELO 3D...</span>
    </div>
  ),
});

/* ── Replaced custom Reveal with ScrollReveal ── */

/* ── Feature data ── */
const features = [
  {
    icon: '🏛️',
    num: '01',
    name: 'HISTORIA VIVA VR',
    desc: 'Recorre Joya de Cerén y otros sitios patrimonio con gemelos digitales hiperrealistas. 50,247 puntos de datos escaneados con LiDAR.',
  },
  {
    icon: '🌍',
    num: '02',
    name: 'SVIRTUAL TOURS',
    desc: 'Turismo inmersivo con guías IA en tiempo real. Recorridos 360° disponibles 24/7 desde cualquier dispositivo.',
  },
  {
    icon: '🧠',
    num: '03',
    name: 'MENTELIBRE VR',
    desc: 'Terapia de exposición gradual con biofeedback. Reducción de ansiedad del 95% con coherencia neural del 98%.',
  },
];

/* ── Stats data ── */
const stats = [
  { num: '50,247', label: 'PUNTOS DE DATOS' },
  { num: '98%', label: 'COHERENCIA NEURAL' },
  { num: '3', label: 'MÓDULOS ACTIVOS' },
  { num: '24/7', label: 'DISPONIBILIDAD' },
];

/* ── Tab items ── */
const tabs = [
  { title: 'Experiencia', icon: Eye },
  { title: 'Tecnología', icon: Cpu },
  { type: 'separator' },
  { title: 'Módulos', icon: Globe },
  { title: 'Neural', icon: Brain },
  { title: 'Seguridad', icon: Shield },
];

/* ── Marquee items ── */
const marqueeItems = [
  'ATHERNIX', '◆', 'REALIDAD VIRTUAL', '◆', 'INTELIGENCIA ARTIFICIAL', '◆',
  'EL SALVADOR', '◆', 'EDUCACIÓN INMERSIVA', '◆', 'BIOFEEDBACK', '◆',
  'TURISMO DIGITAL', '◆', 'JOYA DE CERÉN', '◆',
];

export default function ExperienciaPage() {
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gsap) return;

    const initAnimations = () => {
      if (!window.gsap || !window.ScrollTrigger) {
        setTimeout(initAnimations, 50);
        return;
      }

      window.gsap.registerPlugin(window.ScrollTrigger);

      // Enhanced scroll animations with liquid glass cards
      window.gsap.utils.toArray('.exp-feature-card').forEach((card, i) => {
        window.gsap.fromTo(card, 
          { y: 80, opacity: 0, scale: 0.95, rotationX: 10 },
          {
            y: 0, opacity: 1, scale: 1, rotationX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: i * 0.12
          }
        );
      });

      // Enhanced stats counter animation
      window.gsap.utils.toArray('.exp-stat').forEach((stat, i) => {
        window.gsap.fromTo(stat,
          { scale: 0.7, opacity: 0, rotationY: 20 },
          {
            scale: 1, opacity: 1, rotationY: 0,
            duration: 0.9,
            ease: 'elastic.out(1, 0.8)',
            scrollTrigger: {
              trigger: stat,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            },
            delay: i * 0.18
          }
        );
      });

      // Parallax for hero elements
      window.gsap.to('.exp-hero-content', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: '.exp-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
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
    <div className="experiencia-page relative">
      {/* ═══ AWARD-WINNING 3D BACKGROUND ═══ */}
      <AwardWinning3D 
        containerId="experience-3d-bg"
        variant="wave"
        colors={{ primary: '#FF006E', secondary: '#FF6B00', tertiary: '#FFD700' }}
        intensity={1.5}
        interactive={true}
      />

      {/* ═══ SHADER BACKGROUND ═══ */}
      <div className="exp-shader-bg-wrapper relative z-10">
        <ExperienceShaderBackground />
      </div>

      {/* ═══ HERO ═══ */}
      <section className="exp-hero relative z-10" id="exp-hero">
        {/* Spotlight overlay */}
        <Spotlight className="spotlight-svg" style={{ top: '-40%', left: 0 }} fill="#FF6B00" />
        <Spotlight className="spotlight-svg" style={{ top: '-20%', right: 0, transform: 'scaleX(-1)' }} fill="#FF006E" />

        <div className="exp-hero-content">
          {/* Left text */}
          <div className="exp-hero-text">
            <p className="exp-hero-eyebrow mono">ATHERNIX / EXPERIENCIA INMERSIVA / 2026</p>
            <h1 className="exp-hero-title">
              <TextSplitter text="EXPERIENCIA" effect="cascade" as="span" />
              <br />
              <TextSplitter text="INMERSIVA" effect="cascade" as="span" />
            </h1>
            <p className="exp-hero-desc">
              Sumérgete en el ecosistema Athernix. Explora nuestro modelo 3D interactivo
              y descubre cómo la realidad virtual e inteligencia artificial transforman
              la educación, el turismo y el bienestar en El Salvador.
            </p>
            <div className="exp-hero-badges">
              <span className="exp-badge">
                <span className="exp-badge-dot" style={{ background: '#FF006E' }} /> VR ACTIVO
              </span>
              <span className="exp-badge">
                <span className="exp-badge-dot" style={{ background: '#FF6B00' }} /> IA ONLINE
              </span>
              <span className="exp-badge">
                <span className="exp-badge-dot" style={{ background: '#FFD700' }} /> 3D RENDER
              </span>
            </div>
            <div className="exp-hero-cta-group">
              <MagneticElement>
                <Link href="/modulos" className="atx-cta-pri">
                  EXPLORAR MÓDULOS
                </Link>
              </MagneticElement>
              <MagneticElement>
                <Link href="/registro" className="atx-cta-sec">
                  CREAR CUENTA
                </Link>
              </MagneticElement>
            </div>
          </div>

          {/* Right — 3D Model */}
          <div className="exp-hero-3d relative">
            <ParallaxLayer speed={0.05} direction="up" className="absolute inset-0 z-0">
               <div className="liquid-glass-subtle w-full h-full rounded-full blur-3xl opacity-20"></div>
            </ParallaxLayer>
            <FbxViewer
              modelUrl="/models/AthernixitoUnityVer.fbx"
              scale={0.02}
              position={[0, -2, 0]}
            />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="exp-scroll-hint">
          <div className="exp-scroll-line" />
          <span className="exp-scroll-label mono">SCROLL</span>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="exp-marquee relative z-10">
        <div className="exp-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="exp-marquee-item">
              {item === '◆' ? <span>{item}</span> : item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ SECTION WITH MOCKUP ═══ */}
      <SectionWithMockup
        title={
          <div className="text-center">
            <TextSplitter text="INTELIGENCIA," effect="cascade" as="span" /><br />
            <TextSplitter text="ENTREGADA A TI." effect="cascade" as="span" />
          </div>
        }
        description={
          <>
            Obtén un resumen personalizado cada lunes por la mañana
            <br />
            directamente en tu bandeja de entrada, creado por tu analista
            <br />
            virtual personal, destacando historias esenciales de la
            <br />
            lista de seguimiento y ganancias para la semana ahead.
          </>
        }
        reverseLayout={false}
      />

      {/* ═══ CONTAINER SCROLL WITH 3D ═══ */}
      <ContainerScroll
        titleComponent={
          <>
            <p className="exp-section-label mono">[ MODELO_3D_INTERACTIVO ]</p>
            <h2 className="exp-section-title" style={{ marginBottom: 0 }}>
              VISUALIZA EL<br />
              <span>ECOSISTEMA</span>
            </h2>
          </>
        }
      >
        <div className="relative w-full h-full">
          <SmokeBackground smokeColor="#FF6B00" />
          <FbxViewer
            modelUrl="/models/AthernixitoUnityVer.fbx"
            scale={0.015}
            position={[0, -1.5, 0]}
            showControls={true}
            showParticles={false}
            className="container-scroll-fbx absolute inset-0"
          />
        </div>
      </ContainerScroll>

      <div className="section-divider line-gradient-animated relative z-10" />

      {/* ═══ DISPLAY CARDS + INFO ═══ */}
      <section className="exp-cards-section relative z-10" id="exp-modules">
        <div className="exp-cards-row">
          <div className="exp-cards-info">
            <ScrollReveal effect="slideRight">
              <p className="exp-section-label mono">[ MÓDULOS_DEL_ECOSISTEMA ]</p>
              <h2>
                <TextSplitter text="TRES EJES" effect="cascade" as="span" /><br />
                <span><TextSplitter text="DE IMPACTO" effect="cascade" as="span" /></span>
              </h2>
              <p>
                Cada módulo aborda una brecha crítica en El Salvador: educación pasiva,
                turismo subaprovechado y salud mental sin tecnología. Juntos, forman
                un ecosistema unificado de transformación digital.
              </p>
            </ScrollReveal>
          </div>
          <div className="exp-cards-visual">
            <ScrollReveal effect="slideLeft" delay={0.2}>
              <DisplayCards />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider line-gradient-animated relative z-10" />

      {/* ═══ FEATURES GRID ═══ */}
      <section className="exp-section relative z-10" id="exp-features">
        <ScrollReveal effect="fadeUp">
          <p className="exp-section-label mono">[ CAPACIDADES_CORE ]</p>
          <h2 className="exp-section-title">
            <TextSplitter text="TECNOLOGÍA" effect="cascade" as="span" /><br />
            <span><TextSplitter text="DE VANGUARDIA" effect="cascade" as="span" /></span>
          </h2>
        </ScrollReveal>
        <div className="exp-features">
          {features.map((feat, i) => (
            <ScrollReveal effect="scaleIn" key={feat.num} delay={i * 0.15}>
              <LiquidGlassCard 
                intensity="medium"
                glowColor="rgba(255, 107, 0, 0.35)"
                className="exp-feature-card"
              >
                <div className="exp-feature-icon float-medium">{feat.icon}</div>
                <p className="exp-feature-num mono">{feat.num}</p>
                <h3 className="exp-feature-name glow-text-orange">{feat.name}</h3>
                <p className="exp-feature-desc">{feat.desc}</p>
              </LiquidGlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <div className="section-divider line-gradient-animated relative z-10" />
      <div className="exp-stats relative z-10" id="exp-stats">
        {stats.map((stat, i) => (
          <ScrollReveal effect="fadeUp" key={stat.label} delay={i * 0.1}>
            <LiquidGlassCard 
              intensity="subtle"
              glowColor="rgba(255, 215, 0, 0.3)"
              className="exp-stat"
            >
              <div className="exp-stat-num">{stat.num}</div>
              <p className="exp-stat-label mono">{stat.label}</p>
            </LiquidGlassCard>
          </ScrollReveal>
        ))}
      </div>
      <div className="section-divider line-gradient-animated relative z-10" />

      {/* ═══ CTA ═══ */}
      <section className="exp-cta relative z-10">
        <ScrollReveal effect="scaleIn">
          <p className="exp-section-label mono text-shimmer" style={{ textAlign: 'center' }}>
            [ ÚNETE_AL_ECOSISTEMA ]
          </p>
          <h2>
            <TextSplitter text="ENTRA AL" effect="cascade" as="span" /><br />
            <span><TextSplitter text="FUTURO" effect="cascade" as="span" /></span>
          </h2>
          <div className="exp-cta-buttons">
            <MagneticElement>
              <Link href="/modulos" className="atx-cta-pri">
                EXPLORAR MÓDULOS
              </Link>
            </MagneticElement>
            <MagneticElement>
              <Link href="/registro" className="atx-cta-sec">
                CREAR CUENTA
              </Link>
            </MagneticElement>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ FIXED TAB DOCK ═══ */}
      <div className="exp-tabs-dock relative z-20">
        <ExpandableTabs
          tabs={tabs}
          activeColor="#FF6B00"
          onChange={(index) => setActiveTab(index)}
        />
      </div>
    </div>
  );
}
