(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/models/headset.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ATHERNIX_MODULES",
    ()=>ATHERNIX_MODULES,
    "HEADSET_META",
    ()=>HEADSET_META,
    "TIER_LABEL",
    ()=>TIER_LABEL,
    "TYPE_LABEL",
    ()=>TYPE_LABEL,
    "fetchMyHeadset",
    ()=>fetchMyHeadset,
    "getHeadsetMeta",
    ()=>getHeadsetMeta,
    "initialMyHeadsetState",
    ()=>initialMyHeadsetState,
    "updateMyHeadset",
    ()=>updateMyHeadset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// models/useHeadsets.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
let supabaseClient = null;
function getSupabase() {
    if (!supabaseClient) {
        supabaseClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://tucsuclhwanifjexmztr.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Y3N1Y2xod2FuaWZqZXhtenRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTM5NjQsImV4cCI6MjA4ODAyOTk2NH0.QEpeZ5xLs1R3sdllblWqxbk8sAz69u8QqBU3LJR2aD0"));
    }
    return supabaseClient;
}
const HEADSET_META = {
    'meta-quest-2': {
        label: 'Meta Quest 2',
        brand: 'Meta',
        type: 'standalone',
        sdk: 'Meta OpenXR SDK',
        color: '#1877f2',
        icon: '🥽',
        tier: 'ENTRY',
        imageUrl: '/media/MetaQuest2.jpg',
        controllers: 'Touch Controllers',
        resolution: '1832 x 1920 por ojo',
        refreshRate: '72/90/120 Hz',
        fov: '~100°',
        tracking: '6DOF Inside-Out',
        displayTech: 'LCD Fast-Switch',
        releaseYear: '2020',
        features: [
            'Hand Tracking',
            'Passthrough',
            'Guardian System',
            'Oculus Link'
        ]
    },
    'meta-quest-3': {
        label: 'Meta Quest 3',
        brand: 'Meta',
        type: 'standalone',
        sdk: 'Meta OpenXR SDK',
        color: '#1877f2',
        icon: '🥽',
        tier: 'MID',
        imageUrl: '/media/MetaQuest3.webp',
        controllers: 'Touch Plus Controllers',
        resolution: '2064 x 2208 por ojo',
        refreshRate: '90/120 Hz',
        fov: '~110°',
        tracking: '6DOF Inside-Out + Eye/Face',
        displayTech: 'LCD Pancake',
        releaseYear: '2023',
        features: [
            'Full Color Passthrough',
            'MR Experiences',
            'Hand Tracking 2.0',
            'Direct Touch'
        ]
    },
    'meta-quest-3s': {
        label: 'Meta Quest 3S',
        brand: 'Meta',
        type: 'standalone',
        sdk: 'Meta OpenXR SDK',
        color: '#1877f2',
        icon: '🥽',
        tier: 'ENTRY',
        imageUrl: '/media/MetaQuest3S.jpe',
        controllers: 'Touch Plus Controllers',
        resolution: '1832 x 1920 por ojo',
        refreshRate: '90/120 Hz',
        fov: '~100°',
        tracking: '6DOF Inside-Out',
        displayTech: 'LCD Fast-Switch',
        releaseYear: '2024',
        features: [
            'Color Passthrough',
            'Guardian System',
            'Hand Tracking',
            'Mixed Reality'
        ]
    },
    'meta-quest-pro': {
        label: 'Meta Quest Pro',
        brand: 'Meta',
        type: 'standalone',
        sdk: 'Meta OpenXR SDK',
        color: '#1877f2',
        icon: '🥽',
        tier: 'PRO',
        imageUrl: '/media/MetaQuestPro.jpg',
        controllers: 'Touch Pro Controllers',
        resolution: '1800 x 1920 por ojo',
        refreshRate: '90/120 Hz',
        fov: '~106°',
        tracking: '6DOF Inside-Out + Eye/Face/Body',
        displayTech: 'Mini-LED LCD Pancake',
        releaseYear: '2022',
        features: [
            'Full Color Passthrough',
            'Eye Tracking',
            'Face Tracking',
            'Mixed Reality',
            'Infinite Display'
        ]
    },
    'apple-vision-pro': {
        label: 'Apple Vision Pro',
        brand: 'Apple',
        type: 'standalone',
        sdk: 'Unity PolySpatial',
        color: '#dfe3e8',
        icon: '🍎',
        tier: 'ELITE',
        imageUrl: '/media/AppleVisionPro.jpg',
        controllers: 'Gaze + Pinch + Voice',
        resolution: '23 millones de pixeles',
        refreshRate: '90/120 Hz',
        fov: '~120°',
        tracking: '6DOF Inside-Out + Eye/Hand',
        displayTech: 'Micro-OLED',
        releaseYear: '2024',
        features: [
            'EyeSight',
            'Spatial Video',
            'Environments',
            'Hand Tracking',
            'Gaze Interaction'
        ]
    },
    'playstation-vr2': {
        label: 'PlayStation VR2',
        brand: 'Sony',
        type: 'console',
        sdk: 'PSVR2 OpenXR Plugin',
        color: '#2c6fd1',
        icon: '🎮',
        tier: 'PRO',
        imageUrl: '/media/PSVR2.jpe',
        controllers: 'Sense Controllers',
        resolution: '2000 x 2040 por ojo',
        refreshRate: '90/120 Hz',
        fov: '~110°',
        tracking: '6DOF Inside-Out + Eye',
        displayTech: 'OLED',
        releaseYear: '2023',
        features: [
            'Haptic Feedback',
            'Adaptive Triggers',
            'Eye Tracking',
            'Tempest 3D Audio',
            'HDR'
        ]
    },
    'valve-index': {
        label: 'Valve Index',
        brand: 'Valve',
        type: 'pcvr',
        sdk: 'OpenVR XR Plugin',
        color: '#9aa0a8',
        icon: '🖥️',
        tier: 'PRO',
        imageUrl: '/media/Valve.jpe',
        controllers: 'Index Controllers',
        resolution: '1440 x 1600 por ojo',
        refreshRate: '80/120/144 Hz',
        fov: '~130°',
        tracking: '6DOF Outside-In',
        displayTech: 'LCD RGB',
        releaseYear: '2019',
        features: [
            'Off-Ear Audio',
            'Finger Tracking',
            'Knuckle Controllers',
            'SteamVR Tracking 2.0'
        ]
    },
    'htc-vive-xr-elite': {
        label: 'VIVE XR Elite',
        brand: 'HTC',
        type: 'standalone',
        sdk: 'VIVE OpenXR SDK',
        color: '#e0435a',
        icon: '🥽',
        tier: 'MID',
        imageUrl: '/media/ViveXR.jpe',
        controllers: 'XR Elite Controllers',
        resolution: '1920 x 1920 por ojo',
        refreshRate: '90 Hz',
        fov: '~100°',
        tracking: '6DOF Inside-Out + Color Passthrough',
        displayTech: 'LCD',
        releaseYear: '2023',
        features: [
            'Color Passthrough',
            'Hand Tracking',
            'Compact Design',
            'SteamVR Support'
        ]
    },
    'htc-vive-focus-vision': {
        label: 'VIVE Focus Vision',
        brand: 'HTC',
        type: 'standalone',
        sdk: 'VIVE OpenXR SDK',
        color: '#e0435a',
        icon: '🥽',
        tier: 'PRO',
        imageUrl: '/media/ViveXR.jpe',
        controllers: 'Focus 3 Controllers',
        resolution: '2448 x 2448 por ojo',
        refreshRate: '90/120 Hz',
        fov: '~120°',
        tracking: '6DOF Inside-Out + Eye',
        displayTech: 'LCD',
        releaseYear: '2024',
        features: [
            'Auto-IPD',
            'Eye Tracking',
            'MR Passthrough',
            'Wireless Streaming'
        ]
    },
    'htc-vive-pro-2': {
        label: 'VIVE Pro 2',
        brand: 'HTC',
        type: 'pcvr',
        sdk: 'VIVE OpenXR SDK',
        color: '#e0435a',
        icon: '🖥️',
        tier: 'ELITE',
        imageUrl: '/media/ViveXR.jpe',
        controllers: 'VIVE Controllers',
        resolution: '2448 x 2448 por ojo',
        refreshRate: '90/120 Hz',
        fov: '~120°',
        tracking: '6DOF Outside-In/Inside-Out',
        displayTech: 'LCD',
        releaseYear: '2021',
        features: [
            'SteamVR Tracking 2.0',
            'Eye Tracking',
            'High Resolution',
            'Dual Mode Tracking'
        ]
    },
    'pico-4': {
        label: 'Pico 4',
        brand: 'ByteDance',
        type: 'standalone',
        sdk: 'Pico OpenXR SDK',
        color: '#2dd4bf',
        icon: '🥽',
        tier: 'MID',
        imageUrl: '/media/MetaQuest3.webp',
        controllers: 'Pico 4 Controllers',
        resolution: '2160 x 2160 por ojo',
        refreshRate: '72/90/120 Hz',
        fov: '~105°',
        tracking: '6DOF Inside-Out',
        displayTech: 'LCD Pancake',
        releaseYear: '2022',
        features: [
            'Color Passthrough',
            'Hand Tracking',
            '6DoF Controllerless',
            'Pico Motion'
        ]
    },
    'pico-4-ultra': {
        label: 'Pico 4 Ultra',
        brand: 'ByteDance',
        type: 'standalone',
        sdk: 'Pico OpenXR SDK',
        color: '#2dd4bf',
        icon: '🥽',
        tier: 'PRO',
        imageUrl: '/media/MetaQuest3.webp',
        controllers: 'Pico 4 Controllers',
        resolution: '2160 x 2160 por ojo',
        refreshRate: '90/120 Hz',
        fov: '~105°',
        tracking: '6DOF Inside-Out + Eye',
        displayTech: 'LCD Pancake',
        releaseYear: '2024',
        features: [
            'Eye Tracking',
            'MR Passthrough',
            'Hand Tracking',
            'Wireless Streaming'
        ]
    },
    'samsung-galaxy-xr': {
        label: 'Samsung Galaxy XR',
        brand: 'Samsung',
        type: 'standalone',
        sdk: 'Android XR OpenXR',
        color: '#4d7cff',
        icon: '🥽',
        tier: 'PRO',
        imageUrl: '/media/MetaQuest3.webp',
        controllers: 'Hand Tracking + Samsung Controllers',
        resolution: '~3000 PPD',
        refreshRate: '90/120 Hz',
        fov: '~110°',
        tracking: '6DOF Inside-Out + Eye/Hand',
        displayTech: 'OLED Microdisplay',
        releaseYear: '2025',
        features: [
            'Samsung XR OS',
            'Galaxy Ecosystem',
            '5G Connectivity',
            'Spatial Audio'
        ]
    },
    'hp-reverb-g2': {
        label: 'HP Reverb G2',
        brand: 'HP',
        type: 'pcvr',
        sdk: 'Windows MR OpenXR',
        color: '#38b6e8',
        icon: '🖥️',
        tier: 'MID',
        imageUrl: '/media/Valve.jpe',
        controllers: 'HP Reverb G2 Controllers',
        resolution: '2160 x 2160 por ojo',
        refreshRate: '90 Hz',
        fov: '~98°',
        tracking: '6DOF Inside-Out',
        displayTech: 'LCD',
        releaseYear: '2020',
        features: [
            'High Resolution',
            'Lightweight Design',
            'Windows Mixed Reality',
            'Flip-up Visor'
        ]
    },
    'none': {
        label: 'Sin asignar',
        brand: '—',
        type: 'standalone',
        sdk: '—',
        color: '#ff6b35',
        icon: '❓',
        tier: 'ENTRY',
        controllers: '—',
        resolution: '—',
        refreshRate: '—',
        fov: '—',
        tracking: '—',
        displayTech: '—',
        releaseYear: '—',
        features: []
    }
};
function getHeadsetMeta(id) {
    return HEADSET_META[id] ?? HEADSET_META['none'];
}
const TIER_LABEL = {
    ENTRY: 'ENTRADA',
    MID: 'INTERMEDIO',
    PRO: 'PROFESIONAL',
    ELITE: 'ÉLITE'
};
const TYPE_LABEL = {
    standalone: 'AUTÓNOMO',
    pcvr: 'CONECTADO A PC',
    console: 'CONSOLA'
};
const ATHERNIX_MODULES = [
    {
        id: 'historia',
        name: 'Historia Viva VR',
        color: '#FF006E',
        href: '/modulos/history',
        supports: [
            'standalone',
            'pcvr',
            'console'
        ],
        note: 'Corre en cualquier headset · acceso universal'
    },
    {
        id: 'svirtual',
        name: 'SVirtual Tours',
        color: '#FF6B00',
        href: '/modulos/tours',
        supports: [
            'standalone',
            'pcvr',
            'console'
        ],
        note: 'Streaming ligero de recorridos guiados por IA'
    },
    {
        id: 'mente',
        name: 'MenteLibre VR',
        color: '#FFD700',
        href: '/modulos/brain',
        supports: [
            'standalone',
            'pcvr'
        ],
        note: 'Requiere hápticos y biofeedback avanzado'
    }
];
const initialMyHeadsetState = {
    current: 'none',
    setAt: null,
    loading: false,
    saving: false
};
async function fetchMyHeadset() {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        model: 'none',
        setAt: null
    };
    const { data, error } = await supabase.from('profiles').select('vr_glasses, vr_glasses_set_at').eq('id', user.id).single();
    if (error || !data) return {
        model: 'none',
        setAt: null
    };
    return {
        model: data.vr_glasses ?? 'none',
        setAt: data.vr_glasses_set_at
    };
}
async function updateMyHeadset(model) {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        success: false,
        error: 'No autenticado'
    };
    // El usuario solo puede actualizar su propia fila — cubierto por la policy
    // "Solo el dueño edita su perfil" (auth.uid() = id) ya existente en profiles.
    const { data, error } = await supabase.from('profiles').update({
        vr_glasses: model,
        vr_glasses_set_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }).eq('id', user.id).select();
    if (error) return {
        success: false,
        error: error.message
    };
    if (!data || data.length === 0) return {
        success: false,
        error: 'No se pudo actualizar (0 filas afectadas)'
    };
    await supabase.from('activity_logs').insert({
        user_id: user.id,
        action: 'GLASSES_CHANGE',
        entity: 'user',
        entity_id: user.id,
        metadata: {
            new_glasses: model
        }
    });
    return {
        success: true
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/controllers/information/headset.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMyHeadsetsController",
    ()=>useMyHeadsetsController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/headset.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
// controllers/user/useheadsets.ts
'use client';
;
;
function useMyHeadsetsController() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$models$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialMyHeadsetState"]);
    const [hoveredId, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMyHeadsetsController.useCallback[load]": async ()=>{
            setState({
                "useMyHeadsetsController.useCallback[load]": (s)=>({
                        ...s,
                        loading: true
                    })
            }["useMyHeadsetsController.useCallback[load]"]);
            const { model, setAt } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchMyHeadset"])();
            setState({
                "useMyHeadsetsController.useCallback[load]": (s)=>({
                        ...s,
                        loading: false,
                        current: model,
                        setAt
                    })
            }["useMyHeadsetsController.useCallback[load]"]);
        }
    }["useMyHeadsetsController.useCallback[load]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMyHeadsetsController.useEffect": ()=>{
            load();
        }
    }["useMyHeadsetsController.useEffect"], [
        load
    ]);
    const selectHeadset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMyHeadsetsController.useCallback[selectHeadset]": async (model)=>{
            if (model === state.current) return;
            setState({
                "useMyHeadsetsController.useCallback[selectHeadset]": (s)=>({
                        ...s,
                        saving: true
                    })
            }["useMyHeadsetsController.useCallback[selectHeadset]"]);
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMyHeadset"])(model);
            if (result.success) {
                setState({
                    "useMyHeadsetsController.useCallback[selectHeadset]": (s)=>({
                            ...s,
                            saving: false,
                            current: model,
                            setAt: new Date().toISOString()
                        })
                }["useMyHeadsetsController.useCallback[selectHeadset]"]);
                setToast({
                    text: `Headset actualizado a ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHeadsetMeta"])(model).label}`,
                    ok: true
                });
            } else {
                setState({
                    "useMyHeadsetsController.useCallback[selectHeadset]": (s)=>({
                            ...s,
                            saving: false
                        })
                }["useMyHeadsetsController.useCallback[selectHeadset]"]);
                setToast({
                    text: result.error ?? 'No se pudo actualizar tu headset',
                    ok: false
                });
            }
            setTimeout({
                "useMyHeadsetsController.useCallback[selectHeadset]": ()=>setToast(null)
            }["useMyHeadsetsController.useCallback[selectHeadset]"], 3200);
        }
    }["useMyHeadsetsController.useCallback[selectHeadset]"], [
        state.current
    ]);
    const currentMeta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHeadsetMeta"])(state.current);
    const models = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$models$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HEADSET_META"]).filter((id)=>id !== 'none');
    const compatibility = __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ATHERNIX_MODULES"].map((m)=>({
            ...m,
            compatible: state.current !== 'none' && m.supports.includes(currentMeta.type)
        }));
    return {
        state,
        hoveredId,
        setHovered,
        toast,
        currentMeta,
        models,
        compatibility,
        selectHeadset,
        reload: load
    };
}
_s(useMyHeadsetsController, "5aLnZtkuK3e20UozW6yakQTpo7Q=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/headsets/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyHeadsetsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/SplitText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$information$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/controllers/information/headset.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/headset.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
// view/MyHeadsetsView.tsx
'use client';
;
;
;
;
;
;
;
;
if ("TURBOPACK compile-time truthy", 1) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SplitText"]);
}
function tiltMove(e, lift = -4, max = 10) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        y: lift,
        rotationY: px * max,
        rotationX: -py * max,
        transformPerspective: 800,
        duration: 0.28,
        ease: 'power2.out'
    });
}
function tiltReset(e) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
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
        duration: 0.45,
        ease: 'elastic.out(1,0.4)'
    });
}
// ── Design tokens (estética módulos) ────────────────────────
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif";
const F_MONO = "'Plus Jakarta Sans', monospace";
// ── Icons ────────────────────────────────────────────────────────
const IconBack = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        className: "w-5 h-5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M15.75 19.5 8.25 12l7.5-7.5"
        }, void 0, false, {
            fileName: "[project]/app/headsets/page.tsx",
            lineNumber: 42,
            columnNumber: 121
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/headsets/page.tsx",
        lineNumber: 42,
        columnNumber: 26
    }, ("TURBOPACK compile-time value", void 0));
_c = IconBack;
const IconCheck = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2.5,
        className: "w-4 h-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "m4.5 12.75 6 6 9-13.5"
        }, void 0, false, {
            fileName: "[project]/app/headsets/page.tsx",
            lineNumber: 43,
            columnNumber: 123
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/headsets/page.tsx",
        lineNumber: 43,
        columnNumber: 26
    }, ("TURBOPACK compile-time value", void 0));
_c1 = IconCheck;
const IconX = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2.5,
        className: "w-4 h-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M6 18 18 6M6 6l12 12"
        }, void 0, false, {
            fileName: "[project]/app/headsets/page.tsx",
            lineNumber: 44,
            columnNumber: 123
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/headsets/page.tsx",
        lineNumber: 44,
        columnNumber: 26
    }, ("TURBOPACK compile-time value", void 0));
_c2 = IconX;
const IconArrowR = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        className: "w-4 h-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "m8.25 4.5 7.5 7.5-7.5 7.5"
        }, void 0, false, {
            fileName: "[project]/app/headsets/page.tsx",
            lineNumber: 45,
            columnNumber: 121
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/headsets/page.tsx",
        lineNumber: 45,
        columnNumber: 26
    }, ("TURBOPACK compile-time value", void 0));
_c3 = IconArrowR;
function createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.25, 'rgba(255,255,255,0.5)');
    grad.addColorStop(0.6, 'rgba(255,255,255,0.1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
}
// ── 3D Cosmic core background ──────────────────────────────────
function NeuralField3D() {
    _s();
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NeuralField3D.useEffect": ()=>{
            const container = mountRef.current;
            if (!container) return;
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
            scene.fog = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FogExp2"](0x050208, 0.018);
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](55, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.set(0, 0, 34);
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                alpha: true,
                antialias: true
            });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(renderer.domElement);
            const glowTex = createGlowTexture();
            // Starfield
            const starCount = 1000;
            const sPos = new Float32Array(starCount * 3);
            const sCol = new Float32Array(starCount * 3);
            const palette = [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#FF6B00'),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#FF006E'),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#FFD700'),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#9D4EDD'),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#ffffff')
            ];
            for(let i = 0; i < starCount; i++){
                const r = 55 + Math.random() * 55;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                sPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                sPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                sPos[i * 3 + 2] = r * Math.cos(phi);
                const col = palette[Math.floor(Math.random() * palette.length)];
                sCol[i * 3] = col.r;
                sCol[i * 3 + 1] = col.g;
                sCol[i * 3 + 2] = col.b;
            }
            const sGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            sGeo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](sPos, 3));
            sGeo.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](sCol, 3));
            const sMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointsMaterial"]({
                size: 0.6,
                map: glowTex,
                transparent: true,
                vertexColors: true,
                opacity: 0.85,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                depthWrite: false,
                sizeAttenuation: true
            });
            const stars = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](sGeo, sMat);
            scene.add(stars);
            // Central core
            const coreGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](4.5, 64, 64);
            const coreMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0xff6b35,
                transparent: true,
                opacity: 0.5,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                depthWrite: false
            });
            const core = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](coreGeo, coreMat);
            scene.add(core);
            const innerCoreGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](2.2, 64, 64);
            const innerCoreMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0xffd700,
                transparent: true,
                opacity: 0.7,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                depthWrite: false
            });
            const innerCore = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](innerCoreGeo, innerCoreMat);
            scene.add(innerCore);
            // Glowing rings
            const ringGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            const ringData = [
                {
                    r: 12,
                    tube: 0.12,
                    color: 0xff6b35,
                    opacity: 0.28
                },
                {
                    r: 18,
                    tube: 0.08,
                    color: 0xff006e,
                    opacity: 0.22
                },
                {
                    r: 25,
                    tube: 0.05,
                    color: 0xffd700,
                    opacity: 0.18
                },
                {
                    r: 8,
                    tube: 0.15,
                    color: 0x9d4edd,
                    opacity: 0.25
                }
            ];
            ringData.forEach({
                "NeuralField3D.useEffect": (d)=>{
                    const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](d.r, d.tube, 32, 120);
                    const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                        color: d.color,
                        transparent: true,
                        opacity: d.opacity,
                        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                        depthWrite: false,
                        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
                    });
                    const ring = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geo, mat);
                    ring.rotation.x = Math.random() * Math.PI;
                    ring.rotation.y = Math.random() * Math.PI;
                    ringGroup.add(ring);
                }
            }["NeuralField3D.useEffect"]);
            scene.add(ringGroup);
            // Floating orbs
            const orbs = [];
            const orbColors = [
                0xff6b35,
                0xff006e,
                0xffd700,
                0x9d4edd
            ];
            for(let i = 0; i < 6; i++){
                const size = Math.random() * 0.8 + 0.3;
                const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](size, 32, 32);
                const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                    color: orbColors[i % orbColors.length],
                    transparent: true,
                    opacity: 0.55,
                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                    depthWrite: false
                });
                const orb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geo, mat);
                const a = Math.random() * Math.PI * 2;
                const r = 15 + Math.random() * 20;
                orb.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 12, Math.sin(a) * r);
                orbs.push(orb);
                scene.add(orb);
            }
            let mx = 0, my = 0, scrollY = 0, smoothScroll = 0;
            let smoothMx = 0, smoothMy = 0;
            const onMove = {
                "NeuralField3D.useEffect.onMove": (e)=>{
                    mx = (e.clientX / window.innerWidth - 0.5) * 2;
                    my = -(e.clientY / window.innerHeight - 0.5) * 2;
                }
            }["NeuralField3D.useEffect.onMove"];
            const onScroll = {
                "NeuralField3D.useEffect.onScroll": ()=>{
                    const y = window.scrollY || window.pageYOffset;
                    scrollY = y;
                }
            }["NeuralField3D.useEffect.onScroll"];
            window.addEventListener('mousemove', onMove);
            window.addEventListener('scroll', onScroll, {
                passive: true
            });
            let raf = 0;
            const clock = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Clock"]();
            const animate = {
                "NeuralField3D.useEffect.animate": ()=>{
                    raf = requestAnimationFrame(animate);
                    const t = clock.getElapsedTime();
                    const k = prefersReduced ? 0.2 : 1;
                    smoothMx += (mx - smoothMx) * 0.04;
                    smoothMy += (my - smoothMy) * 0.04;
                    smoothScroll += (scrollY - smoothScroll) * 0.06;
                    stars.rotation.y = t * 0.08 * k;
                    stars.rotation.x = smoothMy * 0.08;
                    const pulse = 1 + Math.sin(t * 0.8 * k) * 0.1;
                    core.scale.setScalar(pulse);
                    innerCore.scale.setScalar(1 + Math.sin(t * 1.2 * k + 1) * 0.08);
                    ringGroup.rotation.x = t * 0.12 * k + smoothMy * 0.25;
                    ringGroup.rotation.y = t * 0.18 * k + smoothMx * 0.25;
                    ringGroup.rotation.z = smoothScroll * 0.0005;
                    orbs.forEach({
                        "NeuralField3D.useEffect.animate": (orb, i)=>{
                            const a = t * 0.4 * k + i * 1.05;
                            const r = 15 + i * 2.5;
                            orb.position.x = Math.cos(a) * r;
                            orb.position.z = Math.sin(a) * r;
                            orb.position.y = Math.sin(t * 0.6 * k + i) * 4;
                        }
                    }["NeuralField3D.useEffect.animate"]);
                    const targetX = smoothMx * 20;
                    const targetY = smoothMy * 15;
                    const targetZ = Math.max(8, 40 - smoothScroll * 0.15);
                    camera.position.x += (targetX - camera.position.x) * 0.04;
                    camera.position.y += (targetY - camera.position.y) * 0.04;
                    camera.position.z += (targetZ - camera.position.z) * 0.05;
                    camera.lookAt(0, smoothScroll * 0.01, 0);
                    renderer.render(scene, camera);
                }
            }["NeuralField3D.useEffect.animate"];
            animate();
            const onResize = {
                "NeuralField3D.useEffect.onResize": ()=>{
                    camera.aspect = container.clientWidth / container.clientHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(container.clientWidth, container.clientHeight);
                }
            }["NeuralField3D.useEffect.onResize"];
            window.addEventListener('resize', onResize);
            return ({
                "NeuralField3D.useEffect": ()=>{
                    window.removeEventListener('resize', onResize);
                    window.removeEventListener('scroll', onScroll);
                    window.removeEventListener('mousemove', onMove);
                    cancelAnimationFrame(raf);
                    if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
                    glowTex.dispose();
                    renderer.dispose();
                    sGeo.dispose();
                    sMat.dispose();
                    coreGeo.dispose();
                    coreMat.dispose();
                    innerCoreGeo.dispose();
                    innerCoreMat.dispose();
                    ringGroup.children.forEach({
                        "NeuralField3D.useEffect": (child)=>{
                            const mesh = child;
                            mesh.geometry.dispose();
                            mesh.material.dispose();
                        }
                    }["NeuralField3D.useEffect"]);
                    orbs.forEach({
                        "NeuralField3D.useEffect": (orb)=>{
                            orb.geometry.dispose();
                            orb.material.dispose();
                        }
                    }["NeuralField3D.useEffect"]);
                }
            })["NeuralField3D.useEffect"];
        }
    }["NeuralField3D.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none",
        style: {
            position: 'fixed',
            inset: 0,
            zIndex: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mountRef,
                style: {
                    width: '100%',
                    height: '100%'
                }
            }, void 0, false, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(5,0,8,0.35) 55%, rgba(5,0,8,0.92) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 252,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/headsets/page.tsx",
        lineNumber: 250,
        columnNumber: 5
    }, this);
}
_s(NeuralField3D, "V9/qkEdV8GfsDZk7lMTA1T8g5Ps=");
_c4 = NeuralField3D;
// ── Section header helper ───────────────────────────────────────
function SectionHeader({ icon, title, right }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "section-hdr flex items-center gap-3 mb-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: 'var(--orange)',
                    fontSize: '1rem'
                },
                children: icon
            }, void 0, false, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 261,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "font-black tracking-widest uppercase",
                style: {
                    fontFamily: F_BE,
                    color: '#ede0d4',
                    fontSize: '0.8rem',
                    letterSpacing: '0.2em'
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 h-px",
                style: {
                    background: 'rgba(255,107,53,0.15)'
                }
            }, void 0, false, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 265,
                columnNumber: 7
            }, this),
            right
        ]
    }, void 0, true, {
        fileName: "[project]/app/headsets/page.tsx",
        lineNumber: 260,
        columnNumber: 5
    }, this);
}
_c5 = SectionHeader;
// ── Hero: headset actual ─────────────────────────────────────────
function CurrentHeadsetHero({ model, setAt }) {
    const meta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHeadsetMeta"])(model);
    const isSet = model !== 'none';
    const dateLabel = setAt ? new Intl.DateTimeFormat('es-SV', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(new Date(setAt)) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "current-headset-hero relative rounded-3xl overflow-hidden",
        style: {
            background: isSet ? `linear-gradient(135deg, rgba(18,8,22,0.96) 0%, rgba(18,8,22,0.92) 100%)` : 'linear-gradient(135deg, rgba(18,8,22,0.9) 0%, rgba(18,8,22,0.85) 100%)',
            border: `2px solid ${isSet ? meta.color + '50' : 'rgba(255,107,53,0.25)'}`,
            boxShadow: isSet ? `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${meta.color}20` : '0 20px 60px rgba(0,0,0,0.5)',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
        },
        onMouseMove: (e)=>{
            tiltMove(e, -4, 6);
            e.currentTarget.style.borderColor = isSet ? meta.color + '90' : 'rgba(255,107,53,0.55)';
            e.currentTarget.style.boxShadow = `0 24px 80px rgba(0,0,0,0.8), 0 0 60px ${meta.color}30`;
        },
        onMouseLeave: (e)=>{
            tiltReset(e);
            e.currentTarget.style.borderColor = isSet ? meta.color + '50' : 'rgba(255,107,53,0.25)';
            e.currentTarget.style.boxShadow = isSet ? `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${meta.color}20` : '0 20px 60px rgba(0,0,0,0.5)';
        },
        children: [
            isSet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 right-0 w-96 h-96 pointer-events-none",
                style: {
                    background: `radial-gradient(circle,${meta.color}18 0%,transparent 70%)`,
                    filter: 'blur(60px)',
                    transform: 'translate(30%,-30%)'
                }
            }, void 0, false, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 295,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex flex-col lg:flex-row lg:items-center gap-8 p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full lg:w-1/3 h-64 lg:h-80 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0",
                        style: {
                            background: `linear-gradient(180deg, ${meta.color}12 0%, transparent 100%)`,
                            border: `1px solid ${isSet ? meta.color + '30' : 'rgba(255,107,53,0.2)'}`,
                            filter: isSet ? `drop-shadow(0 0 30px ${meta.color}30)` : 'none'
                        },
                        children: meta.imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: meta.imageUrl,
                            alt: meta.label,
                            className: "w-full h-full object-contain p-6"
                        }, void 0, false, {
                            fileName: "[project]/app/headsets/page.tsx",
                            lineNumber: 306,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-8xl",
                            children: meta.icon
                        }, void 0, false, {
                            fileName: "[project]/app/headsets/page.tsx",
                            lineNumber: 308,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/headsets/page.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs tracking-widest uppercase mb-2",
                                        style: {
                                            color: 'rgba(255,107,53,0.7)',
                                            fontFamily: F_MONO,
                                            letterSpacing: '0.24em',
                                            fontSize: '0.7rem'
                                        },
                                        children: isSet ? 'Tu headset registrado' : 'Aún no has registrado un headset'
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 315,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "font-black",
                                        style: {
                                            fontFamily: F_BE,
                                            color: '#ede0d4',
                                            fontSize: 'clamp(1.8rem,4vw,3rem)',
                                            letterSpacing: '0.02em'
                                        },
                                        children: meta.label
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 318,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this),
                            isSet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-3 py-1.5 rounded-full text-xs font-black tracking-widest",
                                        style: {
                                            background: `${meta.color}20`,
                                            border: `1px solid ${meta.color}50`,
                                            color: meta.color,
                                            fontFamily: F_MONO,
                                            fontSize: '0.65rem',
                                            letterSpacing: '0.16em'
                                        },
                                        children: meta.brand
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 325,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-3 py-1.5 rounded-full text-xs font-black tracking-widest",
                                        style: {
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,107,53,0.25)',
                                            color: 'rgba(200,150,120,0.8)',
                                            fontFamily: F_MONO,
                                            fontSize: '0.65rem',
                                            letterSpacing: '0.16em'
                                        },
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE_LABEL"][meta.type]
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 329,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-3 py-1.5 rounded-full text-xs font-black tracking-widest",
                                        style: {
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,107,53,0.25)',
                                            color: 'rgba(200,150,120,0.8)',
                                            fontFamily: F_MONO,
                                            fontSize: '0.65rem',
                                            letterSpacing: '0.16em'
                                        },
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_LABEL"][meta.tier]
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 333,
                                        columnNumber: 15
                                    }, this),
                                    dateLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        style: {
                                            color: 'rgba(200,150,120,0.5)',
                                            fontFamily: F_MONO,
                                            fontSize: '0.75rem'
                                        },
                                        children: [
                                            "Registrado el ",
                                            dateLabel
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 338,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 324,
                                columnNumber: 13
                            }, this),
                            !isSet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm",
                                style: {
                                    color: 'rgba(200,150,120,0.7)',
                                    fontFamily: F_MONO,
                                    fontSize: '0.9rem',
                                    lineHeight: 1.6
                                },
                                children: "Elige tu headset abajo para desbloquear las recomendaciones de compatibilidad de cada módulo."
                            }, void 0, false, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 346,
                                columnNumber: 13
                            }, this),
                            isSet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 pt-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-sm",
                                    style: {
                                        color: 'rgba(200,150,120,0.6)',
                                        fontFamily: F_MONO,
                                        fontSize: '0.8rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: meta.color
                                            },
                                            children: "●"
                                        }, void 0, false, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 355,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "SDK: ",
                                                meta.sdk
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 356,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/headsets/page.tsx",
                                    lineNumber: 353,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 352,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/headsets/page.tsx",
                        lineNumber: 313,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 299,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/headsets/page.tsx",
        lineNumber: 280,
        columnNumber: 5
    }, this);
}
_c6 = CurrentHeadsetHero;
// ── Tarjeta de compatibilidad por módulo ─────────────────────────
function ModuleCompatCard({ mod, hasHeadset }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: mod.href,
        className: "module-compat-card group relative flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300",
        style: {
            background: 'rgba(18,8,22,0.9)',
            borderColor: hasHeadset && mod.compatible ? mod.color + '45' : 'rgba(180,60,40,0.18)',
            opacity: hasHeadset && !mod.compatible ? 0.55 : 1,
            transformStyle: 'preserve-3d',
            willChange: 'transform'
        },
        onMouseMove: (e)=>{
            tiltMove(e, -3, 8);
            e.currentTarget.style.borderColor = hasHeadset && mod.compatible ? mod.color + '90' : 'rgba(255,107,53,0.55)';
            e.currentTarget.style.boxShadow = `0 14px 40px rgba(0,0,0,0.5), 0 0 30px ${mod.color}15`;
        },
        onMouseLeave: (e)=>{
            tiltReset(e);
            e.currentTarget.style.borderColor = hasHeadset && mod.compatible ? mod.color + '45' : 'rgba(180,60,40,0.18)';
            e.currentTarget.style.boxShadow = 'none';
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
                style: {
                    background: hasHeadset && mod.compatible ? `${mod.color}20` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${hasHeadset && mod.compatible ? mod.color + '50' : 'rgba(180,60,40,0.2)'}`,
                    color: hasHeadset && mod.compatible ? mod.color : 'rgba(200,150,120,0.4)'
                },
                children: hasHeadset ? mod.compatible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconCheck, {}, void 0, false, {
                    fileName: "[project]/app/headsets/page.tsx",
                    lineNumber: 388,
                    columnNumber: 41
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconX, {}, void 0, false, {
                    fileName: "[project]/app/headsets/page.tsx",
                    lineNumber: 388,
                    columnNumber: 56
                }, this) : '?'
            }, void 0, false, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 382,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-black text-sm truncate",
                        style: {
                            fontFamily: F_BE,
                            color: '#e8d5c8',
                            fontSize: '0.85rem',
                            letterSpacing: '0.03em'
                        },
                        children: mod.name
                    }, void 0, false, {
                        fileName: "[project]/app/headsets/page.tsx",
                        lineNumber: 391,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs mt-0.5",
                        style: {
                            color: 'rgba(200,150,120,0.55)',
                            fontFamily: F_MONO,
                            fontSize: '0.7rem'
                        },
                        children: !hasHeadset ? 'Registra un headset para ver compatibilidad' : mod.compatible ? mod.note : 'No recomendado con tu headset actual'
                    }, void 0, false, {
                        fileName: "[project]/app/headsets/page.tsx",
                        lineNumber: 394,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 390,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0",
                style: {
                    color: mod.color
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconArrowR, {}, void 0, false, {
                    fileName: "[project]/app/headsets/page.tsx",
                    lineNumber: 399,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 398,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/headsets/page.tsx",
        lineNumber: 372,
        columnNumber: 5
    }, this);
}
_c7 = ModuleCompatCard;
// ── Headset Showcase - Single element with selector ──────────────────────────
function HeadsetShowcase({ models, currentId, isActive, saving, onSelect }) {
    _s1();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(models[0]);
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HEADSET_META"][selectedId];
    // Update selected when current changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeadsetShowcase.useEffect": ()=>{
            if (isActive && currentId) {
                setSelectedId(currentId);
            }
        }
    }["HeadsetShowcase.useEffect"], [
        isActive,
        currentId
    ]);
    const handleSelect = (id)=>{
        setSelectedId(id);
        onSelect(id);
    };
    const isCurrentSelected = selectedId === currentId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "headset-showcase relative rounded-3xl overflow-hidden transition-all duration-500",
        style: {
            background: isCurrentSelected ? 'linear-gradient(180deg, rgba(18,8,22,0.98) 0%, rgba(18,8,22,0.95) 100%)' : 'linear-gradient(180deg, rgba(18,8,22,0.92) 0%, rgba(18,8,22,0.88) 100%)',
            border: `2px solid ${isCurrentSelected ? meta.color + '70' : 'rgba(255,107,53,0.25)'}`,
            pointerEvents: saving ? 'none' : 'auto',
            opacity: saving ? 0.6 : 1,
            transformStyle: 'preserve-3d',
            willChange: 'transform'
        },
        onMouseMove: (e)=>{
            tiltMove(e, -4, 6);
            e.currentTarget.style.borderColor = isCurrentSelected ? meta.color + '95' : 'rgba(255,107,53,0.55)';
            e.currentTarget.style.boxShadow = isCurrentSelected ? `0 24px 80px rgba(0,0,0,0.7), 0 0 50px ${meta.color}20` : '0 24px 80px rgba(0,0,0,0.6)';
        },
        onMouseLeave: (e)=>{
            tiltReset(e);
            e.currentTarget.style.borderColor = isCurrentSelected ? meta.color + '70' : 'rgba(255,107,53,0.25)';
            e.currentTarget.style.boxShadow = isCurrentSelected ? `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${meta.color}15` : '0 20px 60px rgba(0,0,0,0.5)';
        },
        children: [
            isCurrentSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                style: {
                    background: `radial-gradient(circle at 50% 30%, ${meta.color}15 0%, transparent 60%)`
                }
            }, void 0, false, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 449,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:w-1/2 relative h-64 lg:h-auto min-h-[300px] flex items-center justify-center p-6 overflow-hidden",
                        style: {
                            background: `linear-gradient(180deg, ${meta.color}08 0%, transparent 100%)`
                        },
                        children: [
                            meta.imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: meta.imageUrl,
                                alt: meta.label,
                                className: "w-full h-full object-contain drop-shadow-2xl transition-all duration-500",
                                style: {
                                    filter: isCurrentSelected ? `drop-shadow(0 0 30px ${meta.color}40)` : 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
                                    transform: 'scale(1.1)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 458,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-9xl",
                                children: meta.icon
                            }, void 0, false, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 468,
                                columnNumber: 13
                            }, this),
                            isCurrentSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-4 right-4 px-4 py-2 rounded-full flex items-center gap-2",
                                style: {
                                    background: meta.color,
                                    color: '#fff',
                                    boxShadow: `0 0 20px ${meta.color}60`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconCheck, {}, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 475,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold tracking-wider",
                                        style: {
                                            fontFamily: F_MONO,
                                            fontSize: '0.75rem'
                                        },
                                        children: "EN USO"
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 476,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 473,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/headsets/page.tsx",
                        lineNumber: 455,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:w-1/2 p-6 lg:p-8 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold tracking-widest uppercase",
                                        style: {
                                            color: meta.color,
                                            fontFamily: F_MONO,
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.2em'
                                        },
                                        children: meta.brand
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 485,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-3 py-1 rounded text-xs font-black tracking-wider",
                                        style: {
                                            background: `${meta.color}15`,
                                            color: meta.color,
                                            fontFamily: F_MONO,
                                            fontSize: '0.7rem',
                                            letterSpacing: '0.12em',
                                            border: `1px solid ${meta.color}30`
                                        },
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_LABEL"][meta.tier]
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 489,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 484,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-black leading-tight",
                                style: {
                                    fontFamily: F_BE,
                                    color: '#ede0d4',
                                    fontSize: 'clamp(1.5rem,3vw,2.5rem)',
                                    letterSpacing: '0.02em'
                                },
                                children: meta.label
                            }, void 0, false, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 503,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: selectedId,
                                        onChange: (e)=>handleSelect(e.target.value),
                                        className: "w-full px-4 py-3 rounded-xl text-xs font-bold tracking-widest uppercase cursor-pointer appearance-none transition-all duration-300",
                                        style: {
                                            background: 'rgba(18,8,22,0.9)',
                                            border: `2px solid ${meta.color + '40'}`,
                                            color: meta.color,
                                            fontFamily: F_MONO,
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.15em'
                                        },
                                        children: models.map((id)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: id,
                                                style: {
                                                    background: '#120816',
                                                    color: '#ede0d4'
                                                },
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HEADSET_META"][id].label
                                            }, id, false, {
                                                fileName: "[project]/app/headsets/page.tsx",
                                                lineNumber: 523,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 510,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none",
                                        style: {
                                            color: meta.color,
                                            fontSize: '0.8rem'
                                        },
                                        children: "▼"
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 528,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 509,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3 text-xs",
                                style: {
                                    color: 'rgba(200,150,120,0.7)',
                                    fontFamily: F_MONO,
                                    fontSize: '0.7rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: meta.color
                                                },
                                                children: "●"
                                            }, void 0, false, {
                                                fileName: "[project]/app/headsets/page.tsx",
                                                lineNumber: 538,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "truncate",
                                                children: meta.resolution
                                            }, void 0, false, {
                                                fileName: "[project]/app/headsets/page.tsx",
                                                lineNumber: 539,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 537,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: meta.color
                                                },
                                                children: "●"
                                            }, void 0, false, {
                                                fileName: "[project]/app/headsets/page.tsx",
                                                lineNumber: 542,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "truncate",
                                                children: meta.refreshRate
                                            }, void 0, false, {
                                                fileName: "[project]/app/headsets/page.tsx",
                                                lineNumber: 543,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 541,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: meta.color
                                                },
                                                children: "●"
                                            }, void 0, false, {
                                                fileName: "[project]/app/headsets/page.tsx",
                                                lineNumber: 546,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "truncate",
                                                children: meta.fov
                                            }, void 0, false, {
                                                fileName: "[project]/app/headsets/page.tsx",
                                                lineNumber: 547,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 545,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: meta.color
                                                },
                                                children: "●"
                                            }, void 0, false, {
                                                fileName: "[project]/app/headsets/page.tsx",
                                                lineNumber: 550,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "truncate",
                                                children: meta.releaseYear
                                            }, void 0, false, {
                                                fileName: "[project]/app/headsets/page.tsx",
                                                lineNumber: 551,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 549,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 535,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-hidden transition-all duration-300",
                                style: {
                                    maxHeight: isExpanded ? '600px' : '0px'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-4 space-y-3 border-t",
                                    style: {
                                        borderColor: 'rgba(255,107,53,0.15)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-bold",
                                                    style: {
                                                        color: meta.color,
                                                        fontFamily: F_MONO,
                                                        minWidth: '70px'
                                                    },
                                                    children: "CONTROL"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 563,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs",
                                                    style: {
                                                        color: 'rgba(200,150,120,0.8)',
                                                        fontFamily: F_MONO,
                                                        lineHeight: 1.5
                                                    },
                                                    children: meta.controllers
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 566,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 562,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-bold",
                                                    style: {
                                                        color: meta.color,
                                                        fontFamily: F_MONO,
                                                        minWidth: '70px'
                                                    },
                                                    children: "DISPLAY"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 573,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs",
                                                    style: {
                                                        color: 'rgba(200,150,120,0.8)',
                                                        fontFamily: F_MONO,
                                                        lineHeight: 1.5
                                                    },
                                                    children: meta.displayTech
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 576,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 572,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-bold",
                                                    style: {
                                                        color: meta.color,
                                                        fontFamily: F_MONO,
                                                        minWidth: '70px'
                                                    },
                                                    children: "TRACKING"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 583,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs",
                                                    style: {
                                                        color: 'rgba(200,150,120,0.8)',
                                                        fontFamily: F_MONO,
                                                        lineHeight: 1.5
                                                    },
                                                    children: meta.tracking
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 582,
                                            columnNumber: 15
                                        }, this),
                                        meta.features && meta.features.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: meta.features.map((feature, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-3 py-1 rounded-full text-xs",
                                                        style: {
                                                            background: `${meta.color}12`,
                                                            color: meta.color,
                                                            fontFamily: F_MONO,
                                                            fontSize: '0.65rem',
                                                            border: `1px solid ${meta.color}25`
                                                        },
                                                        children: feature
                                                    }, idx, false, {
                                                        fileName: "[project]/app/headsets/page.tsx",
                                                        lineNumber: 596,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/headsets/page.tsx",
                                                lineNumber: 594,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 593,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/headsets/page.tsx",
                                    lineNumber: 558,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 556,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "flex-1 py-4 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300",
                                        style: {
                                            background: isCurrentSelected ? `linear-gradient(135deg, ${meta.color}30 0%, ${meta.color}15 100%)` : 'rgba(255,255,255,0.03)',
                                            border: `2px solid ${isCurrentSelected ? meta.color + '60' : 'rgba(255,107,53,0.25)'}`,
                                            color: isCurrentSelected ? meta.color : 'rgba(200,150,120,0.6)',
                                            fontFamily: F_MONO,
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.15em',
                                            cursor: 'pointer'
                                        },
                                        onClick: ()=>handleSelect(selectedId),
                                        children: isCurrentSelected ? 'SELECCIONADO' : 'SELECCIONAR'
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 615,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "px-4 py-4 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300",
                                        style: {
                                            background: 'rgba(255,255,255,0.03)',
                                            border: `2px solid rgba(255,107,53,0.25)`,
                                            color: 'rgba(200,150,120,0.6)',
                                            fontFamily: F_MONO,
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.15em',
                                            cursor: 'pointer'
                                        },
                                        onClick: ()=>setIsExpanded(!isExpanded),
                                        children: isExpanded ? '▲' : '▼'
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 632,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 614,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/headsets/page.tsx",
                        lineNumber: 482,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 453,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/headsets/page.tsx",
        lineNumber: 433,
        columnNumber: 5
    }, this);
}
_s1(HeadsetShowcase, "4CccUmLpabB7m/7muLQdJThN30U=");
_c8 = HeadsetShowcase;
// ── Toast ─────────────────────────────────────────────────────────
function Toast({ text, ok }) {
    _s2();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toast.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(ref.current, {
                opacity: 0,
                y: 16
            }, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    }["Toast.useEffect"], [
        text
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl flex items-center gap-2.5",
        style: {
            background: 'rgba(12,6,14,0.96)',
            border: `1px solid ${ok ? 'rgba(0,229,160,0.4)' : 'rgba(255,78,80,0.4)'}`,
            boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: ok ? '#00e5a0' : '#ff4e50'
                },
                children: ok ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconCheck, {}, void 0, false, {
                    fileName: "[project]/app/headsets/page.tsx",
                    lineNumber: 661,
                    columnNumber: 65
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconX, {}, void 0, false, {
                    fileName: "[project]/app/headsets/page.tsx",
                    lineNumber: 661,
                    columnNumber: 80
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 661,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs",
                style: {
                    color: '#ede0d4',
                    fontFamily: F_MONO,
                    fontSize: '0.8rem'
                },
                children: text
            }, void 0, false, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 662,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/headsets/page.tsx",
        lineNumber: 658,
        columnNumber: 5
    }, this);
}
_s2(Toast, "8uVE59eA/r6b92xF80p7sH8rXLk=");
_c9 = Toast;
function MyHeadsetsView() {
    _s3();
    const { state, currentMeta, models, compatibility, toast, selectHeadset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$information$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMyHeadsetsController"])();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const heroCanvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Three.js Hero Animation - Headset Lens Visualization
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyHeadsetsView.useEffect": ()=>{
            if (!heroCanvasRef.current || ("TURBOPACK compile-time value", "object") === 'undefined') return;
            const canvas = heroCanvasRef.current;
            const W = canvas.offsetWidth || 800;
            const H = canvas.offsetHeight || 400;
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                canvas,
                antialias: true,
                alpha: true
            });
            renderer.setSize(W, H);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x000000, 0);
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](60, W / H, 0.1, 200);
            camera.position.set(0, 0, 8);
            // Create headset lens visualization - concentric rings representing lens optics
            const ringsGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            const ringConfigs = [
                {
                    radius: 1.5,
                    color: '#FF006E',
                    segments: 64,
                    thickness: 0.02
                },
                {
                    radius: 2.2,
                    color: '#FF6B00',
                    segments: 80,
                    thickness: 0.015
                },
                {
                    radius: 3.0,
                    color: '#FFD700',
                    segments: 96,
                    thickness: 0.01
                },
                {
                    radius: 3.8,
                    color: '#FF006E',
                    segments: 120,
                    thickness: 0.008
                }
            ];
            ringConfigs.forEach({
                "MyHeadsetsView.useEffect": (config, i)=>{
                    const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](config.radius, config.thickness, 16, config.segments);
                    const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                        color: config.color,
                        transparent: true,
                        opacity: 0.6,
                        wireframe: true
                    });
                    const ring = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
                    ring.userData = {
                        baseRotation: Math.random() * Math.PI * 2,
                        rotationSpeed: (i + 1) * 0.001,
                        baseScale: 1
                    };
                    ringsGroup.add(ring);
                }
            }["MyHeadsetsView.useEffect"]);
            // Add floating particles representing tracking points
            const particleCount = 500;
            const particleGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const particlePositions = new Float32Array(particleCount * 3);
            const particleColors = new Float32Array(particleCount * 3);
            const color1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#FF006E');
            const color2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#FF6B00');
            const color3 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#FFD700');
            for(let i = 0; i < particleCount; i++){
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 2 + Math.random() * 3;
                particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                particlePositions[i * 3 + 2] = r * Math.cos(phi);
                const colorChoice = Math.random();
                let color;
                if (colorChoice < 0.33) color = color1;
                else if (colorChoice < 0.66) color = color2;
                else color = color3;
                particleColors[i * 3] = color.r;
                particleColors[i * 3 + 1] = color.g;
                particleColors[i * 3 + 2] = color.b;
            }
            particleGeometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](particlePositions, 3));
            particleGeometry.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](particleColors, 3));
            const particleMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointsMaterial"]({
                size: 0.03,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                sizeAttenuation: true
            });
            const particles = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](particleGeometry, particleMaterial);
            ringsGroup.add(particles);
            scene.add(ringsGroup);
            // Add central glow representing lens center
            const glowGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.5, 32, 32);
            const glowMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: '#FF6B00',
                transparent: true,
                opacity: 0.3,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"]
            });
            const glow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](glowGeometry, glowMaterial);
            ringsGroup.add(glow);
            let mx = 0, my = 0;
            const onMouseMove = {
                "MyHeadsetsView.useEffect.onMouseMove": (e)=>{
                    const r = canvas.getBoundingClientRect();
                    mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
                    my = -((e.clientY - r.top) / r.height - 0.5) * 2;
                }
            }["MyHeadsetsView.useEffect.onMouseMove"];
            canvas.addEventListener('mousemove', onMouseMove);
            const timer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timer"]();
            let animationFrameId;
            function animate() {
                animationFrameId = requestAnimationFrame(animate);
                const t = timer.getElapsed();
                // Animate rings
                ringsGroup.children.forEach({
                    "MyHeadsetsView.useEffect.animate": (child, i)=>{
                        if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"] && child.geometry.type === 'TorusGeometry') {
                            const data = child.userData;
                            child.rotation.x = data.baseRotation + t * data.rotationSpeed;
                            child.rotation.y = data.baseRotation + t * data.rotationSpeed * 0.7;
                            // Pulsing effect
                            const scale = data.baseScale + Math.sin(t * 2 + i) * 0.05;
                            child.scale.set(scale, scale, scale);
                        }
                    }
                }["MyHeadsetsView.useEffect.animate"]);
                // Animate particles
                const positions = particleGeometry.attributes.position.array;
                for(let i = 0; i < particleCount; i++){
                    const ix = i * 3;
                    const iy = ix + 1;
                    const iz = ix + 2;
                    // Gentle floating motion
                    positions[iy] += Math.sin(t + positions[ix]) * 0.002;
                    positions[ix] += Math.cos(t + positions[iz]) * 0.002;
                }
                particleGeometry.attributes.position.needsUpdate = true;
                // Rotate entire group based on mouse
                ringsGroup.rotation.y += mx * 0.01;
                ringsGroup.rotation.x += my * 0.01;
                // Gentle auto-rotation
                ringsGroup.rotation.y += 0.002;
                // Pulse the central glow
                const glowScale = 1 + Math.sin(t * 3) * 0.2;
                glow.scale.set(glowScale, glowScale, glowScale);
                renderer.render(scene, camera);
            }
            animate();
            const resizeObserver = new ResizeObserver({
                "MyHeadsetsView.useEffect": ()=>{
                    const w = canvas.offsetWidth;
                    const h = canvas.offsetHeight;
                    renderer.setSize(w, h);
                    camera.aspect = w / h;
                    camera.updateProjectionMatrix();
                }
            }["MyHeadsetsView.useEffect"]);
            resizeObserver.observe(canvas);
            return ({
                "MyHeadsetsView.useEffect": ()=>{
                    cancelAnimationFrame(animationFrameId);
                    canvas.removeEventListener('mousemove', onMouseMove);
                    resizeObserver.disconnect();
                    particleGeometry.dispose();
                    particleMaterial.dispose();
                    glowGeometry.dispose();
                    glowMaterial.dispose();
                    ringsGroup.children.forEach({
                        "MyHeadsetsView.useEffect": (child)=>{
                            if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"]) {
                                child.geometry.dispose();
                                if (child.material instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Material"]) {
                                    child.material.dispose();
                                }
                            }
                        }
                    }["MyHeadsetsView.useEffect"]);
                    renderer.dispose();
                }
            })["MyHeadsetsView.useEffect"];
        }
    }["MyHeadsetsView.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyHeadsetsView.useEffect": ()=>{
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].context({
                "MyHeadsetsView.useEffect.ctx": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.orb-hp1', {
                        scale: 1.15,
                        opacity: 0.35,
                        duration: 5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut'
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.orb-hp2', {
                        scale: 1.1,
                        opacity: 0.3,
                        duration: 6.5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                        delay: 2
                    });
                    const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                        defaults: {
                            ease: 'power3.out'
                        }
                    });
                    tl.fromTo('.hero-intro', {
                        opacity: 0,
                        y: 30
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8
                    });
                    if (!prefersReduced) {
                        const title = document.querySelector('.hero-title');
                        if (title && title.textContent && title.textContent.trim().length > 0) {
                            const split = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SplitText"](title, {
                                type: 'chars'
                            });
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(split.chars, {
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
                    }
                    tl.fromTo('.current-headset-hero', {
                        opacity: 0,
                        y: 24,
                        scale: 0.98
                    }, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6
                    }, '-=0.4').fromTo('.section-hdr', {
                        opacity: 0,
                        x: -16
                    }, {
                        opacity: 1,
                        x: 0,
                        stagger: 0.1,
                        duration: 0.5
                    }, '-=0.3').fromTo('.module-compat-card', {
                        opacity: 0,
                        y: 16
                    }, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.08,
                        duration: 0.4
                    }, '-=0.3').fromTo('.headset-card', {
                        opacity: 0,
                        y: 20
                    }, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.06,
                        duration: 0.4
                    }, '-=0.3');
                    // Scroll progress
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
                        start: 0,
                        end: 'max',
                        onUpdate: {
                            "MyHeadsetsView.useEffect.ctx": (self)=>{
                                const bar = document.querySelector('.hp-progress-bar-inner');
                                if (bar) bar.style.transform = `scaleX(${self.progress})`;
                            }
                        }["MyHeadsetsView.useEffect.ctx"]
                    });
                }
            }["MyHeadsetsView.useEffect.ctx"], containerRef);
            return ({
                "MyHeadsetsView.useEffect": ()=>ctx.revert()
            })["MyHeadsetsView.useEffect"];
        }
    }["MyHeadsetsView.useEffect"], [
        state.loading
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        :root { --pink: #FF006E; --orange: #FF6B00; --yellow: #FFD700; }
        main { background-color: transparent !important; }
        @keyframes orb-pulse { 0%,100%{transform:scale(1);opacity:0.5} 50%{transform:scale(1.15);opacity:0.35} }
      `
            }, void 0, false, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 899,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NeuralField3D, {}, void 0, false, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 906,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hp-progress-bar fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left",
                style: {
                    background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hp-progress-bar-inner",
                    style: {
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))',
                        boxShadow: '0 0 12px rgba(255,107,53,0.4)',
                        transform: 'scaleX(0)',
                        transformOrigin: 'left'
                    }
                }, void 0, false, {
                    fileName: "[project]/app/headsets/page.tsx",
                    lineNumber: 911,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 909,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "relative z-10 min-h-screen overflow-x-hidden",
                style: {
                    background: 'transparent',
                    fontFamily: F_MONO
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 pointer-events-none z-0",
                        style: {
                            opacity: 0.12,
                            backgroundImage: 'linear-gradient(rgba(255,107,53,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,53,0.05) 1px,transparent 1px)',
                            backgroundSize: '48px 48px',
                            maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,#000 0%,transparent 85%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,#000 0%,transparent 85%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/headsets/page.tsx",
                        lineNumber: 918,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "orb-hp1 fixed pointer-events-none rounded-full",
                        style: {
                            width: 550,
                            height: 550,
                            top: '-8%',
                            right: '-12%',
                            zIndex: 0,
                            background: 'radial-gradient(circle,rgba(255,0,110,0.16) 0%,transparent 70%)',
                            filter: 'blur(50px)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/headsets/page.tsx",
                        lineNumber: 927,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "orb-hp2 fixed pointer-events-none rounded-full",
                        style: {
                            width: 450,
                            height: 450,
                            bottom: '-5%',
                            left: '-8%',
                            zIndex: 0,
                            background: 'radial-gradient(circle,rgba(255,107,53,0.14) 0%,transparent 70%)',
                            filter: 'blur(60px)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/headsets/page.tsx",
                        lineNumber: 930,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none fixed inset-0 z-[100]",
                        style: {
                            opacity: 0.04,
                            background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.05) 2px,rgba(255,255,255,0.05) 4px)',
                            mixBlendMode: 'overlay'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/headsets/page.tsx",
                        lineNumber: 935,
                        columnNumber: 7
                    }, this),
                    [
                        'tl',
                        'tr',
                        'bl',
                        'br'
                    ].map((pos)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            fileName: "[project]/app/headsets/page.tsx",
                            lineNumber: 941,
                            columnNumber: 9
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "hero-intro relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-0 right-0 w-full h-full pointer-events-none",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "canvas-glow",
                                            style: {
                                                background: 'radial-gradient(var(--orange),transparent 70%)',
                                                width: '600px',
                                                height: '600px',
                                                position: 'absolute',
                                                top: '-20%',
                                                right: '-10%',
                                                filter: 'blur(80px)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 960,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 959,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 flex flex-col lg:flex-row items-center gap-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "eyebrow text-xs font-bold tracking-widest uppercase mb-4",
                                                        style: {
                                                            color: 'rgba(255,107,53,0.6)',
                                                            fontFamily: F_MONO,
                                                            letterSpacing: '0.2em'
                                                        },
                                                        children: "[ PLATAFORMA_XR // HEADSETS // 2026 ]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/headsets/page.tsx",
                                                        lineNumber: 964,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "hero-title",
                                                        style: {
                                                            fontFamily: F_BE,
                                                            fontSize: 'clamp(2.5rem,6vw,4rem)',
                                                            lineHeight: 0.9
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "line1",
                                                                style: {
                                                                    display: 'block'
                                                                },
                                                                children: "MIS"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/headsets/page.tsx",
                                                                lineNumber: 968,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "line2",
                                                                style: {
                                                                    display: 'block'
                                                                },
                                                                children: "HEADSETS"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/headsets/page.tsx",
                                                                lineNumber: 969,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/headsets/page.tsx",
                                                        lineNumber: 967,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "sub text-sm mt-4 max-w-lg",
                                                        style: {
                                                            color: 'rgba(200,160,140,0.7)',
                                                            fontFamily: F_MONO,
                                                            letterSpacing: '0.02em'
                                                        },
                                                        children: "Registra tu dispositivo VR para que Athernix adapte cada módulo a sus capacidades reales."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/headsets/page.tsx",
                                                        lineNumber: 971,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/home",
                                                        className: "inline-flex items-center gap-2 mt-6 text-xs font-bold tracking-widest uppercase transition-all hover:opacity-70",
                                                        style: {
                                                            color: 'var(--orange)',
                                                            fontFamily: F_MONO,
                                                            letterSpacing: '0.15em',
                                                            transformStyle: 'preserve-3d',
                                                            willChange: 'transform'
                                                        },
                                                        onMouseMove: (e)=>{
                                                            magneticMove(e, 0.3);
                                                            tiltMove(e, -2, 10);
                                                        },
                                                        onMouseLeave: (e)=>{
                                                            magneticReset(e);
                                                            tiltReset(e);
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBack, {}, void 0, false, {
                                                                fileName: "[project]/app/headsets/page.tsx",
                                                                lineNumber: 978,
                                                                columnNumber: 19
                                                            }, this),
                                                            " VOLVER AL INICIO"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/headsets/page.tsx",
                                                        lineNumber: 974,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/headsets/page.tsx",
                                                lineNumber: 963,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 w-full lg:w-1/2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "module-canvas-wrap relative rounded-2xl overflow-hidden",
                                                    style: {
                                                        background: 'rgba(18,8,22,0.8)',
                                                        border: '1px solid rgba(255,107,53,0.2)',
                                                        transformStyle: 'preserve-3d',
                                                        willChange: 'transform'
                                                    },
                                                    onMouseMove: (e)=>{
                                                        tiltMove(e, -6, 8);
                                                        e.currentTarget.style.borderColor = 'rgba(255,107,53,0.45)';
                                                        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,107,53,0.12)';
                                                    },
                                                    onMouseLeave: (e)=>{
                                                        tiltReset(e);
                                                        e.currentTarget.style.borderColor = 'rgba(255,107,53,0.2)';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                                        ref: heroCanvasRef,
                                                        className: "w-full h-80 lg:h-96"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/headsets/page.tsx",
                                                        lineNumber: 986,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 982,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/headsets/page.tsx",
                                                lineNumber: 981,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 962,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 958,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grad-line",
                                style: {
                                    height: '1px',
                                    background: 'linear-gradient(90deg, transparent, var(--orange), transparent)',
                                    opacity: 0.5
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 992,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mq overflow-hidden py-4",
                                style: {
                                    background: 'rgba(18,8,22,0.5)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mq-t flex gap-8 whitespace-nowrap",
                                    style: {
                                        animation: 'marquee 20s linear infinite'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mqi text-sm font-bold",
                                            style: {
                                                color: 'rgba(255,107,53,0.6)',
                                                fontFamily: F_BE
                                            },
                                            children: [
                                                "META QUEST ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: 'var(--orange)'
                                                    },
                                                    children: "✦"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 997,
                                                    columnNumber: 126
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 997,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mqi text-sm font-bold",
                                            style: {
                                                color: 'rgba(255,107,53,0.6)',
                                                fontFamily: F_BE
                                            },
                                            children: [
                                                "APPLE VISION PRO ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: 'var(--pink)'
                                                    },
                                                    children: "✦"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 998,
                                                    columnNumber: 132
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 998,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mqi text-sm font-bold",
                                            style: {
                                                color: 'rgba(255,107,53,0.6)',
                                                fontFamily: F_BE
                                            },
                                            children: [
                                                "VALVE INDEX ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: 'var(--yellow)'
                                                    },
                                                    children: "✦"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 999,
                                                    columnNumber: 127
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 999,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mqi text-sm font-bold",
                                            style: {
                                                color: 'rgba(255,107,53,0.6)',
                                                fontFamily: F_BE
                                            },
                                            children: [
                                                "HTC VIVE ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: 'var(--orange)'
                                                    },
                                                    children: "✦"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 1000,
                                                    columnNumber: 124
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 1000,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mqi text-sm font-bold",
                                            style: {
                                                color: 'rgba(255,107,53,0.6)',
                                                fontFamily: F_BE
                                            },
                                            children: [
                                                "PICO ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: 'var(--pink)'
                                                    },
                                                    children: "✦"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 1001,
                                                    columnNumber: 120
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 1001,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mqi text-sm font-bold",
                                            style: {
                                                color: 'rgba(255,107,53,0.6)',
                                                fontFamily: F_BE
                                            },
                                            children: [
                                                "PSVR2 ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: 'var(--yellow)'
                                                    },
                                                    children: "✦"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 1002,
                                                    columnNumber: 121
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 1002,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mqi text-sm font-bold",
                                            style: {
                                                color: 'rgba(255,107,53,0.6)',
                                                fontFamily: F_BE
                                            },
                                            children: [
                                                "ATHERNIX XR ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: 'var(--orange)'
                                                    },
                                                    children: "✦"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 1003,
                                                    columnNumber: 127
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 1003,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mqi text-sm font-bold",
                                            style: {
                                                color: 'rgba(255,107,53,0.6)',
                                                fontFamily: F_BE
                                            },
                                            children: [
                                                "WEBXR ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: 'var(--pink)'
                                                    },
                                                    children: "✦"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 1004,
                                                    columnNumber: 121
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 1004,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/headsets/page.tsx",
                                    lineNumber: 996,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 995,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `
                            }, void 0, false, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 1008,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grad-line",
                                style: {
                                    height: '1px',
                                    background: 'linear-gradient(90deg, transparent, var(--orange), transparent)',
                                    opacity: 0.5
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 1015,
                                columnNumber: 11
                            }, this),
                            state.loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border p-10 text-center",
                                style: {
                                    background: 'rgba(18,8,22,0.9)',
                                    borderColor: 'rgba(255,107,53,0.2)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs",
                                    style: {
                                        color: 'rgba(200,150,120,0.5)',
                                        fontFamily: F_MONO
                                    },
                                    children: "Cargando tu headset..."
                                }, void 0, false, {
                                    fileName: "[project]/app/headsets/page.tsx",
                                    lineNumber: 1020,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 1019,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CurrentHeadsetHero, {
                                model: state.current,
                                setAt: state.setAt
                            }, void 0, false, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 1023,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                        icon: "◈",
                                        title: "COMPATIBILIDAD CON MÓDULOS ATHERNIX"
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 1028,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                                        children: compatibility.map((mod)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModuleCompatCard, {
                                                mod: mod,
                                                hasHeadset: state.current !== 'none'
                                            }, mod.id, false, {
                                                fileName: "[project]/app/headsets/page.tsx",
                                                lineNumber: 1031,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 1029,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 1027,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grad-line",
                                style: {
                                    height: '1px',
                                    background: 'linear-gradient(90deg, transparent, var(--orange), transparent)',
                                    opacity: 0.5
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 1036,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                        icon: "⬡",
                                        title: "CATÁLOGO DE HEADSETS",
                                        right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-bold",
                                            style: {
                                                color: 'rgba(255,107,53,0.5)',
                                                fontFamily: F_MONO,
                                                letterSpacing: '0.15em'
                                            },
                                            children: [
                                                models.length,
                                                " MODELOS SOPORTADOS"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 1041,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 1040,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs mb-6 -mt-3",
                                        style: {
                                            color: 'rgba(200,150,120,0.5)',
                                            fontFamily: F_MONO,
                                            letterSpacing: '0.05em'
                                        },
                                        children: "Explora y selecciona el headset que usas para acceder a recomendaciones y ajustes específicos de cada módulo."
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 1045,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadsetShowcase, {
                                        models: models,
                                        currentId: state.current,
                                        isActive: state.current !== 'none',
                                        saving: state.saving,
                                        onSelect: selectHeadset
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 1048,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 1039,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grad-line",
                                style: {
                                    height: '1px',
                                    background: 'linear-gradient(90deg, transparent, var(--orange), transparent)',
                                    opacity: 0.5
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 1057,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border p-6 flex items-start gap-4",
                                style: {
                                    background: 'rgba(18,8,22,0.7)',
                                    borderColor: 'rgba(255,107,53,0.2)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--orange)',
                                            fontSize: '1.25rem'
                                        },
                                        children: "◈"
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 1062,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm leading-relaxed",
                                        style: {
                                            color: 'rgba(200,150,120,0.6)',
                                            fontFamily: F_MONO,
                                            letterSpacing: '0.02em'
                                        },
                                        children: "¿No encuentras tu modelo exacto? Selecciona el más parecido de tu misma marca — Athernix ajusta automáticamente la calidad según el hardware real detectado al conectar tu headset."
                                    }, void 0, false, {
                                        fileName: "[project]/app/headsets/page.tsx",
                                        lineNumber: 1063,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 1060,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mq overflow-hidden py-4",
                                style: {
                                    background: 'rgba(18,8,22,0.5)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mq-t flex gap-8 whitespace-nowrap",
                                    style: {
                                        animation: 'marquee 25s linear infinite reverse'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mqi text-sm font-bold",
                                            style: {
                                                color: 'rgba(255,107,53,0.4)',
                                                fontFamily: F_MONO
                                            },
                                            children: [
                                                "UNITY ENGINE ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "◈"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 1072,
                                                    columnNumber: 130
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 1072,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mqi text-sm font-bold",
                                            style: {
                                                color: 'rgba(255,107,53,0.4)',
                                                fontFamily: F_MONO
                                            },
                                            children: [
                                                "META QUEST PRO ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "◈"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 1073,
                                                    columnNumber: 132
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 1073,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mqi text-sm font-bold",
                                            style: {
                                                color: 'rgba(255,107,53,0.4)',
                                                fontFamily: F_MONO
                                            },
                                            children: [
                                                "UNREAL ENGINE 5 ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "◈"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 1074,
                                                    columnNumber: 133
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 1074,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mqi text-sm font-bold",
                                            style: {
                                                color: 'rgba(255,107,53,0.4)',
                                                fontFamily: F_MONO
                                            },
                                            children: [
                                                "WEBXR ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "◈"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 1075,
                                                    columnNumber: 123
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 1075,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mqi text-sm font-bold",
                                            style: {
                                                color: 'rgba(255,107,53,0.4)',
                                                fontFamily: F_MONO
                                            },
                                            children: [
                                                "HAPTIC FEEDBACK ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "◈"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 1076,
                                                    columnNumber: 133
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 1076,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mqi text-sm font-bold",
                                            style: {
                                                color: 'rgba(255,107,53,0.4)',
                                                fontFamily: F_MONO
                                            },
                                            children: [
                                                "OPENXR ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "◈"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/headsets/page.tsx",
                                                    lineNumber: 1077,
                                                    columnNumber: 124
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/headsets/page.tsx",
                                            lineNumber: 1077,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/headsets/page.tsx",
                                    lineNumber: 1071,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/headsets/page.tsx",
                                lineNumber: 1070,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/headsets/page.tsx",
                        lineNumber: 955,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 914,
                columnNumber: 7
            }, this),
            toast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toast, {
                text: toast.text,
                ok: toast.ok
            }, void 0, false, {
                fileName: "[project]/app/headsets/page.tsx",
                lineNumber: 1083,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
_s3(MyHeadsetsView, "4S0Nfb7zXmDxei1RuCqYYFnvsxI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$information$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMyHeadsetsController"]
    ];
});
_c10 = MyHeadsetsView;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "IconBack");
__turbopack_context__.k.register(_c1, "IconCheck");
__turbopack_context__.k.register(_c2, "IconX");
__turbopack_context__.k.register(_c3, "IconArrowR");
__turbopack_context__.k.register(_c4, "NeuralField3D");
__turbopack_context__.k.register(_c5, "SectionHeader");
__turbopack_context__.k.register(_c6, "CurrentHeadsetHero");
__turbopack_context__.k.register(_c7, "ModuleCompatCard");
__turbopack_context__.k.register(_c8, "HeadsetShowcase");
__turbopack_context__.k.register(_c9, "Toast");
__turbopack_context__.k.register(_c10, "MyHeadsetsView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_043a16d._.js.map