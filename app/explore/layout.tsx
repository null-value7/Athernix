import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explora',
  description: 'Explora los módulos, mundos y experiencias de realidad virtual de ATHERNIX.',
}

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}