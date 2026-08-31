// @ts-nocheck
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, Languages, User, LogOut, Check, Accessibility } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/supabase/useAuth';

export default function Navbar() {
  const pathname = usePathname();
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const navRef = useRef<HTMLElement>(null);

  // Scroll state + 3D mouse parallax
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle('atx-scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();

    const onMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      nav.style.transform = `perspective(1200px) translateX(-50%) rotateX(${-y * 3}deg) rotateY(${x * 3}deg) translateZ(4px)`;
    };
    const onLeave = () => {
      nav.style.transform = 'translateX(-50%)';
    };
    nav.addEventListener('mousemove', onMove);
    nav.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('scroll', onScroll);
      nav.removeEventListener('mousemove', onMove);
      nav.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { data } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', user.id)
          .single();
        setProfile(data);
      };
      fetchProfile();
    }
  }, [user]);

  const LANGUAGES = [
    { code: 'es', label: 'Español', tag: 'ES' },
    { code: 'en', label: 'English', tag: 'EN' },
    { code: 'pt', label: 'Português', tag: 'PT' },
    { code: 'fr', label: 'Français', tag: 'FR' },
    { code: 'it', label: 'Italiano', tag: 'IT' },
  ];

  const [currentLang, setCurrentLang] = useState('es');

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)googtrans=\/es\/([a-z-]+)/i);
    if (match) setCurrentLang(match[1]);
  }, []);

  const changeLanguage = (lang: string) => {
    if (lang === currentLang) {
      setShowSettings(false);
      return;
    }
    setCurrentLang(lang);
    setShowSettings(false);

    const hostname = window.location.hostname;
    const expire = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';

    if (lang === 'es') {
      // Restaurar idioma original: limpiar cookies de Google Translate y recargar
      document.cookie = `googtrans=; path=/; ${expire}`;
      document.cookie = `googtrans=; path=/; domain=${hostname}; ${expire}`;
      document.cookie = `googtrans=; path=/; domain=.${hostname}; ${expire}`;
      window.location.reload();
      return;
    }

    document.cookie = `googtrans=/es/${lang}; path=/`;
    document.cookie = `googtrans=/es/${lang}; path=/; domain=${hostname}`;

    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  const handleLogout = async () => {
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav ref={navRef} className="atx-nav">
      <Link href="/" className="atx-logo">
        ATHERNIX
      </Link>
      <ul className="atx-links">
        <li className="atx-has-drop">
          <Link href="/modulos" className="atx-drop-btn-link">
            <span className="atx-drop-btn">
              EXPLORAR <span className="atx-chevron">▾</span>
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
        <li>
          <Link href="/mundi" className={pathname === '/mundi' ? 'atx-active' : ''}>
            MUNDI
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
            <div
              className="atx-dropdown"
              style={{
                opacity: 1,
                pointerEvents: 'all',
                transform: 'translateX(-50%) translateY(0)',
                right: 0,
                left: 'auto',
                minWidth: '200px',
                background: 'rgba(8, 4, 12, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 107, 53, 0.3)',
                borderRadius: '8px',
                padding: '8px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px 10px',
                  color: 'rgba(255, 107, 53, 0.7)',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '9px',
                  letterSpacing: '0.25em',
                  borderBottom: '1px solid rgba(255, 107, 53, 0.15)',
                  marginBottom: '6px',
                }}
              >
                <Languages size={13} color="#FF6B00" />
                IDIOMA
              </div>
              {LANGUAGES.map((lang) => {
                const active = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '9px 12px',
                      background: active ? 'rgba(255, 107, 53, 0.12)' : 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      color: active ? 'rgba(255, 107, 53, 0.95)' : 'rgba(255, 255, 255, 0.7)',
                      cursor: 'pointer',
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: '11px',
                      fontWeight: active ? 700 : 500,
                      textAlign: 'left',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 107, 53, 0.1)';
                      e.currentTarget.style.color = 'rgba(255, 107, 53, 0.95)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = active ? 'rgba(255, 107, 53, 0.12)' : 'transparent';
                      e.currentTarget.style.color = active ? 'rgba(255, 107, 53, 0.95)' : 'rgba(255, 255, 255, 0.7)';
                    }}
                  >
                    <span
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '9px',
                        letterSpacing: '0.1em',
                        color: active ? '#FF6B00' : 'rgba(255, 255, 255, 0.35)',
                        width: '18px',
                        flexShrink: 0,
                      }}
                    >
                      {lang.tag}
                    </span>
                    <span style={{ flex: 1 }} translate="no" className="notranslate">
                      {lang.label}
                    </span>
                    {active && <Check size={13} color="#FF6B00" />}
                  </button>
                );
              })}

              <div style={{ borderTop: '1px solid rgba(255, 107, 53, 0.15)', margin: '6px 0' }} />

              <Link
                href="/accesibilidad"
                onClick={() => setShowSettings(false)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 107, 53, 0.1)';
                  e.currentTarget.style.color = 'rgba(255, 107, 53, 0.95)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                }}
              >
                <Accessibility size={14} color="#FF6B00" />
                <span style={{ flex: 1 }}>ACCESIBILIDAD</span>
              </Link>
            </div>
          )}
        </div>

        {!loading && user ? (
          // Usuario autenticado: mostrar perfil con nombre
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                background: 'rgba(255, 107, 53, 0.1)',
                border: '1px solid rgba(255, 107, 53, 0.3)',
                borderRadius: '12px',
                padding: '8px 16px',
                color: 'rgba(255, 107, 53, 0.9)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '12px',
                fontWeight: '600',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 107, 53, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 107, 53, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.3), rgba(168, 85, 247, 0.3))',
                border: '2px solid rgba(255, 107, 53, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#FF6B35',
              }}>
                {profile?.first_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                lineHeight: '1.2',
              }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255, 255, 255, 0.9)' }}>
                  {profile?.first_name || user.email?.split('@')[0] || 'Usuario'}
                </span>
                <span style={{ fontSize: '9px', fontWeight: '500', color: 'rgba(255, 107, 53, 0.7)', letterSpacing: '0.05em' }}>
                  PERFIL
                </span>
              </span>
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
                border: '1px solid rgba(255, 107, 53, 0.3)',
                borderRadius: '8px',
                padding: '8px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              }}>
                <Link
                  href="/home"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 12px',
                    color: 'rgba(255, 107, 53, 0.9)',
                    textDecoration: 'none',
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
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
                  <User size={14} />
                  HOME
                </Link>
                <Link
                  href="/profile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 12px',
                    color: 'rgba(255, 107, 53, 0.9)',
                    textDecoration: 'none',
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
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
                  <User size={14} />
                  MI PERFIL
                </Link>
                <Link
                  href="/development"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 12px',
                    color: 'rgba(255, 107, 53, 0.9)',
                    textDecoration: 'none',
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
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
                  <User size={14} />
                  DESARROLLO
                </Link>
                <Link
                  href="/headsets"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 12px',
                    color: 'rgba(255, 107, 53, 0.9)',
                    textDecoration: 'none',
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
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
                  <User size={14} />
                  HEADSETS
                </Link>
                <Link
                  href="/chatbot"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 12px',
                    color: 'rgba(255, 107, 53, 0.9)',
                    textDecoration: 'none',
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
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
                  <User size={14} />
                  CHATBOT
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
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
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
