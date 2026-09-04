export interface PipelineStage {
  id:       string
  step:     string   // "01", "02"...
  title:    string
  short:    string   // resumen de una línea
  detail:   string   // explicación extendida
  bullets:  string[] // datos técnicos clave
  color:    string
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'tracking',
    step: '01',
    title: 'TRACKING ESPACIAL',
    short: 'El headset descubre dónde está tu cabeza y tus manos en el espacio real.',
    detail:
      'Cada headset combina una IMU (giroscopio + acelerómetro) que mide rotación a alta frecuencia con cámaras de seguimiento "inside-out" que leen el entorno para calcular posición absoluta. Esta fusión de sensores se llama SLAM (Simultaneous Localization and Mapping).',
    bullets: [
      '6DoF: 3 ejes de rotación + 3 ejes de traslación',
      'IMU a ~1000Hz para rotación instantánea',
      'Cámaras inside-out para posición sin estaciones externas',
      'Hand-tracking óptico sin controladores físicos',
    ],
    color: 'var(--pink)',
  },
  {
    id: 'render',
    step: '02',
    title: 'RENDERIZADO ESTEREOSCÓPICO',
    short: 'El motor dibuja dos imágenes ligeramente distintas, una por ojo.',
    detail:
      'El GPU renderiza la escena dos veces desde cámaras separadas por la distancia interpupilar (~63mm), generando la ilusión de profundidad. Técnicas como el foveated rendering priorizan resolución donde el ojo mira, ahorrando cómputo en la periferia.',
    bullets: [
      'Doble cámara virtual (ojo izquierdo / derecho)',
      'Foveated rendering apoyado en eye-tracking',
      'Corrección de distorsión de lente en el shader final',
      'Single Pass Instanced Rendering para eficiencia',
    ],
    color: 'var(--orange)',
  },
  {
    id: 'display',
    step: '03',
    title: 'PANTALLAS Y ÓPTICA',
    short: 'Paneles de alta densidad y lentes especiales llevan la imagen a tus ojos.',
    detail:
      'Los paneles OLED o LCD de baja persistencia se combinan con lentes Fresnel o "pancake" que doblan la luz en un espacio reducido, ampliando el campo de visión sin necesitar un headset enorme.',
    bullets: [
      'Refresco de 90–120Hz para reducir parpadeo',
      'Baja persistencia para evitar estelas de movimiento',
      'Lentes pancake: cuerpos más delgados y compactos',
      'FOV típico entre 90° y 120°',
    ],
    color: 'var(--yellow)',
  },
  {
    id: 'latency',
    step: '04',
    title: 'LATENCIA MOTION-TO-PHOTON',
    short: 'El tiempo entre que mueves la cabeza y el ojo ve el cambio debe ser casi nulo.',
    detail:
      'Se considera el parámetro más crítico de la VR: por encima de ~20ms el cerebro detecta el desfase y aparece el "VR sickness". Técnicas como Asynchronous Timewarp reproyectan el último frame renderizado para compensar el retraso del GPU.',
    bullets: [
      'Umbral aceptado: menor a 20ms',
      'Asynchronous Timewarp / Spacewarp',
      'Predicción de movimiento basada en IMU',
      'Sincronización directa GPU–display (no V-Sync tradicional)',
    ],
    color: 'var(--pink)',
  },
  {
    id: 'audio-haptics',
    step: '05',
    title: 'AUDIO ESPACIAL Y HÁPTICOS',
    short: 'El sonido y el tacto refuerzan que el entorno virtual es "real".',
    detail:
      'El audio 3D posiciona fuentes de sonido en el espacio usando HRTF (Head-Related Transfer Function), mientras que motores de vibración en controladores y guantes hápticos simulan resistencia, textura e impacto.',
    bullets: [
      'HRTF para sonido direccional realista',
      'Haptic feedback adaptativo por evento',
      'Guantes y trajes hápticos en investigación clínica',
      'Sincronía audio-visual-táctil menor a 20ms',
    ],
    color: 'var(--orange)',
  },
  {
    id: 'input',
    step: '06',
    title: 'INTERACCIÓN Y ENTRADA',
    short: 'Controladores, manos y voz traducen tu intención en acciones dentro del mundo virtual.',
    detail:
      'El XR Interaction Toolkit y sistemas equivalentes abstraen la entrada de controladores, hand-tracking y eye-tracking en un solo modelo de interacción, permitiendo agarrar, teletransportarse o apuntar sin código específico por dispositivo.',
    bullets: [
      'Controladores con joystick, triggers y botones capacitivos',
      'Hand-tracking basado en cámaras infrarrojas',
      'Eye-tracking para selección por mirada',
      'Locomoción: teleport, smooth locomotion, redirected walking',
    ],
    color: 'var(--yellow)',
  },
]

// ── Anatomía del headset ────────────────────────────────────
export interface HeadsetPart {
  id:     string
  label:  string
  desc:   string
  icon:   string
}

export const HEADSET_ANATOMY: HeadsetPart[] = [
  { id: 'lenses',   label: 'Lentes',              desc: 'Fresnel o pancake; enfocan el panel a centímetros del ojo.', icon: '◎' },
  { id: 'displays', label: 'Paneles',              desc: 'OLED/LCD por ojo o panel único dividido, alta densidad de píxeles.', icon: '▣' },
  { id: 'imu',      label: 'IMU',                  desc: 'Giroscopio + acelerómetro + magnetómetro para rotación instantánea.', icon: '✦' },
  { id: 'cameras',  label: 'Cámaras de tracking',  desc: 'Visión inside-out en escala de grises para mapear el entorno.', icon: '◈' },
  { id: 'chipset',  label: 'Procesador',           desc: 'SoC standalone (ej. Snapdragon XR2) o enlace a PC/consola.', icon: '⬡' },
  { id: 'audio',    label: 'Audio integrado',      desc: 'Altavoces cercanos al oído o soporte para audífonos con HRTF.', icon: '♫' },
]

// ── Headsets compatibles con Unity ──────────────────────────
export type UnityPathway = 'OpenXR' | 'Meta XR SDK' | 'SteamVR / OpenVR' | 'PS VR2 SDK' | 'PolySpatial'

export interface VRHeadset {
  id:         string
  name:       string
  maker:      string
  type:       'Standalone' | 'PCVR' | 'Consola' | 'Mixed Reality'
  unityPath:  UnityPathway[]
  notes:      string
  color:      string
  image:      string
}

export const UNITY_HEADSETS: VRHeadset[] = [
  {
    id: 'quest3',
    name: 'Meta Quest 3 / 3S',
    maker: 'Meta',
    type: 'Standalone',
    unityPath: ['OpenXR', 'Meta XR SDK'],
    notes:
      'Soporte oficial vía Unity OpenXR Plugin + Meta XR Core SDK. Es el dispositivo con mejor tooling directo dentro del Editor (Meta XR Simulator incluido).',
    color: 'var(--pink)',
    image: '/media/MetaQuest3.webp',
  },
  {
    id: 'questpro',
    name: 'Meta Quest Pro / Quest 2',
    maker: 'Meta',
    type: 'Standalone',
    unityPath: ['OpenXR', 'Meta XR SDK'],
    notes: 'Misma ruta que Quest 3; Quest Pro añade eye-tracking y face-tracking accesibles vía Meta XR SDK.',
    color: 'var(--pink)',
    image: '/media/MetaQuestPro.jpg',
  },
  {
    id: 'vive',
    name: 'HTC Vive / Vive Pro / Focus',
    maker: 'HTC',
    type: 'PCVR',
    unityPath: ['OpenXR', 'SteamVR / OpenVR'],
    notes: 'Compatible mediante el runtime OpenXR de SteamVR o el plugin OpenVR de Valve para funciones específicas.',
    color: 'var(--orange)',
    image: '/media/ViveXR.jpe',
  },
  {
    id: 'index',
    name: 'Valve Index',
    maker: 'Valve',
    type: 'PCVR',
    unityPath: ['OpenXR', 'SteamVR / OpenVR'],
    notes: 'Controladores "Knuckles" con tracking de dedos individuales, expuestos vía OpenXR input actions.',
    color: 'var(--orange)',
    image: '/media/Valve.jpe',
  },
  {
    id: 'pico',
    name: 'PICO 4 / 4 Ultra',
    maker: 'ByteDance',
    type: 'Standalone',
    unityPath: ['OpenXR'],
    notes: 'Soporte a través del PICO Unity Integration SDK, basado en el mismo estándar OpenXR.',
    color: 'var(--yellow)',
    image: '/media/Pico4Ultra.jpg',
  },
  {
    id: 'psvr2',
    name: 'PlayStation VR2',
    maker: 'Sony',
    type: 'Consola',
    unityPath: ['PS VR2 SDK'],
    notes: 'En PS5 se integra mediante el SDK oficial de PlayStation para Unity (acceso restringido a desarrolladores registrados en PlayStation Partners).',
    color: 'var(--yellow)',
    image: '/media/PSVR2.jpe',
  },
  {
    id: 'wmr',
    name: 'Windows Mixed Reality',
    maker: 'Microsoft (legado)',
    type: 'Mixed Reality',
    unityPath: ['OpenXR'],
    notes: 'La plataforma WMR fue descontinuada por Microsoft; los headsets existentes siguen operando vía el plugin OpenXR estándar.',
    color: 'var(--pink)',
    image: '/media/WindowsMixed.webp',
  },
  {
    id: 'visionpro',
    name: 'Apple Vision Pro',
    maker: 'Apple',
    type: 'Mixed Reality',
    unityPath: ['PolySpatial'],
    notes:
      'No usa el modelo VR inmersivo tradicional de Unity: se desarrolla con el paquete PolySpatial para apps espaciales/ventaneadas en visionOS.',
    color: 'var(--orange)',
    image: '/media/AppleVisionPro.jpg',
  },
]

// ── Estado del controlador ──────────────────────────────────
export interface VRTechState {
  activeStage:   string | null
  activeHeadset: string | null
}

export const initialVRTechState: VRTechState = {
  activeStage:   null,
  activeHeadset: null,
}

// ── Datos de cabecera / hero ─────────────────────────────────
export const VR_TECH_INFO = {
  eyebrow: '[ FUNDAMENTOS_XR // CÓMO_FUNCIONA // 2026 ]',
  titleLine1: 'TECNOLOGÍA',
  titleLine2: 'REALIDAD VIRTUAL',
  sub: 'DEL SENSOR AL CEREBRO · LA CIENCIA DETRÁS DEL CASCO',
}