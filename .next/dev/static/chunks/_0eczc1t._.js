(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/models/Vrtech.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HEADSET_ANATOMY",
    ()=>HEADSET_ANATOMY,
    "PIPELINE_STAGES",
    ()=>PIPELINE_STAGES,
    "UNITY_HEADSETS",
    ()=>UNITY_HEADSETS,
    "VR_TECH_INFO",
    ()=>VR_TECH_INFO,
    "initialVRTechState",
    ()=>initialVRTechState
]);
const PIPELINE_STAGES = [
    {
        id: 'tracking',
        step: '01',
        title: 'TRACKING ESPACIAL',
        short: 'El headset descubre dónde está tu cabeza y tus manos en el espacio real.',
        detail: 'Cada headset combina una IMU (giroscopio + acelerómetro) que mide rotación a alta frecuencia con cámaras de seguimiento "inside-out" que leen el entorno para calcular posición absoluta. Esta fusión de sensores se llama SLAM (Simultaneous Localization and Mapping).',
        bullets: [
            '6DoF: 3 ejes de rotación + 3 ejes de traslación',
            'IMU a ~1000Hz para rotación instantánea',
            'Cámaras inside-out para posición sin estaciones externas',
            'Hand-tracking óptico sin controladores físicos'
        ],
        color: 'var(--pink)'
    },
    {
        id: 'render',
        step: '02',
        title: 'RENDERIZADO ESTEREOSCÓPICO',
        short: 'El motor dibuja dos imágenes ligeramente distintas, una por ojo.',
        detail: 'El GPU renderiza la escena dos veces desde cámaras separadas por la distancia interpupilar (~63mm), generando la ilusión de profundidad. Técnicas como el foveated rendering priorizan resolución donde el ojo mira, ahorrando cómputo en la periferia.',
        bullets: [
            'Doble cámara virtual (ojo izquierdo / derecho)',
            'Foveated rendering apoyado en eye-tracking',
            'Corrección de distorsión de lente en el shader final',
            'Single Pass Instanced Rendering para eficiencia'
        ],
        color: 'var(--orange)'
    },
    {
        id: 'display',
        step: '03',
        title: 'PANTALLAS Y ÓPTICA',
        short: 'Paneles de alta densidad y lentes especiales llevan la imagen a tus ojos.',
        detail: 'Los paneles OLED o LCD de baja persistencia se combinan con lentes Fresnel o "pancake" que doblan la luz en un espacio reducido, ampliando el campo de visión sin necesitar un headset enorme.',
        bullets: [
            'Refresco de 90–120Hz para reducir parpadeo',
            'Baja persistencia para evitar estelas de movimiento',
            'Lentes pancake: cuerpos más delgados y compactos',
            'FOV típico entre 90° y 120°'
        ],
        color: 'var(--yellow)'
    },
    {
        id: 'latency',
        step: '04',
        title: 'LATENCIA MOTION-TO-PHOTON',
        short: 'El tiempo entre que mueves la cabeza y el ojo ve el cambio debe ser casi nulo.',
        detail: 'Se considera el parámetro más crítico de la VR: por encima de ~20ms el cerebro detecta el desfase y aparece el "VR sickness". Técnicas como Asynchronous Timewarp reproyectan el último frame renderizado para compensar el retraso del GPU.',
        bullets: [
            'Umbral aceptado: menor a 20ms',
            'Asynchronous Timewarp / Spacewarp',
            'Predicción de movimiento basada en IMU',
            'Sincronización directa GPU–display (no V-Sync tradicional)'
        ],
        color: 'var(--pink)'
    },
    {
        id: 'audio-haptics',
        step: '05',
        title: 'AUDIO ESPACIAL Y HÁPTICOS',
        short: 'El sonido y el tacto refuerzan que el entorno virtual es "real".',
        detail: 'El audio 3D posiciona fuentes de sonido en el espacio usando HRTF (Head-Related Transfer Function), mientras que motores de vibración en controladores y guantes hápticos simulan resistencia, textura e impacto.',
        bullets: [
            'HRTF para sonido direccional realista',
            'Haptic feedback adaptativo por evento',
            'Guantes y trajes hápticos en investigación clínica',
            'Sincronía audio-visual-táctil menor a 20ms'
        ],
        color: 'var(--orange)'
    },
    {
        id: 'input',
        step: '06',
        title: 'INTERACCIÓN Y ENTRADA',
        short: 'Controladores, manos y voz traducen tu intención en acciones dentro del mundo virtual.',
        detail: 'El XR Interaction Toolkit y sistemas equivalentes abstraen la entrada de controladores, hand-tracking y eye-tracking en un solo modelo de interacción, permitiendo agarrar, teletransportarse o apuntar sin código específico por dispositivo.',
        bullets: [
            'Controladores con joystick, triggers y botones capacitivos',
            'Hand-tracking basado en cámaras infrarrojas',
            'Eye-tracking para selección por mirada',
            'Locomoción: teleport, smooth locomotion, redirected walking'
        ],
        color: 'var(--yellow)'
    }
];
const HEADSET_ANATOMY = [
    {
        id: 'lenses',
        label: 'Lentes',
        desc: 'Fresnel o pancake; enfocan el panel a centímetros del ojo.',
        icon: '◎'
    },
    {
        id: 'displays',
        label: 'Paneles',
        desc: 'OLED/LCD por ojo o panel único dividido, alta densidad de píxeles.',
        icon: '▣'
    },
    {
        id: 'imu',
        label: 'IMU',
        desc: 'Giroscopio + acelerómetro + magnetómetro para rotación instantánea.',
        icon: '✦'
    },
    {
        id: 'cameras',
        label: 'Cámaras de tracking',
        desc: 'Visión inside-out en escala de grises para mapear el entorno.',
        icon: '◈'
    },
    {
        id: 'chipset',
        label: 'Procesador',
        desc: 'SoC standalone (ej. Snapdragon XR2) o enlace a PC/consola.',
        icon: '⬡'
    },
    {
        id: 'audio',
        label: 'Audio integrado',
        desc: 'Altavoces cercanos al oído o soporte para audífonos con HRTF.',
        icon: '♫'
    }
];
const UNITY_HEADSETS = [
    {
        id: 'quest3',
        name: 'Meta Quest 3 / 3S',
        maker: 'Meta',
        type: 'Standalone',
        unityPath: [
            'OpenXR',
            'Meta XR SDK'
        ],
        notes: 'Soporte oficial vía Unity OpenXR Plugin + Meta XR Core SDK. Es el dispositivo con mejor tooling directo dentro del Editor (Meta XR Simulator incluido).',
        color: 'var(--pink)'
    },
    {
        id: 'questpro',
        name: 'Meta Quest Pro / Quest 2',
        maker: 'Meta',
        type: 'Standalone',
        unityPath: [
            'OpenXR',
            'Meta XR SDK'
        ],
        notes: 'Misma ruta que Quest 3; Quest Pro añade eye-tracking y face-tracking accesibles vía Meta XR SDK.',
        color: 'var(--pink)'
    },
    {
        id: 'vive',
        name: 'HTC Vive / Vive Pro / Focus',
        maker: 'HTC',
        type: 'PCVR',
        unityPath: [
            'OpenXR',
            'SteamVR / OpenVR'
        ],
        notes: 'Compatible mediante el runtime OpenXR de SteamVR o el plugin OpenVR de Valve para funciones específicas.',
        color: 'var(--orange)'
    },
    {
        id: 'index',
        name: 'Valve Index',
        maker: 'Valve',
        type: 'PCVR',
        unityPath: [
            'OpenXR',
            'SteamVR / OpenVR'
        ],
        notes: 'Controladores "Knuckles" con tracking de dedos individuales, expuestos vía OpenXR input actions.',
        color: 'var(--orange)'
    },
    {
        id: 'pico',
        name: 'PICO 4 / 4 Ultra',
        maker: 'ByteDance',
        type: 'Standalone',
        unityPath: [
            'OpenXR'
        ],
        notes: 'Soporte a través del PICO Unity Integration SDK, basado en el mismo estándar OpenXR.',
        color: 'var(--yellow)'
    },
    {
        id: 'psvr2',
        name: 'PlayStation VR2',
        maker: 'Sony',
        type: 'Consola',
        unityPath: [
            'PS VR2 SDK'
        ],
        notes: 'En PS5 se integra mediante el SDK oficial de PlayStation para Unity (acceso restringido a desarrolladores registrados en PlayStation Partners).',
        color: 'var(--yellow)'
    },
    {
        id: 'wmr',
        name: 'Windows Mixed Reality',
        maker: 'Microsoft (legado)',
        type: 'Mixed Reality',
        unityPath: [
            'OpenXR'
        ],
        notes: 'La plataforma WMR fue descontinuada por Microsoft; los headsets existentes siguen operando vía el plugin OpenXR estándar.',
        color: 'var(--pink)'
    },
    {
        id: 'visionpro',
        name: 'Apple Vision Pro',
        maker: 'Apple',
        type: 'Mixed Reality',
        unityPath: [
            'PolySpatial'
        ],
        notes: 'No usa el modelo VR inmersivo tradicional de Unity: se desarrolla con el paquete PolySpatial para apps espaciales/ventaneadas en visionOS.',
        color: 'var(--orange)'
    }
];
const initialVRTechState = {
    activeStage: null,
    activeHeadset: null
};
const VR_TECH_INFO = {
    eyebrow: '[ FUNDAMENTOS_XR // CÓMO_FUNCIONA // 2026 ]',
    titleLine1: 'TECNOLOGÍA',
    titleLine2: 'REALIDAD VIRTUAL',
    sub: 'DEL SENSOR AL CEREBRO · LA CIENCIA DETRÁS DEL CASCO'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/controllers/information/Vrtech.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVRTechnologyController",
    ()=>useVRTechnologyController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Vrtech$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Vrtech.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useVRTechnologyController() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Vrtech$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialVRTechState"]);
    const toggleStage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVRTechnologyController.useCallback[toggleStage]": (id)=>{
            setState({
                "useVRTechnologyController.useCallback[toggleStage]": (s)=>({
                        ...s,
                        activeStage: s.activeStage === id ? null : id
                    })
            }["useVRTechnologyController.useCallback[toggleStage]"]);
        }
    }["useVRTechnologyController.useCallback[toggleStage]"], []);
    const toggleHeadset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVRTechnologyController.useCallback[toggleHeadset]": (id)=>{
            setState({
                "useVRTechnologyController.useCallback[toggleHeadset]": (s)=>({
                        ...s,
                        activeHeadset: s.activeHeadset === id ? null : id
                    })
            }["useVRTechnologyController.useCallback[toggleHeadset]"]);
        }
    }["useVRTechnologyController.useCallback[toggleHeadset]"], []);
    const goToModulos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVRTechnologyController.useCallback[goToModulos]": ()=>{
            router.push('/modulos');
        }
    }["useVRTechnologyController.useCallback[goToModulos]"], [
        router
    ]);
    const goToChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVRTechnologyController.useCallback[goToChat]": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                sessionStorage.setItem('ather_prefill_prompt', '¿Qué headset de VR me recomiendas para empezar a desarrollar en Unity?');
            }
            router.push('/chatbot');
        }
    }["useVRTechnologyController.useCallback[goToChat]"], [
        router
    ]);
    return {
        state,
        info: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Vrtech$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VR_TECH_INFO"],
        pipeline: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Vrtech$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PIPELINE_STAGES"],
        anatomy: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Vrtech$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HEADSET_ANATOMY"],
        headsets: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Vrtech$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNITY_HEADSETS"],
        toggleStage,
        toggleHeadset,
        goToModulos,
        goToChat
    };
}
_s(useVRTechnologyController, "O+ujzhb2104egwgDA4sj2ZfRqb8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/vrtech/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VRTechnologyPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/SplitText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$information$2f$Vrtech$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/controllers/information/Vrtech.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// @ts-nocheck
'use client';
;
;
;
;
;
;
if ("TURBOPACK compile-time truthy", 1) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SplitText"]);
}
function magneticMove(e, strength = 0.3) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(e.currentTarget, {
        x,
        y,
        duration: 0.3,
        ease: 'power2.out'
    });
}
function magneticReset(e) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(e.currentTarget, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1,0.4)'
    });
}
function tiltMove(e, lift = -4, max = 10) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(e.currentTarget, {
        y: lift,
        rotationY: px * max,
        rotationX: -py * max,
        transformPerspective: 700,
        duration: 0.35,
        ease: 'power2.out'
    });
}
function tiltReset(e) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(e.currentTarget, {
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.45,
        ease: 'power2.out'
    });
}
function VRTechnologyPage() {
    _s();
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { state, info, pipeline, anatomy, headsets, toggleStage, toggleHeadset, goToModulos, goToChat } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$information$2f$Vrtech$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVRTechnologyController"])();
    // ── THREE.JS: fondo scroll-driven estilo Chroma VR ──
    // ── GSAP: scroll-driven hero parallax (canvas + content) ──
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VRTechnologyPage.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") === 'undefined' || !rootRef.current) return;
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) return;
            const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].context({
                "VRTechnologyPage.useEffect.ctx": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to('.vrt-hero-canvas-wrap', {
                        y: '18%',
                        scale: 0.85,
                        opacity: 0.45,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '.vrt-hero',
                            start: 'top top',
                            end: 'bottom top',
                            scrub: 0.6
                        }
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to('.vrt-hero-content', {
                        y: -40,
                        opacity: 0,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '.vrt-hero',
                            start: 'top top',
                            end: '50% top',
                            scrub: 0.5
                        }
                    });
                }
            }["VRTechnologyPage.useEffect.ctx"], rootRef);
            return ({
                "VRTechnologyPage.useEffect": ()=>ctx.revert()
            })["VRTechnologyPage.useEffect"];
        }
    }["VRTechnologyPage.useEffect"], []);
    // ── GSAP: revelado progresivo de secciones al hacer scroll ──
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VRTechnologyPage.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") === 'undefined' || !rootRef.current) return;
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            let split = null;
            const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].context({
                "VRTechnologyPage.useEffect.ctx": ()=>{
                    // Scroll progress bar
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set('.vrt-progress-bar', {
                        scaleX: 0
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to('.vrt-progress-bar', {
                        scaleX: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: rootRef.current,
                            start: 'top top',
                            end: 'bottom bottom',
                            scrub: 0.3
                        }
                    });
                    // Ambient orb parallax
                    if (!prefersReduced) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to('.vrt-bg-orb-1', {
                            y: -80,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: rootRef.current,
                                start: 'top top',
                                end: 'bottom top',
                                scrub: 1
                            }
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to('.vrt-bg-orb-2', {
                            y: 120,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: rootRef.current,
                                start: 'top top',
                                end: 'bottom top',
                                scrub: 1
                            }
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to('.vrt-bg-orb-3', {
                            y: -40,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: rootRef.current,
                                start: 'top top',
                                end: 'bottom top',
                                scrub: 1
                            }
                        });
                    }
                    // Hero entrance
                    const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].timeline({
                        defaults: {
                            ease: 'power3.out'
                        }
                    });
                    tl.fromTo('.vrt-eyebrow', {
                        opacity: 0,
                        y: -10
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5
                    });
                    const line2 = rootRef.current.querySelector('.vrt-title .line2');
                    if (line2 && !prefersReduced) {
                        split = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SplitText"](line2, {
                            type: 'chars'
                        });
                        tl.fromTo('.vrt-title > span:not(.line2)', {
                            opacity: 0,
                            y: 30
                        }, {
                            opacity: 1,
                            y: 0,
                            duration: 0.7
                        }, '-=0.1').fromTo(split.chars, {
                            opacity: 0,
                            yPercent: 120,
                            rotationX: -80
                        }, {
                            opacity: 1,
                            yPercent: 0,
                            rotationX: 0,
                            duration: 0.8,
                            stagger: 0.025,
                            ease: 'back.out(1.7)'
                        }, '-=0.3');
                    } else {
                        tl.fromTo('.vrt-title', {
                            opacity: 0,
                            y: 30
                        }, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8
                        }, '-=0.1');
                    }
                    tl.fromTo('.vrt-sub', {
                        opacity: 0
                    }, {
                        opacity: 1,
                        duration: 0.6
                    }, '-=0.3').fromTo('.vrt-scroll', {
                        opacity: 0
                    }, {
                        opacity: 1,
                        duration: 0.6
                    }, '-=0.3');
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].utils.toArray('.vrt-reveal').forEach({
                        "VRTechnologyPage.useEffect.ctx": (el)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(el, {
                                opacity: 0,
                                y: 36
                            }, {
                                opacity: 1,
                                y: 0,
                                duration: 0.8,
                                ease: 'power3.out',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 85%',
                                    toggleActions: 'play none none reverse'
                                }
                            });
                        }
                    }["VRTechnologyPage.useEffect.ctx"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].utils.toArray('.vrt-stagger').forEach({
                        "VRTechnologyPage.useEffect.ctx": (group)=>{
                            const items = group.querySelectorAll('.vrt-stagger-item');
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(items, {
                                opacity: 0,
                                y: 24
                            }, {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                stagger: 0.08,
                                ease: 'power2.out',
                                scrollTrigger: {
                                    trigger: group,
                                    start: 'top 85%',
                                    toggleActions: 'play none none reverse'
                                }
                            });
                        }
                    }["VRTechnologyPage.useEffect.ctx"]);
                }
            }["VRTechnologyPage.useEffect.ctx"], rootRef);
            return ({
                "VRTechnologyPage.useEffect": ()=>{
                    split?.revert();
                    ctx.revert();
                }
            })["VRTechnologyPage.useEffect"];
        }
    }["VRTechnologyPage.useEffect"], []);
    // ── Award-winning buttery smooth scroll (Lenis, synced with ScrollTrigger) ──
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VRTechnologyPage.useEffect": ()=>{
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            let lenis = null;
            let pollId = null;
            let cancelled = false;
            const onTick = {
                "VRTechnologyPage.useEffect.onTick": (time)=>{
                    lenis?.raf(time * 1000);
                }
            }["VRTechnologyPage.useEffect.onTick"];
            const trySetup = {
                "VRTechnologyPage.useEffect.trySetup": ()=>{
                    if (cancelled) return;
                    const LenisCtor = window.Lenis;
                    if (!LenisCtor) {
                        pollId = setTimeout(trySetup, 80);
                        return;
                    }
                    lenis = new LenisCtor({
                        duration: 1.1,
                        smoothWheel: true,
                        easing: {
                            "VRTechnologyPage.useEffect.trySetup": (t)=>1 - Math.pow(1 - t, 3)
                        }["VRTechnologyPage.useEffect.trySetup"]
                    });
                    lenis.on('scroll', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].update);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].ticker.add(onTick);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].ticker.lagSmoothing(0);
                }
            }["VRTechnologyPage.useEffect.trySetup"];
            trySetup();
            return ({
                "VRTechnologyPage.useEffect": ()=>{
                    cancelled = true;
                    if (pollId) clearTimeout(pollId);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].ticker.remove(onTick);
                    lenis?.destroy();
                }
            })["VRTechnologyPage.useEffect"];
        }
    }["VRTechnologyPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: rootRef,
        className: "vrt-root",
        style: {
            paddingTop: '80px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "vrt-progress-bar"
            }, void 0, false, {
                fileName: "[project]/app/vrtech/page.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "vrt-bg-grid"
            }, void 0, false, {
                fileName: "[project]/app/vrtech/page.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "vrt-bg-orb vrt-bg-orb-1"
            }, void 0, false, {
                fileName: "[project]/app/vrtech/page.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "vrt-bg-orb vrt-bg-orb-2"
            }, void 0, false, {
                fileName: "[project]/app/vrtech/page.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "vrt-bg-orb vrt-bg-orb-3"
            }, void 0, false, {
                fileName: "[project]/app/vrtech/page.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "vrt-hero",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "vrt-hero-canvas-wrap",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                            ref: heroCanvasRef
                        }, void 0, false, {
                            fileName: "[project]/app/vrtech/page.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "vrt-hero-ring"
                    }, void 0, false, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "vrt-hero-corner tl"
                    }, void 0, false, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "vrt-hero-corner tr"
                    }, void 0, false, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "vrt-hero-corner bl"
                    }, void 0, false, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "vrt-hero-corner br"
                    }, void 0, false, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "vrt-hero-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "vrt-eyebrow",
                                children: info.eyebrow
                            }, void 0, false, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "vrt-title",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: info.titleLine1
                                    }, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "line2",
                                        children: info.titleLine2
                                    }, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 203,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "vrt-sub",
                                children: info.sub
                            }, void 0, false, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "vrt-scroll",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "s-line"
                                    }, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 207,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "EXPLORAR"
                                    }, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 208,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/vrtech/page.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "vrt-grad-line"
            }, void 0, false, {
                fileName: "[project]/app/vrtech/page.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "vrt-mq",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "vrt-mq-track",
                    children: [
                        ...Array(2)
                    ].map((_, dup)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'inline-flex'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "vrt-mq-item",
                                    children: [
                                        "TRACKING 6DoF ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/vrtech/page.tsx",
                                            lineNumber: 220,
                                            columnNumber: 59
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/vrtech/page.tsx",
                                    lineNumber: 220,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "vrt-mq-item",
                                    children: [
                                        "RENDERIZADO ESTÉREO ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/vrtech/page.tsx",
                                            lineNumber: 221,
                                            columnNumber: 65
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/vrtech/page.tsx",
                                    lineNumber: 221,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "vrt-mq-item",
                                    children: [
                                        "MOTION-TO-PHOTON ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/vrtech/page.tsx",
                                            lineNumber: 222,
                                            columnNumber: 62
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/vrtech/page.tsx",
                                    lineNumber: 222,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "vrt-mq-item",
                                    children: [
                                        "HAND TRACKING ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/vrtech/page.tsx",
                                            lineNumber: 223,
                                            columnNumber: 59
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/vrtech/page.tsx",
                                    lineNumber: 223,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "vrt-mq-item",
                                    children: [
                                        "OPENXR ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/vrtech/page.tsx",
                                            lineNumber: 224,
                                            columnNumber: 52
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/vrtech/page.tsx",
                                    lineNumber: 224,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "vrt-mq-item",
                                    children: [
                                        "FOVEATED RENDERING ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/vrtech/page.tsx",
                                            lineNumber: 225,
                                            columnNumber: 64
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/vrtech/page.tsx",
                                    lineNumber: 225,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "vrt-mq-item",
                                    children: [
                                        "HRTF AUDIO ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/vrtech/page.tsx",
                                            lineNumber: 226,
                                            columnNumber: 56
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/vrtech/page.tsx",
                                    lineNumber: 226,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, dup, true, {
                            fileName: "[project]/app/vrtech/page.tsx",
                            lineNumber: 219,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/vrtech/page.tsx",
                    lineNumber: 217,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/vrtech/page.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-28 px-6",
                id: "como-funciona",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "vrt-sec-head vrt-reveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "vrt-sec-tag",
                                children: "PIPELINE_TÉCNICO"
                            }, void 0, false, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "vrt-sec-title",
                                children: [
                                    "¿CÓMO FUNCIONA",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 237,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "grad",
                                        children: "LA REALIDAD VIRTUAL?"
                                    }, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 237,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-5 text-white/55 text-sm leading-relaxed max-w-xl mx-auto",
                                children: "Desde que mueves la cabeza hasta que tu cerebro percibe un mundo distinto, un headset ejecuta seis procesos encadenados, decenas de veces por segundo."
                            }, void 0, false, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "vrt-stagger max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5",
                        children: pipeline.map((stage)=>{
                            const isActive = state.activeStage === stage.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `vrt-stagger-item vrt-stage p-6 ${isActive ? 'active' : ''}`,
                                onClick: ()=>toggleStage(stage.id),
                                onMouseMove: tiltMove,
                                onMouseLeave: tiltReset,
                                style: {
                                    '--stage-color': stage.color
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "vrt-stage-watermark",
                                        children: stage.step
                                    }, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 257,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "vrt-stage-num",
                                                        style: {
                                                            color: stage.color
                                                        },
                                                        children: stage.step
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/vrtech/page.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "mt-2 font-bold tracking-tight text-lg",
                                                        style: {
                                                            fontFamily: "'Bebas Neue', sans-serif",
                                                            letterSpacing: '.02em'
                                                        },
                                                        children: stage.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/vrtech/page.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/vrtech/page.tsx",
                                                lineNumber: 259,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mono text-xs opacity-40",
                                                children: isActive ? '−' : '+'
                                            }, void 0, false, {
                                                fileName: "[project]/app/vrtech/page.tsx",
                                                lineNumber: 265,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 258,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm text-white/60 leading-relaxed",
                                        children: stage.short
                                    }, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 267,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "vrt-stage-detail",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-white/70 leading-relaxed",
                                                children: stage.detail
                                            }, void 0, false, {
                                                fileName: "[project]/app/vrtech/page.tsx",
                                                lineNumber: 270,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "mt-4 space-y-2",
                                                children: stage.bullets.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "text-xs text-white/50 flex gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: stage.color
                                                                },
                                                                children: "▸"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/vrtech/page.tsx",
                                                                lineNumber: 274,
                                                                columnNumber: 25
                                                            }, this),
                                                            b
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/app/vrtech/page.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/vrtech/page.tsx",
                                                lineNumber: 271,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 269,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, stage.id, true, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 249,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/vrtech/page.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "vrt-grad-line"
            }, void 0, false, {
                fileName: "[project]/app/vrtech/page.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-28 px-6",
                id: "anatomia",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "vrt-sec-head vrt-reveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "vrt-sec-tag",
                                style: {
                                    color: 'var(--yellow)'
                                },
                                children: "ANATOMÍA_DE_HARDWARE"
                            }, void 0, false, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 290,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "vrt-sec-title",
                                children: [
                                    "POR DENTRO",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "grad",
                                        children: "DE UN HEADSET"
                                    }, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 291,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-5 text-white/55 text-sm leading-relaxed max-w-xl mx-auto",
                                children: "Seis componentes físicos trabajan en conjunto para sostener toda la experiencia inmersiva."
                            }, void 0, false, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 294,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "vrt-stagger max-w-3xl mx-auto space-y-4",
                        children: anatomy.map((part)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "vrt-stagger-item vrt-anatomy-item pl-5 py-2 flex items-start gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "vrt-anatomy-icon",
                                        style: {
                                            color: 'var(--yellow)'
                                        },
                                        children: part.icon
                                    }, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold text-sm tracking-wide mono",
                                                children: part.label
                                            }, void 0, false, {
                                                fileName: "[project]/app/vrtech/page.tsx",
                                                lineNumber: 304,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-white/55 mt-1",
                                                children: part.desc
                                            }, void 0, false, {
                                                fileName: "[project]/app/vrtech/page.tsx",
                                                lineNumber: 305,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, part.id, true, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/vrtech/page.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "vrt-grad-line"
            }, void 0, false, {
                fileName: "[project]/app/vrtech/page.tsx",
                lineNumber: 312,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-28 px-6",
                id: "headsets-unity",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "vrt-sec-head vrt-reveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "vrt-sec-tag",
                                style: {
                                    color: 'var(--pink)'
                                },
                                children: "UNITY_XR_ECOSYSTEM"
                            }, void 0, false, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "vrt-sec-title",
                                children: [
                                    "HEADSETS QUE",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 319,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "grad",
                                        children: "SOPORTA UNITY"
                                    }, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 319,
                                        columnNumber: 31
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 318,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-5 text-white/55 text-sm leading-relaxed max-w-xl mx-auto",
                                children: "Unity se conecta a cada dispositivo mediante XR Plug-in Management. La mayoría converge hoy en el estándar abierto OpenXR, aunque algunos fabricantes mantienen SDKs propios para funciones avanzadas."
                            }, void 0, false, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 321,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "vrt-stagger max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
                        children: headsets.map((h)=>{
                            const isActive = state.activeHeadset === h.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `vrt-stagger-item vrt-headset p-5 cursor-pointer ${isActive ? 'active' : ''}`,
                                onClick: ()=>toggleHeadset(h.id),
                                onMouseMove: tiltMove,
                                onMouseLeave: tiltReset,
                                style: {
                                    '--hs-color': h.color
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mono text-[10px] tracking-widest text-white/40",
                                                children: h.maker.toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/app/vrtech/page.tsx",
                                                lineNumber: 341,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "vrt-badge",
                                                style: {
                                                    color: h.color
                                                },
                                                children: h.type
                                            }, void 0, false, {
                                                fileName: "[project]/app/vrtech/page.tsx",
                                                lineNumber: 342,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 340,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mt-2 text-lg font-bold",
                                        style: {
                                            fontFamily: "'Bebas Neue', sans-serif"
                                        },
                                        children: h.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 344,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 flex flex-wrap gap-1.5",
                                        children: h.unityPath.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mono text-[9px] px-2 py-1 rounded-full border border-white/10 text-white/50",
                                                children: p
                                            }, p, false, {
                                                fileName: "[project]/app/vrtech/page.tsx",
                                                lineNumber: 349,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 347,
                                        columnNumber: 17
                                    }, this),
                                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 text-xs text-white/55 leading-relaxed",
                                        children: h.notes
                                    }, void 0, false, {
                                        fileName: "[project]/app/vrtech/page.tsx",
                                        lineNumber: 355,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, h.id, true, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 332,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 328,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/vrtech/page.tsx",
                lineNumber: 315,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "vrt-grad-line"
            }, void 0, false, {
                fileName: "[project]/app/vrtech/page.tsx",
                lineNumber: 363,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-28 px-6 text-center vrt-reveal vrt-cta-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mono text-xs tracking-widest text-white/40 mb-4",
                        children: "SIGUIENTE_PASO"
                    }, void 0, false, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 367,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "vrt-sec-title mb-8",
                        children: [
                            "VE ESTA TECNOLOGÍA",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 369,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "grad",
                                children: "EN ACCIÓN"
                            }, void 0, false, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 369,
                                columnNumber: 35
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 368,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: goToModulos,
                                className: "vrt-cta px-7 py-3 rounded-full text-sm mono",
                                onMouseMove: (e)=>magneticMove(e, 0.3),
                                onMouseLeave: magneticReset,
                                children: "VER MÓDULOS ATHERNIX →"
                            }, void 0, false, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 372,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: goToChat,
                                className: "px-7 py-3 rounded-full text-sm mono border border-white/15 text-white/70 hover:border-white/35 transition-colors",
                                onMouseMove: (e)=>magneticMove(e, 0.3),
                                onMouseLeave: magneticReset,
                                children: "PREGUNTAR A ATHER"
                            }, void 0, false, {
                                fileName: "[project]/app/vrtech/page.tsx",
                                lineNumber: 380,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/vrtech/page.tsx",
                        lineNumber: 371,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/vrtech/page.tsx",
                lineNumber: 366,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/vrtech/page.tsx",
        lineNumber: 183,
        columnNumber: 5
    }, this);
}
_s(VRTechnologyPage, "QPqMHI0vF4vBYx9+VqWMg42C7gY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$information$2f$Vrtech$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVRTechnologyController"]
    ];
});
_c = VRTechnologyPage;
var _c;
__turbopack_context__.k.register(_c, "VRTechnologyPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0eczc1t._.js.map