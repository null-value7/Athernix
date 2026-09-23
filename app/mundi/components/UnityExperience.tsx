'use client';

// ═══════════════════════════════════════════
// VIEW (VR) — Reproductor Unity WebGL con
// recuadro custom estilo MUNDI / Athernix
// ═══════════════════════════════════════════

import { useRef, useEffect, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { createClient } from '@/lib/supabase/client';
import { getCurrentLanguage, onLanguageChange } from '@/lib/language';
import { assetUrl } from '@/lib/assets';
import { protectBrands } from '@/components/ui/ProtectedText';
import { MundiLocation, UnityBuildKey } from '../models/location.model';

interface UnityExperienceProps {
  location: MundiLocation;
  onBack: () => void;
}

type PlayMode = 'pc' | 'vr';

// Configuraciones de build por tipo
const BUILD_CONFIGS: Record<UnityBuildKey, {
  loaderUrl: string;
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
  companyName: string;
  productName: string;
  productVersion: string;
}> = {
  history: {
    loaderUrl: assetUrl('/Unity/Build/HistoryV2.loader.js'),
    dataUrl: assetUrl('/Unity/Build/HistoryV2.data'),
    frameworkUrl: assetUrl('/Unity/Build/HistoryV2.framework.js'),
    codeUrl: assetUrl('/Unity/Build/HistoryV2.wasm'),
    companyName: 'Athernix',
    productName: 'Historia Viva VR',
    productVersion: '2.0',
  },
  mental: {
    loaderUrl: assetUrl('/Unity/Build/MentalV2.loader.js'),
    dataUrl: assetUrl('/Unity/Build/MentalV2.data'),
    frameworkUrl: assetUrl('/Unity/Build/MentalV2.framework.js'),
    codeUrl: assetUrl('/Unity/Build/MentalV2.wasm'),
    companyName: 'Athernix',
    productName: 'MenteLibre VR',
    productVersion: '2.0',
  },
  lobby: {
    loaderUrl: assetUrl('/Unity/Build/LobbyV4.loader.js'),
    dataUrl: assetUrl('/Unity/Build/LobbyV4.data'),
    frameworkUrl: assetUrl('/Unity/Build/LobbyV4.framework.js'),
    codeUrl: assetUrl('/Unity/Build/LobbyV4.wasm'),
    companyName: 'Athernix',
    productName: 'Athernix Lobby',
    productVersion: '4.0',
  },
  default: {
    loaderUrl: assetUrl('/Unity/Build/LobbyV4.loader.js'),
    dataUrl: assetUrl('/Unity/Build/LobbyV4.data'),
    frameworkUrl: assetUrl('/Unity/Build/LobbyV4.framework.js'),
    codeUrl: assetUrl('/Unity/Build/LobbyV4.wasm'),
    companyName: 'Athernix',
    productName: 'Athernix Lobby',
    productVersion: '4.0',
  },
};

export default function UnityExperience({ location, onBack }: UnityExperienceProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const buildKey = location.buildKey ?? 'default';
  const cfg = BUILD_CONFIGS[buildKey];

  // ── Selector de modo: PC o VR (antes de descargar el build) ──
  const [modo, setModo] = useState<PlayMode | null>(null);
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
    xr.isSessionSupported('immersive-vr')
      .then(ok => { if (vivo) setVrDisponible(ok); })
      .catch(() => { if (vivo) setVrDisponible(false); });
    return () => { vivo = false; };
  }, []);

  const { unityProvider, isLoaded, loadingProgression, requestFullscreen, sendMessage, unload } = useUnityContext({
    loaderUrl: cfg.loaderUrl,
    dataUrl: cfg.dataUrl,
    frameworkUrl: cfg.frameworkUrl,
    codeUrl: cfg.codeUrl,
    streamingAssetsUrl: 'StreamingAssets',
    companyName: cfg.companyName,
    productName: cfg.productName,
    productVersion: cfg.productVersion,
  });

  const pct = Math.round(loadingProgression * 100);

  // ── Liberar la memoria de Unity al desmontar (evita fugas de RAM) ──
  const unloadRef = useRef(unload);
  unloadRef.current = unload;
  useEffect(() => {
    return () => {
      unloadRef.current().catch(() => {});
    };
  }, []);

  // ── Enviar sesión de Supabase a Unity cuando el motor termine de cargar ──
  // Reintenta varias veces: el SendMessage llega solo si el GameObject
  // "SupabaseAuthBridge" ya existe en la escena; si se envía muy temprano
  // se pierde y Unity muestra su login aunque la web tenga sesión.
  useEffect(() => {
    if (!isLoaded) return;

    let cancelled = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 20; // ~20s máximo tras la carga

    const enviarSesion = async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user) {
          // No hay sesión: Unity mostrará su login UI como fallback
          return false;
        }

        const payload = JSON.stringify({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          user_id: session.user.id,
          email: session.user.email ?? '',
        });

        // SendMessage al GameObject "SupabaseAuthBridge" → SetSessionFromWeb(string json)
        sendMessage('SupabaseAuthBridge', 'SetSessionFromWeb', payload);
        return true;
      } catch (err) {
        console.error('[UnityExperience] Error enviando sesión a Unity:', err);
        return false;
      }
    };

    // Envío inmediato + reintentos cada segundo (idempotente)
    enviarSesion();
    const interval = setInterval(() => {
      if (cancelled || ++attempts >= MAX_ATTEMPTS) {
        clearInterval(interval);
        return;
      }
      enviarSesion();
    }, 1000);

    return () => { cancelled = true; clearInterval(interval); };
  }, [isLoaded, sendMessage]);

  // ── Enviar idioma de la página a Unity (al cargar y en cambios en vivo) ──
  useEffect(() => {
    if (!isLoaded) return;

    const enviarIdioma = (lang: string) => {
      try {
        // SendMessage al GameObject "TranslationManager" → SetLanguage(string lang)
        sendMessage('TranslationManager', 'SetLanguage', lang);
      } catch (err) {
        console.error('[UnityExperience] Error enviando idioma a Unity:', err);
      }
    };

    enviarIdioma(getCurrentLanguage());
    const cleanup = onLanguageChange(enviarIdioma);
    return cleanup;
  }, [isLoaded, sendMessage]);

  // ── Entrar a la sesión VR (requiere clic fresco del usuario) ──
  const entrarVR = () => {
    try {
      sendMessage('WebXRManager', 'ToggleVR');
    } catch (err) {
      console.error('[UnityExperience] Error entrando a VR:', err);
    }
  };

  return (
    <div className="uexp-stage">
      {/* ── Barra superior ── */}
      <header className="uexp-topbar mono">
        <div className="uexp-topbar-left">
          <span className="uexp-dot" style={{ background: location.color, boxShadow: `0 0 10px ${location.color}` }} />
          {location.code} // {protectBrands(location.category)} // <b style={{ color: location.color }}>{location.name.toUpperCase()}</b>
        </div>
        <div className="uexp-topbar-right">
          <span className={isLoaded ? 'uexp-status on' : 'uexp-status'}>
            {modo === null
              ? '◌ SELECCIONA_MODO'
              : isLoaded
                ? (modo === 'vr' ? '● MODO_VR_LISTO' : '● MODO_PC_EN_LÍNEA')
                : '◌ CARGANDO_MOTOR'}
          </span>
          {modo === 'vr' && (
            <button className="uexp-btn mono" onClick={entrarVR} disabled={!isLoaded}>
              ◉ ENTRAR_EN_VR
            </button>
          )}
          <button className="uexp-btn mono" onClick={() => requestFullscreen(true)} disabled={!isLoaded}>
            ⛶ PANTALLA_COMPLETA
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

        {/* ── Selector de modo (antes de descargar el build) ── */}
        {modo === null && (
          <div className="uexp-loading">
            <div className="uexp-loading-title">{location.name.toUpperCase()}</div>
            <div className="uexp-loading-sub mono">SELECCIONA_EL_MODO_DE_JUEGO</div>
            <div className="uexp-modes">
              <button className="uexp-mode-card mono" onClick={() => setModo('pc')}>
                MODO_PC
                <span className="uexp-mode-sub">TECLADO_+_MOUSE</span>
              </button>
              <button
                className="uexp-mode-card vr mono"
                onClick={() => setModo('vr')}
                disabled={vrDisponible !== true}
              >
                MODO_VR
                <span className="uexp-mode-sub">
                  {vrDisponible === null
                    ? 'VERIFICANDO_VISOR...'
                    : vrDisponible
                      ? 'VISOR_WEBXR_DETECTADO'
                      : 'SIN_VISOR_WEBXR'}
                </span>
              </button>
            </div>
            {vrDisponible === false && (
              <div className="uexp-pct mono">WEBXR_NO_DISPONIBLE // USA_UN_NAVEGADOR_CON_Visor</div>
            )}
          </div>
        )}

        {/* ── Overlay de carga ── */}
        {modo !== null && !isLoaded && (
          <div className="uexp-loading">
            <div className="uexp-loading-title">{location.name.toUpperCase()}</div>
            <div className="uexp-loading-sub mono">DESPLEGANDO_GEMELO_DIGITAL // UNITY_WEBGL // MODO_{modo.toUpperCase()}</div>
            <div className="uexp-bar">
              <div
                className="uexp-bar-fill"
                style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${location.color}, #FF006E)` }}
              />
            </div>
            <div className="uexp-pct mono">{String(pct).padStart(3, '0')}% // TRANSFIRIENDO_ENTORNO</div>
          </div>
        )}

        {modo !== null && (
          <Unity
            unityProvider={unityProvider}
            className="uexp-canvas"
            style={{ width: '100%', height: '100%', visibility: isLoaded ? 'visible' : 'hidden' }}
            tabIndex={-1}
          />
        )}
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
