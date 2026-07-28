'use client';

import { useEffect, useState, useRef } from 'react';
import Script from 'next/script';
import * as THREE from 'three';
import UnitySimulator from '@/components/simulators/UnityVr';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextSplitter from '@/components/ui/TextSplitter';
import MagneticElement from '@/components/ui/MagneticElement';
import ParallaxLayer from '@/components/ui/ParallaxLayer';
import AwardWinning3D from '@/components/ui/AwardWinning3D';
import LiquidGlassCard from '@/components/ui/LiquidGlassCard';

export default function Home() {
  const [juegoActivo, setJuegoActivo] = useState(false);
  const [moduloSeleccionado, setModuloSeleccionado] = useState('');
  const threeInitialized = useRef(false);

  // Desplazamiento suave para indicadores y navegación
  const irASeccion = (id: string) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const lanzarJuego = (nombreModulo: string) => {
    setModuloSeleccionado(nombreModulo);
    setJuegoActivo(true);
    document.body.style.overflow = 'hidden'; // Bloquear scroll del sitio de fondo
  };

  const cerrarJuego = () => {
    setJuegoActivo(false);
    document.body.style.overflow = 'auto'; // Reactivar scroll
  };

  // Motor original de partículas adaptado de forma segura
  const initThreeParticles = () => {
    if (threeInitialized.current || !THREE) return;
    threeInitialized.current = true;

    function buildScene(canvasId: string, config: any) {
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      if (!canvas) return;
      const W = canvas.offsetWidth || 520;
      const H = canvas.offsetHeight || 520;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
      camera.position.set(0, 0, config.camZ || 8);

      const N = config.count || 25000;
      const pos = new Float32Array(N * 3);
      const col = new Float32Array(N * 3);
      const seed = new Float32Array(N * 3);

      const c1 = new THREE.Color(config.colA);
      const c2 = new THREE.Color(config.colB);
      const c3 = new THREE.Color(config.colC);

      for (let i = 0; i < N; i++) {
        config.place(i, pos, N);
        const t = i / N;
        let r, g, b;
        if (t < 0.5) {
          const mix = t * 2;
          r = c1.r + (c2.r - c1.r) * mix; g = c1.g + (c2.g - c1.g) * mix; b = c1.b + (c2.b - c1.b) * mix;
        } else {
          const mix = (t - 0.5) * 2;
          r = c2.r + (c3.r - c2.r) * mix; g = c2.g + (c3.g - c2.g) * mix; b = c2.b + (c3.b - c2.b) * mix;
        }
        col[i * 3] = r; col[i * 3 + 1] = g; col[i * 3 + 2] = b;
        seed[i * 3] = Math.random() * 100;
        seed[i * 3 + 1] = Math.random() * 100;
        seed[i * 3 + 2] = Math.random() * Math.PI * 2;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos.slice(), 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        size: config.size || 0.04,
        vertexColors: true,
        transparent: true,
        opacity: config.opacity || 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      const mesh = new THREE.Points(geo, mat);
      const group = new THREE.Group();
      group.add(mesh);
      scene.add(group);

      const base = pos.slice();
      let mx = 0, my = 0;
      canvas.addEventListener('mousemove', (e) => {
        const r = canvas.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        my = -((e.clientY - r.top) / r.height - 0.5) * 2;
      });

      const clock = new THREE.Clock();
      let frameId: number | null = null;
      function animate() {
        frameId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        const arr = geo.attributes.position.array as Float32Array;
        if (config.animate) config.animate(t, arr, base, seed, N);
        geo.attributes.position.needsUpdate = true;
        group.rotation.y += 0.003;
        group.rotation.x += 0.001;
        group.rotation.y += mx * 0.002;
        group.rotation.x += my * 0.001;
        renderer.render(scene, camera);
      }
      animate();

      const ro = new ResizeObserver(() => {
        const w = canvas.offsetWidth; const h = canvas.offsetHeight;
        renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
      });
      ro.observe(canvas);

      return () => {
        if (frameId !== null) {
          cancelAnimationFrame(frameId);
        }
        ro.disconnect();
        geo.dispose();
        mat.dispose();
        renderer.dispose();
      };
    }

    // CANVAS 1: HISTORIA VIVA
    buildScene('c1', {
      count: 28000, camZ: 9, size: 0.038, opacity: 0.92, colA: '#FF006E', colB: '#FF6B00', colC: '#FFD700',
      place(i: number, pos: Float32Array, N: number) {
        const t = i / N; let x, y, z;
        if (t < 0.55) {
          const level = Math.floor(Math.random() * 6); const frac = level / 6; const base = 3.2 * (1 - frac * 0.7);
          x = (Math.random() - 0.5) * base * 2; y = -2.2 + frac * 4.0 + (Math.random() - 0.5) * 0.12; z = (Math.random() - 0.5) * base * 1.4;
        } else if (t < 0.78) {
          const ang = Math.random() * Math.PI; const r = 1.5 + (Math.random() - 0.5) * 0.22;
          x = Math.cos(ang) * r; y = 1.8 + Math.sin(ang) * r; z = (Math.random() - 0.5) * 0.5;
        } else {
          const r = 2 + Math.random() * 2.5; const ang = Math.random() * Math.PI * 2; const phi = Math.acos(2 * Math.random() - 1);
          x = r * Math.sin(phi) * Math.cos(ang); y = r * Math.sin(phi) * Math.sin(ang) * 0.6; z = r * Math.cos(phi) * 0.6;
        }
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      },
      animate(t: number, arr: Float32Array, base: Float32Array, seed: Float32Array, N: number) {
        for (let i = 0; i < N; i++) {
          const s0 = seed[i * 3], s1 = seed[i * 3 + 1];
          arr[i * 3] = base[i * 3] + Math.sin(t * 0.5 + s0) * 0.04;
          arr[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * 0.4 + s1) * 0.04;
          arr[i * 3 + 2] = base[i * 3 + 2] + Math.sin(t * 0.6 + s0) * 0.025;
        }
      }
    });

    // CANVAS 2: SVIRTUAL TOURS
    buildScene('c2', {
      count: 26000, camZ: 8.5, size: 0.036, opacity: 0.9, colA: '#FF6B00', colB: '#FFD700', colC: '#FF006E',
      place(i: number, pos: Float32Array, N: number) {
        const t = i / N; let x, y, z;
        if (t < 0.65) {
          const r = 2.8 + (Math.random() - 0.5) * 0.18; const ang = Math.random() * Math.PI * 2; const phi = Math.acos(2 * Math.random() - 1);
          x = r * Math.sin(phi) * Math.cos(ang); y = r * Math.sin(phi) * Math.sin(ang); z = r * Math.cos(phi);
        } else if (t < 0.82) {
          const lat = (Math.random() - 0.5) * Math.PI; const lon = Math.random() * Math.PI * 2; const r = 2.82;
          x = r * Math.cos(lat) * Math.cos(lon); y = r * Math.sin(lat); z = r * Math.cos(lat) * Math.sin(lon);
        } else {
          const orb = 3.6 + Math.random() * 0.8; const ang = Math.random() * Math.PI * 2;
          x = Math.cos(ang) * orb; y = (Math.random() - 0.5) * 1.2; z = Math.sin(ang) * orb;
        }
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      },
      animate(t: number, arr: Float32Array, base: Float32Array, seed: Float32Array, N: number) {
        for (let i = 0; i < N; i++) {
          const s0 = seed[i * 3], s1 = seed[i * 3 + 1], s2 = seed[i * 3 + 2];
          const r2 = base[i * 3] * base[i * 3] + base[i * 3 + 2] * base[i * 3 + 2];
          if (r2 > 12) {
            const ang = Math.atan2(base[i * 3 + 2], base[i * 3]) + t * 0.18; const r = Math.sqrt(r2);
            arr[i * 3] = Math.cos(ang) * r; arr[i * 3 + 2] = Math.sin(ang) * r; arr[i * 3 + 1] = base[i * 3 + 1] + Math.sin(t * 0.6 + s1) * 0.05;
          } else {
            arr[i * 3] = base[i * 3] + Math.sin(t * 0.4 + s0) * 0.03; arr[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * 0.35 + s1) * 0.03; arr[i * 3 + 2] = base[i * 3 + 2] + Math.sin(t * 0.5 + s2) * 0.02;
          }
        }
      }
    });

    // CANVAS 3: MENTELIBRE VR
    buildScene('c3', {
      count: 30000, camZ: 9, size: 0.034, opacity: 0.88, colA: '#FFD700', colB: '#FF006E', colC: '#FF6B00',
      place(i: number, pos: Float32Array, N: number) {
        const t = i / N; let x, y, z;
        if (t < 0.38) {
          const th = Math.random() * Math.PI * 2; const ph = Math.acos(2 * Math.random() - 1); const r = 1.6 + Math.sin(th * 5) * 0.28;
          x = -1.1 + r * Math.sin(ph) * Math.cos(th) * 0.75; y = r * Math.sin(ph) * Math.sin(th) * 0.62; z = r * Math.cos(ph) * 0.82;
        } else if (t < 0.76) {
          const th = Math.random() * Math.PI * 2; const ph = Math.acos(2 * Math.random() - 1); const r = 1.6 + Math.sin(th * 5) * 0.28;
          x = 1.1 - r * Math.sin(ph) * Math.cos(th) * 0.75; y = r * Math.sin(ph) * Math.sin(th) * 0.62; z = r * Math.cos(ph) * 0.82;
        } else {
          const turns = 6; const u = Math.random(); const ang = u * Math.PI * 2 * turns; const r = 2.2 + u * 1.2; const spread = (Math.random() - 0.5) * 0.3;
          x = Math.cos(ang) * (r + spread); y = (u - 0.5) * 4.5 + (Math.random() - 0.5) * 0.2; z = Math.sin(ang) * (r + spread);
        }
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      },
      animate(t: number, arr: Float32Array, base: Float32Array, seed: Float32Array, N: number) {
        for (let i = 0; i < N; i++) {
          const s0 = seed[i * 3], s1 = seed[i * 3 + 1], s2 = seed[i * 3 + 2]; const frac = i / N;
          if (frac > 0.76) {
            const pulse = 1 + Math.sin(t * 1.2 + s2) * 0.06; arr[i * 3] = base[i * 3] * pulse; arr[i * 3 + 1] = base[i * 3 + 1] + Math.sin(t * 0.5 + s0) * 0.08; arr[i * 3 + 2] = base[i * 3 + 2] * pulse;
          } else {
            const breathe = 1 + Math.sin(t * 0.8) * 0.025; arr[i * 3] = base[i * 3] * breathe + Math.sin(t * 0.5 + s0) * 0.03; arr[i * 3 + 1] = base[i * 3 + 1] * breathe + Math.cos(t * 0.4 + s1) * 0.03; arr[i * 3 + 2] = base[i * 3 + 2] * breathe + Math.sin(t * 0.6 + s2) * 0.02;
          }
        }
      }
    });
  };

  return (
    <>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" 
        onLoad={initThreeParticles}
      />

      {/* Award-winning 3D background */}
      <AwardWinning3D 
        containerId="explore-3d-bg"
        variant="tunnel"
        colors={{ primary: '#FF006E', secondary: '#FF6B00', tertiary: '#FFD700' }}
        intensity={1.3}
        interactive={true}
      />
      
      <style dangerouslySetInnerHTML={{ __html: `
        :root{
          --pink:#FF006E;
          --orange:#FF6B00;
          --yellow:#FFD700;
          --bg:#08000a;
        }
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{
          font-family:'Plus Jakarta Sans',sans-serif;
          background:var(--bg);
          color:#fff;
          overflow-x:hidden;
        }
        .mono{font-family:'JetBrains Mono',monospace}

        /* ══ NAVIGATION ══ */
        .atx-nav {
          position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
          width: 90%; max-width: 1160px; padding: 10px 20px;
          background: rgba(5, 0, 8, .35); backdrop-filter: blur(48px) saturate(200%); -webkit-backdrop-filter: blur(48px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, .055); border-radius: 100px; z-index: 9999;
          display: flex; justify-content: space-between; align-items: center;
          box-shadow: 0 8px 40px rgba(0, 0, 0, .5), inset 0 1px 0 rgba(255, 255, 255, .06);
        }
        .atx-logo {
          font-family: 'Bebas Neue', 'Plus Jakarta Sans', sans-serif; font-size: 20px; letter-spacing: .14em;
          background: linear-gradient(90deg, #FF6B00, #FFD700); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          text-decoration: none; flex-shrink: 0;
        }
        .atx-links { display: flex; gap: 2px; list-style: none; align-items: center; }
        .atx-links li { position: relative; }
        .atx-links a, .atx-links .atx-drop-btn {
          font-size: 8px; letter-spacing: .18em; color: rgba(255, 255, 255, .38); text-decoration: none;
          font-family: 'JetBrains Mono', monospace; transition: color .25s; background: transparent; border: none;
          cursor: pointer; padding: 7px 15px; display: flex; align-items: center; gap: 5px; border-radius: 100px;
        }
        .atx-links a:hover, .atx-links .atx-drop-btn:hover { color: rgba(255, 255, 255, .85); }
        .atx-links a.atx-active { color: #FF6B00; }
        .atx-chevron { font-size: 7px; opacity: .4; transition: transform .22s; }
        .atx-links li:hover .atx-chevron { transform: rotate(180deg); }
        
        .atx-dropdown {
          position: absolute; top: calc(100% + 10px); left: 50%; transform: translateX(-50%) translateY(-4px);
          background: rgba(5, 0, 8, .75); backdrop-filter: blur(60px) saturate(200%); -webkit-backdrop-filter: blur(60px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, .07); border-radius: 18px; padding: 8px; min-width: 240px;
          opacity: 0; pointer-events: none; transition: opacity .22s, transform .22s;
          box-shadow: 0 24px 64px rgba(0, 0, 0, .6), inset 0 1px 0 rgba(255, 255, 255, .05);
        }
        .atx-links li.atx-has-drop:hover .atx-dropdown { opacity: 1; pointer-events: all; transform: translateX(-50%) translateY(0); }
        .atx-dropdown a {
          font-size: 8px; letter-spacing: .15em; color: rgba(255, 255, 255, .32); padding: 10px 16px;
          display: flex; align-items: center; gap: 10px; border-radius: 12px; transition: all .18s; cursor: pointer;
        }
        .atx-dropdown a:hover { color: rgba(255, 255, 255, .85); background: rgba(255, 107, 0, .07); }
        .atx-dropdown a .dd-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 6px currentColor; }

        .atx-right { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
        .atx-cta-sec {
          font-size: 8px; font-family: 'JetBrains Mono', monospace; letter-spacing: .15em; padding: 9px 20px;
          background: rgba(255, 255, 255, .04); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, .1);
          border-radius: 100px; color: rgba(255, 255, 255, .55); text-decoration: none; transition: all .3s;
        }
        .atx-cta-sec:hover { background: rgba(255, 255, 255, .07); border-color: rgba(255, 107, 0, .45); color: rgba(255, 255, 255, .9); }
        .atx-cta-pri {
          font-size: 8px; font-family: 'JetBrains Mono', monospace; letter-spacing: .15em; padding: 9px 20px;
          background: linear-gradient(135deg, #FF6B00, #FFD700); border: 1px solid rgba(255, 255, 255, .1);
          border-radius: 100px; color: #fff; text-decoration: none; transition: all .3s;
          position: relative; overflow: hidden; display: inline-block;
        }
        .atx-cta-pri:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255, 0, 110, .35); }

        /* ── HERO INTERFACE ── */
        .hero-intro{
          height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; position:relative; overflow:hidden; padding-top: 90px;
        }
        .hero-intro h1{ font-size:clamp(3rem,10vw,9rem); font-weight:800; letter-spacing:-.04em; line-height:.9; }
        .hero-intro h1 .line1{ display:block; color:transparent; -webkit-text-stroke:1.5px rgba(255,255,255,.12); }
        .hero-intro h1 .line2{
          display:block; background:linear-gradient(135deg,var(--pink) 0%,var(--yellow) 50%,var(--orange) 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; filter:drop-shadow(0 0 60px rgba(255,107,0,.3));
        }
        .hero-intro .eyebrow{ font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.5em; color:var(--orange); margin-bottom:24px; opacity:.8; }
        .hero-intro .sub{ font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.4em; color:rgba(255,255,255,.22); margin-top:32px; }
        
        /* 🚀 INDICADORES ADICIONALES (FLECHAS HERO) 🚀 */
        .atx-hero-indicators { display: flex; gap: 40px; margin-top: 40px; z-index: 5; }
        .ind-item {
          font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 0.2em; color: rgba(255,255,255,0.3);
          cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 8px;
        }
        .ind-item:hover { color: var(--pink); transform: translateY(-2px); }
        .ind-arrow { font-size: 10px; color: var(--orange); }

        .scroll-down{ position:absolute; bottom:40px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:8px; cursor: pointer; }
        .s-line{ width:1px; height:48px; background:linear-gradient(to bottom,var(--orange),transparent); animation:sline 2s infinite }
        @keyframes sline{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
        .s-lbl{font-family:'JetBrains Mono',monospace; font-size:7px; letter-spacing:.3em; color:rgba(255,255,255,.18)}
        .grad-line{height:1px; background:linear-gradient(90deg,transparent,var(--orange),var(--pink),transparent); opacity:.2}

        /* ── SECCIONES DE MÓDULOS ── */
        .module{
          min-height:100vh; display:grid; grid-template-columns:1fr 1fr; align-items:center; max-width:1200px; margin:0 auto; padding:120px 48px; gap:80px; position: relative;
        }
        .module.reverse{direction:rtl} .module.reverse > *{direction:ltr}
        .module-canvas-wrap{ position:relative; width:100%; aspect-ratio:1/1; max-width:520px; }
        .module-canvas-wrap canvas{ width:100%!important; height:100%!important; border-radius:24px; border:1px solid rgba(255,107,0,.12); }
        .canvas-glow{ position:absolute; inset:-30px; border-radius:50px; pointer-events:none; filter:blur(60px); opacity:.18; }

        .mod-num{ font-family:'JetBrains Mono',monospace; font-size:8px; letter-spacing:.5em; opacity:.28; margin-bottom:12px; }
        .mod-tag{ font-family:'JetBrains Mono',monospace; font-size:8px; letter-spacing:.45em; margin-bottom:18px; }
        .mod-title{ font-size:clamp(2.6rem,5vw,5rem); font-weight:800; line-height:.92; letter-spacing:-.04em; margin-bottom:24px; }
        .grad-text{ background:linear-gradient(135deg,var(--pink),var(--yellow),var(--orange)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .mod-desc{ font-size:13px; line-height:2; color:rgba(255,255,255,.45); font-weight:300; max-width:420px; margin-bottom:28px; }
        
        /* 🚀 FLECHAS INDICADORAS ENTRE SECCIONES 🚀 */
        .atx-section-nav-anchor {
          position: absolute; bottom: 30px; right: 48px; display: flex; gap: 15px; 
          font-family: 'JetBrains Mono', monospace; font-size: 7px; letter-spacing: 0.2em; 
          color: rgba(255,255,255,0.2); cursor: pointer; transition: color 0.3s;
        }
        .atx-section-nav-anchor:hover { color: var(--yellow); }

        .mod-launch-btn {
          display: inline-flex; align-items: center; gap: 10px; margin-top: 32px; padding: 14px 36px;
          background: linear-gradient(135deg, #FF006E, #FF6B00); border: 1px solid rgba(255, 255, 255, .12);
          border-radius: 100px; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: .22em; font-weight: 700;
          color: #fff; text-decoration: none; transition: all .35s; cursor: pointer;
        }
        .mod-launch-btn:hover { transform: translateY(-3px); box-shadow: 0 18px 48px rgba(255, 0, 110, .42); }
        .mod-launch-btn .btn-arrow { font-size: 11px; transition: transform .3s; }
        .mod-launch-btn:hover .btn-arrow { transform: translateX(5px); }

        .sec-historia{background:radial-gradient(ellipse at 60% 50%,rgba(255,0,110,.055),transparent 65%)}
        .sec-svirtual{background:radial-gradient(ellipse at 40% 50%,rgba(255,107,0,.055),transparent 65%)}
        .sec-mente{background:radial-gradient(ellipse at 60% 50%,rgba(255,215,0,.04),transparent 65%)}

        /* MARQUEE */
        .mq{overflow:hidden; padding:16px 0; border-top:1px solid rgba(255,107,0,.07); border-bottom:1px solid rgba(255,107,0,.07)}
        .mq-t{display:flex; white-space:nowrap; animation:mqa 30s linear infinite}
        @keyframes mqa{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .mqi{display:inline-flex; align-items:center; gap:16px; padding:0 26px; font-size:9px; letter-spacing:.2em; font-family:'JetBrains Mono',monospace; color:rgba(255,255,255,.22)}
        .mqi span{color:var(--orange)}

        /* FOOTER */
        .atx-footer { position: relative; padding: 56px 48px 44px; background: rgba(4, 0, 6, .6); border-top: 1px solid rgba(255, 255, 255, .04); }
        .atx-footer-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; flex-wrap: wrap; }
        .atx-footer-brand .footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: .12em; background: linear-gradient(90deg, #FF006E, #FFD700); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .atx-footer-brand p { font-family: 'JetBrains Mono', monospace; font-size: 7px; letter-spacing: .35em; color: rgba(255, 255, 255, .18); }
        .atx-footer-links { display: flex; gap: 32px; }
        .atx-footer-col h4 { font-family: 'JetBrains Mono', monospace; font-size: 7px; letter-spacing: .4em; color: rgba(255, 107, 0, .55); margin-bottom: 14px; }
        .atx-footer-col a { display: block; font-family: 'JetBrains Mono', monospace; font-size: 7px; letter-spacing: .18em; color: rgba(255, 255, 255, .22); text-decoration: none; margin-bottom: 8px; cursor: pointer;}
        .atx-footer-bottom { max-width: 1100px; margin: 28px auto 0; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, .04); display: flex; justify-content: space-between; }
        .atx-footer-bottom span { font-family: 'JetBrains Mono', monospace; font-size: 7px; letter-spacing: .25em; color: rgba(255, 255, 255, .14); }

        @media(max-width:900px){
          .module{grid-template-columns:1fr; padding:80px 24px; gap:48px}
          .module.reverse{direction:ltr}
          .atx-links, .atx-cta-sec, .atx-hero-indicators { display: none !important; }
        }

        /* ══ 🌐 CAPA FLOTANTE DEL IFRAME (MODAL VORTEX) ══ */
        .atx-game-overlay {
          position: fixed; inset: 0; width: 100vw; height: 100vh; background: #050008; z-index: 99999;
          display: flex; flex-direction: column; animation: overlayFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes overlayFade { from { opacity: 0; transform: scale(1.02); } to { opacity: 1; transform: scale(1); } }
        
        .atx-game-header {
          width: 100%; height: 60px; background: rgba(8, 0, 10, 0.9); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 107, 0, 0.15); display: flex; justify-content: space-between; align-items: center; padding: 0 30px;
        }
        .game-title-panel { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.3em; color: #FFF; }
        .game-title-panel span { color: var(--pink); font-weight: bold; }
        
        /* BOTÓN DE REGRESO */
        .atx-back-btn {
          background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 0, 110, 0.4); border-radius: 100px;
          padding: 8px 22px; font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #FFF; letter-spacing: 0.15em;
          cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 8px;
        }
        .atx-back-btn:hover {
          background: linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(255, 107, 0, 0.2));
          border-color: var(--yellow); box-shadow: 0 0 20px rgba(255, 0, 110, 0.25); transform: translateX(-3px);
        }

        .atx-iframe-wrapper { flex: 1; width: 100%; height: calc(100% - 60px); background: #000; }
        .atx-iframe-wrapper iframe { width: 100%; height: 100%; border: none; }
      ` }} />

      {/* NAV BAR */}
      <nav className="atx-nav relative z-20">
        <a href="#" className="atx-logo">ATHERNIX</a>
        <ul className="atx-links">
          <li className="atx-has-drop">
            <button className="atx-drop-btn">MÓDULOS <span className="atx-chevron">▾</span></button>
            <div className="atx-dropdown">
              <a onClick={() => irASeccion('historia')}><span className="dd-dot" style={{background:'#FF006E'}}></span>HISTORIA_VIVA_VR</a>
              <a onClick={() => irASeccion('svirtual')}><span className="dd-dot" style={{background:'#FF6B00'}}></span>SVIRTUAL_TOURS</a>
              <a onClick={() => irASeccion('mente')}><span className="dd-dot" style={{background:'#FFD700'}}></span>MENTELIBRE_VR</a>
            </div>
          </li>
          <li><a className="atx-active">ACERCA DE NOSOTROS</a></li>
        </ul>
        <div className="atx-right">
          <a href="#" className="atx-cta-sec">INICIAR SESIÓN</a>
          <a href="#" className="atx-cta-pri">REGISTRO</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-intro relative z-10">
        <p className="eyebrow text-shimmer">[ PLATAFORMA_XR // EL_SALVADOR // 2026 ]</p>
        <h1>
          <span className="line1"><TextSplitter text="MÓDULOS" effect="cascade" /></span>
          <span className="line2"><TextSplitter text="ATHERNIX" effect="cascade" /></span>
        </h1>
        <p className="sub">TRES EJES · UNA PLATAFORMA · IMPACTO REAL</p>
        
        {/* INDICADORES EXTRAS ADICIONALES (FLECHAS SOLICITADAS) */}
        <div className="atx-hero-indicators">
          <div className="ind-item" onClick={() => irASeccion('historia')}>
            <span className="ind-arrow">↓</span> 01_HISTORIA
          </div>
          <div className="ind-item" onClick={() => irASeccion('svirtual')}>
            <span className="ind-arrow">↓</span> 02_TURISMO
          </div>
          <div className="ind-item" onClick={() => irASeccion('mente')}>
            <span className="ind-arrow">↓</span> 03_SALUD
          </div>
        </div>

        <div className="scroll-down" onClick={() => irASeccion('historia')}>
          <div className="s-line"></div>
          <span className="s-lbl">EXPLORAR</span>
        </div>
      </section>

      <div className="grad-line relative z-10"></div>

      {/* MARQUEE */}
      <div className="mq relative z-10">
        <div className="mq-t">
          <span className="mqi">HISTORIA VIVA VR <span>✦</span></span>
          <span className="mqi">SVIRTUAL TOURS <span>✦</span></span>
          <span className="mqi">MENTELIBRE VR <span>✦</span></span>
          <span className="mqi">EJE CULTURAL <span>✦</span></span>
          <span className="mqi">EJE TURISMO <span>✦</span></span>
          <span className="mqi">ATHERNIX XR <span>✦</span></span>
        </div>
      </div>

      {/* MÓDULO 01 */}
      <ScrollReveal effect="fadeUp" threshold={0.2}>
      <section className="sec-historia relative z-10" id="historia">
        <LiquidGlassCard 
          intensity="medium"
          glowColor="rgba(255, 0, 110, 0.4)"
          className="module"
        >
          <div className="module-canvas-wrap">
            <ParallaxLayer speed={0.03} direction="up">
              <div className="canvas-glow float-gentle" style={{background:"radial-gradient(var(--pink),transparent 70%)"}}></div>
            </ParallaxLayer>
            <canvas id="c1"></canvas>
          </div>
          <div className="module-text">
            <p className="mod-num mono">01 / 03</p>
            <p className="mod-tag mono" style={{color:"var(--pink)"}}>EJE_CULTURAL</p>
            <h2 className="mod-title">
               <TextSplitter text="HISTORIA" effect="cascade" as="span" /><br />
               <span className="grad-text"><TextSplitter text="VIVA VR" effect="cascade" as="span" /></span>
            </h2>
            <p className="mod-desc">Módulo educativo inmersivo que revitaliza la enseñanza de la historia salvadoreña.</p>
            <MagneticElement>
              <button onClick={() => lanzarJuego('HISTORIA VIVA VR')} className="mod-launch-btn glow-pink">
                INICIAR JUEGO <span className="btn-arrow">→</span>
              </button>
            </MagneticElement>
          </div>
          {/* INDICADOR SECCIÓN */}
          <div className="atx-section-nav-anchor" onClick={() => irASeccion('svirtual')}>
            SIGUIENTE EJE [02] ↓
          </div>
        </LiquidGlassCard>
      </section>
      </ScrollReveal>

      <div className="grad-line relative z-10"></div>

      {/* MÓDULO 02 */}
      <ScrollReveal effect="fadeUp" threshold={0.2}>
      <section className="sec-svirtual relative z-10" id="svirtual">
        <LiquidGlassCard 
          intensity="medium"
          glowColor="rgba(255, 107, 0, 0.4)"
          className="module reverse"
        >
          <div className="module-canvas-wrap">
            <ParallaxLayer speed={0.03} direction="down">
              <div className="canvas-glow float-medium" style={{background:"radial-gradient(var(--orange),transparent 70%)"}}></div>
            </ParallaxLayer>
            <canvas id="c2"></canvas>
          </div>
          <div className="module-text">
            <p className="mod-num mono">02 / 03</p>
            <p className="mod-tag mono" style={{color:"var(--orange)"}}>EJE_TURISMO</p>
            <h2 className="mod-title">
               <TextSplitter text="SVIRTUAL" effect="cascade" as="span" /><br />
               <span className="grad-text"><TextSplitter text="TOURS" effect="cascade" as="span" /></span>
            </h2>
            <p className="mod-desc">Dinamiza la economía mediante turismo digital guiado por entornos interactivos.</p>
            <MagneticElement>
              <button onClick={() => lanzarJuego('SVIRTUAL TOURS')} className="mod-launch-btn glow-orange">
                INICIAR JUEGO <span className="btn-arrow">→</span>
              </button>
            </MagneticElement>
          </div>
          {/* INDICADOR SECCIÓN */}
          <div className="atx-section-nav-anchor" onClick={() => irASeccion('mente')}>
            SIGUIENTE EJE [03] ↓
          </div>
        </LiquidGlassCard>
      </section>
      </ScrollReveal>

      <div className="grad-line relative z-10"></div>

      {/* MÓDULO 03 */}
      <ScrollReveal effect="fadeUp" threshold={0.2}>
      <section className="sec-mente relative z-10" id="mente">
        <LiquidGlassCard 
          intensity="medium"
          glowColor="rgba(255, 215, 0, 0.4)"
          className="module"
        >
          <div className="module-canvas-wrap">
            <ParallaxLayer speed={0.03} direction="up">
              <div className="canvas-glow float-gentle" style={{background:"radial-gradient(var(--yellow),transparent 70%)"}}></div>
            </ParallaxLayer>
            <canvas id="c3"></canvas>
          </div>
          <div className="module-text">
            <p className="mod-num mono">03 / 03</p>
            <p className="mod-tag mono" style={{color:"var(--yellow)"}}>EJE_SALUD_MENTAL</p>
            <h2 className="mod-title">
               <TextSplitter text="MENTE" effect="cascade" as="span" /><span className="grad-text"><TextSplitter text="LIBRE" effect="cascade" as="span" /></span><br />
               VR
            </h2>
            <p className="mod-desc">Entornos virtuales controlados y adaptativos para el apoyo terapéutico.</p>
            <MagneticElement>
              <button onClick={() => lanzarJuego('MENTELIBRE VR')} className="mod-launch-btn glow-gold">
                INICIAR JUEGO <span className="btn-arrow">→</span>
              </button>
            </MagneticElement>
          </div>
          {/* INDICADOR RETORNO */}
          <div className="atx-section-nav-anchor" onClick={() => irASeccion('historia')}>
            VOLVER AL INICIO [↑]
          </div>
        </LiquidGlassCard>
      </section>
      </ScrollReveal>

      {/* FOOTER */}
      <footer className="atx-footer relative z-10">
        <div className="atx-footer-inner">
          <div className="atx-footer-brand">
            <span className="footer-logo">ATHERNIX</span>
            <p>NEO VORTEX LABS · EL SALVADOR · 2026</p>
          </div>
          <div className="atx-footer-links">
            <div className="atx-footer-col">
              <h4>MÓDULOS</h4>
              <a onClick={() => irASeccion('historia')}>HISTORIA VIVA</a>
              <a onClick={() => irASeccion('svirtual')}>SVIRTUAL TOURS</a>
              <a onClick={() => irASeccion('mente')}>MENTELIBRE VR</a>
            </div>
          </div>
        </div>
        <div className="atx-footer-bottom">
          <span>© 2026 ATHERNIX · TODOS LOS DERECHOS RESERVADOS</span>
        </div>
      </footer>

      {/* ══ INTERFAZ INMERSIVA EN VIVO (IFRAME DE UNITY) ══ */}
      {juegoActivo && (
        <div className="atx-game-overlay">
          <div className="atx-game-header">
            <div className="game-title-panel">
              NEXUS_CORE // MÓDULO CORRIENDO: <span>{moduloSeleccionado}</span>
            </div>
            {/* BOTÓN REGRESO SOLICITADO */}
            <button className="atx-back-btn" onClick={cerrarJuego}>
              ← REGRESAR A MÓDULOS
            </button>
          </div>
          <div className="atx-iframe-wrapper">
            <UnitySimulator />
          </div>
        </div>
      )}
    </>
  );
}