// app/api/quiz/submit/route.ts
import { createClient } from '@/lib/supabase/supabase-server';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
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
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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
  // Auth con el cliente de sesión del usuario — el userId sale SOLO de la
  // sesión verificada, nunca del body.
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
  if (
    typeof quizId !== 'string' || !UUID_RE.test(quizId) ||
    !Array.isArray(answers) || !answers.every((a) => Number.isInteger(a))
  ) {
    return apiError(400, 'quizId (uuid) y answers (enteros) son requeridos');
  }

  // Todas las operaciones de datos van por service_role: generated_quizzes
  // tiene RLS sin políticas y user_node_progress no permite writes de cliente.
  const db = getSupabaseAdmin();

  // 1. Leer el quiz pendiente (id + dueño + no enviado)
  const { data: quiz, error: quizErr } = await db
    .from('generated_quizzes')
    .select('id, user_id, area, node_id, topic, questions')
    .eq('id', quizId)
    .eq('user_id', user.id)
    .is('submitted_at', null)
    .maybeSingle();

  if (quizErr || !quiz) {
    return apiError(409, 'Quiz ya enviado o no encontrado');
  }

  const questions = quiz.questions as StoredQuestion[];

  // Validación: longitud y rango de cada índice
  if (
    answers.length !== questions.length ||
    !questions.every((q, i) => answers[i] >= 0 && answers[i] < q.options.length)
  ) {
    return apiError(400, `Se esperaban ${questions.length} respuestas válidas`);
  }

  // 2. Defensa en profundidad: re-verificar prerequisitos del nodo antes
  //    de aceptar el envío (el quiz pudo generarse y luego cambiar el estado).
  const { ROADMAP_NODES_BY_AREA } = await import('@/components/chatbot/tools/educational');
  const node = ROADMAP_NODES_BY_AREA[quiz.area]?.find((n) => n.id === quiz.node_id);
  if (node && node.prerequisites.length > 0) {
    const { data: progress } = await db
      .from('user_node_progress')
      .select('node_id, status')
      .eq('user_id', user.id)
      .eq('area', quiz.area)
      .in('node_id', node.prerequisites);

    const completed = new Set(
      (progress ?? []).filter((p) => p.status === 'completed').map((p) => p.node_id)
    );
    if (node.prerequisites.some((p) => !completed.has(p))) {
      return apiError(403, 'Los prerequisitos de este tema ya no están completados');
    }
  }

  // 3. Calificar en servidor contra los correctIndex almacenados
  const { results, correctCount, score } = gradeQuestions(questions, answers);
  const now = new Date().toISOString();

  // 4. Envío atómico de un solo uso:
  //    UPDATE ... WHERE id AND user_id AND submitted_at IS NULL → si no
  //    afecta filas, el quiz ya fue enviado (o la carrera la ganó otra request).
  const { data: submitted, error: submitErr } = await db
    .from('generated_quizzes')
    .update({ answers, score, submitted_at: now })
    .eq('id', quizId)
    .eq('user_id', user.id)
    .is('submitted_at', null)
    .select('id')
    .maybeSingle();

  if (submitErr) {
    console.error('[quiz/submit] Error marcando quiz:', submitErr.message);
    return apiError(500, 'No se pudo registrar el resultado');
  }
  if (!submitted) {
    return apiError(409, 'Quiz ya enviado o no encontrado');
  }

  // 5. Upsert de progreso. Un reintento con score <70 NO degrada un
  //    nodo ya 'completed'.
  const { data: existing } = await db
    .from('user_node_progress')
    .select('attempts, best_score, status, completed_at')
    .eq('user_id', user.id)
    .eq('area', quiz.area)
    .eq('node_id', quiz.node_id)
    .maybeSingle();

  const passed = score >= PASS_SCORE;
  const nextStatus =
    passed || existing?.status === 'completed' ? 'completed' : 'needs_review';

  const { error: upsertErr } = await db
    .from('user_node_progress')
    .upsert({
      user_id:           user.id,
      area:              quiz.area,
      node_id:           quiz.node_id,
      status:            nextStatus,
      attempts:          (existing?.attempts ?? 0) + 1,
      best_score:        Math.max(existing?.best_score ?? 0, score),
      last_score:        score,
      last_attempted_at: now,
      completed_at:      nextStatus === 'completed' ? (existing?.completed_at ?? now) : null,
    }, { onConflict: 'user_id,area,node_id' });

  if (upsertErr) {
    console.error('[quiz/submit] Error actualizando progreso:', upsertErr.message);
    return apiError(500, 'No se pudo registrar el resultado');
  }

  // 6. Feedback por pregunta solo tras el UPDATE exitoso
  return Response.json({
    score,
    passed,
    status:       nextStatus,
    correctCount,
    total:        questions.length,
    passScore:    PASS_SCORE,
    results,
  });
}
