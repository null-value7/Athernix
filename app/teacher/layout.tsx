import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel de docente',
  description: 'Panel del docente en ATHERNIX: clases, estudiantes y misiones.',
  robots: { index: false, follow: false },
}

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
