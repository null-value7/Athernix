// @ts-nocheck
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ModulosAtmosphere } from '../../components/modulos/ModulosAtmosphere';
import '../styles/modulos.css';

function tiltMove(e, rotateX = 6, rotateY = 8) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  gsap.to(e.currentTarget, {
    rotateX: -y * rotateX,
    rotateY: x * rotateY,
    transformPerspective: 1000,
    duration: 0.35,
    ease: 'power2.out',
    transformOrigin: 'center center',
  });
}

function tiltReset(e) {
  gsap.to(e.currentTarget, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.6,
    ease: 'elastic.out(1, 0.5)',
  });
}

function magneticMove(e, strength = 0.4) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) * strength;
  const y = (e.clientY - rect.top - rect.height / 2) * strength;
  gsap.to(e.currentTarget, { x, y, duration: 0.25, ease: 'power2.out' });
}

function magneticReset(e) {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
}

export default function ModulosPage() {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  const canvasRef3 = useRef(null);
  const progressRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas1 = canvasRef1.current;
    const canvas2 = canvasRef2.current;
    const canvas3 = canvasRef3.current;

    const scenes = [];

    // --- Fábrica de escena de partículas para cada canvas ---
    function buildScene(canvas, config) {
      if (!canvas) return null;
      
      const W = canvas.offsetWidth || 520;
      const H = canvas.offsetHeight || 520;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
      camera.position.set(0, 0, config.camZ || 8);

      // --- Partículas ---
      const N = config.count || 25000;
      const pos = new Float32Array(N * 3);
      const col = new Float32Array(N * 3);
      const seed = new Float32Array(N * 3);

      const c1 = new THREE.Color(config.colA);
      const c2 = new THREE.Color(config.colB);
      const c3 = new THREE.Color(config.colC);

      for (let i = 0; i < N; i++) {
        config.place(i, pos, N);

        // color según índice
        const t = i / N;
        let r, g, b;
        if (t < 0.5) {
          const mix = t * 2;
          r = c1.r + (c2.r - c1.r) * mix;
          g = c1.g + (c2.g - c1.g) * mix;
          b = c1.b + (c2.b - c1.b) * mix;
        } else {
          const mix = (t - 0.5) * 2;
          r = c2.r + (c3.r - c2.r) * mix;
          g = c2.g + (c3.g - c2.g) * mix;
          b = c2.b + (c3.b - c2.b) * mix;
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

      const base = pos.slice(); // guardar posición base

      // --- Mouse hover ---
      let mx = 0, my = 0;
      const onMouseMove = (e) => {
        const r = canvas.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        my = -((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      canvas.addEventListener('mousemove', onMouseMove);

      // --- Animate ---
      const timer = new THREE.Clock();
      let animationFrameId;

      function animate() {
        animationFrameId = requestAnimationFrame(animate);
        const t = timer.getElapsedTime();
        const arr = geo.attributes.position.array;

        if (config.animate) {
          config.animate(t, arr, base, seed, N);
        }

        geo.attributes.position.needsUpdate = true;

        // Rotación suave + reacción al mouse
        group.rotation.y += 0.003;
        group.rotation.x += 0.001;
        group.rotation.y += mx * 0.002;
        group.rotation.x += my * 0.001;

        renderer.render(scene, camera);
      }
      animate();

      // Resize
      const resizeObserver = new ResizeObserver(() => {
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      resizeObserver.observe(canvas);

      return {
        cleanup: () => {
          cancelAnimationFrame(animationFrameId);
          canvas.removeEventListener('mousemove', onMouseMove);
          resizeObserver.disconnect();
          geo.dispose();
          mat.dispose();
          renderer.dispose();
        }
      };
    }

    // --- c1: HISTORIA VIVA (Pirámide Maya) ---
    const s1 = buildScene(canvas1, {
      count: 9000,
      camZ: 9,
      size: 0.055,
      opacity: 0.9,
      colA: '#FF006E',
      colB: '#FF6B00',
      colC: '#FFD700',
      place(i, pos, N) {
        const t = i / N;
        let x, y, z;

        if (t < 0.55) {
          // Pirámide escalonada
          const level = Math.floor(Math.random() * 6);
          const frac = level / 6;
          const baseWidth = 3.2 * (1 - frac * 0.7);
          x = (Math.random() - 0.5) * baseWidth * 2;
          y = -2.2 + frac * 4.0 + (Math.random() - 0.5) * 0.12;
          z = (Math.random() - 0.5) * baseWidth * 1.4;
        } else if (t < 0.78) {
          // Arco encima de la pirámide
          const ang = Math.random() * Math.PI;
          const r = 1.5 + (Math.random() - 0.5) * 0.22;
          x = Math.cos(ang) * r;
          y = 1.8 + Math.sin(ang) * r;
          z = (Math.random() - 0.5) * 0.5;
        } else {
          // Polvo / fragmentos flotantes
          const r = 2 + Math.random() * 2.5;
          const ang = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          x = r * Math.sin(phi) * Math.cos(ang);
          y = r * Math.sin(phi) * Math.sin(ang) * 0.6;
          z = r * Math.cos(phi) * 0.6;
        }
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      },
      animate(t, arr, base, seed, N) {
        for (let i = 0; i < N; i++) {
          const s0 = seed[i * 3], s1 = seed[i * 3 + 1];
          arr[i * 3] = base[i * 3] + Math.sin(t * 0.5 + s0) * 0.04;
          arr[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * 0.4 + s1) * 0.04;
          arr[i * 3 + 2] = base[i * 3 + 2] + Math.sin(t * 0.6 + s0) * 0.025;
        }
      }
    });
    if (s1) scenes.push(s1);

    // --- c2: SVIRTUAL TOURS (Globo Terrestre) ---
    const s2 = buildScene(canvas2, {
      count: 9000,
      camZ: 8.5,
      size: 0.05,
      opacity: 0.88,
      colA: '#FF6B00',
      colB: '#FFD700',
      colC: '#FF006E',
      place(i, pos, N) {
        const t = i / N;
        let x, y, z;

        if (t < 0.65) {
          // Esfera tipo globo
          const r = 2.8 + (Math.random() - 0.5) * 0.18;
          const ang = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          x = r * Math.sin(phi) * Math.cos(ang);
          y = r * Math.sin(phi) * Math.sin(ang);
          z = r * Math.cos(phi);
        } else if (t < 0.82) {
          // Meridianos / líneas de latitud
          const lat = (Math.random() - 0.5) * Math.PI;
          const lon = Math.random() * Math.PI * 2;
          const r = 2.82;
          x = r * Math.cos(lat) * Math.cos(lon);
          y = r * Math.sin(lat);
          z = r * Math.cos(lat) * Math.sin(lon);
        } else {
          // Estela / partículas orbitando
          const orb = 3.6 + Math.random() * 0.8;
          const ang = Math.random() * Math.PI * 2;
          x = Math.cos(ang) * orb;
          y = (Math.random() - 0.5) * 1.2;
          z = Math.sin(ang) * orb;
        }
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      },
      animate(t, arr, base, seed, N) {
        for (let i = 0; i < N; i++) {
          const s0 = seed[i * 3], s1 = seed[i * 3 + 1], s2 = seed[i * 3 + 2];
          const r2 = base[i * 3] * base[i * 3] + base[i * 3 + 2] * base[i * 3 + 2];
          if (r2 > 12) {
            const ang = Math.atan2(base[i * 3 + 2], base[i * 3]) + t * 0.18;
            const r = Math.sqrt(r2);
            arr[i * 3] = Math.cos(ang) * r;
            arr[i * 3 + 2] = Math.sin(ang) * r;
            arr[i * 3 + 1] = base[i * 3 + 1] + Math.sin(t * 0.6 + s1) * 0.05;
          } else {
            arr[i * 3] = base[i * 3] + Math.sin(t * 0.4 + s0) * 0.03;
            arr[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * 0.35 + s1) * 0.03;
            arr[i * 3 + 2] = base[i * 3 + 2] + Math.sin(t * 0.5 + s2) * 0.02;
          }
        }
      }
    });
    if (s2) scenes.push(s2);

    // --- c3: MENTE LIBRE (Cerebro) ---
    const s3 = buildScene(canvas3, {
      count: 10000,
      camZ: 9,
      size: 0.048,
      opacity: 0.86,
      colA: '#FFD700',
      colB: '#FF006E',
      colC: '#FF6B00',
      place(i, pos, N) {
        const t = i / N;
        let x, y, z;

        if (t < 0.38) {
          // Hemisferio izquierdo cerebro
          const th = Math.random() * Math.PI * 2;
          const ph = Math.acos(2 * Math.random() - 1);
          const r = 1.6 + Math.sin(th * 5) * 0.28;
          x = -1.1 + r * Math.sin(ph) * Math.cos(th) * 0.75;
          y = r * Math.sin(ph) * Math.sin(th) * 0.62;
          z = r * Math.cos(ph) * 0.82;
        } else if (t < 0.76) {
          // Hemisferio derecho
          const th = Math.random() * Math.PI * 2;
          const ph = Math.acos(2 * Math.random() - 1);
          const r = 1.6 + Math.sin(th * 5) * 0.28;
          x = 1.1 - r * Math.sin(ph) * Math.cos(th) * 0.75;
          y = r * Math.sin(ph) * Math.sin(th) * 0.62;
          z = r * Math.cos(ph) * 0.82;
        } else {
          // Espiral de ondas terapéuticas
          const turns = 6;
          const u = Math.random();
          const ang = u * Math.PI * 2 * turns;
          const r = 2.2 + u * 1.2;
          const spread = (Math.random() - 0.5) * 0.3;
          x = Math.cos(ang) * (r + spread);
          y = (u - 0.5) * 4.5 + (Math.random() - 0.5) * 0.2;
          z = Math.sin(ang) * (r + spread);
        }
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      },
      animate(t, arr, base, seed, N) {
        for (let i = 0; i < N; i++) {
          const s0 = seed[i * 3], s1 = seed[i * 3 + 1], s2 = seed[i * 3 + 2];
          const frac = i / N;
          if (frac > 0.76) {
            // La espiral pulsa
            const pulse = 1 + Math.sin(t * 1.2 + s2) * 0.06;
            arr[i * 3] = base[i * 3] * pulse;
            arr[i * 3 + 1] = base[i * 3 + 1] + Math.sin(t * 0.5 + s0) * 0.08;
            arr[i * 3 + 2] = base[i * 3 + 2] * pulse;
          } else {
            // Cerebro respira
            const breathe = 1 + Math.sin(t * 0.8) * 0.025;
            arr[i * 3] = base[i * 3] * breathe + Math.sin(t * 0.5 + s0) * 0.03;
            arr[i * 3 + 1] = base[i * 3 + 1] * breathe + Math.cos(t * 0.4 + s1) * 0.03;
            arr[i * 3 + 2] = base[i * 3 + 2] * breathe + Math.sin(t * 0.6 + s2) * 0.02;
          }
        }
      }
    });
    if (s3) scenes.push(s3);

    return () => {
      scenes.forEach(s => s.cleanup());
    };
  }, []);

  // ── 3D tilt, scroll progress, reveal animations ────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Scroll progress
    const progress = progressRef.current;
    if (progress) {
      gsap.to(progress, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    }

    // Hero SplitText + reveal
    const heroTitle = document.querySelector('.hero-intro h1');
    if (heroTitle && typeof SplitText !== 'undefined') {
      const split = new SplitText(heroTitle, { type: 'chars', charsClass: 'hero-char' });
      // Fix gradient text on ATHERNIX chars
      heroTitle.querySelectorAll('.line2 .hero-char').forEach((char) => {
        char.style.background = 'linear-gradient(135deg, #FF006E 0%, #FFD700 50%, #FF6B00 100%)';
        char.style.webkitBackgroundClip = 'text';
        char.style.backgroundClip = 'text';
        char.style.webkitTextFillColor = 'transparent';
        char.style.filter = 'drop-shadow(0 0 60px rgba(255,107,0,.3))';
      });
      gsap.fromTo(split.chars, { y: 80, opacity: 0, rotateX: -90 }, {
        y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.03, ease: 'back.out(1.7)', delay: 0.3,
      });
    }
    const hero = document.querySelector('.hero-intro');
    if (hero) {
      const lines = hero.querySelectorAll('.eyebrow, .sub, .scroll-down');
      gsap.fromTo(lines, { y: 40, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.6 });
    }

    // Modules reveal with 3D card-rise
    const modules = document.querySelectorAll('.module');
    modules.forEach((mod) => {
      gsap.fromTo(mod, { y: 80, opacity: 0, rotateX: 12 }, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mod,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      mod.addEventListener('mousemove', tiltMove);
      mod.addEventListener('mouseleave', tiltReset);
    });

    // Canvas wraps tilt
    const wraps = document.querySelectorAll('.module-canvas-wrap');
    wraps.forEach((wrap) => {
      wrap.addEventListener('mousemove', (e) => tiltMove(e, 4, 6));
      wrap.addEventListener('mouseleave', tiltReset);
    });

    // Launch buttons combined magnetic + tilt (single GSAP transform)
    const btns = document.querySelectorAll('.mod-launch-btn');
    btns.forEach((btn) => {
      const onBtnMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const rx = (e.clientX - rect.left) / rect.width - 0.5;
        const ry = (e.clientY - rect.top) / rect.height - 0.5;
        const mx = (e.clientX - rect.left - rect.width / 2) * 0.5;
        const my = (e.clientY - rect.top - rect.height / 2) * 0.5;
        gsap.to(e.currentTarget, { x: mx, y: my, rotateX: -ry * 8, rotateY: rx * 10, transformPerspective: 1000, duration: 0.25, ease: 'power2.out' });
      };
      const onBtnLeave = (e) => {
        gsap.to(e.currentTarget, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      };
      btn.addEventListener('mousemove', onBtnMove);
      btn.addEventListener('mouseleave', onBtnLeave);
    });

    // Badges hover glow pulse
    const badges = document.querySelectorAll('.mod-badge');
    badges.forEach((badge) => {
      badge.addEventListener('mouseenter', () => { gsap.to(badge, { scale: 1.05, boxShadow: '0 0 24px rgba(255,107,0,.4)', duration: 0.3 }); });
      badge.addEventListener('mouseleave', () => { gsap.to(badge, { scale: 1, boxShadow: 'none', duration: 0.4 }); });
    });

    // Detail rows hover lift
    const rows = document.querySelectorAll('.detail-row');
    rows.forEach((row) => {
      row.addEventListener('mouseenter', () => { gsap.to(row, { x: 12, color: 'rgba(255,255,255,.85)', duration: 0.25 }); });
      row.addEventListener('mouseleave', () => { gsap.to(row, { x: 0, color: 'rgba(255,255,255,.5)', duration: 0.3 }); });
    });

    // Canvas wraps scale on scroll
    wraps.forEach((wrap) => {
      gsap.fromTo(wrap, { scale: 0.92, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: wrap, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    });

    // Module text internal stagger
    modules.forEach((mod) => {
      const parts = mod.querySelectorAll('.mod-num, .mod-tag, .mod-title, .mod-desc, .mod-badge, .mod-launch-btn');
      gsap.fromTo(parts, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: mod, start: 'top 70%', toggleActions: 'play none none reverse' },
      });
    });

    // Grad lines scaleX on scroll
    const gradLines = document.querySelectorAll('.grad-line');
    gradLines.forEach((line) => {
      gsap.fromTo(line, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: line, start: 'top 90%', toggleActions: 'play none none reverse' },
      });
    });

    // Detail rows stagger reveal
    const details = document.querySelectorAll('.mod-detail');
    details.forEach((detail) => {
      const rows = detail.querySelectorAll('.detail-row');
      gsap.fromTo(rows, { x: -20, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: detail,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Marquee speed on scroll
    ScrollTrigger.create({
      trigger: mainRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const mq = document.querySelectorAll('.mq-t');
        mq.forEach((m) => { m.style.animationDuration = `${30 - self.progress * 20}s`; });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      modules.forEach((mod) => { mod.removeEventListener('mousemove', tiltMove); mod.removeEventListener('mouseleave', tiltReset); });
      wraps.forEach((wrap) => { wrap.removeEventListener('mousemove', tiltMove); wrap.removeEventListener('mouseleave', tiltReset); });
      btns.forEach((btn) => { btn.removeEventListener('mousemove', tiltMove); btn.removeEventListener('mouseleave', tiltReset); });
      badges.forEach((b) => { b.removeEventListener('mouseenter', null); b.removeEventListener('mouseleave', null); });
      rows.forEach((r) => { r.removeEventListener('mouseenter', null); r.removeEventListener('mouseleave', null); });
    };
  }, []);

  return (
    <>
      <ModulosAtmosphere />
      <div ref={mainRef} style={{ paddingTop: '80px' }}>
        <div ref={progressRef} className="mod-progress" />
      {/* HERO */}
      <section className="hero-intro">
        <p className="eyebrow">[ PLATAFORMA_XR // EL_SALVADOR // 2026 ]</p>
        <h1 style={{ fontFamily: "'Bebas Neue', 'Plus Jakarta Sans', sans-serif" }}>
          <span className="line1">MÓDULOS</span>
          <span className="line2">ATHERNIX</span>
        </h1>
        <p className="sub">TRES EJES · UNA PLATAFORMA · IMPACTO REAL</p>
        <div className="scroll-down">
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
          <span className="mqi">EJE SALUD MENTAL <span>✦</span></span>
          <span className="mqi">ATHERNIX XR <span>✦</span></span>
          <span className="mqi">EL SALVADOR TECH <span>✦</span></span>
        </div>
      </div>

      {/* MÓDULO 01 · HISTORIA VIVA VR */}
      <section className="sec-historia" id="historia">
        <div className="module">
          <div className="module-canvas-wrap">
            <div className="canvas-glow" style={{ background: 'radial-gradient(var(--pink),transparent 70%)' }}></div>
            <canvas id="c1" ref={canvasRef1}></canvas>
          </div>
          <div className="module-text">
            <p className="mod-num mono">01 / 03</p>
            <p className="mod-tag mono" style={{ color: 'var(--pink)' }}>EJE_CULTURAL</p>
            <h2 className="mod-title" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>HISTORIA<br /><span className="grad-text">VIVA VR</span></h2>
            <p className="mod-desc">Módulo educativo inmersivo que revitaliza la enseñanza de la historia y el patrimonio cultural salvadoreño. A través de modelos digitales realistas y mecánicas de gamificación, convierte el aprendizaje pasivo en vivencia activa.</p>
            <div className="mod-badge">
              <div className="bdot" style={{ background: 'var(--pink)' }}></div> EN_DESARROLLO
            </div>
            <br />
            <Link href="/modulos/history" className="mod-launch-btn">INICIAR JUEGO <span className="btn-arrow">→</span></Link>
            <div className="mod-detail">
              <div className="detail-row">Reconstrucciones históricas fotogramétricas de alta fidelidad</div>
              <div className="detail-row">Gamificación pedagógica para retención profunda del conocimiento</div>
              <div className="detail-row">Herramienta de ampliación docente, no sustitución</div>
              <div className="detail-row">Aplicable dentro y fuera del aula · acceso universal</div>
            </div>
          </div>
        </div>
      </section>

      <div className="grad-line"></div>

      {/* MÓDULO 02 · SVIRTUAL TOURS */}
      <section className="sec-svirtual" id="svirtual">
        <div className="module reverse">
          <div className="module-canvas-wrap">
            <div className="canvas-glow" style={{ background: 'radial-gradient(var(--orange),transparent 70%)' }}></div>
            <canvas id="c2" ref={canvasRef2}></canvas>
          </div>
          <div className="module-text">
            <p className="mod-num mono">02 / 03</p>
            <p className="mod-tag mono" style={{ color: 'var(--orange)' }}>EJE_TURISMO</p>
            <h2 className="mod-title" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>SVIRTUAL<br /><span className="grad-text">TOURS</span></h2>
            <p className="mod-desc">Dinamiza la economía cultural de El Salvador mediante turismo digital. Recorridos virtuales guiados por inteligencia artificial que posicionan el patrimonio natural y cultural del país como destino accesible desde cualquier parte del mundo.</p>
            <div className="mod-badge">
              <div className="bdot" style={{ background: 'var(--yellow)' }}></div> BETA_ACTIVA
            </div>
            <br />
            <Link href="/modulos/tours" className="mod-launch-btn">INICIAR JUEGO <span className="btn-arrow">→</span></Link>
            <div className="mod-detail">
              <div className="detail-row">Guías IA en tiempo real · multilingüe · adaptativo</div>
              <div className="detail-row">Elimina barreras físicas y logísticas del turismo convencional</div>
              <div className="detail-row">Genera visibilidad y potencial económico internacional</div>
              <div className="detail-row">Canal de descubrimiento y promoción cultural global</div>
            </div>
          </div>
        </div>
      </section>

      <div className="grad-line"></div>

      {/* MÓDULO 03 · MENTELIBRE VR */}
      <section className="sec-mente" id="mente">
        <div className="module">
          <div className="module-canvas-wrap">
            <div className="canvas-glow" style={{ background: 'radial-gradient(var(--yellow),transparent 70%)' }}></div>
            <canvas id="c3" ref={canvasRef3}></canvas>
          </div>
          <div className="module-text">
            <p className="mod-num mono">03 / 03</p>
            <p className="mod-tag mono" style={{ color: 'var(--yellow)' }}>EJE_SALUD_MENTAL</p>
            <h2 className="mod-title" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>MENTE<span className="grad-text">LIBRE</span><br />VR</h2>
            <p className="mod-desc">Entornos virtuales controlados y adaptativos para el apoyo terapéutico de ansiedad, fobias y estrés. Respaldado por terapia de exposición gradual en simulación. Democratiza el bienestar psicológico en contextos de acceso limitado.</p>
            <div className="mod-badge">
              <div className="bdot" style={{ background: 'var(--pink)' }}></div> LIVE
            </div>
            <br />
            <Link href="/modulos/brain" className="mod-launch-btn">INICIAR JUEGO <span className="btn-arrow">→</span></Link>
            <div className="mod-detail">
              <div className="detail-row">Terapia de exposición gradual en entornos simulados seguros</div>
              <div className="detail-row">Biofeedback en tiempo real · sensores hápticos adaptativos</div>
              <div className="detail-row">Enfoque clínico validado · 95% reducción de síntomas</div>
              <div className="detail-row">Democratización del bienestar ante acceso limitado a especialistas</div>
            </div>
          </div>
        </div>
      </section>

      <div className="grad-line"></div>

      {/* MARQUEE 2 */}
      <div className="mq">
        <div className="mq-t rev">
          <span className="mqi" style={{ color: 'rgba(255,107,0,.36)' }}>UNITY ENGINE <span>◈</span></span>
          <span className="mqi" style={{ color: 'rgba(255,107,0,.36)' }}>META QUEST PRO <span>◈</span></span>
          <span className="mqi" style={{ color: 'rgba(255,107,0,.36)' }}>UNREAL ENGINE 5 <span>◈</span></span>
          <span className="mqi" style={{ color: 'rgba(255,107,0,.36)' }}>PYTHON AI <span>◈</span></span>
          <span className="mqi" style={{ color: 'rgba(255,107,0,.36)' }}>WEBXR <span>◈</span></span>
          <span className="mqi" style={{ color: 'rgba(255,107,0,.36)' }}>HAPTIC FEEDBACK <span>◈</span></span>
          <span className="mqi" style={{ color: 'rgba(255,107,0,.36)' }}>NEURAL NETWORKS <span>◈</span></span>
        </div>
      </div>
    </div>
    </>
  );
}
