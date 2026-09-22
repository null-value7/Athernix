"use client";

import { useEffect, useState } from "react";
import { useScroll } from "@react-three/drei/web/ScrollControls";
import { cameraFromProgress } from "@/components/ather/models/scenes";

export function useScrollStory() {
  const scroll = useScroll();
  const [progress, setProgress] = useState(0);
  const [story, setStory] = useState(() => cameraFromProgress(0));

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const next = scroll.offset;
      setProgress(next);
      setStory(cameraFromProgress(next));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [scroll]);

  return { progress, ...story };
}
