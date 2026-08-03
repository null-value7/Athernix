"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import type { RobotState } from "./RobotCanvas";
import { FallbackRobot } from "./FallbackRobot";

const TOTAL_ASSETS = 14;

/* ─── Tipos ─── */
type FaceExpression = "idle" | "happy" | "angry" | "distracted" | "pro" | "glitch";
type AnimName = "idle" | "dance" | "backflip" | "waving" | "angry" | "lookingA" | "getup";

/* ─── Rutas (desde /public) ─── */
const MODEL_PATH = "/robot/model.glb";

const ANIM_PATHS: Record<AnimName, string> = {
  idle: "/robot/animations/idle.glb",
  dance: "/robot/animations/sillydance.glb",
  backflip: "/robot/animations/backflip.glb",
  waving: "/robot/animations/waving.glb",
  angry: "/robot/animations/angry.glb",
  lookingA: "/robot/animations/lookingA.glb",
  getup: "/robot/animations/getup.glb",
};

const FACE_PATHS: Record<FaceExpression, string> = {
  idle: "/robot/textures/Idle_Face.png",
  happy: "/robot/textures/Happy_Face.png",
  angry: "/robot/textures/Angry_Face.png",
  distracted: "/robot/textures/Distracted_Face.png",
  pro: "/robot/textures/Pro_Face.png",
  glitch: "/robot/textures/Glich_Face.png",
};

/* ─── Constantes ─── */
const MOVE_SPEED = 0.06;
const INITIAL_POS = new THREE.Vector3(1.4, -2.5, 3);
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
  const isPlayingSpecialRef = useRef(false);
  const isPlayingGetupRef = useRef(false);

  // Refs para detectar cambios de estado
  const prevModeRef = useRef<string | null>(null);
  const prevFocusRef = useRef(robotState.focusedInput);
  const prevSubmitRef = useRef(robotState.submitTrigger);
  const prevNeonActiveRef = useRef(robotState.neonActive);
  const prevGlitchRef = useRef(robotState.isGlitched);

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
          pro: 'Pro_Face.png',
          glitch: 'Glich_Face.png'
        };

        for (const [key, fileName] of Object.entries(faceMapping)) {
          try {
            const tex = await new Promise<THREE.Texture>((resolve, reject) => {
              textureLoader.load(`/robot/textures/${fileName}`, resolve, undefined, reject);
            });
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.center.set(0.5, 0.5);
            tex.repeat.set(0.8, 0.8);
            tex.rotation = 0.0;
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
        model.scale.set(0.9, 0.9, 0.9);

        // Configurar materiales del modelo
        model.traverse((node) => {
          const mesh = node as THREE.Mesh;
          if (!mesh.isMesh || !mesh.material) return;

          const mat = mesh.material as THREE.MeshStandardMaterial;

          // Pantalla facial
          if (
            node.name.includes("Pantalla_Expresiones") ||
            mat.name === "Material_Rostro"
          ) {
            node.scale.set(1, 1, 1);
            node.rotation.y = Math.PI;

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

            mesh.material = faceMat;
            faceMaterialRef.current = faceMat;
          } else {
            // Resto del cuerpo - más metálico
            mat.roughness = 0.3;
            mat.metalness = 0.8;
            if (mat.map) {
              mat.emissiveMap = mat.map.clone();
              mat.emissive = new THREE.Color("#ffffff");
              mat.emissiveIntensity = robotState.neonActive ? 5.5 : 0.0;
            }
          }
        });

        loadedModelRef.current = model;
        loadedCount++;
        reportProgress(loadedCount);
        console.log("✅ Modelo cargado y configurado");

        // 3. Cargar animaciones
        const animsToLoad = {
          idle: '/robot/animations/idle.glb',
          dance: '/robot/animations/sillydance.glb',
          backflip: '/robot/animations/backflip.glb',
          waving: '/robot/animations/waving.glb',
          angry: '/robot/animations/angry.glb',
          lookingA: '/robot/animations/lookingA.glb',
          getup: '/robot/animations/getup.glb'
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

  /* ─── Crear AnimationMixer y arrancar animación según modo ─── */
  useEffect(() => {
    if (!modelReady || !loadedModelRef.current || !loadedAnimationsRef.current.idle) return;

    const mixer = new THREE.AnimationMixer(loadedModelRef.current);
    mixerRef.current = mixer;

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

    // Configurar posición inicial según modo
    if (robotState.mode === "register") {
      targetPosRef.current.x = -1.4;
      targetRotRef.current = 0.5;
    } else {
      targetPosRef.current.x = 1.4;
      targetRotRef.current = -0.4;
    }

    setMixerReady(true);

    return () => {
      mixer.stopAllAction();
      setMixerReady(false);
    };
  }, [modelReady, robotState.mode]);

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

  const executeOneShot = useCallback((animName: AnimName) => {
    const clip = loadedAnimationsRef.current[animName];
    if (!clip) return;
    const mixer = mixerRef.current;
    if (!mixer) return;

    const modeAtExecution = robotState.mode;

    isPlayingSpecialRef.current = true;
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
      } else if (animName === "backflip" && loadedTexturesRef.current.pro) {
        mat.map = loadedTexturesRef.current.pro;
        mat.emissiveMap = loadedTexturesRef.current.pro;
        mat.needsUpdate = true;
      } else if (animName === "waving" && loadedTexturesRef.current.happy) {
        mat.map = loadedTexturesRef.current.happy;
        mat.emissiveMap = loadedTexturesRef.current.happy;
        mat.needsUpdate = true;
      }
    }

    const onFinished = (e: { action: THREE.AnimationAction }) => {
      if (e.action === newAction) {
        isPlayingSpecialRef.current = false;
        mixer.removeEventListener("finished", onFinished);
        
        const currentMode = robotState.mode;
        
        const targetClip = currentMode === "register" 
          ? loadedAnimationsRef.current.waving 
          : loadedAnimationsRef.current.idle;
        const targetFace = currentMode === "register" 
          ? loadedTexturesRef.current.happy 
          : loadedTexturesRef.current.idle;
        
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
        if (mat && targetFace) {
          mat.map = targetFace;
          mat.emissiveMap = targetFace;
          mat.needsUpdate = true;
        }
      }
    };
    mixer.addEventListener("finished", onFinished);
  }, [robotState.mode]);

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
    
    executeOneShot("backflip");
    
    const checkMode = setInterval(() => {
      if (!isPlayingSpecialRef.current) {
        clearInterval(checkMode);
        
        if (mixerRef.current) {
          const targetClip = robotState.mode === "register" 
            ? loadedAnimationsRef.current.waving 
            : loadedAnimationsRef.current.idle;
          const targetFace = robotState.mode === "register" 
            ? loadedTexturesRef.current.happy 
            : loadedTexturesRef.current.idle;
          
          if (targetClip) {
            const action = mixerRef.current.clipAction(targetClip);
            action.reset();
            action.setLoop(THREE.LoopRepeat, Infinity);
            action.fadeIn(0.3);
            if (currentActionRef.current) currentActionRef.current.fadeOut(0.3);
            action.play();
            currentActionRef.current = action;
          }
          
          const mat = faceMaterialRef.current;
          if (mat && targetFace) {
            mat.map = targetFace;
            mat.emissiveMap = targetFace;
            mat.needsUpdate = true;
          }
          
          if (robotState.mode === "register") {
            targetPosRef.current.x = -1.4;
            targetRotRef.current = 0.5;
          } else {
            targetPosRef.current.x = 1.4;
            targetRotRef.current = -0.4;
          }
        }
      }
    }, 100);
    
    return () => clearInterval(checkMode);
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

  useEffect(() => {
    if (prevGlitchRef.current === robotState.isGlitched) return;
    prevGlitchRef.current = robotState.isGlitched;

    if (robotState.isGlitched) {
      // Poner cara de glitch
      const mat = faceMaterialRef.current;
      if (mat && loadedTexturesRef.current.glitch) {
        mat.map = loadedTexturesRef.current.glitch;
        mat.emissiveMap = loadedTexturesRef.current.glitch;
        mat.needsUpdate = true;
      }
    }
  }, [robotState.isGlitched]);

  const handleModelClick = useCallback(() => {
    if (isPlayingSpecialRef.current) return;

    const mat = faceMaterialRef.current;
    if (!mat) return;

    const clip = loadedAnimationsRef.current.getup;
    if (!clip) return;
    const mixer = mixerRef.current;
    if (!mixer) return;

    const currentMode = robotState.mode;

    isPlayingSpecialRef.current = true;
    isPlayingGetupRef.current = true;
    const newAction = mixer.clipAction(clip);
    const current = currentActionRef.current;

    newAction.reset();
    newAction.setLoop(THREE.LoopOnce, Infinity);
    newAction.clampWhenFinished = true;
    newAction.fadeIn(0.1);
    if (current) current.fadeOut(0.1);
    newAction.play();
    currentActionRef.current = newAction;

    if (loadedTexturesRef.current.glitch) {
      mat.map = loadedTexturesRef.current.glitch;
      mat.emissiveMap = loadedTexturesRef.current.glitch;
      mat.needsUpdate = true;
    }

    const onFinished = (e: { action: THREE.AnimationAction }) => {
      if (e.action.getClip().name === "getup") {
        isPlayingSpecialRef.current = false;
        isPlayingGetupRef.current = false;
        mixer.removeEventListener("finished", onFinished);
        
        let targetClip: THREE.AnimationClip | null = null;
        let targetFace: FaceExpression = "idle";

        if (currentMode === "register") {
          targetClip = loadedAnimationsRef.current.waving;
          targetFace = "happy";
        } else {
          targetClip = loadedAnimationsRef.current.idle;
          targetFace = "idle";
        }

        if (targetClip) {
          const action = mixer.clipAction(targetClip);
          action.reset();
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.fadeIn(0.15);
          if (currentActionRef.current) currentActionRef.current.fadeOut(0.15);
          action.play();
          currentActionRef.current = action;
        }
        
        if (loadedTexturesRef.current[targetFace]) {
          mat.map = loadedTexturesRef.current[targetFace];
          mat.emissiveMap = loadedTexturesRef.current[targetFace];
          mat.needsUpdate = true;
        }
      }
    };
    mixer.addEventListener("finished", onFinished);
  }, [robotState.mode]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    if (!groupRef.current) return;

    if (isPlayingGetupRef.current && faceMaterialRef.current) {
      const mat = faceMaterialRef.current;
      const time = state.clock.getElapsedTime();
      
      const offsetX = (Math.random() - 0.5) * 0.02;
      const offsetY = (Math.random() - 0.5) * 0.02;
      
      if (mat.map) {
        mat.map.offset.x = offsetX;
        mat.map.offset.y = offsetY;
        mat.map.needsUpdate = true;
      }
      if (mat.emissiveMap) {
        mat.emissiveMap.offset.x = offsetX;
        mat.emissiveMap.offset.y = offsetY;
        mat.emissiveMap.needsUpdate = true;
      }
      
      mat.emissiveIntensity = 6.0 + Math.sin(time * 20) * 2;
    } else if (faceMaterialRef.current) {
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
        onClick={(e) => {
          e.stopPropagation();
          handleModelClick();
        }}
      />
    </group>
  );
}
