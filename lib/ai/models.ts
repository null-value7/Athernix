// lib/ai/models.ts — separación de modelos Groq por criticidad de tarea

// Tareas de alta precisión pedagógica: explicaciones, evaluación, contenido
// dentro de nodos de roadmap. Nunca degradar a modelos débiles — explicar
// mal un concepto científico cuesta más que un error visible.
export const PEDAGOGICAL_MODELS = [
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
] as const;

// Tareas triviales/de soporte: títulos, clasificación, shaping de datos.
// El costo de un error es bajo → cadena completa de fallback.
export const UTILITY_MODELS = [
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'qwen/qwen3.6-27b',
  'llama-3.2-3b-preview',
  'llama-3.2-1b-preview',
] as const;

export type AiTaskType = 'pedagogical' | 'utility';

export function getModelForTask(taskType: AiTaskType): readonly string[] {
  return taskType === 'pedagogical' ? PEDAGOGICAL_MODELS : UTILITY_MODELS;
}
