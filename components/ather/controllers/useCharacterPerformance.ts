"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Object3D } from "three";
import { blendBoneDeltas, jumpLiftAt, phaseWeights, smoothstep } from "@/components/ather/models/scenes";

type BoneNode = Object3D & { isBone: true };
type BoneMap = Record<string, BoneNode>;
type QuaternionMap = Record<string, THREE.Quaternion>;

function collectBones(root: Object3D) {
  const map: BoneMap = {};
  root.traverse((obj) => {
    if ((obj as BoneNode).isBone) {
      map[obj.name] = obj as BoneNode;
    }
  });
  return map;
}

export function useCharacterPerformance(root: Object3D | null, progressRef: React.MutableRefObject<number>) {
  const bonesRef = useRef<BoneMap>({});
  const restRotations = useRef<QuaternionMap>({});
  const jumpStart = useRef<number | null>(null);
  const extra = useMemo(() => new THREE.Euler(), []);
  const extraQ = useMemo(() => new THREE.Quaternion(), []);

  /**
   * The GLB's three "clips" are all the same static T-pose — there is no
   * authored animation, so the entire performance is built procedurally.
   * Each frame the bone is reset to its captured bind pose and multiplied by
   * the phase delta plus live oscillations, so nothing accumulates.
   */
  useLayoutEffect(() => {
    if (!root) return;
    const bones = collectBones(root);
    bonesRef.current = bones;
    restRotations.current = Object.fromEntries(
      Object.entries(bones).map(([name, bone]) => [name, bone.quaternion.clone()]),
    );
  }, [root]);

  useFrame(({ clock, pointer }) => {
    if (!root) return;
    if (!Object.keys(bonesRef.current).length) {
      bonesRef.current = collectBones(root);
    }

    const t = clock.getElapsedTime();
    const p = progressRef.current;
    const { pose } = blendBoneDeltas(p);

    // Continuous phase envelopes — gestures ramp instead of snapping.
    const { actW, waveW, spinW, closeW, thinkW, jumpW } = phaseWeights(p);

    // Timed double-hop: triggers once when the jump phase becomes dominant and
    // replays if the user scrolls back into it. Lift is normalized for bones.
    if (jumpW > 0.4 && jumpStart.current === null) jumpStart.current = t;
    if (jumpW < 0.05) jumpStart.current = null;
    const lift = jumpStart.current === null ? 0 : jumpLiftAt(t - jumpStart.current);
    const liftN = Math.min(lift / 0.42, 1);

    // Early hello: both arms open outward in welcome — hands stay off the face.
    const greetW = smoothstep(0.06, 0.14, p) * (1 - smoothstep(0.18, 0.27, p));
    const greetFlap = Math.sin(t * 7.4) * greetW;
    const greetSway = Math.sin(t * 2.2) * greetW;
    // Pondering: slow head sway + fingers drumming the chin while thinking.
    const ponder = Math.sin(t * 1.6) * thinkW;
    const chinTap = Math.sin(t * 3.4) * thinkW;

    const breathe = Math.sin(t * 1.55) * 0.028;
    const nod = Math.sin(t * 1.7) * 0.028 + actW * Math.sin(t * 2.6) * 0.05;
    const expression = Math.sin(t * 5.2) * (0.014 + 0.06 * actW);
    const glance = Math.sin(t * 0.9) * (0.045 + 0.08 * actW);
    const wander = Math.sin(t * 0.23) * (0.06 * closeW + 0.02);
    // Sharp occasional dip — reads as a blink/emphasis at close range.
    const blink = Math.pow(Math.max(0, Math.sin(t * 0.9 + 1.2)), 14) * 0.09;
    const talk = Math.max(0, Math.sin(t * 0.5)) * Math.sin(t * 7.2) * 0.035 * (1 - actW);
    const headCock = Math.sin(t * 0.31) * (0.05 * closeW + 0.03);
    const lookX = pointer.x * (0.05 + 0.12 * Math.max(waveW, closeW));
    const lookY = pointer.y * (0.03 + 0.07 * Math.max(waveW, closeW));
    const gesture = Math.sin(t * 2.2);
    // Follow-through: forearms and hands trail the torso by a fraction of a beat.
    const gestureAccent = Math.sin(t * 4.4 + 0.8);
    const gestureLag = Math.sin((t - 0.14) * 4.4 + 0.8);
    const handLag = Math.sin((t - 0.26) * 4.4 + 0.8);
    const sway = Math.sin(t * 0.7);
    const twist = Math.sin(t * 1.3);
    const waveSway = Math.sin(t * 3.4) * waveW;
    const waveFlap = Math.sin(t * 6.8) * waveW;
    const waveWobble = Math.sin(t * 4.1 + 1) * waveW;
    // Rhythmic up-down pump while the jump scene is active.
    const jumpFlap = Math.sin(t * 5.6) * 0.24 * jumpW;
    // Overshoot while the arm rises — anticipation/follow-through on the wave.
    const overshoot = Math.sin(Math.min(waveW, 1) * Math.PI);

    const overlay: Record<string, true> = {
      "mixamorigHips": true,
      "mixamorigSpine": true,
      "mixamorigSpine1": true,
      "mixamorigSpine2": true,
      "mixamorigNeck": true,
      "mixamorigHead": true,
      "mixamorigLeftShoulder": true,
      "mixamorigRightShoulder": true,
      "mixamorigLeftArm": true,
      "mixamorigRightArm": true,
      "mixamorigLeftForeArm": true,
      "mixamorigRightForeArm": true,
      "mixamorigLeftHand": true,
      "mixamorigRightHand": true,
      "mixamorigLeftUpLeg": true,
      "mixamorigRightUpLeg": true,
      "mixamorigLeftLeg": true,
      "mixamorigRightLeg": true,
    };

    Object.keys(overlay).forEach((name) => {
      const bone = bonesRef.current[name];
      const rest = restRotations.current[name];
      if (!bone || !rest) return;
      const delta = pose[name] ?? [0, 0, 0];
      extra.set(delta[0], delta[1], delta[2], "XYZ");

      if (name === "mixamorigHips") {
        extra.z += actW * gesture * 0.07 + sway * 0.03 - waveW * 0.04;
        extra.y += actW * twist * 0.09;
        extra.x += actW * Math.abs(Math.sin(t * 3.1)) * -0.03;
      }
      if (name === "mixamorigSpine") {
        extra.x += breathe + liftN * 0.08;
        extra.z += actW * gesture * 0.06 + sway * 0.025;
        extra.y += actW * twist * 0.16;
      }
      if (name === "mixamorigSpine1" || name === "mixamorigSpine2") {
        extra.x += breathe * 0.75;
        extra.z += actW * gesture * 0.05;
        extra.y += actW * twist * 0.12;
      }
      if (name === "mixamorigHead") {
        extra.x += nod + expression * 0.35 - lookY + talk + blink + chinTap * 0.02;
        extra.y += lookX + glance + wander + expression * 0.32;
        extra.z += Math.sin(t * 3.8) * (0.02 + 0.05 * actW) + spinW * 0.08 + headCock + ponder * 0.05;
      }
      if (name === "mixamorigNeck") {
        extra.x += nod * 0.5 - lookY * 0.35 + talk * 0.4 + blink * 0.5;
        extra.y += lookX * 0.4 + glance * 0.35 + wander * 0.4;
        extra.z += headCock * 0.5;
      }
      if (name === "mixamorigLeftShoulder" || name === "mixamorigRightShoulder") {
        // -X lifts the shoulder: rises with each breath, shrugs during the act.
        extra.x += breathe * -1.4 + actW * gesture * -0.1;
      }
      if (name === "mixamorigLeftArm") {
        // +X lowers the arm; spinW opens it toward horizontal during the turn.
        // Both arms flap up-down out at the sides while airborne; jumpFlap
        // keeps a continuous wing rhythm through the whole jump scene.
        extra.x += actW * gesture * 0.38 - spinW * 0.45 - liftN * 0.45 - greetW * 0.8 - jumpFlap;
        // Forward swing during the act; opens outward for the welcome gesture.
        extra.z += actW * (0.08 + gestureAccent * 0.18) + greetW * (0.3 + greetSway * 0.06);
        extra.y += actW * twist * 0.08;
      }
      if (name === "mixamorigRightArm") {
        // Same flap as the left arm — both beat up-down together mid-jump.
        extra.x += actW * -gesture * 0.38 - spinW * 0.45 + waveW * waveFlap * 0.08 - overshoot * 0.12 - liftN * 0.45 - greetW * 0.8 - jumpFlap;
        // +Z on the right arm swings it backward — opposite phase to the left,
        // so the arms scissor alternately instead of crossing in front.
        extra.z += actW * (0.1 + gestureAccent * 0.15) - greetW * (0.3 + greetSway * 0.06);
        extra.y += actW * -twist * 0.08;
      }
      if (name === "mixamorigLeftForeArm") {
        extra.x += actW * (0.12 + gestureLag * 0.38) + greetW * 0.3;
        extra.z += greetW * 0.3 + waveSway * -0.3;
        extra.y += waveWobble * -0.15;
        // Elbow clamp: deep folds would push the hand through the torso.
        extra.x = THREE.MathUtils.clamp(extra.x, -0.6, 1.35);
      }
      if (name === "mixamorigRightForeArm") {
        // Opposite phase to the left — elbows bend one at a time.
        extra.x += actW * (0.12 - gestureLag * 0.34) + greetW * 0.3;
        extra.z += waveSway * 0.3 - greetW * 0.3;
        extra.y += waveWobble * 0.15;
        extra.x = THREE.MathUtils.clamp(extra.x, -0.6, 1.35);
      }
      if (name === "mixamorigRightHand") {
        extra.z += waveFlap * 0.6 + actW * handLag * 0.15 - greetW * 0.15 - greetFlap * 0.2 + chinTap * 0.08;
        extra.y += waveSway * 0.3;
        extra.x += actW * gesture * 0.15;
      }
      if (name === "mixamorigLeftHand") {
        extra.x += actW * (0.06 + handLag * 0.15);
        extra.z += actW * -handLag * 0.15 + greetW * 0.15 + greetFlap * 0.2 + waveFlap * -0.6 + chinTap * -0.08;
        extra.y += waveSway * -0.3;
      }
      if (name === "mixamorigLeftUpLeg" || name === "mixamorigRightUpLeg") {
        // Opposite-phase knee groove — weight shift while performing.
        extra.x += actW * gesture * (name === "mixamorigLeftUpLeg" ? 0.08 : -0.08);
        // Alternating knee lifts — a little two-step while it performs.
        extra.x += actW * Math.max(0, Math.sin(t * 3.1 + (name === "mixamorigLeftUpLeg" ? 0 : Math.PI))) * 0.3;
        // Knees pull up while airborne.
        extra.x += liftN * 0.6;
      }
      if (name === "mixamorigLeftLeg" || name === "mixamorigRightLeg") {
        // Shins follow the knee lifts and fold mid-jump.
        extra.x += actW * Math.max(0, Math.sin(t * 3.1 + (name === "mixamorigLeftLeg" ? 0 : Math.PI))) * 0.45;
        extra.x += liftN * 0.85;
      }

      extraQ.setFromEuler(extra);
      bone.quaternion.copy(rest).multiply(extraQ);
    });
  }, 1);
}
