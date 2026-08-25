// @ts-nocheck
'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/supabase/useAuth';

export default function Footer() {
  const { user, loading } = useAuth();
  const isAuth = !loading && user;

  return (
    <footer className="atx-footer">
      <div className="atx-footer-inner">
        <div className="atx-footer-brand">
          <span className="footer-logo">ATHERNIX</span>
          <p>NEO VORTEX LABS · EL SALVADOR · 2026</p>
          <p>REALIDAD VIRTUAL · IMPACTO REAL</p>
        </div>
        <div className="atx-footer-links">
          {isAuth ? (
            <>
              <div className="atx-footer-col">
                <h4>PLATAFORMA</h4>
                <Link href="/home">HOME</Link>
                <Link href="/development">DESARROLLO</Link>
                <Link href="/headsets">HEADSETS</Link>
                <Link href="/chatbot">CHATBOT</Link>
              </div>
              <div className="atx-footer-col">
                <h4>CUENTA</h4>
                <Link href="/profile">MI PERFIL</Link>
              </div>
            </>
          ) : (
            <>
              <div className="atx-footer-col">
                <h4>PLATAFORMA</h4>
                <Link href="/">HOME</Link>
                <Link href="/modulos">MÓDULOS VR</Link>
                <Link href="/discover">DESCUBRE</Link>
              </div>
              <div className="atx-footer-col">
                <h4>MÓDULOS</h4>
                <Link href="/modulos/history">HISTORIA VIVA</Link>
                <Link href="/modulos/tours">SVIRTUAL TOURS</Link>
                <Link href="/modulos/brain">MENTELIBRE VR</Link>
              </div>
              <div className="atx-footer-col">
                <h4>ACCESO</h4>
                <Link href="/login">INICIAR SESIÓN</Link>
                <Link href="/register">CREAR CUENTA</Link>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="atx-footer-bottom">
        <span>© 2026 ATHERNIX · NEO VORTEX LABS · TODOS LOS DERECHOS RESERVADOS</span>
        <span className="atx-status">
          <span className="atx-status-dot"></span> SISTEMA_ACTIVO
        </span>
      </div>
    </footer>
  );
}
