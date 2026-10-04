'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// ── Bóveda del tesoro: modelos reales (poly.pizza, CC-BY) ──
// chest-gold: Quaternius · crown: Poly by Google · gold-bag: Quaternius
// trophy: Pepijn Rijnders · gem/coin/key/goblet: autores de poly.pizza
const TREASURES = [
  { url: '/models/treasure/chest-gold.glb', size: 3.8, radius: 0, height: -0.7, spin: 0.18, orbit: 0 },
  { url: '/models/treasure/crown.glb', size: 1.35, radius: 4.4, height: 1.1, spin: 0.5, orbit: 0.13 },
  { url: '/models/treasure/trophy.glb', size: 1.4, radius: 3.6, height: 2.2, spin: 0.6, orbit: -0.1 },
  { url: '/models/treasure/gold-bag.glb', size: 1.5, radius: 5.0, height: -0.2, spin: 0.4, orbit: 0.09 },
  { url: '/models/treasure/gem.glb', size: 1.0, radius: 3.0, height: 3.0, spin: 0.75, orbit: -0.16 },
  { url: '/models/treasure/key.glb', size: 1.5, radius: 5.6, height: 1.8, spin: 0.85, orbit: 0.11 },
  { url: '/models/treasure/goblet.glb', size: 1.1, radius: 4.2, height: 2.7, spin: 0.55, orbit: -0.12 },
]

export function MissionsNexus() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x08030a, 26, 90)

    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 200)
    camera.position.set(0, 1.5, 13)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // Reflejos de estudio para que el oro se vea metálico de verdad
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.06).texture
    scene.environmentIntensity = 0.85

    const disposables: { dispose: () => void }[] = []

    // --- Luces cálidas de bóveda ---
    scene.add(new THREE.AmbientLight(0x2a1a12, 2.2))
    const keyLight = new THREE.PointLight(0xffd700, 60, 60, 1.8)
    keyLight.position.set(3, 6, 5)
    scene.add(keyLight)
    const pinkRim = new THREE.PointLight(0xff006e, 40, 55, 1.8)
    pinkRim.position.set(-9, 3, -4)
    scene.add(pinkRim)
    const orangeFill = new THREE.PointLight(0xff6b00, 35, 50, 1.8)
    orangeFill.position.set(8, -2, 3)
    scene.add(orangeFill)
    const chestLight = new THREE.PointLight(0xffc766, 50, 24, 1.6)
    chestLight.position.set(0, 2.5, 6)
    scene.add(chestLight)
    const topGlow = new THREE.SpotLight(0xffe9b0, 120, 50, Math.PI / 5, 0.5, 1.6)
    topGlow.position.set(0, 12, 0)
    topGlow.target.position.set(0, -1, 0)
    scene.add(topGlow, topGlow.target)

    // --- Grupo del tesoro ---
    const nexusGroup = new THREE.Group()
    scene.add(nexusGroup)

    const loader = new GLTFLoader()
    const loadedItems: { obj: THREE.Object3D; cfg: (typeof TREASURES)[number]; angle: number }[] = []

    TREASURES.forEach((cfg, i) => {
      loader.load(cfg.url, (gltf) => {
        const obj = gltf.scene
        const box = new THREE.Box3().setFromObject(obj)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const s = cfg.size / Math.max(size.x, size.y, size.z)
        obj.scale.setScalar(s)
        obj.position.sub(center.multiplyScalar(s))
        const wrap = new THREE.Group()
        wrap.add(obj)
        const angle = (i / TREASURES.length) * Math.PI * 2
        wrap.position.set(Math.cos(angle) * cfg.radius, cfg.height, Math.sin(angle) * cfg.radius)
        nexusGroup.add(wrap)
        loadedItems.push({ obj: wrap, cfg, angle })
      }, undefined, () => { /* si un modelo falla, la bóveda sigue sin él */ })
    })

    // --- Suelo de monedas (instanced, oro PBR) ---
    const coinGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.055, 20)
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 1,
      roughness: 0.28,
      emissive: 0x30200a,
      emissiveIntensity: 0.4,
    })
    const coinCount = 130
    const coins = new THREE.InstancedMesh(coinGeo, coinMat, coinCount)
    const m4 = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const e = new THREE.Euler()
    const v = new THREE.Vector3()
    const coinData: { x: number; z: number; y: number; rotY: number }[] = []
    for (let i = 0; i < coinCount; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 2.2 + Math.random() * 8
      const x = Math.cos(a) * r
      const z = Math.sin(a) * r
      const y = -3.3 + (Math.random() - 0.5) * 0.25
      const rotY = Math.random() * Math.PI * 2
      e.set((Math.random() - 0.5) * 0.35, rotY, (Math.random() - 0.5) * 0.35)
      q.setFromEuler(e)
      m4.compose(v.set(x, y, z), q, new THREE.Vector3(1, 1, 1))
      coins.setMatrixAt(i, m4)
      coinData.push({ x, z, y, rotY })
    }
    nexusGroup.add(coins)
    disposables.push(coinGeo, coinMat)

    // --- Plataforma bajo el cofre ---
    const slabGeo = new THREE.CylinderGeometry(2.4, 2.9, 0.4, 8)
    const slabMat = new THREE.MeshStandardMaterial({ color: 0x1c1014, metalness: 0.4, roughness: 0.7 })
    const slab = new THREE.Mesh(slabGeo, slabMat)
    slab.position.y = -2.1
    nexusGroup.add(slab)
    disposables.push(slabGeo, slabMat)

    // --- Partículas de brillo dorado ascendiendo ---
    const sparkCount = 700
    const sparkGeo = new THREE.BufferGeometry()
    const sparkPos = new Float32Array(sparkCount * 3)
    const sparkCol = new Float32Array(sparkCount * 3)
    const sparkSeed = new Float32Array(sparkCount)
    const sparkPalette = [new THREE.Color('#ffd700'), new THREE.Color('#ffb84d'), new THREE.Color('#ff006e'), new THREE.Color('#fff3c4')]
    for (let i = 0; i < sparkCount; i++) {
      sparkPos[i * 3] = (Math.random() - 0.5) * 26
      sparkPos[i * 3 + 1] = (Math.random() - 0.5) * 18
      sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 20
      sparkSeed[i] = Math.random() * Math.PI * 2
      const c = sparkPalette[Math.floor(Math.random() * sparkPalette.length)]
      sparkCol[i * 3] = c.r
      sparkCol[i * 3 + 1] = c.g
      sparkCol[i * 3 + 2] = c.b
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3))
    sparkGeo.setAttribute('color', new THREE.BufferAttribute(sparkCol, 3))
    const sparkMat = new THREE.PointsMaterial({ size: 0.09, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })
    const sparks = new THREE.Points(sparkGeo, sparkMat)
    scene.add(sparks)
    disposables.push(sparkGeo, sparkMat)

    // --- Polvo ambiental ---
    const dustCount = 400
    const dustGeo = new THREE.BufferGeometry()
    const dustPos = new Float32Array(dustCount * 3)
    const dustCol = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 50
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 40
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 45
      const c = sparkPalette[Math.floor(Math.random() * 2)]
      dustCol[i * 3] = c.r * 0.5
      dustCol[i * 3 + 1] = c.g * 0.5
      dustCol[i * 3 + 2] = c.b * 0.5
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustCol, 3))
    const dustMat = new THREE.PointsMaterial({ size: 0.12, vertexColors: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)
    disposables.push(dustGeo, dustMat)

    // --- Interacción: mouse + scroll ---
    let mx = 0, my = 0, targetX = 0, targetY = 0, scrollP = 0
    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2
      targetY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    }
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()
    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const k = prefersReduced ? 0.15 : 1

      mx += (targetX - mx) * 0.04
      my += (targetY - my) * 0.04

      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const st = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
      scrollP += (st - scrollP) * 0.06

      // La bóveda gira lentamente + un giro extra recorrido con el scroll
      nexusGroup.rotation.y = t * 0.05 * k + scrollP * 0.9 * k + mx * 0.25
      nexusGroup.rotation.x = my * 0.08

      // Cada tesoro flota y gira sobre sí mismo
      loadedItems.forEach(({ obj, cfg, angle }, i) => {
        if (cfg.orbit !== 0) {
          const a = angle + t * cfg.orbit * k
          obj.position.x = Math.cos(a) * cfg.radius
          obj.position.z = Math.sin(a) * cfg.radius
        }
        obj.position.y = cfg.height + Math.sin(t * 0.8 * k + i * 1.7) * 0.25
        obj.rotation.y = t * cfg.spin * k
      })

      // Brillo ascendente (recicla partículas)
      const pos = sparkGeo.attributes.position.array as Float32Array
      for (let i = 0; i < sparkCount; i++) {
        pos[i * 3 + 1] += 0.012 * k
        pos[i * 3] += Math.sin(t + sparkSeed[i]) * 0.003
        if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -9
      }
      sparkGeo.attributes.position.needsUpdate = true

      dust.rotation.y = t * 0.01 * k + scrollP * 0.3

      // Luces bailan suave
      keyLight.position.x = Math.sin(t * 0.3 * k) * 5
      keyLight.position.z = Math.cos(t * 0.24 * k) * 6
      pinkRim.intensity = 40 + Math.sin(t * 1.7 * k) * 10

      // Cámara: parallax de mouse + descenso suave con scroll
      const targetCamY = 1.5 - scrollP * 3.2
      const targetCamZ = 13 - scrollP * 2.5
      camera.position.x += (mx * 4.5 - camera.position.x) * 0.045
      camera.position.y += (targetCamY + my * 2.2 - camera.position.y) * 0.045
      camera.position.z += (targetCamZ - camera.position.z) * 0.045
      camera.lookAt(0, -0.5, 0)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      loadedItems.forEach(({ obj }) => {
        obj.traverse((o) => {
          if (o instanceof THREE.Mesh) {
            o.geometry.dispose()
            const m = o.material
            ;(Array.isArray(m) ? m : [m]).forEach((mat) => mat.dispose())
          }
        })
      })
      disposables.forEach((d) => d.dispose())
      scene.environment?.dispose()
      pmrem.dispose()
      scene.clear()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, #0d050c 0%, #050208 100%)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 20%, rgba(255,0,110,0.08) 0%, transparent 45%), radial-gradient(ellipse at 20% 80%, rgba(0,229,160,0.06) 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 100%)' }} />
    </div>
  )
}
