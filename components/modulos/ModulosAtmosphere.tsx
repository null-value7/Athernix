'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ModulosAtmosphere() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 30)

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25))
    container.appendChild(renderer.domElement)

    // Soft dark nebula background
    const bg = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshBasicMaterial({
        color: 0x08000a,
        transparent: true,
        opacity: 0.9,
      })
    )
    bg.position.z = -50
    scene.add(bg)

    const palette = [new THREE.Color(0xff006e), new THREE.Color(0xff6b00), new THREE.Color(0xffd700)]

    // Starfield (fewer stars for fluidity)
    const starCount = 500
    const starGeo = new THREE.BufferGeometry()
    const starPos = new Float32Array(starCount * 3)
    const starCol = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 40 + Math.random() * 90
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPos[i * 3 + 2] = r * Math.cos(phi) - 30
      const c = palette[Math.floor(Math.random() * palette.length)]
      starCol[i * 3] = c.r
      starCol[i * 3 + 1] = c.g
      starCol[i * 3 + 2] = c.b
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3))
    const starMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // Soft orbs (fewer)
    const orbs: THREE.Mesh[] = []
    const orbGeo = new THREE.SphereGeometry(1, 24, 24)
    for (let i = 0; i < 4; i++) {
      const c = palette[i % palette.length]
      const mat = new THREE.MeshBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.05,
        blending: THREE.AdditiveBlending,
      })
      const orb = new THREE.Mesh(orbGeo, mat)
      const s = 4 + Math.random() * 10
      orb.scale.set(s, s, s)
      orb.position.set((Math.random() - 0.5) * 90, (Math.random() - 0.5) * 70, -30 - Math.random() * 50)
      scene.add(orb)
      orbs.push(orb)
    }

    // Lightweight nebula dust ring
    const dustCount = 300
    const dustGeo = new THREE.BufferGeometry()
    const dustPos = new Float32Array(dustCount * 3)
    const dustCol = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 50 + Math.random() * 60
      dustPos[i * 3] = Math.cos(a) * r
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 10
      dustPos[i * 3 + 2] = Math.sin(a) * r - 30
      const c = palette[Math.floor(Math.random() * palette.length)]
      dustCol[i * 3] = c.r
      dustCol[i * 3 + 1] = c.g
      dustCol[i * 3 + 2] = c.b
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustCol, 3))
    const dustMat = new THREE.PointsMaterial({ size: 0.25, vertexColors: true, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    // Mouse parallax
    let mx = 0, my = 0, targetX = 0, targetY = 0
    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2
      targetY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)

    // Scroll parallax
    let scrollProgress = 0
    const onScroll = () => {
      scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight)
    }
    window.addEventListener('scroll', onScroll)

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25))
    }
    window.addEventListener('resize', onResize)

    // Animation
    const clock = new THREE.Clock()
    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const k = prefersReduced ? 0.2 : 1

      mx += (targetX - mx) * 0.04
      my += (targetY - my) * 0.04

      stars.rotation.y = t * 0.02 * k + mx * 0.1 + scrollProgress * Math.PI
      stars.rotation.x = my * 0.05 + scrollProgress * 0.2
      dust.rotation.y = stars.rotation.y * 0.6
      dust.rotation.x = stars.rotation.x * 0.4

      orbs.forEach((orb, i) => {
        orb.position.y += Math.sin(t * 0.3 * k + i) * 0.01
        orb.position.x += Math.cos(t * 0.2 * k + i) * 0.01
      })

      camera.position.x += ((mx * 6) - camera.position.x) * 0.03
      camera.position.y += ((my * 4) - camera.position.y) * 0.03
      camera.lookAt(0, 0, -10)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      renderer.dispose()
      starGeo.dispose(); starMat.dispose(); dustGeo.dispose(); dustMat.dispose(); orbGeo.dispose()
      orbs.forEach(o => { if (o.material instanceof THREE.Material) o.material.dispose() })
    }
  }, [])

  return (
    <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, #0a000c 0%, #030005 100%)' }} />
  )
}
