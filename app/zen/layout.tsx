import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zen',
  description: 'Espacio de calma y bienestar dentro del ecosistema ATHERNIX.',
}

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
