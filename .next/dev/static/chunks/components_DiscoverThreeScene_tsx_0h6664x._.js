(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/DiscoverThreeScene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DiscoverThreeScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function DiscoverThreeScene() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DiscoverThreeScene.useEffect": ()=>{
            if (!canvasRef.current) return undefined;
            // Load THREE.js from CDN if not available
            const loadScript = {
                "DiscoverThreeScene.useEffect.loadScript": (src)=>new Promise({
                        "DiscoverThreeScene.useEffect.loadScript": (resolve, reject)=>{
                            if (document.querySelector(`script[src="${src}"]`)) {
                                resolve();
                                return;
                            }
                            const script = document.createElement('script');
                            script.src = src;
                            script.onload = ({
                                "DiscoverThreeScene.useEffect.loadScript": ()=>resolve()
                            })["DiscoverThreeScene.useEffect.loadScript"];
                            script.onerror = reject;
                            document.body.appendChild(script);
                        }
                    }["DiscoverThreeScene.useEffect.loadScript"])
            }["DiscoverThreeScene.useEffect.loadScript"];
            // Wait for THREE to load from CDN
            const init = {
                "DiscoverThreeScene.useEffect.init": async ()=>{
                    if (!window.THREE) {
                        console.log('THREE not loaded, loading from CDN...');
                        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js");
                        // Wait for THREE to be available
                        let attempts = 0;
                        while(!window.THREE && attempts < 20){
                            await new Promise({
                                "DiscoverThreeScene.useEffect.init": (resolve)=>setTimeout(resolve, 50)
                            }["DiscoverThreeScene.useEffect.init"]);
                            attempts++;
                        }
                    }
                    if (!window.THREE) {
                        console.error('THREE failed to load');
                        return;
                    }
                    console.log('THREE loaded, initializing scene...');
                    const scene = new window.THREE.Scene();
                    const camera = new window.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
                    camera.position.z = 5;
                    scene.add(camera);
                    const renderer = new window.THREE.WebGLRenderer({
                        canvas: canvasRef.current,
                        alpha: true,
                        antialias: true,
                        powerPreference: "high-performance"
                    });
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                    renderer.setClearColor(0x000000, 0);
                    // Force canvas size and background
                    if (canvasRef.current) {
                        canvasRef.current.style.width = '100vw';
                        canvasRef.current.style.height = '100vh';
                        canvasRef.current.style.display = 'block';
                        canvasRef.current.style.position = 'fixed';
                        canvasRef.current.style.top = '0';
                        canvasRef.current.style.left = '0';
                        canvasRef.current.style.zIndex = '1';
                    }
                    console.log('Renderer created:', renderer);
                    console.log('Canvas element:', canvasRef.current);
                    console.log('Canvas size:', canvasRef.current?.width, 'x', canvasRef.current?.height);
                    console.log('Canvas style:', canvasRef.current?.style.cssText);
                    const geometry = new window.THREE.IcosahedronGeometry(2, 16);
                    const material = new window.THREE.MeshStandardMaterial({
                        color: 0xffd700,
                        metalness: 0.3,
                        roughness: 0.4,
                        emissive: new window.THREE.Color(0xffd700),
                        emissiveIntensity: 0.5
                    });
                    const sphere = new window.THREE.Mesh(geometry, material);
                    sphere.position.set(0, 0, 0);
                    scene.add(sphere);
                    console.log('Sphere created and added to scene:', sphere);
                    console.log('Sphere position:', sphere.position);
                    console.log('Camera position:', camera.position);
                    console.log('Sphere visible:', sphere.visible);
                    console.log('Sphere material:', sphere.material);
                    const positionAttribute = geometry.attributes.position;
                    const vertex = new window.THREE.Vector3();
                    const originalVertices = [];
                    for(let i = 0; i < positionAttribute.count; i += 1){
                        vertex.fromBufferAttribute(positionAttribute, i);
                        originalVertices.push(vertex.clone());
                    }
                    scene.add(new window.THREE.AmbientLight(0xffd700, 0.35));
                    const directionalLight = new window.THREE.DirectionalLight(0xffffff, 3);
                    directionalLight.position.set(5, 5, 5);
                    scene.add(directionalLight);
                    const secondaryLight = new window.THREE.DirectionalLight(0xffaa00, 2.5);
                    secondaryLight.position.set(-5, -5, 2);
                    scene.add(secondaryLight);
                    const pointLight = new window.THREE.PointLight(0xffd700, 2, 10);
                    pointLight.position.set(0, 0, 0);
                    scene.add(pointLight);
                    const clock = new window.THREE.Clock();
                    let mouseX = 0;
                    let mouseY = 0;
                    let frameId = 0;
                    let frameCount = 0;
                    const handleMouseMove = {
                        "DiscoverThreeScene.useEffect.init.handleMouseMove": (event)=>{
                            mouseX = event.clientX - window.innerWidth / 2;
                            mouseY = event.clientY - window.innerHeight / 2;
                        }
                    }["DiscoverThreeScene.useEffect.init.handleMouseMove"];
                    const animate = {
                        "DiscoverThreeScene.useEffect.init.animate": ()=>{
                            frameId = requestAnimationFrame(animate);
                            const elapsedTime = clock.getElapsedTime();
                            frameCount++;
                            // Update vertex animation every 2 frames to reduce CPU load
                            if (frameCount % 2 === 0) {
                                const positions = sphere.geometry.attributes.position;
                                for(let i = 0; i < positions.count; i += 1){
                                    const p = originalVertices[i];
                                    // Restored original noise calculation
                                    const noise = Math.sin(p.x * 2 + elapsedTime) * 0.1 + Math.cos(p.y * 2 + elapsedTime * 0.8) * 0.1 + Math.sin(p.z * 2 + elapsedTime * 1.2) * 0.1;
                                    const scale = 1 + noise;
                                    positions.setXYZ(i, p.x * scale, p.y * scale, p.z * scale);
                                }
                                positions.needsUpdate = true;
                            }
                            sphere.rotation.y += 0.002 + 0.05 * (mouseX * 0.001 - sphere.rotation.y);
                            sphere.rotation.x += 0.001 + 0.05 * (mouseY * 0.001 - sphere.rotation.x);
                            renderer.render(scene, camera);
                            // Log render status periodically
                            if (frameCount % 100 === 0) {
                                console.log('Rendering frame:', frameCount, 'Sphere visible:', sphere.visible);
                            }
                        }
                    }["DiscoverThreeScene.useEffect.init.animate"];
                    const handleResize = {
                        "DiscoverThreeScene.useEffect.init.handleResize": ()=>{
                            camera.aspect = window.innerWidth / window.innerHeight;
                            camera.updateProjectionMatrix();
                            renderer.setSize(window.innerWidth, window.innerHeight);
                            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                        }
                    }["DiscoverThreeScene.useEffect.init.handleResize"];
                    const setupScrollMotion = {
                        "DiscoverThreeScene.useEffect.init.setupScrollMotion": ()=>{
                            if (!window.gsap || !window.ScrollTrigger) {
                                console.log('GSAP or ScrollTrigger not available');
                                return;
                            }
                            window.gsap.registerPlugin(window.ScrollTrigger);
                            // Force initial visibility immediately
                            window.gsap.utils.toArray(".discover-page .discover-content-block").forEach({
                                "DiscoverThreeScene.useEffect.init.setupScrollMotion": (block)=>{
                                    window.gsap.set(block, {
                                        opacity: 1,
                                        y: 0,
                                        clearProps: "all"
                                    });
                                }
                            }["DiscoverThreeScene.useEffect.init.setupScrollMotion"]);
                            // Only animate on scroll, don't touch opacity
                            window.gsap.utils.toArray(".discover-page .discover-content-block").forEach({
                                "DiscoverThreeScene.useEffect.init.setupScrollMotion": (block)=>{
                                    window.gsap.fromTo(block, {
                                        y: 30
                                    }, {
                                        scrollTrigger: {
                                            trigger: block,
                                            start: "top 85%",
                                            end: "bottom 15%",
                                            toggleActions: "play reverse play reverse"
                                        },
                                        y: 0,
                                        duration: 0.8,
                                        ease: "power3.out"
                                    });
                                }
                            }["DiscoverThreeScene.useEffect.init.setupScrollMotion"]);
                            // 3D sphere animation on scroll
                            const sphereTimeline = window.gsap.timeline({
                                scrollTrigger: {
                                    trigger: ".discover-page",
                                    start: "top top",
                                    end: "bottom bottom",
                                    scrub: 1
                                }
                            });
                            // First section - move left and change to yellow
                            sphereTimeline.to(sphere.position, {
                                x: -2.5,
                                y: -0.5,
                                z: 1,
                                ease: "power1.inOut"
                            }, 0).to(sphere.rotation, {
                                z: Math.PI / 2,
                                ease: "power1.inOut"
                            }, 0).to(directionalLight.position, {
                                x: -5,
                                y: 5,
                                ease: "power1.inOut"
                            }, 0).to(material.color, {
                                r: 1,
                                g: 0.84,
                                b: 0,
                                ease: "power1.inOut"
                            }, 0).to(material.emissive, {
                                r: 1,
                                g: 0.84,
                                b: 0,
                                ease: "power1.inOut"
                            }, 0)// Second section - move right and change to orange
                            .to(sphere.position, {
                                x: 2.5,
                                y: 0.5,
                                z: 1.5,
                                ease: "power1.inOut"
                            }, 0.5).to(sphere.scale, {
                                x: 1.2,
                                y: 1.2,
                                z: 1.2,
                                ease: "power1.inOut"
                            }, 0.5).to(material.color, {
                                r: 1,
                                g: 0.42,
                                b: 0,
                                ease: "power1.inOut"
                            }, 0.5).to(material.emissive, {
                                r: 1,
                                g: 0.42,
                                b: 0,
                                ease: "power1.inOut"
                            }, 0.5)// Third section - center and scale down
                            .to(sphere.position, {
                                x: 0,
                                y: 0,
                                z: 2,
                                ease: "power1.inOut"
                            }, 1).to(sphere.scale, {
                                x: 0.8,
                                y: 0.8,
                                z: 0.8,
                                ease: "power1.inOut"
                            }, 1);
                        }
                    }["DiscoverThreeScene.useEffect.init.setupScrollMotion"];
                    document.addEventListener("mousemove", handleMouseMove);
                    window.addEventListener("resize", handleResize);
                    animate();
                    setupScrollMotion();
                    return ({
                        "DiscoverThreeScene.useEffect.init": ()=>{
                            cancelAnimationFrame(frameId);
                            document.removeEventListener("mousemove", handleMouseMove);
                            window.removeEventListener("resize", handleResize);
                            if (window.ScrollTrigger) {
                                window.ScrollTrigger.getAll().forEach({
                                    "DiscoverThreeScene.useEffect.init": (trigger)=>trigger.kill()
                                }["DiscoverThreeScene.useEffect.init"]);
                            }
                            // Safe cleanup - don't remove canvas, let React handle it
                            if (renderer) {
                                renderer.dispose();
                            }
                            if (geometry) {
                                geometry.dispose();
                            }
                            if (material) {
                                material.dispose();
                            }
                        }
                    })["DiscoverThreeScene.useEffect.init"];
                }
            }["DiscoverThreeScene.useEffect.init"];
            init();
        }
    }["DiscoverThreeScene.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "discover-webgl-canvas"
    }, void 0, false, {
        fileName: "[project]/components/DiscoverThreeScene.tsx",
        lineNumber: 255,
        columnNumber: 10
    }, this);
}
_s(DiscoverThreeScene, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = DiscoverThreeScene;
var _c;
__turbopack_context__.k.register(_c, "DiscoverThreeScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_DiscoverThreeScene_tsx_0h6664x._.js.map