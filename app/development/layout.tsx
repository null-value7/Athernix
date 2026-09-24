import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zona de desarrollo',
  description: 'Laboratorio STEM y zona de desarrollo del ecosistema ATHERNIX.',
  robots: { index: false, follow: false },
}

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
