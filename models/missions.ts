// models/missions.ts - Model for VR Missions System

export type MissionType = 'history' | 'tourism' | 'brain';
export type MissionStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface SubMission {
  id: string;
  title: string;
  description: string;
  type: 'npc' | 'collectible' | 'exploration' | 'meditation' | 'route';
  completed: boolean;
  xpReward: number;
  location?: string;
  npcName?: string;
}

export interface Mission {
  id: string;
  type: MissionType;
  title: string;
  description: string;
  status: MissionStatus;
  progress: number; // 0-100
  totalXP: number;
  subMissions: SubMission[];
  image: string;
  environment: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
}

export interface MissionsState {
  missions: Mission[];
  selectedMission: Mission | null;
  selectedCategory: MissionType | 'all';
  isLoading: boolean;
  error: string | null;
}

// Sample Data - History Missions
export const historyMissions: Mission[] = [
  {
    id: 'hist-001',
    type: 'history',
    title: 'Renacimiento',
    description: 'Viaja a la Florencia del siglo XV y descubre el arte, la ciencia y la filosofía que transformaron el mundo.',
    status: 'available',
    progress: 0,
    totalXP: 500,
    image: '/images/missions/renacimiento.jpg',
    environment: 'Florencia, Italia (1500s)',
    difficulty: 'medium',
    estimatedTime: '45 min',
    subMissions: [
      {
        id: 'hist-001-001',
        title: 'Encuentro con Leonardo',
        description: 'Habla con Leonardo da Vinci en su taller y descubre sus inventos revolucionarios.',
        type: 'npc',
        completed: false,
        xpReward: 100,
        location: 'Taller de Da Vinci',
        npcName: 'Leonardo da Vinci'
      },
      {
        id: 'hist-001-002',
        title: 'Colecciona Arte Mediceo',
        description: 'Encuentra y colecciona 3 obras de arte perdidas de la familia Medici.',
        type: 'collectible',
        completed: false,
        xpReward: 150,
        location: 'Palazzo Medici'
      },
      {
        id: 'hist-001-003',
        title: 'Explora la Cúpula',
        description: 'Explora la cúpula de Brunelleschi en la catedral de Santa Maria del Fiore.',
        type: 'exploration',
        completed: false,
        xpReward: 100,
        location: 'Duomo di Firenze'
      },
      {
        id: 'hist-001-004',
        title: 'Diálogo con Michelangelo',
        description: 'Conversa con Michelangelo sobre sus esculturas y técnicas.',
        type: 'npc',
        completed: false,
        xpReward: 150,
        location: 'Estudio de Michelangelo',
        npcName: 'Michelangelo Buonarroti'
      }
    ]
  },
  {
    id: 'hist-002',
    type: 'history',
    title: 'Antiguo Egipto',
    description: 'Descubre los misterios de la construcción de las pirámides y la vida en el antiguo Egipto.',
    status: 'locked',
    progress: 0,
    totalXP: 450,
    image: '/images/missions/egypt.jpg',
    environment: 'Giza, Egipto (2500 AC)',
    difficulty: 'easy',
    estimatedTime: '35 min',
    subMissions: [
      {
        id: 'hist-002-001',
        title: 'Construcción de la Pirámide',
        description: 'Ayuda a los arquitectos egipcios en la construcción de la Gran Pirámide.',
        type: 'npc',
        completed: false,
        xpReward: 120,
        location: 'Meseta de Giza',
        npcName: 'Imhotep'
      },
      {
        id: 'hist-002-002',
        title: 'Jeroglíficos Perdidos',
        description: 'Traduce jeroglíficos antiguos para descubrir secretos reales.',
        type: 'collectible',
        completed: false,
        xpReward: 100,
        location: 'Templo de Karnak'
      },
      {
        id: 'hist-002-003',
        title: 'Río Nilo',
        description: 'Explora las orillas del Nilo y descubre la vida cotidiana.',
        type: 'exploration',
        completed: false,
        xpReward: 80,
        location: 'Río Nilo'
      },
      {
        id: 'hist-002-004',
        title: 'Tumba del Faraón',
        description: 'Explora la tumba de un faraón y colecciona artefactos.',
        type: 'collectible',
        completed: false,
        xpReward: 150,
        location: 'Valle de los Reyes'
      }
    ]
  },
  {
    id: 'hist-003',
    type: 'history',
    title: 'Revolución Industrial',
    description: 'Vive la transformación de la sociedad durante la Revolución Industrial en Inglaterra.',
    status: 'locked',
    progress: 0,
    totalXP: 550,
    image: '/images/missions/industrial.jpg',
    environment: 'Manchester, Inglaterra (1800s)',
    difficulty: 'hard',
    estimatedTime: '50 min',
    subMissions: [
      {
        id: 'hist-003-001',
        title: 'Fábrica Textil',
        description: 'Trabaja en una fábrica textil y aprende sobre las nuevas máquinas.',
        type: 'npc',
        completed: false,
        xpReward: 130,
        location: 'Fábrica de Manchester',
        npcName: 'James Watt'
      },
      {
        id: 'hist-003-002',
        title: 'Inventos Revolucionarios',
        description: 'Colecciona planos de inventos que cambiaron el mundo.',
        type: 'collectible',
        completed: false,
        xpReward: 120,
        location: 'Royal Society'
      },
      {
        id: 'hist-003-003',
        title: 'Vida Obrera',
        description: 'Explora las condiciones de vida de los trabajadores industriales.',
        type: 'exploration',
        completed: false,
        xpReward: 100,
        location: 'Barrios obreros'
      },
      {
        id: 'hist-003-004',
        title: 'Ferrocarril',
        description: 'Viaja en el primer ferrocarril y descubre su impacto.',
        type: 'route',
        completed: false,
        xpReward: 100,
        location: 'Liverpool-Manchester'
      },
      {
        id: 'hist-003-005',
        title: 'Reformas Sociales',
        description: 'Dialoga con reformadores sociales sobre los cambios necesarios.',
        type: 'npc',
        completed: false,
        xpReward: 100,
        location: 'Parlamento británico',
        npcName: 'Robert Owen'
      }
    ]
  }
];

// Sample Data - Tourism Missions
export const tourismMissions: Mission[] = [
  {
    id: 'tour-001',
    type: 'tourism',
    title: 'París, Ciudad Luz',
    description: 'Recorre los monumentos más icónicos de París y conoce su historia.',
    status: 'available',
    progress: 0,
    totalXP: 400,
    image: '/images/missions/paris.jpg',
    environment: 'París, Francia (Actualidad)',
    difficulty: 'easy',
    estimatedTime: '40 min',
    subMissions: [
      {
        id: 'tour-001-001',
        title: 'Torre Eiffel',
        description: 'Sube a la Torre Eiffel y descubre su historia desde la cima.',
        type: 'exploration',
        completed: false,
        xpReward: 100,
        location: 'Torre Eiffel'
      },
      {
        id: 'tour-001-002',
        title: 'Guía del Louvre',
        description: 'Habla con el guía del museo del Louvre sobre las obras maestras.',
        type: 'npc',
        completed: false,
        xpReward: 100,
        location: 'Museo del Louvre',
        npcName: 'Marie Curie'
      },
      {
        id: 'tour-001-003',
        title: 'Ruta del Sena',
        description: 'Recorre el río Sena y descubre los puentes históricos.',
        type: 'route',
        completed: false,
        xpReward: 100,
        location: 'Río Sena'
      },
      {
        id: 'tour-001-004',
        title: 'Montmartre',
        description: 'Explora el barrio artístico de Montmartre y sus cafés.',
        type: 'exploration',
        completed: false,
        xpReward: 100,
        location: 'Montmartre'
      }
    ]
  },
  {
    id: 'tour-002',
    type: 'tourism',
    title: 'Tokyo, Metrópolis Futura',
    description: 'Descubre la fusión entre tradición y tecnología en la capital de Japón.',
    status: 'locked',
    progress: 0,
    totalXP: 450,
    image: '/images/missions/tokyo.jpg',
    environment: 'Tokio, Japón (Actualidad)',
    difficulty: 'medium',
    estimatedTime: '45 min',
    subMissions: [
      {
        id: 'tour-002-001',
        title: 'Templo Senso-ji',
        description: 'Explora el templo budista más antiguo de Tokio.',
        type: 'exploration',
        completed: false,
        xpReward: 100,
        location: 'Asakusa'
      },
      {
        id: 'tour-002-002',
        title: 'Shibuya Crossing',
        description: 'Experimenta el cruce peatonal más famoso del mundo.',
        type: 'route',
        completed: false,
        xpReward: 80,
        location: 'Shibuya'
      },
      {
        id: 'tour-002-003',
        title: 'Chef Sushi',
        description: 'Aprende sobre la cultura del sushi con un maestro chef.',
        type: 'npc',
        completed: false,
        xpReward: 120,
        location: 'Tsukiji',
        npcName: 'Jiro Ono'
      },
      {
        id: 'tour-002-004',
        title: 'Akihabara',
        description: 'Explora el distrito de electrónica y anime.',
        type: 'exploration',
        completed: false,
        xpReward: 90,
        location: 'Akihabara'
      },
      {
        id: 'tour-002-005',
        title: 'Jardín Imperial',
        description: 'Medita en los jardines del Palacio Imperial.',
        type: 'meditation',
        completed: false,
        xpReward: 60,
        location: 'Palacio Imperial'
      }
    ]
  },
  {
    id: 'tour-003',
    type: 'tourism',
    title: 'Nueva York, La Gran Manzana',
    description: 'Explora los rascacielos y la energía de la ciudad que nunca duerme.',
    status: 'locked',
    progress: 0,
    totalXP: 500,
    image: '/images/missions/nyc.jpg',
    environment: 'Nueva York, USA (Actualidad)',
    difficulty: 'medium',
    estimatedTime: '50 min',
    subMissions: [
      {
        id: 'tour-003-001',
        title: 'Estatua de la Libertad',
        description: 'Visita el símbolo de la libertad y aprende su historia.',
        type: 'exploration',
        completed: false,
        xpReward: 100,
        location: 'Liberty Island'
      },
      {
        id: 'tour-003-002',
        title: 'Times Square Neon',
        description: 'Experimenta la energía de Times Square de noche.',
        type: 'route',
        completed: false,
        xpReward: 90,
        location: 'Times Square'
      },
      {
        id: 'tour-003-003',
        title: 'Wall Street',
        description: 'Dialoga con un trader sobre el mercado financiero.',
        type: 'npc',
        completed: false,
        xpReward: 110,
        location: 'Wall Street',
        npcName: 'Jordan Belfort'
      },
      {
        id: 'tour-003-004',
        title: 'Central Park',
        description: 'Explora el parque más famoso de Nueva York.',
        type: 'exploration',
        completed: false,
        xpReward: 100,
        location: 'Central Park'
      },
      {
        id: 'tour-003-005',
        title: 'Museo Metropolitano',
        description: 'Colecciona información sobre arte en el MET.',
        type: 'collectible',
        completed: false,
        xpReward: 100,
        location: 'The Met'
      }
    ]
  }
];

// Sample Data - Brain Missions
export const brainMissions: Mission[] = [
  {
    id: 'brain-001',
    type: 'brain',
    title: 'Meditación Zen',
    description: 'Practica meditación en un templo zen tradicional japonés.',
    status: 'available',
    progress: 0,
    totalXP: 300,
    image: '/images/missions/zen.jpg',
    environment: 'Templo Zen, Kioto (Actualidad)',
    difficulty: 'easy',
    estimatedTime: '20 min',
    subMissions: [
      {
        id: 'brain-001-001',
        title: 'Respiración Consciente',
        description: 'Practica ejercicios de respiración guiada durante 5 minutos.',
        type: 'meditation',
        completed: false,
        xpReward: 80,
        location: 'Sala de meditación'
      },
      {
        id: 'brain-001-002',
        title: 'Mindfulness',
        description: 'Meditación de atención plena enfocada en el presente.',
        type: 'meditation',
        completed: false,
        xpReward: 80,
        location: 'Jardín zen'
      },
      {
        id: 'brain-001-003',
        title: 'Visualización',
        description: 'Visualización guiada para reducir el estrés.',
        type: 'meditation',
        completed: false,
        xpReward: 70,
        location: 'Pabellón principal'
      },
      {
        id: 'brain-001-004',
        title: 'Gratitud',
        description: 'Práctica de gratitud y reflexión personal.',
        type: 'meditation',
        completed: false,
        xpReward: 70,
        location: 'Lago del templo'
      }
    ]
  },
  {
    id: 'brain-002',
    type: 'brain',
    title: 'Bosque Calmante',
    description: 'Meditación en un bosque nórdico con sonidos naturales.',
    status: 'locked',
    progress: 0,
    totalXP: 350,
    image: '/images/missions/forest.jpg',
    environment: 'Bosque Nórdico (Actualidad)',
    difficulty: 'medium',
    estimatedTime: '25 min',
    subMissions: [
      {
        id: 'brain-002-001',
        title: 'Caminata Consciente',
        description: 'Caminata meditativa por el bosque prestando atención a cada paso.',
        type: 'meditation',
        completed: false,
        xpReward: 90,
        location: 'Sendero forestal'
      },
      {
        id: 'brain-002-002',
        title: 'Sonidos Naturales',
        description: 'Meditación enfocada en los sonidos del bosque.',
        type: 'meditation',
        completed: false,
        xpReward: 80,
        location: 'Clar del bosque'
      },
      {
        id: 'brain-002-003',
        title: 'Conexión con la Naturaleza',
        description: 'Práctica de conexión profunda con el entorno natural.',
        type: 'meditation',
        completed: false,
        xpReward: 90,
        location: 'Lago del bosque'
      },
      {
        id: 'brain-002-004',
        title: 'Silencio Interior',
        description: 'Meditación en silencio absoluto.',
        type: 'meditation',
        completed: false,
        xpReward: 90,
        location: 'Cabaña en el bosque'
      }
    ]
  },
  {
    id: 'brain-003',
    type: 'brain',
    title: 'Atardecer Oceánico',
    description: 'Meditación en una playa al atardecer con olas relajantes.',
    status: 'locked',
    progress: 0,
    totalXP: 400,
    image: '/images/missions/ocean.jpg',
    environment: 'Playa Tropical (Actualidad)',
    difficulty: 'easy',
    estimatedTime: '30 min',
    subMissions: [
      {
        id: 'brain-003-001',
        title: 'Respiración con Olas',
        description: 'Sincroniza tu respiración con el ritmo de las olas.',
        type: 'meditation',
        completed: false,
        xpReward: 100,
        location: 'Orilla del mar'
      },
      {
        id: 'brain-003-002',
        title: 'Visualización del Mar',
        description: 'Visualización guiada imaginando el océano infinito.',
        type: 'meditation',
        completed: false,
        xpReward: 100,
        location: 'Arena de la playa'
      },
      {
        id: 'brain-003-003',
        title: 'Puesta de Sol',
        description: 'Meditación durante el atardecer observando el cambio de colores.',
        type: 'meditation',
        completed: false,
        xpReward: 100,
        location: 'Mirador'
      },
      {
        id: 'brain-003-004',
        title: 'Relajación Profunda',
        description: 'Relajación muscular progresiva con sonido de olas.',
        type: 'meditation',
        completed: false,
        xpReward: 100,
        location: 'Hamaca'
      }
    ]
  }
];

// Get all missions
export function getAllMissions(): Mission[] {
  return [...historyMissions, ...tourismMissions, ...brainMissions];
}

// Get missions by type
export function getMissionsByType(type: MissionType): Mission[] {
  switch (type) {
    case 'history':
      return historyMissions;
    case 'tourism':
      return tourismMissions;
    case 'brain':
      return brainMissions;
    default:
      return getAllMissions();
  }
}

// Get mission by ID
export function getMissionById(id: string): Mission | undefined {
  return getAllMissions().find(m => m.id === id);
}

// Calculate mission progress based on sub-missions
export function calculateMissionProgress(mission: Mission): number {
  if (mission.subMissions.length === 0) return 0;
  const completed = mission.subMissions.filter(sm => sm.completed).length;
  return Math.round((completed / mission.subMissions.length) * 100);
}

// Mission type metadata
export const missionTypeMeta: Record<MissionType, { 
  label: string; 
  color: string; 
  icon: string;
  description: string;
}> = {
  history: {
    label: 'Historia',
    color: '#FFD700',
    icon: 'Scroll',
    description: 'Viaja a través del tiempo y vive momentos históricos'
  },
  tourism: {
    label: 'Turismo',
    color: '#00E5A0',
    icon: 'Globe',
    description: 'Explora ciudades reales y sus monumentos icónicos'
  },
  brain: {
    label: 'Mente',
    color: '#FF006E',
    icon: 'Brain',
    description: 'Practica meditación y calma en entornos especiales'
  }
};
