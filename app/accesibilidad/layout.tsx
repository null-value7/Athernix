import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accesibilidad',
  description: 'Opciones de accesibilidad de la plataforma ATHERNIX: contraste, tamaño de texto, subtítulos y más.',
}

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
