// @ts-nocheck
'use client';

import { useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const moduleConfigs = {
  history: {
    number: '01 / 03',
    tag: 'EJE_CULTURAL',
    eyebrow: 'PATRIMONIO_DIGITAL',
    title: ['HISTORIA', 'VIVA VR'],
    status: 'EN_DESARROLLO / DEMO INTERACTIVA',
    accent: '#FF006E',
    accentSoft: 'rgba(255,0,110,.2)',
    gradient: 'linear-gradient(135deg,#FF006E,#FFD700,#FF6B00)',
    description:
      'Explora las ruinas mayas de El Salvador en una experiencia interactiva donde el pasado cobra vida. Camina entre estructuras reconstruidas, artefactos vivos y capas de aprendizaje inmersivo.',
    features: ['RECONSTRUCCION 3D', 'GAMIFICACION', 'EDUCACION XR', 'FOTOGRAMETRIA'],
    metrics: [['50K+', 'puntos por segundo'], ['4K', 'gemelo digital'], ['UNESCO', 'Joya de Ceren']],
    hint: 'ARRASTRA PARA EXPLORAR / RUEDA PARA ZOOM',
    next: '/modulos/svirtual-tours',
  },
  tours: {
    number: '02 / 03',
    tag: 'EJE_TURISMO',
    eyebrow: 'TURISMO_DIGITAL',
    title: ['SVIRTUAL', 'TOURS'],
    status: 'BETA_ACTIVA / EN OPERACION',
    accent: '#FF6B00',
    accentSoft: 'rgba(255,107,0,.22)',
    gradient: 'linear-gradient(135deg,#FF6B00,#FFD700,#FF006E)',
    description:
      'Recorre El Salvador desde cualquier rincon del mundo. Volcanes, lagos, rutas culturales y costa del Pacifico se conectan con guias IA en tiempo real.',
    features: ['GUIA IA EN VIVO', '127+ DESTINOS', '18 IDIOMAS', 'TOURS 360'],
    metrics: [['127+', 'destinos curados'], ['24/7', 'asistencia IA'], ['360', 'rutas inmersivas']],
    hint: 'DRAG / SCROLL ZOOM / EXPLORA',
    next: '/modulos/mentelibre-vr',
  },
  mind: {
    number: '03 / 03',
    tag: 'EJE_SALUD_MENTAL',
    eyebrow: 'BIOFEEDBACK_TERAPEUTICO',
    title: ['MENTE', 'LIBRE VR'],
    status: 'LIVE / OPERACION CLINICA',
    accent: '#FFD700',
    accentSoft: 'rgba(255,215,0,.18)',
    gradient: 'linear-gradient(135deg,#FFD700,#FF6B00,#FF006E)',
    description:
      'Entornos virtuales terapeuticos para ansiedad, fobias y estres. La experiencia se adapta con biofeedback, exposicion gradual y senales de calma en tiempo real.',
    features: ['EXPOSICION GRADUAL', 'BIOFEEDBACK LIVE', '95% REDUCCION', 'IA ADAPTATIVA'],
    metrics: [['95%', 'reduccion simulada'], ['5 ms', 'respuesta adaptativa'], ['3', 'entornos terapeuticos']],
    hint: 'DRAG / ZOOM / RESPIRA',
    next: '/modulos/historia-viva',
  },
};

function disposeScene(scene) {
  scene.traverse((object) => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) {
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => material.dispose());
    }
  });
}

function addParticleField(scene, palette, count = 900) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const radius = 10 + Math.random() * 18;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
    positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius * 0.55;
    positions[i * 3 + 2] = Math.cos(phi) * radius;

    const color = new THREE.Color(palette[i % palette.length]);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  scene.add(points);
  return points;
}

function buildHistoryScene(scene) {
  scene.fog = new THREE.FogExp2(0x08000a, 0.035);
  const group = new THREE.Group();
  scene.add(group);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(52, 52, 42, 42),
    new THREE.MeshStandardMaterial({ color: 0x12061a, roughness: 0.92, metalness: 0.05 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.15;
  group.add(ground);

  const grid = new THREE.GridHelper(52, 46, 0xff006e, 0x2a1024);
  grid.position.y = -1.08;
  grid.material.transparent = true;
  grid.material.opacity = 0.16;
  group.add(grid);

  const materials = [0xff006e, 0xff6b00, 0xffd700].map(
    (color) => new THREE.MeshStandardMaterial({ color, emissive: new THREE.Color(color).multiplyScalar(0.18), roughness: 0.46 })
  );

  for (let i = 0; i < 6; i += 1) {
    const size = 8.6 - i * 1.15;
    const step = new THREE.Mesh(new THREE.BoxGeometry(size, 0.72, size * 0.82), materials[i % 3]);
    step.position.y = -0.65 + i * 0.75;
    step.castShadow = true;
    step.receiveShadow = true;
    group.add(step);
  }

  const shrine = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 1.5, 2.2),
    new THREE.MeshStandardMaterial({ color: 0xf4d6a0, emissive: 0x221000, roughness: 0.54 })
  );
  shrine.position.y = 4.25;
  shrine.castShadow = true;
  group.add(shrine);

  const glyphs = [];
  for (let i = 0; i < 18; i += 1) {
    const angle = (i / 18) * Math.PI * 2;
    const glyph = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.18 + Math.random() * 0.12),
      new THREE.MeshStandardMaterial({ color: i % 2 ? 0xffd700 : 0xff006e, emissiveIntensity: 0.9, roughness: 0.2 })
    );
    glyph.position.set(Math.cos(angle) * 7.8, 1 + Math.random() * 4, Math.sin(angle) * 7.8);
    glyph.userData = { angle, speed: 0.25 + Math.random() * 0.25, radius: 7.2 + Math.random() * 1.4 };
    glyphs.push(glyph);
    group.add(glyph);
  }

  const sun = new THREE.Mesh(
    new THREE.TorusGeometry(5.4, 0.035, 12, 160),
    new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xff6b00, emissiveIntensity: 0.35, transparent: true, opacity: 0.45 })
  );
  sun.rotation.x = Math.PI / 2.1;
  group.add(sun);

  const field = addParticleField(scene, ['#FF006E', '#FF6B00', '#FFD700'], 1200);

  return (time) => {
    group.rotation.y = Math.sin(time * 0.18) * 0.08;
    sun.rotation.z += 0.003;
    field.rotation.y += 0.0008;
    glyphs.forEach((glyph) => {
      glyph.userData.angle += glyph.userData.speed * 0.01;
      glyph.position.x = Math.cos(glyph.userData.angle) * glyph.userData.radius;
      glyph.position.z = Math.sin(glyph.userData.angle) * glyph.userData.radius;
      glyph.rotation.x += 0.012;
      glyph.rotation.y += 0.018;
    });
  };
}

function buildToursScene(scene) {
  scene.fog = new THREE.Fog(0x08000a, 35, 120);
  const group = new THREE.Group();
  scene.add(group);

  const terrainGeometry = new THREE.PlaneGeometry(58, 58, 72, 72);
  const position = terrainGeometry.attributes.position;
  const colors = new Float32Array(position.count * 3);
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const height = Math.sin(x * 0.2) * Math.cos(y * 0.16) * 1.8 + Math.sin((x + y) * 0.09) * 2.2;
    position.setZ(i, height);
    const color = new THREE.Color(height > 1.8 ? '#FFB000' : height > 0 ? '#553016' : '#132032');
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  terrainGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  terrainGeometry.computeVertexNormals();
  const terrain = new THREE.Mesh(terrainGeometry, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.82, metalness: 0.08 }));
  terrain.rotation.x = -Math.PI / 2;
  terrain.position.y = -4.5;
  terrain.receiveShadow = true;
  group.add(terrain);

  const beacons = [
    [-16, -10, 0xff6b00, 2.8],
    [12, -7, 0x0088ff, 2.2],
    [7, 14, 0xff006e, 2.4],
    [-9, 19, 0xffd700, 1.8],
    [-23, 8, 0xff8844, 1.6],
  ].map(([x, z, color, size]) => {
    const beacon = new THREE.Group();
    beacon.position.set(x, -2, z);
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(size, size * 2.2, 28),
      new THREE.MeshStandardMaterial({ color, emissive: new THREE.Color(color).multiplyScalar(0.35), transparent: true, opacity: 0.85 })
    );
    cone.position.y = size;
    cone.castShadow = true;
    beacon.add(cone);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(size * 1.35, 0.04, 8, 80), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55 }));
    ring.rotation.x = Math.PI / 2;
    beacon.add(ring);
    const light = new THREE.PointLight(color, 1.6, 16);
    light.position.y = size * 2.5;
    beacon.add(light);
    group.add(beacon);
    return beacon;
  });

  const globe = new THREE.Group();
  globe.position.set(0, 8, -14);
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(4.2, 48, 48), new THREE.MeshStandardMaterial({ color: 0x102044, emissive: 0x061224, metalness: 0.25, transparent: true, opacity: 0.68 })));
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(4.28, 24, 24), new THREE.MeshBasicMaterial({ color: 0xffd700, wireframe: true, transparent: true, opacity: 0.18 })));
  const routes = [];
  for (let i = 0; i < 7; i += 1) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(5.2 + i * 0.45, 0.018, 8, 160), new THREE.MeshBasicMaterial({ color: i % 2 ? 0xff006e : 0xff6b00, transparent: true, opacity: 0.18 }));
    ring.rotation.x = Math.PI / 2 + i * 0.12;
    ring.rotation.z = i * 0.35;
    routes.push(ring);
    globe.add(ring);
  }
  group.add(globe);
  const field = addParticleField(scene, ['#FF6B00', '#FFD700', '#FF006E'], 1000);

  return (time) => {
    group.rotation.y = Math.sin(time * 0.1) * 0.06;
    globe.rotation.y += 0.004;
    field.rotation.y -= 0.0007;
    routes.forEach((route, index) => {
      route.rotation.z += 0.002 + index * 0.0002;
    });
    beacons.forEach((beacon, index) => {
      beacon.scale.setScalar(1 + Math.sin(time * 2 + index) * 0.08);
      beacon.rotation.y += 0.004;
    });
  };
}

function buildMindScene(scene) {
  scene.fog = new THREE.Fog(0x08000a, 30, 95);
  const group = new THREE.Group();
  scene.add(group);

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(68, 68, 32, 32), new THREE.MeshStandardMaterial({ color: 0x09030e, roughness: 0.94 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -7.5;
  group.add(floor);

  const brain = new THREE.Group();
  brain.position.y = 1.3;
  group.add(brain);

  const makeHemisphere = (side, color) => {
    const geometry = new THREE.SphereGeometry(3.4, 48, 48);
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i += 1) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);
      const ripple = Math.sin(x * 4.1) * Math.cos(y * 3.2) * Math.sin(z * 4.8) * 0.22;
      position.setXYZ(i, x * 0.72, y * 0.84 + ripple, z);
    }
    geometry.computeVertexNormals();
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, emissive: new THREE.Color(color).multiplyScalar(0.22), roughness: 0.38, transparent: true, opacity: 0.88 }));
    mesh.position.x = side * 1.8;
    mesh.castShadow = true;
    return mesh;
  };

  brain.add(makeHemisphere(-1, 0xffd700));
  brain.add(makeHemisphere(1, 0xff6b00));

  const nodes = [];
  const nodeMaterial = new THREE.MeshStandardMaterial({ color: 0xff006e, emissive: 0xff006e, emissiveIntensity: 0.7, roughness: 0.1 });
  for (let i = 0; i < 52; i += 1) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const side = i % 2 ? 1 : -1;
    const node = new THREE.Mesh(new THREE.SphereGeometry(0.08 + Math.random() * 0.06, 10, 10), nodeMaterial);
    node.position.set(side * 1.8 + Math.sin(phi) * Math.cos(theta) * 2.4, Math.sin(phi) * Math.sin(theta) * 2.35, Math.cos(phi) * 2.9);
    node.userData = { phase: Math.random() * Math.PI * 2 };
    nodes.push(node);
    brain.add(node);
  }

  const rings = [];
  for (let i = 0; i < 9; i += 1) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(6 + i * 0.95, 0.025, 8, 160),
      new THREE.MeshStandardMaterial({ color: i % 2 ? 0xffd700 : 0xff006e, emissive: i % 2 ? 0xffd700 : 0xff006e, emissiveIntensity: 0.3, transparent: true, opacity: 0.07 + i * 0.006 })
    );
    ring.rotation.x = Math.PI / 2 + i * 0.11;
    ring.rotation.z = i * 0.2;
    ring.userData = { dir: i % 2 ? 1 : -1 };
    rings.push(ring);
    group.add(ring);
  }

  const field = addParticleField(scene, ['#FFD700', '#FF006E', '#FF6B00'], 1100);

  return (time) => {
    brain.scale.setScalar(1 + Math.sin(time * 0.75) * 0.045);
    brain.rotation.y += 0.004;
    field.rotation.y += 0.0006;
    rings.forEach((ring) => {
      ring.rotation.z += ring.userData.dir * 0.002;
      ring.scale.setScalar(1 + Math.sin(time * 0.9) * 0.03);
    });
    nodes.forEach((node) => {
      node.scale.setScalar(1 + Math.sin(time * 2.2 + node.userData.phase) * 0.28);
    });
  };
}

export default function ModuleExperience({ moduleKey }) {
  const canvasRef = useRef(null);
  const config = useMemo(() => moduleConfigs[moduleKey], [moduleKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !config) return undefined;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#08000a');
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 400);
    if (moduleKey === 'history') camera.position.set(9, 6, 13);
    if (moduleKey === 'tours') camera.position.set(0, 18, 43);
    if (moduleKey === 'mind') camera.position.set(0, 8, 25);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = moduleKey === 'tours' ? 22 : 10;
    controls.maxDistance = moduleKey === 'tours' ? 64 : 36;
    controls.autoRotate = true;
    controls.autoRotateSpeed = moduleKey === 'mind' ? 0.35 : 0.45;
    controls.target.set(0, moduleKey === 'mind' ? 1 : 0, 0);

    scene.add(new THREE.AmbientLight(0x2a1018, 2.8));
    const keyLight = new THREE.DirectionalLight(0xffddcc, 1.7);
    keyLight.position.set(10, 16, 11);
    keyLight.castShadow = true;
    scene.add(keyLight);
    const accentLight = new THREE.PointLight(config.accent, 2.5, 60);
    accentLight.position.set(-10, 4, 8);
    scene.add(accentLight);
    const goldLight = new THREE.PointLight(0xffd700, 1.6, 40);
    goldLight.position.set(7, 8, -9);
    scene.add(goldLight);

    const updateScene = { history: buildHistoryScene, tours: buildToursScene, mind: buildMindScene }[moduleKey](scene);
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      updateScene(clock.getElapsedTime());
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      disposeScene(scene);
      renderer.dispose();
    };
  }, [config, moduleKey]);

  if (!config) return null;

  return (
    <section
      className={`module-detail-page module-detail-${moduleKey}`}
      style={{
        '--detail-accent': config.accent,
        '--detail-accent-soft': config.accentSoft,
        '--detail-gradient': config.gradient,
      }}
    >
      <canvas ref={canvasRef} className="module-detail-canvas" aria-hidden="true" />
      <div className="module-detail-vignette" />

      <div className="module-detail-content">
        <div className="module-detail-panel">
          <p className="module-detail-number mono">{config.number}</p>
          <p className="module-detail-tag mono">[ {config.tag} / {config.eyebrow} ]</p>
          <h1 className="module-detail-title">
            {config.title[0]}
            <br />
            <span>{config.title[1]}</span>
          </h1>
          <p className="module-detail-copy">{config.description}</p>
          <div className="module-detail-status mono">
            <span />
            {config.status}
          </div>
          <div className="module-detail-features">
            {config.features.map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
          <div className="module-detail-metrics">
            {config.metrics.map(([value, label]) => (
              <div key={value}>
                <strong>{value}</strong>
                <small>{label}</small>
              </div>
            ))}
          </div>
          <div className="module-detail-actions">
            <Link href="/modulos" className="module-detail-secondary">VOLVER A MODULOS</Link>
            <Link href={config.next} className="module-detail-primary">SIGUIENTE EJE</Link>
          </div>
        </div>
      </div>

      {moduleKey === 'mind' && (
        <div className="module-breath-ui" aria-hidden="true">
          <div className="module-breath-circle"><div /></div>
          <span className="mono">RESPIRA</span>
        </div>
      )}

      <div className="module-detail-switcher mono">
        <Link href="/modulos/historia-viva" className={moduleKey === 'history' ? 'active' : ''}>HISTORIA</Link>
        <Link href="/modulos/svirtual-tours" className={moduleKey === 'tours' ? 'active' : ''}>TOURS</Link>
        <Link href="/modulos/mentelibre-vr" className={moduleKey === 'mind' ? 'active' : ''}>MENTELIBRE</Link>
      </div>
      <div className="module-detail-hint mono">{config.hint}</div>
    </section>
  );
}
