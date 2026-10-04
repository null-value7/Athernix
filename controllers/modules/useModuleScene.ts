'use client';

// ═══════════════════════════════════════════════════════════
// CONTROLADOR DE ESCENA — detalle de módulo
// Hooks R3F: reloj local, dolly de cámara por scroll + enfoque
// a hotspots, parallax de puntero. Las escenas solo construyen
// mallas; el movimiento vive aquí.
// ═══════════════════════════════════════════════════════════

import { useMemo, useRef } from 'react';
import type * as React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { ModuleFrame } from './useModuleDetailController';

/* ── Contexto de movimiento compartido por todas las mallas ── */
export interface ModuleMotion {
  frameRef: React.RefObject<ModuleFrame>;
  stillRef: React.RefObject<boolean>;
  /** Reloj local en segundos — solo avanza con movimiento permitido. */
  timeRef: React.RefObject<number>;
}

export const smooth = (t: number) => {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
};

/** Amortiguación exponencial — independiente del framerate. */
export const dampFactor = (delta: number) => 1 - Math.exp(-delta * 6);

export const dampNum = (cur: number, target: number, k: number) =>
  cur + (target - cur) * k;

/** Avanza el reloj local; pausa/reducción congela todo a la vez. */
export function useModuleClock(motion: ModuleMotion) {
  const { timeRef, stillRef } = motion;
  useFrame((_, delta) => {
    if (!stillRef.current) timeRef.current += Math.min(delta, 0.05);
  });
}

interface DollySpec {
  /** Posición de cámara en el hero (progreso 0). */
  heroPos: Vec3;
  /** Posición de cámara leyendo la sección de hotspots (progreso ~.5). */
  nearPos: Vec3;
  /** Altura del objetivo base de OrbitControls. */
  targetY: number;
}
type Vec3 = [number, number, number];

/**
 * Dolly por scroll + glide hacia el hotspot activo + reset.
 * Con OrbitControls makeDefault: solo movemos target y distancia,
 * el usuario conserva el arrastre/zoom siempre.
 */
export function useCameraDolly(
  motion: ModuleMotion,
  spec: DollySpec,
  targets: readonly Vec3[]
) {
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null;
  const seenReset = useRef(0);
  const focus = useMemo(() => new THREE.Vector3(), []);
  const camGoal = useMemo(() => new THREE.Vector3(), []);
  const hero = useMemo(() => new THREE.Vector3(...spec.heroPos), [spec.heroPos]);
  const near = useMemo(() => new THREE.Vector3(...spec.nearPos), [spec.nearPos]);
  const base = useMemo(() => new THREE.Vector3(0, spec.targetY, 0), [spec.targetY]);
  const spots = useMemo(
    () => targets.map((p) => new THREE.Vector3(...p)),
    [targets]
  );

  useFrame((state, delta) => {
    const c = controls;
    if (!c) return;
    const f = motion.frameRef.current;
    const k = motion.stillRef.current ? 1 : dampFactor(delta);

    if (f.reset !== seenReset.current) {
      seenReset.current = f.reset;
      c.reset();
      state.camera.position.copy(hero);
      c.target.copy(base);
      c.update();
    }

    // Objetivo: hotspot seleccionado o centro base.
    focus.copy(base);
    if (f.hotspot >= 0 && spots[f.hotspot]) focus.copy(spots[f.hotspot]);
    c.target.lerp(focus, k * 0.8);

    // Dolly scroll: del hero a un plano más cercano/bajo a mitad de página.
    const dolly = smooth(f.progress * 1.6);
    camGoal.lerpVectors(hero, near, dolly);
    // Al enfocar un hotspot, acercarse un 40% hacia él.
    if (f.hotspot >= 0) {
      camGoal.lerp(focus, 0.35).y += 1.4;
    }
    state.camera.position.lerp(camGoal, k * 0.6);
    c.update();
  });
}

/** Parallax de puntero sobre un grupo padre — sutil y amortiguado. */
export function usePointerParallax(
  ref: React.RefObject<THREE.Group | null>,
  motion: ModuleMotion,
  strength = 0.14
) {
  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    const f = motion.frameRef.current;
    const k = motion.stillRef.current ? 1 : dampFactor(delta);
    const px = motion.stillRef.current ? 0 : f.pointerX;
    const py = motion.stillRef.current ? 0 : f.pointerY;
    g.rotation.y = dampNum(g.rotation.y, px * strength, k);
    g.rotation.x = dampNum(g.rotation.x, -py * strength * 0.45, k);
  });
}
