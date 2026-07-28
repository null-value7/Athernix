// @ts-nocheck
'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Skip auth pages to avoid loops
  if (pathname === '/login' || pathname === '/register' || pathname === '/about') {
    return null;
  }

  return (
    <footer className="atx-footer relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at 20% 80%, rgba(255,0,110,0.12), transparent 40%), radial-gradient(circle at 80% 20%, rgba(255,107,0,0.1), transparent 45%)',
        }}
      />
      <div className="line-gradient-animated h-px w-full mb-0" style={{ opacity: 0.6 }} />
      <div className="atx-footer-inner relative z-10">
        <ScrollReveal effect="fadeUp" delay={0.05}>
          <div className="atx-footer-brand">
            <span className="footer-logo text-shimmer">ATHERNIX</span>
            <p>NEO VORTEX LABS · EL SALVADOR · 2026</p>
            <p>REALIDAD VIRTUAL · IMPACTO REAL</p>
          </div>
        </ScrollReveal>
        <ScrollReveal effect="fadeUp" delay={0.15} stagger={0.08}>
          <div className="atx-footer-links">
            <div className="atx-footer-col liquid-glass-subtle">
              <h4>PLATAFORMA</h4>
              <Link href="/">HOME</Link>
              <Link href="/modulos">MÓDULOS VR</Link>
              <Link href="/about">ACERCA DE NOSOTROS</Link>
            </div>
            <div className="atx-footer-col liquid-glass-subtle">
              <h4>MÓDULOS</h4>
              <Link href="/modulos/history">HISTORIA VIVA</Link>
              <Link href="/modulos/tours">SVIRTUAL TOURS</Link>
              <Link href="/modulos/brain">MENTELIBRE VR</Link>
            </div>
            <div className="atx-footer-col liquid-glass-subtle">
              <h4>ACCESO</h4>
              <Link href="/login">INICIAR SESIÓN</Link>
              <Link href="/register">CREAR CUENTA</Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
      <ScrollReveal effect="fadeIn" delay={0.2}>
        <div className="atx-footer-bottom relative z-10">
          <span>© 2026 ATHERNIX · NEO VORTEX LABS · TODOS LOS DERECHOS RESERVADOS</span>
          <span className="atx-status">
            <span className="atx-status-dot"></span> SISTEMA_ACTIVO
          </span>
        </div>
      </ScrollReveal>
    </footer>
  );
}
