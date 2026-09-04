"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import type { RobotState } from "./RobotCanvas";
import { FallbackRobot } from "./FallbackRobot";
import { assetUrl } from "@/lib/assets";

const TOTAL_ASSETS = 12;

/* ─── Tipos ─── */
type FaceExpression = "idle" | "happy" | "angry" | "distracted" | "pro";
type AnimName = "idle" | "dance" | "yay" | "waving" | "angry" | "lookingA";

/* ─── Rutas (desde /public) ─── */
const MODEL_PATH = assetUrl("/robot/model.glb");

const ANIM_PATHS: Record<AnimName, string> = {
  idle: assetUrl("/robot/animations/idle.glb"),
  dance: assetUrl("/robot/animations/sillydance.glb"),
  yay: assetUrl("/robot/animations/yaydance.glb"),
  waving: assetUrl("/robot/animations/waving.glb"),
  angry: assetUrl("/robot/animations/angry.glb"),
  lookingA: assetUrl("/robot/animations/lookingA.glb"),
};

const FACE_PATHS: Record<FaceExpression, string> = {
  idle: assetUrl("/robot/textures/Idle_Face.png"),
  happy: assetUrl("/robot/textures/Happy_Face.png"),
  angry: assetUrl("/robot/textures/Angry_Face.png"),
  distracted: assetUrl("/robot/textures/Distracted_Face.png"),
  pro: assetUrl("/robot/textures/Pro_Face.png"),
};

/* ─── Constantes ─── */
const MOVE_SPEED = 0.06;
const INITIAL_POS = new THREE.Vector3(1.4, -1.75, 3);
const INITIAL_ROT_Y = -0.4;

/* ─── Componente Principal ─── */
export function RobotModel({
  robotState,
  onProgress,
  onLoadComplete,
}: {
  robotState: RobotState;
  onProgress?: (progress: number) => void;
  onLoadComplete?: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const currentActionRef = useRef<THREE.AnimationAction | null>(null);
  const faceMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const faceNodeRef = useRef<THREE.Object3D | null>(null);
  const isPlayingSpecialRef = useRef(false);
  const clickCountRef = useRef(0);
  const wavingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const specialOnFinishedRef = useRef<((e: { action: THREE.AnimationAction }) => void) | null>(null);
  const isBlinkingRef = useRef(false);
  const lastBlinkRef = useRef(0);

  // Refs para detectar cambios de estado
  const prevModeRef = useRef<string | null>(null);
  const prevFocusRef = useRef(robotState.focusedInput);
  const prevSubmitRef = useRef(robotState.submitTrigger);
  const prevNeonActiveRef = useRef(robotState.neonActive);

  // Posición y rotación objetivo
  const targetPosRef = useRef(INITIAL_POS.clone());
  const targetRotRef = useRef(INITIAL_ROT_Y);

  // Estado de carga
  const [isLoading, setIsLoading] = useState(true);
  const [modelReady, setModelReady] = useState(false);
  const [mixerReady, setMixerReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const loadCompleteRef = useRef(false);

  const reportProgress = useCallback(
    (loaded: number) => {
      onProgress?.(Math.min(100, (loaded / TOTAL_ASSETS) * 100));
    },
    [onProgress]
  );

  const finishLoading = useCallback(() => {
    if (loadCompleteRef.current) return;
    loadCompleteRef.current = true;
    reportProgress(TOTAL_ASSETS);
    onLoadComplete?.();
  }, [onLoadComplete, reportProgress]);

  // Almacenar assets cargados
  const loadedModelRef = useRef<THREE.Group | null>(null);
  const loadedAnimationsRef = useRef<Record<AnimName, THREE.AnimationClip>>({} as any);
  const loadedTexturesRef = useRef<Record<FaceExpression, THREE.Texture>>({} as any);

  /* ─── Cargar assets de forma secuencial y robusta ─── */
  useEffect(() => {
    const gltfLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    let loadedCount = 0;

    const loadAssets = async () => {
      try {
        console.log("🤖 Iniciando carga de assets...");

        // 1. Cargar texturas faciales primero
        const faceMapping = {
          idle: 'Idle_Face.png',
          happy: 'Happy_Face.png',
          angry: 'Angry_Face.png',
          distracted: 'Distracted_Face.png',
          pro: 'Pro_Face.png'
        };

        for (const [key, fileName] of Object.entries(faceMapping)) {
          try {
            const tex = await new Promise<THREE.Texture>((resolve, reject) => {
              textureLoader.load(assetUrl(`/robot/textures/${fileName}`), resolve, undefined, reject);
            });
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.center.set(0.5, 0.5);
            tex.repeat.set(0.8, 0.8);
            tex.rotation = 0.0;
            tex.flipY = false;
            tex.needsUpdate = true;
            loadedTexturesRef.current[key as FaceExpression] = tex;
            loadedCount++;
            reportProgress(loadedCount);
            console.log(`✅ Textura cargada: ${key}`);
          } catch (e) {
            console.error(`❌ Error cargando textura ${key}:`, e);
            loadedCount++;
            reportProgress(loadedCount);
          }
        }

        // 2. Cargar modelo principal
        const baseGltf = await new Promise<any>((resolve, reject) => {
          gltfLoader.load(MODEL_PATH, resolve, undefined, reject);
        });
        
        const model = baseGltf.scene;

        // Auto-escalar basado en el bounding box para altura consistente
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        console.log(`Modelo: tamaño original ${size.x.toFixed(2)} x ${size.y.toFixed(2)} x ${size.z.toFixed(2)}`);

        const TARGET_HEIGHT = 3.5;
        const MODEL_SCALE = size.y > 0 ? TARGET_HEIGHT / size.y : 1;
        model.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);

        const faceMeshUuids = new Set<string>();

        // Configurar materiales del modelo
        model.traverse((node: THREE.Object3D) => {
          const nodeName = (node.name || "").toLowerCase();
          const mesh = node as THREE.Mesh;
          const mat = mesh.material as THREE.MeshStandardMaterial | undefined;
          const matName = (mat?.name || "").toLowerCase();

          const nameMatches = (s: string) =>
            (s.includes("pantalla") &&
              (s.includes("expresiones") ||
                s.includes("expresion") ||
                s.includes("expreciones") ||
                s.includes("exprecion"))) ||
            s.includes("cara") ||
            s.includes("rostro");

          const isFaceName = nameMatches(nodeName) || nameMatches(matName);

          const currentName = faceNodeRef.current?.name.toLowerCase() ?? "";
          const isSpace =
            nodeName.includes("pantalla expresiones") ||
            nodeName.includes("pantalla_expresiones");
          const isBetter =
            !faceNodeRef.current ||
            (isSpace && !currentName.includes("pantalla expresiones"));

          if (isFaceName && isBetter) {
            faceNodeRef.current = node;
            console.log(`Pantalla facial encontrada: mesh="${node.name}"`);

            const faceMat = new THREE.MeshStandardMaterial({
              map: loadedTexturesRef.current.idle,
              emissiveMap: loadedTexturesRef.current.idle,
              emissive: new THREE.Color("#ff003c"),
              emissiveIntensity: 6.0,
              transparent: true,
              alphaTest: 0.1,
              roughness: 0.1,
              metalness: 0.1,
              side: THREE.DoubleSide,
            });

            node.traverse((child: any) => {
              if (child.isMesh && child.material && !faceMeshUuids.has(child.uuid)) {
                child.material = faceMat;
                faceMaterialRef.current = faceMat;
                faceMeshUuids.add(child.uuid);
              }
            });

            return;
          }

          if (faceMeshUuids.has(node.uuid)) return;

          if (!mesh.isMesh || !mat) return;

          // Resto del cuerpo - más metálico
          mat.roughness = 0.3;
          mat.metalness = 0.8;
          if (mat.map) {
            mat.emissiveMap = mat.map.clone();
            mat.emissive = new THREE.Color("#ffffff");
            mat.emissiveIntensity = robotState.neonActive ? 5.5 : 0.0;
          }
        });

        loadedModelRef.current = model;
        loadedCount++;
        reportProgress(loadedCount);
        console.log("✅ Modelo cargado y configurado");

        // 3. Cargar animaciones
        const animsToLoad = {
          idle: assetUrl('/robot/animations/idle.glb'),
          dance: assetUrl('/robot/animations/sillydance.glb'),
          yay: assetUrl('/robot/animations/yaydance.glb'),
          waving: assetUrl('/robot/animations/waving.glb'),
          angry: assetUrl('/robot/animations/angry.glb'),
          lookingA: assetUrl('/robot/animations/lookingA.glb'),
        };

        for (const [name, path] of Object.entries(animsToLoad)) {
          try {
            const gltf = await new Promise<any>((resolve, reject) => {
              gltfLoader.load(path, resolve, undefined, reject);
            });
            if (gltf.animations.length > 0) {
              const clip = gltf.animations[0].clone();
              clip.name = name;
              loadedAnimationsRef.current[name as AnimName] = clip;
              loadedCount++;
              reportProgress(loadedCount);
              console.log(`✅ Animación cargada: ${name}`);
            }
          } catch (e) {
            console.error(`❌ Error cargando animación ${name}:`, e);
            loadedCount++;
            reportProgress(loadedCount);
          }
        }

        if (!loadedModelRef.current) {
          throw new Error("Modelo principal no disponible");
        }

        setModelReady(true);
        setIsLoading(false);
        finishLoading();
        console.log("🎉 Todos los assets cargados correctamente");

      } catch (e) {
        console.error("❌ Error crítico cargando assets:", e);
        setLoadFailed(true);
        setIsLoading(false);
        finishLoading();
      }
    };

    loadAssets();
  }, [finishLoading, reportProgress]);

  /* ─── Crear AnimationMixer (solo cuando el modelo está listo) ─── */
  useEffect(() => {
    if (!modelReady || !loadedModelRef.current || !loadedAnimationsRef.current.idle) return;

    const mixer = new THREE.AnimationMixer(loadedModelRef.current);
    mixerRef.current = mixer;

    // Animación inicial según modo
    const initialClip = robotState.mode === "register" 
      ? loadedAnimationsRef.current.waving 
      : loadedAnimationsRef.current.idle;

    const initialAction = mixer.clipAction(initialClip || loadedAnimationsRef.current.idle);
    initialAction.setLoop(THREE.LoopRepeat, Infinity);
    initialAction.play();
    currentActionRef.current = initialAction;

    // Configurar cara inicial
    const mat = faceMaterialRef.current;
    if (mat) {
      const initialFace = robotState.mode === "register" 
        ? loadedTexturesRef.current.happy 
        : loadedTexturesRef.current.idle;
      if (initialFace) {
        mat.map = initialFace;
        mat.emissiveMap = initialFace;
        mat.needsUpdate = true;
      }
    }

    // Posición inicial según modo
    if (robotState.mode === "register") {
      targetPosRef.current.x = -1.4;
      targetRotRef.current = 0.5;
    } else {
      targetPosRef.current.x = 1.4;
      targetRotRef.current = -0.4;
    }

    prevModeRef.current = robotState.mode;
    setMixerReady(true);

    return () => {
      mixer.stopAllAction();
      setMixerReady(false);
    };
  }, [modelReady]);

  /* ─── Funciones de control ─── */

  const setRobotFace = useCallback((expression: FaceExpression) => {
    const mat = faceMaterialRef.current;
    if (!mat || !loadedTexturesRef.current[expression]) return;
    mat.map = loadedTexturesRef.current[expression];
    mat.emissiveMap = loadedTexturesRef.current[expression];
    mat.needsUpdate = true;
  }, []);

  const fadeToAnimation = useCallback(
    (animName: AnimName, duration = 0.3, loopMode: THREE.AnimationActionLoopStyles = THREE.LoopRepeat) => {
      const mixer = mixerRef.current;
      const clip = loadedAnimationsRef.current[animName];
      if (!mixer || !clip) return null;

      const newAction = mixer.clipAction(clip);
      const current = currentActionRef.current;

      if (current && current.getClip().name === animName) return newAction;

      newAction.reset();
      newAction.setLoop(loopMode, Infinity);
      if (loopMode === THREE.LoopOnce) newAction.clampWhenFinished = true;

      newAction.fadeIn(duration);
      if (current) current.fadeOut(duration);

      newAction.play();
      currentActionRef.current = newAction;
      return newAction;
    },
    []
  );

  const clearSpecialListener = useCallback(() => {
    if (specialOnFinishedRef.current && mixerRef.current) {
      mixerRef.current.removeEventListener("finished", specialOnFinishedRef.current);
      specialOnFinishedRef.current = null;
      isPlayingSpecialRef.current = false;
    }
  }, []);

  const executeOneShot = useCallback((animName: AnimName) => {
    const clip = loadedAnimationsRef.current[animName];
    if (!clip) return;
    const mixer = mixerRef.current;
    if (!mixer) return;

    clearSpecialListener();
    isPlayingSpecialRef.current = true;
    if (wavingTimerRef.current) {
      clearTimeout(wavingTimerRef.current);
      wavingTimerRef.current = null;
    }
    const newAction = mixer.clipAction(clip);
    const current = currentActionRef.current;

    newAction.reset();
    newAction.setLoop(THREE.LoopOnce, 1);
    newAction.clampWhenFinished = true;
    newAction.fadeIn(0.15);
    if (current) current.fadeOut(0.15);
    newAction.play();
    currentActionRef.current = newAction;

    const mat = faceMaterialRef.current;
    if (mat) {
      if (animName === "angry" && loadedTexturesRef.current.angry) {
        mat.map = loadedTexturesRef.current.angry;
        mat.emissiveMap = loadedTexturesRef.current.angry;
        mat.needsUpdate = true;
      } else if (animName === "yay" && loadedTexturesRef.current.pro) {
        mat.map = loadedTexturesRef.current.pro;
        mat.emissiveMap = loadedTexturesRef.current.pro;
        mat.needsUpdate = true;
      }
    }

    const onFinished = (e: { action: THREE.AnimationAction }) => {
      if (e.action === newAction) {
        isPlayingSpecialRef.current = false;
        specialOnFinishedRef.current = null;
        mixer.removeEventListener("finished", onFinished);

        // Siempre volver a idle después de cualquier animación one-shot
        const targetClip = loadedAnimationsRef.current.idle;
        const targetFace: FaceExpression = "idle";

        if (targetClip) {
          const action = mixer.clipAction(targetClip);
          action.reset();
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.fadeIn(0.2);
          if (currentActionRef.current) currentActionRef.current.fadeOut(0.2);
          action.play();
          currentActionRef.current = action;
        }

        const mat = faceMaterialRef.current;
        if (mat && loadedTexturesRef.current[targetFace]) {
          mat.map = loadedTexturesRef.current[targetFace];
          mat.emissiveMap = loadedTexturesRef.current[targetFace];
          mat.needsUpdate = true;
        }
      }
    };
    mixer.addEventListener("finished", onFinished);
    specialOnFinishedRef.current = onFinished;
  }, []);

  /* ─── Reaccionar a cambios de estado ─── */

  useEffect(() => {
    if (!modelReady || !mixerRef.current || !mixerReady) return;
    if (prevModeRef.current === null || prevModeRef.current === robotState.mode) return;
    prevModeRef.current = robotState.mode;

    if (isPlayingSpecialRef.current) return;

    if (robotState.mode === "register") {
      targetPosRef.current.x = -1.4;
      targetRotRef.current = 0.5;
      isPlayingSpecialRef.current = true;
      
      const clip = loadedAnimationsRef.current.waving;
      if (clip && mixerRef.current) {
        const action = mixerRef.current.clipAction(clip);
        action.reset();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.fadeIn(0.3);
        if (currentActionRef.current) currentActionRef.current.fadeOut(0.3);
        action.play();
        currentActionRef.current = action;
      }
      const mat = faceMaterialRef.current;
      if (mat && loadedTexturesRef.current.happy) {
        mat.map = loadedTexturesRef.current.happy;
        mat.emissiveMap = loadedTexturesRef.current.happy;
        mat.needsUpdate = true;
      }
    } else {
      targetPosRef.current.x = 1.4;
      targetRotRef.current = -0.4;
      isPlayingSpecialRef.current = true;
      
      const clip = loadedAnimationsRef.current.idle;
      if (clip && mixerRef.current) {
        const action = mixerRef.current.clipAction(clip);
        action.reset();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.fadeIn(0.3);
        if (currentActionRef.current) currentActionRef.current.fadeOut(0.3);
        action.play();
        currentActionRef.current = action;
      }
      const mat = faceMaterialRef.current;
      if (mat && loadedTexturesRef.current.idle) {
        mat.map = loadedTexturesRef.current.idle;
        mat.emissiveMap = loadedTexturesRef.current.idle;
        mat.needsUpdate = true;
      }
    }

    const check = setInterval(() => {
      if (!groupRef.current) return;
      if (Math.abs(groupRef.current.position.x - targetPosRef.current.x) < 0.1) {
        clearInterval(check);
        isPlayingSpecialRef.current = false;
      }
    }, 50);

    return () => clearInterval(check);
  }, [robotState.mode, modelReady, mixerReady]);

  useEffect(() => {
    if (prevFocusRef.current === robotState.focusedInput) return;
    prevFocusRef.current = robotState.focusedInput;

    if (isPlayingSpecialRef.current) return;

    if (robotState.focusedInput === "dance") {
      const clip = loadedAnimationsRef.current.dance;
      if (clip && mixerRef.current) {
        const action = mixerRef.current.clipAction(clip);
        action.reset();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.fadeIn(0.3);
        if (currentActionRef.current) currentActionRef.current.fadeOut(0.3);
        action.play();
        currentActionRef.current = action;
      }
      const mat = faceMaterialRef.current;
      if (mat && loadedTexturesRef.current.happy) {
        mat.map = loadedTexturesRef.current.happy;
        mat.emissiveMap = loadedTexturesRef.current.happy;
        mat.needsUpdate = true;
      }
    } else if (robotState.focusedInput === "spy") {
      const clip = loadedAnimationsRef.current.lookingA;
      if (clip && mixerRef.current) {
        const action = mixerRef.current.clipAction(clip);
        action.reset();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.fadeIn(0.3);
        if (currentActionRef.current) currentActionRef.current.fadeOut(0.3);
        action.play();
        currentActionRef.current = action;
      }
      const mat = faceMaterialRef.current;
      if (mat && loadedTexturesRef.current.distracted) {
        mat.map = loadedTexturesRef.current.distracted;
        mat.emissiveMap = loadedTexturesRef.current.distracted;
        mat.needsUpdate = true;
      }
    } else {
      const clip = loadedAnimationsRef.current.idle;
      if (clip && mixerRef.current) {
        const action = mixerRef.current.clipAction(clip);
        action.reset();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.fadeIn(0.3);
        if (currentActionRef.current) currentActionRef.current.fadeOut(0.3);
        action.play();
        currentActionRef.current = action;
      }
      const mat = faceMaterialRef.current;
      if (mat && loadedTexturesRef.current.idle) {
        mat.map = loadedTexturesRef.current.idle;
        mat.emissiveMap = loadedTexturesRef.current.idle;
        mat.needsUpdate = true;
      }
    }
  }, [robotState.focusedInput]);

  useEffect(() => {
    if (prevSubmitRef.current === robotState.submitTrigger) return;
    prevSubmitRef.current = robotState.submitTrigger;

    executeOneShot("yay");
  }, [robotState.submitTrigger]);

  useEffect(() => {
    if (prevNeonActiveRef.current === robotState.neonActive) return;
    prevNeonActiveRef.current = robotState.neonActive;

    const model = loadedModelRef.current;
    if (!model) return;
    
    const currentAction = currentActionRef.current;
    
    model.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat?.emissiveMap && mat !== faceMaterialRef.current) {
        mat.emissiveIntensity = robotState.neonActive ? 5.5 : 0.0;
      }
    });
    
    if (currentAction && mixerRef.current) {
      currentAction.enabled = true;
    }
  }, [robotState.neonActive]);

  const handleModelClick = useCallback(() => {
    clickCountRef.current += 1;
    console.log(`Toques: ${clickCountRef.current}/5`);

    clearSpecialListener();

    if (wavingTimerRef.current) {
      clearTimeout(wavingTimerRef.current);
      wavingTimerRef.current = null;
    }

    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      executeOneShot("angry");
      return;
    }

    const clip = loadedAnimationsRef.current.waving;
    const mixer = mixerRef.current;
    if (clip && mixer) {
      const isSameWaving = currentActionRef.current?.getClip().name === "waving";
      const action = isSameWaving && currentActionRef.current
        ? currentActionRef.current
        : mixer.clipAction(clip);
      if (!isSameWaving && currentActionRef.current) currentActionRef.current.fadeOut(0.2);

      action.stop();
      action.reset();
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.fadeIn(0.2);
      action.play();
      currentActionRef.current = action;

      const waveDuration = Math.max(500, clip.duration * 1000);
      wavingTimerRef.current = setTimeout(() => {
        wavingTimerRef.current = null;
        if (currentActionRef.current !== action) return;
        const idleClip = loadedAnimationsRef.current.idle;
        const idleMixer = mixerRef.current;
        if (idleClip && idleMixer) {
          const idleAction = idleMixer.clipAction(idleClip);
          idleAction.reset();
          idleAction.setLoop(THREE.LoopRepeat, Infinity);
          idleAction.fadeIn(0.3);
          if (currentActionRef.current) currentActionRef.current.fadeOut(0.3);
          idleAction.play();
          currentActionRef.current = idleAction;
        }
        const mat = faceMaterialRef.current;
        if (mat && loadedTexturesRef.current.idle) {
          mat.map = loadedTexturesRef.current.idle;
          mat.emissiveMap = loadedTexturesRef.current.idle;
          mat.needsUpdate = true;
        }
      }, waveDuration);
    }

    const mat = faceMaterialRef.current;
    if (mat && loadedTexturesRef.current.happy) {
      mat.map = loadedTexturesRef.current.happy;
      mat.emissiveMap = loadedTexturesRef.current.happy;
      mat.needsUpdate = true;
    }
  }, [executeOneShot]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    if (!groupRef.current) return;

    if (faceMaterialRef.current) {
      const mat = faceMaterialRef.current;
      if (mat.map) {
        mat.map.offset.x = 0;
        mat.map.offset.y = 0;
        mat.map.needsUpdate = true;
      }
      if (mat.emissiveMap) {
        mat.emissiveMap.offset.x = 0;
        mat.emissiveMap.offset.y = 0;
        mat.emissiveMap.needsUpdate = true;
      }
      mat.emissiveIntensity = robotState.neonActive ? 5.5 : 0.0;

      // Parpadeo cuando está en idle sin foco
      const now = state.clock.getElapsedTime();
      const isIdle =
        !isPlayingSpecialRef.current &&
        robotState.focusedInput === null &&
        currentActionRef.current?.getClip().name === "idle";
      if (isIdle && loadedTexturesRef.current.idle && loadedTexturesRef.current.distracted) {
        if (isBlinkingRef.current) {
          if (now - lastBlinkRef.current > 0.12) {
            isBlinkingRef.current = false;
            lastBlinkRef.current = now;
            mat.map = loadedTexturesRef.current.idle;
            mat.emissiveMap = loadedTexturesRef.current.idle;
            mat.needsUpdate = true;
          }
        } else {
          if (now - lastBlinkRef.current > (2.5 + Math.random() * 2.5)) {
            isBlinkingRef.current = true;
            lastBlinkRef.current = now;
            mat.map = loadedTexturesRef.current.distracted;
            mat.emissiveMap = loadedTexturesRef.current.distracted;
            mat.needsUpdate = true;
          }
        }
      } else {
        isBlinkingRef.current = false;
      }
    }

    groupRef.current.position.lerp(targetPosRef.current, MOVE_SPEED);

    const targetQuat = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      targetRotRef.current
    );
    groupRef.current.quaternion.slerp(targetQuat, MOVE_SPEED);

    if (robotState.autoRotate && !isPlayingSpecialRef.current) {
      targetRotRef.current += 0.005;
    }
  });

  if (loadFailed) {
    return <FallbackRobot robotState={robotState} />;
  }

  if (isLoading || !modelReady || !loadedModelRef.current) {
    return null;
  }

  return (
    <group ref={groupRef}>
      <primitive
        object={loadedModelRef.current}
        onClick={(e: any) => {
          e.stopPropagation();
          handleModelClick();
        }}
      />
    </group>
  );
}
