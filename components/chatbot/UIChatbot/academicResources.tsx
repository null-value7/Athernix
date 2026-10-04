// components/chatbot/UIChatbot/AcademicSourceCard.tsx
'use client';
import type { AcademicSourcesData } from './generativeUI';
import { protectBrands } from '@/components/ui/ProtectedText';

type Source = AcademicSourcesData['sources'][number];

const iconByType: Record<string, string> = {
  article: '📰',
  paper: '📄',
  pdf: '📕',
  web: '🌐',
};

const labelByType: Record<string, string> = {
  article: 'artículo',
  paper: 'paper',
  pdf: 'pdf',
  web: 'web',
};

export function AcademicSourceCard({
  sources,
  onDeepDive,
}: AcademicSourcesData & { onDeepDive?: (s: Source) => void }) {
  if (!sources?.length) {
    return (
      <div className="text-xs opacity-60 italic px-2 py-1">
        No se encontraron fuentes confiables para este tema.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 my-2">
      {sources.map((s, i) => (
        <div
          key={s.id}
          className="relative rounded-md border border-pink-500/20 bg-black/40 p-3 hover:border-pink-500/50 transition-colors group"
        >
          {/* Número de fuente — coincide con las citas [fuente N] del texto */}
          <span
            className="absolute top-2 right-2 text-[0.6rem] font-bold px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(255,0,110,0.15)', color: '#FF006E' }}
          >
            [{i + 1}]
          </span>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block pr-10"
          >
            <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-widest opacity-50 mb-1">
              <span>{iconByType[s.sourceType]}</span>
              <span>{labelByType[s.sourceType] ?? s.sourceType}</span>
              {s.author && <span>· {protectBrands(s.author)}</span>}
              {s.publishedDate && <span>· {s.publishedDate.slice(0, 10)}</span>}
            </div>
            <div className="font-semibold text-sm mb-1 group-hover:text-pink-400 transition-colors">
              {protectBrands(s.title)}
            </div>
            <p className="text-xs opacity-70 leading-relaxed">{s.highlight}</p>
            <span className="inline-block mt-2 text-[0.65rem] font-bold uppercase tracking-wide text-orange-400">
              Leer artículo original →
            </span>
          </a>
          {onDeepDive && (
            <button
              onClick={() => onDeepDive(s)}
              className="mt-2 w-full text-center text-[0.62rem] font-bold uppercase tracking-widest py-1.5 rounded transition-colors"
              style={{
                border: '1px solid rgba(255,107,0,0.3)',
                color: 'rgba(255,215,0,0.75)',
                background: 'rgba(255,107,0,0.06)',
              }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,107,0,0.14)'; e.currentTarget.style.borderColor = 'rgba(255,107,0,0.55)' }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,107,0,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,107,0,0.3)' }}
            >
              ⟳ Profundizar en esta fuente
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
