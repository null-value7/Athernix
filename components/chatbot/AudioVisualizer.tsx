'use client';

import { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isListening: boolean;
  isSpeaking: boolean;
}

export default function AudioVisualizer({ isListening, isSpeaking }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Crear animación de ondas estilo Gemini
    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      if (isListening || isSpeaking) {
        const time = Date.now() / 1000;
        const amplitude = isSpeaking ? 1.5 : 1.0;
        const frequency = isSpeaking ? 3 : 2;
        
        // Dibujar múltiples ondas concéntricas
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          const radius = 20 + i * 15 + Math.sin(time * frequency + i) * 10 * amplitude;
          const opacity = (1 - i / 5) * 0.6;
          
          // Gradiente radial para cada onda
          const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
          const color = isSpeaking ? '192, 96, 255' : '255, 107, 53';
          gradient.addColorStop(0, `rgba(${color}, ${opacity})`);
          gradient.addColorStop(0.5, `rgba(${color}, ${opacity * 0.5})`);
          gradient.addColorStop(1, `rgba(${color}, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Dibujar partículas orbitando
        for (let i = 0; i < 8; i++) {
          const angle = (time * 2 + i * (Math.PI / 4)) % (Math.PI * 2);
          const orbitRadius = 40 + Math.sin(time * 3 + i) * 5;
          const x = centerX + Math.cos(angle) * orbitRadius;
          const y = centerY + Math.sin(angle) * orbitRadius;
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = isSpeaking ? 'rgba(192, 96, 255, 0.8)' : 'rgba(255, 107, 53, 0.8)';
          ctx.fill();
        }
      } else {
        // Estado inactivo: círculo suave pulsante
        const time = Date.now() / 1000;
        const radius = 25 + Math.sin(time) * 3;
        
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, 'rgba(200, 80, 255, 0.3)');
        gradient.addColorStop(0.5, 'rgba(200, 80, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(200, 80, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isListening, isSpeaking]);

  return (
    <div style={{ position: 'relative', width: 120, height: 120 }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
      {/* Icono central */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: isSpeaking 
            ? 'rgba(192, 96, 255, 0.2)' 
            : isListening 
              ? 'rgba(255, 107, 53, 0.2)' 
              : 'rgba(200, 80, 255, 0.1)',
          border: `2px solid ${isSpeaking ? '#c060ff' : isListening ? '#ff6b35' : 'rgba(200, 80, 255, 0.3)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
        }}
      >
        {isListening ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 20, height: 20, color: '#ff6b35' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"/>
          </svg>
        ) : isSpeaking ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 20, height: 20, color: '#c060ff' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 20, height: 20, color: 'rgba(200, 80, 255, 0.5)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"/>
          </svg>
        )}
      </div>
    </div>
  );
}
