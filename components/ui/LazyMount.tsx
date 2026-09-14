'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * LazyMount — Solo monta sus hijos cuando el contenedor entra en el viewport.
 * Útil para componentes WebGL/Three.js pesados que no necesitan renderizarse
 * hasta que el usuario hace scroll hacia ellos.
 *
 * Props:
 *  - rootMargin: margen del IntersectionObserver (default '200px')
 *  - placeholder: nodo a mostrar antes de montar (default null)
 *  - unmountOnExit: si true, desmonta al salir del viewport (default false)
 */
export default function LazyMount({
  children,
  rootMargin = '200px',
  placeholder = null,
  unmountOnExit = false,
}: {
  children: ReactNode;
  rootMargin?: string;
  placeholder?: ReactNode;
  unmountOnExit?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          } else if (unmountOnExit) {
            setVisible(false);
          }
        });
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, unmountOnExit]);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {visible ? children : placeholder}
    </div>
  );
}
