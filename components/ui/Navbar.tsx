// @ts-nocheck
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, Languages, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/lib/supabase/useAuth';

export default function Navbar() {
  const pathname = usePathname();
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, loading } = useAuth();

  const handleTranslate = () => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = 'en';
      select.dispatchEvent(new Event('change'));
    }
  };

  const handleLogout = async () => {
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
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
            <Link href="/modulos/history">
              <span className="dd-dot" style={{ background: '#FF006E' }}></span>
              HISTORIA_VIVA_VR
            </Link>
            <Link href="/modulos/tours">
              <span className="dd-dot" style={{ background: '#FF6B00' }}></span>
              SVIRTUAL_TOURS
            </Link>
            <Link href="/modulos/brain">
              <span className="dd-dot" style={{ background: '#FFD700' }}></span>
              MENTELIBRE_VR
            </Link>
          </div>
        </li>
        <li>
          <Link href="/experience" className={pathname === '/experience' ? 'atx-active' : ''}>
            EXPERIENCIA
          </Link>
        </li>
        <li>
          <Link href="/explore" className={pathname === '/explore' ? 'atx-active' : ''}>
            EXPLORA
          </Link>
        </li>
        <li>
          <Link href="/ather" className={pathname === '/ather' ? 'atx-active' : ''}>
            ATHERNIXITO
          </Link>
        </li>
        <li>
          <Link href="/discover" className={pathname === '/discover' ? 'atx-active' : ''}>
            DESCUBRE
          </Link>
        </li>
        <li>
          <Link href="/vrtech" className={pathname === '/vrtech' ? 'atx-active' : ''}>
            VR
          </Link>
        </li>
        <li>
          <Link href="/about" className={pathname === '/about' ? 'atx-active' : ''}>
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

        {!loading && user ? (
          // Usuario autenticado: mostrar perfil
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                background: 'rgba(200, 80, 255, 0.1)',
                border: '1px solid rgba(200, 80, 255, 0.3)',
                borderRadius: '8px',
                padding: '8px 16px',
                color: 'rgba(200, 80, 255, 0.9)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '11px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(200, 80, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(200, 80, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(200, 80, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(200, 80, 255, 0.3)';
              }}
            >
              <User size={16} />
              <span>PERFIL</span>
            </button>

            {showProfileMenu && (
              <div className="atx-dropdown" style={{ 
                opacity: 1, 
                pointerEvents: 'all', 
                transform: 'translateX(-50%) translateY(0)', 
                right: 0, 
                left: 'auto', 
                minWidth: '180px',
                background: 'rgba(8, 4, 12, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(200, 80, 255, 0.3)',
                borderRadius: '8px',
                padding: '8px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              }}>
                <Link
                  href="/profile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 12px',
                    color: 'rgba(200, 80, 255, 0.9)',
                    textDecoration: 'none',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '11px',
                    borderRadius: '6px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(200, 80, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <User size={14} />
                  MI PERFIL
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 12px',
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255, 107, 53, 0.9)',
                    cursor: 'pointer',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '11px',
                    borderRadius: '6px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 107, 53, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <LogOut size={14} />
                  CERRAR SESIÓN
                </button>
              </div>
            )}
          </div>
        ) : (
          // Usuario no autenticado: mostrar login y registro
          <>
            <Link href="/login" className="atx-cta-sec">
              INICIAR SESIÓN
            </Link>
            <Link href="/register" className="atx-cta-pri">
              REGISTRO
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
