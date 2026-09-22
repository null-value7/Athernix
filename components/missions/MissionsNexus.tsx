'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function MissionsNexus() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x08030a, 0.02)

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 18)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.25))
    const pinkL = new THREE.PointLight(0xff006e, 2.5, 60)
    pinkL.position.set(-12, 8, 8)
    scene.add(pinkL)
    const orangeL = new THREE.PointLight(0xff6b00, 2.5, 60)
    orangeL.position.set(12, -8, 8)
    scene.add(orangeL)
    const yellowL = new THREE.PointLight(0xffd700, 2.2, 60)
    yellowL.position.set(0, 14, -10)
    scene.add(yellowL)
    const greenL = new THREE.PointLight(0x00e5a0, 2.2, 60)
    greenL.position.set(0, -14, -5)
    scene.add(greenL)

    const palette = [0xff006e, 0xff6b00, 0xffd700, 0x00e5a0]
    const paletteColors = palette.map(c => new THREE.Color(c))

    // --- Central Nexus Crystal ---
    const nexusGroup = new THREE.Group()
    scene.add(nexusGroup)

    const crystalGeo = new THREE.IcosahedronGeometry(1.2, 2)
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xff6b00,
      emissiveIntensity: 0.35,
      metalness: 0.8,
      roughness: 0.15,
      transparent: true,
      opacity: 0.92,
    })
    const crystal = new THREE.Mesh(crystalGeo, crystalMat)
    nexusGroup.add(crystal)

    const wireGeo = new THREE.IcosahedronGeometry(1.35, 1)
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xffd700, wireframe: true, transparent: true, opacity: 0.25 })
    const wire = new THREE.Mesh(wireGeo, wireMat)
    nexusGroup.add(wire)

    // --- Orbiting rings ---
    const rings: THREE.Mesh[] = []
    for (let i = 0; i < 4; i++) {
      const c = palette[i]
      const r = 2.4 + i * 0.9
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.035, 16, 80),
        new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.8, transparent: true, opacity: 0.75 })
      )
      ring.rotation.x = Math.random() * Math.PI
      ring.rotation.y = Math.random() * Math.PI
      nexusGroup.add(ring)
      rings.push(ring)
    }

    // --- Constellation of mission nodes ---
    const nodeCount = 55
    const nodeGroup = new THREE.Group()
    scene.add(nodeGroup)

    const nodePositions: THREE.Vector3[] = []
    const nodeGeo = new THREE.SphereGeometry(0.06, 10, 10)
    const nodeMeshes: THREE.Mesh[] = []

    for (let i = 0; i < nodeCount; i++) {
      const color = palette[i % palette.length]
      const mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.9, roughness: 0.2 })
      const mesh = new THREE.Mesh(nodeGeo, mat)

      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = 5 + Math.random() * 10
      const pos = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )
      nodePositions.push(pos)
      mesh.position.copy(pos)
      nodeGroup.add(mesh)
      nodeMeshes.push(mesh)
    }

    const linePositions: number[] = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 3.5) {
          linePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z)
          linePositions.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z)
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 })
    const constellation = new THREE.LineSegments(lineGeo, lineMat)
    nodeGroup.add(constellation)

    // --- Dust field ---
    const dustCount = 500
    const dustGeo = new THREE.BufferGeometry()
    const dustPos = new Float32Array(dustCount * 3)
    const dustCol = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 45
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 45
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 45
      const c = paletteColors[Math.floor(Math.random() * paletteColors.length)]
      dustCol[i * 3] = c.r
      dustCol[i * 3 + 1] = c.g
      dustCol[i * 3 + 2] = c.b
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustCol, 3))
    const dustMat = new THREE.PointsMaterial({ size: 0.12, vertexColors: true, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    // --- Mouse parallax ---
    let mx = 0, my = 0, targetX = 0, targetY = 0
    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2
      targetY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)

    // --- Resize ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', onResize)

    // --- Animation ---
    const clock = new THREE.Clock()
    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const k = prefersReduced ? 0.2 : 1

      mx += (targetX - mx) * 0.04
      my += (targetY - my) * 0.04

      nexusGroup.rotation.y = t * 0.15 * k
      nexusGroup.rotation.x = Math.sin(t * 0.1) * 0.2 * k

      crystal.rotation.y = t * 0.25 * k
      crystal.rotation.z = t * 0.12 * k
      wire.rotation.y = -t * 0.2 * k
      wire.rotation.x = t * 0.1 * k

      rings.forEach((ring, i) => {
        ring.rotation.x += 0.003 * k * (i % 2 === 0 ? 1 : -1)
        ring.rotation.y += 0.004 * k * (i % 2 === 0 ? 1 : -1)
      })

      nodeMeshes.forEach((mesh, i) => {
        const a = t * 0.05 * k + i * 0.4
        const r = 8 + (i % 5) * 2.2
        mesh.position.x = nodePositions[i].x + Math.cos(a) * 0.6
        mesh.position.y = nodePositions[i].y + Math.sin(a) * 0.6
        mesh.position.z = nodePositions[i].z + Math.sin(a * 0.7) * 0.4
      })

      nodeGroup.rotation.y = t * 0.03 * k + mx * 0.1
      nodeGroup.rotation.x = my * 0.08

      dust.rotation.y = t * 0.015 * k
      dust.rotation.x = my * 0.05

      pinkL.position.x = Math.sin(t * 0.2 * k) * 14
      pinkL.position.y = Math.cos(t * 0.15 * k) * 10
      orangeL.position.x = Math.cos(t * 0.18 * k) * 12
      yellowL.position.z = Math.sin(t * 0.22 * k) * 10

      const targetCamX = mx * 8
      const targetCamY = my * 6
      camera.position.x += (targetCamX - camera.position.x) * 0.04
      camera.position.y += (targetCamY - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      renderer.dispose()
      crystalGeo.dispose(); crystalMat.dispose()
      wireGeo.dispose(); wireMat.dispose()
      rings.forEach(r => { r.geometry.dispose(); if (r.material instanceof THREE.Material) r.material.dispose() })
      nodeGeo.dispose(); lineGeo.dispose(); lineMat.dispose()
      nodeMeshes.forEach(m => { if (m.material instanceof THREE.Material) m.material.dispose() })
      dustGeo.dispose(); dustMat.dispose()
    }
  }, [])

  return (
    <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, #0d050c 0%, #050208 100%)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 20%, rgba(255,0,110,0.08) 0%, transparent 45%), radial-gradient(ellipse at 20% 80%, rgba(0,229,160,0.06) 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 100%)' }} />
    </div>
  )
}
