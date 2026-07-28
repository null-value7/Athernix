// @ts-nocheck
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, Languages, User, LogOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/lib/supabase/useAuth';
import { gsap } from 'gsap';

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, loading } = useAuth();
  const lastScrollY = useRef(0);

  // Don't render navbar on auth pages to avoid loop
  if (pathname === '/login' || pathname === '/register' || pathname === '/about') {
    return null;
  }

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('atx-nav-scrolled', y > 40);
      if (y > 120) {
        nav.classList.toggle('atx-nav-hidden', y > lastScrollY.current);
      } else {
        nav.classList.remove('atx-nav-hidden');
      }
      lastScrollY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTranslate = () => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = 'en';
      select.dispatchEvent(new Event('change'));
    }
  };

  const handleLogout = async () => {
    const { createClient, hasSupabaseConfig } = await import('@/lib/supabase/client');
    if (!hasSupabaseConfig()) {
      window.location.href = '/';
      return;
    }
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const animateDropdown = (open) => {
    const dropdowns = document.querySelectorAll('.atx-dropdown-animated');
    dropdowns.forEach((el) => {
      gsap.to(el, {
        opacity: open ? 1 : 0,
        y: open ? 0 : -8,
        scale: open ? 1 : 0.98,
        duration: 0.35,
        ease: open ? 'back.out(1.4)' : 'power2.in',
      });
    });
  };

  useEffect(() => {
    animateDropdown(showSettings || showProfileMenu);
  }, [showSettings, showProfileMenu]);

  return (
    <nav className="atx-nav" ref={navRef}>
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
            <div className="atx-dropdown atx-dropdown-animated" style={{ opacity: 1, pointerEvents: 'all', transform: 'translateX(-50%) translateY(0)', right: 0, left: 'auto', minWidth: '150px' }}>
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
              <div className="atx-dropdown atx-dropdown-animated" style={{ 
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
