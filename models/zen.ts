// ── Modelo del Jardín Zen (módulo de relajación · MenteLibre VR) ──

export type ZenPointInfo = {
  id: string
  num: string
  zone: string
  title: string
  short: string
  desc: string
  helps: string[]
  technique: string
  stat: string
  statLabel: string
  color: string
  /** Posición del punto de luz sobre el árbol */
  position: [number, number, number]
  /** Posición de cámara al enfocar este punto */
  camera: [number, number, number]
}

export const ZEN_COLORS = {
  gold: '#FFD700',
  green: '#00e5a0',
  orange: '#ff6b35',
  purple: '#a855f7',
  pink: '#ff006e',
}

export const ZEN_POINTS: ZenPointInfo[] = [
  {
    id: 'estres',
    num: '01',
    zone: 'RAÍCES',
    title: 'ESTRÉS CRÓNICO',
    short: 'Cuando el cuerpo nunca suelta la alarma.',
    desc: 'El estrés sostenido mantiene elevado el cortisol y acelera el ritmo cardíaco incluso en reposo. Con el tiempo afecta memoria, digestión, sistema inmune y estado de ánimo.',
    helps: [
      'La relajación guiada reduce el cortisol y la presión arterial.',
      'Los entornos VR inmersivos desconectan la mente de los estresores.',
      'El biofeedback de MenteLibre te muestra tu calma en tiempo real.',
    ],
    technique: 'RESPIRACIÓN 4-7-8 · 5 MIN',
    stat: '-23%',
    statLabel: 'CORTISOL TRAS 8 SEMANAS DE PRÁCTICA',
    color: '#ff6b35',
    position: [0.35, -1.05, 0.5],
    camera: [2.4, -0.4, 3.4],
  },
  {
    id: 'ansiedad',
    num: '02',
    zone: 'TRONCO',
    title: 'ANSIEDAD',
    short: 'La mente que vive en el futuro.',
    desc: 'La ansiedad es una respuesta de anticipación constante: pensamientos acelerados, tensión en el pecho y dificultad para concentrarse en el presente.',
    helps: [
      'El anclaje sensorial en escenarios VR devuelve la mente al ahora.',
      'La respiración lenta activa el sistema nervioso parasimpático.',
      'Sesiones cortas y repetidas entrenan la tolerancia a la calma.',
    ],
    technique: 'GROUNDING 5-4-3-2-1 · 4 MIN',
    stat: '-31%',
    statLabel: 'SÍNTOMAS ANSIOSOS CON RELAJACIÓN VR',
    color: '#FFD700',
    position: [0.55, 0.15, 0.25],
    camera: [3.2, 0.6, 3],
  },
  {
    id: 'insomnio',
    num: '03',
    zone: 'COPA ALTA',
    title: 'INSOMNIO',
    short: 'Cuando la noche no repara.',
    desc: 'Dormir mal encadena fatiga, irritabilidad y menor rendimiento cognitivo. La higiene del sueño y la relajación previa son la base de un descanso profundo.',
    helps: [
      'Rutinas de relajación nocturna reducen la latencia del sueño.',
      'Paisajes sonoros y visuales lentos inducen ondas cerebrales alfa.',
      'Menos pantallas estimulantes: experiencias diseñadas para apagarse.',
    ],
    technique: 'BODY SCAN PROGRESIVO · 10 MIN',
    stat: '+42 MIN',
    statLabel: 'DE SUEÑO PROFUNDO PROMEDIO',
    color: '#a855f7',
    position: [-0.15, 2.1, 0.3],
    camera: [1.6, 2.6, 3.6],
  },
  {
    id: 'burnout',
    num: '04',
    zone: 'RAMA OESTE',
    title: 'BURNOUT',
    short: 'El agotamiento que apaga la motivación.',
    desc: 'El síndrome de desgaste combina cansancio emocional, despersonalización y sensación de ineficacia. Es común en estudiantes y docentes bajo presión sostenida.',
    helps: [
      'Micro-pausas restaurativas de 3-5 minutos entre tareas.',
      'La naturaleza virtual reduce la fatiga atencional (teoría ART).',
      'Registrar tu progreso emocional evita recaídas silenciosas.',
    ],
    technique: 'PAUSA RESTAURATIVA · 3 MIN',
    stat: '2×',
    statLabel: 'RECUPERACIÓN ATENCIONAL CON PAUSAS VERDES',
    color: '#00e5a0',
    position: [-1.35, 1.15, 0.15],
    camera: [-3.4, 1.5, 2.8],
  },
  {
    id: 'tension',
    num: '05',
    zone: 'RAMA ESTE',
    title: 'TENSIÓN MUSCULAR',
    short: 'El estrés que se guarda en el cuerpo.',
    desc: 'Hombros rígidos, mandíbula apretada y dolores de cabeza tensionales son la huella física de la mente acelerada. El cuerpo también necesita aprender a soltar.',
    helps: [
      'La relajación muscular progresiva libera zonas de carga.',
      'La visualización guiada disminuye la percepción del dolor.',
      'Estiramientos conscientes sincronizados con la respiración.',
    ],
    technique: 'JACOBSON PROGRESIVO · 8 MIN',
    stat: '-38%',
    statLabel: 'DOLOR TENSIONAL PERCIBIDO',
    color: '#ff006e',
    position: [1.4, 1.5, -0.1],
    camera: [3.6, 1.9, 2.2],
  },
]
