"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { NotFoundParticles } from "./not-found/components/NotFoundParticles";
import "./not-found.css";

export default function NotFound() {
  const [clickCount, setClickCount] = useState(0);
  const [showKonami, setShowKonami] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isRainbow, setIsRainbow] = useState(false);
  const [titleText, setTitleText] = useState("");

  const code404Ref = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const konamiIndexRef = useRef(0);
  const typeBufferRef = useRef("");

  // Toast helper
  const displayToast = (msg: string, duration = 2800) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setIsToastVisible(false);
    }, duration);
  };

  // Easter egg 1: Click 7 times on 404
  const handleCode404Click = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;

      // Mini glitch on each click
      if (code404Ref.current) {
        code404Ref.current.classList.remove("glitching");
        void code404Ref.current.offsetWidth; // Reflow
        code404Ref.current.classList.add("glitching");
      }

      if (newCount === 7) {
        // Rainbow mode
        setIsRainbow(true);
        displayToast("🌈 MODO_ARCOÍRIS · PÁGINA SIGUE PERDIDA ✦");
        setTimeout(() => {
          setIsRainbow(false);
        }, 4000);
        return 0;
      } else if (newCount === 3) {
        displayToast(`✦ ${7 - newCount} CLICS MÁS PARA ALGO ESPECIAL...`);
      }

      return newCount;
    });
  };

  // Easter egg 2: Konami Code
  useEffect(() => {
    const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === KONAMI[konamiIndexRef.current]) {
        konamiIndexRef.current++;
      } else {
        konamiIndexRef.current = 0;
      }

      if (konamiIndexRef.current === KONAMI.length) {
        konamiIndexRef.current = 0;
        setShowKonami(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Easter egg 3: Type "ATHERNIX"
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      typeBufferRef.current = (typeBufferRef.current + e.key).slice(-8).toUpperCase();

      if (typeBufferRef.current === "ATHERNIX") {
        typeBufferRef.current = "";
        
        if (titleRef.current) {
          const originalHTML = titleRef.current.innerHTML;
          titleRef.current.innerHTML = '<em>¿ENCONTRASTE EL SECRETO?</em><br>ATHERNIX_SIEMPRE_TE_OBSERVA 👁';
          displayToast("👁 SISTEMA_ACTIVADO · ATHERNIX_ONLINE ✦", 3500);
          setTimeout(() => {
            if (titleRef.current) {
              titleRef.current.innerHTML = originalHTML;
            }
          }, 3500);
        }
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, []);

  return (
    <div className="not-found-container">
      {/* BG CANVAS */}
      <div id="bg">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 65, near: 0.1, far: 300 }}
          gl={{ alpha: true, antialias: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <NotFoundParticles />
        </Canvas>
      </div>

      {/* KONAMI OVERLAY */}
      <div id="konami-ov" className={showKonami ? "show" : ""}>
        <p style={{ fontSize: "8px", letterSpacing: ".5em", color: "var(--orange)", marginBottom: "20px" }}>
          [ ACCESO_NIVEL_DIOS ]
        </p>
        <p className="konami-title">PÁGINA<br />ENCONTRADA</p>
        <p className="konami-sub">MENTIRA. SIGUE PERDIDO. PERO TIENES BUEN GUSTO 👾🕹️🎮.</p>
        <button
          className="konami-close"
          onClick={() => setShowKonami(false)}
        >
          [ CERRAR ]
        </button>
      </div>

      {/* TOAST */}
      <div className={`toast ${isToastVisible ? "show" : ""}`}>{toastMessage}</div>

      {/* MAIN */}
      <div className="wrap">
        <p className="label">[ SEÑAL_PERDIDA · ERROR_CRÍTICO ]</p>

        <div className="code-wrap">
          <span className="code-ghost" aria-hidden="true">404</span>
          <span
            ref={code404Ref}
            className={`code ${isRainbow ? "rainbow" : ""}`}
            onClick={handleCode404Click}
            style={{ cursor: "pointer" }}
          >
            404
          </span>
        </div>

        <h1 className="title" ref={titleRef}>
          Esta página <em>no existe</em><br />en este universo VR
        </h1>

        <p className="sub">
          La coordenada que buscas está fuera de la matriz.<br />
          Quizás nunca existió, o se disolvió en el vacío digital.
        </p>

        <div className="scanline" />

        <div className="btns">
          <a href="/" className="btn-primary">← VOLVER AL INICIO</a>
          <a href="/login" className="btn-sec">IR A LOGIN</a>
        </div>
      </div>

      {/* SIGNAL BARS */}
      <div className="signal">
        <div className="bar active" />
        <div className="bar active" />
        <div className="bar active" />
        <div className="bar" />
        <span className="bar-label">SEÑAL_DÉBIL</span>
      </div>

      {/* COORDS */}
      <div className="coords">13.6929° N · 89.2182° W · SECTOR_NULL</div>

      <style jsx>{`
        .rainbow {
          animation: rainbow 1s linear infinite, fadeUp 0s forwards;
        }
      `}</style>
    </div>
  );
}
