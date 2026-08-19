module.exports = [
"[project]/models/profile.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ROLE_META",
    ()=>ROLE_META,
    "fetchProfile",
    ()=>fetchProfile,
    "formatDate",
    ()=>formatDate,
    "getFullName",
    ()=>getFullName,
    "getInitials",
    ()=>getInitials,
    "getRoleMeta",
    ()=>getRoleMeta,
    "initialProfileState",
    ()=>initialProfileState,
    "signOutUser",
    ()=>signOutUser,
    "updateProfile",
    ()=>updateProfile,
    "uploadAvatar",
    ()=>uploadAvatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
;
function getSupabase() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://tucsuclhwanifjexmztr.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Y3N1Y2xod2FuaWZqZXhtenRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTM5NjQsImV4cCI6MjA4ODAyOTk2NH0.QEpeZ5xLs1R3sdllblWqxbk8sAz69u8QqBU3LJR2aD0"));
}
const initialProfileState = {
    isLoading: true,
    isSaving: false,
    error: null,
    successMsg: null,
    profile: null,
    editOpen: false,
    editFirst: '',
    editLast: '',
    editPhone: '',
    editCountry: '',
    avatarFile: null,
    avatarPreview: null
};
function getFullName(profile) {
    if (!profile) return 'PERSONAL';
    return `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim() || 'PERSONAL';
}
function getInitials(profile) {
    return getFullName(profile).split(' ').map((w)=>w[0]).slice(0, 2).join('').toUpperCase() || 'OP';
}
function formatDate(iso) {
    if (!iso) return '—';
    return new Intl.DateTimeFormat('es-SV', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(iso));
}
const ROLE_META = {
    admin: {
        label: 'ADMIN',
        color: '#ff3060',
        glow: 'rgba(255,48,96,0.4)'
    },
    Teacher: {
        label: 'DOCENTE',
        color: '#ffaa00',
        glow: 'rgba(255,170,0,0.4)'
    },
    Student: {
        label: 'ESTUDIANTE',
        color: '#00e5a0',
        glow: 'rgba(0,229,160,0.4)'
    },
    Personal: {
        label: 'PERSONAL',
        color: '#ff6b35',
        glow: 'rgba(255,107,53,0.4)'
    }
};
function getRoleMeta(role) {
    return ROLE_META[role ?? ''] ?? {
        label: 'OPERADOR',
        color: '#ff6b35',
        glow: 'rgba(255,107,53,0.4)'
    };
}
async function fetchProfile() {
    const supabase = getSupabase();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        console.log("PROFILE DATA: Auth error:", authError?.message);
        return null;
    }
    const { data, error: dbError } = await supabase.from('profiles').select('id, first_name, last_name, email, phone, country_code, avatar_url, role, created_at, updated_at').eq('id', user.id).single();
    console.log("PROFILE DATA:", data, "DB ERROR:", dbError?.message);
    if (dbError) {
        console.log("PROFILE DATA: Database error details:", dbError);
        return null;
    }
    if (!data) {
        console.log("PROFILE DATA: No profile found for user:", user.id);
        return null;
    }
    return {
        ...data,
        email: data.email ?? user.email ?? null,
        country_code: data.country_code ?? null
    };
}
async function updateProfile(id, updates) {
    const supabase = getSupabase();
    const { error } = await supabase.from('profiles').update({
        ...updates,
        updated_at: new Date().toISOString()
    }).eq('id', id);
    if (error) return {
        success: false,
        error: error.message
    };
    return {
        success: true
    };
}
async function uploadAvatar(userId, file) {
    const supabase = getSupabase();
    const ext = file.name.split('.').pop();
    const path = `${userId}/avatar.${ext}`;
    const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, {
        upsert: true
    });
    if (uploadError) return {
        url: null,
        error: uploadError.message
    };
    const { data } = supabase.storage.from('avatars').getPublicUrl(path);
    return {
        url: data.publicUrl
    };
}
async function signOutUser() {
    const supabase = getSupabase();
    await supabase.auth.signOut();
}
}),
"[project]/controllers/user/profile.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProfileController",
    ()=>useProfileController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/profile.ts [app-ssr] (ecmascript)");
// controller/useProfileController.ts
'use client';
;
;
;
function useProfileController() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialProfileState"]);
    // ── Load profile on mount ─────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        (async ()=>{
            const profile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchProfile"])();
            if (cancelled) return;
            if (!profile) {
                setState((s)=>({
                        ...s,
                        isLoading: false,
                        error: 'No se pudo cargar el perfil.'
                    }));
                return;
            }
            setState((s)=>({
                    ...s,
                    isLoading: false,
                    profile,
                    editFirst: profile.first_name ?? '',
                    editLast: profile.last_name ?? '',
                    editPhone: profile.phone ?? '',
                    editCountry: profile.country_code ?? ''
                }));
        })();
        return ()=>{
            cancelled = true;
        };
    }, []);
    // ── Open / close edit modal ───────────────────────────────
    const openEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setState((s)=>({
                ...s,
                editOpen: true,
                editFirst: s.profile?.first_name ?? '',
                editLast: s.profile?.last_name ?? '',
                editPhone: s.profile?.phone ?? '',
                editCountry: s.profile?.country_code ?? '',
                avatarPreview: null,
                avatarFile: null,
                error: null,
                successMsg: null
            }));
    }, []);
    const closeEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setState((s)=>({
                ...s,
                editOpen: false,
                avatarPreview: null,
                avatarFile: null
            }));
    }, []);
    // ── Field setters ─────────────────────────────────────────
    const setEditFirst = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((v)=>setState((s)=>({
                ...s,
                editFirst: v
            })), []);
    const setEditLast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((v)=>setState((s)=>({
                ...s,
                editLast: v
            })), []);
    const setEditPhone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((v)=>setState((s)=>({
                ...s,
                editPhone: v
            })), []);
    const setEditCountry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((v)=>setState((s)=>({
                ...s,
                editCountry: v
            })), []);
    // ── Avatar file picker ────────────────────────────────────
    const triggerFileInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>fileRef.current?.click(), []);
    const handleAvatarChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        const preview = URL.createObjectURL(file);
        setState((s)=>({
                ...s,
                avatarFile: file,
                avatarPreview: preview
            }));
    }, []);
    // ── Save profile ──────────────────────────────────────────
    const handleSave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!state.profile) return;
        setState((s)=>({
                ...s,
                isSaving: true,
                error: null,
                successMsg: null
            }));
        let avatarUrl = state.profile.avatar_url;
        // Upload avatar if changed
        if (state.avatarFile) {
            const { url, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadAvatar"])(state.profile.id, state.avatarFile);
            if (error || !url) {
                setState((s)=>({
                        ...s,
                        isSaving: false,
                        error: 'Error al subir el avatar.'
                    }));
                return;
            }
            avatarUrl = url;
        }
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateProfile"])(state.profile.id, {
            first_name: state.editFirst || null,
            last_name: state.editLast || null,
            phone: state.editPhone || null,
            country_code: state.editCountry || null,
            avatar_url: avatarUrl
        });
        if (!result.success) {
            setState((s)=>({
                    ...s,
                    isSaving: false,
                    error: result.error ?? 'Error al guardar.'
                }));
            return;
        }
        // Refresh profile data
        const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchProfile"])();
        setState((s)=>({
                ...s,
                isSaving: false,
                editOpen: false,
                successMsg: 'Perfil actualizado correctamente.',
                profile: updated ?? s.profile,
                avatarFile: null,
                avatarPreview: null
            }));
        setTimeout(()=>setState((s)=>({
                    ...s,
                    successMsg: null
                })), 3500);
    }, [
        state
    ]);
    // ── Sign out ──────────────────────────────────────────────
    const handleSignOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOutUser"])();
        router.push('/login');
    }, [
        router
    ]);
    // ── Change password ───────────────────────────────────────
    const handleChangePassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        router.push('/update-password');
    }, [
        router
    ]);
    return {
        state,
        fileRef,
        openEdit,
        closeEdit,
        setEditFirst,
        setEditLast,
        setEditPhone,
        setEditCountry,
        triggerFileInput,
        handleAvatarChange,
        handleSave,
        handleSignOut,
        handleChangePassword
    };
}
}),
"[project]/app/profile/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfileView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/SplitText.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$user$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/controllers/user/profile.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/profile.ts [app-ssr] (ecmascript)");
// view/ProfileView.tsx
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
// ── Icons ─────────────────────────────────────────────────────
function IconEdit() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        className: "w-4 h-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
        }, void 0, false, {
            fileName: "[project]/app/profile/page.tsx",
            lineNumber: 41,
            columnNumber: 131
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/profile/page.tsx",
        lineNumber: 41,
        columnNumber: 34
    }, this);
}
function IconKey() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        className: "w-4 h-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 0 1 21.75 8.25Z"
        }, void 0, false, {
            fileName: "[project]/app/profile/page.tsx",
            lineNumber: 42,
            columnNumber: 131
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/profile/page.tsx",
        lineNumber: 42,
        columnNumber: 34
    }, this);
}
function IconLogout() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        className: "w-4 h-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
        }, void 0, false, {
            fileName: "[project]/app/profile/page.tsx",
            lineNumber: 43,
            columnNumber: 131
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/profile/page.tsx",
        lineNumber: 43,
        columnNumber: 34
    }, this);
}
function IconMail() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.5,
        className: "w-3.5 h-3.5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        }, void 0, false, {
            fileName: "[project]/app/profile/page.tsx",
            lineNumber: 44,
            columnNumber: 135
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/profile/page.tsx",
        lineNumber: 44,
        columnNumber: 34
    }, this);
}
function IconPhone() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.5,
        className: "w-3.5 h-3.5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z"
        }, void 0, false, {
            fileName: "[project]/app/profile/page.tsx",
            lineNumber: 45,
            columnNumber: 135
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/profile/page.tsx",
        lineNumber: 45,
        columnNumber: 34
    }, this);
}
function IconCalendar() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.5,
        className: "w-3.5 h-3.5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
        }, void 0, false, {
            fileName: "[project]/app/profile/page.tsx",
            lineNumber: 46,
            columnNumber: 135
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/profile/page.tsx",
        lineNumber: 46,
        columnNumber: 34
    }, this);
}
function IconCamera() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        className: "w-5 h-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
            }, void 0, false, {
                fileName: "[project]/app/profile/page.tsx",
                lineNumber: 47,
                columnNumber: 131
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
            }, void 0, false, {
                fileName: "[project]/app/profile/page.tsx",
                lineNumber: 47,
                columnNumber: 552
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/profile/page.tsx",
        lineNumber: 47,
        columnNumber: 34
    }, this);
}
function IconClose() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        className: "w-4 h-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M6 18 18 6M6 6l12 12"
        }, void 0, false, {
            fileName: "[project]/app/profile/page.tsx",
            lineNumber: 48,
            columnNumber: 129
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/profile/page.tsx",
        lineNumber: 48,
        columnNumber: 34
    }, this);
}
function IconSave() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        className: "w-4 h-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        }, void 0, false, {
            fileName: "[project]/app/profile/page.tsx",
            lineNumber: 49,
            columnNumber: 131
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/profile/page.tsx",
        lineNumber: 49,
        columnNumber: 34
    }, this);
}
function IconSpinner() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "animate-spin w-4 h-4",
        viewBox: "0 0 24 24",
        fill: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "rgba(255,255,255,0.25)",
                strokeWidth: "3"
            }, void 0, false, {
                fileName: "[project]/app/profile/page.tsx",
                lineNumber: 50,
                columnNumber: 104
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 2a10 10 0 0 1 10 10",
                stroke: "white",
                strokeWidth: "3",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/app/profile/page.tsx",
                lineNumber: 50,
                columnNumber: 184
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/profile/page.tsx",
        lineNumber: 50,
        columnNumber: 34
    }, this);
}
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
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
}
// ── 3D Cosmic core background ──────────────────────────────────
function NeuralField3D() {
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const container = mountRef.current;
        if (!container) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
        scene.fog = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FogExp2"](0x050208, 0.018);
        const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](55, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 34);
        const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
            alpha: true,
            antialias: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        const glowTex = createGlowTexture();
        // ── Starfield ──
        const starCount = 1200;
        const sPos = new Float32Array(starCount * 3);
        const sCol = new Float32Array(starCount * 3);
        const palette = [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]('#FF6B00'),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]('#FF006E'),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]('#FFD700'),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]('#9D4EDD'),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]('#ffffff')
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
        const sGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        sGeo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](sPos, 3));
        sGeo.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](sCol, 3));
        const sMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointsMaterial"]({
            size: 0.6,
            map: glowTex,
            transparent: true,
            vertexColors: true,
            opacity: 0.85,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
            depthWrite: false,
            sizeAttenuation: true
        });
        const stars = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Points"](sGeo, sMat);
        scene.add(stars);
        // ── Central sun / core ──
        const coreGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](4.5, 64, 64);
        const coreMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: 0xff6b35,
            transparent: true,
            opacity: 0.5,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
            depthWrite: false
        });
        const core = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](coreGeo, coreMat);
        scene.add(core);
        const innerCoreGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](2.2, 64, 64);
        const innerCoreMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: 0xffd700,
            transparent: true,
            opacity: 0.7,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
            depthWrite: false
        });
        const innerCore = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](innerCoreGeo, innerCoreMat);
        scene.add(innerCore);
        // ── Glowing rings ──
        const ringGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
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
        ringData.forEach((d)=>{
            const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](d.r, d.tube, 32, 120);
            const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: d.color,
                transparent: true,
                opacity: d.opacity,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                depthWrite: false,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
            });
            const ring = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geo, mat);
            ring.rotation.x = Math.random() * Math.PI;
            ring.rotation.y = Math.random() * Math.PI;
            ringGroup.add(ring);
        });
        scene.add(ringGroup);
        // ── Floating orbs / planets ──
        const orbs = [];
        const orbColors = [
            0xff6b35,
            0xff006e,
            0xffd700,
            0x9d4edd
        ];
        for(let i = 0; i < 6; i++){
            const size = Math.random() * 0.8 + 0.3;
            const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](size, 32, 32);
            const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: orbColors[i % orbColors.length],
                transparent: true,
                opacity: 0.55,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                depthWrite: false
            });
            const orb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geo, mat);
            const a = Math.random() * Math.PI * 2;
            const r = 15 + Math.random() * 20;
            orb.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 12, Math.sin(a) * r);
            orbs.push(orb);
            scene.add(orb);
        }
        let mx = 0, my = 0, scrollY = 0, smoothScroll = 0;
        let smoothMx = 0, smoothMy = 0;
        const onMove = (e)=>{
            mx = (e.clientX / window.innerWidth - 0.5) * 2;
            my = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        const onScroll = ()=>{
            const y = window.scrollY || window.pageYOffset;
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
            const k = prefersReduced ? 0.2 : 1;
            smoothMx += (mx - smoothMx) * 0.04;
            smoothMy += (my - smoothMy) * 0.04;
            smoothScroll += (scrollY - smoothScroll) * 0.06;
            // Rotate whole starfield
            stars.rotation.y = t * 0.08 * k;
            stars.rotation.x = smoothMy * 0.08;
            // Pulse core
            const pulse = 1 + Math.sin(t * 0.8 * k) * 0.1;
            core.scale.setScalar(pulse);
            innerCore.scale.setScalar(1 + Math.sin(t * 1.2 * k + 1) * 0.08);
            // Rings orbit and tilt with mouse
            ringGroup.rotation.x = t * 0.12 * k + smoothMy * 0.25;
            ringGroup.rotation.y = t * 0.18 * k + smoothMx * 0.25;
            ringGroup.rotation.z = smoothScroll * 0.0005;
            // Orbs orbit around core
            orbs.forEach((orb, i)=>{
                const a = t * 0.4 * k + i * 1.05;
                const r = 15 + i * 2.5;
                orb.position.x = Math.cos(a) * r;
                orb.position.z = Math.sin(a) * r;
                orb.position.y = Math.sin(t * 0.6 * k + i) * 4;
            });
            // Camera parallax + scroll zoom
            const targetX = smoothMx * 20;
            const targetY = smoothMy * 15;
            const targetZ = Math.max(8, 40 - smoothScroll * 0.2);
            camera.position.x += (targetX - camera.position.x) * 0.04;
            camera.position.y += (targetY - camera.position.y) * 0.04;
            camera.position.z += (targetZ - camera.position.z) * 0.05;
            camera.lookAt(0, smoothScroll * 0.02, 0);
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
            glowTex.dispose();
            renderer.dispose();
            sGeo.dispose();
            sMat.dispose();
            coreGeo.dispose();
            coreMat.dispose();
            innerCoreGeo.dispose();
            innerCoreMat.dispose();
            ringGroup.children.forEach((child)=>{
                const mesh = child;
                mesh.geometry.dispose();
                mesh.material.dispose();
            });
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
                fileName: "[project]/app/profile/page.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(5,0,8,0.35) 55%, rgba(5,0,8,0.92) 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/app/profile/page.tsx",
                lineNumber: 261,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/profile/page.tsx",
        lineNumber: 259,
        columnNumber: 5
    }, this);
}
// ── Shared styles ──────────────────────────────────────────────
const CARD_STYLE = {
    background: 'rgba(18,8,12,0.92)',
    border: '1px solid rgba(180,60,40,0.2)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
    backdropFilter: 'blur(12px)'
};
const LABEL_STYLE = {
    color: 'rgba(255,107,53,0.7)',
    fontFamily: F_MONO,
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    fontWeight: 'bold'
};
const INPUT_STYLE = {
    background: 'rgba(255,255,255,0.04)',
    border: '2px solid rgba(255,107,53,0.2)',
    color: '#e8d5c8',
    fontFamily: F_MONO,
    caretColor: 'var(--orange)',
    outline: 'none',
    width: '100%',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    fontSize: '0.9rem'
};
// ── Loading skeleton ───────────────────────────────────────────
function ProfileSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-sm mx-auto px-4 py-10 space-y-6 animate-pulse",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-24 h-24 rounded-full",
                        style: {
                            background: 'rgba(255,100,50,0.1)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/profile/page.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-32 h-5 rounded",
                        style: {
                            background: 'rgba(255,100,50,0.1)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/profile/page.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-48 h-3 rounded",
                        style: {
                            background: 'rgba(255,100,50,0.07)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/profile/page.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/profile/page.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this),
            [
                1,
                2,
                3
            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-14 rounded-xl",
                    style: {
                        background: 'rgba(255,100,50,0.07)'
                    }
                }, i, false, {
                    fileName: "[project]/app/profile/page.tsx",
                    lineNumber: 306,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/app/profile/page.tsx",
        lineNumber: 299,
        columnNumber: 5
    }, this);
}
function ProfileView() {
    const { state, fileRef, openEdit, closeEdit, setEditFirst, setEditLast, setEditPhone, setEditCountry, triggerFileInput, handleAvatarChange, handleSave, handleSignOut, handleChangePassword } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$user$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProfileController"])();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const avatarRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ── GSAP entrance ──────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (state.isLoading) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].context(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.orb-p1', {
                scale: 1.2,
                opacity: 0.55,
                duration: 4.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.orb-p2', {
                scale: 1.15,
                opacity: 0.35,
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 2
            });
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                defaults: {
                    ease: 'power3.out'
                }
            });
            tl.fromTo(cardRef.current, {
                opacity: 0,
                y: 50,
                scale: 0.96
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8
            }).fromTo(avatarRef.current, {
                opacity: 0,
                scale: 0.7
            }, {
                opacity: 1,
                scale: 1,
                duration: 0.6
            }, '-=0.4');
            if (!prefersReduced) {
                const title = document.querySelector('.hero-name-text');
                if (title && title.textContent && title.textContent.trim().length > 0) {
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
                tl.fromTo('.hero-name-text', {
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7
                }, '-=0.2');
            }
            tl.fromTo('.p-info-block', {
                opacity: 0,
                y: 15
            }, {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.45
            }, '-=0.2').fromTo('.p-divider', {
                scaleX: 0
            }, {
                scaleX: 1,
                duration: 0.4,
                transformOrigin: 'center'
            }, '-=0.1').fromTo('.p-action', {
                opacity: 0,
                x: -20
            }, {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.4
            }, '-=0.1');
        }, containerRef);
        return ()=>ctx.revert();
    }, [
        state.isLoading
    ]);
    // ── Scroll progress ────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;
        const inner = document.querySelector('.p-progress-bar-inner');
        if (!inner) return;
        const st = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
            start: 0,
            end: 'max',
            onUpdate: (self)=>{
                inner.style.transform = `scaleX(${self.progress})`;
            }
        });
        return ()=>st.kill();
    }, []);
    // ── GSAP modal entrance ────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!state.editOpen) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].context(()=>{
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                defaults: {
                    ease: 'power3.out'
                }
            });
            tl.fromTo('.modal-backdrop', {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.35
            }).fromTo('.modal-card', {
                opacity: 0,
                scale: 0.9,
                y: 40,
                rotationX: -10
            }, {
                opacity: 1,
                scale: 1,
                y: 0,
                rotationX: 0,
                duration: 0.5,
                ease: 'back.out(1.4)'
            }, 0.05);
            if (!prefersReduced) {
                const title = document.querySelector('.modal-title-text');
                if (title && title.textContent && title.textContent.trim().length > 0) {
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
                        duration: 0.8,
                        stagger: 0.03,
                        ease: 'back.out(1.7)',
                        delay: 0.2
                    });
                }
            } else {
                tl.fromTo('.modal-title-text', {
                    opacity: 0,
                    y: 20
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5
                }, 0.2);
            }
            tl.fromTo('.modal-field', {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.4,
                ease: 'power2.out'
            }, 0.25).fromTo('.modal-action', {
                opacity: 0,
                y: 15
            }, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.35
            }, '-=0.2');
        });
        return ()=>ctx.revert();
    }, [
        state.editOpen
    ]);
    const { profile } = state;
    const roleMeta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRoleMeta"])(profile?.role);
    const fullName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFullName"])(profile);
    const initials = (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getInitials"])(profile);
    const avatarSrc = state.avatarPreview ?? profile?.avatar_url ?? null;
    if (state.isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: 'linear-gradient(135deg,#08040c 0%,#120818 50%,#08040c 100%)',
            minHeight: '100vh'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileSkeleton, {}, void 0, false, {
            fileName: "[project]/app/profile/page.tsx",
            lineNumber: 410,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/profile/page.tsx",
        lineNumber: 409,
        columnNumber: 5
    }, this);
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
        main { background-color: transparent !important; }
        @keyframes pulse-dot { 0%,100% { box-shadow: 0 0 0 0 rgba(0,229,160,0.4); } 50% { box-shadow: 0 0 0 6px rgba(0,229,160,0); } }
        .pulse-dot { animation: pulse-dot 2s infinite; }
      `
            }, void 0, false, {
                fileName: "[project]/app/profile/page.tsx",
                lineNumber: 416,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-progress-bar fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left",
                style: {
                    background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-progress-bar-inner",
                    style: {
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))',
                        boxShadow: '0 0 12px rgba(255,107,53,0.4)',
                        transform: 'scaleX(0)',
                        transformOrigin: 'left'
                    }
                }, void 0, false, {
                    fileName: "[project]/app/profile/page.tsx",
                    lineNumber: 431,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/profile/page.tsx",
                lineNumber: 429,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NeuralField3D, {}, void 0, false, {
                fileName: "[project]/app/profile/page.tsx",
                lineNumber: 435,
                columnNumber: 7
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
                fileName: "[project]/app/profile/page.tsx",
                lineNumber: 438,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "orb-p1 fixed pointer-events-none rounded-full",
                style: {
                    width: 550,
                    height: 550,
                    top: '-8%',
                    right: '-12%',
                    zIndex: 0,
                    background: 'radial-gradient(circle,rgba(255,107,53,0.22) 0%,transparent 70%)',
                    filter: 'blur(50px)'
                }
            }, void 0, false, {
                fileName: "[project]/app/profile/page.tsx",
                lineNumber: 447,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "orb-p2 fixed pointer-events-none rounded-full",
                style: {
                    width: 450,
                    height: 450,
                    bottom: '-5%',
                    left: '-8%',
                    zIndex: 0,
                    background: 'radial-gradient(circle,rgba(255,0,110,0.18) 0%,transparent 70%)',
                    filter: 'blur(60px)'
                }
            }, void 0, false, {
                fileName: "[project]/app/profile/page.tsx",
                lineNumber: 451,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-0 z-[100]",
                style: {
                    opacity: 0.04,
                    background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.05) 2px,rgba(255,255,255,0.05) 4px)',
                    mixBlendMode: 'overlay'
                }
            }, void 0, false, {
                fileName: "[project]/app/profile/page.tsx",
                lineNumber: 457,
                columnNumber: 7
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
                    fileName: "[project]/app/profile/page.tsx",
                    lineNumber: 463,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "relative z-10 min-h-screen flex items-center justify-center overflow-hidden py-10",
                style: {
                    background: 'transparent',
                    fontFamily: F_MONO
                },
                children: [
                    state.successMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl text-sm font-bold tracking-wider",
                        style: {
                            background: 'rgba(0,200,120,0.15)',
                            border: '2px solid rgba(0,200,120,0.4)',
                            color: '#00e5a0',
                            fontFamily: F_MONO,
                            boxShadow: '0 4px 20px rgba(0,200,120,0.2)'
                        },
                        children: [
                            "✦ ",
                            state.successMsg
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/profile/page.tsx",
                        lineNumber: 485,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: cardRef,
                        className: "profile-card relative w-full max-w-sm mx-4 rounded-2xl px-8 py-10",
                        style: {
                            background: 'rgba(12,6,16,0.72)',
                            border: '2px solid rgba(255,107,53,0.22)',
                            boxShadow: '0 12px 50px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
                            backdropFilter: 'blur(14px)',
                            transformStyle: 'preserve-3d',
                            willChange: 'transform'
                        },
                        onMouseMove: (e)=>{
                            tiltMove(e, -6, 10);
                            e.currentTarget.style.borderColor = 'rgba(255,107,53,0.45)';
                            e.currentTarget.style.boxShadow = '0 18px 60px rgba(0,0,0,0.7), 0 0 30px rgba(255,107,53,0.08), inset 0 1px 0 rgba(255,255,255,0.06)';
                        },
                        onMouseLeave: (e)=>{
                            tiltReset(e);
                            e.currentTarget.style.borderColor = 'rgba(255,107,53,0.22)';
                            e.currentTarget.style.boxShadow = '0 12px 50px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)';
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "p-info-block text-center text-xs tracking-[0.35em] uppercase mb-6 font-bold",
                                style: {
                                    color: 'rgba(255,107,53,0.6)',
                                    fontFamily: F_MONO
                                },
                                children: "✦ perfil de operador ✦"
                            }, void 0, false, {
                                fileName: "[project]/app/profile/page.tsx",
                                lineNumber: 505,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: avatarRef,
                                className: "flex flex-col items-center mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 rounded-full",
                                                style: {
                                                    background: `radial-gradient(circle, ${roleMeta.glow} 0%, transparent 70%)`,
                                                    filter: 'blur(12px)',
                                                    transform: 'scale(1.3)',
                                                    zIndex: 0
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/profile/page.tsx",
                                                lineNumber: 514,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative rounded-full p-0.5",
                                                style: {
                                                    background: `linear-gradient(135deg, ${roleMeta.color}, rgba(255,100,50,0.3), transparent)`
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-24 h-24 rounded-full overflow-hidden flex items-center justify-center relative",
                                                    style: {
                                                        background: 'rgba(20,10,14,0.9)'
                                                    },
                                                    children: avatarSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        src: avatarSrc,
                                                        alt: fullName,
                                                        fill: true,
                                                        className: "object-cover",
                                                        sizes: "96px"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/profile/page.tsx",
                                                        lineNumber: 524,
                                                        columnNumber: 19
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl font-black",
                                                        style: {
                                                            fontFamily: F_BE,
                                                            background: `linear-gradient(135deg, ${roleMeta.color}, #f7c59f)`,
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent'
                                                        },
                                                        children: initials
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/profile/page.tsx",
                                                        lineNumber: 526,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/profile/page.tsx",
                                                    lineNumber: 521,
                                                    columnNumber: 15
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/profile/page.tsx",
                                                lineNumber: 519,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/profile/page.tsx",
                                        lineNumber: 512,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "p-info-block hero-name mt-4 text-2xl font-black tracking-wide text-center",
                                        style: {
                                            fontFamily: F_BE
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hero-name-text",
                                            style: {
                                                background: 'linear-gradient(90deg,var(--pink),var(--orange),var(--yellow))',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            },
                                            children: fullName
                                        }, void 0, false, {
                                            fileName: "[project]/app/profile/page.tsx",
                                            lineNumber: 540,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/profile/page.tsx",
                                        lineNumber: 538,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-info-block mt-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-[0.25em]",
                                        style: {
                                            background: `rgba(${roleMeta.color === '#ff3060' ? '255,48,96' : roleMeta.color === '#ffaa00' ? '255,170,0' : roleMeta.color === '#00e5a0' ? '0,229,160' : '255,107,53'},0.15)`,
                                            border: `2px solid ${roleMeta.color}60`,
                                            color: roleMeta.color,
                                            fontFamily: F_MONO
                                        },
                                        children: roleMeta.label
                                    }, void 0, false, {
                                        fileName: "[project]/app/profile/page.tsx",
                                        lineNumber: 546,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/profile/page.tsx",
                                lineNumber: 511,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-info-block space-y-2 mb-6",
                                children: [
                                    {
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconMail, {}, void 0, false, {
                                            fileName: "[project]/app/profile/page.tsx",
                                            lineNumber: 558,
                                            columnNumber: 21
                                        }, this),
                                        value: profile?.email || '—'
                                    },
                                    {
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconPhone, {}, void 0, false, {
                                            fileName: "[project]/app/profile/page.tsx",
                                            lineNumber: 560,
                                            columnNumber: 21
                                        }, this),
                                        value: profile?.phone ? `${profile.country_code ? profile.country_code + ' ' : ''}${profile.phone}` : '—'
                                    },
                                    {
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconCalendar, {}, void 0, false, {
                                            fileName: "[project]/app/profile/page.tsx",
                                            lineNumber: 565,
                                            columnNumber: 21
                                        }, this),
                                        value: `Desde ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(profile?.created_at ?? null)}`
                                    }
                                ].map(({ icon, value }, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                                        style: {
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,100,50,0.12)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'rgba(255,120,70,0.6)'
                                                },
                                                children: icon
                                            }, void 0, false, {
                                                fileName: "[project]/app/profile/page.tsx",
                                                lineNumber: 569,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs truncate",
                                                style: {
                                                    color: 'rgba(200,170,150,0.8)',
                                                    fontFamily: "'Rajdhani', sans-serif",
                                                    letterSpacing: '0.05em'
                                                },
                                                children: value
                                            }, void 0, false, {
                                                fileName: "[project]/app/profile/page.tsx",
                                                lineNumber: 570,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/app/profile/page.tsx",
                                        lineNumber: 567,
                                        columnNumber: 13
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/profile/page.tsx",
                                lineNumber: 556,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-divider flex items-center gap-3 mb-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 h-px",
                                        style: {
                                            background: 'rgba(255,107,53,0.15)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/profile/page.tsx",
                                        lineNumber: 579,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs tracking-[0.25em] uppercase font-bold",
                                        style: {
                                            color: 'rgba(255,107,53,0.4)',
                                            fontFamily: F_MONO
                                        },
                                        children: "cuenta"
                                    }, void 0, false, {
                                        fileName: "[project]/app/profile/page.tsx",
                                        lineNumber: 580,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 h-px",
                                        style: {
                                            background: 'rgba(255,107,53,0.15)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/profile/page.tsx",
                                        lineNumber: 583,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/profile/page.tsx",
                                lineNumber: 578,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: openEdit,
                                        className: "p-action w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200",
                                        style: {
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '2px solid rgba(255,107,53,0.2)',
                                            cursor: 'pointer',
                                            transformStyle: 'preserve-3d',
                                            willChange: 'transform'
                                        },
                                        onMouseMove: (e)=>{
                                            magneticMove(e, 0.15);
                                            tiltMove(e, -3, 8);
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)';
                                            e.currentTarget.style.background = 'rgba(255,107,53,0.08)';
                                        },
                                        onMouseLeave: (e)=>{
                                            magneticReset(e);
                                            tiltReset(e);
                                            e.currentTarget.style.borderColor = 'rgba(255,107,53,0.2)';
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                                                style: {
                                                    background: 'rgba(255,107,53,0.15)',
                                                    color: 'var(--orange)'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconEdit, {}, void 0, false, {
                                                    fileName: "[project]/app/profile/page.tsx",
                                                    lineNumber: 597,
                                                    columnNumber: 15
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/profile/page.tsx",
                                                lineNumber: 595,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-bold",
                                                        style: {
                                                            color: '#e8d5c8',
                                                            fontFamily: F_MONO,
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Editar perfil"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/profile/page.tsx",
                                                        lineNumber: 600,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs font-bold",
                                                        style: {
                                                            color: 'rgba(200,150,120,0.55)'
                                                        },
                                                        children: "Actualiza tu nombre y/o avatar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/profile/page.tsx",
                                                        lineNumber: 603,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/profile/page.tsx",
                                                lineNumber: 599,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/profile/page.tsx",
                                        lineNumber: 589,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleChangePassword,
                                        className: "p-action w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200",
                                        style: {
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '2px solid rgba(255,107,53,0.2)',
                                            cursor: 'pointer',
                                            transformStyle: 'preserve-3d',
                                            willChange: 'transform'
                                        },
                                        onMouseMove: (e)=>{
                                            magneticMove(e, 0.15);
                                            tiltMove(e, -3, 8);
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)';
                                            e.currentTarget.style.background = 'rgba(255,107,53,0.08)';
                                        },
                                        onMouseLeave: (e)=>{
                                            magneticReset(e);
                                            tiltReset(e);
                                            e.currentTarget.style.borderColor = 'rgba(255,107,53,0.2)';
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                                                style: {
                                                    background: 'rgba(255,107,53,0.15)',
                                                    color: 'var(--orange)'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconKey, {}, void 0, false, {
                                                    fileName: "[project]/app/profile/page.tsx",
                                                    lineNumber: 618,
                                                    columnNumber: 15
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/profile/page.tsx",
                                                lineNumber: 616,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-bold",
                                                        style: {
                                                            color: '#e8d5c8',
                                                            fontFamily: F_MONO,
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Cambiar contraseña"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/profile/page.tsx",
                                                        lineNumber: 621,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs font-bold",
                                                        style: {
                                                            color: 'rgba(200,150,120,0.55)'
                                                        },
                                                        children: "Establece una nueva clave segura"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/profile/page.tsx",
                                                        lineNumber: 624,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/profile/page.tsx",
                                                lineNumber: 620,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/profile/page.tsx",
                                        lineNumber: 610,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSignOut,
                                        className: "p-action w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200",
                                        style: {
                                            background: 'rgba(220,40,40,0.05)',
                                            border: '2px solid rgba(220,40,40,0.2)',
                                            cursor: 'pointer',
                                            transformStyle: 'preserve-3d',
                                            willChange: 'transform'
                                        },
                                        onMouseMove: (e)=>{
                                            magneticMove(e, 0.15);
                                            tiltMove(e, -3, 8);
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.borderColor = 'rgba(220,40,40,0.5)';
                                            e.currentTarget.style.background = 'rgba(220,40,40,0.1)';
                                        },
                                        onMouseLeave: (e)=>{
                                            magneticReset(e);
                                            tiltReset(e);
                                            e.currentTarget.style.borderColor = 'rgba(220,40,40,0.2)';
                                            e.currentTarget.style.background = 'rgba(220,40,40,0.05)';
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                                                style: {
                                                    background: 'rgba(220,40,40,0.15)',
                                                    color: '#ff4444'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconLogout, {}, void 0, false, {
                                                    fileName: "[project]/app/profile/page.tsx",
                                                    lineNumber: 639,
                                                    columnNumber: 15
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/profile/page.tsx",
                                                lineNumber: 637,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-bold",
                                                        style: {
                                                            color: '#ff6b6b',
                                                            fontFamily: F_MONO,
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Cerrar sesión"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/profile/page.tsx",
                                                        lineNumber: 642,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs font-bold",
                                                        style: {
                                                            color: 'rgba(200,120,120,0.55)'
                                                        },
                                                        children: "Salir de tu cuenta actual"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/profile/page.tsx",
                                                        lineNumber: 645,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/profile/page.tsx",
                                                lineNumber: 641,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/profile/page.tsx",
                                        lineNumber: 631,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/profile/page.tsx",
                                lineNumber: 587,
                                columnNumber: 9
                            }, this),
                            state.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 px-4 py-2 rounded-lg text-xs text-center font-bold",
                                style: {
                                    background: 'rgba(220,40,40,0.15)',
                                    border: '2px solid rgba(220,40,40,0.35)',
                                    color: '#ff6b6b',
                                    fontFamily: F_MONO
                                },
                                children: state.error
                            }, void 0, false, {
                                fileName: "[project]/app/profile/page.tsx",
                                lineNumber: 654,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/profile/page.tsx",
                        lineNumber: 493,
                        columnNumber: 7
                    }, this),
                    state.editOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4",
                        style: {
                            background: 'radial-gradient(ellipse at 50% 50%, rgba(5,0,8,0.7) 0%, rgba(0,0,0,0.92) 100%)',
                            backdropFilter: 'blur(10px)'
                        },
                        onClick: (e)=>{
                            if (e.target === e.currentTarget) closeEdit();
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-card w-full max-w-sm rounded-2xl px-7 py-8",
                            style: {
                                background: 'rgba(12,6,16,0.78)',
                                border: '2px solid rgba(255,107,53,0.22)',
                                boxShadow: '0 16px 60px rgba(0,0,0,0.7), 0 0 40px rgba(255,107,53,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(16px)',
                                transformStyle: 'preserve-3d',
                                willChange: 'transform'
                            },
                            onMouseMove: (e)=>{
                                tiltMove(e, -5, 8);
                                e.currentTarget.style.borderColor = 'rgba(255,107,53,0.45)';
                                e.currentTarget.style.boxShadow = '0 20px 70px rgba(0,0,0,0.8), 0 0 50px rgba(255,107,53,0.12), inset 0 1px 0 rgba(255,255,255,0.07)';
                            },
                            onMouseLeave: (e)=>{
                                tiltReset(e);
                                e.currentTarget.style.borderColor = 'rgba(255,107,53,0.22)';
                                e.currentTarget.style.boxShadow = '0 16px 60px rgba(0,0,0,0.7), 0 0 40px rgba(255,107,53,0.08), inset 0 1px 0 rgba(255,255,255,0.05)';
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "modal-title-text text-base font-black tracking-widest",
                                                    style: {
                                                        fontFamily: F_BE,
                                                        background: 'linear-gradient(90deg,var(--orange),var(--yellow))',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent'
                                                    },
                                                    children: "EDITAR PERFIL"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/profile/page.tsx",
                                                    lineNumber: 680,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs tracking-widest mt-0.5 font-bold",
                                                    style: {
                                                        color: 'rgba(255,107,53,0.5)',
                                                        fontFamily: F_MONO
                                                    },
                                                    children: "✦ actualizar datos ✦"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/profile/page.tsx",
                                                    lineNumber: 686,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/profile/page.tsx",
                                            lineNumber: 679,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: closeEdit,
                                            className: "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                            style: {
                                                color: 'rgba(200,130,100,0.6)',
                                                background: 'rgba(255,107,53,0.08)',
                                                border: '2px solid rgba(255,107,53,0.15)',
                                                cursor: 'pointer',
                                                transformStyle: 'preserve-3d',
                                                willChange: 'transform'
                                            },
                                            onMouseMove: (e)=>{
                                                magneticMove(e, 0.4);
                                                tiltMove(e, -2, 12);
                                            },
                                            onMouseEnter: (e)=>{
                                                e.currentTarget.style.color = 'var(--orange)';
                                                e.currentTarget.style.background = 'rgba(255,107,53,0.15)';
                                            },
                                            onMouseLeave: (e)=>{
                                                magneticReset(e);
                                                tiltReset(e);
                                                e.currentTarget.style.color = 'rgba(200,130,100,0.6)';
                                                e.currentTarget.style.background = 'rgba(255,107,53,0.08)';
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconClose, {}, void 0, false, {
                                                fileName: "[project]/app/profile/page.tsx",
                                                lineNumber: 696,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/profile/page.tsx",
                                            lineNumber: 690,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/profile/page.tsx",
                                    lineNumber: 678,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "modal-field flex flex-col items-center mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative cursor-pointer group",
                                            style: {
                                                transformStyle: 'preserve-3d',
                                                willChange: 'transform'
                                            },
                                            onMouseMove: (e)=>{
                                                tiltMove(e, -4, 10);
                                                e.currentTarget.querySelector('div')?.setAttribute('style', 'background:rgba(20,10,14,0.9);border:2px solid rgba(255,107,53,0.7);box-shadow:0 0 30px rgba(255,107,53,0.45)');
                                            },
                                            onMouseLeave: (e)=>{
                                                tiltReset(e);
                                                e.currentTarget.querySelector('div')?.setAttribute('style', 'background:rgba(20,10,14,0.9);border:2px solid rgba(255,107,53,0.35);box-shadow:0 0 20px rgba(255,107,53,0.2)');
                                            },
                                            onClick: triggerFileInput,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-20 h-20 rounded-full overflow-hidden relative flex items-center justify-center transition-all duration-300",
                                                    style: {
                                                        background: 'rgba(20,10,14,0.9)',
                                                        border: '2px solid rgba(255,107,53,0.35)',
                                                        boxShadow: '0 0 20px rgba(255,107,53,0.2)'
                                                    },
                                                    children: [
                                                        state.avatarPreview ?? profile?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            src: state.avatarPreview ?? profile.avatar_url,
                                                            alt: "avatar",
                                                            fill: true,
                                                            className: "object-cover",
                                                            sizes: "80px"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/profile/page.tsx",
                                                            lineNumber: 712,
                                                            columnNumber: 21
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xl font-black",
                                                            style: {
                                                                fontFamily: F_BE,
                                                                color: 'var(--orange)'
                                                            },
                                                            children: initials
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/profile/page.tsx",
                                                            lineNumber: 714,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
                                                            style: {
                                                                background: 'rgba(0,0,0,0.6)'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconCamera, {}, void 0, false, {
                                                                fileName: "[project]/app/profile/page.tsx",
                                                                lineNumber: 719,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/profile/page.tsx",
                                                            lineNumber: 717,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/profile/page.tsx",
                                                    lineNumber: 707,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center",
                                                    style: {
                                                        background: 'linear-gradient(135deg,var(--orange),var(--yellow))',
                                                        boxShadow: '0 2px 8px rgba(255,107,53,0.4)'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconCamera, {}, void 0, false, {
                                                        fileName: "[project]/app/profile/page.tsx",
                                                        lineNumber: 724,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/profile/page.tsx",
                                                    lineNumber: 722,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/profile/page.tsx",
                                            lineNumber: 702,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs mt-2 tracking-wider font-bold",
                                            style: {
                                                color: 'rgba(200,150,120,0.5)',
                                                fontFamily: F_MONO
                                            },
                                            children: "Toca para cambiar avatar"
                                        }, void 0, false, {
                                            fileName: "[project]/app/profile/page.tsx",
                                            lineNumber: 727,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ref: fileRef,
                                            type: "file",
                                            accept: "image/*",
                                            className: "sr-only",
                                            onChange: handleAvatarChange
                                        }, void 0, false, {
                                            fileName: "[project]/app/profile/page.tsx",
                                            lineNumber: 730,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/profile/page.tsx",
                                    lineNumber: 701,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        {
                                            label: 'Nombre',
                                            value: state.editFirst,
                                            setter: setEditFirst,
                                            placeholder: 'Tu nombre',
                                            type: 'text'
                                        },
                                        {
                                            label: 'Apellido',
                                            value: state.editLast,
                                            setter: setEditLast,
                                            placeholder: 'Tu apellido',
                                            type: 'text'
                                        },
                                        {
                                            label: 'Código de país',
                                            value: state.editCountry,
                                            setter: setEditCountry,
                                            placeholder: '+503',
                                            type: 'text'
                                        },
                                        {
                                            label: 'Teléfono',
                                            value: state.editPhone,
                                            setter: setEditPhone,
                                            placeholder: '7000-0000',
                                            type: 'tel'
                                        }
                                    ].map(({ label, value, setter, placeholder, type })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "modal-field",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: LABEL_STYLE,
                                                    className: "block mb-1.5",
                                                    children: label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/profile/page.tsx",
                                                    lineNumber: 742,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: type,
                                                    value: value,
                                                    onChange: (e)=>setter(e.target.value),
                                                    placeholder: placeholder,
                                                    style: {
                                                        ...INPUT_STYLE,
                                                        transformStyle: 'preserve-3d',
                                                        transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s'
                                                    },
                                                    onFocus: (e)=>{
                                                        e.currentTarget.style.borderColor = 'rgba(255,107,53,0.85)';
                                                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.25), 0 0 20px rgba(255,107,53,0.15)';
                                                        e.currentTarget.style.transform = 'translateZ(8px)';
                                                    },
                                                    onBlur: (e)=>{
                                                        e.currentTarget.style.borderColor = 'rgba(255,107,53,0.2)';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                        e.currentTarget.style.transform = 'translateZ(0)';
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/profile/page.tsx",
                                                    lineNumber: 743,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, label, true, {
                                            fileName: "[project]/app/profile/page.tsx",
                                            lineNumber: 741,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/profile/page.tsx",
                                    lineNumber: 734,
                                    columnNumber: 13
                                }, this),
                                state.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 px-3 py-2 rounded-lg text-xs text-center font-bold",
                                    style: {
                                        background: 'rgba(220,40,40,0.15)',
                                        border: '2px solid rgba(220,40,40,0.35)',
                                        color: '#ff6b6b',
                                        fontFamily: F_MONO
                                    },
                                    children: state.error
                                }, void 0, false, {
                                    fileName: "[project]/app/profile/page.tsx",
                                    lineNumber: 758,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 mt-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: closeEdit,
                                            className: "modal-action flex-1 py-3 rounded-xl text-sm font-bold tracking-wider transition-all duration-200",
                                            style: {
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '2px solid rgba(255,107,53,0.2)',
                                                color: 'rgba(200,150,120,0.7)',
                                                fontFamily: F_MONO,
                                                cursor: 'pointer',
                                                transformStyle: 'preserve-3d',
                                                willChange: 'transform'
                                            },
                                            onMouseMove: (e)=>{
                                                magneticMove(e, 0.15);
                                                tiltMove(e, -2, 8);
                                            },
                                            onMouseEnter: (e)=>e.currentTarget.style.borderColor = 'rgba(255,107,53,0.4)',
                                            onMouseLeave: (e)=>{
                                                magneticReset(e);
                                                tiltReset(e);
                                                e.currentTarget.style.borderColor = 'rgba(255,107,53,0.2)';
                                            },
                                            children: "Cancelar"
                                        }, void 0, false, {
                                            fileName: "[project]/app/profile/page.tsx",
                                            lineNumber: 766,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleSave,
                                            disabled: state.isSaving,
                                            className: "modal-action flex-1 py-3 rounded-xl text-sm font-black tracking-wider flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60",
                                            style: {
                                                background: 'linear-gradient(135deg,var(--orange),var(--yellow))',
                                                color: '#fff',
                                                fontFamily: F_BE,
                                                boxShadow: '0 4px 16px rgba(255,107,53,0.35)',
                                                border: 'none',
                                                cursor: 'pointer',
                                                letterSpacing: '0.1em',
                                                transformStyle: 'preserve-3d',
                                                willChange: 'transform'
                                            },
                                            onMouseMove: (e)=>{
                                                if (!state.isSaving) {
                                                    magneticMove(e, 0.15);
                                                    tiltMove(e, -2, 8);
                                                }
                                            },
                                            onMouseEnter: (e)=>!state.isSaving && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
                                                    scale: 1.03,
                                                    duration: 0.2
                                                }),
                                            onMouseLeave: (e)=>{
                                                magneticReset(e);
                                                tiltReset(e);
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
                                                    scale: 1,
                                                    duration: 0.2
                                                });
                                            },
                                            children: state.isSaving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconSpinner, {}, void 0, false, {
                                                        fileName: "[project]/app/profile/page.tsx",
                                                        lineNumber: 785,
                                                        columnNumber: 37
                                                    }, this),
                                                    " Guardando..."
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconSave, {}, void 0, false, {
                                                        fileName: "[project]/app/profile/page.tsx",
                                                        lineNumber: 785,
                                                        columnNumber: 73
                                                    }, this),
                                                    " Guardar"
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/app/profile/page.tsx",
                                            lineNumber: 776,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/profile/page.tsx",
                                    lineNumber: 765,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/profile/page.tsx",
                            lineNumber: 667,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/profile/page.tsx",
                        lineNumber: 663,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/profile/page.tsx",
                lineNumber: 477,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=_13t0cgi._.js.map