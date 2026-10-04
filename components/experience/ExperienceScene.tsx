'use client';

// ═══════════════════════════════════════════
// VISTA — Canvas 3D único del recorrido /experience.
// Compone escenario, capítulos, cámara, luces y postproceso.
// Carga diferida (ssr:false) desde ExperienceView; la vista DOM
// queda usable aunque el canvas falle o no haya WebGL.
// ═══════════════════════════════════════════

import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei/core/Environment';
import { Lightformer } from '@react-three/drei/core/Lightformer';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { EXPERIENCE_PALETTE, TOPICS } from '@/models/experience';
import type {
  DeviceId,
  ImmersionId,
  OpportunityId,
  TopicId,
} from '@/models/experience';
import type { ExperienceFrame } from '@/controllers/experience/useExperienceController';
import {
  useCameraChoreo,
  useChapterGroup,
  useSceneClock,
  useStageLayout,
  useStageRig,
  type SceneMotion,
} from '@/controllers/experience/useExperienceScene';
import {
  Backdrop,
  ChapterGate,
  DeviceSet,
  GreetingRipple,
  ImmersionSet,
  IslandScene,
  NeuralOrbit,
  ProceduralMascot,
} from './SceneObjects';
import { AthernixitoModel } from './AthernixitoModel';

const P = EXPERIENCE_PALETTE;

export interface ExperienceSceneProps {
  frameRef: React.RefObject<ExperienceFrame>;
  /** Recibe el invalidate del canvas para repintar en modo demanda. */
  requestFrameRef: React.RefObject<(() => void) | null>;
  still: boolean; // paused || reducedMotion → loops detenidos
  compact: boolean;
  visible: boolean;
  device: DeviceId;
  topic: TopicId;
  immersion: ImmersionId;
  opportunity: OpportunityId;
  exploded: boolean;
  greeting: number;
  chapterIndex: number;
  loadModel: boolean;
  onSelectDevice: (id: DeviceId) => void;
  onSelectOpportunity: (id: OpportunityId) => void;
  onSelectVR: () => void;
  onToggleExploded: () => void;
  onGreet: () => void;
  onPulse: () => void;
  /** Contexto perdido — la vista cambia al fallback ilustrado. */
  onUnavailable: () => void;
}

/* ── Boundary: un fallo del modelo no tumbа el canvas ── */
class ModelBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { err: boolean }
> {
  state = { err: false };
  static getDerivedStateFromError() {
    return { err: true };
  }
  render() {
    return this.state.err ? this.props.fallback : this.props.children;
  }
}

/* ── En demand mode cada selección/cambio de capítulo pinta un frame ── */
function DemandDriver(props: ExperienceSceneProps) {
  const { requestFrameRef } = props;
  const invalidate = useThree((s) => s.invalidate);
  // Publica invalidate para que el controlador repinte tras mutar refs.
  useEffect(() => {
    requestFrameRef.current = invalidate;
    invalidate();
    return () => {
      requestFrameRef.current = null;
    };
  }, [invalidate, requestFrameRef]);
  // Cada cambio explícito de estado pinta un frame bajo demanda.
  useEffect(() => {
    invalidate();
  }, [
    invalidate,
    props.device,
    props.topic,
    props.immersion,
    props.opportunity,
    props.exploded,
    props.greeting,
    props.chapterIndex,
    props.compact,
    props.visible,
    props.still,
  ]);
  return null;
}

function SceneClock({ motion }: { motion: SceneMotion }) {
  useSceneClock(motion);
  return null;
}

function CameraRig({ motion }: { motion: SceneMotion }) {
  useCameraChoreo(motion);
  return null;
}

function MascotGroup({
  motion,
  topic,
  loadModel,
  onGreet,
}: {
  motion: SceneMotion;
  topic: TopicId;
  loadModel: boolean;
  onGreet: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useChapterGroup(groupRef, motion, [2], (g, _w, t) => {
    g.position.y = -0.35 + Math.sin(t * 0.75) * 0.05;
  });
  const accent = Math.max(
    0,
    TOPICS.findIndex((t) => t.id === topic)
  );
  return (
    <group ref={groupRef} scale={0.001}>
      {loadModel ? (
        <ModelBoundary fallback={<ProceduralMascot motion={motion} onGreet={onGreet} />}>
          <Suspense fallback={<ProceduralMascot motion={motion} onGreet={onGreet} />}>
            <AthernixitoModel motion={motion} accent={accent} onGreet={onGreet} />
          </Suspense>
        </ModelBoundary>
      ) : (
        <ProceduralMascot motion={motion} onGreet={onGreet} />
      )}
      <group position={[0, 0.1, 0]}>
        <NeuralOrbit motion={motion} topic={topic} />
      </group>
      <GreetingRipple motion={motion} />
    </group>
  );
}

function SceneRoot(props: ExperienceSceneProps & { motion: SceneMotion }) {
  const { motion } = props;
  const layout = useStageLayout(props.compact);
  const stageRef = useRef<THREE.Group>(null);
  useStageRig(stageRef, motion, layout);

  return (
    <>
      <SceneClock motion={motion} />
      <CameraRig motion={motion} />
      <fog attach="fog" args={['#0a0108', 16, 34]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 6]} intensity={1.5} color="#ffd9b0" />
      <pointLight position={[-6, 3, 4]} intensity={26} distance={22} decay={2} color={P.pink} />
      <pointLight position={[5, -2, 5]} intensity={14} distance={18} decay={2} color={P.orange} />

      <Backdrop motion={motion} baseX={layout.baseX} />

      <group ref={stageRef}>
        <group position={[0, 0.05, 0]}>
          <DeviceSet motion={motion} onSelect={props.onSelectDevice} />
        </group>
        <MascotGroup
          motion={motion}
          topic={props.topic}
          loadModel={props.loadModel}
          onGreet={props.onGreet}
        />
        <group position={[0, 0.2, 0]}>
          <ImmersionSet
            motion={motion}
            onToggleExploded={props.onToggleExploded}
            onPulse={props.onPulse}
            onSelectVR={props.onSelectVR}
          />
        </group>
        <group position={[0, -0.15, 0]}>
          <IslandScene
            motion={motion}
            opportunity={props.opportunity}
            onSelect={props.onSelectOpportunity}
          />
        </group>
        {/* Iris que cubre la escena saliente y revela la nueva */}
        <ChapterGate motion={motion} />
      </group>

      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={4} position={[0, 4, -6]} scale={[8, 3, 1]} color="#ffb703" />
        <Lightformer form="rect" intensity={2.6} position={[-5, 2, 2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} color={P.pink} />
        <Lightformer form="rect" intensity={2.2} position={[5, 1.5, 1]} rotation-y={-Math.PI / 2} scale={[5, 2, 1]} color={P.orange} />
        <Lightformer form="circle" intensity={1.6} position={[0, 3, 4]} scale={[3, 3, 1]} color="#ffe0a2" />
      </Environment>
    </>
  );
}

export default function ExperienceScene(props: ExperienceSceneProps) {
  const [lost, setLost] = useState(false);
  const stillRef = useRef(props.still);
  const timeRef = useRef(0);
  const progRef = useRef(-1);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    stillRef.current = props.still;
  }, [props.still]);
  useEffect(
    () => () => {
      cleanupRef.current?.();
    },
    []
  );

  const motion = useMemo<SceneMotion>(
    () => ({ frameRef: props.frameRef, stillRef, timeRef, progRef }),
    [props.frameRef]
  );

  if (lost) return null; // el fallback CSS queda detrás y el DOM sigue usable

  const frameloop = !props.visible ? 'never' : props.still ? 'demand' : 'always';

  return (
    <Canvas
      className="ex-canvas"
      dpr={[1, props.compact ? 1.25 : 1.5]}
      camera={{ position: [0, 0.18, 9.5], fov: 38, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={frameloop}
      onCreated={({ gl }) => {
        const el = gl.domElement;
        const onLost = (e: Event) => {
          e.preventDefault();
          setLost(true);
          // La vista padre apaga el canvas y enciende el fallback.
          props.onUnavailable();
        };
        el.addEventListener('webglcontextlost', onLost);
        cleanupRef.current = () => el.removeEventListener('webglcontextlost', onLost);
      }}
    >
      <Suspense fallback={null}>
        <SceneRoot {...props} motion={motion} />
        {!props.compact && (
          <EffectComposer multisampling={0}>
            <Bloom mipmapBlur intensity={0.42} luminanceThreshold={1} luminanceSmoothing={0.25} />
          </EffectComposer>
        )}
      </Suspense>
      <DemandDriver {...props} />
    </Canvas>
  );
}
