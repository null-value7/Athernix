import type { ReactNode } from 'react';

const BRAND_RE = /\b(Athernixito|Athernix|Mundi|Ather)\b/gi;

/**
 * Envuelve los nombres propios de la marca en <span class="notranslate">
 * para que el widget de Google Translate no los traduzca.
 * Acepta cualquier ReactNode: los strings se procesan, el resto pasa igual.
 * Usar en texto que viene de archivos de datos (.ts), donde no se puede
 * marcar el JSX directamente.
 */
export function protectBrands(node: ReactNode): ReactNode {
  if (typeof node !== 'string') return node;
  const parts = node.split(BRAND_RE);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="notranslate" translate="no">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function ProtectedText({ text }: { text: ReactNode }) {
  return <>{protectBrands(text)}</>;
}
