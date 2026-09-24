import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Headsets VR',
  description: 'Gestiona y configura tus headsets de realidad virtual en ATHERNIX.',
  robots: { index: false, follow: false },
}

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
