"use client";

import * as THREE from "three";
import { COLORS } from "@/lib/theme";

/** Material fresnel holográfico — bordes luminosos sin geometría extra. */
export function createFresnelMaterial(color: string, intensity = 1.2) {
  const c = new THREE.Color(color);
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: c },
      uIntensity: { value: intensity },
    },
    vertexShader: `
      varying vec3 vN;
      varying vec3 vV;
      varying vec3 vWorldPos;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying vec3 vN;
      varying vec3 vV;
      varying vec3 vWorldPos;
      uniform vec3 uColor;
      uniform float uTime;
      uniform float uIntensity;
      void main() {
        float fresnel = pow(1.0 - max(dot(vN, vV), 0.0), 2.5);
        float pulse = 0.85 + 0.15 * sin(uTime * 2.0 + vWorldPos.y * 2.0);
        float noise = sin(vWorldPos.x * 3.0 + uTime) * sin(vWorldPos.z * 3.0 - uTime) * 0.1;
        vec3 col = uColor * fresnel * uIntensity * pulse;
        col += uColor * noise * 0.3;
        gl_FragColor = vec4(col, fresnel * 0.95);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

/** Globo con continentes estilizados + brillo atmosférico. */
export function createGlobeMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uRed: { value: new THREE.Color(COLORS.red) },
      uGold: { value: new THREE.Color(COLORS.gold) },
      uOrange: { value: new THREE.Color(COLORS.orange) },
      uAmber: { value: new THREE.Color(COLORS.amber) },
    },
    vertexShader: `
      varying vec3 vN;
      varying vec3 vPos;
      varying vec2 vUv;
      void main() {
        vN = normalize(normalMatrix * normal);
        vPos = position;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vN;
      varying vec3 vPos;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec3 uRed;
      uniform vec3 uGold;
      uniform vec3 uOrange;
      uniform vec3 uAmber;

      float hash(vec3 p) {
        return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
      }
      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
              mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
          mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
              mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
      }
      float fbm(vec3 p) {
        float v = 0.0;
        float a = 0.5;
        for(int i = 0; i < 5; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        float n = fbm(vPos * 3.2);
        float ridges = 1.0 - abs(fbm(vPos * 6.4));
        float land = smoothstep(0.38, 0.58, n + ridges * 0.15);
        float coast = smoothstep(0.38, 0.45, n);
        
        float fresnel = pow(1.0 - abs(dot(vN, vec3(0.0, 0.0, 1.0))), 3.0);
        
        vec3 deepOcean = vec3(0.02, 0.005, 0.01);
        vec3 shallowOcean = vec3(0.05, 0.02, 0.03);
        vec3 ocean = mix(deepOcean, shallowOcean, coast);
        
        vec3 continentBase = mix(uRed, uOrange, land);
        vec3 continentHighlight = mix(uGold, uAmber, sin(uTime * 0.3 + vPos.y * 5.0) * 0.5 + 0.5);
        vec3 continent = continentBase * 0.4 + continentHighlight * 0.15 * land;
        
        vec3 base = mix(ocean, continent, land * 0.8);
        vec3 glow = mix(uRed, uGold, 0.5 + 0.5 * sin(uTime * 0.4)) * fresnel * 0.6;
        
        float specular = pow(max(dot(vN, normalize(vec3(1.0, 1.0, 1.0))), 0.0), 32.0) * (1.0 - land) * 0.3;
        
        gl_FragColor = vec4(base + glow + vec3(specular), 1.0);
      }
    `,
  });
}

/** Atmósfera fina alrededor de esferas. */
export function createAtmosphereMaterial(color: string) {
  const c = new THREE.Color(color);
  return new THREE.ShaderMaterial({
    uniforms: { 
      uColor: { value: c },
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec3 vN;
      varying vec3 vWorldPos;
      void main() {
        vN = normalize(normalMatrix * normal);
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vN;
      varying vec3 vWorldPos;
      uniform vec3 uColor;
      uniform float uTime;
      void main() {
        float rim = pow(1.0 - abs(dot(vN, vec3(0.0, 0.0, 1.0))), 3.5);
        float pulse = 0.8 + 0.2 * sin(uTime * 0.5 + vWorldPos.y * 2.0);
        float noise = sin(vWorldPos.x * 2.0 + uTime) * sin(vWorldPos.z * 2.0 - uTime) * 0.1;
        gl_FragColor = vec4(uColor, (rim + noise) * 0.45 * pulse);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.BackSide,
  });
}

/** Metal pulido con clearcoat para cristales y cuerpos premium. */
export function createPremiumMetal(color: string, emissiveIntensity = 0.4) {
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity,
    metalness: 0.9,
    roughness: 0.12,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 0.8,
    sheen: 0.3,
    sheenColor: new THREE.Color(0xffffff),
  });
}

/** Metal bruñido/antiguo para detalles */
export function createBrushedMetal(color: string, emissiveIntensity = 0.2) {
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity,
    metalness: 0.7,
    roughness: 0.35,
    clearcoat: 0.5,
    clearcoatRoughness: 0.25,
    envMapIntensity: 0.5,
    sheen: 0.5,
    sheenColor: new THREE.Color(0xffffff),
    sheenRoughness: 0.3,
  });
}

/** Vidrio cristalino para lentes y núcleos. */
export function createCrystalMaterial(color: string) {
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.8,
    metalness: 0.05,
    roughness: 0.02,
    transmission: 0.85,
    thickness: 1.2,
    ior: 1.52,
    transparent: true,
    opacity: 0.95,
    clearcoat: 1,
    clearcoatRoughness: 0.01,
    envMapIntensity: 1.2,
    dispersion: 0.02,
  });
}

/** Material de gema/cristal facetado */
export function createGemMaterial(color: string) {
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity: 1.2,
    metalness: 0.1,
    roughness: 0.03,
    transmission: 0.9,
    thickness: 2.0,
    ior: 1.65,
    transparent: true,
    opacity: 0.98,
    clearcoat: 1,
    clearcoatRoughness: 0.0,
    envMapIntensity: 1.5,
    dispersion: 0.04,
  });
}

/** Material emissivo pulsante para partículas */
export function createPulseMaterial(color: string, intensity = 1.0) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: intensity },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uIntensity;
      void main() {
        float pulse = 0.5 + 0.5 * sin(uTime * 3.0 + vWorldPos.y * 4.0);
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
        float glow = pulse * uIntensity + fresnel * 0.5;
        gl_FragColor = vec4(uColor * glow, glow);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

/** Material de energía/plasma para arcos y conexiones */
export function createPlasmaMaterial(color: string) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec3 uColor;
      void main() {
        float wave1 = sin(vUv.x * 20.0 + uTime * 4.0) * 0.5 + 0.5;
        float wave2 = sin(vUv.x * 15.0 - uTime * 3.0 + vUv.y * 10.0) * 0.5 + 0.5;
        float wave3 = sin(vUv.y * 30.0 + uTime * 5.0) * 0.5 + 0.5;
        float combined = wave1 * wave2 * wave3;
        float alpha = combined * 0.8;
        gl_FragColor = vec4(uColor * (1.0 + combined), alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

/** Material holográfico para UI elements */
export function createHologramMaterial(color: string) {
  const c = new THREE.Color(color);
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: c },
      uScanline: { value: 0.0 },
    },
    vertexShader: `
      varying vec3 vN;
      varying vec3 vV;
      varying vec3 vWorldPos;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying vec3 vN;
      varying vec3 vV;
      varying vec3 vWorldPos;
      uniform vec3 uColor;
      uniform float uTime;
      uniform float uScanline;
      void main() {
        float fresnel = pow(1.0 - max(dot(vN, vV), 0.0), 2.0);
        float scanline = sin(vWorldPos.y * 40.0 + uTime * 10.0) * 0.1 + 0.9;
        float pulse = 0.7 + 0.3 * sin(uTime * 2.0);
        float noise = sin(vWorldPos.x * 5.0 + uTime) * sin(vWorldPos.z * 5.0 - uTime) * 0.05;
        vec3 col = uColor * (fresnel * 1.2 + 0.3) * pulse * scanline;
        col += uColor * noise;
        gl_FragColor = vec4(col, (fresnel + 0.2) * scanline * 0.8);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}