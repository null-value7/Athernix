module.exports = [
"[project]/components/FallbackRobot.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FallbackRobot",
    ()=>FallbackRobot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-b389eeca.esm.js [app-ssr] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const MOVE_SPEED = 0.06;
const INITIAL_POS = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](1.4, -2.5, 3);
const INITIAL_ROT_Y = -0.4;
const FACE_COLORS = {
    idle: "#ff003c",
    happy: "#00ff88",
    distracted: "#ffd700",
    pro: "#ff6b00",
    angry: "#ff006e",
    glitch: "#ffffff"
};
function FallbackRobot({ robotState }) {
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const faceMeshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const targetPosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(INITIAL_POS.clone());
    const targetRotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(INITIAL_ROT_Y);
    const bobRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (robotState.mode === "register") {
            targetPosRef.current.x = -1.4;
            targetRotRef.current = 0.5;
        } else {
            targetPosRef.current.x = 1.4;
            targetRotRef.current = -0.4;
        }
    }, [
        robotState.mode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mat = faceMeshRef.current?.material;
        if (!mat) return;
        let color = FACE_COLORS.idle;
        if (robotState.focusedInput === "dance") color = FACE_COLORS.happy;
        if (robotState.focusedInput === "spy") color = FACE_COLORS.distracted;
        mat.emissive.set(color);
        mat.color.set(color);
    }, [
        robotState.focusedInput
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])((state)=>{
        if (!groupRef.current) return;
        bobRef.current += 0.04;
        groupRef.current.position.y = targetPosRef.current.y + Math.sin(bobRef.current) * 0.08;
        groupRef.current.position.x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(groupRef.current.position.x, targetPosRef.current.x, MOVE_SPEED);
        groupRef.current.position.z = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(groupRef.current.position.z, targetPosRef.current.z, MOVE_SPEED);
        const targetQuat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Quaternion"]().setFromAxisAngle(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0), targetRotRef.current);
        groupRef.current.quaternion.slerp(targetQuat, MOVE_SPEED);
        if (robotState.autoRotate) {
            targetRotRef.current += 0.005;
        }
        const mat = faceMeshRef.current?.material;
        if (mat) {
            const pulse = 4 + Math.sin(state.clock.getElapsedTime() * 2) * 1.5;
            mat.emissiveIntensity = robotState.neonActive ? pulse : 0.3;
        }
    });
    const bodyIntensity = robotState.neonActive ? 2.5 : 0.2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        position: INITIAL_POS.toArray(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.6,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            1.2,
                            1.4,
                            0.9
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/FallbackRobot.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#1a0022",
                        emissive: "#440011",
                        emissiveIntensity: bodyIntensity,
                        metalness: 0.8,
                        roughness: 0.3
                    }, void 0, false, {
                        fileName: "[project]/components/FallbackRobot.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FallbackRobot.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    1.55,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.9,
                            0.7,
                            0.75
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/FallbackRobot.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#120018",
                        emissive: "#330022",
                        emissiveIntensity: bodyIntensity,
                        metalness: 0.85,
                        roughness: 0.25
                    }, void 0, false, {
                        fileName: "[project]/components/FallbackRobot.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FallbackRobot.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: faceMeshRef,
                position: [
                    0,
                    1.55,
                    0.38
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            0.55,
                            0.35
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/FallbackRobot.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: FACE_COLORS.idle,
                        emissive: FACE_COLORS.idle,
                        emissiveIntensity: 6,
                        transparent: true,
                        opacity: 0.95
                    }, void 0, false, {
                        fileName: "[project]/components/FallbackRobot.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FallbackRobot.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -0.75,
                    0.2,
                    0
                ],
                rotation: [
                    0,
                    0,
                    0.3
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("capsuleGeometry", {
                        args: [
                            0.12,
                            0.7,
                            4,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/FallbackRobot.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#1a0022",
                        emissive: "#ff006e",
                        emissiveIntensity: bodyIntensity,
                        metalness: 0.7,
                        roughness: 0.35
                    }, void 0, false, {
                        fileName: "[project]/components/FallbackRobot.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FallbackRobot.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0.75,
                    0.2,
                    0
                ],
                rotation: [
                    0,
                    0,
                    -0.3
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("capsuleGeometry", {
                        args: [
                            0.12,
                            0.7,
                            4,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/FallbackRobot.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#1a0022",
                        emissive: "#ff6b00",
                        emissiveIntensity: bodyIntensity,
                        metalness: 0.7,
                        roughness: 0.35
                    }, void 0, false, {
                        fileName: "[project]/components/FallbackRobot.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FallbackRobot.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FallbackRobot.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/RobotModel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RobotModel",
    ()=>RobotModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-b389eeca.esm.js [app-ssr] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/loaders/GLTFLoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FallbackRobot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FallbackRobot.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const TOTAL_ASSETS = 14;
/* ─── Rutas (desde /public) ─── */ const MODEL_PATH = "/robot/model.glb";
const ANIM_PATHS = {
    idle: "/robot/animations/idle.glb",
    dance: "/robot/animations/sillydance.glb",
    backflip: "/robot/animations/backflip.glb",
    waving: "/robot/animations/waving.glb",
    angry: "/robot/animations/angry.glb",
    lookingA: "/robot/animations/lookingA.glb",
    getup: "/robot/animations/getup.glb"
};
const FACE_PATHS = {
    idle: "/robot/textures/Idle_Face.png",
    happy: "/robot/textures/Happy_Face.png",
    angry: "/robot/textures/Angry_Face.png",
    distracted: "/robot/textures/Distracted_Face.png",
    pro: "/robot/textures/Pro_Face.png",
    glitch: "/robot/textures/Glich_Face.png"
};
/* ─── Constantes ─── */ const MOVE_SPEED = 0.06;
const INITIAL_POS = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](1.4, -2.5, 3);
const INITIAL_ROT_Y = -0.4;
function RobotModel({ robotState, onProgress, onLoadComplete }) {
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mixerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentActionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const faceMaterialRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isPlayingSpecialRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isPlayingGetupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Refs para detectar cambios de estado
    const prevModeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const prevFocusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(robotState.focusedInput);
    const prevSubmitRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(robotState.submitTrigger);
    const prevNeonActiveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(robotState.neonActive);
    const prevGlitchRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(robotState.isGlitched);
    // Posición y rotación objetivo
    const targetPosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(INITIAL_POS.clone());
    const targetRotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(INITIAL_ROT_Y);
    // Estado de carga
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [modelReady, setModelReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mixerReady, setMixerReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadFailed, setLoadFailed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const loadCompleteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const reportProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((loaded)=>{
        onProgress?.(Math.min(100, loaded / TOTAL_ASSETS * 100));
    }, [
        onProgress
    ]);
    const finishLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (loadCompleteRef.current) return;
        loadCompleteRef.current = true;
        reportProgress(TOTAL_ASSETS);
        onLoadComplete?.();
    }, [
        onLoadComplete,
        reportProgress
    ]);
    // Almacenar assets cargados
    const loadedModelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const loadedAnimationsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    const loadedTexturesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    /* ─── Cargar assets de forma secuencial y robusta ─── */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const gltfLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GLTFLoader"]();
        const textureLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextureLoader"]();
        let loadedCount = 0;
        const loadAssets = async ()=>{
            try {
                console.log("🤖 Iniciando carga de assets...");
                // 1. Cargar texturas faciales primero
                const faceMapping = {
                    idle: 'Idle_Face.png',
                    happy: 'Happy_Face.png',
                    angry: 'Angry_Face.png',
                    distracted: 'Distracted_Face.png',
                    pro: 'Pro_Face.png',
                    glitch: 'Glich_Face.png'
                };
                for (const [key, fileName] of Object.entries(faceMapping)){
                    try {
                        const tex = await new Promise((resolve, reject)=>{
                            textureLoader.load(`/robot/textures/${fileName}`, resolve, undefined, reject);
                        });
                        tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
                        tex.center.set(0.5, 0.5);
                        tex.repeat.set(0.8, 0.8);
                        tex.rotation = 0.0;
                        loadedTexturesRef.current[key] = tex;
                        loadedCount++;
                        reportProgress(loadedCount);
                        console.log(`✅ Textura cargada: ${key}`);
                    } catch (e) {
                        console.error(`❌ Error cargando textura ${key}:`, e);
                        loadedCount++;
                        reportProgress(loadedCount);
                    }
                }
                // 2. Cargar modelo principal
                const baseGltf = await new Promise((resolve, reject)=>{
                    gltfLoader.load(MODEL_PATH, resolve, undefined, reject);
                });
                const model = baseGltf.scene;
                model.scale.set(0.9, 0.9, 0.9);
                // Configurar materiales del modelo
                model.traverse((node)=>{
                    const mesh = node;
                    if (!mesh.isMesh || !mesh.material) return;
                    const mat = mesh.material;
                    // Pantalla facial
                    if (node.name.includes("Pantalla_Expresiones") || mat.name === "Material_Rostro") {
                        node.scale.set(1, 1, 1);
                        node.rotation.y = Math.PI;
                        const faceMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                            map: loadedTexturesRef.current.idle,
                            emissiveMap: loadedTexturesRef.current.idle,
                            emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]("#ff003c"),
                            emissiveIntensity: 6.0,
                            transparent: true,
                            alphaTest: 0.1,
                            roughness: 0.1,
                            metalness: 0.1,
                            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
                        });
                        mesh.material = faceMat;
                        faceMaterialRef.current = faceMat;
                    } else {
                        // Resto del cuerpo - más metálico
                        mat.roughness = 0.3;
                        mat.metalness = 0.8;
                        if (mat.map) {
                            mat.emissiveMap = mat.map.clone();
                            mat.emissive = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]("#ffffff");
                            mat.emissiveIntensity = robotState.neonActive ? 5.5 : 0.0;
                        }
                    }
                });
                loadedModelRef.current = model;
                loadedCount++;
                reportProgress(loadedCount);
                console.log("✅ Modelo cargado y configurado");
                // 3. Cargar animaciones
                const animsToLoad = {
                    idle: '/robot/animations/idle.glb',
                    dance: '/robot/animations/sillydance.glb',
                    backflip: '/robot/animations/backflip.glb',
                    waving: '/robot/animations/waving.glb',
                    angry: '/robot/animations/angry.glb',
                    lookingA: '/robot/animations/lookingA.glb',
                    getup: '/robot/animations/getup.glb'
                };
                for (const [name, path] of Object.entries(animsToLoad)){
                    try {
                        const gltf = await new Promise((resolve, reject)=>{
                            gltfLoader.load(path, resolve, undefined, reject);
                        });
                        if (gltf.animations.length > 0) {
                            const clip = gltf.animations[0].clone();
                            clip.name = name;
                            loadedAnimationsRef.current[name] = clip;
                            loadedCount++;
                            reportProgress(loadedCount);
                            console.log(`✅ Animación cargada: ${name}`);
                        }
                    } catch (e) {
                        console.error(`❌ Error cargando animación ${name}:`, e);
                        loadedCount++;
                        reportProgress(loadedCount);
                    }
                }
                if (!loadedModelRef.current) {
                    throw new Error("Modelo principal no disponible");
                }
                setModelReady(true);
                setIsLoading(false);
                finishLoading();
                console.log("🎉 Todos los assets cargados correctamente");
            } catch (e) {
                console.error("❌ Error crítico cargando assets:", e);
                setLoadFailed(true);
                setIsLoading(false);
                finishLoading();
            }
        };
        loadAssets();
    }, [
        finishLoading,
        reportProgress
    ]);
    /* ─── Crear AnimationMixer y arrancar animación según modo ─── */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!modelReady || !loadedModelRef.current || !loadedAnimationsRef.current.idle) return;
        const mixer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimationMixer"](loadedModelRef.current);
        mixerRef.current = mixer;
        const initialClip = robotState.mode === "register" ? loadedAnimationsRef.current.waving : loadedAnimationsRef.current.idle;
        const initialAction = mixer.clipAction(initialClip || loadedAnimationsRef.current.idle);
        initialAction.setLoop(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoopRepeat"], Infinity);
        initialAction.play();
        currentActionRef.current = initialAction;
        // Configurar cara inicial
        const mat = faceMaterialRef.current;
        if (mat) {
            const initialFace = robotState.mode === "register" ? loadedTexturesRef.current.happy : loadedTexturesRef.current.idle;
            if (initialFace) {
                mat.map = initialFace;
                mat.emissiveMap = initialFace;
                mat.needsUpdate = true;
            }
        }
        // Configurar posición inicial según modo
        if (robotState.mode === "register") {
            targetPosRef.current.x = -1.4;
            targetRotRef.current = 0.5;
        } else {
            targetPosRef.current.x = 1.4;
            targetRotRef.current = -0.4;
        }
        setMixerReady(true);
        return ()=>{
            mixer.stopAllAction();
            setMixerReady(false);
        };
    }, [
        modelReady,
        robotState.mode
    ]);
    /* ─── Funciones de control ─── */ const setRobotFace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((expression)=>{
        const mat = faceMaterialRef.current;
        if (!mat || !loadedTexturesRef.current[expression]) return;
        mat.map = loadedTexturesRef.current[expression];
        mat.emissiveMap = loadedTexturesRef.current[expression];
        mat.needsUpdate = true;
    }, []);
    const fadeToAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((animName, duration = 0.3, loopMode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoopRepeat"])=>{
        const mixer = mixerRef.current;
        const clip = loadedAnimationsRef.current[animName];
        if (!mixer || !clip) return null;
        const newAction = mixer.clipAction(clip);
        const current = currentActionRef.current;
        if (current && current.getClip().name === animName) return newAction;
        newAction.reset();
        newAction.setLoop(loopMode, Infinity);
        if (loopMode === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoopOnce"]) newAction.clampWhenFinished = true;
        newAction.fadeIn(duration);
        if (current) current.fadeOut(duration);
        newAction.play();
        currentActionRef.current = newAction;
        return newAction;
    }, []);
    const executeOneShot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((animName)=>{
        const clip = loadedAnimationsRef.current[animName];
        if (!clip) return;
        const mixer = mixerRef.current;
        if (!mixer) return;
        const modeAtExecution = robotState.mode;
        isPlayingSpecialRef.current = true;
        const newAction = mixer.clipAction(clip);
        const current = currentActionRef.current;
        newAction.reset();
        newAction.setLoop(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoopOnce"], 1);
        newAction.clampWhenFinished = true;
        newAction.fadeIn(0.15);
        if (current) current.fadeOut(0.15);
        newAction.play();
        currentActionRef.current = newAction;
        const mat = faceMaterialRef.current;
        if (mat) {
            if (animName === "angry" && loadedTexturesRef.current.angry) {
                mat.map = loadedTexturesRef.current.angry;
                mat.emissiveMap = loadedTexturesRef.current.angry;
                mat.needsUpdate = true;
            } else if (animName === "backflip" && loadedTexturesRef.current.pro) {
                mat.map = loadedTexturesRef.current.pro;
                mat.emissiveMap = loadedTexturesRef.current.pro;
                mat.needsUpdate = true;
            } else if (animName === "waving" && loadedTexturesRef.current.happy) {
                mat.map = loadedTexturesRef.current.happy;
                mat.emissiveMap = loadedTexturesRef.current.happy;
                mat.needsUpdate = true;
            }
        }
        const onFinished = (e)=>{
            if (e.action === newAction) {
                isPlayingSpecialRef.current = false;
                mixer.removeEventListener("finished", onFinished);
                const currentMode = robotState.mode;
                const targetClip = currentMode === "register" ? loadedAnimationsRef.current.waving : loadedAnimationsRef.current.idle;
                const targetFace = currentMode === "register" ? loadedTexturesRef.current.happy : loadedTexturesRef.current.idle;
                if (targetClip) {
                    const action = mixer.clipAction(targetClip);
                    action.reset();
                    action.setLoop(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoopRepeat"], Infinity);
                    action.fadeIn(0.2);
                    if (currentActionRef.current) currentActionRef.current.fadeOut(0.2);
                    action.play();
                    currentActionRef.current = action;
                }
                const mat = faceMaterialRef.current;
                if (mat && targetFace) {
                    mat.map = targetFace;
                    mat.emissiveMap = targetFace;
                    mat.needsUpdate = true;
                }
            }
        };
        mixer.addEventListener("finished", onFinished);
    }, [
        robotState.mode
    ]);
    /* ─── Reaccionar a cambios de estado ─── */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!modelReady || !mixerRef.current || !mixerReady) return;
        if (prevModeRef.current === null || prevModeRef.current === robotState.mode) return;
        prevModeRef.current = robotState.mode;
        if (isPlayingSpecialRef.current) return;
        if (robotState.mode === "register") {
            targetPosRef.current.x = -1.4;
            targetRotRef.current = 0.5;
            isPlayingSpecialRef.current = true;
            const clip = loadedAnimationsRef.current.waving;
            if (clip && mixerRef.current) {
                const action = mixerRef.current.clipAction(clip);
                action.reset();
                action.setLoop(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoopRepeat"], Infinity);
                action.fadeIn(0.3);
                if (currentActionRef.current) currentActionRef.current.fadeOut(0.3);
                action.play();
                currentActionRef.current = action;
            }
            const mat = faceMaterialRef.current;
            if (mat && loadedTexturesRef.current.happy) {
                mat.map = loadedTexturesRef.current.happy;
                mat.emissiveMap = loadedTexturesRef.current.happy;
                mat.needsUpdate = true;
            }
        } else {
            targetPosRef.current.x = 1.4;
            targetRotRef.current = -0.4;
            isPlayingSpecialRef.current = true;
            const clip = loadedAnimationsRef.current.idle;
            if (clip && mixerRef.current) {
                const action = mixerRef.current.clipAction(clip);
                action.reset();
                action.setLoop(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoopRepeat"], Infinity);
                action.fadeIn(0.3);
                if (currentActionRef.current) currentActionRef.current.fadeOut(0.3);
                action.play();
                currentActionRef.current = action;
            }
            const mat = faceMaterialRef.current;
            if (mat && loadedTexturesRef.current.idle) {
                mat.map = loadedTexturesRef.current.idle;
                mat.emissiveMap = loadedTexturesRef.current.idle;
                mat.needsUpdate = true;
            }
        }
        const check = setInterval(()=>{
            if (!groupRef.current) return;
            if (Math.abs(groupRef.current.position.x - targetPosRef.current.x) < 0.1) {
                clearInterval(check);
                isPlayingSpecialRef.current = false;
            }
        }, 50);
        return ()=>clearInterval(check);
    }, [
        robotState.mode,
        modelReady,
        mixerReady
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (prevFocusRef.current === robotState.focusedInput) return;
        prevFocusRef.current = robotState.focusedInput;
        if (isPlayingSpecialRef.current) return;
        if (robotState.focusedInput === "dance") {
            const clip = loadedAnimationsRef.current.dance;
            if (clip && mixerRef.current) {
                const action = mixerRef.current.clipAction(clip);
                action.reset();
                action.setLoop(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoopRepeat"], Infinity);
                action.fadeIn(0.3);
                if (currentActionRef.current) currentActionRef.current.fadeOut(0.3);
                action.play();
                currentActionRef.current = action;
            }
            const mat = faceMaterialRef.current;
            if (mat && loadedTexturesRef.current.happy) {
                mat.map = loadedTexturesRef.current.happy;
                mat.emissiveMap = loadedTexturesRef.current.happy;
                mat.needsUpdate = true;
            }
        } else if (robotState.focusedInput === "spy") {
            const clip = loadedAnimationsRef.current.lookingA;
            if (clip && mixerRef.current) {
                const action = mixerRef.current.clipAction(clip);
                action.reset();
                action.setLoop(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoopRepeat"], Infinity);
                action.fadeIn(0.3);
                if (currentActionRef.current) currentActionRef.current.fadeOut(0.3);
                action.play();
                currentActionRef.current = action;
            }
            const mat = faceMaterialRef.current;
            if (mat && loadedTexturesRef.current.distracted) {
                mat.map = loadedTexturesRef.current.distracted;
                mat.emissiveMap = loadedTexturesRef.current.distracted;
                mat.needsUpdate = true;
            }
        } else {
            const clip = loadedAnimationsRef.current.idle;
            if (clip && mixerRef.current) {
                const action = mixerRef.current.clipAction(clip);
                action.reset();
                action.setLoop(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoopRepeat"], Infinity);
                action.fadeIn(0.3);
                if (currentActionRef.current) currentActionRef.current.fadeOut(0.3);
                action.play();
                currentActionRef.current = action;
            }
            const mat = faceMaterialRef.current;
            if (mat && loadedTexturesRef.current.idle) {
                mat.map = loadedTexturesRef.current.idle;
                mat.emissiveMap = loadedTexturesRef.current.idle;
                mat.needsUpdate = true;
            }
        }
    }, [
        robotState.focusedInput
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (prevSubmitRef.current === robotState.submitTrigger) return;
        prevSubmitRef.current = robotState.submitTrigger;
        executeOneShot("backflip");
        const checkMode = setInterval(()=>{
            if (!isPlayingSpecialRef.current) {
                clearInterval(checkMode);
                if (mixerRef.current) {
                    const targetClip = robotState.mode === "register" ? loadedAnimationsRef.current.waving : loadedAnimationsRef.current.idle;
                    const targetFace = robotState.mode === "register" ? loadedTexturesRef.current.happy : loadedTexturesRef.current.idle;
                    if (targetClip) {
                        const action = mixerRef.current.clipAction(targetClip);
                        action.reset();
                        action.setLoop(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoopRepeat"], Infinity);
                        action.fadeIn(0.3);
                        if (currentActionRef.current) currentActionRef.current.fadeOut(0.3);
                        action.play();
                        currentActionRef.current = action;
                    }
                    const mat = faceMaterialRef.current;
                    if (mat && targetFace) {
                        mat.map = targetFace;
                        mat.emissiveMap = targetFace;
                        mat.needsUpdate = true;
                    }
                    if (robotState.mode === "register") {
                        targetPosRef.current.x = -1.4;
                        targetRotRef.current = 0.5;
                    } else {
                        targetPosRef.current.x = 1.4;
                        targetRotRef.current = -0.4;
                    }
                }
            }
        }, 100);
        return ()=>clearInterval(checkMode);
    }, [
        robotState.submitTrigger
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (prevNeonActiveRef.current === robotState.neonActive) return;
        prevNeonActiveRef.current = robotState.neonActive;
        const model = loadedModelRef.current;
        if (!model) return;
        const currentAction = currentActionRef.current;
        model.traverse((node)=>{
            const mesh = node;
            if (!mesh.isMesh) return;
            const mat = mesh.material;
            if (mat?.emissiveMap && mat !== faceMaterialRef.current) {
                mat.emissiveIntensity = robotState.neonActive ? 5.5 : 0.0;
            }
        });
        if (currentAction && mixerRef.current) {
            currentAction.enabled = true;
        }
    }, [
        robotState.neonActive
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (prevGlitchRef.current === robotState.isGlitched) return;
        prevGlitchRef.current = robotState.isGlitched;
        if (robotState.isGlitched) {
            // Poner cara de glitch
            const mat = faceMaterialRef.current;
            if (mat && loadedTexturesRef.current.glitch) {
                mat.map = loadedTexturesRef.current.glitch;
                mat.emissiveMap = loadedTexturesRef.current.glitch;
                mat.needsUpdate = true;
            }
        }
    }, [
        robotState.isGlitched
    ]);
    const handleModelClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (isPlayingSpecialRef.current) return;
        const mat = faceMaterialRef.current;
        if (!mat) return;
        const clip = loadedAnimationsRef.current.getup;
        if (!clip) return;
        const mixer = mixerRef.current;
        if (!mixer) return;
        const currentMode = robotState.mode;
        isPlayingSpecialRef.current = true;
        isPlayingGetupRef.current = true;
        const newAction = mixer.clipAction(clip);
        const current = currentActionRef.current;
        newAction.reset();
        newAction.setLoop(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoopOnce"], Infinity);
        newAction.clampWhenFinished = true;
        newAction.fadeIn(0.1);
        if (current) current.fadeOut(0.1);
        newAction.play();
        currentActionRef.current = newAction;
        if (loadedTexturesRef.current.glitch) {
            mat.map = loadedTexturesRef.current.glitch;
            mat.emissiveMap = loadedTexturesRef.current.glitch;
            mat.needsUpdate = true;
        }
        const onFinished = (e)=>{
            if (e.action.getClip().name === "getup") {
                isPlayingSpecialRef.current = false;
                isPlayingGetupRef.current = false;
                mixer.removeEventListener("finished", onFinished);
                let targetClip = null;
                let targetFace = "idle";
                if (currentMode === "register") {
                    targetClip = loadedAnimationsRef.current.waving;
                    targetFace = "happy";
                } else {
                    targetClip = loadedAnimationsRef.current.idle;
                    targetFace = "idle";
                }
                if (targetClip) {
                    const action = mixer.clipAction(targetClip);
                    action.reset();
                    action.setLoop(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoopRepeat"], Infinity);
                    action.fadeIn(0.15);
                    if (currentActionRef.current) currentActionRef.current.fadeOut(0.15);
                    action.play();
                    currentActionRef.current = action;
                }
                if (loadedTexturesRef.current[targetFace]) {
                    mat.map = loadedTexturesRef.current[targetFace];
                    mat.emissiveMap = loadedTexturesRef.current[targetFace];
                    mat.needsUpdate = true;
                }
            }
        };
        mixer.addEventListener("finished", onFinished);
    }, [
        robotState.mode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])((state, delta)=>{
        if (mixerRef.current) {
            mixerRef.current.update(delta);
        }
        if (!groupRef.current) return;
        if (isPlayingGetupRef.current && faceMaterialRef.current) {
            const mat = faceMaterialRef.current;
            const time = state.clock.getElapsedTime();
            const offsetX = (Math.random() - 0.5) * 0.02;
            const offsetY = (Math.random() - 0.5) * 0.02;
            if (mat.map) {
                mat.map.offset.x = offsetX;
                mat.map.offset.y = offsetY;
                mat.map.needsUpdate = true;
            }
            if (mat.emissiveMap) {
                mat.emissiveMap.offset.x = offsetX;
                mat.emissiveMap.offset.y = offsetY;
                mat.emissiveMap.needsUpdate = true;
            }
            mat.emissiveIntensity = 6.0 + Math.sin(time * 20) * 2;
        } else if (faceMaterialRef.current) {
            const mat = faceMaterialRef.current;
            if (mat.map) {
                mat.map.offset.x = 0;
                mat.map.offset.y = 0;
                mat.map.needsUpdate = true;
            }
            if (mat.emissiveMap) {
                mat.emissiveMap.offset.x = 0;
                mat.emissiveMap.offset.y = 0;
                mat.emissiveMap.needsUpdate = true;
            }
            mat.emissiveIntensity = robotState.neonActive ? 5.5 : 0.0;
        }
        groupRef.current.position.lerp(targetPosRef.current, MOVE_SPEED);
        const targetQuat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Quaternion"]().setFromAxisAngle(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0), targetRotRef.current);
        groupRef.current.quaternion.slerp(targetQuat, MOVE_SPEED);
        if (robotState.autoRotate && !isPlayingSpecialRef.current) {
            targetRotRef.current += 0.005;
        }
    });
    if (loadFailed) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FallbackRobot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FallbackRobot"], {
            robotState: robotState
        }, void 0, false, {
            fileName: "[project]/components/RobotModel.tsx",
            lineNumber: 731,
            columnNumber: 12
        }, this);
    }
    if (isLoading || !modelReady || !loadedModelRef.current) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
            object: loadedModelRef.current,
            onClick: (e)=>{
                e.stopPropagation();
                handleModelClick();
            }
        }, void 0, false, {
            fileName: "[project]/components/RobotModel.tsx",
            lineNumber: 740,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/RobotModel.tsx",
        lineNumber: 739,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/CosmosParticles.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CosmosParticles",
    ()=>CosmosParticles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-b389eeca.esm.js [app-ssr] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function CosmosParticles() {
    const particlesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Crear geometría de partículas
    const particlesGeometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const totalParticles = 600;
        const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        const positions = new Float32Array(totalParticles * 3);
        const colors = new Float32Array(totalParticles * 3);
        const palette = [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](0xff006e),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](0xff6b00),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](0xffd700)
        ];
        for(let i = 0; i < totalParticles; i++){
            const r = 4.0 + Math.random() * 8;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
            const color = palette[Math.floor(Math.random() * 3)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        geometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
        geometry.setAttribute("color", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](colors, 3));
        return geometry;
    }, []);
    // Rotación suave de partículas
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])(()=>{
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.0003;
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: particlesRef,
        geometry: particlesGeometry,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pointsMaterial", {
            size: 0.07,
            vertexColors: true,
            transparent: true,
            opacity: 0.75,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"]
        }, void 0, false, {
            fileName: "[project]/components/CosmosParticles.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/CosmosParticles.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/RobotCanvas.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RobotCanvas",
    ()=>RobotCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-b389eeca.esm.js [app-ssr] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/postprocessing/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/OrbitControls.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RobotModel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/RobotModel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CosmosParticles$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CosmosParticles.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
/* ─── Luces con pulsación animada ─── */ function AnimatedLights({ neonMode }) {
    const pinkRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const orangeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])((state)=>{
        const elapsedTime = state.clock.getElapsedTime();
        const basePink = neonMode ? 2 : 0.2;
        const baseOrange = neonMode ? 1.5 : 0.2;
        if (pinkRef.current) {
            pinkRef.current.intensity = basePink + Math.sin(elapsedTime * 1.8) * 0.2;
        }
        if (orangeRef.current) {
            orangeRef.current.intensity = baseOrange + Math.cos(elapsedTime * 2.2) * 0.15;
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.7,
                color: 0x220033
            }, void 0, false, {
                fileName: "[project]/components/RobotCanvas.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                ref: pinkRef,
                position: [
                    -6,
                    4,
                    5
                ],
                intensity: 2,
                color: 0xff006e,
                distance: 20
            }, void 0, false, {
                fileName: "[project]/components/RobotCanvas.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                ref: orangeRef,
                position: [
                    6,
                    -4,
                    6
                ],
                intensity: 1.5,
                color: 0xff6b00,
                distance: 20
            }, void 0, false, {
                fileName: "[project]/components/RobotCanvas.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    0,
                    4,
                    -6
                ],
                intensity: 1.0,
                color: 0xffd700
            }, void 0, false, {
                fileName: "[project]/components/RobotCanvas.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
function RobotCanvas({ robotState, onLoadComplete, onProgress }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
        dpr: [
            1,
            1.5
        ],
        camera: {
            position: [
                0,
                0,
                14
            ],
            fov: 45,
            near: 0.1,
            far: 1000
        },
        gl: {
            alpha: true,
            antialias: false,
            powerPreference: "high-performance",
            toneMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"],
            toneMappingExposure: 1.0
        },
        style: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 2
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AnimatedLights, {
                neonMode: robotState.neonMode
            }, void 0, false, {
                fileName: "[project]/components/RobotCanvas.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CosmosParticles$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CosmosParticles"], {}, void 0, false, {
                fileName: "[project]/components/RobotCanvas.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrbitControls"], {
                enableZoom: false,
                enableRotate: false,
                enablePan: false
            }, void 0, false, {
                fileName: "[project]/components/RobotCanvas.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RobotModel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RobotModel"], {
                    robotState: robotState,
                    onProgress: onProgress,
                    onLoadComplete: onLoadComplete
                }, void 0, false, {
                    fileName: "[project]/components/RobotCanvas.tsx",
                    lineNumber: 106,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/RobotCanvas.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EffectComposer"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bloom"], {
                    intensity: robotState.neonMode ? 0.25 : 0.5,
                    luminanceThreshold: 0.95,
                    luminanceSmoothing: 0.5,
                    mipmapBlur: false
                }, void 0, false, {
                    fileName: "[project]/components/RobotCanvas.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/RobotCanvas.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/RobotCanvas.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
}),
"[project]/models/login.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRoleDashboardPath",
    ()=>getRoleDashboardPath,
    "initialLoginFormState",
    ()=>initialLoginFormState,
    "signInWithCredentials",
    ()=>signInWithCredentials,
    "signInWithGithub",
    ()=>signInWithGithub,
    "signInWithGoogle",
    ()=>signInWithGoogle
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
        // Default to personal if no profile found
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
        admin: "/dashboard",
        Teacher: "/dashboard/teacher",
        Student: "/dashboard/student",
        Personal: "/home"
    };
    return paths[role] ?? "/dashboard";
}
}),
"[project]/components/AuthForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthForm",
    ()=>AuthForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-ssr] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$login$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/login.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
/* ─── Schemas de validación Zod ─── */ const loginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Email requerido").email("Email inválido"),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Contraseña requerida")
});
const registerSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    nombre: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, "Nombre requerido"),
    apellido: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, "Apellido requerido"),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Email requerido").email("Email inválido"),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Contraseña requerida").refine((val)=>{
        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;
        return score >= 3;
    }, "Contraseña insegura"),
    confirmPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Confirma tu contraseña")
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: [
        "confirmPassword"
    ]
});
function AuthForm({ robotState, dispatch, initialMode = "login" }) {
    const [authMode, setAuthMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialMode);
    const [regStep, setRegStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [selectedGender, setSelectedGender] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showSuccess, setShowSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loginError, setLoginError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [registerError, setRegisterError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setAuthMode(initialMode);
    }, [
        initialMode
    ]);
    /* ─── Formularios react-hook-form ─── */ const loginForm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zodResolver"])(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const registerForm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zodResolver"])(registerSchema),
        defaultValues: {
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });
    /* ─── Fortaleza de contraseña (reactiva con watch) ─── */ const passwordValue = registerForm.watch("password");
    const passwordScore = (()=>{
        let s = 0;
        if (passwordValue.length >= 8) s++;
        if (/[A-Z]/.test(passwordValue)) s++;
        if (/[0-9]/.test(passwordValue)) s++;
        if (/[^A-Za-z0-9]/.test(passwordValue)) s++;
        return s;
    })();
    const strengthConfig = [
        {
            label: "FORTALEZA",
            color: "rgba(255,255,255,0.3)"
        },
        {
            label: "DÉBIL",
            color: "#FF006E"
        },
        {
            label: "REGULAR",
            color: "#FF6B00"
        },
        {
            label: "BUENA",
            color: "#FFD700"
        },
        {
            label: "FUERTE",
            color: "#00FF88"
        }
    ];
    /* ─── Handlers de modo ─── */ const handleGoToRegister = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setAuthMode("register");
        setRegStep(1);
        setShowSuccess(false);
        dispatch({
            type: "SET_MODE",
            mode: "register"
        });
    }, [
        dispatch
    ]);
    const handleGoToLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setAuthMode("login");
        setShowSuccess(false);
        dispatch({
            type: "SET_MODE",
            mode: "login"
        });
    }, [
        dispatch
    ]);
    /* ─── Focus/Blur helpers para robot ─── */ const handleFocusDance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        dispatch({
            type: "SET_FOCUS",
            focus: "dance"
        });
    }, [
        dispatch
    ]);
    const handleFocusSpy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        dispatch({
            type: "SET_FOCUS",
            focus: "spy"
        });
    }, [
        dispatch
    ]);
    const handleBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        dispatch({
            type: "SET_FOCUS",
            focus: null
        });
    }, [
        dispatch
    ]);
    /* ─── Handlers de pasos de registro ─── */ const handleNextStep1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const valid = await registerForm.trigger([
            "nombre",
            "apellido"
        ]);
        if (valid) setRegStep(2);
    }, [
        registerForm
    ]);
    const handleNextStep2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const valid = await registerForm.trigger([
            "email"
        ]);
        if (valid) setRegStep(3);
    }, [
        registerForm
    ]);
    const handleBackStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((step)=>{
        setRegStep(step);
    }, []);
    /* ─── Submit Login ─── */ const onLoginSubmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (data)=>{
        setLoginError("");
        setIsSubmitting(true);
        dispatch({
            type: "TRIGGER_SUBMIT"
        });
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$login$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signInWithCredentials"])({
                email: data.email,
                password: data.password
            });
            if (result.success) {
                // Redirigir según el rol
                const rolePaths = {
                    admin: "/dashboard",
                    Teacher: "/dashboard/teacher",
                    Student: "/dashboard/student",
                    Personal: "/home"
                };
                window.location.href = rolePaths[result.role || "Personal"] || "/home";
                return;
            }
            setLoginError(result.error || "Usuario o contraseña incorrectos");
        } catch  {
            setLoginError("No se pudo conectar con el servidor");
        } finally{
            setIsSubmitting(false);
        }
    }, [
        dispatch
    ]);
    /* ─── Submit Registro (Paso 3) ─── */ const onRegisterSubmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (data)=>{
        const valid = await registerForm.trigger([
            "password",
            "confirmPassword"
        ]);
        if (!valid) return;
        setIsSubmitting(true);
        setRegisterError("");
        dispatch({
            type: "TRIGGER_SUBMIT"
        });
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: `${data.nombre} ${data.apellido}`.trim()
                    }
                }
            });
            if (authError) {
                // Manejo específico para rate limiting (429)
                if (authError.message.includes("rate limit") || authError.status === 429) {
                    setRegisterError("Demasiados intentos de registro. Por favor espera unos minutos antes de intentar nuevamente.");
                } else {
                    setRegisterError(authError.message || "No se pudo crear la cuenta");
                }
                dispatch({
                    type: "SET_GLITCH",
                    glitch: true
                });
                return;
            }
            if (authData.user) {
                // Crear perfil en la tabla profiles
                const { error: profileError } = await supabase.from("profiles").upsert({
                    id: authData.user.id,
                    nombre: data.nombre,
                    apellido: data.apellido,
                    email: data.email,
                    role: "Personal"
                }, {
                    onConflict: "id"
                });
                if (profileError) {
                    console.error("Error creando perfil:", profileError);
                }
                setShowSuccess(true);
            }
        } catch (error) {
            // Manejo de errores de red
            if (error?.message?.includes("429")) {
                setRegisterError("Demasiados intentos de registro. Por favor espera unos minutos antes de intentar nuevamente.");
            } else {
                setRegisterError("No se pudo conectar con el servidor");
            }
            dispatch({
                type: "SET_GLITCH",
                glitch: true
            });
        } finally{
            setIsSubmitting(false);
        }
    }, [
        registerForm,
        dispatch
    ]);
    /* ─── Clases comunes ─── */ const mono = "font-[family-name:var(--font-jetbrains)]";
    const bebas = "font-[family-name:var(--font-bebas)]";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        x: authMode === "register" ? 300 : -300,
                        opacity: 0
                    },
                    animate: {
                        x: 0,
                        opacity: 1
                    },
                    exit: {
                        x: authMode === "register" ? -300 : 300,
                        opacity: 0
                    },
                    transition: {
                        duration: 0.7,
                        ease: [
                            0.16,
                            1,
                            0.3,
                            1
                        ]
                    },
                    className: `login-container ${authMode === "register" ? "mode-register" : ""}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-wrapper",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "auth-switcher",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleGoToLogin,
                                        className: authMode === "login" ? "active" : "",
                                        children: "Iniciar Sesión"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AuthForm.tsx",
                                        lineNumber: 264,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleGoToRegister,
                                        className: authMode === "register" ? "active" : "",
                                        children: "Registro"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AuthForm.tsx",
                                        lineNumber: 271,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AuthForm.tsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, this),
                            authMode === "register" && !showSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "steps-bar",
                                children: [
                                    {
                                        num: 1,
                                        label: "PERSONAL"
                                    },
                                    {
                                        num: 2,
                                        label: "CONTACTO"
                                    },
                                    {
                                        num: 3,
                                        label: "ACCESO"
                                    }
                                ].map((step, i)=>{
                                    const isActive = regStep === step.num;
                                    const isDone = regStep > step.num;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `step ${isActive ? "active" : ""} ${isDone ? "done" : ""}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "step-dot"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AuthForm.tsx",
                                                        lineNumber: 293,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: step.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AuthForm.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AuthForm.tsx",
                                                lineNumber: 292,
                                                columnNumber: 23
                                            }, this),
                                            i < 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "step-line"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AuthForm.tsx",
                                                lineNumber: 296,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, step.num, true, {
                                        fileName: "[project]/components/AuthForm.tsx",
                                        lineNumber: 291,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/AuthForm.tsx",
                                lineNumber: 282,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                mode: "wait",
                                children: !showSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].h2, {
                                    initial: {
                                        opacity: 0,
                                        y: 10
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -10
                                    },
                                    transition: {
                                        duration: 0.3
                                    },
                                    children: authMode === "login" ? "Iniciar Sesión" : "Crear Cuenta"
                                }, authMode, false, {
                                    fileName: "[project]/components/AuthForm.tsx",
                                    lineNumber: 306,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/AuthForm.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this),
                            authMode === "login" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: loginForm.handleSubmit(onLoginSubmit),
                                autoComplete: "off",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "input-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                required: true,
                                                className: loginForm.formState.errors.email ? "invalid" : "",
                                                ...loginForm.register("email"),
                                                onFocus: handleFocusDance,
                                                onBlur: handleBlur
                                            }, void 0, false, {
                                                fileName: "[project]/components/AuthForm.tsx",
                                                lineNumber: 326,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "floater",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AuthForm.tsx",
                                                lineNumber: 334,
                                                columnNumber: 19
                                            }, this),
                                            loginForm.formState.errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "field-msg err",
                                                children: loginForm.formState.errors.email.message
                                            }, void 0, false, {
                                                fileName: "[project]/components/AuthForm.tsx",
                                                lineNumber: 336,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AuthForm.tsx",
                                        lineNumber: 325,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "input-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "password",
                                                required: true,
                                                className: loginForm.formState.errors.password ? "invalid" : "",
                                                ...loginForm.register("password"),
                                                onFocus: handleFocusSpy,
                                                onBlur: handleBlur
                                            }, void 0, false, {
                                                fileName: "[project]/components/AuthForm.tsx",
                                                lineNumber: 344,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "floater",
                                                children: "Contraseña"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AuthForm.tsx",
                                                lineNumber: 352,
                                                columnNumber: 19
                                            }, this),
                                            loginForm.formState.errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "field-msg err",
                                                children: loginForm.formState.errors.password.message
                                            }, void 0, false, {
                                                fileName: "[project]/components/AuthForm.tsx",
                                                lineNumber: 354,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AuthForm.tsx",
                                        lineNumber: 343,
                                        columnNumber: 17
                                    }, this),
                                    loginError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "field-msg err",
                                        style: {
                                            marginBottom: "12px",
                                            display: "block"
                                        },
                                        children: loginError
                                    }, void 0, false, {
                                        fileName: "[project]/components/AuthForm.tsx",
                                        lineNumber: 361,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "btn-login",
                                        disabled: isSubmitting,
                                        children: isSubmitting ? "Verificando..." : "Ingresar"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AuthForm.tsx",
                                        lineNumber: 366,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AuthForm.tsx",
                                lineNumber: 320,
                                columnNumber: 15
                            }, this),
                            authMode === "register" && !showSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: registerForm.handleSubmit(onRegisterSubmit),
                                autoComplete: "off",
                                className: "flex flex-col",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    mode: "wait",
                                    children: [
                                        regStep === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                x: 40
                                            },
                                            animate: {
                                                opacity: 1,
                                                x: 0
                                            },
                                            exit: {
                                                opacity: 0,
                                                x: -40
                                            },
                                            transition: {
                                                duration: 0.3
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "grid",
                                                        gridTemplateColumns: "1fr 1fr",
                                                        gap: "12px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "input-group",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    className: registerForm.formState.errors.nombre ? "invalid" : "",
                                                                    ...registerForm.register("nombre"),
                                                                    onFocus: handleFocusDance,
                                                                    onBlur: handleBlur
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthForm.tsx",
                                                                    lineNumber: 391,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "floater",
                                                                    children: "Nombre *"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthForm.tsx",
                                                                    lineNumber: 398,
                                                                    columnNumber: 27
                                                                }, this),
                                                                registerForm.formState.errors.nombre && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "field-msg err",
                                                                    children: registerForm.formState.errors.nombre.message
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthForm.tsx",
                                                                    lineNumber: 400,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 390,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "input-group",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    className: registerForm.formState.errors.apellido ? "invalid" : "",
                                                                    ...registerForm.register("apellido"),
                                                                    onFocus: handleFocusDance,
                                                                    onBlur: handleBlur
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthForm.tsx",
                                                                    lineNumber: 406,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "floater",
                                                                    children: "Apellido *"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthForm.tsx",
                                                                    lineNumber: 413,
                                                                    columnNumber: 27
                                                                }, this),
                                                                registerForm.formState.errors.apellido && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "field-msg err",
                                                                    children: registerForm.formState.errors.apellido.message
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthForm.tsx",
                                                                    lineNumber: 415,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 405,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AuthForm.tsx",
                                                    lineNumber: 389,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "btn-login",
                                                    onClick: handleNextStep1,
                                                    style: {
                                                        marginTop: "10px"
                                                    },
                                                    children: "Siguiente ›"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AuthForm.tsx",
                                                    lineNumber: 422,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, "step1", true, {
                                            fileName: "[project]/components/AuthForm.tsx",
                                            lineNumber: 382,
                                            columnNumber: 21
                                        }, this),
                                        regStep === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                x: 40
                                            },
                                            animate: {
                                                opacity: 1,
                                                x: 0
                                            },
                                            exit: {
                                                opacity: 0,
                                                x: -40
                                            },
                                            transition: {
                                                duration: 0.3
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "input-group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "email",
                                                            className: registerForm.formState.errors.email ? "invalid" : "",
                                                            ...registerForm.register("email"),
                                                            onFocus: handleFocusDance,
                                                            onBlur: handleBlur
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 438,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "floater",
                                                            children: "Email *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 445,
                                                            columnNumber: 25
                                                        }, this),
                                                        registerForm.formState.errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "field-msg err",
                                                            children: registerForm.formState.errors.email.message
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 447,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AuthForm.tsx",
                                                    lineNumber: 437,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "btn-row",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "btn-back",
                                                            onClick: ()=>handleBackStep(1),
                                                            children: "‹ Volver"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 454,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "btn-login",
                                                            onClick: handleNextStep2,
                                                            style: {
                                                                flex: 1
                                                            },
                                                            children: "Siguiente ›"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 457,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AuthForm.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, "step2", true, {
                                            fileName: "[project]/components/AuthForm.tsx",
                                            lineNumber: 430,
                                            columnNumber: 21
                                        }, this),
                                        regStep === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                x: 40
                                            },
                                            animate: {
                                                opacity: 1,
                                                x: 0
                                            },
                                            exit: {
                                                opacity: 0,
                                                x: -40
                                            },
                                            transition: {
                                                duration: 0.3
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "input-group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "password",
                                                            className: registerForm.formState.errors.password ? "invalid" : "",
                                                            ...registerForm.register("password"),
                                                            onFocus: handleFocusSpy,
                                                            onBlur: handleBlur
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 475,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "floater",
                                                            children: "Contraseña *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 482,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "strength-wrap",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "strength-bar",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "strength-fill",
                                                                        style: {
                                                                            width: `${passwordScore / 4 * 100}%`,
                                                                            background: strengthConfig[passwordScore].color
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AuthForm.tsx",
                                                                        lineNumber: 485,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthForm.tsx",
                                                                    lineNumber: 484,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "strength-label",
                                                                    style: {
                                                                        color: strengthConfig[passwordScore].color
                                                                    },
                                                                    children: strengthConfig[passwordScore].label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthForm.tsx",
                                                                    lineNumber: 493,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 483,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pass-rules",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: passwordValue.length >= 8 ? "rule ok" : "",
                                                                    children: "● Mínimo 8 caracteres"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthForm.tsx",
                                                                    lineNumber: 501,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: /[A-Z]/.test(passwordValue) ? "rule ok" : "",
                                                                    children: "● Una mayúscula"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthForm.tsx",
                                                                    lineNumber: 504,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: /[0-9]/.test(passwordValue) ? "rule ok" : "",
                                                                    children: "● Un número"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthForm.tsx",
                                                                    lineNumber: 507,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: /[^A-Za-z0-9]/.test(passwordValue) ? "rule ok" : "",
                                                                    children: "● Un símbolo"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AuthForm.tsx",
                                                                    lineNumber: 510,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 500,
                                                            columnNumber: 25
                                                        }, this),
                                                        registerForm.formState.errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "field-msg err",
                                                            children: registerForm.formState.errors.password.message
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 515,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AuthForm.tsx",
                                                    lineNumber: 474,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "input-group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "password",
                                                            className: registerForm.formState.errors.confirmPassword ? "invalid" : "",
                                                            ...registerForm.register("confirmPassword")
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 523,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "floater",
                                                            children: "Confirmar Contraseña *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 528,
                                                            columnNumber: 25
                                                        }, this),
                                                        registerForm.formState.errors.confirmPassword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "field-msg err",
                                                            children: registerForm.formState.errors.confirmPassword.message
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 530,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AuthForm.tsx",
                                                    lineNumber: 522,
                                                    columnNumber: 23
                                                }, this),
                                                registerError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "field-msg err",
                                                    style: {
                                                        marginBottom: "12px",
                                                        display: "block"
                                                    },
                                                    children: registerError
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AuthForm.tsx",
                                                    lineNumber: 537,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "btn-row",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "btn-back",
                                                            onClick: ()=>handleBackStep(2),
                                                            children: "‹ Volver"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 543,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "submit",
                                                            className: "btn-login",
                                                            style: {
                                                                flex: 1
                                                            },
                                                            disabled: isSubmitting,
                                                            children: isSubmitting ? "Creando..." : "Crear Cuenta ✦"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AuthForm.tsx",
                                                            lineNumber: 546,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AuthForm.tsx",
                                                    lineNumber: 542,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, "step3", true, {
                                            fileName: "[project]/components/AuthForm.tsx",
                                            lineNumber: 466,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AuthForm.tsx",
                                    lineNumber: 379,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/AuthForm.tsx",
                                lineNumber: 374,
                                columnNumber: 15
                            }, this),
                            authMode === "register" && showSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    scale: 0.9
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                className: "success-state",
                                style: {
                                    display: "block"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: "3.5rem",
                                            color: "#00FF88",
                                            marginBottom: "10px"
                                        },
                                        children: "✦"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AuthForm.tsx",
                                        lineNumber: 564,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "✦ ¡CUENTA CREADA! ✦"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AuthForm.tsx",
                                        lineNumber: 565,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            marginBottom: "25px"
                                        },
                                        children: [
                                            "Hemos enviado un correo de verificación a ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: registerForm.watch("email")
                                            }, void 0, false, {
                                                fileName: "[project]/components/AuthForm.tsx",
                                                lineNumber: 567,
                                                columnNumber: 61
                                            }, this),
                                            ". Por favor verifica tu correo para comenzar a usar tu cuenta."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AuthForm.tsx",
                                        lineNumber: 566,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "btn-login",
                                        onClick: handleGoToLogin,
                                        children: "Ir al Inicio de Sesión ›"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AuthForm.tsx",
                                        lineNumber: 570,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AuthForm.tsx",
                                lineNumber: 558,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AuthForm.tsx",
                        lineNumber: 261,
                        columnNumber: 11
                    }, this)
                }, authMode, false, {
                    fileName: "[project]/components/AuthForm.tsx",
                    lineNumber: 253,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/AuthForm.tsx",
                lineNumber: 252,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "interactive",
                children: [
                    {
                        id: "btn-rotation",
                        label: "Rotación",
                        action: ()=>dispatch({
                                type: "TOGGLE_ROTATE"
                            })
                    },
                    {
                        id: "btn-light",
                        label: "Luz",
                        action: ()=>dispatch({
                                type: "TOGGLE_LIGHT"
                            })
                    },
                    {
                        id: "btn-neon",
                        label: "Neón",
                        action: ()=>dispatch({
                                type: "TOGGLE_NEON"
                            })
                    }
                ].map((btn)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        id: btn.id,
                        type: "button",
                        onClick: btn.action,
                        className: "btn-minimal",
                        children: btn.label
                    }, btn.id, false, {
                        fileName: "[project]/components/AuthForm.tsx",
                        lineNumber: 586,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/AuthForm.tsx",
                lineNumber: 580,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/login/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RobotCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/RobotCanvas.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AuthForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AuthForm.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function LoginPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 bg-[#07000a] flex items-center justify-center z-[99999]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "loading-pulse font-[family-name:var(--font-jetbrains)] text-[9px] tracking-[0.35em] uppercase text-white/40",
                children: "Inicializando Núcleo Athernix..."
            }, void 0, false, {
                fileName: "[project]/app/login/page.tsx",
                lineNumber: 14,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/login/page.tsx",
            lineNumber: 13,
            columnNumber: 9
        }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LoginPageContent, {}, void 0, false, {
            fileName: "[project]/app/login/page.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/login/page.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
function LoginPageContent() {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
    const [robotState, setRobotState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        mode: initialMode,
        focusedInput: null,
        submitTrigger: 0,
        autoRotate: false,
        neonMode: true,
        neonActive: true,
        isGlitched: false
    });
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [loadProgress, setLoadProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setRobotState((prev)=>({
                ...prev,
                mode: initialMode
            }));
    }, [
        initialMode
    ]);
    const handleLoadComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        console.log("✅ Sincronizando núcleo local...");
        setTimeout(()=>setIsLoading(false), 300);
    }, []);
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((action)=>{
        setRobotState((prev)=>{
            switch(action.type){
                case "SET_MODE":
                    return {
                        ...prev,
                        mode: action.mode,
                        focusedInput: null,
                        isGlitched: false
                    };
                case "SET_FOCUS":
                    return {
                        ...prev,
                        focusedInput: action.focus,
                        isGlitched: false
                    };
                case "TRIGGER_SUBMIT":
                    return {
                        ...prev,
                        submitTrigger: prev.submitTrigger + 1
                    };
                case "TOGGLE_ROTATE":
                    return {
                        ...prev,
                        autoRotate: !prev.autoRotate,
                        isGlitched: false
                    };
                case "TOGGLE_LIGHT":
                    return {
                        ...prev,
                        neonMode: !prev.neonMode,
                        isGlitched: false
                    };
                case "TOGGLE_NEON":
                    return {
                        ...prev,
                        neonActive: !prev.neonActive,
                        isGlitched: false
                    };
                case "SET_GLITCH":
                    return {
                        ...prev,
                        isGlitched: action.glitch
                    };
            }
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "relative w-full h-screen overflow-hidden bg-[#08000a]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grain-overlay"
            }, void 0, false, {
                fileName: "[project]/app/login/page.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed inset-0 bg-[#07000a] flex flex-col justify-center items-center z-[99999] transition-opacity duration-600 ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: `loading-pulse font-[family-name:var(--font-jetbrains)] text-[9px] tracking-[0.35em] uppercase text-white/40`,
                    children: loadProgress < 100 ? `Inicializando Núcleo Athernix... ${Math.round(loadProgress)}%` : ""
                }, void 0, false, {
                    fileName: "[project]/app/login/page.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/login/page.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RobotCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RobotCanvas"], {
                robotState: robotState,
                onLoadComplete: handleLoadComplete,
                onProgress: setLoadProgress
            }, void 0, false, {
                fileName: "[project]/app/login/page.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AuthForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthForm"], {
                robotState: robotState,
                dispatch: dispatch,
                initialMode: initialMode
            }, void 0, false, {
                fileName: "[project]/app/login/page.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/login/page.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_0hy57.i._.js.map