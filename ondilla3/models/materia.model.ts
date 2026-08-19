// ═══════════════════════════════════════════
// MODEL — Materias básicas de Educación Básica en El Salvador
// Fuente: currículo nacional del Ministerio de Educación, Ciencia
// y Tecnología (MINED). Datos puros, sin lógica de UI ni de 3D.
// ═══════════════════════════════════════════

import { COLORS } from "@/lib/theme";

export type MateriaSlug = "matematica" | "lenguaje" | "ciencia" | "sociales";

export interface Materia {
  slug: MateriaSlug;
  numero: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  color: string;
  colorSecundario: string;
  temas: string[];
  dato: string;
  /** Islas del recorrido 3D, en orden de aparición al hacer scroll. */
  ordenViaje: number;
}

export const MATERIAS: Materia[] = [
  {
    slug: "matematica",
    numero: "01",
    nombre: "Matemática",
    tagline: "El lenguaje del universo",
    descripcion:
      "Números, formas y patrones que explican todo, desde una órbita planetaria hasta el interés de una cuenta de ahorro. En Matemática entrenamos la lógica que sostiene la ciencia, la tecnología y la vida diaria.",
    color: COLORS.gold,
    colorSecundario: COLORS.orange,
    temas: ["Números y operaciones", "Álgebra y funciones", "Geometría y medida", "Estadística y probabilidad"],
    dato: "Un torus knot como el que ves flotando puede describirse con una sola función paramétrica.",
    ordenViaje: 0,
  },
  {
    slug: "lenguaje",
    nombre: "Lenguaje y Literatura",
    numero: "02",
    tagline: "La memoria de un pueblo, en palabras",
    descripcion:
      "Leer, escribir y narrar el mundo. Lenguaje y Literatura nos conecta con la tradición oral salvadoreña, la gramática que ordena nuestras ideas y la lectura crítica que nos vuelve ciudadanos informados.",
    color: COLORS.red,
    colorSecundario: COLORS.gold,
    temas: ["Comprensión lectora", "Expresión oral y escrita", "Gramática y ortografía", "Literatura salvadoreña"],
    dato: "Cada letra que ves flotar alrededor del libro es geometría 3D generada en tiempo real.",
    ordenViaje: 1,
  },
  {
    slug: "ciencia",
    numero: "03",
    nombre: "Ciencia y Tecnología",
    tagline: "Preguntar, observar, comprobar",
    descripcion:
      "El método científico aplicado a nuestro entorno: cuerpo humano, ecosistemas, energía y materia. Ciencia y Tecnología despierta la curiosidad que convierte preguntas en descubrimientos.",
    color: COLORS.orange,
    colorSecundario: COLORS.gold,
    temas: ["Cuerpo humano y salud", "Ecosistemas de El Salvador", "Materia y energía", "Método científico"],
    dato: "La doble hélice que orbita frente a ti tiene la misma proporción matemática que el ADN real.",
    ordenViaje: 2,
  },
  {
    slug: "sociales",
    numero: "04",
    nombre: "Estudios Sociales y Cívica",
    tagline: "El Salvador, visto desde arriba",
    descripcion:
      "Historia, geografía y civismo para entender de dónde venimos y cómo construimos comunidad. Estudios Sociales y Cívica forma ciudadanos conscientes de sus derechos, deberes e identidad.",
    color: COLORS.amber,
    colorSecundario: COLORS.red,
    temas: ["Geografía de El Salvador", "Historia nacional", "Educación cívica", "Democracia y derechos"],
    dato: "El punto que brilla sobre el globo marca, a escala, la posición real de El Salvador.",
    ordenViaje: 3,
  },
];

export function getMateria(slug: string): Materia | undefined {
  return MATERIAS.find((m) => m.slug === slug);
}

export function getMateriaBySlugOrThrow(slug: string): Materia {
  const materia = getMateria(slug);
  if (!materia) throw new Error(`Materia no encontrada: ${slug}`);
  return materia;
}
