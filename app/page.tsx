// @ts-nocheck
'use client';

import { useEffect } from 'react';
import { Landmark, Pyramid, Factory, TowerControl, Globe2, Flower2 } from 'lucide-react';
import './styles/home.css';


export default function AthernixHome() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Wait for libraries to load via CDN
    let initAttempts = 0;
    const MAX_INIT_ATTEMPTS = 160; // ~8s max (50ms * 160)
    const init = () => {
      if (!window.THREE || !window.gsap || !window.ScrollTrigger) {
        initAttempts++;
        if (initAttempts >= MAX_INIT_ATTEMPTS) {
          console.warn('CDN scripts no disponibles — mostrando hero sin animaciones');
          const intro = document.getElementById('intro-screen');
          if (intro) {
            intro.style.opacity = '0';
            intro.style.transition = 'opacity 0.6s';
            setTimeout(() => { intro.classList.add('hidden'); intro.style.display = 'none'; }, 600);
          }
          const heroEls = ['#athernix-wrap', '.h-eyb', '.h-sub', '.scroll-hint', '#athernix-shadow'];
          heroEls.forEach(sel => { const el = document.querySelector(sel); if (el) (el as HTMLElement).style.opacity = '1'; });
          document.querySelectorAll('.ath-letter').forEach(el => { (el as HTMLElement).style.opacity = '1'; });
          return;
        }
        setTimeout(init, 50);
        return;
      }
      
      window.gsap.registerPlugin(window.ScrollTrigger);
      
      try {



// ════════════════════════════════════════════
// 2. INTRO SCREEN
// ════════════════════════════════════════════
const introScreen = document.getElementById('intro-screen');
const introBtn = document.getElementById('intro-btn');
const impactFlash = document.getElementById('impact-flash');

// Intro particles
const initIntroCanvas = () => {
    const containerIntro = document.getElementById('intro-canvas-container');
    if (!containerIntro) return;
    containerIntro.innerHTML = '';
    const c = document.createElement('canvas');
    c.id = 'intro-canvas';
    containerIntro.appendChild(c);
    const ctx = c.getContext('2d');
    c.width = window.innerWidth; c.height = window.innerHeight;
    const pts = [];
    for (let i = 0; i < 180; i++) pts.push({ x: Math.random() * c.width, y: Math.random() * c.height, s: Math.random() * 2 + 0.5, vx: (Math.random() - 0.5) * 0.4, vy: Math.random() * -1.2 - 0.3, o: Math.random() * 0.5 + 0.2 });
    const loop = () => {
        ctx.clearRect(0, 0, c.width, c.height);
        pts.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.y < 0) { p.y = c.height; p.x = Math.random() * c.width; }
            if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,107,0,${p.o})`; ctx.fill();
        });
        for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
            const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
            if (d < 90) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(255,107,0,${0.06 * (1 - d / 90)})`; ctx.stroke(); }
        }
        if (!introScreen.classList.contains('hidden')) window.homeReqIdIntro = requestAnimationFrame(loop);
    };
    loop();
};
initIntroCanvas();

window.gsap.to('.intro-logo', { opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 });
window.gsap.to('#intro-btn', { opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.7 });
window.gsap.to('.intro-sub', { opacity: 1, duration: 1, delay: 1.2 });

introBtn.addEventListener('click', () => {
    // Flash
    window.gsap.to(impactFlash, { opacity: 0.7, duration: 0.12, onComplete: () => window.gsap.to(impactFlash, { opacity: 0, duration: 0.8 }) });
    // Sparks
    for (let i = 0; i < 24; i++) {
        const s = document.createElement('div'); s.className = 'spark';
        s.style.cssText = `left:50%;top:50%;width:${Math.random() * 4 + 2}px;height:${Math.random() * 4 + 2}px;background:${['#FF6B00', '#FF006E', '#FFD700'][i % 3]}`;
        document.body.appendChild(s);
        window.gsap.to(s, { x: (Math.random() - 0.5) * 700, y: (Math.random() - 0.5) * 700, opacity: 1, duration: 0.08, onComplete: () => window.gsap.to(s, { opacity: 0, scale: 0, duration: 0.7, onComplete: () => s.remove() }) });
    }
    window.gsap.to(introScreen, { opacity: 0, duration: 1.2, delay: 0.2, onComplete: () => {
        introScreen.classList.add('hidden');
        // Staggered hero reveal
        window.gsap.to('.h-eyb', { opacity: 1, duration: 0.8 });
        window.gsap.to('#athernix-wrap', { opacity: 1, duration: 1, delay: 0.2 });
        window.gsap.to('#athernix-shadow', { opacity: 0.5, duration: 1.5, delay: 0.4 });
        window.gsap.from('.ath-letter', { y: 80, opacity: 0, rotationX: -90, stagger: 0.06, duration: 1, delay: 0.3, ease: 'back.out(1.7)' });
        window.gsap.to('.h-sub', { opacity: 1, duration: 1, delay: 0.9 });
        window.gsap.to('.scroll-hint', { opacity: 1, duration: 1, delay: 1.3 });
        // Periodic glitch
        setInterval(() => { const t = document.querySelector('#athernix-text'); if (t) { t.classList.add('glitch-active'); setTimeout(() => t.classList.remove('glitch-active'), 150); } }, 4000);
    }});
});

// ════════════════════════════════════════════
// 3. THREE.JS PARTICLE BACKGROUND
// ════════════════════════════════════════════
const tunnelContainer = document.getElementById('tunnel-canvas-container');
console.log('tunnelContainer:', tunnelContainer);
if (!tunnelContainer) {
    console.error('tunnel-canvas-container not found');
    return;
}
tunnelContainer.innerHTML = '';
const scene = new window.THREE.Scene();
scene.fog = new window.THREE.FogExp2(0x07000a, 0.02);
const camera = new window.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new window.THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
renderer.domElement.id = 'tunnel-canvas';
tunnelContainer.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
console.log('Three.js scene initialized, renderer:', renderer);
console.log('Canvas size:', window.innerWidth, 'x', window.innerHeight);
console.log('Canvas element:', renderer.domElement);

// Tunnel particles
const pCount = 4000;
const tGeo = new window.THREE.BufferGeometry();
const tPos = new Float32Array(pCount * 3);
const tCol = new Float32Array(pCount * 3);
const cO = new window.THREE.Color(0xFF6B00), cP = new window.THREE.Color(0xFF006E), cY = new window.THREE.Color(0xFFD700);

for (let i = 0; i < pCount; i++) {
    const i3 = i * 3;
    const r = Math.random() * 8 + 3, th = Math.random() * Math.PI * 2, z = Math.random() * 400 - 200;
    tPos[i3] = Math.cos(th) * r; tPos[i3 + 1] = Math.sin(th) * r; tPos[i3 + 2] = z;
    const c = [cO, cP, cY][Math.floor(Math.random() * 3)].clone();
    tCol[i3] = c.r; tCol[i3 + 1] = c.g; tCol[i3 + 2] = c.b;
}
tGeo.setAttribute('position', new window.THREE.BufferAttribute(tPos, 3));
tGeo.setAttribute('color', new window.THREE.BufferAttribute(tCol, 3));
const tMat = new window.THREE.PointsMaterial({ size: 0.1, vertexColors: true, transparent: true, opacity: 0.65, blending: window.THREE.AdditiveBlending, sizeAttenuation: true });
const tunnel = new window.THREE.Points(tGeo, tMat);
scene.add(tunnel);

// Inner ring
const iCount = 1500;
const iGeo = new window.THREE.BufferGeometry();
const iPos = new Float32Array(iCount * 3), iCol = new Float32Array(iCount * 3);
for (let i = 0; i < iCount; i++) {
    const i3 = i * 3, r = Math.random() * 2 + 0.5, th = Math.random() * Math.PI * 2, z = Math.random() * 400 - 200;
    iPos[i3] = Math.cos(th) * r; iPos[i3 + 1] = Math.sin(th) * r; iPos[i3 + 2] = z;
    const c = cO.clone().lerp(cY, Math.random());
    iCol[i3] = c.r; iCol[i3 + 1] = c.g; iCol[i3 + 2] = c.b;
}
iGeo.setAttribute('position', new window.THREE.BufferAttribute(iPos, 3));
iGeo.setAttribute('color', new window.THREE.BufferAttribute(iCol, 3));
const iMat = new window.THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.45, blending: window.THREE.AdditiveBlending });
const inner = new window.THREE.Points(iGeo, iMat);
scene.add(inner);

// Mouse parallax
let smx = 0, smy = 0;
document.addEventListener('mousemove', e => { smx = (e.clientX / window.innerWidth - 0.5) * 2; smy = (e.clientY / window.innerHeight - 0.5) * 2; });

const clock = new window.THREE.Clock();
(function animIntro() {
    window.homeReqId3 = requestAnimationFrame(animIntro);
    const t = clock.getElapsedTime();
    tunnel.rotation.z -= 0.0006;
    inner.rotation.z += 0.001;
    inner.scale.setScalar(1 + Math.sin(t * 0.5) * 0.04);
    camera.position.x += (smx * 0.4 - camera.position.x) * 0.015;
    camera.position.y += (-smy * 0.4 - camera.position.y) * 0.015;
    renderer.render(scene, camera);
})();

// ════════════════════════════════════════════
// 4. SCROLL-DRIVEN CAMERA (depth as you scroll)
// ════════════════════════════════════════════
window.gsap.to(camera.position, {
    z: -50,
    ease: 'none',
    scrollTrigger: { trigger: '#main-content', start: 'top top', end: 'bottom bottom', scrub: 1.5 }
});
window.gsap.to(camera.rotation, {
    z: Math.PI * 0.4,
    ease: 'none',
    scrollTrigger: { trigger: '#main-content', start: 'top top', end: 'bottom bottom', scrub: 1.5 }
});

// ════════════════════════════════════════════
// 5. SCROLL REVEAL ANIMATIONS FOR INFO SECTIONS
// ════════════════════════════════════════════

// Fade-up reveals for .anim-reveal
window.gsap.utils.toArray('.anim-reveal').forEach(el => {
    window.gsap.to(el, {
        y: 0, opacity: 1, duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 40%', toggleActions: 'play none none reverse' }
    });
});

// Staggered card reveals (.anim-reveal-up)
window.gsap.utils.toArray('.anim-reveal-up').forEach(el => {
    const delay = parseFloat(getComputedStyle(el).getPropertyValue('--delay')) || 0;
    window.gsap.to(el, {
        y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay,
        scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 50%', toggleActions: 'play none none reverse' }
    });
});

// Stat bar fills
window.gsap.utils.toArray('.stat-bar-fill').forEach(bar => {
    const w = bar.dataset.width;
    window.ScrollTrigger.create({
        trigger: bar,
        start: 'top 85%',
        onEnter: () => { bar.style.width = w + '%'; },
        onLeaveBack: () => { bar.style.width = '0%'; }
    });
});

// ════════════════════════════════════════════
// 6. ANIMATED STAT COUNTERS
// ════════════════════════════════════════════
const statData = [
    { el: '#stat-1', target: 4, suffix: '', decimals: 0 },
    { el: '#stat-2', target: 12, suffix: '', decimals: 0 },
    { el: '#stat-3', target: 8, suffix: 'K', decimals: 0 },
    { el: '#stat-4', target: 40, suffix: '%', decimals: 0 }
];

statData.forEach(({ el, target, suffix, decimals }) => {
    const element = document.querySelector(el);
    if (!element) return;
    const obj = { val: 0 };
    window.ScrollTrigger.create({
        trigger: element,
        start: 'top 85%',
        onEnter: () => {
            window.gsap.to(obj, {
                val: target, duration: 2, ease: 'power2.out',
                onUpdate: () => { element.textContent = obj.val.toFixed(decimals) + suffix; }
            });
        },
        onLeaveBack: () => {
            obj.val = 0; element.textContent = '0';
        }
    });
});

// ════════════════════════════════════════════
// 7. INTERACTIVE NODE CANVAS
// ════════════════════════════════════════════
const nodeCanvas = document.getElementById('node-canvas');
if (nodeCanvas) {
    const ctx = nodeCanvas.getContext('2d');
    const resize = () => { nodeCanvas.width = nodeCanvas.offsetWidth; nodeCanvas.height = nodeCanvas.offsetHeight; };
    resize();

    const nodes = [];
    for (let i = 0; i < 50; i++) {
        nodes.push({
            x: Math.random() * nodeCanvas.width,
            y: Math.random() * nodeCanvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            r: Math.random() * 3 + 2,
            pulse: Math.random() * Math.PI * 2
        });
    }

    (function drawNodes() {
        ctx.clearRect(0, 0, nodeCanvas.width, nodeCanvas.height);

        // Connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                if (d < 120) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(255, 107, 0, ${0.15 * (1 - d / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // Nodes
        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy; n.pulse += 0.03;
            if (n.x < 0 || n.x > nodeCanvas.width) n.vx *= -1;
            if (n.y < 0 || n.y > nodeCanvas.height) n.vy *= -1;

            const glow = 0.5 + Math.sin(n.pulse) * 0.3;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r + Math.sin(n.pulse) * 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 107, 0, ${glow})`;
            ctx.fill();

            // Glow ring
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 107, 0, ${glow * 0.08})`;
            ctx.fill();
        });

        window.homeReqId1 = requestAnimationFrame(drawNodes);
    })();

    window.addEventListener('resize', resize);
}

// ════════════════════════════════════════════
// 8. INTERACTIVE TERMINAL
// ════════════════════════════════════════════
const termIn = document.getElementById('terminal-input');
const termOut = document.getElementById('terminal-output');
const cmds = {
    help: 'COMANDOS DISPONIBLES: help, status, modules, roadmap, whoami, clear, ather',
    status: 'MÓDULOS ACTIVOS: 4 | IDIOMAS: 12 | RESOLUCIÓN: 8K | IA: ATHER v2.0',
    modules: 'HISTORIA_VIVA (activo) | SVIRTUAL_TOURS (activo) | MENTELIBRE_VR (activo) | QUANTUM_LAB (en desarrollo)',
    roadmap: '2023: Fundación | 2024: Ather IA | 2025: Multi-módulo | 2026: Sistema completo | 2027+: Expansión LATAM',
    whoami: 'USUARIO: estudiante@athernix | ORIGEN: El Salvador | VISIÓN: Democratizar educación inmersiva',
    ather: 'Soy Ather, tu ajolote robot. Guía tu viaje de aprendizaje VR. Pregúntame sobre STEM, historia o cultura.',
    clear: '__CLEAR__'
};

if (termIn) {
    termIn.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        const cmd = termIn.value.trim().toLowerCase();
        if (!cmd) return;

        const uLine = document.createElement('div');
        uLine.className = 'tli'; uLine.innerHTML = `<span style="color:var(--yellow)">❯</span> ${cmd.toUpperCase()}`;
        termOut.appendChild(uLine);

        if (cmd === 'clear') { termOut.innerHTML = ''; }
        else {
            const resp = cmds[cmd] || `COMANDO NO ENCONTRADO: "${cmd.toUpperCase()}". ESCRIBE "help".`;
            const rLine = document.createElement('div');
            rLine.className = 'tli';
            rLine.style.color = cmd === 'hack' ? 'var(--pink)' : 'rgba(255,107,0,0.8)';
            rLine.textContent = resp;
            termOut.appendChild(rLine);
        }
        termOut.scrollTop = termOut.scrollHeight;
        termIn.value = '';
    });
}

// ════════════════════════════════════════════
// 9. INTERACTIVE CIPHER GRID
// ════════════════════════════════════════════
const cipherGrid = document.getElementById('cipher-grid');
const hexC = '0123456789ABCDEF';
if (cipherGrid) {
    for (let i = 0; i < 32; i++) {
        const cell = document.createElement('div');
        cell.className = 'cipher-cell';
        cell.textContent = hexC[Math.floor(Math.random() * hexC.length)];
        cell.addEventListener('click', () => {
            cell.classList.remove('selected', 'correct', 'wrong');
            const r = Math.random();
            if (r < 0.35) { cell.classList.add('correct'); cell.textContent = '✓'; }
            else if (r < 0.55) { cell.classList.add('wrong'); setTimeout(() => { cell.classList.remove('wrong'); cell.textContent = hexC[Math.floor(Math.random() * hexC.length)]; }, 600); }
            else { cell.classList.add('selected'); }
        });
        cipherGrid.appendChild(cell);
    }
}

// ════════════════════════════════════════════
// 10. PARALLAX ON GLASS CARDS (slight 3D tilt)
// ════════════════════════════════════════════
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-4px) perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) perspective(800px) rotateY(0deg) rotateX(0deg)';
    });
});

// ════════════════════════════════════════════
// 11. RESIZE
// ════════════════════════════════════════════
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

      } catch (e) {
        console.error('Error running home animation scripts:', e);
      }
    };
    
    init();

    return () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(t => t.kill());
      }
      cancelAnimationFrame(window.homeReqId1);
      cancelAnimationFrame(window.homeReqId2);
      cancelAnimationFrame(window.homeReqId3);
      cancelAnimationFrame(window.homeReqIdIntro);
    };
  }, []);

  return (
    <div style={{ backgroundColor: 'transparent' }}>
      
  {/* Custom Cursor */}
  
  
  
  <div id="impact-flash"></div>

  {/* 3D Background */}
  <div id="tunnel-canvas-container"></div>

  {/* Intro Screen */}
  <div id="intro-screen">
    <div id="intro-canvas-container" style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }}></div>
    <div className="intro-ring" style={{"width":"300px","height":"300px","top":"50%","left":"50%","transform":"translate(-50%,-50%)","animation":"breathe 6s ease-in-out infinite"}}></div>
    <div className="intro-ring" style={{"width":"500px","height":"500px","top":"50%","left":"50%","transform":"translate(-50%,-50%)","animation":"breathe 8s ease-in-out infinite 1s"}}></div>
    <div className="intro-logo">ATHERNIX</div>
    <button id="intro-btn"><span style={{"position":"relative","zIndex":"1"}}>INICIAR_SECUENCIA</span></button>
    <div className="intro-sub">ESTABLECIENDO CONEXIÓN SEGURA...</div>
  </div>

  {/* Navigation */}
  

  <main id="main-content">

    {/* ═══════ HERO ═══════ */}
    <section className="hero" id="hero-section">
      <div className="hero-s">
        <div className="orb" style={{"width":"500px","height":"500px","background":"radial-gradient(circle, rgba(255,107,0,0.18), transparent 70%)","top":"15%","right":"5%","animation":"f1 8s ease-in-out infinite"}}></div>
        <div className="orb" style={{"width":"350px","height":"350px","background":"radial-gradient(circle, rgba(255,0,110,0.14), transparent 70%)","bottom":"15%","left":"3%","animation":"f2 10s ease-in-out infinite"}}></div>
        <p className="h-eyb mono">ECOSISTEMA VR + IA // EL SALVADOR</p>
        <div id="athernix-wrap">
          <div id="athernix-shadow">ATHERNIX</div>
          <h1 id="athernix-text">
            <span className="ath-letter">A</span><span className="ath-letter">T</span><span className="ath-letter">H</span><span className="ath-letter">E</span><span className="ath-letter">R</span><span className="ath-letter">N</span><span className="ath-letter">I</span><span className="ath-letter">X</span>
          </h1>
        </div>
        <p className="h-sub mono">LA PLATAFORMA VIRTUAL DEL FUTURO DEL APRENDIZAJE</p>
        <div className="scroll-hint">
          <div className="s-line"></div>
          <span className="s-lbl mono">DESLIZA_ABAJO</span>
        </div>
      </div>
    </section>

    {/* ═══════ MARQUEE 1 ═══════ */}
    <div className="mq">
      <div className="mq-t">
        <div className="mqi"><span>◆</span> HISTORIA VIVA: JOYA DE CERÉN, TAZUMAL</div>
        <div className="mqi"><span>◆</span> SVIRTUAL TOURS: IA MULTILINGÜE (12 IDIOMAS)</div>
        <div className="mqi"><span>◆</span> QUANTUM LAB: LABORATORIOS STEM VR</div>
        <div className="mqi"><span>◆</span> MENTELIBRE VR: BIOMETRÍA + BIENESTAR</div>
        <div className="mqi"><span>◆</span> ATHER IA: AJOLOTE ROBOT CONVERSACIONAL</div>
        <div className="mqi"><span>◆</span> HISTORIA VIVA: JOYA DE CERÉN, TAZUMAL</div>
        <div className="mqi"><span>◆</span> SVIRTUAL TOURS: IA MULTILINGÜE (12 IDIOMAS)</div>
        <div className="mqi"><span>◆</span> QUANTUM LAB: LABORATORIOS STEM VR</div>
        <div className="mqi"><span>◆</span> MENTELIBRE VR: BIOMETRÍA + BIENESTAR</div>
        <div className="mqi"><span>◆</span> ATHER IA: AJOLOTE ROBOT CONVERSACIONAL</div>
      </div>
    </div>

    {/* ═══════ SECTION 1: WHAT IS ATHERNIX ═══════ */}
    <section className="info-section" id="sec-what">
      <div className="info-container glass-card anim-reveal">
        <div className="info-grid two-col">
          <div className="info-text">
            <div className="section-tag mono"><span className="tag-dot"></span> 01 // QUÉ ES ATHERNIX</div>
            <h2 className="section-title">ECOSISTEMA DE<br /><span className="grad-text">APRENDIZAJE VR INMERSIVO</span></h2>
            <p className="section-desc">Athernix es una plataforma educativa de Realidad Virtual e Inteligencia Artificial nacida en El Salvador. Democratizamos el acceso a educación inmersiva de calidad en historia, cultura y ciencia STEM mediante tecnología de vanguardia: VR, IA y experiencias interactivas.</p>
            <div className="info-badges">
              <div className="badge"><div className="bdot"></div> EDUCACIÓN INMERSIVA</div>
              <div className="badge"><div className="bdot"></div> IA MULTILINGÜE</div>
              <div className="badge"><div className="bdot"></div> STEM INTERACTIVO</div>
            </div>
          </div>
          <div className="info-visual">
            <div className="node-cluster">
              <canvas id="node-canvas"></canvas>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ SECTION 2: STATS ═══════ */}
    <section className="info-section" id="sec-stats">
      <div className="info-container">
        <div className="section-tag mono center-tag"><span className="tag-dot"></span> 02 // IMPACTO DE LA PLATAFORMA</div>
        <h2 className="section-title center-title">MÉTRICAS<br /><span className="grad-text">EDUCATIVAS</span></h2>
        <div className="stats-grid">
          <div className="stat-card glass-card anim-reveal-up" style={{"animationDelay":"0s"}}>
            <strong className="snum" id="stat-1">4</strong>
            <span className="mono">MÓDULOS ACTIVOS</span>
            <div className="stat-bar"><div className="stat-bar-fill" data-width="99.9"></div></div>
          </div>
          <div className="stat-card glass-card anim-reveal-up" style={{"animationDelay":"0.15s"}}>
            <strong className="snum" id="stat-2">12</strong>
            <span className="mono">IDIOMAS SOPORTADOS</span>
            <div className="stat-bar"><div className="stat-bar-fill" data-width="15"></div></div>
          </div>
          <div className="stat-card glass-card anim-reveal-up" style={{"animationDelay":"0.3s"}}>
            <strong className="snum" id="stat-3">8K</strong>
            <span className="mono">RESOLUCIÓN VR</span>
            <div className="stat-bar"><div className="stat-bar-fill" data-width="72"></div></div>
          </div>
          <div className="stat-card glass-card anim-reveal-up" style={{"animationDelay":"0.45s"}}>
            <strong className="snum" id="stat-4">-40%</strong>
            <span className="mono">ESTRÉS MENTELIBRE</span>
            <div className="stat-bar"><div className="stat-bar-fill" data-width="0"></div></div>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ SECTION 3: TERMINAL ═══════ */}
    <section className="info-section" id="sec-terminal">
      <div className="info-container glass-card anim-reveal">
        <div className="info-grid two-col reverse">
          <div className="info-visual">
            <div className="term">
              <div className="t-bar">
                <div className="td" style={{"background":"#FF006E"}}></div>
                <div className="td" style={{"background":"#FFD700"}}></div>
                <div className="td" style={{"background":"#00ff88"}}></div>
                <span className="mono" style={{"marginLeft":"auto","fontSize":"9px","color":"rgba(255,255,255,0.3)"}}>raíz@athernix:~</span>
              </div>
              <div className="t-out" id="terminal-output">
                <div className="tli">SECUENCIA DE ARRANQUE INICIADA...</div>
                <div className="tli">CARGANDO MÓDULOS <span style={{"color":"#00ff88"}}>[OK]</span></div>
                <div className="tli">ESTABLECIENDO ENLACE <span style={{"color":"#00ff88"}}>[OK]</span></div>
                <div className="tli" style={{"color":"var(--pink)"}}>ADVERTENCIA: ACCESO NO AUTORIZADO DETECTADO</div>
              </div>
              <div className="t-row">
                <span style={{"color":"var(--orange)"}}>❯</span>
                <input type="text" id="terminal-input" placeholder="escribe un comando..." />
              </div>
            </div>
          </div>
          <div className="info-text">
            <div className="section-tag mono"><span className="tag-dot"></span> 03 // ATHER IA</div>
            <h2 className="section-title">TU AJOLOTE<br /><span className="grad-text">ROBOT CONVERSACIONAL</span></h2>
            <p className="section-desc">Ather es más que una mascota — es la interfaz viva entre tú y la plataforma. Un ajolote robot que simboliza la regeneración del conocimiento. Guía, responde, motiva y acompaña cada viaje dentro del universo Athernix.</p>
            <div className="info-badges">
              <div className="badge"><div className="bdot"></div> PRUEBA: help, status, modules, roadmap</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ SECTION 4: CIPHER GRID ═══════ */}
    <section className="info-section" id="sec-cipher">
      <div className="info-container glass-card anim-reveal">
        <div className="info-grid two-col">
          <div className="info-text">
            <div className="section-tag mono"><span className="tag-dot"></span> 04 // ÁREAS STEM</div>
            <h2 className="section-title">EXPLORA<br /><span className="grad-text">EL CONOCIMIENTO</span></h2>
            <p className="section-desc">Física Cuántica, Biología Celular, Astronomía, Matemáticas, Computación & IA, Química. 6 áreas STEM con 30+ temas interactivos guiados por Ather IA.</p>
            <div className="info-badges">
              <div className="badge"><div className="bdot"></div> 6 ÁREAS STEM · 30+ TEMAS · ROADMAPS PERSONALIZADOS</div>
            </div>
          </div>
          <div className="info-visual">
            <div className="cipher-grid" id="cipher-grid"></div>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ MARQUEE 2 (reverse) ═══════ */}
    <div className="mq">
      <div className="mq-t rev">
        <div className="mqi"><span>●</span> FÍSICA CUÁNTICA: MECÁNICA, ENTRELAZAMIENTO</div>
        <div className="mqi"><span>●</span> BIOLOGÍA: ADN, CRISPR, EPIGENÉTICA</div>
        <div className="mqi"><span>●</span> ASTRONOMÍA: AGUJEROS NEGROS, RELATIVIDAD</div>
        <div className="mqi"><span>●</span> MATEMÁTICAS: ÁLGEBRA, CÁLCULO, ML</div>
        <div className="mqi"><span>●</span> COMPUTACIÓN: ALGORITMOS, REDES NEURONALES</div>
        <div className="mqi"><span>●</span> FÍSICA CUÁNTICA: MECÁNICA, ENTRELAZAMIENTO</div>
        <div className="mqi"><span>●</span> BIOLOGÍA: ADN, CRISPR, EPIGENÉTICA</div>
        <div className="mqi"><span>●</span> ASTRONOMÍA: AGUJEROS NEGROS, RELATIVIDAD</div>
        <div className="mqi"><span>●</span> MATEMÁTICAS: ÁLGEBRA, CÁLCULO, ML</div>
        <div className="mqi"><span>●</span> COMPUTACIÓN: ALGORITMOS, REDES NEURONALES</div>
      </div>
    </div>

    {/* ═══════ SECTION 5: FEATURES CARDS ═══════ */}
    <section className="info-section" id="sec-features">
      <div className="info-container">
        <div className="section-tag mono center-tag"><span className="tag-dot"></span> 05 // MISIONES VR</div>
        <h2 className="section-title center-title">VIAJA A TRAVÉS<br /><span className="grad-text">DEL TIEMPO</span></h2>
        <div className="features-grid">
          <div className="feature-card glass-card anim-reveal-up" style={{"animationDelay":"0s"}}>
            <div className="feature-icon"><Landmark size={28} /></div>
            <h3>Renacimiento</h3>
            <p>Viaja a la Florencia del siglo XV. Encuentros con Leonardo da Vinci, Michelangelo y exploración del Duomo.</p>
            <div className="feature-line"></div>
          </div>
          <div className="feature-card glass-card anim-reveal-up" style={{"animationDelay":"0.12s"}}>
            <div className="feature-icon"><Pyramid size={28} /></div>
            <h3>Antiguo Egipto</h3>
            <p>Descubre los misterios de las pirámides de Giza. Ayuda en construcción, traduce jeroglíficos y explora el Valle de los Reyes.</p>
            <div className="feature-line"></div>
          </div>
          <div className="feature-card glass-card anim-reveal-up" style={{"animationDelay":"0.24s"}}>
            <div className="feature-icon"><Factory size={28} /></div>
            <h3>Revolución Industrial</h3>
            <p>Vive la transformación de la sociedad en la Inglaterra del 1800. Fábricas textiles, inventos revolucionarios y ferrocarriles.</p>
            <div className="feature-line"></div>
          </div>
          <div className="feature-card glass-card anim-reveal-up" style={{"animationDelay":"0.36s"}}>
            <div className="feature-icon"><TowerControl size={28} /></div>
            <h3>París, Ciudad Luz</h3>
            <p>Recorre la Torre Eiffel, el Louvre con Marie Curie, el río Sena y el barrio artístico de Montmartre.</p>
            <div className="feature-line"></div>
          </div>
          <div className="feature-card glass-card anim-reveal-up" style={{"animationDelay":"0.48s"}}>
            <div className="feature-icon"><Globe2 size={28} /></div>
            <h3>Tokyo, Metrópolis Futura</h3>
            <p>Descubre la fusión tradición-tecnología. Templo Senso-ji, Shibuya Crossing, chef sushi y Akihabara.</p>
            <div className="feature-line"></div>
          </div>
          <div className="feature-card glass-card anim-reveal-up" style={{"animationDelay":"0.6s"}}>
            <div className="feature-icon"><Flower2 size={28} /></div>
            <h3>Meditación Zen</h3>
            <p>Practica meditación en templos zen tradicionales. Respiración consciente, mindfulness y visualización guiada.</p>
            <div className="feature-line"></div>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ SECTION 6: VISION ═══════ */}
    <section className="info-section" id="sec-vision">
      <div className="info-container">
        <div className="about-vision glass-card anim-reveal">
          <blockquote>"El conocimiento es un viaje — y Athernix es el vehículo. Aprender no debería estar limitado por cuatro paredes."</blockquote>
          <span className="mono">— VISIÓN FUNDACIONAL ATHERNIX, EL SALVADOR</span>
        </div>
      </div>
    </section>

    {/* ═══════ SECTION 7: CTA ═══════ */}
    <section className="info-section cta-section" id="sec-cta">
      <div className="info-container anim-reveal" style={{"textAlign":"center"}}>
        <div className="section-tag mono center-tag"><span className="tag-dot"></span> ¿LISTO?</div>
        <h2 className="section-title center-title" style={{"fontSize":"clamp(3rem, 9vw, 8rem)"}}>COMIENZA TU<br /><span className="grad-text">VIAJE</span></h2>
        <p className="section-desc" style={{"maxWidth":"500px","margin":"0 auto 40px"}}>Únete a la plataforma de aprendizaje VR más innovadora de Latinoamérica. Explora historia, cultura y ciencia con Ather IA.</p>
        <div style={{"display":"flex","gap":"16px","justifyContent":"center","flexWrap":"wrap"}}>
          <a href="/login" className="cta-btn"><span>REGISTRARSE</span></a>
          <a href="/home" className="sec-btn">EXPLORAR</a>
        </div>
      </div>
    </section>

    <div className="grad-line"></div>
  </main>

  {/* Footer */}
  
    </div>
  );
}
