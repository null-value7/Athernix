module.exports = [
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[project]/models/AI/chatbot.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALT_QUICK_PROMPTS",
    ()=>ALT_QUICK_PROMPTS,
    "createChatSession",
    ()=>createChatSession,
    "fetchSessionMessages",
    ()=>fetchSessionMessages,
    "fetchUserSessions",
    ()=>fetchUserSessions,
    "formatRelativeDate",
    ()=>formatRelativeDate,
    "initialAltChatState",
    ()=>initialAltChatState,
    "insertChatMessage",
    ()=>insertChatMessage,
    "makeAltSessionTitle",
    ()=>makeAltSessionTitle,
    "parseAltStreamChunk",
    ()=>parseAltStreamChunk
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
;
//DB Connection
function getSupabase() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://tucsuclhwanifjexmztr.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Y3N1Y2xod2FuaWZqZXhtenRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTM5NjQsImV4cCI6MjA4ODAyOTk2NH0.QEpeZ5xLs1R3sdllblWqxbk8sAz69u8QqBU3LJR2aD0"));
}
const initialAltChatState = {
    sessions: [],
    currentSession: null,
    messages: [],
    input: '',
    busy: false,
    sidebarOpen: false,
    hasMessages: false
};
const ALT_QUICK_PROMPTS = [
    '¿Qué puedes hacer como asistente?',
    '¿Qué logros puedo desbloquear?',
    'Explícame qué es Athernix',
    '¿Cómo funciona la terapia XR?'
];
function parseAltStreamChunk(line) {
    if (line.startsWith('data: ')) {
        const data = line.slice(6).trim();
        if (data === '[DONE]') return '';
        try {
            const j = JSON.parse(data);
            return j.choices?.[0]?.delta?.content ?? j.delta?.text ?? '';
        } catch  {
            return data;
        }
    }
    if (line && !line.startsWith(':') && !line.startsWith('event:')) {
        try {
            const j = JSON.parse(line);
            return j.content ?? j.text ?? '';
        } catch  {
            return line.length > 1 ? line : '';
        }
    }
    return '';
}
function makeAltSessionTitle(text) {
    return text.split(' ').slice(0, 5).join(' ') + '…';
}
function formatRelativeDate(iso) {
    const date = new Date(iso);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / 86_400_000);
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return new Intl.DateTimeFormat('es-SV', {
        day: 'numeric',
        month: 'short'
    }).format(date);
}
async function fetchUserSessions() {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const { data, error } = await supabase.from('chat_sessions').select('*').eq('user_id', user.id).eq('is_archived', false).order('updated_at', {
        ascending: false
    });
    if (error || !data) return [];
    return data.map((row)=>({
            id: row.id,
            title: row.title,
            date: formatRelativeDate(row.updated_at),
            msgs: []
        }));
}
async function fetchSessionMessages(sessionId) {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('chat_messages').select('*').eq('session_id', sessionId).order('created_at', {
        ascending: true
    });
    if (error || !data) return [];
    return data.map((row)=>({
            id: row.id,
            role: row.role === 'assistant' ? 'ai' : 'user',
            text: row.content
        }));
}
async function createChatSession(title) {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data, error } = await supabase.from('chat_sessions').insert({
        user_id: user.id,
        title
    }).select('id').single();
    if (error || !data) return null;
    return {
        id: data.id
    };
}
async function insertChatMessage(sessionId, role, content) {
    if (!content.trim()) return false // evita guardar mensajes vacíos
    ;
    const supabase = getSupabase();
    const { error } = await supabase.from('chat_messages').insert({
        session_id: sessionId,
        role,
        content
    });
    return !error;
}
}),
"[project]/controllers/AI/chatbot.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAltChatController",
    ()=>useAltChatController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ai-sdk/react/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/ai/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$AI$2f$chatbot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/AI/chatbot.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
// ── Helper: extrae texto de parts usando helper oficial del SDK ─
function getText(parts) {
    return parts?.find(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isTextUIPart"])?.text ?? '';
}
const initialSidebar = {
    sessions: [],
    currentSession: null,
    sidebarOpen: false
};
function useAltChatController() {
    const [sidebar, setSidebar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialSidebar);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Ref con el id de sesión actual — necesario porque onFinish
    // es un closure que puede quedar con un valor stale de state.
    const currentSessionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollToBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setTimeout(()=>messagesEndRef.current?.scrollIntoView({
                behavior: 'smooth'
            }), 30);
    }, []);
    // ── Cargar historial real desde Supabase al montar ────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        (async ()=>{
            const sessions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$AI$2f$chatbot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchUserSessions"])();
            if (!cancelled) {
                setSidebar((s)=>({
                        ...s,
                        sessions
                    }));
            }
        })();
        return ()=>{
            cancelled = true;
        };
    }, []);
    // ── useChat (AI SDK v6) ───────────────────────────────────
    const { messages, status, setMessages, sendMessage: sdkSend } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChat"])({
        transport: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DefaultChatTransport"]({
            api: '/api/chat'
        }),
        // Se dispara al terminar el streaming de cada respuesta.
        // Aquí persistimos en Supabase: user + assistant.
        onEnd: async ({ message, messages: finishedMsgs })=>{
            const userMsg = [
                ...finishedMsgs
            ].reverse().find((m)=>m.role === 'user');
            const userText = getText(userMsg?.parts ?? []);
            const assistantText = getText(message.parts);
            let sessionId = currentSessionRef.current;
            // 1. Si no hay sesión activa, crearla en Supabase ahora
            if (!sessionId) {
                const created = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$AI$2f$chatbot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChatSession"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$AI$2f$chatbot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeAltSessionTitle"])(userText || 'Nueva sesión'));
                if (created) {
                    sessionId = created.id;
                    currentSessionRef.current = sessionId;
                }
            }
            // 2. Persistir ambos mensajes (si hay sesión válida)
            if (sessionId) {
                if (userText) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$AI$2f$chatbot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["insertChatMessage"])(sessionId, 'user', userText);
                if (assistantText) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$AI$2f$chatbot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["insertChatMessage"])(sessionId, 'assistant', assistantText);
            }
            // 3. Actualizar UI del sidebar
            const allMsgs = finishedMsgs.filter((m)=>m.role === 'user' || m.role === 'assistant').map((m)=>({
                    role: m.role === 'assistant' ? 'ai' : 'user',
                    text: getText(m.parts)
                })).filter((m)=>m.text.length > 0);
            setSidebar((s)=>{
                let sessions = [
                    ...s.sessions
                ];
                const exists = sessionId && sessions.some((sess)=>sess.id === sessionId);
                if (sessionId && !exists) {
                    const newSess = {
                        id: sessionId,
                        title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$AI$2f$chatbot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeAltSessionTitle"])(userText || 'Nueva sesión'),
                        date: 'Ahora',
                        msgs: allMsgs
                    };
                    sessions = [
                        newSess,
                        ...sessions
                    ];
                } else if (sessionId) {
                    sessions = sessions.map((sess)=>sess.id === sessionId ? {
                            ...sess,
                            msgs: allMsgs,
                            date: 'Ahora'
                        } : sess);
                }
                return {
                    ...s,
                    sessions,
                    currentSession: sessionId
                };
            });
            scrollToBottom();
        }
    });
    const busy = status === 'streaming' || status === 'submitted';
    // ── Sidebar controls ──────────────────────────────────────
    const toggleSidebar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setSidebar((s)=>({
                ...s,
                sidebarOpen: !s.sidebarOpen
            }));
    }, []);
    const newChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setMessages([]);
        setInput('');
        currentSessionRef.current = null;
        setSidebar((s)=>({
                ...s,
                currentSession: null,
                sidebarOpen: false
            }));
    }, [
        setMessages
    ]);
    // ── Cargar una sesión pasada — ahora lee de Supabase ───────
    const loadSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        const msgs = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$AI$2f$chatbot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchSessionMessages"])(id);
        setMessages(msgs.map((m, i)=>({
                id: `${id}-${i}`,
                role: m.role === 'ai' ? 'assistant' : 'user',
                parts: [
                    {
                        type: 'text',
                        text: m.text
                    }
                ],
                createdAt: new Date()
            })));
        currentSessionRef.current = id;
        setSidebar((s)=>({
                ...s,
                currentSession: id,
                sidebarOpen: false
            }));
        scrollToBottom();
    }, [
        setMessages,
        scrollToBottom
    ]);
    // ── Send ──────────────────────────────────────────────────
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((text)=>{
        const trimmed = text.trim();
        if (!trimmed || busy) return;
        sdkSend({
            text: trimmed
        });
        setInput('');
        scrollToBottom();
    }, [
        busy,
        sdkSend,
        scrollToBottom
    ]);
    // ── Form / key handlers ───────────────────────────────────
    const handleSubmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        e.preventDefault();
        sendMessage(input);
    }, [
        input,
        sendMessage
    ]);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    }, [
        input,
        sendMessage
    ]);
    // ── Convertir SDK messages → formato de la view ───────────
    const altMessages = messages.filter((m)=>m.role === 'user' || m.role === 'assistant').map((m)=>({
            role: m.role === 'assistant' ? 'ai' : 'user',
            text: getText(m.parts)
        }));
    const state = {
        sessions: sidebar.sessions,
        currentSession: sidebar.currentSession,
        messages: altMessages,
        input,
        busy,
        sidebarOpen: sidebar.sidebarOpen,
        hasMessages: altMessages.length > 0
    };
    return {
        state,
        messagesEndRef,
        toggleSidebar,
        newChat,
        loadSession,
        setInput,
        sendMessage,
        handleKeyDown,
        handleSubmit
    };
}
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs) <export default as minpath>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "minpath",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
}),
"[externals]/node:process [external] (node:process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:process", () => require("node:process"));

module.exports = mod;
}),
"[externals]/node:process [external] (node:process, cjs) <export default as minproc>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "minproc",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:process [external] (node:process, cjs)");
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs) <export fileURLToPath as urlToPath>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "urlToPath",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
}),
"[project]/components/chatbot/roadmaps.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MermaidDiagram",
    ()=>MermaidDiagram
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mermaid$2f$dist$2f$mermaid$2e$core$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mermaid/dist/mermaid.core.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
// 1. CONFIGURACIÓN GLOBAL
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mermaid$2f$dist$2f$mermaid$2e$core$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].initialize({
    startOnLoad: false,
    suppressErrorRendering: true,
    theme: 'base',
    themeVariables: {
        fontFamily: "'Rajdhani', sans-serif",
        primaryColor: '#12081c',
        primaryTextColor: '#ede0d4',
        primaryBorderColor: 'rgba(200,80,255,0.4)',
        lineColor: '#ff6b35',
        secondaryColor: '#1c0a08',
        tertiaryColor: '#08040c'
    }
});
const MermaidDiagram = ({ chart })=>{
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isError, setIsError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true); // Asumimos que está incompleto al inicio
    const uniqueId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])().replace(/:/g, ''); // Crea un ID único seguro para React
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let isMounted = true;
        // 2. DEBOUNCE: Esperamos 400ms sin que la IA escriba antes de procesar
        const timeoutId = setTimeout(async ()=>{
            if (!containerRef.current) return;
            try {
                const cleanChart = chart.replace(/,\s*$/gm, '').trim();
                // Renderizamos usando nuestro ID único
                const { svg } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mermaid$2f$dist$2f$mermaid$2e$core$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].render(`mermaid-${uniqueId}`, cleanChart);
                if (isMounted && containerRef.current) {
                    containerRef.current.innerHTML = svg;
                    setIsError(false); // ¡Éxito! Ocultamos el mensaje de "Decodificando"
                }
            } catch (e) {
                // Si hay un error de sintaxis temporal, mantenemos el estado de carga
                if (isMounted) {
                    setIsError(true);
                }
            }
        }, 400); // 400 milisegundos de respiro para el navegador
        return ()=>{
            isMounted = false;
            clearTimeout(timeoutId); // Limpiamos el temporizador si llega una letra nueva
        };
    }, [
        chart,
        uniqueId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            margin: '12px 0',
            background: 'rgba(8,4,14,0.5)',
            border: '1px solid rgba(200,80,255,0.2)',
            borderRadius: '8px',
            overflowX: 'auto',
            display: 'flex',
            justifyContent: 'center',
            padding: '10px'
        },
        children: [
            isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '14px',
                    color: 'rgba(210,170,140,0.5)',
                    fontSize: '0.65rem',
                    textAlign: 'center',
                    border: '1px dashed rgba(200,80,255,0.2)',
                    borderRadius: '6px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                },
                children: "[ Decodificando red neural... ]"
            }, void 0, false, {
                fileName: "[project]/components/chatbot/roadmaps.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                style: {
                    display: isError ? 'none' : 'block',
                    width: '100%'
                }
            }, void 0, false, {
                fileName: "[project]/components/chatbot/roadmaps.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/chatbot/roadmaps.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/simulators/VectorVisualizer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VectorVisualizer",
    ()=>VectorVisualizer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const VectorVisualizer = ({ v1, v2, resultant })=>{
    const scale = 30; // Factor para que se vea bien en pantalla
    const offset = 150; // Centrado en el canvas de 300x300
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "300",
        height: "300",
        style: {
            background: '#0a0a1a',
            borderRadius: '8px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                y1: offset,
                x2: "300",
                y2: offset,
                stroke: "#333"
            }, void 0, false, {
                fileName: "[project]/components/simulators/VectorVisualizer.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: offset,
                y1: "0",
                x2: offset,
                y2: "300",
                stroke: "#333"
            }, void 0, false, {
                fileName: "[project]/components/simulators/VectorVisualizer.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: offset,
                y1: offset,
                x2: offset + v1.x * scale,
                y2: offset - v1.y * scale,
                stroke: "#ff6b35",
                strokeWidth: "4"
            }, void 0, false, {
                fileName: "[project]/components/simulators/VectorVisualizer.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: offset,
                y1: offset,
                x2: offset + v2.x * scale,
                y2: offset - v2.y * scale,
                stroke: "#3b82f6",
                strokeWidth: "4"
            }, void 0, false, {
                fileName: "[project]/components/simulators/VectorVisualizer.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: offset,
                y1: offset,
                x2: offset + resultant.x * scale,
                y2: offset - resultant.y * scale,
                stroke: "#7fffd4",
                strokeWidth: "6",
                strokeDasharray: "5,5"
            }, void 0, false, {
                fileName: "[project]/components/simulators/VectorVisualizer.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/simulators/VectorVisualizer.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/chatbot/AtherVoice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAtherVoice",
    ()=>useAtherVoice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
// ── Helpers ────────────────────────────────────────────────────
function pickRoboticVoice() {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;
    const preferred = [
        'Google UK English Male',
        'Microsoft David',
        'Microsoft Mark',
        'Alex',
        'Google US English'
    ];
    for (const name of preferred){
        const found = voices.find((v)=>v.name.includes(name));
        if (found) return found;
    }
    return voices.find((v)=>v.lang.startsWith('es')) ?? voices[0];
}
// Limpia el texto para TTS: quita markdown, LaTeX, bloques de código.
// Se aplica ANTES de mandarlo tanto a ElevenLabs como al fallback del navegador
function cleanForSpeech(text) {
    return text.replace(/```[\s\S]*?```/g, 'bloque de código omitido.').replace(/\$\$[\s\S]*?\$\$/g, 'fórmula matemática.').replace(/\$[^$]+\$/g, 'expresión matemática.').replace(/[*_`#>~]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ').trim();
}
// Reproduce Web Speech API como Promise, para poder await-earlo igual que ElevenLabs.
function speakWithBrowserTTS(clean) {
    return new Promise((resolve)=>{
        if (!('speechSynthesis' in window)) return resolve();
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.rate = 0.92;
        utterance.pitch = 0.75;
        utterance.volume = 1;
        const voice = pickRoboticVoice();
        if (voice) utterance.voice = voice;
        utterance.onend = ()=>resolve();
        utterance.onerror = ()=>resolve(); // no rompemos el flujo por un error de voz
        window.speechSynthesis.speak(utterance);
    });
}
function useAtherVoice(onTranscript, voiceModeActive = false) {
    const [voiceState, setVoiceState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        ttsEnabled: false,
        isSpeaking: false,
        isListening: false,
        transcript: '',
        supported: {
            tts: false,
            stt: false
        }
    });
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioUrlRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const abortRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ── Detectar soporte al montar ──────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const tts = ("TURBOPACK compile-time value", "undefined") !== 'undefined' && 'speechSynthesis' in window;
        const stt = ("TURBOPACK compile-time value", "undefined") !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
        setVoiceState((s)=>({
                ...s,
                supported: {
                    tts,
                    stt
                }
            }));
    }, []);
    // Limpieza de un audio de ElevenLabs previo (si lo hay) antes de reproducir uno nuevo
    const cleanupAudio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.onended = null;
            audioRef.current.onerror = null;
            audioRef.current = null;
        }
        if (audioUrlRef.current) {
            URL.revokeObjectURL(audioUrlRef.current);
            audioUrlRef.current = null;
        }
    }, []);
    // ── TTS: Ather habla (ElevenLabs primero, navegador como respaldo) ──
    const speak = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((text)=>{
        const clean = cleanForSpeech(text);
        if (!clean) return Promise.resolve();
        // Cancela cualquier audio/voz en curso antes de empezar uno nuevo
        cleanupAudio();
        window.speechSynthesis?.cancel();
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;
        setVoiceState((s)=>({
                ...s,
                isSpeaking: true
            }));
        return fetch('/api/tts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: clean
            }),
            signal: controller.signal
        }).then(async (res)=>{
            if (!res.ok) throw new Error(`TTS respondió ${res.status}`);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            audioUrlRef.current = url;
            const audio = new Audio(url);
            audioRef.current = audio;
            return new Promise((resolve, reject)=>{
                audio.onended = ()=>resolve();
                audio.onerror = ()=>reject(new Error('Error reproduciendo audio de ElevenLabs'));
                audio.play().catch(reject);
            });
        }).catch((err)=>{
            if (controller.signal.aborted) return; // fue interrumpido a propósito, no es un fallo real
            console.warn('[speak] ElevenLabs falló, usando voz del navegador como respaldo:', err?.message ?? err);
            return speakWithBrowserTTS(clean);
        }).finally(()=>{
            cleanupAudio();
            setVoiceState((s)=>({
                    ...s,
                    isSpeaking: false
                }));
        });
    }, [
        cleanupAudio
    ]);
    const stopSpeaking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        abortRef.current?.abort();
        cleanupAudio();
        window.speechSynthesis?.cancel();
        setVoiceState((s)=>({
                ...s,
                isSpeaking: false
            }));
    }, [
        cleanupAudio
    ]);
    const toggleTTS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setVoiceState((s)=>{
            if (s.ttsEnabled) {
                abortRef.current?.abort();
                cleanupAudio();
                window.speechSynthesis?.cancel();
            }
            return {
                ...s,
                ttsEnabled: !s.ttsEnabled,
                isSpeaking: false
            };
        });
    }, [
        cleanupAudio
    ]);
    // ── STT: usuario habla (sin cambios, Web Speech API) ────────
    const startListening = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (voiceModeActive) return;
        const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
        if (!SR) return;
        const recognition = new SR();
        recognition.lang = 'es-ES';
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        recognition.onstart = ()=>setVoiceState((s)=>({
                    ...s,
                    isListening: true,
                    transcript: ''
                }));
        recognition.onresult = (e)=>{
            let interim = '';
            let final = '';
            for(let i = e.resultIndex; i < e.results.length; i++){
                const t = e.results[i][0].transcript;
                if (e.results[i].isFinal) final += t;
                else interim += t;
            }
            setVoiceState((s)=>({
                    ...s,
                    transcript: final || interim
                }));
            if (final.trim()) {
                onTranscript(final.trim());
                setVoiceState((s)=>({
                        ...s,
                        transcript: ''
                    }));
            }
        };
        recognition.onerror = ()=>setVoiceState((s)=>({
                    ...s,
                    isListening: false,
                    transcript: ''
                }));
        recognition.onend = ()=>setVoiceState((s)=>({
                    ...s,
                    isListening: false
                }));
        recognitionRef.current = recognition;
        recognition.start();
    }, [
        onTranscript,
        voiceModeActive
    ]);
    const stopListening = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        recognitionRef.current?.stop();
        setVoiceState((s)=>({
                ...s,
                isListening: false,
                transcript: ''
            }));
    }, []);
    // Cleanup al desmontar
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            abortRef.current?.abort();
            cleanupAudio();
            window.speechSynthesis?.cancel();
            recognitionRef.current?.stop();
        };
    }, [
        cleanupAudio
    ]);
    return {
        voiceState,
        speak,
        stopSpeaking,
        toggleTTS,
        startListening,
        stopListening
    };
}
}),
"[project]/components/chatbot/VoiceMode/VoiceMode.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVoiceMode",
    ()=>useVoiceMode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// components/chatbot/VoiceMode/VoiceMode.ts
// grabar → Groq Whisper STT → LLM (texto plano) → Web Speech TTS
// se cancela el TTS y se graba al usuario cuando se interrumpe.
'use client';
;
// ── Helpers ────────────────────────────────────────────────────
function cleanForSpeech(text) {
    return text.replace(/```[\s\S]*?```/g, 'bloque de código omitido.').replace(/\$\$[\s\S]*?\$\$/g, 'fórmula matemática.').replace(/\$[^$]+\$/g, 'expresión matemática.').replace(/[*_`#>~]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ').trim();
}
function pickRoboticVoice() {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;
    const preferred = [
        'Google UK English Male',
        'Microsoft David',
        'Microsoft Mark',
        'Alex'
    ];
    for (const name of preferred){
        const v = voices.find((v)=>v.name.includes(name));
        if (v) return v;
    }
    return voices.find((v)=>v.lang.startsWith('es')) ?? voices[0];
}
function useVoiceMode(onMessage) {
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        active: false,
        turn: 'idle',
        transcript: '',
        response: '',
        error: null
    });
    const mediaRecorderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chunksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const streamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const silenceTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const abortRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioUrlRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Corta cualquier audio de ElevenLabs en curso (usado por closeVoiceMode,
    // interrupt y antes de reproducir uno nuevo). Debe ir ANTES de cualquier
    // useCallback que la referencie en su deps array.
    const cleanupAudio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.onended = null;
            audioRef.current.onerror = null;
            audioRef.current = null;
        }
        if (audioUrlRef.current) {
            URL.revokeObjectURL(audioUrlRef.current);
            audioUrlRef.current = null;
        }
    }, []);
    const openVoiceMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        abortRef.current = false;
        setState((s)=>({
                ...s,
                active: true,
                turn: 'idle',
                error: null
            }));
    }, []);
    const closeVoiceMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        abortRef.current = true;
        window.speechSynthesis?.cancel();
        cleanupAudio();
        mediaRecorderRef.current?.stop();
        streamRef.current?.getTracks().forEach((t)=>t.stop());
        if (silenceTimer.current) clearTimeout(silenceTimer.current);
        setState((s)=>({
                ...s,
                active: false,
                turn: 'idle'
            }));
    }, [
        cleanupAudio
    ]);
    // ElevenLabs primero (misma voz que el resto de Ather); si falla,
    // cae automáticamente a la voz sintética del navegador.
    const speak = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((text, onEnd)=>{
        const clean = cleanForSpeech(text);
        if (!clean) {
            onEnd();
            return;
        }
        cleanupAudio();
        window.speechSynthesis?.cancel();
        setState((s)=>({
                ...s,
                turn: 'speaking'
            }));
        fetch('/api/tts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: clean
            })
        }).then(async (res)=>{
            if (!res.ok) throw new Error(`TTS respondió ${res.status}`);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            audioUrlRef.current = url;
            const audio = new Audio(url);
            audioRef.current = audio;
            return new Promise((resolve, reject)=>{
                audio.onended = ()=>resolve();
                audio.onerror = ()=>reject(new Error('Error reproduciendo audio de ElevenLabs'));
                audio.play().catch(reject);
            });
        }).catch((err)=>{
            console.warn('[VoiceMode] ElevenLabs falló, usando voz del navegador:', err?.message ?? err);
            return new Promise((resolve)=>{
                const utt = new SpeechSynthesisUtterance(clean);
                utt.rate = 0.9;
                utt.pitch = 0.7;
                utt.volume = 1;
                const voice = pickRoboticVoice();
                if (voice) utt.voice = voice;
                utt.onend = ()=>resolve();
                utt.onerror = ()=>resolve();
                window.speechSynthesis.speak(utt);
            });
        }).finally(()=>{
            cleanupAudio();
            if (!abortRef.current) onEnd();
        });
    }, [
        cleanupAudio
    ]);
    const startRecording = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (abortRef.current) return;
        setState((s)=>({
                ...s,
                turn: 'listening',
                transcript: ''
            }));
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
            streamRef.current = stream;
            chunksRef.current = [];
            const recorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm'
            });
            mediaRecorderRef.current = recorder;
            recorder.ondataavailable = (e)=>{
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };
            recorder.onstop = async ()=>{
                stream.getTracks().forEach((t)=>t.stop());
                if (abortRef.current) return;
                const blob = new Blob(chunksRef.current, {
                    type: 'audio/webm'
                });
                await transcribeAndRespond(blob);
            };
            recorder.start();
            silenceTimer.current = setTimeout(()=>{
                if (recorder.state === 'recording') recorder.stop();
            }, 8000);
        } catch  {
            setState((s)=>({
                    ...s,
                    error: 'No se pudo acceder al micrófono.',
                    turn: 'idle'
                }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // ── Transcribir + llamar al LLM (texto plano, sin parseo de protocolo) ──
    const transcribeAndRespond = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (blob)=>{
        if (abortRef.current) return;
        setState((s)=>({
                ...s,
                turn: 'processing'
            }));
        try {
            // 1. Groq Whisper STT
            const form = new FormData();
            form.append('audio', blob, 'recording.webm');
            const sttRes = await fetch('/api/transcribe', {
                method: 'POST',
                body: form
            });
            const sttData = await sttRes.json();
            const userText = sttData.text ?? '';
            if (!userText.trim() || abortRef.current) {
                setState((s)=>({
                        ...s,
                        turn: 'idle'
                    }));
                return;
            }
            // Limpiamos la ronda anterior ANTES de pedir la nueva respuesta,
            // así si algo falla no se queda pegado el estado viejo en pantalla.
            setState((s)=>({
                    ...s,
                    transcript: userText,
                    response: '',
                    error: null
                }));
            onMessage('user', userText);
            // 2. LLM — endpoint dedicado de texto plano (sin tools, sin framing UIMessage)
            const chatRes = await fetch('/api/voice-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: userText
                })
            });
            if (!chatRes.ok || !chatRes.body) throw new Error('LLM error');
            const reader = chatRes.body.getReader();
            const decoder = new TextDecoder();
            let aiText = '';
            while(true){
                const { done, value } = await reader.read();
                if (done) break;
                aiText += decoder.decode(value, {
                    stream: true
                });
            }
            if (abortRef.current) return;
            const cleanAI = aiText.trim();
            if (!cleanAI) {
                setState((s)=>({
                        ...s,
                        turn: 'idle',
                        error: 'Ather no generó respuesta. Intenta de nuevo.'
                    }));
                return;
            }
            setState((s)=>({
                    ...s,
                    response: cleanAI
                }));
            onMessage('ai', cleanAI);
            // 3. TTS
            speak(cleanAI, ()=>{
                if (!abortRef.current) startRecording();
            });
        } catch (err) {
            console.error('[voiceMode]', err);
            setState((s)=>({
                    ...s,
                    error: 'Error en la conexión neural.',
                    turn: 'idle'
                }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        onMessage,
        speak
    ]);
    const interrupt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        window.speechSynthesis?.cancel();
        cleanupAudio();
        if (silenceTimer.current) clearTimeout(silenceTimer.current);
        startRecording();
    }, [
        startRecording,
        cleanupAudio
    ]);
    const startVoiceCycle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        abortRef.current = false;
        startRecording();
    }, [
        startRecording
    ]);
    return {
        state,
        openVoiceMode,
        closeVoiceMode,
        startVoiceCycle,
        interrupt
    };
}
}),
"[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VoiceModeOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
const F_ORB = "'Bebas Neue', sans-serif";
const F_RAJ = "'Plus Jakarta Sans', sans-serif";
const F_MONO = "'JetBrains Mono', monospace";
// ── Etiquetas de estado ────────────────────────────────────────
const TURN_LABEL = {
    idle: 'TOCA PARA HABLAR',
    listening: 'ESCUCHANDO...',
    processing: 'PROCESANDO...',
    speaking: 'ATHER HABLANDO'
};
// Paleta unificada con /modulos y el resto de Athernix
const TURN_COLOR = {
    idle: 'rgba(255,0,110,0.55)',
    listening: '#FF6B00',
    processing: '#FFD700',
    speaking: '#FF006E'
};
// ── Campo de "blobs" animados (estilo Gemini) ───────────────────
// Se dibuja detrás/alrededor del orb original y se intensifica
// cuando Ather escucha o habla, sin sustituir el diseño anterior.
function VoiceBlobField({ active }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'absolute',
            inset: -30,
            borderRadius: '50%',
            overflow: 'hidden',
            mixBlendMode: 'screen',
            opacity: active ? 0.95 : 0.32,
            transition: 'opacity 0.45s ease',
            pointerEvents: 'none'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    width: '62%',
                    height: '62%',
                    top: '8%',
                    left: '6%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #FFD700, transparent 65%)',
                    filter: 'blur(16px)',
                    animation: `orbFloat1 ${active ? '2.6s' : '6.5s'} ease-in-out infinite`
                }
            }, void 0, false, {
                fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    width: '58%',
                    height: '58%',
                    top: '28%',
                    left: '36%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #FF006E, transparent 65%)',
                    filter: 'blur(16px)',
                    animation: `orbFloat2 ${active ? '2.1s' : '5.5s'} ease-in-out infinite`
                }
            }, void 0, false, {
                fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    width: '54%',
                    height: '54%',
                    top: '18%',
                    left: '18%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #FF6B00, transparent 65%)',
                    filter: 'blur(16px)',
                    animation: `orbFloat3 ${active ? '3.2s' : '7.2s'} ease-in-out infinite`
                }
            }, void 0, false, {
                fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
// ── Orb central animado ────────────────────────────────────────
function VoiceOrb({ turn, onClick }) {
    const color = TURN_COLOR[turn];
    const pulse = turn === 'listening' || turn === 'speaking';
    const spin = turn === 'processing';
    const blobActive = turn === 'listening' || turn === 'speaking';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'relative',
            width: 200,
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VoiceBlobField, {
                active: blobActive
            }, void 0, false, {
                fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 10,
                    borderRadius: '50%',
                    background: `conic-gradient(from 0deg, transparent, ${color}55, transparent 62%)`,
                    animation: 'orbRingSpin 3.4s linear infinite',
                    opacity: pulse || spin ? 1 : 0.35,
                    transition: 'opacity 0.3s'
                }
            }, void 0, false, {
                fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClick,
                style: {
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: `radial-gradient(circle at 38% 38%, ${color}30, rgba(8,4,14,0.95))`,
                    border: `2px solid ${color}`,
                    boxShadow: `0 0 ${pulse ? '48px' : '24px'} ${color}${pulse ? '80' : '40'}, inset 0 0 30px ${color}15`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'box-shadow 0.3s, border-color 0.3s',
                    animation: pulse ? 'orbPulse 1.4s ease-in-out infinite' : spin ? 'orbSpin 1.8s linear infinite' : 'none',
                    position: 'relative',
                    zIndex: 2,
                    flexShrink: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: F_ORB,
                            fontSize: '2.1rem',
                            color,
                            filter: `drop-shadow(0 0 12px ${color})`,
                            userSelect: 'none',
                            transition: 'color 0.3s'
                        },
                        children: "A"
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    turn === 'listening' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    position: 'absolute',
                                    inset: -12,
                                    borderRadius: '50%',
                                    border: `1px solid ${color}50`,
                                    animation: 'orbRing 1.4s ease-out infinite'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    position: 'absolute',
                                    inset: -24,
                                    borderRadius: '50%',
                                    border: `1px solid ${color}25`,
                                    animation: 'orbRing 1.4s 0.4s ease-out infinite'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    turn === 'speaking' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: 14,
                            display: 'flex',
                            gap: 3,
                            alignItems: 'flex-end'
                        },
                        children: [
                            0,
                            1,
                            2,
                            3,
                            4
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    display: 'block',
                                    width: 3,
                                    borderRadius: 2,
                                    background: color,
                                    animation: `orbBar 0.7s ${i * 0.1}s ease-in-out infinite`
                                }
                            }, i, false, {
                                fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                                lineNumber: 165,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
function VoiceModeOverlay({ state, onClose, onStartCycle, onInterrupt }) {
    if (!state.active) return null;
    const { turn, transcript, response, error } = state;
    const color = TURN_COLOR[turn];
    const handleOrbClick = ()=>{
        if (turn === 'idle') return onStartCycle();
        if (turn === 'speaking') return onInterrupt();
    // si está escuchando o procesando, no hacer nada
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        @keyframes orbPulse {
          0%,100% { box-shadow: 0 0 24px ${TURN_COLOR.listening}60, inset 0 0 30px ${TURN_COLOR.listening}15 }
          50%      { box-shadow: 0 0 60px ${TURN_COLOR.listening}90, inset 0 0 40px ${TURN_COLOR.listening}25 }
        }
        @keyframes orbSpin {
          to { transform: rotate(360deg) }
        }
        @keyframes orbRing {
          0%   { transform: scale(1);   opacity: 0.8 }
          100% { transform: scale(1.5); opacity: 0   }
        }
        @keyframes orbBar {
          0%,100% { height: 4px  }
          50%     { height: 18px }
        }
        @keyframes orbRingSpin {
          to { transform: rotate(360deg) }
        }
        @keyframes orbFloat1 {
          0%,100% { transform: translate(-8%,-6%) scale(1)    }
          50%      { transform: translate(10%,8%)  scale(1.18) }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(9%,7%)   scale(1.08) }
          50%      { transform: translate(-9%,-9%) scale(0.92) }
        }
        @keyframes orbFloat3 {
          0%,100% { transform: translate(-6%,9%)  scale(0.9)  }
          50%      { transform: translate(9%,-8%)  scale(1.22) }
        }
        @keyframes voiceIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px) }
          to   { opacity: 1; transform: scale(1)    translateY(0)     }
        }
        @keyframes voiceBgIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
      `
            }, void 0, false, {
                fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: onClose,
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 50,
                    background: 'rgba(4,2,8,0.86)',
                    backdropFilter: 'blur(14px)',
                    animation: 'voiceBgIn 0.25s ease-out'
                }
            }, void 0, false, {
                fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                lineNumber: 253,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 51,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        pointerEvents: 'auto',
                        width: 380,
                        maxWidth: '92vw',
                        background: 'rgba(8,4,14,0.97)',
                        border: `1px solid ${color}30`,
                        borderRadius: 24,
                        boxShadow: `0 0 90px ${color}18`,
                        padding: '36px 28px 28px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 18,
                        animation: 'voiceIn 0.28s ease-out'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                background: color,
                                                boxShadow: `0 0 8px ${color}`,
                                                display: 'inline-block'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                                            lineNumber: 295,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: F_MONO,
                                                fontSize: '0.6rem',
                                                color: 'rgba(210,170,140,0.5)',
                                                letterSpacing: '0.2em'
                                            },
                                            children: "ENLACE NEURAL ACTIVO"
                                        }, void 0, false, {
                                            fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                                            lineNumber: 301,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                                    lineNumber: 294,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    style: {
                                        background: 'transparent',
                                        border: '1px solid rgba(255,107,0,0.25)',
                                        borderRadius: 6,
                                        color: 'rgba(255,107,0,0.6)',
                                        cursor: 'pointer',
                                        padding: '3px 8px',
                                        fontFamily: F_MONO,
                                        fontSize: '0.6rem',
                                        letterSpacing: '0.12em'
                                    },
                                    children: "ESC"
                                }, void 0, false, {
                                    fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                                    lineNumber: 305,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                            lineNumber: 293,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VoiceOrb, {
                            turn: turn,
                            onClick: handleOrbClick
                        }, void 0, false, {
                            fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                            lineNumber: 324,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: F_ORB,
                                        fontSize: '0.95rem',
                                        letterSpacing: '0.2em',
                                        color,
                                        marginBottom: 4,
                                        transition: 'color 0.3s'
                                    },
                                    children: TURN_LABEL[turn]
                                }, void 0, false, {
                                    fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                                    lineNumber: 328,
                                    columnNumber: 13
                                }, this),
                                turn === 'idle' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: F_RAJ,
                                        fontSize: '0.65rem',
                                        color: 'rgba(210,170,140,0.3)',
                                        letterSpacing: '0.08em'
                                    },
                                    children: "Toca el orb para iniciar la conversación"
                                }, void 0, false, {
                                    fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                                    lineNumber: 339,
                                    columnNumber: 15
                                }, this),
                                turn === 'speaking' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: F_RAJ,
                                        fontSize: '0.65rem',
                                        color: 'rgba(210,170,140,0.3)',
                                        letterSpacing: '0.08em'
                                    },
                                    children: "Toca el orb para interrumpir"
                                }, void 0, false, {
                                    fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                                    lineNumber: 344,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                            lineNumber: 327,
                            columnNumber: 11
                        }, this),
                        transcript && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '100%',
                                padding: '10px 14px',
                                background: 'rgba(255,107,0,0.05)',
                                border: '1px solid rgba(255,107,0,0.15)',
                                borderLeft: '2px solid rgba(255,107,0,0.4)',
                                borderRadius: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: F_MONO,
                                        fontSize: '0.62rem',
                                        color: 'rgba(255,107,0,0.55)',
                                        letterSpacing: '0.12em',
                                        marginBottom: 4,
                                        textTransform: 'uppercase'
                                    },
                                    children: "↑ TÚ"
                                }, void 0, false, {
                                    fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                                    lineNumber: 360,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: F_RAJ,
                                        fontSize: '0.78rem',
                                        color: '#ede0d4',
                                        lineHeight: 1.6
                                    },
                                    children: transcript
                                }, void 0, false, {
                                    fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                                    lineNumber: 363,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                            lineNumber: 352,
                            columnNumber: 13
                        }, this),
                        response && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '100%',
                                padding: '10px 14px',
                                background: 'rgba(255,0,110,0.05)',
                                border: '1px solid rgba(255,0,110,0.14)',
                                borderLeft: '2px solid rgba(255,0,110,0.4)',
                                borderRadius: 8,
                                maxHeight: 120,
                                overflowY: 'auto'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: F_MONO,
                                        fontSize: '0.62rem',
                                        color: 'rgba(255,0,110,0.5)',
                                        letterSpacing: '0.12em',
                                        marginBottom: 4,
                                        textTransform: 'uppercase'
                                    },
                                    children: "◈ ATHER"
                                }, void 0, false, {
                                    fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                                    lineNumber: 381,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: F_RAJ,
                                        fontSize: '0.78rem',
                                        color: '#ede0d4',
                                        lineHeight: 1.6
                                    },
                                    children: response
                                }, void 0, false, {
                                    fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                                    lineNumber: 384,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                            lineNumber: 371,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: F_RAJ,
                                fontSize: '0.68rem',
                                color: '#ff4444',
                                textAlign: 'center'
                            },
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                            lineNumber: 392,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: F_MONO,
                                fontSize: '0.55rem',
                                color: 'rgba(210,170,140,0.2)',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase'
                            },
                            children: "Presiona ESC para cerrar · Toca el orb para hablar"
                        }, void 0, false, {
                            fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                            lineNumber: 398,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                    lineNumber: 275,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx",
                lineNumber: 266,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/chatbot/MessageAudioButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MessageAudioButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function MessageAudioButton({ text, isPlaying = false, onPlay, onStop }) {
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: isPlaying ? onStop : onPlay,
        onMouseEnter: ()=>setHovered(true),
        onMouseLeave: ()=>setHovered(false),
        style: {
            width: 32,
            height: 32,
            borderRadius: '8px',
            background: isPlaying ? 'rgba(255, 107, 53, 0.2)' : hovered ? 'rgba(200, 80, 255, 0.15)' : 'rgba(200, 80, 255, 0.08)',
            border: isPlaying ? '1px solid rgba(255, 107, 53, 0.5)' : '1px solid rgba(200, 80, 255, 0.25)',
            color: isPlaying ? '#ff6b35' : 'rgba(200, 80, 255, 0.7)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            flexShrink: 0
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            style: {
                width: 16,
                height: 16
            },
            children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 0 1 0 1.971l-11.54 6.347a1.125 1.125 0 0 1-1.667-.985V5.653Z"
            }, void 0, false, {
                fileName: "[project]/components/chatbot/MessageAudioButton.tsx",
                lineNumber: 51,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 0 1 0 1.971l-11.54 6.347a1.125 1.125 0 0 1-1.667-.985V5.653Z"
            }, void 0, false, {
                fileName: "[project]/components/chatbot/MessageAudioButton.tsx",
                lineNumber: 53,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/chatbot/MessageAudioButton.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/chatbot/MessageAudioButton.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/chatbot/UIChatbot/academicResources.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AcademicSourceCard",
    ()=>AcademicSourceCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// components/chatbot/UIChatbot/AcademicSourceCard.tsx
'use client';
;
const iconByType = {
    article: '📰',
    paper: '📄',
    pdf: '📕',
    web: '🌐'
};
function AcademicSourceCard({ sources }) {
    if (!sources?.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs opacity-60 italic px-2 py-1",
            children: "No se encontraron fuentes confiables para este tema."
        }, void 0, false, {
            fileName: "[project]/components/chatbot/UIChatbot/academicResources.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2 my-2",
        children: sources.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: s.url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "group block rounded-md border border-pink-500/20 bg-black/40 p-3 hover:border-pink-500/50 transition-colors",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-[0.6rem] uppercase tracking-widest opacity-50 mb-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: iconByType[s.sourceType]
                            }, void 0, false, {
                                fileName: "[project]/components/chatbot/UIChatbot/academicResources.tsx",
                                lineNumber: 32,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: s.sourceType
                            }, void 0, false, {
                                fileName: "[project]/components/chatbot/UIChatbot/academicResources.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this),
                            s.author && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "· ",
                                    s.author
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/chatbot/UIChatbot/academicResources.tsx",
                                lineNumber: 34,
                                columnNumber: 26
                            }, this),
                            s.publishedDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "· ",
                                    s.publishedDate
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/chatbot/UIChatbot/academicResources.tsx",
                                lineNumber: 35,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chatbot/UIChatbot/academicResources.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-semibold text-sm mb-1 group-hover:text-pink-400 transition-colors",
                        children: s.title
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot/UIChatbot/academicResources.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs opacity-70 leading-relaxed",
                        children: s.highlight
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot/UIChatbot/academicResources.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-block mt-2 text-[0.65rem] font-bold uppercase tracking-wide text-orange-400",
                        children: "Leer artículo original →"
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot/UIChatbot/academicResources.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this)
                ]
            }, s.id, true, {
                fileName: "[project]/components/chatbot/UIChatbot/academicResources.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/chatbot/UIChatbot/academicResources.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/chatbot/UIChatbot/interactiveCards.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InteractiveFlashcards",
    ()=>InteractiveFlashcards
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// components/chatbot/UIChatbot/InteractiveFlashcards.tsx
'use client';
;
;
function InteractiveFlashcards({ topic, cards }) {
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [flipped, setFlipped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!cards?.length) return null;
    const card = cards[index];
    const isFirst = index === 0;
    const isLast = index === cards.length - 1;
    const goTo = (next)=>{
        setFlipped(false);
        setIndex(next);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "my-2 flex flex-col items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .flip-scene { perspective: 1200px; }
        .flip-card {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(.4,.2,.2,1);
        }
        .flip-card.is-flipped { transform: rotateY(180deg); }
        .flip-face {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          display: flex; align-items: center; justify-content: center;
          text-align: center; padding: 18px;
          border-radius: 10px;
        }
        .flip-face.back { transform: rotateY(180deg); }
      `
            }, void 0, false, {
                fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[0.6rem] uppercase tracking-[0.25em] opacity-50",
                children: [
                    topic,
                    " · ",
                    index + 1,
                    "/",
                    cards.length
                ]
            }, void 0, true, {
                fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flip-scene w-full max-w-xs h-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flip-card w-full h-full cursor-pointer ${flipped ? 'is-flipped' : ''}`,
                    onClick: ()=>setFlipped((f)=>!f),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flip-face front",
                            style: {
                                background: 'rgba(255,0,110,0.08)',
                                border: '1px solid rgba(255,0,110,0.3)'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[0.55rem] uppercase tracking-widest text-pink-400/70 mb-2",
                                        children: "Pregunta"
                                    }, void 0, false, {
                                        fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-medium",
                                        children: card.question
                                    }, void 0, false, {
                                        fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[0.55rem] opacity-40 mt-3",
                                        children: "Toca para ver la respuesta"
                                    }, void 0, false, {
                                        fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flip-face back",
                            style: {
                                background: 'rgba(255,107,0,0.08)',
                                border: '1px solid rgba(255,107,0,0.3)'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[0.55rem] uppercase tracking-widest text-orange-400/70 mb-2",
                                        children: "Respuesta"
                                    }, void 0, false, {
                                        fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                                        lineNumber: 65,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm",
                                        children: card.answer
                                    }, void 0, false, {
                                        fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        disabled: isFirst,
                        onClick: ()=>goTo(index - 1),
                        className: "text-xs uppercase tracking-widest px-3 py-1 rounded border border-pink-500/25 disabled:opacity-25 hover:border-pink-500/60 transition-colors",
                        children: "← Anterior"
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1",
                        children: cards.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-1.5 h-1.5 rounded-full",
                                style: {
                                    background: i === index ? '#FF006E' : 'rgba(255,0,110,0.2)'
                                }
                            }, i, false, {
                                fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        disabled: isLast,
                        onClick: ()=>goTo(index + 1),
                        className: "text-xs uppercase tracking-widest px-3 py-1 rounded border border-orange-500/25 disabled:opacity-25 hover:border-orange-500/60 transition-colors",
                        children: "Siguiente →"
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chatbot/UIChatbot/interactiveCards.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/chatbot/UIChatbot/comparation.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComparisonTable",
    ()=>ComparisonTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// components/chatbot/UIChatbot/ComparisonTable.tsx
'use client';
;
function AdvantageMark({ side, advantage }) {
    if (!advantage || advantage === 'tie') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "opacity-30",
            children: "—"
        }, void 0, false, {
            fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
            lineNumber: 7,
            columnNumber: 12
        }, this);
    }
    const wins = advantage === side;
    return wins ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-green-400",
        children: "✅"
    }, void 0, false, {
        fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-red-400/70",
        children: "❌"
    }, void 0, false, {
        fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
function ComparisonTable({ itemA, itemB, rows }) {
    if (!rows?.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "my-2 overflow-x-auto rounded-md border border-pink-500/20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "w-full text-xs border-collapse",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "text-left",
                        style: {
                            background: 'rgba(255,0,110,0.08)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "p-2 font-semibold uppercase tracking-wide text-[0.6rem] opacity-60",
                                children: "Criterio"
                            }, void 0, false, {
                                fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                                lineNumber: 25,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "p-2 font-semibold uppercase tracking-wide text-[0.6rem] text-pink-400",
                                children: itemA
                            }, void 0, false, {
                                fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "p-2 font-semibold uppercase tracking-wide text-[0.6rem] text-orange-400",
                                children: itemB
                            }, void 0, false, {
                                fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                                lineNumber: 27,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                        lineNumber: 24,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: rows.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "border-t border-pink-500/10",
                            style: {
                                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "p-2 font-medium opacity-80",
                                    children: row.criterion
                                }, void 0, false, {
                                    fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "p-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AdvantageMark, {
                                                side: "A",
                                                advantage: row.advantage
                                            }, void 0, false, {
                                                fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                                                lineNumber: 40,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: row.valueA
                                            }, void 0, false, {
                                                fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                                                lineNumber: 41,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                                        lineNumber: 39,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                                    lineNumber: 38,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "p-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AdvantageMark, {
                                                side: "B",
                                                advantage: row.advantage
                                            }, void 0, false, {
                                                fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                                                lineNumber: 46,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: row.valueB
                                            }, void 0, false, {
                                                fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                                                lineNumber: 47,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                                    lineNumber: 44,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                            lineNumber: 32,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/chatbot/UIChatbot/comparation.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/chatbot/UIChatbot/timeline.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConceptTimeline",
    ()=>ConceptTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// components/chatbot/UIChatbot/ConceptTimeline.tsx
'use client';
;
function ConceptTimeline({ topic, events }) {
    if (!events?.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "my-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[0.6rem] uppercase tracking-[0.25em] opacity-50 mb-3",
                children: topic
            }, void 0, false, {
                fileName: "[project]/components/chatbot/UIChatbot/timeline.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative pl-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-[7px] top-1 bottom-1 w-px",
                        style: {
                            background: 'linear-gradient(180deg, #FF006E, #FF6B00)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot/UIChatbot/timeline.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4",
                        children: events.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -left-5 top-1 w-2.5 h-2.5 rounded-full border-2",
                                        style: {
                                            background: '#08000a',
                                            borderColor: i % 2 === 0 ? '#FF006E' : '#FF6B00'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/chatbot/UIChatbot/timeline.tsx",
                                        lineNumber: 21,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[0.6rem] uppercase tracking-widest opacity-50 mb-0.5",
                                        children: e.date
                                    }, void 0, false, {
                                        fileName: "[project]/components/chatbot/UIChatbot/timeline.tsx",
                                        lineNumber: 28,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-semibold mb-0.5",
                                        children: e.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/chatbot/UIChatbot/timeline.tsx",
                                        lineNumber: 29,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs opacity-70 leading-relaxed",
                                        children: e.description
                                    }, void 0, false, {
                                        fileName: "[project]/components/chatbot/UIChatbot/timeline.tsx",
                                        lineNumber: 30,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/chatbot/UIChatbot/timeline.tsx",
                                lineNumber: 19,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot/UIChatbot/timeline.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chatbot/UIChatbot/timeline.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chatbot/UIChatbot/timeline.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/chatbot/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AltChatView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/SplitText.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$AI$2f$chatbot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/controllers/AI/chatbot.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$AI$2f$chatbot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/AI/chatbot.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/react-markdown/lib/index.js [app-ssr] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$math$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/remark-math/lib/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rehype$2d$katex$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/rehype-katex/lib/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$roadmaps$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chatbot/roadmaps.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$simulators$2f$VectorVisualizer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/simulators/VectorVisualizer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$AtherVoice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chatbot/AtherVoice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$VoiceMode$2f$VoiceMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chatbot/VoiceMode/VoiceMode.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$VoiceMode$2f$VoiceOverlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chatbot/VoiceMode/VoiceOverlay.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$MessageAudioButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chatbot/MessageAudioButton.tsx [app-ssr] (ecmascript)");
//UI Components
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$UIChatbot$2f$academicResources$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chatbot/UIChatbot/academicResources.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$UIChatbot$2f$interactiveCards$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chatbot/UIChatbot/interactiveCards.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$UIChatbot$2f$comparation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chatbot/UIChatbot/comparation.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$UIChatbot$2f$timeline$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chatbot/UIChatbot/timeline.tsx [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
const F_ORB = "'Bebas Neue', sans-serif";
const F_RAJ = "'Plus Jakarta Sans', sans-serif";
const F_MONO = "'JetBrains Mono', monospace";
const C = {
    bg: '#08000a',
    surface: 'rgba(8,0,10,0.98)',
    orange: '#FF6B00',
    pink: '#FF006E',
    yellow: '#FFD700',
    purple: '#FF006E',
    cyan: '#FFD700',
    text: '#ede0d4',
    dim: 'rgba(210,170,140,0.5)',
    dimmer: 'rgba(210,170,140,0.28)',
    bdrO: 'rgba(255,107,0,0.18)',
    bdrP: 'rgba(255,0,110,0.18)'
};
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
// ── Interaction helpers ────────────────────────────────────────
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
const IconMenu = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
        }, void 0, false, {
            fileName: "[project]/app/chatbot/page.tsx",
            lineNumber: 71,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/chatbot/page.tsx",
        lineNumber: 70,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const IconPlus = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "11",
        height: "11",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2.5,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 4.5v15m7.5-7.5h-15"
        }, void 0, false, {
            fileName: "[project]/app/chatbot/page.tsx",
            lineNumber: 76,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/chatbot/page.tsx",
        lineNumber: 75,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const IconSend = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2.2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
        }, void 0, false, {
            fileName: "[project]/app/chatbot/page.tsx",
            lineNumber: 81,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/chatbot/page.tsx",
        lineNumber: 80,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
// ── Typing indicator ───────────────────────────────────────────
function TypingDots() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes altTd {
          0%,80%,100% { transform:scale(0.5) translateY(0); opacity:0.25; box-shadow:0 0 0 rgba(255,0,110,0) }
          40%          { transform:scale(1.15) translateY(-4px); opacity:1; box-shadow:0 0 8px rgba(255,0,110,0.6) }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/chatbot/page.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 5,
                    padding: '4px 0',
                    alignItems: 'center'
                },
                children: [
                    0,
                    1,
                    2
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'rgba(255,0,110,0.8)',
                            animation: `altTd 1.1s ${i * 0.18}s infinite`
                        }
                    }, i, false, {
                        fileName: "[project]/app/chatbot/page.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/chatbot/page.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
// ── Message bubble ─────────────────────────────────────────────
function AltMessageBubble({ msg, isLast, busy, onSpeakMessage, currentlySpeakingId }) {
    const markdownComponents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            code ({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                // Si el bloque es tipo "mermaid", dibuja el roadmap
                if (!inline && match && match[1] === 'mermaid') {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$roadmaps$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MermaidDiagram"], {
                        chart: String(children).replace(/\n$/, '')
                    }, void 0, false, {
                        fileName: "[project]/app/chatbot/page.tsx",
                        lineNumber: 126,
                        columnNumber: 16
                    }, this);
                }
                // Si es código normal, le da estilo de terminal
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                    className: className,
                    style: {
                        background: 'rgba(255,0,110,0.1)',
                        padding: '2px 4px',
                        borderRadius: 4,
                        color: '#FFD700'
                    },
                    ...props,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/app/chatbot/page.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this);
            }
        }), []);
    const isAI = msg.role === 'ai';
    const showTyping = isAI && isLast && busy && msg.text === '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "alt-bubble",
        style: {
            display: 'flex',
            gap: 9,
            alignItems: 'flex-start',
            flexDirection: isAI ? 'row' : 'row-reverse',
            transformStyle: 'preserve-3d'
        },
        onMouseMove: (e)=>{
            const textbox = e.currentTarget.querySelector('.alt-textbox');
            if (textbox) {
                textbox.style.boxShadow = isAI ? '0 12px 32px rgba(0,0,0,0.5), 0 0 28px rgba(255,0,110,0.2)' : '0 12px 32px rgba(0,0,0,0.5), 0 0 28px rgba(255,107,0,0.2)';
                textbox.style.borderColor = isAI ? 'rgba(255,0,110,0.35)' : 'rgba(255,107,0,0.35)';
            }
            ;
            e.currentTarget.style.zIndex = '5';
            tiltMove(e, -6, 10);
        },
        onMouseLeave: (e)=>{
            const textbox = e.currentTarget.querySelector('.alt-textbox');
            if (textbox) {
                textbox.style.boxShadow = '0 6px 18px rgba(0,0,0,0.45)';
                textbox.style.borderColor = isAI ? 'rgba(255,0,110,0.18)' : 'rgba(255,107,0,0.18)';
            }
            ;
            e.currentTarget.style.zIndex = '';
            tiltReset(e);
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "alt-avatar",
                style: {
                    width: 34,
                    height: 34,
                    borderRadius: isAI ? '50%' : 8,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.6rem',
                    fontFamily: F_ORB,
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    background: isAI ? 'rgba(255,0,110,0.08)' : 'rgba(255,107,0,0.08)',
                    border: `2px solid ${isAI ? 'rgba(255,0,110,0.4)' : 'rgba(255,107,0,0.35)'}`,
                    color: isAI ? 'rgba(255,0,110,0.9)' : 'rgba(255,107,0,0.9)',
                    boxShadow: isAI ? '0 0 18px rgba(255,0,110,0.35), inset 0 0 12px rgba(255,0,110,0.08)' : '0 0 14px rgba(255,107,0,0.25), inset 0 0 10px rgba(255,107,0,0.05)',
                    transformStyle: 'preserve-3d',
                    animation: isAI ? 'avatarPulse 2.4s ease-in-out infinite' : 'none'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
          @keyframes avatarPulse { 0%,100%{box-shadow:0 0 14px rgba(255,0,110,0.25)} 50%{box-shadow:0 0 24px rgba(255,0,110,0.45)} }
        `
                    }, void 0, false, {
                        fileName: "[project]/app/chatbot/page.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    isAI ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    position: 'absolute',
                                    inset: -3,
                                    borderRadius: '50%',
                                    border: '1px solid rgba(255,0,110,0.2)',
                                    animation: 'spin 8s linear infinite'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/chatbot/page.tsx",
                                lineNumber: 191,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    position: 'absolute',
                                    inset: -6,
                                    borderRadius: '50%',
                                    border: '1px dashed rgba(255,107,0,0.18)',
                                    animation: 'spin 14s linear infinite reverse'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/chatbot/page.tsx",
                                lineNumber: 192,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    position: 'relative',
                                    zIndex: 1
                                },
                                children: "A"
                            }, void 0, false, {
                                fileName: "[project]/app/chatbot/page.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`
                            }, void 0, false, {
                                fileName: "[project]/app/chatbot/page.tsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true) : 'U'
                ]
            }, void 0, true, {
                fileName: "[project]/app/chatbot/page.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: '75%'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                            justifyContent: isAI ? 'flex-start' : 'flex-end',
                            fontSize: '0.52rem',
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            marginBottom: 4,
                            fontFamily: F_RAJ,
                            color: isAI ? 'rgba(255,0,110,0.4)' : 'rgba(255,107,0,0.4)'
                        },
                        children: [
                            isAI && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    width: 4,
                                    height: 4,
                                    borderRadius: '50%',
                                    background: 'rgba(255,0,110,0.5)',
                                    flexShrink: 0
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/chatbot/page.tsx",
                                lineNumber: 214,
                                columnNumber: 20
                            }, this),
                            isAI ? '◈ ATHER ENGINE' : '↑ OPERADOR',
                            !isAI && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    width: 4,
                                    height: 4,
                                    borderRadius: '50%',
                                    background: 'rgba(255,107,0,0.5)',
                                    flexShrink: 0
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/chatbot/page.tsx",
                                lineNumber: 216,
                                columnNumber: 21
                            }, this),
                            isAI && msg.text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$MessageAudioButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                text: msg.text,
                                isPlaying: currentlySpeakingId === msg.id,
                                onPlay: ()=>onSpeakMessage(msg.text, String(msg.id)),
                                onStop: ()=>onSpeakMessage('', '')
                            }, void 0, false, {
                                fileName: "[project]/app/chatbot/page.tsx",
                                lineNumber: 218,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/chatbot/page.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "alt-textbox",
                        style: {
                            padding: '10px 13px',
                            borderRadius: 8,
                            fontSize: '0.78rem',
                            lineHeight: 1.62,
                            color: C.text,
                            fontFamily: F_RAJ,
                            textAlign: isAI ? 'left' : 'right',
                            background: isAI ? 'rgba(18,8,28,0.95)' : 'rgba(28,10,8,0.95)',
                            border: `1px solid ${isAI ? 'rgba(255,0,110,0.18)' : 'rgba(255,107,0,0.18)'}`,
                            borderLeft: isAI ? '2px solid rgba(255,0,110,0.45)' : undefined,
                            borderRight: !isAI ? '2px solid rgba(255,107,0,0.45)' : undefined,
                            boxShadow: isAI ? '0 6px 18px rgba(0,0,0,0.45)' : '0 6px 18px rgba(0,0,0,0.45)',
                            transformStyle: 'preserve-3d',
                            transition: 'box-shadow 0.2s, border-color 0.2s'
                        },
                        children: showTyping ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TypingDots, {}, void 0, false, {
                            fileName: "[project]/app/chatbot/page.tsx",
                            lineNumber: 245,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'left'
                            },
                            className: "alt-markdown",
                            children: [
                                msg.toolInvocations?.map((tool)=>{
                                    if (tool.state !== 'result') return null;
                                    switch(tool.toolName){
                                        case 'vectorSimulator':
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "my-2 p-2 border border-teal-500/30 rounded-md",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$simulators$2f$VectorVisualizer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VectorVisualizer"], {
                                                    v1: tool.result.v1,
                                                    v2: tool.result.v2,
                                                    resultant: tool.result.resultant
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chatbot/page.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 25
                                                }, this)
                                            }, tool.toolCallId, false, {
                                                fileName: "[project]/app/chatbot/page.tsx",
                                                lineNumber: 255,
                                                columnNumber: 23
                                            }, this);
                                        case 'buscarFuentesAcademicas':
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$UIChatbot$2f$academicResources$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AcademicSourceCard"], {
                                                sources: tool.result.sources
                                            }, tool.toolCallId, false, {
                                                fileName: "[project]/app/chatbot/page.tsx",
                                                lineNumber: 260,
                                                columnNumber: 28
                                            }, this);
                                        case 'generarFlashcards':
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$UIChatbot$2f$interactiveCards$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InteractiveFlashcards"], {
                                                topic: tool.result.topic,
                                                cards: tool.result.cards
                                            }, tool.toolCallId, false, {
                                                fileName: "[project]/app/chatbot/page.tsx",
                                                lineNumber: 262,
                                                columnNumber: 28
                                            }, this);
                                        case 'compararConceptos':
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$UIChatbot$2f$comparation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ComparisonTable"], {
                                                itemA: tool.result.itemA,
                                                itemB: tool.result.itemB,
                                                rows: tool.result.rows
                                            }, tool.toolCallId, false, {
                                                fileName: "[project]/app/chatbot/page.tsx",
                                                lineNumber: 265,
                                                columnNumber: 23
                                            }, this);
                                        case 'generarLineaDeTiempo':
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$UIChatbot$2f$timeline$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConceptTimeline"], {
                                                topic: tool.result.topic,
                                                events: tool.result.events
                                            }, tool.toolCallId, false, {
                                                fileName: "[project]/app/chatbot/page.tsx",
                                                lineNumber: 274,
                                                columnNumber: 23
                                            }, this);
                                        default:
                                            return null;
                                    }
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                                    remarkPlugins: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$math$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
                                    ],
                                    rehypePlugins: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rehype$2d$katex$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
                                    ],
                                    components: markdownComponents,
                                    children: (msg.text || '…').replace(/<function=.*?>(<\/function>)?/g, '').trim()
                                }, void 0, false, {
                                    fileName: "[project]/app/chatbot/page.tsx",
                                    lineNumber: 281,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/chatbot/page.tsx",
                            lineNumber: 247,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/chatbot/page.tsx",
                        lineNumber: 228,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/chatbot/page.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/chatbot/page.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
// ── 3D Neural Field background ─────────────────────────────────
function NeuralField3D() {
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const container = mountRef.current;
        if (!container) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
        const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](55, container.clientWidth / container.clientHeight, 0.1, 200);
        camera.position.z = 18;
        const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
            alpha: true,
            antialias: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        // Neural nodes
        const nodeCount = 120;
        const positions = new Float32Array(nodeCount * 3);
        const colors = new Float32Array(nodeCount * 3);
        const palette = [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]('#FF6B00'),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]('#FF006E'),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]('#FFD700')
        ];
        for(let i = 0; i < nodeCount; i++){
            positions[i * 3] = (Math.random() - 0.5) * 35;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
            const col = palette[Math.floor(Math.random() * palette.length)];
            colors[i * 3] = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;
        }
        const particleGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        particleGeo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
        particleGeo.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](colors, 3));
        const particleMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointsMaterial"]({
            size: 0.12,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
            depthWrite: false
        });
        const particles = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Points"](particleGeo, particleMat);
        scene.add(particles);
        // Connection lines (limit for performance)
        const lineMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
            color: 0xff6b35,
            transparent: true,
            opacity: 0.06
        });
        const lineGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        const linePositions = [];
        const maxDist = 5.5;
        for(let i = 0; i < nodeCount; i++){
            const ax = positions[i * 3], ay = positions[i * 3 + 1], az = positions[i * 3 + 2];
            for(let j = i + 1; j < nodeCount; j++){
                const bx = positions[j * 3], by = positions[j * 3 + 1], bz = positions[j * 3 + 2];
                const d = Math.hypot(ax - bx, ay - by, az - bz);
                if (d < maxDist) {
                    linePositions.push(ax, ay, az, bx, by, bz);
                }
            }
        }
        lineGeo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](linePositions, 3));
        const lines = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineSegments"](lineGeo, lineMat);
        scene.add(lines);
        // Mouse parallax
        let mx = 0, my = 0;
        const onMove = (e)=>{
            const rect = container.getBoundingClientRect();
            mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            my = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
        };
        container.addEventListener('mousemove', onMove);
        let raf = 0;
        const t0 = performance.now();
        const animate = ()=>{
            raf = requestAnimationFrame(animate);
            const t = (performance.now() - t0) * 0.0005;
            if (!prefersReduced) {
                particles.rotation.y = t * 0.05 + mx * 0.15;
                particles.rotation.x = my * 0.08;
                lines.rotation.y = t * 0.05 + mx * 0.15;
                lines.rotation.x = my * 0.08;
            }
            renderer.render(scene, camera);
        };
        animate();
        const onResize = ()=>{
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', onResize);
        return ()=>{
            window.removeEventListener('resize', onResize);
            container.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
            if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
            renderer.dispose();
            particleGeo.dispose();
            particleMat.dispose();
            lineGeo.dispose();
            lineMat.dispose();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mountRef,
                style: {
                    width: '100%',
                    height: '100%'
                }
            }, void 0, false, {
                fileName: "[project]/app/chatbot/page.tsx",
                lineNumber: 402,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(8,0,10,0.55) 70%, rgba(8,0,10,0.95) 100%)',
                    pointerEvents: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/app/chatbot/page.tsx",
                lineNumber: 403,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/chatbot/page.tsx",
        lineNumber: 401,
        columnNumber: 5
    }, this);
}
// ── Hex grid SVG ───────────────────────────────────────────────
function HexBackground() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'absolute',
            inset: 0,
            opacity: 0.12,
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 680 600",
            preserveAspectRatio: "xMidYMid slice",
            style: {
                width: '100%',
                height: '100%'
            },
            xmlns: "http://www.w3.org/2000/svg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                            id: "hex-p",
                            x: "0",
                            y: "0",
                            width: "52",
                            height: "60",
                            patternUnits: "userSpaceOnUse",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                points: "26,2 50,15 50,45 26,58 2,45 2,15",
                                fill: "none",
                                stroke: "#FF006E",
                                strokeWidth: "0.5"
                            }, void 0, false, {
                                fileName: "[project]/app/chatbot/page.tsx",
                                lineNumber: 421,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/chatbot/page.tsx",
                            lineNumber: 420,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                            id: "hex-p2",
                            x: "26",
                            y: "30",
                            width: "52",
                            height: "60",
                            patternUnits: "userSpaceOnUse",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                points: "26,2 50,15 50,45 26,58 2,45 2,15",
                                fill: "none",
                                stroke: "#FF6B00",
                                strokeWidth: "0.4",
                                opacity: "0.5"
                            }, void 0, false, {
                                fileName: "[project]/app/chatbot/page.tsx",
                                lineNumber: 424,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/chatbot/page.tsx",
                            lineNumber: 423,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/chatbot/page.tsx",
                    lineNumber: 419,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    width: "100%",
                    height: "100%",
                    fill: "url(#hex-p)"
                }, void 0, false, {
                    fileName: "[project]/app/chatbot/page.tsx",
                    lineNumber: 427,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    width: "100%",
                    height: "100%",
                    fill: "url(#hex-p2)"
                }, void 0, false, {
                    fileName: "[project]/app/chatbot/page.tsx",
                    lineNumber: 428,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "120",
                    cy: "90",
                    r: "3",
                    fill: "#FF6B00",
                    opacity: "0.6"
                }, void 0, false, {
                    fileName: "[project]/app/chatbot/page.tsx",
                    lineNumber: 430,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "380",
                    cy: "200",
                    r: "2.5",
                    fill: "#FF006E",
                    opacity: "0.5"
                }, void 0, false, {
                    fileName: "[project]/app/chatbot/page.tsx",
                    lineNumber: 431,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "560",
                    cy: "80",
                    r: "2",
                    fill: "#FF6B00",
                    opacity: "0.4"
                }, void 0, false, {
                    fileName: "[project]/app/chatbot/page.tsx",
                    lineNumber: 432,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "240",
                    cy: "480",
                    r: "2.5",
                    fill: "#FF006E",
                    opacity: "0.5"
                }, void 0, false, {
                    fileName: "[project]/app/chatbot/page.tsx",
                    lineNumber: 433,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "620",
                    cy: "420",
                    r: "3",
                    fill: "#FF6B00",
                    opacity: "0.45"
                }, void 0, false, {
                    fileName: "[project]/app/chatbot/page.tsx",
                    lineNumber: 434,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "60",
                    cy: "320",
                    r: "2",
                    fill: "#FF006E",
                    opacity: "0.4"
                }, void 0, false, {
                    fileName: "[project]/app/chatbot/page.tsx",
                    lineNumber: 435,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/chatbot/page.tsx",
            lineNumber: 416,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/chatbot/page.tsx",
        lineNumber: 415,
        columnNumber: 5
    }, this);
}
function AltChatView() {
    const { state, messagesEndRef, toggleSidebar, loadSession, newChat, setInput, sendMessage, handleKeyDown, handleSubmit } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$AI$2f$chatbot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAltChatController"])();
    //Voice
    const { state: voiceModeState, openVoiceMode, closeVoiceMode, startVoiceCycle, interrupt } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$VoiceMode$2f$VoiceMode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVoiceMode"])((role, text)=>{
        if (role === 'user') {
            sendMessage(text);
        } else if (role === 'ai' && voiceState.ttsEnabled) {
            // Si VoiceMode envía una respuesta de IA, usar TTS
            speak(text);
        }
    });
    const { voiceState, speak, stopSpeaking, toggleTTS, startListening, stopListening } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$AtherVoice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtherVoice"])((transcript)=>{
        sendMessage(transcript);
    }, voiceModeState.active);
    const { sidebarOpen, sessions, currentSession, messages, input, busy } = state;
    const [currentlySpeakingId, setCurrentlySpeakingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const titleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ── Entrance animations ──
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = containerRef.current;
        if (!root) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let split = null;
        const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].context(()=>{
            // Header title SplitText
            if (titleRef.current && !prefersReduced) {
                split = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SplitText"](titleRef.current, {
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
                    delay: 0.2
                });
            }
            // Subtle ambient pulse for status dot
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.alt-status-dot', {
                scale: 1.25,
                boxShadow: '0 0 16px #FFD700',
                yoyo: true,
                repeat: -1,
                duration: 1.2,
                ease: 'sine.inOut'
            });
            // Empty state ring breathing
            if (!prefersReduced) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to('.alt-empty-ring', {
                    scale: 1.08,
                    opacity: 0.7,
                    yoyo: true,
                    repeat: -1,
                    duration: 2.4,
                    ease: 'sine.inOut'
                });
            }
        }, root);
        return ()=>{
            split?.revert();
            ctx.revert();
        };
    }, []);
    // ── Animate quick prompts in empty state ──
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (messages.length !== 0) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;
        const btns = document.querySelectorAll('.alt-quick-prompt');
        if (btns.length === 0) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(btns, {
            opacity: 0,
            y: 20,
            scale: 0.9
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.06,
            duration: 0.45,
            ease: 'back.out(1.7)',
            delay: 0.6
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(btns, {
            y: -3,
            duration: 2.2,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            stagger: {
                each: 0.1,
                from: 'random'
            },
            delay: 1.2
        });
    }, [
        messages
    ]);
    // ── Animate new messages with GSAP + scroll progress bar ──
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = messagesRef.current;
        if (!root) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const updateProgress = ()=>{
            const bar = document.querySelector('.chat-progress div');
            if (!bar) return;
            const max = root.scrollHeight - root.clientHeight;
            const pct = max > 0 ? root.scrollTop / max : 0;
            bar.style.transform = `scaleX(${Math.min(1, Math.max(0, pct))})`;
        };
        updateProgress();
        root.addEventListener('scroll', updateProgress);
        if (messages.length > 0 && !prefersReduced) {
            const last = root.lastElementChild;
            if (last && last.classList && last.classList.contains('alt-bubble')) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(last, {
                    opacity: 0,
                    y: 18,
                    scale: 0.97
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.32,
                    ease: 'power2.out'
                });
            }
        }
        return ()=>root.removeEventListener('scroll', updateProgress);
    }, [
        messages
    ]);
    const handleSpeakMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((text, id)=>{
        if (text) {
            setCurrentlySpeakingId(id);
            // speak() solo acepta 1 argumento; si devuelve una promesa la usamos
            // para limpiar el estado "hablando", si no, se limpia manualmente.
            const result = speak(text);
            if (result && typeof result.then === 'function') {
                result.then(()=>setCurrentlySpeakingId(null)).catch(()=>setCurrentlySpeakingId(null));
            }
        } else {
            stopSpeaking();
            setCurrentlySpeakingId(null);
        }
    }, [
        speak,
        stopSpeaking
    ]);
    const handleHoverBtn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e, enter)=>{
        const el = e.currentTarget;
        if (enter) {
            el.style.background = 'rgba(255,0,110,0.1)';
            el.style.borderColor = 'rgba(255,0,110,0.5)';
            el.style.boxShadow = '0 0 14px rgba(255,0,110,0.12)';
        } else {
            el.style.background = 'transparent';
            el.style.borderColor = 'rgba(255,0,110,0.3)';
            el.style.boxShadow = 'none';
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!voiceState.ttsEnabled) return;
        if (busy) return; // esperar a que termine de streamear
        if (voiceModeState.active) return;
        const last = messages[messages.length - 1];
        if (last?.role === 'ai' && last.text) {
            speak(last.text);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        busy
    ]); // ← se dispara cuando busy pasa de true a false (Ather terminó)
    // Manejo especial para VoiceMode: cuando VoiceMode está activo y hay respuesta de IA
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!voiceModeState.active) return;
        if (!voiceState.ttsEnabled) return;
        if (busy) return;
        const last = messages[messages.length - 1];
        if (last?.role === 'ai' && last.text) {
            // TTS de la respuesta cuando VoiceMode está activo
            speak(last.text);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        busy,
        voiceModeState.active
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        @keyframes altMsgIn    { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes altBlink    { 0%,100%{opacity:1;box-shadow:0 0 8px #FFD700} 55%{opacity:0.25;box-shadow:none} }
        @keyframes altGlitch   { 0%{opacity:0.6;transform:scaleX(0.4) translateX(-60%)} 50%{opacity:1;transform:scaleX(1) translateX(0%)} 100%{opacity:0;transform:scaleX(0.4) translateX(60%)} }
        @keyframes altSig      { to{left:120%} }
        @keyframes scanlines   { from{transform:translateY(0)} to{transform:translateY(4px)} }
        .alt-textbox { position: relative; overflow: hidden; }
        .alt-textbox::before { content: ''; position: absolute; top: 0; left: -150%; width: 80%; height: 100%; background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%); transform: skewX(-25deg); transition: left 0.6s; pointer-events: none; }
        .alt-bubble:hover .alt-textbox::before { left: 150%; transition: left 0.9s ease-in-out; }

        #alt-msgs::-webkit-scrollbar       { width:3px }
        #alt-msgs::-webkit-scrollbar-thumb { background:rgba(180,60,40,0.2); border-radius:4px }
        #alt-msgs::-webkit-scrollbar-track { background:transparent }

        #alt-sb-list::-webkit-scrollbar       { width:3px }
        #alt-sb-list::-webkit-scrollbar-thumb { background:rgba(255,0,110,0.18); border-radius:4px }

        #alt-cin:focus {
          border-color: rgba(255,0,110,0.4);
          border-bottom-color: #FF006E;
          background: rgba(255,0,110,0.03);
          outline: none;
        }
        #alt-cin::placeholder { color: rgba(210,170,140,0.28); letter-spacing: 0.08em }
      `
            }, void 0, false, {
                fileName: "[project]/app/chatbot/page.tsx",
                lineNumber: 602,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                style: {
                    fontFamily: F_RAJ,
                    background: C.bg,
                    height: '100%',
                    minHeight: 520,
                    display: 'flex',
                    overflow: 'hidden',
                    position: 'relative'
                },
                children: [
                    [
                        'tl',
                        'tr',
                        'bl',
                        'br'
                    ].map((pos)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'absolute',
                                width: 18,
                                height: 18,
                                opacity: 0.45,
                                zIndex: 10,
                                top: pos.startsWith('t') ? 10 : undefined,
                                bottom: pos.startsWith('b') ? 10 : undefined,
                                left: pos.endsWith('l') ? 10 : undefined,
                                right: pos.endsWith('r') ? 10 : undefined,
                                borderTop: pos.startsWith('t') ? `2px solid ${C.orange}` : undefined,
                                borderBottom: pos.startsWith('b') ? `2px solid ${C.orange}` : undefined,
                                borderLeft: pos.endsWith('l') ? `2px solid ${C.orange}` : undefined,
                                borderRight: pos.endsWith('r') ? `2px solid ${C.orange}` : undefined
                            }
                        }, pos, false, {
                            fileName: "[project]/app/chatbot/page.tsx",
                            lineNumber: 642,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "chat-progress",
                        style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 2,
                            zIndex: 50,
                            background: 'rgba(255,107,0,0.08)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '100%',
                                height: '100%',
                                background: `linear-gradient(90deg,${C.pink},${C.orange},${C.yellow})`,
                                boxShadow: '0 0 12px rgba(255,107,0,0.5)',
                                transform: 'scaleX(0)',
                                transformOrigin: 'left',
                                transition: 'transform 0.1s linear'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/chatbot/page.tsx",
                            lineNumber: 657,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/chatbot/page.tsx",
                        lineNumber: 656,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 1,
                            zIndex: 10,
                            background: `linear-gradient(90deg,transparent,${C.orange},${C.purple},transparent)`,
                            animation: 'altGlitch 4s linear infinite'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/chatbot/page.tsx",
                        lineNumber: 661,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NeuralField3D, {}, void 0, false, {
                        fileName: "[project]/app/chatbot/page.tsx",
                        lineNumber: 668,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            zIndex: 0,
                            pointerEvents: 'none',
                            opacity: 0.25,
                            backgroundImage: 'linear-gradient(rgba(255,0,110,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,0,110,0.04) 1px,transparent 1px)',
                            backgroundSize: '32px 32px',
                            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,#000 0%,transparent 80%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,#000 0%,transparent 80%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/chatbot/page.tsx",
                        lineNumber: 669,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: '-10%',
                            right: '-5%',
                            width: 500,
                            height: 500,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle,rgba(255,0,110,0.12) 0%,transparent 70%)',
                            filter: 'blur(80px)',
                            pointerEvents: 'none',
                            zIndex: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/chatbot/page.tsx",
                        lineNumber: 677,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: '-5%',
                            left: '-5%',
                            width: 400,
                            height: 400,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle,rgba(255,107,0,0.12) 0%,transparent 70%)',
                            filter: 'blur(80px)',
                            pointerEvents: 'none',
                            zIndex: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/chatbot/page.tsx",
                        lineNumber: 678,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "chat-scanlines",
                        style: {
                            position: 'absolute',
                            inset: 0,
                            zIndex: 11,
                            pointerEvents: 'none',
                            opacity: 0.05,
                            background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.04) 2px,rgba(255,255,255,0.04) 4px)',
                            mixBlendMode: 'overlay'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/chatbot/page.tsx",
                        lineNumber: 681,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'relative',
                            zIndex: 5,
                            width: sidebarOpen ? 210 : 0,
                            minWidth: sidebarOpen ? 210 : 0,
                            overflow: 'hidden',
                            transition: 'width 0.32s cubic-bezier(.4,0,.2,1)',
                            flexShrink: 0,
                            background: C.surface,
                            borderRight: `1px solid ${C.bdrP}`,
                            display: 'flex',
                            flexDirection: 'column'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: 210,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '16px 12px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: F_ORB,
                                        fontSize: '0.66rem',
                                        letterSpacing: '0.38em',
                                        color: 'rgba(255,0,110,0.55)',
                                        textTransform: 'uppercase',
                                        paddingBottom: 10,
                                        marginBottom: 12,
                                        borderBottom: `1px solid ${C.bdrP}`
                                    },
                                    children: "✦ ARCHIVO NEURAL"
                                }, void 0, false, {
                                    fileName: "[project]/app/chatbot/page.tsx",
                                    lineNumber: 703,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: newChat,
                                    style: {
                                        width: '100%',
                                        padding: '8px 0',
                                        borderRadius: 8,
                                        background: 'transparent',
                                        border: '1px solid rgba(255,0,110,0.3)',
                                        color: C.purple,
                                        fontFamily: F_RAJ,
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.15em',
                                        cursor: 'pointer',
                                        marginBottom: 14,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 6,
                                        textTransform: 'uppercase',
                                        transformStyle: 'preserve-3d',
                                        willChange: 'transform'
                                    },
                                    onMouseMove: (e)=>{
                                        handleHoverBtn(e, true);
                                        magneticMove(e, 0.2);
                                    },
                                    onMouseLeave: (e)=>{
                                        handleHoverBtn(e, false);
                                        magneticReset(e);
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconPlus, {}, void 0, false, {
                                            fileName: "[project]/app/chatbot/page.tsx",
                                            lineNumber: 725,
                                            columnNumber: 15
                                        }, this),
                                        " NUEVA SESIÓN"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/chatbot/page.tsx",
                                    lineNumber: 713,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '0.58rem',
                                        letterSpacing: '0.2em',
                                        color: C.dimmer,
                                        textTransform: 'uppercase',
                                        marginBottom: 8,
                                        fontFamily: F_RAJ
                                    },
                                    children: "Recientes"
                                }, void 0, false, {
                                    fileName: "[project]/app/chatbot/page.tsx",
                                    lineNumber: 729,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    id: "alt-sb-list",
                                    style: {
                                        flex: 1,
                                        overflowY: 'auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 3
                                    },
                                    children: sessions.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>loadSession(s.id),
                                            style: {
                                                width: '100%',
                                                textAlign: 'left',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 2,
                                                padding: '8px 10px',
                                                borderRadius: 8,
                                                cursor: 'pointer',
                                                background: currentSession === s.id ? 'rgba(255,0,110,0.06)' : 'transparent',
                                                border: `1px solid ${currentSession === s.id ? 'rgba(255,0,110,0.22)' : 'transparent'}`,
                                                fontFamily: F_RAJ,
                                                transformStyle: 'preserve-3d',
                                                willChange: 'transform'
                                            },
                                            onMouseMove: (e)=>{
                                                if (currentSession !== s.id) {
                                                    e.currentTarget.style.background = 'rgba(255,0,110,0.04)';
                                                    e.currentTarget.style.borderColor = 'rgba(255,0,110,0.15)';
                                                }
                                                tiltMove(e, -2, 6);
                                            },
                                            onMouseLeave: (e)=>{
                                                if (currentSession !== s.id) {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.borderColor = 'transparent';
                                                }
                                                tiltReset(e);
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '0.58rem',
                                                        color: C.text,
                                                        fontWeight: 600,
                                                        letterSpacing: '0.03em',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    },
                                                    children: s.title
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chatbot/page.tsx",
                                                    lineNumber: 762,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '0.62rem',
                                                        color: C.dimmer,
                                                        letterSpacing: '0.05em'
                                                    },
                                                    children: s.date
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chatbot/page.tsx",
                                                    lineNumber: 765,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, s.id, true, {
                                            fileName: "[project]/app/chatbot/page.tsx",
                                            lineNumber: 739,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/chatbot/page.tsx",
                                    lineNumber: 737,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/chatbot/page.tsx",
                            lineNumber: 700,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/chatbot/page.tsx",
                        lineNumber: 688,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            zIndex: 4,
                            minWidth: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    padding: '12px 16px',
                                    borderBottom: `1px solid ${C.bdrO}`,
                                    background: 'rgba(8,0,10,0.82)',
                                    backdropFilter: 'blur(28px)',
                                    flexShrink: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: toggleSidebar,
                                        style: {
                                            width: 32,
                                            height: 32,
                                            borderRadius: 8,
                                            flexShrink: 0,
                                            background: 'transparent',
                                            border: '1px solid rgba(255,107,0,0.25)',
                                            color: 'rgba(255,107,0,0.7)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transformStyle: 'preserve-3d',
                                            willChange: 'transform'
                                        },
                                        onMouseMove: (e)=>{
                                            e.currentTarget.style.background = 'rgba(255,107,0,0.1)';
                                            e.currentTarget.style.borderColor = 'rgba(255,107,0,0.5)';
                                            magneticMove(e, 0.35);
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.borderColor = 'rgba(255,107,0,0.25)';
                                            magneticReset(e);
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconMenu, {}, void 0, false, {
                                            fileName: "[project]/app/chatbot/page.tsx",
                                            lineNumber: 796,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/chatbot/page.tsx",
                                        lineNumber: 786,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "alt-status-dot",
                                        style: {
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            flexShrink: 0,
                                            background: C.orange,
                                            boxShadow: '0 0 8px #FFD700'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/chatbot/page.tsx",
                                        lineNumber: 800,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1,
                                            minWidth: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: titleRef,
                                                style: {
                                                    fontFamily: F_ORB,
                                                    fontSize: '1rem',
                                                    color: C.text,
                                                    letterSpacing: '0.08em',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                },
                                                children: "ATHER — ENLACE NEURAL"
                                            }, void 0, false, {
                                                fileName: "[project]/app/chatbot/page.tsx",
                                                lineNumber: 807,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '0.62rem',
                                                    color: 'rgba(255,107,0,0.38)',
                                                    fontFamily: F_MONO,
                                                    letterSpacing: '0.18em',
                                                    textTransform: 'uppercase'
                                                },
                                                children: "◈ Motor Athernix · Fase I · Activo"
                                            }, void 0, false, {
                                                fileName: "[project]/app/chatbot/page.tsx",
                                                lineNumber: 810,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/chatbot/page.tsx",
                                        lineNumber: 806,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/development",
                                        title: "Ir a Development",
                                        style: {
                                            flexShrink: 0,
                                            width: 30,
                                            height: 30,
                                            borderRadius: '50%',
                                            background: 'transparent',
                                            border: '1px solid rgba(255,107,0,0.3)',
                                            color: 'rgba(255,107,0,0.7)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.75rem',
                                            textDecoration: 'none',
                                            transformStyle: 'preserve-3d',
                                            willChange: 'transform'
                                        },
                                        onMouseMove: (e)=>{
                                            e.currentTarget.style.background = 'rgba(255,107,0,0.1)';
                                            e.currentTarget.style.borderColor = 'rgba(255,107,0,0.5)';
                                            magneticMove(e, 0.35);
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.borderColor = 'rgba(255,107,0,0.3)';
                                            magneticReset(e);
                                        },
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/app/chatbot/page.tsx",
                                        lineNumber: 815,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '0.56rem',
                                            color: C.dimmer,
                                            fontFamily: F_RAJ,
                                            letterSpacing: '0.2em',
                                            flexShrink: 0
                                        },
                                        children: "v2.0"
                                    }, void 0, false, {
                                        fileName: "[project]/app/chatbot/page.tsx",
                                        lineNumber: 848,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/chatbot/page.tsx",
                                lineNumber: 777,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    height: 2,
                                    background: C.bdrO,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    flexShrink: 0
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: 'absolute',
                                        top: 0,
                                        left: '-60%',
                                        width: '60%',
                                        height: '100%',
                                        background: `linear-gradient(90deg,transparent,${C.orange},${C.purple},transparent)`,
                                        animation: 'altSig 3s linear infinite'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/chatbot/page.tsx",
                                    lineNumber: 855,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/chatbot/page.tsx",
                                lineNumber: 854,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                id: "alt-msgs",
                                ref: messagesRef,
                                style: {
                                    flex: 1,
                                    overflowY: 'auto',
                                    padding: 16,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12,
                                    height: 0
                                },
                                children: [
                                    messages.length === 0 ? /* Empty state */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "alt-empty-ring",
                                                style: {
                                                    width: 86,
                                                    height: 86,
                                                    borderRadius: '50%',
                                                    position: 'relative',
                                                    border: '1px solid rgba(255,0,110,0.25)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 0 30px rgba(255,0,110,0.15), inset 0 0 20px rgba(255,0,110,0.05)'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            position: 'absolute',
                                                            inset: 6,
                                                            borderRadius: '50%',
                                                            border: '1px dashed rgba(255,107,0,0.25)',
                                                            animation: 'spin 14s linear infinite reverse'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/chatbot/page.tsx",
                                                        lineNumber: 874,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            position: 'absolute',
                                                            inset: 14,
                                                            borderRadius: '50%',
                                                            border: '1px solid rgba(255,0,110,0.15)',
                                                            animation: 'spin 8s linear infinite'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/chatbot/page.tsx",
                                                        lineNumber: 879,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            position: 'absolute',
                                                            inset: 0,
                                                            borderRadius: '50%',
                                                            background: 'conic-gradient(from 0deg, transparent, rgba(255,0,110,0.15), transparent, rgba(255,107,0,0.15), transparent)',
                                                            animation: 'spin 6s linear infinite',
                                                            opacity: 0.5
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/chatbot/page.tsx",
                                                        lineNumber: 884,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: F_ORB,
                                                            fontSize: '1.4rem',
                                                            color: C.orange,
                                                            letterSpacing: '0.1em',
                                                            position: 'relative',
                                                            zIndex: 1,
                                                            textShadow: '0 0 18px rgba(255,107,0,0.5)'
                                                        },
                                                        children: "A"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/chatbot/page.tsx",
                                                        lineNumber: 890,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/chatbot/page.tsx",
                                                lineNumber: 868,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: 40,
                                                    height: 1,
                                                    background: `linear-gradient(90deg,transparent,${C.orange},transparent)`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/chatbot/page.tsx",
                                                lineNumber: 894,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: F_RAJ,
                                                    fontSize: '0.78rem',
                                                    color: C.dimmer,
                                                    letterSpacing: '0.18em',
                                                    textTransform: 'uppercase',
                                                    textAlign: 'center',
                                                    lineHeight: 1.9
                                                },
                                                children: [
                                                    "ENLACE CEREBRAL ACTIVO",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/app/chatbot/page.tsx",
                                                        lineNumber: 901,
                                                        columnNumber: 41
                                                    }, this),
                                                    "¿Qué deseas explorar?"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/chatbot/page.tsx",
                                                lineNumber: 896,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: 6,
                                                    justifyContent: 'center',
                                                    maxWidth: 340
                                                },
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$AI$2f$chatbot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ALT_QUICK_PROMPTS"].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>sendMessage(p),
                                                        className: "alt-quick-prompt",
                                                        style: {
                                                            padding: '6px 14px',
                                                            borderRadius: 6,
                                                            background: 'transparent',
                                                            border: '1px solid rgba(255,107,0,0.2)',
                                                            color: C.dim,
                                                            fontSize: '0.7rem',
                                                            fontFamily: F_RAJ,
                                                            cursor: 'pointer',
                                                            letterSpacing: '0.08em',
                                                            textTransform: 'uppercase',
                                                            transformStyle: 'preserve-3d',
                                                            willChange: 'transform'
                                                        },
                                                        onMouseMove: (e)=>{
                                                            e.currentTarget.style.background = 'rgba(255,107,0,0.08)';
                                                            e.currentTarget.style.borderColor = 'rgba(255,107,0,0.5)';
                                                            e.currentTarget.style.color = C.orange;
                                                            magneticMove(e, 0.3);
                                                        },
                                                        onMouseLeave: (e)=>{
                                                            e.currentTarget.style.background = 'transparent';
                                                            e.currentTarget.style.borderColor = 'rgba(255,107,0,0.2)';
                                                            e.currentTarget.style.color = C.dim;
                                                            magneticReset(e);
                                                        },
                                                        children: p
                                                    }, p, false, {
                                                        fileName: "[project]/app/chatbot/page.tsx",
                                                        lineNumber: 907,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/chatbot/page.tsx",
                                                lineNumber: 905,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/chatbot/page.tsx",
                                        lineNumber: 866,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            messages.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AltMessageBubble, {
                                                    msg: {
                                                        ...msg,
                                                        id: String(i)
                                                    },
                                                    isLast: i === messages.length - 1,
                                                    busy: busy,
                                                    onSpeakMessage: handleSpeakMessage,
                                                    currentlySpeakingId: currentlySpeakingId
                                                }, i, false, {
                                                    fileName: "[project]/app/chatbot/page.tsx",
                                                    lineNumber: 925,
                                                    columnNumber: 19
                                                }, this)),
                                            busy && messages[messages.length - 1]?.role === 'user' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 9,
                                                    alignItems: 'flex-start'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "alt-avatar",
                                                        style: {
                                                            width: 34,
                                                            height: 34,
                                                            borderRadius: '50%',
                                                            flexShrink: 0,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '0.6rem',
                                                            fontFamily: F_ORB,
                                                            fontWeight: 700,
                                                            letterSpacing: '0.05em',
                                                            background: 'rgba(255,0,110,0.08)',
                                                            border: '2px solid rgba(255,0,110,0.4)',
                                                            color: 'rgba(255,0,110,0.9)',
                                                            boxShadow: '0 0 18px rgba(255,0,110,0.35), inset 0 0 12px rgba(255,0,110,0.08)',
                                                            transformStyle: 'preserve-3d',
                                                            animation: 'avatarPulse 2.4s ease-in-out infinite'
                                                        },
                                                        children: "A"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/chatbot/page.tsx",
                                                        lineNumber: 938,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: '0.52rem',
                                                                    letterSpacing: '0.25em',
                                                                    textTransform: 'uppercase',
                                                                    marginBottom: 4,
                                                                    fontFamily: F_RAJ,
                                                                    color: 'rgba(255,0,110,0.4)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 5
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            width: 4,
                                                                            height: 4,
                                                                            borderRadius: '50%',
                                                                            background: 'rgba(255,0,110,0.5)',
                                                                            display: 'inline-block'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/chatbot/page.tsx",
                                                                        lineNumber: 951,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    "◈ ATHER ENGINE"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/chatbot/page.tsx",
                                                                lineNumber: 950,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    padding: '10px 13px',
                                                                    borderRadius: 6,
                                                                    background: 'rgba(18,8,28,0.9)',
                                                                    border: '1px solid rgba(255,0,110,0.14)',
                                                                    borderLeft: '2px solid rgba(255,0,110,0.35)'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TypingDots, {}, void 0, false, {
                                                                    fileName: "[project]/app/chatbot/page.tsx",
                                                                    lineNumber: 955,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/chatbot/page.tsx",
                                                                lineNumber: 954,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/chatbot/page.tsx",
                                                        lineNumber: 949,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/chatbot/page.tsx",
                                                lineNumber: 937,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: messagesEndRef
                                    }, void 0, false, {
                                        fileName: "[project]/app/chatbot/page.tsx",
                                        lineNumber: 962,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/chatbot/page.tsx",
                                lineNumber: 863,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '10px 16px 12px',
                                    borderTop: `1px solid ${C.bdrO}`,
                                    background: 'rgba(8,4,14,0.88)',
                                    backdropFilter: 'blur(16px)',
                                    flexShrink: 0,
                                    position: 'relative'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'absolute',
                                            top: -10,
                                            left: 16,
                                            fontFamily: F_RAJ,
                                            fontSize: '0.5rem',
                                            letterSpacing: '0.2em',
                                            color: C.dimmer,
                                            background: 'rgba(8,4,14,0.88)',
                                            padding: '0 6px'
                                        },
                                        children: "INPUT_NODE://"
                                    }, void 0, false, {
                                        fileName: "[project]/app/chatbot/page.tsx",
                                        lineNumber: 975,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: handleSubmit,
                                        style: {
                                            display: 'flex',
                                            gap: 8,
                                            alignItems: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>voiceModeState.active ? closeVoiceMode() : openVoiceMode(),
                                                title: voiceModeState.active ? 'Apagar micrófono' : 'Encender micrófono',
                                                disabled: busy,
                                                style: {
                                                    width: 36,
                                                    height: 36,
                                                    borderRadius: 6,
                                                    flexShrink: 0,
                                                    background: voiceModeState.active ? 'rgba(255,0,110,0.15)' : 'transparent',
                                                    border: voiceModeState.active ? '1px solid rgba(255,0,110,0.5)' : '1px solid rgba(255,0,110,0.25)',
                                                    color: voiceModeState.active ? '#FF006E' : 'rgba(255,0,110,0.7)',
                                                    cursor: busy ? 'not-allowed' : 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    opacity: busy ? 0.28 : 1,
                                                    transformStyle: 'preserve-3d',
                                                    willChange: 'transform'
                                                },
                                                onMouseMove: (e)=>{
                                                    if (!busy && !voiceModeState.active) {
                                                        e.currentTarget.style.borderColor = 'rgba(255,0,110,0.5)';
                                                        e.currentTarget.style.color = 'rgba(255,0,110,0.9)';
                                                        e.currentTarget.style.background = 'rgba(255,0,110,0.1)';
                                                        magneticMove(e, 0.3);
                                                    }
                                                },
                                                onMouseLeave: (e)=>{
                                                    if (!voiceModeState.active) {
                                                        e.currentTarget.style.borderColor = 'rgba(255,0,110,0.25)';
                                                        e.currentTarget.style.color = 'rgba(255,0,110,0.7)';
                                                        e.currentTarget.style.background = 'transparent';
                                                        magneticReset(e);
                                                    }
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: 2,
                                                    style: {
                                                        width: 16,
                                                        height: 16
                                                    },
                                                    children: voiceModeState.active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 0 1 0 1.971l-11.54 6.347a1.125 1.125 0 0 1-1.667-.985V5.653Z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/chatbot/page.tsx",
                                                        lineNumber: 1019,
                                                        columnNumber: 21
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        d: "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/chatbot/page.tsx",
                                                        lineNumber: 1021,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chatbot/page.tsx",
                                                    lineNumber: 1017,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/chatbot/page.tsx",
                                                lineNumber: 985,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "alt-cin",
                                                value: input,
                                                onChange: (e)=>setInput(e.target.value),
                                                onKeyDown: handleKeyDown,
                                                placeholder: "TRANSMITE TU COMANDO AL NÚCLEO...",
                                                disabled: busy,
                                                autoComplete: "off",
                                                style: {
                                                    flex: 1,
                                                    background: 'transparent',
                                                    border: '1px solid rgba(255,0,110,0.2)',
                                                    borderBottom: '1.5px solid rgba(255,107,0,0.4)',
                                                    borderRadius: 6,
                                                    padding: '10px 14px',
                                                    color: C.text,
                                                    fontFamily: F_RAJ,
                                                    fontSize: '0.82rem',
                                                    letterSpacing: '0.03em',
                                                    caretColor: C.purple,
                                                    outline: 'none',
                                                    transition: 'all 0.2s',
                                                    opacity: busy ? 0.5 : 1,
                                                    transformStyle: 'preserve-3d',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
                                                },
                                                onFocus: (e)=>{
                                                    e.currentTarget.style.borderColor = 'rgba(255,0,110,0.5)';
                                                    e.currentTarget.style.borderBottomColor = C.pink;
                                                    e.currentTarget.style.boxShadow = '0 0 20px rgba(255,0,110,0.2), 0 4px 12px rgba(0,0,0,0.25)';
                                                    e.currentTarget.style.background = 'rgba(255,0,110,0.03)';
                                                },
                                                onBlur: (e)=>{
                                                    e.currentTarget.style.borderColor = 'rgba(255,0,110,0.2)';
                                                    e.currentTarget.style.borderBottomColor = 'rgba(255,107,0,0.4)';
                                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
                                                    e.currentTarget.style.background = 'transparent';
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/chatbot/page.tsx",
                                                lineNumber: 1025,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: busy || !input.trim(),
                                                style: {
                                                    width: 36,
                                                    height: 36,
                                                    borderRadius: 6,
                                                    flexShrink: 0,
                                                    background: 'transparent',
                                                    border: '1px solid rgba(255,107,0,0.3)',
                                                    color: 'rgba(255,107,0,0.8)',
                                                    cursor: busy || !input.trim() ? 'not-allowed' : 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    opacity: busy || !input.trim() ? 0.28 : 1,
                                                    transformStyle: 'preserve-3d',
                                                    willChange: 'transform'
                                                },
                                                onMouseMove: (e)=>{
                                                    if (!busy && input.trim()) {
                                                        e.currentTarget.style.borderColor = C.orange;
                                                        e.currentTarget.style.color = C.orange;
                                                        e.currentTarget.style.background = 'rgba(255,107,0,0.07)';
                                                        magneticMove(e, 0.35);
                                                    }
                                                },
                                                onMouseLeave: (e)=>{
                                                    e.currentTarget.style.borderColor = 'rgba(255,107,0,0.3)';
                                                    e.currentTarget.style.color = 'rgba(255,107,0,0.8)';
                                                    e.currentTarget.style.background = 'transparent';
                                                    magneticReset(e);
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconSend, {}, void 0, false, {
                                                    fileName: "[project]/app/chatbot/page.tsx",
                                                    lineNumber: 1077,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/chatbot/page.tsx",
                                                lineNumber: 1054,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/chatbot/page.tsx",
                                        lineNumber: 983,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '0.58rem',
                                            color: C.dimmer,
                                            letterSpacing: '0.15em',
                                            textAlign: 'center',
                                            marginTop: 8,
                                            fontFamily: F_RAJ,
                                            textTransform: 'uppercase'
                                        },
                                        children: "CONECTADO A /API/CHAT · ATHERNIX ENGINE FASE I"
                                    }, void 0, false, {
                                        fileName: "[project]/app/chatbot/page.tsx",
                                        lineNumber: 1081,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/chatbot/page.tsx",
                                lineNumber: 966,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/chatbot/page.tsx",
                        lineNumber: 775,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/chatbot/page.tsx",
                lineNumber: 630,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2f$VoiceMode$2f$VoiceOverlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                state: voiceModeState,
                onClose: closeVoiceMode,
                onStartCycle: startVoiceCycle,
                onInterrupt: interrupt
            }, void 0, false, {
                fileName: "[project]/app/chatbot/page.tsx",
                lineNumber: 1092,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0_vqyoy._.js.map