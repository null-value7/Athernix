// @ts-nocheck
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="atx-footer">
      <div className="atx-footer-inner">
        <div className="atx-footer-brand">
          <span className="footer-logo">ATHERNIX</span>
          <p>NEO VORTEX LABS · EL SALVADOR · 2026</p>
          <p>REALIDAD VIRTUAL · IMPACTO REAL</p>
        </div>
        <div className="atx-footer-links">
          <div className="atx-footer-col">
            <h4>PLATAFORMA</h4>
            <Link href="/">HOME</Link>
            <Link href="/modulos">MÓDULOS VR</Link>
            <Link href="/acerca">ACERCA DE NOSOTROS</Link>
          </div>
          <div className="atx-footer-col">
            <h4>MÓDULOS</h4>
            <Link href="/modulos/historia-viva">HISTORIA VIVA</Link>
            <Link href="/modulos/svirtual-tours">SVIRTUAL TOURS</Link>
            <Link href="/modulos/mentelibre-vr">MENTELIBRE VR</Link>
          </div>
          <div className="atx-footer-col">
            <h4>ACCESO</h4>
            <Link href="/login">INICIAR SESIÓN</Link>
            <Link href="/registro">CREAR CUENTA</Link>
          </div>
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
