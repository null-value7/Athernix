export type AstroLevel = 'básico' | 'intermedio' | 'avanzado';

export interface AstronomyNode {
  id:          string;
  label:       string;
  shortLabel:  string;
  desc:        string;
  icon:        string;
  color:       string;
  level:       AstroLevel;
  prompt:      string;
  optional?:   boolean;
  branch:      string;
  x:           number;
  y:           number;
}

export interface AstronomyEdge {
  from: string;
  to:   string;
}

// ── Color palette — one per main topic for visual variety ──
const C_OBS      = '#4fc3f7'; // sky blue     — observación
const C_TOOLS    = '#26c6da'; // cyan         — herramientas
const C_SOLAR    = '#ffa726'; // orange       — sistema solar
const C_MECH     = '#66bb6a'; // green        — mecánica celeste
const C_LIGHT    = '#ab47bc'; // purple       — luz y espectroscopía
const C_STARS    = '#ef5350'; // red          — propiedades estelares
const C_EVOL     = '#ff7043'; // deep orange  — evolución estelar
const C_COMPACT  = '#5c6bc0'; // indigo       — objetos compactos
const C_GALAXY   = '#ec407a'; // pink         — galaxias
const C_COSMO    = '#7e57c2'; // deep purple  — cosmología
const C_BIO      = '#26a69a'; // teal         — astrobiología

export const ASTRONOMY_NODES: AstronomyNode[] = [
  // ── Main trunk (y=4) ──────────────────────────────────────
  {
    id: 'fundamentos-observacion',
    label: 'Fundamentos de Observación del Cielo',
    shortLabel: 'Observación',
    desc: 'La bóveda celeste, coordenadas y movimientos aparentes. El primer paso para cualquier astrónomo: aprender a leer el cielo.',
    icon: '🌌',
    color: C_OBS,
    level: 'básico',
    prompt: 'Explícame los fundamentos de la observación del cielo: la bóveda celeste, sistemas de coordenadas y los movimientos aparentes de las estrellas.',
    branch: 'observacion',
    x: 0, y: 4,
  },
  {
    id: 'herramientas-observacion',
    label: 'Herramientas de Observación',
    shortLabel: 'Herramientas',
    desc: 'Desde la observación a simple vista hasta telescopios modernos. Binoculares, refractores, reflectores y tipos de montura.',
    icon: '🔭',
    color: C_TOOLS,
    level: 'básico',
    prompt: 'Explícame las herramientas de observación astronómica: observación a simple vista, binoculares, telescopios (refractores, reflectores) y tipos de montura.',
    branch: 'herramientas',
    x: 1, y: 4,
  },
  {
    id: 'sistema-solar',
    label: 'El Sistema Solar',
    shortLabel: 'Sistema Solar',
    desc: 'El Sol, planetas terrestres, gigantes gaseosos y cuerpos menores. Nuestro vecindario cósmico.',
    icon: '☀',
    color: C_SOLAR,
    level: 'básico',
    prompt: 'Explícame el sistema solar: el Sol y su estructura, planetas terrestres, planetas gigantes y cuerpos menores (asteroides, cometas, planetas enanos).',
    branch: 'solar',
    x: 2, y: 4,
  },
  {
    id: 'mecanica-celeste',
    label: 'Mecánica Celeste',
    shortLabel: 'Mecánica Celeste',
    desc: 'Las leyes de Kepler y la gravitación universal de Newton. Cómo se mueven los cuerpos en el espacio.',
    icon: '⚖',
    color: C_MECH,
    level: 'intermedio',
    prompt: 'Explícame la mecánica celeste: las tres leyes de Kepler y la ley de gravitación universal de Newton, con aplicaciones a órbitas planetarias.',
    branch: 'mecanica',
    x: 3, y: 4,
  },
  {
    id: 'luz-espectroscopia',
    label: 'Luz y Espectroscopía',
    shortLabel: 'Espectroscopía',
    desc: 'El espectro electromagnético, espectros de emisión y absorción, efecto Doppler y corrimiento al rojo.',
    icon: '🌈',
    color: C_LIGHT,
    level: 'intermedio',
    prompt: 'Explícame la luz y la espectroscopía en astronomía: el espectro electromagnético, líneas espectrales, efecto Doppler y corrimiento al rojo.',
    branch: 'luz',
    x: 4, y: 4,
  },
  {
    id: 'propiedades-estelares',
    label: 'Propiedades Estelares',
    shortLabel: 'Propiedades Estelares',
    desc: 'Magnitud, luminosidad, temperatura y clasificación espectral. El diagrama Hertzsprung-Russell.',
    icon: '⭐',
    color: C_STARS,
    level: 'intermedio',
    prompt: 'Explícame las propiedades estelares: magnitud absoluta y aparente, luminosidad, temperatura, clasificación espectral y el diagrama Hertzsprung-Russell.',
    branch: 'estelares',
    x: 5, y: 4,
  },
  {
    id: 'evolucion-estelar',
    label: 'Evolución Estelar',
    shortLabel: 'Evolución Estelar',
    desc: 'Formación en nebulosas, secuencia principal y etapas finales: gigante roja, enana blanca, supernova.',
    icon: '💥',
    color: C_EVOL,
    level: 'intermedio',
    prompt: 'Explícame la evolución estelar: formación en nebulosas, secuencia principal, y etapas finales según la masa (gigante roja, enana blanca, supernova).',
    branch: 'evolucion',
    x: 6, y: 4,
  },
  {
    id: 'objetos-compactos',
    label: 'Objetos Compactos',
    shortLabel: 'Objetos Compactos',
    desc: 'Enanas blancas, estrellas de neutrones (púlsares) y agujeros negros. Los restos más densos de la evolución estelar.',
    icon: '⚫',
    color: C_COMPACT,
    level: 'avanzado',
    prompt: 'Explícame los objetos compactos: enanas blancas, estrellas de neutrones (púlsares) y agujeros negros, con sus propiedades físicas y formación.',
    branch: 'compactos',
    x: 7, y: 4,
  },
  {
    id: 'via-lactea-galaxias',
    label: 'La Vía Láctea y Galaxias',
    shortLabel: 'Galaxias',
    desc: 'Estructura galáctica, tipos de galaxias y la jerarquía cósmica: cúmulos y supercúmulos.',
    icon: '🌀',
    color: C_GALAXY,
    level: 'avanzado',
    prompt: 'Explícame la Vía Láctea y las galaxias: estructura galáctica, tipos de galaxias (espirales, elípticas, irregulares), cúmulos y supercúmulos.',
    branch: 'galaxias',
    x: 8, y: 4,
  },
  {
    id: 'cosmologia',
    label: 'Cosmología',
    shortLabel: 'Cosmología',
    desc: 'Expansión del universo, Big Bang, radiación de fondo cósmico y la misteriosa materia y energía oscura.',
    icon: '∞',
    color: C_COSMO,
    level: 'avanzado',
    prompt: 'Explícame la cosmología: expansión del universo (Ley de Hubble), Big Bang, radiación de fondo cósmico y materia y energía oscura.',
    branch: 'cosmologia',
    x: 9, y: 4,
  },
  {
    id: 'astrobiologia-exoplanetas',
    label: 'Astrobiología y Exoplanetas',
    shortLabel: 'Astrobiología',
    desc: 'Búsqueda de vida en el universo: exoplanetas, zonas habitables, biosignaturas y los límites de la vida.',
    icon: '👽',
    color: C_BIO,
    level: 'avanzado',
    optional: true,
    prompt: 'Explícame la astrobiología y los exoplanetas: métodos de detección, zonas habitables, biosignaturas y la búsqueda de vida extraterrestre.',
    branch: 'astrobio',
    x: 10, y: 4,
  },

  // ── Sub-nodes: Observación (x=0) ──────────────────────────
  {
    id: 'esfera-celeste',
    label: 'Esfera Celeste y Coordenadas',
    shortLabel: 'Esfera Celeste',
    desc: 'Sistemas altazimutal y ecuatorial. Cómo localizar objetos en el cielo con coordenadas celestes.',
    icon: '🌍',
    color: C_OBS,
    level: 'básico',
    prompt: 'Explícame la esfera celeste y los sistemas de coordenadas astronómicas: sistema altazimutal y sistema ecuatorial, con sus ventajas y desventajas.',
    branch: 'observacion',
    x: 0, y: 2,
  },
  {
    id: 'movimiento-aparente',
    label: 'Movimiento Aparente del Cielo',
    shortLabel: 'Movimiento Cielo',
    desc: 'Rotación y traslación terrestre. Por qué las estrellas se mueven, estaciones y movimiento retrógrado.',
    icon: '🔄',
    color: C_OBS,
    level: 'básico',
    prompt: 'Explícame el movimiento aparente del cielo: rotación terrestre, traslación, las estaciones, y el movimiento retrógrado de los planetas.',
    branch: 'observacion',
    x: 0, y: 6,
  },

  // ── Sub-nodes: Herramientas (x=1) ─────────────────────────
  {
    id: 'simple-vista-binoculares',
    label: 'A Simple Vista y Binoculares',
    shortLabel: 'Vista y Binoculares',
    desc: 'Observación sin telescopio: constelaciones, planetas visibles y objetos de cielo profundo accesibles con binoculares.',
    icon: '👁',
    color: C_TOOLS,
    level: 'básico',
    prompt: 'Explícame la observación astronómica a simple vista y con binoculares: qué se puede ver, constelaciones principales y consejos para principiantes.',
    branch: 'herramientas',
    x: 1, y: 2,
  },
  {
    id: 'telescopios',
    label: 'Telescopios y Monturas',
    shortLabel: 'Telescopios',
    desc: 'Refractores, reflectores y catadióptricos. Monturas altazimutal, ecuatorial y computarizada.',
    icon: '🔭',
    color: C_TOOLS,
    level: 'básico',
    prompt: 'Explícame los telescopios: refractores, reflectores y catadióptricos, y los tipos de montura (altazimutal, ecuatorial, computarizada), con sus ventajas.',
    branch: 'herramientas',
    x: 1, y: 6,
  },

  // ── Sub-nodes: Sistema Solar (x=2) — 4 children ───────────
  {
    id: 'sol-estructura',
    label: 'El Sol y su Estructura',
    shortLabel: 'El Sol',
    desc: 'Núcleo, zona radiativa, convectiva, fotosfera, cromosfera y corona. Manchas solares y ciclo solar.',
    icon: '☀',
    color: C_SOLAR,
    level: 'básico',
    prompt: 'Explícame la estructura del Sol: núcleo, zona radiativa, zona convectiva, fotosfera, cromosfera, corona, manchas solares y el ciclo de actividad solar.',
    branch: 'solar',
    x: 2, y: 1,
  },
  {
    id: 'planetas-terrestres',
    label: 'Planetas Terrestres',
    shortLabel: 'Planetas Terrestres',
    desc: 'Mercurio, Venus, Tierra y Marte. Superficie rocosa, atmósferas y características únicas.',
    icon: '🪨',
    color: C_SOLAR,
    level: 'básico',
    prompt: 'Explícame los planetas terrestres: Mercurio, Venus, Tierra y Marte, sus características, atmósferas, superficie y diferencias clave.',
    branch: 'solar',
    x: 2, y: 2,
  },
  {
    id: 'planetas-gigantes',
    label: 'Planetas Gigantes',
    shortLabel: 'Planetas Gigantes',
    desc: 'Júpiter, Saturno, Urano y Neptuno. Gigantes gaseosos y helados, anillos y lunas.',
    icon: '🪐',
    color: C_SOLAR,
    level: 'básico',
    prompt: 'Explícame los planetas gigantes: Júpiter, Saturno, Urano y Neptuno, sus atmósferas, anillos, lunas principales y diferencias entre gigantes gaseosos y helados.',
    branch: 'solar',
    x: 2, y: 6,
  },
  {
    id: 'cuerpos-menores',
    label: 'Cuerpos Menores',
    shortLabel: 'Cuerpos Menores',
    desc: 'Asteroides, cometas, planetas enanos. El cinturón de asteroides, el cinturón de Kuiper y la nube de Oort.',
    icon: '☄',
    color: C_SOLAR,
    level: 'básico',
    prompt: 'Explícame los cuerpos menores del sistema solar: asteroides, cometas, planetas enanos, el cinturón de asteroides, el cinturón de Kuiper y la nube de Oort.',
    branch: 'solar',
    x: 2, y: 7,
  },

  // ── Sub-nodes: Mecánica celeste (x=3) ─────────────────────
  {
    id: 'leyes-kepler',
    label: 'Leyes de Kepler',
    shortLabel: 'Leyes de Kepler',
    desc: 'Órbitas elípticas, áreas iguales en tiempos iguales y la tercera ley. La base de la mecánica orbital.',
    icon: '📐',
    color: C_MECH,
    level: 'intermedio',
    prompt: 'Explícame las tres leyes de Kepler: órbitas elípticas, ley de áreas y ley de los periodos, con sus demostraciones y aplicaciones.',
    branch: 'mecanica',
    x: 3, y: 2,
  },
  {
    id: 'gravitacion-newton',
    label: 'Gravitación Universal de Newton',
    shortLabel: 'Gravitación',
    desc: 'La ley de la gravitación, constante G, energía orbital y aplicaciones a satélites y mareas.',
    icon: '🍎',
    color: C_MECH,
    level: 'intermedio',
    prompt: 'Explícame la ley de gravitación universal de Newton: la fuerza gravitatoria, constante G, energía orbital, velocidad de escape y aplicaciones a satélites y mareas.',
    branch: 'mecanica',
    x: 3, y: 6,
  },

  // ── Sub-nodes: Luz y espectroscopía (x=4) ─────────────────
  {
    id: 'espectro-electromagnetico',
    label: 'Espectro Electromagnético',
    shortLabel: 'Espectro EM',
    desc: 'Radio, infrarrojo, visible, ultravioleta, rayos X y gamma. Espectros de emisión y absorción.',
    icon: '📊',
    color: C_LIGHT,
    level: 'intermedio',
    prompt: 'Explícame el espectro electromagnético en astronomía: las diferentes regiones (radio, IR, visible, UV, X, gamma), espectros de emisión y absorción, y qué información nos da cada región.',
    branch: 'luz',
    x: 4, y: 2,
  },
  {
    id: 'efecto-doppler',
    label: 'Efecto Doppler y Corrimiento al Rojo',
    shortLabel: 'Doppler y Redshift',
    desc: 'Corrimiento al rojo y al azul. Medición de velocidades radiales y expansión del universo.',
    icon: '📈',
    color: C_LIGHT,
    level: 'intermedio',
    prompt: 'Explícame el efecto Doppler en astronomía: corrimiento al rojo y al azul, cómo se mide la velocidad radial de estrellas y galaxias, y su relación con la expansión del universo.',
    branch: 'luz',
    x: 4, y: 6,
  },

  // ── Sub-nodes: Propiedades estelares (x=5) — 3 children ───
  {
    id: 'diagrama-hr',
    label: 'Diagrama Hertzsprung-Russell',
    shortLabel: 'Diagrama H-R',
    desc: 'Relación entre luminosidad y temperatura. Secuencia principal, gigantes, supergigantes y enanas blancas.',
    icon: '📉',
    color: C_STARS,
    level: 'intermedio',
    prompt: 'Explícame el diagrama Hertzsprung-Russell: ejes, secuencia principal, regiones de gigantes, supergigantes y enanas blancas, y qué información nos da sobre las estrellas.',
    branch: 'estelares',
    x: 5, y: 1,
  },
  {
    id: 'magnitud-luminosidad',
    label: 'Magnitud, Luminosidad y Temperatura',
    shortLabel: 'Magnitud',
    desc: 'Magnitud aparente vs absoluta. Luminosidad, temperatura efectiva y ley de Stefan-Boltzmann.',
    icon: '💡',
    color: C_STARS,
    level: 'intermedio',
    prompt: 'Explícame la magnitud, luminosidad y temperatura estelar: magnitud aparente vs absoluta, escala de magnitudes, luminosidad, temperatura efectiva y ley de Stefan-Boltzmann.',
    branch: 'estelares',
    x: 5, y: 2,
  },
  {
    id: 'clasificacion-espectral',
    label: 'Clasificación Espectral',
    shortLabel: 'Clasificación',
    desc: 'Clases O, B, A, F, G, K, M. Temperatura, color y líneas espectrales características.',
    icon: '🎨',
    color: C_STARS,
    level: 'intermedio',
    prompt: 'Explícame la clasificación espectral de las estrellas: clases O, B, A, F, G, K, M, su relación con temperatura y color, y las líneas espectrales características de cada clase.',
    branch: 'estelares',
    x: 5, y: 6,
  },

  // ── Sub-nodes: Evolución estelar (x=6) — 3 children ───────
  {
    id: 'formacion-estelar',
    label: 'Formación Estelar',
    shortLabel: 'Formación',
    desc: 'Nebulosas, protoestrellas, secuencia de Hayashi. Del gas interestelar a la ignición del hidrógeno.',
    icon: '☁',
    color: C_EVOL,
    level: 'intermedio',
    prompt: 'Explícame la formación estelar: nebulosas moleculares, colapso gravitacional, protoestrellas, secuencia de Hayashi y la ignición de la fusión del hidrógeno.',
    branch: 'evolucion',
    x: 6, y: 2,
  },
  {
    id: 'secuencia-principal',
    label: 'Secuencia Principal',
    shortLabel: 'Sec. Principal',
    desc: 'Fusión del hidrógeno en helio. Tiempo de vida según la masa. La etapa más larga de la vida de una estrella.',
    icon: '🔥',
    color: C_EVOL,
    level: 'intermedio',
    prompt: 'Explícame la secuencia principal: fusión del hidrógeno en helio, relación masa-luminosidad, tiempo de vida estelar y por qué es la etapa más larga.',
    branch: 'evolucion',
    x: 6, y: 3,
  },
  {
    id: 'etapas-finales',
    label: 'Etapas Finales',
    shortLabel: 'Etapas Finales',
    desc: 'Gigante roja, supernova, nebulosa planetaria. El destino depende de la masa inicial.',
    icon: '💫',
    color: C_EVOL,
    level: 'intermedio',
    prompt: 'Explícame las etapas finales de la evolución estelar: gigante roja, nebulosa planetaria, supernova, y cómo el destino depende de la masa inicial de la estrella.',
    branch: 'evolucion',
    x: 6, y: 5,
  },

  // ── Sub-nodes: Objetos compactos (x=7) — 3 children ───────
  {
    id: 'enanas-blancas',
    label: 'Enanas Blancas',
    shortLabel: 'Enanas Blancas',
    desc: 'Remanentes de estrellas de baja masa. Degeneración electrónica, límite de Chandrasekhar.',
    icon: '⚪',
    color: C_COMPACT,
    level: 'avanzado',
    prompt: 'Explícame las enanas blancas: formación, estructura, presión de degeneración electrónica, límite de Chandrasekhar y enfriamiento.',
    branch: 'compactos',
    x: 7, y: 2,
  },
  {
    id: 'estrellas-neutrones',
    label: 'Estrellas de Neutrones (Púlsares)',
    shortLabel: 'Púlsares',
    desc: 'Remanentes de supernovas. Degeneración de neutrones, púlsares y magnetares.',
    icon: '🔮',
    color: C_COMPACT,
    level: 'avanzado',
    prompt: 'Explícame las estrellas de neutrones: formación en supernovas, estructura, presión de degeneración de neutrones, púlsares, magnetares y límite de Tolman-Oppenheimer-Volkoff.',
    branch: 'compactos',
    x: 7, y: 3,
  },
  {
    id: 'agujeros-negros',
    label: 'Agujeros Negros',
    shortLabel: 'Agujeros Negros',
    desc: 'Horizonte de sucesos, singularidad, agujeros negros estelares y supermasivos. Relatividad general.',
    icon: '🕳',
    color: C_COMPACT,
    level: 'avanzado',
    prompt: 'Explícame los agujeros negros: formación, horizonte de sucesos, singularidad, tipos (estelares, supermasivos, primordiales), relatividad general y radiación de Hawking.',
    branch: 'compactos',
    x: 7, y: 5,
  },

  // ── Sub-nodes: Galaxias (x=8) — 3 children ────────────────
  {
    id: 'estructura-galactica',
    label: 'Estructura Galáctica',
    shortLabel: 'Estructura',
    desc: 'Bulbo, disco, brazos espirales, halo. Materia oscura galáctica y rotación diferencial.',
    icon: '🌌',
    color: C_GALAXY,
    level: 'avanzado',
    prompt: 'Explícame la estructura de la Vía Láctea: bulbo central, disco, brazos espirales, halo, materia oscura galáctica y rotación diferencial.',
    branch: 'galaxias',
    x: 8, y: 2,
  },
  {
    id: 'tipos-galaxias',
    label: 'Tipos de Galaxias',
    shortLabel: 'Tipos',
    desc: 'Espirales, elípticas, irregulares. Clasificación de Hubble y galaxias activas (quásares).',
    icon: '🌀',
    color: C_GALAXY,
    level: 'avanzado',
    prompt: 'Explícame los tipos de galaxias: espirales, elípticas, irregulares, la secuencia de Hubble, galaxias activas y quásares.',
    branch: 'galaxias',
    x: 8, y: 3,
  },
  {
    id: 'cumulos-supercumulos',
    label: 'Cúmulos y Supercúmulos',
    shortLabel: 'Cúmulos',
    desc: 'Grupos, cúmulos y supercúmulos de galaxias. La gran muralla y la red cósmica.',
    icon: '🕸',
    color: C_GALAXY,
    level: 'avanzado',
    prompt: 'Explícame los cúmulos y supercúmulos de galaxias: grupos locales, cúmulos de galaxias, supercúmulos, la gran muralla y la red cósmica a gran escala.',
    branch: 'galaxias',
    x: 8, y: 5,
  },

  // ── Sub-nodes: Cosmología (x=9) — 3 children ──────────────
  {
    id: 'expansion-universo',
    label: 'Expansión del Universo',
    shortLabel: 'Expansión',
    desc: 'Ley de Hubble, constante de Hubble, distancia y velocidad de recesión. Universo en expansión.',
    icon: '↗',
    color: C_COSMO,
    level: 'avanzado',
    prompt: 'Explícame la expansión del universo: Ley de Hubble, constante de Hubble, velocidad de recesión, y cómo medimos distancias a galaxias lejanas.',
    branch: 'cosmologia',
    x: 9, y: 2,
  },
  {
    id: 'big-bang-cmb',
    label: 'Big Bang y Radiación de Fondo',
    shortLabel: 'Big Bang',
    desc: 'El modelo del Big Bang, nucleosíntesis primordial y la radiación de fondo cósmico (CMB).',
    icon: '💥',
    color: C_COSMO,
    level: 'avanzado',
    prompt: 'Explícame el Big Bang y la radiación de fondo cósmico: el modelo cosmológico estándar, nucleosíntesis primordial, el CMB y sus anisotropías.',
    branch: 'cosmologia',
    x: 9, y: 3,
  },
  {
    id: 'materia-energia-oscura',
    label: 'Materia y Energía Oscura',
    shortLabel: 'Oscuridad',
    desc: 'Materia oscura fría, energía oscura y constante cosmológica. El 95% del universo es desconocido.',
    icon: '🌑',
    color: C_COSMO,
    level: 'avanzado',
    prompt: 'Explícame la materia y energía oscura: evidencias de la materia oscura, candidatos (WIMPs, axiones), energía oscura, constante cosmológica y el destino del universo.',
    branch: 'cosmologia',
    x: 9, y: 5,
  },
];

export const ASTRONOMY_EDGES: AstronomyEdge[] = [
  // Main trunk progression
  { from: 'fundamentos-observacion',  to: 'herramientas-observacion' },
  { from: 'herramientas-observacion', to: 'sistema-solar' },
  { from: 'sistema-solar',            to: 'mecanica-celeste' },
  { from: 'mecanica-celeste',         to: 'luz-espectroscopia' },
  { from: 'luz-espectroscopia',       to: 'propiedades-estelares' },
  { from: 'propiedades-estelares',    to: 'evolucion-estelar' },
  { from: 'evolucion-estelar',        to: 'objetos-compactos' },
  { from: 'objetos-compactos',        to: 'via-lactea-galaxias' },
  { from: 'via-lactea-galaxias',      to: 'cosmologia' },
  { from: 'cosmologia',               to: 'astrobiologia-exoplanetas' },

  // Observación children
  { from: 'fundamentos-observacion',  to: 'esfera-celeste' },
  { from: 'fundamentos-observacion',  to: 'movimiento-aparente' },

  // Herramientas children
  { from: 'herramientas-observacion', to: 'simple-vista-binoculares' },
  { from: 'herramientas-observacion', to: 'telescopios' },

  // Sistema Solar children
  { from: 'sistema-solar',            to: 'sol-estructura' },
  { from: 'sistema-solar',            to: 'planetas-terrestres' },
  { from: 'sistema-solar',            to: 'planetas-gigantes' },
  { from: 'sistema-solar',            to: 'cuerpos-menores' },

  // Mecánica celeste children
  { from: 'mecanica-celeste',         to: 'leyes-kepler' },
  { from: 'mecanica-celeste',         to: 'gravitacion-newton' },

  // Luz children
  { from: 'luz-espectroscopia',       to: 'espectro-electromagnetico' },
  { from: 'luz-espectroscopia',       to: 'efecto-doppler' },

  // Propiedades estelares children
  { from: 'propiedades-estelares',    to: 'diagrama-hr' },
  { from: 'propiedades-estelares',    to: 'magnitud-luminosidad' },
  { from: 'propiedades-estelares',    to: 'clasificacion-espectral' },

  // Evolución estelar children
  { from: 'evolucion-estelar',        to: 'formacion-estelar' },
  { from: 'evolucion-estelar',        to: 'secuencia-principal' },
  { from: 'evolucion-estelar',        to: 'etapas-finales' },

  // Objetos compactos children
  { from: 'objetos-compactos',        to: 'enanas-blancas' },
  { from: 'objetos-compactos',        to: 'estrellas-neutrones' },
  { from: 'objetos-compactos',        to: 'agujeros-negros' },

  // Galaxias children
  { from: 'via-lactea-galaxias',      to: 'estructura-galactica' },
  { from: 'via-lactea-galaxias',      to: 'tipos-galaxias' },
  { from: 'via-lactea-galaxias',      to: 'cumulos-supercumulos' },

  // Cosmología children
  { from: 'cosmologia',               to: 'expansion-universo' },
  { from: 'cosmologia',               to: 'big-bang-cmb' },
  { from: 'cosmologia',               to: 'materia-energia-oscura' },
];

export const ASTRO_LEVEL_COLORS: Record<AstroLevel, string> = {
  básico:      '#4fc3f7',
  intermedio:  '#ffa726',
  avanzado:    '#7e57c2',
};
