"use client";

import React, { useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { getCurrentLanguage, onLanguageChange } from "@/lib/language";
import { assetUrl } from "@/lib/assets";

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
    loader: assetUrl("/Unity/Build/HistoryV2.loader.js"),
    data: assetUrl("/Unity/Build/HistoryV2.data"),
    framework: assetUrl("/Unity/Build/HistoryV2.framework.js"),
    code: assetUrl("/Unity/Build/HistoryV2.wasm"),
    companyName: "Athernix",
    productName: "Historia Viva VR",
    productVersion: "2.0",
  },
  mental: {
    loader: assetUrl("/Unity/Build/MentalV1.loader.js"),
    data: assetUrl("/Unity/Build/MentalV1.data"),
    framework: assetUrl("/Unity/Build/MentalV1.framework.js"),
    code: assetUrl("/Unity/Build/MentalV1.wasm"),
    companyName: "Athernix",
    productName: "MenteLibre VR",
    productVersion: "1.0",
  },
  lobby: {
    loader: assetUrl("/Unity/Build/LobbyV4.loader.js"),
    data: assetUrl("/Unity/Build/LobbyV4.data"),
    framework: assetUrl("/Unity/Build/LobbyV4.framework.js"),
    code: assetUrl("/Unity/Build/LobbyV4.wasm"),
    companyName: "Athernix",
    productName: "Athernix Lobby",
    productVersion: "4.0",
  },
  default: {
    loader: assetUrl("/Unity/Build/LobbyV4.loader.js"),
    data: assetUrl("/Unity/Build/LobbyV4.data"),
    framework: assetUrl("/Unity/Build/LobbyV4.framework.js"),
    code: assetUrl("/Unity/Build/LobbyV4.wasm"),
    companyName: "Athernix",
    productName: "Athernix Lobby",
    productVersion: "4.0",
  },
};

export default function UnitySimulator({ buildKey = "default" }: { buildKey?: BuildKey }) {
  const cfg = BUILD_CONFIGS[buildKey] ?? BUILD_CONFIGS.default;

  // Selector de modo: PC o VR (antes de descargar el build)
  const [modo, setModo] = useState<"pc" | "vr" | null>(null);
  const [vrDisponible, setVrDisponible] = useState<boolean | null>(null);

  useEffect(() => {
    let vivo = true;
    const xr = (navigator as Navigator & {
      xr?: { isSessionSupported: (mode: string) => Promise<boolean> };
    }).xr;

    if (!xr?.isSessionSupported) {
      setVrDisponible(false);
      return;
    }
    xr.isSessionSupported("immersive-vr")
      .then(ok => { if (vivo) setVrDisponible(ok); })
      .catch(() => { if (vivo) setVrDisponible(false); });
    return () => { vivo = false; };
  }, []);

  const { unityProvider, isLoaded, loadingProgression, unload, sendMessage } = useUnityContext({
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

  // ── Enviar idioma de la página a Unity (al cargar y en cambios en vivo) ──
  useEffect(() => {
    if (!isLoaded) return;

    const enviarIdioma = (lang: string) => {
      try {
        sendMessage("TranslationManager", "SetLanguage", lang);
      } catch (err) {
        console.error("[UnitySimulator] Error enviando idioma a Unity:", err);
      }
    };

    enviarIdioma(getCurrentLanguage());
    const cleanup = onLanguageChange(enviarIdioma);
    return cleanup;
  }, [isLoaded, sendMessage]);

  // Entrar a la sesión VR (requiere clic fresco del usuario)
  const entrarVR = () => {
    try {
      sendMessage("WebXRManager", "ToggleVR");
    } catch (err) {
      console.error("[UnitySimulator] Error entrando a VR:", err);
    }
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center bg-black overflow-hidden">

      {/* Selector de modo (antes de descargar el build) */}
      {modo === null && (
        <div className="absolute z-20 inset-0 flex flex-col items-center justify-center gap-8 bg-black">
          <p className="text-white/60 text-[11px] tracking-[0.35em] font-mono">
            SELECCIONA_EL_MODO_DE_JUEGO
          </p>
          <div className="flex gap-5 flex-wrap justify-center">
            <button
              onClick={() => setModo("pc")}
              className="px-10 py-6 rounded-2xl border border-white/15 bg-white/5 text-white text-xs tracking-[0.25em] font-mono hover:border-[#FF006E] hover:-translate-y-0.5 transition-all"
            >
              MODO_PC
              <span className="block mt-2 text-[9px] text-white/40">TECLADO_+_MOUSE</span>
            </button>
            <button
              onClick={() => setModo("vr")}
              disabled={vrDisponible !== true}
              className="px-10 py-6 rounded-2xl border border-[#FF006E]/40 bg-[#FF006E]/10 text-white text-xs tracking-[0.25em] font-mono hover:border-[#FF006E] hover:-translate-y-0.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              MODO_VR
              <span className="block mt-2 text-[9px] text-white/40">
                {vrDisponible === null
                  ? "VERIFICANDO_VISOR..."
                  : vrDisponible
                    ? "VISOR_WEBXR_DETECTADO"
                    : "SIN_VISOR_WEBXR"}
              </span>
            </button>
          </div>
          {vrDisponible === false && (
            <p className="text-white/30 text-[9px] tracking-[0.3em] font-mono">
              WEBXR_NO_DISPONIBLE_EN_ESTE_NAVEGADOR
            </p>
          )}
        </div>
      )}

      {/* Barra de carga */}
      {modo !== null && !isLoaded && (
        <div className="absolute z-10 flex flex-col items-center gap-3">
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
          <p className="text-white/40 text-[9px] tracking-[0.3em] font-mono">
            CARGANDO_MODO_{modo.toUpperCase()}
          </p>
        </div>
      )}

      {/* Botón para entrar a VR una vez cargado (requiere gesto del usuario) */}
      {modo === "vr" && isLoaded && (
        <button
          onClick={entrarVR}
          className="absolute z-10 bottom-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#FF006E] to-[#FF6B00] text-white text-[10px] tracking-[0.3em] font-mono hover:scale-105 transition-transform"
        >
          ◉ ENTRAR_EN_VR
        </button>
      )}

      {/* Canvas de Unity — solo se monta tras elegir modo (la descarga empieza aquí) */}
      {modo !== null && (
        <Unity
          unityProvider={unityProvider}
          style={{ width: "100%", height: "100%", background: "#000" }}
          tabIndex={-1}
        />
      )}
    </div>
  );
}
