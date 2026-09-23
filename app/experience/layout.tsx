import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experiencia',
  description: 'La experiencia inmersiva de ATHERNIX: realidad virtual, inteligencia artificial y biofeedback.',
}

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
