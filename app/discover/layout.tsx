import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Descubre',
  description: 'Descubre la misión, visión y ejes de impacto de ATHERNIX.',
}

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
