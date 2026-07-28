"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RobotCanvas, RobotState, RobotAction } from "@/components/RobotCanvas";
import { AuthForm } from "@/components/AuthForm";
import "./login-combined.css";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 bg-[#07000a] flex items-center justify-center z-[99999]">
          <p className="loading-pulse font-[family-name:var(--font-jetbrains)] text-[9px] tracking-[0.35em] uppercase text-white/40">
            Inicializando Núcleo Athernix...
          </p>
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";

  const [robotState, setRobotState] = useState<RobotState>({
    mode: initialMode,
    focusedInput: null,
    submitTrigger: 0,
    autoRotate: false,
    neonMode: true,
    neonActive: true,
    isGlitched: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    setRobotState((prev) => ({ ...prev, mode: initialMode }));
  }, [initialMode]);

  const handleLoadComplete = useCallback(() => {
    console.log("✅ Sincronizando núcleo local...");
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  const dispatch = useCallback((action: RobotAction) => {
    setRobotState((prev) => {
      switch (action.type) {
        case "SET_MODE":
          return { ...prev, mode: action.mode, focusedInput: null, isGlitched: false };
        case "SET_FOCUS":
          return { ...prev, focusedInput: action.focus, isGlitched: false };
        case "TRIGGER_SUBMIT":
          return { ...prev, submitTrigger: prev.submitTrigger + 1 };
        case "TOGGLE_ROTATE":
          return { ...prev, autoRotate: !prev.autoRotate, isGlitched: false };
        case "TOGGLE_LIGHT":
          return { ...prev, neonMode: !prev.neonMode, isGlitched: false };
        case "TOGGLE_NEON":
          return { ...prev, neonActive: !prev.neonActive, isGlitched: false };
        case "SET_GLITCH":
          return { ...prev, isGlitched: action.glitch };
      }
    });
  }, []);

  return (
    <main
      className="relative w-full h-screen overflow-hidden bg-[#08000a]"
    >
      {/* Grain overlay cinematográfico */}
      <div className="grain-overlay" />

      {/* Loading screen */}
      <div
        className={`fixed inset-0 bg-[#07000a] flex flex-col justify-center items-center z-[99999] transition-opacity duration-600 ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <p
          className={`loading-pulse font-[family-name:var(--font-jetbrains)] text-[9px] tracking-[0.35em] uppercase text-white/40`}
        >
          {loadProgress < 100
            ? `Inicializando Núcleo Athernix... ${Math.round(loadProgress)}%`
            : ""}
        </p>
      </div>

      {/* Canvas 3D (fondo, z-2) */}
      <RobotCanvas
        robotState={robotState}
        onLoadComplete={handleLoadComplete}
        onProgress={setLoadProgress}
      />

      {/* Formulario (primer plano, z-10) */}
      <AuthForm
        robotState={robotState}
        dispatch={dispatch}
        initialMode={initialMode}
      />
    </main>
  );
}