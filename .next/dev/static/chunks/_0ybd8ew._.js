(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/modulos/ModulosAtmosphere.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModulosAtmosphere",
    ()=>ModulosAtmosphere
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
function ModulosAtmosphere() {
    _s();
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ModulosAtmosphere.useEffect": ()=>{
            const container = mountRef.current;
            if (!container) return;
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 0, 30);
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                antialias: false,
                alpha: true,
                powerPreference: 'high-performance'
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
            container.appendChild(renderer.domElement);
            // Soft dark nebula background
            const bg = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](200, 200), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0x08000a,
                transparent: true,
                opacity: 0.9
            }));
            bg.position.z = -50;
            scene.add(bg);
            const palette = [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0xff006e),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0xff6b00),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0xffd700)
            ];
            // Starfield (fewer stars for fluidity)
            const starCount = 500;
            const starGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const starPos = new Float32Array(starCount * 3);
            const starCol = new Float32Array(starCount * 3);
            for(let i = 0; i < starCount; i++){
                const r = 40 + Math.random() * 90;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(Math.random() * 2 - 1);
                starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                starPos[i * 3 + 2] = r * Math.cos(phi) - 30;
                const c = palette[Math.floor(Math.random() * palette.length)];
                starCol[i * 3] = c.r;
                starCol[i * 3 + 1] = c.g;
                starCol[i * 3 + 2] = c.b;
            }
            starGeo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](starPos, 3));
            starGeo.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](starCol, 3));
            const starMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointsMaterial"]({
                size: 0.14,
                vertexColors: true,
                transparent: true,
                opacity: 0.65,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                depthWrite: false
            });
            const stars = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](starGeo, starMat);
            scene.add(stars);
            // Soft orbs (fewer)
            const orbs = [];
            const orbGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](1, 24, 24);
            for(let i = 0; i < 4; i++){
                const c = palette[i % palette.length];
                const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                    color: c,
                    transparent: true,
                    opacity: 0.05,
                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"]
                });
                const orb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](orbGeo, mat);
                const s = 4 + Math.random() * 10;
                orb.scale.set(s, s, s);
                orb.position.set((Math.random() - 0.5) * 90, (Math.random() - 0.5) * 70, -30 - Math.random() * 50);
                scene.add(orb);
                orbs.push(orb);
            }
            // Lightweight nebula dust ring
            const dustCount = 300;
            const dustGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const dustPos = new Float32Array(dustCount * 3);
            const dustCol = new Float32Array(dustCount * 3);
            for(let i = 0; i < dustCount; i++){
                const a = Math.random() * Math.PI * 2;
                const r = 50 + Math.random() * 60;
                dustPos[i * 3] = Math.cos(a) * r;
                dustPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
                dustPos[i * 3 + 2] = Math.sin(a) * r - 30;
                const c = palette[Math.floor(Math.random() * palette.length)];
                dustCol[i * 3] = c.r;
                dustCol[i * 3 + 1] = c.g;
                dustCol[i * 3 + 2] = c.b;
            }
            dustGeo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](dustPos, 3));
            dustGeo.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](dustCol, 3));
            const dustMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointsMaterial"]({
                size: 0.25,
                vertexColors: true,
                transparent: true,
                opacity: 0.35,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                depthWrite: false
            });
            const dust = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](dustGeo, dustMat);
            scene.add(dust);
            // Mouse parallax
            let mx = 0, my = 0, targetX = 0, targetY = 0;
            const onMove = {
                "ModulosAtmosphere.useEffect.onMove": (e)=>{
                    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
                    targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
                }
            }["ModulosAtmosphere.useEffect.onMove"];
            window.addEventListener('mousemove', onMove);
            // Scroll parallax
            let scrollProgress = 0;
            const onScroll = {
                "ModulosAtmosphere.useEffect.onScroll": ()=>{
                    scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
                }
            }["ModulosAtmosphere.useEffect.onScroll"];
            window.addEventListener('scroll', onScroll);
            // Resize
            const onResize = {
                "ModulosAtmosphere.useEffect.onResize": ()=>{
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
                }
            }["ModulosAtmosphere.useEffect.onResize"];
            window.addEventListener('resize', onResize);
            // Animation
            const clock = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Clock"]();
            let raf = 0;
            const animate = {
                "ModulosAtmosphere.useEffect.animate": ()=>{
                    raf = requestAnimationFrame(animate);
                    const t = clock.getElapsedTime();
                    const k = prefersReduced ? 0.2 : 1;
                    mx += (targetX - mx) * 0.04;
                    my += (targetY - my) * 0.04;
                    stars.rotation.y = t * 0.02 * k + mx * 0.1 + scrollProgress * Math.PI;
                    stars.rotation.x = my * 0.05 + scrollProgress * 0.2;
                    dust.rotation.y = stars.rotation.y * 0.6;
                    dust.rotation.x = stars.rotation.x * 0.4;
                    orbs.forEach({
                        "ModulosAtmosphere.useEffect.animate": (orb, i)=>{
                            orb.position.y += Math.sin(t * 0.3 * k + i) * 0.01;
                            orb.position.x += Math.cos(t * 0.2 * k + i) * 0.01;
                        }
                    }["ModulosAtmosphere.useEffect.animate"]);
                    camera.position.x += (mx * 6 - camera.position.x) * 0.03;
                    camera.position.y += (my * 4 - camera.position.y) * 0.03;
                    camera.lookAt(0, 0, -10);
                    renderer.render(scene, camera);
                }
            }["ModulosAtmosphere.useEffect.animate"];
            animate();
            return ({
                "ModulosAtmosphere.useEffect": ()=>{
                    window.removeEventListener('resize', onResize);
                    window.removeEventListener('mousemove', onMove);
                    window.removeEventListener('scroll', onScroll);
                    cancelAnimationFrame(raf);
                    if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
                    renderer.dispose();
                    starGeo.dispose();
                    starMat.dispose();
                    dustGeo.dispose();
                    dustMat.dispose();
                    orbGeo.dispose();
                    orbs.forEach({
                        "ModulosAtmosphere.useEffect": (o)=>{
                            if (o.material instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Material"]) o.material.dispose();
                        }
                    }["ModulosAtmosphere.useEffect"]);
                }
            })["ModulosAtmosphere.useEffect"];
        }
    }["ModulosAtmosphere.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: mountRef,
        className: "fixed inset-0 z-0 pointer-events-none",
        style: {
            background: 'radial-gradient(ellipse at 50% 50%, #0a000c 0%, #030005 100%)'
        }
    }, void 0, false, {
        fileName: "[project]/components/modulos/ModulosAtmosphere.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
_s(ModulosAtmosphere, "V9/qkEdV8GfsDZk7lMTA1T8g5Ps=");
_c = ModulosAtmosphere;
var _c;
__turbopack_context__.k.register(_c, "ModulosAtmosphere");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/modulos/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModulosPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/SplitText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modulos$2f$ModulosAtmosphere$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modulos/ModulosAtmosphere.tsx [app-client] (ecmascript)");
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
;
;
function tiltMove(e, rotateX = 6, rotateY = 8) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        rotateX: -y * rotateX,
        rotateY: x * rotateY,
        transformPerspective: 1000,
        duration: 0.35,
        ease: 'power2.out',
        transformOrigin: 'center center'
    });
}
function tiltReset(e) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
    });
}
function magneticMove(e, strength = 0.4) {
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
        ease: 'elastic.out(1, 0.4)'
    });
}
function ModulosPage() {
    _s();
    const canvasRef1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const progressRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mainRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ModulosPage.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const canvas1 = canvasRef1.current;
            const canvas2 = canvasRef2.current;
            const canvas3 = canvasRef3.current;
            const scenes = [];
            // --- Fábrica de escena de partículas para cada canvas ---
            function buildScene(canvas, config) {
                if (!canvas) return null;
                const W = canvas.offsetWidth || 520;
                const H = canvas.offsetHeight || 520;
                const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                    canvas,
                    antialias: false,
                    alpha: true
                });
                renderer.setSize(W, H);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                renderer.setClearColor(0x000000, 0);
                const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
                const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](60, W / H, 0.1, 200);
                camera.position.set(0, 0, config.camZ || 8);
                // --- Partículas ---
                const N = config.count || 25000;
                const pos = new Float32Array(N * 3);
                const col = new Float32Array(N * 3);
                const seed = new Float32Array(N * 3);
                const c1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](config.colA);
                const c2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](config.colB);
                const c3 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](config.colC);
                for(let i = 0; i < N; i++){
                    config.place(i, pos, N);
                    // color según índice
                    const t = i / N;
                    let r, g, b;
                    if (t < 0.5) {
                        const mix = t * 2;
                        r = c1.r + (c2.r - c1.r) * mix;
                        g = c1.g + (c2.g - c1.g) * mix;
                        b = c1.b + (c2.b - c1.b) * mix;
                    } else {
                        const mix = (t - 0.5) * 2;
                        r = c2.r + (c3.r - c2.r) * mix;
                        g = c2.g + (c3.g - c2.g) * mix;
                        b = c2.b + (c3.b - c2.b) * mix;
                    }
                    col[i * 3] = r;
                    col[i * 3 + 1] = g;
                    col[i * 3 + 2] = b;
                    seed[i * 3] = Math.random() * 100;
                    seed[i * 3 + 1] = Math.random() * 100;
                    seed[i * 3 + 2] = Math.random() * Math.PI * 2;
                }
                const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
                geo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](pos.slice(), 3));
                geo.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](col, 3));
                const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointsMaterial"]({
                    size: config.size || 0.04,
                    vertexColors: true,
                    transparent: true,
                    opacity: config.opacity || 0.9,
                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                    depthWrite: false,
                    sizeAttenuation: true
                });
                const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](geo, mat);
                const group = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                group.add(mesh);
                scene.add(group);
                const base = pos.slice(); // guardar posición base
                // --- Mouse hover ---
                let mx = 0, my = 0;
                const onMouseMove = {
                    "ModulosPage.useEffect.buildScene.onMouseMove": (e)=>{
                        const r = canvas.getBoundingClientRect();
                        mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
                        my = -((e.clientY - r.top) / r.height - 0.5) * 2;
                    }
                }["ModulosPage.useEffect.buildScene.onMouseMove"];
                canvas.addEventListener('mousemove', onMouseMove);
                // --- Animate ---
                const timer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Clock"]();
                let animationFrameId;
                function animate() {
                    animationFrameId = requestAnimationFrame(animate);
                    const t = timer.getElapsedTime();
                    const arr = geo.attributes.position.array;
                    if (config.animate) {
                        config.animate(t, arr, base, seed, N);
                    }
                    geo.attributes.position.needsUpdate = true;
                    // Rotación suave + reacción al mouse
                    group.rotation.y += 0.003;
                    group.rotation.x += 0.001;
                    group.rotation.y += mx * 0.002;
                    group.rotation.x += my * 0.001;
                    renderer.render(scene, camera);
                }
                animate();
                // Resize
                const resizeObserver = new ResizeObserver({
                    "ModulosPage.useEffect.buildScene": ()=>{
                        const w = canvas.offsetWidth;
                        const h = canvas.offsetHeight;
                        renderer.setSize(w, h);
                        camera.aspect = w / h;
                        camera.updateProjectionMatrix();
                    }
                }["ModulosPage.useEffect.buildScene"]);
                resizeObserver.observe(canvas);
                return {
                    cleanup: ({
                        "ModulosPage.useEffect.buildScene": ()=>{
                            cancelAnimationFrame(animationFrameId);
                            canvas.removeEventListener('mousemove', onMouseMove);
                            resizeObserver.disconnect();
                            geo.dispose();
                            mat.dispose();
                            renderer.dispose();
                        }
                    })["ModulosPage.useEffect.buildScene"]
                };
            }
            // --- c1: HISTORIA VIVA (Pirámide Maya) ---
            const s1 = buildScene(canvas1, {
                count: 9000,
                camZ: 9,
                size: 0.055,
                opacity: 0.9,
                colA: '#FF006E',
                colB: '#FF6B00',
                colC: '#FFD700',
                place (i, pos, N) {
                    const t = i / N;
                    let x, y, z;
                    if (t < 0.55) {
                        // Pirámide escalonada
                        const level = Math.floor(Math.random() * 6);
                        const frac = level / 6;
                        const baseWidth = 3.2 * (1 - frac * 0.7);
                        x = (Math.random() - 0.5) * baseWidth * 2;
                        y = -2.2 + frac * 4.0 + (Math.random() - 0.5) * 0.12;
                        z = (Math.random() - 0.5) * baseWidth * 1.4;
                    } else if (t < 0.78) {
                        // Arco encima de la pirámide
                        const ang = Math.random() * Math.PI;
                        const r = 1.5 + (Math.random() - 0.5) * 0.22;
                        x = Math.cos(ang) * r;
                        y = 1.8 + Math.sin(ang) * r;
                        z = (Math.random() - 0.5) * 0.5;
                    } else {
                        // Polvo / fragmentos flotantes
                        const r = 2 + Math.random() * 2.5;
                        const ang = Math.random() * Math.PI * 2;
                        const phi = Math.acos(2 * Math.random() - 1);
                        x = r * Math.sin(phi) * Math.cos(ang);
                        y = r * Math.sin(phi) * Math.sin(ang) * 0.6;
                        z = r * Math.cos(phi) * 0.6;
                    }
                    pos[i * 3] = x;
                    pos[i * 3 + 1] = y;
                    pos[i * 3 + 2] = z;
                },
                animate (t, arr, base, seed, N) {
                    for(let i = 0; i < N; i++){
                        const s0 = seed[i * 3], s1 = seed[i * 3 + 1];
                        arr[i * 3] = base[i * 3] + Math.sin(t * 0.5 + s0) * 0.04;
                        arr[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * 0.4 + s1) * 0.04;
                        arr[i * 3 + 2] = base[i * 3 + 2] + Math.sin(t * 0.6 + s0) * 0.025;
                    }
                }
            });
            if (s1) scenes.push(s1);
            // --- c2: SVIRTUAL TOURS (Globo Terrestre) ---
            const s2 = buildScene(canvas2, {
                count: 9000,
                camZ: 8.5,
                size: 0.05,
                opacity: 0.88,
                colA: '#FF6B00',
                colB: '#FFD700',
                colC: '#FF006E',
                place (i, pos, N) {
                    const t = i / N;
                    let x, y, z;
                    if (t < 0.65) {
                        // Esfera tipo globo
                        const r = 2.8 + (Math.random() - 0.5) * 0.18;
                        const ang = Math.random() * Math.PI * 2;
                        const phi = Math.acos(2 * Math.random() - 1);
                        x = r * Math.sin(phi) * Math.cos(ang);
                        y = r * Math.sin(phi) * Math.sin(ang);
                        z = r * Math.cos(phi);
                    } else if (t < 0.82) {
                        // Meridianos / líneas de latitud
                        const lat = (Math.random() - 0.5) * Math.PI;
                        const lon = Math.random() * Math.PI * 2;
                        const r = 2.82;
                        x = r * Math.cos(lat) * Math.cos(lon);
                        y = r * Math.sin(lat);
                        z = r * Math.cos(lat) * Math.sin(lon);
                    } else {
                        // Estela / partículas orbitando
                        const orb = 3.6 + Math.random() * 0.8;
                        const ang = Math.random() * Math.PI * 2;
                        x = Math.cos(ang) * orb;
                        y = (Math.random() - 0.5) * 1.2;
                        z = Math.sin(ang) * orb;
                    }
                    pos[i * 3] = x;
                    pos[i * 3 + 1] = y;
                    pos[i * 3 + 2] = z;
                },
                animate (t, arr, base, seed, N) {
                    for(let i = 0; i < N; i++){
                        const s0 = seed[i * 3], s1 = seed[i * 3 + 1], s2 = seed[i * 3 + 2];
                        const r2 = base[i * 3] * base[i * 3] + base[i * 3 + 2] * base[i * 3 + 2];
                        if (r2 > 12) {
                            const ang = Math.atan2(base[i * 3 + 2], base[i * 3]) + t * 0.18;
                            const r = Math.sqrt(r2);
                            arr[i * 3] = Math.cos(ang) * r;
                            arr[i * 3 + 2] = Math.sin(ang) * r;
                            arr[i * 3 + 1] = base[i * 3 + 1] + Math.sin(t * 0.6 + s1) * 0.05;
                        } else {
                            arr[i * 3] = base[i * 3] + Math.sin(t * 0.4 + s0) * 0.03;
                            arr[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * 0.35 + s1) * 0.03;
                            arr[i * 3 + 2] = base[i * 3 + 2] + Math.sin(t * 0.5 + s2) * 0.02;
                        }
                    }
                }
            });
            if (s2) scenes.push(s2);
            // --- c3: MENTE LIBRE (Cerebro) ---
            const s3 = buildScene(canvas3, {
                count: 10000,
                camZ: 9,
                size: 0.048,
                opacity: 0.86,
                colA: '#FFD700',
                colB: '#FF006E',
                colC: '#FF6B00',
                place (i, pos, N) {
                    const t = i / N;
                    let x, y, z;
                    if (t < 0.38) {
                        // Hemisferio izquierdo cerebro
                        const th = Math.random() * Math.PI * 2;
                        const ph = Math.acos(2 * Math.random() - 1);
                        const r = 1.6 + Math.sin(th * 5) * 0.28;
                        x = -1.1 + r * Math.sin(ph) * Math.cos(th) * 0.75;
                        y = r * Math.sin(ph) * Math.sin(th) * 0.62;
                        z = r * Math.cos(ph) * 0.82;
                    } else if (t < 0.76) {
                        // Hemisferio derecho
                        const th = Math.random() * Math.PI * 2;
                        const ph = Math.acos(2 * Math.random() - 1);
                        const r = 1.6 + Math.sin(th * 5) * 0.28;
                        x = 1.1 - r * Math.sin(ph) * Math.cos(th) * 0.75;
                        y = r * Math.sin(ph) * Math.sin(th) * 0.62;
                        z = r * Math.cos(ph) * 0.82;
                    } else {
                        // Espiral de ondas terapéuticas
                        const turns = 6;
                        const u = Math.random();
                        const ang = u * Math.PI * 2 * turns;
                        const r = 2.2 + u * 1.2;
                        const spread = (Math.random() - 0.5) * 0.3;
                        x = Math.cos(ang) * (r + spread);
                        y = (u - 0.5) * 4.5 + (Math.random() - 0.5) * 0.2;
                        z = Math.sin(ang) * (r + spread);
                    }
                    pos[i * 3] = x;
                    pos[i * 3 + 1] = y;
                    pos[i * 3 + 2] = z;
                },
                animate (t, arr, base, seed, N) {
                    for(let i = 0; i < N; i++){
                        const s0 = seed[i * 3], s1 = seed[i * 3 + 1], s2 = seed[i * 3 + 2];
                        const frac = i / N;
                        if (frac > 0.76) {
                            // La espiral pulsa
                            const pulse = 1 + Math.sin(t * 1.2 + s2) * 0.06;
                            arr[i * 3] = base[i * 3] * pulse;
                            arr[i * 3 + 1] = base[i * 3 + 1] + Math.sin(t * 0.5 + s0) * 0.08;
                            arr[i * 3 + 2] = base[i * 3 + 2] * pulse;
                        } else {
                            // Cerebro respira
                            const breathe = 1 + Math.sin(t * 0.8) * 0.025;
                            arr[i * 3] = base[i * 3] * breathe + Math.sin(t * 0.5 + s0) * 0.03;
                            arr[i * 3 + 1] = base[i * 3 + 1] * breathe + Math.cos(t * 0.4 + s1) * 0.03;
                            arr[i * 3 + 2] = base[i * 3 + 2] * breathe + Math.sin(t * 0.6 + s2) * 0.02;
                        }
                    }
                }
            });
            if (s3) scenes.push(s3);
            return ({
                "ModulosPage.useEffect": ()=>{
                    scenes.forEach({
                        "ModulosPage.useEffect": (s)=>s.cleanup()
                    }["ModulosPage.useEffect"]);
                }
            })["ModulosPage.useEffect"];
        }
    }["ModulosPage.useEffect"], []);
    // ── 3D tilt, scroll progress, reveal animations ────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ModulosPage.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
            // Scroll progress
            const progress = progressRef.current;
            if (progress) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(progress, {
                    scaleX: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: mainRef.current,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.3
                    }
                });
            }
            // Hero SplitText + reveal
            const heroTitle = document.querySelector('.hero-intro h1');
            if (heroTitle && typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SplitText"] !== 'undefined') {
                const split = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$SplitText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SplitText"](heroTitle, {
                    type: 'chars',
                    charsClass: 'hero-char'
                });
                // Fix gradient text on ATHERNIX chars
                heroTitle.querySelectorAll('.line2 .hero-char').forEach({
                    "ModulosPage.useEffect": (char)=>{
                        char.style.background = 'linear-gradient(135deg, #FF006E 0%, #FFD700 50%, #FF6B00 100%)';
                        char.style.webkitBackgroundClip = 'text';
                        char.style.backgroundClip = 'text';
                        char.style.webkitTextFillColor = 'transparent';
                        char.style.filter = 'drop-shadow(0 0 60px rgba(255,107,0,.3))';
                    }
                }["ModulosPage.useEffect"]);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(split.chars, {
                    y: 80,
                    opacity: 0,
                    rotateX: -90
                }, {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.03,
                    ease: 'back.out(1.7)',
                    delay: 0.3
                });
            }
            const hero = document.querySelector('.hero-intro');
            if (hero) {
                const lines = hero.querySelectorAll('.eyebrow, .sub, .scroll-down');
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(lines, {
                    y: 40,
                    opacity: 0,
                    filter: 'blur(8px)'
                }, {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.9,
                    stagger: 0.12,
                    ease: 'power3.out',
                    delay: 0.6
                });
            }
            // Modules reveal with 3D card-rise
            const modules = document.querySelectorAll('.module');
            modules.forEach({
                "ModulosPage.useEffect": (mod)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(mod, {
                        y: 80,
                        opacity: 0,
                        rotateX: 12
                    }, {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 0.9,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: mod,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                    mod.addEventListener('mousemove', tiltMove);
                    mod.addEventListener('mouseleave', tiltReset);
                }
            }["ModulosPage.useEffect"]);
            // Canvas wraps tilt
            const wraps = document.querySelectorAll('.module-canvas-wrap');
            wraps.forEach({
                "ModulosPage.useEffect": (wrap)=>{
                    wrap.addEventListener('mousemove', {
                        "ModulosPage.useEffect": (e)=>tiltMove(e, 4, 6)
                    }["ModulosPage.useEffect"]);
                    wrap.addEventListener('mouseleave', tiltReset);
                }
            }["ModulosPage.useEffect"]);
            // Launch buttons combined magnetic + tilt (single GSAP transform)
            const btns = document.querySelectorAll('.mod-launch-btn');
            btns.forEach({
                "ModulosPage.useEffect": (btn)=>{
                    const onBtnMove = {
                        "ModulosPage.useEffect.onBtnMove": (e)=>{
                            const rect = e.currentTarget.getBoundingClientRect();
                            const rx = (e.clientX - rect.left) / rect.width - 0.5;
                            const ry = (e.clientY - rect.top) / rect.height - 0.5;
                            const mx = (e.clientX - rect.left - rect.width / 2) * 0.5;
                            const my = (e.clientY - rect.top - rect.height / 2) * 0.5;
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
                                x: mx,
                                y: my,
                                rotateX: -ry * 8,
                                rotateY: rx * 10,
                                transformPerspective: 1000,
                                duration: 0.25,
                                ease: 'power2.out'
                            });
                        }
                    }["ModulosPage.useEffect.onBtnMove"];
                    const onBtnLeave = {
                        "ModulosPage.useEffect.onBtnLeave": (e)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(e.currentTarget, {
                                x: 0,
                                y: 0,
                                rotateX: 0,
                                rotateY: 0,
                                duration: 0.5,
                                ease: 'elastic.out(1, 0.4)'
                            });
                        }
                    }["ModulosPage.useEffect.onBtnLeave"];
                    btn.addEventListener('mousemove', onBtnMove);
                    btn.addEventListener('mouseleave', onBtnLeave);
                }
            }["ModulosPage.useEffect"]);
            // Badges hover glow pulse
            const badges = document.querySelectorAll('.mod-badge');
            badges.forEach({
                "ModulosPage.useEffect": (badge)=>{
                    badge.addEventListener('mouseenter', {
                        "ModulosPage.useEffect": ()=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(badge, {
                                scale: 1.05,
                                boxShadow: '0 0 24px rgba(255,107,0,.4)',
                                duration: 0.3
                            });
                        }
                    }["ModulosPage.useEffect"]);
                    badge.addEventListener('mouseleave', {
                        "ModulosPage.useEffect": ()=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(badge, {
                                scale: 1,
                                boxShadow: 'none',
                                duration: 0.4
                            });
                        }
                    }["ModulosPage.useEffect"]);
                }
            }["ModulosPage.useEffect"]);
            // Detail rows hover lift
            const rows = document.querySelectorAll('.detail-row');
            rows.forEach({
                "ModulosPage.useEffect": (row)=>{
                    row.addEventListener('mouseenter', {
                        "ModulosPage.useEffect": ()=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(row, {
                                x: 12,
                                color: 'rgba(255,255,255,.85)',
                                duration: 0.25
                            });
                        }
                    }["ModulosPage.useEffect"]);
                    row.addEventListener('mouseleave', {
                        "ModulosPage.useEffect": ()=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(row, {
                                x: 0,
                                color: 'rgba(255,255,255,.5)',
                                duration: 0.3
                            });
                        }
                    }["ModulosPage.useEffect"]);
                }
            }["ModulosPage.useEffect"]);
            // Canvas wraps scale on scroll
            wraps.forEach({
                "ModulosPage.useEffect": (wrap)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(wrap, {
                        scale: 0.92,
                        opacity: 0
                    }, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: wrap,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                }
            }["ModulosPage.useEffect"]);
            // Module text internal stagger
            modules.forEach({
                "ModulosPage.useEffect": (mod)=>{
                    const parts = mod.querySelectorAll('.mod-num, .mod-tag, .mod-title, .mod-desc, .mod-badge, .mod-launch-btn');
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(parts, {
                        y: 30,
                        opacity: 0
                    }, {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: mod,
                            start: 'top 70%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                }
            }["ModulosPage.useEffect"]);
            // Grad lines scaleX on scroll
            const gradLines = document.querySelectorAll('.grad-line');
            gradLines.forEach({
                "ModulosPage.useEffect": (line)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(line, {
                        scaleX: 0
                    }, {
                        scaleX: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: line,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                }
            }["ModulosPage.useEffect"]);
            // Detail rows stagger reveal
            const details = document.querySelectorAll('.mod-detail');
            details.forEach({
                "ModulosPage.useEffect": (detail)=>{
                    const rows = detail.querySelectorAll('.detail-row');
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(rows, {
                        x: -20,
                        opacity: 0
                    }, {
                        x: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: detail,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                }
            }["ModulosPage.useEffect"]);
            // Marquee speed on scroll
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
                trigger: mainRef.current,
                start: 'top top',
                end: 'bottom bottom',
                onUpdate: {
                    "ModulosPage.useEffect": (self)=>{
                        const mq = document.querySelectorAll('.mq-t');
                        mq.forEach({
                            "ModulosPage.useEffect": (m)=>{
                                m.style.animationDuration = `${30 - self.progress * 20}s`;
                            }
                        }["ModulosPage.useEffect"]);
                    }
                }["ModulosPage.useEffect"]
            });
            return ({
                "ModulosPage.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].getAll().forEach({
                        "ModulosPage.useEffect": (st)=>st.kill()
                    }["ModulosPage.useEffect"]);
                    modules.forEach({
                        "ModulosPage.useEffect": (mod)=>{
                            mod.removeEventListener('mousemove', tiltMove);
                            mod.removeEventListener('mouseleave', tiltReset);
                        }
                    }["ModulosPage.useEffect"]);
                    wraps.forEach({
                        "ModulosPage.useEffect": (wrap)=>{
                            wrap.removeEventListener('mousemove', tiltMove);
                            wrap.removeEventListener('mouseleave', tiltReset);
                        }
                    }["ModulosPage.useEffect"]);
                    btns.forEach({
                        "ModulosPage.useEffect": (btn)=>{
                            btn.removeEventListener('mousemove', tiltMove);
                            btn.removeEventListener('mouseleave', tiltReset);
                        }
                    }["ModulosPage.useEffect"]);
                    badges.forEach({
                        "ModulosPage.useEffect": (b)=>{
                            b.removeEventListener('mouseenter', null);
                            b.removeEventListener('mouseleave', null);
                        }
                    }["ModulosPage.useEffect"]);
                    rows.forEach({
                        "ModulosPage.useEffect": (r)=>{
                            r.removeEventListener('mouseenter', null);
                            r.removeEventListener('mouseleave', null);
                        }
                    }["ModulosPage.useEffect"]);
                }
            })["ModulosPage.useEffect"];
        }
    }["ModulosPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modulos$2f$ModulosAtmosphere$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModulosAtmosphere"], {}, void 0, false, {
                fileName: "[project]/app/modulos/page.tsx",
                lineNumber: 537,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mainRef,
                style: {
                    paddingTop: '80px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: progressRef,
                        className: "mod-progress"
                    }, void 0, false, {
                        fileName: "[project]/app/modulos/page.tsx",
                        lineNumber: 539,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "hero-intro",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: "[ PLATAFORMA_XR // EL_SALVADOR // 2026 ]"
                            }, void 0, false, {
                                fileName: "[project]/app/modulos/page.tsx",
                                lineNumber: 542,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontFamily: "'Bebas Neue', 'Plus Jakarta Sans', sans-serif"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "line1",
                                        children: "MÓDULOS"
                                    }, void 0, false, {
                                        fileName: "[project]/app/modulos/page.tsx",
                                        lineNumber: 544,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "line2",
                                        children: "ATHERNIX"
                                    }, void 0, false, {
                                        fileName: "[project]/app/modulos/page.tsx",
                                        lineNumber: 545,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/modulos/page.tsx",
                                lineNumber: 543,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "sub",
                                children: "TRES EJES · UNA PLATAFORMA · IMPACTO REAL"
                            }, void 0, false, {
                                fileName: "[project]/app/modulos/page.tsx",
                                lineNumber: 547,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "scroll-down",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "s-line"
                                    }, void 0, false, {
                                        fileName: "[project]/app/modulos/page.tsx",
                                        lineNumber: 549,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "s-lbl",
                                        children: "EXPLORAR"
                                    }, void 0, false, {
                                        fileName: "[project]/app/modulos/page.tsx",
                                        lineNumber: 550,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/modulos/page.tsx",
                                lineNumber: 548,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/modulos/page.tsx",
                        lineNumber: 541,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grad-line"
                    }, void 0, false, {
                        fileName: "[project]/app/modulos/page.tsx",
                        lineNumber: 554,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mq",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mq-t",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mqi",
                                    children: [
                                        "HISTORIA VIVA VR ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 559,
                                            columnNumber: 50
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 559,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mqi",
                                    children: [
                                        "SVIRTUAL TOURS ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 560,
                                            columnNumber: 48
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 560,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mqi",
                                    children: [
                                        "MENTELIBRE VR ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 561,
                                            columnNumber: 47
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 561,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mqi",
                                    children: [
                                        "EJE CULTURAL ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 562,
                                            columnNumber: 46
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 562,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mqi",
                                    children: [
                                        "EJE TURISMO ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 563,
                                            columnNumber: 45
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 563,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mqi",
                                    children: [
                                        "EJE SALUD MENTAL ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 564,
                                            columnNumber: 50
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 564,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mqi",
                                    children: [
                                        "ATHERNIX XR ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 565,
                                            columnNumber: 45
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 565,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mqi",
                                    children: [
                                        "EL SALVADOR TECH ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 566,
                                            columnNumber: 50
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 566,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/modulos/page.tsx",
                            lineNumber: 558,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/modulos/page.tsx",
                        lineNumber: 557,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "sec-historia",
                        id: "historia",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "module",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "module-canvas-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "canvas-glow",
                                            style: {
                                                background: 'radial-gradient(var(--pink),transparent 70%)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 574,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                            id: "c1",
                                            ref: canvasRef1
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 575,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 573,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "module-text",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mod-num mono",
                                            children: "01 / 03"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 578,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mod-tag mono",
                                            style: {
                                                color: 'var(--pink)'
                                            },
                                            children: "EJE_CULTURAL"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 579,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mod-title",
                                            style: {
                                                fontFamily: "'Bebas Neue', sans-serif"
                                            },
                                            children: [
                                                "HISTORIA",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 580,
                                                    columnNumber: 98
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "grad-text",
                                                    children: "VIVA VR"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 580,
                                                    columnNumber: 104
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 580,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mod-desc",
                                            children: "Módulo educativo inmersivo que revitaliza la enseñanza de la historia y el patrimonio cultural salvadoreño. A través de modelos digitales realistas y mecánicas de gamificación, convierte el aprendizaje pasivo en vivencia activa."
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 581,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mod-badge",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bdot",
                                                    style: {
                                                        background: 'var(--pink)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 583,
                                                    columnNumber: 15
                                                }, this),
                                                " EN_DESARROLLO"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 582,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 585,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/modulos/history",
                                            className: "mod-launch-btn",
                                            children: [
                                                "INICIAR JUEGO ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "btn-arrow",
                                                    children: "→"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 84
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 586,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mod-detail",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detail-row",
                                                    children: "Reconstrucciones históricas fotogramétricas de alta fidelidad"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 588,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detail-row",
                                                    children: "Gamificación pedagógica para retención profunda del conocimiento"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 589,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detail-row",
                                                    children: "Herramienta de ampliación docente, no sustitución"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 590,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detail-row",
                                                    children: "Aplicable dentro y fuera del aula · acceso universal"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 591,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 587,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 577,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/modulos/page.tsx",
                            lineNumber: 572,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/modulos/page.tsx",
                        lineNumber: 571,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grad-line"
                    }, void 0, false, {
                        fileName: "[project]/app/modulos/page.tsx",
                        lineNumber: 597,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "sec-svirtual",
                        id: "svirtual",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "module reverse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "module-canvas-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "canvas-glow",
                                            style: {
                                                background: 'radial-gradient(var(--orange),transparent 70%)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 603,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                            id: "c2",
                                            ref: canvasRef2
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 604,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 602,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "module-text",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mod-num mono",
                                            children: "02 / 03"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 607,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mod-tag mono",
                                            style: {
                                                color: 'var(--orange)'
                                            },
                                            children: "EJE_TURISMO"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 608,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mod-title",
                                            style: {
                                                fontFamily: "'Bebas Neue', sans-serif"
                                            },
                                            children: [
                                                "SVIRTUAL",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 609,
                                                    columnNumber: 98
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "grad-text",
                                                    children: "TOURS"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 609,
                                                    columnNumber: 104
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 609,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mod-desc",
                                            children: "Dinamiza la economía cultural de El Salvador mediante turismo digital. Recorridos virtuales guiados por inteligencia artificial que posicionan el patrimonio natural y cultural del país como destino accesible desde cualquier parte del mundo."
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 610,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mod-badge",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bdot",
                                                    style: {
                                                        background: 'var(--yellow)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 612,
                                                    columnNumber: 15
                                                }, this),
                                                " BETA_ACTIVA"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 611,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 614,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/modulos/tours",
                                            className: "mod-launch-btn",
                                            children: [
                                                "INICIAR JUEGO ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "btn-arrow",
                                                    children: "→"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 615,
                                                    columnNumber: 82
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 615,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mod-detail",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detail-row",
                                                    children: "Guías IA en tiempo real · multilingüe · adaptativo"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 617,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detail-row",
                                                    children: "Elimina barreras físicas y logísticas del turismo convencional"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 618,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detail-row",
                                                    children: "Genera visibilidad y potencial económico internacional"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 619,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detail-row",
                                                    children: "Canal de descubrimiento y promoción cultural global"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 620,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 616,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 606,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/modulos/page.tsx",
                            lineNumber: 601,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/modulos/page.tsx",
                        lineNumber: 600,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grad-line"
                    }, void 0, false, {
                        fileName: "[project]/app/modulos/page.tsx",
                        lineNumber: 626,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "sec-mente",
                        id: "mente",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "module",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "module-canvas-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "canvas-glow",
                                            style: {
                                                background: 'radial-gradient(var(--yellow),transparent 70%)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 632,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                            id: "c3",
                                            ref: canvasRef3
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 633,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 631,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "module-text",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mod-num mono",
                                            children: "03 / 03"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 636,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mod-tag mono",
                                            style: {
                                                color: 'var(--yellow)'
                                            },
                                            children: "EJE_SALUD_MENTAL"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 637,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mod-title",
                                            style: {
                                                fontFamily: "'Bebas Neue', sans-serif"
                                            },
                                            children: [
                                                "MENTE",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "grad-text",
                                                    children: "LIBRE"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 638,
                                                    columnNumber: 95
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 638,
                                                    columnNumber: 135
                                                }, this),
                                                "VR"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 638,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mod-desc",
                                            children: "Entornos virtuales controlados y adaptativos para el apoyo terapéutico de ansiedad, fobias y estrés. Respaldado por terapia de exposición gradual en simulación. Democratiza el bienestar psicológico en contextos de acceso limitado."
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 639,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mod-badge",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bdot",
                                                    style: {
                                                        background: 'var(--pink)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 641,
                                                    columnNumber: 15
                                                }, this),
                                                " LIVE"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 640,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 643,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/modulos/brain",
                                            className: "mod-launch-btn",
                                            children: [
                                                "INICIAR JUEGO ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "btn-arrow",
                                                    children: "→"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 644,
                                                    columnNumber: 82
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 644,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mod-detail",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detail-row",
                                                    children: "Terapia de exposición gradual en entornos simulados seguros"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 646,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detail-row",
                                                    children: "Biofeedback en tiempo real · sensores hápticos adaptativos"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 647,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detail-row",
                                                    children: "Enfoque clínico validado · 95% reducción de síntomas"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 648,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "detail-row",
                                                    children: "Democratización del bienestar ante acceso limitado a especialistas"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modulos/page.tsx",
                                                    lineNumber: 649,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 645,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 635,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/modulos/page.tsx",
                            lineNumber: 630,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/modulos/page.tsx",
                        lineNumber: 629,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grad-line"
                    }, void 0, false, {
                        fileName: "[project]/app/modulos/page.tsx",
                        lineNumber: 655,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mq",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mq-t rev",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mqi",
                                    style: {
                                        color: 'rgba(255,107,0,.36)'
                                    },
                                    children: [
                                        "UNITY ENGINE ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "◈"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 660,
                                            columnNumber: 87
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 660,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mqi",
                                    style: {
                                        color: 'rgba(255,107,0,.36)'
                                    },
                                    children: [
                                        "META QUEST PRO ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "◈"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 661,
                                            columnNumber: 89
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 661,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mqi",
                                    style: {
                                        color: 'rgba(255,107,0,.36)'
                                    },
                                    children: [
                                        "UNREAL ENGINE 5 ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "◈"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 662,
                                            columnNumber: 90
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 662,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mqi",
                                    style: {
                                        color: 'rgba(255,107,0,.36)'
                                    },
                                    children: [
                                        "PYTHON AI ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "◈"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 663,
                                            columnNumber: 84
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 663,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mqi",
                                    style: {
                                        color: 'rgba(255,107,0,.36)'
                                    },
                                    children: [
                                        "WEBXR ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "◈"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 664,
                                            columnNumber: 80
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 664,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mqi",
                                    style: {
                                        color: 'rgba(255,107,0,.36)'
                                    },
                                    children: [
                                        "HAPTIC FEEDBACK ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "◈"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 665,
                                            columnNumber: 90
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 665,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mqi",
                                    style: {
                                        color: 'rgba(255,107,0,.36)'
                                    },
                                    children: [
                                        "NEURAL NETWORKS ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "◈"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modulos/page.tsx",
                                            lineNumber: 666,
                                            columnNumber: 90
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modulos/page.tsx",
                                    lineNumber: 666,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/modulos/page.tsx",
                            lineNumber: 659,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/modulos/page.tsx",
                        lineNumber: 658,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/modulos/page.tsx",
                lineNumber: 538,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(ModulosPage, "U4/brd9eOX21SUKlLw8rWoOkp0k=");
_c = ModulosPage;
var _c;
__turbopack_context__.k.register(_c, "ModulosPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0ybd8ew._.js.map