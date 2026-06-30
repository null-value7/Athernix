// @ts-nocheck
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, Languages } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [showSettings, setShowSettings] = useState(false);

  const handleTranslate = () => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = 'en';
      select.dispatchEvent(new Event('change'));
    }
  };

  return (
    <nav className="atx-nav">
      <Link href="/" className="atx-logo">
        ATHERNIX
      </Link>
      <ul className="atx-links">
        <li className="atx-has-drop">
          <Link href="/modulos" className="atx-drop-btn-link">
            <span className="atx-drop-btn">
              MÓDULOS <span className="atx-chevron">▾</span>
            </span>
          </Link>
          <div className="atx-dropdown">
            <Link href="/modulos/historia-viva">
              <span className="dd-dot" style={{ background: '#FF006E' }}></span>
              HISTORIA_VIVA_VR
            </Link>
            <Link href="/modulos/svirtual-tours">
              <span className="dd-dot" style={{ background: '#FF6B00' }}></span>
              SVIRTUAL_TOURS
            </Link>
            <Link href="/modulos/mentelibre-vr">
              <span className="dd-dot" style={{ background: '#FFD700' }}></span>
              MENTELIBRE_VR
            </Link>
          </div>
        </li>
        <li>
          <Link href="/experiencia" className={pathname === '/experiencia' ? 'atx-active' : ''}>
            EXPERIENCIA
          </Link>
        </li>
        <li>
          <Link href="/explora" className={pathname === '/explora' ? 'atx-active' : ''}>
            EXPLORA
          </Link>
        </li>
        <li>
          <Link href="/athernixito" className={pathname === '/athernixito' ? 'atx-active' : ''}>
            ATHERNIXITO
          </Link>
        </li>
        <li>
          <Link href="/descubre" className={pathname === '/descubre' ? 'atx-active' : ''}>
            DESCUBRE
          </Link>
        </li>
        <li>
          <Link href="/info" className={pathname === '/info' ? 'atx-active' : ''}>
            INFO
          </Link>
        </li>
        <li>
          <Link href="/acerca" className={pathname === '/acerca' ? 'atx-active' : ''}>
            ACERCA DE NOSOTROS
          </Link>
        </li>
      </ul>
      <div className="atx-right">
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Settings size={18} />
          </button>
          
          {showSettings && (
            <div className="atx-dropdown" style={{ opacity: 1, pointerEvents: 'all', transform: 'translateX(-50%) translateY(0)', right: 0, left: 'auto', minWidth: '150px' }}>
              <button 
                onClick={handleTranslate}
                style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', width: '100%', fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', textAlign: 'left' }}
              >
                <Languages size={14} color="#FF6B00" />
                TRADUCTOR
              </button>
            </div>
          )}
        </div>

        <Link href="/login" className="atx-cta-sec">
          INICIAR SESIÓN
        </Link>
        <Link href="/registro" className="atx-cta-pri">
          REGISTRO
        </Link>
      </div>
    </nav>
  );
}
