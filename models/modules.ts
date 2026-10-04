// ═══════════════════════════════════════════════════════════
// MODELO — páginas detalle de módulos (/modulos/history|tours|brain)
// Datos puros: copy, hotspots 3D, rutas y textos de secciones.
// Sin imports de React/Three/DOM.
// ═══════════════════════════════════════════════════════════

export type ModuleKey = 'history' | 'tours' | 'mind';
export type Vec3 = [number, number, number];
export type HotspotKind = 'point' | 'env' | 'feature';

export interface ModuleHotspot {
  id: string;
  label: string;
  description: string;
  /** Posición en coordenadas de la escena. */
  position: Vec3;
  kind: HotspotKind;
}

export interface ModuleConfig {
  number: string;
  tag: string;
  eyebrow: string;
  title: [string, string];
  status: string;
  accent: string;
  accentSoft: string;
  gradient: string;
  description: string;
  features: readonly string[];
  metrics: ReadonlyArray<readonly [string, string]>;
  hint: string;
  next: string;
}

export const MODULE_ROUTES: Record<ModuleKey, string> = {
  history: '/modulos/history',
  tours: '/modulos/tours',
  mind: '/modulos/brain',
};

export const MODULE_SECTIONS = {
  hotspotsEyebrow: 'RECORRE LA ESCENA',
  hotspotsTitle: 'Puntos de interés',
  hotspotsLead:
    'Toca un punto en el espacio 3D o elige una tarjeta: la cámara viaja hasta ahí.',
  metricsEyebrow: 'EN CIFRAS',
  metricsTitle: 'La experiencia en números',
} as const;

export const MODULES: Record<
  ModuleKey,
  { config: ModuleConfig; hotspots: ModuleHotspot[] }
> = {
  history: {
    config: {
      number: '01 / 03',
      tag: 'EJE_CULTURAL',
      eyebrow: 'PATRIMONIO_DIGITAL',
      title: ['HISTORIA', 'VIVA VR'],
      status: 'EN_DESARROLLO / DEMO INTERACTIVA',
      accent: '#FF006E',
      accentSoft: 'rgba(255,0,110,.2)',
      gradient: 'linear-gradient(135deg,#FF006E,#FFD700,#FF6B00)',
      description:
        'Explora las ruinas mayas de El Salvador en una experiencia interactiva donde el pasado cobra vida. Camina entre estructuras reconstruidas, artefactos vivos y capas de aprendizaje inmersivo.',
      features: ['RECONSTRUCCION 3D', 'GAMIFICACION', 'EDUCACION XR', 'FOTOGRAMETRIA'],
      metrics: [
        ['50K+', 'puntos por segundo'],
        ['4K', 'gemelo digital'],
        ['UNESCO', 'Joya de Ceren'],
      ],
      hint: 'ARRASTRA · TOCA LOS PUNTOS · SCROLL',
      next: '/modulos/tours',
    },
    hotspots: [
      {
        id: 'templo',
        label: 'Templo principal',
        description:
          'La cima de la pirámide escalonada: la puerta del santuario arde en dorado.',
        position: [0, 5.2, 0],
        kind: 'point',
      },
      {
        id: 'estela',
        label: 'Estela de glifos',
        description:
          'Monolitos grabados que narran la historia del sitio, uno en cada esquina.',
        position: [4.8, 1.2, 3.6],
        kind: 'point',
      },
      {
        id: 'altar',
        label: 'Altar solar',
        description:
          'Bajo el gran anillo dorado, el punto donde se celebraba el ciclo del sol.',
        position: [-4.9, 0.9, 2.9],
        kind: 'point',
      },
      {
        id: 'ceren',
        label: 'Casa de Joya de Cerén',
        description:
          'La Pompeya de América: una vivienda cotidiana conservada bajo la ceniza.',
        position: [4.2, 0.6, -4.8],
        kind: 'point',
      },
      {
        id: 'pelota',
        label: 'Juego de pelota',
        description:
          'La cancha ceremonial donde el juego era rito, apuesta y leyenda.',
        position: [-4.2, 0.5, -4.6],
        kind: 'point',
      },
    ],
  },
  tours: {
    config: {
      number: '02 / 03',
      tag: 'EJE_TURISMO',
      eyebrow: 'TURISMO_DIGITAL',
      title: ['SVIRTUAL', 'TOURS'],
      status: 'BETA_ACTIVA / EN OPERACION',
      accent: '#FF6B00',
      accentSoft: 'rgba(255,107,0,.22)',
      gradient: 'linear-gradient(135deg,#FF6B00,#FFD700,#FF006E)',
      description:
        'Recorre El Salvador desde cualquier rincon del mundo. Volcanes, lagos, rutas culturales y costa del Pacifico se conectan con guias IA en tiempo real.',
      features: ['GUIA IA EN VIVO', '127+ DESTINOS', '18 IDIOMAS', 'TOURS 360'],
      metrics: [
        ['127+', 'destinos curados'],
        ['24/7', 'asistencia IA'],
        ['360', 'rutas inmersivas'],
      ],
      hint: 'ARRASTRA · TOCA LAS BALIZAS · SCROLL',
      next: '/modulos/brain',
    },
    hotspots: [
      {
        id: 'izalco',
        label: 'Volcán de Izalco',
        description: 'El faro del Pacífico: su borde de lava sigue encendido.',
        position: [-11, 3.4, -6],
        kind: 'point',
      },
      {
        id: 'coatepeque',
        label: 'Lago de Coatepeque',
        description: 'Un cráter convertido en espejo de agua turquesa.',
        position: [8, 1.4, -10],
        kind: 'point',
      },
      {
        id: 'ceren',
        label: 'Joya de Cerén',
        description: 'Patrimonio UNESCO: la vida cotidiana maya, intacta.',
        position: [5, 1.6, 9],
        kind: 'point',
      },
      {
        id: 'flores',
        label: 'Ruta de las Flores',
        description: 'Pueblos, café y artesanías entre montañas con niebla.',
        position: [-7, 2.2, 11],
        kind: 'point',
      },
      {
        id: 'tunco',
        label: 'Playa El Tunco',
        description: 'La roca icónica y el mejor atardecer del litoral.',
        position: [-16, 0.8, 3],
        kind: 'point',
      },
    ],
  },
  mind: {
    config: {
      number: '03 / 03',
      tag: 'EJE_SALUD_MENTAL',
      eyebrow: 'BIOFEEDBACK_TERAPEUTICO',
      title: ['MENTE', 'LIBRE VR'],
      status: 'LIVE / OPERACION CLINICA',
      accent: '#FFD700',
      accentSoft: 'rgba(255,215,0,.18)',
      gradient: 'linear-gradient(135deg,#FFD700,#FF6B00,#FF006E)',
      description:
        'Entornos virtuales terapeuticos para ansiedad, fobias y estres. La experiencia se adapta con biofeedback, exposicion gradual y senales de calma en tiempo real.',
      features: ['EXPOSICION GRADUAL', 'BIOFEEDBACK LIVE', '95% REDUCCION', 'IA ADAPTATIVA'],
      metrics: [
        ['95%', 'reduccion simulada'],
        ['5 ms', 'respuesta adaptativa'],
        ['3', 'entornos terapeuticos'],
      ],
      hint: 'ARRASTRA · TOCA LOS NÚCLEOS · RESPIRA',
      next: '/modulos/history',
    },
    hotspots: [
      {
        id: 'playa',
        label: 'Playa serena',
        description: 'Luz cálida de atardecer y un ritmo de olas para soltar.',
        position: [-5.4, 0.6, 1.8],
        kind: 'env',
      },
      {
        id: 'bosque',
        label: 'Bosque nublado',
        description: 'Niebla suave, verdes profundos y quietud amplificada.',
        position: [5.4, 0.6, 1.4],
        kind: 'env',
      },
      {
        id: 'cielo',
        label: 'Cielo nocturno',
        description: 'La calma de mirar estrellas lejos de todo ruido.',
        position: [0, 4.6, -2.4],
        kind: 'env',
      },
      {
        id: 'biofeedback',
        label: 'Biofeedback',
        description:
          'Las señales del cuerpo guían la escena: el ritmo baja, la luz calma.',
        position: [-2.4, -2.4, 2.6],
        kind: 'feature',
      },
      {
        id: 'exposicion',
        label: 'Exposición gradual',
        description:
          'Acercarse paso a paso, a tu ritmo: cada nivel es una pequeña victoria.',
        position: [2.4, -2.4, 2.6],
        kind: 'feature',
      },
    ],
  },
};
