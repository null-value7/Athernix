// ═══════════════════════════════════════════
// MODELO — /experience
// Datos y tipos puros del recorrido editorial de la página
// de experiencia. Sin imports de React, DOM ni Three.js.
// ═══════════════════════════════════════════

export type DeviceId = 'phone' | 'tablet' | 'desktop' | 'headset';
export type TopicId = 'understand' | 'practice' | 'discover';
export type ImmersionId = '3d' | 'vr';
export type OpportunityId = 'education' | 'heritage' | 'creation';
export type ChapterId = 'inicio' | 'dispositivos' | 'athernixito' | 'inmersion' | 'el-salvador';
export type Vec3 = [number, number, number];

export const EXPERIENCE_PALETTE = {
  background: '#08000a',
  pink: '#FF006E',
  orange: '#FF6B00',
  gold: '#FFD700',
  text: '#FFF4E8',
} as const;

export const CHAPTERS = [
  { id: 'inicio', label: 'El viaje', short: 'Inicio', number: '00' },
  { id: 'dispositivos', label: 'A tu medida', short: 'Dispositivos', number: '01' },
  { id: 'athernixito', label: 'Tu guía IA', short: 'Athernixito', number: '02' },
  { id: 'inmersion', label: 'Otra dimensión', short: '3D + VR', number: '03' },
  { id: 'el-salvador', label: 'Desde aquí', short: 'El Salvador', number: '04' },
] as const;

export const DEVICES: ReadonlyArray<{
  id: DeviceId;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
}> = [
  {
    id: 'phone',
    label: 'Móvil',
    eyebrow: 'EN TU BOLSILLO',
    title: 'La curiosidad va contigo.',
    description:
      'Descubre la plataforma, consulta contenidos y conversa con Ather desde una interfaz que se adapta a tu pantalla y a tus gestos.',
    detail: 'Navegación táctil · Contenido adaptable',
  },
  {
    id: 'tablet',
    label: 'Tablet',
    eyebrow: 'UN POCO MÁS DE ESPACIO',
    title: 'Toca. Explora. Conecta ideas.',
    description:
      'Más espacio para leer, descubrir los módulos y explorar las vistas 3D compatibles. Una experiencia cómoda en horizontal o vertical.',
    detail: 'Pantalla flexible · Interacción táctil',
  },
  {
    id: 'desktop',
    label: 'PC',
    eyebrow: 'AMPLÍA TU MUNDO',
    title: 'Dale espacio a la inmersión.',
    description:
      'Explora con teclado y ratón, estudia junto a Ather y accede a las experiencias de escritorio compatibles desde el navegador.',
    detail: 'Teclado y ratón · Experiencias de escritorio',
  },
  {
    id: 'headset',
    label: 'Visor VR',
    eyebrow: 'DA EL SIGUIENTE PASO',
    title: 'Pasa de observar a estar ahí.',
    description:
      'En un visor y navegador compatibles, las experiencias preparadas para VR te permiten mirar alrededor y explorar el espacio con otra perspectiva.',
    detail: 'Requiere visor y navegador compatibles con WebXR',
  },
];

export const TOPICS: ReadonlyArray<{
  id: TopicId;
  label: string;
  question: string;
  answer: string;
}> = [
  {
    id: 'understand',
    label: 'Entender',
    question: '¿Me lo explicas de otra forma?',
    answer:
      'Podemos dividir una idea en pasos, conectarla con un ejemplo y volver a intentarlo a tu ritmo.',
  },
  {
    id: 'practice',
    label: 'Practicar',
    question: '¿Cómo puedo repasar lo aprendido?',
    answer:
      'Con preguntas, fichas de estudio y pequeños retos para que descubras qué dominas y qué quieres reforzar.',
  },
  {
    id: 'discover',
    label: 'Descubrir',
    question: '¿Por dónde empiezo a explorar?',
    answer:
      'Empieza por lo que te da curiosidad: nuestro patrimonio, un recorrido virtual o una nueva pregunta sobre ciencia.',
  },
];

export const IMMERSIONS: ReadonlyArray<{
  id: ImmersionId;
  label: string;
  title: string;
  description: string;
  detail: string;
}> = [
  {
    id: '3d',
    label: 'Explorar en 3D',
    title: 'Una idea que puedes rodear.',
    description:
      'Gira un objeto, observa sus detalles y entiende cómo se relacionan sus partes. El 3D convierte una imagen plana en algo que puedes explorar.',
    detail: 'Interactúa desde la pantalla con ratón o gestos.',
  },
  {
    id: 'vr',
    label: 'Entrar en VR',
    title: 'Un lugar del que puedes formar parte.',
    description:
      'La realidad virtual añade presencia: mirar a tu alrededor, percibir la escala y recorrer un entorno. La IA puede acompañar esa exploración con contexto y explicaciones.',
    detail: 'El acceso inmersivo depende del visor, el navegador y cada experiencia.',
  },
];

export const OPPORTUNITIES: ReadonlyArray<{
  id: OpportunityId;
  label: string;
  title: string;
  description: string;
}> = [
  {
    id: 'education',
    label: 'Educación',
    title: 'Aprender haciendo.',
    description:
      'Visualizar una molécula o recorrer un escenario histórico abre nuevas formas de explicar. El acompañamiento docente sigue siendo esencial.',
  },
  {
    id: 'heritage',
    label: 'Patrimonio',
    title: 'Lo nuestro, desde otra perspectiva.',
    description:
      'Las recreaciones y los recorridos virtuales pueden acercar la memoria y los lugares de El Salvador a quienes todavía no los conocen.',
  },
  {
    id: 'creation',
    label: 'Creación local',
    title: 'También podemos crear el futuro.',
    description:
      'Diseño 3D, programación y uso crítico de la IA: habilidades con las que estudiantes y creadores pueden desarrollar sus propias experiencias.',
  },
];

export const EXPERIENCE_COPY = {
  hero: {
    eyebrow: 'ATHERNIX / EXPERIENCIA',
    title: ['NO LO MIRES.', 'VÍVELO.'],
    description:
      'Una plataforma que viaja de tu pantalla a un mundo inmersivo. Explora, pregunta y descubre a tu manera.',
    cta: 'Comenzar el recorrido',
    secondary: 'Explorar módulos',
    footnote: 'Móvil · Tablet · PC · VR compatible',
  },
  devices: {
    eyebrow: '01 / A TU MEDIDA',
    title: ['TU MUNDO.', 'TU PANTALLA.'],
    description:
      'Elige desde dónde explorar. La web adapta su interfaz; cada experiencia tiene sus propios requisitos.',
    note: 'Las experiencias 3D y VR pueden requerir más potencia y compatibilidad que la navegación de la web.',
  },
  assistant: {
    eyebrow: '02 / CONOCE A TU GUÍA',
    title: ['UN POCO DE IA.', 'MUCHA CURIOSIDAD.'],
    description:
      'Athernixito pone cara a la curiosidad. Ather es el asistente de IA que te ayuda a entender conceptos, practicar y descubrir nuevas preguntas.',
    demoLabel: 'Ejemplo de acompañamiento',
    link: 'Conversar con Ather',
    greeting: '¡Hola! ¿Qué descubrimos hoy?',
  },
  immersion: {
    eyebrow: '03 / OTRA DIMENSIÓN',
    title: ['EL CONOCIMIENTO', 'TOMA FORMA.'],
    description:
      'Tres herramientas que se complementan: el 3D hace visible, la VR te sitúa dentro y la IA te ayuda a comprender.',
  },
  country: {
    eyebrow: '04 / DESDE EL SALVADOR',
    title: ['EL FUTURO TAMBIÉN', 'SE CREA AQUÍ.'],
    description:
      'La IA ya avanza en El Salvador, pero el acceso a conectividad, equipos y formación sigue siendo desigual. Acercar el 3D y la VR a más aulas y espacios culturales es una oportunidad por construir.',
    mission:
      'Athernix busca acercar estas herramientas a nuestra realidad: aprender con contexto local, explorar nuestro patrimonio y despertar nuevas vocaciones.',
    sourceLabel: 'Contexto sobre IA y acceso digital · UNESCO',
    sourceHref: 'https://www.unesco.org/ethics-ai/es/elsalvador',
  },
  closing: {
    eyebrow: 'TU SIGUIENTE DESCUBRIMIENTO',
    title: 'La siguiente dimensión empieza contigo.',
    description: 'Elige una experiencia. Haz una pregunta. Empieza desde la pantalla que tienes.',
  },
} as const;
