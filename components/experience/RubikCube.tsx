'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// ── Cubo Rubik realista: 27 piezas con stickers que se mezcla solo ──
export function RubikCube() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 60)
    camera.position.set(0, 0, 8.5)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    container.appendChild(renderer.domElement)

    // Reflejos de estudio sobre el plástico
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environmentIntensity = 0.9

    const disposables: { dispose: () => void }[] = []

    // --- Materiales: plástico negro + stickers glossy de colores reales ---
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x141414, roughness: 0.32, clearcoat: 0.5, clearcoatRoughness: 0.3,
    })
    // Paleta cálida Athernix: rosa, rojo, naranja y amarillo
    const stickerColors = {
      px: 0xff006e, // rosa
      nx: 0xff6b00, // naranja
      py: 0xffd500, // amarillo
      ny: 0xffb300, // ámbar
      pz: 0xe10600, // rojo
      nz: 0xd1005f, // rosa oscuro
    }
    const stickerMats = Object.fromEntries(
      Object.entries(stickerColors).map(([k, c]) => [
        k,
        new THREE.MeshPhysicalMaterial({
          color: c, roughness: 0.22, clearcoat: 0.7, clearcoatRoughness: 0.25,
        }),
      ]),
    ) as Record<keyof typeof stickerColors, THREE.MeshPhysicalMaterial>

    const CUBIE = 0.92
    const STEP = 1.0
    const cubieGeo = new RoundedBoxGeometry(CUBIE, CUBIE, CUBIE, 4, 0.07)
    const stickerGeo = new RoundedBoxGeometry(0.78, 0.78, 0.045, 2, 0.03)
    disposables.push(cubieGeo, stickerGeo, bodyMat, ...Object.values(stickerMats))

    // --- Grupo del cubo ---
    const cubeGroup = new THREE.Group()
    cubeGroup.position.x = 2.35
    cubeGroup.rotation.set(-0.42, 0.6, 0.12) // vista 3/4: arriba + frente + lado
    scene.add(cubeGroup)
    const CUBE_HOME_X = 2.35
    let cubeHomeX = CUBE_HOME_X

    interface Cubie extends THREE.Mesh {
      userData: { gx: number; gy: number; gz: number }
    }
    const cubies: Cubie[] = []

    // sticker = placa fina pegada a la cara externa de la pieza
    const dirs: { key: keyof typeof stickerColors; n: THREE.Vector3; rot: THREE.Euler }[] = [
      { key: 'px', n: new THREE.Vector3(1, 0, 0), rot: new THREE.Euler(0, Math.PI / 2, 0) },
      { key: 'nx', n: new THREE.Vector3(-1, 0, 0), rot: new THREE.Euler(0, -Math.PI / 2, 0) },
      { key: 'py', n: new THREE.Vector3(0, 1, 0), rot: new THREE.Euler(-Math.PI / 2, 0, 0) },
      { key: 'ny', n: new THREE.Vector3(0, -1, 0), rot: new THREE.Euler(Math.PI / 2, 0, 0) },
      { key: 'pz', n: new THREE.Vector3(0, 0, 1), rot: new THREE.Euler(0, 0, 0) },
      { key: 'nz', n: new THREE.Vector3(0, 0, -1), rot: new THREE.Euler(0, Math.PI, 0) },
    ]

    for (let gx = -1; gx <= 1; gx++) {
      for (let gy = -1; gy <= 1; gy++) {
        for (let gz = -1; gz <= 1; gz++) {
          const cubie = new THREE.Mesh(cubieGeo, bodyMat) as unknown as Cubie
          cubie.position.set(gx * STEP, gy * STEP, gz * STEP)
          cubie.userData.gx = gx
          cubie.userData.gy = gy
          cubie.userData.gz = gz
          for (const d of dirs) {
            const onFace =
              (d.key === 'px' && gx === 1) || (d.key === 'nx' && gx === -1) ||
              (d.key === 'py' && gy === 1) || (d.key === 'ny' && gy === -1) ||
              (d.key === 'pz' && gz === 1) || (d.key === 'nz' && gz === -1)
            if (!onFace) continue
            const st = new THREE.Mesh(stickerGeo, stickerMats[d.key])
            st.position.copy(d.n).multiplyScalar(CUBIE / 2 + 0.005)
            st.rotation.copy(d.rot)
            cubie.add(st)
          }
          cubies.push(cubie)
          cubeGroup.add(cubie)
        }
      }
    }

    // --- Partículas orbitando (misma paleta) ---
    const orbGeo = new THREE.BufferGeometry()
    const orbCount = 240
    const orbPos = new Float32Array(orbCount * 3)
    const orbCol = new Float32Array(orbCount * 3)
    const palette = [new THREE.Color('#FF006E'), new THREE.Color('#FF6B00'), new THREE.Color('#FFD700')]
    for (let i = 0; i < orbCount; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 3.4 + Math.random() * 1.4
      orbPos[i * 3] = Math.cos(a) * r
      orbPos[i * 3 + 1] = (Math.random() - 0.5) * 1.8
      orbPos[i * 3 + 2] = Math.sin(a) * r
      const c = palette[Math.floor(Math.random() * palette.length)]
      orbCol[i * 3] = c.r
      orbCol[i * 3 + 1] = c.g
      orbCol[i * 3 + 2] = c.b
    }
    orbGeo.setAttribute('position', new THREE.BufferAttribute(orbPos, 3))
    orbGeo.setAttribute('color', new THREE.BufferAttribute(orbCol, 3))
    const orbMat = new THREE.PointsMaterial({
      size: 0.07, vertexColors: true, transparent: true, opacity: 0.8,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const orbiters = new THREE.Points(orbGeo, orbMat)
    orbiters.rotation.x = 0.42
    scene.add(orbiters)
    disposables.push(orbGeo, orbMat)

    // --- Luces ---
    const pinkL = new THREE.PointLight(0xff006e, 90, 40, 1.8)
    pinkL.position.set(-6, 4, 4)
    scene.add(pinkL)
    const orangeL = new THREE.PointLight(0xff6b00, 70, 40, 1.8)
    orangeL.position.set(6, -3, 3)
    scene.add(orangeL)
    const goldL = new THREE.PointLight(0xffd700, 50, 40, 1.8)
    goldL.position.set(2, 7, -3)
    scene.add(goldL)
    const whiteKey = new THREE.DirectionalLight(0xfff6ea, 1.8)
    whiteKey.position.set(4, 6, 6)
    scene.add(whiteKey)

    // --- Giros reales de capas (el cubo se mezcla solo) ---
    type Axis = 'x' | 'y' | 'z'
    interface Move { axis: Axis; layer: number; dir: 1 | -1 }

    let current: { move: Move; pivot: THREE.Group; t: number; dur: number } | null = null
    let nextMoveAt = 0.9
    const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

    const rotateGrid = (c: Cubie, axis: Axis, s: number) => {
      const { gx, gy, gz } = c.userData
      if (axis === 'x') { c.userData.gy = Math.round(-gz * s); c.userData.gz = Math.round(gy * s) }
      else if (axis === 'y') { c.userData.gx = Math.round(gz * s); c.userData.gz = Math.round(-gx * s) }
      else { c.userData.gx = Math.round(-gy * s); c.userData.gy = Math.round(gx * s) }
    }

    const startMove = (t: number, energy: number) => {
      const axes: Axis[] = ['x', 'y', 'z']
      const move: Move = {
        axis: axes[Math.floor(Math.random() * 3)],
        layer: [-1, 0, 1][Math.floor(Math.random() * 3)],
        dir: Math.random() < 0.5 ? 1 : -1,
      }
      const pv = new THREE.Group()
      cubeGroup.add(pv)
      for (const c of cubies) {
        const coord = move.axis === 'x' ? c.userData.gx : move.axis === 'y' ? c.userData.gy : c.userData.gz
        if (coord === move.layer) pv.attach(c)
      }
      current = { move, pivot: pv, t, dur: Math.max(0.34 - energy * 0.12, 0.18) }
    }

    const endMove = () => {
      if (!current) return
      const { move, pivot: pv } = current
      pv.rotation[move.axis] = move.dir * Math.PI / 2
      pv.updateMatrixWorld(true)
      const kids = [...pv.children] as Cubie[]
      for (const c of kids) {
        rotateGrid(c, move.axis, move.dir)
        cubeGroup.attach(c)
      }
      cubeGroup.remove(pv)
      current = null
    }

    // --- Interacción ---
    let mx = 0, my = 0, tmx = 0, tmy = 0, energy = 0
    let lastX = 0, lastY = 0
    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect()
      tmx = ((e.clientX - r.left) / r.width - 0.5) * 2
      tmy = -((e.clientY - r.top) / r.height - 0.5) * 2
      const v = Math.hypot(e.clientX - lastX, e.clientY - lastY)
      energy = Math.min(energy + v * 0.012, 1.6)
      lastX = e.clientX
      lastY = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const clock = new THREE.Clock()
    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const k = prefersReduced ? 0.25 : 1

      mx += (tmx - mx) * 0.05
      my += (tmy - my) * 0.05
      energy *= 0.94

      // Giros de capas encadenados — más rápidos si el cursor se agita
      if (current) {
        const p = Math.min((t - current.t) / current.dur, 1)
        current.pivot.rotation[current.move.axis] = easeInOut(p) * current.move.dir * Math.PI / 2
        if (p >= 1) {
          endMove()
          nextMoveAt = t + 0.22 / (1 + energy)
        }
      } else if (t >= nextMoveAt) {
        startMove(t, energy)
      }

      // El cubo sigue al cursor y respira
      cubeGroup.position.x += (cubeHomeX + mx * 0.7 - cubeGroup.position.x) * 0.04
      cubeGroup.position.y += (my * 0.55 + Math.sin(t * 0.7 * k) * 0.2 - cubeGroup.position.y) * 0.04
      cubeGroup.rotation.y = 0.6 + t * 0.12 * k + mx * 0.35
      cubeGroup.rotation.x = -0.42 + my * 0.25

      orbiters.rotation.y = t * 0.12 * k
      orbiters.position.x = cubeGroup.position.x
      orbiters.position.y = cubeGroup.position.y

      pinkL.intensity = 90 + Math.sin(t * 2.1) * 25 + energy * 60
      goldL.position.x = 2 + Math.sin(t * 0.4) * 3

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (!w || !h) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      // En pantallas angostas el cubo se centra (tiene su propio bloque arriba del texto)
      cubeHomeX = w < 900 ? 0 : CUBE_HOME_X
      cubeGroup.position.x = cubeHomeX
    }
    onResize()
    const ro = new ResizeObserver(onResize)
    ro.observe(container)

    return () => {
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      disposables.forEach((d) => d.dispose())
      scene.environment?.dispose()
      pmrem.dispose()
      scene.clear()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="ex-liquid"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
