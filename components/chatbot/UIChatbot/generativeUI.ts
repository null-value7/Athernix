// components/chatbot/UIChatbot/generativeUI.ts
import { z } from 'zod';

// 1. Tarjeta de fuente académica
export const AcademicSourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
  author: z.string().nullable(),
  publishedDate: z.string().nullable(),
  highlight: z.string().describe('Resumen de 1-2 líneas del hallazgo clave'),
  sourceType: z.enum(['article', 'paper', 'pdf', 'web']),
});
export const AcademicSourcesSchema = z.object({
  sources: z.array(AcademicSourceSchema).min(1).max(6),
});

// 2. Flashcards
export const FlashcardSchema = z.object({
  question: z.string(),
  answer: z.string(),
});
export const FlashcardDeckSchema = z.object({
  topic: z.string(),
  cards: z.array(FlashcardSchema).min(3).max(8),
});

// 3. Tabla comparativa
export const ComparisonRowSchema = z.object({
  criterion: z.string(),
  valueA: z.string(),
  valueB: z.string(),
  advantage: z.enum(['A', 'B', 'tie']).optional(),
});
export const ComparisonTableSchema = z.object({
  itemA: z.string(),
  itemB: z.string(),
  rows: z.array(ComparisonRowSchema).min(2).max(10),
});

// 4. Línea de tiempo
export const TimelineEventSchema = z.object({
  date: z.string(),
  title: z.string(),
  description: z.string(),
});
export const ConceptTimelineSchema = z.object({
  topic: z.string(),
  events: z.array(TimelineEventSchema).min(3).max(12),
});

// Tipos inferidos para el front
export type AcademicSourcesData = z.infer<typeof AcademicSourcesSchema>;
export type FlashcardDeckData = z.infer<typeof FlashcardDeckSchema>;
export type ComparisonTableData = z.infer<typeof ComparisonTableSchema>;
export type ConceptTimelineData = z.infer<typeof ConceptTimelineSchema>;