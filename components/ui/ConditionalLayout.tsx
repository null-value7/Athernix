'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/about';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
