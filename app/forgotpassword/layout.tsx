import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recuperar contraseña',
  description: 'Recupera el acceso a tu cuenta de ATHERNIX.',
  robots: { index: false, follow: false },
}

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
