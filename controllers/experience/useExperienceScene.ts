'use client';

// ═══════════════════════════════════════════
// CONTROLADOR DE ESCENA — /experience
// Hooks reutilizables de movimiento por frame: coreografía de
// cámara/escenario, envolventes de capítulo y pose del robot.
// Las vistas solo construyen mallas; el movimiento vive aquí.
// ═══════════════════════════════════════════

import { useLayoutEffect, useMemo, useRef } from 'react';
import type * as React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { Object3D } from 'three';
import { blendBoneDeltas } from '@/components/ather/models/scenes';
import type { ExperienceFrame } from './useExperienceController';

/* ── Motion context shared by every object in the canvas ── */
export interface SceneMotion {
  frameRef: React.RefObject<ExperienceFrame>;
  stillRef: React.RefObject<boolean>;
  /** Local time in seconds — only advances while motion is allowed. */
  timeRef: React.RefObject<number>;
  /** Smoothed chapter progress — every chapter-driven consumer reads this. */
  progRef: React.RefObject<number>;
}

/* ── Viewport-derived stage layout ── */
export interface StageLayout {
  baseX: number;
  fitScale: number;
  width: number;
  height: number;
  compact: boolean;
}

const CAM_Z = 9.5;
const CAM_FOV = 38;
const VISIBLE_H = 2 * Math.tan((CAM_FOV * Math.PI) / 360) * CAM_Z;

export const smooth = (t: number) => {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
};

/** Quintic smootherstep — flatter ends than cubic smooth, cinematic blends. */
const smootherstep = (t: number) => {
  const x = Math.max(0, Math.min(1, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
};

/**
 * Scenes morph almost continuously while scrolling — a brief ~12% dwell
 * per chapter, then a long quintic glide toward the next stop. The morph
 * midpoint sits exactly mid-segment, where the chapter gate is closed.
 */
const heldProgress = (progress: number) => {
  const p = Math.max(0, Math.min(4, progress));
  const i = Math.floor(p);
  return i + smootherstep((p - i - 0.12) / 0.88);
};

/** Continuous 0→1 envelope peaking at a held chapter stop. */
export const chapterWeight = (progress: number, center: number) =>
  1 - smooth(Math.abs(heldProgress(progress) - center));

/** Delta-based exponential damping — framerate independent. */
export const dampFactor = (delta: number) => 1 - Math.exp(-delta * 7);

const dampNum = (current: number, target: number, k: number) =>
  current + (target - current) * k;

/**
 * Advances the shared local clock. All autonomous loops derive from
 * `motion.timeRef`, so pausing / reduced motion / hidden tab freezes
 * every animation at once.
 */
export function useSceneClock(motion: SceneMotion) {
  const { timeRef, stillRef, progRef } = motion;
  useFrame((_, delta) => {
    if (!stillRef.current) {
      timeRef.current += Math.min(delta, 0.05);
    }
    // Smoothed chapter progress — the single value every chapter-driven
    // consumer reads. Still mode still resolves to discrete chapters.
    const raw = motion.frameRef.current.progress;
    const target = stillRef.current ? Math.floor(raw) : raw;
    if (progRef.current < 0) {
      progRef.current = target; // no sweep on load/restore
      return;
    }
    const k = stillRef.current ? 1 : 1 - Math.exp(-delta * 2.1);
    progRef.current += (target - progRef.current) * k;
  });
}

/** Stage placement: right-framed on desktop, centered on compact. */
export function useStageLayout(compact: boolean): StageLayout {
  const size = useThree((s) => s.size);
  return useMemo(() => {
    const aspect = size.width / Math.max(1, size.height);
    const width = VISIBLE_H * aspect;
    return {
      baseX: compact ? 0 : width * 0.235,
      // Fit the whole composition inside the visible width on any aspect;
      // the stage should read ~450-550px tall at 1440, ~180-240px at 390.
      fitScale: Math.max(0.55, Math.min(1.3, width / (compact ? 6.2 : 9.8))),
      width,
      height: VISIBLE_H,
      compact,
    };
  }, [size.width, size.height, compact]);
}

/**
 * Positions the stage group and applies drag yaw + idle sway.
 * Pointer parallax stays subtle — the copy column must stay clear.
 */
export function useStageRig(
  ref: React.RefObject<THREE.Group | null>,
  motion: SceneMotion,
  layout: StageLayout
) {
  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    const frame = motion.frameRef.current;
    const t = motion.timeRef.current;
    const k = motion.stillRef.current ? 1 : dampFactor(delta);
    const idle = motion.stillRef.current ? 0 : Math.sin(t * 0.35) * 0.05;
    g.position.x = dampNum(g.position.x, layout.baseX, k);
    g.position.y = dampNum(g.position.y, layout.compact ? 0.1 : 0, k);
    g.rotation.y = dampNum(g.rotation.y, frame.yaw + idle, k);
    const s = dampNum(g.scale.x, layout.fitScale, k);
    g.scale.setScalar(s);
  });
}

/**
 * Chapter envelope: smooth weight, scale visibility toggle, plus a
 * callback for per-object float/recede motion.
 */
export function useChapterGroup(
  ref: React.RefObject<THREE.Group | null>,
  motion: SceneMotion,
  centers: number[],
  onFrame?: (g: THREE.Group, w: number, t: number, k: number) => void
) {
  // The smoothed envelope lives in a ref — never read g.scale back, that
  // would compound with anything onFrame writes on top.
  const envelope = useRef(0);
  // Last applied entrance-sweep offset — reverted each frame so handlers
  // that don't reset position.y/rotation.y (e.g. MascotGroup, ImmersionSet)
  // don't accumulate the offset while resting mid-segment.
  const sweep = useRef({ y: 0, rot: 0 });
  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    g.position.y -= sweep.current.y;
    g.rotation.y -= sweep.current.rot;
    const p = motion.progRef.current;
    let target = 0;
    for (const center of centers) target += chapterWeight(p, center);
    target = Math.min(1, target);
    const k = motion.stillRef.current ? 1 : 1 - Math.exp(-delta * 3.0);
    envelope.current += (target - envelope.current) * k;
    g.scale.setScalar(Math.max(0.0001, envelope.current));
    // Skip draw entirely once the group has collapsed.
    g.visible = target > 0.002 || envelope.current > 0.004;
    onFrame?.(g, envelope.current, motion.timeRef.current, k);
    // Directional entrance sweep — scenes glide out of / into the gate.
    const nearest = centers.reduce(
      (a, b) => (Math.abs(p - b) < Math.abs(p - a) ? b : a),
      centers[0]
    );
    const dir = Math.sign(p - nearest) || 1;
    const ease = 1 - envelope.current;
    sweep.current.y = ease * -0.85 * dir;
    sweep.current.rot = ease * 0.45 * dir;
    g.position.y += sweep.current.y;
    g.rotation.y += sweep.current.rot;
  });
}

/**
 * Camera choreography: fixed distance with a gentle mid-journey dolly
 * and capped pointer parallax. The camera looks at world origin — the
 * stage group carries the right-side framing via layout.baseX.
 */
export function useCameraChoreo(motion: SceneMotion) {
  const look = useMemo(() => new THREE.Vector3(), []);
  useFrame((state, delta) => {
    const frame = motion.frameRef.current;
    const p = Math.min(4, Math.max(0, motion.progRef.current));
    const k = motion.stillRef.current ? 1 : 1 - Math.exp(-delta * 4.2);
    const dolly = motion.stillRef.current
      ? 0
      : -0.55 * Math.sin((p / 4) * Math.PI) + chapterWeight(p, 1) * -0.35;
    const par = motion.stillRef.current ? 0 : 1;
    const cam = state.camera;
    cam.position.x = dampNum(cam.position.x, frame.pointerX * 0.16 * par, k);
    cam.position.y = dampNum(cam.position.y, 0.16 + frame.pointerY * 0.12 * par, k);
    cam.position.z = dampNum(cam.position.z, CAM_Z + dolly, k);
    // Look at world origin — the stage's right placement comes from
    // layout.baseX on the stage group, not from shifting the camera.
    look.set(0, 0.05, 0);
    cam.lookAt(look);
  });
}

/* ── Robot posing ── */

type BoneNode = Object3D & { isBone: true };
const normBone = (name: string) => name.replace(/:/g, '');

const POSE_BONES = [
  'mixamorigHips',
  'mixamorigSpine',
  'mixamorigSpine1',
  'mixamorigSpine2',
  'mixamorigNeck',
  'mixamorigHead',
  'mixamorigLeftShoulder',
  'mixamorigRightShoulder',
  'mixamorigLeftArm',
  'mixamorigRightArm',
  'mixamorigLeftForeArm',
  'mixamorigRightForeArm',
  'mixamorigLeftHand',
  'mixamorigRightHand',
];

export const GREETING_SECONDS = 2.5;

/**
 * Procedural pose for the cloned Athernixito skeleton: bind pose +
 * blended clip offsets from components/ather/models/scenes.ts, a short
 * wave while greeting, tiny pointer look and idle breathing. Every
 * autonomous term derives from motion.timeRef — frozen while still.
 */
export function useAthernixitoPose(
  root: Object3D | null,
  motion: SceneMotion,
  accent: number
) {
  const bones = useRef<Record<string, BoneNode>>({});
  const rest = useRef<Record<string, THREE.Quaternion>>({});
  const greetStart = useRef<number | null>(null);
  const seenGreeting = useRef(0);
  const tmpE = useMemo(() => new THREE.Euler(), []);
  const tmpQ = useMemo(() => new THREE.Quaternion(), []);

  useLayoutEffect(() => {
    if (!root) return;
    const map: Record<string, BoneNode> = {};
    root.traverse((obj) => {
      if ((obj as BoneNode).isBone) map[normBone(obj.name)] = obj as BoneNode;
    });
    bones.current = map;
    rest.current = Object.fromEntries(
      Object.entries(map).map(([name, bone]) => [name, bone.quaternion.clone()])
    );
  }, [root]);

  useFrame(() => {
    if (!root) return;
    const frame = motion.frameRef.current;
    const t = motion.timeRef.current;

    if (frame.greeting !== seenGreeting.current) {
      seenGreeting.current = frame.greeting;
      greetStart.current = t;
    }
    const gt = greetStart.current === null ? Infinity : t - greetStart.current;
    const greetW =
      gt < GREETING_SECONDS ? Math.sin(Math.min(gt / GREETING_SECONDS, 1) * Math.PI) : 0;

    const { pose } = blendBoneDeltas(greetW > 0 ? 0.95 : 0.16);
    const breathe = Math.sin(t * 1.55) * 0.028;
    const sway = Math.sin(t * 0.7) * 0.02;
    const lookX = frame.pointerX * 0.12;
    const lookY = frame.pointerY * 0.07;
    const glance = Math.sin(t * 0.9) * 0.045;
    const waveFlap = Math.sin(t * 7.2) * greetW;
    // Topics shift the pose accent — the UI selection reads on the model.
    const accentTilt = (accent - 1) * 0.07;

    POSE_BONES.forEach((name) => {
      const bone = bones.current[name];
      const restQ = rest.current[name];
      if (!bone || !restQ) return;
      const delta = pose[name] ?? [0, 0, 0];
      tmpE.set(delta[0], delta[1], delta[2], 'XYZ');

      if (name === 'mixamorigHips') {
        tmpE.z += sway;
      }
      if (name === 'mixamorigSpine' || name === 'mixamorigSpine1' || name === 'mixamorigSpine2') {
        tmpE.x += breathe * (name === 'mixamorigSpine' ? 1 : 0.7);
        tmpE.z += sway * 0.6;
      }
      if (name === 'mixamorigHead') {
        tmpE.y += lookX + glance + accentTilt;
        tmpE.x += -lookY + Math.sin(t * 1.7) * 0.02;
        tmpE.z += accentTilt * 0.6 + Math.sin(t * 0.31) * 0.04;
      }
      if (name === 'mixamorigNeck') {
        tmpE.y += lookX * 0.4 + glance * 0.4;
        tmpE.x += -lookY * 0.4;
      }
      if (name === 'mixamorigLeftShoulder' || name === 'mixamorigRightShoulder') {
        tmpE.x += breathe * -1.2;
      }
      if (name === 'mixamorigRightArm') {
        // Raise the right arm into the greeting wave.
        tmpE.x += -1.35 * greetW;
        tmpE.z += -0.25 * greetW;
      }
      if (name === 'mixamorigRightForeArm') {
        tmpE.x += 0.35 * greetW;
        tmpE.z += waveFlap * 0.35;
        tmpE.x = THREE.MathUtils.clamp(tmpE.x, -0.6, 1.35);
      }
      if (name === 'mixamorigLeftForeArm') {
        tmpE.x = THREE.MathUtils.clamp(tmpE.x, -0.6, 1.35);
      }
      if (name === 'mixamorigRightHand') {
        tmpE.z += waveFlap * 0.55;
      }
      if (name === 'mixamorigLeftArm') {
        tmpE.z += greetW * 0.15 + Math.sin(t * 0.8) * 0.02;
      }

      tmpQ.setFromEuler(tmpE);
      bone.quaternion.copy(restQ).multiply(tmpQ);
    });
  });
}
