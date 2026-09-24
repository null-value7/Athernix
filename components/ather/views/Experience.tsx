"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei/core/ContactShadows";
import { Environment } from "@react-three/drei/core/Environment";
import { Lightformer } from "@react-three/drei/core/Lightformer";
import { ScrollControls, useScroll } from "@react-three/drei/web/ScrollControls";
import { EffectComposer, Bloom, Vignette, ChromaticAberration, DepthOfField, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useRef } from "react";
import { SCROLL_PAGES } from "@/components/ather/models/scenes";
import { Character } from "@/components/ather/views/Character";
import { ThinkBubble } from "@/components/ather/views/ThinkBubble";
import { SceneAtmosphere } from "@/components/ather/views/SceneAtmosphere";
import { CinemaRig } from "@/components/ather/views/CinemaRig";
import { Loader } from "@/components/ather/views/Loader";

export type ScrollRefs = {
  progressRef: React.MutableRefObject<number>;
  scrollElRef: React.MutableRefObject<HTMLElement | null>;
};

/** Exposes the ScrollControls scroller element to DOM code outside the Canvas. */
function ScrollBridge({ scrollElRef }: Pick<ScrollRefs, "scrollElRef">) {
  const scroll = useScroll();
  useEffect(() => {
    scrollElRef.current = scroll.el;
  }, [scroll, scrollElRef]);
  return null;
}

function Stage({ progressRef, scrollElRef }: ScrollRefs) {
  const yawRef = useRef(0);

  return (
    <>
      <CinemaRig progressRef={progressRef} yawRef={yawRef} />
      <ScrollBridge scrollElRef={scrollElRef} />
      <SceneAtmosphere progressRef={progressRef} />
      <Character progressRef={progressRef} yawRef={yawRef} />
      <ThinkBubble progressRef={progressRef} />
      <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={8} blur={2.4} far={3.5} color="#3b0d08" />
      <Environment resolution={256} environmentIntensity={0.6}>
        <Lightformer form="rect" intensity={5} position={[0, 4, -6]} scale={[8, 3, 1]} color="#ffb703" />
        <Lightformer form="rect" intensity={3.2} position={[-5, 2, 2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} color="#e11d2e" />
        <Lightformer form="rect" intensity={2.6} position={[5, 1.5, 1]} rotation-y={-Math.PI / 2} scale={[5, 2, 1]} color="#ff6519" />
        <Lightformer form="circle" intensity={2} position={[0, 3, 4]} scale={[3, 3, 1]} color="#ffe0a2" />
      </Environment>
    </>
  );
}

export function Experience({ progressRef, scrollElRef }: ScrollRefs) {
  return (
    <Canvas
      className="experience"
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0.03, 0.74, 0.6], fov: 26, near: 0.04, far: 40 }}
      gl={{ antialias: true, toneMappingExposure: 1.18 }}
    >
      <Suspense fallback={<Loader />}>
        <ScrollControls pages={SCROLL_PAGES} damping={0.22} maxSpeed={0.35}>
          <Stage progressRef={progressRef} scrollElRef={scrollElRef} />
        </ScrollControls>
        <EffectComposer enableNormalPass={false}>
          <DepthOfField target={[0, 0.73, 0.02]} worldFocusRange={0.45} bokehScale={4.2} />
          <Bloom intensity={0.55} luminanceThreshold={0.32} mipmapBlur />
          <ChromaticAberration offset={[0.0006, 0.0004]} radialModulation modulationOffset={0.4} />
          <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.22} />
          <Vignette darkness={0.72} offset={0.28} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
