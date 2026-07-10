// @ts-nocheck
'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import '../1.css';

export default function LoginPage() {
  const [username, setUsername] = useState('demo@future.com');
  const [password, setPassword] = useState('123456');
  const [btnText, setBtnText] = useState('✦ INGRESAR ✦');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // --- Configuración inicial Three.js ---
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#08000a');

    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 12);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Controles ---
    const controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
    controls.enableRotate = true;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = 0;
    controls.rotateSpeed = 0.5;

    // --- Luces ---
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffaa66, 2);
    dirLight.position.set(2, 3, 4);
    scene.add(dirLight);

    const pinkLight = new THREE.PointLight(0xff006e, 1.5);
    pinkLight.position.set(-3, 1, 2);
    scene.add(pinkLight);

    const yellowLight = new THREE.PointLight(0xffd700, 1.2);
    yellowLight.position.set(2, -1, 3);
    scene.add(yellowLight);

    const backLight = new THREE.PointLight(0xff6b00, 1.8);
    backLight.position.set(0, 0, -5);
    scene.add(backLight);

    // --- Esfera principal ---
    const sphereGeometry = new THREE.SphereGeometry(2.8, 128, 128);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x221122,
      emissive: 0x330011,
      shininess: 40,
      transparent: true,
      opacity: 0.65,
      wireframe: false,
      side: THREE.DoubleSide
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // --- Wireframe exterior ---
    const wireframeGeometry = new THREE.SphereGeometry(2.85, 48, 48);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const wireframeSphere = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    sphere.add(wireframeSphere);

    // --- Anillos orbitales ---
    function createOrbitRing(radius, color, opacity, thickness = 0.02) {
      const ringGeometry = new THREE.TorusGeometry(radius, thickness, 64, 200);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: opacity,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.rotation.z = Math.random() * Math.PI;
      return ring;
    }

    const ring1 = createOrbitRing(3.4, 0xff006e, 0.25, 0.015);
    const ring2 = createOrbitRing(3.9, 0xff6b00, 0.2, 0.012);
    const ring3 = createOrbitRing(4.4, 0xffd700, 0.15, 0.01);
    const ring4 = createOrbitRing(4.9, 0xff006e, 0.1, 0.008);

    ring1.rotation.y = 0.3;
    ring2.rotation.x = 0.7;
    ring2.rotation.z = 0.5;
    ring3.rotation.y = 1.2;
    ring3.rotation.x = 0.4;
    ring4.rotation.z = 0.8;
    ring4.rotation.y = 0.9;

    scene.add(ring1);
    scene.add(ring2);
    scene.add(ring3);
    scene.add(ring4);

    // --- Partículas ---
    const particleCount = 800;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xff006e);
    const color2 = new THREE.Color(0xff6b00);
    const color3 = new THREE.Color(0xffd700);

    for (let i = 0; i < particleCount; i++) {
      const radius = 5 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      const rand = Math.random();
      let color;
      if (rand < 0.33) color = color1;
      else if (rand < 0.66) color = color2;
      else color = color3;

      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Pequeñas esferas flotantes ---
    const smallSpheres = [];
    for (let i = 0; i < 30; i++) {
      const size = 0.1 + Math.random() * 0.2;
      const sphereGeo = new THREE.SphereGeometry(size, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: Math.random() > 0.5 ? 0xff006e : (Math.random() > 0.5 ? 0xff6b00 : 0xffd700),
        emissive: 0x220000,
        emissiveIntensity: 0.3
      });
      const smallSphere = new THREE.Mesh(sphereGeo, sphereMat);

      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 3;
      const dist = 4.2 + Math.random() * 1.5;

      smallSphere.position.x = Math.cos(angle) * dist;
      smallSphere.position.z = Math.sin(angle) * dist;
      smallSphere.position.y = height;

      scene.add(smallSphere);
      smallSpheres.push({
        mesh: smallSphere,
        angle: angle,
        dist: dist,
        height: height,
        speed: 0.002 + Math.random() * 0.003
      });
    }

    // --- Animación ---
    let clock = new THREE.Clock();
    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = performance.now() * 0.001;

      ring1.rotation.y += 0.001;
      ring1.rotation.x += 0.0005;
      ring2.rotation.x += 0.001;
      ring2.rotation.z += 0.0007;
      ring3.rotation.y += 0.0012;
      ring3.rotation.z += 0.0008;
      ring4.rotation.x += 0.0009;
      ring4.rotation.y += 0.0011;

      particles.rotation.y += 0.0002;
      particles.rotation.x += 0.0001;

      smallSpheres.forEach(item => {
        item.angle += item.speed * 30 * delta;
        item.mesh.position.x = Math.cos(item.angle) * item.dist;
        item.mesh.position.z = Math.sin(item.angle) * item.dist;
        item.mesh.position.y = item.height + Math.sin(elapsedTime * 2 + item.angle) * 0.3;
      });

      sphere.material.opacity = 0.65 + Math.sin(elapsedTime * 3) * 0.05;
      sphere.scale.setScalar(1 + Math.sin(elapsedTime * 2) * 0.02);

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    // --- Resize handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (controls) controls.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setBtnText('✦ ACCEDIENDO ✦');

    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await resp.json();
      if (data.success) {
        setBtnText('✦ INGRESAR ✦');
        alert('¡Acceso concedido! Bienvenido al futuro.');
      } else {
        setBtnText('✦ INGRESAR ✦');
        alert(data.error || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Login error', error);
      setBtnText('✦ INGRESAR ✦');
      alert('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Canvas para la esfera 3D */}
      <canvas id="canvas-3d" ref={canvasRef}></canvas>

      {/* Orbes de fondo */}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>

      {/* Overlay de grano */}
      <div className="grain-overlay"></div>

      {/* Contenido principal */}
      <div className="login-container">
        <div className="glass-login">
          <div className="login-badge">
            <span className="badge-dot"></span>
            <span>✦ ACCESO SEGURO ✦</span>
          </div>

          <h1 className="login-title">
            <span className="gradient">BIENVENIDO</span>
          </h1>
          <div className="login-subtitle">AL FUTURO</div>

          <form id="loginForm" onSubmit={handleLogin}>
            <div className="input-group">
              <label className="input-label">USUARIO</label>
              <input
                id="username"
                type="text"
                className="input-field"
                placeholder="usuario@dominio.io"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">CONTRASEÑA</label>
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="login-options">
              <label className="remember">
                <input type="checkbox" defaultChecked /> RECORDAR
              </label>
              <a href="#" className="forgot-link">¿OLVIDASTE?</a>
            </div>

            <button type="submit" className="login-btn" id="loginBtn">
              <span>{btnText}</span>
            </button>
          </form>

          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">O CONTINÚA CON</span>
            <div className="divider-line"></div>
          </div>

          <div className="social-btns">
            <button className="social-btn">Ⓣ</button>
            <button className="social-btn">Ⓕ</button>
            <button className="social-btn">Ⓖ</button>
            <button className="social-btn">Ⓐ</button>
          </div>

          <div className="signup-link">
            ¿SIN CUENTA? <Link href="/registro">CREAR AHORA</Link>
          </div>

          {/* Reflection sutil */}
          <div className="light-reflection"></div>
        </div>
      </div>
    </div>
  );
}
