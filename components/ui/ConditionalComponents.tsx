'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalComponents({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't render these components on auth pages to avoid loops
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/about';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
