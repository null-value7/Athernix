// components/chatbot/UIChatbot/AcademicSourceCard.tsx
'use client';
import type { AcademicSourcesData } from './generativeUI';

const iconByType: Record<string, string> = {
  article: '📰',
  paper: '📄',
  pdf: '📕',
  web: '🌐',
};

export function AcademicSourceCard({ sources }: AcademicSourcesData) {
  if (!sources?.length) {
    return (
      <div className="text-xs opacity-60 italic px-2 py-1">
        No se encontraron fuentes confiables para este tema.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 my-2">
      {sources.map((s) => (
        <a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-md border border-pink-500/20 bg-black/40 p-3 hover:border-pink-500/50 transition-colors"
        >
          <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-widest opacity-50 mb-1">
            <span>{iconByType[s.sourceType]}</span>
            <span>{s.sourceType}</span>
            {s.author && <span>· {s.author}</span>}
            {s.publishedDate && <span>· {s.publishedDate}</span>}
          </div>
          <div className="font-semibold text-sm mb-1 group-hover:text-pink-400 transition-colors">
            {s.title}
          </div>
          <p className="text-xs opacity-70 leading-relaxed">{s.highlight}</p>
          <span className="inline-block mt-2 text-[0.65rem] font-bold uppercase tracking-wide text-orange-400">
            Leer artículo original →
          </span>
        </a>
      ))}
    </div>
  );
}