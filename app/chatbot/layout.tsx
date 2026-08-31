'use client';

import Navbar from '@/components/ui/Navbar';
import { useEffect } from 'react';

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Hide footer when on chatbot page
    const footer = document.querySelector('footer') as HTMLElement;
    if (footer) footer.style.display = 'none';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Show footer again when leaving chatbot
      if (footer) footer.style.display = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      overflow: 'hidden', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#08040c',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      <div style={{ flexShrink: 0 }}>
        <Navbar />
      </div>
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
