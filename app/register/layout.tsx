import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crear cuenta',
  description: 'Crea tu cuenta de ATHERNIX y empieza a explorar la educación inmersiva.',
  robots: { index: false, follow: false },
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
