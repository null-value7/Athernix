// components/chatbot/UIChatbot/ConceptTimeline.tsx
'use client';
import type { ConceptTimelineData } from './generativeUI';

export function ConceptTimeline({ topic, events }: ConceptTimelineData) {
  if (!events?.length) return null;

  return (
    <div className="my-2">
      <div className="text-[0.6rem] uppercase tracking-[0.25em] opacity-50 mb-3">{topic}</div>
      <div className="relative pl-5">
        {/* línea vertical */}
        <div
          className="absolute left-[7px] top-1 bottom-1 w-px"
          style={{ background: 'linear-gradient(180deg, #FF006E, #FF6B00)' }}
        />
        <div className="flex flex-col gap-4">
          {events.map((e, i) => (
            <div key={i} className="relative">
              {/* nodo */}
              <span
                className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full border-2"
                style={{
                  background: '#08000a',
                  borderColor: i % 2 === 0 ? '#FF006E' : '#FF6B00',
                }}
              />
              <div className="text-[0.6rem] uppercase tracking-widest opacity-50 mb-0.5">{e.date}</div>
              <div className="text-sm font-semibold mb-0.5">{e.title}</div>
              <p className="text-xs opacity-70 leading-relaxed">{e.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}