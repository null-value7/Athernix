import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MUNDI | ATHERNIX — Explora el Planeta',
  description:
    'Planeta Tierra interactivo 3D del ecosistema Athernix. Selecciona ubicaciones e inicia experiencias de realidad virtual.',
};

export default function MundiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mundi-page">
      {children}
    </div>
  );
}
