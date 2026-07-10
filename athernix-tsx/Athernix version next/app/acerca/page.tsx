// @ts-nocheck
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import * as THREE from 'three';

export default function AcercaPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#08000a');
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 120);
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene.add(new THREE.AmbientLight(0x281018, 2));
    const pink = new THREE.PointLight(0xff006e, 2.4, 45);
    pink.position.set(-10, 8, 8);
    scene.add(pink);
    const orange = new THREE.PointLight(0xff6b00, 2, 45);
    orange.position.set(10, -5, 5);
    scene.add(orange);

    const core = new THREE.Group();
    scene.add(core);
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0xff006e, emissive: 0x330014, roughness: 0.35, metalness: 0.18 }),
      new THREE.MeshStandardMaterial({ color: 0xff6b00, emissive: 0x331100, roughness: 0.35, metalness: 0.18 }),
      new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0x332400, roughness: 0.35, metalness: 0.18 }),
    ];

    const nodes = [];
    for (let i = 0; i < 3; i += 1) {
      const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
      const node = new THREE.Mesh(new THREE.IcosahedronGeometry(2.1, 1), materials[i]);
      node.position.set(Math.cos(angle) * 6.2, Math.sin(angle) * 4.3, 0);
      node.userData = { phase: angle };
      nodes.push(node);
      core.add(node);
    }

    for (let i = 0; i < nodes.length; i += 1) {
      const next = nodes[(i + 1) % nodes.length];
      core.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([nodes[i].position, next.position]),
          new THREE.LineBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.24 })
        )
      );
    }

    const ringGroup = new THREE.Group();
    for (let i = 0; i < 5; i += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(8 + i * 1.1, 0.022, 8, 150),
        new THREE.MeshBasicMaterial({ color: i % 2 ? 0xff006e : 0xff6b00, transparent: true, opacity: 0.15 })
      );
      ring.rotation.x = Math.PI / 2 + i * 0.16;
      ring.rotation.z = i * 0.28;
      ringGroup.add(ring);
    }
    core.add(ringGroup);

    const particles = new THREE.BufferGeometry();
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [new THREE.Color('#FF006E'), new THREE.Color('#FF6B00'), new THREE.Color('#FFD700')];
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      const color = palette[i % palette.length];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const field = new THREE.Points(
      particles,
      new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending })
    );
    scene.add(field);

    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      const time = clock.getElapsedTime();
      frameId = requestAnimationFrame(animate);
      core.rotation.y = Math.sin(time * 0.22) * 0.35;
      ringGroup.rotation.z += 0.002;
      field.rotation.y -= 0.0009;
      nodes.forEach((node) => {
        node.rotation.x += 0.009;
        node.rotation.y += 0.013;
        node.scale.setScalar(1 + Math.sin(time * 1.6 + node.userData.phase) * 0.05);
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materialsToDispose = Array.isArray(object.material) ? object.material : [object.material];
          materialsToDispose.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
    };
  }, []);

  const problems = [
    ['01', 'Educacion historica pasiva', 'Convierte el patrimonio salvadoreno en exploracion inmersiva y medible.'],
    ['02', 'Turismo cultural subaprovechado', 'Abre recorridos globales con guias IA, disponibilidad continua y rutas 360.'],
    ['03', 'Salud mental sin tecnologia', 'Integra exposicion gradual, biofeedback y entornos seguros para apoyo terapeutico.'],
  ];

  const differentiators = [
    'Plataforma unificada para educacion, turismo y salud.',
    'IA en tiempo real que adapta cada experiencia.',
    'Contexto local: creado desde El Salvador para la region.',
    'Arquitectura escalable para nuevos sectores.',
    'Acceso democratizado en aulas, museos y clinicas.',
    'Base investigativa con impacto social medible.',
  ];

  return (
    <div className="about-page">
      <canvas ref={canvasRef} className="about-bg-canvas" aria-hidden="true" />

      <section className="about-hero">
        <div className="about-hero-badge mono"><span /> ATHERNIX / PERFIL OFICIAL / 2026</div>
        <h1>ACERCA DE<br /><span>NOSOTROS</span></h1>
        <p className="mono">VR + IA / TRANSFORMACION DIGITAL / CENTROAMERICA</p>
      </section>

      <div className="about-marquee mono">
        <div>
          <span>ATHERNIX</span><span>REALIDAD VIRTUAL</span><span>EL SALVADOR</span><span>INTELIGENCIA ARTIFICIAL</span>
          <span>EDUCACION INMERSIVA</span><span>SALUD MENTAL VR</span><span>TURISMO DIGITAL</span><span>ATHERNIX</span>
        </div>
      </div>

      <section className="about-section about-origin">
        <div>
          <p className="about-label mono">[ ORIGEN_DEL_PROYECTO ]</p>
          <h2>QUIENES<br /><span>SOMOS</span></h2>
          <p>Athernix es un ecosistema tecnologico nacido en El Salvador que integra realidad virtual e inteligencia artificial para transformar aprendizaje, turismo y bienestar psicologico.</p>
          <p>No somos un producto estatico: somos una plataforma en evolucion que conecta tres ejes con una misma infraestructura inmersiva.</p>
        </div>
        <div className="about-stats">
          <div><strong>55%</strong><span>hogares sin internet / SV 2020</span></div>
          <div><strong>34.5%</strong><span>escuelas conectadas / 2018</span></div>
          <div><strong>$338M</strong><span>mercado VR educ. LATAM</span></div>
          <div><strong>3</strong><span>ejes de impacto Athernix</span></div>
        </div>
      </section>

      <section className="about-section">
        <p className="about-label mono">[ PROBLEMATICA_IDENTIFICADA ]</p>
        <h2>LAS BRECHAS<br /><span>QUE CERRAMOS</span></h2>
        <div className="about-problem-grid">
          {problems.map(([num, title, copy]) => (
            <div key={num} className="about-card">
              <span className="about-card-num mono">{num}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-vision">
        <p className="about-label mono">[ VISION ]</p>
        <blockquote>La convergencia entre VR e IA no es solo una innovacion tecnica; es una nueva forma de acceso, memoria y bienestar para la region.</blockquote>
        <span className="mono">ATHERNIX / NEO VORTEX LABS</span>
      </section>

      <section className="about-section">
        <p className="about-label mono">[ NUCLEO_DIFERENCIADOR ]</p>
        <h2>POR QUE<br /><span>ATHERNIX</span></h2>
        <div className="about-diff-grid">
          {differentiators.map((item, index) => (
            <div key={item} className="about-card compact">
              <span className="about-card-num mono">{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section about-mission">
        <div>
          <p className="about-label mono">[ MISION ]</p>
          <h2>TRANSFORMAR<br /><span>LA REGION</span></h2>
        </div>
        <div className="about-mission-list mono">
          <span>MODERNIZACION_TECNOLOGICA_ESTRATEGICA</span>
          <span>IMPACTO_SOCIAL_MEDIBLE_Y_SOSTENIBLE</span>
          <span>ESCALABILIDAD_REGIONAL_2030</span>
          <span>INNOVACION_CON_BASE_EN_EVIDENCIA</span>
        </div>
      </section>

      <section className="about-cta">
        <h2>ENTRA AL<br /><span>ECOSISTEMA</span></h2>
        <div>
          <Link href="/modulos">EXPLORAR MODULOS</Link>
          <Link href="/registro">CREAR CUENTA</Link>
        </div>
      </section>
    </div>
  );
}
