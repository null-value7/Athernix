'use client';

import { useEffect, useState } from 'react';

export default function ChatbotShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navOffset, setNavOffset] = useState(88);

  useEffect(() => {
    // Hide footer when on chatbot page
    const footer = document.querySelector('footer') as HTMLElement;
    if (footer) footer.style.display = 'none';

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Measure the real bottom edge of the floating navbar and keep a gap below it
    const measure = () => {
      const nav = document.querySelector('.atx-nav') as HTMLElement | null;
      if (nav) setNavOffset(Math.ceil(nav.getBoundingClientRect().bottom) + 12);
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });

    return () => {
      // Show footer again when leaving chatbot
      if (footer) footer.style.display = '';
      document.body.style.overflow = '';
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
    };
  }, []);

  return (
    <div style={{
      height: `calc(100vh - ${navOffset}px)`,
      width: '100vw',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#08040c',
      position: 'fixed',
      top: navOffset,
      left: 0,
      right: 0,
      bottom: 0,
    }}>
      <div style={{
        flex: 1,
        overflow: 'hidden',
        position: 'relative'
      }}>
        {children}
      </div>
    </div>
  );
}
