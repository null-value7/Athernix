(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/ModuleExperience.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModuleExperience,
    "moduleConfigs",
    ()=>moduleConfigs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/controls/OrbitControls.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// @ts-nocheck
'use client';
;
;
;
;
const moduleConfigs = {
    history: {
        number: '01 / 03',
        tag: 'EJE_CULTURAL',
        eyebrow: 'PATRIMONIO_DIGITAL',
        title: [
            'HISTORIA',
            'VIVA VR'
        ],
        status: 'EN_DESARROLLO / DEMO INTERACTIVA',
        accent: '#FF006E',
        accentSoft: 'rgba(255,0,110,.2)',
        gradient: 'linear-gradient(135deg,#FF006E,#FFD700,#FF6B00)',
        description: 'Explora las ruinas mayas de El Salvador en una experiencia interactiva donde el pasado cobra vida. Camina entre estructuras reconstruidas, artefactos vivos y capas de aprendizaje inmersivo.',
        features: [
            'RECONSTRUCCION 3D',
            'GAMIFICACION',
            'EDUCACION XR',
            'FOTOGRAMETRIA'
        ],
        metrics: [
            [
                '50K+',
                'puntos por segundo'
            ],
            [
                '4K',
                'gemelo digital'
            ],
            [
                'UNESCO',
                'Joya de Ceren'
            ]
        ],
        hint: 'ARRASTRA PARA EXPLORAR / RUEDA PARA ZOOM',
        next: '/modulos/svirtual-tours'
    },
    tours: {
        number: '02 / 03',
        tag: 'EJE_TURISMO',
        eyebrow: 'TURISMO_DIGITAL',
        title: [
            'SVIRTUAL',
            'TOURS'
        ],
        status: 'BETA_ACTIVA / EN OPERACION',
        accent: '#FF6B00',
        accentSoft: 'rgba(255,107,0,.22)',
        gradient: 'linear-gradient(135deg,#FF6B00,#FFD700,#FF006E)',
        description: 'Recorre El Salvador desde cualquier rincon del mundo. Volcanes, lagos, rutas culturales y costa del Pacifico se conectan con guias IA en tiempo real.',
        features: [
            'GUIA IA EN VIVO',
            '127+ DESTINOS',
            '18 IDIOMAS',
            'TOURS 360'
        ],
        metrics: [
            [
                '127+',
                'destinos curados'
            ],
            [
                '24/7',
                'asistencia IA'
            ],
            [
                '360',
                'rutas inmersivas'
            ]
        ],
        hint: 'DRAG / SCROLL ZOOM / EXPLORA',
        next: '/modulos/mentelibre-vr'
    },
    mind: {
        number: '03 / 03',
        tag: 'EJE_SALUD_MENTAL',
        eyebrow: 'BIOFEEDBACK_TERAPEUTICO',
        title: [
            'MENTE',
            'LIBRE VR'
        ],
        status: 'LIVE / OPERACION CLINICA',
        accent: '#FFD700',
        accentSoft: 'rgba(255,215,0,.18)',
        gradient: 'linear-gradient(135deg,#FFD700,#FF6B00,#FF006E)',
        description: 'Entornos virtuales terapeuticos para ansiedad, fobias y estres. La experiencia se adapta con biofeedback, exposicion gradual y senales de calma en tiempo real.',
        features: [
            'EXPOSICION GRADUAL',
            'BIOFEEDBACK LIVE',
            '95% REDUCCION',
            'IA ADAPTATIVA'
        ],
        metrics: [
            [
                '95%',
                'reduccion simulada'
            ],
            [
                '5 ms',
                'respuesta adaptativa'
            ],
            [
                '3',
                'entornos terapeuticos'
            ]
        ],
        hint: 'DRAG / ZOOM / RESPIRA',
        next: '/modulos/historia-viva'
    }
};
function disposeScene(scene) {
    scene.traverse((object)=>{
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
            const materials = Array.isArray(object.material) ? object.material : [
                object.material
            ];
            materials.forEach((material)=>material.dispose());
        }
    });
}
function addParticleField(scene, palette, count = 900) {
    const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for(let i = 0; i < count; i += 1){
        const radius = 10 + Math.random() * 18;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
        positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius * 0.55;
        positions[i * 3 + 2] = Math.cos(phi) * radius;
        const color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](palette[i % palette.length]);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }
    geometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
    geometry.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](colors, 3));
    const points = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](geometry, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointsMaterial"]({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"]
    }));
    scene.add(points);
    return points;
}
function buildHistoryScene(scene) {
    scene.fog = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FogExp2"](0x08000a, 0.035);
    const group = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    scene.add(group);
    const ground = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](52, 52, 42, 42), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: 0x12061a,
        roughness: 0.92,
        metalness: 0.05
    }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.15;
    group.add(ground);
    const grid = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GridHelper"](52, 46, 0xff006e, 0x2a1024);
    grid.position.y = -1.08;
    grid.material.transparent = true;
    grid.material.opacity = 0.16;
    group.add(grid);
    const materials = [
        0xff006e,
        0xff6b00,
        0xffd700
    ].map((color)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color,
            emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](color).multiplyScalar(0.18),
            roughness: 0.46
        }));
    for(let i = 0; i < 6; i += 1){
        const size = 8.6 - i * 1.15;
        const step = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](size, 0.72, size * 0.82), materials[i % 3]);
        step.position.y = -0.65 + i * 0.75;
        step.castShadow = true;
        step.receiveShadow = true;
        group.add(step);
    }
    const shrine = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](2.5, 1.5, 2.2), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: 0xf4d6a0,
        emissive: 0x221000,
        roughness: 0.54
    }));
    shrine.position.y = 4.25;
    shrine.castShadow = true;
    group.add(shrine);
    const glyphs = [];
    for(let i = 0; i < 18; i += 1){
        const angle = i / 18 * Math.PI * 2;
        const glyph = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.18 + Math.random() * 0.12), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: i % 2 ? 0xffd700 : 0xff006e,
            emissiveIntensity: 0.9,
            roughness: 0.2
        }));
        glyph.position.set(Math.cos(angle) * 7.8, 1 + Math.random() * 4, Math.sin(angle) * 7.8);
        glyph.userData = {
            angle,
            speed: 0.25 + Math.random() * 0.25,
            radius: 7.2 + Math.random() * 1.4
        };
        glyphs.push(glyph);
        group.add(glyph);
    }
    const sun = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](5.4, 0.035, 12, 160), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: 0xffd700,
        emissive: 0xff6b00,
        emissiveIntensity: 0.35,
        transparent: true,
        opacity: 0.45
    }));
    sun.rotation.x = Math.PI / 2.1;
    group.add(sun);
    const field = addParticleField(scene, [
        '#FF006E',
        '#FF6B00',
        '#FFD700'
    ], 1200);
    return (time)=>{
        group.rotation.y = Math.sin(time * 0.18) * 0.08;
        sun.rotation.z += 0.003;
        field.rotation.y += 0.0008;
        glyphs.forEach((glyph)=>{
            glyph.userData.angle += glyph.userData.speed * 0.01;
            glyph.position.x = Math.cos(glyph.userData.angle) * glyph.userData.radius;
            glyph.position.z = Math.sin(glyph.userData.angle) * glyph.userData.radius;
            glyph.rotation.x += 0.012;
            glyph.rotation.y += 0.018;
        });
    };
}
function buildToursScene(scene) {
    scene.fog = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fog"](0x08000a, 35, 120);
    const group = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    scene.add(group);
    const terrainGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](58, 58, 72, 72);
    const position = terrainGeometry.attributes.position;
    const colors = new Float32Array(position.count * 3);
    for(let i = 0; i < position.count; i += 1){
        const x = position.getX(i);
        const y = position.getY(i);
        const height = Math.sin(x * 0.2) * Math.cos(y * 0.16) * 1.8 + Math.sin((x + y) * 0.09) * 2.2;
        position.setZ(i, height);
        const color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](height > 1.8 ? '#FFB000' : height > 0 ? '#553016' : '#132032');
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }
    terrainGeometry.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](colors, 3));
    terrainGeometry.computeVertexNormals();
    const terrain = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](terrainGeometry, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        vertexColors: true,
        roughness: 0.82,
        metalness: 0.08
    }));
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -4.5;
    terrain.receiveShadow = true;
    group.add(terrain);
    const beacons = [
        [
            -16,
            -10,
            0xff6b00,
            2.8
        ],
        [
            12,
            -7,
            0x0088ff,
            2.2
        ],
        [
            7,
            14,
            0xff006e,
            2.4
        ],
        [
            -9,
            19,
            0xffd700,
            1.8
        ],
        [
            -23,
            8,
            0xff8844,
            1.6
        ]
    ].map(([x, z, color, size])=>{
        const beacon = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        beacon.position.set(x, -2, z);
        const cone = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConeGeometry"](size, size * 2.2, 28), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color,
            emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](color).multiplyScalar(0.35),
            transparent: true,
            opacity: 0.85
        }));
        cone.position.y = size;
        cone.castShadow = true;
        beacon.add(cone);
        const ring = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](size * 1.35, 0.04, 8, 80), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color,
            transparent: true,
            opacity: 0.55
        }));
        ring.rotation.x = Math.PI / 2;
        beacon.add(ring);
        const light = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointLight"](color, 1.6, 16);
        light.position.y = size * 2.5;
        beacon.add(light);
        group.add(beacon);
        return beacon;
    });
    const globe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    globe.position.set(0, 8, -14);
    globe.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](4.2, 48, 48), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: 0x102044,
        emissive: 0x061224,
        metalness: 0.25,
        transparent: true,
        opacity: 0.68
    })));
    globe.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](4.28, 24, 24), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
        color: 0xffd700,
        wireframe: true,
        transparent: true,
        opacity: 0.18
    })));
    const routes = [];
    for(let i = 0; i < 7; i += 1){
        const ring = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](5.2 + i * 0.45, 0.018, 8, 160), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: i % 2 ? 0xff006e : 0xff6b00,
            transparent: true,
            opacity: 0.18
        }));
        ring.rotation.x = Math.PI / 2 + i * 0.12;
        ring.rotation.z = i * 0.35;
        routes.push(ring);
        globe.add(ring);
    }
    group.add(globe);
    const field = addParticleField(scene, [
        '#FF6B00',
        '#FFD700',
        '#FF006E'
    ], 1000);
    return (time)=>{
        group.rotation.y = Math.sin(time * 0.1) * 0.06;
        globe.rotation.y += 0.004;
        field.rotation.y -= 0.0007;
        routes.forEach((route, index)=>{
            route.rotation.z += 0.002 + index * 0.0002;
        });
        beacons.forEach((beacon, index)=>{
            beacon.scale.setScalar(1 + Math.sin(time * 2 + index) * 0.08);
            beacon.rotation.y += 0.004;
        });
    };
}
function buildMindScene(scene) {
    scene.fog = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fog"](0x08000a, 30, 95);
    const group = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    scene.add(group);
    const floor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](68, 68, 32, 32), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: 0x09030e,
        roughness: 0.94
    }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -7.5;
    group.add(floor);
    const brain = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    brain.position.y = 1.3;
    group.add(brain);
    const makeHemisphere = (side, color)=>{
        const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](3.4, 48, 48);
        const position = geometry.attributes.position;
        for(let i = 0; i < position.count; i += 1){
            const x = position.getX(i);
            const y = position.getY(i);
            const z = position.getZ(i);
            const ripple = Math.sin(x * 4.1) * Math.cos(y * 3.2) * Math.sin(z * 4.8) * 0.22;
            position.setXYZ(i, x * 0.72, y * 0.84 + ripple, z);
        }
        geometry.computeVertexNormals();
        const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geometry, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color,
            emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](color).multiplyScalar(0.22),
            roughness: 0.38,
            transparent: true,
            opacity: 0.88
        }));
        mesh.position.x = side * 1.8;
        mesh.castShadow = true;
        return mesh;
    };
    brain.add(makeHemisphere(-1, 0xffd700));
    brain.add(makeHemisphere(1, 0xff6b00));
    const nodes = [];
    const nodeMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: 0xff006e,
        emissive: 0xff006e,
        emissiveIntensity: 0.7,
        roughness: 0.1
    });
    for(let i = 0; i < 52; i += 1){
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const side = i % 2 ? 1 : -1;
        const node = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.08 + Math.random() * 0.06, 10, 10), nodeMaterial);
        node.position.set(side * 1.8 + Math.sin(phi) * Math.cos(theta) * 2.4, Math.sin(phi) * Math.sin(theta) * 2.35, Math.cos(phi) * 2.9);
        node.userData = {
            phase: Math.random() * Math.PI * 2
        };
        nodes.push(node);
        brain.add(node);
    }
    const rings = [];
    for(let i = 0; i < 9; i += 1){
        const ring = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](6 + i * 0.95, 0.025, 8, 160), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: i % 2 ? 0xffd700 : 0xff006e,
            emissive: i % 2 ? 0xffd700 : 0xff006e,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.07 + i * 0.006
        }));
        ring.rotation.x = Math.PI / 2 + i * 0.11;
        ring.rotation.z = i * 0.2;
        ring.userData = {
            dir: i % 2 ? 1 : -1
        };
        rings.push(ring);
        group.add(ring);
    }
    const field = addParticleField(scene, [
        '#FFD700',
        '#FF006E',
        '#FF6B00'
    ], 1100);
    return (time)=>{
        brain.scale.setScalar(1 + Math.sin(time * 0.75) * 0.045);
        brain.rotation.y += 0.004;
        field.rotation.y += 0.0006;
        rings.forEach((ring)=>{
            ring.rotation.z += ring.userData.dir * 0.002;
            ring.scale.setScalar(1 + Math.sin(time * 0.9) * 0.03);
        });
        nodes.forEach((node)=>{
            node.scale.setScalar(1 + Math.sin(time * 2.2 + node.userData.phase) * 0.28);
        });
    };
}
function ModuleExperience({ moduleKey }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ModuleExperience.useMemo[config]": ()=>moduleConfigs[moduleKey]
    }["ModuleExperience.useMemo[config]"], [
        moduleKey
    ]);
    const [webGLError, setWebGLError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ModuleExperience.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas || !config) return undefined;
            // Check WebGL support
            const checkWebGL = {
                "ModuleExperience.useEffect.checkWebGL": ()=>{
                    try {
                        const canvas = document.createElement('canvas');
                        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
                        if (!gl) {
                            console.error('WebGL is not supported');
                            setWebGLError(true);
                            return false;
                        }
                        return true;
                    } catch (e) {
                        console.error('WebGL check failed:', e);
                        setWebGLError(true);
                        return false;
                    }
                }
            }["ModuleExperience.useEffect.checkWebGL"];
            if (!checkWebGL()) {
                return undefined;
            }
            let renderer;
            try {
                const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
                scene.background = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#08000a');
                const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](50, window.innerWidth / window.innerHeight, 0.1, 400);
                if (moduleKey === 'history') camera.position.set(9, 6, 13);
                if (moduleKey === 'tours') camera.position.set(0, 18, 43);
                if (moduleKey === 'mind') camera.position.set(0, 8, 25);
                renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                    canvas,
                    antialias: true
                });
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                renderer.shadowMap.enabled = true;
                renderer.toneMapping = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"];
                renderer.toneMappingExposure = 1.15;
                const controls = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"](camera, canvas);
                controls.enableDamping = true;
                controls.enablePan = false;
                controls.minDistance = moduleKey === 'tours' ? 22 : 10;
                controls.maxDistance = moduleKey === 'tours' ? 64 : 36;
                controls.autoRotate = true;
                controls.autoRotateSpeed = moduleKey === 'mind' ? 0.35 : 0.45;
                controls.target.set(0, moduleKey === 'mind' ? 1 : 0, 0);
                scene.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmbientLight"](0x2a1018, 2.8));
                const keyLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffddcc, 1.7);
                keyLight.position.set(10, 16, 11);
                keyLight.castShadow = true;
                scene.add(keyLight);
                const accentLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointLight"](config.accent, 2.5, 60);
                accentLight.position.set(-10, 4, 8);
                scene.add(accentLight);
                const goldLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointLight"](0xffd700, 1.6, 40);
                goldLight.position.set(7, 8, -9);
                scene.add(goldLight);
                const updateScene = ({
                    history: buildHistoryScene,
                    tours: buildToursScene,
                    mind: buildMindScene
                })[moduleKey](scene);
                const handleResize = {
                    "ModuleExperience.useEffect.handleResize": ()=>{
                        camera.aspect = window.innerWidth / window.innerHeight;
                        camera.updateProjectionMatrix();
                        renderer.setSize(window.innerWidth, window.innerHeight);
                    }
                }["ModuleExperience.useEffect.handleResize"];
                window.addEventListener('resize', handleResize);
                let frameId;
                const timer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timer"]();
                const animate = {
                    "ModuleExperience.useEffect.animate": ()=>{
                        frameId = requestAnimationFrame(animate);
                        updateScene(timer.getElapsed());
                        controls.update();
                        renderer.render(scene, camera);
                    }
                }["ModuleExperience.useEffect.animate"];
                animate();
                return ({
                    "ModuleExperience.useEffect": ()=>{
                        cancelAnimationFrame(frameId);
                        window.removeEventListener('resize', handleResize);
                        controls.dispose();
                        disposeScene(scene);
                        renderer.dispose();
                    }
                })["ModuleExperience.useEffect"];
            } catch (error) {
                console.error('WebGL initialization failed:', error);
                setWebGLError(true);
                return undefined;
            }
        }
    }["ModuleExperience.useEffect"], [
        config,
        moduleKey
    ]);
    if (!config) return null;
    if (webGLError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: `module-detail-page module-detail-${moduleKey}`,
            style: {
                '--detail-accent': config.accent,
                '--detail-accent-soft': config.accentSoft,
                '--detail-gradient': config.gradient
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "module-detail-content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "module-detail-panel",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "module-detail-number mono",
                            children: config.number
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 454,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "module-detail-tag mono",
                            children: [
                                "[ ",
                                config.tag,
                                " / ",
                                config.eyebrow,
                                " ]"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 455,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "module-detail-title",
                            children: [
                                config.title[0],
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                                    lineNumber: 458,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: config.title[1]
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                                    lineNumber: 459,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 456,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "module-detail-copy",
                            children: config.description
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 461,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "module-detail-status mono",
                            style: {
                                color: '#ff6b35'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                                    lineNumber: 463,
                                    columnNumber: 15
                                }, this),
                                "WEBGL NO DISPONIBLE"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 462,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: 'rgba(255,255,255,0.6)',
                                marginTop: '20px',
                                fontSize: '0.9rem'
                            },
                            children: "Tu navegador no soporta WebGL. Por favor actualiza tu navegador o usa uno compatible para ver la experiencia 3D."
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 466,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "module-detail-features",
                            children: config.features.map((feature)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: feature
                                }, feature, false, {
                                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                                    lineNumber: 471,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 469,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "module-detail-metrics",
                            children: config.metrics.map(([value, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: value
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                                            lineNumber: 477,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                                            lineNumber: 478,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, value, true, {
                                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                                    lineNumber: 476,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 474,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "module-detail-actions",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/modulos",
                                    className: "module-detail-secondary",
                                    children: "VOLVER A MODULOS"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                                    lineNumber: 483,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: config.next,
                                    className: "module-detail-primary",
                                    children: "SIGUIENTE EJE"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                                    lineNumber: 484,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 482,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                    lineNumber: 453,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/ModuleExperience.tsx",
                lineNumber: 452,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ui/ModuleExperience.tsx",
            lineNumber: 444,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: `module-detail-page module-detail-${moduleKey}`,
        style: {
            '--detail-accent': config.accent,
            '--detail-accent-soft': config.accentSoft,
            '--detail-gradient': config.gradient
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "module-detail-canvas",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/ui/ModuleExperience.tsx",
                lineNumber: 501,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "module-detail-vignette"
            }, void 0, false, {
                fileName: "[project]/components/ui/ModuleExperience.tsx",
                lineNumber: 502,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "module-detail-content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "module-detail-panel",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "module-detail-number mono",
                            children: config.number
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 506,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "module-detail-tag mono",
                            children: [
                                "[ ",
                                config.tag,
                                " / ",
                                config.eyebrow,
                                " ]"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 507,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "module-detail-title",
                            children: [
                                config.title[0],
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                                    lineNumber: 510,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: config.title[1]
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                                    lineNumber: 511,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 508,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "module-detail-copy",
                            children: config.description
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 513,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "module-detail-status mono",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                                    lineNumber: 515,
                                    columnNumber: 13
                                }, this),
                                config.status
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 514,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "module-detail-features",
                            children: config.features.map((feature)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: feature
                                }, feature, false, {
                                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                                    lineNumber: 520,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 518,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "module-detail-metrics",
                            children: config.metrics.map(([value, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: value
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                                            lineNumber: 526,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                                            lineNumber: 527,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, value, true, {
                                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                                    lineNumber: 525,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 523,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "module-detail-actions",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/modulos",
                                    className: "module-detail-secondary",
                                    children: "VOLVER A MODULOS"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                                    lineNumber: 532,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: config.next,
                                    className: "module-detail-primary",
                                    children: "SIGUIENTE EJE"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                                    lineNumber: 533,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 531,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/ModuleExperience.tsx",
                    lineNumber: 505,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/ModuleExperience.tsx",
                lineNumber: 504,
                columnNumber: 7
            }, this),
            moduleKey === 'mind' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "module-breath-ui",
                "aria-hidden": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "module-breath-circle",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                            fileName: "[project]/components/ui/ModuleExperience.tsx",
                            lineNumber: 540,
                            columnNumber: 49
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/ModuleExperience.tsx",
                        lineNumber: 540,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mono",
                        children: "RESPIRA"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/ModuleExperience.tsx",
                        lineNumber: 541,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/ModuleExperience.tsx",
                lineNumber: 539,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "module-detail-switcher mono",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/modulos/history",
                        className: moduleKey === 'history' ? 'active' : '',
                        children: "HISTORIA"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/ModuleExperience.tsx",
                        lineNumber: 546,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/modulos/tours",
                        className: moduleKey === 'tours' ? 'active' : '',
                        children: "TOURS"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/ModuleExperience.tsx",
                        lineNumber: 547,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/modulos/brain",
                        className: moduleKey === 'mind' ? 'active' : '',
                        children: "MENTELIBRE"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/ModuleExperience.tsx",
                        lineNumber: 548,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/ModuleExperience.tsx",
                lineNumber: 545,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "module-detail-hint mono",
                children: config.hint
            }, void 0, false, {
                fileName: "[project]/components/ui/ModuleExperience.tsx",
                lineNumber: 550,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/ModuleExperience.tsx",
        lineNumber: 493,
        columnNumber: 5
    }, this);
}
_s(ModuleExperience, "5NyrTP4OVycMB2BgtU4PJKmnLTE=");
_c = ModuleExperience;
var _c;
__turbopack_context__.k.register(_c, "ModuleExperience");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_ui_ModuleExperience_tsx_0v28mti._.js.map