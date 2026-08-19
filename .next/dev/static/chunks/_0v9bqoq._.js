(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/models/missions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// models/missions.ts - Model for VR Missions System
__turbopack_context__.s([
    "brainMissions",
    ()=>brainMissions,
    "calculateMissionProgress",
    ()=>calculateMissionProgress,
    "getAllMissions",
    ()=>getAllMissions,
    "getMissionById",
    ()=>getMissionById,
    "getMissionsByType",
    ()=>getMissionsByType,
    "historyMissions",
    ()=>historyMissions,
    "missionTypeMeta",
    ()=>missionTypeMeta,
    "tourismMissions",
    ()=>tourismMissions
]);
const historyMissions = [
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
const tourismMissions = [
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
const brainMissions = [
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
function getAllMissions() {
    return [
        ...historyMissions,
        ...tourismMissions,
        ...brainMissions
    ];
}
function getMissionsByType(type) {
    switch(type){
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
function getMissionById(id) {
    return getAllMissions().find((m)=>m.id === id);
}
function calculateMissionProgress(mission) {
    if (mission.subMissions.length === 0) return 0;
    const completed = mission.subMissions.filter((sm)=>sm.completed).length;
    return Math.round(completed / mission.subMissions.length * 100);
}
const missionTypeMeta = {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/controllers/missions/missionsController.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMissionsController",
    ()=>useMissionsController
]);
// controllers/missions/missionsController.ts - Controller for VR Missions System
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/missions.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const initialMissionsState = {
    missions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllMissions"])(),
    selectedMission: null,
    selectedCategory: 'all',
    isLoading: false,
    error: null
};
function useMissionsController() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialMissionsState);
    // Load missions on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMissionsController.useEffect": ()=>{
            loadMissions();
        }
    }["useMissionsController.useEffect"], []);
    const loadMissions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMissionsController.useCallback[loadMissions]": ()=>{
            setState({
                "useMissionsController.useCallback[loadMissions]": (prev)=>({
                        ...prev,
                        isLoading: true,
                        error: null
                    })
            }["useMissionsController.useCallback[loadMissions]"]);
            try {
                // Simulate API call delay
                setTimeout({
                    "useMissionsController.useCallback[loadMissions]": ()=>{
                        const missions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllMissions"])();
                        setState({
                            "useMissionsController.useCallback[loadMissions]": (prev)=>({
                                    ...prev,
                                    missions,
                                    isLoading: false
                                })
                        }["useMissionsController.useCallback[loadMissions]"]);
                    }
                }["useMissionsController.useCallback[loadMissions]"], 500);
            } catch (error) {
                setState({
                    "useMissionsController.useCallback[loadMissions]": (prev)=>({
                            ...prev,
                            isLoading: false,
                            error: error instanceof Error ? error.message : 'Error al cargar misiones'
                        })
                }["useMissionsController.useCallback[loadMissions]"]);
            }
        }
    }["useMissionsController.useCallback[loadMissions]"], []);
    const selectCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMissionsController.useCallback[selectCategory]": (category)=>{
            setState({
                "useMissionsController.useCallback[selectCategory]": (prev)=>({
                        ...prev,
                        selectedCategory: category,
                        selectedMission: null
                    })
            }["useMissionsController.useCallback[selectCategory]"]);
        }
    }["useMissionsController.useCallback[selectCategory]"], []);
    const selectMission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMissionsController.useCallback[selectMission]": (missionId)=>{
            const mission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMissionById"])(missionId);
            if (mission) {
                setState({
                    "useMissionsController.useCallback[selectMission]": (prev)=>({
                            ...prev,
                            selectedMission: mission
                        })
                }["useMissionsController.useCallback[selectMission]"]);
            }
        }
    }["useMissionsController.useCallback[selectMission]"], []);
    const startMission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMissionsController.useCallback[startMission]": (missionId)=>{
            setState({
                "useMissionsController.useCallback[startMission]": (prev)=>({
                        ...prev,
                        missions: prev.missions.map({
                            "useMissionsController.useCallback[startMission]": (m)=>m.id === missionId ? {
                                    ...m,
                                    status: 'in_progress'
                                } : m
                        }["useMissionsController.useCallback[startMission]"]),
                        selectedMission: prev.selectedMission?.id === missionId ? {
                            ...prev.selectedMission,
                            status: 'in_progress'
                        } : prev.selectedMission
                    })
            }["useMissionsController.useCallback[startMission]"]);
        }
    }["useMissionsController.useCallback[startMission]"], []);
    const completeSubMission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMissionsController.useCallback[completeSubMission]": (missionId, subMissionId)=>{
            setState({
                "useMissionsController.useCallback[completeSubMission]": (prev)=>({
                        ...prev,
                        missions: prev.missions.map({
                            "useMissionsController.useCallback[completeSubMission]": (m)=>{
                                if (m.id !== missionId) return m;
                                const updatedSubMissions = m.subMissions.map({
                                    "useMissionsController.useCallback[completeSubMission].updatedSubMissions": (sm)=>sm.id === subMissionId ? {
                                            ...sm,
                                            completed: true
                                        } : sm
                                }["useMissionsController.useCallback[completeSubMission].updatedSubMissions"]);
                                const newProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateMissionProgress"])({
                                    ...m,
                                    subMissions: updatedSubMissions
                                });
                                // Check if all sub-missions are completed
                                const allCompleted = updatedSubMissions.every({
                                    "useMissionsController.useCallback[completeSubMission].allCompleted": (sm)=>sm.completed
                                }["useMissionsController.useCallback[completeSubMission].allCompleted"]);
                                return {
                                    ...m,
                                    subMissions: updatedSubMissions,
                                    progress: newProgress,
                                    status: allCompleted ? 'completed' : m.status
                                };
                            }
                        }["useMissionsController.useCallback[completeSubMission]"]),
                        selectedMission: prev.selectedMission?.id === missionId ? ({
                            "useMissionsController.useCallback[completeSubMission]": ()=>{
                                const updatedSubMissions = prev.selectedMission.subMissions.map({
                                    "useMissionsController.useCallback[completeSubMission].updatedSubMissions": (sm)=>sm.id === subMissionId ? {
                                            ...sm,
                                            completed: true
                                        } : sm
                                }["useMissionsController.useCallback[completeSubMission].updatedSubMissions"]);
                                const newProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateMissionProgress"])({
                                    ...prev.selectedMission,
                                    subMissions: updatedSubMissions
                                });
                                const allCompleted = updatedSubMissions.every({
                                    "useMissionsController.useCallback[completeSubMission].allCompleted": (sm)=>sm.completed
                                }["useMissionsController.useCallback[completeSubMission].allCompleted"]);
                                return {
                                    ...prev.selectedMission,
                                    subMissions: updatedSubMissions,
                                    progress: newProgress,
                                    status: allCompleted ? 'completed' : prev.selectedMission.status
                                };
                            }
                        })["useMissionsController.useCallback[completeSubMission]"]() : prev.selectedMission
                    })
            }["useMissionsController.useCallback[completeSubMission]"]);
        }
    }["useMissionsController.useCallback[completeSubMission]"], []);
    const resetMission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMissionsController.useCallback[resetMission]": (missionId)=>{
            setState({
                "useMissionsController.useCallback[resetMission]": (prev)=>({
                        ...prev,
                        missions: prev.missions.map({
                            "useMissionsController.useCallback[resetMission]": (m)=>m.id === missionId ? {
                                    ...m,
                                    status: 'available',
                                    progress: 0,
                                    subMissions: m.subMissions.map({
                                        "useMissionsController.useCallback[resetMission]": (sm)=>({
                                                ...sm,
                                                completed: false
                                            })
                                    }["useMissionsController.useCallback[resetMission]"])
                                } : m
                        }["useMissionsController.useCallback[resetMission]"]),
                        selectedMission: prev.selectedMission?.id === missionId ? {
                            ...prev.selectedMission,
                            status: 'available',
                            progress: 0,
                            subMissions: prev.selectedMission.subMissions.map({
                                "useMissionsController.useCallback[resetMission]": (sm)=>({
                                        ...sm,
                                        completed: false
                                    })
                            }["useMissionsController.useCallback[resetMission]"])
                        } : prev.selectedMission
                    })
            }["useMissionsController.useCallback[resetMission]"]);
        }
    }["useMissionsController.useCallback[resetMission]"], []);
    const getFilteredMissions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMissionsController.useCallback[getFilteredMissions]": ()=>{
            if (state.selectedCategory === 'all') {
                return state.missions;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMissionsByType"])(state.selectedCategory);
        }
    }["useMissionsController.useCallback[getFilteredMissions]"], [
        state.selectedCategory,
        state.missions
    ]);
    const getMissionStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMissionsController.useCallback[getMissionStats]": ()=>{
            const total = state.missions.length;
            const completed = state.missions.filter({
                "useMissionsController.useCallback[getMissionStats]": (m)=>m.status === 'completed'
            }["useMissionsController.useCallback[getMissionStats]"]).length;
            const inProgress = state.missions.filter({
                "useMissionsController.useCallback[getMissionStats]": (m)=>m.status === 'in_progress'
            }["useMissionsController.useCallback[getMissionStats]"]).length;
            const totalXP = state.missions.reduce({
                "useMissionsController.useCallback[getMissionStats].totalXP": (sum, m)=>sum + (m.status === 'completed' ? m.totalXP : 0)
            }["useMissionsController.useCallback[getMissionStats].totalXP"], 0);
            return {
                total,
                completed,
                inProgress,
                totalXP
            };
        }
    }["useMissionsController.useCallback[getMissionStats]"], [
        state.missions
    ]);
    return {
        state,
        selectCategory,
        selectMission,
        startMission,
        completeSubMission,
        resetMission,
        getFilteredMissions,
        getMissionStats,
        loadMissions
    };
}
_s(useMissionsController, "X0duA5VJvcAD4zJZtAt5kJrnLIw=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/missions/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MissionsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.mjs [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map.mjs [app-client] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/brain.mjs [app-client] (ecmascript) <export default as Brain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.mjs [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.mjs [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.mjs [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.mjs [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.mjs [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/navigation.mjs [app-client] (ecmascript) <export default as Navigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$missions$2f$missionsController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/controllers/missions/missionsController.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/missions.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
// app/missions/page.tsx - VR Missions Page
'use client';
;
;
;
;
;
;
;
if ("TURBOPACK compile-time truthy", 1) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
}
// ── 3D interaction helpers ────────────────────────
function tiltMove(e, lift = -6, max = 12) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        y: lift,
        rotationY: px * max,
        rotationX: -py * max,
        transformPerspective: 800,
        duration: 0.3,
        ease: 'power2.out'
    });
}
function tiltReset(e) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.4,
        ease: 'power2.out'
    });
}
function magneticMove(e, strength = 0.25) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        x,
        y,
        duration: 0.25,
        ease: 'power2.out'
    });
}
function magneticReset(e) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1,0.4)'
    });
}
// ── Design tokens (estética módulos) ────────────────────────
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif";
const F_MONO = "'Plus Jakarta Sans', monospace";
const C_PINK = '#FF006E';
const C_ORANGE = '#FF6B00';
const C_YELLOW = '#FFD700';
const C_GREEN = '#00E5A0';
// ── Category Card Component ─────────────────────────────────
function CategoryCard({ type, label, color, icon: Icon, description, count, isSelected, onClick }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        onClick: onClick,
        className: "category-card cursor-pointer rounded-2xl border p-6 transition-all duration-300",
        style: {
            background: isSelected ? `${color}15` : 'rgba(18,8,22,0.9)',
            borderColor: isSelected ? `${color}60` : 'rgba(255,107,53,0.2)',
            boxShadow: isSelected ? `0 0 30px ${color}25` : '0 8px 32px rgba(0,0,0,0.5)',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
        },
        onMouseMove: (e)=>{
            if (!isSelected) {
                tiltMove(e, -8, 14);
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.boxShadow = `0 22px 70px -18px ${color}66, 0 0 0 1px ${color}33`;
                e.currentTarget.style.background = `${color}18`;
            }
        },
        onMouseLeave: (e)=>{
            if (!isSelected) {
                tiltReset(e);
                e.currentTarget.style.borderColor = 'rgba(255,107,53,0.2)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
                e.currentTarget.style.background = 'rgba(18,8,22,0.9)';
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
                    style: {
                        background: `${color}20`,
                        border: `1px solid ${color}50`
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        size: 28,
                        style: {
                            color
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/missions/page.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-black text-lg mb-1",
                            style: {
                                fontFamily: F_BE,
                                color: '#e8d5c8',
                                letterSpacing: '0.02em'
                            },
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/app/missions/page.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm mb-3 leading-relaxed",
                            style: {
                                color: 'rgba(200,160,140,0.6)',
                                fontFamily: F_MONO
                            },
                            children: description
                        }, void 0, false, {
                            fileName: "[project]/app/missions/page.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold px-2 py-1 rounded-full",
                                style: {
                                    background: `${color}15`,
                                    color,
                                    fontFamily: F_MONO,
                                    border: `1px solid ${color}30`
                                },
                                children: [
                                    count,
                                    " misiones"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/missions/page.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/missions/page.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/missions/page.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/missions/page.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(CategoryCard, "QMBuJFIdzLIeqBcFwhMf246mjOM=");
_c = CategoryCard;
// ── Mission Card Component ───────────────────────────────────
function MissionCard({ mission, onStart, onView }) {
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["missionTypeMeta"][mission.type];
    const isLocked = mission.status === 'locked';
    const isCompleted = mission.status === 'completed';
    const isInProgress = mission.status === 'in_progress';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "mission-card rounded-2xl border overflow-hidden transition-all duration-300",
        style: {
            background: 'rgba(18,8,22,0.9)',
            borderColor: isLocked ? 'rgba(255,255,255,0.1)' : isInProgress ? `${meta.color}60` : 'rgba(255,107,53,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            opacity: isLocked ? 0.6 : 1,
            transformStyle: 'preserve-3d',
            willChange: 'transform'
        },
        onMouseMove: (e)=>{
            if (!isLocked) {
                tiltMove(e, -10, 12);
                e.currentTarget.style.borderColor = meta.color;
                e.currentTarget.style.boxShadow = `0 22px 70px -18px ${meta.color}66, 0 0 0 1px ${meta.color}33`;
                e.currentTarget.style.background = `${meta.color}12`;
            }
        },
        onMouseLeave: (e)=>{
            if (!isLocked) {
                tiltReset(e);
                e.currentTarget.style.borderColor = isInProgress ? `${meta.color}60` : 'rgba(255,107,53,0.2)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
                e.currentTarget.style.background = 'rgba(18,8,22,0.9)';
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-48 w-full",
                style: {
                    background: `linear-gradient(135deg,${meta.color}20,${meta.color}05)`,
                    border: `1px solid ${meta.color}20`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 rounded-2xl flex items-center justify-center",
                            style: {
                                background: `${meta.color}15`,
                                border: `2px dashed ${meta.color}30`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                size: 40,
                                style: {
                                    color: meta.color
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/missions/page.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-4 right-4",
                        children: [
                            isLocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                                style: {
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(10px)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        size: 14,
                                        style: {
                                            color: 'rgba(255,255,255,0.5)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold",
                                        style: {
                                            color: 'rgba(255,255,255,0.5)',
                                            fontFamily: F_MONO
                                        },
                                        children: "BLOQUEADO"
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 213,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this),
                            isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                                style: {
                                    background: `${C_GREEN}20`,
                                    backdropFilter: 'blur(10px)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        size: 14,
                                        style: {
                                            color: C_GREEN
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 226,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold",
                                        style: {
                                            color: C_GREEN,
                                            fontFamily: F_MONO
                                        },
                                        children: "COMPLETADO"
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 227,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 222,
                                columnNumber: 13
                            }, this),
                            isInProgress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                                style: {
                                    background: `${meta.color}20`,
                                    backdropFilter: 'blur(10px)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                        size: 14,
                                        style: {
                                            color: meta.color
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold",
                                        style: {
                                            color: meta.color,
                                            fontFamily: F_MONO
                                        },
                                        children: "EN PROGRESO"
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 241,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-4 left-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                            style: {
                                background: `${meta.color}20`,
                                backdropFilter: 'blur(10px)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '1rem'
                                    },
                                    children: meta.icon
                                }, void 0, false, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 257,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-bold",
                                    style: {
                                        color: meta.color,
                                        fontFamily: F_MONO
                                    },
                                    children: meta.label
                                }, void 0, false, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 258,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/missions/page.tsx",
                            lineNumber: 253,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/missions/page.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-black text-xl",
                                style: {
                                    fontFamily: F_BE,
                                    color: '#e8d5c8',
                                    letterSpacing: '0.02em'
                                },
                                children: mission.title
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 px-2 py-1 rounded-lg",
                                style: {
                                    background: `${meta.color}10`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                        size: 14,
                                        style: {
                                            color: meta.color
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 281,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold",
                                        style: {
                                            color: meta.color,
                                            fontFamily: F_MONO
                                        },
                                        children: [
                                            mission.totalXP,
                                            " XP"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 282,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 277,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm mb-4 leading-relaxed",
                        style: {
                            color: 'rgba(200,160,140,0.6)',
                            fontFamily: F_MONO
                        },
                        children: mission.description
                    }, void 0, false, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 291,
                        columnNumber: 9
                    }, this),
                    !isLocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold",
                                        style: {
                                            color: 'rgba(200,160,140,0.5)',
                                            fontFamily: F_MONO
                                        },
                                        children: "PROGRESO"
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold",
                                        style: {
                                            color: meta.color,
                                            fontFamily: F_MONO
                                        },
                                        children: [
                                            mission.progress,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 308,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-2 rounded-full overflow-hidden",
                                style: {
                                    background: 'rgba(255,255,255,0.1)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "progress-bar-fill h-full rounded-full transition-all duration-500",
                                    style: {
                                        width: `${mission.progress}%`,
                                        background: `linear-gradient(90deg,${meta.color},${meta.color}80)`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 319,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 315,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 300,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        size: 14,
                                        style: {
                                            color: 'rgba(200,160,140,0.5)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 333,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        style: {
                                            color: 'rgba(200,160,140,0.5)',
                                            fontFamily: F_MONO
                                        },
                                        children: mission.estimatedTime
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 334,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 332,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                        size: 14,
                                        style: {
                                            color: 'rgba(200,160,140,0.5)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 342,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        style: {
                                            color: 'rgba(200,160,140,0.5)',
                                            fontFamily: F_MONO
                                        },
                                        children: [
                                            mission.subMissions.length,
                                            " subtareas"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 343,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 341,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5",
                                style: {
                                    color: mission.difficulty === 'easy' ? C_GREEN : mission.difficulty === 'medium' ? C_YELLOW : C_PINK
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 354,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold",
                                        style: {
                                            fontFamily: F_MONO
                                        },
                                        children: mission.difficulty === 'easy' ? 'Fácil' : mission.difficulty === 'medium' ? 'Medio' : 'Difícil'
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 355,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 350,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 331,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: isLocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "flex-1 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-not-allowed",
                            style: {
                                background: 'rgba(255,255,255,0.05)',
                                color: 'rgba(255,255,255,0.3)',
                                fontFamily: F_MONO,
                                border: '1px solid rgba(255,255,255,0.1)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                    size: 14,
                                    className: "inline mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 376,
                                    columnNumber: 15
                                }, this),
                                "Bloqueado"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/missions/page.tsx",
                            lineNumber: 367,
                            columnNumber: 13
                        }, this) : isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onView(mission.id),
                                    className: "flex-1 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200",
                                    style: {
                                        background: `${meta.color}15`,
                                        color: meta.color,
                                        fontFamily: F_MONO,
                                        border: `1px solid ${meta.color}40`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                            size: 14,
                                            className: "inline mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 391,
                                            columnNumber: 17
                                        }, this),
                                        "Ver detalles"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 381,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onStart(mission.id),
                                    className: "px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200",
                                    style: {
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'rgba(255,255,255,0.5)',
                                        fontFamily: F_MONO,
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    },
                                    children: "Repetir"
                                }, void 0, false, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 394,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onView(mission.id),
                                    className: "flex-1 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200",
                                    style: {
                                        background: `${meta.color}15`,
                                        color: meta.color,
                                        fontFamily: F_MONO,
                                        border: `1px solid ${meta.color}40`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            size: 14,
                                            className: "inline mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 419,
                                            columnNumber: 17
                                        }, this),
                                        "Ver detalles"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onStart(mission.id),
                                    className: "px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200",
                                    style: {
                                        background: `linear-gradient(135deg,${meta.color},${meta.color}80)`,
                                        color: '#08040c',
                                        fontFamily: F_MONO
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                            size: 14,
                                            className: "inline mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 431,
                                            columnNumber: 17
                                        }, this),
                                        "Iniciar"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 422,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 365,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/missions/page.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/missions/page.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
_s1(MissionCard, "QMBuJFIdzLIeqBcFwhMf246mjOM=");
_c1 = MissionCard;
// ── Mission Detail Modal Component ───────────────────────────
function MissionDetailModal({ mission, onClose, onStart, onCompleteSub }) {
    _s2();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["missionTypeMeta"][mission.type];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MissionDetailModal.useEffect": ()=>{
            if (ref.current) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(ref.current, {
                    opacity: 0,
                    scale: 0.95
                }, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        }
    }["MissionDetailModal.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: {
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)'
        },
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            className: "rounded-2xl border max-w-2xl w-full max-h-[90vh] overflow-y-auto",
            style: {
                background: 'rgba(18,8,22,0.95)',
                borderColor: `${meta.color}30`,
                boxShadow: `0 0 50px ${meta.color}20`
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-b",
                    style: {
                        borderColor: `${meta.color}20`
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0",
                                        style: {
                                            background: `${meta.color}20`,
                                            border: `1px solid ${meta.color}50`
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '2rem'
                                            },
                                            children: meta.icon
                                        }, void 0, false, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 493,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 489,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-bold mb-2",
                                                style: {
                                                    color: meta.color,
                                                    fontFamily: F_MONO
                                                },
                                                children: meta.label
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 496,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-black text-2xl mb-2",
                                                style: {
                                                    fontFamily: F_BE,
                                                    color: '#e8d5c8',
                                                    letterSpacing: '0.02em'
                                                },
                                                children: mission.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 502,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm",
                                                style: {
                                                    color: 'rgba(200,160,140,0.6)',
                                                    fontFamily: F_MONO
                                                },
                                                children: mission.environment
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 508,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 495,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 488,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-2 rounded-lg transition-all duration-200",
                                style: {
                                    background: 'rgba(255,255,255,0.05)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 20,
                                    style: {
                                        color: 'rgba(255,255,255,0.5)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 521,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 516,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 487,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/missions/page.tsx",
                    lineNumber: 483,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-bold",
                                            style: {
                                                color: 'rgba(200,160,140,0.5)',
                                                fontFamily: F_MONO
                                            },
                                            children: "PROGRESO GENERAL"
                                        }, void 0, false, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 531,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-bold",
                                            style: {
                                                color: meta.color,
                                                fontFamily: F_MONO
                                            },
                                            children: [
                                                mission.progress,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 537,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 530,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-3 rounded-full overflow-hidden",
                                    style: {
                                        background: 'rgba(255,255,255,0.1)'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full rounded-full transition-all duration-500",
                                        style: {
                                            width: `${mission.progress}%`,
                                            background: `linear-gradient(90deg,${meta.color},${meta.color}80)`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 548,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 544,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/missions/page.tsx",
                            lineNumber: 529,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-black text-lg",
                                    style: {
                                        fontFamily: F_BE,
                                        color: '#e8d5c8',
                                        letterSpacing: '0.02em'
                                    },
                                    children: "Subtareas"
                                }, void 0, false, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 560,
                                    columnNumber: 13
                                }, this),
                                mission.subMissions.map((sub)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border p-4 transition-all duration-200",
                                        style: {
                                            background: sub.completed ? `${meta.color}10` : 'rgba(255,255,255,0.02)',
                                            borderColor: sub.completed ? `${meta.color}40` : 'rgba(255,255,255,0.1)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                                                    style: {
                                                        background: sub.completed ? meta.color : 'rgba(255,255,255,0.1)',
                                                        border: sub.completed ? 'none' : `1px solid ${meta.color}30`
                                                    },
                                                    children: sub.completed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                        size: 14,
                                                        style: {
                                                            color: '#08040c'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/missions/page.tsx",
                                                        lineNumber: 584,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: '50%',
                                                            background: meta.color
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/missions/page.tsx",
                                                        lineNumber: 586,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/missions/page.tsx",
                                                    lineNumber: 576,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start justify-between mb-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-bold text-sm",
                                                                    style: {
                                                                        color: sub.completed ? meta.color : '#e8d5c8',
                                                                        fontFamily: F_MONO
                                                                    },
                                                                    children: sub.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/missions/page.tsx",
                                                                    lineNumber: 591,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-bold px-2 py-0.5 rounded-full",
                                                                    style: {
                                                                        background: `${meta.color}15`,
                                                                        color: meta.color,
                                                                        fontFamily: F_MONO
                                                                    },
                                                                    children: [
                                                                        "+",
                                                                        sub.xpReward,
                                                                        " XP"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/missions/page.tsx",
                                                                    lineNumber: 600,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/missions/page.tsx",
                                                            lineNumber: 590,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs mb-2",
                                                            style: {
                                                                color: 'rgba(200,160,140,0.5)',
                                                                fontFamily: F_MONO
                                                            },
                                                            children: sub.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/missions/page.tsx",
                                                            lineNumber: 611,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                sub.location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"], {
                                                                            size: 12,
                                                                            style: {
                                                                                color: 'rgba(200,160,140,0.4)'
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/missions/page.tsx",
                                                                            lineNumber: 620,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs",
                                                                            style: {
                                                                                color: 'rgba(200,160,140,0.4)',
                                                                                fontFamily: F_MONO
                                                                            },
                                                                            children: sub.location
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/missions/page.tsx",
                                                                            lineNumber: 621,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/missions/page.tsx",
                                                                    lineNumber: 619,
                                                                    columnNumber: 25
                                                                }, this),
                                                                sub.npcName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                            size: 12,
                                                                            style: {
                                                                                color: 'rgba(200,160,140,0.4)'
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/missions/page.tsx",
                                                                            lineNumber: 631,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs",
                                                                            style: {
                                                                                color: 'rgba(200,160,140,0.4)',
                                                                                fontFamily: F_MONO
                                                                            },
                                                                            children: sub.npcName
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/missions/page.tsx",
                                                                            lineNumber: 632,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/missions/page.tsx",
                                                                    lineNumber: 630,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/missions/page.tsx",
                                                            lineNumber: 617,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/missions/page.tsx",
                                                    lineNumber: 589,
                                                    columnNumber: 19
                                                }, this),
                                                !sub.completed && mission.status !== 'locked' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onCompleteSub(sub.id),
                                                    className: "px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200",
                                                    style: {
                                                        background: `${meta.color}15`,
                                                        color: meta.color,
                                                        fontFamily: F_MONO,
                                                        border: `1px solid ${meta.color}30`
                                                    },
                                                    children: "Completar"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/missions/page.tsx",
                                                    lineNumber: 643,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 575,
                                            columnNumber: 17
                                        }, this)
                                    }, sub.id, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 567,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/missions/page.tsx",
                            lineNumber: 559,
                            columnNumber: 11
                        }, this),
                        mission.status !== 'locked' && mission.status !== 'completed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onStart,
                            className: "w-full py-4 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-200",
                            style: {
                                background: `linear-gradient(135deg,${meta.color},${meta.color}80)`,
                                color: '#08040c',
                                fontFamily: F_MONO
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                    size: 16,
                                    className: "inline mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 672,
                                    columnNumber: 15
                                }, this),
                                "Iniciar Misión"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/missions/page.tsx",
                            lineNumber: 663,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/missions/page.tsx",
                    lineNumber: 527,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/missions/page.tsx",
            lineNumber: 472,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/missions/page.tsx",
        lineNumber: 467,
        columnNumber: 5
    }, this);
}
_s2(MissionDetailModal, "8uVE59eA/r6b92xF80p7sH8rXLk=");
_c2 = MissionDetailModal;
function MissionsPage() {
    _s3();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { state, selectCategory, selectMission, startMission, completeSubMission, getFilteredMissions, getMissionStats } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$missions$2f$missionsController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMissionsController"])();
    const [showDetail, setShowDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // GSAP Animations
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MissionsPage.useEffect": ()=>{
            const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].context({
                "MissionsPage.useEffect.ctx": ()=>{
                    // Hero animation with stagger
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo('.mission-hero', {
                        opacity: 0,
                        y: 40,
                        scale: 0.95
                    }, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                    // Stats cards with creative entrance
                    const missionStats = document.querySelector('.mission-stats');
                    if (missionStats) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo('.mission-stats > div', {
                            opacity: 0,
                            y: 30,
                            rotateX: 10
                        }, {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            duration: 0.6,
                            stagger: 0.1,
                            ease: 'back.out(1.7)',
                            scrollTrigger: {
                                trigger: '.mission-stats',
                                start: 'top 85%'
                            }
                        });
                    }
                    // Category cards with 3D effect
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo('.category-card', {
                        opacity: 0,
                        y: 40,
                        rotateY: -15
                    }, {
                        opacity: 1,
                        y: 0,
                        rotateY: 0,
                        duration: 0.7,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: '.category-cards',
                            start: 'top 90%'
                        }
                    });
                    // Mission cards with floating effect
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo('.mission-card', {
                        opacity: 0,
                        y: 50,
                        scale: 0.9
                    }, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'elastic.out(1, 0.8)',
                        scrollTrigger: {
                            trigger: '.mission-cards',
                            start: 'top 90%'
                        }
                    });
                    // Continuous floating animation for mission cards
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.mission-card', {
                        y: -5,
                        duration: 3,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                        stagger: 0.2
                    });
                    // Progress bar animations
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo('.progress-bar-fill', {
                        width: 0
                    }, {
                        width: {
                            "MissionsPage.useEffect.ctx": (i)=>i * 100 + '%'
                        }["MissionsPage.useEffect.ctx"],
                        duration: 1.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: '.mission-cards',
                            start: 'top 80%'
                        }
                    });
                }
            }["MissionsPage.useEffect.ctx"], containerRef);
            return ({
                "MissionsPage.useEffect": ()=>ctx.revert()
            })["MissionsPage.useEffect"];
        }
    }["MissionsPage.useEffect"], [
        state.selectedCategory
    ]);
    const stats = getMissionStats();
    const filteredMissions = getFilteredMissions();
    const handleStartMission = (missionId)=>{
        startMission(missionId);
        // Here you would navigate to the VR experience
        console.log('Starting mission:', missionId);
    };
    const handleViewMission = (missionId)=>{
        selectMission(missionId);
        setShowDetail(true);
    };
    const handleCompleteSub = (subId)=>{
        if (state.selectedMission) {
            completeSubMission(state.selectedMission.id, subId);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "min-h-screen",
        style: {
            background: 'linear-gradient(180deg, #0a0508 0%, #120816 100%)',
            paddingTop: '100px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none",
                style: {
                    background: 'radial-gradient(circle,rgba(255,0,110,0.08) 0%,transparent 70%)',
                    transform: 'translate(30%,-30%)'
                }
            }, void 0, false, {
                fileName: "[project]/app/missions/page.tsx",
                lineNumber: 807,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none",
                style: {
                    background: 'radial-gradient(circle,rgba(0,229,160,0.06) 0%,transparent 70%)',
                    transform: 'translate(-30%,30%)'
                }
            }, void 0, false, {
                fileName: "[project]/app/missions/page.tsx",
                lineNumber: 814,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mission-hero mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/home",
                                className: "inline-flex items-center gap-2 text-sm mb-6 transition-all duration-200",
                                style: {
                                    color: 'rgba(200,160,140,0.5)',
                                    fontFamily: F_MONO
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        size: 14,
                                        className: "rotate-180"
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 830,
                                        columnNumber: 13
                                    }, this),
                                    "Volver al inicio"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 825,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-black text-5xl md:text-6xl mb-4",
                                style: {
                                    fontFamily: F_BE,
                                    color: '#e8d5c8',
                                    letterSpacing: '0.02em',
                                    background: 'linear-gradient(90deg, #FF006E, #FF6B00, #FFD700)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                },
                                children: "MISIONES VR"
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 834,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg max-w-2xl mb-8 leading-relaxed",
                                style: {
                                    color: 'rgba(200,160,140,0.6)',
                                    fontFamily: F_MONO
                                },
                                children: "Explora mundos virtuales, viaja a través del tiempo y desarrolla tu mente con experiencias inmersivas."
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 848,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border p-4",
                                        style: {
                                            background: 'rgba(18,8,22,0.9)',
                                            borderColor: 'rgba(255,107,53,0.2)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-black mb-1",
                                                style: {
                                                    fontFamily: F_BE,
                                                    color: C_ORANGE
                                                },
                                                children: stats.total
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 864,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs",
                                                style: {
                                                    color: 'rgba(200,160,140,0.5)',
                                                    fontFamily: F_MONO
                                                },
                                                children: "Total misiones"
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 867,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 857,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border p-4",
                                        style: {
                                            background: 'rgba(18,8,22,0.9)',
                                            borderColor: 'rgba(0,229,160,0.2)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-black mb-1",
                                                style: {
                                                    fontFamily: F_BE,
                                                    color: C_GREEN
                                                },
                                                children: stats.completed
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 878,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs",
                                                style: {
                                                    color: 'rgba(200,160,140,0.5)',
                                                    fontFamily: F_MONO
                                                },
                                                children: "Completadas"
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 881,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 871,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border p-4",
                                        style: {
                                            background: 'rgba(18,8,22,0.9)',
                                            borderColor: 'rgba(255,215,0,0.2)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-black mb-1",
                                                style: {
                                                    fontFamily: F_BE,
                                                    color: C_YELLOW
                                                },
                                                children: stats.inProgress
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 892,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs",
                                                style: {
                                                    color: 'rgba(200,160,140,0.5)',
                                                    fontFamily: F_MONO
                                                },
                                                children: "En progreso"
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 895,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 885,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border p-4",
                                        style: {
                                            background: 'rgba(18,8,22,0.9)',
                                            borderColor: 'rgba(255,0,110,0.2)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-black mb-1",
                                                style: {
                                                    fontFamily: F_BE,
                                                    color: C_PINK
                                                },
                                                children: stats.totalXP
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 906,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs",
                                                style: {
                                                    color: 'rgba(200,160,140,0.5)',
                                                    fontFamily: F_MONO
                                                },
                                                children: "XP ganado"
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 909,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 899,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 856,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 824,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "category-cards mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-black text-2xl mb-6",
                                style: {
                                    fontFamily: F_BE,
                                    color: '#e8d5c8',
                                    letterSpacing: '0.02em'
                                },
                                children: "Categorías"
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 918,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryCard, {
                                        type: "history",
                                        label: "Historia",
                                        color: C_YELLOW,
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
                                        description: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["missionTypeMeta"].history.description,
                                        count: 3,
                                        isSelected: state.selectedCategory === 'history',
                                        onClick: ()=>selectCategory('history')
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 925,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryCard, {
                                        type: "tourism",
                                        label: "Turismo",
                                        color: C_GREEN,
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"],
                                        description: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["missionTypeMeta"].tourism.description,
                                        count: 3,
                                        isSelected: state.selectedCategory === 'tourism',
                                        onClick: ()=>selectCategory('tourism')
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 935,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryCard, {
                                        type: "brain",
                                        label: "Mente",
                                        color: C_PINK,
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"],
                                        description: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["missionTypeMeta"].brain.description,
                                        count: 3,
                                        isSelected: state.selectedCategory === 'brain',
                                        onClick: ()=>selectCategory('brain')
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 945,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 924,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 917,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mission-cards",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-black text-2xl",
                                        style: {
                                            fontFamily: F_BE,
                                            color: '#e8d5c8',
                                            letterSpacing: '0.02em'
                                        },
                                        children: state.selectedCategory === 'all' ? 'Todas las Misiones' : __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["missionTypeMeta"][state.selectedCategory].label
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 961,
                                        columnNumber: 13
                                    }, this),
                                    state.selectedCategory !== 'all' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>selectCategory('all'),
                                        className: "text-sm font-bold transition-all duration-200",
                                        style: {
                                            color: C_ORANGE,
                                            fontFamily: F_MONO
                                        },
                                        children: "Ver todas"
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 968,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 960,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                                children: filteredMissions.map((mission)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MissionCard, {
                                        mission: mission,
                                        onStart: handleStartMission,
                                        onView: handleViewMission
                                    }, mission.id, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 980,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 978,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 959,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/missions/page.tsx",
                lineNumber: 822,
                columnNumber: 7
            }, this),
            showDetail && state.selectedMission && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MissionDetailModal, {
                mission: state.selectedMission,
                onClose: ()=>setShowDetail(false),
                onStart: ()=>{
                    handleStartMission(state.selectedMission.id);
                    setShowDetail(false);
                },
                onCompleteSub: handleCompleteSub
            }, void 0, false, {
                fileName: "[project]/app/missions/page.tsx",
                lineNumber: 993,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/missions/page.tsx",
        lineNumber: 798,
        columnNumber: 5
    }, this);
}
_s3(MissionsPage, "k4phjs5N2DLUfBjfAPSfZNoaA8c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$missions$2f$missionsController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMissionsController"]
    ];
});
_c3 = MissionsPage;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "CategoryCard");
__turbopack_context__.k.register(_c1, "MissionCard");
__turbopack_context__.k.register(_c2, "MissionDetailModal");
__turbopack_context__.k.register(_c3, "MissionsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0v9bqoq._.js.map