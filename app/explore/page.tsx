'use client';

import dynamic from 'next/dynamic';
import '@/components/interfaz/styles/global.css';

const InterfazApp = dynamic(() => import('@/components/interfaz/App'), { ssr: false });

export default function ExplorePage() {
  return (
    <div className="explore-shell">
      <InterfazApp />
    </div>
  );
}
