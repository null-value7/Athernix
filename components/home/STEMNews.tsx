'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  tag: string;
  tagColor: string;
  date: string;
  url: string;
  source: string;
}

const STEM_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Nuevos avances en computación cuántica: IBM anuncia procesador de 1000 qubits',
    summary: 'IBM revela su procesador cuántico más potente hasta la fecha, prometiendo revolucionar la criptografía y la simulación molecular.',
    tag: 'Computación Cuántica',
    tagColor: '#FF006E',
    date: '15 Jul 2026',
    url: '#',
    source: 'IBM Research'
  },
  {
    id: '2',
    title: 'IA generativa en medicina: Nuevo algoritmo detecta cáncer con 99% de precisión',
    summary: 'Investigadores desarrollan sistema de IA que identifica tumores en etapas tempranas superando a los métodos tradicionales.',
    tag: 'Inteligencia Artificial',
    tagColor: '#00E5A0',
    date: '12 Jul 2026',
    url: '#',
    source: 'Nature Medicine'
  },
  {
    id: '3',
    title: 'Misión espacial Europa: Descubren agua líquida en luna de Júpiter',
    summary: 'La sonda espacial confirma la presencia de océanos subsuperficiales en Europa, aumentando las posibilidades de vida extraterrestre.',
    tag: 'Espacio',
    tagColor: '#FFD700',
    date: '10 Jul 2026',
    url: '#',
    source: 'NASA'
  },
  {
    id: '4',
    title: 'Baterías de estado sólido: La tecnología que revolucionará los vehículos eléctricos',
    summary: 'Toyota anuncia baterías con 1000km de autonomía y carga en 10 minutos, marcando un hito en la movilidad sostenible.',
    tag: 'Energía',
    tagColor: '#FF6B00',
    date: '8 Jul 2026',
    url: '#',
    source: 'Toyota'
  },
];

export default function STEMNews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.news-card', 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out' }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + STEM_NEWS.length) % STEM_NEWS.length);
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % STEM_NEWS.length);
  };

  const handleToggle = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div ref={containerRef} className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span style={{ color: '#FF6B00', fontSize: '1rem' }}>◎</span>
        <h2 className="font-black tracking-widest uppercase" 
            style={{ fontFamily: "'Orbitron', sans-serif", color: '#ede0d4', fontSize: '0.72rem', letterSpacing: '0.2em' }}>
          Noticias STEM
        </h2>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,107,53,0.15)' }}/>
        <span style={{ color: 'rgba(200,150,120,0.35)', fontFamily: "'Rajdhani', sans-serif", fontSize: '0.62rem' }}>
          Actualizadas semanalmente
        </span>
      </div>

      {/* Featured News Carousel */}
      <div className="news-card rounded-2xl border overflow-hidden"
           style={{ background: 'rgba(18,8,22,0.9)', borderColor: 'rgba(180,60,40,0.2)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b" 
             style={{ borderColor: 'rgba(180,60,40,0.12)' }}>
          <span className="text-xs tracking-widest uppercase font-bold" 
                style={{ color: 'rgba(255,120,70,0.5)', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.22em', fontSize: '0.58rem' }}>
            ✦ transmisión_athernix
          </span>
          <div className="flex items-center gap-2">
            <button onClick={handlePrev}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                    style={{ background: 'rgba(255,100,50,0.1)', border: '1px solid rgba(255,100,50,0.2)', color: '#ff6b35', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,100,50,0.22)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,100,50,0.1)'}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
              </svg>
            </button>
            <button onClick={handleNext}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                    style={{ background: 'rgba(255,100,50,0.1)', border: '1px solid rgba(255,100,50,0.2)', color: '#ff6b35', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,100,50,0.22)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,100,50,0.1)'}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="p-5">
          {STEM_NEWS.map((item, index) => (
            <div key={item.id} className={index === activeIndex ? 'block' : 'hidden'}>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider"
                      style={{ background: `${item.tagColor}18`, border: `1px solid ${item.tagColor}50`, color: item.tagColor, fontFamily: "'Rajdhani', sans-serif" }}>
                  {item.tag}
                </span>
                <span className="text-xs ml-auto" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: "'Rajdhani', sans-serif" }}>
                  {item.date} · {item.source}
                </span>
              </div>
              <h3 className="text-sm font-black mb-2 leading-snug" 
                  style={{ fontFamily: "'Orbitron', sans-serif", color: '#e8d5c8', letterSpacing: '0.03em', fontSize: '0.9rem' }}>
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed transition-all duration-300"
                 style={{ color: 'rgba(200,160,140,0.75)', fontFamily: "'Rajdhani', sans-serif",
                   display: '-webkit-box', WebkitLineClamp: expandedId === item.id ? 'unset' : 2,
                   WebkitBoxOrient: 'vertical' as const, overflow: expandedId === item.id ? 'visible' : 'hidden' }}>
                {item.summary}
              </p>
              <button onClick={() => handleToggle(item.id)}
                      className="mt-3 flex items-center gap-1 text-xs font-semibold tracking-wider uppercase"
                      style={{ color: item.tagColor, fontFamily: "'Rajdhani', sans-serif", background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                {expandedId === item.id ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"/>
                    </svg>
                    Leer menos
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                    </svg>
                    Leer más
                  </>
                )}
              </button>
            </div>
          ))}

          <div className="flex items-center justify-center gap-2 pb-4 mt-4">
            {STEM_NEWS.map((_, i) => (
              <button key={i} onClick={() => setActiveIndex(i)}
                      style={{ width: activeIndex === i ? 20 : 6, height: 6, borderRadius: 9999,
                        background: activeIndex === i ? 'linear-gradient(90deg,#ff4e50,#f7931e)' : 'rgba(255,100,50,0.25)',
                        border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                        boxShadow: activeIndex === i ? '0 0 8px rgba(255,100,50,0.5)' : 'none' }}/>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STEM_NEWS.slice(1).map((item, index) => (
          <div key={item.id} 
               className="news-card group block rounded-2xl p-4 border transition-all duration-200 cursor-pointer"
               style={{ background: 'rgba(18,8,22,0.88)', borderColor: 'rgba(180,60,40,0.18)' }}
               onMouseEnter={e => { 
                 const el = e.currentTarget;
                 el.style.borderColor = `${item.tagColor}45`;
                 el.style.background = 'rgba(18,8,22,0.95)';
                 gsap.to(el, { y: -4, duration: 0.2, ease: 'power2.out' });
               }}
               onMouseLeave={e => { 
                 const el = e.currentTarget;
                 el.style.borderColor = 'rgba(180,60,40,0.18)';
                 el.style.background = 'rgba(18,8,22,0.88)';
                 gsap.to(el, { y: 0, duration: 0.2, ease: 'power2.out' });
               }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold tracking-wider"
                    style={{ background: `${item.tagColor}18`, border: `1px solid ${item.tagColor}45`, color: item.tagColor, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.58rem', letterSpacing: '0.15em' }}>
                {item.tag}
              </span>
              <span className="text-xs ml-auto" style={{ color: 'rgba(200,150,120,0.4)', fontFamily: "'Rajdhani', sans-serif", fontSize: '0.6rem' }}>
                {item.date}
              </span>
            </div>
            <h4 className="font-bold text-sm mb-1.5 leading-snug" 
                style={{ color: '#ede0d4', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.02em' }}>
              {item.title}
            </h4>
            <p className="text-xs leading-relaxed line-clamp-2" 
               style={{ color: 'rgba(200,150,120,0.55)', fontFamily: '"Rajdhani", sans-serif' }}>
              {item.summary}
            </p>
            <div className="flex items-center gap-1 mt-3 text-xs font-bold tracking-wider"
                 style={{ color: item.tagColor, fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.1em', fontSize: '0.62rem' }}>
              LEER MÁS
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
