import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Misiones',
  description: 'Misiones educativas VR: completa retos, gana experiencia y aprende.',
  robots: { index: false, follow: false },
}

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
