'use client';

import { useEffect, useRef } from 'react';
import './ather.css';
import { assetUrl } from '@/lib/assets';

export default function AthernixitoPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Store references for cleanup
    let renderer: any = null;
    let scene: any = null;
    let camera: any = null;
    
    // We must ensure THREE and FBXLoader are loaded.
    const loadScript = (src: string) => new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = reject;
      document.body.appendChild(script);
    });

    const init = async () => {
      try {
        // Load Three.js and GLTFLoader with proper error handling
        if (!(window as any).THREE) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js");
        
        // Wait for THREE to be available
        let attempts = 0;
        while (!(window as any).THREE && attempts < 20) {
          await new Promise(resolve => setTimeout(resolve, 50));
          attempts++;
        }
        
        if (!(window as any).THREE) {
          console.error('THREE failed to load');
          return;
        }
        
        // Load GLTFLoader with proper error handling
        if (!(window as any).THREE.GLTFLoader) {
          await loadScript("https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js");
          // Wait for the loader to be properly initialized
          attempts = 0;
          while (!(window as any).THREE.GLTFLoader && attempts < 20) {
            await new Promise(resolve => setTimeout(resolve, 50));
            attempts++;
          }
          if (!(window as any).THREE.GLTFLoader) {
            console.error('GLTFLoader failed to load');
            return;
          }
        }
        
        if (!(window as any).gsap) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
        if (!(window as any).ScrollTrigger) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js");

        (window as any).gsap.registerPlugin((window as any).ScrollTrigger);

        // ─── SCENE SETUP ───
        const container = containerRef.current;
        if (!container) return;

        renderer = new (window as any).THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.domElement.id = 'canvas-3d';
        container.appendChild(renderer.domElement);

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = (window as any).THREE.SRGBColorSpace;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = (window as any).THREE.PCFSoftShadowMap;

        scene = new (window as any).THREE.Scene();
        scene.fog = new (window as any).THREE.FogExp2(0x020005, 0.015);

        camera = new (window as any).THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
        camera.position.set(6, 2, 10);
        camera.lookAt(0, 1, 0);

        // ─── LIGHTING ───
        scene.add(new (window as any).THREE.AmbientLight(0x110524, 1.5));

        const mainLight = new (window as any).THREE.DirectionalLight(0xffb700, 4);
        mainLight.position.set(5, 10, 5);
        mainLight.castShadow = true;
        scene.add(mainLight);

        const rimLight = new (window as any).THREE.DirectionalLight(0xff006e, 2);
        rimLight.position.set(-5, 3, -3);
        scene.add(rimLight);

        const fillLight = new (window as any).THREE.PointLight(0xff6b00, 4, 20);
        fillLight.position.set(0, 4, 3);
        scene.add(fillLight);

        const backLight = new (window as any).THREE.PointLight(0xff006e, 3, 15);
        backLight.position.set(-3, 2, -5);
        scene.add(backLight);

        // ─── SPACE BACKGROUND ───
        const starGeo = new (window as any).THREE.BufferGeometry();
        const starCount = 3000;
        const starPos = new Float32Array(starCount * 3);
        const starSizes = new Float32Array(starCount);
        for (let i = 0; i < starCount; i++) {
          starPos[i * 3] = (Math.random() - 0.5) * 400;
          starPos[i * 3 + 1] = (Math.random() - 0.5) * 400;
          starPos[i * 3 + 2] = (Math.random() - 0.5) * 400;
          starSizes[i] = Math.random() * 2 + 0.5;
        }
        starGeo.setAttribute('position', new (window as any).THREE.BufferAttribute(starPos, 3));
        starGeo.setAttribute('size', new (window as any).THREE.BufferAttribute(starSizes, 1));

        const starMat = new (window as any).THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uColor: { value: new (window as any).THREE.Color(0xffffff) }
          },
          vertexShader: `
            attribute float size;
            uniform float uTime;
            varying float vAlpha;
            void main() {
              vAlpha = 0.4 + 0.6 * sin(uTime * 0.5 + position.x * 0.01);
              vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (250.0 / -mvPos.z);
              gl_Position = projectionMatrix * mvPos;
            }
          `,
          fragmentShader: `
            uniform vec3 uColor;
            varying float vAlpha;
            void main() {
              float d = length(gl_PointCoord - vec2(0.5));
              float glow = smoothstep(0.5, 0.0, d);
              gl_FragColor = vec4(uColor, glow * vAlpha * 1.5);
            }
          `,
          transparent: true,
          blending: (window as any).THREE.AdditiveBlending,
          depthWrite: false,
        });

        const stars = new (window as any).THREE.Points(starGeo, starMat);
        scene.add(stars);

        // Warp Streaks
        const streakGeo = new (window as any).THREE.BufferGeometry();
        const streakCount = 800;
        const streakPos = new Float32Array(streakCount * 6);
        const streakColors = new Float32Array(streakCount * 6);
        for (let i = 0; i < streakCount; i++) {
          const r = 4 + Math.random() * 150;
          const theta = Math.random() * Math.PI * 2;
          const x = r * Math.cos(theta);
          const y = r * Math.sin(theta);
          const z = (Math.random() - 0.5) * 600;

          streakPos[i * 6] = x; streakPos[i * 6 + 1] = y; streakPos[i * 6 + 2] = z;
          streakPos[i * 6 + 3] = x; streakPos[i * 6 + 4] = y; streakPos[i * 6 + 5] = z + 0.1;

          const color = new (window as any).THREE.Color();
          const rand = Math.random();
          if (rand < 0.33) color.setHex(0xff00ff);
          else if (rand < 0.66) color.setHex(0x00ffff);
          else color.setHex(0xffffff);

          streakColors[i * 6] = color.r; streakColors[i * 6 + 1] = color.g; streakColors[i * 6 + 2] = color.b;
          streakColors[i * 6 + 3] = color.r; streakColors[i * 6 + 4] = color.g; streakColors[i * 6 + 5] = color.b;
        }
        streakGeo.setAttribute('position', new (window as any).THREE.BufferAttribute(streakPos, 3));
        streakGeo.setAttribute('color', new (window as any).THREE.BufferAttribute(streakColors, 3));

        const streakMat = new (window as any).THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity: 0,
          blending: (window as any).THREE.AdditiveBlending,
          depthWrite: false
        });
        const streaks = new (window as any).THREE.LineSegments(streakGeo, streakMat);
        scene.add(streaks);

        // Nebula clouds
        const nebulaData = [
          { pos: [-20, 10, -60], color: 0xff006e, size: 30, opacity: 0.06 },
          { pos: [30, -15, -80], color: 0xff6b00, size: 40, opacity: 0.05 },
          { pos: [-10, 5, -50], color: 0xffd700, size: 20, opacity: 0.04 },
          { pos: [15, 20, -70], color: 0x8800ff, size: 35, opacity: 0.05 },
        ];
        nebulaData.forEach((n: any) => {
          const geo = new (window as any).THREE.SphereGeometry(n.size, 16, 16);
          const mat = new (window as any).THREE.MeshBasicMaterial({
            color: n.color, transparent: true,
            opacity: n.opacity,
            side: (window as any).THREE.BackSide,
            blending: (window as any).THREE.AdditiveBlending,
            depthWrite: false,
          });
          const mesh = new (window as any).THREE.Mesh(geo, mat);
          mesh.position.set(...n.pos);
          scene.add(mesh);
        });

        // Planet rings
        const ringGeo = new (window as any).THREE.TorusGeometry(8, 0.8, 4, 80);
        const ringMat = new (window as any).THREE.MeshBasicMaterial({
          color: 0xff6b00, transparent: true, opacity: 0.12,
          blending: (window as any).THREE.AdditiveBlending, depthWrite: false,
        });
        const ring3d = new (window as any).THREE.Mesh(ringGeo, ringMat);
        ring3d.position.set(20, -8, -40);
        ring3d.rotation.x = Math.PI * 0.35;
        scene.add(ring3d);

        // Floating particles
        const floatGeo = new (window as any).THREE.BufferGeometry();
        const floatCount = 120;
        const floatPos = new Float32Array(floatCount * 3);
        for (let i = 0; i < floatCount; i++) {
          const r = 2.5 + Math.random() * 2;
          const theta = Math.random() * Math.PI * 2;
          const phi = (Math.random() - 0.5) * Math.PI;
          floatPos[i * 3] = r * Math.cos(theta) * Math.cos(phi);
          floatPos[i * 3 + 1] = r * Math.sin(phi) + 1.5;
          floatPos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
        }
        floatGeo.setAttribute('position', new (window as any).THREE.BufferAttribute(floatPos, 3));
        const floatMat = new (window as any).THREE.PointsMaterial({
          color: 0xffd700, size: 0.06,
          transparent: true, opacity: 0.7,
          blending: (window as any).THREE.AdditiveBlending, depthWrite: false,
        });
        const floatParticles = new (window as any).THREE.Points(floatGeo, floatMat);
        scene.add(floatParticles);

        // Ground glow disc
        const discGeo = new (window as any).THREE.CircleGeometry(3, 64);
        const discMat = new (window as any).THREE.MeshBasicMaterial({
          color: 0xff6b00, transparent: true, opacity: 0.08,
          blending: (window as any).THREE.AdditiveBlending, depthWrite: false,
          side: (window as any).THREE.DoubleSide,
        });
        const disc = new (window as any).THREE.Mesh(discGeo, discMat);
        disc.rotation.x = -Math.PI / 2;
        disc.position.y = 0;
        scene.add(disc);

        // ─── MODEL LOADING ───
        let model: any = null;
        let mixer: any = null;
        let modelReady = false;
        let currentAction: any = null;

        // Load real robot model
        const loader = new (window as any).THREE.GLTFLoader();
        
        loader.load(
          assetUrl('/robot/model2.glb'),
          (gltf: any) => {
            model = gltf.scene;
            
            // Configure materials
            model.traverse((child: any) => {
              if (child instanceof (window as any).THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                  child.material.envMapIntensity = 0.5;
                  child.material.roughness = 0.4;
                  child.material.metalness = 0.6;
                }
              }
            });

            model.rotation.y = Math.PI * 0.5;
            model.position.x = 3;
            model.position.y = -0.5;
            model.scale.set(1.5, 1.5, 1.5);
            
            scene.add(model);
            
            // Create mixer for animations
            mixer = new (window as any).THREE.AnimationMixer(model);
            
            // Load idle animation
            loader.load(
              assetUrl('/robot/animations/idle.glb'),
              (animGltf: any) => {
                const clip = animGltf.animations[0];
                if (clip) {
                  const action = mixer.clipAction(clip);
                  action.setLoop((window as any).THREE.LoopRepeat, Infinity);
                  action.play();
                  currentAction = action;
                }
                modelReady = true;
                hideLoading();
              },
              undefined,
              (error: any) => {
                console.error('Error loading idle animation:', error);
                modelReady = true;
                hideLoading();
              }
            );
          },
          undefined,
          (error: any) => {
            console.error('Error loading robot model:', error);
            // Fallback to basic character if model fails to load
            createFallbackChar();
            hideLoading();
          }
        );

        function createFallbackChar() {
          const group = new (window as any).THREE.Group();

          // Body - metallic orange
          const bodyGeo = new (window as any).THREE.CylinderGeometry(0.5, 0.5, 1.2, 16);
          const bodyMat = new (window as any).THREE.MeshStandardMaterial({
            color: 0xff6b00, 
            emissive: 0xff2200, 
            emissiveIntensity: 0.3,
            roughness: 0.3, 
            metalness: 0.8,
          });
          const body = new (window as any).THREE.Mesh(bodyGeo, bodyMat);
          body.position.y = 1.5;
          body.castShadow = true;
          group.add(body);

          // Head - golden with glow
          const headGeo = new (window as any).THREE.SphereGeometry(0.38, 16, 16);
          const headMat = new (window as any).THREE.MeshStandardMaterial({
            color: 0xffd700, 
            emissive: 0xff6b00, 
            emissiveIntensity: 0.2,
            roughness: 0.2, 
            metalness: 0.8,
          });
          const head = new (window as any).THREE.Mesh(headGeo, headMat);
          head.position.y = 2.7;
          head.castShadow = true;
          group.add(head);

          // Face screen (glowing display)
          const faceGeo = new (window as any).THREE.PlaneGeometry(0.4, 0.3);
          const faceMat = new (window as any).THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.8,
            side: (window as any).THREE.DoubleSide,
          });
          const face = new (window as any).THREE.Mesh(faceGeo, faceMat);
          face.position.set(0, 2.7, 0.4);
          face.rotation.y = Math.PI;
          group.add(face);

          // Arms
          [-1, 1].forEach((side: number) => {
            const armGeo = new (window as any).THREE.CylinderGeometry(0.15, 0.15, 0.8, 8);
            const arm = new (window as any).THREE.Mesh(armGeo, bodyMat.clone());
            arm.position.set(side * 0.7, 1.5, 0);
            arm.rotation.z = side * 0.4;
            group.add(arm);
          });

          // Legs
          [-1, 1].forEach((side: number) => {
            const legGeo = new (window as any).THREE.CylinderGeometry(0.18, 0.18, 0.9, 8);
            const leg = new (window as any).THREE.Mesh(legGeo, bodyMat.clone());
            leg.position.set(side * 0.3, 0.5, 0);
            group.add(leg);
          });

          model = group;
          model.rotation.y = Math.PI * 0.5;
          model.position.x = 3;
          scene.add(model);
          modelReady = true;
        }

        function hideLoading() {
          setTimeout(() => {
            const loadEl = document.getElementById('loading');
            if (loadEl) {
              loadEl.classList.add('fade-out');
              setTimeout(() => loadEl.remove(), 800);
            }
          }, 800);
        }

        // ─── SCROLL STATE & GSAP ───
        const panels = [
          document.getElementById('panel-0'),
          document.getElementById('panel-1'),
          document.getElementById('panel-2'),
          document.getElementById('panel-3'),
        ];
        const phase2overlay = document.getElementById('phase2-overlay');
        const scrollHint = document.getElementById('scroll-hint');

        (window as any).gsap.to('#scroll-hint', { y: 10, opacity: 0.5, yoyo: true, repeat: -1, duration: 1 });

        if (!modelReady || !model) {
          let checkInt = setInterval(() => {
            if (modelReady) { clearInterval(checkInt); initAnimations(); }
          }, 100);
        } else {
          initAnimations();
        }

        function initAnimations() {
          panels.forEach((panel, i) => {
            if (!panel) return;
            (window as any).gsap.set(panel, { opacity: 0, y: 50 });

            const badge = panel.querySelector('.panel-badge');
            const title = panel.querySelector('.gs-title');
            const sub = panel.querySelector('.gs-sub');
            const chips = panel.querySelectorAll('.gs-chip');
            const cta = panel.querySelector('.panel-cta');

            (window as any).gsap.set([badge, title, sub, cta], { opacity: 0, y: 30 });
            if (chips.length) (window as any).gsap.set(chips, { opacity: 0, y: 20, scale: 0.9 });

            const startProgress = i * 0.25;
            const endProgress = startProgress + 0.20;

            (window as any).ScrollTrigger.create({
              trigger: "#scroll-driver",
              start: `${startProgress * 100}% top`,
              end: `${endProgress * 100}% top`,
              onEnter: () => {
                panel.classList.add('active');
                (window as any).gsap.to(panel, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
                (window as any).gsap.to([badge, title, sub, cta], { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" });
                if (chips.length) (window as any).gsap.to(chips, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "back.out(1.5)" });
              },
              onLeave: () => {
                panel.classList.remove('active');
                (window as any).gsap.to(panel, { opacity: 0, y: -50, duration: 0.5 });
              },
              onEnterBack: () => {
                panel.classList.add('active');
                (window as any).gsap.to(panel, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
                (window as any).gsap.to([badge, title, sub, cta], { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" });
                if (chips.length) (window as any).gsap.to(chips, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "back.out(1.5)" });
              },
              onLeaveBack: () => {
                panel.classList.remove('active');
                (window as any).gsap.to(panel, { opacity: 0, y: 50, duration: 0.5 });
              }
            });
          });

          const camKeyframes = [
            { p: 0.00, camPos: [6, 2, 12], lookAt: [3, 2, 0], modelRotY: Math.PI * 0.5, modelX: 3 },
            { p: 0.25, camPos: [3, 2, 10], lookAt: [1, 2, 0], modelRotY: Math.PI * 0.3, modelX: 1.5 },
            { p: 0.50, camPos: [0, 2, 7], lookAt: [0, 2, 0], modelRotY: Math.PI * 0.1, modelX: 0 },
            { p: 0.75, camPos: [0, 2, 3], lookAt: [0, 2, 0], modelRotY: 0, modelX: 0 },
            { p: 1.00, camPos: [0, 2.5, 3], lookAt: [0, 2.5, 0], modelRotY: 0, modelX: 0 },
          ];

          function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
          function smoothstep(t: number) { return t * t * (3 - 2 * t); }

          function interp(frames: any[], progress: number, key: string) {
            for (let i = 0; i < frames.length - 1; i++) {
              const a = frames[i], b = frames[i + 1];
              if (progress >= a.p && progress <= b.p) {
                const t = smoothstep((progress - a.p) / (b.p - a.p));
                if (Array.isArray(a[key])) {
                  return a[key].map((v: number, j: number) => lerp(v, b[key][j], t));
                }
                return lerp(a[key], b[key], t);
              }
            }
            const last = frames[frames.length - 1];
            return Array.isArray(last[key]) ? [...last[key]] : last[key];
          }

          const sceneState: any = { progress: 0, streakSpeed: 0, streakLength: 0.1, fov: 45 };
          (window as any).warpState = sceneState;

          (window as any).ScrollTrigger.create({
            trigger: "#scroll-driver",
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self: any) => {
              const progress = self.progress;
              if (scrollHint) scrollHint.style.opacity = progress < 0.05 ? '1' : '0';

              if (progress > 0.50 && progress < 0.9 && phase2overlay) {
                phase2overlay.classList.add('show');
              } else if (phase2overlay) {
                phase2overlay.classList.remove('show');
              }

              if (!modelReady || !model) return;

              const camPos = interp(camKeyframes, progress, 'camPos');
              const lookAt = interp(camKeyframes, progress, 'lookAt');
              camera.position.set(camPos[0], camPos[1], camPos[2]);
              camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);

              const modelRotY = interp(camKeyframes, progress, 'modelRotY');
              const modelX = interp(camKeyframes, progress, 'modelX');
              model.rotation.y = modelRotY;
              model.position.x = modelX;

              scene.fog.density = lerp(0.012, 0.032, smoothstep(progress));

              stars.rotation.y = progress * 0.8;
              stars.rotation.x = progress * 0.3;
              floatParticles.rotation.y = progress * 2;

              let warpFactor = 0;
              if (progress > 0.5 && progress < 0.9) {
                warpFactor = Math.sin(((progress - 0.5) / 0.4) * Math.PI);
              }

              (window as any).gsap.to(sceneState, {
                streakSpeed: warpFactor * 800,
                streakLength: 0.1 + warpFactor * 150,
                fov: 45 + warpFactor * 60,
                duration: 0.5,
                ease: "power2.out"
              });

              (window as any).gsap.to(streakMat, {
                opacity: warpFactor * 0.9,
                duration: 0.5
              });
            }
          });

          const magBtns = document.querySelectorAll('.mag-btn');
          magBtns.forEach((btn: Element) => {
            btn.addEventListener('mousemove', (e: Event) => {
              const rect = (e.target as HTMLElement).getBoundingClientRect();
              const x = (e as MouseEvent).clientX - rect.left - rect.width / 2;
              const y = (e as MouseEvent).clientY - rect.top - rect.height / 2;
              (window as any).gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
            });
            btn.addEventListener('mouseleave', () => {
              (window as any).gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            });
          });
        }

        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });

        const clock = new (window as any).THREE.Clock();

        function animate() {
          (window as any).athReqId2 = requestAnimationFrame(animate);
          const dt = clock.getDelta();
          const elapsed = clock.getElapsedTime();

          if (mixer) mixer.update(dt);

          starMat.uniforms.uTime.value = elapsed;

          if (model) {
            model.position.y = Math.sin(elapsed * 2.5) * 0.15;
            model.rotation.z = Math.sin(elapsed * 1.5) * 0.05;
            model.rotation.x = Math.sin(elapsed * 2.0) * 0.03;
          }

          floatParticles.rotation.y += 0.003;

          fillLight.intensity = 3.5 + Math.sin(elapsed * 2.3) * 0.5;
          backLight.intensity = 2.5 + Math.sin(elapsed * 1.7 + 1) * 0.5;

          ring3d.rotation.z += 0.002;

          if ((window as any).warpState && typeof streakGeo !== 'undefined') {
            const speed = (window as any).warpState.streakSpeed;
            const stretch = (window as any).warpState.streakLength;
            const positions = streakGeo.attributes.position.array;

            if (Math.abs(camera.fov - (window as any).warpState.fov) > 0.1) {
              camera.fov = (window as any).warpState.fov;
              camera.updateProjectionMatrix();
            }

            for (let i = 0; i < positions.length; i += 6) {
              positions[i + 2] += speed * dt;
              if (positions[i + 2] > 200) positions[i + 2] -= 800;
              positions[i + 5] = positions[i + 2] + stretch;
            }
            streakGeo.attributes.position.needsUpdate = true;
          }

          renderer.render(scene, camera);
        }

        cancelAnimationFrame((window as any).athReqId2); animate();

      } catch (e) {
        console.error('Error running Athernixito animation scripts:', e);
      }
    };
    
    init();

    return () => {
      // Clean up Three.js resources
      if ((window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.getAll().forEach((t: any) => t.kill());
      }
      cancelAnimationFrame((window as any).athReqId2);
      
      // Dispose renderer if it exists - let React handle DOM cleanup
      if (renderer) {
        // Remove canvas from DOM first to prevent React removeChild errors
        const canvas = renderer.domElement;
        if (canvas && canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
        renderer.dispose();
        renderer.forceContextLoss();
      }
    };
  }, []);

  return (
    <>
      {/* GRAIN */}
      <div className="grain-overlay"></div>

      {/* LOADING */}
      <div id="loading">
        <div className="load-logo">ATHERNIXITO</div>
        <div className="load-bar-wrap">
          <div className="load-bar-fill"></div>
        </div>
        <div className="load-sub">INITIALIZING UNIVERSE...</div>
      </div>

      {/* CANVAS */}
      <div id="canvas-container" ref={containerRef}></div>

      {/* SCROLL CONTAINER */}
      <div id="scroll-driver">
        <div className="sticky-hud">

          {/* PANEL 0: HERO */}
          <div className="text-panel" id="panel-0" style={{"left":"5vw","top":"50%","transform":"translateY(-50%)"}}>
            <div className="panel-badge"><span className="badge-dot"></span>TEMPORADA 01 · ACTIVA</div>
            <h1 className="panel-title gs-title">EL<br /><span className="grad">ATHERNIXITO</span><br />DESPIERTA</h1>
            <p className="panel-sub gs-sub">UN UNIVERSO DE APRENDIZAJE<br />TE ESPERA. ¿ESTÁS LISTO?</p>
            <div className="stat-row">
              <div className="stat-chip gs-chip"><strong>12K+</strong><span>JUGADORES</span></div>
              <div className="stat-chip gs-chip"><strong>48</strong><span>MÓDULOS</span></div>
              <div className="stat-chip gs-chip"><strong>∞</strong><span>POSIBILIDADES</span></div>
            </div>
          </div>

          {/* PANEL 1: TRANSITION */}
          <div className="text-panel" id="panel-1" style={{"left":"5vw","top":"50%","transform":"translateY(-50%)"}}>
            <div className="panel-badge"><span className="badge-dot"></span>EXPLORANDO EL COSMOS</div>
            <h1 className="panel-title gs-title">ENTRA<br />AL <span className="grad">ESPACIO</span></h1>
            <p className="panel-sub gs-sub">DONDE EL CONOCIMIENTO<br />NO TIENE LÍMITES.</p>
            <div className="stat-row">
              <div className="stat-chip gs-chip"><strong>100%</strong><span>INMERSIÓN</span></div>
              <div className="stat-chip gs-chip"><strong>3D</strong><span>ENTORNO INTERACTIVO</span></div>
            </div>
          </div>

          {/* PANEL 2: ZOOM */}
          <div className="text-panel" id="panel-2" style={{"left":"5vw","top":"50%","transform":"translateY(-50%)"}}>
            <div className="panel-badge"><span className="badge-dot"></span>MISIÓN EN CURSO</div>
            <h1 className="panel-title gs-title"><span className="grad">DOMINA</span><br />EL FUTURO</h1>
            <p className="panel-sub gs-sub">CADA LECCIÓN ES UNA ESTRELLA.<br />COLECCIÓNALAS TODAS.</p>
          </div>

          {/* PANEL 3: HYPERSPACE */}
          <div className="text-panel" id="panel-3" style={{"left":"5vw","top":"50%","transform":"translateY(-50%)"}}>
            <div className="panel-badge"><span className="badge-dot"
                style={{"background":"#FF6B00","boxShadow":"0 0 8px #FF6B00"}}></span>VELOCIDAD LUZ ALCANZADA</div>
            <h1 className="panel-title gs-title"><span className="grad"
                style={{"background":"linear-gradient(135deg, #FFD700, #FF006E)","WebkitBackgroundClip":"text","WebkitTextFillColor":"transparent"}}>POTENCIA</span><br />ILIMITADA
            </h1>
            <p className="panel-sub gs-sub">HAS DESBLOQUEADO EL CÓDIGO FUENTE.<br />EL UNIVERSO AHORA ES TUYO.</p>
            <div style={{"marginTop":"20px"}}>
              <a className="panel-cta mag-btn" href="/login">COMENZAR AVENTURA →</a>
            </div>
          </div>

        </div>
      </div>

      {/* PHASE 2 RIGHT OVERLAY */}
      <div id="phase2-overlay">
        <div className="big-label">NIVEL</div>
        <div className="big-num">01</div>
        <div className="sub-text">EXPLORADOR DEL COSMOS</div>
      </div>

      {/* SCROLL HINT */}
      <div id="scroll-hint">
        <div className="arrow"></div>
        <span>SCROLLEAR</span>
      </div>
    </>
  );
}