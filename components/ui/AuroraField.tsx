"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/*
 * AuroraField — fondo 3D compartido estilo "award-winning".
 * Océano de partículas ondulante calculado 100% en GPU (un solo draw call):
 *  - Olas de ruido fbm que se desplazan con el tiempo Y con el scroll.
 *  - Ripple que sigue al puntero.
 *  - La cámara orbita sutilmente al hacer scroll.
 * Optimizado: dpr limitado, sin antialias, pausa cuando la pestaña está oculta,
 * se desmonta con prefers-reduced-motion o con la opción "desactivar fondos 3D".
 */

const VERT = /* glsl */ `
uniform float uTime;
uniform float uScroll;
uniform vec2 uPointer;
attribute float aRand;
varying float vElev;
varying float vDepth;
varying float vRand;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main(){
  vec3 pos = position;
  float t = uTime * 0.1;

  float n  = fbm(pos.xz * 0.12 + vec2(t, -t * 0.6) + uScroll * 2.2);
  float n2 = fbm(pos.xz * 0.045 - vec2(t * 0.5, t * 0.25));
  pos.y += (n - 0.5) * 3.4 + (n2 - 0.5) * 6.2;

  float d = distance(pos.xz * vec2(0.028, 0.05), uPointer);
  pos.y += smoothstep(0.55, 0.0, d) * 1.7 * sin(uTime * 2.2 - d * 9.0);

  vElev = pos.y;
  vRand = aRand;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vDepth = -mv.z;
  gl_PointSize = (1.1 + aRand * 1.9) * (130.0 / max(vDepth, 1.0));
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uOpacity;
varying float vElev;
varying float vDepth;
varying float vRand;

void main(){
  vec2 uv = gl_PointCoord - 0.5;
  float alpha = smoothstep(0.5, 0.08, length(uv));

  float h = clamp(vElev * 0.16 + 0.5, 0.0, 1.0);
  vec3 col = h < 0.5 ? mix(uColorA, uColorB, h * 2.0) : mix(uColorB, uColorC, (h - 0.5) * 2.0);
  col *= 0.8 + vRand * 0.4;

  float fog = smoothstep(85.0, 25.0, vDepth);
  float a = alpha * uOpacity * fog;
  if (a < 0.012) discard;
  gl_FragColor = vec4(col, a);
}
`;

type WaveProps = { colorA: string; colorB: string; colorC: string; opacity: number };

function WaveField({ colorA, colorB, colorC, opacity }: WaveProps) {
  const group = useRef<THREE.Group>(null!);
  const scrollRef = useRef(0);

  const geometry = useMemo(() => {
    const cols = 220, rows = 120;
    const count = cols * rows;
    const pos = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        pos[i * 3] = (c / (cols - 1) - 0.5) * 120;
        pos[i * 3 + 1] = 0;
        pos[i * 3 + 2] = (r / (rows - 1) - 0.5) * 60;
        rand[i] = Math.random();
        i++;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uPointer: { value: new THREE.Vector2(99, 99) },
          uColorA: { value: new THREE.Color(colorA) },
          uColorB: { value: new THREE.Color(colorB) },
          uColorC: { value: new THREE.Color(colorC) },
          uOpacity: { value: opacity },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [colorA, colorB, colorC, opacity]
  );

  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);

  useFrame(({ clock, pointer }) => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const target = window.scrollY / max;
    scrollRef.current += (target - scrollRef.current) * 0.06;

    material.uniforms.uTime.value = clock.getElapsedTime();
    material.uniforms.uScroll.value = scrollRef.current;
    material.uniforms.uPointer.value.set(pointer.x * 1.7, -pointer.y * 1.5);

    if (group.current) {
      group.current.rotation.y = scrollRef.current * 0.7 + pointer.x * 0.06;
      group.current.position.y = -3 - scrollRef.current * 3.5;
    }
  });

  return (
    <group ref={group} position={[0, -3, 0]}>
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}

export default function AuroraField({
  colorA = "#ff006e",
  colorB = "#ff6b35",
  colorC = "#ffd700",
  opacity = 0.55,
}: Partial<WaveProps>) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    let hasWebGL = true;
    try {
      const c = document.createElement("canvas");
      hasWebGL = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      hasWebGL = false;
    }

    const compute = () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const no3d = document.documentElement.classList.contains("a11y-no3d");
      setMounted(hasWebGL && !reduceMotion && !no3d);
    };
    compute();

    const handleVisibility = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("atx-a11y-changed", compute);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("atx-a11y-changed", compute);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="aurora-field" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 7, 24], fov: 55 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        frameloop={active ? "always" : "never"}
        onCreated={({ camera }) => camera.lookAt(0, -1, 0)}
      >
        <WaveField colorA={colorA} colorB={colorB} colorC={colorC} opacity={opacity} />
      </Canvas>
    </div>
  );
}
