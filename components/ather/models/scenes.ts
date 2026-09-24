export type Vec3 = [number, number, number];

export type CameraShot = {
  id: "profile" | "performance" | "thinking" | "jump" | "face";
  label: string;
  kicker: string;
  title: string;
  body: string;
  stats?: string[];
  position: Vec3;
  lookAt: Vec3;
  fov: number;
  characterYaw: number;
  roll: number;
};

/** Extra local Euler (radians) layered on the bind pose. */
export type BoneDelta = Partial<Record<string, Vec3>>;

export type PerformanceClip = {
  from: number;
  to: number;
  pose: BoneDelta;
  motion: "idle" | "act" | "think" | "jump" | "wave";
};

export const SCROLL_PAGES = 7.4;

/** Below this aspect ratio the camera eases back so the framing survives narrow screens. */
const ADAPT_MIN_ASPECT = 1.35;
const ADAPT_MAX_ZOOM = 2.15;

function adaptToAspect(position: Vec3, lookAt: Vec3, aspect: number): Vec3 {
  if (aspect >= ADAPT_MIN_ASPECT) return position;
  const zoom = Math.min(ADAPT_MIN_ASPECT / Math.max(aspect, 0.2), ADAPT_MAX_ZOOM);
  return [
    lookAt[0] + (position[0] - lookAt[0]) * zoom,
    lookAt[1] + (position[1] - lookAt[1]) * zoom,
    lookAt[2] + (position[2] - lookAt[2]) * zoom,
  ];
}

export const SHOTS: CameraShot[] = [
  {
    id: "profile",
    label: "01 — Conoce a Athernixito",
    kicker: "Tu guía VR",
    title: "Conoce a Athernixito",
    body: "Un compañero inteligente que aprende contigo en cada sesión.",
    stats: ["IA adaptativa", "24/7 disponible", "VR integrado"],
    position: [0.03, 0.74, 0.6],
    lookAt: [0.01, 0.715, 0.02],
    fov: 26,
    characterYaw: 0,
    roll: 0,
  },
  {
    id: "performance",
    label: "02 — En movimiento",
    kicker: "Asistente educativo",
    title: "Se mueve contigo",
    body: "Un robot IA diseñado para guiarte en tu aprendizaje inmersivo: brazos, piernas y torso en una coreografía continua.",
    stats: ["Chat conversacional", "Voz natural", "Gestos vivos"],
    position: [1.2, 0.78, 2.15],
    lookAt: [0, 0.46, 0],
    fov: 36,
    characterYaw: 0.28,
    roll: 0,
  },
  {
    id: "thinking",
    label: "03 — Pensando",
    kicker: "IA adaptativa",
    title: "Está pensando",
    body: "Analiza tu ritmo y prepara la siguiente lección. Míralo reflexionar antes de responderte.",
    stats: ["Analiza tu progreso", "Responde en vivo"],
    position: [0.62, 0.8, 1.35],
    lookAt: [-0.06, 0.7, 0],
    fov: 30,
    characterYaw: -0.18,
    roll: 0,
  },
  {
    id: "jump",
    label: "04 — Energía",
    kicker: "Celebra contigo",
    title: "Salta de emoción",
    body: "Cada logro lo celebra contigo: aprender en realidad virtual también es moverse.",
    stats: ["Celebra tus logros"],
    position: [0.7, 0.62, 2.5],
    lookAt: [0, 0.5, 0],
    fov: 38,
    characterYaw: 0.2,
    roll: 0,
  },
  {
    id: "face",
    label: "05 — Aprende contigo",
    kicker: "Habla con Ather",
    title: "Aprende contigo",
    body: "Adapta rutas de estudio, genera flashcards y responde dudas en tiempo real. Pregúntale sobre historia, ciencia, matemáticas o turismo virtual.",
    stats: ["Rutas de estudio", "Flashcards", "Dudas en vivo"],
    position: [-0.13, 0.77, 0.62],
    lookAt: [0, 0.78, 0.03],
    fov: 27,
    characterYaw: 0.55,
    roll: 0.14,
  },
];

export const CLIP_RANGES = {
  profile: [0, 0.26] as const,
  travelOut: [0.26, 0.36] as const,
  performance: [0.36, 0.5] as const,
  thinking: [0.5, 0.72] as const,
  jump: [0.68, 0.86] as const,
  travelIn: [0.86, 0.92] as const,
  face: [0.92, 1] as const,
};

/**
 * The GLB ships no real animation (its 3 "clips" are a single static T-pose),
 * so the whole performance is procedural. These poses are absolute local-Euler
 * offsets over the bind pose; windows overlap so blendBoneDeltas crossfades them.
 *
 * Axes verified against the GLB hierarchy: +X on either Arm lowers it toward
 * the body, −X raises it; Arm.z swings forward/backward; a raised RightForeArm
 * bends its hand toward the camera with −Z.
 */
const RELAXED: BoneDelta = {
  // Arms at mid height — halfway between down and raised, elbows softly
  // bent so the hands float beside the waist. Used at the start.
  "mixamorigLeftShoulder": [0.05, 0, 0],
  "mixamorigRightShoulder": [0.05, 0, 0],
  "mixamorigLeftArm": [0.3, 0, -0.06],
  "mixamorigRightArm": [0.3, 0, 0.06],
  "mixamorigLeftForeArm": [0.35, 0, -0.05],
  "mixamorigRightForeArm": [0.35, 0, 0.05],
  "mixamorigLeftHand": [0.1, 0, -0.08],
  "mixamorigRightHand": [0.1, 0, 0.08],
};

export const PERFORMANCE_CLIPS: PerformanceClip[] = [
  {
    from: 0,
    to: 0.26,
    motion: "idle",
    pose: {
      ...RELAXED,
      "mixamorigSpine": [0.02, 0.02, 0],
      "mixamorigHead": [0.01, -0.04, 0.02],
      "mixamorigNeck": [0.02, -0.02, 0],
    },
  },
  {
    from: 0.24,
    to: 0.52,
    motion: "act",
    pose: {
      "mixamorigLeftShoulder": [-0.1, 0, 0],
      "mixamorigRightShoulder": [-0.1, 0, 0],
      // Arms raised — the act oscillations pump them above the head in
      // opposite phase so they never meet or cross in front of the face.
      "mixamorigLeftArm": [-0.85, 0, -0.1],
      "mixamorigRightArm": [-0.85, 0, 0.1],
      "mixamorigLeftForeArm": [-0.25, 0, -0.05],
      "mixamorigRightForeArm": [-0.25, 0, 0.05],
      "mixamorigLeftHand": [0.1, 0, 0],
      "mixamorigRightHand": [0.1, 0, 0],
      "mixamorigSpine": [0.03, 0, 0.02],
      "mixamorigSpine1": [0.02, 0, -0.02],
      "mixamorigHips": [0, 0, 0.02],
      "mixamorigHead": [0.03, 0.04, 0],
      "mixamorigNeck": [0.02, 0.02, 0],
    },
  },
  {
    from: 0.5,
    to: 0.72,
    motion: "think",
    pose: {
      // Meditation: palms pressed together at the chest (namaste), head
      // gently bowed, legs folded in lotus. The character levitates while
      // this clip dominates — see Character.tsx.
      "mixamorigRightShoulder": [0.1, 0, 0],
      "mixamorigLeftShoulder": [0.1, 0, 0],
      "mixamorigRightArm": [0.95, 0.3, -0.55],
      "mixamorigLeftArm": [0.95, -0.3, 0.55],
      "mixamorigRightForeArm": [1.2, 0.15, -0.35],
      "mixamorigLeftForeArm": [1.2, -0.15, 0.35],
      "mixamorigRightHand": [0.2, 0, -0.15],
      "mixamorigLeftHand": [0.2, 0, 0.15],
      "mixamorigLeftUpLeg": [1.0, -0.45, 0.1],
      "mixamorigRightUpLeg": [1.0, 0.45, -0.1],
      "mixamorigLeftLeg": [1.5, 0, 0.1],
      "mixamorigRightLeg": [1.5, 0, -0.1],
      "mixamorigSpine": [0.05, 0, 0.01],
      "mixamorigHips": [0, 0.02, 0],
      "mixamorigHead": [0.12, 0, 0.05],
      "mixamorigNeck": [0.06, 0, 0.02],
    },
  },
  {
    from: 0.68,
    to: 0.86,
    motion: "jump",
    pose: {
      // Ready stance: knees soft, arms slightly out. The actual hop is timed —
      // lift/tuck is applied per-frame from jumpLiftAt, not baked into the pose.
      // Arms out to the sides near shoulder height — the jump pump flaps
      // them like wings, away from the legs.
      "mixamorigLeftArm": [0.15, 0, -0.05],
      "mixamorigRightArm": [0.15, 0, 0.05],
      "mixamorigLeftForeArm": [0.25, 0, -0.06],
      "mixamorigRightForeArm": [0.25, 0, 0.06],
      "mixamorigLeftHand": [0.1, 0, -0.06],
      "mixamorigRightHand": [0.1, 0, 0.06],
      "mixamorigLeftUpLeg": [0.35, 0, 0.03],
      "mixamorigRightUpLeg": [0.35, 0, -0.03],
      "mixamorigLeftLeg": [0.5, 0, 0],
      "mixamorigRightLeg": [0.5, 0, 0],
      "mixamorigSpine": [0.06, 0, 0],
      "mixamorigHead": [-0.02, 0, 0],
      "mixamorigNeck": [-0.02, 0, 0],
    },
  },
  {
    from: 0.82,
    to: 1,
    motion: "wave",
    pose: {
      // Both arms at mid height, mirrored — the wave wiggles live in the hands.
      "mixamorigLeftShoulder": [0.05, 0, 0],
      "mixamorigRightShoulder": [0.05, 0, 0],
      "mixamorigLeftArm": [0.3, 0, -0.06],
      "mixamorigRightArm": [0.3, 0, 0.06],
      "mixamorigLeftForeArm": [0.35, 0, -0.05],
      "mixamorigRightForeArm": [0.35, 0, 0.05],
      "mixamorigLeftHand": [0.1, 0, -0.08],
      "mixamorigRightHand": [0.1, 0, 0.08],
      "mixamorigSpine": [0.02, 0, 0.05],
      "mixamorigHips": [0, 0, -0.04],
      "mixamorigHead": [0.02, -0.08, -0.1],
      "mixamorigNeck": [0.02, -0.04, 0],
    },
  },
];

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function lerpVec3(a: Vec3, b: Vec3, t: number): Vec3 {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/**
 * Camera keyframes: shot index at each progress point. Between consecutive
 * keys the camera lerps with smoothstep, so shots "hold" wherever the same
 * index repeats and travel wherever it changes.
 */
const CAM_KEYS: { p: number; shot: number }[] = [
  { p: 0, shot: 0 },
  { p: 0.18, shot: 0 },
  { p: 0.34, shot: 1 },
  { p: 0.5, shot: 1 },
  { p: 0.6, shot: 2 },
  { p: 0.68, shot: 2 },
  { p: 0.76, shot: 3 },
  { p: 0.84, shot: 3 },
  { p: 0.92, shot: 4 },
  { p: 1, shot: 4 },
];

export function cameraFromProgress(progress: number, aspect = 1.6) {
  const p = Math.min(1, Math.max(0, progress));
  let i = 0;
  while (i < CAM_KEYS.length - 2 && p > CAM_KEYS[i + 1].p) i++;
  const a = CAM_KEYS[i];
  const b = CAM_KEYS[i + 1];
  const t = smoothstep(a.p, b.p, p);
  const sa = SHOTS[a.shot];
  const sb = SHOTS[b.shot];
  const lookAt = lerpVec3(sa.lookAt, sb.lookAt, t);
  // Full 360° turn while the wide shot plays, then settles into the diagonal.
  const spin = smoothstep(0.34, 0.5, p) * Math.PI * 2;
  return {
    position: adaptToAspect(lerpVec3(sa.position, sb.position, t), lookAt, aspect),
    lookAt,
    fov: lerp(sa.fov, sb.fov, t),
    characterYaw: lerp(sa.characterYaw, sb.characterYaw, t) + spin,
    roll: lerp(sa.roll, sb.roll, t),
    shotIndex: t < 0.5 ? a.shot : b.shot,
  };
}

/** Continuous 0-1 envelopes for each performance phase. */
export function phaseWeights(p: number) {
  const actW = smoothstep(0.28, 0.4, p) * (1 - smoothstep(0.46, 0.56, p));
  const thinkW = smoothstep(0.52, 0.6, p) * (1 - smoothstep(0.68, 0.76, p));
  const jumpW = smoothstep(0.7, 0.78, p) * (1 - smoothstep(0.82, 0.9, p));
  const waveW = smoothstep(0.86, 0.94, p);
  const spinW = smoothstep(0.32, 0.4, p) * (1 - smoothstep(0.46, 0.54, p));
  const closeW = Math.max(1 - actW - waveW - thinkW - jumpW, 0);
  return { actW, waveW, spinW, closeW, thinkW, jumpW };
}

/**
 * Timed double-hop for the jump scene. `jt` = seconds since the phase became
 * active; returns lift in world units — a big hop, a smaller follow-up, then a
 * gentle celebratory bob while the scene stays active.
 */
export function jumpLiftAt(jt: number) {
  const hop = (t0: number, dur: number, h: number) => {
    const u = (jt - t0) / dur;
    return u > 0 && u < 1 ? Math.sin(u * Math.PI) * h : 0;
  };
  const hops = hop(0.18, 0.66, 0.42) + hop(1.0, 0.55, 0.2);
  const settle = jt > 1.7 ? Math.abs(Math.sin(jt * 2.6)) * 0.035 : 0;
  return hops + settle;
}

export function blendBoneDeltas(progress: number): { pose: BoneDelta; motion: PerformanceClip["motion"] } {
  const active = PERFORMANCE_CLIPS.filter((c) => progress >= c.from && progress <= c.to);
  if (!active.length) {
    const last = PERFORMANCE_CLIPS[PERFORMANCE_CLIPS.length - 1];
    return { pose: last.pose, motion: last.motion };
  }
  if (active.length === 1) return { pose: active[0].pose, motion: active[0].motion };

  const [a, b] = active;
  const span = Math.max(0.0001, Math.min(a.to, b.to) - Math.max(a.from, b.from));
  const t = smoothstep(0, 1, (progress - Math.max(a.from, b.from)) / span);
  const keys = new Set([...Object.keys(a.pose), ...Object.keys(b.pose)]);
  const pose: BoneDelta = {};
  keys.forEach((key) => {
    const va = a.pose[key] ?? [0, 0, 0];
    const vb = b.pose[key] ?? [0, 0, 0];
    pose[key] = lerpVec3(va, vb, t);
  });
  return { pose, motion: t < 0.5 ? a.motion : b.motion };
}
