(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/models/achievements.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACHIEVEMENTS",
    ()=>ACHIEVEMENTS,
    "ACHIEVEMENT_CATEGORIES",
    ()=>ACHIEVEMENT_CATEGORIES,
    "calculateLevel",
    ()=>calculateLevel,
    "getXPForLevel",
    ()=>getXPForLevel,
    "getXPToNextLevel",
    ()=>getXPToNextLevel
]);
const ACHIEVEMENTS = [
    {
        id: 'first-login',
        label: 'Primer Paso',
        desc: 'Inicia sesión por primera vez en Athernix',
        icon: '🚀',
        color: '#FF6B00',
        xp: 50,
        unlocked: false,
        category: 'exploration',
        requirement: 'Iniciar sesión'
    },
    {
        id: 'first-module',
        label: 'Explorador',
        desc: 'Accede a tu primer módulo VR',
        icon: '🧭',
        color: '#FF006E',
        xp: 100,
        unlocked: false,
        category: 'exploration',
        requirement: 'Completar 1 módulo'
    },
    {
        id: 'first-ai-chat',
        label: 'Conexión Neural',
        desc: 'Inicia tu primera conversación con Ather IA',
        icon: '🤖',
        color: '#00E5A0',
        xp: 75,
        unlocked: false,
        category: 'learning',
        requirement: 'Usar chatbot IA'
    },
    {
        id: 'streak-3',
        label: 'Racha de Fuego',
        desc: 'Mantén una racha de 3 días consecutivos',
        icon: '🔥',
        color: '#FF6B00',
        xp: 150,
        unlocked: false,
        category: 'mastery',
        requirement: '3 días consecutivos'
    },
    {
        id: 'streak-7',
        label: 'Semana Perfecta',
        desc: 'Mantén una racha de 7 días consecutivos',
        icon: '⭐',
        color: '#FFD700',
        xp: 300,
        unlocked: false,
        category: 'mastery',
        requirement: '7 días consecutivos'
    },
    {
        id: 'modules-5',
        label: 'Viajero VR',
        desc: 'Explora 5 módulos diferentes',
        icon: '🌐',
        color: '#FF006E',
        xp: 200,
        unlocked: false,
        category: 'exploration',
        requirement: 'Completar 5 módulos'
    },
    {
        id: 'modules-10',
        label: 'Maestro VR',
        desc: 'Explora 10 módulos diferentes',
        icon: '🏆',
        color: '#FFD700',
        xp: 500,
        unlocked: false,
        category: 'exploration',
        requirement: 'Completar 10 módulos'
    },
    {
        id: 'xp-500',
        label: 'Nivel 5',
        desc: 'Alcanza 500 XP totales',
        icon: '⚡',
        color: '#00E5A0',
        xp: 0,
        unlocked: false,
        category: 'mastery',
        requirement: '500 XP'
    },
    {
        id: 'xp-1000',
        label: 'Nivel 10',
        desc: 'Alcanza 1000 XP totales',
        icon: '💎',
        color: '#FFD700',
        xp: 0,
        unlocked: false,
        category: 'mastery',
        requirement: '1000 XP'
    },
    {
        id: 'headset-registered',
        label: 'Conectado',
        desc: 'Registra tu primer headset VR',
        icon: '🥽',
        color: '#FF6B00',
        xp: 100,
        unlocked: false,
        category: 'exploration',
        requirement: 'Registrar headset'
    },
    {
        id: 'classroom-joined',
        label: 'Estudiante',
        desc: 'Únete a tu primera clase en Classroom',
        icon: '📚',
        color: '#00E5A0',
        xp: 150,
        unlocked: false,
        category: 'social',
        requirement: 'Unirse a clase'
    },
    {
        id: 'mission-completed',
        label: 'Primera Misión',
        desc: 'Completa tu primera misión de clase',
        icon: '✅',
        color: '#FF006E',
        xp: 200,
        unlocked: false,
        category: 'learning',
        requirement: 'Completar misión'
    },
    {
        id: 'missions-10',
        label: 'Misionero',
        desc: 'Completa 10 misiones en total',
        icon: '🎯',
        color: '#FFD700',
        xp: 400,
        unlocked: false,
        category: 'mastery',
        requirement: '10 misiones'
    },
    {
        id: 'development-explored',
        label: 'Investigador',
        desc: 'Explora la zona de desarrollo',
        icon: '🔬',
        color: '#00E5A0',
        xp: 100,
        unlocked: false,
        category: 'learning',
        requirement: 'Visitar /development'
    },
    {
        id: 'topic-learned',
        label: 'Sabio',
        desc: 'Completa tu primer tema de estudio',
        icon: '📖',
        color: '#FF6B00',
        xp: 150,
        unlocked: false,
        category: 'learning',
        requirement: 'Completar tema'
    },
    {
        id: 'ai-questions-10',
        label: 'Curioso',
        desc: 'Haz 10 preguntas a Ather IA',
        icon: '❓',
        color: '#FF006E',
        xp: 200,
        unlocked: false,
        category: 'learning',
        requirement: '10 preguntas'
    }
];
const ACHIEVEMENT_CATEGORIES = {
    exploration: {
        label: 'Exploración',
        color: '#FF6B00',
        icon: 'Compass'
    },
    learning: {
        label: 'Aprendizaje',
        color: '#00E5A0',
        icon: 'BookOpen'
    },
    social: {
        label: 'Social',
        color: '#FF006E',
        icon: 'Users'
    },
    mastery: {
        label: 'Maestría',
        color: '#FFD700',
        icon: 'Trophy'
    }
};
function calculateLevel(xp) {
    return Math.floor(xp / 100) + 1;
}
function getXPForLevel(level) {
    return (level - 1) * 100;
}
function getXPToNextLevel(currentXP) {
    const currentLevel = calculateLevel(currentXP);
    const nextLevelXP = getXPForLevel(currentLevel + 1);
    return nextLevelXP - currentXP;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/controllers/home/achievementsController.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAchievementsController",
    ()=>useAchievementsController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$achievements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/achievements.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
let supabaseClient = null;
function getSupabase() {
    if (!supabaseClient) {
        supabaseClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://tucsuclhwanifjexmztr.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Y3N1Y2xod2FuaWZqZXhtenRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTM5NjQsImV4cCI6MjA4ODAyOTk2NH0.QEpeZ5xLs1R3sdllblWqxbk8sAz69u8QqBU3LJR2aD0"));
    }
    return supabaseClient;
}
const INITIAL_STATE = {
    achievements: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$achievements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACHIEVEMENTS"].map((a)=>({
            ...a,
            unlocked: false
        })),
    userStats: null,
    userName: null,
    userEmail: null,
    isLoading: false,
    error: null
};
function useAchievementsController() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INITIAL_STATE);
    // Cargar logros del usuario desde Supabase
    const loadAchievements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAchievementsController.useCallback[loadAchievements]": async ()=>{
            setState({
                "useAchievementsController.useCallback[loadAchievements]": (prev)=>({
                        ...prev,
                        isLoading: true,
                        error: null
                    })
            }["useAchievementsController.useCallback[loadAchievements]"]);
            try {
                const supabase = getSupabase();
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setState({
                        "useAchievementsController.useCallback[loadAchievements]": (prev)=>({
                                ...prev,
                                isLoading: false,
                                userName: null,
                                userEmail: null
                            })
                    }["useAchievementsController.useCallback[loadAchievements]"]);
                    return;
                }
                // Cargar logros desbloqueados
                const { data: userAchievements, error } = await supabase.from('user_achievements').select('*').eq('user_id', user.id);
                if (error) throw error;
                // Crear mapa de logros desbloqueados
                const unlockedMap = new Map((userAchievements || []).map({
                    "useAchievementsController.useCallback[loadAchievements]": (ua)=>[
                            ua.achievement_id,
                            ua
                        ]
                }["useAchievementsController.useCallback[loadAchievements]"]));
                // Actualizar estado de logros
                const updatedAchievements = __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$achievements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACHIEVEMENTS"].map({
                    "useAchievementsController.useCallback[loadAchievements].updatedAchievements": (achievement)=>({
                            ...achievement,
                            unlocked: unlockedMap.has(achievement.id),
                            unlockedAt: unlockedMap.get(achievement.id)?.unlocked_at
                        })
                }["useAchievementsController.useCallback[loadAchievements].updatedAchievements"]);
                // Calcular estadísticas del usuario
                const totalXP = (userAchievements || []).reduce({
                    "useAchievementsController.useCallback[loadAchievements].totalXP": (acc, ua)=>acc + ua.xp_earned
                }["useAchievementsController.useCallback[loadAchievements].totalXP"], 0);
                const level = (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$achievements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateLevel"])(totalXP);
                // Cargar estadísticas adicionales de activity_logs
                const { data: activityLogs } = await supabase.from('activity_logs').select('*').eq('user_id', user.id);
                const activeDays = new Set((activityLogs || []).map({
                    "useAchievementsController.useCallback[loadAchievements]": (log)=>new Date(log.created_at).toDateString()
                }["useAchievementsController.useCallback[loadAchievements]"])).size;
                const joinedDate = user?.created_at || new Date().toISOString();
                const userStats = {
                    activeDays,
                    totalXP,
                    level,
                    missionsCompleted: unlockedMap.get('mission-completed') ? 1 : 0,
                    topicsExplored: unlockedMap.get('development-explored') ? 1 : 0,
                    hoursSpent: Math.floor(activeDays * 0.5),
                    streakDays: 0,
                    joinedDate
                };
                setState({
                    achievements: updatedAchievements,
                    userStats,
                    userName: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Explorador',
                    userEmail: user.email || null,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                console.error('Error loading achievements:', error);
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                console.error('Error details:', errorMessage);
                setState({
                    "useAchievementsController.useCallback[loadAchievements]": (prev)=>({
                            ...prev,
                            isLoading: false,
                            error: `Error al cargar logros: ${errorMessage}`
                        })
                }["useAchievementsController.useCallback[loadAchievements]"]);
            }
        }
    }["useAchievementsController.useCallback[loadAchievements]"], []);
    // Desbloquear un logro
    const unlockAchievement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAchievementsController.useCallback[unlockAchievement]": async (achievementId)=>{
            setState({
                "useAchievementsController.useCallback[unlockAchievement]": (prev)=>({
                        ...prev,
                        isLoading: true,
                        error: null
                    })
            }["useAchievementsController.useCallback[unlockAchievement]"]);
            try {
                const supabase = getSupabase();
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setState({
                        "useAchievementsController.useCallback[unlockAchievement]": (prev)=>({
                                ...prev,
                                isLoading: false,
                                error: 'Usuario no autenticado'
                            })
                    }["useAchievementsController.useCallback[unlockAchievement]"]);
                    return;
                }
                const achievement = __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$achievements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACHIEVEMENTS"].find({
                    "useAchievementsController.useCallback[unlockAchievement].achievement": (a)=>a.id === achievementId
                }["useAchievementsController.useCallback[unlockAchievement].achievement"]);
                if (!achievement) {
                    setState({
                        "useAchievementsController.useCallback[unlockAchievement]": (prev)=>({
                                ...prev,
                                isLoading: false,
                                error: 'Logro no encontrado'
                            })
                    }["useAchievementsController.useCallback[unlockAchievement]"]);
                    return;
                }
                // Verificar si ya está desbloqueado
                const { data: existing } = await supabase.from('user_achievements').select('*').eq('user_id', user.id).eq('achievement_id', achievementId).single();
                if (existing) {
                    setState({
                        "useAchievementsController.useCallback[unlockAchievement]": (prev)=>({
                                ...prev,
                                isLoading: false
                            })
                    }["useAchievementsController.useCallback[unlockAchievement]"]);
                    return;
                }
                // Insertar nuevo logro
                const { error } = await supabase.from('user_achievements').insert({
                    user_id: user.id,
                    achievement_id: achievementId,
                    xp_earned: achievement.xp,
                    unlocked_at: new Date().toISOString()
                });
                if (error) throw error;
                // Recargar logros
                await loadAchievements();
            } catch (error) {
                console.error('Error unlocking achievement:', error);
                setState({
                    "useAchievementsController.useCallback[unlockAchievement]": (prev)=>({
                            ...prev,
                            isLoading: false,
                            error: 'Error al desbloquear logro'
                        })
                }["useAchievementsController.useCallback[unlockAchievement]"]);
            }
        }
    }["useAchievementsController.useCallback[unlockAchievement]"], [
        loadAchievements
    ]);
    // Verificar y desbloquear logros automáticamente
    const checkAndUnlockAchievements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAchievementsController.useCallback[checkAndUnlockAchievements]": async (triggers)=>{
            const achievementsToUnlock = [];
            if (triggers.firstLogin) achievementsToUnlock.push('first-login');
            if (triggers.moduleCompleted) achievementsToUnlock.push('first-module');
            if (triggers.aiChatUsed) achievementsToUnlock.push('first-ai-chat');
            if (triggers.headsetRegistered) achievementsToUnlock.push('headset-registered');
            if (triggers.classroomJoined) achievementsToUnlock.push('classroom-joined');
            if (triggers.missionCompleted) achievementsToUnlock.push('mission-completed');
            if (triggers.developmentExplored) achievementsToUnlock.push('development-explored');
            if (triggers.topicLearned) achievementsToUnlock.push('topic-learned');
            // Desbloquear logros por cantidad
            if (triggers.aiQuestionsCount && triggers.aiQuestionsCount >= 10) {
                achievementsToUnlock.push('ai-questions-10');
            }
            // Desbloquear cada logro
            for (const achievementId of achievementsToUnlock){
                await unlockAchievement(achievementId);
            }
        }
    }["useAchievementsController.useCallback[checkAndUnlockAchievements]"], [
        unlockAchievement
    ]);
    // Cargar datos iniciales
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAchievementsController.useEffect": ()=>{
            loadAchievements();
        }
    }["useAchievementsController.useEffect"], [
        loadAchievements
    ]);
    return {
        state,
        achievements: state.achievements,
        userStats: state.userStats,
        userName: state.userName,
        userEmail: state.userEmail,
        loadAchievements,
        unlockAchievement,
        checkAndUnlockAchievements,
        xpToNextLevel: state.userStats ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$achievements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getXPToNextLevel"])(state.userStats.totalXP) : 100
    };
}
_s(useAchievementsController, "lsbCTeKf/as9NB+5lT1XbeF8ZC0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/components/home/BrainMap3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BrainMap3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function BrainMap3D({ achievements }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cameraRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rendererRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const brainRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const nodesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BrainMap3D.useEffect": ()=>{
            if (!containerRef.current) return;
            // Scene setup
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
            sceneRef.current = scene;
            // Camera
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](52, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
            camera.position.z = 4.2;
            camera.position.y = 0.2;
            cameraRef.current = camera;
            // Renderer
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                alpha: true,
                antialias: true
            });
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            containerRef.current.appendChild(renderer.domElement);
            rendererRef.current = renderer;
            // Brain group
            const brainGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            scene.add(brainGroup);
            brainRef.current = brainGroup;
            // Mouse parallax
            let mx = 0, my = 0;
            const onMouseMove = {
                "BrainMap3D.useEffect.onMouseMove": (e)=>{
                    const rect = containerRef.current.getBoundingClientRect();
                    mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                    my = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
                }
            }["BrainMap3D.useEffect.onMouseMove"];
            const container = containerRef.current;
            container.addEventListener('mousemove', onMouseMove);
            // Constellation ring
            const ringGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](2.1, 0.006, 16, 100);
            const ringMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0xff6b35,
                transparent: true,
                opacity: 0.15
            });
            const ring1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](ringGeo, ringMat);
            ring1.rotation.x = Math.PI * 0.45;
            brainGroup.add(ring1);
            const ringMat2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0xff006e,
                transparent: true,
                opacity: 0.12
            });
            const ring2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](2.3, 0.005, 16, 100), ringMat2);
            ring2.rotation.y = Math.PI * 0.35;
            brainGroup.add(ring2);
            // Create brain mesh (simplified brain shape using spheres)
            const brainMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0x12060a,
                transparent: true,
                opacity: 0.82,
                wireframe: false
            });
            const brainWireframeMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0xff6b35,
                transparent: true,
                opacity: 0.22,
                wireframe: true
            });
            // Main brain hemispheres
            const leftHemisphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](1.2, 32, 32), brainMaterial);
            leftHemisphere.position.x = -0.6;
            leftHemisphere.scale.set(1, 0.9, 1.1);
            brainGroup.add(leftHemisphere);
            const leftWireframe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](1.2, 32, 32), brainWireframeMaterial);
            leftWireframe.position.x = -0.6;
            leftWireframe.scale.set(1, 0.9, 1.1);
            brainGroup.add(leftWireframe);
            const rightHemisphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](1.2, 32, 32), brainMaterial);
            rightHemisphere.position.x = 0.6;
            rightHemisphere.scale.set(1, 0.9, 1.1);
            brainGroup.add(rightHemisphere);
            const rightWireframe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](1.2, 32, 32), brainWireframeMaterial);
            rightWireframe.position.x = 0.6;
            rightWireframe.scale.set(1, 0.9, 1.1);
            brainGroup.add(rightWireframe);
            // Brain stem
            const brainStem = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.3, 0.4, 1.5, 16), brainMaterial);
            brainStem.position.y = -1.2;
            brainGroup.add(brainStem);
            const stemWireframe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.3, 0.4, 1.5, 16), brainWireframeMaterial);
            stemWireframe.position.y = -1.2;
            brainGroup.add(stemWireframe);
            // Achievement nodes positions
            const nodePositions = [
                {
                    x: -0.8,
                    y: 0.8,
                    z: 0.5
                },
                {
                    x: 0.8,
                    y: 0.8,
                    z: 0.5
                },
                {
                    x: -1.0,
                    y: 0.2,
                    z: 0
                },
                {
                    x: 1.0,
                    y: 0.2,
                    z: 0
                },
                {
                    x: -0.6,
                    y: -0.5,
                    z: 0.3
                },
                {
                    x: 0.6,
                    y: -0.5,
                    z: 0.3
                },
                {
                    x: 0,
                    y: -0.8,
                    z: 0.5
                },
                {
                    x: 0,
                    y: 0.3,
                    z: 0.8
                }
            ];
            // Create achievement nodes
            const nodes = [];
            achievements.forEach({
                "BrainMap3D.useEffect": (achievement, i)=>{
                    if (i >= nodePositions.length) return;
                    const pos = nodePositions[i];
                    const nodeMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                        color: achievement.unlocked ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](achievement.color) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0x333333),
                        transparent: true,
                        opacity: achievement.unlocked ? 0.9 : 0.4
                    });
                    const nodeGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.15, 16, 16);
                    const node = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](nodeGeometry, nodeMaterial);
                    node.position.set(pos.x, pos.y, pos.z);
                    brainGroup.add(node);
                    nodes.push(node);
                    // Glow effect for unlocked nodes
                    if (achievement.unlocked) {
                        const glowGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.32, 16, 16);
                        const glowMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                            color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](achievement.color),
                            transparent: true,
                            opacity: 0.35,
                            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                            depthWrite: false
                        });
                        const glow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](glowGeometry, glowMaterial);
                        glow.position.set(pos.x, pos.y, pos.z);
                        brainGroup.add(glow);
                        nodes.push(glow);
                    }
                    // Connection lines
                    if (i > 0) {
                        const prevPos = nodePositions[i - 1];
                        const lineGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints([
                            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](prevPos.x, prevPos.y, prevPos.z),
                            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](pos.x, pos.y, pos.z)
                        ]);
                        const lineMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                            color: achievement.unlocked ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](achievement.color) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0x444444),
                            transparent: true,
                            opacity: achievement.unlocked ? 0.5 : 0.2
                        });
                        const line = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, lineMaterial);
                        brainGroup.add(line);
                    }
                }
            }["BrainMap3D.useEffect"]);
            nodesRef.current = nodes;
            // Ambient particles
            const particleGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const particleCount = 100;
            const positions = new Float32Array(particleCount * 3);
            for(let i = 0; i < particleCount * 3; i += 3){
                positions[i] = (Math.random() - 0.5) * 4;
                positions[i + 1] = (Math.random() - 0.5) * 4;
                positions[i + 2] = (Math.random() - 0.5) * 4;
            }
            particleGeometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
            const particleMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointsMaterial"]({
                color: 0xff6b35,
                size: 0.02,
                transparent: true,
                opacity: 0.6
            });
            const particles = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](particleGeometry, particleMaterial);
            scene.add(particles);
            // Animation loop
            let animationId;
            const animate = {
                "BrainMap3D.useEffect.animate": ()=>{
                    animationId = requestAnimationFrame(animate);
                    // Smooth mouse parallax + idle rotation
                    const t = Date.now() * 0.001;
                    if (brainGroup) {
                        brainGroup.rotation.y = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(brainGroup.rotation.y, t * 0.08 + mx * 0.5, 0.03);
                        brainGroup.rotation.x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(brainGroup.rotation.x, my * 0.3, 0.03);
                    }
                    // Animate rings
                    ring1.rotation.z -= 0.0015;
                    ring2.rotation.z += 0.0012;
                    // Animate nodes with a stronger pulse
                    nodesRef.current.forEach({
                        "BrainMap3D.useEffect.animate": (node, i)=>{
                            const material = node.material;
                            if (material && material.opacity > 0.3) {
                                const scale = 1 + Math.sin(t * 2 + i) * 0.15;
                                node.scale.setScalar(scale);
                            }
                        }
                    }["BrainMap3D.useEffect.animate"]);
                    // Animate particles
                    particles.rotation.y += 0.0005;
                    particles.rotation.x += 0.0002;
                    renderer.render(scene, camera);
                }
            }["BrainMap3D.useEffect.animate"];
            animate();
            // Handle resize
            const handleResize = {
                "BrainMap3D.useEffect.handleResize": ()=>{
                    if (!containerRef.current || !camera || !renderer) return;
                    camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
                }
            }["BrainMap3D.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            // Cleanup
            return ({
                "BrainMap3D.useEffect": ()=>{
                    window.removeEventListener('resize', handleResize);
                    container.removeEventListener('mousemove', onMouseMove);
                    cancelAnimationFrame(animationId);
                    if (renderer && container.contains(renderer.domElement)) {
                        container.removeChild(renderer.domElement);
                        renderer.dispose();
                    }
                    scene.clear();
                    brainGroup.traverse({
                        "BrainMap3D.useEffect": (obj)=>{
                            const mesh = obj;
                            if (mesh.geometry) mesh.geometry.dispose();
                            if (mesh.material) {
                                if (Array.isArray(mesh.material)) mesh.material.forEach({
                                    "BrainMap3D.useEffect": (m)=>m.dispose()
                                }["BrainMap3D.useEffect"]);
                                else mesh.material.dispose();
                            }
                        }
                    }["BrainMap3D.useEffect"]);
                }
            })["BrainMap3D.useEffect"];
        }
    }["BrainMap3D.useEffect"], [
        achievements
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        style: {
            width: '100%',
            height: '400px',
            position: 'relative'
        }
    }, void 0, false, {
        fileName: "[project]/components/home/BrainMap3D.tsx",
        lineNumber: 301,
        columnNumber: 5
    }, this);
}
_s(BrainMap3D, "s1VLIeKTWQh9NVP3sX6DOts7LlQ=");
_c = BrainMap3D;
var _c;
__turbopack_context__.k.register(_c, "BrainMap3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/home/STEMNews.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>STEMNews
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const STEM_NEWS = [
    {
        id: '1',
        title: 'Nuevos avances en computación cuántica: IBM anuncia procesador de 1000 qubits',
        summary: 'IBM revela su procesador cuántico más potente hasta la fecha, prometiendo revolucionar la criptografía y la simulación molecular.',
        tag: 'Computación Cuántica',
        tagColor: '#FF006E',
        date: '15 Jul 2026',
        url: '#',
        source: 'IBM Research'
    },
    {
        id: '2',
        title: 'IA generativa en medicina: Nuevo algoritmo detecta cáncer con 99% de precisión',
        summary: 'Investigadores desarrollan sistema de IA que identifica tumores en etapas tempranas superando a los métodos tradicionales.',
        tag: 'Inteligencia Artificial',
        tagColor: '#00E5A0',
        date: '12 Jul 2026',
        url: '#',
        source: 'Nature Medicine'
    },
    {
        id: '3',
        title: 'Misión espacial Europa: Descubren agua líquida en luna de Júpiter',
        summary: 'La sonda espacial confirma la presencia de océanos subsuperficiales en Europa, aumentando las posibilidades de vida extraterrestre.',
        tag: 'Espacio',
        tagColor: '#FFD700',
        date: '10 Jul 2026',
        url: '#',
        source: 'NASA'
    },
    {
        id: '4',
        title: 'Baterías de estado sólido: La tecnología que revolucionará los vehículos eléctricos',
        summary: 'Toyota anuncia baterías con 1000km de autonomía y carga en 10 minutos, marcando un hito en la movilidad sostenible.',
        tag: 'Energía',
        tagColor: '#FF6B00',
        date: '8 Jul 2026',
        url: '#',
        source: 'Toyota'
    }
];
function STEMNews() {
    _s();
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [expandedId, setExpandedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cardRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "STEMNews.useEffect": ()=>{
            if (containerRef.current) {
                const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].context({
                    "STEMNews.useEffect.ctx": ()=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo('.news-card', {
                            opacity: 0,
                            y: 20
                        }, {
                            opacity: 1,
                            y: 0,
                            stagger: 0.1,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                    }
                }["STEMNews.useEffect.ctx"], containerRef);
                return ({
                    "STEMNews.useEffect": ()=>ctx.revert()
                })["STEMNews.useEffect"];
            }
        }
    }["STEMNews.useEffect"], []);
    const handlePrev = ()=>{
        setActiveIndex((prev)=>(prev - 1 + STEM_NEWS.length) % STEM_NEWS.length);
    };
    const handleNext = ()=>{
        setActiveIndex((prev)=>(prev + 1) % STEM_NEWS.length);
    };
    const handleToggle = (id)=>{
        setExpandedId((prev)=>prev === id ? null : id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: '#FF6B00',
                            fontSize: '1rem'
                        },
                        children: "◎"
                    }, void 0, false, {
                        fileName: "[project]/components/home/STEMNews.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-black tracking-widest uppercase",
                        style: {
                            fontFamily: "'Orbitron', sans-serif",
                            color: '#ede0d4',
                            fontSize: '0.72rem',
                            letterSpacing: '0.2em'
                        },
                        children: "Noticias STEM"
                    }, void 0, false, {
                        fileName: "[project]/components/home/STEMNews.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 h-px",
                        style: {
                            background: 'rgba(255,107,53,0.15)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/STEMNews.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: 'rgba(200,150,120,0.35)',
                            fontFamily: "'Rajdhani', sans-serif",
                            fontSize: '0.62rem'
                        },
                        children: "Actualizadas semanalmente"
                    }, void 0, false, {
                        fileName: "[project]/components/home/STEMNews.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/STEMNews.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "news-card rounded-2xl border overflow-hidden",
                style: {
                    background: 'rgba(18,8,22,0.9)',
                    borderColor: 'rgba(180,60,40,0.2)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.5)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-5 pt-4 pb-3 border-b",
                        style: {
                            borderColor: 'rgba(180,60,40,0.12)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs tracking-widest uppercase font-bold",
                                style: {
                                    color: 'rgba(255,120,70,0.5)',
                                    fontFamily: "'Rajdhani', sans-serif",
                                    letterSpacing: '0.22em',
                                    fontSize: '0.58rem'
                                },
                                children: "✦ transmisión_athernix"
                            }, void 0, false, {
                                fileName: "[project]/components/home/STEMNews.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handlePrev,
                                        className: "w-7 h-7 rounded-lg flex items-center justify-center transition-all",
                                        style: {
                                            background: 'rgba(255,100,50,0.1)',
                                            border: '1px solid rgba(255,100,50,0.2)',
                                            color: '#ff6b35',
                                            cursor: 'pointer'
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.background = 'rgba(255,100,50,0.22)',
                                        onMouseLeave: (e)=>e.currentTarget.style.background = 'rgba(255,100,50,0.1)',
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: 2,
                                            className: "w-4 h-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                d: "M15.75 19.5 8.25 12l7.5-7.5"
                                            }, void 0, false, {
                                                fileName: "[project]/components/home/STEMNews.tsx",
                                                lineNumber: 122,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/STEMNews.tsx",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/STEMNews.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleNext,
                                        className: "w-7 h-7 rounded-lg flex items-center justify-center transition-all",
                                        style: {
                                            background: 'rgba(255,100,50,0.1)',
                                            border: '1px solid rgba(255,100,50,0.2)',
                                            color: '#ff6b35',
                                            cursor: 'pointer'
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.background = 'rgba(255,100,50,0.22)',
                                        onMouseLeave: (e)=>e.currentTarget.style.background = 'rgba(255,100,50,0.1)',
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
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
                                                fileName: "[project]/components/home/STEMNews.tsx",
                                                lineNumber: 131,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/STEMNews.tsx",
                                            lineNumber: 130,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/STEMNews.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/home/STEMNews.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/STEMNews.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-5",
                        children: [
                            STEM_NEWS.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: index === activeIndex ? 'block' : 'hidden',
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider",
                                                    style: {
                                                        background: `${item.tagColor}18`,
                                                        border: `1px solid ${item.tagColor}50`,
                                                        color: item.tagColor,
                                                        fontFamily: "'Rajdhani', sans-serif"
                                                    },
                                                    children: item.tag
                                                }, void 0, false, {
                                                    fileName: "[project]/components/home/STEMNews.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs ml-auto",
                                                    style: {
                                                        color: 'rgba(200,150,120,0.4)',
                                                        fontFamily: "'Rajdhani', sans-serif"
                                                    },
                                                    children: [
                                                        item.date,
                                                        " · ",
                                                        item.source
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/home/STEMNews.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/home/STEMNews.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-black mb-2 leading-snug",
                                            style: {
                                                fontFamily: "'Orbitron', sans-serif",
                                                color: '#e8d5c8',
                                                letterSpacing: '0.03em',
                                                fontSize: '0.9rem'
                                            },
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/STEMNews.tsx",
                                            lineNumber: 149,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs leading-relaxed transition-all duration-300",
                                            style: {
                                                color: 'rgba(200,160,140,0.75)',
                                                fontFamily: "'Rajdhani', sans-serif",
                                                display: '-webkit-box',
                                                WebkitLineClamp: expandedId === item.id ? 'unset' : 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: expandedId === item.id ? 'visible' : 'hidden'
                                            },
                                            children: item.summary
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/STEMNews.tsx",
                                            lineNumber: 153,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleToggle(item.id),
                                            className: "mt-3 flex items-center gap-1 text-xs font-semibold tracking-wider uppercase",
                                            style: {
                                                color: item.tagColor,
                                                fontFamily: "'Rajdhani', sans-serif",
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: 0
                                            },
                                            onMouseEnter: (e)=>e.currentTarget.style.opacity = '0.7',
                                            onMouseLeave: (e)=>e.currentTarget.style.opacity = '1',
                                            children: expandedId === item.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeWidth: 2,
                                                        className: "w-4 h-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            d: "m4.5 15.75 7.5-7.5 7.5 7.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/home/STEMNews.tsx",
                                                            lineNumber: 167,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/home/STEMNews.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Leer menos"
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeWidth: 2,
                                                        className: "w-4 h-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            d: "m19.5 8.25-7.5 7.5-7.5-7.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/home/STEMNews.tsx",
                                                            lineNumber: 174,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/home/STEMNews.tsx",
                                                        lineNumber: 173,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Leer más"
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/STEMNews.tsx",
                                            lineNumber: 159,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/components/home/STEMNews.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-2 pb-4 mt-4",
                                children: STEM_NEWS.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveIndex(i),
                                        style: {
                                            width: activeIndex === i ? 20 : 6,
                                            height: 6,
                                            borderRadius: 9999,
                                            background: activeIndex === i ? 'linear-gradient(90deg,#ff4e50,#f7931e)' : 'rgba(255,100,50,0.25)',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s',
                                            boxShadow: activeIndex === i ? '0 0 8px rgba(255,100,50,0.5)' : 'none'
                                        }
                                    }, i, false, {
                                        fileName: "[project]/components/home/STEMNews.tsx",
                                        lineNumber: 185,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/home/STEMNews.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/STEMNews.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/STEMNews.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                children: STEM_NEWS.slice(1).map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "news-card group block rounded-2xl p-4 border transition-all duration-200 cursor-pointer",
                        style: {
                            background: 'rgba(18,8,22,0.88)',
                            borderColor: 'rgba(180,60,40,0.18)'
                        },
                        onMouseEnter: (e)=>{
                            const el = e.currentTarget;
                            el.style.borderColor = `${item.tagColor}45`;
                            el.style.background = 'rgba(18,8,22,0.95)';
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(el, {
                                y: -4,
                                duration: 0.2,
                                ease: 'power2.out'
                            });
                        },
                        onMouseLeave: (e)=>{
                            const el = e.currentTarget;
                            el.style.borderColor = 'rgba(180,60,40,0.18)';
                            el.style.background = 'rgba(18,8,22,0.88)';
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(el, {
                                y: 0,
                                duration: 0.2,
                                ease: 'power2.out'
                            });
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-2 py-0.5 rounded-full text-xs font-bold tracking-wider",
                                        style: {
                                            background: `${item.tagColor}18`,
                                            border: `1px solid ${item.tagColor}45`,
                                            color: item.tagColor,
                                            fontFamily: "'Rajdhani', sans-serif",
                                            fontSize: '0.58rem',
                                            letterSpacing: '0.15em'
                                        },
                                        children: item.tag
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/STEMNews.tsx",
                                        lineNumber: 214,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs ml-auto",
                                        style: {
                                            color: 'rgba(200,150,120,0.4)',
                                            fontFamily: "'Rajdhani', sans-serif",
                                            fontSize: '0.6rem'
                                        },
                                        children: item.date
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/STEMNews.tsx",
                                        lineNumber: 218,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/home/STEMNews.tsx",
                                lineNumber: 213,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "font-bold text-sm mb-1.5 leading-snug",
                                style: {
                                    color: '#ede0d4',
                                    fontFamily: "'Rajdhani', sans-serif",
                                    letterSpacing: '0.02em'
                                },
                                children: item.title
                            }, void 0, false, {
                                fileName: "[project]/components/home/STEMNews.tsx",
                                lineNumber: 222,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs leading-relaxed line-clamp-2",
                                style: {
                                    color: 'rgba(200,150,120,0.55)',
                                    fontFamily: '"Rajdhani", sans-serif'
                                },
                                children: item.summary
                            }, void 0, false, {
                                fileName: "[project]/components/home/STEMNews.tsx",
                                lineNumber: 226,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 mt-3 text-xs font-bold tracking-wider",
                                style: {
                                    color: item.tagColor,
                                    fontFamily: "'Rajdhani', sans-serif",
                                    letterSpacing: '0.1em',
                                    fontSize: '0.62rem'
                                },
                                children: [
                                    "LEER MÁS",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: 2.5,
                                        className: "w-3 h-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            d: "m8.25 4.5 7.5 7.5-7.5 7.5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/STEMNews.tsx",
                                            lineNumber: 234,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/STEMNews.tsx",
                                        lineNumber: 233,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/home/STEMNews.tsx",
                                lineNumber: 230,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/components/home/STEMNews.tsx",
                        lineNumber: 198,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/home/STEMNews.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/STEMNews.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
_s(STEMNews, "0nkx/nMJkE6TvzF/XJvNF6Xm63M=");
_c = STEMNews;
var _c;
__turbopack_context__.k.register(_c, "STEMNews");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/home/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/SplitText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.mjs [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/headphones.mjs [app-client] (ecmascript) <export default as Headphones>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map.mjs [app-client] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.mjs [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.mjs [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.mjs [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.mjs [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rocket.mjs [app-client] (ecmascript) <export default as Rocket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flask-conical.mjs [app-client] (ecmascript) <export default as FlaskConical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shapes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shapes$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shapes.mjs [app-client] (ecmascript) <export default as Shapes>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circuit$2d$board$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircuitBoard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circuit-board.mjs [app-client] (ecmascript) <export default as CircuitBoard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/brain.mjs [app-client] (ecmascript) <export default as Brain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.mjs [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.mjs [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/compass.mjs [app-client] (ecmascript) <export default as Compass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scroll$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scroll.mjs [app-client] (ecmascript) <export default as Scroll>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.mjs [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$home$2f$achievementsController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/controllers/home/achievementsController.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$information$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/controllers/information/headset.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$missions$2f$missionsController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/controllers/missions/missionsController.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$BrainMap3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/BrainMap3D.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$STEMNews$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/STEMNews.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$achievements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/achievements.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/missions.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
// view/HomeView.tsx - Nuevo Home con Mapa Cerebral 3D
'use client';
;
;
;
;
;
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
// ── Icon mapping for achievement categories ─────────────────────────
const CATEGORY_ICONS = {
    Compass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__["Compass"],
    BookOpen: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
    Users: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
    Trophy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"]
};
// ── Icon mapping for mission categories ───────────────────────────
const MISSION_CATEGORY_ICONS = {
    Scroll: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scroll$3e$__["Scroll"],
    Globe: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
    Brain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"]
};
if ("TURBOPACK compile-time truthy", 1) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SplitText"]);
}
function magneticMove(e, strength = 0.25) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        x,
        y,
        duration: 0.3,
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
function tiltMove(e, lift = -5, max = 12) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        y: lift,
        rotationY: px * max,
        rotationX: -py * max,
        transformPerspective: 700,
        duration: 0.35,
        ease: 'power2.out'
    });
}
function tiltReset(e) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.45,
        ease: 'power2.out'
    });
}
// ── Stat Badge Component ─────────────────────────────────────
function StatBadge({ icon: Icon, value, label, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "stat-badge flex flex-col items-center gap-1.5 px-4 py-4 rounded-2xl border cursor-default",
        style: {
            background: 'rgba(18,8,22,0.9)',
            borderColor: 'rgba(255,107,53,0.2)',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
        },
        onMouseMove: (e)=>{
            e.currentTarget.style.borderColor = color + '60';
            e.currentTarget.style.boxShadow = `0 0 28px ${color}30`;
            tiltMove(e, -6, 14);
        },
        onMouseLeave: (e)=>{
            e.currentTarget.style.borderColor = 'rgba(255,107,53,0.2)';
            e.currentTarget.style.boxShadow = 'none';
            tiltReset(e);
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: '1.25rem',
                    color,
                    filter: `drop-shadow(0 0 6px ${color})`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/app/home/page.tsx",
                    lineNumber: 89,
                    columnNumber: 93
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-2xl font-black",
                style: {
                    fontFamily: F_BE,
                    color,
                    fontSize: '1.3rem',
                    letterSpacing: '-0.02em'
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs uppercase tracking-widest font-bold",
                style: {
                    color: 'rgba(200,150,120,0.5)',
                    fontFamily: F_MONO,
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em'
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/home/page.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_c = StatBadge;
// ── Quick Action Card Component ───────────────────────────────
function QuickActionCard({ icon: Icon, title, desc, href, color, glow }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        ref: ref,
        className: "quick-card relative overflow-hidden cursor-pointer rounded-2xl border",
        style: {
            background: 'rgba(18,8,22,0.9)',
            borderColor: 'rgba(255,107,53,0.2)',
            padding: '1.25rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            textDecoration: 'none',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
        },
        onMouseMove: (e)=>{
            e.currentTarget.style.borderColor = color + '60';
            e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.6), 0 0 30px ${glow}`;
            tiltMove(e, -8, 12);
        },
        onMouseLeave: (e)=>{
            e.currentTarget.style.borderColor = 'rgba(255,107,53,0.2)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
            tiltReset(e);
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none",
                style: {
                    background: `radial-gradient(circle,${glow} 0%,transparent 70%)`,
                    filter: 'blur(20px)',
                    transform: 'translate(30%,-30%)'
                }
            }, void 0, false, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3",
                style: {
                    background: `${color}20`,
                    border: `1px solid ${color}50`,
                    color,
                    filter: `drop-shadow(0 0 6px ${color})`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/app/home/page.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs tracking-widest uppercase mb-1 font-bold",
                style: {
                    color: `${color}aa`,
                    fontFamily: F_MONO,
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em'
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "font-black text-base mb-2",
                style: {
                    fontFamily: F_BE,
                    color: '#e8d5c8',
                    fontSize: '0.9rem',
                    letterSpacing: '0.04em'
                },
                children: desc
            }, void 0, false, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase",
                style: {
                    color,
                    fontFamily: F_MONO
                },
                children: [
                    "Acceder ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                        size: 14
                    }, void 0, false, {
                        fileName: "[project]/app/home/page.tsx",
                        lineNumber: 125,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/home/page.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_s(QuickActionCard, "QMBuJFIdzLIeqBcFwhMf246mjOM=");
_c1 = QuickActionCard;
function HomeView() {
    _s1();
    const { state: achievementsState, achievements, userStats, xpToNextLevel, userName } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$home$2f$achievementsController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAchievementsController"])();
    const { state: headsetState, currentMeta } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$information$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMyHeadsetsController"])();
    const { state: missionsState, getFilteredMissions, getMissionStats } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$missions$2f$missionsController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMissionsController"])();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeView.useEffect": ()=>{
            const root = containerRef.current;
            if (!root) return;
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            let split = null;
            const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].context({
                "HomeView.useEffect.ctx": ()=>{
                    // Ambient orb pulse + scroll parallax
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.orb-home1', {
                        scale: 1.2,
                        opacity: 0.5,
                        duration: 5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut'
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.orb-home2', {
                        scale: 1.15,
                        opacity: 0.35,
                        duration: 7,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                        delay: 2
                    });
                    if (!prefersReduced) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.orb-home1', {
                            y: -80,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: root,
                                start: 'top top',
                                end: 'bottom top',
                                scrub: 1
                            }
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.orb-home2', {
                            y: 120,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: root,
                                start: 'top top',
                                end: 'bottom top',
                                scrub: 1
                            }
                        });
                    }
                    // Scroll progress bar
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set('.home-progress-bar', {
                        scaleX: 0
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.home-progress-bar', {
                        scaleX: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: root,
                            start: 'top top',
                            end: 'bottom bottom',
                            scrub: 0.3
                        }
                    });
                    // Hero entrance with SplitText
                    const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                        defaults: {
                            ease: 'power3.out'
                        }
                    });
                    tl.fromTo('.hero-badge', {
                        opacity: 0,
                        y: -20,
                        scale: 0.9
                    }, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        ease: 'back.out(1.7)'
                    });
                    const titleEl = root.querySelector('.hero-title .grad-text') ?? null;
                    if (titleEl && !prefersReduced) {
                        split = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SplitText"](titleEl, {
                            type: 'chars'
                        });
                        tl.fromTo(split.chars, {
                            opacity: 0,
                            yPercent: 120,
                            rotationX: -80
                        }, {
                            opacity: 1,
                            yPercent: 0,
                            rotationX: 0,
                            duration: 0.9,
                            stagger: 0.025,
                            ease: 'back.out(1.7)'
                        }, '-=0.2');
                    } else {
                        tl.fromTo('.hero-title', {
                            opacity: 0,
                            y: 50,
                            rotateX: 15
                        }, {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            duration: 0.8,
                            ease: 'power3.out'
                        }, '-=0.3');
                    }
                    tl.fromTo('.hero-sub', {
                        opacity: 0,
                        y: 20
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5
                    }, '-=0.4');
                    if (userStats) {
                        const statBadges = document.querySelectorAll('.stat-badge');
                        if (statBadges.length > 0) {
                            tl.fromTo('.stat-badge', {
                                opacity: 0,
                                y: 30,
                                scale: 0.8
                            }, {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                stagger: 0.1,
                                duration: 0.5,
                                ease: 'back.out(1.5)'
                            }, '-=0.2');
                        }
                    }
                    tl.fromTo('.section-hdr', {
                        opacity: 0,
                        x: -30
                    }, {
                        opacity: 1,
                        x: 0,
                        stagger: 0.15,
                        duration: 0.6
                    }, '-=0.1').fromTo('.quick-card', {
                        opacity: 0,
                        y: 40,
                        rotateY: -10
                    }, {
                        opacity: 1,
                        y: 0,
                        rotateY: 0,
                        stagger: 0.08,
                        duration: 0.5,
                        ease: 'power3.out'
                    }, '-=0.3');
                    tl.fromTo('.mission-progress-card', {
                        opacity: 0,
                        y: 30,
                        rotateX: 20
                    }, {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        stagger: 0.1,
                        duration: 0.6,
                        ease: 'power3.out'
                    }, '-=0.2');
                    if (userStats) {
                        tl.fromTo('.xp-progress-card', {
                            opacity: 0,
                            y: 30,
                            rotateX: 20
                        }, {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            duration: 0.6,
                            ease: 'power3.out'
                        }, '-=0.4');
                    }
                    // Scroll-triggered reveals for sections that come later
                    const revealSelectors = [
                        '.mission-card',
                        '.objects-section',
                        '.stem-news-wrap'
                    ];
                    revealSelectors.forEach({
                        "HomeView.useEffect.ctx": (sel)=>{
                            const els = document.querySelectorAll(sel);
                            if (els.length === 0) return;
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(els, {
                                opacity: 0,
                                y: 36
                            }, {
                                opacity: 1,
                                y: 0,
                                duration: 0.7,
                                stagger: 0.08,
                                ease: 'power3.out',
                                scrollTrigger: {
                                    trigger: els[0],
                                    start: 'top 85%',
                                    toggleActions: 'play none none reverse'
                                }
                            });
                        }
                    }["HomeView.useEffect.ctx"]);
                    // Continuous floating effect for cards
                    if (!prefersReduced) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.quick-card', {
                            y: -3,
                            duration: 4,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut',
                            stagger: {
                                each: 0.2,
                                from: 'random'
                            }
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.stat-badge', {
                            y: -2,
                            duration: 3,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut',
                            stagger: {
                                each: 0.15,
                                from: 'random'
                            }
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.mission-progress-card', {
                            y: -2,
                            duration: 3.5,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut',
                            stagger: {
                                each: 0.1,
                                from: 'random'
                            }
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.xp-progress-card', {
                            y: -2,
                            duration: 3.5,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut'
                        });
                    }
                }
            }["HomeView.useEffect.ctx"], containerRef);
            return ({
                "HomeView.useEffect": ()=>{
                    split?.revert();
                    ctx.revert();
                }
            })["HomeView.useEffect"];
        }
    }["HomeView.useEffect"], [
        userStats
    ]);
    // ── Award-winning buttery smooth scroll (Lenis, synced with ScrollTrigger) ──
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeView.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            let lenis = null;
            let pollId = null;
            let cancelled = false;
            const onTick = {
                "HomeView.useEffect.onTick": (time)=>{
                    lenis?.raf(time * 1000);
                }
            }["HomeView.useEffect.onTick"];
            const trySetup = {
                "HomeView.useEffect.trySetup": ()=>{
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
                            "HomeView.useEffect.trySetup": (t)=>1 - Math.pow(1 - t, 3)
                        }["HomeView.useEffect.trySetup"]
                    });
                    lenis.on('scroll', {
                        "HomeView.useEffect.trySetup": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].update()
                    }["HomeView.useEffect.trySetup"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.add(onTick);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.lagSmoothing(0);
                }
            }["HomeView.useEffect.trySetup"];
            trySetup();
            return ({
                "HomeView.useEffect": ()=>{
                    cancelled = true;
                    if (pollId) clearTimeout(pollId);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.remove(onTick);
                    lenis?.destroy();
                }
            })["HomeView.useEffect"];
        }
    }["HomeView.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        :root {
          --pink: #FF006E;
          --orange: #FF6B00;
          --yellow: #FFD700;
        }
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        @keyframes sline{0%,100%{opacity:0.2;transform:scaleY(0.7)}50%{opacity:1;transform:scaleY(1)}}
      `
            }, void 0, false, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 248,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "relative min-h-screen overflow-x-hidden",
                style: {
                    background: 'linear-gradient(135deg,#08040c 0%,#120818 50%,#08040c 100%)',
                    fontFamily: F_MONO
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "home-progress-bar fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left",
                        style: {
                            background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))',
                            boxShadow: '0 0 12px rgba(255,107,53,0.4)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/home/page.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "home-bg-grid fixed inset-0 pointer-events-none z-0",
                        style: {
                            backgroundImage: 'linear-gradient(rgba(255,107,53,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,53,0.03) 1px,transparent 1px)',
                            backgroundSize: '40px 40px',
                            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%,#000 0%,transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%,#000 0%,transparent 70%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/home/page.tsx",
                        lineNumber: 267,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "orb-home1 fixed pointer-events-none rounded-full",
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
                        fileName: "[project]/app/home/page.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "orb-home2 fixed pointer-events-none rounded-full",
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
                        fileName: "[project]/app/home/page.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mb-16",
                                style: {
                                    position: 'relative'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-ring",
                                        "aria-hidden": "true",
                                        style: {
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%,-50%)',
                                            width: 'min(46vw,420px)',
                                            height: 'min(46vw,420px)',
                                            borderRadius: '50%',
                                            border: '1px solid rgba(255,107,53,0.15)',
                                            pointerEvents: 'none',
                                            zIndex: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                            children: `
                .hero-ring::before,.hero-ring::after{content:'';position:absolute;border-radius:50%;inset:0;border:1px solid rgba(255,107,53,0.1);}
                .hero-ring::before{transform:rotateX(60deg) scale(.8)}
                .hero-ring::after{transform:rotateY(60deg) scale(.55);border-color:rgba(255,0,110,0.12)}
                @media (prefers-reduced-motion: no-preference){
                  @keyframes hero-ring-spin{from{transform:translate(-50%,-50%) rotateZ(0deg)}to{transform:translate(-50%,-50%) rotateZ(360deg)}}
                  .hero-ring{animation:hero-ring-spin 24s linear infinite}
                }
              `
                                        }, void 0, false, {
                                            fileName: "[project]/app/home/page.tsx",
                                            lineNumber: 288,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-corner",
                                        style: {
                                            position: 'absolute',
                                            top: '8%',
                                            left: '8%',
                                            width: 30,
                                            height: 30,
                                            border: '2px solid rgba(255,107,53,0.35)',
                                            borderRight: 'none',
                                            borderBottom: 'none'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 298,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-corner",
                                        style: {
                                            position: 'absolute',
                                            top: '8%',
                                            right: '8%',
                                            width: 30,
                                            height: 30,
                                            border: '2px solid rgba(255,107,53,0.35)',
                                            borderLeft: 'none',
                                            borderBottom: 'none'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 299,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-corner",
                                        style: {
                                            position: 'absolute',
                                            bottom: '8%',
                                            left: '8%',
                                            width: 30,
                                            height: 30,
                                            border: '2px solid rgba(255,107,53,0.35)',
                                            borderRight: 'none',
                                            borderTop: 'none'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 300,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-corner",
                                        style: {
                                            position: 'absolute',
                                            bottom: '8%',
                                            right: '8%',
                                            width: 30,
                                            height: 30,
                                            border: '2px solid rgba(255,107,53,0.35)',
                                            borderLeft: 'none',
                                            borderTop: 'none'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-badge flex items-center justify-center gap-2 mb-8",
                                        style: {
                                            position: 'relative',
                                            zIndex: 1
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 px-5 py-2 rounded-full",
                                            style: {
                                                background: 'rgba(255,107,53,0.1)',
                                                border: '2px solid rgba(255,107,53,0.25)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: 'var(--orange)',
                                                        fontSize: '0.8rem'
                                                    },
                                                    children: "◈"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/home/page.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-bold tracking-widest uppercase",
                                                    style: {
                                                        color: 'rgba(255,107,53,0.8)',
                                                        fontFamily: F_MONO,
                                                        letterSpacing: '0.25em',
                                                        fontSize: '0.7rem'
                                                    },
                                                    children: userName ? `Hola, ${userName}` : 'Bienvenido de nuevo'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/home/page.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: '50%',
                                                        background: '#00e5a0',
                                                        boxShadow: '0 0 10px #00e5a0',
                                                        display: 'inline-block',
                                                        animation: 'pulse 2s infinite'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/home/page.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/home/page.tsx",
                                            lineNumber: 303,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "hero-title font-black leading-none mb-6",
                                        style: {
                                            fontFamily: F_BE,
                                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                                            letterSpacing: '-0.02em'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "grad-text",
                                            style: {
                                                background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                display: 'inline-block'
                                            },
                                            children: "ATHERNIX"
                                        }, void 0, false, {
                                            fileName: "[project]/app/home/page.tsx",
                                            lineNumber: 317,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 315,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "hero-sub text-base max-w-2xl mx-auto mb-8 leading-relaxed",
                                        style: {
                                            color: 'rgba(200,160,140,0.7)',
                                            fontFamily: F_MONO,
                                            letterSpacing: '0.04em',
                                            fontSize: '1rem'
                                        },
                                        children: "Tu plataforma de aprendizaje VR inmersivo. Explora, aprende y evoluciona con Ather IA."
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 322,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-scroll",
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 10,
                                            marginTop: 20,
                                            opacity: 0.45
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: 1,
                                                    height: 48,
                                                    background: 'linear-gradient(to bottom,var(--orange),transparent)',
                                                    animation: 'sline 2s ease-in-out infinite'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 327,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: F_MONO,
                                                    fontSize: 9,
                                                    letterSpacing: '0.2em',
                                                    color: 'rgba(255,255,255,0.35)'
                                                },
                                                children: "DESCUBRIR"
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 328,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 326,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/home/page.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this),
                            userStats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBadge, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"],
                                        value: userStats.activeDays.toString(),
                                        label: "Días Activos",
                                        color: "var(--orange)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 335,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBadge, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
                                        value: userStats.totalXP.toString(),
                                        label: "XP Total",
                                        color: "#00E5A0"
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 336,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBadge, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"],
                                        value: userStats.level.toString(),
                                        label: "Nivel",
                                        color: "var(--yellow)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 337,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBadge, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"],
                                        value: userStats.missionsCompleted.toString(),
                                        label: "Misiones",
                                        color: "var(--pink)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 338,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBadge, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
                                        value: userStats.topicsExplored.toString(),
                                        label: "Temas",
                                        color: "var(--orange)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 339,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBadge, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
                                        value: `${userStats.hoursSpent}h`,
                                        label: "Horas",
                                        color: "#00E5A0"
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 340,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/home/page.tsx",
                                lineNumber: 334,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "lg:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "section-hdr flex items-center gap-3 mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
                                                        size: 20,
                                                        style: {
                                                            color: 'var(--orange)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 350,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "font-black tracking-widest uppercase",
                                                        style: {
                                                            fontFamily: F_BE,
                                                            color: '#ede0d4',
                                                            fontSize: '0.85rem',
                                                            letterSpacing: '0.2em'
                                                        },
                                                        children: "MAPA CEREBRAL"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 351,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 h-px",
                                                        style: {
                                                            background: 'rgba(255,107,53,0.15)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-bold",
                                                        style: {
                                                            color: 'rgba(255,107,53,0.5)',
                                                            fontFamily: F_MONO,
                                                            fontSize: '0.7rem'
                                                        },
                                                        children: [
                                                            achievements.filter((a)=>a.unlocked).length,
                                                            "/",
                                                            achievements.length,
                                                            " desbloqueados"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 356,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 349,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-2xl border overflow-hidden",
                                                style: {
                                                    background: 'rgba(18,8,22,0.9)',
                                                    borderColor: 'rgba(255,107,53,0.2)',
                                                    boxShadow: '0 8px 40px rgba(0,0,0,0.5)'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$BrainMap3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    achievements: achievements
                                                }, void 0, false, {
                                                    fileName: "[project]/app/home/page.tsx",
                                                    lineNumber: 363,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 361,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5",
                                                children: Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$models$2f$achievements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACHIEVEMENT_CATEGORIES"]).map(([key, cat])=>{
                                                    const IconComponent = CATEGORY_ICONS[cat.icon];
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-xl p-4 border",
                                                        style: {
                                                            background: 'rgba(18,8,22,0.7)',
                                                            borderColor: 'rgba(255,107,53,0.15)'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-2",
                                                                children: [
                                                                    IconComponent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            color: cat.color,
                                                                            fontSize: '1.2rem'
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                                            size: 20
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/home/page.tsx",
                                                                            lineNumber: 376,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/home/page.tsx",
                                                                        lineNumber: 375,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-bold",
                                                                        style: {
                                                                            color: cat.color,
                                                                            fontFamily: F_MONO
                                                                        },
                                                                        children: cat.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/home/page.tsx",
                                                                        lineNumber: 379,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/home/page.tsx",
                                                                lineNumber: 373,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-bold",
                                                                style: {
                                                                    color: 'rgba(200,150,120,0.5)',
                                                                    fontFamily: F_MONO
                                                                },
                                                                children: [
                                                                    achievements.filter((a)=>a.category === key && a.unlocked).length,
                                                                    " desbloqueados"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/home/page.tsx",
                                                                lineNumber: 383,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, key, true, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 371,
                                                        columnNumber: 21
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 367,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 348,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "section-hdr flex items-center gap-3 mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                        size: 20,
                                                        style: {
                                                            color: 'var(--orange)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 395,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "font-black tracking-widest uppercase",
                                                        style: {
                                                            fontFamily: F_BE,
                                                            color: '#ede0d4',
                                                            fontSize: '0.85rem',
                                                            letterSpacing: '0.2em'
                                                        },
                                                        children: "ACCIONES RÁPIDAS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 h-px",
                                                        style: {
                                                            background: 'rgba(255,107,53,0.15)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 400,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 394,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickActionCard, {
                                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"],
                                                        title: "Ather IA",
                                                        desc: "Chatbot inteligente",
                                                        href: "/chatbot",
                                                        color: "#00E5A0",
                                                        glow: "rgba(0,229,160,0.3)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 404,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickActionCard, {
                                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__["Headphones"],
                                                        title: "Headsets",
                                                        desc: "Configurar dispositivo VR",
                                                        href: "/headsets",
                                                        color: "var(--orange)",
                                                        glow: "rgba(255,107,53,0.3)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 412,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickActionCard, {
                                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"],
                                                        title: "Desarrollo",
                                                        desc: "Temarios STEM",
                                                        href: "/development",
                                                        color: "var(--pink)",
                                                        glow: "rgba(255,0,110,0.3)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 420,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 403,
                                                columnNumber: 15
                                            }, this),
                                            userStats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "xp-progress-card mt-5 rounded-2xl border p-5",
                                                style: {
                                                    background: 'rgba(18,8,22,0.7)',
                                                    borderColor: 'rgba(255,107,53,0.15)'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between mb-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-bold",
                                                                style: {
                                                                    color: 'rgba(255,107,53,0.7)',
                                                                    fontFamily: F_MONO,
                                                                    letterSpacing: '0.15em'
                                                                },
                                                                children: [
                                                                    "PROGRESO NIVEL ",
                                                                    userStats.level
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/home/page.tsx",
                                                                lineNumber: 435,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-bold",
                                                                style: {
                                                                    color: 'rgba(200,150,120,0.5)',
                                                                    fontFamily: F_MONO
                                                                },
                                                                children: [
                                                                    xpToNextLevel,
                                                                    " XP para siguiente nivel"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/home/page.tsx",
                                                                lineNumber: 438,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 434,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-full h-3 rounded-full overflow-hidden",
                                                        style: {
                                                            background: 'rgba(255,107,53,0.2)'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-full transition-all duration-500",
                                                            style: {
                                                                width: `${userStats.totalXP % 100 / 100 * 100}%`,
                                                                background: 'linear-gradient(90deg,var(--orange),var(--yellow))',
                                                                boxShadow: '0 0 12px rgba(255,107,53,0.5)'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/home/page.tsx",
                                                            lineNumber: 444,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 442,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 432,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 393,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/home/page.tsx",
                                lineNumber: 345,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mission-progress-section mb-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "section-hdr flex items-center gap-3 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                                size: 20,
                                                style: {
                                                    color: 'var(--yellow)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 459,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-black tracking-widest uppercase",
                                                style: {
                                                    fontFamily: F_BE,
                                                    color: '#ede0d4',
                                                    fontSize: '0.85rem',
                                                    letterSpacing: '0.2em'
                                                },
                                                children: "PROGRESO POR CATEGORÍA"
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 460,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 h-px",
                                                style: {
                                                    background: 'rgba(255,215,0,0.15)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 464,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 458,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-3 gap-5",
                                        children: Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$models$2f$missions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["missionTypeMeta"]).map(([type, meta])=>{
                                            const typeMissions = getFilteredMissions().filter((m)=>m.type === type);
                                            const completed = typeMissions.filter((m)=>m.status === 'completed').length;
                                            const progress = typeMissions.length > 0 ? Math.round(completed / typeMissions.length * 100) : 0;
                                            const IconComponent = MISSION_CATEGORY_ICONS[meta.icon];
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mission-progress-card rounded-2xl border p-5",
                                                style: {
                                                    background: 'rgba(18,8,22,0.9)',
                                                    borderColor: `${meta.color}30`,
                                                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                                                    transformStyle: 'preserve-3d',
                                                    willChange: 'transform'
                                                },
                                                onMouseMove: (e)=>{
                                                    e.currentTarget.style.borderColor = `${meta.color}70`;
                                                    e.currentTarget.style.boxShadow = `0 16px 44px rgba(0,0,0,0.55), 0 0 36px ${meta.color}25`;
                                                    tiltMove(e, -6, 10);
                                                },
                                                onMouseLeave: (e)=>{
                                                    e.currentTarget.style.borderColor = `${meta.color}30`;
                                                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
                                                    tiltReset(e);
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between mb-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-12 h-12 rounded-xl flex items-center justify-center",
                                                                        style: {
                                                                            background: `${meta.color}20`,
                                                                            border: `1px solid ${meta.color}50`
                                                                        },
                                                                        children: IconComponent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                color: meta.color
                                                                            },
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                                                size: 24
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/home/page.tsx",
                                                                                lineNumber: 485,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/home/page.tsx",
                                                                            lineNumber: 484,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/home/page.tsx",
                                                                        lineNumber: 481,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                className: "font-black text-lg",
                                                                                style: {
                                                                                    fontFamily: F_BE,
                                                                                    color: '#e8d5c8',
                                                                                    letterSpacing: '0.02em'
                                                                                },
                                                                                children: meta.label
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/home/page.tsx",
                                                                                lineNumber: 490,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs",
                                                                                style: {
                                                                                    color: 'rgba(200,160,140,0.5)',
                                                                                    fontFamily: F_MONO
                                                                                },
                                                                                children: [
                                                                                    completed,
                                                                                    "/",
                                                                                    typeMissions.length,
                                                                                    " misiones"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/home/page.tsx",
                                                                                lineNumber: 493,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/home/page.tsx",
                                                                        lineNumber: 489,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/home/page.tsx",
                                                                lineNumber: 480,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-2xl font-black",
                                                                style: {
                                                                    fontFamily: F_BE,
                                                                    color: meta.color
                                                                },
                                                                children: [
                                                                    progress,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/home/page.tsx",
                                                                lineNumber: 498,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 479,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mb-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-3 rounded-full overflow-hidden",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.1)'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-full rounded-full transition-all duration-700 ease-out",
                                                                style: {
                                                                    width: `${progress}%`,
                                                                    background: `linear-gradient(90deg,${meta.color},${meta.color}80)`,
                                                                    boxShadow: `0 0 15px ${meta.color}40`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/home/page.tsx",
                                                                lineNumber: 511,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/home/page.tsx",
                                                            lineNumber: 507,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs leading-relaxed",
                                                        style: {
                                                            color: 'rgba(200,160,140,0.5)',
                                                            fontFamily: F_MONO
                                                        },
                                                        children: meta.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 522,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, type, true, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 475,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 467,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/home/page.tsx",
                                lineNumber: 457,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-12 available-missions-section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "section-hdr flex items-center gap-3 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__["Rocket"], {
                                                size: 20,
                                                style: {
                                                    color: 'var(--pink)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 534,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-black tracking-widest uppercase",
                                                style: {
                                                    fontFamily: F_BE,
                                                    color: '#ede0d4',
                                                    fontSize: '0.85rem',
                                                    letterSpacing: '0.2em'
                                                },
                                                children: "MISIONES DISPONIBLES"
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 535,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 h-px",
                                                style: {
                                                    background: 'rgba(255,0,110,0.15)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 539,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/missions",
                                                className: "text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:opacity-80",
                                                style: {
                                                    color: 'var(--pink)',
                                                    fontFamily: F_MONO
                                                },
                                                children: [
                                                    "Ver todas ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                        size: 12,
                                                        className: "inline ml-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 540,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 533,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/missions",
                                                className: "mission-card block",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mission-inner rounded-2xl border p-5 cursor-pointer",
                                                    style: {
                                                        background: 'rgba(18,8,22,0.9)',
                                                        borderColor: 'rgba(255,0,110,0.2)',
                                                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                                                        textDecoration: 'none',
                                                        transformStyle: 'preserve-3d',
                                                        willChange: 'transform'
                                                    },
                                                    onMouseMove: (e)=>{
                                                        e.currentTarget.style.borderColor = 'rgba(255,0,110,0.45)';
                                                        e.currentTarget.style.boxShadow = '0 16px 44px rgba(0,0,0,0.55), 0 0 36px rgba(255,0,110,0.22)';
                                                        tiltMove(e, -6, 10);
                                                    },
                                                    onMouseLeave: (e)=>{
                                                        e.currentTarget.style.borderColor = 'rgba(255,0,110,0.2)';
                                                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
                                                        tiltReset(e);
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start justify-between mb-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-12 h-12 rounded-xl flex items-center justify-center",
                                                                    style: {
                                                                        background: 'rgba(255,0,110,0.15)',
                                                                        border: '1px solid rgba(255,0,110,0.3)'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"], {
                                                                        size: 24,
                                                                        style: {
                                                                            color: 'var(--pink)'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/home/page.tsx",
                                                                        lineNumber: 559,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/home/page.tsx",
                                                                    lineNumber: 557,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase",
                                                                    style: {
                                                                        background: 'rgba(255,107,53,0.15)',
                                                                        color: 'var(--orange)',
                                                                        fontFamily: F_MONO
                                                                    },
                                                                    children: "+50 XP"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/home/page.tsx",
                                                                    lineNumber: 561,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/home/page.tsx",
                                                            lineNumber: 556,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-black text-lg mb-2",
                                                            style: {
                                                                fontFamily: F_BE,
                                                                color: '#e8d5c8',
                                                                letterSpacing: '0.02em'
                                                            },
                                                            children: "Laboratorio Virtual"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/home/page.tsx",
                                                            lineNumber: 566,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm mb-4 leading-relaxed",
                                                            style: {
                                                                color: 'rgba(200,160,140,0.6)',
                                                                fontFamily: F_MONO
                                                            },
                                                            children: "Realiza experimentos de química en entorno VR seguro"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/home/page.tsx",
                                                            lineNumber: 569,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-bold",
                                                                    style: {
                                                                        color: 'rgba(255,0,110,0.6)',
                                                                        fontFamily: F_MONO
                                                                    },
                                                                    children: "Dificultad: Media"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/home/page.tsx",
                                                                    lineNumber: 573,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200",
                                                                    style: {
                                                                        background: 'linear-gradient(135deg,var(--pink),var(--orange))',
                                                                        color: '#08040c',
                                                                        fontFamily: F_MONO
                                                                    },
                                                                    children: "Iniciar"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/home/page.tsx",
                                                                    lineNumber: 576,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/home/page.tsx",
                                                            lineNumber: 572,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/home/page.tsx",
                                                    lineNumber: 552,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 551,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/missions",
                                                className: "mission-card block",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mission-inner rounded-2xl border p-5 cursor-pointer",
                                                    style: {
                                                        background: 'rgba(18,8,22,0.9)',
                                                        borderColor: 'rgba(0,229,160,0.2)',
                                                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                                                        textDecoration: 'none',
                                                        transformStyle: 'preserve-3d',
                                                        willChange: 'transform'
                                                    },
                                                    onMouseMove: (e)=>{
                                                        e.currentTarget.style.borderColor = 'rgba(0,229,160,0.45)';
                                                        e.currentTarget.style.boxShadow = '0 16px 44px rgba(0,0,0,0.55), 0 0 36px rgba(0,229,160,0.22)';
                                                        tiltMove(e, -6, 10);
                                                    },
                                                    onMouseLeave: (e)=>{
                                                        e.currentTarget.style.borderColor = 'rgba(0,229,160,0.2)';
                                                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
                                                        tiltReset(e);
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start justify-between mb-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-12 h-12 rounded-xl flex items-center justify-center",
                                                                    style: {
                                                                        background: 'rgba(0,229,160,0.15)',
                                                                        border: '1px solid rgba(0,229,160,0.3)'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shapes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shapes$3e$__["Shapes"], {
                                                                        size: 24,
                                                                        style: {
                                                                            color: '#00E5A0'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/home/page.tsx",
                                                                        lineNumber: 593,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/home/page.tsx",
                                                                    lineNumber: 591,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase",
                                                                    style: {
                                                                        background: 'rgba(0,229,160,0.15)',
                                                                        color: '#00E5A0',
                                                                        fontFamily: F_MONO
                                                                    },
                                                                    children: "+75 XP"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/home/page.tsx",
                                                                    lineNumber: 595,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/home/page.tsx",
                                                            lineNumber: 590,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-black text-lg mb-2",
                                                            style: {
                                                                fontFamily: F_BE,
                                                                color: '#e8d5c8',
                                                                letterSpacing: '0.02em'
                                                            },
                                                            children: "Geometría Espacial"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/home/page.tsx",
                                                            lineNumber: 600,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm mb-4 leading-relaxed",
                                                            style: {
                                                                color: 'rgba(200,160,140,0.6)',
                                                                fontFamily: F_MONO
                                                            },
                                                            children: "Explora formas 3D y calcula volúmenes en tiempo real"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/home/page.tsx",
                                                            lineNumber: 603,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-bold",
                                                                    style: {
                                                                        color: 'rgba(0,229,160,0.6)',
                                                                        fontFamily: F_MONO
                                                                    },
                                                                    children: "Dificultad: Fácil"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/home/page.tsx",
                                                                    lineNumber: 607,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200",
                                                                    style: {
                                                                        background: 'linear-gradient(135deg,#00E5A0,var(--yellow))',
                                                                        color: '#08040c',
                                                                        fontFamily: F_MONO
                                                                    },
                                                                    children: "Iniciar"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/home/page.tsx",
                                                                    lineNumber: 610,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/home/page.tsx",
                                                            lineNumber: 606,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/home/page.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 585,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/missions",
                                                className: "mission-card block",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mission-inner rounded-2xl border p-5 cursor-pointer",
                                                    style: {
                                                        background: 'rgba(18,8,22,0.9)',
                                                        borderColor: 'rgba(255,215,0,0.2)',
                                                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                                                        textDecoration: 'none',
                                                        transformStyle: 'preserve-3d',
                                                        willChange: 'transform'
                                                    },
                                                    onMouseMove: (e)=>{
                                                        e.currentTarget.style.borderColor = 'rgba(255,215,0,0.45)';
                                                        e.currentTarget.style.boxShadow = '0 16px 44px rgba(0,0,0,0.55), 0 0 36px rgba(255,215,0,0.22)';
                                                        tiltMove(e, -6, 10);
                                                    },
                                                    onMouseLeave: (e)=>{
                                                        e.currentTarget.style.borderColor = 'rgba(255,215,0,0.2)';
                                                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
                                                        tiltReset(e);
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start justify-between mb-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-12 h-12 rounded-xl flex items-center justify-center",
                                                                    style: {
                                                                        background: 'rgba(255,215,0,0.15)',
                                                                        border: '1px solid rgba(255,215,0,0.3)'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circuit$2d$board$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircuitBoard$3e$__["CircuitBoard"], {
                                                                        size: 24,
                                                                        style: {
                                                                            color: 'var(--yellow)'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/home/page.tsx",
                                                                        lineNumber: 627,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/home/page.tsx",
                                                                    lineNumber: 625,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase",
                                                                    style: {
                                                                        background: 'rgba(255,215,0,0.15)',
                                                                        color: 'var(--yellow)',
                                                                        fontFamily: F_MONO
                                                                    },
                                                                    children: "+100 XP"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/home/page.tsx",
                                                                    lineNumber: 629,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/home/page.tsx",
                                                            lineNumber: 624,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-black text-lg mb-2",
                                                            style: {
                                                                fontFamily: F_BE,
                                                                color: '#e8d5c8',
                                                                letterSpacing: '0.02em'
                                                            },
                                                            children: "Circuitos Eléctricos"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/home/page.tsx",
                                                            lineNumber: 634,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm mb-4 leading-relaxed",
                                                            style: {
                                                                color: 'rgba(200,160,140,0.6)',
                                                                fontFamily: F_MONO
                                                            },
                                                            children: "Construye y simula circuitos complejos en VR"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/home/page.tsx",
                                                            lineNumber: 637,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-bold",
                                                                    style: {
                                                                        color: 'rgba(255,215,0,0.6)',
                                                                        fontFamily: F_MONO
                                                                    },
                                                                    children: "Dificultad: Difícil"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/home/page.tsx",
                                                                    lineNumber: 641,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200",
                                                                    style: {
                                                                        background: 'linear-gradient(135deg,var(--yellow),var(--orange))',
                                                                        color: '#08040c',
                                                                        fontFamily: F_MONO
                                                                    },
                                                                    children: "Iniciar"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/home/page.tsx",
                                                                    lineNumber: 644,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/home/page.tsx",
                                                            lineNumber: 640,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/home/page.tsx",
                                                    lineNumber: 620,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 619,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 549,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/home/page.tsx",
                                lineNumber: 532,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-12 objects-section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "section-hdr flex items-center gap-3 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                size: 20,
                                                style: {
                                                    color: 'var(--yellow)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 657,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-black tracking-widest uppercase",
                                                style: {
                                                    fontFamily: F_BE,
                                                    color: '#ede0d4',
                                                    fontSize: '0.85rem',
                                                    letterSpacing: '0.2em'
                                                },
                                                children: "OBJETOS COLECCIONADOS"
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 658,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 h-px",
                                                style: {
                                                    background: 'rgba(255,215,0,0.15)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 662,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-bold px-3 py-1 rounded-full",
                                                style: {
                                                    background: 'rgba(255,215,0,0.1)',
                                                    color: 'rgba(255,215,0,0.6)',
                                                    fontFamily: F_MONO
                                                },
                                                children: "Próximamente"
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 663,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 656,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border p-8 text-center",
                                        style: {
                                            background: 'rgba(18,8,22,0.7)',
                                            borderColor: 'rgba(255,215,0,0.15)',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center",
                                                style: {
                                                    background: 'rgba(255,215,0,0.1)',
                                                    border: '2px dashed rgba(255,215,0,0.3)'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                    size: 32,
                                                    style: {
                                                        color: 'var(--yellow)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/home/page.tsx",
                                                    lineNumber: 673,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 671,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-black text-xl mb-3",
                                                style: {
                                                    fontFamily: F_BE,
                                                    color: '#e8d5c8',
                                                    letterSpacing: '0.02em'
                                                },
                                                children: "Integración Unity"
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 675,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm max-w-md mx-auto mb-6 leading-relaxed",
                                                style: {
                                                    color: 'rgba(200,160,140,0.6)',
                                                    fontFamily: F_MONO
                                                },
                                                children: "Próximamente podrás ver los objetos 3D que hayas coleccionado durante tus misiones VR."
                                            }, void 0, false, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 678,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
                                                style: {
                                                    background: 'rgba(255,215,0,0.1)',
                                                    border: '1px solid rgba(255,215,0,0.2)'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: '50%',
                                                            background: 'var(--yellow)',
                                                            animation: 'pulse 2s infinite'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 684,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-bold tracking-wider uppercase",
                                                        style: {
                                                            color: 'rgba(255,215,0,0.7)',
                                                            fontFamily: F_MONO
                                                        },
                                                        children: "En desarrollo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/home/page.tsx",
                                                        lineNumber: 685,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/home/page.tsx",
                                                lineNumber: 682,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 669,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/home/page.tsx",
                                lineNumber: 655,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-12 stem-news-wrap",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$STEMNews$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/app/home/page.tsx",
                                    lineNumber: 694,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/home/page.tsx",
                                lineNumber: 693,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mt-16",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-px mb-8",
                                        style: {
                                            background: 'linear-gradient(90deg, transparent, var(--orange), transparent)',
                                            opacity: 0.5
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 699,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs tracking-widest uppercase font-bold",
                                        style: {
                                            color: 'rgba(255,107,53,0.3)',
                                            fontFamily: F_MONO,
                                            letterSpacing: '0.4em'
                                        },
                                        children: "✦ athernix · home · v3.0 ✦"
                                    }, void 0, false, {
                                        fileName: "[project]/app/home/page.tsx",
                                        lineNumber: 700,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/home/page.tsx",
                                lineNumber: 698,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/home/page.tsx",
                        lineNumber: 283,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/home/page.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s1(HomeView, "xbBZQRkIIeEB/gYbPkEeifbyp1A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$home$2f$achievementsController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAchievementsController"],
        __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$information$2f$headset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMyHeadsetsController"],
        __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$missions$2f$missionsController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMissionsController"]
    ];
});
_c2 = HomeView;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "StatBadge");
__turbopack_context__.k.register(_c1, "QuickActionCard");
__turbopack_context__.k.register(_c2, "HomeView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0tgzbmy._.js.map