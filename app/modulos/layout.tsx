import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Módulos VR',
  description: 'Módulos de realidad virtual de ATHERNIX: Historia Viva VR, SVirtual Tours y MenteLibre VR.',
}

import '../styles/home.css';

export default function ModulosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
