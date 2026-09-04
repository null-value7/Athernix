// @ts-nocheck
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Settings, Languages, User, LogOut, Home, Code2, Headset, MessageSquare, Compass, ChevronDown, Check, Accessibility, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/supabase/useAuth';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const pathname = usePathname();
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
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
      nav.style.transform = `translateX(-50%) translateY(${y * -2}px)`;
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

  const router = useRouter();

  const handleLogout = async () => {
    setShowProfileMenu(false);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <>
    <nav ref={navRef} className="atx-nav">
      <Link href="/" className="atx-logo">
        ATHERNIX
      </Link>
      <ul className="atx-links">
        {(!loading && !user) && (
          <>
            <li className="atx-has-drop">
              <Link href="/modulos" className="atx-drop-btn-link">
                <span className="atx-drop-btn">
                  MÓDULOS <span className="atx-chevron"><ChevronDown size={10} /></span>
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
              <Link href="/mundi" className={pathname === '/mundi' ? 'atx-active' : ''}>
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
          </>
        )}
        {!loading && user && (
          <>
            <li>
              <Link href="/home" className={pathname === '/home' ? 'atx-active' : ''}>
                <Home size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                HOME
              </Link>
            </li>
            <li>
              <Link href="/development" className={pathname === '/development' ? 'atx-active' : ''}>
                <Code2 size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                DESARROLLO
              </Link>
            </li>
            <li>
              <Link href="/mundi" className={pathname === '/mundi' ? 'atx-active' : ''}>
                <Compass size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                EXPLORA
              </Link>
            </li>
            <li>
              <Link href="/headsets" className={pathname === '/headsets' ? 'atx-active' : ''}>
                <Headset size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                HEADSETS
              </Link>
            </li>
            <li>
              <Link href="/chatbot" className={pathname === '/chatbot' ? 'atx-active' : ''}>
                <MessageSquare size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                CHATBOT
              </Link>
            </li>
          </>
        )}
      </ul>
      <div className="atx-right">
        {!loading && user ? (
          // Usuario autenticado: perfil primero, settings a la derecha
          <>
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
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile?.first_name || 'Profile'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                    />
                  ) : (
                    profile?.first_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'
                  )}
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
                    <Home size={14} />
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
                    <Code2 size={14} />
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
                    <Headset size={14} />
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
                    <MessageSquare size={14} />
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

            {/* Settings gear a la derecha del perfil */}
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
          </>
        ) : (
          // Usuario no autenticado: settings primero, luego login y registro
          <>
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

            <Link href="/login" className="atx-cta-sec">
              INICIAR SESIÓN
            </Link>
            <Link href="/register" className="atx-cta-pri">
              REGISTRO
            </Link>
          </>
        )}
      </div>

      {/* Mobile hamburger button */}
      <button
        className="atx-hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </nav>

    {/* Mobile menu overlay */}
    {mobileOpen && (
      <div className="atx-mobile-menu">
        <div className="atx-mobile-header">
          <span className="atx-mobile-title">ATHERNIX</span>
          <button
            className="atx-mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile section (authenticated) */}
        {!loading && user && (
          <div className="atx-mobile-profile">
            <div className="atx-mobile-avatar">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile?.first_name || 'Profile'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              ) : (
                profile?.first_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div className="atx-mobile-profile-info">
              <span className="atx-mobile-profile-name">
                {profile?.first_name || user.email?.split('@')[0] || 'Usuario'}
              </span>
              <span className="atx-mobile-profile-label">PERFIL</span>
            </div>
          </div>
        )}

        {/* Navigation links */}
        <div className="atx-mobile-sections">
          {!loading && !user && (
            <>
              <div className="atx-mobile-section">
                <button
                  className="atx-mobile-section-btn"
                  onClick={() => setMobileSection(mobileSection === 'modulos' ? null : 'modulos')}
                >
                  MÓDULOS <ChevronDown size={14} className={mobileSection === 'modulos' ? 'atx-chevron-open' : ''} />
                </button>
                {mobileSection === 'modulos' && (
                  <div className="atx-mobile-subitems">
                    <Link href="/modulos/history" onClick={() => setMobileOpen(false)}>
                      <span className="dd-dot" style={{ background: '#FF006E' }}></span>
                      HISTORIA_VIVA_VR
                    </Link>
                    <Link href="/modulos/tours" onClick={() => setMobileOpen(false)}>
                      <span className="dd-dot" style={{ background: '#FF6B00' }}></span>
                      SVIRTUAL_TOURS
                    </Link>
                    <Link href="/modulos/brain" onClick={() => setMobileOpen(false)}>
                      <span className="dd-dot" style={{ background: '#FFD700' }}></span>
                      MENTELIBRE_VR
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/experience" className="atx-mobile-link" onClick={() => setMobileOpen(false)}>
                EXPERIENCIA
              </Link>
              <Link href="/mundi" className="atx-mobile-link" onClick={() => setMobileOpen(false)}>
                EXPLORA
              </Link>
              <Link href="/ather" className="atx-mobile-link" onClick={() => setMobileOpen(false)}>
                ATHERNIXITO
              </Link>
              <Link href="/discover" className="atx-mobile-link" onClick={() => setMobileOpen(false)}>
                DESCUBRE
              </Link>
              <Link href="/vrtech" className="atx-mobile-link" onClick={() => setMobileOpen(false)}>
                VR
              </Link>
            </>
          )}

          {!loading && user && (
            <>
              <Link href="/home" className="atx-mobile-link" onClick={() => setMobileOpen(false)}>
                <Home size={16} /> HOME
              </Link>
              <Link href="/development" className="atx-mobile-link" onClick={() => setMobileOpen(false)}>
                <Code2 size={16} /> DESARROLLO
              </Link>
              <Link href="/mundi" className="atx-mobile-link" onClick={() => setMobileOpen(false)}>
                <Compass size={16} /> EXPLORA
              </Link>
              <Link href="/headsets" className="atx-mobile-link" onClick={() => setMobileOpen(false)}>
                <Headset size={16} /> HEADSETS
              </Link>
              <Link href="/chatbot" className="atx-mobile-link" onClick={() => setMobileOpen(false)}>
                <MessageSquare size={16} /> CHATBOT
              </Link>
              <Link href="/profile" className="atx-mobile-link" onClick={() => setMobileOpen(false)}>
                <User size={16} /> MI PERFIL
              </Link>
            </>
          )}
        </div>

        {/* Language section */}
        <div className="atx-mobile-divider" />
        <div className="atx-mobile-section">
          <button
            className="atx-mobile-section-btn"
            onClick={() => setMobileSection(mobileSection === 'idioma' ? null : 'idioma')}
          >
            <Languages size={16} /> IDIOMA <ChevronDown size={14} className={mobileSection === 'idioma' ? 'atx-chevron-open' : ''} />
          </button>
          {mobileSection === 'idioma' && (
            <div className="atx-mobile-subitems">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  className="atx-mobile-lang-btn"
                  onClick={() => { changeLanguage(lang.code); setMobileOpen(false); }}
                  style={currentLang === lang.code ? { color: '#FF6B00', background: 'rgba(255,107,53,0.1)' } : {}}
                >
                  <span className="atx-mobile-lang-tag">{lang.tag}</span>
                  <span className="notranslate" translate="no">{lang.label}</span>
                  {currentLang === lang.code && <Check size={14} color="#FF6B00" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Accessibility link */}
        <Link
          href="/accesibilidad"
          className="atx-mobile-link"
          onClick={() => setMobileOpen(false)}
        >
          <Accessibility size={16} /> ACCESIBILIDAD
        </Link>

        {/* Auth buttons (not authenticated) */}
        {!loading && !user && (
          <>
            <div className="atx-mobile-divider" />
            <Link href="/login" className="atx-mobile-auth-btn" onClick={() => setMobileOpen(false)}>
              INICIAR SESIÓN
            </Link>
            <Link href="/register" className="atx-mobile-auth-btn atx-mobile-auth-pri" onClick={() => setMobileOpen(false)}>
              REGISTRO
            </Link>
          </>
        )}

        {/* Logout (authenticated) */}
        {!loading && user && (
          <>
            <div className="atx-mobile-divider" />
            <button
              className="atx-mobile-logout"
              onClick={() => { handleLogout(); setMobileOpen(false); }}
            >
              <LogOut size={16} /> CERRAR SESIÓN
            </button>
          </>
        )}
      </div>
    )}
    </>
  );
}
