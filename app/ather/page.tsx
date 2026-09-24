'use client';

import { useEffect, useRef } from 'react';
import { Experience } from '@/components/ather/views/Experience';
import { StoryOverlay } from '@/components/ather/views/StoryOverlay';
import './ather.css';

export default function AthernixitoPage() {
  const progressRef = useRef(0);
  const scrollElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <main className="animaicon-shell">
      <div className="grain" />
      <div className="frame" />
      <div className="letterbox letterbox-top" aria-hidden="true" />
      <div className="letterbox letterbox-bottom" aria-hidden="true" />
      <Experience progressRef={progressRef} scrollElRef={scrollElRef} />
      <StoryOverlay progressRef={progressRef} scrollElRef={scrollElRef} />
    </main>
  );
}
