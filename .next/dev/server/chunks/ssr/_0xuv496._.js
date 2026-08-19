module.exports = [
"[project]/models/AuthModel.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRoleDashboardPath",
    ()=>getRoleDashboardPath,
    "initialLoginFormState",
    ()=>initialLoginFormState,
    "mapAuthError",
    ()=>mapAuthError,
    "signInWithCredentials",
    ()=>signInWithCredentials,
    "signInWithGithub",
    ()=>signInWithGithub,
    "signInWithGoogle",
    ()=>signInWithGoogle,
    "validateForgotPasswordForm",
    ()=>validateForgotPasswordForm,
    "validateResetPasswordForm",
    ()=>validateResetPasswordForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
const initialLoginFormState = {
    email: "",
    password: "",
    rememberSession: false,
    isLoading: false,
    error: null
};
async function signInWithCredentials(credentials) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
    });
    if (error) {
        return {
            success: false,
            error: error.message
        };
    }
    if (!data.user) {
        return {
            success: false,
            error: "No se encontró el usuario."
        };
    }
    // Fetch role from profiles table
    const { data: profile, error: profileError } = await supabase.from("profiles").select("role").eq("id", data.user.id).single();
    if (profileError || !profile) {
        // Default to Personal if no profile found
        return {
            success: true,
            role: "Personal"
        };
    }
    return {
        success: true,
        role: profile.role ?? "Personal"
    };
}
async function signInWithGoogle() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${window.location.origin}/auth/callback`
        }
    });
    if (error) {
        return {
            success: false,
            error: error.message
        };
    }
    return {
        success: true
    };
}
async function signInWithGithub() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${window.location.origin}/auth/callback`
        }
    });
    if (error) {
        return {
            success: false,
            error: error.message
        };
    }
    return {
        success: true
    };
}
function getRoleDashboardPath(role) {
    const paths = {
        admin: "/dashboard/admin",
        Teacher: "/dashboard/teacher",
        Student: "/dashboard/student",
        Personal: "/dashboard"
    };
    return paths[role] ?? "/dashboard";
}
function validateForgotPasswordForm(data) {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
        errors.email = "El email es requerido";
    } else if (!emailRegex.test(data.email)) {
        errors.email = "Email inválido";
    }
    return errors;
}
function validateResetPasswordForm(data) {
    const errors = {};
    if (!data.password) {
        errors.password = "La contraseña es requerida";
    } else if (data.password.length < 8) {
        errors.password = "Mínimo 8 caracteres";
    } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(data.password)) {
        errors.password = "Debe incluir mayúscula y número";
    }
    if (!data.confirmPassword) {
        errors.confirmPassword = "Confirma tu contraseña";
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden";
    }
    return errors;
}
function mapAuthError(error) {
    const map = {
        "User not found": "No existe una cuenta con ese email",
        "Email rate limit exceeded": "Demasiados intentos. Espera un momento",
        "Invalid email": "El formato del email no es válido",
        "Auth session missing": "Sesión expirada, solicita un nuevo enlace",
        "New password should be different from the old password": "La nueva contraseña debe ser diferente a la anterior",
        "Password should be at least 6 characters": "La contraseña debe tener al menos 6 caracteres",
        "Token has expired or is invalid": "El enlace expiró. Solicita uno nuevo"
    };
    return map[error] ?? "Error inesperado. Intenta de nuevo";
}
}),
"[project]/controllers/auth/data:d205e7 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signOutAction",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"00595787f396531cca77fc87eaff9777eb40fe90de":{"name":"signOutAction"}},"controllers/auth/AuthAction.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("00595787f396531cca77fc87eaff9777eb40fe90de", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "signOutAction");
;
}),
"[project]/controllers/auth/data:d0197c [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "forgotPasswordAction",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"401b63690ff5972aba8392c8813da7074cc4f4ae3a":{"name":"forgotPasswordAction"}},"controllers/auth/AuthAction.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("401b63690ff5972aba8392c8813da7074cc4f4ae3a", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "forgotPasswordAction");
;
}),
"[project]/controllers/auth/data:ff8cf0 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resetPasswordAction",
    ()=>$$RSC_SERVER_ACTION_3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40c3adfe492e38435ef4009f26477aca5c53f26410":{"name":"resetPasswordAction"}},"controllers/auth/AuthAction.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40c3adfe492e38435ef4009f26477aca5c53f26410", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "resetPasswordAction");
;
}),
"[project]/controllers/auth/AuthController.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useForgotPasswordController",
    ()=>useForgotPasswordController,
    "useResetPasswordController",
    ()=>useResetPasswordController,
    "useSignOut",
    ()=>useSignOut
]);
// Hooks para signOut, forgot password y reset password
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$AuthModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/AuthModel.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$auth$2f$data$3a$d205e7__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/controllers/auth/data:d205e7 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$auth$2f$data$3a$d0197c__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/controllers/auth/data:d0197c [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$auth$2f$data$3a$ff8cf0__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/controllers/auth/data:ff8cf0 [app-ssr] (ecmascript) <text/javascript>");
"use client";
;
;
;
;
function useSignOut() {
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSignOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setIsLoading(true);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$auth$2f$data$3a$d205e7__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["signOutAction"])();
    // signOutAction hace redirect, no necesita setState posterior
    }, []);
    return {
        isLoading,
        handleSignOut
    };
}
function useForgotPasswordController() {
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        email: ""
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const handleChange = (e)=>{
        setFormData({
            email: e.target.value
        });
        setErrors({});
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const validationErrors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$AuthModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateForgotPasswordForm"])(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setStatus("loading");
        const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$auth$2f$data$3a$d0197c__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["forgotPasswordAction"])(formData.email);
        if (error) {
            setErrors({
                general: (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$AuthModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAuthError"])(error)
            });
            setStatus("idle");
            return;
        }
        // Siempre mostrar éxito aunque el email no exista
        setStatus("email_sent");
    };
    return {
        formData,
        errors,
        status,
        handleChange,
        handleSubmit
    };
}
function useResetPasswordController() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showConfirm, setShowConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleChange = (field)=>(e)=>{
            setFormData((prev)=>({
                    ...prev,
                    [field]: e.target.value
                }));
            setErrors((prev)=>({
                    ...prev,
                    [field]: undefined,
                    general: undefined
                }));
        };
    const toggleShowPassword = ()=>setShowPassword((p)=>!p);
    const toggleShowConfirm = ()=>setShowConfirm((p)=>!p);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const validationErrors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$AuthModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateResetPasswordForm"])(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setStatus("loading");
        const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$auth$2f$data$3a$ff8cf0__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["resetPasswordAction"])(formData.password);
        if (error) {
            setErrors({
                general: (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$AuthModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapAuthError"])(error)
            });
            setStatus("idle");
            return;
        }
        setStatus("success");
        setTimeout(()=>router.push("/login"), 2000);
    };
    return {
        formData,
        errors,
        status,
        showPassword,
        showConfirm,
        handleChange,
        handleSubmit,
        toggleShowPassword,
        toggleShowConfirm
    };
}
}),
"[project]/app/resetpassword/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ResetPasswordView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
// ============================================================
// VIEW — ResetPasswordView.tsx
// Pantalla /update-password — nueva contraseña tras el enlace
// ============================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/SplitText.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$auth$2f$AuthController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/controllers/auth/AuthController.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif";
const F_MONO = "'Plus Jakarta Sans', monospace";
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
        ease: "power2.out"
    });
}
function tiltReset(e) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.35,
        ease: "power2.out"
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
        ease: "power2.out"
    });
}
function magneticReset(e) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: "elastic.out(1,0.4)"
    });
}
// ── Iconos ───────────────────────────────────────────────────
const IconLock = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        className: "w-4 h-4",
        stroke: "currentColor",
        strokeWidth: 1.5,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "5",
                y: "11",
                width: "14",
                height: "10",
                rx: "2"
            }, void 0, false, {
                fileName: "[project]/app/resetpassword/page.tsx",
                lineNumber: 43,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 11V7a4 4 0 118 0v4",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/app/resetpassword/page.tsx",
                lineNumber: 44,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/resetpassword/page.tsx",
        lineNumber: 42,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const IconEye = ({ open })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        className: "w-4 h-4",
        stroke: "currentColor",
        strokeWidth: 1.5,
        children: open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                }, void 0, false, {
                    fileName: "[project]/app/resetpassword/page.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "12",
                    cy: "12",
                    r: "3"
                }, void 0, false, {
                    fileName: "[project]/app/resetpassword/page.tsx",
                    lineNumber: 51,
                    columnNumber: 66
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"
                }, void 0, false, {
                    fileName: "[project]/app/resetpassword/page.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"
                }, void 0, false, {
                    fileName: "[project]/app/resetpassword/page.tsx",
                    lineNumber: 53,
                    columnNumber: 97
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "1",
                    y1: "1",
                    x2: "23",
                    y2: "23"
                }, void 0, false, {
                    fileName: "[project]/app/resetpassword/page.tsx",
                    lineNumber: 53,
                    columnNumber: 177
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/app/resetpassword/page.tsx",
        lineNumber: 49,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const IconShield = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        className: "w-9 h-9",
        stroke: "currentColor",
        strokeWidth: 1.5,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/app/resetpassword/page.tsx",
                lineNumber: 60,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                points: "9 12 11 14 15 10",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/app/resetpassword/page.tsx",
                lineNumber: 61,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/resetpassword/page.tsx",
        lineNumber: 59,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
function createGlowTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.25, "rgba(255,255,255,0.5)");
    grad.addColorStop(0.6, "rgba(255,255,255,0.1)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
}
// ── 3D Fluid tubes background ──────────────────────────────────
function NeuralField3D() {
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const container = mountRef.current;
        if (!container) return;
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
        scene.background = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](0x050208);
        const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](55, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 32);
        const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
            alpha: true,
            antialias: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        // Colored lights for glossy feel
        const ambient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AmbientLight"](0xffffff, 0.25);
        scene.add(ambient);
        const p1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](0xff4500, 2.2, 70);
        p1.position.set(10, 10, 12);
        scene.add(p1);
        const p2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](0xff8c00, 2.2, 70);
        p2.position.set(-12, -8, 10);
        scene.add(p2);
        const p3 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](0xff0000, 1.8, 70);
        p3.position.set(0, 14, -8);
        scene.add(p3);
        // Custom gradient shader for glossy organic tubes
        const tubeUniforms = {
            uTime: {
                value: 0
            },
            uColor1: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]("#ff4500")
            },
            uColor2: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]("#ff6020")
            },
            uColor3: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]("#ff8c00")
            },
            uColor4: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]("#ff0000")
            }
        };
        const tubeVertex = `
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
        const tubeFragment = `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform vec3 uColor4;
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        float t1 = sin(vPosition.x * 0.12 + vPosition.y * 0.08 + uTime * 0.4) * 0.5 + 0.5;
        float t2 = sin(vPosition.z * 0.1 - uTime * 0.3) * 0.5 + 0.5;
        float t3 = sin(vUv.x * 6.28 + uTime * 0.2) * 0.5 + 0.5;
        vec3 color = mix(uColor1, uColor2, t1);
        color = mix(color, uColor3, t2 * 0.7);
        color = mix(color, uColor4, t3 * 0.35);
        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
        float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);
        color += vec3(0.2) * fresnel;
        gl_FragColor = vec4(color, 0.96);
      }
    `;
        const tubeMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
            uniforms: tubeUniforms,
            vertexShader: tubeVertex,
            fragmentShader: tubeFragment,
            transparent: true,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"],
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
            depthWrite: false
        });
        // Twisted torus-knot tubes (image style)
        const tubeGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        const knot1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusKnotGeometry"](11, 2.5, 280, 26, 2, 3), tubeMat.clone());
        knot1.position.set(0, 0, -5);
        tubeGroup.add(knot1);
        const knot2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusKnotGeometry"](7.8, 1.7, 240, 22, 3, 4), tubeMat.clone());
        knot2.position.set(0, 0, 2);
        tubeGroup.add(knot2);
        const knot3 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusKnotGeometry"](4.8, 0.9, 200, 18, 4, 5), tubeMat.clone());
        knot3.position.set(0, 0, 6);
        tubeGroup.add(knot3);
        scene.add(tubeGroup);
        // Floating glossy spheres
        const spheres = [];
        const sphereGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](1, 32, 32);
        const sphereColors = [
            0xff4500,
            0xff6020,
            0xff8c00,
            0xff0000
        ];
        for(let i = 0; i < 5; i++){
            const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]({
                color: sphereColors[i % sphereColors.length],
                emissive: sphereColors[i % sphereColors.length],
                emissiveIntensity: 0.25,
                metalness: 0.6,
                roughness: 0.15,
                clearcoat: 0.8,
                transparent: true,
                opacity: 0.85
            });
            const sphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](sphereGeo, mat);
            const a = Math.random() * Math.PI * 2;
            const r = 14 + Math.random() * 12;
            sphere.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 10, Math.sin(a) * r);
            const scale = 0.4 + Math.random() * 0.8;
            sphere.scale.setScalar(scale);
            spheres.push(sphere);
            scene.add(sphere);
        }
        // Subtle starfield
        const starCount = 300;
        const sPos = new Float32Array(starCount * 3);
        const sCol = new Float32Array(starCount * 3);
        const palette = [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]("#ff4500"),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]("#ff6020"),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]("#ff8c00"),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]("#ffffff")
        ];
        for(let i = 0; i < starCount; i++){
            const r = 50 + Math.random() * 60;
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
        sGeo.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](sPos, 3));
        sGeo.setAttribute("color", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](sCol, 3));
        const glowTex = createGlowTexture();
        const sMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointsMaterial"]({
            size: 0.45,
            map: glowTex,
            transparent: true,
            vertexColors: true,
            opacity: 0.7,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
            depthWrite: false,
            sizeAttenuation: true
        });
        const stars = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Points"](sGeo, sMat);
        scene.add(stars);
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
        window.addEventListener("mousemove", onMove);
        window.addEventListener("scroll", onScroll, {
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
            // Animate tube materials
            tubeGroup.children.forEach((mesh, i)=>{
                const material = mesh.material;
                material.uniforms.uTime.value = t;
                mesh.rotation.x = t * 0.05 * k * (i % 2 === 0 ? 1 : -1) + smoothMy * 0.05;
                mesh.rotation.y = t * 0.08 * k + smoothMx * 0.05;
            });
            tubeGroup.rotation.z = smoothScroll * 0.0002;
            // Orbit spheres
            spheres.forEach((sphere, i)=>{
                const a = t * 0.25 * k + i * 1.2;
                const r = 16 + i * 3;
                sphere.position.x = Math.cos(a) * r;
                sphere.position.z = Math.sin(a) * r;
                sphere.position.y = Math.sin(t * 0.4 * k + i) * 4;
            });
            // Rotate starfield slowly
            stars.rotation.y = t * 0.03 * k;
            stars.rotation.x = smoothMy * 0.04;
            // Move lights for dynamic shading
            p1.position.x = Math.sin(t * 0.3 * k) * 14;
            p1.position.y = Math.cos(t * 0.25 * k) * 10;
            p2.position.x = Math.cos(t * 0.2 * k) * 12;
            p2.position.z = Math.sin(t * 0.2 * k) * 10;
            // Camera parallax + scroll zoom
            const targetX = smoothMx * 16;
            const targetY = smoothMy * 12;
            const targetZ = Math.max(10, 38 - smoothScroll * 0.15);
            camera.position.x += (targetX - camera.position.x) * 0.04;
            camera.position.y += (targetY - camera.position.y) * 0.04;
            camera.position.z += (targetZ - camera.position.z) * 0.05;
            camera.lookAt(0, smoothScroll * 0.01, 0);
            renderer.render(scene, camera);
        };
        animate();
        const onResize = ()=>{
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener("resize", onResize);
        return ()=>{
            window.removeEventListener("resize", onResize);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
            if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
            glowTex.dispose();
            renderer.dispose();
            tubeGroup.children.forEach((mesh)=>{
                mesh.geometry.dispose();
                mesh.material.dispose();
            });
            spheres.forEach((sphere)=>{
                sphere.geometry.dispose();
                sphere.material.dispose();
            });
            sGeo.dispose();
            sMat.dispose();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none",
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mountRef,
                style: {
                    width: "100%",
                    height: "100%"
                }
            }, void 0, false, {
                fileName: "[project]/app/resetpassword/page.tsx",
                lineNumber: 322,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(8,0,8,0.3) 55%, rgba(8,0,8,0.9) 100%)"
                }
            }, void 0, false, {
                fileName: "[project]/app/resetpassword/page.tsx",
                lineNumber: 323,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/resetpassword/page.tsx",
        lineNumber: 321,
        columnNumber: 5
    }, this);
}
function ResetPasswordView() {
    const { formData, errors, status, showPassword, showConfirm, handleChange, handleSubmit, toggleShowPassword, toggleShowConfirm } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$controllers$2f$auth$2f$AuthController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useResetPasswordController"])();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const titleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const subtitleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fieldRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const btnRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const glowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const successRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [particles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>("TURBOPACK compile-time truthy", 1) ? [] : "TURBOPACK unreachable");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    // ── Entrada ──────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].context(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(".orb-rp1", {
                scale: 1.2,
                opacity: 0.55,
                duration: 4.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(".orb-rp2", {
                scale: 1.15,
                opacity: 0.35,
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 2
            });
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                defaults: {
                    ease: "power3.out"
                }
            });
            tl.fromTo(cardRef.current, {
                y: 60,
                opacity: 0,
                scale: 0.92,
                rotationX: -10
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                rotationX: 0,
                duration: 0.8,
                ease: "back.out(1.4)"
            }).fromTo(subtitleRef.current, {
                opacity: 0,
                y: 10
            }, {
                opacity: 1,
                y: 0,
                duration: 0.4
            }, "-=0.4");
            if (!prefersReduced) {
                const title = titleRef.current;
                if (title && title.textContent && title.textContent.trim().length > 0) {
                    const split = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SplitText"](title, {
                        type: "chars"
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
                        ease: "back.out(1.7)",
                        delay: 0.1
                    });
                }
            } else {
                tl.fromTo(titleRef.current, {
                    y: -20,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.5
                }, "-=0.4");
            }
            tl.fromTo(fieldRefs.current.filter(Boolean), {
                x: -30,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.1
            }, "-=0.4").fromTo(btnRef.current, {
                y: 20,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.4
            }, "-=0.1");
        }, containerRef);
        return ()=>ctx.revert();
    }, []);
    // ── Éxito ────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (status === "success" && cardRef.current && successRef.current) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(cardRef.current, {
                opacity: 0,
                scale: 0.9,
                duration: 0.4,
                onComplete: ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(successRef.current, {
                        scale: 0,
                        opacity: 0
                    }, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: "back.out(1.7)"
                    });
                }
            });
        }
    }, [
        status
    ]);
    // ── Shake errores ────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (Object.keys(errors).length > 0 && cardRef.current) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(cardRef.current, {
                x: -8
            }, {
                x: 0,
                duration: 0.4,
                ease: "elastic.out(1,0.3)"
            });
        }
    }, [
        errors
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative z-10 min-h-screen flex items-center justify-center overflow-hidden",
        style: {
            background: "transparent"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NeuralField3D, {}, void 0, false, {
                fileName: "[project]/app/resetpassword/page.tsx",
                lineNumber: 421,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rp-progress-bar fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left",
                style: {
                    background: 'linear-gradient(90deg,#ff4500,#ff6020,#ff8c00)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rp-progress-bar-inner",
                    style: {
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg,#ff4500,#ff6020,#ff8c00)',
                        boxShadow: '0 0 12px rgba(255,96,32,0.4)',
                        transform: 'scaleX(0)',
                        transformOrigin: 'left'
                    }
                }, void 0, false, {
                    fileName: "[project]/app/resetpassword/page.tsx",
                    lineNumber: 426,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/resetpassword/page.tsx",
                lineNumber: 424,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 pointer-events-none z-0",
                style: {
                    opacity: 0.16,
                    backgroundImage: 'linear-gradient(rgba(255,80,30,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,80,30,0.05) 1px,transparent 1px)',
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,#000 0%,transparent 85%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,#000 0%,transparent 85%)'
                }
            }, void 0, false, {
                fileName: "[project]/app/resetpassword/page.tsx",
                lineNumber: 430,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "orb-rp1 fixed pointer-events-none rounded-full",
                style: {
                    width: 550,
                    height: 550,
                    top: '-8%',
                    right: '-12%',
                    zIndex: 0,
                    background: 'radial-gradient(circle,rgba(255,69,0,0.22) 0%,transparent 70%)',
                    filter: 'blur(50px)'
                }
            }, void 0, false, {
                fileName: "[project]/app/resetpassword/page.tsx",
                lineNumber: 439,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "orb-rp2 fixed pointer-events-none rounded-full",
                style: {
                    width: 450,
                    height: 450,
                    bottom: '-5%',
                    left: '-8%',
                    zIndex: 0,
                    background: 'radial-gradient(circle,rgba(220,40,40,0.18) 0%,transparent 70%)',
                    filter: 'blur(60px)'
                }
            }, void 0, false, {
                fileName: "[project]/app/resetpassword/page.tsx",
                lineNumber: 443,
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
                fileName: "[project]/app/resetpassword/page.tsx",
                lineNumber: 449,
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
                        borderTop: pos.startsWith('t') ? '2px solid #ff6020' : undefined,
                        borderBottom: pos.startsWith('b') ? '2px solid #ff6020' : undefined,
                        borderLeft: pos.endsWith('l') ? '2px solid #ff6020' : undefined,
                        borderRight: pos.endsWith('r') ? '2px solid #ff6020' : undefined
                    }
                }, pos, false, {
                    fileName: "[project]/app/resetpassword/page.tsx",
                    lineNumber: 455,
                    columnNumber: 9
                }, this)),
            status === "success" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: successRef,
                className: "absolute z-50 flex flex-col items-center gap-4 opacity-0 text-center px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-20 h-20 rounded-full flex items-center justify-center",
                        style: {
                            background: "linear-gradient(135deg, #ff4500, #ff8c00)",
                            boxShadow: "0 0 40px rgba(255,69,0,0.6)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconShield, {}, void 0, false, {
                            fileName: "[project]/app/resetpassword/page.tsx",
                            lineNumber: 474,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/resetpassword/page.tsx",
                        lineNumber: 472,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xl font-black tracking-widest uppercase",
                        style: {
                            color: "#ff6020",
                            fontFamily: "'Courier New', monospace",
                            textShadow: "0 0 20px rgba(255,96,32,0.8)"
                        },
                        children: "CONTRASEÑA ACTUALIZADA"
                    }, void 0, false, {
                        fileName: "[project]/app/resetpassword/page.tsx",
                        lineNumber: 476,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        style: {
                            color: "rgba(255,255,255,0.5)",
                            fontFamily: "'Courier New', monospace"
                        },
                        children: "Redirigiendo al inicio de sesión..."
                    }, void 0, false, {
                        fileName: "[project]/app/resetpassword/page.tsx",
                        lineNumber: 480,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/resetpassword/page.tsx",
                lineNumber: 471,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: cardRef,
                style: {
                    background: "rgba(12,4,4,0.75)",
                    border: "2px solid rgba(220,60,20,0.22)",
                    boxShadow: "0 16px 60px rgba(0,0,0,0.7), 0 0 40px rgba(255,80,20,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
                    backdropFilter: "blur(16px)",
                    transformStyle: "preserve-3d",
                    willChange: "transform"
                },
                onMouseMove: (e)=>{
                    tiltMove(e, -5, 8);
                    e.currentTarget.style.borderColor = 'rgba(220,60,20,0.5)';
                    e.currentTarget.style.boxShadow = '0 20px 70px rgba(0,0,0,0.8), 0 0 50px rgba(255,80,20,0.12), inset 0 1px 0 rgba(255,255,255,0.07)';
                },
                onMouseLeave: (e)=>{
                    tiltReset(e);
                    e.currentTarget.style.borderColor = 'rgba(220,60,20,0.22)';
                    e.currentTarget.style.boxShadow = '0 16px 60px rgba(0,0,0,0.7), 0 0 40px rgba(255,80,20,0.08), inset 0 1px 0 rgba(255,255,255,0.05)';
                },
                className: "jsx-29fc77756c7b5888" + " " + "relative w-full max-w-sm mx-4 rounded-2xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "linear-gradient(90deg, transparent, #ff4500, #ff8c00, #ff4500, transparent)"
                        },
                        className: "jsx-29fc77756c7b5888" + " " + "h-0.5 w-full"
                    }, void 0, false, {
                        fileName: "[project]/app/resetpassword/page.tsx",
                        lineNumber: 492,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-29fc77756c7b5888" + " " + "px-8 pt-8 pb-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-29fc77756c7b5888" + " " + "text-center mb-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        ref: titleRef,
                                        style: {
                                            fontFamily: "'Courier New', monospace",
                                            background: "linear-gradient(90deg, #ff6020, #ffaa00, #ff4500)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            letterSpacing: "0.15em"
                                        },
                                        className: "jsx-29fc77756c7b5888" + " " + "rp-title text-2xl font-black tracking-widest uppercase mb-2",
                                        children: "NUEVA CONTRASEÑA"
                                    }, void 0, false, {
                                        fileName: "[project]/app/resetpassword/page.tsx",
                                        lineNumber: 496,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        ref: subtitleRef,
                                        style: {
                                            color: "rgba(255,140,80,0.7)"
                                        },
                                        className: "jsx-29fc77756c7b5888" + " " + "flex items-center justify-center gap-2 text-xs tracking-widest uppercase",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "rgba(255,80,20,0.5)"
                                                },
                                                className: "jsx-29fc77756c7b5888",
                                                children: "◆"
                                            }, void 0, false, {
                                                fileName: "[project]/app/resetpassword/page.tsx",
                                                lineNumber: 502,
                                                columnNumber: 15
                                            }, this),
                                            "ACTUALIZACIÓN SEGURA",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "rgba(255,80,20,0.5)"
                                                },
                                                className: "jsx-29fc77756c7b5888",
                                                children: "◆"
                                            }, void 0, false, {
                                                fileName: "[project]/app/resetpassword/page.tsx",
                                                lineNumber: 504,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/resetpassword/page.tsx",
                                        lineNumber: 500,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/resetpassword/page.tsx",
                                lineNumber: 495,
                                columnNumber: 11
                            }, this),
                            errors.general && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "rgba(220,20,20,0.15)",
                                    border: "1px solid rgba(220,20,20,0.4)",
                                    color: "#ff6060",
                                    fontFamily: "'Courier New', monospace"
                                },
                                className: "jsx-29fc77756c7b5888" + " " + "mb-4 px-4 py-2 rounded-lg text-xs tracking-wider text-center",
                                children: [
                                    "⚠ ",
                                    errors.general
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/resetpassword/page.tsx",
                                lineNumber: 509,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                noValidate: true,
                                className: "jsx-29fc77756c7b5888" + " " + "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: (el)=>{
                                            fieldRefs.current[0] = el;
                                        },
                                        className: "jsx-29fc77756c7b5888",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    color: "rgba(255,120,60,0.8)",
                                                    fontFamily: "'Courier New', monospace"
                                                },
                                                className: "jsx-29fc77756c7b5888" + " " + "flex items-center gap-1.5 text-xs tracking-widest uppercase mb-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconLock, {}, void 0, false, {
                                                        fileName: "[project]/app/resetpassword/page.tsx",
                                                        lineNumber: 520,
                                                        columnNumber: 17
                                                    }, this),
                                                    " NUEVA_CLAVE"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/resetpassword/page.tsx",
                                                lineNumber: 518,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-29fc77756c7b5888" + " " + "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: showPassword ? "text" : "password",
                                                        value: formData.password,
                                                        onChange: handleChange("password"),
                                                        placeholder: "••••••••",
                                                        autoComplete: "new-password",
                                                        style: {
                                                            background: "rgba(255,255,255,0.04)",
                                                            border: errors.password ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)",
                                                            color: "rgba(255,255,255,0.85)",
                                                            fontFamily: "'Courier New', monospace",
                                                            caretColor: "#ff6020",
                                                            transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s"
                                                        },
                                                        onFocus: (e)=>{
                                                            e.target.style.border = "1px solid rgba(255,120,30,0.85)";
                                                            e.target.style.boxShadow = "0 0 0 3px rgba(255,80,20,0.25), 0 0 20px rgba(255,80,20,0.15)";
                                                            e.target.style.transform = "translateZ(8px)";
                                                        },
                                                        onBlur: (e)=>{
                                                            e.target.style.border = errors.password ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)";
                                                            e.target.style.boxShadow = "none";
                                                            e.target.style.transform = "translateZ(0)";
                                                        },
                                                        className: "jsx-29fc77756c7b5888" + " " + "w-full px-4 py-3 pr-10 rounded-lg text-sm outline-none transition-all duration-200"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/resetpassword/page.tsx",
                                                        lineNumber: 523,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: toggleShowPassword,
                                                        style: {
                                                            color: "rgba(255,120,60,0.6)",
                                                            transformStyle: "preserve-3d",
                                                            willChange: "transform"
                                                        },
                                                        onMouseMove: (e)=>{
                                                            magneticMove(e, 0.3);
                                                            tiltMove(e, -2, 12);
                                                        },
                                                        onMouseLeave: (e)=>{
                                                            magneticReset(e);
                                                            tiltReset(e);
                                                        },
                                                        className: "jsx-29fc77756c7b5888" + " " + "absolute right-3 top-1/2 -translate-y-1/2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconEye, {
                                                            open: showPassword
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/resetpassword/page.tsx",
                                                            lineNumber: 538,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/resetpassword/page.tsx",
                                                        lineNumber: 534,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            background: "linear-gradient(90deg, #ff4500, #ff8c00)",
                                                            width: formData.password ? "100%" : "0%"
                                                        },
                                                        className: "jsx-29fc77756c7b5888" + " " + "absolute bottom-0 left-0 h-px transition-all duration-300"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/resetpassword/page.tsx",
                                                        lineNumber: 540,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/resetpassword/page.tsx",
                                                lineNumber: 522,
                                                columnNumber: 15
                                            }, this),
                                            errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: "#ff5555",
                                                    fontFamily: "'Courier New', monospace"
                                                },
                                                className: "jsx-29fc77756c7b5888" + " " + "mt-1 text-xs",
                                                children: [
                                                    "✕ ",
                                                    errors.password
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/resetpassword/page.tsx",
                                                lineNumber: 543,
                                                columnNumber: 35
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/resetpassword/page.tsx",
                                        lineNumber: 517,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: (el)=>{
                                            fieldRefs.current[1] = el;
                                        },
                                        className: "jsx-29fc77756c7b5888",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    color: "rgba(255,120,60,0.8)",
                                                    fontFamily: "'Courier New', monospace"
                                                },
                                                className: "jsx-29fc77756c7b5888" + " " + "flex items-center gap-1.5 text-xs tracking-widest uppercase mb-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconLock, {}, void 0, false, {
                                                        fileName: "[project]/app/resetpassword/page.tsx",
                                                        lineNumber: 550,
                                                        columnNumber: 17
                                                    }, this),
                                                    " CONFIRMAR_CLAVE"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/resetpassword/page.tsx",
                                                lineNumber: 548,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-29fc77756c7b5888" + " " + "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: showConfirm ? "text" : "password",
                                                        value: formData.confirmPassword,
                                                        onChange: handleChange("confirmPassword"),
                                                        placeholder: "••••••••",
                                                        autoComplete: "new-password",
                                                        style: {
                                                            background: "rgba(255,255,255,0.04)",
                                                            border: errors.confirmPassword ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)",
                                                            color: "rgba(255,255,255,0.85)",
                                                            fontFamily: "'Courier New', monospace",
                                                            caretColor: "#ff6020",
                                                            transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s"
                                                        },
                                                        onFocus: (e)=>{
                                                            e.target.style.border = "1px solid rgba(255,120,30,0.85)";
                                                            e.target.style.boxShadow = "0 0 0 3px rgba(255,80,20,0.25), 0 0 20px rgba(255,80,20,0.15)";
                                                            e.target.style.transform = "translateZ(8px)";
                                                        },
                                                        onBlur: (e)=>{
                                                            e.target.style.border = errors.confirmPassword ? "1px solid rgba(255,60,60,0.7)" : "1px solid rgba(255,80,30,0.25)";
                                                            e.target.style.boxShadow = "none";
                                                            e.target.style.transform = "translateZ(0)";
                                                        },
                                                        className: "jsx-29fc77756c7b5888" + " " + "w-full px-4 py-3 pr-10 rounded-lg text-sm outline-none transition-all duration-200"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/resetpassword/page.tsx",
                                                        lineNumber: 553,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: toggleShowConfirm,
                                                        style: {
                                                            color: "rgba(255,120,60,0.6)",
                                                            transformStyle: "preserve-3d",
                                                            willChange: "transform"
                                                        },
                                                        onMouseMove: (e)=>{
                                                            magneticMove(e, 0.3);
                                                            tiltMove(e, -2, 12);
                                                        },
                                                        onMouseLeave: (e)=>{
                                                            magneticReset(e);
                                                            tiltReset(e);
                                                        },
                                                        className: "jsx-29fc77756c7b5888" + " " + "absolute right-3 top-1/2 -translate-y-1/2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconEye, {
                                                            open: showConfirm
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/resetpassword/page.tsx",
                                                            lineNumber: 568,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/resetpassword/page.tsx",
                                                        lineNumber: 564,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            background: "linear-gradient(90deg, #ff4500, #ff8c00)",
                                                            width: formData.confirmPassword ? "100%" : "0%"
                                                        },
                                                        className: "jsx-29fc77756c7b5888" + " " + "absolute bottom-0 left-0 h-px transition-all duration-300"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/resetpassword/page.tsx",
                                                        lineNumber: 570,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/resetpassword/page.tsx",
                                                lineNumber: 552,
                                                columnNumber: 15
                                            }, this),
                                            errors.confirmPassword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: "#ff5555",
                                                    fontFamily: "'Courier New', monospace"
                                                },
                                                className: "jsx-29fc77756c7b5888" + " " + "mt-1 text-xs",
                                                children: [
                                                    "✕ ",
                                                    errors.confirmPassword
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/resetpassword/page.tsx",
                                                lineNumber: 573,
                                                columnNumber: 42
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/resetpassword/page.tsx",
                                        lineNumber: 547,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        ref: btnRef,
                                        type: "submit",
                                        disabled: status === "loading",
                                        style: {
                                            backgroundImage: status === "loading" ? "none" : "linear-gradient(90deg, #e83500, #ff6020, #ff9500, #ff6020, #e83500)",
                                            backgroundColor: status === "loading" ? "rgba(180,50,10,0.5)" : "transparent",
                                            backgroundSize: "200% 100%",
                                            color: "#fff",
                                            fontFamily: "'Courier New', monospace",
                                            letterSpacing: "0.2em",
                                            boxShadow: status === "loading" ? "none" : "0 0 20px rgba(255,80,20,0.4)",
                                            animation: status === "loading" ? "none" : "btn-shine 2s linear infinite",
                                            cursor: status === "loading" ? "not-allowed" : "pointer",
                                            border: "1px solid rgba(255,120,50,0.3)",
                                            transformStyle: "preserve-3d",
                                            willChange: "transform"
                                        },
                                        onMouseMove: (e)=>{
                                            if (status !== "loading") {
                                                magneticMove(e, 0.12);
                                                tiltMove(e, -2, 6);
                                            }
                                        },
                                        onMouseEnter: (e)=>{
                                            if (status !== "loading") __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
                                                scale: 1.03,
                                                duration: 0.2
                                            });
                                        },
                                        onMouseLeave: (e)=>{
                                            magneticReset(e);
                                            tiltReset(e);
                                            if (status !== "loading") __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
                                                scale: 1,
                                                duration: 0.2
                                            });
                                        },
                                        className: "jsx-29fc77756c7b5888" + " " + "w-full py-3.5 rounded-xl text-sm font-black tracking-widest uppercase mt-2",
                                        children: status === "loading" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-29fc77756c7b5888" + " " + "flex items-center justify-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    className: "jsx-29fc77756c7b5888" + " " + "animate-spin w-4 h-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            cx: "12",
                                                            cy: "12",
                                                            r: "10",
                                                            stroke: "currentColor",
                                                            strokeWidth: "4",
                                                            className: "jsx-29fc77756c7b5888" + " " + "opacity-25"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/resetpassword/page.tsx",
                                                            lineNumber: 585,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            fill: "currentColor",
                                                            d: "M4 12a8 8 0 018-8v8H4z",
                                                            className: "jsx-29fc77756c7b5888" + " " + "opacity-75"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/resetpassword/page.tsx",
                                                            lineNumber: 586,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/resetpassword/page.tsx",
                                                    lineNumber: 584,
                                                    columnNumber: 19
                                                }, this),
                                                "ACTUALIZANDO..."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/resetpassword/page.tsx",
                                            lineNumber: 583,
                                            columnNumber: 17
                                        }, this) : "ACTUALIZAR CONTRASEÑA"
                                    }, void 0, false, {
                                        fileName: "[project]/app/resetpassword/page.tsx",
                                        lineNumber: 576,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/resetpassword/page.tsx",
                                lineNumber: 515,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/resetpassword/page.tsx",
                        lineNumber: 494,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "linear-gradient(90deg, transparent, rgba(180,50,10,0.4), transparent)"
                        },
                        className: "jsx-29fc77756c7b5888" + " " + "h-px w-full"
                    }, void 0, false, {
                        fileName: "[project]/app/resetpassword/page.tsx",
                        lineNumber: 594,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        id: "29fc77756c7b5888",
                        children: "main{background-color:#0000!important}input::placeholder{color:#fff3}input:-webkit-autofill{-webkit-text-fill-color:#ffffffd9;-webkit-box-shadow:inset 0 0 0 50px #120505f2}"
                    }, void 0, false, void 0, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/resetpassword/page.tsx",
                lineNumber: 487,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/resetpassword/page.tsx",
        lineNumber: 418,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_0xuv496._.js.map