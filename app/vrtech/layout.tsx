import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VR Tech',
  description: 'La tecnología de realidad virtual detrás del ecosistema ATHERNIX.',
}

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
