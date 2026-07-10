// @ts-nocheck
'use client';

import dynamic from 'next/dynamic';
import './explora.css';

// Dynamic imports with SSR disabled for components that use browser APIs
const LivingNebulaShader = dynamic(() => import('../../components/living-nebula'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />,
});

export default function ExploraPage() {
  return (
    <div className="explora-page">
      {/* Background Shader */}
      <div className="explora-background">
        <LivingNebulaShader />
      </div>
    </div>
  );
}
