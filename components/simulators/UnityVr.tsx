"use client";

import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { assetUrl } from "@/lib/assets";

export default function UnitySimulator() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
  loaderUrl: assetUrl("/Unity/Build/V2.5-Build.loader.js"),
  dataUrl: assetUrl("/Unity/Build/V2.5-Build.data.br"),
  frameworkUrl: assetUrl("/Unity/Build/V2.5-Build.framework.js.br"),
  codeUrl: assetUrl("/Unity/Build/V2.5-Build.wasm.br"),
  streamingAssetsUrl: "StreamingAssets",
  companyName: "DefaultCompany",
  productName: "Athernix",
  productVersion: "0.1.0",
});

  return (
    // 2. CONTENEDOR PRINCIPAL: replicando el body y #unity-container original
    <div className="relative w-full h-full flex justify-center items-center bg-black overflow-hidden">
      
      {/* 3. BARRA DE CARGA*/}
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
                background: '#FF006E' // Tu color var(--pink)
              }}
            />
          </div>
        </div>
      )}
      
      {/* 4. CANVAS DE UNITY */}
      <Unity 
        unityProvider={unityProvider} 
        style={{ width: "100%", height: "100%", background: "#000" }} 
        tabIndex={-1}
      />
    </div>
  );
}