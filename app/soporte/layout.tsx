import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Soporte',
  description: 'Centro de ayuda de ATHERNIX: soporte técnico, preguntas frecuentes y canales de contacto.',
}

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
