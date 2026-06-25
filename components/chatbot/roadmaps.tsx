'use client';
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

// Configuramos Mermaid para que haga match con tu diseño oscuro y tipografía
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    fontFamily: "'Rajdhani', sans-serif",
    primaryColor: '#12081c', // C.surface
    primaryTextColor: '#ede0d4', // C.text
    primaryBorderColor: 'rgba(200,80,255,0.4)', // C.purple
    lineColor: '#ff6b35', // C.orange
    secondaryColor: '#1c0a08',
    tertiaryColor: '#08040c'
  }
});

export const MermaidDiagram = ({ chart }: { chart: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Limpiamos el contenedor por si hay renders previos
      containerRef.current.innerHTML = '';
      
      // Renderizamos el diagrama con un ID único para evitar colisiones
      const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
      mermaid.render(id, chart).then(({ svg }) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      }).catch(e => {
        console.error("Error al compilar el mapa neural:", e);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<p style="color: #ff6b35; font-size: 0.7rem;">[ERROR DE DECODIFICACIÓN EN EL MAPA NEURAL]</p>`;
        }
      });
    }
  }, [chart]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        margin: '12px 0', 
        padding: '10px', 
        background: 'rgba(8,4,14,0.5)', 
        border: '1px solid rgba(200,80,255,0.2)', 
        borderRadius: '8px',
        overflowX: 'auto' 
      }} 
    />
  );
};