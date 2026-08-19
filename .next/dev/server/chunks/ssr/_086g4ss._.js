module.exports = [
"[project]/models/development.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ROADMAP_CARDS",
    ()=>ROADMAP_CARDS,
    "STAT_CARDS",
    ()=>STAT_CARDS,
    "STEM_AREAS",
    ()=>STEM_AREAS,
    "STEM_NEWS",
    ()=>STEM_NEWS,
    "getBibIcon",
    ()=>getBibIcon,
    "getLevelBadge",
    ()=>getLevelBadge,
    "initialDevZoneState",
    ()=>initialDevZoneState
]);
const initialDevZoneState = {
    activeArea: null,
    activeTopic: null,
    searchQuery: ''
};
const STEM_AREAS = [
    {
        id: 'fisica',
        icon: '⬡',
        area: 'Física Cuántica',
        title: 'QUANTUM_LAB',
        desc: 'Desde los fundamentos de la mecánica ondulatoria hasta los principios del entrelazamiento cuántico.',
        color: '#00e5a0',
        glow: 'rgba(0,229,160,0.25)',
        topics: [
            {
                id: 'f1',
                label: 'Fundamentos de mecánica cuántica',
                level: 'básico',
                prompt: 'Explícame los fundamentos de la mecánica cuántica desde cero, con ejemplos prácticos y analogías cotidianas.'
            },
            {
                id: 'f2',
                label: 'Dualidad onda-partícula',
                level: 'básico',
                prompt: 'Explícame la dualidad onda-partícula: qué es, cómo se descubrió y qué implica para nuestra comprensión de la realidad.'
            },
            {
                id: 'f3',
                label: 'Principio de incertidumbre',
                level: 'básico',
                prompt: 'Explica el principio de incertidumbre de Heisenberg con ejemplos concretos y su importancia en la física moderna.'
            },
            {
                id: 'f4',
                label: 'Superposición cuántica',
                level: 'intermedio',
                prompt: 'Explícame la superposición cuántica en detalle: qué es matemáticamente, cómo se observa y su relación con la computación cuántica.'
            },
            {
                id: 'f5',
                label: 'Entrelazamiento cuántico',
                level: 'intermedio',
                prompt: 'Dame una explicación profunda del entrelazamiento cuántico, sus implicaciones y aplicaciones en telecomunicaciones cuánticas.'
            }
        ],
        bibliography: [
            {
                title: 'Principios de Mecánica Cuántica',
                author: 'Paul Dirac',
                url: 'https://archive.org/details/principlesofquan0000dira',
                type: 'libro'
            },
            {
                title: 'Introduction to Quantum Mechanics',
                author: 'David Griffiths',
                url: 'https://www.cambridge.org/core/books/introduction-to-quantum-mechanics',
                type: 'libro'
            },
            {
                title: 'Quantum Computing for Everyone',
                author: 'MIT OpenCourseWare',
                url: 'https://ocw.mit.edu/courses/8-370x-quantum-information-science-i',
                type: 'curso'
            }
        ]
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
            {
                id: 'b1',
                label: 'Estructura celular',
                level: 'básico',
                prompt: 'Explícame la estructura de la célula eucariota y procariota, sus organelos y sus funciones principales.'
            },
            {
                id: 'b2',
                label: 'ADN y síntesis de proteínas',
                level: 'básico',
                prompt: 'Explica el proceso de síntesis de proteínas: transcripción, traducción y el rol del ADN y ARN.'
            },
            {
                id: 'b3',
                label: 'División celular: mitosis',
                level: 'básico',
                prompt: 'Describe detalladamente el proceso de mitosis, sus fases y su importancia en el crecimiento y reparación.'
            },
            {
                id: 'b4',
                label: 'Epigenética',
                level: 'intermedio',
                prompt: 'Explícame qué es la epigenética, cómo los factores ambientales modifican la expresión génica y sus implicaciones médicas.'
            },
            {
                id: 'b5',
                label: 'CRISPR y edición genética',
                level: 'intermedio',
                prompt: 'Dame una explicación completa de CRISPR-Cas9: cómo funciona, sus aplicaciones actuales y dilemas éticos.'
            }
        ],
        bibliography: [
            {
                title: 'Molecular Biology of the Cell',
                author: 'Alberts et al.',
                url: 'https://www.ncbi.nlm.nih.gov/books/NBK21054/',
                type: 'libro'
            },
            {
                title: 'The Gene: An Intimate History',
                author: 'Siddhartha Mukherjee',
                url: 'https://www.penguinrandomhouse.com/books/234652/the-gene-by-siddhartha-mukherjee/',
                type: 'libro'
            },
            {
                title: 'iBiology - Cell Biology Courses',
                author: 'iBiology',
                url: 'https://www.ibiology.org/cell-biology/',
                type: 'curso'
            }
        ]
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
            {
                id: 'a1',
                label: 'Sistema solar y planetas',
                level: 'básico',
                prompt: 'Explícame el sistema solar: formación, estructura, planetas y sus características principales.'
            },
            {
                id: 'a2',
                label: 'Tipos de estrellas y ciclo estelar',
                level: 'básico',
                prompt: 'Describe los tipos de estrellas, el diagrama HR y el ciclo de vida estelar desde su formación hasta su muerte.'
            },
            {
                id: 'a3',
                label: 'Agujeros negros',
                level: 'básico',
                prompt: 'Explica qué son los agujeros negros, cómo se forman, sus tipos y qué pasa en el horizonte de eventos.'
            },
            {
                id: 'a4',
                label: 'Relatividad general aplicada',
                level: 'intermedio',
                prompt: 'Explica cómo la relatividad general de Einstein describe la gravedad y su importancia para la astrofísica moderna.'
            },
            {
                id: 'a5',
                label: 'Energía y materia oscura',
                level: 'intermedio',
                prompt: 'Dame una explicación profunda sobre la materia oscura y la energía oscura: evidencias, teorías y misterios actuales.'
            }
        ],
        bibliography: [
            {
                title: 'Cosmos: A Personal Voyage',
                author: 'Carl Sagan',
                url: 'https://www.imdb.com/title/tt0081846/',
                type: 'video'
            },
            {
                title: 'A Brief History of Time',
                author: 'Stephen Hawking',
                url: 'https://www.penguinrandomhouse.com/books/119504/a-brief-history-of-time-by-stephen-hawking/',
                type: 'libro'
            },
            {
                title: 'NASA Open Learning',
                author: 'NASA',
                url: 'https://www.nasa.gov/learning-resources/',
                type: 'curso'
            }
        ]
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
            {
                id: 'm1',
                label: 'Álgebra lineal esencial',
                level: 'básico',
                prompt: 'Explícame álgebra lineal desde cero: vectores, matrices, transformaciones y sus aplicaciones en IA y gráficos.'
            },
            {
                id: 'm2',
                label: 'Cálculo diferencial',
                level: 'básico',
                prompt: 'Introduce el cálculo diferencial: límites, derivadas, reglas de derivación y aplicaciones físicas.'
            },
            {
                id: 'm3',
                label: 'Estadística y probabilidad',
                level: 'básico',
                prompt: 'Explica los conceptos fundamentales de estadística y probabilidad con ejemplos prácticos aplicados a datos reales.'
            },
            {
                id: 'm4',
                label: 'Cálculo integral',
                level: 'intermedio',
                prompt: 'Explica el cálculo integral: integrales definidas e indefinidas, técnicas de integración y aplicaciones en física e ingeniería.'
            },
            {
                id: 'm5',
                label: 'Matemáticas para Machine Learning',
                level: 'intermedio',
                prompt: 'Dame un recorrido por las matemáticas esenciales para Machine Learning: álgebra lineal, cálculo multivariable, estadística bayesiana y optimización.'
            }
        ],
        bibliography: [
            {
                title: 'Mathematics for Machine Learning',
                author: 'Deisenroth, Faisal, Ong',
                url: 'https://mml-book.github.io/',
                type: 'libro'
            },
            {
                title: '3Blue1Brown - Essence of Calculus',
                author: '3Blue1Brown',
                url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr',
                type: 'video'
            },
            {
                title: 'Khan Academy - Math',
                author: 'Khan Academy',
                url: 'https://www.khanacademy.org/math',
                type: 'curso'
            }
        ]
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
            {
                id: 'p1',
                label: 'Fundamentos de programación',
                level: 'básico',
                prompt: 'Explícame los fundamentos de la programación: variables, condicionales, bucles, funciones y paradigmas principales.'
            },
            {
                id: 'p2',
                label: 'Algoritmos y complejidad',
                level: 'básico',
                prompt: 'Introduce los algoritmos más importantes: búsqueda, ordenamiento, y explica la notación Big-O con ejemplos.'
            },
            {
                id: 'p3',
                label: 'Estructuras de datos',
                level: 'básico',
                prompt: 'Explica las estructuras de datos esenciales: arrays, listas enlazadas, pilas, colas, árboles y grafos con casos de uso.'
            },
            {
                id: 'p4',
                label: 'Machine Learning básico',
                level: 'intermedio',
                prompt: 'Dame una introducción completa a Machine Learning: tipos de aprendizaje, algoritmos clave y flujo de trabajo de un proyecto real.'
            },
            {
                id: 'p5',
                label: 'Redes neuronales y Deep Learning',
                level: 'intermedio',
                prompt: 'Explica cómo funcionan las redes neuronales artificiales, backpropagation y las arquitecturas principales de Deep Learning.'
            }
        ],
        bibliography: [
            {
                title: 'The Algorithm Design Manual',
                author: 'Steven Skiena',
                url: 'https://www.algorist.com/',
                type: 'libro'
            },
            {
                title: 'Deep Learning',
                author: 'Goodfellow, Bengio, Courville',
                url: 'https://www.deeplearningbook.org/',
                type: 'libro'
            },
            {
                title: 'fast.ai - Practical Deep Learning',
                author: 'fast.ai',
                url: 'https://www.fast.ai/',
                type: 'curso'
            }
        ]
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
            {
                id: 'q1',
                label: 'Estructura atómica',
                level: 'básico',
                prompt: 'Explícame la estructura del átomo: núcleo, electrones, modelos atómicos y la tabla periódica moderna.'
            },
            {
                id: 'q2',
                label: 'Tipos de enlace químico',
                level: 'básico',
                prompt: 'Describe los tipos de enlaces químicos: iónico, covalente, metálico y sus implicaciones en las propiedades de los materiales.'
            },
            {
                id: 'q3',
                label: 'Reacciones químicas',
                level: 'básico',
                prompt: 'Explica los tipos de reacciones químicas, balanceo de ecuaciones y la estequiometría con ejemplos prácticos.'
            },
            {
                id: 'q4',
                label: 'Termodinámica química',
                level: 'intermedio',
                prompt: 'Introduce la termodinámica química: entalpía, entropía, energía libre de Gibbs y equilibrio químico.'
            },
            {
                id: 'q5',
                label: 'Química orgánica básica',
                level: 'intermedio',
                prompt: 'Explícame los fundamentos de la química orgánica: hidrocarburos, grupos funcionales y reacciones orgánicas básicas.'
            }
        ],
        bibliography: [
            {
                title: 'Chemistry: The Central Science',
                author: 'Brown et al.',
                url: 'https://www.pearson.com/chemistry-central-science',
                type: 'libro'
            },
            {
                title: 'Organic Chemistry (OpenStax)',
                author: 'OpenStax',
                url: 'https://openstax.org/books/organic-chemistry/pages/1-introduction',
                type: 'libro'
            },
            {
                title: 'Khan Academy - Chemistry',
                author: 'Khan Academy',
                url: 'https://www.khanacademy.org/science/chemistry',
                type: 'curso'
            }
        ]
    }
];
const ROADMAP_CARDS = [
    {
        id: 'r1',
        icon: '◈',
        color: '#ff6b35',
        title: 'Científico de Datos',
        desc: 'Ruta completa desde Python hasta modelos de ML en producción.',
        prompt: 'Hazme un roadmap detallado con aprendizaje eficiente para convertirme en Científico de Datos: desde cero hasta nivel profesional, con recursos, tiempos estimados y orden de temas.'
    },
    {
        id: 'r2',
        icon: '⬡',
        color: '#00e5a0',
        title: 'Física Teórica',
        desc: 'De la mecánica clásica a la mecánica cuántica y relatividad.',
        prompt: 'Hazme un roadmap detallado con aprendizaje eficiente para estudiar Física Teórica de forma autodidacta: desde fundamentos hasta mecánica cuántica y relatividad, con libros y recursos.'
    },
    {
        id: 'r3',
        icon: '◎',
        color: '#a855f7',
        title: 'Astrofísica',
        desc: 'Astronomía observacional, cosmología y física de partículas.',
        prompt: 'Hazme un roadmap detallado con aprendizaje eficiente para aprender Astrofísica de forma independiente, desde astronomía básica hasta cosmología, con recursos actualizados.'
    },
    {
        id: 'r4',
        icon: '△',
        color: '#ffaa00',
        title: 'Matemáticas Avanzadas',
        desc: 'Análisis real, álgebra abstracta y topología.',
        prompt: 'Hazme un roadmap detallado con aprendizaje eficiente para dominar Matemáticas Avanzadas: análisis real, álgebra abstracta, topología y matemáticas para física, con libros y cursos.'
    }
];
const STEM_NEWS = [
    {
        id: 'n1',
        tag: 'Física Cuántica',
        tagColor: '#00e5a0',
        title: 'Computadora cuántica alcanza 1,000 qubits estables',
        summary: 'Un equipo de investigadores logró mantener coherencia cuántica en un procesador de 1,000 qubits durante 10 milisegundos, abriendo la puerta a cálculos imposibles para computadoras clásicas.',
        date: 'Jun 2026',
        url: 'https://www.nature.com/subjects/quantum-computing'
    },
    {
        id: 'n2',
        tag: 'Biología',
        tagColor: '#ff6b35',
        title: 'CRISPR elimina VIH en células humanas por primera vez',
        summary: 'Científicos reportan la erradicación completa del virus del VIH en células de pacientes usando una versión mejorada de CRISPR-Cas9, un avance hacia una cura funcional definitiva.',
        date: 'May 2026',
        url: 'https://www.cell.com/cell/crispr'
    },
    {
        id: 'n3',
        tag: 'IA & Computación',
        tagColor: '#ff3060',
        title: 'Nuevos modelos de IA diseñan moléculas medicinales autónomamente',
        summary: 'Sistemas de IA generativa ahora pueden proponer y validar candidatos a fármacos en días en lugar de años, reduciendo el costo de descubrimiento de medicamentos en un 90%.',
        date: 'Jun 2026',
        url: 'https://www.science.org/ai-drug-discovery'
    },
    {
        id: 'n4',
        tag: 'Astronomía',
        tagColor: '#a855f7',
        title: 'James Webb detecta atmósfera en exoplaneta potencialmente habitable',
        summary: 'El telescopio James Webb confirmó la presencia de vapor de agua y dióxido de carbono en la atmósfera de K2-18b, un exoplaneta a 120 años luz en la zona habitable de su estrella.',
        date: 'Abr 2026',
        url: 'https://www.nasa.gov/james-webb-telescope'
    }
];
const STAT_CARDS = [
    {
        icon: '⬡',
        value: '6',
        label: 'Áreas STEM',
        color: '#ff6b35'
    },
    {
        icon: '◈',
        value: '30',
        label: 'Temas',
        color: '#00e5a0'
    },
    {
        icon: '△',
        value: '4',
        label: 'Roadmaps',
        color: '#a855f7'
    },
    {
        icon: '◎',
        value: '18',
        label: 'Bibliografías',
        color: '#ffaa00'
    },
    {
        icon: '⊕',
        value: '4',
        label: 'Noticias STEM',
        color: '#ff3060'
    },
    {
        icon: '◆',
        value: '∞',
        label: 'Con Ather IA',
        color: '#00ccff'
    }
];
function getLevelBadge(level) {
    return level === 'básico' ? {
        label: 'BÁSICO',
        color: '#00e5a0'
    } : {
        label: 'INTERMEDIO',
        color: '#ffaa00'
    };
}
function getBibIcon(type) {
    const icons = {
        libro: '📖',
        artículo: '📄',
        curso: '🎓',
        video: '▶'
    };
    return icons[type];
}
}),
"[project]/controllers/user/development.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useZonaDesarrolloController",
    ()=>useZonaDesarrolloController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$development$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/development.ts [app-ssr] (ecmascript)");
// controller/useZonaDesarrolloController.ts
'use client';
;
;
;
function useZonaDesarrolloController() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$models$2f$development$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialDevZoneState"]);
    const areaRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    // ── Toggle STEM area expansion ────────────────────────────
    const toggleArea = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setState((s)=>({
                ...s,
                activeArea: s.activeArea === id ? null : id,
                activeTopic: null
            }));
    }, []);
    // ── Toggle topic expansion within area ────────────────────
    const toggleTopic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setState((s)=>({
                ...s,
                activeTopic: s.activeTopic === id ? null : id
            }));
    }, []);
    // ── Navigate to AI chat with pre-filled prompt ────────────
    // Uses sessionStorage so the chat page can read and pre-fill the input
    const sendToChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((prompt)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        router.push('/chatbot');
    }, [
        router
    ]);
    // ── Search filter ─────────────────────────────────────────
    const setSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((q)=>{
        setState((s)=>({
                ...s,
                searchQuery: q,
                activeArea: null,
                activeTopic: null
            }));
    }, []);
    // ── Filtered areas based on search ────────────────────────
    const filteredAreas = state.searchQuery.trim() ? __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$development$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STEM_AREAS"].filter((area)=>area.area.toLowerCase().includes(state.searchQuery.toLowerCase()) || area.title.toLowerCase().includes(state.searchQuery.toLowerCase()) || area.topics.some((t)=>t.label.toLowerCase().includes(state.searchQuery.toLowerCase()))) : __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$development$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STEM_AREAS"];
    return {
        state,
        filteredAreas,
        roadmaps: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$development$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROADMAP_CARDS"],
        news: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$development$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STEM_NEWS"],
        statCards: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$development$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STAT_CARDS"],
        areaRefs,
        toggleArea,
        toggleTopic,
        sendToChat,
        setSearch
    };
}
}),
"[project]/app/development/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ZonaDesarrolloView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/SplitText.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$user$2f$development$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/controllers/user/development.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$development$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/development.ts [app-ssr] (ecmascript)");
// view/ZonaDesarrolloView.tsx
'use client';
;
;
;
;
;
;
;
;
// ── Design tokens (estética módulos) ────────────────────────
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif";
const F_MONO = "'Plus Jakarta Sans', monospace";
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
function tiltMove(e, lift = -4, max = 10) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        y: lift,
        rotationY: px * max,
        rotationX: -py * max,
        transformPerspective: 800,
        duration: 0.28,
        ease: 'power2.out'
    });
}
function tiltReset(e) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.35,
        ease: 'power2.out'
    });
}
function magneticMove(e, strength = 0.2) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        x,
        y,
        duration: 0.25,
        ease: 'power2.out'
    });
}
function magneticReset(e) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: 'elastic.out(1,0.4)'
    });
}
// ── Icons ──────────────────────────────────────────────────────
const IconSearch = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-4 h-4",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        }, void 0, false, {
            fileName: "[project]/app/development/page.tsx",
            lineNumber: 48,
            columnNumber: 123
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/development/page.tsx",
        lineNumber: 48,
        columnNumber: 28
    }, ("TURBOPACK compile-time value", void 0));
const IconChevron = ({ open })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-4 h-4 transition-transform duration-300",
        style: {
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
        },
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "m19.5 8.25-7.5 7.5-7.5-7.5"
        }, void 0, false, {
            fileName: "[project]/app/development/page.tsx",
            lineNumber: 49,
            columnNumber: 248
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/development/page.tsx",
        lineNumber: 49,
        columnNumber: 55
    }, ("TURBOPACK compile-time value", void 0));
const IconBot = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-3.5 h-3.5",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
        }, void 0, false, {
            fileName: "[project]/app/development/page.tsx",
            lineNumber: 50,
            columnNumber: 127
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/development/page.tsx",
        lineNumber: 50,
        columnNumber: 28
    }, ("TURBOPACK compile-time value", void 0));
const IconBook = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-3.5 h-3.5",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        }, void 0, false, {
            fileName: "[project]/app/development/page.tsx",
            lineNumber: 51,
            columnNumber: 127
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/development/page.tsx",
        lineNumber: 51,
        columnNumber: 28
    }, ("TURBOPACK compile-time value", void 0));
const IconArrow = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-3 h-3",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2.5,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "m8.25 4.5 7.5 7.5-7.5 7.5"
        }, void 0, false, {
            fileName: "[project]/app/development/page.tsx",
            lineNumber: 52,
            columnNumber: 125
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/development/page.tsx",
        lineNumber: 52,
        columnNumber: 28
    }, ("TURBOPACK compile-time value", void 0));
const IconExternal = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-3 h-3",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
        }, void 0, false, {
            fileName: "[project]/app/development/page.tsx",
            lineNumber: 53,
            columnNumber: 123
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/development/page.tsx",
        lineNumber: 53,
        columnNumber: 28
    }, ("TURBOPACK compile-time value", void 0));
const IconMap = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-3.5 h-3.5",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
        }, void 0, false, {
            fileName: "[project]/app/development/page.tsx",
            lineNumber: 54,
            columnNumber: 127
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/development/page.tsx",
        lineNumber: 54,
        columnNumber: 28
    }, ("TURBOPACK compile-time value", void 0));
// ── 3D Neural field background ─────────────────────────────────
function NeuralField3D() {
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const container = mountRef.current;
        if (!container) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
        const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](55, container.clientWidth / container.clientHeight, 0.1, 300);
        camera.position.set(0, 12, 28);
        camera.lookAt(0, 0, 0);
        const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
            alpha: true,
            antialias: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        // ── Wave grid ──
        const w = 60, h = 40, segs = 40;
        const waveGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlaneGeometry"](w, h, segs, segs);
        const waveMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: 0xff6b35,
            wireframe: true,
            transparent: true,
            opacity: 0.12,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
            depthWrite: false
        });
        const wave = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](waveGeo, waveMat);
        wave.rotation.x = -Math.PI / 2.8;
        wave.position.y = -8;
        scene.add(wave);
        const wavePos = waveGeo.attributes.position.array;
        const baseZ = new Float32Array(wavePos.length / 3);
        for(let i = 0; i < wavePos.length / 3; i++)baseZ[i] = wavePos[i * 3 + 2];
        // ── Floating particles ──
        const nodeCount = 120;
        const pPos = new Float32Array(nodeCount * 3);
        const pCol = new Float32Array(nodeCount * 3);
        const palette = [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]('#FF6B00'),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]('#FF006E'),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]('#FFD700')
        ];
        for(let i = 0; i < nodeCount; i++){
            pPos[i * 3] = (Math.random() - 0.5) * 55;
            pPos[i * 3 + 1] = (Math.random() - 0.5) * 35;
            pPos[i * 3 + 2] = (Math.random() - 0.5) * 25;
            const col = palette[Math.floor(Math.random() * palette.length)];
            pCol[i * 3] = col.r;
            pCol[i * 3 + 1] = col.g;
            pCol[i * 3 + 2] = col.b;
        }
        const pGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        pGeo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](pPos, 3));
        pGeo.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](pCol, 3));
        const pMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointsMaterial"]({
            size: 0.18,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
            depthWrite: false
        });
        const particles = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Points"](pGeo, pMat);
        scene.add(particles);
        // ── Connecting lines (lighter) ──
        const linePositions = [];
        for(let i = 0; i < nodeCount; i++){
            const ax = pPos[i * 3], ay = pPos[i * 3 + 1], az = pPos[i * 3 + 2];
            for(let j = i + 1; j < Math.min(i + 8, nodeCount); j++){
                const d = Math.hypot(ax - pPos[j * 3], ay - pPos[j * 3 + 1], az - pPos[j * 3 + 2]);
                if (d < 7) linePositions.push(ax, ay, az, pPos[j * 3], pPos[j * 3 + 1], pPos[j * 3 + 2]);
            }
        }
        const lineGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        lineGeo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](linePositions, 3));
        const lineMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
            color: 0xff6b35,
            transparent: true,
            opacity: 0.05,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"]
        });
        const lines = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineSegments"](lineGeo, lineMat);
        scene.add(lines);
        // ── Orbiting rings ──
        const ring1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](14, 0.04, 16, 100), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: 0xff6b35,
            transparent: true,
            opacity: 0.15,
            wireframe: true,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"]
        }));
        const ring2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](9, 0.03, 16, 80), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: 0xff006e,
            transparent: true,
            opacity: 0.12,
            wireframe: true,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"]
        }));
        ring1.position.set(0, 6, -10);
        ring2.position.set(0, -4, -6);
        scene.add(ring1, ring2);
        let mx = 0, my = 0, scrollY = 0, smoothScroll = 0;
        let smoothMx = 0, smoothMy = 0;
        let prevScroll = 0, scrollVelocity = 0;
        const onMove = (e)=>{
            mx = (e.clientX / window.innerWidth - 0.5) * 2;
            my = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        const onScroll = ()=>{
            const y = window.scrollY || window.pageYOffset;
            scrollVelocity = y - prevScroll;
            prevScroll = y;
            scrollY = y;
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('scroll', onScroll, {
            passive: true
        });
        let raf = 0;
        const clock = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Clock"]();
        const animate = ()=>{
            raf = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            if (!prefersReduced) {
                smoothMx += (mx - smoothMx) * 0.05;
                smoothMy += (my - smoothMy) * 0.05;
                smoothScroll += (scrollY - smoothScroll) * 0.08;
                // Wave undulation (reactive to mouse, scroll, and constant time)
                for(let i = 0; i < wavePos.length / 3; i++){
                    const x = wavePos[i * 3];
                    const y = wavePos[i * 3 + 1];
                    wavePos[i * 3 + 2] = baseZ[i] + Math.sin(t * 1.4 + x * 0.18 + smoothScroll * 0.012) * 2.4 + Math.cos(t * 1.1 + y * 0.15 + smoothMx) * 1.8 + Math.sin(t * 3.0 + smoothScroll * 0.06 + i * 0.02) * 0.5;
                }
                waveGeo.attributes.position.needsUpdate = true;
                // Particles drift with scroll burst
                for(let i = 0; i < nodeCount; i++){
                    pPos[i * 3 + 1] += Math.sin(t * 0.6 + i * 0.5) * 0.02 + scrollVelocity * 0.002;
                    pPos[i * 3] += Math.cos(t * 0.5 + i * 0.5) * 0.015;
                    pPos[i * 3 + 2] += Math.sin(t * 0.4 + i) * 0.01;
                }
                pGeo.attributes.position.needsUpdate = true;
                // Camera parallax + scroll depth (stronger)
                camera.position.x += (smoothMx * 12 - camera.position.x) * 0.03;
                camera.position.y += (12 + smoothMy * 8 - camera.position.y) * 0.03;
                const targetZ = Math.max(5, 30 - smoothScroll * 0.045);
                camera.position.z += (targetZ - camera.position.z) * 0.04;
                camera.lookAt(0, smoothScroll * 0.015, 0);
                // Scene tilt with scroll
                camera.rotation.z = smoothScroll * 0.0003;
                // Global rotation
                particles.rotation.y = t * 0.04 + smoothScroll * 0.0005;
                lines.rotation.y = t * 0.04 + smoothScroll * 0.0005;
                wave.rotation.z = t * 0.02 + smoothMx * 0.06;
                wave.rotation.x = -Math.PI / 2.8 + smoothScroll * 0.0004;
                ring1.rotation.x = t * 0.08 + smoothMx * 0.15 + smoothScroll * 0.0006;
                ring1.rotation.y = t * 0.12;
                ring2.rotation.x = t * 0.10 + smoothMy * 0.15;
                ring2.rotation.y = t * 0.18 + smoothScroll * 0.0004;
                scrollVelocity *= 0.92;
            }
            renderer.render(scene, camera);
        };
        animate();
        const onResize = ()=>{
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', onResize);
        return ()=>{
            window.removeEventListener('resize', onResize);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
            if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
            renderer.dispose();
            waveGeo.dispose();
            waveMat.dispose();
            pGeo.dispose();
            pMat.dispose();
            lineGeo.dispose();
            lineMat.dispose();
            ring1.geometry.dispose();
            ring1.material.dispose();
            ring2.geometry.dispose();
            ring2.material.dispose();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none",
        style: {
            position: 'fixed',
            inset: 0,
            zIndex: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mountRef,
                style: {
                    width: '100%',
                    height: '100%'
                }
            }, void 0, false, {
                fileName: "[project]/app/development/page.tsx",
                lineNumber: 222,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(8,0,10,0.35) 65%, rgba(8,0,10,0.9) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/app/development/page.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/development/page.tsx",
        lineNumber: 221,
        columnNumber: 5
    }, this);
}
// ── Stat card ──────────────────────────────────────────────────
function StatCardItem({ card, index }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "stat-card flex flex-col items-center gap-1.5 p-5 rounded-2xl border cursor-default",
        style: {
            background: 'rgba(18,8,22,0.88)',
            borderColor: 'rgba(180,60,40,0.18)',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
        },
        onMouseMove: (e)=>{
            const el = e.currentTarget;
            el.style.borderColor = `${card.color}55`;
            el.style.boxShadow = `0 0 28px ${card.color}30`;
            tiltMove(e, -8, 12);
        },
        onMouseLeave: (e)=>{
            const el = e.currentTarget;
            el.style.borderColor = 'rgba(255,107,53,0.2)';
            el.style.boxShadow = 'none';
            tiltReset(e);
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: card.color,
                    fontSize: '1.4rem',
                    filter: `drop-shadow(0 0 6px ${card.color})`
                },
                children: card.icon
            }, void 0, false, {
                fileName: "[project]/app/development/page.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-3xl font-black",
                style: {
                    fontFamily: F_BE,
                    color: card.color,
                    letterSpacing: '-0.02em'
                },
                children: card.value
            }, void 0, false, {
                fileName: "[project]/app/development/page.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-center tracking-wider uppercase font-bold",
                style: {
                    color: 'rgba(200,150,120,0.6)',
                    fontFamily: F_MONO,
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em'
                },
                children: card.label
            }, void 0, false, {
                fileName: "[project]/app/development/page.tsx",
                lineNumber: 248,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/development/page.tsx",
        lineNumber: 232,
        columnNumber: 5
    }, this);
}
// ── STEM area card ─────────────────────────────────────────────
function STEMAreaCard({ area, isActive, activeTopic, onToggleArea, onToggleTopic, onSendToChat }) {
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!cardRef.current) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(cardRef.current, {
            height: isActive ? 'auto' : undefined,
            duration: 0.35,
            ease: 'power2.inOut'
        });
    }, [
        isActive
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: cardRef,
        className: "stem-card rounded-2xl overflow-hidden border",
        style: {
            background: 'rgba(18,8,22,0.88)',
            borderColor: isActive ? `${area.color}60` : 'rgba(255,107,53,0.2)',
            boxShadow: isActive ? `0 0 30px ${area.glow}` : 'none',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
        },
        onMouseMove: (e)=>{
            e.currentTarget.style.borderColor = `${area.color}75`;
            e.currentTarget.style.boxShadow = isActive ? `0 0 40px ${area.glow}` : `0 0 30px ${area.glow}`;
            tiltMove(e, -4, 8);
        },
        onMouseLeave: (e)=>{
            e.currentTarget.style.borderColor = isActive ? `${area.color}60` : 'rgba(255,107,53,0.2)';
            e.currentTarget.style.boxShadow = isActive ? `0 0 30px ${area.glow}` : 'none';
            tiltReset(e);
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onToggleArea(area.id),
                className: "w-full flex items-center gap-4 p-5 text-left transition-colors duration-200",
                style: {
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                },
                onMouseEnter: (e)=>{
                    if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                },
                onMouseLeave: (e)=>{
                    e.currentTarget.style.background = 'transparent';
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0",
                        style: {
                            background: `${area.color}18`,
                            border: `1px solid ${area.color}40`,
                            color: area.color,
                            filter: isActive ? `drop-shadow(0 0 8px ${area.color})` : 'none'
                        },
                        children: area.icon
                    }, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 296,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs tracking-widest uppercase mb-0.5 font-bold",
                                style: {
                                    color: `${area.color}cc`,
                                    fontFamily: F_MONO,
                                    letterSpacing: '0.2em',
                                    fontSize: '0.6rem'
                                },
                                children: area.area
                            }, void 0, false, {
                                fileName: "[project]/app/development/page.tsx",
                                lineNumber: 303,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-black text-sm tracking-wider",
                                style: {
                                    fontFamily: F_BE,
                                    color: '#ede0d4',
                                    letterSpacing: '0.06em',
                                    fontSize: '0.82rem'
                                },
                                children: area.title
                            }, void 0, false, {
                                fileName: "[project]/app/development/page.tsx",
                                lineNumber: 307,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs mt-0.5 line-clamp-1 font-bold",
                                style: {
                                    color: 'rgba(200,150,120,0.55)',
                                    fontFamily: F_MONO
                                },
                                children: area.desc
                            }, void 0, false, {
                                fileName: "[project]/app/development/page.tsx",
                                lineNumber: 311,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0",
                        style: {
                            color: `${area.color}80`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconChevron, {
                            open: isActive
                        }, void 0, false, {
                            fileName: "[project]/app/development/page.tsx",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/development/page.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, this),
            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-px mb-4",
                        style: {
                            background: `linear-gradient(90deg, transparent, ${area.color}40, transparent)`
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 324,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs tracking-widest uppercase mb-3 font-bold",
                        style: {
                            color: 'rgba(200,150,120,0.4)',
                            fontFamily: F_MONO,
                            letterSpacing: '0.2em',
                            fontSize: '0.58rem'
                        },
                        children: "Temario"
                    }, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 327,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 mb-5",
                        children: area.topics.map((topic)=>{
                            const badge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$development$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLevelBadge"])(topic.level);
                            const topicOpen = activeTopic === topic.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl overflow-hidden",
                                style: {
                                    border: `1px solid ${topicOpen ? area.color + '45' : 'rgba(180,60,40,0.15)'}`,
                                    background: topicOpen ? `${area.color}08` : 'rgba(255,255,255,0.02)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onToggleTopic(topic.id),
                                        className: "w-full flex items-center gap-3 px-3.5 py-2.5 text-left",
                                        style: {
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 flex items-center gap-2.5 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-semibold truncate",
                                                        style: {
                                                            color: '#ede0d4',
                                                            fontFamily: F_MONO,
                                                            letterSpacing: '0.03em'
                                                        },
                                                        children: topic.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/development/page.tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs px-1.5 py-0.5 rounded-full flex-shrink-0",
                                                        style: {
                                                            background: `${badge.color}18`,
                                                            border: `1px solid ${badge.color}60`,
                                                            color: badge.color,
                                                            fontFamily: F_MONO,
                                                            fontSize: '0.55rem',
                                                            letterSpacing: '0.15em'
                                                        },
                                                        children: badge.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/development/page.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 343,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-shrink-0",
                                                style: {
                                                    color: `${area.color}70`
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconChevron, {
                                                    open: topicOpen
                                                }, void 0, false, {
                                                    fileName: "[project]/app/development/page.tsx",
                                                    lineNumber: 354,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 353,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 340,
                                        columnNumber: 19
                                    }, this),
                                    topicOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3.5 pb-3 flex gap-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onSendToChat(topic.prompt),
                                            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider",
                                            style: {
                                                background: `${area.color}20`,
                                                border: `2px solid ${area.color}50`,
                                                color: area.color,
                                                fontFamily: F_MONO,
                                                letterSpacing: '0.1em',
                                                cursor: 'pointer',
                                                transformStyle: 'preserve-3d',
                                                willChange: 'transform'
                                            },
                                            onMouseMove: (e)=>{
                                                e.currentTarget.style.background = `${area.color}28`;
                                                e.currentTarget.style.boxShadow = `0 0 12px ${area.color}30`;
                                                magneticMove(e, 0.2);
                                            },
                                            onMouseLeave: (e)=>{
                                                e.currentTarget.style.background = `${area.color}18`;
                                                e.currentTarget.style.boxShadow = 'none';
                                                magneticReset(e);
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBot, {}, void 0, false, {
                                                    fileName: "[project]/app/development/page.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 25
                                                }, this),
                                                " Preguntar a Ather"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/development/page.tsx",
                                            lineNumber: 361,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 360,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, topic.id, true, {
                                fileName: "[project]/app/development/page.tsx",
                                lineNumber: 336,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 331,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs tracking-widest uppercase mb-2 font-bold",
                        style: {
                            color: 'rgba(200,150,120,0.4)',
                            fontFamily: F_MONO,
                            letterSpacing: '0.2em',
                            fontSize: '0.58rem'
                        },
                        children: "Bibliografía recomendada"
                    }, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 377,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: area.bibliography.map((bib, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: bib.url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "flex items-center gap-2.5 px-3 py-2 rounded-lg group",
                                style: {
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,107,53,0.15)',
                                    textDecoration: 'none',
                                    transformStyle: 'preserve-3d',
                                    willChange: 'transform'
                                },
                                onMouseMove: (e)=>{
                                    const el = e.currentTarget;
                                    el.style.background = 'rgba(255,255,255,0.05)';
                                    el.style.borderColor = 'rgba(255,107,53,0.3)';
                                    el.style.boxShadow = '0 0 16px rgba(255,107,53,0.12)';
                                    magneticMove(e, 0.15);
                                },
                                onMouseLeave: (e)=>{
                                    const el = e.currentTarget;
                                    el.style.background = 'rgba(255,255,255,0.02)';
                                    el.style.borderColor = 'rgba(255,107,53,0.15)';
                                    el.style.boxShadow = 'none';
                                    magneticReset(e);
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$development$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBibIcon"])(bib.type)
                                    }, void 0, false, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 389,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-semibold truncate",
                                                style: {
                                                    color: '#ede0d4',
                                                    fontFamily: F_MONO
                                                },
                                                children: bib.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 391,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold",
                                                style: {
                                                    color: 'rgba(200,150,120,0.45)',
                                                    fontFamily: F_MONO,
                                                    fontSize: '0.62rem'
                                                },
                                                children: bib.author
                                            }, void 0, false, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 392,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 390,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'rgba(200,150,120,0.4)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconExternal, {}, void 0, false, {
                                            fileName: "[project]/app/development/page.tsx",
                                            lineNumber: 394,
                                            columnNumber: 66
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 394,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/app/development/page.tsx",
                                lineNumber: 383,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 381,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/development/page.tsx",
                lineNumber: 323,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/development/page.tsx",
        lineNumber: 277,
        columnNumber: 5
    }, this);
}
// ── Roadmap card ───────────────────────────────────────────────
function RoadmapCardItem({ card, onSendToChat }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "roadmap-card rounded-2xl p-5 border cursor-pointer",
        style: {
            background: 'rgba(18,8,22,0.88)',
            borderColor: 'rgba(180,60,40,0.18)',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
        },
        onMouseMove: (e)=>{
            const el = e.currentTarget;
            el.style.borderColor = `${card.color}60`;
            el.style.boxShadow = `0 0 28px ${card.color}30`;
            tiltMove(e, -6, 10);
        },
        onMouseLeave: (e)=>{
            const el = e.currentTarget;
            el.style.borderColor = 'rgba(255,107,53,0.2)';
            el.style.boxShadow = 'none';
            tiltReset(e);
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0",
                        style: {
                            background: `${card.color}20`,
                            border: `2px solid ${card.color}50`,
                            color: card.color
                        },
                        children: card.icon
                    }, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 423,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "font-black text-sm mb-0.5",
                                style: {
                                    fontFamily: F_BE,
                                    color: '#ede0d4',
                                    fontSize: '0.78rem',
                                    letterSpacing: '0.04em'
                                },
                                children: card.title
                            }, void 0, false, {
                                fileName: "[project]/app/development/page.tsx",
                                lineNumber: 428,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-bold",
                                style: {
                                    color: 'rgba(200,150,120,0.55)',
                                    fontFamily: F_MONO
                                },
                                children: card.desc
                            }, void 0, false, {
                                fileName: "[project]/app/development/page.tsx",
                                lineNumber: 431,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 427,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/development/page.tsx",
                lineNumber: 422,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onSendToChat(card.prompt),
                className: "w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold tracking-wider",
                style: {
                    background: `${card.color}20`,
                    border: `2px solid ${card.color}50`,
                    color: card.color,
                    fontFamily: F_MONO,
                    letterSpacing: '0.12em',
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform'
                },
                onMouseMove: (e)=>{
                    e.currentTarget.style.background = `${card.color}28`;
                    magneticMove(e, 0.2);
                },
                onMouseLeave: (e)=>{
                    e.currentTarget.style.background = `${card.color}18`;
                    magneticReset(e);
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconMap, {}, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 440,
                        columnNumber: 9
                    }, this),
                    " VER ROADMAP EN ATHER"
                ]
            }, void 0, true, {
                fileName: "[project]/app/development/page.tsx",
                lineNumber: 434,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/development/page.tsx",
        lineNumber: 408,
        columnNumber: 5
    }, this);
}
// ── News card ──────────────────────────────────────────────────
function NewsCard({ item }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: item.url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "news-card group block rounded-2xl p-4 border",
        style: {
            background: 'rgba(18,8,22,0.88)',
            borderColor: 'rgba(255,107,53,0.2)',
            textDecoration: 'none',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
        },
        onMouseMove: (e)=>{
            const el = e.currentTarget;
            el.style.borderColor = `${item.tagColor}60`;
            el.style.background = 'rgba(18,8,22,0.95)';
            el.style.boxShadow = `0 0 28px ${item.tagColor}22`;
            tiltMove(e, -5, 9);
        },
        onMouseLeave: (e)=>{
            const el = e.currentTarget;
            el.style.borderColor = 'rgba(255,107,53,0.2)';
            el.style.background = 'rgba(18,8,22,0.88)';
            el.style.boxShadow = 'none';
            tiltReset(e);
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "px-2 py-0.5 rounded-full text-xs font-bold tracking-wider",
                        style: {
                            background: `${item.tagColor}20`,
                            border: `2px solid ${item.tagColor}60`,
                            color: item.tagColor,
                            fontFamily: F_MONO,
                            fontSize: '0.58rem',
                            letterSpacing: '0.15em'
                        },
                        children: item.tag
                    }, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 455,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs ml-auto",
                        style: {
                            color: 'rgba(200,150,120,0.4)',
                            fontFamily: F_MONO,
                            fontSize: '0.6rem'
                        },
                        children: item.date
                    }, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 460,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/development/page.tsx",
                lineNumber: 454,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "font-bold text-sm mb-1.5 leading-snug",
                style: {
                    color: '#ede0d4',
                    fontFamily: F_MONO,
                    letterSpacing: '0.02em'
                },
                children: item.title
            }, void 0, false, {
                fileName: "[project]/app/development/page.tsx",
                lineNumber: 462,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs leading-relaxed line-clamp-2 font-bold",
                style: {
                    color: 'rgba(200,150,120,0.55)',
                    fontFamily: F_MONO
                },
                children: item.summary
            }, void 0, false, {
                fileName: "[project]/app/development/page.tsx",
                lineNumber: 465,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1 mt-3 text-xs font-bold tracking-wider",
                style: {
                    color: item.tagColor,
                    fontFamily: F_MONO,
                    letterSpacing: '0.1em',
                    fontSize: '0.62rem'
                },
                children: [
                    "LEER MÁS ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconArrow, {}, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 468,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/development/page.tsx",
                lineNumber: 466,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/development/page.tsx",
        lineNumber: 449,
        columnNumber: 5
    }, this);
}
function ZonaDesarrolloView() {
    const { state, filteredAreas, roadmaps, news, statCards, toggleArea, toggleTopic, sendToChat, setSearch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$user$2f$development$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useZonaDesarrolloController"])();
    const heroRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const statsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ── Scroll progress + reveals ─────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = rootRef.current;
        if (!root) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const updateProgress = ()=>{
            const bar = root.querySelector('.zd-progress-bar-inner');
            if (!bar) return;
            const h = document.documentElement;
            const pct = (h.scrollTop || document.body.scrollTop) / (h.scrollHeight - h.clientHeight || 1);
            bar.style.transform = `scaleX(${Math.min(1, Math.max(0, pct))})`;
        };
        updateProgress();
        window.addEventListener('scroll', updateProgress, {
            passive: true
        });
        if (!prefersReduced) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].batch('.stat-card, .stem-card, .roadmap-card, .news-card', {
                onEnter: (batch)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(batch, {
                        opacity: 0,
                        y: 30,
                        rotateX: 15
                    }, {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 0.55,
                        stagger: 0.06,
                        ease: 'power2.out'
                    }),
                start: 'top 85%',
                once: true
            });
        }
        return ()=>{
            window.removeEventListener('scroll', updateProgress);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].getAll().forEach((st)=>st.kill());
        };
    }, []);
    // ── GSAP entrance ─────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].context(()=>{
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            // Ambient orb pulse
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.orb-zd1', {
                scale: 1.2,
                opacity: 0.5,
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.orb-zd2', {
                scale: 1.15,
                opacity: 0.35,
                duration: 7,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 2
            });
            // Hero entrance with SplitText
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                defaults: {
                    ease: 'power3.out'
                }
            });
            tl.fromTo('.hero-badge', {
                opacity: 0,
                y: -10
            }, {
                opacity: 1,
                y: 0,
                duration: 0.5
            });
            if (!prefersReduced) {
                const title = document.querySelector('.hero-title-text');
                if (title) {
                    const split = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SplitText"](title, {
                        type: 'chars'
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(split.chars, {
                        opacity: 0,
                        yPercent: 120,
                        rotationX: -70
                    }, {
                        opacity: 1,
                        yPercent: 0,
                        rotationX: 0,
                        duration: 0.85,
                        stagger: 0.03,
                        ease: 'back.out(1.7)',
                        delay: 0.1
                    });
                }
            } else {
                tl.fromTo('.hero-title-text', {
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7
                }, '-=0.2');
            }
            tl.fromTo('.hero-sub', {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.5
            }, '-=0.3').fromTo('.hero-cmd', {
                opacity: 0,
                scale: 0.95
            }, {
                opacity: 1,
                scale: 1,
                duration: 0.4
            }, '-=0.2').fromTo('.hero-search', {
                opacity: 0,
                y: 15
            }, {
                opacity: 1,
                y: 0,
                duration: 0.4
            }, '-=0.2');
        });
        return ()=>ctx.revert();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        :root {
          --pink: #FF006E;
          --orange: #FF6B00;
          --yellow: #FFD700;
        }
        .line-clamp-1{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        #zd-search::placeholder{color:rgba(210,170,140,0.3);letter-spacing:0.08em}
        #zd-search:focus{outline:none;border-color:rgba(255,107,53,0.6);border-bottom-color:var(--orange);background:rgba(255,107,53,0.03);box-shadow:0 0 20px rgba(255,107,53,0.18),0 4px 14px rgba(0,0,0,0.25)}
        .hero-title-text,.hero-title-text div{display:inline-block;background:linear-gradient(90deg,var(--pink),var(--orange),var(--yellow));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
      `
            }, void 0, false, {
                fileName: "[project]/app/development/page.tsx",
                lineNumber: 549,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: rootRef,
                className: "relative min-h-screen overflow-x-hidden",
                style: {
                    background: 'linear-gradient(135deg,#08040c 0%,#120818 50%,#08040c 100%)',
                    fontFamily: F_MONO
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "zd-progress-bar fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left",
                        style: {
                            background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "zd-progress-bar-inner",
                            style: {
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))',
                                boxShadow: '0 0 12px rgba(255,107,53,0.4)',
                                transform: 'scaleX(0)',
                                transformOrigin: 'left'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/development/page.tsx",
                            lineNumber: 569,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 567,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NeuralField3D, {}, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 573,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 pointer-events-none z-0",
                        style: {
                            opacity: 0.18,
                            backgroundImage: 'linear-gradient(rgba(255,0,110,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,0,110,0.05) 1px,transparent 1px)',
                            backgroundSize: '48px 48px',
                            maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,#000 0%,transparent 85%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,#000 0%,transparent 85%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 576,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "orb-zd1 fixed pointer-events-none rounded-full",
                        style: {
                            width: 700,
                            height: 700,
                            top: '-10%',
                            right: '-8%',
                            zIndex: 0,
                            background: 'radial-gradient(circle,rgba(255,107,53,0.18) 0%,transparent 70%)',
                            filter: 'blur(70px)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 585,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "orb-zd2 fixed pointer-events-none rounded-full",
                        style: {
                            width: 600,
                            height: 600,
                            bottom: '5%',
                            left: '-8%',
                            zIndex: 0,
                            background: 'radial-gradient(circle,rgba(255,0,110,0.15) 0%,transparent 70%)',
                            filter: 'blur(80px)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 588,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none fixed inset-0 z-[100]",
                        style: {
                            opacity: 0.04,
                            background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.05) 2px,rgba(255,255,255,0.05) 4px)',
                            mixBlendMode: 'overlay'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 593,
                        columnNumber: 9
                    }, this),
                    [
                        'tl',
                        'tr',
                        'bl',
                        'br'
                    ].map((pos)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "fixed pointer-events-none z-10",
                            style: {
                                width: 22,
                                height: 22,
                                opacity: 0.5,
                                top: pos.startsWith('t') ? 18 : undefined,
                                bottom: pos.startsWith('b') ? 18 : undefined,
                                left: pos.endsWith('l') ? 18 : undefined,
                                right: pos.endsWith('r') ? 18 : undefined,
                                borderTop: pos.startsWith('t') ? '2px solid var(--orange)' : undefined,
                                borderBottom: pos.startsWith('b') ? '2px solid var(--orange)' : undefined,
                                borderLeft: pos.endsWith('l') ? '2px solid var(--orange)' : undefined,
                                borderRight: pos.endsWith('r') ? '2px solid var(--orange)' : undefined
                            }
                        }, pos, false, {
                            fileName: "[project]/app/development/page.tsx",
                            lineNumber: 599,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: heroRef,
                                className: "text-center mb-14",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-badge flex items-center justify-center gap-2 mb-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 px-5 py-2 rounded-full",
                                            style: {
                                                background: 'rgba(255,107,53,0.1)',
                                                border: '2px solid rgba(255,107,53,0.25)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: 'var(--orange)',
                                                        fontSize: '0.8rem'
                                                    },
                                                    children: "◈"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/development/page.tsx",
                                                    lineNumber: 621,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-bold tracking-widest uppercase",
                                                    style: {
                                                        color: 'rgba(255,107,53,0.8)',
                                                        fontFamily: F_MONO,
                                                        letterSpacing: '0.25em',
                                                        fontSize: '0.7rem'
                                                    },
                                                    children: "Exploración activa"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/development/page.tsx",
                                                    lineNumber: 622,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        width: 6,
                                                        height: 6,
                                                        borderRadius: '50%',
                                                        background: '#00e5a0',
                                                        boxShadow: '0 0 8px #00e5a0',
                                                        display: 'inline-block',
                                                        animation: 'pulse 2s infinite'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/development/page.tsx",
                                                    lineNumber: 626,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/development/page.tsx",
                                            lineNumber: 619,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 618,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "hero-title font-black leading-none mb-6",
                                        style: {
                                            fontFamily: F_BE,
                                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                                            letterSpacing: '-0.02em'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hero-title-text",
                                            style: {
                                                background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            },
                                            children: "ZONA DE DESARROLLO"
                                        }, void 0, false, {
                                            fileName: "[project]/app/development/page.tsx",
                                            lineNumber: 634,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 632,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "hero-sub text-base max-w-2xl mx-auto mb-8 leading-relaxed",
                                        style: {
                                            color: 'rgba(200,160,140,0.7)',
                                            fontFamily: F_MONO,
                                            letterSpacing: '0.04em',
                                            fontSize: '1rem'
                                        },
                                        children: "Temarios STEM desde lo esencial hasta nivel intermedio. Explora con Ather IA, sigue roadmaps y descubre bibliografía curada."
                                    }, void 0, false, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 639,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-cmd inline-flex items-center gap-3 px-5 py-2.5 rounded-xl mx-auto mb-8",
                                        style: {
                                            background: 'rgba(8,4,14,0.9)',
                                            border: '2px solid rgba(255,107,53,0.25)',
                                            fontFamily: F_MONO
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--orange)',
                                                    fontSize: '0.8rem'
                                                },
                                                children: "$"
                                            }, void 0, false, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 648,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: '#ede0d4',
                                                    fontSize: '0.78rem',
                                                    letterSpacing: '0.05em'
                                                },
                                                children: "ather explore --area stem --level basico"
                                            }, void 0, false, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 649,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 645,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-search relative max-w-md mx-auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute left-3.5 top-1/2 -translate-y-1/2",
                                                style: {
                                                    color: 'rgba(255,107,53,0.5)'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconSearch, {}, void 0, false, {
                                                    fileName: "[project]/app/development/page.tsx",
                                                    lineNumber: 657,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 656,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "zd-search",
                                                value: state.searchQuery,
                                                onChange: (e)=>setSearch(e.target.value),
                                                placeholder: "BUSCAR ÁREA O TEMA...",
                                                className: "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all duration-200",
                                                style: {
                                                    background: 'rgba(255,255,255,0.03)',
                                                    border: '2px solid rgba(255,107,53,0.2)',
                                                    color: '#ede0d4',
                                                    fontFamily: F_MONO,
                                                    fontSize: '0.78rem',
                                                    letterSpacing: '0.06em',
                                                    caretColor: 'var(--orange)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 659,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 655,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/development/page.tsx",
                                lineNumber: 616,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 sm:grid-cols-6 gap-3 mb-14",
                                children: statCards.map((card, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCardItem, {
                                        card: card,
                                        index: i
                                    }, card.label, false, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 673,
                                        columnNumber: 41
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/development/page.tsx",
                                lineNumber: 672,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "lg:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "section-hdr flex items-center gap-3 mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: 'var(--orange)',
                                                            fontSize: '1.2rem'
                                                        },
                                                        children: "◈"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/development/page.tsx",
                                                        lineNumber: 682,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "font-black tracking-widest uppercase",
                                                        style: {
                                                            fontFamily: F_BE,
                                                            color: '#ede0d4',
                                                            fontSize: '0.85rem',
                                                            letterSpacing: '0.2em'
                                                        },
                                                        children: "ÁREAS STEM"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/development/page.tsx",
                                                        lineNumber: 683,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 h-px",
                                                        style: {
                                                            background: 'rgba(255,107,53,0.15)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/development/page.tsx",
                                                        lineNumber: 687,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-bold",
                                                        style: {
                                                            color: 'rgba(255,107,53,0.5)',
                                                            fontFamily: F_MONO,
                                                            fontSize: '0.7rem'
                                                        },
                                                        children: [
                                                            filteredAreas.length,
                                                            " módulos"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/development/page.tsx",
                                                        lineNumber: 688,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 681,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-3",
                                                children: [
                                                    filteredAreas.map((area)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(STEMAreaCard, {
                                                            area: area,
                                                            isActive: state.activeArea === area.id,
                                                            activeTopic: state.activeTopic,
                                                            onToggleArea: toggleArea,
                                                            onToggleTopic: toggleTopic,
                                                            onSendToChat: sendToChat
                                                        }, area.id, false, {
                                                            fileName: "[project]/app/development/page.tsx",
                                                            lineNumber: 695,
                                                            columnNumber: 19
                                                        }, this)),
                                                    filteredAreas.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center py-12 font-bold",
                                                        style: {
                                                            color: 'rgba(200,150,120,0.35)',
                                                            fontFamily: F_MONO,
                                                            letterSpacing: '0.1em',
                                                            fontSize: '0.78rem'
                                                        },
                                                        children: [
                                                            'Sin resultados para "',
                                                            state.searchQuery,
                                                            '"'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/development/page.tsx",
                                                        lineNumber: 706,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 693,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 680,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "section-hdr flex items-center gap-3 mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: 'var(--orange)',
                                                            fontSize: '1.2rem'
                                                        },
                                                        children: "⬡"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/development/page.tsx",
                                                        lineNumber: 717,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "font-black tracking-widest uppercase",
                                                        style: {
                                                            fontFamily: F_BE,
                                                            color: '#ede0d4',
                                                            fontSize: '0.85rem',
                                                            letterSpacing: '0.2em'
                                                        },
                                                        children: "ROADMAPS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/development/page.tsx",
                                                        lineNumber: 718,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 h-px",
                                                        style: {
                                                            background: 'rgba(255,107,53,0.15)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/development/page.tsx",
                                                        lineNumber: 722,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 716,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-3",
                                                children: roadmaps.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RoadmapCardItem, {
                                                        card: card,
                                                        onSendToChat: sendToChat
                                                    }, card.id, false, {
                                                        fileName: "[project]/app/development/page.tsx",
                                                        lineNumber: 727,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 725,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 p-4 rounded-2xl border",
                                                style: {
                                                    background: 'rgba(255,107,53,0.06)',
                                                    borderColor: 'rgba(255,107,53,0.25)',
                                                    borderStyle: 'dashed'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs mb-2 tracking-wider uppercase font-bold",
                                                        style: {
                                                            color: 'rgba(255,107,53,0.7)',
                                                            fontFamily: F_MONO,
                                                            fontSize: '0.6rem',
                                                            letterSpacing: '0.2em'
                                                        },
                                                        children: "✦ Pregunta libre"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/development/page.tsx",
                                                        lineNumber: 735,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs mb-3 font-bold",
                                                        style: {
                                                            color: 'rgba(200,150,120,0.55)',
                                                            fontFamily: F_MONO
                                                        },
                                                        children: "Envía cualquier pregunta directamente a Ather IA"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/development/page.tsx",
                                                        lineNumber: 739,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>sendToChat(''),
                                                        className: "w-full py-2 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2",
                                                        style: {
                                                            background: 'linear-gradient(135deg,var(--orange),var(--yellow))',
                                                            color: '#fff',
                                                            fontFamily: F_BE,
                                                            fontSize: '0.65rem',
                                                            letterSpacing: '0.15em',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            boxShadow: '0 4px 16px rgba(255,107,53,0.3)',
                                                            transformStyle: 'preserve-3d',
                                                            willChange: 'transform'
                                                        },
                                                        onMouseMove: (e)=>{
                                                            e.currentTarget.style.boxShadow = '0 6px 24px rgba(255,107,53,0.45)';
                                                            magneticMove(e, 0.2);
                                                        },
                                                        onMouseLeave: (e)=>{
                                                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,107,53,0.3)';
                                                            magneticReset(e);
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBot, {}, void 0, false, {
                                                                fileName: "[project]/app/development/page.tsx",
                                                                lineNumber: 749,
                                                                columnNumber: 19
                                                            }, this),
                                                            " ABRIR ATHER IA"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/development/page.tsx",
                                                        lineNumber: 742,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 732,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 715,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/development/page.tsx",
                                lineNumber: 677,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "section-hdr flex items-center gap-3 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--orange)',
                                                    fontSize: '1.2rem'
                                                },
                                                children: "◎"
                                            }, void 0, false, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 758,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-black tracking-widest uppercase",
                                                style: {
                                                    fontFamily: F_BE,
                                                    color: '#ede0d4',
                                                    fontSize: '0.85rem',
                                                    letterSpacing: '0.2em'
                                                },
                                                children: "NOTICIAS STEM"
                                            }, void 0, false, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 759,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 h-px",
                                                style: {
                                                    background: 'rgba(255,107,53,0.15)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 763,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-bold",
                                                style: {
                                                    color: 'rgba(255,107,53,0.5)',
                                                    fontFamily: F_MONO,
                                                    fontSize: '0.7rem'
                                                },
                                                children: "Actualizadas mensualmente"
                                            }, void 0, false, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 764,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 757,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
                                        children: news.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NewsCard, {
                                                item: item
                                            }, item.id, false, {
                                                fileName: "[project]/app/development/page.tsx",
                                                lineNumber: 769,
                                                columnNumber: 33
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 768,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/development/page.tsx",
                                lineNumber: 756,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mt-16",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-px mb-8",
                                        style: {
                                            background: 'linear-gradient(90deg, transparent, var(--orange), transparent)',
                                            opacity: 0.5
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 775,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs tracking-widest uppercase font-bold",
                                        style: {
                                            color: 'rgba(255,107,53,0.3)',
                                            fontFamily: F_MONO,
                                            letterSpacing: '0.4em'
                                        },
                                        children: "✦ athernix · zona de desarrollo · stem · v2.0 ✦"
                                    }, void 0, false, {
                                        fileName: "[project]/app/development/page.tsx",
                                        lineNumber: 776,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/development/page.tsx",
                                lineNumber: 774,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/development/page.tsx",
                        lineNumber: 613,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/development/page.tsx",
                lineNumber: 563,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=_086g4ss._.js.map