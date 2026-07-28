export const VectorVisualizer = ({ v1, v2, resultant }: any) => {
  const scale = 30; // Factor para que se vea bien en pantalla
  const offset = 150; // Centrado en el canvas de 300x300

  return (
    <svg width="300" height="300" style={{ background: '#0a0a1a', borderRadius: '8px' }}>
      {/* Ejes */}
      <line x1="0" y1={offset} x2="300" y2={offset} stroke="#333" />
      <line x1={offset} y1="0" x2={offset} y2="300" stroke="#333" />
      
      {/* Vector 1 (Rojo) */}
      <line x1={offset} y1={offset} x2={offset + v1.x * scale} y2={offset - v1.y * scale} 
            stroke="#ff6b35" strokeWidth="4" />
            
      {/* Vector 2 (Azul) */}
      <line x1={offset} y1={offset} x2={offset + v2.x * scale} y2={offset - v2.y * scale} 
            stroke="#3b82f6" strokeWidth="4" />
            
      {/* Vector Resultante (Verde neón - Estilo Athernix) */}
      <line x1={offset} y1={offset} x2={offset + resultant.x * scale} y2={offset - resultant.y * scale} 
            stroke="#7fffd4" strokeWidth="6" strokeDasharray="5,5" />
    </svg>
  );
};