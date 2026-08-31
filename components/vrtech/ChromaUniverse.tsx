'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ChromaUniverse() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // --- Scene ---
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.2))
    const redLight = new THREE.PointLight(0xff2a5f, 6, 15)
    redLight.position.set(-5, 3, 2)
    scene.add(redLight)
    const yellowLight = new THREE.PointLight(0xffd000, 6, 15)
    yellowLight.position.set(5, -3, 2)
    scene.add(yellowLight)
    const orangeSpot = new THREE.SpotLight(0xff6600, 8)
    orangeSpot.position.set(0, 8, 4)
    orangeSpot.angle = Math.PI / 5
    orangeSpot.penumbra = 0.8
    scene.add(orangeSpot)

    const colorRed = new THREE.Color(0xff2a5f)
    const colorYellow = new THREE.Color(0xffd000)
    const colorOrange = new THREE.Color(0xff6600)

    // --- 1. Node Network ---
    const networkGroup = new THREE.Group()
    scene.add(networkGroup)

    const nodeCount = 80
    const nodePositions: THREE.Vector3[] = []
    const nodeGeo = new THREE.SphereGeometry(0.04, 12, 12)
    const mats = [
      new THREE.MeshStandardMaterial({ color: colorRed, emissive: colorRed, emissiveIntensity: 0.8, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: colorYellow, emissive: colorYellow, emissiveIntensity: 0.8, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: colorOrange, emissive: colorOrange, emissiveIntensity: 0.8, roughness: 0.2 }),
    ]

    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.5 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      nodePositions.push(new THREE.Vector3(x, y, z))

      const mesh = new THREE.Mesh(nodeGeo, mats[i % mats.length])
      mesh.position.set(x, y, z)
      networkGroup.add(mesh)
    }

    const linePositions: number[] = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 1.4) {
          linePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z)
          linePositions.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z)
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    const lineMat = new THREE.LineBasicMaterial({ color: 0xff6600, transparent: true, opacity: 0.25 })
    networkGroup.add(new THREE.LineSegments(lineGeo, lineMat))

    // --- 2. Avatar ---
    const avatarGroup = new THREE.Group()
    scene.add(avatarGroup)

    const headMat = new THREE.MeshStandardMaterial({
      color: 0x101015, metalness: 0.9, roughness: 0.1, emissive: colorRed, emissiveIntensity: 0.3,
    })
    const avatarHead = new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 3), headMat)
    avatarGroup.add(avatarHead)

    const wireShell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.75, 2),
      new THREE.MeshBasicMaterial({ color: colorYellow, wireframe: true, transparent: true, opacity: 0.4 })
    )
    avatarGroup.add(wireShell)

    const leftHand = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 1), mats[2])
    leftHand.position.set(-1.1, -0.3, 0.4)
    const rightHand = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 1), mats[1])
    rightHand.position.set(1.1, -0.3, 0.4)
    avatarGroup.add(leftHand, rightHand)

    // --- 3. Assembly ---
    const assemblyGroup = new THREE.Group()
    scene.add(assemblyGroup)

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.03, 16, 64), mats[0])
    assemblyGroup.add(ring1)
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.03, 16, 64), mats[1])
    ring2.rotation.x = Math.PI / 3
    assemblyGroup.add(ring2)
    const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.45, 2), mats[2])
    assemblyGroup.add(crystal)

    const cubeGroup = new THREE.Group()
    const cubeGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12)
    for (let k = 0; k < 12; k++) {
      const angle = (k / 12) * Math.PI * 2
      const cube = new THREE.Mesh(cubeGeo, k % 2 === 0 ? mats[0] : mats[1])
      cube.position.set(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, (Math.random() - 0.5) * 0.5)
      cubeGroup.add(cube)
    }
    assemblyGroup.add(cubeGroup)

    let currentAssemblyFactor = 0
    const setAssemblyFactor = (factor: number) => {
      currentAssemblyFactor = factor
      ring1.position.z = factor * 2.2
      ring2.position.y = factor * 1.1
      crystal.position.z = -factor * 1.76
      cubeGroup.position.z = factor * 1.5
      cubeGroup.scale.setScalar(1 + factor * 0.6)
    }

    // --- 4. Portal ---
    const portalGroup = new THREE.Group()
    portalGroup.position.z = -6
    scene.add(portalGroup)

    const portalRings: THREE.Mesh[] = []
    for (let r = 0; r < 7; r++) {
      const c = r % 3 === 0 ? colorRed : r % 3 === 1 ? colorYellow : colorOrange
      const mat = new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.9, roughness: 0.1 })
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.5 + r * 0.4, 0.025, 16, 64), mat)
      ring.position.z = -r * 1.2
      portalGroup.add(ring)
      portalRings.push(ring)
    }

    // --- 5. Dust ---
    const pCount = 350
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 12
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const dust = new THREE.Points(pGeo, new THREE.PointsMaterial({
      color: 0xffd000, size: 0.035, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending,
    }))
    scene.add(dust)

    // --- Mouse parallax ---
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0
    const onMove = (e: MouseEvent) => {
      targetX = e.clientX / window.innerWidth - 0.5
      targetY = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('mousemove', onMove)

    // --- Scroll timeline ---
    const scrollState = { rotX: 0, rotY: 0, assembly: 0 }
    const masterTl = gsap.timeline({
      scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: 1.2 },
    })

    // Hero (0-0.15)
    masterTl.to(scrollState, { rotY: Math.PI * 2 }, 0)

    // Pipeline/story (0.15-0.35)
    masterTl.to(camera.position, { x: 0, y: 0, z: 5.5 }, 0.15)

    // Anatomy/avatar (0.35-0.55)
    masterTl.to(camera.position, { x: 0, y: -0.1, z: 1.6 }, 0.35)

    // Headsets/assembly (0.55-0.75)
    masterTl.to(camera.position, { x: 0, y: 0, z: 4.8 }, 0.55)
    masterTl.to(scrollState, { assembly: 1 }, 0.57)

    // CTA/portal (0.75-0.90)
    masterTl.to(camera.position, { x: 0, y: 0, z: -4.8 }, 0.75)

    // End (0.90-1.00)
    masterTl.to(camera.position, { x: 0, y: -0.2, z: -5.2 }, 0.90)

    // --- Resize ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', onResize)

    // --- Animation loop ---
    const clock = new THREE.Clock()
    let raf = 0

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const k = prefersReduced ? 0.2 : 1

      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      setAssemblyFactor(scrollState.assembly)

      networkGroup.rotation.y = scrollState.rotY + mouseX * 0.4
      networkGroup.rotation.x = scrollState.rotX + mouseY * 0.3

      avatarGroup.rotation.y = mouseX * 0.5
      avatarGroup.rotation.x = mouseY * 0.4

      leftHand.position.y = -0.3 + Math.sin(t * 1.5) * 0.08
      rightHand.position.y = -0.3 + Math.cos(t * 1.5) * 0.08

      ring1.rotation.z = t * 0.2 * k
      ring2.rotation.z = -t * 0.25 * k
      crystal.rotation.y = t * 0.4 * k
      cubeGroup.rotation.z = t * 0.1 * k

      portalRings.forEach((ring, idx) => { ring.rotation.z = t * (0.1 + idx * 0.05) })
      dust.rotation.y = t * 0.02

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      renderer.dispose()
      nodeGeo.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      mats.forEach(m => m.dispose())
      headMat.dispose()
      wireShell.material.dispose()
      ;(wireShell.geometry as THREE.BufferGeometry).dispose()
      avatarHead.geometry.dispose()
      ring1.geometry.dispose()
      ring2.geometry.dispose()
      crystal.geometry.dispose()
      cubeGeo.dispose()
      portalRings.forEach(r => { r.geometry.dispose(); (r.material as THREE.Material).dispose() })
      pGeo.dispose()
      ScrollTrigger.getAll().forEach(st => { if (st.vars.trigger === undefined) st.kill() })
    }
  }, [])

  return (
    <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, #0a000c 0%, #050008 100%)' }} />
  )
}
