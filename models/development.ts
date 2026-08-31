export interface STEMTopic {
  id:       string
  label:    string   // sub-topic label
  level:    'básico' | 'intermedio'
  prompt:   string   // pre-built prompt for the AI chat
}

export interface STEMArea {
  id:          string
  icon:        string
  area:        string           // eyebrow label
  title:       string           // module name
  desc:        string
  color:       string
  glow:        string
  topics:      STEMTopic[]
  bibliography: BibItem[]
}

export interface BibItem {
  title:  string
  author: string
  url:    string
  type:   'libro' | 'artículo' | 'curso' | 'video'
}

export interface RoadmapCard {
  id:     string
  icon:   string
  title:  string
  desc:   string
  color:  string
  prompt: string   // pre-built roadmap prompt
}

export interface NewsItem {
  id:       string
  tag:      string
  tagColor: string
  title:    string
  summary:  string
  date:     string
  url:      string
}

export interface DevZoneState {
  activeArea:    string | null  // expanded STEM area id
  activeTopic:   string | null  // expanded topic id inside area
  searchQuery:   string
}

export const initialDevZoneState: DevZoneState = {
  activeArea:  null,
  activeTopic: null,
  searchQuery: '',
}

// ── STEM Areas ────────────────────────────────────────────────
export const STEM_AREAS: STEMArea[] = [
  {
    id: 'fisica',
    icon: '⬡',
    area: 'Física Cuántica',
    title: 'QUANTUM_LAB',
    desc: 'Desde los fundamentos de la mecánica ondulatoria hasta los principios del entrelazamiento cuántico.',
    color: '#00e5a0',
    glow: 'rgba(0,229,160,0.25)',
    topics: [
      { id: 'f1', label: 'Fundamentos de mecánica cuántica', level: 'básico',     prompt: 'Explícame los fundamentos de la mecánica cuántica desde cero, con ejemplos prácticos y analogías cotidianas.' },
      { id: 'f2', label: 'Dualidad onda-partícula',           level: 'básico',     prompt: 'Explícame la dualidad onda-partícula: qué es, cómo se descubrió y qué implica para nuestra comprensión de la realidad.' },
      { id: 'f3', label: 'Principio de incertidumbre',        level: 'básico',     prompt: 'Explica el principio de incertidumbre de Heisenberg con ejemplos concretos y su importancia en la física moderna.' },
      { id: 'f4', label: 'Superposición cuántica',            level: 'intermedio', prompt: 'Explícame la superposición cuántica en detalle: qué es matemáticamente, cómo se observa y su relación con la computación cuántica.' },
      { id: 'f5', label: 'Entrelazamiento cuántico',          level: 'intermedio', prompt: 'Dame una explicación profunda del entrelazamiento cuántico, sus implicaciones y aplicaciones en telecomunicaciones cuánticas.' },
    ],
    bibliography: [
      { title: 'Principios de Mecánica Cuántica',     author: 'Paul Dirac',              url: 'https://archive.org/details/principlesofquan0000dira', type: 'libro'    },
      { title: 'Introduction to Quantum Mechanics',   author: 'David Griffiths',         url: 'https://www.cambridge.org/core/books/introduction-to-quantum-mechanics', type: 'libro' },
      { title: 'Quantum Computing for Everyone',      author: 'MIT OpenCourseWare',       url: 'https://ocw.mit.edu/courses/8-370x-quantum-information-science-i', type: 'curso' },
    ],
  },
  {
    id: 'biologia',
    icon: '◈',
    area: 'Biología Celular',
    title: 'CELL_EXPLORER',
    desc: 'La célula como unidad de vida: estructura, función, genética y biotecnología aplicada.',
    color: '#ff6b35',
    glow: 'rgba(255,107,53,0.25)',
    topics: [
      { id: 'b1', label: 'Estructura celular',              level: 'básico',     prompt: 'Explícame la estructura de la célula eucariota y procariota, sus organelos y sus funciones principales.' },
      { id: 'b2', label: 'ADN y síntesis de proteínas',     level: 'básico',     prompt: 'Explica el proceso de síntesis de proteínas: transcripción, traducción y el rol del ADN y ARN.' },
      { id: 'b3', label: 'División celular: mitosis',        level: 'básico',     prompt: 'Describe detalladamente el proceso de mitosis, sus fases y su importancia en el crecimiento y reparación.' },
      { id: 'b4', label: 'Epigenética',                     level: 'intermedio', prompt: 'Explícame qué es la epigenética, cómo los factores ambientales modifican la expresión génica y sus implicaciones médicas.' },
      { id: 'b5', label: 'CRISPR y edición genética',       level: 'intermedio', prompt: 'Dame una explicación completa de CRISPR-Cas9: cómo funciona, sus aplicaciones actuales y dilemas éticos.' },
    ],
    bibliography: [
      { title: 'Molecular Biology of the Cell',   author: 'Alberts et al.',            url: 'https://www.ncbi.nlm.nih.gov/books/NBK21054/', type: 'libro'    },
      { title: 'The Gene: An Intimate History',   author: 'Siddhartha Mukherjee',       url: 'https://www.penguinrandomhouse.com/books/234652/the-gene-by-siddhartha-mukherjee/', type: 'libro' },
      { title: 'iBiology - Cell Biology Courses', author: 'iBiology',                   url: 'https://www.ibiology.org/cell-biology/', type: 'curso' },
    ],
  },
  {
    id: 'astronomia',
    icon: '◎',
    area: 'Astronomía',
    title: 'COSMOS_MAP',
    desc: 'Del sistema solar a los confines del universo observable. Cosmología, astrofísica y exploración espacial.',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.25)',
    topics: [
      { id: 'a1', label: 'Sistema solar y planetas',         level: 'básico',     prompt: 'Explícame el sistema solar: formación, estructura, planetas y sus características principales.' },
      { id: 'a2', label: 'Tipos de estrellas y ciclo estelar', level: 'básico',   prompt: 'Describe los tipos de estrellas, el diagrama HR y el ciclo de vida estelar desde su formación hasta su muerte.' },
      { id: 'a3', label: 'Agujeros negros',                  level: 'básico',     prompt: 'Explica qué son los agujeros negros, cómo se forman, sus tipos y qué pasa en el horizonte de eventos.' },
      { id: 'a4', label: 'Relatividad general aplicada',     level: 'intermedio', prompt: 'Explica cómo la relatividad general de Einstein describe la gravedad y su importancia para la astrofísica moderna.' },
      { id: 'a5', label: 'Energía y materia oscura',         level: 'intermedio', prompt: 'Dame una explicación profunda sobre la materia oscura y la energía oscura: evidencias, teorías y misterios actuales.' },
    ],
    bibliography: [
      { title: 'Cosmos: A Personal Voyage',      author: 'Carl Sagan',                  url: 'https://www.imdb.com/title/tt0081846/', type: 'video'    },
      { title: 'A Brief History of Time',        author: 'Stephen Hawking',             url: 'https://www.penguinrandomhouse.com/books/119504/a-brief-history-of-time-by-stephen-hawking/', type: 'libro' },
      { title: 'NASA Open Learning',             author: 'NASA',                         url: 'https://www.nasa.gov/learning-resources/', type: 'curso' },
    ],
  },
  {
    id: 'matematicas',
    icon: '△',
    area: 'Matemáticas',
    title: 'MATH_FORGE',
    desc: 'Álgebra, cálculo, estadística y geometría: el lenguaje universal de la ciencia y la tecnología.',
    color: '#ffaa00',
    glow: 'rgba(255,170,0,0.25)',
    topics: [
      { id: 'm1', label: 'Álgebra lineal esencial',          level: 'básico',     prompt: 'Explícame álgebra lineal desde cero: vectores, matrices, transformaciones y sus aplicaciones en IA y gráficos.' },
      { id: 'm2', label: 'Cálculo diferencial',              level: 'básico',     prompt: 'Introduce el cálculo diferencial: límites, derivadas, reglas de derivación y aplicaciones físicas.' },
      { id: 'm3', label: 'Estadística y probabilidad',       level: 'básico',     prompt: 'Explica los conceptos fundamentales de estadística y probabilidad con ejemplos prácticos aplicados a datos reales.' },
      { id: 'm4', label: 'Cálculo integral',                 level: 'intermedio', prompt: 'Explica el cálculo integral: integrales definidas e indefinidas, técnicas de integración y aplicaciones en física e ingeniería.' },
      { id: 'm5', label: 'Matemáticas para Machine Learning', level: 'intermedio', prompt: 'Dame un recorrido por las matemáticas esenciales para Machine Learning: álgebra lineal, cálculo multivariable, estadística bayesiana y optimización.' },
    ],
    bibliography: [
      { title: 'Mathematics for Machine Learning', author: 'Deisenroth, Faisal, Ong',  url: 'https://mml-book.github.io/', type: 'libro'    },
      { title: '3Blue1Brown - Essence of Calculus', author: '3Blue1Brown',             url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr', type: 'video' },
      { title: 'Khan Academy - Math',              author: 'Khan Academy',              url: 'https://www.khanacademy.org/math', type: 'curso' },
    ],
  },
  {
    id: 'programacion',
    icon: '⊕',
    area: 'Computación & IA',
    title: 'CODE_NEXUS',
    desc: 'Fundamentos de programación, algoritmos, estructuras de datos e inteligencia artificial.',
    color: '#ff3060',
    glow: 'rgba(255,48,96,0.25)',
    topics: [
      { id: 'p1', label: 'Fundamentos de programación',      level: 'básico',     prompt: 'Explícame los fundamentos de la programación: variables, condicionales, bucles, funciones y paradigmas principales.' },
      { id: 'p2', label: 'Algoritmos y complejidad',         level: 'básico',     prompt: 'Introduce los algoritmos más importantes: búsqueda, ordenamiento, y explica la notación Big-O con ejemplos.' },
      { id: 'p3', label: 'Estructuras de datos',             level: 'básico',     prompt: 'Explica las estructuras de datos esenciales: arrays, listas enlazadas, pilas, colas, árboles y grafos con casos de uso.' },
      { id: 'p4', label: 'Machine Learning básico',          level: 'intermedio', prompt: 'Dame una introducción completa a Machine Learning: tipos de aprendizaje, algoritmos clave y flujo de trabajo de un proyecto real.' },
      { id: 'p5', label: 'Redes neuronales y Deep Learning', level: 'intermedio', prompt: 'Explica cómo funcionan las redes neuronales artificiales, backpropagation y las arquitecturas principales de Deep Learning.' },
    ],
    bibliography: [
      { title: 'The Algorithm Design Manual',    author: 'Steven Skiena',               url: 'https://www.algorist.com/', type: 'libro'    },
      { title: 'Deep Learning',                  author: 'Goodfellow, Bengio, Courville', url: 'https://www.deeplearningbook.org/', type: 'libro' },
      { title: 'fast.ai - Practical Deep Learning', author: 'fast.ai',                  url: 'https://www.fast.ai/', type: 'curso' },
    ],
  },
  {
    id: 'quimica',
    icon: '◆',
    area: 'Química',
    title: 'CHEM_REACTOR',
    desc: 'Tabla periódica, enlaces químicos, reacciones y termodinámica aplicada a la vida cotidiana.',
    color: '#00ccff',
    glow: 'rgba(0,204,255,0.25)',
    topics: [
      { id: 'q1', label: 'Estructura atómica',               level: 'básico',     prompt: 'Explícame la estructura del átomo: núcleo, electrones, modelos atómicos y la tabla periódica moderna.' },
      { id: 'q2', label: 'Tipos de enlace químico',          level: 'básico',     prompt: 'Describe los tipos de enlaces químicos: iónico, covalente, metálico y sus implicaciones en las propiedades de los materiales.' },
      { id: 'q3', label: 'Reacciones químicas',              level: 'básico',     prompt: 'Explica los tipos de reacciones químicas, balanceo de ecuaciones y la estequiometría con ejemplos prácticos.' },
      { id: 'q4', label: 'Termodinámica química',            level: 'intermedio', prompt: 'Introduce la termodinámica química: entalpía, entropía, energía libre de Gibbs y equilibrio químico.' },
      { id: 'q5', label: 'Química orgánica básica',          level: 'intermedio', prompt: 'Explícame los fundamentos de la química orgánica: hidrocarburos, grupos funcionales y reacciones orgánicas básicas.' },
    ],
    bibliography: [
      { title: 'Chemistry: The Central Science',  author: 'Brown et al.',                url: 'https://www.pearson.com/chemistry-central-science', type: 'libro'    },
      { title: 'Organic Chemistry (OpenStax)',     author: 'OpenStax',                    url: 'https://openstax.org/books/organic-chemistry/pages/1-introduction', type: 'libro' },
      { title: 'Khan Academy - Chemistry',        author: 'Khan Academy',                url: 'https://www.khanacademy.org/science/chemistry', type: 'curso' },
    ],
  },
]

// ── Roadmaps ─────────────────────────────────────────────────
export const ROADMAP_CARDS: RoadmapCard[] = [
  {
    id: 'r1', icon: '◈', color: '#ff6b35',
    title: 'Científico de Datos',
    desc: 'Ruta completa desde Python hasta modelos de ML en producción.',
    prompt: 'Hazme un roadmap detallado con aprendizaje eficiente para convertirme en Científico de Datos: desde cero hasta nivel profesional, con recursos, tiempos estimados y orden de temas.',
  },
  {
    id: 'r2', icon: '⬡', color: '#00e5a0',
    title: 'Física Teórica',
    desc: 'De la mecánica clásica a la mecánica cuántica y relatividad.',
    prompt: 'Hazme un roadmap detallado con aprendizaje eficiente para estudiar Física Teórica de forma autodidacta: desde fundamentos hasta mecánica cuántica y relatividad, con libros y recursos.',
  },
  {
    id: 'r3', icon: '◎', color: '#a855f7',
    title: 'Astrofísica',
    desc: 'Astronomía observacional, cosmología y física de partículas.',
    prompt: 'Hazme un roadmap detallado con aprendizaje eficiente para aprender Astrofísica de forma independiente, desde astronomía básica hasta cosmología, con recursos actualizados.',
  },
  {
    id: 'r4', icon: '△', color: '#ffaa00',
    title: 'Matemáticas Avanzadas',
    desc: 'Análisis real, álgebra abstracta y topología.',
    prompt: 'Hazme un roadmap detallado con aprendizaje eficiente para dominar Matemáticas Avanzadas: análisis real, álgebra abstracta, topología y matemáticas para física, con libros y cursos.',
  },
]

// ── STEM News ─────────────────────────────────────────────────
export const STEM_NEWS: NewsItem[] = [
  {
    id: 'n1', tag: 'Física Cuántica', tagColor: '#00e5a0',
    title: 'Computadora cuántica alcanza 1,000 qubits estables',
    summary: 'Un equipo de investigadores logró mantener coherencia cuántica en un procesador de 1,000 qubits durante 10 milisegundos, abriendo la puerta a cálculos imposibles para computadoras clásicas.',
    date: 'Jun 2026',
    url: 'https://www.nature.com/subjects/quantum-computing',
  },
  {
    id: 'n2', tag: 'Biología', tagColor: '#ff6b35',
    title: 'CRISPR elimina VIH en células humanas por primera vez',
    summary: 'Científicos reportan la erradicación completa del virus del VIH en células de pacientes usando una versión mejorada de CRISPR-Cas9, un avance hacia una cura funcional definitiva.',
    date: 'May 2026',
    url: 'https://www.cell.com/cell/crispr',
  },
  {
    id: 'n3', tag: 'IA & Computación', tagColor: '#ff3060',
    title: 'Nuevos modelos de IA diseñan moléculas medicinales autónomamente',
    summary: 'Sistemas de IA generativa ahora pueden proponer y validar candidatos a fármacos en días en lugar de años, reduciendo el costo de descubrimiento de medicamentos en un 90%.',
    date: 'Jun 2026',
    url: 'https://www.science.org/ai-drug-discovery',
  },
  {
    id: 'n4', tag: 'Astronomía', tagColor: '#a855f7',
    title: 'James Webb detecta atmósfera en exoplaneta potencialmente habitable',
    summary: 'El telescopio James Webb confirmó la presencia de vapor de agua y dióxido de carbono en la atmósfera de K2-18b, un exoplaneta a 120 años luz en la zona habitable de su estrella.',
    date: 'Abr 2026',
    url: 'https://www.nasa.gov/james-webb-telescope',
  },
]

// ── Stat cards (inspired by the reference image) ──────────────
export interface StatCard {
  icon:  string
  value: string
  label: string
  color: string
}

export const STAT_CARDS: StatCard[] = [
  { icon: '⬡', value: '6',   label: 'Áreas STEM',    color: '#ff6b35' },
  { icon: '◈', value: '30',  label: 'Temas',          color: '#00e5a0' },
  { icon: '△', value: '4',   label: 'Roadmaps',       color: '#a855f7' },
  { icon: '◎', value: '18',  label: 'Bibliografías',  color: '#ffaa00' },
  { icon: '⊕', value: '4',   label: 'Noticias STEM',  color: '#ff3060' },
  { icon: '◆', value: '∞',   label: 'Con Ather IA',   color: '#00ccff' },
]

// ── Helpers ───────────────────────────────────────────────────
export function getLevelBadge(level: STEMTopic['level']): { label: string; color: string } {
  return level === 'básico'
    ? { label: 'BÁSICO',      color: '#00e5a0' }
    : { label: 'INTERMEDIO',  color: '#ffaa00' }
}

export function getBibIcon(type: BibItem['type']): string {
  const icons: Record<BibItem['type'], string> = {
    libro:    '📖',
    artículo: '📄',
    curso:    '🎓',
    video:    '▶',
  }
  return icons[type]
}