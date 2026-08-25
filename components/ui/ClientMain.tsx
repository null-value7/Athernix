'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

/*
  Fuerza remount completo del <main> cuando cambia la ruta.
  Esto evita errores de "removeChild" generados por componentes
  que manipulan el DOM imperativamente (Three.js, GSAP, etc.).
*/
export default function ClientMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <main key={pathname}>{children}</main>;
}
