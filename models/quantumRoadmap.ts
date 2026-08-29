export type NodeStatus = 'locked' | 'available' | 'completed';

export interface QuantumNode {
  id:            string;
  label:         string;
  shortLabel:    string;
  desc:          string;
  icon:          string;
  color:         string;
  status:        NodeStatus;
  prerequisites: string[];
  prompt:        string;
  level:         'básico' | 'intermedio' | 'avanzado';
  branch:        'main' | 'schrodinger' | 'espin' | 'advanced';
  x:             number;
  y:             number;
}

export interface QuantumEdge {
  from: string;
  to:   string;
}

export const QUANTUM_NODES: QuantumNode[] = [
  {
    id: 'fundamentos',
    label: 'Fundamentos Matemáticos',
    shortLabel: 'Fundamentos',
    desc: 'Álgebra lineal, números complejos, espacios de Hilbert y notación bra-ket. La base matemática de toda la mecánica cuántica.',
    icon: 'Σ',
    color: '#FF6B00',
    status: 'completed',
    prerequisites: [],
    prompt: 'Explícame los fundamentos matemáticos de la mecánica cuántica: álgebra lineal, números complejos, espacios de Hilbert y notación bra-ket, con ejemplos prácticos.',
    level: 'básico',
    branch: 'main',
    x: 0, y: 3,
  },
  {
    id: 'mecanica-clasica',
    label: 'Mecánica Clásica (Repaso)',
    shortLabel: 'Mec. Clásica',
    desc: 'Breve repaso de mecánica newtoniana y hamiltoniana. Por qué la física clásica falla a escala atómica y qué fenómenos no puede explicar.',
    icon: '⚙',
    color: '#FF6B00',
    status: 'completed',
    prerequisites: ['fundamentos'],
    prompt: 'Hazme un repaso de mecánica clásica: newtoniana y hamiltoniana, y explícame por qué falla a escala atómica y qué fenómenos no puede explicar.',
    level: 'básico',
    branch: 'main',
    x: 1, y: 3,
  },
  {
    id: 'postulados',
    label: 'Postulados de la Mecánica Cuántica',
    shortLabel: 'Postulados',
    desc: 'Los cuatro postulados fundamentales: estado cuántico, observables como operadores, medición y evolución temporal. El marco teórico completo.',
    icon: '◈',
    color: '#FFD700',
    status: 'available',
    prerequisites: ['mecanica-clasica'],
    prompt: 'Explícame los cuatro postulados de la mecánica cuántica en detalle: estado cuántico, observables como operadores hermíticos, medición y colapso, y evolución temporal unitaria.',
    level: 'básico',
    branch: 'main',
    x: 2, y: 3,
  },
  {
    id: 'schrodinger',
    label: 'Función de Onda / Ecuación de Schrödinger',
    shortLabel: 'Ec. Schrödinger',
    desc: 'La ecuación fundamental de la mecánica cuántica. Función de onda, interpretación de Born, ecuación dependiente e independiente del tiempo.',
    icon: 'ψ',
    color: '#00E5A0',
    status: 'locked',
    prerequisites: ['postulados'],
    prompt: 'Explícame la ecuación de Schrödinger en detalle: función de onda, interpretación probabilística de Born, y las versiones dependiente e independiente del tiempo.',
    level: 'intermedio',
    branch: 'schrodinger',
    x: 3, y: 1,
  },
  {
    id: 'incertidumbre',
    label: 'Principio de Incertidumbre',
    shortLabel: 'Incertidumbre',
    desc: 'El principio de Heisenberg: no se puede conocer simultáneamente posición y momento con precisión arbitraria. Interpretación física y matemática.',
    icon: 'Δ',
    color: '#FF006E',
    status: 'locked',
    prerequisites: ['postulados'],
    prompt: 'Explícame el principio de incertidumbre de Heisenberg: su formulación matemática, interpretación física, y por qué no es una limitación instrumental sino fundamental.',
    level: 'intermedio',
    branch: 'main',
    x: 3, y: 3,
  },
  {
    id: 'espin',
    label: 'Espín y Momento Angular',
    shortLabel: 'Espín',
    desc: 'Momento angular orbital y espín intrínseco. Operadores de espín, matrices de Pauli, y acoplamiento espín-órbita.',
    icon: '↻',
    color: '#A855F7',
    status: 'locked',
    prerequisites: ['postulados'],
    prompt: 'Explícame el espín y el momento angular en mecánica cuántica: momento angular orbital, espín intrínseco, matrices de Pauli y acoplamiento espín-órbita.',
    level: 'intermedio',
    branch: 'espin',
    x: 3, y: 5,
  },
  {
    id: 'particula-caja',
    label: 'Partícula en una Caja',
    shortLabel: 'Part. Caja',
    desc: 'El problema más simple con solución cuántica: cuantización de energía, funciones de onda estacionarias, nodos y probabilidad.',
    icon: '□',
    color: '#00E5A0',
    status: 'locked',
    prerequisites: ['schrodinger'],
    prompt: 'Resuelve el problema de la partícula en una caja paso a paso: condiciones de frontera, cuantización de energía, funciones de onda y interpretación probabilística.',
    level: 'intermedio',
    branch: 'schrodinger',
    x: 4, y: 0,
  },
  {
    id: 'efecto-tunel',
    label: 'Efecto Túnel',
    shortLabel: 'Efecto Túnel',
    desc: 'Penetración de barreras de potencial clásicamente prohibidas. Aplicaciones: microscopio de efecto túnel, decaimiento alfa, fusión nuclear estelar.',
    icon: '⇲',
    color: '#00E5A0',
    status: 'locked',
    prerequisites: ['schrodinger'],
    prompt: 'Explícame el efecto túnel cuántico: cómo funciona matemáticamente, por qué viola la intuición clásica, y sus aplicaciones en microscopía STM, decaimiento alfa y fusión nuclear.',
    level: 'intermedio',
    branch: 'schrodinger',
    x: 4, y: 1,
  },
  {
    id: 'oscilador-armonico',
    label: 'Oscilador Armónico Cuántico',
    shortLabel: 'Osc. Armónico',
    desc: 'El modelo cuántico más importante después de la partícula en caja. Niveles de energía equiespaciados, cero-point energy, operadores ladder.',
    icon: '∿',
    color: '#00E5A0',
    status: 'locked',
    prerequisites: ['schrodinger'],
    prompt: 'Explícame el oscilador armónico cuántico: niveles de energía equiespaciados, energía del punto cero, operadores de creación y aniquilación, y aplicaciones en física molecular.',
    level: 'intermedio',
    branch: 'schrodinger',
    x: 4, y: 2,
  },
  {
    id: 'atomo-hidrogeno',
    label: 'Átomo de Hidrógeno',
    shortLabel: 'Át. Hidrógeno',
    desc: 'Solución exacta del átomo de hidrógeno: números cuánticos, orbitales, degeneración y estructura fina. El éxito fundacional de la mecánica cuántica.',
    icon: '◉',
    color: '#A855F7',
    status: 'locked',
    prerequisites: ['espin'],
    prompt: 'Resuelve el átomo de hidrógeno en mecánica cuántica: números cuánticos n, l, m, s, orbitales atómicos, degeneración de niveles y estructura fina.',
    level: 'avanzado',
    branch: 'espin',
    x: 4, y: 5,
  },
  {
    id: 'entrelazamiento',
    label: 'Entrelazamiento Cuántico',
    shortLabel: 'Entrelazamiento',
    desc: 'Correlaciones no locales entre partículas. Teorema de Bell, desigualdades CHSH, y por qué Einstein llamó a esto "acción fantasmal a distancia".',
    icon: '∞',
    color: '#FF006E',
    status: 'locked',
    prerequisites: ['atomo-hidrogeno'],
    prompt: 'Explícame el entrelazamiento cuántico en profundidad: estados de Bell, teorema de Bell, desigualdades CHSH, y las implicaciones para el realismo local.',
    level: 'avanzado',
    branch: 'advanced',
    x: 5, y: 5,
  },
  {
    id: 'computacion-cuantica',
    label: 'Computación Cuántica',
    shortLabel: 'Comp. Cuántica',
    desc: 'Rama avanzada opcional: qubits, puertas cuánticas, algoritmos de Shor y Grover, decoherencia y corrección de errores cuánticos.',
    icon: '⊕',
    color: '#FFD700',
    status: 'locked',
    prerequisites: ['entrelazamiento'],
    prompt: 'Introdúceme a la computación cuántica: qubits, puertas cuánticas, superposición y entrelazamiento como recursos, algoritmos de Shor y Grover, y los desafíos de decoherencia.',
    level: 'avanzado',
    branch: 'advanced',
    x: 6, y: 5,
  },
];

export const QUANTUM_EDGES: QuantumEdge[] = [
  { from: 'fundamentos',       to: 'mecanica-clasica' },
  { from: 'mecanica-clasica',  to: 'postulados' },
  { from: 'postulados',        to: 'schrodinger' },
  { from: 'postulados',        to: 'incertidumbre' },
  { from: 'postulados',        to: 'espin' },
  { from: 'schrodinger',       to: 'particula-caja' },
  { from: 'schrodinger',       to: 'efecto-tunel' },
  { from: 'schrodinger',       to: 'oscilador-armonico' },
  { from: 'espin',             to: 'atomo-hidrogeno' },
  { from: 'atomo-hidrogeno',   to: 'entrelazamiento' },
  { from: 'entrelazamiento',   to: 'computacion-cuantica' },
];

export const BRANCH_COLORS: Record<string, string> = {
  main:       '#FF6B00',
  schrodinger:'#00E5A0',
  espin:      '#A855F7',
  advanced:   '#FF006E',
};

export const STATUS_CONFIG: Record<NodeStatus, { label: string; color: string; icon: string }> = {
  locked:     { label: 'BLOQUEADO',  color: '#555555', icon: '🔒' },
  available:  { label: 'DISPONIBLE', color: '#FFD700', icon: '▶' },
  completed:  { label: 'COMPLETADO', color: '#00E5A0', icon: '✓' },
};
