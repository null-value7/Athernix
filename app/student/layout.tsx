import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel de estudiante',
  description: 'Panel del estudiante en ATHERNIX: clases, misiones y progreso.',
  robots: { index: false, follow: false },
}

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
