import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acerca de nosotros',
  description: 'Conoce NEO VORTEX LABS y la misión de ATHERNIX: llevar realidad virtual e IA a la educación de El Salvador.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
