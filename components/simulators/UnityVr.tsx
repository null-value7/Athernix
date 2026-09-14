"use client";

import React, { useEffect, useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

type BuildKey = "history" | "mental" | "lobby" | "default";

const BUILD_CONFIGS: Record<BuildKey, {
  loader: string;
  data: string;
  framework: string;
  code: string;
  companyName: string;
  productName: string;
  productVersion: string;
}> = {
  history: {
    loader: "/Unity/Build/HistoryV1.loader.js",
    data: "/Unity/Build/HistoryV1.data",
    framework: "/Unity/Build/HistoryV1.framework.js",
    code: "/Unity/Build/HistoryV1.wasm",
    companyName: "Athernix",
    productName: "Historia Viva VR",
    productVersion: "1.0",
  },
  mental: {
    loader: "/Unity/Build/MentalV1.loader.js",
    data: "/Unity/Build/MentalV1.data",
    framework: "/Unity/Build/MentalV1.framework.js",
    code: "/Unity/Build/MentalV1.wasm",
    companyName: "Athernix",
    productName: "MenteLibre VR",
    productVersion: "1.0",
  },
  lobby: {
    loader: "/Unity/Build/LobbyV3.loader.js",
    data: "/Unity/Build/LobbyV3.data",
    framework: "/Unity/Build/LobbyV3.framework.js",
    code: "/Unity/Build/LobbyV3.wasm",
    companyName: "Athernix",
    productName: "Athernix Lobby",
    productVersion: "3.0",
  },
  default: {
    loader: "/Unity/Build/LobbyV3.loader.js",
    data: "/Unity/Build/LobbyV3.data",
    framework: "/Unity/Build/LobbyV3.framework.js",
    code: "/Unity/Build/LobbyV3.wasm",
    companyName: "Athernix",
    productName: "Athernix Lobby",
    productVersion: "3.0",
  },
};

export default function UnitySimulator({ buildKey = "default" }: { buildKey?: BuildKey }) {
  const cfg = BUILD_CONFIGS[buildKey] ?? BUILD_CONFIGS.default;

  const { unityProvider, isLoaded, loadingProgression, unload } = useUnityContext({
    loaderUrl: cfg.loader,
    dataUrl: cfg.data,
    frameworkUrl: cfg.framework,
    codeUrl: cfg.code,
    streamingAssetsUrl: "StreamingAssets",
    companyName: cfg.companyName,
    productName: cfg.productName,
    productVersion: cfg.productVersion,
  });

  // Liberar la memoria de Unity al cerrar el juego (evita que la RAM quede ocupada)
  const unloadRef = useRef(unload);
  unloadRef.current = unload;
  useEffect(() => {
    return () => {
      unloadRef.current().catch(() => {});
    };
  }, []);

  return (
    <div className="relative w-full h-full flex justify-center items-center bg-black overflow-hidden">

      {/* Barra de carga */}
      {!isLoaded && (
        <div className="absolute z-10 flex flex-col items-center">
          <div
            className="w-[200px] h-[10px] rounded-[5px] mt-[10px]"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          >
            <div
              className="h-full rounded-[5px] transition-all duration-200"
              style={{
                width: `${Math.round(loadingProgression * 100)}%`,
                background: '#FF006E'
              }}
            />
          </div>
        </div>
      )}

      {/* Canvas de Unity */}
      <Unity
        unityProvider={unityProvider}
        style={{ width: "100%", height: "100%", background: "#000" }}
        tabIndex={-1}
      />
    </div>
  );
}
