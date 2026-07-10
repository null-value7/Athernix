'use client'

export function MermaidDiagram({ chart }: { chart: string }) {
  return (
    <div style={{
      background: 'rgba(200,80,255,0.05)',
      border: '1px solid rgba(200,80,255,0.2)',
      borderRadius: 8,
      padding: 16,
      marginTop: 8,
    }}>
      <pre style={{
        fontFamily: 'monospace',
        fontSize: '0.75rem',
        color: '#FFD700',
        whiteSpace: 'pre-wrap',
        margin: 0,
      }}>
        {chart}
      </pre>
      <p style={{
        fontSize: '0.65rem',
        color: 'rgba(210,170,140,0.4)',
        marginTop: 8,
        fontStyle: 'italic',
      }}>
        [Diagrama Mermaid - requiere integración de mermaid.js]
      </p>
    </div>
  )
}
