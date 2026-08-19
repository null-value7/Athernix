(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/mundi/components/EarthScene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EarthScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ═══════════════════════════════════════════
// VIEW (3D) — Planeta Tierra interactivo
// ═══════════════════════════════════════════
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const R = 2; // radio del planeta
function latLngToVec3(lat, lng, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
}
function EarthScene({ locations, selectedId, onSelect, onHover }) {
    _s();
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const callbacksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        onSelect,
        onHover
    });
    callbacksRef.current = {
        onSelect,
        onHover
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EarthScene.useEffect": ()=>{
            const mount = mountRef.current;
            if (!mount) return;
            // ── Escena base ──
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
            camera.position.set(0, 0.6, 6.5);
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                antialias: true,
                alpha: true
            });
            renderer.setSize(mount.clientWidth, mount.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            mount.appendChild(renderer.domElement);
            // ── Luces ──
            scene.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmbientLight"](0x404060, 1.2));
            const sun = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffffff, 2.2);
            sun.position.set(5, 2, 4);
            scene.add(sun);
            const rim = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointLight"](0xff6b00, 2.5, 20);
            rim.position.set(-6, -2, -4);
            scene.add(rim);
            // ── Grupo del planeta ──
            const earthGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            scene.add(earthGroup);
            // ── Núcleo del planeta: esfera oscura con fresnel de energía (paleta Athernix) ──
            const planetMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                uniforms: {
                    uTime: {
                        value: 0
                    }
                },
                vertexShader: `
        varying vec3 vN; varying vec3 vP;
        void main() {
          vN = normalize(normalMatrix * normal);
          vP = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
                fragmentShader: `
        varying vec3 vN; varying vec3 vP;
        uniform float uTime;
        void main() {
          float fr = pow(1.0 - abs(dot(vN, vec3(0.0, 0.0, 1.0))), 2.4);
          vec3 base = vec3(0.030, 0.006, 0.045);
          vec3 gA = vec3(1.0, 0.42, 0.0);   // naranja
          vec3 gB = vec3(1.0, 0.0, 0.43);   // rosa
          vec3 glow = mix(gA, gB, 0.5 + 0.5 * sin(vP.y * 1.6 + uTime * 0.5));
          float lat = smoothstep(0.985, 1.0, sin(vP.y * 34.0 + uTime * 0.3));
          gl_FragColor = vec4(base + glow * fr * 0.6 + gA * lat * 0.05, 1.0);
        }`
            });
            const planetCore = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](R * 0.992, 72, 72), planetMat);
            earthGroup.add(planetCore);
            // ── Continentes como partículas de energía (muestreo de máscara oceánica) ──
            const landGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            earthGroup.add(landGroup);
            const maskImg = new Image();
            maskImg.crossOrigin = 'anonymous';
            maskImg.src = 'https://unpkg.com/three-globe@2.31.0/example/img/earth-water.png';
            maskImg.onload = ({
                "EarthScene.useEffect": ()=>{
                    const cv = document.createElement('canvas');
                    cv.width = 320;
                    cv.height = 160;
                    const cx = cv.getContext('2d');
                    if (!cx) return;
                    cx.drawImage(maskImg, 0, 0, cv.width, cv.height);
                    const px = cx.getImageData(0, 0, cv.width, cv.height).data;
                    // Detectar polaridad: el agua (~71%) es el valor mayoritario
                    let darkCount = 0;
                    for(let i = 0; i < px.length; i += 40)if (px[i] < 80) darkCount++;
                    const landIsDark = darkCount / (px.length / 40) < 0.5;
                    const pos = [];
                    const col = [];
                    const cA = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#FF6B00');
                    const cB = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#FF006E');
                    const cC = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#FFD700');
                    for(let y = 0; y < cv.height; y++){
                        for(let x = 0; x < cv.width; x++){
                            const v = px[(y * cv.width + x) * 4];
                            const isLand = landIsDark ? v < 80 : v > 170;
                            if (!isLand || Math.random() < 0.35) continue;
                            const lat = 90 - y / cv.height * 180;
                            const lng = x / cv.width * 360 - 180;
                            const p = latLngToVec3(lat + (Math.random() - 0.5) * 0.6, lng + (Math.random() - 0.5) * 0.6, R * 1.004);
                            pos.push(p.x, p.y, p.z);
                            const c = Math.random() < 0.1 ? cC : cA.clone().lerp(cB, Math.random() * 0.75);
                            col.push(c.r, c.g, c.b);
                        }
                    }
                    const lGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
                    lGeo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](pos, 3));
                    lGeo.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](col, 3));
                    const lMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointsMaterial"]({
                        size: 0.026,
                        vertexColors: true,
                        transparent: true,
                        opacity: 0.95,
                        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                        depthWrite: false,
                        sizeAttenuation: true
                    });
                    landGroup.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](lGeo, lMat));
                }
            })["EarthScene.useEffect"];
            // ── Retícula holográfica (meridianos/paralelos) ──
            const grid = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSegments"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WireframeGeometry"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](R * 1.001, 32, 20)), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                color: 0xff6b00,
                transparent: true,
                opacity: 0.05
            }));
            earthGroup.add(grid);
            // ── Anillo de escaneo que recorre el planeta ──
            const scanMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0xffd700,
                transparent: true,
                opacity: 0.35,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
            });
            const scanRing = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](1, 0.004, 8, 160), scanMat);
            scanRing.rotation.x = Math.PI / 2;
            earthGroup.add(scanRing);
            // ── Atmósfera (shader glow) ──
            const atmosphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](R * 1.18, 64, 64), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                vertexShader: `
          varying vec3 vN;
          void main() {
            vN = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
                fragmentShader: `
          varying vec3 vN;
          void main() {
            float i = pow(0.62 - dot(vN, vec3(0.0, 0.0, 1.0)), 2.6);
            gl_FragColor = vec4(1.0, 0.42, 0.0, 1.0) * i * 1.3 + vec4(1.0, 0.0, 0.43, 1.0) * i * 0.5;
          }`,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackSide"],
                transparent: true
            }));
            scene.add(atmosphere);
            // ── Anillo orbital decorativo ──
            const ring = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](R * 1.55, 0.004, 8, 200), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0xff6b00,
                transparent: true,
                opacity: 0.22
            }));
            ring.rotation.x = Math.PI / 2.25;
            scene.add(ring);
            // ── Estrellas ──
            const starGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const starPos = new Float32Array(3500 * 3);
            const starCol = new Float32Array(3500 * 3);
            const palette = [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0xffffff),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0xff6b00),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0xff006e),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0xffd700)
            ];
            for(let i = 0; i < 3500; i++){
                const r = 30 + Math.random() * 60;
                const t = Math.random() * Math.PI * 2;
                const p = Math.acos(2 * Math.random() - 1);
                starPos[i * 3] = r * Math.sin(p) * Math.cos(t);
                starPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
                starPos[i * 3 + 2] = r * Math.cos(p);
                const c = palette[Math.random() < 0.82 ? 0 : Math.floor(Math.random() * 3) + 1];
                starCol[i * 3] = c.r;
                starCol[i * 3 + 1] = c.g;
                starCol[i * 3 + 2] = c.b;
            }
            starGeo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](starPos, 3));
            starGeo.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](starCol, 3));
            const stars = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](starGeo, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointsMaterial"]({
                size: 0.12,
                vertexColors: true,
                transparent: true,
                opacity: 0.85
            }));
            scene.add(stars);
            // ── Arcos de energía entre nodos + cometas viajeros ──
            const arcGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            earthGroup.add(arcGroup);
            const comets = [];
            locations.forEach({
                "EarthScene.useEffect": (loc, i)=>{
                    const nxt = locations[(i + 3) % locations.length];
                    const a = latLngToVec3(loc.lat, loc.lng, R * 1.012);
                    const b = latLngToVec3(nxt.lat, nxt.lng, R * 1.012);
                    const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.09 + a.distanceTo(b) * 0.28);
                    const curve = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuadraticBezierCurve3"](a, mid, b);
                    const line = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints(curve.getPoints(50)), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](loc.color),
                        transparent: true,
                        opacity: 0.16,
                        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"]
                    }));
                    arcGroup.add(line);
                    const comet = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.02, 8, 8), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](loc.color),
                        transparent: true,
                        opacity: 0.9,
                        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"]
                    }));
                    arcGroup.add(comet);
                    comets.push({
                        m: comet,
                        curve,
                        ph: Math.random(),
                        sp: 0.05 + Math.random() * 0.06
                    });
                }
            }["EarthScene.useEffect"]);
            // ── Satélites orbitando ──
            const spins = [];
            const satColors = [
                0xff6b00,
                0xff006e,
                0xffd700
            ];
            for(let i = 0; i < 3; i++){
                const orbit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                orbit.rotation.x = Math.PI / 2.4 + (i - 1) * 0.55;
                orbit.rotation.y = i * 1.9;
                const spin = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                orbit.add(spin);
                const orbR = R * (1.42 + i * 0.17);
                const sat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.05, 0), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                    color: satColors[i],
                    transparent: true,
                    opacity: 0.95
                }));
                sat.position.x = orbR;
                spin.add(sat);
                const trail = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](orbR, 0.0018, 6, 100, Math.PI * 0.55), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                    color: satColors[i],
                    transparent: true,
                    opacity: 0.16,
                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"]
                }));
                trail.rotation.z = -Math.PI * 0.55;
                spin.add(trail);
                scene.add(orbit);
                spins.push(spin);
            }
            // ── Marcadores de ubicaciones ──
            const markers = [];
            locations.forEach({
                "EarthScene.useEffect": (loc)=>{
                    const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                    const pos = latLngToVec3(loc.lat, loc.lng, R * 1.01);
                    g.position.copy(pos);
                    g.lookAt(pos.clone().multiplyScalar(2));
                    const color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](loc.color);
                    const core = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.05, 0), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                        color,
                        transparent: true,
                        opacity: 0.95
                    }));
                    const halo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.06, 16, 16), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                        color,
                        transparent: true,
                        opacity: 0.35
                    }));
                    const pulse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RingGeometry"](0.05, 0.065, 32), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                        color,
                        transparent: true,
                        opacity: 0.9,
                        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
                    }));
                    const spike = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.004, 0.004, 0.35, 6), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                        color,
                        transparent: true,
                        opacity: 0.55
                    }));
                    spike.rotation.x = Math.PI / 2;
                    spike.position.z = 0.17;
                    // Hit-area invisible más grande para clic fácil
                    const hit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.16, 8, 8), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                        visible: false
                    }));
                    hit.userData.locationId = loc.id;
                    g.add(core, halo, pulse, spike, hit);
                    g.userData = {
                        locationId: loc.id,
                        pulse,
                        halo,
                        core,
                        baseColor: color
                    };
                    earthGroup.add(g);
                    markers.push(g);
                }
            }["EarthScene.useEffect"]);
            // ── Interacción: drag para rotar + raycast ──
            const raycaster = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Raycaster"]();
            const mouse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            let isDragging = false;
            let dragMoved = 0;
            let prev = {
                x: 0,
                y: 0
            };
            let targetRotY = 0.6;
            let targetRotX = 0.12;
            let autoRotate = true;
            const onPointerDown = {
                "EarthScene.useEffect.onPointerDown": (e)=>{
                    isDragging = true;
                    dragMoved = 0;
                    prev = {
                        x: e.clientX,
                        y: e.clientY
                    };
                }
            }["EarthScene.useEffect.onPointerDown"];
            const onPointerMove = {
                "EarthScene.useEffect.onPointerMove": (e)=>{
                    const rect = mount.getBoundingClientRect();
                    mouse.x = (e.clientX - rect.left) / rect.width * 2 - 1;
                    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                    if (isDragging) {
                        const dx = e.clientX - prev.x;
                        const dy = e.clientY - prev.y;
                        dragMoved += Math.abs(dx) + Math.abs(dy);
                        targetRotY += dx * 0.005;
                        targetRotX = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(targetRotX + dy * 0.003, -0.9, 0.9);
                        prev = {
                            x: e.clientX,
                            y: e.clientY
                        };
                        autoRotate = false;
                    }
                }
            }["EarthScene.useEffect.onPointerMove"];
            const onPointerUp = {
                "EarthScene.useEffect.onPointerUp": (e)=>{
                    isDragging = false;
                    setTimeout({
                        "EarthScene.useEffect.onPointerUp": ()=>{
                            autoRotate = true;
                        }
                    }["EarthScene.useEffect.onPointerUp"], 4000);
                    if (dragMoved < 6) {
                        // Fue un clic — raycast a marcadores
                        raycaster.setFromCamera(mouse, camera);
                        const hits = raycaster.intersectObjects(markers.flatMap({
                            "EarthScene.useEffect.onPointerUp.hits": (m)=>m.children
                        }["EarthScene.useEffect.onPointerUp.hits"]), false);
                        const found = hits.find({
                            "EarthScene.useEffect.onPointerUp.found": (h)=>h.object.userData.locationId
                        }["EarthScene.useEffect.onPointerUp.found"]);
                        callbacksRef.current.onSelect(found ? found.object.userData.locationId : null);
                    }
                }
            }["EarthScene.useEffect.onPointerUp"];
            mount.addEventListener('pointerdown', onPointerDown);
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
            // ── Zoom con rueda ──
            const onWheel = {
                "EarthScene.useEffect.onWheel": (e)=>{
                    e.preventDefault();
                    const z = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(camera.position.length() + e.deltaY * 0.004, 4.2, 11);
                    camera.position.setLength(z);
                }
            }["EarthScene.useEffect.onWheel"];
            mount.addEventListener('wheel', onWheel, {
                passive: false
            });
            // ── Loop de animación ──
            const clock = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Clock"]();
            let hoveredId = null;
            let raf = 0;
            const animate = {
                "EarthScene.useEffect.animate": ()=>{
                    raf = requestAnimationFrame(animate);
                    const t = clock.getElapsedTime();
                    if (autoRotate && !stateRef.current.locked) targetRotY += 0.0012;
                    earthGroup.rotation.y += (targetRotY - earthGroup.rotation.y) * 0.06;
                    earthGroup.rotation.x += (targetRotX - earthGroup.rotation.x) * 0.06;
                    planetMat.uniforms.uTime.value = t;
                    stars.rotation.y += 0.00012;
                    stars.material.opacity = 0.72 + Math.sin(t * 1.8) * 0.16;
                    ring.rotation.z += 0.0008;
                    grid.rotation.y += 0.00025;
                    // Anillo de escaneo barriendo latitudes
                    const sy = Math.sin(t * 0.42) * R * 0.92;
                    scanRing.position.y = sy;
                    scanRing.scale.setScalar(Math.sqrt(Math.max(R * R - sy * sy, 0.04)) * 1.02);
                    scanMat.opacity = 0.24 + Math.sin(t * 3.1) * 0.12;
                    // Cometas recorriendo los arcos
                    comets.forEach({
                        "EarthScene.useEffect.animate": (c)=>{
                            const u = (t * c.sp + c.ph) % 1;
                            c.m.position.copy(c.curve.getPoint(u));
                            c.m.material.opacity = Math.sin(u * Math.PI) * 0.95;
                        }
                    }["EarthScene.useEffect.animate"]);
                    // Satélites
                    spins.forEach({
                        "EarthScene.useEffect.animate": (s, i)=>{
                            s.rotation.z += 0.0035 + i * 0.0014;
                            s.children[0].rotation.y += 0.05;
                        }
                    }["EarthScene.useEffect.animate"]);
                    // Pulso de marcadores
                    markers.forEach({
                        "EarthScene.useEffect.animate": (m, i)=>{
                            const s = 1 + Math.sin(t * 2.4 + i * 1.3) * 0.35;
                            m.userData.pulse.scale.setScalar(s * 1.6);
                            m.userData.pulse.material.opacity = 0.9 - (s - 0.65) * 0.55;
                            m.userData.halo.scale.setScalar(1 + Math.sin(t * 3 + i) * 0.18);
                            const isSel = m.userData.locationId === stateRef.current.selectedId;
                            const isHov = m.userData.locationId === hoveredId;
                            m.userData.core.scale.setScalar(isSel ? 1.9 : isHov ? 1.5 : 1);
                            m.userData.core.rotation.z += isSel ? 0.08 : 0.025;
                        }
                    }["EarthScene.useEffect.animate"]);
                    // Hover raycast (solo si no arrastra)
                    if (!isDragging) {
                        raycaster.setFromCamera(mouse, camera);
                        const hits = raycaster.intersectObjects(markers.flatMap({
                            "EarthScene.useEffect.animate.hits": (m)=>m.children
                        }["EarthScene.useEffect.animate.hits"]), false);
                        const found = hits.find({
                            "EarthScene.useEffect.animate.found": (h)=>h.object.userData.locationId
                        }["EarthScene.useEffect.animate.found"]);
                        const newId = found ? found.object.userData.locationId : null;
                        if (newId !== hoveredId) {
                            hoveredId = newId;
                            callbacksRef.current.onHover(newId);
                            mount.style.cursor = newId ? 'pointer' : 'grab';
                        }
                    }
                    renderer.render(scene, camera);
                }
            }["EarthScene.useEffect.animate"];
            animate();
            // ── Resize ──
            const onResize = {
                "EarthScene.useEffect.onResize": ()=>{
                    camera.aspect = mount.clientWidth / mount.clientHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(mount.clientWidth, mount.clientHeight);
                }
            }["EarthScene.useEffect.onResize"];
            window.addEventListener('resize', onResize);
            // ── Entrada cinematográfica ──
            earthGroup.scale.setScalar(0.001);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(earthGroup.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 2.2,
                ease: 'expo.out',
                delay: 0.3
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].from(camera.position, {
                z: 12,
                duration: 2.4,
                ease: 'power3.out'
            });
            stateRef.current = {
                flyTo: ({
                    "EarthScene.useEffect": (loc)=>{
                        if (!loc) {
                            stateRef.current.locked = false;
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(camera.position, {
                                x: 0,
                                y: 0.6,
                                z: 6.5,
                                duration: 1.4,
                                ease: 'power3.inOut'
                            });
                            return;
                        }
                        stateRef.current.locked = true;
                        // Rotar el planeta para centrar la ubicación frente a la cámara
                        const phi = (90 - loc.lat) * (Math.PI / 180);
                        const theta = (loc.lng + 180) * (Math.PI / 180);
                        const yaw = -(theta - Math.PI / 2);
                        targetRotY = yaw;
                        targetRotX = (phi - Math.PI / 2) * 0.8;
                        autoRotate = false;
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(camera.position, {
                            x: 0,
                            y: 0.15,
                            z: 4.6,
                            duration: 1.5,
                            ease: 'power3.inOut'
                        });
                    }
                })["EarthScene.useEffect"],
                locked: false,
                selectedId: null
            };
            return ({
                "EarthScene.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    window.removeEventListener('resize', onResize);
                    window.removeEventListener('pointermove', onPointerMove);
                    window.removeEventListener('pointerup', onPointerUp);
                    mount.removeEventListener('pointerdown', onPointerDown);
                    mount.removeEventListener('wheel', onWheel);
                    renderer.dispose();
                    if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
                }
            })["EarthScene.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["EarthScene.useEffect"], []);
    // Reaccionar a selección externa
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EarthScene.useEffect": ()=>{
            if (!stateRef.current.flyTo) return;
            stateRef.current.selectedId = selectedId;
            const loc = locations.find({
                "EarthScene.useEffect": (l)=>l.id === selectedId
            }["EarthScene.useEffect"]) || null;
            stateRef.current.flyTo(loc);
        }
    }["EarthScene.useEffect"], [
        selectedId,
        locations
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: mountRef,
        style: {
            position: 'absolute',
            inset: 0,
            cursor: 'grab'
        }
    }, void 0, false, {
        fileName: "[project]/app/mundi/components/EarthScene.tsx",
        lineNumber: 464,
        columnNumber: 10
    }, this);
}
_s(EarthScene, "tUHtASfwR6wGnFXaQdZYDtq0YkE=");
_c = EarthScene;
var _c;
__turbopack_context__.k.register(_c, "EarthScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/mundi/components/LocationPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LocationPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ═══════════════════════════════════════════
// VIEW (UI) — Panel de información de ubicación
// ═══════════════════════════════════════════
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function LocationPanel({ location, onClose, onStart }) {
    _s();
    const panelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LocationPanel.useEffect": ()=>{
            const el = panelRef.current;
            if (!el) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(el, {
                x: 80,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'expo.out'
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(el.querySelectorAll('.lp-stagger'), {
                y: 24,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.07,
                duration: 0.7,
                delay: 0.15,
                ease: 'power3.out'
            });
        }
    }["LocationPanel.useEffect"], [
        location.id
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: panelRef,
        className: "location-panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lp-glow",
                style: {
                    background: `radial-gradient(circle at 20% 0%, ${location.color}22, transparent 60%)`
                }
            }, void 0, false, {
                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "lp-corner tl",
                style: {
                    borderColor: location.color
                }
            }, void 0, false, {
                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "lp-corner tr",
                style: {
                    borderColor: location.color
                }
            }, void 0, false, {
                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "lp-corner bl",
                style: {
                    borderColor: location.color
                }
            }, void 0, false, {
                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "lp-corner br",
                style: {
                    borderColor: location.color
                }
            }, void 0, false, {
                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "lp-close",
                onClick: onClose,
                "aria-label": "Cerrar",
                children: "✕"
            }, void 0, false, {
                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lp-stagger lp-code mono",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "lp-dot",
                        style: {
                            background: location.color,
                            boxShadow: `0 0 10px ${location.color}`
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    location.code,
                    " // ",
                    location.category
                ]
            }, void 0, true, {
                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "lp-stagger lp-title",
                children: location.name
            }, void 0, false, {
                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lp-stagger lp-coords mono",
                children: [
                    "LAT ",
                    location.lat.toFixed(3),
                    "° · LNG ",
                    location.lng.toFixed(3),
                    "° · ",
                    location.country.toUpperCase()
                ]
            }, void 0, true, {
                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lp-stagger lp-divider",
                style: {
                    background: `linear-gradient(90deg, ${location.color}, transparent)`
                }
            }, void 0, false, {
                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "lp-stagger lp-desc",
                children: location.description
            }, void 0, false, {
                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lp-stagger lp-stats",
                children: location.stats.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lp-stat",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "lp-stat-label mono",
                                children: s.label
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "lp-stat-value mono",
                                style: {
                                    color: location.color
                                },
                                children: s.value
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this)
                        ]
                    }, s.label, true, {
                        fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "lp-stagger lp-cta",
                onClick: onStart,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "lp-cta-shine"
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    "INICIAR EXPERIENCIA",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "lp-cta-arrow",
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lp-stagger lp-hint mono",
                children: "CONEXIÓN_SEGURA // ATHERNIX_VR_READY"
            }, void 0, false, {
                fileName: "[project]/app/mundi/components/LocationPanel.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        ]
    }, location.id, true, {
        fileName: "[project]/app/mundi/components/LocationPanel.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(LocationPanel, "2Tru+9IeUxoEksoM8eA1LGy5uk8=");
_c = LocationPanel;
var _c;
__turbopack_context__.k.register(_c, "LocationPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/mundi/models/location.model.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ═══════════════════════════════════════════
// MODEL — Datos de ubicaciones seleccionables
// ═══════════════════════════════════════════
__turbopack_context__.s([
    "LOCATIONS",
    ()=>LOCATIONS
]);
const LOCATIONS = [
    {
        id: 'joya-de-ceren',
        name: 'Joya de Cerén',
        code: 'SV-001',
        lat: 13.827,
        lng: -89.359,
        country: 'El Salvador',
        category: 'SITIO_ARQUEOLÓGICO',
        description: 'La "Pompeya de América". Aldea maya sepultada por la erupción de Loma Caldera hace 1,400 años. Patrimonio de la Humanidad UNESCO, preservada en el tiempo para explorar la vida cotidiana mesoamericana.',
        stats: [
            {
                label: 'FUNDACIÓN',
                value: '~600 D.C.'
            },
            {
                label: 'ESTRUCTURAS',
                value: '18+'
            },
            {
                label: 'NIVEL_VR',
                value: 'COMPLETO'
            }
        ],
        color: '#FF6B00',
        experienceUrl: '/experience/joya-de-ceren'
    },
    {
        id: 'tazumal',
        name: 'Tazumal',
        code: 'SV-002',
        lat: 13.978,
        lng: -89.675,
        country: 'El Salvador',
        category: 'RUINAS_MAYAS',
        description: 'Complejo ceremonial maya en Chalchuapa. "El lugar donde se consumen las víctimas" alberga la pirámide más alta de El Salvador, con más de 1,200 años de historia ritual y comercio mesoamericano.',
        stats: [
            {
                label: 'ALTURA',
                value: '24 M'
            },
            {
                label: 'PERIODO',
                value: 'CLÁSICO'
            },
            {
                label: 'NIVEL_VR',
                value: 'COMPLETO'
            }
        ],
        color: '#FF006E',
        experienceUrl: '/experience/tazumal'
    },
    {
        id: 'lago-coatepeque',
        name: 'Lago de Coatepeque',
        code: 'SV-003',
        lat: 13.866,
        lng: -89.55,
        country: 'El Salvador',
        category: 'MARAVILLA_NATURAL',
        description: 'Caldera volcánica de aguas turquesa formada hace 72,000 años. Uno de los lagos más impresionantes de Centroamérica, cuyas aguas cambian de color misteriosamente cada año.',
        stats: [
            {
                label: 'DIÁMETRO',
                value: '6.5 KM'
            },
            {
                label: 'PROFUNDIDAD',
                value: '115 M'
            },
            {
                label: 'NIVEL_VR',
                value: 'BETA'
            }
        ],
        color: '#00E5A0',
        experienceUrl: '/experience/coatepeque'
    },
    {
        id: 'el-tunco',
        name: 'Playa El Tunco',
        code: 'SV-004',
        lat: 13.492,
        lng: -89.381,
        country: 'El Salvador',
        category: 'COSTA_PACÍFICA',
        description: 'Capital mundial del surf en la costa salvadoreña. Olas legendarias, atardeceres de fuego y la icónica roca con forma de cerdo marino que da nombre a este paraíso del Pacífico.',
        stats: [
            {
                label: 'OLAS',
                value: 'PUNTA_ROCA'
            },
            {
                label: 'RANKING',
                value: 'TOP_10_MUNDIAL'
            },
            {
                label: 'NIVEL_VR',
                value: 'BETA'
            }
        ],
        color: '#FFD700',
        experienceUrl: '/experience/el-tunco'
    },
    {
        id: 'volcan-santa-ana',
        name: 'Volcán de Santa Ana',
        code: 'SV-005',
        lat: 13.853,
        lng: -89.63,
        country: 'El Salvador',
        category: 'VOLCÁN_ACTIVO',
        description: 'Ilamatepec, el volcán más alto de El Salvador. Su cráter alberga una laguna turquesa hirviente rodeada de paredes de azufre. La caminata definitiva hacia las nubes.',
        stats: [
            {
                label: 'ALTITUD',
                value: '2,381 M'
            },
            {
                label: 'ÚLT_ERUPCIÓN',
                value: '2005'
            },
            {
                label: 'NIVEL_VR',
                value: 'COMPLETO'
            }
        ],
        color: '#C060FF',
        experienceUrl: '/experience/santa-ana'
    },
    {
        id: 'suchitoto',
        name: 'Suchitoto',
        code: 'SV-006',
        lat: 13.938,
        lng: -89.028,
        country: 'El Salvador',
        category: 'CIUDAD_COLONIAL',
        description: '"Lugar del pájaro flor" en náhuat. Ciudad colonial de calles empedradas junto al lago Suchitlán, epicentro cultural con arte, historia viva y arquitectura del siglo XVIII intacta.',
        stats: [
            {
                label: 'FUNDACIÓN',
                value: '1528'
            },
            {
                label: 'AVES',
                value: '200+ ESPECIES'
            },
            {
                label: 'NIVEL_VR',
                value: 'BETA'
            }
        ],
        color: '#00D4FF',
        experienceUrl: '/experience/suchitoto'
    },
    {
        id: 'el-boqueron',
        name: 'El Boquerón',
        code: 'SV-007',
        lat: 13.735,
        lng: -89.285,
        country: 'El Salvador',
        category: 'VOLCÁN_URBANO',
        description: 'El cráter gigante que vigila la capital. Un abismo de 1.5 km de diámetro con el "Boqueroncito" en su interior, jardines de hortensias y vistas que abarcan todo el Valle de las Hamacas.',
        stats: [
            {
                label: 'DIÁMETRO',
                value: '1.5 KM'
            },
            {
                label: 'PROFUNDIDAD',
                value: '558 M'
            },
            {
                label: 'NIVEL_VR',
                value: 'COMPLETO'
            }
        ],
        color: '#FF8C42',
        experienceUrl: '/experience/el-boqueron'
    },
    {
        id: 'puerta-del-diablo',
        name: 'Puerta del Diablo',
        code: 'SV-008',
        lat: 13.607,
        lng: -89.239,
        country: 'El Salvador',
        category: 'MIRADOR_LEGENDARIO',
        description: 'Dos peñones colosales partidos por una tormenta según la leyenda. Mirador natural sobre el valle de Panchimalco, punto de rappel, leyendas coloniales y atardeceres que cortan la respiración.',
        stats: [
            {
                label: 'ALTITUD',
                value: '1,131 M'
            },
            {
                label: 'LEYENDAS',
                value: 'SIGLO_XVIII'
            },
            {
                label: 'NIVEL_VR',
                value: 'BETA'
            }
        ],
        color: '#FF4E7B',
        experienceUrl: '/experience/puerta-del-diablo'
    },
    {
        id: 'bahia-jiquilisco',
        name: 'Bahía de Jiquilisco',
        code: 'SV-009',
        lat: 13.235,
        lng: -88.535,
        country: 'El Salvador',
        category: 'RESERVA_BIOSFERA',
        description: 'El manglar más extenso de Centroamérica. Reserva de Biosfera UNESCO con 27 islas, tortugas carey anidando y canales infinitos donde el bosque salado se encuentra con el Pacífico.',
        stats: [
            {
                label: 'EXTENSIÓN',
                value: '63,500 HA'
            },
            {
                label: 'ISLAS',
                value: '27'
            },
            {
                label: 'NIVEL_VR',
                value: 'BETA'
            }
        ],
        color: '#00FFC6',
        experienceUrl: '/experience/bahia-jiquilisco'
    },
    {
        id: 'ruta-de-las-flores',
        name: 'Ruta de las Flores',
        code: 'SV-010',
        lat: 13.841,
        lng: -89.746,
        country: 'El Salvador',
        category: 'PUEBLOS_MÁGICOS',
        description: 'Cinco pueblos de montaña unidos por cafetales en flor: Juayúa, Apaneca, Ataco y más. Ferias gastronómicas, murales vivientes, cascadas escondidas y el mejor café de altura del país.',
        stats: [
            {
                label: 'PUEBLOS',
                value: '5'
            },
            {
                label: 'ALTURA_CAFÉ',
                value: '1,400 M'
            },
            {
                label: 'NIVEL_VR',
                value: 'COMPLETO'
            }
        ],
        color: '#FFB700',
        experienceUrl: '/experience/ruta-de-las-flores'
    },
    {
        id: 'la-palma',
        name: 'La Palma',
        code: 'SV-011',
        lat: 14.317,
        lng: -89.176,
        country: 'El Salvador',
        category: 'CAPITAL_ARTESANAL',
        description: 'El pueblo que Fernando Llort pintó de colores. Cuna del arte naif salvadoreño donde cada fachada es un lienzo, entre pinares de Chalatenango y el cerro El Pital, el punto más alto del país.',
        stats: [
            {
                label: 'MURALES',
                value: '100+'
            },
            {
                label: 'CLIMA',
                value: 'MONTAÑA'
            },
            {
                label: 'NIVEL_VR',
                value: 'BETA'
            }
        ],
        color: '#8A7BFF',
        experienceUrl: '/experience/la-palma'
    },
    {
        id: 'isla-meanguera',
        name: 'Isla Meanguera',
        code: 'SV-012',
        lat: 13.183,
        lng: -87.718,
        country: 'El Salvador',
        category: 'GOLFO_DE_FONSECA',
        description: 'La joya volcánica del Golfo de Fonseca, donde tres países comparten horizonte. Playas vírgenes de arena oscura, pescadores artesanales y el ritmo isleño intacto del Pacífico profundo.',
        stats: [
            {
                label: 'SUPERFICIE',
                value: '16.68 KM²'
            },
            {
                label: 'ACCESO',
                value: 'SOLO_LANCHA'
            },
            {
                label: 'NIVEL_VR',
                value: 'BETA'
            }
        ],
        color: '#38E5FF',
        experienceUrl: '/experience/isla-meanguera'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/mundi/controllers/useMundiController.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMundiController",
    ()=>useMundiController
]);
// ═══════════════════════════════════════════
// CONTROLLER — Lógica de selección y estado
// ═══════════════════════════════════════════
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$mundi$2f$models$2f$location$2e$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/mundi/models/location.model.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useMundiController() {
    _s();
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const selectLocation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMundiController.useCallback[selectLocation]": (id)=>{
            if (!id) {
                setSelected(null);
                return;
            }
            const loc = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$mundi$2f$models$2f$location$2e$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOCATIONS"].find({
                "useMundiController.useCallback[selectLocation]": (l)=>l.id === id
            }["useMundiController.useCallback[selectLocation]"]) || null;
            setSelected(loc);
        }
    }["useMundiController.useCallback[selectLocation]"], []);
    const closePanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMundiController.useCallback[closePanel]": ()=>setSelected(null)
    }["useMundiController.useCallback[closePanel]"], []);
    const startExperience = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMundiController.useCallback[startExperience]": ()=>{
            if (!selected) return;
            // Punto de integración con el ecosistema Athernix
            window.location.href = selected.experienceUrl;
        }
    }["useMundiController.useCallback[startExperience]"], [
        selected
    ]);
    return {
        locations: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$mundi$2f$models$2f$location$2e$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOCATIONS"],
        selected,
        hovered,
        entered,
        setHovered,
        setEntered,
        selectLocation,
        closePanel,
        startExperience
    };
}
_s(useMundiController, "eMxXz3UJ891zqv8dTEX+Gv+rdN4=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/mundi/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MundiPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ═══════════════════════════════════════════
// VIEW (Página) — MUNDI · Planeta interactivo
// ═══════════════════════════════════════════
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$mundi$2f$components$2f$EarthScene$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/mundi/components/EarthScene.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$mundi$2f$components$2f$LocationPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/mundi/components/LocationPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$mundi$2f$controllers$2f$useMundiController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/mundi/controllers/useMundiController.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function MundiPage() {
    _s();
    const { locations, selected, hovered, setHovered, selectLocation, closePanel, startExperience } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$mundi$2f$controllers$2f$useMundiController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMundiController"])();
    const [mousePos, setMousePos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [activeDot, setActiveDot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('hero');
    const earthSectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ── Cursor personalizado + animaciones de scroll ──
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MundiPage.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
            // ── Secuencia de arranque (loader) ──
            const bootObj = {
                v: 0
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(bootObj, {
                v: 100,
                duration: 1.6,
                ease: 'power2.inOut',
                onUpdate: {
                    "MundiPage.useEffect": ()=>setProgress(Math.round(bootObj.v))
                }["MundiPage.useEffect"]
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to('.boot-overlay', {
                yPercent: -100,
                duration: 1,
                ease: 'expo.inOut',
                delay: 1.85,
                onComplete: {
                    "MundiPage.useEffect": ()=>{
                        document.querySelector('.boot-overlay')?.remove();
                    }
                }["MundiPage.useEffect"]
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo('.boot-logo', {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
            const onMove = {
                "MundiPage.useEffect.onMove": (e)=>{
                    setMousePos({
                        x: e.clientX,
                        y: e.clientY
                    });
                }
            }["MundiPage.useEffect.onMove"];
            window.addEventListener('mousemove', onMove);
            // ── Hero: letras con entrada 3D ──
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo('.hero-title .letter', {
                y: 120,
                opacity: 0,
                rotateX: -90
            }, {
                y: 0,
                opacity: 1,
                rotateX: 0,
                stagger: 0.07,
                duration: 1.2,
                ease: 'back.out(1.6)',
                delay: 2.1
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to('.hero-eyebrow', {
                opacity: 1,
                duration: 1,
                delay: 1.95
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to('.hero-sub', {
                opacity: 1,
                duration: 1,
                delay: 3
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to('.scroll-hint', {
                opacity: 1,
                duration: 1,
                delay: 3.3
            });
            // Glitch periódico del título
            const glitch = setInterval({
                "MundiPage.useEffect.glitch": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo('.hero-title', {
                        x: -3,
                        skewX: 4
                    }, {
                        x: 0,
                        skewX: 0,
                        duration: 0.18,
                        ease: 'power2.out'
                    });
                }
            }["MundiPage.useEffect.glitch"], 4200);
            // ── Efecto scramble/decode en textos [data-scramble] ──
            const scrambleIvs = [];
            document.querySelectorAll('[data-scramble]').forEach({
                "MundiPage.useEffect": (el)=>{
                    const orig = el.dataset.scramble || el.textContent || '';
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
                        trigger: el,
                        start: 'top 88%',
                        once: true,
                        onEnter: {
                            "MundiPage.useEffect": ()=>{
                                const chars = '█▓▒░<>/#01';
                                let frame = 0;
                                const total = 22;
                                const iv = setInterval({
                                    "MundiPage.useEffect.iv": ()=>{
                                        frame++;
                                        el.textContent = orig.split('').map({
                                            "MundiPage.useEffect.iv": (ch, i)=>ch === ' ' ? ' ' : i < frame / total * orig.length ? ch : chars[Math.floor(Math.random() * chars.length)]
                                        }["MundiPage.useEffect.iv"]).join('');
                                        if (frame >= total) {
                                            el.textContent = orig;
                                            clearInterval(iv);
                                        }
                                    }
                                }["MundiPage.useEffect.iv"], 34);
                                scrambleIvs.push(iv);
                            }
                        }["MundiPage.useEffect"]
                    });
                }
            }["MundiPage.useEffect"]);
            // ── Elementos magnéticos [data-magnetic] ──
            const magnets = document.querySelectorAll('[data-magnetic]');
            const magnetHandlers = [];
            magnets.forEach({
                "MundiPage.useEffect": (el)=>{
                    const mv = {
                        "MundiPage.useEffect.mv": (e)=>{
                            const r = el.getBoundingClientRect();
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(el, {
                                x: (e.clientX - r.left - r.width / 2) * 0.35,
                                y: (e.clientY - r.top - r.height / 2) * 0.35,
                                duration: 0.4,
                                ease: 'power3.out'
                            });
                        }
                    }["MundiPage.useEffect.mv"];
                    const lv = {
                        "MundiPage.useEffect.lv": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(el, {
                                x: 0,
                                y: 0,
                                duration: 0.7,
                                ease: 'elastic.out(1, 0.4)'
                            })
                    }["MundiPage.useEffect.lv"];
                    el.addEventListener('mousemove', mv);
                    el.addEventListener('mouseleave', lv);
                    magnetHandlers.push({
                        el,
                        mv,
                        lv
                    });
                }
            }["MundiPage.useEffect"]);
            // ── Tilt 3D en cards de destinos ──
            const tiltHandlers = [];
            document.querySelectorAll('.dest-card').forEach({
                "MundiPage.useEffect": (card)=>{
                    const inner = card.querySelector('.dc-inner');
                    if (!inner) return;
                    const mv = {
                        "MundiPage.useEffect.mv": (e)=>{
                            const r = card.getBoundingClientRect();
                            const x = (e.clientX - r.left) / r.width - 0.5;
                            const y = (e.clientY - r.top) / r.height - 0.5;
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(inner, {
                                rotateY: x * 9,
                                rotateX: -y * 9,
                                duration: 0.5,
                                ease: 'power2.out',
                                transformPerspective: 700
                            });
                        }
                    }["MundiPage.useEffect.mv"];
                    const lv = {
                        "MundiPage.useEffect.lv": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(inner, {
                                rotateY: 0,
                                rotateX: 0,
                                duration: 0.9,
                                ease: 'elastic.out(1, 0.5)'
                            })
                    }["MundiPage.useEffect.lv"];
                    card.addEventListener('mousemove', mv);
                    card.addEventListener('mouseleave', lv);
                    tiltHandlers.push({
                        el: card,
                        mv,
                        lv
                    });
                }
            }["MundiPage.useEffect"]);
            // ── Skew de marquees según velocidad de scroll ──
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
                trigger: document.body,
                start: 0,
                end: 'max',
                onUpdate: {
                    "MundiPage.useEffect": (self)=>{
                        const skew = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].utils.clamp(-10, 10, self.getVelocity() / -280);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to('.mq-track', {
                            skewX: skew,
                            duration: 0.4,
                            ease: 'power2.out',
                            overwrite: 'auto'
                        });
                    }
                }["MundiPage.useEffect"]
            });
            // ── Dots de navegación lateral ──
            [
                'hero',
                'planeta',
                'destinos',
                'datos'
            ].forEach({
                "MundiPage.useEffect": (id)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
                        trigger: '#' + id,
                        start: 'top 55%',
                        end: 'bottom 55%',
                        onToggle: {
                            "MundiPage.useEffect": (self)=>{
                                if (self.isActive) setActiveDot(id);
                            }
                        }["MundiPage.useEffect"]
                    });
                }
            }["MundiPage.useEffect"]);
            // ── Hero se desvanece al hacer scroll (parallax de salida) ──
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to('.hero-inner', {
                y: -180,
                opacity: 0,
                scale: 0.92,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom 30%',
                    scrub: 1
                }
            });
            // ── Sección tierra: entrada cinematográfica ──
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo('.earth-header', {
                y: 60,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: '.earth-stage',
                    start: 'top 65%',
                    toggleActions: 'play none none reverse'
                }
            });
            // ── Reveals genéricos ──
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].utils.toArray('.reveal').forEach({
                "MundiPage.useEffect": (el)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(el, {
                        y: 0,
                        opacity: 1,
                        duration: 1.3,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 86%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                }
            }["MundiPage.useEffect"]);
            // ── Cards de destinos con stagger ──
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].utils.toArray('.dest-card').forEach({
                "MundiPage.useEffect": (el, i)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(el, {
                        y: 0,
                        opacity: 1,
                        duration: 1.1,
                        ease: 'power3.out',
                        delay: i % 3 * 0.12,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                }
            }["MundiPage.useEffect"]);
            // ── Contadores animados ──
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].utils.toArray('.st-value').forEach({
                "MundiPage.useEffect": (el)=>{
                    const target = parseFloat(el.dataset.target || '0');
                    const suffix = el.dataset.suffix || '';
                    const obj = {
                        v: 0
                    };
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
                        trigger: el,
                        start: 'top 88%',
                        onEnter: {
                            "MundiPage.useEffect": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(obj, {
                                    v: target,
                                    duration: 2,
                                    ease: 'power2.out',
                                    onUpdate: {
                                        "MundiPage.useEffect": ()=>{
                                            el.textContent = Math.round(obj.v) + suffix;
                                        }
                                    }["MundiPage.useEffect"]
                                })
                        }["MundiPage.useEffect"]
                    });
                }
            }["MundiPage.useEffect"]);
            return ({
                "MundiPage.useEffect": ()=>{
                    window.removeEventListener('mousemove', onMove);
                    clearInterval(glitch);
                    scrambleIvs.forEach(clearInterval);
                    magnetHandlers.forEach({
                        "MundiPage.useEffect": ({ el, mv, lv })=>{
                            el.removeEventListener('mousemove', mv);
                            el.removeEventListener('mouseleave', lv);
                        }
                    }["MundiPage.useEffect"]);
                    tiltHandlers.forEach({
                        "MundiPage.useEffect": ({ el, mv, lv })=>{
                            el.removeEventListener('mousemove', mv);
                            el.removeEventListener('mouseleave', lv);
                        }
                    }["MundiPage.useEffect"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].getAll().forEach({
                        "MundiPage.useEffect": (t)=>t.kill()
                    }["MundiPage.useEffect"]);
                }
            })["MundiPage.useEffect"];
        }
    }["MundiPage.useEffect"], []);
    // ── Al elegir card, scrollear a la tierra y seleccionar ──
    const pickFromCard = (id)=>{
        earthSectionRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
        setTimeout(()=>selectLocation(id), 700);
    };
    const hoveredLoc = locations.find((l)=>l.id === hovered);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "boot-overlay",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "boot-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "boot-logo",
                            children: "MUNDI"
                        }, void 0, false, {
                            fileName: "[project]/app/mundi/page.tsx",
                            lineNumber: 208,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "boot-bar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "boot-bar-fill",
                                style: {
                                    width: `${progress}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 210,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/mundi/page.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "boot-pct mono",
                            children: [
                                String(progress).padStart(3, '0'),
                                "% // INICIALIZANDO_ÓRBITA"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/mundi/page.tsx",
                            lineNumber: 212,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/mundi/page.tsx",
                    lineNumber: 207,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/mundi/page.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "nav-dots",
                children: [
                    [
                        'hero',
                        'INICIO'
                    ],
                    [
                        'planeta',
                        'PLANETA'
                    ],
                    [
                        'destinos',
                        'DESTINOS'
                    ],
                    [
                        'datos',
                        'DATOS'
                    ]
                ].map(([id, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: activeDot === id ? 'nd active' : 'nd',
                        onClick: ()=>document.getElementById(id)?.scrollIntoView({
                                behavior: 'smooth'
                            }),
                        "aria-label": label,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "nd-dot"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "nd-label mono",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 226,
                                columnNumber: 13
                            }, this)
                        ]
                    }, id, true, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 219,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/mundi/page.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "hero",
                id: "hero",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hero-orb",
                        style: {
                            width: 520,
                            height: 520,
                            background: 'radial-gradient(circle, rgba(255,107,0,0.16), transparent 70%)',
                            top: '12%',
                            right: '4%'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hero-orb",
                        style: {
                            width: 380,
                            height: 380,
                            background: 'radial-gradient(circle, rgba(255,0,110,0.13), transparent 70%)',
                            bottom: '12%',
                            left: '3%'
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hero-inner",
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hero-eyebrow mono",
                                children: "SISTEMA_PLANETARIO // ATHERNIX_V3"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "hero-title",
                                children: 'MUNDI'.split('').map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "letter",
                                        children: l
                                    }, i, false, {
                                        fileName: "[project]/app/mundi/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hero-sub mono",
                                "data-scramble": "EL PLANETA ES TU INTERFAZ",
                                children: "EL PLANETA ES TU INTERFAZ"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "scroll-hint",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "line"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 245,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mono",
                                children: "DESLIZA_PARA_ORBITAR"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/mundi/page.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mq",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mq-track",
                    children: [
                        0,
                        1
                    ].map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "EXPLORA ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "◆"
                                }, void 0, false, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 255,
                                    columnNumber: 23
                                }, this),
                                " SELECCIONA ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "◆"
                                }, void 0, false, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 255,
                                    columnNumber: 45
                                }, this),
                                " VIAJA ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "◆"
                                }, void 0, false, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 255,
                                    columnNumber: 62
                                }, this),
                                " REALIDAD_VIRTUAL ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "◆"
                                }, void 0, false, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 255,
                                    columnNumber: 90
                                }, this),
                                " EL_SALVADOR ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "◆"
                                }, void 0, false, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 255,
                                    columnNumber: 113
                                }, this),
                                " PATRIMONIO ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "◆"
                                }, void 0, false, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 255,
                                    columnNumber: 135
                                }, this),
                                " MUNDI ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "◆"
                                }, void 0, false, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 255,
                                    columnNumber: 152
                                }, this),
                                ' '
                            ]
                        }, k, true, {
                            fileName: "[project]/app/mundi/page.tsx",
                            lineNumber: 254,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/mundi/page.tsx",
                    lineNumber: 252,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/mundi/page.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "earth-stage",
                id: "planeta",
                ref: earthSectionRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "stage-corner tl"
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "stage-corner tr"
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 263,
                        columnNumber: 45
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "stage-corner bl"
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "stage-corner br"
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 264,
                        columnNumber: 45
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "earth-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                "data-scramble": "SELECCIONA TU DESTINO",
                                children: "SELECCIONA TU DESTINO"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 266,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mono",
                                children: "CLIC_EN_UN_NODO // ARRASTRA_PARA_ROTAR // RUEDA_PARA_ZOOM"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 265,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "earth-canvas-wrap",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$mundi$2f$components$2f$EarthScene$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            locations: locations,
                            selectedId: selected?.id || null,
                            onSelect: selectLocation,
                            onHover: setHovered
                        }, void 0, false, {
                            fileName: "[project]/app/mundi/page.tsx",
                            lineNumber: 271,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    hoveredLoc && !selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hover-tag mono",
                        style: {
                            left: mousePos.x,
                            top: mousePos.y
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: hoveredLoc.color
                                },
                                children: "◉"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 281,
                                columnNumber: 13
                            }, this),
                            " ",
                            hoveredLoc.name.toUpperCase()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 280,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "earth-hud mono",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    "MUNDI_OS ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "v3.1.4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/mundi/page.tsx",
                                        lineNumber: 286,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    "NODOS: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: locations.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/mundi/page.tsx",
                                        lineNumber: 287,
                                        columnNumber: 23
                                    }, this),
                                    " // ESTADO: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "EN_LÍNEA"
                                    }, void 0, false, {
                                        fileName: "[project]/app/mundi/page.tsx",
                                        lineNumber: 287,
                                        columnNumber: 60
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    "SEÑAL: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "████████░░ 87%"
                                    }, void 0, false, {
                                        fileName: "[project]/app/mundi/page.tsx",
                                        lineNumber: 288,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 288,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "earth-instructions mono",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "[ARRASTRAR]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/mundi/page.tsx",
                                        lineNumber: 291,
                                        columnNumber: 16
                                    }, this),
                                    " ROTAR PLANETA"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 291,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "[RUEDA]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/mundi/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 16
                                    }, this),
                                    " ZOOM ORBITAL"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 292,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "[CLIC]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/mundi/page.tsx",
                                        lineNumber: 293,
                                        columnNumber: 16
                                    }, this),
                                    " SELECCIONAR NODO"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 293,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, this),
                    selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$mundi$2f$components$2f$LocationPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        location: selected,
                        onClose: closePanel,
                        onStart: startExperience
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 297,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/mundi/page.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "dest-section",
                id: "destinos",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "sec-eyebrow mono reveal",
                        "data-scramble": "// ÍNDICE_DE_DESTINOS",
                        children: "// ÍNDICE_DE_DESTINOS"
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "sec-title reveal",
                        children: [
                            "TODOS LOS ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                children: "NODOS"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 305,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "dest-grid",
                        children: locations.map((loc, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "dest-card",
                                onClick: ()=>pickFromCard(loc.id),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "dc-inner",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "dc-scanline"
                                        }, void 0, false, {
                                            fileName: "[project]/app/mundi/page.tsx",
                                            lineNumber: 311,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "dc-num",
                                            children: String(i + 1).padStart(2, '0')
                                        }, void 0, false, {
                                            fileName: "[project]/app/mundi/page.tsx",
                                            lineNumber: 312,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "dc-cat mono",
                                            style: {
                                                color: loc.color
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "dot",
                                                    style: {
                                                        background: loc.color,
                                                        boxShadow: `0 0 8px ${loc.color}`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/mundi/page.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 19
                                                }, this),
                                                loc.category
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/mundi/page.tsx",
                                            lineNumber: 313,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            children: loc.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/mundi/page.tsx",
                                            lineNumber: 317,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                loc.description.slice(0, 110),
                                                "…"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/mundi/page.tsx",
                                            lineNumber: 318,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "dc-go mono",
                                            children: [
                                                "VER_EN_EL_PLANETA ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "→"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/mundi/page.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/mundi/page.tsx",
                                            lineNumber: 319,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 310,
                                    columnNumber: 15
                                }, this)
                            }, loc.id, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 309,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 307,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/mundi/page.tsx",
                lineNumber: 302,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mq mq-rev",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mq-track",
                    children: [
                        0,
                        1
                    ].map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "JOYA_DE_CERÉN ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "◈"
                                }, void 0, false, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 333,
                                    columnNumber: 29
                                }, this),
                                " TAZUMAL ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "◈"
                                }, void 0, false, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 333,
                                    columnNumber: 48
                                }, this),
                                " COATEPEQUE ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "◈"
                                }, void 0, false, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 333,
                                    columnNumber: 70
                                }, this),
                                " EL_TUNCO ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "◈"
                                }, void 0, false, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 333,
                                    columnNumber: 90
                                }, this),
                                " SANTA_ANA ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "◈"
                                }, void 0, false, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 333,
                                    columnNumber: 111
                                }, this),
                                " SUCHITOTO ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "◈"
                                }, void 0, false, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 333,
                                    columnNumber: 132
                                }, this),
                                " EL_BOQUERÓN ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "◈"
                                }, void 0, false, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 333,
                                    columnNumber: 155
                                }, this),
                                " MEANGUERA ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "◈"
                                }, void 0, false, {
                                    fileName: "[project]/app/mundi/page.tsx",
                                    lineNumber: 333,
                                    columnNumber: 176
                                }, this),
                                ' '
                            ]
                        }, k, true, {
                            fileName: "[project]/app/mundi/page.tsx",
                            lineNumber: 332,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/mundi/page.tsx",
                    lineNumber: 330,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/mundi/page.tsx",
                lineNumber: 329,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "stats-band",
                id: "datos",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stat-item reveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "st-value",
                                "data-target": "12",
                                "data-suffix": "",
                                children: "0"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 342,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "st-label mono",
                                children: "DESTINOS_ACTIVOS"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 343,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 341,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stat-item reveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "st-value",
                                "data-target": "1400",
                                "data-suffix": "+",
                                children: "0"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 346,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "st-label mono",
                                children: "AÑOS_DE_HISTORIA"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 347,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 345,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stat-item reveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "st-value",
                                "data-target": "240",
                                "data-suffix": "K",
                                children: "0"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 350,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "st-label mono",
                                children: "PARTÍCULAS_RENDERIZADAS"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 351,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 349,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stat-item reveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "st-value",
                                "data-target": "100",
                                "data-suffix": "%",
                                children: "0"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 354,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "st-label mono",
                                children: "INMERSIÓN_VR"
                            }, void 0, false, {
                                fileName: "[project]/app/mundi/page.tsx",
                                lineNumber: 355,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 353,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/mundi/page.tsx",
                lineNumber: 340,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "mundi-footer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "f-logo",
                        "data-magnetic": true,
                        children: "MUNDI"
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 361,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mono",
                        children: "ATHERNIX ECOSYSTEM © 2026 // NEO_VORTEX_LABS"
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 362,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mono",
                        children: "HECHO_EN_EL_SALVADOR 🇸🇻"
                    }, void 0, false, {
                        fileName: "[project]/app/mundi/page.tsx",
                        lineNumber: 363,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/mundi/page.tsx",
                lineNumber: 360,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(MundiPage, "UczxpJA3z5jvTLZyUnpMpItEs1w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$mundi$2f$controllers$2f$useMundiController$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMundiController"]
    ];
});
_c = MundiPage;
var _c;
__turbopack_context__.k.register(_c, "MundiPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_mundi_0862.w-._.js.map