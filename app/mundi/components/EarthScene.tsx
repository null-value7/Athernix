'use client';

// ═══════════════════════════════════════════
// VIEW (3D) — Planeta Tierra interactivo
// ═══════════════════════════════════════════

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { MundiLocation } from '../models/location.model';

interface EarthSceneProps {
  locations: MundiLocation[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
}

const R = 2; // radio del planeta

function latLngToVec3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function EarthScene({ locations, selectedId, onSelect, onHover }: EarthSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<any>({});
  const callbacksRef = useRef({ onSelect, onHover });
  callbacksRef.current = { onSelect, onHover };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Escena base ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0.6, 6.5);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ── Luces ──
    scene.add(new THREE.AmbientLight(0x404060, 1.2));
    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(5, 2, 4);
    scene.add(sun);
    const rim = new THREE.PointLight(0xff6b00, 2.5, 20);
    rim.position.set(-6, -2, -4);
    scene.add(rim);

    // ── Grupo del planeta ──
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // ── Núcleo del planeta: esfera oscura con fresnel de energía (paleta Athernix) ──
    const planetMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vN; varying vec3 vP;
        void main() {
          vN = normalize(normalMatrix * normal);
          vP = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        varying vec3 vN; varying vec3 vP;
        uniform float uTime;
        void main() {
          float fr = pow(1.0 - abs(dot(vN, vec3(0.0, 0.0, 1.0))), 2.4);
          vec3 base = vec3(0.030, 0.006, 0.045);
          vec3 gA = vec3(1.0, 0.42, 0.0);   // naranja
          vec3 gB = vec3(1.0, 0.0, 0.43);   // rosa
          vec3 glow = mix(gA, gB, 0.5 + 0.5 * sin(vP.y * 1.6 + uTime * 0.5));
          float lat = smoothstep(0.985, 1.0, sin(vP.y * 34.0 + uTime * 0.3));
          gl_FragColor = vec4(base + glow * fr * 0.6 + gA * lat * 0.05, 1.0);
        }`,
    });
    const planetCore = new THREE.Mesh(new THREE.SphereGeometry(R * 0.992, 72, 72), planetMat);
    earthGroup.add(planetCore);

    // ── Continentes como partículas de energía (muestreo de máscara oceánica) ──
    const landGroup = new THREE.Group();
    earthGroup.add(landGroup);
    const maskImg = new Image();
    maskImg.crossOrigin = 'anonymous';
    maskImg.src = 'https://unpkg.com/three-globe@2.31.0/example/img/earth-water.png';
    maskImg.onload = () => {
      const cv = document.createElement('canvas');
      cv.width = 320; cv.height = 160;
      const cx = cv.getContext('2d');
      if (!cx) return;
      cx.drawImage(maskImg, 0, 0, cv.width, cv.height);
      const px = cx.getImageData(0, 0, cv.width, cv.height).data;
      // Detectar polaridad: el agua (~71%) es el valor mayoritario
      let darkCount = 0;
      for (let i = 0; i < px.length; i += 40) if (px[i] < 80) darkCount++;
      const landIsDark = darkCount / (px.length / 40) < 0.5;
      const pos: number[] = [];
      const col: number[] = [];
      const cA = new THREE.Color('#FF6B00');
      const cB = new THREE.Color('#FF006E');
      const cC = new THREE.Color('#FFD700');
      for (let y = 0; y < cv.height; y++) {
        for (let x = 0; x < cv.width; x++) {
          const v = px[(y * cv.width + x) * 4];
          const isLand = landIsDark ? v < 80 : v > 170;
          if (!isLand || Math.random() < 0.35) continue;
          const lat = 90 - (y / cv.height) * 180;
          const lng = (x / cv.width) * 360 - 180;
          const p = latLngToVec3(lat + (Math.random() - 0.5) * 0.6, lng + (Math.random() - 0.5) * 0.6, R * 1.004);
          pos.push(p.x, p.y, p.z);
          const c = Math.random() < 0.1 ? cC : cA.clone().lerp(cB, Math.random() * 0.75);
          col.push(c.r, c.g, c.b);
        }
      }
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      lGeo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
      const lMat = new THREE.PointsMaterial({
        size: 0.026, vertexColors: true, transparent: true, opacity: 0.95,
        blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
      });
      landGroup.add(new THREE.Points(lGeo, lMat));
    };

    // ── Retícula holográfica (meridianos/paralelos) ──
    const grid = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(R * 1.001, 32, 20)),
      new THREE.LineBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.05 })
    );
    earthGroup.add(grid);

    // ── Anillo de escaneo que recorre el planeta ──
    const scanMat = new THREE.MeshBasicMaterial({
      color: 0xffd700, transparent: true, opacity: 0.35,
      blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    });
    const scanRing = new THREE.Mesh(new THREE.TorusGeometry(1, 0.004, 8, 160), scanMat);
    scanRing.rotation.x = Math.PI / 2;
    earthGroup.add(scanRing);

    // ── Atmósfera (shader glow) ──
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.18, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vN;
          void main() {
            vN = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          varying vec3 vN;
          void main() {
            float i = pow(0.62 - dot(vN, vec3(0.0, 0.0, 1.0)), 2.6);
            gl_FragColor = vec4(1.0, 0.42, 0.0, 1.0) * i * 1.3 + vec4(1.0, 0.0, 0.43, 1.0) * i * 0.5;
          }`,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
      })
    );
    scene.add(atmosphere);

    // ── Anillo orbital decorativo ──
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(R * 1.55, 0.004, 8, 200),
      new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.22 })
    );
    ring.rotation.x = Math.PI / 2.25;
    scene.add(ring);

    // ── Estrellas ──
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(3500 * 3);
    const starCol = new Float32Array(3500 * 3);
    const palette = [new THREE.Color(0xffffff), new THREE.Color(0xff6b00), new THREE.Color(0xff006e), new THREE.Color(0xffd700)];
    for (let i = 0; i < 3500; i++) {
      const r = 30 + Math.random() * 60;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(p) * Math.cos(t);
      starPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      starPos[i * 3 + 2] = r * Math.cos(p);
      const c = palette[Math.random() < 0.82 ? 0 : Math.floor(Math.random() * 3) + 1];
      starCol[i * 3] = c.r; starCol[i * 3 + 1] = c.g; starCol[i * 3 + 2] = c.b;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.12, vertexColors: true, transparent: true, opacity: 0.85 }));
    scene.add(stars);

    // ── Arcos de energía entre nodos + cometas viajeros ──
    const arcGroup = new THREE.Group();
    earthGroup.add(arcGroup);
    const comets: Array<{ m: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; ph: number; sp: number }> = [];
    locations.forEach((loc, i) => {
      const nxt = locations[(i + 3) % locations.length];
      const a = latLngToVec3(loc.lat, loc.lng, R * 1.012);
      const b = latLngToVec3(nxt.lat, nxt.lng, R * 1.012);
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.09 + a.distanceTo(b) * 0.28);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(50)),
        new THREE.LineBasicMaterial({ color: new THREE.Color(loc.color), transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending })
      );
      arcGroup.add(line);
      const comet = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 8, 8),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(loc.color), transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending })
      );
      arcGroup.add(comet);
      comets.push({ m: comet, curve, ph: Math.random(), sp: 0.05 + Math.random() * 0.06 });
    });

    // ── Satélites orbitando ──
    const spins: THREE.Group[] = [];
    const satColors = [0xff6b00, 0xff006e, 0xffd700];
    for (let i = 0; i < 3; i++) {
      const orbit = new THREE.Group();
      orbit.rotation.x = Math.PI / 2.4 + (i - 1) * 0.55;
      orbit.rotation.y = i * 1.9;
      const spin = new THREE.Group();
      orbit.add(spin);
      const orbR = R * (1.42 + i * 0.17);
      const sat = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.05, 0),
        new THREE.MeshBasicMaterial({ color: satColors[i], transparent: true, opacity: 0.95 })
      );
      sat.position.x = orbR;
      spin.add(sat);
      const trail = new THREE.Mesh(
        new THREE.TorusGeometry(orbR, 0.0018, 6, 100, Math.PI * 0.55),
        new THREE.MeshBasicMaterial({ color: satColors[i], transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending })
      );
      trail.rotation.z = -Math.PI * 0.55;
      spin.add(trail);
      scene.add(orbit);
      spins.push(spin);
    }

    // ── Marcadores de ubicaciones ──
    const markers: THREE.Group[] = [];
    locations.forEach((loc) => {
      const g = new THREE.Group();
      const pos = latLngToVec3(loc.lat, loc.lng, R * 1.01);
      g.position.copy(pos);
      g.lookAt(pos.clone().multiplyScalar(2));

      const color = new THREE.Color(loc.color);
      const core = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.05, 0),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 })
      );
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 16, 16),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35 })
      );
      const pulse = new THREE.Mesh(
        new THREE.RingGeometry(0.05, 0.065, 32),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, side: THREE.DoubleSide })
      );
      const spike = new THREE.Mesh(
        new THREE.CylinderGeometry(0.004, 0.004, 0.35, 6),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55 })
      );
      spike.rotation.x = Math.PI / 2;
      spike.position.z = 0.17;

      // Hit-area invisible más grande para clic fácil
      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hit.userData.locationId = loc.id;

      g.add(core, halo, pulse, spike, hit);
      g.userData = { locationId: loc.id, pulse, halo, core, baseColor: color };
      earthGroup.add(g);
      markers.push(g);
    });

    // ── Interacción: drag para rotar + raycast ──
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let dragMoved = 0;
    let prev = { x: 0, y: 0 };
    let targetRotY = 0.6;
    let targetRotX = 0.12;
    let autoRotate = true;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      dragMoved = 0;
      prev = { x: e.clientX, y: e.clientY };
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (isDragging) {
        const dx = e.clientX - prev.x;
        const dy = e.clientY - prev.y;
        dragMoved += Math.abs(dx) + Math.abs(dy);
        targetRotY += dx * 0.005;
        targetRotX = THREE.MathUtils.clamp(targetRotX + dy * 0.003, -0.9, 0.9);
        prev = { x: e.clientX, y: e.clientY };
        autoRotate = false;
      }
    };
    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      setTimeout(() => { autoRotate = true; }, 4000);
      if (dragMoved < 6) {
        // Fue un clic — raycast a marcadores
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(markers.flatMap((m) => m.children), false);
        const found = hits.find((h) => h.object.userData.locationId);
        callbacksRef.current.onSelect(found ? found.object.userData.locationId : null);
      }
    };
    mount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // ── Zoom con rueda ──
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const z = THREE.MathUtils.clamp(camera.position.length() + e.deltaY * 0.004, 4.2, 11);
      camera.position.setLength(z);
    };
    mount.addEventListener('wheel', onWheel, { passive: false });

    // ── Loop de animación ──
    const clock = new THREE.Clock();
    let hoveredId: string | null = null;
    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (autoRotate && !stateRef.current.locked) targetRotY += 0.0012;
      earthGroup.rotation.y += (targetRotY - earthGroup.rotation.y) * 0.06;
      earthGroup.rotation.x += (targetRotX - earthGroup.rotation.x) * 0.06;
      planetMat.uniforms.uTime.value = t;
      stars.rotation.y += 0.00012;
      (stars.material as THREE.PointsMaterial).opacity = 0.72 + Math.sin(t * 1.8) * 0.16;
      ring.rotation.z += 0.0008;
      grid.rotation.y += 0.00025;

      // Anillo de escaneo barriendo latitudes
      const sy = Math.sin(t * 0.42) * R * 0.92;
      scanRing.position.y = sy;
      scanRing.scale.setScalar(Math.sqrt(Math.max(R * R - sy * sy, 0.04)) * 1.02);
      scanMat.opacity = 0.24 + Math.sin(t * 3.1) * 0.12;

      // Cometas recorriendo los arcos
      comets.forEach((c) => {
        const u = (t * c.sp + c.ph) % 1;
        c.m.position.copy(c.curve.getPoint(u));
        (c.m.material as THREE.MeshBasicMaterial).opacity = Math.sin(u * Math.PI) * 0.95;
      });

      // Satélites
      spins.forEach((s, i) => {
        s.rotation.z += 0.0035 + i * 0.0014;
        (s.children[0] as THREE.Mesh).rotation.y += 0.05;
      });

      // Pulso de marcadores
      markers.forEach((m, i) => {
        const s = 1 + Math.sin(t * 2.4 + i * 1.3) * 0.35;
        m.userData.pulse.scale.setScalar(s * 1.6);
        m.userData.pulse.material.opacity = 0.9 - (s - 0.65) * 0.55;
        m.userData.halo.scale.setScalar(1 + Math.sin(t * 3 + i) * 0.18);
        const isSel = m.userData.locationId === stateRef.current.selectedId;
        const isHov = m.userData.locationId === hoveredId;
        m.userData.core.scale.setScalar(isSel ? 1.9 : isHov ? 1.5 : 1);
        m.userData.core.rotation.z += isSel ? 0.08 : 0.025;
      });

      // Hover raycast (solo si no arrastra)
      if (!isDragging) {
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(markers.flatMap((m) => m.children), false);
        const found = hits.find((h) => h.object.userData.locationId);
        const newId = found ? found.object.userData.locationId : null;
        if (newId !== hoveredId) {
          hoveredId = newId;
          callbacksRef.current.onHover(newId);
          mount.style.cursor = newId ? 'pointer' : 'grab';
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ──
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Entrada cinematográfica ──
    earthGroup.scale.setScalar(0.001);
    gsap.to(earthGroup.scale, { x: 1, y: 1, z: 1, duration: 2.2, ease: 'expo.out', delay: 0.3 });
    gsap.from(camera.position, { z: 12, duration: 2.4, ease: 'power3.out' });

    stateRef.current = {
      flyTo: (loc: MundiLocation | null) => {
        if (!loc) {
          stateRef.current.locked = false;
          gsap.to(camera.position, { x: 0, y: 0.6, z: 6.5, duration: 1.4, ease: 'power3.inOut' });
          return;
        }
        stateRef.current.locked = true;
        // Rotar el planeta para centrar la ubicación frente a la cámara
        const phi = (90 - loc.lat) * (Math.PI / 180);
        const theta = (loc.lng + 180) * (Math.PI / 180);
        const yaw = -(theta - Math.PI / 2);
        // Tomar el camino de rotación más corto respecto a la posición actual
        const twoPi = 2 * Math.PI;
        const n = Math.round((earthGroup.rotation.y - yaw) / twoPi);
        targetRotY = yaw + n * twoPi;
        targetRotX = phi - Math.PI / 2;
        autoRotate = false;
        gsap.to(camera.position, { x: 0, y: 0.15, z: 4.6, duration: 1.5, ease: 'power3.inOut' });
      },
      locked: false,
      selectedId: null,
    };

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      mount.removeEventListener('pointerdown', onPointerDown);
      mount.removeEventListener('wheel', onWheel);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reaccionar a selección externa
  useEffect(() => {
    if (!stateRef.current.flyTo) return;
    stateRef.current.selectedId = selectedId;
    const loc = locations.find((l) => l.id === selectedId) || null;
    stateRef.current.flyTo(loc);
  }, [selectedId, locations]);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, cursor: 'grab' }} />;
}
