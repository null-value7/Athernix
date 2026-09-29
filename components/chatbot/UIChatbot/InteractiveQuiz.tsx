// components/chatbot/UIChatbot/InteractiveQuiz.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';
import type { QuizQuestion } from './generativeUI';
import { submitQuizResult, NodeProgressStatus } from '@/models/AI/chatbot';

interface InteractiveQuizProps {
  area?:      string
  nodeId?:    string
  topic:      string
  questions:  QuizQuestion[]
  notice?:    string
}

const PASS_SCORE = 70;

export function InteractiveQuiz({ area, nodeId, topic, questions, notice }: InteractiveQuizProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [result, setResult] = useState<{ score: number; status: NodeProgressStatus | null } | null>(null);
  const submittedRef = useRef(false);

  if (notice && !questions?.length) {
    return <div className="my-2 text-xs opacity-60 italic px-2 py-1">{notice}</div>;
  }
  if (!questions?.length) return null;

  const answeredCount = answers.filter(a => a !== null).length;
  const allAnswered = answeredCount === questions.length;
  const correctCount = answers.filter((a, i) => a === questions[i].correctIndex).length;

  const pick = (qi: number, oi: number) => {
    if (answers[qi] !== null) return; // ya respondida
    setAnswers(prev => prev.map((a, i) => (i === qi ? oi : a)));
  };

  // Cuando se contestan todas → registrar score una sola vez
  useEffect(() => {
    if (!allAnswered || submittedRef.current) return;
    submittedRef.current = true;
    const score = Math.round((correctCount / questions.length) * 100);
    if (area && nodeId) {
      submitQuizResult({ area, nodeId, score }).then(status =>
        setResult({ score, status })
      );
    } else {
      setResult({ score, status: null });
    }
  }, [allAnswered, correctCount, questions.length, area, nodeId]);

  return (
    <div className="my-2 flex flex-col gap-3">
      <div className="text-[0.6rem] uppercase tracking-[0.25em] opacity-50">
        Quiz · {topic} · {answeredCount}/{questions.length}
      </div>

      {questions.map((q, qi) => {
        const picked = answers[qi];
        const revealed = picked !== null;
        return (
          <div key={qi} className="rounded-lg p-3"
            style={{ background: 'rgba(255,0,110,0.05)', border: '1px solid rgba(255,0,110,0.2)' }}>
            <div className="text-sm font-medium mb-2.5">
              <span className="opacity-40 mr-1.5">{qi + 1}.</span>{q.question}
            </div>
            <div className="flex flex-col gap-1.5">
              {q.options.map((opt, oi) => {
                const isCorrect = oi === q.correctIndex;
                const isPicked = picked === oi;
                let border = 'rgba(255,107,0,0.2)';
                let bg = 'rgba(255,255,255,0.02)';
                let color = '#ede0d4';
                if (revealed) {
                  if (isCorrect)      { border = '#00E5A0'; bg = 'rgba(0,229,160,0.08)'; color = '#00E5A0'; }
                  else if (isPicked)  { border = '#FF006E'; bg = 'rgba(255,0,110,0.08)'; color = '#FF6B9C'; }
                  else                { color = 'rgba(237,224,212,0.4)'; }
                }
                return (
                  <button
                    key={oi}
                    onClick={() => pick(qi, oi)}
                    disabled={revealed}
                    className="flex items-center gap-2 text-left text-xs px-3 py-2 rounded-md transition-colors"
                    style={{ border: `1px solid ${border}`, background: bg, color, cursor: revealed ? 'default' : 'pointer' }}
                  >
                    {revealed && isCorrect && <Check size={12} className="flex-shrink-0" />}
                    {revealed && isPicked && !isCorrect && <X size={12} className="flex-shrink-0" />}
                    {opt}
                  </button>
                );
              })}
            </div>
            {revealed && (
              <div className="mt-2 text-[0.7rem] leading-relaxed" style={{ color: 'rgba(237,224,212,0.6)' }}>
                <span className="uppercase tracking-wider opacity-60 text-[0.55rem] block mb-0.5">Por qué</span>
                {q.explanation}
              </div>
            )}
          </div>
        );
      })}

      {/* Resultado final */}
      {allAnswered && (
        <div className="rounded-lg p-4 text-center"
          style={{
            background: result?.score != null && result.score >= PASS_SCORE ? 'rgba(0,229,160,0.08)' : 'rgba(255,107,0,0.08)',
            border: `1px solid ${result?.score != null && result.score >= PASS_SCORE ? 'rgba(0,229,160,0.4)' : 'rgba(255,107,0,0.35)'}`,
          }}>
          <div className="text-[0.6rem] uppercase tracking-[0.25em] opacity-60 mb-1">Resultado</div>
          <div className="text-2xl font-black" style={{ color: result?.score != null && result.score >= PASS_SCORE ? '#00E5A0' : '#FF6B00' }}>
            {result ? `${result.score}%` : `${correctCount}/${questions.length}`}
          </div>
          <div className="text-xs mt-1 opacity-70">
            {result == null
              ? 'Registrando progreso…'
              : result.score >= PASS_SCORE
                ? 'Tema dominado — nodo marcado como completado.'
                : `Necesitas ${PASS_SCORE}% para completar — marcado para repaso.`}
          </div>
        </div>
      )}
    </div>
  );
}
