import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel de administración',
  description: 'Panel de administración de ATHERNIX.',
  robots: { index: false, follow: false },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
