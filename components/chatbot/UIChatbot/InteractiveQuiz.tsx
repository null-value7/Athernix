// components/chatbot/UIChatbot/InteractiveQuiz.tsx
'use client';
import { useState } from 'react';
import { Check, X } from 'lucide-react';

// El payload del tool NO incluye correctIndex ni explanation — el grading
// ocurre en /api/quiz/submit contra el quiz persistido server-side.
interface QuizQuestionInput {
  question: string;
  options:  string[];
}

interface QuestionResult {
  correctIndex: number;
  correct:      boolean;
  explanation:  string;
}

interface InteractiveQuizProps {
  quizId?:    string
  area?:      string
  nodeId?:    string
  topic:      string
  questions:  QuizQuestionInput[]
  notice?:    string
  locked?:    boolean
}

const PASS_SCORE = 70;

export function InteractiveQuiz({ quizId, topic, questions, notice }: InteractiveQuizProps) {
  const [answers, setAnswers]   = useState<(number | null)[]>(() => questions.map(() => null));
  const [phase, setPhase]       = useState<'answering' | 'submitting' | 'done'>('answering');
  const [result, setResult]     = useState<{
    score: number; status: string; correctCount: number; results: QuestionResult[];
  } | null>(null);
  const [error, setError]       = useState<string | null>(null);

  if (notice && !questions?.length) {
    return <div className="my-2 text-xs opacity-60 italic px-2 py-1">{notice}</div>;
  }
  if (!questions?.length) return null;

  const answeredCount = answers.filter(a => a !== null).length;
  const allAnswered = answeredCount === questions.length;
  const revealed = phase === 'done' && result !== null;

  const pick = (qi: number, oi: number) => {
    if (phase !== 'answering') return;
    setAnswers(prev => prev.map((a, i) => (i === qi ? oi : a)));
  };

  const submit = async () => {
    if (!quizId || !allAnswered || phase !== 'answering') return;
    setPhase('submitting');
    setError(null);
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId, answers }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error ?? `Error ${res.status}`);
      }
      const data = await res.json();
      setResult({ score: data.score, status: data.status, correctCount: data.correctCount, results: data.results });
      setPhase('done');
    } catch (e: any) {
      setError(e?.message ?? 'No se pudo calificar');
      setPhase('answering');
    }
  };

  return (
    <div className="my-2 flex flex-col gap-3">
      <div className="text-[0.6rem] uppercase tracking-[0.25em] opacity-50">
        Quiz · {topic} · {answeredCount}/{questions.length}
      </div>

      {questions.map((q, qi) => {
        const picked = answers[qi];
        const qResult = result?.results[qi];
        return (
          <div key={qi} className="rounded-lg p-3"
            style={{ background: 'rgba(255,0,110,0.05)', border: '1px solid rgba(255,0,110,0.2)' }}>
            <div className="text-sm font-medium mb-2.5">
              <span className="opacity-40 mr-1.5">{qi + 1}.</span>{q.question}
            </div>
            <div className="flex flex-col gap-1.5">
              {q.options.map((opt, oi) => {
                const isPicked = picked === oi;
                const isCorrect = revealed && oi === qResult?.correctIndex;
                const isWrongPick = revealed && isPicked && !isCorrect;
                let border = isPicked ? 'rgba(255,107,0,0.6)' : 'rgba(255,107,0,0.2)';
                let bg = isPicked ? 'rgba(255,107,0,0.1)' : 'rgba(255,255,255,0.02)';
                let color = '#ede0d4';
                if (revealed) {
                  if (isCorrect)       { border = '#00E5A0'; bg = 'rgba(0,229,160,0.08)'; color = '#00E5A0'; }
                  else if (isWrongPick){ border = '#FF006E'; bg = 'rgba(255,0,110,0.08)'; color = '#FF6B9C'; }
                  else                 { color = 'rgba(237,224,212,0.4)'; }
                }
                return (
                  <button
                    key={oi}
                    onClick={() => pick(qi, oi)}
                    disabled={phase !== 'answering'}
                    className="flex items-center gap-2 text-left text-xs px-3 py-2 rounded-md transition-colors"
                    style={{ border: `1px solid ${border}`, background: bg, color, cursor: phase === 'answering' ? 'pointer' : 'default' }}
                  >
                    {isCorrect && <Check size={12} className="flex-shrink-0" />}
                    {isWrongPick && <X size={12} className="flex-shrink-0" />}
                    {opt}
                  </button>
                );
              })}
            </div>
            {revealed && qResult && (
              <div className="mt-2 text-[0.7rem] leading-relaxed" style={{ color: 'rgba(237,224,212,0.6)' }}>
                <span className="uppercase tracking-wider opacity-60 text-[0.55rem] block mb-0.5">Por qué</span>
                {qResult.explanation}
              </div>
            )}
          </div>
        );
      })}

      {/* Error de envío */}
      {error && (
        <div className="text-xs px-3 py-2 rounded-md" style={{ background: 'rgba(255,0,110,0.1)', border: '1px solid rgba(255,0,110,0.3)', color: '#FF6B9C' }}>
          {error} — inténtalo de nuevo.
        </div>
      )}

      {/* Botón enviar */}
      {phase !== 'done' && (
        <button
          onClick={submit}
          disabled={!allAnswered || phase === 'submitting' || !quizId}
          className="self-center px-5 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all"
          style={{
            background: allAnswered ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${allAnswered ? 'rgba(0,229,160,0.5)' : 'rgba(255,255,255,0.1)'}`,
            color: allAnswered ? '#00E5A0' : 'rgba(237,224,212,0.35)',
            cursor: allAnswered && phase === 'answering' ? 'pointer' : 'not-allowed',
          }}
        >
          {phase === 'submitting' ? 'CALIFICANDO…' : 'ENVIAR RESPUESTAS'}
        </button>
      )}

      {/* Resultado final */}
      {revealed && result && (
        <div className="rounded-lg p-4 text-center"
          style={{
            background: result.score >= PASS_SCORE ? 'rgba(0,229,160,0.08)' : 'rgba(255,107,0,0.08)',
            border: `1px solid ${result.score >= PASS_SCORE ? 'rgba(0,229,160,0.4)' : 'rgba(255,107,0,0.35)'}`,
          }}>
          <div className="text-[0.6rem] uppercase tracking-[0.25em] opacity-60 mb-1">Resultado</div>
          <div className="text-2xl font-black" style={{ color: result.score >= PASS_SCORE ? '#00E5A0' : '#FF6B00' }}>
            {result.score}%
          </div>
          <div className="text-xs mt-1 opacity-70">
            {result.score >= PASS_SCORE
              ? `${result.correctCount}/${questions.length} correctas — tema dominado, nodo completado.`
              : `${result.correctCount}/${questions.length} correctas — necesitas ${PASS_SCORE}% para completar; marcado para repaso.`}
          </div>
        </div>
      )}
    </div>
  );
}
