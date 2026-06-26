'use client';
import React, { useEffect, useRef, useState, useId } from 'react';
import mermaid from 'mermaid';

// 1. CONFIGURACIÓN GLOBAL
mermaid.initialize({
  startOnLoad: false,
  suppressErrorRendering: true, // ¡ESTA ES LA LÍNEA QUE ELIMINA LAS BOMBAS!
  theme: 'base',
  themeVariables: {
    fontFamily: "'Rajdhani', sans-serif",
    primaryColor: '#12081c',
    primaryTextColor: '#ede0d4',
    primaryBorderColor: 'rgba(200,80,255,0.4)',
    lineColor: '#ff6b35',
    secondaryColor: '#1c0a08',
    tertiaryColor: '#08040c'
  }
});

export const MermaidDiagram = ({ chart }: { chart: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isError, setIsError] = useState(true); // Asumimos que está incompleto al inicio
  const uniqueId = useId().replace(/:/g, ''); // Crea un ID único seguro para React

  useEffect(() => {
    let isMounted = true;

    // 2. DEBOUNCE: Esperamos 400ms sin que la IA escriba antes de procesar
    const timeoutId = setTimeout(async () => {
      if (!containerRef.current) return;

      try {
        const cleanChart = chart.replace(/,\s*$/gm, '').trim();
        
        // Renderizamos usando nuestro ID único
        const { svg } = await mermaid.render(`mermaid-${uniqueId}`, cleanChart);
        
        if (isMounted && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setIsError(false); // ¡Éxito! Ocultamos el mensaje de "Decodificando"
        }
      } catch (e) {
        // Si hay un error de sintaxis temporal, mantenemos el estado de carga
        if (isMounted) {
          setIsError(true);
        }
      }
    }, 400); // 400 milisegundos de respiro para el navegador

    return () => {
      isMounted = false;
      clearTimeout(timeoutId); // Limpiamos el temporizador si llega una letra nueva
    };
  }, [chart, uniqueId]);

  return (
    <div style={{ 
      margin: '12px 0', 
      background: 'rgba(8,4,14,0.5)', 
      border: '1px solid rgba(200,80,255,0.2)', 
      borderRadius: '8px',
      overflowX: 'auto',
      display: 'flex',
      justifyContent: 'center',
      padding: '10px'
    }}>
      
      {/* 3. INTERFAZ DE CARGA ELEGANTE */}
      {isError && (
        <div style={{ 
          padding: '14px', 
          color: 'rgba(210,170,140,0.5)', 
          fontSize: '0.65rem', 
          textAlign: 'center', 
          border: '1px dashed rgba(200,80,255,0.2)', 
          borderRadius: '6px', 
          letterSpacing: '0.1em', 
          textTransform: 'uppercase' 
        }}>
          [ Decodificando red neural... ]
        </div>
      )}
      
      {/* 4. CONTENEDOR DEL GRÁFICO (Se oculta hasta que esté listo) */}
      <div 
        ref={containerRef} 
        style={{ display: isError ? 'none' : 'block', width: '100%' }} 
      />
    </div>
  );
};