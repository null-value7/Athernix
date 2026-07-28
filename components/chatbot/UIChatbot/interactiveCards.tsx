// components/chatbot/UIChatbot/InteractiveFlashcards.tsx
'use client';
import { useState } from 'react';
import type { FlashcardDeckData } from './generativeUI';

export function InteractiveFlashcards({ topic, cards }: FlashcardDeckData) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!cards?.length) return null;

  const card = cards[index];
  const isFirst = index === 0;
  const isLast = index === cards.length - 1;

  const goTo = (next: number) => {
    setFlipped(false);
    setIndex(next);
  };

  return (
    <div className="my-2 flex flex-col items-center gap-3">
      <style>{`
        .flip-scene { perspective: 1200px; }
        .flip-card {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(.4,.2,.2,1);
        }
        .flip-card.is-flipped { transform: rotateY(180deg); }
        .flip-face {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          display: flex; align-items: center; justify-content: center;
          text-align: center; padding: 18px;
          border-radius: 10px;
        }
        .flip-face.back { transform: rotateY(180deg); }
      `}</style>

      <div className="text-[0.6rem] uppercase tracking-[0.25em] opacity-50">
        {topic} · {index + 1}/{cards.length}
      </div>

      <div className="flip-scene w-full max-w-xs h-40">
        <div
          className={`flip-card w-full h-full cursor-pointer ${flipped ? 'is-flipped' : ''}`}
          onClick={() => setFlipped((f) => !f)}
        >
          <div
            className="flip-face front"
            style={{ background: 'rgba(255,0,110,0.08)', border: '1px solid rgba(255,0,110,0.3)' }}
          >
            <div>
              <div className="text-[0.55rem] uppercase tracking-widest text-pink-400/70 mb-2">Pregunta</div>
              <div className="text-sm font-medium">{card.question}</div>
              <div className="text-[0.55rem] opacity-40 mt-3">Toca para ver la respuesta</div>
            </div>
          </div>
          <div
            className="flip-face back"
            style={{ background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.3)' }}
          >
            <div>
              <div className="text-[0.55rem] uppercase tracking-widest text-orange-400/70 mb-2">Respuesta</div>
              <div className="text-sm">{card.answer}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          disabled={isFirst}
          onClick={() => goTo(index - 1)}
          className="text-xs uppercase tracking-widest px-3 py-1 rounded border border-pink-500/25 disabled:opacity-25 hover:border-pink-500/60 transition-colors"
        >
          ← Anterior
        </button>
        <div className="flex gap-1">
          {cards.map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: i === index ? '#FF006E' : 'rgba(255,0,110,0.2)' }}
            />
          ))}
        </div>
        <button
          disabled={isLast}
          onClick={() => goTo(index + 1)}
          className="text-xs uppercase tracking-widest px-3 py-1 rounded border border-orange-500/25 disabled:opacity-25 hover:border-orange-500/60 transition-colors"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
} 