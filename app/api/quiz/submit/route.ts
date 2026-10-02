// app/api/quiz/submit/route.ts
import { createClient } from '@/lib/supabase/supabase-server';
import {
  apiError,
  getClientIp,
  isRateLimited,
  logSecurityEvent,
  rateLimitResponse,
} from '@/lib/security';

export const maxDuration = 30;

const PASS_SCORE = 70; // ≥70% → nodo 'completed', si no → 'needs_review'
const RATE_LIMIT = { limit: 15, windowMs: 60_000 };

interface StoredQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    logSecurityEvent('auth.required', { route: '/api/quiz/submit', ip: getClientIp(req) });
    return apiError(401, 'No autenticado');
  }

  const rlKey = `quiz-submit:${user.id}`;
  if (isRateLimited(rlKey, RATE_LIMIT.limit, RATE_LIMIT.windowMs)) {
    return rateLimitResponse(rlKey);
  }

  let body: { quizId?: string; answers?: number[] };
  try {
    body = await req.json();
  } catch {
    return apiError(400, 'Cuerpo de petición inválido');
  }

  const { quizId, answers } = body;
  if (typeof quizId !== 'string' || !Array.isArray(answers)) {
    return apiError(400, 'quizId y answers son requeridos');
  }

  // El quiz debe pertenecer al usuario — RLS también lo garantiza
  const { data: quiz, error: quizErr } = await supabase
    .from('generated_quizzes')
    .select('id, user_id, area, node_id, topic, questions')
    .eq('id', quizId)
    .eq('user_id', user.id)
    .single();

  if (quizErr || !quiz) {
    return apiError(404, 'Quiz no encontrado');
  }

  const questions = quiz.questions as StoredQuestion[];
  if (answers.length !== questions.length) {
    return apiError(400, `Se esperaban ${questions.length} respuestas`);
  }

  // Calificar en el servidor contra los correctIndex almacenados
  const results = questions.map((q, i) => ({
    correctIndex: q.correctIndex,
    correct:      answers[i] === q.correctIndex,
    explanation:  q.explanation,
  }));
  const correctCount = results.filter((r) => r.correct).length;
  const score = Math.round((correctCount / questions.length) * 100);
  const status = score >= PASS_SCORE ? 'completed' : 'needs_review';
  const now = new Date().toISOString();

  // Upsert de progreso (server-side — el cliente nunca reporta su score)
  const { data: existing } = await supabase
    .from('user_node_progress')
    .select('attempts, best_score')
    .eq('user_id', user.id)
    .eq('area', quiz.area)
    .eq('node_id', quiz.node_id)
    .maybeSingle();

  const { error: upsertErr } = await supabase
    .from('user_node_progress')
    .upsert({
      user_id:           user.id,
      area:              quiz.area,
      node_id:           quiz.node_id,
      status,
      attempts:          (existing?.attempts ?? 0) + 1,
      best_score:        Math.max(existing?.best_score ?? 0, score),
      last_score:        score,
      last_attempted_at: now,
      completed_at:      status === 'completed' ? now : null,
    }, { onConflict: 'user_id,area,node_id' });

  if (upsertErr) {
    console.error('[quiz/submit] Error actualizando progreso:', upsertErr.message);
    return apiError(500, 'No se pudo registrar el resultado');
  }

  return Response.json({
    score,
    status,
    correctCount,
    total:      questions.length,
    passScore:  PASS_SCORE,
    results,    // feedback por pregunta: correctIndex + explanation
  });
}
