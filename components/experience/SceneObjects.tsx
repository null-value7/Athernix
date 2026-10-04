'use client';

// ═══════════════════════════════════════════
// VISTAS 3D — /experience
// Objetos del canvas: dispositivos, artefacto de conocimiento,
// visor VR, isla, fondo y mascota procedural de respaldo.
// El movimiento vive en controllers/experience/useExperienceScene.
// ═══════════════════════════════════════════

import { useEffect, useMemo, useRef, useState } from 'react';
import type * as React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei/core/RoundedBox';
import * as THREE from 'three';
import { EXPERIENCE_PALETTE } from '@/models/experience';
import type { DeviceId, OpportunityId, TopicId, Vec3 } from '@/models/experience';
import {
  chapterWeight,
  dampFactor,
  smooth,
  useChapterGroup,
  type SceneMotion,
} from '@/controllers/experience/useExperienceScene';

const P = EXPERIENCE_PALETTE;
const TOPIC_ACCENT: Record<TopicId, string> = {
  understand: P.pink,
  practice: P.orange,
  discover: P.gold,
};

/* ── Pointer cursor over interactive meshes (cleaned on unmount) ── */
export function useMeshCursor() {
  useEffect(() => () => {
    document.body.style.cursor = '';
  }, []);
  return useMemo(
    () => ({
      over: (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      },
      out: () => {
        document.body.style.cursor = '';
      },
    }),
    []
  );
}

/* ═══════════ Screen CanvasTextures ═══════════ */

type ScreenKind = 'phone' | 'tablet' | 'desktop' | 'visor';

const SCREEN_SIZE: Record<ScreenKind, [number, number]> = {
  phone: [360, 512],
  tablet: [560, 740],
  desktop: [768, 470],
  visor: [512, 300],
};

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawScreen(kind: ScreenKind): HTMLCanvasElement {
  const [w, h] = SCREEN_SIZE[kind];
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  // Fondo — casi negro cálido
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#0d0209');
  bg.addColorStop(1, '#180512');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Halo radial cálido
  const halo = ctx.createRadialGradient(w * 0.5, h * 0.46, 6, w * 0.5, h * 0.46, w * 0.6);
  halo.addColorStop(0, 'rgba(255,107,0,0.30)');
  halo.addColorStop(0.55, 'rgba(255,0,110,0.12)');
  halo.addColorStop(1, 'rgba(255,0,110,0)');
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, w, h);

  const pad = Math.round(w * 0.075);

  // Masthead: punto + ATHERNIX
  ctx.fillStyle = P.pink;
  ctx.beginPath();
  ctx.arc(pad + 4, pad - 2, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,244,232,0.85)';
  ctx.font = `600 ${Math.round(w * 0.028)}px 'Plus Jakarta Sans', sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.fillText('A T H E R N I X', pad + 16, pad - 1);
  ctx.fillStyle = 'rgba(255,215,0,0.7)';
  ctx.font = `500 ${Math.round(w * 0.024)}px 'JetBrains Mono', monospace`;
  ctx.textAlign = 'right';
  ctx.fillText('EXPERIENCIA', w - pad, pad - 1);
  ctx.textAlign = 'left';

  // Anillo luminoso: composición a dos columnas en horizontal —
  // el anillo a la izquierda y el titular a la derecha para que no
  // tape las tarjetas ni la barra inferior.
  const landscape = kind === 'desktop' || kind === 'visor';
  const cx = w * (landscape ? 0.27 : 0.5);
  const cy = h * (landscape ? 0.43 : 0.4);
  const R = Math.min(w, h) * 0.21;
  ctx.save();
  ctx.shadowColor = P.orange;
  ctx.shadowBlur = Math.round(w * 0.05);
  const ring = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
  ring.addColorStop(0, P.pink);
  ring.addColorStop(0.5, P.orange);
  ring.addColorStop(1, P.gold);
  ctx.strokeStyle = ring;
  ctx.lineWidth = Math.max(3, w * 0.014);
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(255,215,0,0.55)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, R * 0.72, Math.PI * 0.3, Math.PI * 1.5);
  ctx.stroke();
  ctx.restore();

  // Titular
  const titleSize = Math.round(w * (landscape ? 0.072 : kind === 'phone' ? 0.095 : 0.078));
  const titleX = landscape ? w * 0.7 : cx;
  const titleY = landscape ? h * 0.37 : cy + R + titleSize * 1.15;
  ctx.fillStyle = '#FFF4E8';
  ctx.font = `400 ${titleSize}px 'Bebas Neue', 'Plus Jakarta Sans', sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('NO LO MIRES.', titleX, titleY);
  const grad = ctx.createLinearGradient(titleX - w * 0.2, 0, titleX + w * 0.2, 0);
  grad.addColorStop(0, P.pink);
  grad.addColorStop(0.55, P.orange);
  grad.addColorStop(1, P.gold);
  ctx.fillStyle = grad;
  ctx.fillText('VÍVELO.', titleX, landscape ? titleY + titleSize * 1.08 : cy + R + titleSize * 2.15);
  ctx.textAlign = 'left';

  // Tres mini tiles de marca
  const tileW = (w - pad * 2 - w * 0.05 * 2) / 3;
  const tileH = h * 0.11;
  const tileY = h - pad - tileH - h * 0.075;
  const accents = [P.pink, P.orange, P.gold];
  const shapes: Array<'circle' | 'triangle' | 'square'> = ['circle', 'triangle', 'square'];
  for (let i = 0; i < 3; i++) {
    const x = pad + i * (tileW + w * 0.05);
    ctx.fillStyle = 'rgba(255,244,232,0.06)';
    rr(ctx, x, tileY, tileW, tileH, 10);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,244,232,0.14)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = accents[i];
    const icx = x + tileW * 0.5;
    const icy = tileY + tileH * 0.42;
    const ir = tileH * 0.16;
    ctx.beginPath();
    if (shapes[i] === 'circle') ctx.arc(icx, icy, ir, 0, Math.PI * 2);
    else if (shapes[i] === 'triangle') {
      ctx.moveTo(icx, icy - ir);
      ctx.lineTo(icx + ir, icy + ir * 0.8);
      ctx.lineTo(icx - ir, icy + ir * 0.8);
      ctx.closePath();
    } else ctx.rect(icx - ir * 0.8, icy - ir * 0.8, ir * 1.6, ir * 1.6);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,244,232,0.45)';
    rr(ctx, x + tileW * 0.22, tileY + tileH * 0.72, tileW * 0.56, 3, 2);
    ctx.fill();
  }

  // Barra de navegación inferior
  const navH = h * 0.055;
  const navY = h - pad * 0.6 - navH;
  ctx.fillStyle = 'rgba(255,244,232,0.08)';
  rr(ctx, pad, navY, w - pad * 2, navH, navH / 2);
  ctx.fill();
  for (let i = 0; i < 4; i++) {
    const dx = pad + (w - pad * 2) * (0.18 + i * 0.213);
    ctx.fillStyle = i === 1 ? P.orange : 'rgba(255,244,232,0.35)';
    ctx.beginPath();
    ctx.arc(dx, navY + navH / 2, i === 1 ? 4 : 3, 0, Math.PI * 2);
    ctx.fill();
  }
  return canvas;
}

export function useScreenTextures(): Record<ScreenKind, THREE.CanvasTexture> {
  const textures = useMemo(() => {
    const make = (kind: ScreenKind) => {
      const tex = new THREE.CanvasTexture(drawScreen(kind));
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      return tex;
    };
    return {
      phone: make('phone'),
      tablet: make('tablet'),
      desktop: make('desktop'),
      visor: make('visor'),
    };
  }, []);
  useEffect(
    () => () => {
      Object.values(textures).forEach((t) => t.dispose());
    },
    [textures]
  );
  return textures;
}

/* ═══════════ Materiales compartidos ═══════════ */

function Graphite({ children }: { children?: React.ReactNode }) {
  return (
    <meshPhysicalMaterial
      color="#272329"
      metalness={0.78}
      roughness={0.23}
      clearcoat={1}
      clearcoatRoughness={0.35}
    >
      {children}
    </meshPhysicalMaterial>
  );
}

/* ── Geometría XY redondeada: esquinas reales + UVs normalizados ── */

function roundedRect(width: number, height: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);
  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + width - r, y);
  s.quadraticCurveTo(x + width, y, x + width, y + r);
  s.lineTo(x + width, y + height - r);
  s.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  s.lineTo(x + r, y + height);
  s.quadraticCurveTo(x, y + height, x, y + height - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  s.closePath();
  return s;
}

/** Cuerpo de dispositivo: losa extruida con esquinas XY redondeadas. */
function DeviceSlab({
  width,
  height,
  depth,
  radius,
  position,
  children,
}: {
  width: number;
  height: number;
  depth: number;
  radius: number;
  position?: Vec3;
  children?: React.ReactNode;
}) {
  const geometry = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(roundedRect(width, height, radius), {
      depth,
      bevelEnabled: true,
      bevelSize: 0.012,
      bevelThickness: 0.01,
      bevelSegments: 3,
      curveSegments: 12,
      steps: 1,
    });
    g.translate(0, 0, -depth / 2);
    return g;
  }, [width, height, depth, radius]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry} position={position}>{children}</mesh>;
}

/**
 * Pantalla plana con UVs normalizados — el CanvasTexture llena el frente
 * en lugar de heredar las coordenadas de mundo de ExtrudeGeometry.
 */
function DeviceScreen({
  width,
  height,
  radius,
  z,
  texture,
}: {
  width: number;
  height: number;
  radius: number;
  z: number;
  texture: THREE.Texture;
}) {
  const geometry = useMemo(() => {
    const g = new THREE.ShapeGeometry(roundedRect(width, height, radius), 12);
    const pos = g.getAttribute('position');
    const uv = g.getAttribute('uv');
    for (let i = 0; i < pos.count; i++) {
      uv.setXY(i, (pos.getX(i) + width / 2) / width, (pos.getY(i) + height / 2) / height);
    }
    return g;
  }, [width, height, radius]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh geometry={geometry} position={[0, 0, z]}>
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

/* ═══════════ Dispositivos ═══════════ */

interface DevicePose {
  pos: Vec3;
  rot: Vec3;
  scale: number;
}

const DEVICE_LAYOUT: Record<DeviceId, { base: DevicePose; focus: DevicePose }> = {
  tablet: {
    base: { pos: [0, 0.05, 0], rot: [-0.04, -0.2, -0.1], scale: 1 },
    focus: { pos: [0.15, -0.02, 0.95], rot: [-0.02, -0.12, -0.04], scale: 1.1 },
  },
  phone: {
    base: { pos: [1.55, -0.5, 0.8], rot: [0, -0.35, 0.05], scale: 0.9 },
    focus: { pos: [0.1, -0.15, 1.05], rot: [0, -0.18, 0.02], scale: 1.55 },
  },
  desktop: {
    base: { pos: [-1.35, 0.45, -0.85], rot: [0, 0.3, 0], scale: 0.72 },
    focus: { pos: [0, 0.2, 0.35], rot: [0, 0.05, 0], scale: 0.92 },
  },
  headset: {
    base: { pos: [2.25, 1.45, -0.55], rot: [0.08, -0.5, 0.05], scale: 0.42 },
    focus: { pos: [0.2, 0.05, 1.0], rot: [0.04, -0.3, 0], scale: 0.9 },
  },
};

interface DeviceItemProps {
  id: DeviceId;
  index: number;
  motion: SceneMotion;
  onSelect: (id: DeviceId) => void;
  children: React.ReactNode;
}

function DeviceItem({ id, index, motion, onSelect, children }: DeviceItemProps) {
  const ref = useRef<THREE.Group>(null);
  const cursor = useMeshCursor();
  const [hover, setHover] = useState(false);
  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    const frame = motion.frameRef.current;
    const t = motion.timeRef.current;
    const k = motion.stillRef.current ? 1 : dampFactor(delta);
    const selected = frame.device === id;
    const cfg = selected ? DEVICE_LAYOUT[id].focus : DEVICE_LAYOUT[id].base;
    const recede = selected ? 0 : -0.35;
    const float = motion.stillRef.current ? 0 : Math.sin(t * 0.8 + index * 1.7) * 0.045;
    const hoverBoost = hover ? 0.045 : 0;
    g.position.x += (cfg.pos[0] - g.position.x) * k;
    g.position.y += (cfg.pos[1] + float - g.position.y) * k;
    g.position.z += (cfg.pos[2] + recede - g.position.z) * k;
    g.rotation.x += (cfg.rot[0] - g.rotation.x) * k;
    g.rotation.y += (cfg.rot[1] - g.rotation.y) * k;
    g.rotation.z += (cfg.rot[2] - g.rotation.z) * k;
    const s = g.scale.x + (cfg.scale * (selected ? 1.05 : 0.94) + hoverBoost - g.scale.x) * k;
    g.scale.setScalar(Math.max(0.001, s));
  });
  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={(e) => {
        cursor.over(e);
        setHover(true);
      }}
      onPointerOut={() => {
        cursor.out();
        setHover(false);
      }}
    >
      {children}
    </group>
  );
}

function TabletModel({ texture }: { texture: THREE.Texture }) {
  return (
    <group>
      <DeviceSlab width={2.3} height={3.05} depth={0.14} radius={0.16}>
        <Graphite />
      </DeviceSlab>
      <DeviceScreen width={2.13} height={2.82} radius={0.11} z={0.14 / 2 + 0.022} texture={texture} />
      <mesh position={[0, 1.455, 0.082]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial color="#08000a" />
      </mesh>
      {/* filo lateral luminoso */}
      <mesh position={[0, -1.55, 0]}>
        <boxGeometry args={[1.5, 0.03, 0.1]} />
        <meshBasicMaterial color={P.orange} toneMapped={false} />
      </mesh>
    </group>
  );
}

function PhoneModel({ texture }: { texture: THREE.Texture }) {
  return (
    <group>
      <DeviceSlab width={1.05} height={2.1} depth={0.12} radius={0.14}>
        <Graphite />
      </DeviceSlab>
      <DeviceScreen width={0.94} height={1.96} radius={0.09} z={0.12 / 2 + 0.022} texture={texture} />
      {/* notch */}
      <DeviceSlab width={0.34} height={0.07} depth={0.02} radius={0.03} position={[0, 0.94, 0.075]}>
        <meshStandardMaterial color="#0b0509" roughness={0.4} />
      </DeviceSlab>
      <mesh position={[0, -1.08, 0]}>
        <boxGeometry args={[0.6, 0.025, 0.08]} />
        <meshBasicMaterial color={P.pink} toneMapped={false} />
      </mesh>
    </group>
  );
}

function DesktopModel({ texture }: { texture: THREE.Texture }) {
  return (
    <group>
      {/* pantalla */}
      <DeviceSlab width={3.3} height={2.0} depth={0.12} radius={0.08}>
        <Graphite />
      </DeviceSlab>
      <DeviceScreen width={3.14} height={1.84} radius={0.04} z={0.12 / 2 + 0.022} texture={texture} />
      {/* cuello y pie */}
      <mesh position={[0, -1.28, -0.05]}>
        <boxGeometry args={[0.28, 0.6, 0.12]} />
        <meshStandardMaterial color="#1c181f" metalness={0.7} roughness={0.35} />
      </mesh>
      <RoundedBox args={[1.25, 0.09, 0.7]} radius={0.04} smoothness={4} position={[0, -1.62, 0.05]}>
        <meshPhysicalMaterial color="#221d26" metalness={0.75} roughness={0.3} clearcoat={0.6} />
      </RoundedBox>
      <mesh position={[0, -1.02, 0.062]}>
        <boxGeometry args={[0.5, 0.02, 0.01]} />
        <meshBasicMaterial color={P.gold} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Visor VR — también se usa como escultura del capítulo de inmersión. */
export function VRHeadsetModel({ scale = 1 }: { scale?: number }) {
  return (
    <group scale={scale}>
      {/* cuerpo */}
      <RoundedBox args={[2.8, 1.05, 0.9]} radius={0.24} smoothness={4}>
        <Graphite />
      </RoundedBox>
      {/* placa frontal brillante */}
      <RoundedBox args={[2.5, 0.78, 0.08]} radius={0.2} smoothness={4} position={[0, 0.04, 0.46]}>
        <meshPhysicalMaterial color="#150912" metalness={0.5} roughness={0.08} clearcoat={1} />
      </RoundedBox>
      {/* lentes / cámaras frontales */}
      <mesh position={[-0.58, 0.05, 0.52]}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color="#05020a" metalness={0.9} roughness={0.08} />
      </mesh>
      <mesh position={[0.58, 0.05, 0.52]}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color="#05020a" metalness={0.9} roughness={0.08} />
      </mesh>
      {/* tira luminosa */}
      <mesh position={[0, -0.34, 0.49]}>
        <boxGeometry args={[1.7, 0.035, 0.02]} />
        <meshBasicMaterial color={P.pink} toneMapped={false} />
      </mesh>
      {/* almohadilla facial */}
      <mesh position={[0, -0.02, -0.5]} scale={[1.2, 0.72, 0.6]}>
        <torusGeometry args={[0.92, 0.2, 12, 32]} />
        <meshStandardMaterial color="#0e0a10" roughness={0.95} metalness={0.05} />
      </mesh>
      {/* correa superior */}
      <mesh position={[0, 0.42, -0.55]} rotation={[1.25, 0, 0]}>
        <torusGeometry args={[0.95, 0.08, 10, 32, Math.PI * 0.9]} />
        <meshStandardMaterial color="#1b1620" roughness={0.85} metalness={0.2} />
      </mesh>
      {/* correas laterales */}
      <mesh position={[-1.42, 0.1, -0.42]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.7, 8]} />
        <meshStandardMaterial color="#1b1620" roughness={0.85} metalness={0.2} />
      </mesh>
      <mesh position={[1.42, 0.1, -0.42]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.7, 8]} />
        <meshStandardMaterial color="#1b1620" roughness={0.85} metalness={0.2} />
      </mesh>
    </group>
  );
}

function VRControllers() {
  return (
    <group>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 1.75, -0.85, 0.55]} rotation={[0.5, 0, side * -0.25]}>
          <mesh>
            <capsuleGeometry args={[0.085, 0.4, 6, 12]} />
            <meshPhysicalMaterial color="#241f29" metalness={0.7} roughness={0.3} clearcoat={0.8} />
          </mesh>
          <mesh position={[0, 0.32, 0.05]} rotation={[Math.PI / 2.4, 0, 0]}>
            <torusGeometry args={[0.16, 0.035, 10, 24]} />
            <meshStandardMaterial color="#332b3a" metalness={0.75} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.28, 0.1]}>
            <sphereGeometry args={[0.03, 10, 10]} />
            <meshBasicMaterial color={side < 0 ? P.pink : P.gold} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function DeviceSet({
  motion,
  onSelect,
}: {
  motion: SceneMotion;
  onSelect: (id: DeviceId) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const textures = useScreenTextures();
  useChapterGroup(groupRef, motion, [0, 1], (g, w, t) => {
    // Escala ABSOLUTA sobre la envolvente — nunca multiplicar g.scale,
    // eso componía el encogimiento frame a frame.
    const heroW = chapterWeight(motion.progRef.current, 0);
    const closeness = chapterWeight(motion.progRef.current, 1);
    g.scale.setScalar(Math.max(0.0001, w * (0.96 + 0.04 * closeness)));
    g.position.y = Math.sin(t * 0.6) * 0.04;
    g.position.z = heroW * -0.6;
    // Vaivén suave con tilt — las pantallas siempre miran al frente.
    g.rotation.y = heroW * (-0.1 + Math.sin(t * 0.22) * 0.1);
  });
  return (
    <group ref={groupRef}>
      <DeviceItem id="tablet" index={0} motion={motion} onSelect={onSelect}>
        <TabletModel texture={textures.tablet} />
      </DeviceItem>
      <DeviceItem id="phone" index={1} motion={motion} onSelect={onSelect}>
        <PhoneModel texture={textures.phone} />
      </DeviceItem>
      <DeviceItem id="desktop" index={2} motion={motion} onSelect={onSelect}>
        <DesktopModel texture={textures.desktop} />
      </DeviceItem>
      <DeviceItem id="headset" index={3} motion={motion} onSelect={onSelect}>
        <group scale={0.85}>
          <VRHeadsetModel />
          <VRControllers />
        </group>
      </DeviceItem>
    </group>
  );
}

/* ═══════════ Artefacto de conocimiento (3D) ═══════════ */

const TILE_COLORS = [P.pink, P.orange, P.gold, P.orange, P.pink, P.gold];

export function KnowledgeArtifact({
  motion,
  onToggle,
  onPulse,
}: {
  motion: SceneMotion;
  onToggle: () => void;
  onPulse: () => void;
}) {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const tiles = useRef<Array<THREE.Group | null>>([]);
  const glow = useRef<THREE.PointLight>(null);
  const cursor = useMeshCursor();
  const explode = useRef(0);
  const pulseAt = useRef(-10);
  const seenPulse = useRef(0);

  useFrame((_, delta) => {
    const frame = motion.frameRef.current;
    const t = motion.timeRef.current;
    const k = motion.stillRef.current ? 1 : dampFactor(delta);
    explode.current += (frame.exploded - explode.current) * k;
    const ex = explode.current;
    if (frame.pulse !== seenPulse.current) {
      seenPulse.current = frame.pulse;
      pulseAt.current = t;
    }
    const pulseW = Math.max(0, 1 - (t - pulseAt.current) / 1.2);
    if (glow.current) glow.current.intensity = 2 + pulseW * 26 + ex * 8;

    // Anillos de gimbal: cada uno rota sobre su eje y se separa al explotar.
    const rings = [ring1.current, ring2.current, ring3.current];
    const spin = motion.stillRef.current ? 0 : t;
    if (rings[0]) {
      rings[0].rotation.x = Math.PI / 2.15 + spin * 0.35;
      rings[0].rotation.y = spin * 0.22;
      const s = 1 + ex * 0.3;
      rings[0].scale.setScalar(s);
      rings[0].position.y = ex * 0.85;
    }
    if (rings[1]) {
      rings[1].rotation.y = Math.PI / 3.2 - spin * 0.26;
      rings[1].rotation.z = 0.5 + spin * 0.3;
      const s = 1 + ex * 0.42;
      rings[1].scale.setScalar(s);
      rings[1].position.y = -ex * 0.85;
    }
    if (rings[2]) {
      rings[2].rotation.x = -0.6 + spin * 0.18;
      rings[2].rotation.z = Math.PI / 4 + spin * 0.24;
      const s = 1 + ex * 0.55;
      rings[2].scale.setScalar(s);
      rings[2].position.x = ex * 0.6;
    }
    if (core.current) {
      core.current.rotation.y = spin * 0.4;
      core.current.rotation.x = spin * 0.16;
      core.current.scale.setScalar(1 + pulseW * 0.1);
    }
    // Seis fichas orbitando el núcleo — se alejan al explotar.
    for (let i = 0; i < 6; i++) {
      const tile = tiles.current[i];
      if (!tile) continue;
      const a = t * 0.45 + (i * Math.PI) / 3;
      const r = 1.7 + ex * 1.1;
      tile.position.set(Math.cos(a) * r, Math.sin(a * 1.3) * 0.45, Math.sin(a) * r);
      tile.rotation.y = -a + Math.PI / 2;
      const ts = 1 + pulseW * 0.25;
      tile.scale.setScalar(ts);
    }
  });

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
        onPulse();
      }}
      onPointerOver={cursor.over}
      onPointerOut={cursor.out}
    >
      <pointLight ref={glow} color={P.orange} intensity={4} distance={7} decay={2} />
      <mesh ref={core}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshPhysicalMaterial
          color="#33222f"
          metalness={0.85}
          roughness={0.28}
          flatShading
          emissive={P.pink}
          emissiveIntensity={0.14}
        />
      </mesh>
      <mesh ref={ring1}>
        <torusGeometry args={[1.05, 0.035, 12, 72]} />
        <meshPhysicalMaterial color="#4a3a4e" metalness={0.9} roughness={0.25} clearcoat={0.8} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[1.4, 0.028, 12, 80]} />
        <meshPhysicalMaterial color="#5a4232" metalness={0.9} roughness={0.25} clearcoat={0.8} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[1.75, 0.022, 12, 88]} />
        <meshPhysicalMaterial color="#3a2c4a" metalness={0.9} roughness={0.28} clearcoat={0.8} />
      </mesh>
      {TILE_COLORS.map((color, i) => (
        <group
          key={i}
          ref={(el) => {
            tiles.current[i] = el;
          }}
        >
          <RoundedBox args={[0.4, 0.4, 0.08]} radius={0.05} smoothness={3}>
            <meshPhysicalMaterial
              color="#221a28"
              metalness={0.7}
              roughness={0.3}
              clearcoat={0.6}
              emissive={color}
              emissiveIntensity={0.35}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.05]}>
            <boxGeometry args={[0.16, 0.16, 0.012]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ═══════════ Conjunto inmersión: artefacto ⇄ visor ═══════════ */

export function ImmersionSet({
  motion,
  onToggleExploded,
  onPulse,
  onSelectVR,
}: {
  motion: SceneMotion;
  onToggleExploded: () => void;
  onPulse: () => void;
  onSelectVR: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const artifactRef = useRef<THREE.Group>(null);
  const headsetRef = useRef<THREE.Group>(null);
  const cursor = useMeshCursor();

  useChapterGroup(groupRef, motion, [3], (g, w, t, k) => {
    const vr = motion.frameRef.current.immersion === 'vr';
    const art = artifactRef.current;
    const hmd = headsetRef.current;
    if (art) {
      const s = art.scale.x + ((vr ? 0.0001 : 1) - art.scale.x) * k;
      art.scale.setScalar(Math.max(0.0001, s));
      art.visible = s > 0.01;
      art.position.y = Math.sin(t * 0.7) * 0.05;
    }
    if (hmd) {
      const s = hmd.scale.x + ((vr ? 1 : 0.0001) - hmd.scale.x) * k;
      hmd.scale.setScalar(Math.max(0.0001, s));
      hmd.visible = s > 0.01;
      hmd.rotation.y = -0.25 + Math.sin(t * 0.5) * 0.1;
      hmd.position.y = Math.sin(t * 0.65 + 1) * 0.06;
    }
    g.position.y = 0.15;
  });

  return (
    <group ref={groupRef}>
      <group ref={artifactRef} scale={1.15}>
        <KnowledgeArtifact motion={motion} onToggle={onToggleExploded} onPulse={onPulse} />
      </group>
      <group
        ref={headsetRef}
        scale={0.85}
        onClick={(e) => {
          e.stopPropagation();
          onSelectVR();
        }}
        onPointerOver={cursor.over}
        onPointerOut={cursor.out}
      >
        <VRHeadsetModel />
        <VRControllers />
      </group>
    </group>
  );
}

/* ═══════════ Órbita neuronal + onda de saludo ═══════════ */

export function NeuralOrbit({ motion, topic }: { motion: SceneMotion; topic: TopicId }) {
  const nodes = useRef<Array<THREE.Mesh | null>>([]);
  const rings = useRef<Array<THREE.Mesh | null>>([]);
  const accent = useRef(new THREE.Color(P.pink));
  const target = useMemo(() => new THREE.Color(), []);
  const pulseAt = useRef(-10);
  const seenPulse = useRef(0);
  const nodeMats = useRef<Array<THREE.MeshBasicMaterial | null>>([]);
  const ringMats = useRef<Array<THREE.MeshBasicMaterial | null>>([]);

  useFrame((_, delta) => {
    const frame = motion.frameRef.current;
    const t = motion.timeRef.current;
    const k = motion.stillRef.current ? 1 : dampFactor(delta);
    target.set(TOPIC_ACCENT[topic]);
    accent.current.lerp(target, k);
    if (frame.pulse !== seenPulse.current) {
      seenPulse.current = frame.pulse;
      pulseAt.current = t;
    }
    const pulseW = Math.max(0, 1 - (t - pulseAt.current) / 1.4);

    const orbitR = [1.35, 1.75, 2.15];
    const speed = [0.5, -0.34, 0.24];
    const tilts: Vec3[] = [
      [1.15, 0, 0.3],
      [1.45, 0.5, -0.4],
      [1.0, -0.6, 0.15],
    ];
    for (let i = 0; i < 3; i++) {
      const ring = rings.current[i];
      if (ring) {
        ring.rotation.x = tilts[i][0];
        ring.rotation.y = tilts[i][1] + t * speed[i] * 0.3;
        ring.rotation.z = tilts[i][2];
      }
      const rm = ringMats.current[i];
      if (rm) {
        rm.color.copy(accent.current);
        rm.opacity = 0.22 + pulseW * 0.35;
      }
      const node = nodes.current[i];
      if (node) {
        const a = t * speed[i] + i * 2.2;
        const r = orbitR[i];
        node.position.set(
          Math.cos(a) * r * Math.cos(tilts[i][0]) ,
          Math.sin(a) * r * 0.42,
          Math.sin(a) * r * Math.sin(tilts[i][0] + 0.6)
        );
        node.scale.setScalar(1 + pulseW * 0.8);
      }
      const nm = nodeMats.current[i];
      if (nm) nm.color.copy(accent.current);
    }
  });

  return (
    <group position={[0, 0.15, 0]}>
      {[1.35, 1.75, 2.15].map((r, i) => (
        <mesh
          key={r}
          ref={(el) => {
            rings.current[i] = el;
          }}
        >
          <torusGeometry args={[r, 0.008, 8, 90]} />
          <meshBasicMaterial
            ref={(m) => {
              ringMats.current[i] = m;
            }}
            color={P.pink}
            transparent
            opacity={0.25}
            depthWrite={false}
          />
        </mesh>
      ))}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            nodes.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.09, 14, 14]} />
          <meshBasicMaterial
            ref={(m) => {
              nodeMats.current[i] = m;
            }}
            color={P.pink}
            toneMapped={false}
          />
        </mesh>
      ))}
      {/* núcleo suave */}
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color={P.orange} transparent opacity={0.5} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function GreetingRipple({ motion }: { motion: SceneMotion }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const startAt = useRef(-10);
  const seen = useRef(0);
  useFrame(() => {
    const frame = motion.frameRef.current;
    const t = motion.timeRef.current;
    if (frame.greeting !== seen.current) {
      seen.current = frame.greeting;
      startAt.current = t;
    }
    const u = (t - startAt.current) / 1.6;
    if (!ref.current || !mat.current) return;
    if (u >= 0 && u <= 1) {
      ref.current.visible = true;
      const s = 0.5 + u * 2.4;
      ref.current.scale.setScalar(s);
      mat.current.opacity = (1 - u) * 0.8;
    } else {
      ref.current.visible = false;
    }
  });
  return (
    <mesh ref={ref} visible={false} position={[0, 0.2, 0]}>
      <torusGeometry args={[0.8, 0.03, 8, 60]} />
      <meshBasicMaterial
        ref={mat}
        color={P.gold}
        transparent
        opacity={0}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ═══════════ Mascota procedural (fallback) ═══════════ */

export function ProceduralMascot({
  motion,
  onGreet,
}: {
  motion: SceneMotion;
  onGreet: () => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const cursor = useMeshCursor();
  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    const t = motion.timeRef.current;
    const k = motion.stillRef.current ? 1 : dampFactor(delta);
    g.position.y += (Math.sin(t * 1.2) * 0.06 - g.position.y) * k;
    g.rotation.y += (Math.sin(t * 0.5) * 0.15 - g.rotation.y) * k;
  });
  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        onGreet();
      }}
      onPointerOver={cursor.over}
      onPointerOut={cursor.out}
    >
      {/* cabeza */}
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.52, 24, 20]} />
        <meshPhysicalMaterial color="#2d2632" metalness={0.7} roughness={0.3} clearcoat={0.9} />
      </mesh>
      {/* ojos LED */}
      <mesh position={[-0.18, 0.9, 0.44]}>
        <capsuleGeometry args={[0.05, 0.09, 4, 10]} />
        <meshBasicMaterial color={P.orange} toneMapped={false} />
      </mesh>
      <mesh position={[0.18, 0.9, 0.44]}>
        <capsuleGeometry args={[0.05, 0.09, 4, 10]} />
        <meshBasicMaterial color={P.orange} toneMapped={false} />
      </mesh>
      {/* sonrisa */}
      <mesh position={[0, 0.72, 0.47]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.13, 0.022, 8, 20, Math.PI]} />
        <meshBasicMaterial color={P.pink} toneMapped={false} />
      </mesh>
      {/* antena + branquias */}
      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.025, 0.035, 0.28, 8]} />
        <meshStandardMaterial color="#1c1620" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.07, 14, 14]} />
        <meshBasicMaterial color={P.pink} toneMapped={false} />
      </mesh>
      <RoundedBox args={[0.1, 0.3, 0.16]} radius={0.04} smoothness={3} position={[-0.56, 0.9, 0.1]}>
        <meshBasicMaterial color={P.pink} toneMapped={false} />
      </RoundedBox>
      <RoundedBox args={[0.1, 0.3, 0.16]} radius={0.04} smoothness={3} position={[0.56, 0.9, 0.1]}>
        <meshBasicMaterial color={P.pink} toneMapped={false} />
      </RoundedBox>
      {/* torso */}
      <RoundedBox args={[0.78, 0.85, 0.58]} radius={0.2} smoothness={4} position={[0, 0.05, 0]}>
        <meshPhysicalMaterial color="#2d2632" metalness={0.7} roughness={0.3} clearcoat={0.9} />
      </RoundedBox>
      <mesh position={[0, 0.12, 0.3]}>
        <circleGeometry args={[0.12, 20]} />
        <meshBasicMaterial color={P.gold} toneMapped={false} />
      </mesh>
      {/* brazos */}
      <mesh position={[-0.48, 0.1, 0]} rotation={[0, 0, 0.35]}>
        <capsuleGeometry args={[0.07, 0.35, 6, 12]} />
        <meshPhysicalMaterial color="#241e2a" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0.48, 0.1, 0]} rotation={[0, 0, -0.35]}>
        <capsuleGeometry args={[0.07, 0.35, 6, 12]} />
        <meshPhysicalMaterial color="#241e2a" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* aro de levitación */}
      <mesh position={[0, -0.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.03, 10, 40]} />
        <meshBasicMaterial color={P.orange} transparent opacity={0.8} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.68, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.3, 24]} />
        <meshBasicMaterial color={P.pink} transparent opacity={0.25} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ═══════════ Isla de El Salvador ═══════════ */

const BEACONS: Array<{ id: OpportunityId; pos: Vec3; color: string }> = [
  { id: 'education', pos: [-1, 0, 0.2], color: P.pink },
  { id: 'heritage', pos: [0.7, 0.2, -0.6], color: P.gold },
  { id: 'creation', pos: [1.4, 0, 0.5], color: P.orange },
];

const PEAKS: Array<{ pos: Vec3; r: number; h: number }> = [
  { pos: [-0.7, 0.32, 0.28], r: 0.5, h: 1.15 },
  { pos: [0.25, 0.3, -0.35], r: 0.62, h: 1.5 },
  { pos: [0.95, 0.3, 0.3], r: 0.42, h: 0.9 },
];

export function IslandScene({
  motion,
  opportunity,
  onSelect,
}: {
  motion: SceneMotion;
  opportunity: OpportunityId;
  onSelect: (id: OpportunityId) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const beaconRefs = useRef<Array<THREE.Group | null>>([]);
  const cursor = useMeshCursor();

  const ribbon = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.15, 0.42, 0.55),
      new THREE.Vector3(-0.3, 0.5, -0.15),
      new THREE.Vector3(0.55, 0.52, -0.5),
      new THREE.Vector3(1.3, 0.44, 0.4),
    ]);
    return new THREE.TubeGeometry(curve, 48, 0.024, 6, false);
  }, []);
  useEffect(() => () => ribbon.dispose(), [ribbon]);

  useChapterGroup(groupRef, motion, [4], (g, w, t, k) => {
    g.position.y = -0.35 + Math.sin(t * 0.55) * 0.06;
    g.rotation.y = Math.sin(t * 0.22) * 0.1;
    for (let i = 0; i < BEACONS.length; i++) {
      const b = beaconRefs.current[i];
      if (!b) continue;
      const sel = BEACONS[i].id === opportunity;
      const targetY = BEACONS[i].pos[1] + (sel ? 0.22 : 0);
      b.position.y += (targetY - b.position.y) * k;
      const s = b.scale.x + ((sel ? 1.5 : 1) - b.scale.x) * k;
      b.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
      {/* inclinación suave del conjunto — expone la cara superior de la isla */}
      <group rotation={[0.16, 0, 0]}>
      {/* base insular baja en polígonos */}
      <mesh position={[0.1, 0, 0]}>
        <cylinderGeometry args={[2.0, 2.45, 0.55, 9, 1]} />
        <meshStandardMaterial color="#241a28" flatShading roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[0.1, 0.29, 0]}>
        <cylinderGeometry args={[1.95, 2.0, 0.06, 9, 1]} />
        <meshStandardMaterial color="#2e2133" flatShading roughness={0.85} metalness={0.1} />
      </mesh>
      {/* picos volcánicos con niveles de contorno */}
      {PEAKS.map((peak, i) => (
        <group key={i} position={peak.pos}>
          <mesh position={[0, peak.h / 2, 0]}>
            <coneGeometry args={[peak.r, peak.h, 6]} />
            <meshStandardMaterial color="#33242f" flatShading roughness={0.85} metalness={0.15} />
          </mesh>
          {/* terrazas de contorno — leen como relieve, no como triángulos planos */}
          {[0.38, 0.58, 0.78].map((hFrac, tier) => (
            <mesh
              key={tier}
              position={[0, peak.h * hFrac, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <torusGeometry args={[peak.r * (1 - hFrac) * 1.04, 0.011, 6, 24]} />
              <meshBasicMaterial
                color={tier === 1 ? P.gold : P.orange}
                transparent
                opacity={0.34 - tier * 0.07}
                toneMapped={false}
                depthWrite={false}
              />
            </mesh>
          ))}
          <mesh position={[0, peak.h * 0.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[peak.r * 0.22, 0.035, 8, 20]} />
            <meshBasicMaterial color={P.orange} toneMapped={false} />
          </mesh>
          <mesh position={[0, peak.h * 0.99, 0]}>
            <circleGeometry args={[peak.r * 0.14, 12]} />
            <meshBasicMaterial color={P.pink} toneMapped={false} />
          </mesh>
        </group>
      ))}
      {/* cinta de ruta */}
      <mesh geometry={ribbon}>
        <meshBasicMaterial color={P.orange} toneMapped={false} transparent opacity={0.85} />
      </mesh>
      {/* anillos de contorno luminosos */}
      {[2.6, 3.15, 3.7].map((r, i) => (
        <mesh key={r} position={[0.1, -0.05 - i * 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r, r + 0.03, 80]} />
          <meshBasicMaterial
            color={i === 1 ? P.gold : P.pink}
            transparent
            opacity={0.3 - i * 0.06}
            side={THREE.DoubleSide}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
      {/* balizas seleccionables */}
      {BEACONS.map((b, i) => (
        <group
          key={b.id}
          position={[b.pos[0], b.pos[1], b.pos[2]]}
          ref={(el) => {
            beaconRefs.current[i] = el;
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(b.id);
          }}
          onPointerOver={cursor.over}
          onPointerOut={cursor.out}
        >
          <mesh position={[0, 0.34, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.68, 6]} />
            <meshBasicMaterial
              color={b.color}
              transparent
              opacity={opportunity === b.id ? 0.85 : 0.3}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[0, 0.72, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshBasicMaterial color={b.color} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.16, 0.012, 8, 24]} />
            <meshBasicMaterial
              color={b.color}
              transparent
              opacity={opportunity === b.id ? 0.9 : 0.35}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
      </group>
    </group>
  );
}

/* ═══════════ Fondo: portal, polvo, horizonte ═══════════ */

const RING_COLORS = [P.pink, P.orange, P.gold, P.orange, P.pink, P.gold];

export function Backdrop({ motion, baseX }: { motion: SceneMotion; baseX: number }) {
  const rings = useRef<Array<THREE.Mesh | null>>([]);
  const dust = useRef<THREE.Points>(null);
  const grid = useRef<THREE.GridHelper>(null);

  const dustGeo = useMemo(() => {
    let seed = 11;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const n = 340;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const palette = RING_COLORS.map((c) => new THREE.Color(c));
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (rnd() - 0.5) * 26;
      pos[i * 3 + 1] = (rnd() - 0.5) * 12;
      pos[i * 3 + 2] = -2 - rnd() * 16;
      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return g;
  }, []);
  useEffect(() => () => dustGeo.dispose(), [dustGeo]);

  const haloTex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext('2d')!;
    const grad = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
    grad.addColorStop(0, 'rgba(255,107,0,0.5)');
    grad.addColorStop(0.4, 'rgba(255,0,110,0.22)');
    grad.addColorStop(1, 'rgba(8,0,10,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
  useEffect(() => () => haloTex.dispose(), [haloTex]);

  useFrame(() => {
    const t = motion.timeRef.current;
    // En modo quieto el túnel queda congelado en el capítulo entero.
    const prog = motion.progRef.current;
    for (let i = 0; i < 6; i++) {
      const ring = rings.current[i];
      if (!ring) continue;
      // Anillos discretos que atraviesan Z con el scroll — atmósfera,
      // no una pared de neón sobre el texto.
      ring.position.z = -7 - i * 2.6 + prog * 0.9;
      ring.rotation.y = 0.18 + Math.sin(prog * 0.6 + i * 0.35) * 0.12;
      ring.rotation.x = 0.16;
      const fade = 1 - Math.min(1, Math.abs(ring.position.z) / 18);
      const m = ring.material as THREE.MeshBasicMaterial;
      m.opacity = 0.08 + fade * 0.12;
    }
    if (dust.current) {
      dust.current.rotation.y = t * 0.02;
      dust.current.position.y = -prog * 0.3;
    }
    if (grid.current) {
      grid.current.position.z = -4 + (prog % 1) * 2;
      (grid.current.material as THREE.Material).opacity = 0.075;
    }
  });

  return (
    <group>
      {/* halo cálido detrás del escenario */}
      <sprite position={[baseX, 0.4, -8]} scale={[11, 10, 1]}>
        <spriteMaterial
          map={haloTex}
          transparent
          opacity={0.32}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      {RING_COLORS.map((color, i) => (
        <mesh
          key={i}
          ref={(el) => {
            rings.current[i] = el;
          }}
          position={[baseX * 0.9, 0, -7 - i * 2.6]}
          rotation={[0.16, 0.18, 0]}
        >
          <torusGeometry args={[3.1 + i * 0.38, 0.012, 8, 110]} />
          <meshBasicMaterial color={color} transparent opacity={0.16} toneMapped={false} depthWrite={false} />
        </mesh>
      ))}
      <points ref={dust} geometry={dustGeo}>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <gridHelper
        ref={grid}
        args={[46, 46, '#571433', '#2a0a1c']}
        position={[baseX * 0.5, -3.2, -6]}
        material-transparent
        material-opacity={0.075}
        material-depthWrite={false}
      />
      {/* línea de horizonte */}
      <mesh position={[baseX * 0.5, -2.55, -15]}>
        <boxGeometry args={[30, 0.02, 0.02]} />
        <meshBasicMaterial color={P.orange} transparent opacity={0.16} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ═══════════ Chapter gate — pizarra que cubre el intercambio ═══════════ */

const GATE_COUNT = 220;
const BOARD_W = 9.6;
const BOARD_H = 6.0;

/**
 * Pizarra que se despliega sobre la escena saliente a mitad del salto
 * entre capítulos: tablero opaco con marco neón, ecuaciones de 3D
 * escritas con "tiza" y una hélice γ(t) flotando delante. El factor es
 * una función determinística del progreso suavizado — cerrada en
 * meseta al centro del segmento; en modo quieto queda solo un pulso
 * de fundido sobre el salto discreto.
 */
export function ChapterGate({ motion }: { motion: SceneMotion }) {
  const groupRef = useRef<THREE.Group>(null);
  const boardRef = useRef<THREE.Mesh>(null);
  const slateRef = useRef<THREE.Mesh>(null);
  const helixRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Sprite>(null);
  const intenRef = useRef(0);
  // El pulso también cubre el salto discreto de capítulo en modo quieto;
  // el intervalo repinta frames porque el frameloop pasa a 'demand'.
  const pulseRef = useRef(0);
  const lastFloorRef = useRef(-1);
  const pulseTimer = useRef<number | null>(null);
  const invalidate = useThree((s) => s.invalidate);
  useEffect(
    () => () => {
      if (pulseTimer.current !== null) clearInterval(pulseTimer.current);
    },
    []
  );

  const seeds = useMemo(() => {
    // Hash determinista por índice — sin estado mutable en render.
    const rnd = (i: number, salt: number) => {
      const s = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
      return s - Math.floor(s);
    };
    return {
      angle: Float32Array.from({ length: GATE_COUNT }, (_, i) => rnd(i, 1) * Math.PI * 2),
      jitter: Float32Array.from({ length: GATE_COUNT }, (_, i) => (rnd(i, 2) - 0.5) * 0.3),
      speed: Float32Array.from({ length: GATE_COUNT }, (_, i) => 0.8 + rnd(i, 3) * 1.4),
      zjit: Float32Array.from({ length: GATE_COUNT }, (_, i) => (rnd(i, 4) - 0.5) * 0.5),
    };
  }, []);

  const gateGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(GATE_COUNT * 3);
    const col = new Float32Array(GATE_COUNT * 3);
    const palette = [P.gold, P.orange, P.pink].map((c) => new THREE.Color(c));
    for (let i = 0; i < GATE_COUNT; i++) {
      const c = palette[i % 3];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return g;
  }, []);
  useEffect(() => () => gateGeo.dispose(), [gateGeo]);

  // Pizarra opaca: tablero con marco neón y ecuaciones de tiza.
  const boardTex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 640;
    const ctx = c.getContext('2d')!;

    // fondo de pizarra — opaco, con viñeta suave
    const bg = ctx.createLinearGradient(0, 0, 0, 640);
    bg.addColorStop(0, '#150a15');
    bg.addColorStop(0.55, '#0d0610');
    bg.addColorStop(1, '#0a040c');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1024, 640);
    const vig = ctx.createRadialGradient(512, 300, 120, 512, 320, 640);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, 1024, 640);

    // cuadrícula tenue
    ctx.strokeStyle = 'rgba(255,190,140,0.045)';
    ctx.lineWidth = 1;
    for (let x = 64; x < 1024; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 640);
      ctx.stroke();
    }
    for (let y = 64; y < 640; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // marco doble neón
    ctx.strokeStyle = '#ff6b00';
    ctx.lineWidth = 9;
    ctx.strokeRect(16, 16, 992, 608);
    ctx.strokeStyle = '#ff006e';
    ctx.lineWidth = 3;
    ctx.strokeRect(34, 34, 956, 572);
    // esquinas doradas
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 5;
    const corner = (x: number, y: number, dx: number, dy: number) => {
      ctx.beginPath();
      ctx.moveTo(x + dx * 52, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + dy * 52);
      ctx.stroke();
    };
    corner(46, 46, 1, 1);
    corner(978, 46, -1, 1);
    corner(46, 594, 1, -1);
    corner(978, 594, -1, -1);

    // tiza — doble trazo para efecto de gis
    const chalk = (
      text: string,
      x: number,
      y: number,
      size: number,
      rot: number,
      alpha = 1
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.font = `600 ${size}px Georgia, "Segoe UI", serif`;
      ctx.fillStyle = `rgba(255,240,214,${0.92 * alpha})`;
      ctx.fillText(text, 0, 0);
      ctx.fillStyle = `rgba(255,240,214,${0.3 * alpha})`;
      ctx.fillText(text, 1.6, 1.2);
      ctx.restore();
    };

    chalk('x² + y² + z² = r²', 84, 140, 62, -0.015);
    chalk('γ(t) = (cos t, sin t, t)', 520, 215, 48, 0.012);
    chalk('z = sin x · cos y', 120, 300, 60, 0.02);
    chalk('∫∫∫ᴠ  f · dV', 660, 470, 62, -0.02);
    chalk('∂z/∂x = cos x · cos y', 96, 540, 42, 0.008, 0.85);
    chalk('∇ · F', 420, 380, 66, -0.01, 0.9);
    chalk('u = r cos θ', 720, 320, 46, 0.02, 0.75);

    // bosquejo de esfera en tiza dorada (arriba-derecha)
    ctx.strokeStyle = 'rgba(255,215,0,0.85)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(880, 175, 82, 82, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,215,0,0.45)';
    ctx.beginPath();
    ctx.ellipse(880, 175, 82, 28, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(880, 175, 28, 82, 0, 0, Math.PI * 2);
    ctx.stroke();

    // ejes de coordenadas pequeños (abajo-derecha)
    ctx.strokeStyle = 'rgba(255,0,110,0.75)';
    ctx.lineWidth = 2.5;
    const axis = (x1: number, y1: number, x2: number, y2: number) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };
    axis(830, 560, 940, 560);
    axis(885, 600, 885, 505);
    axis(885, 560, 920, 520);
    chalk('x', 945, 568, 30, 0, 0.8);
    chalk('y', 890, 495, 30, 0, 0.8);
    chalk('z', 928, 512, 30, 0, 0.8);

    // subrayado de tiza bajo la ecuación principal
    ctx.strokeStyle = 'rgba(255,107,0,0.7)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(86, 168);
    ctx.bezierCurveTo(200, 178, 330, 162, 452, 172);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, []);
  useEffect(() => () => boardTex.dispose(), [boardTex]);

  const glowTex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext('2d')!;
    const grad = ctx.createRadialGradient(128, 128, 4, 128, 128, 128);
    grad.addColorStop(0, 'rgba(255,215,0,0.7)');
    grad.addColorStop(0.3, 'rgba(255,107,0,0.4)');
    grad.addColorStop(0.7, 'rgba(255,0,110,0.18)');
    grad.addColorStop(1, 'rgba(8,0,10,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
  useEffect(() => () => glowTex.dispose(), [glowTex]);

  // Hélice γ(t) = (cos t, sin t, t) — la ecuación de la pizarra en 3D.
  const helixGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 180; i++) {
      const t = (i / 180) * Math.PI * 4;
      pts.push(
        new THREE.Vector3(Math.cos(t) * 0.75, Math.sin(t) * 0.75, t * 0.14 - 0.9)
      );
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 220, 0.02, 8);
  }, []);
  useEffect(() => () => helixGeo.dispose(), [helixGeo]);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const t = motion.timeRef.current;
    const p = Math.min(4, Math.max(0, motion.progRef.current));
    const still = motion.stillRef.current;
    const floor = Math.floor(p + 0.0001);
    if (lastFloorRef.current < 0) lastFloorRef.current = floor;
    if (floor !== lastFloorRef.current) {
      lastFloorRef.current = floor;
      pulseRef.current = 1;
      // En 'demand' no hay frames continuos — repinta hasta fundir el pulso.
      if (still && pulseTimer.current === null) {
        let n = 0;
        pulseTimer.current = window.setInterval(() => {
          invalidate();
          if (++n > 40 && pulseTimer.current !== null) {
            clearInterval(pulseTimer.current);
            pulseTimer.current = null;
          }
        }, 33);
      }
    }
    pulseRef.current *= Math.exp(-delta * 2.6);
    const frac = p - Math.floor(p);
    // Pizarra desplegada en una meseta amplia al centro del segmento —
    // el swap ocurre detrás. En modo quieto solo queda el pulso.
    const plateau = still
      ? 0
      : smooth(frac / 0.28) * (1 - smooth((frac - 0.62) / 0.28));
    const gate = Math.max(plateau, pulseRef.current);
    intenRef.current +=
      (gate - intenRef.current) * (1 - Math.exp(-delta * 6));
    const inten = intenRef.current;
    g.visible = inten > 0.02;
    if (!g.visible) return;

    // Escala de la pizarra: crece hasta cubrir toda la composición.
    const s = 0.06 + Math.pow(inten, 1.2) * 0.94;
    g.rotation.y = motion.frameRef.current.pointerX * 0.22;
    g.rotation.x = Math.sin(t * 0.5) * 0.06;

    const board = boardRef.current;
    if (board) {
      board.scale.setScalar(s);
      board.rotation.z = (1 - inten) * 0.14;
      (board.material as THREE.MeshBasicMaterial).opacity = Math.min(
        1,
        inten * 2.4
      );
    }

    const slate = slateRef.current;
    if (slate) {
      slate.scale.setScalar(s);
      slate.rotation.z = board ? board.rotation.z : 0;
      (slate.material as THREE.MeshBasicMaterial).opacity = Math.min(
        1,
        inten * 2.4
      );
    }

    const helix = helixRef.current;
    if (helix) {
      helix.scale.setScalar(s * 1.15);
      helix.rotation.y += delta * (0.9 + inten * 1.4);
      helix.rotation.x = 0.35 + Math.sin(t * 0.7) * 0.1;
      (helix.material as THREE.MeshBasicMaterial).opacity = inten;
    }

    const glow = glowRef.current;
    if (glow) {
      glow.scale.setScalar(s * 13);
      (glow.material as THREE.SpriteMaterial).opacity = inten * 0.45;
    }

    const pts = pointsRef.current;
    if (pts) {
      const pos = pts.geometry.attributes.position as THREE.BufferAttribute;
      // Tiza en el aire — órbita elíptica abrazando el borde de la pizarra.
      const swirl = 0.7 + inten * 2.0;
      const bx = (BOARD_W / 2 + 0.25) * s;
      const by = (BOARD_H / 2 + 0.25) * s;
      for (let i = 0; i < GATE_COUNT; i++) {
        const a = seeds.angle[i] + t * seeds.speed[i] * swirl;
        pos.setXYZ(
          i,
          Math.cos(a) * (bx + seeds.jitter[i]),
          Math.sin(a) * (by + seeds.jitter[i] * 0.7),
          seeds.zjit[i] * 0.5 + Math.sin(a * 3 + t * 2.1) * 0.1
        );
      }
      pos.needsUpdate = true;
      const pm = pts.material as THREE.PointsMaterial;
      pm.opacity = inten * 0.9;
      pm.size = 0.03 + inten * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 1.4]} visible={false}>
      {/* glow radial detrás de la pizarra */}
      <sprite ref={glowRef} position={[0, 0, -0.5]}>
        <spriteMaterial
          map={glowTex}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      {/* reverso/marco de la pizarra — borde neón visible */}
      <mesh ref={slateRef} position={[0, 0, -0.06]}>
        <planeGeometry args={[BOARD_W + 0.34, BOARD_H + 0.34]} />
        <meshBasicMaterial color="#ff2f92" transparent opacity={0} />
      </mesh>
      {/* pizarra opaca — tapa por completo la escena saliente */}
      <mesh ref={boardRef}>
        <planeGeometry args={[BOARD_W, BOARD_H]} />
        <meshBasicMaterial map={boardTex} transparent opacity={0} />
      </mesh>
      {/* hélice 3D flotando delante — la ecuación γ(t) viva */}
      <mesh ref={helixRef} geometry={helixGeo} position={[0, 0, 0.7]}>
        <meshBasicMaterial
          color={P.gold}
          transparent
          opacity={0}
          toneMapped={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* polvo de tiza orbitando el borde */}
      <points ref={pointsRef} geometry={gateGeo}>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
