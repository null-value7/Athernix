// components/chatbot/UIChatbot/ComparisonTable.tsx
'use client';
import type { ComparisonTableData } from './generativeUI';

function AdvantageMark({ side, advantage }: { side: 'A' | 'B'; advantage?: 'A' | 'B' | 'tie' }) {
  if (!advantage || advantage === 'tie') {
    return <span className="opacity-30">—</span>;
  }
  const wins = advantage === side;
  return wins ? (
    <span className="text-green-400">✅</span>
  ) : (
    <span className="text-red-400/70">❌</span>
  );
}

export function ComparisonTable({ itemA, itemB, rows }: ComparisonTableData) {
  if (!rows?.length) return null;

  return (
    <div className="my-2 overflow-x-auto rounded-md border border-pink-500/20">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="text-left" style={{ background: 'rgba(255,0,110,0.08)' }}>
            <th className="p-2 font-semibold uppercase tracking-wide text-[0.6rem] opacity-60">Criterio</th>
            <th className="p-2 font-semibold uppercase tracking-wide text-[0.6rem] text-pink-400">{itemA}</th>
            <th className="p-2 font-semibold uppercase tracking-wide text-[0.6rem] text-orange-400">{itemB}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-t border-pink-500/10"
              style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}
            >
              <td className="p-2 font-medium opacity-80">{row.criterion}</td>
              <td className="p-2">
                <div className="flex items-center gap-1.5">
                  <AdvantageMark side="A" advantage={row.advantage} />
                  <span>{row.valueA}</span>
                </div>
              </td>
              <td className="p-2">
                <div className="flex items-center gap-1.5">
                  <AdvantageMark side="B" advantage={row.advantage} />
                  <span>{row.valueB}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}