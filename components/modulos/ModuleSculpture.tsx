'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type SculptureKind = 'pyramid' | 'globe' | 'brain';

type SculptureProps = {
  kind: SculptureKind;
  colors: [string, string, string];
  className?: string;
};

/* ── Samplers de forma: [pos, group] — group 0 = estructura, 1 = órbita ── */
function samplePyramid(i: number, N: number): [THREE.Vector3, number] {
  const t = i / N;
  if (t < 0.58) {
    const level = Math.floor(Math.random() * 7);
    const frac = level / 7;
    const w = 2.6 * (1 - frac * 0.72);
    return [
      new THREE.Vector3(
        (Math.random() - 0.5) * w * 2,
        -1.9 + frac * 3.4 + (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * w * 1.35
      ),
      0,
    ];
  }
  if (t < 0.78) {
    const ang = Math.random() * Math.PI;
    const r = 1.35 + (Math.random() - 0.5) * 0.2;
    return [
      new THREE.Vector3(Math.cos(ang) * r, 1.5 + Math.sin(ang) * r, (Math.random() - 0.5) * 0.4),
      0,
    ];
  }
  const r = 2.2 + Math.random() * 2.2;
  const a = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  return [
    new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(a),
      r * Math.sin(phi) * Math.sin(a) * 0.55,
      r * Math.cos(phi) * 0.55
    ),
    1,
  ];
}

function sampleGlobe(i: number, N: number): [THREE.Vector3, number] {
  const t = i / N;
  if (t < 0.68) {
    const r = 2.5 + (Math.random() - 0.5) * 0.16;
    const a = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    return [
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(a),
        r * Math.sin(phi) * Math.sin(a),
        r * Math.cos(phi)
      ),
      0,
    ];
  }
  if (t < 0.82) {
    const lat = (Math.random() - 0.5) * Math.PI;
    const lon = Math.random() * Math.PI * 2;
    const r = 2.52;
    return [
      new THREE.Vector3(r * Math.cos(lat) * Math.cos(lon), r * Math.sin(lat), r * Math.cos(lat) * Math.sin(lon)),
      0,
    ];
  }
  const orb = 3.3 + Math.random() * 0.9;
  const a = Math.random() * Math.PI * 2;
  return [new THREE.Vector3(Math.cos(a) * orb, (Math.random() - 0.5) * 0.9, Math.sin(a) * orb), 1];
}

function sampleBrain(i: number, N: number): [THREE.Vector3, number] {
  const t = i / N;
  if (t < 0.76) {
    const side = t < 0.38 ? -1 : 1;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    const r = 1.55 + Math.sin(th * 5) * 0.26;
    return [
      new THREE.Vector3(
        side * 1.0 + side * -r * Math.sin(ph) * Math.cos(th) * 0.72,
        r * Math.sin(ph) * Math.sin(th) * 0.62,
        r * Math.cos(ph) * 0.8
      ),
      0,
    ];
  }
  const turns = 6;
  const u = Math.random();
  const ang = u * Math.PI * 2 * turns;
  const r = 2.0 + u * 1.1;
  const spread = (Math.random() - 0.5) * 0.28;
  return [
    new THREE.Vector3(
      Math.cos(ang) * (r + spread),
      (u - 0.5) * 4.2 + (Math.random() - 0.5) * 0.18,
      Math.sin(ang) * (r + spread)
    ),
    1,
  ];
}

const SAMPLERS: Record<SculptureKind, (i: number, n: number) => [THREE.Vector3, number]> = {
  pyramid: samplePyramid,
  globe: sampleGlobe,
  brain: sampleBrain,
};

const VERT = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uScale;
uniform float uHover;
uniform float uBurst;
uniform float uSway;
uniform float uBreathe;
uniform float uOrbitSpeed;
uniform vec3 uRepel;

attribute float aGroup;
attribute vec3 aSeed;
attribute vec3 aColor;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vec3 p = position;
  float s1 = aSeed.x, s2 = aSeed.y, s3 = aSeed.z;

  if (aGroup > 0.5) {
    float ang = uTime * uOrbitSpeed * (0.35 + s1 * 0.65);
    float c = cos(ang), s = sin(ang);
    p = vec3(
      p.x * c - p.z * s,
      p.y + sin(uTime * 0.55 + s2) * 0.09,
      p.x * s + p.z * c
    );
  } else {
    float breathe = 1.0 + sin(uTime * uBreathe + s3 * 6.2831) * 0.035;
    p *= breathe;
    p.x += sin(uTime * 0.5 + s1) * uSway;
    p.y += cos(uTime * 0.42 + s2) * uSway;
    p.z += sin(uTime * 0.6 + s3) * uSway * 0.7;
  }

  vec3 n = normalize(p + vec3(0.0001));
  p += n * (uHover * (0.07 + 0.13 * sin(uTime * 2.0 + s1 * 8.0)));
  p += n * uBurst * (0.45 + s2) * 1.7;

  vec3 diff = p - uRepel;
  float d = length(diff);
  float force = smoothstep(1.9, 0.0, d);
  p += normalize(diff + vec3(0.0001)) * force * 0.7;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  float tw = 0.72 + 0.28 * sin(uTime * (1.4 + s3) + s1 * 10.0);
  vAlpha = tw;
  vColor = aColor * (1.0 + uHover * 0.7 + uBurst * 1.6);

  gl_PointSize = uSize * uScale * tw
    * (1.0 + uHover * 0.5 + uBurst * 0.9)
    / -mv.z;
}
`;

const FRAG = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float core = smoothstep(0.5, 0.06, d);
  float glow = smoothstep(0.5, 0.0, d) * 0.4;
  float a = core + glow;
  if (a < 0.012) discard;
  gl_FragColor = vec4(vColor, a * vAlpha);
}
`;

const CONFIG: Record<SculptureKind, { count: number; size: number; camZ: number; sway: number; breathe: number; orbit: number }> = {
  pyramid: { count: 20000, size: 0.052, camZ: 8.6, sway: 0.045, breathe: 0.5, orbit: 0.35 },
  globe: { count: 19000, size: 0.048, camZ: 8.2, sway: 0.03, breathe: 0.4, orbit: 0.5 },
  brain: { count: 21000, size: 0.046, camZ: 8.6, sway: 0.035, breathe: 0.8, orbit: 0.28 },
};

export function ModuleSculpture({ kind, colors, className }: SculptureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cfg = CONFIG[kind];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionK = reduced ? 0.25 : 1;

    const W = canvas.offsetWidth || 520;
    const H = canvas.offsetHeight || 520;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 0, cfg.camZ);

    /* ── Partículas GPU ── */
    const N = cfg.count;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const seed = new Float32Array(N * 3);
    const grp = new Float32Array(N);

    const cA = new THREE.Color(colors[0]);
    const cB = new THREE.Color(colors[1]);
    const cC = new THREE.Color(colors[2]);
    const tmp = new THREE.Color();

    const sampler = SAMPLERS[kind];
    for (let i = 0; i < N; i++) {
      const [v, g] = sampler(i, N);
      pos[i * 3] = v.x; pos[i * 3 + 1] = v.y; pos[i * 3 + 2] = v.z;
      grp[i] = g;

      const t = i / N;
      if (t < 0.5) tmp.lerpColors(cA, cB, t * 2);
      else tmp.lerpColors(cB, cC, (t - 0.5) * 2);
      col[i * 3] = tmp.r; col[i * 3 + 1] = tmp.g; col[i * 3 + 2] = tmp.b;

      seed[i * 3] = Math.random() * 100;
      seed[i * 3 + 1] = Math.random();
      seed[i * 3 + 2] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 3));
    geo.setAttribute('aGroup', new THREE.BufferAttribute(grp, 1));

    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: cfg.size },
      uScale: { value: 1 },
      uHover: { value: 0 },
      uBurst: { value: 0 },
      uSway: { value: cfg.sway * motionK },
      uBreathe: { value: cfg.breathe * motionK },
      uOrbitSpeed: { value: cfg.orbit * motionK },
      uRepel: { value: new THREE.Vector3(999, 999, 999) },
    };

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const updateScale = () => {
      uniforms.uScale.value = renderer.domElement.height * 0.5 * camera.projectionMatrix.elements[5];
    };
    updateScale();

    const points = new THREE.Points(geo, mat);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    /* ── Anillos holográficos decorativos ── */
    const ringMat1 = new THREE.MeshBasicMaterial({ color: colors[0], transparent: true, opacity: 0.28 });
    const ringMat2 = new THREE.MeshBasicMaterial({ color: colors[2], transparent: true, opacity: 0.18 });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.012, 8, 140), ringMat1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.9, 0.01, 8, 140), ringMat2);
    ring1.rotation.x = Math.PI / 2.2;
    ring2.rotation.x = Math.PI / 1.8;
    ring2.rotation.y = 0.5;
    scene.add(ring1, ring2);

    /* ── Interacción: drag-rotate + repel + hover + burst ── */
    let targetRX = 0, targetRY = 0;
    let hoverT = 0, hover = 0;
    let burst = 0;
    let dragging = false;
    let px = 0, py = 0;

    const ndc = new THREE.Vector2(10, 10);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const hit = new THREE.Vector3();
    const local = new THREE.Vector3();

    const updatePointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };

    const onMove = (e: PointerEvent) => {
      updatePointer(e);
      if (dragging) {
        targetRY += (e.clientX - px) * 0.006;
        targetRX += (e.clientY - py) * 0.004;
        targetRX = Math.max(-0.9, Math.min(0.9, targetRX));
      }
      px = e.clientX; py = e.clientY;
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      px = e.clientX; py = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      canvas.style.cursor = 'grab';
    };
    const onEnter = () => { hoverT = 1; };
    const onLeave = () => {
      hoverT = 0;
      dragging = false;
      ndc.set(10, 10);
      canvas.style.cursor = 'grab';
    };
    const onClick = () => { burst = 1; };

    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointerenter', onEnter);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('click', onClick);
    canvas.style.cursor = 'grab';
    canvas.style.touchAction = 'pan-y';

    /* ── Loop ── */
    const timer = new THREE.Timer();
    let raf = 0;
    let visible = true;

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.05 });
    io.observe(canvas);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;

      const t = timer.getElapsed();
      uniforms.uTime.value = t;

      hover += (hoverT - hover) * 0.07;
      uniforms.uHover.value = hover;
      burst *= 0.94;
      uniforms.uBurst.value = burst;

      // repulsión del puntero en el plano z=0 del grupo
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        local.copy(hit);
        group.worldToLocal(local);
        uniforms.uRepel.value.lerp(local, 0.25);
      } else {
        uniforms.uRepel.value.lerp(new THREE.Vector3(999, 999, 999), 0.1);
      }

      if (!dragging) {
        targetRY += 0.0028 * motionK + hover * 0.003;
        targetRX *= 0.985;
      }
      group.rotation.y += (targetRY - group.rotation.y) * 0.08;
      group.rotation.x += (targetRX - group.rotation.x) * 0.08;

      ring1.rotation.z += 0.003 * motionK + hover * 0.006;
      ring2.rotation.z -= 0.002 * motionK + hover * 0.005;
      ring1.scale.setScalar(1 + hover * 0.04 + Math.sin(t * 0.8) * 0.015);
      ring2.scale.setScalar(1 + hover * 0.06 + Math.cos(t * 0.7) * 0.02);
      ringMat1.opacity = 0.28 + hover * 0.3;
      ringMat2.opacity = 0.18 + hover * 0.25;

      renderer.render(scene, camera);
    };
    animate();

    const ro = new ResizeObserver(() => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      updateScale();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointerenter', onEnter);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('click', onClick);
      geo.dispose();
      mat.dispose();
      ring1.geometry.dispose(); ring2.geometry.dispose();
      ringMat1.dispose(); ringMat2.dispose();
      renderer.dispose();
    };
  }, [kind, colors]);

  return <canvas ref={canvasRef} className={className} aria-label={`Escultura 3D ${kind}`} />;
}
