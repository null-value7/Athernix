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

/* ── Reveal animation wrapper ── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

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

  return (
    <div className="experiencia-page">
      {/* ═══ SHADER BACKGROUND ═══ */}
      <div className="exp-shader-bg-wrapper">
        <ExperienceShaderBackground />
      </div>

      {/* ═══ HERO ═══ */}
      <section className="exp-hero" id="exp-hero">
        {/* Spotlight overlay */}
        <Spotlight className="spotlight-svg" style={{ top: '-40%', left: 0 }} fill="#FF6B00" />
        <Spotlight className="spotlight-svg" style={{ top: '-20%', right: 0, transform: 'scaleX(-1)' }} fill="#FF006E" />

        <div className="exp-hero-content">
          {/* Left text */}
          <div className="exp-hero-text">
            <p className="exp-hero-eyebrow mono">ATHERNIX / EXPERIENCIA INMERSIVA / 2026</p>
            <h1 className="exp-hero-title">
              <span>EXPERIENCIA</span><br />
              INMERSIVA
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
              <Link href="/modulos" className="atx-cta-pri">
                EXPLORAR MÓDULOS
              </Link>
              <Link href="/registro" className="atx-cta-sec">
                CREAR CUENTA
              </Link>
            </div>
          </div>

          {/* Right — 3D Model */}
          <div className="exp-hero-3d">
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
      <div className="exp-marquee">
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
          <>
            INTELIGENCIA,
            <br />
            ENTREGADA A TI.
          </>
        }
        description={
          <>
            Ather IA estudia tu progreso y adapta cada recorrido a tu ritmo:
            <br />
            misiones personalizadas, retroalimentación en tiempo real y
            <br />
            rutas de aprendizaje que conectan historia, ciencia y bienestar
            <br />
            en una experiencia VR hecha para ti.
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

      <div className="exp-grad-line" />

      {/* ═══ DISPLAY CARDS + INFO ═══ */}
      <section className="exp-cards-section" id="exp-modules">
        <div className="exp-cards-row">
          <div className="exp-cards-info">
            <Reveal>
              <p className="exp-section-label mono">[ MÓDULOS_DEL_ECOSISTEMA ]</p>
              <h2>
                TRES EJES<br />
                <span>DE IMPACTO</span>
              </h2>
              <p>
                Cada módulo aborda una brecha crítica en El Salvador: educación pasiva,
                turismo subaprovechado y salud mental sin tecnología. Juntos, forman
                un ecosistema unificado de transformación digital.
              </p>
            </Reveal>
          </div>
          <div className="exp-cards-visual">
            <Reveal delay={0.2}>
              <DisplayCards />
            </Reveal>
          </div>
        </div>
      </section>

      <div className="exp-grad-line" />

      {/* ═══ FEATURES GRID ═══ */}
      <section className="exp-section" id="exp-features">
        <Reveal>
          <p className="exp-section-label mono">[ CAPACIDADES_CORE ]</p>
          <h2 className="exp-section-title">
            TECNOLOGÍA<br />
            <span>DE VANGUARDIA</span>
          </h2>
        </Reveal>
        <div className="exp-features">
          {features.map((feat, i) => (
            <Reveal key={feat.num} delay={i * 0.15}>
              <div className="exp-feature-card">
                <div className="exp-feature-icon">{feat.icon}</div>
                <p className="exp-feature-num mono">{feat.num}</p>
                <h3 className="exp-feature-name">{feat.name}</h3>
                <p className="exp-feature-desc">{feat.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <div className="exp-grad-line" />
      <div className="exp-stats" id="exp-stats">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1}>
            <div className="exp-stat">
              <div className="exp-stat-num">{stat.num}</div>
              <p className="exp-stat-label mono">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="exp-grad-line" />

      {/* ═══ CTA ═══ */}
      <section className="exp-cta">
        <Reveal>
          <p className="exp-section-label mono" style={{ textAlign: 'center' }}>
            [ ÚNETE_AL_ECOSISTEMA ]
          </p>
          <h2>
            ENTRA AL<br />
            <span>FUTURO</span>
          </h2>
          <div className="exp-cta-buttons">
            <Link href="/modulos" className="atx-cta-pri">
              EXPLORAR MÓDULOS
            </Link>
            <Link href="/registro" className="atx-cta-sec">
              CREAR CUENTA
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ═══ FIXED TAB DOCK ═══ */}
      <div className="exp-tabs-dock">
        <ExpandableTabs
          tabs={tabs}
          activeColor="#FF6B00"
          onChange={(index) => setActiveTab(index)}
        />
      </div>
    </div>
  );
}
