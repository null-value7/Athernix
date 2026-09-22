"use client";

import { Html } from "@react-three/drei/web/Html";
import { useProgress } from "@react-three/drei/core/Progress";

export function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div
        style={{
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "#ffd166",
          fontSize: 12,
          textAlign: "center",
        }}
      >
        Cargando
        <div style={{ marginTop: 12, width: 180, height: 2, background: "rgba(255,107,26,0.25)" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "#e11d2e" }} />
        </div>
      </div>
    </Html>
  );
}
