'use client';

// ═══════════════════════════════════════════
// VIEW — Portal de experiencia VR (Unity WebGL)
// ═══════════════════════════════════════════

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { LOCATIONS } from '../../models/location.model';

// Unity necesita WebGL: solo en cliente.
const UnityExperience = dynamic(() => import('../../components/UnityExperience'), { ssr: false });

export default function ExperiencePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [entered, setEntered] = useState(false);
  const location = LOCATIONS.find((l) => l.experienceUrl.endsWith('/' + params.id));

  useEffect(() => {
    if (entered) return;
    gsap.fromTo('.exp-content > *', { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power3.out' });
    gsap.to('.exp-ring', { rotation: 360, duration: 14, repeat: -1, ease: 'none' });
    gsap.to('.exp-ring-2', { rotation: -360, duration: 22, repeat: -1, ease: 'none' });
  }, [entered]);

  if (!location) {
    return (
      <div className="exp-screen">
        <div className="exp-content">
          <h1 className="exp-title">NODO_NO_ENCONTRADO</h1>
          <button className="exp-back mono" onClick={() => router.push('/mundi')}>← VOLVER_AL_PLANETA</button>
        </div>
      </div>
    );
  }

  // ── Juego Unity en marcha ──
  if (entered) {
    return <UnityExperience location={location} onBack={() => router.push('/mundi')} />;
  }

  // ── Antesala del portal ──
  return (
    <div className="exp-screen">
      <div className="exp-ring" style={{ borderColor: `${location.color}44` }} />
      <div className="exp-ring exp-ring-2" style={{ borderColor: `${location.color}22`, width: 560, height: 560 }} />
      <div className="exp-content">
        <p className="exp-code mono" style={{ color: location.color }}>
          {location.code} // {location.category}
        </p>
        <h1 className="exp-title">{location.name.toUpperCase()}</h1>
        <p className="exp-status mono">ENTORNO_VR_LISTO // UNITY_WEBGL</p>
        <button className="exp-enter mono" onClick={() => setEntered(true)}>
          <span className="lp-cta-shine" />
          ▶ ENTRAR A LA EXPERIENCIA
        </button>
        <p className="exp-note mono">
          COMPATIBLE_CON_VISORES_VR // ESCRITORIO // ATHERNIX_VR
        </p>
        <button className="exp-back mono" onClick={() => router.push('/mundi')}>← VOLVER_AL_PLANETA</button>
      </div>
    </div>
  );
}
