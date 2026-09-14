'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Script from 'next/script';
import UnitySimulator from '@/components/simulators/UnityVr';
import './explore.css';

// Declaración global para que TypeScript reconozca a THREE en la ventana
declare global {
  interface Window {
    THREE: any;
  }
}

// ── Almacén de renderers/loops para limpieza al desmontar ──
const exploreScenes: { renderer: any; scene: any; rafId: number; ro: ResizeObserver | null; canvas: HTMLCanvasElement }[] = [];

function ExploreContent() {
  const [juegoActivo, setJuegoActivo] = useState(false);
  const [moduloSeleccionado, setModuloSeleccionado] = useState('');
  const threeInitialized = useRef(false);
  const router = useRouter();

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

  // Lanzar juego automáticamente si viene con ?juego=... (por ejemplo desde Mundi)
  const searchParams = useSearchParams();
  useEffect(() => {
    const juego = searchParams?.get('juego');
    if (juego) {
      setModuloSeleccionado(juego);
      setJuegoActivo(true);
      document.body.style.overflow = 'hidden';
    }
  }, [searchParams]);

  // ── Limpieza al desmontar: disponer los 3 renderers Three.js y cancelar loops ──
  useEffect(() => {
    return () => {
      exploreScenes.forEach(({ renderer, scene, rafId, ro }) => {
        cancelAnimationFrame(rafId);
        ro?.disconnect();
        try {
          scene?.traverse?.((obj: any) => {
            if (obj.geometry) obj.geometry.dispose?.();
            if (obj.material) {
              if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose?.());
              else obj.material.dispose?.();
            }
          });
          renderer?.dispose();
        } catch (e) { /* ya dispuesto */ }
      });
      exploreScenes.length = 0;
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Motor original de partículas adaptado de forma segura
  const initThreeParticles = () => {
    if (threeInitialized.current || !window.THREE) return;
    threeInitialized.current = true;

    function buildScene(canvasId: string, config: any) {
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      if (!canvas) return;
      const W = canvas.offsetWidth || 520;
      const H = canvas.offsetHeight || 520;

      const renderer = new window.THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new window.THREE.Scene();
      const camera = new window.THREE.PerspectiveCamera(60, W / H, 0.1, 200);
      camera.position.set(0, 0, config.camZ || 8);

      const N = config.count || 25000;
      const pos = new Float32Array(N * 3);
      const col = new Float32Array(N * 3);
      const seed = new Float32Array(N * 3);

      const c1 = new window.THREE.Color(config.colA);
      const c2 = new window.THREE.Color(config.colB);
      const c3 = new window.THREE.Color(config.colC);

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

      const geo = new window.THREE.BufferGeometry();
      geo.setAttribute('position', new window.THREE.BufferAttribute(pos.slice(), 3));
      geo.setAttribute('color', new window.THREE.BufferAttribute(col, 3));

      const mat = new window.THREE.PointsMaterial({
        size: config.size || 0.04,
        vertexColors: true,
        transparent: true,
        opacity: config.opacity || 0.9,
        blending: window.THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      const mesh = new window.THREE.Points(geo, mat);
      const group = new window.THREE.Group();
      group.add(mesh);
      scene.add(group);

      const base = pos.slice();
      let mx = 0, my = 0;
      canvas.addEventListener('mousemove', (e) => {
        const r = canvas.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        my = -((e.clientY - r.top) / r.height - 0.5) * 2;
      });

      const clock = new window.THREE.Clock();
      let isVisible = true;
      let rafId = 0;
      function animate() {
        rafId = requestAnimationFrame(animate);
        // Pausar renderizado si el canvas no es visible (ahorra GPU/CPU)
        if (!isVisible) return;
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

      // Pausar el canvas cuando sale del viewport (IntersectionObserver)
      const visObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { isVisible = entry.isIntersecting; });
      }, { rootMargin: '100px' });
      visObserver.observe(canvas);

      // Guardar para limpieza al desmontar
      exploreScenes.push({ renderer, scene, rafId, ro, canvas });
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
    <div className="explore-scope">
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" 
        onLoad={initThreeParticles}
      />

      {/* NAV BAR */}
      <nav className="atx-nav">
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
      <section className="hero-intro">
        <p className="eyebrow">[ PLATAFORMA_XR // EL_SALVADOR // 2026 ]</p>
        <h1>
          <span className="line1">MÓDULOS</span>
          <span className="line2">ATHERNIX</span>
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

      <div className="grad-line"></div>

      {/* MARQUEE */}
      <div className="mq">
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
      <section className="sec-historia" id="historia">
        <div className="module">
          <div className="module-canvas-wrap">
            <div className="canvas-glow" style={{background:"radial-gradient(var(--pink),transparent 70%)"}}></div>
            <canvas id="c1"></canvas>
          </div>
          <div className="module-text">
            <p className="mod-num mono">01 / 03</p>
            <p className="mod-tag mono" style={{color:"var(--pink)"}}>EJE_CULTURAL</p>
            <h2 className="mod-title">HISTORIA<br /><span className="grad-text">VIVA VR</span></h2>
            <p className="mod-desc">Módulo educativo inmersivo que revitaliza la enseñanza de la historia salvadoreña.</p>
            <button onClick={() => lanzarJuego('history')} className="mod-launch-btn">
              INICIAR JUEGO <span className="btn-arrow">→</span>
            </button>
          </div>
          {/* INDICADOR SECCIÓN */}
          <div className="atx-section-nav-anchor" onClick={() => irASeccion('svirtual')}>
            SIGUIENTE EJE [02] ↓
          </div>
        </div>
      </section>

      <div className="grad-line"></div>

      {/* MÓDULO 02 */}
      <section className="sec-svirtual" id="svirtual">
        <div className="module reverse">
          <div className="module-canvas-wrap">
            <div className="canvas-glow" style={{background:"radial-gradient(var(--orange),transparent 70%)"}}></div>
            <canvas id="c2"></canvas>
          </div>
          <div className="module-text">
            <p className="mod-num mono">02 / 03</p>
            <p className="mod-tag mono" style={{color:"var(--orange)"}}>EJE_TURISMO</p>
            <h2 className="mod-title">SVIRTUAL<br /><span className="grad-text">TOURS</span></h2>
            <p className="mod-desc">Dinamiza la economía mediante turismo digital guiado por entornos interactivos.</p>
            <button onClick={() => lanzarJuego('lobby')} className="mod-launch-btn">
              INICIAR JUEGO <span className="btn-arrow">→</span>
            </button>
          </div>
          {/* INDICADOR SECCIÓN */}
          <div className="atx-section-nav-anchor" onClick={() => irASeccion('mente')}>
            SIGUIENTE EJE [03] ↓
          </div>
        </div>
      </section>

      <div className="grad-line"></div>

      {/* MÓDULO 03 */}
      <section className="sec-mente" id="mente">
        <div className="module">
          <div className="module-canvas-wrap">
            <div className="canvas-glow" style={{background:"radial-gradient(var(--yellow),transparent 70%)"}}></div>
            <canvas id="c3"></canvas>
          </div>
          <div className="module-text">
            <p className="mod-num mono">03 / 03</p>
            <p className="mod-tag mono" style={{color:"var(--yellow)"}}>EJE_SALUD_MENTAL</p>
            <h2 className="mod-title">MENTE<span className="grad-text">LIBRE</span><br />VR</h2>
            <p className="mod-desc">Entornos virtuales controlados y adaptativos para el apoyo terapéutico.</p>
            <button onClick={() => lanzarJuego('mental')} className="mod-launch-btn">
              INICIAR JUEGO <span className="btn-arrow">→</span>
            </button>
          </div>
          {/* INDICADOR RETORNO */}
          <div className="atx-section-nav-anchor" onClick={() => irASeccion('historia')}>
            VOLVER AL INICIO [↑]
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="atx-footer">
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
              NEXUS_CORE // MÓDULO CORRIENDO: <span>{moduloSeleccionado === 'history' ? 'HISTORIA VIVA VR' : moduloSeleccionado === 'mental' ? 'MENTELIBRE VR' : moduloSeleccionado === 'lobby' || moduloSeleccionado === 'default' ? 'ATHERNIX LOBBY' : moduloSeleccionado}</span>
            </div>
            {/* BOTÓN REGRESO SOLICITADO */}
            <button className="atx-back-btn" onClick={() => { document.body.style.overflow = 'auto'; router.push('/modulos'); }}>
              ← REGRESAR A MÓDULOS
            </button>
          </div>
          <div className="atx-iframe-wrapper">
            <UnitySimulator buildKey={moduloSeleccionado as 'history' | 'mental' | 'lobby' | 'default'} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <ExploreContent />
    </Suspense>
  );
}