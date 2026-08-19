'use client';

// ═══════════════════════════════════════════
// VIEW — Portal de experiencia VR (placeholder)
// ═══════════════════════════════════════════

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { LOCATIONS } from '../../models/location.model';

export default function ExperiencePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const location = LOCATIONS.find((l) => l.experienceUrl.endsWith('/' + params.id));

  useEffect(() => {
    gsap.fromTo('.exp-content > *', { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power3.out' });
    gsap.to('.exp-ring', { rotation: 360, duration: 14, repeat: -1, ease: 'none' });
    gsap.to('.exp-ring-2', { rotation: -360, duration: 22, repeat: -1, ease: 'none' });
    const bars = gsap.to('.exp-load-fill', {
      width: '96%', duration: 4, ease: 'power2.inOut', repeat: -1, yoyo: true,
    });
    return () => { bars.kill(); };
  }, []);

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

  return (
    <div className="exp-screen">
      <div className="exp-ring" style={{ borderColor: `${location.color}44` }} />
      <div className="exp-ring exp-ring-2" style={{ borderColor: `${location.color}22`, width: 560, height: 560 }} />
      <div className="exp-content">
        <p className="exp-code mono" style={{ color: location.color }}>
          {location.code} // {location.category}
        </p>
        <h1 className="exp-title">{location.name.toUpperCase()}</h1>
        <p className="exp-status mono">PREPARANDO_ENTORNO_VR…</p>
        <div className="exp-load">
          <div className="exp-load-fill" style={{ background: `linear-gradient(90deg, ${location.color}, #FF006E)` }} />
        </div>
        <p className="exp-note mono">
          ESTA EXPERIENCIA SE CONECTARÁ CON EL ECOSISTEMA ATHERNIX_VR
        </p>
        <button className="exp-back mono" onClick={() => router.push('/mundi')}>← VOLVER_AL_PLANETA</button>
      </div>
    </div>
  );
}
