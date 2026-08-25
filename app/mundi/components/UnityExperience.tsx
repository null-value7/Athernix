'use client';

// ═══════════════════════════════════════════
// VIEW (VR) — Reproductor Unity WebGL con
// recuadro custom estilo MUNDI / Athernix
// ═══════════════════════════════════════════

import { useRef } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { assetUrl } from '@/lib/assets';
import { MundiLocation } from '../models/location.model';

interface UnityExperienceProps {
  location: MundiLocation;
  onBack: () => void;
}

export default function UnityExperience({ location, onBack }: UnityExperienceProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  const { unityProvider, isLoaded, loadingProgression, requestFullscreen } = useUnityContext({
    loaderUrl: assetUrl('/Unity/Build/Build5V.loader.js'),
    dataUrl: 'https://pub-d0e7ef3005e647b4897a9806ec0ef38e.r2.dev/Unity/Build/Build5V.data',
    frameworkUrl: assetUrl('/Unity/Build/Build5V.framework.js'),
    codeUrl: assetUrl('/Unity/Build/Build5V.wasm'),
    streamingAssetsUrl: 'StreamingAssets',
    companyName: 'Athernix',
    productName: 'Mundi VR',
    productVersion: '5.0',
  });

  const pct = Math.round(loadingProgression * 100);

  return (
    <div className="uexp-stage">
      {/* ── Barra superior ── */}
      <header className="uexp-topbar mono">
        <div className="uexp-topbar-left">
          <span className="uexp-dot" style={{ background: location.color, boxShadow: `0 0 10px ${location.color}` }} />
          {location.code} // {location.category} // <b style={{ color: location.color }}>{location.name.toUpperCase()}</b>
        </div>
        <div className="uexp-topbar-right">
          <span className={isLoaded ? 'uexp-status on' : 'uexp-status'}>
            {isLoaded ? '● MOTOR_EN_LÍNEA' : '◌ CARGANDO_MOTOR'}
          </span>
          <button className="uexp-btn mono" onClick={() => requestFullscreen(true)} disabled={!isLoaded}>
            ⛶ MODO_VR / PANTALLA_COMPLETA
          </button>
          <button className="uexp-btn mono ghost" onClick={onBack}>
            ← VOLVER_AL_PLANETA
          </button>
        </div>
      </header>

      {/* ── Recuadro custom del juego ── */}
      <div className="uexp-frame" ref={frameRef}>
        <span className="uexp-corner tl" style={{ borderColor: location.color }} />
        <span className="uexp-corner tr" style={{ borderColor: location.color }} />
        <span className="uexp-corner bl" style={{ borderColor: location.color }} />
        <span className="uexp-corner br" style={{ borderColor: location.color }} />
        <div className="uexp-frame-glow" style={{ background: `radial-gradient(ellipse at 50% 0%, ${location.color}18, transparent 65%)` }} />

        {/* ── Overlay de carga ── */}
        {!isLoaded && (
          <div className="uexp-loading">
            <div className="uexp-loading-title">{location.name.toUpperCase()}</div>
            <div className="uexp-loading-sub mono">DESPLEGANDO_GEMELO_DIGITAL // UNITY_WEBGL</div>
            <div className="uexp-bar">
              <div
                className="uexp-bar-fill"
                style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${location.color}, #FF006E)` }}
              />
            </div>
            <div className="uexp-pct mono">{String(pct).padStart(3, '0')}% // TRANSFIRIENDO_ENTORNO</div>
          </div>
        )}

        <Unity
          unityProvider={unityProvider}
          className="uexp-canvas"
          style={{ width: '100%', height: '100%', visibility: isLoaded ? 'visible' : 'hidden' }}
          tabIndex={-1}
        />
      </div>

      {/* ── HUD inferior ── */}
      <footer className="uexp-hud mono">
        <div>MUNDI_OS <b>v3.1.4</b> // NODO: <b>{location.code}</b></div>
        <div>LAT {location.lat.toFixed(3)}° · LNG {location.lng.toFixed(3)}° · {location.country.toUpperCase()}</div>
        <div>CONEXIÓN_SEGURA // <b>ATHERNIX_VR_READY</b></div>
      </footer>
    </div>
  );
}
