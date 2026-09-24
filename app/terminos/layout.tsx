import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos de Servicio',
  description: 'Términos de Servicio de ATHERNIX: condiciones de uso de la plataforma de realidad virtual educativa.',
}

export default function TerminosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
