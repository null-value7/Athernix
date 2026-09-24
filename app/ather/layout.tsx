import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Athernixito',
  description: 'Conoce a Ather, el ajolote robot asistente del ecosistema ATHERNIX.',
}

export default function AtherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
