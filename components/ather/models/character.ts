export const CHARACTER_MODEL_PATH = "/models/Low-Poly.glb";

export const MIXAMO = {
  hips: "mixamorigHips",
  spine: "mixamorigSpine",
  spine1: "mixamorigSpine1",
  spine2: "mixamorigSpine2",
  neck: "mixamorigNeck",
  head: "mixamorigHead",
  leftShoulder: "mixamorigLeftShoulder",
  leftArm: "mixamorigLeftArm",
  leftForeArm: "mixamorigLeftForeArm",
  leftHand: "mixamorigLeftHand",
  rightShoulder: "mixamorigRightShoulder",
  rightArm: "mixamorigRightArm",
  rightForeArm: "mixamorigRightForeArm",
  rightHand: "mixamorigRightHand",
  leftUpLeg: "mixamorigLeftUpLeg",
  leftLeg: "mixamorigLeftLeg",
  rightUpLeg: "mixamorigRightUpLeg",
  rightLeg: "mixamorigRightLeg",
} as const;

export type BoneName = (typeof MIXAMO)[keyof typeof MIXAMO];

/** Armature already has ~0.091; this brings the character to ~1m so cinema cameras hit the face. */
export const CHARACTER_SCALE = 0.11;
export const CHARACTER_OFFSET: [number, number, number] = [0.006, 0, 0.046];
export const HEAD_FOCUS: [number, number, number] = [0, 0.73, 0.02];
export const CHEST_FOCUS: [number, number, number] = [0, 0.5, 0];
export const BODY_FOCUS: [number, number, number] = [0, 0.42, 0];
