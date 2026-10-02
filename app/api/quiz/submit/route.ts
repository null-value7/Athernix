// app/api/quiz/submit/route.ts
import { createClient } from '@/lib/supabase/supabase-server';
import { createServiceClient } from '@/lib/supabase/service';
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

function gradeQuestions(questions: StoredQuestion[], answers: number[]) {
  const results = questions.map((q, i) => ({
    correctIndex: q.correctIndex,
    correct:      answers[i] === q.correctIndex,
    explanation:  q.explanation,
  }));
  const correctCount = results.filter((r) => r.correct).length;
  const score = Math.round((correctCount / questions.length) * 100);
  return { results, correctCount, score };
}

export async function POST(req: Request) {
  // Auth con el cliente de sesión del usuario
  const userClient = await createClient();
  const { data: { user } } = await userClient.auth.getUser();
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

  // Operaciones de datos con service_role: generated_quizzes y los writes
  // de user_node_progress no tienen acceso para el cliente (RLS sin políticas).
  const db = createServiceClient();

  const { data: quiz, error: quizErr } = await db
    .from('generated_quizzes')
    .select('id, user_id, area, node_id, topic, questions, submitted_at, answers, score')
    .eq('id', quizId)
    .single();

  if (quizErr || !quiz || quiz.user_id !== user.id) {
    return apiError(404, 'Quiz no encontrado');
  }

  const questions = quiz.questions as StoredQuestion[];

  // Idempotente: un quiz ya calificado devuelve su resultado almacenado,
  // no genera un nuevo intento ni duplica progreso.
  if (quiz.submitted_at) {
    const stored = gradeQuestions(questions, (quiz.answers as number[]) ?? []);
    return Response.json({
      score:         quiz.score,
      status:        (quiz.score ?? 0) >= PASS_SCORE ? 'completed' : 'needs_review',
      correctCount:  stored.correctCount,
      total:         questions.length,
      passScore:     PASS_SCORE,
      results:       stored.results,
      alreadyGraded: true,
    });
  }

  if (answers.length !== questions.length) {
    return apiError(400, `Se esperaban ${questions.length} respuestas`);
  }

  const { results, correctCount, score } = gradeQuestions(questions, answers);
  const status = score >= PASS_SCORE ? 'completed' : 'needs_review';
  const now = new Date().toISOString();

  // Marcar el quiz como calificado (respuestas + score quedan auditados)
  const { error: markErr } = await db
    .from('generated_quizzes')
    .update({ answers, score, submitted_at: now })
    .eq('id', quizId)
    .is('submitted_at', null); // guard contra carrera de doble envío

  if (markErr) {
    console.error('[quiz/submit] Error marcando quiz:', markErr.message);
    return apiError(500, 'No se pudo registrar el resultado');
  }

  // Upsert de progreso (service_role — el cliente ya no puede escribir progreso)
  const { data: existing } = await db
    .from('user_node_progress')
    .select('attempts, best_score')
    .eq('user_id', user.id)
    .eq('area', quiz.area)
    .eq('node_id', quiz.node_id)
    .maybeSingle();

  const { error: upsertErr } = await db
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
