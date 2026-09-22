export type MathLevel = 'básico' | 'intermedio' | 'avanzado';

export interface MathNode {
  id:          string;
  label:       string;
  shortLabel:  string;
  desc:        string;
  icon:        string;
  color:       string;
  level:       MathLevel;
  prompt:      string;
  optional?:   boolean;
  branch:      string;
  x:           number;
  y:           number;
}

export interface MathEdge {
  from: string;
  to:   string;
}

// ── Color palette — one per main topic for visual variety ──
const C_ARITH    = '#4fc3f7'; // sky blue     — aritmética
const C_ALG_ELE  = '#66bb6a'; // green        — álgebra elemental
const C_GEO_BAS  = '#ffa726'; // orange       — geometría básica
const C_ALG_INT  = '#26c6da'; // cyan         — álgebra intermedia
const C_TRIG     = '#ef5350'; // red          — trigonometría
const C_GEO_ANA  = '#ab47bc'; // purple       — geometría analítica
const C_FN_ADV   = '#ff7043'; // deep orange  — funciones avanzadas
const C_CALC     = '#5c6bc0'; // indigo       — cálculo (límites, derivadas, integrales)

export const MATH_NODES: MathNode[] = [
  // ── Main trunk (y=4) — básico ─────────────────────────────
  {
    id: 'aritmetica',
    label: 'Aritmética y Operaciones Básicas',
    shortLabel: 'Aritmética',
    desc: 'Números enteros, fracciones, decimales y el orden de operaciones (PEMDAS). La base de toda la matemática.',
    icon: '🔢',
    color: C_ARITH,
    level: 'básico',
    prompt: 'Explícame la aritmética y las operaciones básicas: números enteros, fracciones, decimales y el orden de operaciones PEMDAS con ejemplos prácticos.',
    branch: 'aritmetica',
    x: 0, y: 4,
  },
  {
    id: 'numeros-enteros-fracciones',
    label: 'Números Enteros, Fracciones y Decimales',
    shortLabel: 'Números',
    desc: 'Conjuntos numéricos, operaciones con fracciones, conversión entre fracciones y decimales, y números signados.',
    icon: '➗',
    color: C_ARITH,
    level: 'básico',
    prompt: 'Explícame los números enteros, fracciones y decimales en detalle: operaciones, conversiones y ejemplos cotidianos.',
    branch: 'aritmetica',
    x: 0, y: 5,
  },
  {
    id: 'orden-operaciones-pemdas',
    label: 'Orden de Operaciones (PEMDAS)',
    shortLabel: 'PEMDAS',
    desc: 'Regla nemotécnica para resolver expresiones: Paréntesis, Exponentes, Multiplicación/División, Adición/Sustracción.',
    icon: '📋',
    color: C_ARITH,
    level: 'básico',
    prompt: 'Explícame el orden de operaciones PEMDAS con ejemplos paso a paso, incluyendo casos con paréntesis anidados y exponentes.',
    branch: 'aritmetica',
    x: 0, y: 6,
  },
  {
    id: 'proporciones-porcentajes',
    label: 'Proporciones y Porcentajes',
    shortLabel: 'Proporciones',
    desc: 'Razones, proporciones directas e inversas, cálculo de porcentajes, descuentos, intereses y variaciones porcentuales.',
    icon: '％',
    color: C_ARITH,
    level: 'básico',
    prompt: 'Explícame las proporciones y porcentajes: razones, proporciones directas e inversas, cálculo de porcentajes, descuentos e intereses con ejemplos.',
    branch: 'aritmetica',
    x: 1, y: 4,
  },
  {
    id: 'algebra-elemental',
    label: 'Álgebra Elemental',
    shortLabel: 'Álgebra I',
    desc: 'Introducción al álgebra: variables, expresiones algebraicas, ecuaciones lineales y sistemas de ecuaciones.',
    icon: '𝑥',
    color: C_ALG_ELE,
    level: 'básico',
    prompt: 'Explícame el álgebra elemental: variables, expresiones algebraicas, ecuaciones lineales de primer grado y sistemas de ecuaciones.',
    branch: 'algebra-elem',
    x: 2, y: 4,
  },
  {
    id: 'variables-expresiones',
    label: 'Variables y Expresiones Algebraicas',
    shortLabel: 'Variables',
    desc: 'Uso de letras para representar números. Simplificación de expresiones, términos semejantes y evaluación.',
    icon: '🔤',
    color: C_ALG_ELE,
    level: 'básico',
    prompt: 'Explícame las variables y expresiones algebraicas: cómo simplificar, combinar términos semejantes y evaluar expresiones.',
    branch: 'algebra-elem',
    x: 2, y: 5,
  },
  {
    id: 'ecuaciones-lineales',
    label: 'Ecuaciones Lineales de Primer Grado',
    shortLabel: 'Ec. Lineales',
    desc: 'Resolución de ecuaciones de la forma ax + b = 0. Propiedades de igualdad, despeje y aplicaciones prácticas.',
    icon: '＝',
    color: C_ALG_ELE,
    level: 'básico',
    prompt: 'Explícame las ecuaciones lineales de primer grado: cómo resolverlas paso a paso, propiedades de igualdad y aplicaciones prácticas.',
    branch: 'algebra-elem',
    x: 2, y: 6,
  },
  {
    id: 'sistemas-ecuaciones',
    label: 'Sistemas de Ecuaciones Lineales',
    shortLabel: 'Sistemas',
    desc: 'Métodos de resolución: sustitución, igualación, reducción (eliminación) y gráfico. Aplicaciones con problemas de mezclas.',
    icon: '⊞',
    color: C_ALG_ELE,
    level: 'básico',
    prompt: 'Explícame los sistemas de ecuaciones lineales: métodos de sustitución, igualación, reducción y gráfico, con ejemplos prácticos.',
    branch: 'algebra-elem',
    x: 2, y: 7,
  },
  {
    id: 'geometria-basica',
    label: 'Geometría Básica',
    shortLabel: 'Geometría I',
    desc: 'Figuras planas, perímetros, áreas, ángulos, triángulos y el teorema de Pitágoras. La geometría del mundo cotidiano.',
    icon: '📐',
    color: C_GEO_BAS,
    level: 'básico',
    prompt: 'Explícame la geometría básica: figuras planas, perímetros, áreas, ángulos, triángulos y el teorema de Pitágoras.',
    branch: 'geometria-bas',
    x: 3, y: 4,
  },
  {
    id: 'figuras-planas',
    label: 'Figuras Planas (Perímetro y Área)',
    shortLabel: 'Figuras',
    desc: 'Triángulos, cuadriláteros, círculos y polígonos. Cálculo de perímetros y áreas con fórmulas y ejemplos.',
    icon: '⬜',
    color: C_GEO_BAS,
    level: 'básico',
    prompt: 'Explícame las figuras planas: triángulos, cuadriláteros, círculos y polígonos, con sus fórmulas de perímetro y área.',
    branch: 'geometria-bas',
    x: 3, y: 5,
  },
  {
    id: 'angulos-triangulos',
    label: 'Ángulos y Triángulos',
    shortLabel: 'Ángulos',
    desc: 'Clasificación de ángulos, ángulos complementarios y suplementarios, suma de ángulos internos y clasificación de triángulos.',
    icon: '△',
    color: C_GEO_BAS,
    level: 'básico',
    prompt: 'Explícame los ángulos y triángulos: clasificación, ángulos complementarios y suplementarios, y la suma de ángulos internos.',
    branch: 'geometria-bas',
    x: 3, y: 6,
  },
  {
    id: 'pitagoras',
    label: 'Teorema de Pitágoras',
    shortLabel: 'Pitágoras',
    desc: 'a² + b² = c². Aplicaciones para calcular distancias, diagonales y comprobar si un triángulo es rectángulo.',
    icon: '∠',
    color: C_GEO_BAS,
    level: 'básico',
    prompt: 'Explícame el teorema de Pitágoras: su demostración, aplicaciones para calcular distancias y cómo comprobar si un triángulo es rectángulo.',
    branch: 'geometria-bas',
    x: 3, y: 7,
  },

  // ── Main trunk (y=4) — intermedio ─────────────────────────
  {
    id: 'algebra-intermedia',
    label: 'Álgebra Intermedia',
    shortLabel: 'Álgebra II',
    desc: 'Ecuaciones cuadráticas, factorización de polinomios y funciones con dominio, rango y gráficas.',
    icon: '²',
    color: C_ALG_INT,
    level: 'intermedio',
    prompt: 'Explícame el álgebra intermedia: ecuaciones cuadráticas, factorización de polinomios y funciones con dominio, rango y gráficas.',
    branch: 'algebra-int',
    x: 4, y: 4,
  },
  {
    id: 'ecuaciones-cuadraticas',
    label: 'Ecuaciones Cuadráticas',
    shortLabel: 'Ec. Cuadráticas',
    desc: 'Forma ax² + bx + c = 0. Métodos: factorización, completar el cuadrado y fórmula general. Discriminante y naturaleza de raíces.',
    icon: '√',
    color: C_ALG_INT,
    level: 'intermedio',
    prompt: 'Explícame las ecuaciones cuadráticas: métodos de resolución (factorización, completar el cuadrado, fórmula general) y el discriminante.',
    branch: 'algebra-int',
    x: 4, y: 5,
  },
  {
    id: 'factorizacion-polinomios',
    label: 'Factorización de Polinomios',
    shortLabel: 'Factorización',
    desc: 'Factor común, diferencia de cuadrados, trinomios, suma y diferencia de cubos. Teorema del factor y división sintética.',
    icon: '∏',
    color: C_ALG_INT,
    level: 'intermedio',
    prompt: 'Explícame la factorización de polinomios: factor común, diferencia de cuadrados, trinomios, cubos y división sintética.',
    branch: 'algebra-int',
    x: 4, y: 6,
  },
  {
    id: 'funciones-dom-rango',
    label: 'Funciones (Dominio, Rango, Gráficas)',
    shortLabel: 'Funciones I',
    desc: 'Concepto de función, notación f(x), dominio, rango, gráficas en el plano, y tipos: lineal, cuadrática, valor absoluto.',
    icon: 'ƒ',
    color: C_ALG_INT,
    level: 'intermedio',
    prompt: 'Explícame las funciones: concepto, notación f(x), dominio, rango, gráficas y tipos básicos (lineal, cuadrática, valor absoluto).',
    branch: 'algebra-int',
    x: 4, y: 7,
  },
  {
    id: 'trigonometria',
    label: 'Trigonometría',
    shortLabel: 'Trigonometría',
    desc: 'Razones trigonométricas (seno, coseno, tangente) y el círculo unitario. La base para el estudio de fenómenos periódicos.',
    icon: '∿',
    color: C_TRIG,
    level: 'intermedio',
    prompt: 'Explícame la trigonometría: razones trigonométricas (seno, coseno, tangente), identidades y el círculo unitario.',
    branch: 'trigonometria',
    x: 5, y: 4,
  },
  {
    id: 'razones-trigonometricas',
    label: 'Razones Trigonometrías (sen, cos, tan)',
    shortLabel: 'sen, cos, tan',
    desc: 'Definición de seno, coseno y tangente en triángulos rectángulos. Identidades fundamentales y aplicaciones.',
    icon: 'θ',
    color: C_TRIG,
    level: 'intermedio',
    prompt: 'Explícame las razones trigonométricas seno, coseno y tangente en triángulos rectángulos, con identidades y aplicaciones.',
    branch: 'trigonometria',
    x: 5, y: 5,
  },
  {
    id: 'circulo-unitario',
    label: 'Círculo Unitario',
    shortLabel: 'Círculo Unit.',
    desc: 'Representación de ángulos en radianes, valores de seno y coseno en el círculo unitario, y extensión a todos los ángulos.',
    icon: '○',
    color: C_TRIG,
    level: 'intermedio',
    prompt: 'Explícame el círculo unitario: radianes, valores de seno y coseno para ángulos notables y su relación con las razones trigonométricas.',
    branch: 'trigonometria',
    x: 5, y: 6,
  },
  {
    id: 'geometria-analitica',
    label: 'Geometría Analítica',
    shortLabel: 'Geo. Analítica',
    desc: 'Plano cartesiano, distancia entre puntos, y ecuaciones de la recta y la circunferencia. Puente entre álgebra y geometría.',
    icon: '⊕',
    color: C_GEO_ANA,
    level: 'intermedio',
    prompt: 'Explícame la geometría analítica: plano cartesiano, distancia entre puntos, ecuación de la recta y de la circunferencia.',
    branch: 'geometria-ana',
    x: 6, y: 4,
  },
  {
    id: 'plano-cartesiano-distancia',
    label: 'Plano Cartesiano y Distancia entre Puntos',
    shortLabel: 'Plano Cart.',
    desc: 'Coordenadas (x, y), distancia euclidiana, punto medio y pendiente entre dos puntos en el plano cartesiano.',
    icon: '✛',
    color: C_GEO_ANA,
    level: 'intermedio',
    prompt: 'Explícame el plano cartesiano: coordenadas, fórmula de distancia entre dos puntos, punto medio y pendiente.',
    branch: 'geometria-ana',
    x: 6, y: 5,
  },
  {
    id: 'ecuacion-recta-circunferencia',
    label: 'Ecuación de la Recta y la Circunferencia',
    shortLabel: 'Recta y Circ.',
    desc: 'Formas de la ecuación de la recta (pendiente-ordenada, general, simétrica) y ecuación canónica de la circunferencia.',
    icon: '╱',
    color: C_GEO_ANA,
    level: 'intermedio',
    prompt: 'Explícame la ecuación de la recta (formas pendiente-ordenada, general) y la ecuación de la circunferencia con ejemplos.',
    branch: 'geometria-ana',
    x: 6, y: 6,
  },

  // ── Main trunk (y=4) — avanzado ───────────────────────────
  {
    id: 'funciones-avanzadas',
    label: 'Funciones Avanzadas',
    shortLabel: 'Funciones II',
    desc: 'Funciones exponenciales, logarítmicas y trigonométricas con sus gráficas. Modelado de crecimiento y fenómenos periódicos.',
    icon: 'eˣ',
    color: C_FN_ADV,
    level: 'avanzado',
    prompt: 'Explícame las funciones avanzadas: exponenciales, logarítmicas y trigonométricas, con sus gráficas y aplicaciones.',
    branch: 'funciones-adv',
    x: 7, y: 4,
  },
  {
    id: 'funciones-exp-log',
    label: 'Funciones Exponenciales y Logarítmicas',
    shortLabel: 'Exp y Log',
    desc: 'Funciones eˣ y log(x), propiedades de los logaritmos, ecuaciones exponenciales y logarítmicas, y aplicaciones.',
    icon: '㏒',
    color: C_FN_ADV,
    level: 'avanzado',
    prompt: 'Explícame las funciones exponenciales y logarítmicas: propiedades, gráficas, ecuaciones y aplicaciones como crecimiento poblacional.',
    branch: 'funciones-adv',
    x: 7, y: 5,
  },
  {
    id: 'funciones-trig-graficas',
    label: 'Funciones Trigonométricas y sus Gráficas',
    shortLabel: 'Trig Gráficas',
    desc: 'Gráficas de seno, coseno y tangente. Amplitud, periodo, desplazamiento de fase y transformaciones.',
    icon: '〰',
    color: C_FN_ADV,
    level: 'avanzado',
    prompt: 'Explícame las gráficas de las funciones trigonométricas: amplitud, periodo, desplazamiento de fase y transformaciones.',
    branch: 'funciones-adv',
    x: 7, y: 6,
  },
  {
    id: 'limites-continuidad',
    label: 'Límites y Continuidad',
    shortLabel: 'Límites',
    desc: 'Concepto intuitivo y formal de límite. Límites laterales, indeterminaciones (0/0, ∞/∞) y continuidad de funciones.',
    icon: '→',
    color: C_CALC,
    level: 'avanzado',
    prompt: 'Explícame los límites y la continuidad: concepto, límites laterales, indeterminaciones y cómo determinar si una función es continua.',
    branch: 'calculo',
    x: 8, y: 4,
  },
  {
    id: 'derivadas',
    label: 'Derivadas',
    shortLabel: 'Derivadas',
    desc: 'Tasa de variación instantánea. Reglas de derivación y aplicaciones: optimización, razones de cambio y trazado de curvas.',
    icon: 'd/dx',
    color: C_CALC,
    level: 'avanzado',
    prompt: 'Explícame las derivadas: concepto de tasa de variación, reglas de derivación y aplicaciones como optimización y razones de cambio.',
    branch: 'calculo',
    x: 9, y: 4,
  },
  {
    id: 'reglas-derivacion',
    label: 'Reglas de Derivación',
    shortLabel: 'Reglas Deriv.',
    desc: 'Regla de la potencia, producto, cociente, cadena. Derivadas de funciones trigonométricas, exponenciales y logarítmicas.',
    icon: '∂',
    color: C_CALC,
    level: 'avanzado',
    prompt: 'Explícame las reglas de derivación: potencia, producto, cociente y regla de la cadena, con derivadas de funciones trig y exponenciales.',
    branch: 'calculo',
    x: 9, y: 5,
  },
  {
    id: 'aplicaciones-derivadas',
    label: 'Aplicaciones (Razón de Cambio, Optimización)',
    shortLabel: 'Aplicaciones',
    desc: 'Problemas de optimización, máximos y mínimos, análisis de curvas, y razones de cambio relacionadas.',
    icon: '📈',
    color: C_CALC,
    level: 'avanzado',
    prompt: 'Explícame las aplicaciones de las derivadas: optimización, máximos y mínimos, análisis de curvas y razones de cambio relacionadas.',
    branch: 'calculo',
    x: 9, y: 6,
  },
  {
    id: 'integrales',
    label: 'Integrales',
    shortLabel: 'Integrales',
    desc: 'Antiderivadas y área bajo la curva. Teorema fundamental del cálculo que conecta derivadas e integrales.',
    icon: '∫',
    color: C_CALC,
    level: 'avanzado',
    prompt: 'Explícame las integrales: antiderivadas, integral definida, área bajo la curva y el teorema fundamental del cálculo.',
    branch: 'calculo',
    x: 10, y: 4,
  },
  {
    id: 'integral-indefinida',
    label: 'Integral Indefinida (Antiderivadas)',
    shortLabel: 'Integral Indef.',
    desc: 'Cálculo de antiderivadas. Técnicas: sustitución, integración por partes, fracciones parciales.',
    icon: '∮',
    color: C_CALC,
    level: 'avanzado',
    prompt: 'Explícame la integral indefinida: antiderivadas, técnicas de sustitución, integración por partes y fracciones parciales.',
    branch: 'calculo',
    x: 10, y: 5,
  },
  {
    id: 'integral-definida',
    label: 'Integral Definida (Área bajo la Curva)',
    shortLabel: 'Integral Def.',
    desc: 'Integral definida como límite de sumas de Riemann. Teorema fundamental del cálculo y aplicaciones físicas.',
    icon: '∬',
    color: C_CALC,
    level: 'avanzado',
    prompt: 'Explícame la integral definida: sumas de Riemann, teorema fundamental del cálculo y aplicaciones como área bajo la curva y volumen.',
    branch: 'calculo',
    x: 10, y: 6,
  },
];

export const MATH_EDGES: MathEdge[] = [
  // Main trunk — básico
  { from: 'aritmetica',           to: 'numeros-enteros-fracciones' },
  { from: 'aritmetica',           to: 'orden-operaciones-pemdas' },
  { from: 'aritmetica',           to: 'proporciones-porcentajes' },
  { from: 'proporciones-porcentajes', to: 'algebra-elemental' },

  // Álgebra elemental children
  { from: 'algebra-elemental',    to: 'variables-expresiones' },
  { from: 'algebra-elemental',    to: 'ecuaciones-lineales' },
  { from: 'algebra-elemental',    to: 'sistemas-ecuaciones' },

  // Geometría básica children
  { from: 'geometria-basica',     to: 'figuras-planas' },
  { from: 'geometria-basica',     to: 'angulos-triangulos' },
  { from: 'geometria-basica',     to: 'pitagoras' },

  // Trunk — intermedio
  { from: 'algebra-elemental',    to: 'algebra-intermedia' },
  { from: 'geometria-basica',     to: 'trigonometria' },
  { from: 'algebra-intermedia',   to: 'geometria-analitica' },

  // Álgebra intermedia children
  { from: 'algebra-intermedia',   to: 'ecuaciones-cuadraticas' },
  { from: 'algebra-intermedia',   to: 'factorizacion-polinomios' },
  { from: 'algebra-intermedia',   to: 'funciones-dom-rango' },

  // Trigonometría children
  { from: 'trigonometria',        to: 'razones-trigonometricas' },
  { from: 'trigonometria',        to: 'circulo-unitario' },

  // Geometría analítica children
  { from: 'geometria-analitica',  to: 'plano-cartesiano-distancia' },
  { from: 'geometria-analitica',  to: 'ecuacion-recta-circunferencia' },

  // Trunk — avanzado
  { from: 'funciones-dom-rango',  to: 'funciones-avanzadas' },
  { from: 'geometria-analitica',  to: 'limites-continuidad' },

  // Funciones avanzadas children
  { from: 'funciones-avanzadas',  to: 'funciones-exp-log' },
  { from: 'funciones-avanzadas',  to: 'funciones-trig-graficas' },

  // Cálculo trunk
  { from: 'limites-continuidad',  to: 'derivadas' },
  { from: 'derivadas',            to: 'integrales' },

  // Derivadas children
  { from: 'derivadas',            to: 'reglas-derivacion' },
  { from: 'derivadas',            to: 'aplicaciones-derivadas' },

  // Integrales children
  { from: 'integrales',           to: 'integral-indefinida' },
  { from: 'integrales',           to: 'integral-definida' },
];

export const MATH_LEVEL_COLORS: Record<MathLevel, string> = {
  básico:      '#4fc3f7',
  intermedio:  '#ffa726',
  avanzado:    '#7e57c2',
};
