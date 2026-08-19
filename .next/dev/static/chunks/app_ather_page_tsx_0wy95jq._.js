(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/ather/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AthernixitoPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function AthernixitoPage() {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AthernixitoPage.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            // Store references for cleanup
            let renderer = null;
            let scene = null;
            let camera = null;
            // We must ensure THREE and FBXLoader are loaded.
            const loadScript = {
                "AthernixitoPage.useEffect.loadScript": (src)=>new Promise({
                        "AthernixitoPage.useEffect.loadScript": (resolve, reject)=>{
                            if (document.querySelector(`script[src="${src}"]`)) {
                                resolve();
                                return;
                            }
                            const script = document.createElement('script');
                            script.src = src;
                            script.onload = ({
                                "AthernixitoPage.useEffect.loadScript": ()=>resolve()
                            })["AthernixitoPage.useEffect.loadScript"];
                            script.onerror = reject;
                            document.body.appendChild(script);
                        }
                    }["AthernixitoPage.useEffect.loadScript"])
            }["AthernixitoPage.useEffect.loadScript"];
            const init = {
                "AthernixitoPage.useEffect.init": async ()=>{
                    try {
                        // Load Three.js and GLTFLoader with proper error handling
                        if (!window.THREE) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js");
                        // Wait for THREE to be available
                        let attempts = 0;
                        while(!window.THREE && attempts < 20){
                            await new Promise({
                                "AthernixitoPage.useEffect.init": (resolve)=>setTimeout(resolve, 50)
                            }["AthernixitoPage.useEffect.init"]);
                            attempts++;
                        }
                        if (!window.THREE) {
                            console.error('THREE failed to load');
                            return;
                        }
                        // Load GLTFLoader with proper error handling
                        if (!window.THREE.GLTFLoader) {
                            await loadScript("https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js");
                            // Wait for the loader to be properly initialized
                            attempts = 0;
                            while(!window.THREE.GLTFLoader && attempts < 20){
                                await new Promise({
                                    "AthernixitoPage.useEffect.init": (resolve)=>setTimeout(resolve, 50)
                                }["AthernixitoPage.useEffect.init"]);
                                attempts++;
                            }
                            if (!window.THREE.GLTFLoader) {
                                console.error('GLTFLoader failed to load');
                                return;
                            }
                        }
                        if (!window.gsap) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
                        if (!window.ScrollTrigger) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js");
                        window.gsap.registerPlugin(window.ScrollTrigger);
                        // ─── SCENE SETUP ───
                        const container = containerRef.current;
                        if (!container) return;
                        renderer = new window.THREE.WebGLRenderer({
                            antialias: true,
                            alpha: true
                        });
                        renderer.domElement.id = 'canvas-3d';
                        container.appendChild(renderer.domElement);
                        renderer.setSize(window.innerWidth, window.innerHeight);
                        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                        renderer.outputColorSpace = window.THREE.SRGBColorSpace;
                        renderer.shadowMap.enabled = true;
                        renderer.shadowMap.type = window.THREE.PCFSoftShadowMap;
                        scene = new window.THREE.Scene();
                        scene.fog = new window.THREE.FogExp2(0x020005, 0.015);
                        camera = new window.THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
                        camera.position.set(6, 2, 10);
                        camera.lookAt(0, 1, 0);
                        // ─── LIGHTING ───
                        scene.add(new window.THREE.AmbientLight(0x110524, 1.5));
                        const mainLight = new window.THREE.DirectionalLight(0xffb700, 4);
                        mainLight.position.set(5, 10, 5);
                        mainLight.castShadow = true;
                        scene.add(mainLight);
                        const rimLight = new window.THREE.DirectionalLight(0xff006e, 2);
                        rimLight.position.set(-5, 3, -3);
                        scene.add(rimLight);
                        const fillLight = new window.THREE.PointLight(0xff6b00, 4, 20);
                        fillLight.position.set(0, 4, 3);
                        scene.add(fillLight);
                        const backLight = new window.THREE.PointLight(0xff006e, 3, 15);
                        backLight.position.set(-3, 2, -5);
                        scene.add(backLight);
                        // ─── SPACE BACKGROUND ───
                        const starGeo = new window.THREE.BufferGeometry();
                        const starCount = 3000;
                        const starPos = new Float32Array(starCount * 3);
                        const starSizes = new Float32Array(starCount);
                        for(let i = 0; i < starCount; i++){
                            starPos[i * 3] = (Math.random() - 0.5) * 400;
                            starPos[i * 3 + 1] = (Math.random() - 0.5) * 400;
                            starPos[i * 3 + 2] = (Math.random() - 0.5) * 400;
                            starSizes[i] = Math.random() * 2 + 0.5;
                        }
                        starGeo.setAttribute('position', new window.THREE.BufferAttribute(starPos, 3));
                        starGeo.setAttribute('size', new window.THREE.BufferAttribute(starSizes, 1));
                        const starMat = new window.THREE.ShaderMaterial({
                            uniforms: {
                                uTime: {
                                    value: 0
                                },
                                uColor: {
                                    value: new window.THREE.Color(0xffffff)
                                }
                            },
                            vertexShader: `
            attribute float size;
            uniform float uTime;
            varying float vAlpha;
            void main() {
              vAlpha = 0.4 + 0.6 * sin(uTime * 0.5 + position.x * 0.01);
              vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (250.0 / -mvPos.z);
              gl_Position = projectionMatrix * mvPos;
            }
          `,
                            fragmentShader: `
            uniform vec3 uColor;
            varying float vAlpha;
            void main() {
              float d = length(gl_PointCoord - vec2(0.5));
              float glow = smoothstep(0.5, 0.0, d);
              gl_FragColor = vec4(uColor, glow * vAlpha * 1.5);
            }
          `,
                            transparent: true,
                            blending: window.THREE.AdditiveBlending,
                            depthWrite: false
                        });
                        const stars = new window.THREE.Points(starGeo, starMat);
                        scene.add(stars);
                        // Warp Streaks
                        const streakGeo = new window.THREE.BufferGeometry();
                        const streakCount = 800;
                        const streakPos = new Float32Array(streakCount * 6);
                        const streakColors = new Float32Array(streakCount * 6);
                        for(let i = 0; i < streakCount; i++){
                            const r = 4 + Math.random() * 150;
                            const theta = Math.random() * Math.PI * 2;
                            const x = r * Math.cos(theta);
                            const y = r * Math.sin(theta);
                            const z = (Math.random() - 0.5) * 600;
                            streakPos[i * 6] = x;
                            streakPos[i * 6 + 1] = y;
                            streakPos[i * 6 + 2] = z;
                            streakPos[i * 6 + 3] = x;
                            streakPos[i * 6 + 4] = y;
                            streakPos[i * 6 + 5] = z + 0.1;
                            const color = new window.THREE.Color();
                            const rand = Math.random();
                            if (rand < 0.33) color.setHex(0xff00ff);
                            else if (rand < 0.66) color.setHex(0x00ffff);
                            else color.setHex(0xffffff);
                            streakColors[i * 6] = color.r;
                            streakColors[i * 6 + 1] = color.g;
                            streakColors[i * 6 + 2] = color.b;
                            streakColors[i * 6 + 3] = color.r;
                            streakColors[i * 6 + 4] = color.g;
                            streakColors[i * 6 + 5] = color.b;
                        }
                        streakGeo.setAttribute('position', new window.THREE.BufferAttribute(streakPos, 3));
                        streakGeo.setAttribute('color', new window.THREE.BufferAttribute(streakColors, 3));
                        const streakMat = new window.THREE.LineBasicMaterial({
                            vertexColors: true,
                            transparent: true,
                            opacity: 0,
                            blending: window.THREE.AdditiveBlending,
                            depthWrite: false
                        });
                        const streaks = new window.THREE.LineSegments(streakGeo, streakMat);
                        scene.add(streaks);
                        // Nebula clouds
                        const nebulaData = [
                            {
                                pos: [
                                    -20,
                                    10,
                                    -60
                                ],
                                color: 0xff006e,
                                size: 30,
                                opacity: 0.06
                            },
                            {
                                pos: [
                                    30,
                                    -15,
                                    -80
                                ],
                                color: 0xff6b00,
                                size: 40,
                                opacity: 0.05
                            },
                            {
                                pos: [
                                    -10,
                                    5,
                                    -50
                                ],
                                color: 0xffd700,
                                size: 20,
                                opacity: 0.04
                            },
                            {
                                pos: [
                                    15,
                                    20,
                                    -70
                                ],
                                color: 0x8800ff,
                                size: 35,
                                opacity: 0.05
                            }
                        ];
                        nebulaData.forEach({
                            "AthernixitoPage.useEffect.init": (n)=>{
                                const geo = new window.THREE.SphereGeometry(n.size, 16, 16);
                                const mat = new window.THREE.MeshBasicMaterial({
                                    color: n.color,
                                    transparent: true,
                                    opacity: n.opacity,
                                    side: window.THREE.BackSide,
                                    blending: window.THREE.AdditiveBlending,
                                    depthWrite: false
                                });
                                const mesh = new window.THREE.Mesh(geo, mat);
                                mesh.position.set(...n.pos);
                                scene.add(mesh);
                            }
                        }["AthernixitoPage.useEffect.init"]);
                        // Planet rings
                        const ringGeo = new window.THREE.TorusGeometry(8, 0.8, 4, 80);
                        const ringMat = new window.THREE.MeshBasicMaterial({
                            color: 0xff6b00,
                            transparent: true,
                            opacity: 0.12,
                            blending: window.THREE.AdditiveBlending,
                            depthWrite: false
                        });
                        const ring3d = new window.THREE.Mesh(ringGeo, ringMat);
                        ring3d.position.set(20, -8, -40);
                        ring3d.rotation.x = Math.PI * 0.35;
                        scene.add(ring3d);
                        // Floating particles
                        const floatGeo = new window.THREE.BufferGeometry();
                        const floatCount = 120;
                        const floatPos = new Float32Array(floatCount * 3);
                        for(let i = 0; i < floatCount; i++){
                            const r = 2.5 + Math.random() * 2;
                            const theta = Math.random() * Math.PI * 2;
                            const phi = (Math.random() - 0.5) * Math.PI;
                            floatPos[i * 3] = r * Math.cos(theta) * Math.cos(phi);
                            floatPos[i * 3 + 1] = r * Math.sin(phi) + 1.5;
                            floatPos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
                        }
                        floatGeo.setAttribute('position', new window.THREE.BufferAttribute(floatPos, 3));
                        const floatMat = new window.THREE.PointsMaterial({
                            color: 0xffd700,
                            size: 0.06,
                            transparent: true,
                            opacity: 0.7,
                            blending: window.THREE.AdditiveBlending,
                            depthWrite: false
                        });
                        const floatParticles = new window.THREE.Points(floatGeo, floatMat);
                        scene.add(floatParticles);
                        // Ground glow disc
                        const discGeo = new window.THREE.CircleGeometry(3, 64);
                        const discMat = new window.THREE.MeshBasicMaterial({
                            color: 0xff6b00,
                            transparent: true,
                            opacity: 0.08,
                            blending: window.THREE.AdditiveBlending,
                            depthWrite: false,
                            side: window.THREE.DoubleSide
                        });
                        const disc = new window.THREE.Mesh(discGeo, discMat);
                        disc.rotation.x = -Math.PI / 2;
                        disc.position.y = 0;
                        scene.add(disc);
                        // ─── MODEL LOADING ───
                        let model = null;
                        let mixer = null;
                        let modelReady = false;
                        let currentAction = null;
                        // Load real robot model
                        const loader = new window.THREE.GLTFLoader();
                        loader.load('/robot/model2.glb', {
                            "AthernixitoPage.useEffect.init": (gltf)=>{
                                model = gltf.scene;
                                // Configure materials
                                model.traverse({
                                    "AthernixitoPage.useEffect.init": (child)=>{
                                        if (child instanceof window.THREE.Mesh) {
                                            child.castShadow = true;
                                            child.receiveShadow = true;
                                            if (child.material) {
                                                child.material.envMapIntensity = 0.5;
                                                child.material.roughness = 0.4;
                                                child.material.metalness = 0.6;
                                            }
                                        }
                                    }
                                }["AthernixitoPage.useEffect.init"]);
                                model.rotation.y = Math.PI * 0.5;
                                model.position.x = 3;
                                model.position.y = -0.5;
                                model.scale.set(1.5, 1.5, 1.5);
                                scene.add(model);
                                // Create mixer for animations
                                mixer = new window.THREE.AnimationMixer(model);
                                // Load idle animation
                                loader.load('/robot/animations/idle.glb', {
                                    "AthernixitoPage.useEffect.init": (animGltf)=>{
                                        const clip = animGltf.animations[0];
                                        if (clip) {
                                            const action = mixer.clipAction(clip);
                                            action.setLoop(window.THREE.LoopRepeat, Infinity);
                                            action.play();
                                            currentAction = action;
                                        }
                                        modelReady = true;
                                        hideLoading();
                                    }
                                }["AthernixitoPage.useEffect.init"], undefined, {
                                    "AthernixitoPage.useEffect.init": (error)=>{
                                        console.error('Error loading idle animation:', error);
                                        modelReady = true;
                                        hideLoading();
                                    }
                                }["AthernixitoPage.useEffect.init"]);
                            }
                        }["AthernixitoPage.useEffect.init"], undefined, {
                            "AthernixitoPage.useEffect.init": (error)=>{
                                console.error('Error loading robot model:', error);
                                // Fallback to basic character if model fails to load
                                createFallbackChar();
                                hideLoading();
                            }
                        }["AthernixitoPage.useEffect.init"]);
                        function createFallbackChar() {
                            const group = new window.THREE.Group();
                            // Body - metallic orange
                            const bodyGeo = new window.THREE.CylinderGeometry(0.5, 0.5, 1.2, 16);
                            const bodyMat = new window.THREE.MeshStandardMaterial({
                                color: 0xff6b00,
                                emissive: 0xff2200,
                                emissiveIntensity: 0.3,
                                roughness: 0.3,
                                metalness: 0.8
                            });
                            const body = new window.THREE.Mesh(bodyGeo, bodyMat);
                            body.position.y = 1.5;
                            body.castShadow = true;
                            group.add(body);
                            // Head - golden with glow
                            const headGeo = new window.THREE.SphereGeometry(0.38, 16, 16);
                            const headMat = new window.THREE.MeshStandardMaterial({
                                color: 0xffd700,
                                emissive: 0xff6b00,
                                emissiveIntensity: 0.2,
                                roughness: 0.2,
                                metalness: 0.8
                            });
                            const head = new window.THREE.Mesh(headGeo, headMat);
                            head.position.y = 2.7;
                            head.castShadow = true;
                            group.add(head);
                            // Face screen (glowing display)
                            const faceGeo = new window.THREE.PlaneGeometry(0.4, 0.3);
                            const faceMat = new window.THREE.MeshBasicMaterial({
                                color: 0x00ffff,
                                transparent: true,
                                opacity: 0.8,
                                side: window.THREE.DoubleSide
                            });
                            const face = new window.THREE.Mesh(faceGeo, faceMat);
                            face.position.set(0, 2.7, 0.4);
                            face.rotation.y = Math.PI;
                            group.add(face);
                            // Arms
                            [
                                -1,
                                1
                            ].forEach({
                                "AthernixitoPage.useEffect.init.createFallbackChar": (side)=>{
                                    const armGeo = new window.THREE.CylinderGeometry(0.15, 0.15, 0.8, 8);
                                    const arm = new window.THREE.Mesh(armGeo, bodyMat.clone());
                                    arm.position.set(side * 0.7, 1.5, 0);
                                    arm.rotation.z = side * 0.4;
                                    group.add(arm);
                                }
                            }["AthernixitoPage.useEffect.init.createFallbackChar"]);
                            // Legs
                            [
                                -1,
                                1
                            ].forEach({
                                "AthernixitoPage.useEffect.init.createFallbackChar": (side)=>{
                                    const legGeo = new window.THREE.CylinderGeometry(0.18, 0.18, 0.9, 8);
                                    const leg = new window.THREE.Mesh(legGeo, bodyMat.clone());
                                    leg.position.set(side * 0.3, 0.5, 0);
                                    group.add(leg);
                                }
                            }["AthernixitoPage.useEffect.init.createFallbackChar"]);
                            model = group;
                            model.rotation.y = Math.PI * 0.5;
                            model.position.x = 3;
                            scene.add(model);
                            modelReady = true;
                        }
                        function hideLoading() {
                            setTimeout({
                                "AthernixitoPage.useEffect.init.hideLoading": ()=>{
                                    const loadEl = document.getElementById('loading');
                                    if (loadEl) {
                                        loadEl.classList.add('fade-out');
                                        setTimeout({
                                            "AthernixitoPage.useEffect.init.hideLoading": ()=>loadEl.remove()
                                        }["AthernixitoPage.useEffect.init.hideLoading"], 800);
                                    }
                                }
                            }["AthernixitoPage.useEffect.init.hideLoading"], 800);
                        }
                        // ─── SCROLL STATE & GSAP ───
                        const panels = [
                            document.getElementById('panel-0'),
                            document.getElementById('panel-1'),
                            document.getElementById('panel-2'),
                            document.getElementById('panel-3')
                        ];
                        const phase2overlay = document.getElementById('phase2-overlay');
                        const scrollHint = document.getElementById('scroll-hint');
                        window.gsap.to('#scroll-hint', {
                            y: 10,
                            opacity: 0.5,
                            yoyo: true,
                            repeat: -1,
                            duration: 1
                        });
                        if (!modelReady || !model) {
                            let checkInt = setInterval({
                                "AthernixitoPage.useEffect.init.checkInt": ()=>{
                                    if (modelReady) {
                                        clearInterval(checkInt);
                                        initAnimations();
                                    }
                                }
                            }["AthernixitoPage.useEffect.init.checkInt"], 100);
                        } else {
                            initAnimations();
                        }
                        function initAnimations() {
                            panels.forEach({
                                "AthernixitoPage.useEffect.init.initAnimations": (panel, i)=>{
                                    if (!panel) return;
                                    window.gsap.set(panel, {
                                        opacity: 0,
                                        y: 50
                                    });
                                    const badge = panel.querySelector('.panel-badge');
                                    const title = panel.querySelector('.gs-title');
                                    const sub = panel.querySelector('.gs-sub');
                                    const chips = panel.querySelectorAll('.gs-chip');
                                    const cta = panel.querySelector('.panel-cta');
                                    window.gsap.set([
                                        badge,
                                        title,
                                        sub,
                                        cta
                                    ], {
                                        opacity: 0,
                                        y: 30
                                    });
                                    if (chips.length) window.gsap.set(chips, {
                                        opacity: 0,
                                        y: 20,
                                        scale: 0.9
                                    });
                                    const startProgress = i * 0.25;
                                    const endProgress = startProgress + 0.20;
                                    window.ScrollTrigger.create({
                                        trigger: "#scroll-driver",
                                        start: `${startProgress * 100}% top`,
                                        end: `${endProgress * 100}% top`,
                                        onEnter: {
                                            "AthernixitoPage.useEffect.init.initAnimations": ()=>{
                                                panel.classList.add('active');
                                                window.gsap.to(panel, {
                                                    opacity: 1,
                                                    y: 0,
                                                    duration: 0.5,
                                                    ease: "power2.out"
                                                });
                                                window.gsap.to([
                                                    badge,
                                                    title,
                                                    sub,
                                                    cta
                                                ], {
                                                    opacity: 1,
                                                    y: 0,
                                                    duration: 0.8,
                                                    stagger: 0.1,
                                                    ease: "back.out(1.2)"
                                                });
                                                if (chips.length) window.gsap.to(chips, {
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1,
                                                    duration: 0.6,
                                                    stagger: 0.1,
                                                    delay: 0.3,
                                                    ease: "back.out(1.5)"
                                                });
                                            }
                                        }["AthernixitoPage.useEffect.init.initAnimations"],
                                        onLeave: {
                                            "AthernixitoPage.useEffect.init.initAnimations": ()=>{
                                                panel.classList.remove('active');
                                                window.gsap.to(panel, {
                                                    opacity: 0,
                                                    y: -50,
                                                    duration: 0.5
                                                });
                                            }
                                        }["AthernixitoPage.useEffect.init.initAnimations"],
                                        onEnterBack: {
                                            "AthernixitoPage.useEffect.init.initAnimations": ()=>{
                                                panel.classList.add('active');
                                                window.gsap.to(panel, {
                                                    opacity: 1,
                                                    y: 0,
                                                    duration: 0.5,
                                                    ease: "power2.out"
                                                });
                                                window.gsap.to([
                                                    badge,
                                                    title,
                                                    sub,
                                                    cta
                                                ], {
                                                    opacity: 1,
                                                    y: 0,
                                                    duration: 0.8,
                                                    stagger: 0.1,
                                                    ease: "back.out(1.2)"
                                                });
                                                if (chips.length) window.gsap.to(chips, {
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1,
                                                    duration: 0.6,
                                                    stagger: 0.1,
                                                    delay: 0.3,
                                                    ease: "back.out(1.5)"
                                                });
                                            }
                                        }["AthernixitoPage.useEffect.init.initAnimations"],
                                        onLeaveBack: {
                                            "AthernixitoPage.useEffect.init.initAnimations": ()=>{
                                                panel.classList.remove('active');
                                                window.gsap.to(panel, {
                                                    opacity: 0,
                                                    y: 50,
                                                    duration: 0.5
                                                });
                                            }
                                        }["AthernixitoPage.useEffect.init.initAnimations"]
                                    });
                                }
                            }["AthernixitoPage.useEffect.init.initAnimations"]);
                            const camKeyframes = [
                                {
                                    p: 0.00,
                                    camPos: [
                                        6,
                                        2,
                                        12
                                    ],
                                    lookAt: [
                                        3,
                                        2,
                                        0
                                    ],
                                    modelRotY: Math.PI * 0.5,
                                    modelX: 3
                                },
                                {
                                    p: 0.25,
                                    camPos: [
                                        3,
                                        2,
                                        10
                                    ],
                                    lookAt: [
                                        1,
                                        2,
                                        0
                                    ],
                                    modelRotY: Math.PI * 0.3,
                                    modelX: 1.5
                                },
                                {
                                    p: 0.50,
                                    camPos: [
                                        0,
                                        2,
                                        7
                                    ],
                                    lookAt: [
                                        0,
                                        2,
                                        0
                                    ],
                                    modelRotY: Math.PI * 0.1,
                                    modelX: 0
                                },
                                {
                                    p: 0.75,
                                    camPos: [
                                        0,
                                        2,
                                        3
                                    ],
                                    lookAt: [
                                        0,
                                        2,
                                        0
                                    ],
                                    modelRotY: 0,
                                    modelX: 0
                                },
                                {
                                    p: 1.00,
                                    camPos: [
                                        0,
                                        2.5,
                                        3
                                    ],
                                    lookAt: [
                                        0,
                                        2.5,
                                        0
                                    ],
                                    modelRotY: 0,
                                    modelX: 0
                                }
                            ];
                            function lerp(a, b, t) {
                                return a + (b - a) * t;
                            }
                            function smoothstep(t) {
                                return t * t * (3 - 2 * t);
                            }
                            function interp(frames, progress, key) {
                                for(let i = 0; i < frames.length - 1; i++){
                                    const a = frames[i], b = frames[i + 1];
                                    if (progress >= a.p && progress <= b.p) {
                                        const t = smoothstep((progress - a.p) / (b.p - a.p));
                                        if (Array.isArray(a[key])) {
                                            return a[key].map({
                                                "AthernixitoPage.useEffect.init.initAnimations.interp": (v, j)=>lerp(v, b[key][j], t)
                                            }["AthernixitoPage.useEffect.init.initAnimations.interp"]);
                                        }
                                        return lerp(a[key], b[key], t);
                                    }
                                }
                                const last = frames[frames.length - 1];
                                return Array.isArray(last[key]) ? [
                                    ...last[key]
                                ] : last[key];
                            }
                            const sceneState = {
                                progress: 0,
                                streakSpeed: 0,
                                streakLength: 0.1,
                                fov: 45
                            };
                            window.warpState = sceneState;
                            window.ScrollTrigger.create({
                                trigger: "#scroll-driver",
                                start: "top top",
                                end: "bottom bottom",
                                onUpdate: {
                                    "AthernixitoPage.useEffect.init.initAnimations": (self)=>{
                                        const progress = self.progress;
                                        if (scrollHint) scrollHint.style.opacity = progress < 0.05 ? '1' : '0';
                                        if (progress > 0.50 && progress < 0.9 && phase2overlay) {
                                            phase2overlay.classList.add('show');
                                        } else if (phase2overlay) {
                                            phase2overlay.classList.remove('show');
                                        }
                                        if (!modelReady || !model) return;
                                        const camPos = interp(camKeyframes, progress, 'camPos');
                                        const lookAt = interp(camKeyframes, progress, 'lookAt');
                                        camera.position.set(camPos[0], camPos[1], camPos[2]);
                                        camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
                                        const modelRotY = interp(camKeyframes, progress, 'modelRotY');
                                        const modelX = interp(camKeyframes, progress, 'modelX');
                                        model.rotation.y = modelRotY;
                                        model.position.x = modelX;
                                        scene.fog.density = lerp(0.012, 0.032, smoothstep(progress));
                                        stars.rotation.y = progress * 0.8;
                                        stars.rotation.x = progress * 0.3;
                                        floatParticles.rotation.y = progress * 2;
                                        let warpFactor = 0;
                                        if (progress > 0.5 && progress < 0.9) {
                                            warpFactor = Math.sin((progress - 0.5) / 0.4 * Math.PI);
                                        }
                                        window.gsap.to(sceneState, {
                                            streakSpeed: warpFactor * 800,
                                            streakLength: 0.1 + warpFactor * 150,
                                            fov: 45 + warpFactor * 60,
                                            duration: 0.5,
                                            ease: "power2.out"
                                        });
                                        window.gsap.to(streakMat, {
                                            opacity: warpFactor * 0.9,
                                            duration: 0.5
                                        });
                                    }
                                }["AthernixitoPage.useEffect.init.initAnimations"]
                            });
                            const magBtns = document.querySelectorAll('.mag-btn');
                            magBtns.forEach({
                                "AthernixitoPage.useEffect.init.initAnimations": (btn)=>{
                                    btn.addEventListener('mousemove', {
                                        "AthernixitoPage.useEffect.init.initAnimations": (e)=>{
                                            const rect = e.target.getBoundingClientRect();
                                            const x = e.clientX - rect.left - rect.width / 2;
                                            const y = e.clientY - rect.top - rect.height / 2;
                                            window.gsap.to(btn, {
                                                x: x * 0.3,
                                                y: y * 0.3,
                                                duration: 0.3,
                                                ease: "power2.out"
                                            });
                                        }
                                    }["AthernixitoPage.useEffect.init.initAnimations"]);
                                    btn.addEventListener('mouseleave', {
                                        "AthernixitoPage.useEffect.init.initAnimations": ()=>{
                                            window.gsap.to(btn, {
                                                x: 0,
                                                y: 0,
                                                duration: 0.5,
                                                ease: "elastic.out(1, 0.3)"
                                            });
                                        }
                                    }["AthernixitoPage.useEffect.init.initAnimations"]);
                                }
                            }["AthernixitoPage.useEffect.init.initAnimations"]);
                        }
                        window.addEventListener('resize', {
                            "AthernixitoPage.useEffect.init": ()=>{
                                camera.aspect = window.innerWidth / window.innerHeight;
                                camera.updateProjectionMatrix();
                                renderer.setSize(window.innerWidth, window.innerHeight);
                            }
                        }["AthernixitoPage.useEffect.init"]);
                        const clock = new window.THREE.Clock();
                        function animate() {
                            window.athReqId2 = requestAnimationFrame(animate);
                            const dt = clock.getDelta();
                            const elapsed = clock.getElapsedTime();
                            if (mixer) mixer.update(dt);
                            starMat.uniforms.uTime.value = elapsed;
                            if (model) {
                                model.position.y = Math.sin(elapsed * 2.5) * 0.15;
                                model.rotation.z = Math.sin(elapsed * 1.5) * 0.05;
                                model.rotation.x = Math.sin(elapsed * 2.0) * 0.03;
                            }
                            floatParticles.rotation.y += 0.003;
                            fillLight.intensity = 3.5 + Math.sin(elapsed * 2.3) * 0.5;
                            backLight.intensity = 2.5 + Math.sin(elapsed * 1.7 + 1) * 0.5;
                            ring3d.rotation.z += 0.002;
                            if (window.warpState && typeof streakGeo !== 'undefined') {
                                const speed = window.warpState.streakSpeed;
                                const stretch = window.warpState.streakLength;
                                const positions = streakGeo.attributes.position.array;
                                if (Math.abs(camera.fov - window.warpState.fov) > 0.1) {
                                    camera.fov = window.warpState.fov;
                                    camera.updateProjectionMatrix();
                                }
                                for(let i = 0; i < positions.length; i += 6){
                                    positions[i + 2] += speed * dt;
                                    if (positions[i + 2] > 200) positions[i + 2] -= 800;
                                    positions[i + 5] = positions[i + 2] + stretch;
                                }
                                streakGeo.attributes.position.needsUpdate = true;
                            }
                            renderer.render(scene, camera);
                        }
                        cancelAnimationFrame(window.athReqId2);
                        animate();
                    } catch (e) {
                        console.error('Error running Athernixito animation scripts:', e);
                    }
                }
            }["AthernixitoPage.useEffect.init"];
            init();
            return ({
                "AthernixitoPage.useEffect": ()=>{
                    // Clean up Three.js resources
                    if (window.ScrollTrigger) {
                        window.ScrollTrigger.getAll().forEach({
                            "AthernixitoPage.useEffect": (t)=>t.kill()
                        }["AthernixitoPage.useEffect"]);
                    }
                    cancelAnimationFrame(window.athReqId2);
                    // Dispose renderer if it exists - let React handle DOM cleanup
                    if (renderer) {
                        renderer.dispose();
                        renderer.forceContextLoss();
                    }
                }
            })["AthernixitoPage.useEffect"];
        }
    }["AthernixitoPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grain-overlay"
            }, void 0, false, {
                fileName: "[project]/app/ather/page.tsx",
                lineNumber: 637,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "loading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "load-logo",
                        children: "ATHERNIXITO"
                    }, void 0, false, {
                        fileName: "[project]/app/ather/page.tsx",
                        lineNumber: 641,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "load-bar-wrap",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "load-bar-fill"
                        }, void 0, false, {
                            fileName: "[project]/app/ather/page.tsx",
                            lineNumber: 643,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/ather/page.tsx",
                        lineNumber: 642,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "load-sub",
                        children: "INITIALIZING UNIVERSE..."
                    }, void 0, false, {
                        fileName: "[project]/app/ather/page.tsx",
                        lineNumber: 645,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/ather/page.tsx",
                lineNumber: 640,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "canvas-container",
                ref: containerRef
            }, void 0, false, {
                fileName: "[project]/app/ather/page.tsx",
                lineNumber: 649,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "scroll-driver",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sticky-hud",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-panel",
                            id: "panel-0",
                            style: {
                                "left": "5vw",
                                "top": "50%",
                                "transform": "translateY(-50%)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "panel-badge",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "badge-dot"
                                        }, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 657,
                                            columnNumber: 42
                                        }, this),
                                        "TEMPORADA 01 · ACTIVA"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ather/page.tsx",
                                    lineNumber: 657,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "panel-title gs-title",
                                    children: [
                                        "EL",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 658,
                                            columnNumber: 52
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "grad",
                                            children: "ATHERNIXITO"
                                        }, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 658,
                                            columnNumber: 58
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 658,
                                            columnNumber: 99
                                        }, this),
                                        "DESPIERTA"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ather/page.tsx",
                                    lineNumber: 658,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "panel-sub gs-sub",
                                    children: [
                                        "UN UNIVERSO DE APRENDIZAJE",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 659,
                                            columnNumber: 71
                                        }, this),
                                        "TE ESPERA. ¿ESTÁS LISTO?"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ather/page.tsx",
                                    lineNumber: 659,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "stat-row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stat-chip gs-chip",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "12K+"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/ather/page.tsx",
                                                    lineNumber: 661,
                                                    columnNumber: 50
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "JUGADORES"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/ather/page.tsx",
                                                    lineNumber: 661,
                                                    columnNumber: 71
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 661,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stat-chip gs-chip",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "48"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/ather/page.tsx",
                                                    lineNumber: 662,
                                                    columnNumber: 50
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "MÓDULOS"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/ather/page.tsx",
                                                    lineNumber: 662,
                                                    columnNumber: 69
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 662,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stat-chip gs-chip",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "∞"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/ather/page.tsx",
                                                    lineNumber: 663,
                                                    columnNumber: 50
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "POSIBILIDADES"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/ather/page.tsx",
                                                    lineNumber: 663,
                                                    columnNumber: 68
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 663,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ather/page.tsx",
                                    lineNumber: 660,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ather/page.tsx",
                            lineNumber: 656,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-panel",
                            id: "panel-1",
                            style: {
                                "left": "5vw",
                                "top": "50%",
                                "transform": "translateY(-50%)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "panel-badge",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "badge-dot"
                                        }, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 669,
                                            columnNumber: 42
                                        }, this),
                                        "EXPLORANDO EL COSMOS"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ather/page.tsx",
                                    lineNumber: 669,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "panel-title gs-title",
                                    children: [
                                        "ENTRA",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 670,
                                            columnNumber: 55
                                        }, this),
                                        "AL ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "grad",
                                            children: "ESPACIO"
                                        }, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 670,
                                            columnNumber: 64
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ather/page.tsx",
                                    lineNumber: 670,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "panel-sub gs-sub",
                                    children: [
                                        "DONDE EL CONOCIMIENTO",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 671,
                                            columnNumber: 66
                                        }, this),
                                        "NO TIENE LÍMITES."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ather/page.tsx",
                                    lineNumber: 671,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "stat-row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stat-chip gs-chip",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "100%"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/ather/page.tsx",
                                                    lineNumber: 673,
                                                    columnNumber: 50
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "INMERSIÓN"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/ather/page.tsx",
                                                    lineNumber: 673,
                                                    columnNumber: 71
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 673,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stat-chip gs-chip",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "3D"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/ather/page.tsx",
                                                    lineNumber: 674,
                                                    columnNumber: 50
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "ENTORNO INTERACTIVO"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/ather/page.tsx",
                                                    lineNumber: 674,
                                                    columnNumber: 69
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 674,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ather/page.tsx",
                                    lineNumber: 672,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ather/page.tsx",
                            lineNumber: 668,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-panel",
                            id: "panel-2",
                            style: {
                                "left": "5vw",
                                "top": "50%",
                                "transform": "translateY(-50%)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "panel-badge",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "badge-dot"
                                        }, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 680,
                                            columnNumber: 42
                                        }, this),
                                        "MISIÓN EN CURSO"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ather/page.tsx",
                                    lineNumber: 680,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "panel-title gs-title",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "grad",
                                            children: "DOMINA"
                                        }, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 681,
                                            columnNumber: 50
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 681,
                                            columnNumber: 86
                                        }, this),
                                        "EL FUTURO"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ather/page.tsx",
                                    lineNumber: 681,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "panel-sub gs-sub",
                                    children: [
                                        "CADA LECCIÓN ES UNA ESTRELLA.",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 682,
                                            columnNumber: 74
                                        }, this),
                                        "COLECCIÓNALAS TODAS."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ather/page.tsx",
                                    lineNumber: 682,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ather/page.tsx",
                            lineNumber: 679,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-panel",
                            id: "panel-3",
                            style: {
                                "left": "5vw",
                                "top": "50%",
                                "transform": "translateY(-50%)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "panel-badge",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "badge-dot",
                                            style: {
                                                "background": "#FF6B00",
                                                "boxShadow": "0 0 8px #FF6B00"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 687,
                                            columnNumber: 42
                                        }, this),
                                        "VELOCIDAD LUZ ALCANZADA"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ather/page.tsx",
                                    lineNumber: 687,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "panel-title gs-title",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "grad",
                                            style: {
                                                "background": "linear-gradient(135deg, #FFD700, #FF006E)",
                                                "WebkitBackgroundClip": "text",
                                                "WebkitTextFillColor": "transparent"
                                            },
                                            children: "POTENCIA"
                                        }, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 689,
                                            columnNumber: 50
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 690,
                                            columnNumber: 165
                                        }, this),
                                        "ILIMITADA"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ather/page.tsx",
                                    lineNumber: 689,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "panel-sub gs-sub",
                                    children: [
                                        "HAS DESBLOQUEADO EL CÓDIGO FUENTE.",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/ather/page.tsx",
                                            lineNumber: 692,
                                            columnNumber: 79
                                        }, this),
                                        "EL UNIVERSO AHORA ES TUYO."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ather/page.tsx",
                                    lineNumber: 692,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        "marginTop": "20px"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        className: "panel-cta mag-btn",
                                        href: "/login",
                                        children: "COMENZAR AVENTURA ↗"
                                    }, void 0, false, {
                                        fileName: "[project]/app/ather/page.tsx",
                                        lineNumber: 694,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/ather/page.tsx",
                                    lineNumber: 693,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ather/page.tsx",
                            lineNumber: 686,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/ather/page.tsx",
                    lineNumber: 653,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/ather/page.tsx",
                lineNumber: 652,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "phase2-overlay",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "big-label",
                        children: "NIVEL"
                    }, void 0, false, {
                        fileName: "[project]/app/ather/page.tsx",
                        lineNumber: 703,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "big-num",
                        children: "01"
                    }, void 0, false, {
                        fileName: "[project]/app/ather/page.tsx",
                        lineNumber: 704,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sub-text",
                        children: "EXPLORADOR DEL COSMOS"
                    }, void 0, false, {
                        fileName: "[project]/app/ather/page.tsx",
                        lineNumber: 705,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/ather/page.tsx",
                lineNumber: 702,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "scroll-hint",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "arrow"
                    }, void 0, false, {
                        fileName: "[project]/app/ather/page.tsx",
                        lineNumber: 710,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "SCROLLEAR"
                    }, void 0, false, {
                        fileName: "[project]/app/ather/page.tsx",
                        lineNumber: 711,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/ather/page.tsx",
                lineNumber: 709,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(AthernixitoPage, "8puyVO4ts1RhCfXUmci3vLI3Njw=");
_c = AthernixitoPage;
var _c;
__turbopack_context__.k.register(_c, "AthernixitoPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_ather_page_tsx_0wy95jq._.js.map