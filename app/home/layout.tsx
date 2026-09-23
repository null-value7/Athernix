import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Tu centro de control en ATHERNIX: misiones, progreso y módulos VR.',
  robots: { index: false, follow: false },
}

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
