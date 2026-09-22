'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

function createGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,255,255,0.8)');
  grad.addColorStop(0.3, 'rgba(255,255,255,0.25)');
  grad.addColorStop(0.7, 'rgba(255,255,255,0.05)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

export default function HeadsetAtmosphere() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05020c, 0.015);

    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 32);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const glowTex = createGlowTexture();

    const group = new THREE.Group();
    scene.add(group);

    // ── NEBULA CLOUDS ──
    const nebulaColors = ['#00E5A0', '#9D4EDD', '#2E3192', '#FF006E'];
    const nebulaGroup = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const color = new THREE.Color(nebulaColors[i % nebulaColors.length]);
      const size = 12 + Math.random() * 18;
      const mat = new THREE.SpriteMaterial({
        color,
        map: glowTex,
        transparent: true,
        opacity: 0.12 + Math.random() * 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(mat);
      const a = Math.random() * Math.PI * 2;
      const r = 18 + Math.random() * 35;
      sprite.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 20, -20 - Math.random() * 40);
      sprite.scale.setScalar(size);
      (sprite.userData as any) = {
        basePos: sprite.position.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.1 + Math.random() * 0.15,
        scalePhase: Math.random() * Math.PI * 2,
      };
      nebulaGroup.add(sprite);
    }
    group.add(nebulaGroup);

    // ── CONSTELLATION / NEURAL GRID ──
    const pointCount = 120;
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);
    const palette = [new THREE.Color('#00E5A0'), new THREE.Color('#9D4EDD'), new THREE.Color('#ffffff'), new THREE.Color('#2E3192')];

    for (let i = 0; i < pointCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 15 + Math.random() * 35;
      const y = (Math.random() - 0.5) * 30;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: 0.4,
      map: glowTex,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    group.add(points);

    // Connections between nearby points
    const lineIndices: number[] = [];
    const lineColors: number[] = [];
    const threshold = 10;
    for (let i = 0; i < pointCount; i++) {
      const ax = positions[i * 3];
      const ay = positions[i * 3 + 1];
      const az = positions[i * 3 + 2];
      for (let j = i + 1; j < pointCount; j++) {
        const bx = positions[j * 3];
        const by = positions[j * 3 + 1];
        const bz = positions[j * 3 + 2];
        const dx = ax - bx;
        const dy = ay - by;
        const dz = az - bz;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          lineIndices.push(i, j);
          const c = palette[i % palette.length];
          lineColors.push(c.r, c.g, c.b, c.r, c.g, c.b);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    const lineColorAttr = new THREE.BufferAttribute(new Float32Array(lineColors), 3);
    lineGeo.setAttribute('color', lineColorAttr);
    lineGeo.setIndex(lineIndices);

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    // ── CENTRAL CORE ──
    const coreGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00E5A0,
      transparent: true,
      opacity: 0.12,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const innerCoreGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x9D4EDD,
      transparent: true,
      opacity: 0.22,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    group.add(innerCore);

    // ── FLOATING GEOMETRIC SHARDS ──
    const shardGeo = new THREE.TetrahedronGeometry(0.5, 0);
    const shardColors = [0x00E5A0, 0x9D4EDD, 0xFF006E, 0x2E3192];
    const shards: THREE.Mesh[] = [];
    for (let i = 0; i < 12; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: shardColors[i % shardColors.length],
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(shardGeo, mat);
      const a = Math.random() * Math.PI * 2;
      const r = 10 + Math.random() * 22;
      mesh.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 10);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      (mesh.userData as any) = {
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        orbitSpeed: (Math.random() - 0.5) * 0.15,
        baseY: mesh.position.y,
        phase: Math.random() * Math.PI * 2,
      };
      shards.push(mesh);
      group.add(mesh);
    }

    // ── INTERACTION ──
    let mx = 0, my = 0, scrollY = 0, smoothScroll = 0;
    let smoothMx = 0, smoothMy = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const k = prefersReduced ? 0.2 : 1;

      smoothMx += (mx - smoothMx) * 0.04;
      smoothMy += (my - smoothMy) * 0.04;
      smoothScroll += (scrollY - smoothScroll) * 0.06;

      // Nebula drift and pulse
      nebulaGroup.children.forEach((child) => {
        const sprite = child as THREE.Sprite;
        const u = sprite.userData as any;
        const phase = t * u.speed + u.phase;
        sprite.position.x = u.basePos.x + Math.sin(phase) * 3;
        sprite.position.y = u.basePos.y + Math.cos(phase * 0.7) * 2;
        if (!u.baseScale) u.baseScale = sprite.scale.x;
        const scale = u.baseScale * (1 + Math.sin(t * 0.5 + u.scalePhase) * 0.08);
        sprite.scale.setScalar(scale);
      });

      // Core rotation
      core.rotation.y = t * 0.08 * k;
      core.rotation.x = t * 0.05 * k;
      innerCore.rotation.y = -t * 0.12 * k;
      innerCore.rotation.z = t * 0.07 * k;

      // Points gentle rotation
      points.rotation.y = t * 0.02 * k;
      lines.rotation.y = t * 0.02 * k;

      // Shards orbit
      shards.forEach((shard, i) => {
        const u = shard.userData as any;
        shard.rotation.x += u.rotSpeed.x * k;
        shard.rotation.y += u.rotSpeed.y * k;
        shard.rotation.z += u.rotSpeed.z * k;
        shard.position.y = u.baseY + Math.sin(t * 0.8 + u.phase) * 2;
        const a = t * u.orbitSpeed + u.phase;
        const r = Math.sqrt(shard.position.x * shard.position.x + shard.position.z * shard.position.z);
        shard.position.x = Math.cos(a) * r;
        shard.position.z = Math.sin(a) * r;
      });

      // Parallax
      const targetX = smoothMx * 18;
      const targetY = smoothMy * 12;
      const targetZ = Math.max(15, 32 - smoothScroll * 0.12);
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.position.z += (targetZ - camera.position.z) * 0.05;
      camera.lookAt(0, smoothScroll * 0.01, 0);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      glowTex.dispose();
      renderer.dispose();
      pointsGeo.dispose(); pointsMat.dispose();
      lineGeo.dispose(); lineMat.dispose();
      coreGeo.dispose(); coreMat.dispose();
      innerCoreGeo.dispose(); innerCoreMat.dispose();
      shardGeo.dispose();
      shards.forEach((s) => { (s.material as THREE.Material).dispose(); });
      nebulaGroup.children.forEach((s) => {
        const mesh = s as THREE.Mesh;
        if (mesh.material) {
          (mesh.material as THREE.Material).dispose();
        }
      });
    };
  }, []);

  return (
    <div className="pointer-events-none" style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(5,0,12,0.45) 55%, rgba(5,0,12,0.95) 100%)',
        }}
      />
    </div>
  );
}
