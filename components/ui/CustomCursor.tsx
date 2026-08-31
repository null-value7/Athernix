// @ts-nocheck
'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let clientX = 0;
    let clientY = 0;
    let isPending = false;

    const handleMouseMove = (e) => {
      clientX = e.clientX;
      clientY = e.clientY;

      if (!isPending) {
        isPending = true;
        window.requestAnimationFrame(() => {
          if (dotRef.current) {
            dotRef.current.style.left = `${clientX}px`;
            dotRef.current.style.top = `${clientY}px`;
          }
          if (ringRef.current) {
            ringRef.current.style.left = `${clientX}px`;
            ringRef.current.style.top = `${clientY}px`;
          }
          isPending = false;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const addHover = () => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.width = '15px';
        dotRef.current.style.height = '15px';
        dotRef.current.style.background = 'var(--orange)';
        ringRef.current.style.width = '50px';
        ringRef.current.style.height = '50px';
        ringRef.current.style.borderColor = 'var(--yellow)';
      }
    };

    const removeHover = () => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.width = '8px';
        dotRef.current.style.height = '8px';
        dotRef.current.style.background = 'var(--yellow)';
        ringRef.current.style.width = '40px';
        ringRef.current.style.height = '40px';
        ringRef.current.style.borderColor = 'var(--orange)';
      }
    };

    // Event delegation on mouseover to capture any interactive element (even dynamically loaded ones)
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.social-btn') ||
        target.closest('.forgot-link') ||
        target.closest('.signup-link a') ||
        target.closest('.signal-btn') ||
        target.closest('.oracle-preset') ||
        target.closest('.cta-btn') ||
        target.closest('.sec-btn') ||
        target.closest('.node');

      if (isInteractive) {
        addHover();
      } else {
        removeHover();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
