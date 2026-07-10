'use client'

export function VectorVisualizer({ v1, v2, resultant }: { v1: number[], v2: number[], resultant: number[] }) {
  return (
    <div style={{
      background: 'rgba(127,255,212,0.05)',
      border: '1px solid rgba(127,255,212,0.2)',
      borderRadius: 8,
      padding: 16,
      marginTop: 8,
    }}>
      <div style={{ fontSize: '0.7rem', color: '#FFD700', marginBottom: 8, fontWeight: 600 }}>
        Visualizador de Vectores
      </div>
      <div style={{ fontSize: '0.65rem', color: 'rgba(210,170,140,0.7)', lineHeight: 1.6 }}>
        <div>Vector 1: [{v1?.join(', ') || 'N/A'}]</div>
        <div>Vector 2: [{v2?.join(', ') || 'N/A'}]</div>
        <div>Resultante: [{resultant?.join(', ') || 'N/A'}]</div>
      </div>
      <div style={{
        width: '100%',
        height: 120,
        background: 'rgba(0,0,0,0.3)',
        borderRadius: 4,
        marginTop: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed rgba(127,255,212,0.2)',
      }}>
        <span style={{ fontSize: '0.6rem', color: 'rgba(127,255,212,0.4)' }}>
          [Visualización gráfica - requiere Canvas/SVG]
        </span>
      </div>
    </div>
  )
}
