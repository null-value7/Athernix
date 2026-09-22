// ═══════════════════════════════════════════
// MODEL — Datos de ubicaciones seleccionables
// ═══════════════════════════════════════════

export type UnityBuildKey = 'history' | 'mental' | 'default';

export interface MundiLocation {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  country: string;
  category: string;
  description: string;
  stats: { label: string; value: string }[];
  color: string;
  experienceUrl: string;
  buildKey?: UnityBuildKey;
}

export const LOCATIONS: MundiLocation[] = [
  {
    id: 'joya-de-ceren',
    name: 'Joya de Cerén',
    code: 'SV-001',
    lat: 40.7128,
    lng: -74.0060,
    country: 'El Salvador',
    category: 'SITIO_ARQUEOLÓGICO',
    description:
      'La "Pompeya de América". Aldea maya sepultada por la erupción de Loma Caldera hace 1,400 años. Patrimonio de la Humanidad UNESCO, preservada en el tiempo para explorar la vida cotidiana mesoamericana.',
    stats: [
      { label: 'FUNDACIÓN', value: '~600 D.C.' },
      { label: 'ESTRUCTURAS', value: '18+' },
      { label: 'NIVEL_VR', value: 'COMPLETO' },
    ],
    color: '#FF6B00',
    experienceUrl: '/mundi/experience/joya-de-ceren',
    buildKey: 'history',
  },
  {
    id: 'tazumal',
    name: 'Tazumal',
    code: 'SV-002',
    lat: -22.9068,
    lng: -43.1729,
    country: 'El Salvador',
    category: 'RUINAS_MAYAS',
    description:
      'Complejo ceremonial maya en Chalchuapa. "El lugar donde se consumen las víctimas" alberga la pirámide más alta de El Salvador, con más de 1,200 años de historia ritual y comercio mesoamericano.',
    stats: [
      { label: 'ALTURA', value: '24 M' },
      { label: 'PERIODO', value: 'CLÁSICO' },
      { label: 'NIVEL_VR', value: 'COMPLETO' },
    ],
    color: '#FF006E',
    experienceUrl: '/mundi/experience/tazumal',
    buildKey: 'history',
  },
  {
    id: 'templo-zeus-olimpico',
    name: 'Templo de Zeus Olimpico',
    code: 'SV-003',
    lat: 37.9693,
    lng: 23.7331,
    country: 'Grecia',
    category: 'TEMPLO_CLÁSICO',
    description:
      'Templo colosal dedicado a Zeus en el corazón de Atenas. Una de las mayores obras del arte griego clásico, con columnas corintias que dominaron el paisaje ateniense durante siglos.',
    stats: [
      { label: 'CONSTRUCCIÓN', value: 's. VI a.C.' },
      { label: 'COLUMNAS', value: '104' },
      { label: 'NIVEL_VR', value: 'BETA' },
    ],
    color: '#FFD700',
    experienceUrl: '/mundi/experience/templo-zeus-olimpico',
    buildKey: 'history',
  },
  {
    id: 'el-tunco',
    name: 'Playa El Tunco',
    code: 'SV-004',
    lat: 30.0444,
    lng: 31.2357,
    country: 'El Salvador',
    category: 'COSTA_PACÍFICA',
    description:
      'Capital mundial del surf en la costa salvadoreña. Olas legendarias, atardeceres de fuego y la icónica roca con forma de cerdo marino que da nombre a este paraíso del Pacífico.',
    stats: [
      { label: 'OLAS', value: 'PUNTA_ROCA' },
      { label: 'RANKING', value: 'TOP_10_MUNDIAL' },
      { label: 'NIVEL_VR', value: 'BETA' },
    ],
    color: '#FFD700',
    experienceUrl: '/mundi/experience/el-tunco',
  },
  {
    id: 'piramides-egipto',
    name: 'Piramides del Egipto',
    code: 'SV-005',
    lat: 29.9792,
    lng: 31.1342,
    country: 'Egipto',
    category: 'MONUMENTO_ANTIGUO',
    description:
      'La necrópolis de Giza y las Grandes Pirámides, testigos milenarios de la civilización faraónica en las afueras de El Cairo.',
    stats: [
      { label: 'ANTIGÜEDAD', value: '4,500 AÑOS' },
      { label: 'ALTURA', value: '146.6 M' },
      { label: 'NIVEL_VR', value: 'BETA' },
    ],
    color: '#FFB700',
    experienceUrl: '/mundi/experience/piramides-egipto',
    buildKey: 'history',
  },
  {
    id: 'estacao-arqueologica-prazo',
    name: 'Estação Arqueológica do Prazo',
    code: 'SV-006',
    lat: 41.0724,
    lng: -7.2438,
    country: 'Portugal',
    category: 'SITIO_ARQUEOLOGICO',
    description:
      'Asentamiento prehistórico y romano en el Alto Douro portugués, con más de cinco milenios de ocupación humana en un paisaje de viñedos y granito.',
    stats: [
      { label: 'OCUPACIÓN', value: '5,000 AÑOS' },
      { label: 'REGIÓN', value: 'DOURO' },
      { label: 'NIVEL_VR', value: 'BETA' },
    ],
    color: '#00D4FF',
    experienceUrl: '/mundi/experience/estacao-arqueologica-prazo',
    buildKey: 'history',
  },
  {
    id: 'hintze-hall-museo',
    name: 'Hintze Hall Museo',
    code: 'SV-007',
    lat: 51.4967,
    lng: -0.1764,
    country: 'Reino Unido',
    category: 'MUSEO',
    description:
      'La gran sala de entrada del Museo de Historia Natural de Londres, presidida por un esqueleto de ballena azul suspendido bajo una bóveda victoriana de ladrillo.',
    stats: [
      { label: 'CIUDAD', value: 'LONDRES' },
      { label: 'AÑO', value: '1881' },
      { label: 'NIVEL_VR', value: 'BETA' },
    ],
    color: '#00E5A0',
    experienceUrl: '/mundi/experience/hintze-hall-museo',
  },
  {
    id: 'estudi-taller-fontsere',
    name: 'Estudi Taller Carles Fontserè',
    code: 'SV-008',
    lat: 41.9831,
    lng: 2.8249,
    country: 'España',
    category: 'TALLER_ARTISTICO',
    description:
      'Espacio de creación vinculado a la figura de Carles Fontserè en Girona, donde la escenografía, el cartelismo y el arte moderno catalán convergen.',
    stats: [
      { label: 'CIUDAD', value: 'GIRONA' },
      { label: 'MOVIMIENTO', value: 'ART_DÉCO' },
      { label: 'NIVEL_VR', value: 'BETA' },
    ],
    color: '#FF006E',
    experienceUrl: '/mundi/experience/estudi-taller-fontsere',
  },
  {
    id: 'torre-eiffel',
    name: 'Torre Eiffel',
    code: 'SV-009',
    lat: 48.8584,
    lng: 2.2945,
    country: 'Francia',
    category: 'ICONO',
    description:
      'La dama de hierro de París, símbolo universal de la ingeniería del siglo XIX y de la Francia moderna, con vistas que abarcan todo el Sena.',
    stats: [
      { label: 'ALTURA', value: '330 M' },
      { label: 'AÑO', value: '1889' },
      { label: 'NIVEL_VR', value: 'BETA' },
    ],
    color: '#FF8C42',
    experienceUrl: '/mundi/experience/torre-eiffel',
  },
  {
    id: 'ciudad-tokio',
    name: 'Ciudad de Tokio',
    code: 'SV-010',
    lat: 35.6895,
    lng: 139.6917,
    country: 'Japón',
    category: 'METROPOLIS',
    description:
      'La mayor metrópolis del planeta, donde los templos centenarios, los neones de Shibuya y la torre más alta de Japón conviven en un solo horizonte futurista.',
    stats: [
      { label: 'HABITANTES', value: '37 M' },
      { label: 'TORRE', value: 'SKYTREE' },
      { label: 'NIVEL_VR', value: 'BETA' },
    ],
    color: '#FF4E7B',
    experienceUrl: '/mundi/experience/ciudad-tokio',
  },
  {
    id: 'piramide-giza',
    name: 'Piramide de Giza',
    code: 'SV-011',
    lat: 29.9765,
    lng: 31.1311,
    country: 'Egipto',
    category: 'PIRÁMIDE',
    description:
      'La Gran Pirámide de Keops, la más antigua de las Siete Maravillas del Mundo Antiguo, un monolito matemático alineado con las estrellas.',
    stats: [
      { label: 'BASE', value: '230.3 M' },
      { label: 'BLOQUES', value: '2.3 M' },
      { label: 'NIVEL_VR', value: 'BETA' },
    ],
    color: '#FFD700',
    experienceUrl: '/mundi/experience/piramide-giza',
    buildKey: 'history',
  },
  {
    id: 'isla-meanguera',
    name: 'Isla Meanguera',
    code: 'SV-012',
    lat: 1.3521,
    lng: 103.8198,
    country: 'El Salvador',
    category: 'GOLFO_DE_FONSECA',
    description:
      'La joya volcánica del Golfo de Fonseca, donde tres países comparten horizonte. Playas vírgenes de arena oscura, pescadores artesanales y el ritmo isleño intacto del Pacífico profundo.',
    stats: [
      { label: 'SUPERFICIE', value: '16.68 KM²' },
      { label: 'ACCESO', value: 'SOLO_LANCHA' },
      { label: 'NIVEL_VR', value: 'BETA' },
    ],
    color: '#38E5FF',
    experienceUrl: '/mundi/experience/isla-meanguera',
  },
  {
    id: 'lobby',
    name: 'Lobby',
    code: 'SV-013',
    lat: 13.8,
    lng: -88.9,
    country: 'Athernix',
    category: 'LOBBY',
    description:
      'Punto de encuentro central del ecosistema Mundi. Desde aquí los exploradores pueden decidir su siguiente destino, revisar progresos o simplemente contemplar el planeta girar antes de emprender una nueva aventura.',
    stats: [
      { label: 'ESTADO', value: 'EN_LÍNEA' },
      { label: 'ACCESO', value: 'GLOBAL' },
      { label: 'NIVEL_VR', value: 'LOBBY' },
    ],
    color: '#ffffff',
    experienceUrl: '/explore?juego=HISTORIA%20VIVA%20VR',
  },
  {
    id: 'santuario-zen-kioto',
    name: 'Santuario Zen de Kioto',
    code: 'JP-001',
    lat: 35.0116,
    lng: 135.7681,
    country: 'Japón',
    category: 'MEDITACIÓN_ZEN',
    description:
      'Templo budista Rinzai entre jardines de musgo y estanques de carpas koi. Un mundo oriental de silencio, meditación guiada y terapia de exposición gradual donde la mente encuentra calma entre pagodas, cerezos y el sonido del agua.',
    stats: [
      { label: 'TRADICIÓN', value: 'BUDISMO_ZEN' },
      { label: 'FUNDACIÓN', value: 's. XIV' },
      { label: 'NIVEL_VR', value: 'TERAPÉUTICO' },
    ],
    color: '#9D4EDD',
    experienceUrl: '/mundi/experience/santuario-zen-kioto',
    buildKey: 'mental',
  },
];
