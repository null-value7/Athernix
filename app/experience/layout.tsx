import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experiencia',
  description: 'Explora Athernix desde móvil, tablet, PC o un visor compatible. Conoce a Athernixito y el potencial del 3D, la realidad virtual y la IA en El Salvador.',
}

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
