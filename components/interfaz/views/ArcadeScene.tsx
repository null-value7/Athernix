import { Float, RoundedBox, Sparkles, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import { Canvas, type ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import type { Game } from '../models/gameCatalog'

interface ArcadeSceneProps {
  games: readonly Game[]
  activeGameId: string
  onSelect: (game: Game) => void
  onStep: (direction: 1 | -1) => void
  isLaunching?: boolean
}

const palette = {
  red: '#e52b27',
  orange: '#ff6b19',
  yellow: '#ffc928',
  ink: '#180706',
  cyan: '#00e5a0',
}

function damp(current: number, target: number, smoothing: number, delta: number) {
  return THREE.MathUtils.damp(current, target, smoothing, delta)
}

function circularDistance(index: number, activeIndex: number, length: number) {
  const distance = index - activeIndex
  if (distance > length / 2) return distance - length
  if (distance < -length / 2) return distance + length
  return distance
}

/* ═══════════════════════════════════════════════════════
   THEMATIC BACKGROUND GLOW SHAPES
   ═══════════════════════════════════════════════════════ */
const zenGlowShape = new THREE.Shape()
// Abstract Tree silhouette
zenGlowShape.moveTo(-0.4, -2.5)
zenGlowShape.lineTo(0.4, -2.5)
zenGlowShape.lineTo(0.3, -1.0)
zenGlowShape.quadraticCurveTo(2.0, -1.0, 2.4, -0.2)
zenGlowShape.bezierCurveTo(3.2, 0.5, 2.5, 2.5, 1.2, 2.5)
zenGlowShape.bezierCurveTo(1.5, 4.0, -1.5, 4.0, -1.2, 2.5)
zenGlowShape.bezierCurveTo(-2.5, 2.5, -3.2, 0.5, -2.4, -0.2)
zenGlowShape.quadraticCurveTo(-2.0, -1.0, -0.3, -1.0)
zenGlowShape.lineTo(-0.4, -2.5)

const mundiGlowShape = new THREE.Shape()
// Globe with stand silhouette
mundiGlowShape.moveTo(-1.2, -2.6)
mundiGlowShape.lineTo(1.2, -2.6)
mundiGlowShape.lineTo(0.8, -2.2)
mundiGlowShape.lineTo(0.3, -2.2)
mundiGlowShape.lineTo(0.3, -1.5)
mundiGlowShape.lineTo(1.8, -1.5)
mundiGlowShape.lineTo(2.0, -1.1)
mundiGlowShape.absarc(0, 0.4, 2.2, -Math.PI/4, Math.PI + Math.PI/4, false)
mundiGlowShape.lineTo(-2.0, -1.1)
mundiGlowShape.lineTo(-1.8, -1.5)
mundiGlowShape.lineTo(-0.3, -1.5)
mundiGlowShape.lineTo(-0.3, -2.2)
mundiGlowShape.lineTo(-0.8, -2.2)
mundiGlowShape.lineTo(-1.2, -2.6)

const ondillaGlowShape = new THREE.Shape()
// Open Book silhouette
ondillaGlowShape.moveTo(0, -1.2)
ondillaGlowShape.quadraticCurveTo(1.5, -1.6, 2.8, -1.0)
ondillaGlowShape.lineTo(2.6, 2.0)
ondillaGlowShape.quadraticCurveTo(1.5, 1.4, 0, 1.8)
ondillaGlowShape.quadraticCurveTo(-1.5, 1.4, -2.6, 2.0)
ondillaGlowShape.lineTo(-2.8, -1.0)
ondillaGlowShape.quadraticCurveTo(-1.5, -1.6, 0, -1.2)

/* ═══════════════════════════════════════════════════════
   Camera parallax
   ═══════════════════════════════════════════════════════ */
function CameraRig({ isLaunching }: { isLaunching?: boolean }) {
  const { camera, pointer } = useThree()
  const blend = useRef(0)

  useFrame((state, delta) => {
    const cam = camera as THREE.PerspectiveCamera
    const t = state.clock.elapsedTime
    blend.current = damp(blend.current, isLaunching ? 1 : 0, 3.6, delta)
    const b = blend.current
    const shake = b * b * 0.09

    cam.position.x = damp(cam.position.x, pointer.x * 0.65 * (1 - b), 2.8, delta) + Math.sin(t * 41) * shake
    cam.position.y = damp(cam.position.y, (0.3 + pointer.y * 0.22) * (1 - b) + 0.05 * b, 2.8, delta) + Math.cos(t * 37) * shake * 0.7
    cam.position.z = damp(cam.position.z, 11.5 - b * 5, 2.4, delta)
    cam.fov = damp(cam.fov, 38 + b * 17, 3, delta)
    cam.updateProjectionMatrix()
    cam.lookAt(0, 0.1, 0)
  })

  return null
}

/* ═══════════════════════════════════════════════════════
   Animated floor with energy rings
   ═══════════════════════════════════════════════════════ */
function EmberFloor() {
  const ringRef = useRef<THREE.Mesh>(null)
  const gridRef = useRef<THREE.Group>(null)
  const pulseRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.07
    if (gridRef.current) gridRef.current.rotation.z -= delta * 0.018
    if (pulseRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.15
      pulseRef.current.scale.set(s, s, 1)
      ;(pulseRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.12 + Math.sin(state.clock.elapsedTime * 1.2) * 0.08
    }
  })

  return (
    <group position={[0, -2.15, -2.8]} rotation={[-Math.PI / 2.2, 0, 0]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[4.8, 0.028, 8, 96]} />
        <meshBasicMaterial color={palette.orange} transparent opacity={0.55} />
      </mesh>
      {/* Pulse ring */}
      <mesh ref={pulseRef}>
        <ringGeometry args={[3.2, 3.25, 64]} />
        <meshBasicMaterial color={palette.yellow} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      <group ref={gridRef}>
        {[...Array(5)].map((_, index) => (
          <mesh key={`ring-${index}`} rotation={[0, 0, (index * Math.PI) / 5]}>
            <torusGeometry args={[2.2 + index * 0.7, 0.012, 6, 72, Math.PI * 0.78]} />
            <meshBasicMaterial
              color={index % 3 === 0 ? palette.yellow : index % 3 === 1 ? palette.red : palette.orange}
              transparent
              opacity={0.18}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   ZEN PREVIEW — Bonsai garden with petals, water & fireflies
   ═══════════════════════════════════════════════════════ */
function ZenPreview() {
  const groupRef = useRef<THREE.Group>(null)
  const petalsRef = useRef<THREE.Group>(null)
  const waterRef = useRef<THREE.Mesh>(null)
  const firefliesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) groupRef.current.rotation.y = t * 0.2

    // Floating petals
    if (petalsRef.current) {
      petalsRef.current.children.forEach((petal, i) => {
        const speed = 0.5 + i * 0.15
        petal.position.x = Math.sin(t * speed + i * 2) * 0.5
        petal.position.y = 0.3 + ((t * 0.2 + i * 0.3) % 1.2) - 0.1
        petal.position.z = Math.cos(t * speed * 0.7 + i) * 0.4
        petal.rotation.x = t * 2 + i
        petal.rotation.z = t * 1.5 + i
      })
    }

    // Water shimmer
    if (waterRef.current) {
      const mat = waterRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.18 + Math.sin(t * 2) * 0.06
    }

    // Fireflies
    if (firefliesRef.current) {
      firefliesRef.current.children.forEach((fly, i) => {
        fly.position.x = Math.sin(t * 0.8 + i * 1.7) * 0.65
        fly.position.y = 0.25 + Math.sin(t * 1.2 + i * 2.5) * 0.35
        fly.position.z = Math.cos(t * 0.9 + i * 1.3) * 0.55
        const s = 0.6 + Math.sin(t * 4 + i * 3) * 0.4
        fly.scale.set(s, s, s)
      })
    }
  })

  return (
    <group ref={groupRef} position={[0, 0.15, 0.12]} scale={0.6}>
      {/* Rock base */}
      <mesh position={[0, -0.4, 0]}>
        <dodecahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial color="#3a3025" roughness={0.95} metalness={0.1} />
      </mesh>
      {/* Trunk — curved */}
      <mesh position={[0, -0.1, 0]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.04, 0.08, 0.5, 8]} />
        <meshStandardMaterial color="#5a3a1a" roughness={0.85} />
      </mesh>
      <mesh position={[0.06, 0.1, 0]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.03, 0.05, 0.35, 8]} />
        <meshStandardMaterial color="#4a2810" roughness={0.85} />
      </mesh>
      {/* Canopy layers */}
      <mesh position={[-0.05, 0.35, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <MeshDistortMaterial color="#00d98b" speed={1.8} distort={0.25} opacity={0.8} transparent />
      </mesh>
      <mesh position={[0.12, 0.48, 0.05]}>
        <sphereGeometry args={[0.22, 14, 14]} />
        <MeshDistortMaterial color="#00e5a0" speed={2.2} distort={0.3} opacity={0.75} transparent />
      </mesh>
      <mesh position={[-0.15, 0.52, -0.05]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <MeshDistortMaterial color="#4ade80" speed={2} distort={0.2} opacity={0.7} transparent />
      </mesh>
      {/* Falling petals */}
      <group ref={petalsRef}>
        {[...Array(8)].map((_, i) => (
          <mesh key={i}>
            <planeGeometry args={[0.04, 0.025]} />
            <meshBasicMaterial color={i % 2 === 0 ? '#ffb7c5' : '#ff8fab'} transparent opacity={0.9} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
      {/* Water pool */}
      <mesh ref={waterRef} position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.6, 32]} />
        <meshBasicMaterial color="#00c9ff" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
      {/* Water ripple rings */}
      {[0.25, 0.4, 0.55].map((r, i) => (
        <mesh key={i} position={[0, -0.54, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.01, r, 32]} />
          <meshBasicMaterial color="#00e5a0" transparent opacity={0.12 - i * 0.03} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* Fireflies */}
      <group ref={firefliesRef}>
        {[...Array(10)].map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshBasicMaterial color={i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#00e5a0' : '#00c9ff'} />
          </mesh>
        ))}
      </group>
      {/* Ambient light */}
      <pointLight position={[0, 0.3, 0.3]} intensity={2} distance={1.5} color="#00e5a0" />
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   MUNDI PREVIEW — Planet with continents, clouds & aurora
   ═══════════════════════════════════════════════════════ */
function MundiPreview() {
  const planetRef = useRef<THREE.Group>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)
  const auroraRef = useRef<THREE.Mesh>(null)
  const nodesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (planetRef.current) planetRef.current.rotation.y = t * 0.25
    if (cloudsRef.current) cloudsRef.current.rotation.y = t * 0.35
    if (ring1Ref.current) { ring1Ref.current.rotation.z = t * 0.5; ring1Ref.current.rotation.x = Math.sin(t * 0.3) * 0.1 + 1.1 }
    if (ring2Ref.current) { ring2Ref.current.rotation.z = -t * 0.3; ring2Ref.current.rotation.x = Math.cos(t * 0.4) * 0.1 + 0.8 }
    if (ring3Ref.current) { ring3Ref.current.rotation.z = t * 0.2; ring3Ref.current.rotation.y = t * 0.15 }
    if (auroraRef.current) {
      const mat = auroraRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.15 + Math.sin(t * 1.5) * 0.08
    }
    if (nodesRef.current) {
      nodesRef.current.children.forEach((node, i) => {
        const angle = t * 0.6 + (i * Math.PI * 2) / 8
        const r = 0.58
        node.position.x = Math.cos(angle) * r * Math.cos(i * 0.5)
        node.position.y = Math.sin(angle) * r * 0.7
        node.position.z = Math.sin(angle) * r * Math.sin(i * 0.5)
        const s = 0.7 + Math.sin(t * 3 + i * 2) * 0.3
        node.scale.set(s, s, s)
      })
    }
  })

  return (
    <group position={[0, 0.3, 0.12]} scale={0.55}>
      <group ref={planetRef}>
        {/* Planet core */}
        <mesh>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshStandardMaterial color="#0a1628" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Continents / terrain patches */}
        {[...Array(18)].map((_, i) => {
          const phi = Math.acos(2 * (i / 18) - 1)
          const theta = Math.PI * (1 + Math.sqrt(5)) * i
          const r = 0.385
          return (
            <mesh key={i} position={[
              r * Math.sin(phi) * Math.cos(theta),
              r * Math.cos(phi),
              r * Math.sin(phi) * Math.sin(theta),
            ]}>
              <sphereGeometry args={[0.05 + (i % 3) * 0.02, 6, 6]} />
              <meshBasicMaterial color={i % 3 === 0 ? '#ff6b19' : i % 3 === 1 ? '#ffc928' : '#ff5b2d'} transparent opacity={0.8} />
            </mesh>
          )
        })}
      </group>
      {/* Cloud layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[0.42, 20, 20]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.06} wireframe />
      </mesh>
      {/* Aurora band */}
      <mesh ref={auroraRef} position={[0, 0.15, 0]} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[0.44, 0.06, 8, 32, Math.PI]} />
        <meshBasicMaterial color="#00e5a0" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[0.46, 24, 24]} />
        <meshBasicMaterial color="#ff6b19" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      {/* Ring 1 — thick */}
      <mesh ref={ring1Ref} rotation={[1.1, 0, 0]}>
        <torusGeometry args={[0.58, 0.018, 8, 64]} />
        <meshBasicMaterial color={palette.orange} transparent opacity={0.7} />
      </mesh>
      {/* Ring 2 — thin */}
      <mesh ref={ring2Ref} rotation={[0.8, 0.4, 0]}>
        <torusGeometry args={[0.68, 0.008, 8, 64]} />
        <meshBasicMaterial color="#FF006E" transparent opacity={0.45} />
      </mesh>
      {/* Ring 3 — outer dashed */}
      <mesh ref={ring3Ref} rotation={[1.4, 0.2, 0.5]}>
        <torusGeometry args={[0.8, 0.005, 8, 32]} />
        <meshBasicMaterial color={palette.yellow} transparent opacity={0.3} />
      </mesh>
      {/* Orbiting node network */}
      <group ref={nodesRef}>
        {[...Array(8)].map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color={i % 2 === 0 ? palette.yellow : '#00e5a0'} />
          </mesh>
        ))}
      </group>
      {/* Inner glow */}
      <pointLight position={[0, 0, 0]} intensity={3} distance={1.2} color="#ff6b19" />
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   ONDILLA PREVIEW — Knowledge portal with DNA helix & symbols
   ═══════════════════════════════════════════════════════ */
function OndillaPreview() {
  const groupRef = useRef<THREE.Group>(null)
  const helixRef = useRef<THREE.Group>(null)
  const symbolsRef = useRef<THREE.Group>(null)
  const portalRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.25

    // DNA helix rotation
    if (helixRef.current) {
      helixRef.current.rotation.y = t * 0.8
      helixRef.current.children.forEach((child, i) => {
        child.position.y = -0.4 + (i * 0.08)
        const angle = t * 2 + i * 0.6
        const strand = i % 2 === 0 ? 1 : -1
        child.position.x = Math.sin(angle) * 0.15 * strand
        child.position.z = Math.cos(angle) * 0.15 * strand
      })
    }

    // Orbiting subject symbols
    if (symbolsRef.current) {
      symbolsRef.current.children.forEach((child, i) => {
        const angle = t * 0.5 + (i * Math.PI * 2) / 6
        const r = 0.5
        child.position.x = Math.cos(angle) * r
        child.position.z = Math.sin(angle) * r
        child.position.y = 0.15 + Math.sin(t * 1.5 + i * 1.5) * 0.15
        child.rotation.x = t * 1.5 + i
        child.rotation.y = t * 1.2 + i
      })
    }

    // Portal pulse
    if (portalRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.08
      portalRef.current.scale.set(s, s, s)
      const mat = portalRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.12 + Math.sin(t * 3) * 0.06
    }
  })

  return (
    <group ref={groupRef} position={[0, 0.2, 0.12]} scale={0.6}>
      {/* Portal ring */}
      <mesh ref={portalRef}>
        <torusGeometry args={[0.55, 0.025, 16, 48]} />
        <meshBasicMaterial color={palette.yellow} transparent opacity={0.15} />
      </mesh>
      {/* Portal inner glow */}
      <mesh>
        <circleGeometry args={[0.52, 32]} />
        <meshBasicMaterial color={palette.red} transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
      {/* Energy arcs */}
      {[0, Math.PI / 3, (Math.PI * 2) / 3, Math.PI, (Math.PI * 4) / 3, (Math.PI * 5) / 3].map((rot, i) => (
        <mesh key={i} rotation={[0, 0, rot]}>
          <torusGeometry args={[0.55, 0.008, 8, 32, Math.PI * 0.3]} />
          <meshBasicMaterial color={i % 2 === 0 ? palette.yellow : palette.orange} transparent opacity={0.35} />
        </mesh>
      ))}
      {/* DNA helix */}
      <group ref={helixRef}>
        {[...Array(12)].map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshBasicMaterial color={i % 3 === 0 ? palette.red : i % 3 === 1 ? palette.yellow : palette.orange} transparent opacity={0.9} />
          </mesh>
        ))}
      </group>
      {/* Subject symbols orbiting */}
      <group ref={symbolsRef}>
        {/* Math — icosahedron */}
        <mesh>
          <icosahedronGeometry args={[0.06, 0]} />
          <meshStandardMaterial color={palette.yellow} metalness={0.6} roughness={0.2} />
        </mesh>
        {/* Science — octahedron */}
        <mesh>
          <octahedronGeometry args={[0.055, 0]} />
          <meshStandardMaterial color={palette.orange} metalness={0.6} roughness={0.2} />
        </mesh>
        {/* Language — torus knot */}
        <mesh>
          <torusKnotGeometry args={[0.035, 0.012, 32, 8]} />
          <meshStandardMaterial color={palette.red} metalness={0.6} roughness={0.2} />
        </mesh>
        {/* Social — dodecahedron */}
        <mesh>
          <dodecahedronGeometry args={[0.05, 0]} />
          <meshStandardMaterial color="#FF9F1C" metalness={0.6} roughness={0.2} />
        </mesh>
        {/* History — tetrahedron */}
        <mesh>
          <tetrahedronGeometry args={[0.06, 0]} />
          <meshStandardMaterial color="#e52b27" metalness={0.6} roughness={0.2} />
        </mesh>
        {/* Art — cone */}
        <mesh>
          <coneGeometry args={[0.04, 0.08, 5]} />
          <meshStandardMaterial color="#ffc928" metalness={0.6} roughness={0.2} />
        </mesh>
      </group>
      {/* Central glow */}
      <pointLight position={[0, 0, 0.1]} intensity={3} distance={1.5} color={palette.yellow} />
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   Experience preview dispatcher
   ═══════════════════════════════════════════════════════ */
function ExperiencePreview({ gameId }: { gameId: string }) {
  switch (gameId) {
    case 'zen':
      return <ZenPreview />
    case 'mundi':
      return <MundiPreview />
    case 'ondilla3':
      return <OndillaPreview />
    default:
      return null
  }
}

/* ═══════════════════════════════════════════════════════
   Holographic scan line on active card
   ═══════════════════════════════════════════════════════ */
function ScanLine({ isActive, accent }: { isActive: boolean; accent: string }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current || !isActive) return
    const y = Math.sin(state.clock.elapsedTime * 2) * 1.3
    ref.current.position.y = y
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.15
  })

  if (!isActive) return null

  return (
    <mesh ref={ref} position={[0, 0, 0.14]}>
      <planeGeometry args={[2.1, 0.015]} />
      <meshBasicMaterial color={accent} transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  )
}

/* ═══════════════════════════════════════════════════════
   Edge glow (holographic border)
   ═══════════════════════════════════════════════════════ */
function EdgeGlow({ isActive, accent }: { isActive: boolean; accent: string }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const mat = ref.current.material as THREE.MeshBasicMaterial
    const targetOp = isActive ? 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.2 : 0.08
    mat.opacity += (targetOp - mat.opacity) * 0.1
  })

  return (
    <mesh ref={ref} position={[0, 0, 0.095]}>
      <ringGeometry args={[1.46, 1.5, 4]} />
      <meshBasicMaterial color={accent} transparent opacity={0.08} side={THREE.DoubleSide} />
    </mesh>
  )
}

/* ═══════════════════════════════════════════════════════
   THEMATIC CARD SHAPES (PREMIUM / PROFESSIONAL)
   ═══════════════════════════════════════════════════════ */
function ThematicCardBody({ gameId, isActive }: { gameId: string, isActive: boolean }) {
  const t = useFrame((state) => state.clock.elapsedTime)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle idle breathing for the sculptural bodies
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.02
    }
  })
  
  if (gameId === 'zen') {
    return (
      <group ref={groupRef}>
        {/* Abstract Cyber-Bonsai / Glowing Vines wrapping a dark monolith */}
        
        {/* Twisted ancient roots/vines (TorusKnot) */}
        <mesh position={[-0.8, -1.2, -0.2]} rotation={[0.5, 0.2, 0.8]}>
          <torusKnotGeometry args={[0.6, 0.15, 128, 16]} />
          <meshStandardMaterial color="#022c22" metalness={0.8} roughness={0.2} />
        </mesh>
        
        <mesh position={[1.0, -1.5, 0.1]} rotation={[-0.5, 0.1, -0.4]}>
          <torusKnotGeometry args={[0.4, 0.08, 100, 16]} />
          <meshStandardMaterial color="#064e3b" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Elegant Abstract Foliage (Crystal/Glass Spheres) */}
        <mesh position={[1.2, 1.3, -0.2]}>
          <sphereGeometry args={[1.1, 32, 32]} />
          <meshPhysicalMaterial transmission={0.9} opacity={1} transparent roughness={0.1} thickness={1.5} color="#34d399" clearcoat={1} />
        </mesh>
        <mesh position={[-0.8, 1.6, -0.3]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshPhysicalMaterial transmission={0.9} opacity={1} transparent roughness={0.2} thickness={1} color="#059669" clearcoat={1} />
        </mesh>
        
        {/* Glowing inner energy cores for foliage */}
        <mesh position={[1.2, 1.3, -0.2]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="#a7f3d0" transparent opacity={0.6} />
        </mesh>

        {/* The Monolith Core (Card Slate) */}
        <RoundedBox args={[2.3, 3.3, 0.08]} radius={0.12} position={[0, 0, 0.05]} smoothness={8}>
          <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.1} />
        </RoundedBox>
      </group>
    )
  }

  if (gameId === 'mundi') {
    return (
      <group ref={groupRef}>
        {/* High-End Astrolabe / Holographic Globe */}
        
        {/* Outer Metallic Ring */}
        <mesh rotation={[1.2, 0.5, 0]}>
          <torusGeometry args={[1.9, 0.03, 32, 100]} />
          <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.1} />
        </mesh>
        
        {/* Inner Emissive Ring */}
        <mesh rotation={[-0.5, -0.8, 0]}>
          <torusGeometry args={[1.75, 0.02, 32, 100]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>

        {/* Meridian Wireframes */}
        <mesh rotation={[0, 1.57, 0]}>
          <torusGeometry args={[1.65, 0.01, 16, 64]} />
          <meshBasicMaterial color="#ea580c" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[1.57, 0, 0]}>
          <torusGeometry args={[1.65, 0.01, 16, 64]} />
          <meshBasicMaterial color="#ea580c" transparent opacity={0.5} />
        </mesh>
        
        {/* Core Dark Matter Planet (Glassy) */}
        <mesh position={[0, 0, -0.2]}>
          <sphereGeometry args={[1.65, 64, 64]} />
          <meshPhysicalMaterial transmission={0.8} opacity={1} transparent roughness={0.1} thickness={2} color="#0f172a" metalness={0.5} clearcoat={1} />
        </mesh>
        
        {/* Flattened front panel for UI projection (Obsidian finish) */}
        <mesh position={[0, 0, 1.4]}>
          <circleGeometry args={[1.25, 64]} />
          <meshStandardMaterial color="#020617" metalness={1} roughness={0.1} />
        </mesh>
      </group>
    )
  }

  if (gameId === 'ondilla3') {
    return (
      <group ref={groupRef}>
        {/* Premium Floating Codex / Tome */}
        
        {/* Golden Spine */}
        <mesh position={[-1.25, 0, 0.1]}>
          <cylinderGeometry args={[0.15, 0.15, 3.6, 32]} />
          <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.2} />
        </mesh>
        
        {/* Back Leather Cover */}
        <RoundedBox args={[2.7, 3.6, 0.08]} radius={0.04} position={[0.1, 0, -0.2]} smoothness={8}>
          <meshStandardMaterial color="#450a0a" metalness={0.2} roughness={0.8} />
        </RoundedBox>
        
        {/* Golden Corner Accents on Back Cover */}
        <mesh position={[1.3, 1.7, -0.15]}>
          <boxGeometry args={[0.2, 0.2, 0.12]} />
          <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[1.3, -1.7, -0.15]}>
          <boxGeometry args={[0.2, 0.2, 0.12]} />
          <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.2} />
        </mesh>
        
        {/* Layered Glowing Pages */}
        {[0, 0.04, 0.08, 0.12, 0.16].map((z, i) => (
          <mesh key={i} position={[0.15 + i * 0.02, 0, -0.1 + z]} rotation={[0, -0.02 * i, 0]}>
            <boxGeometry args={[2.5, 3.4, 0.01]} />
            <meshBasicMaterial color="#fef3c7" transparent opacity={0.6 - i * 0.1} />
          </mesh>
        ))}

        {/* Central Obsidian Slate (Front Cover / Screen) */}
        <RoundedBox args={[2.3, 3.2, 0.06]} radius={0.06} position={[0.1, 0, 0.12]} smoothness={8}>
          <meshStandardMaterial color="#0c0a09" metalness={0.8} roughness={0.2} />
        </RoundedBox>
      </group>
    )
  }

  return null
}

/* ═══════════════════════════════════════════════════════
   GAME CARD — Premium 3D card with preview
   ═══════════════════════════════════════════════════════ */
interface GameCardProps {
  game: Game
  index: number
  activeIndex: number
  gameCount: number
  isActive: boolean
  onSelect: (game: Game) => void
}

function GameCard({ game, index, activeIndex, gameCount, isActive, onSelect }: GameCardProps) {
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const innerGlowRef = useRef<THREE.Mesh>(null)
  const hovered = useRef(false)

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    const relative = circularDistance(index, activeIndex, gameCount)
    const targetX = relative * 3.5 // Espaciado más amplio para acomodar formas grandes
    const targetZ = -Math.abs(relative) * 1.5 - (isActive ? 0 : 0.3)
    const targetY = isActive ? 0.4 : 0.05 - Math.abs(relative) * 0.2
    const targetRotation = relative * -0.25
    const hoverLift = hovered.current ? 0.3 : 0
    const breathe = Math.sin(state.clock.elapsedTime * 1.3 + index) * 0.05

    group.position.x = damp(group.position.x, targetX, 5.5, delta)
    group.position.y = damp(group.position.y, targetY + hoverLift + breathe, 5, delta)
    group.position.z = damp(group.position.z, targetZ, 5.5, delta)
    group.rotation.y = damp(
      group.rotation.y,
      targetRotation + (hovered.current ? -0.15 : 0),
      4.8,
      delta,
    )
    // Subtle tilt on hover
    group.rotation.x = damp(group.rotation.x, hovered.current ? 0.05 : 0, 5, delta)
    group.rotation.z = damp(group.rotation.z, hovered.current ? relative * -0.04 : 0, 5, delta)

    // Scale effect on active card
    const targetScale = isActive ? 1.05 : hovered.current ? 1.0 : 0.9
    const s = damp(group.scale.x, targetScale, 5, delta)
    group.scale.set(s, s, s)

    if (glowRef.current) {
      const targetOpacity = isActive ? 0.65 : hovered.current ? 0.35 : 0.06
      ;(glowRef.current.material as THREE.MeshBasicMaterial).opacity = damp(
        (glowRef.current.material as THREE.MeshBasicMaterial).opacity,
        targetOpacity,
        6,
        delta,
      )
    }

    if (innerGlowRef.current) {
      const targetInner = isActive ? 0.25 : 0.05
      ;(innerGlowRef.current.material as THREE.MeshBasicMaterial).opacity = damp(
        (innerGlowRef.current.material as THREE.MeshBasicMaterial).opacity,
        targetInner,
        6,
        delta,
      )
    }
  })

  const onPointerEnter = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    hovered.current = true
    document.body.style.cursor = 'pointer'
  }

  const onPointerLeave = () => {
    hovered.current = false
    document.body.style.cursor = 'auto'
  }

  // Desplazamiento Z de los elementos UI para adaptarse a las distintas geometrías base
  const uiZOffset = game.id === 'mundi' ? 1.35 : 0.15

  return (
    <group
      ref={groupRef}
      onClick={(event) => {
        event.stopPropagation()
        onSelect(game)
      }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {/* Outer glow halo */}
      <mesh 
        ref={glowRef} 
        position={[0, 0, -0.6]} 
      >
        {game.id === 'zen' && <shapeGeometry args={[zenGlowShape]} />}
        {game.id === 'mundi' && <shapeGeometry args={[mundiGlowShape]} />}
        {game.id === 'ondilla3' && <shapeGeometry args={[ondillaGlowShape]} />}
        <meshBasicMaterial color={game.glow} transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>

      {/* ── CUSTOM THEMATIC CARD SCULPTURE ── */}
      <ThematicCardBody gameId={game.id} isActive={isActive} />

      {/* Inner glow behind preview */}
      <mesh ref={innerGlowRef} position={[0, 0.15, uiZOffset]}>
        <circleGeometry args={[0.8, 32]} />
        <meshBasicMaterial color={game.accent} transparent opacity={0.05} />
      </mesh>

      {/* ── EXPERIENCE PREVIEW ── */}
      <group position={[0, 0.1, uiZOffset + 0.02]}>
        <ExperiencePreview gameId={game.id} />
      </group>

      {/* Scan line effect */}
      <group position={[0, 0, uiZOffset + 0.05]}>
        <ScanLine isActive={isActive} accent={game.accent} />
      </group>

      {/* Holographic edge glow - solo para tarjetas no esféricas para no romper la ilusión */}
      {game.id !== 'mundi' && (
        <group position={[0, 0, uiZOffset + 0.05]}>
          <EdgeGlow isActive={isActive} accent={game.accent} />
        </group>
      )}

      {/* Floating UI Elements */}
      <group position={[0, 0, uiZOffset + 0.05]}>
        {/* Top accent bar */}
        <mesh position={[0, 1.3, 0]}>
          <boxGeometry args={[1.4, 0.04, 0.02]} />
          <meshBasicMaterial color={game.accent} />
        </mesh>

        {/* Bottom UI platform */}
        <mesh position={[0, -1.1, 0]}>
          <boxGeometry args={[1.6, 0.02, 0.06]} />
          <meshBasicMaterial color={isActive ? palette.yellow : game.accent} />
        </mesh>

        {/* Status dots */}
        {[-0.4, 0, 0.4].map((x, i) => (
          <mesh key={i} position={[x, -1.25, 0]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshBasicMaterial
              color={i === 0 ? game.accent : i === 1 ? palette.yellow : palette.ink}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   Drag surface for swipe interaction
   ═══════════════════════════════════════════════════════ */
function DragSurface({ onStep }: { onStep: (direction: 1 | -1) => void }) {
  const dragStart = useRef<number | null>(null)

  const release = (event: ThreeEvent<PointerEvent>) => {
    if (dragStart.current === null) return
    const delta = event.clientX - dragStart.current
    if (Math.abs(delta) > 40) onStep(delta < 0 ? 1 : -1)
    dragStart.current = null
  }

  return (
    <mesh
      position={[0, 0, -4.2]}
      onPointerDown={(event) => {
        dragStart.current = event.clientX
      }}
      onPointerUp={release}
      onPointerOut={release}
    >
      <planeGeometry args={[22, 12]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  )
}

/* ═══════════════════════════════════════════════════════
   Game carousel
   ═══════════════════════════════════════════════════════ */
function GameCarousel({ games, activeGameId, onSelect, onStep }: ArcadeSceneProps) {
  const activeIndex = Math.max(0, games.findIndex((game) => game.id === activeGameId))

  return (
    <group position={[0, 0.15, 0]}>
      <DragSurface onStep={onStep} />
      {games.map((game, index) => (
        <GameCard
          key={game.id}
          game={game}
          index={index}
          activeIndex={activeIndex}
          gameCount={games.length}
          isActive={game.id === activeGameId}
          onSelect={onSelect}
        />
      ))}
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   Floating decorative particles
   ═══════════════════════════════════════════════════════ */
function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      child.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i * 0.7) * 0.5 + (i % 2 === 0 ? 2 : -1.5)
      ;(child as THREE.Mesh).scale.setScalar(
        0.8 + Math.sin(state.clock.elapsedTime * 1.5 + i * 2) * 0.2
      )
    })
  })

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[(i - 3) * 2.5 + Math.random(), 0, -3 - Math.random() * 2]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? palette.yellow : i % 3 === 1 ? palette.orange : palette.red}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   Dynamic Interactive Background Environments
   ═══════════════════════════════════════════════════════ */

function ZenEnvironment({ scale }: { scale: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((child, i) => {
      child.position.y += Math.sin(t * 0.4 + i * 1.2) * 0.003
      child.rotation.x = t * 0.12 + i
      child.rotation.z = t * 0.08 + i * 0.5
    })
  })

  // Posiciones fijas visibles a los lados
  const positions: [number, number, number][] = [
    [-7, 3, -4], [-8, -1, -6], [-6, 5, -8], [-9, 0, -5], [-5, -3, -7], [-7, 4, -9],
    [-10, 2, -6], [-6, -2, -4],
    [7, 2, -5], [8, -2, -7], [6, 4, -6], [9, 1, -4], [5, -3, -8], [7, -1, -9],
    [10, 3, -5], [6, 0, -7],
  ]

  return (
    <group scale={scale}>
      <group ref={groupRef}>
        {positions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <torusGeometry args={[1.2 + (i % 3) * 0.6, 0.04, 16, 48]} />
            <MeshDistortMaterial color={i % 2 === 0 ? '#00e5a0' : '#00c9ff'} transparent opacity={0.4 * scale} distort={0.4} speed={2} />
          </mesh>
        ))}
      </group>
      {/* Luz ambiental zen */}
      <pointLight position={[-8, 0, -5]} intensity={12 * scale} distance={15} color="#00e5a0" />
      <pointLight position={[8, 0, -5]} intensity={12 * scale} distance={15} color="#00c9ff" />
    </group>
  )
}

function MundiEnvironment({ scale }: { scale: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((child, i) => {
      const radius = 5 + (i % 4) * 1.5
      const speed = 0.2 + (i % 3) * 0.08
      const angle = t * speed + i * 1.8
      child.position.x = Math.cos(angle) * radius
      child.position.y = Math.sin(angle) * radius * 0.6
      child.position.z = -6 + Math.sin(angle * 0.5) * 2
      child.rotation.x += 0.015
      child.rotation.y += 0.02
    })
  })

  return (
    <group scale={scale}>
      <group ref={groupRef}>
        {[...Array(30)].map((_, i) => (
          <group key={i}>
            <mesh>
              <icosahedronGeometry args={[0.3 + (i % 4) * 0.15, 0]} />
              <meshStandardMaterial color={i % 3 === 0 ? '#ff6b19' : i % 3 === 1 ? '#ff5b2d' : '#ffc928'} wireframe transparent opacity={0.5 * scale} />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.08, 6, 6]} />
              <meshBasicMaterial color="#ffc928" transparent opacity={0.9 * scale} />
            </mesh>
          </group>
        ))}
      </group>
      {/* Hub central wireframe gigante atrás */}
      <mesh position={[0, 0, -12]}>
        <sphereGeometry args={[8, 14, 14]} />
        <meshBasicMaterial color="#ff6b19" wireframe transparent opacity={0.08 * scale} />
      </mesh>
      {/* Luces planetarias */}
      <pointLight position={[-6, 2, -4]} intensity={10 * scale} distance={12} color="#ff6b19" />
      <pointLight position={[6, -2, -4]} intensity={10 * scale} distance={12} color="#ffc928" />
    </group>
  )
}

function OndillaEnvironment({ scale }: { scale: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((child, i) => {
      child.position.y = Math.sin(t * 1.2 + i * 1.1) * 3 + (i % 2 === 0 ? 2 : -2)
      child.rotation.x = Math.sin(t * 0.6 + i) * Math.PI * 0.5
      child.rotation.y = Math.cos(t * 0.6 + i) * Math.PI * 0.5
    })
  })

  const positions: [number, number, number][] = [
    [-6, 0, -3], [-8, 2, -5], [-5, -2, -6], [-7, 3, -4], [-9, -1, -7], [-6, 4, -5],
    [-8, -3, -4], [-5, 1, -8], [-7, -2, -6], [-10, 0, -5], [-6, 2, -3], [-8, -1, -7],
    [-5, 3, -5],
    [6, 1, -4], [8, -2, -6], [5, 3, -5], [7, -1, -3], [9, 2, -7], [6, -3, -5],
    [8, 0, -4], [5, -2, -8], [7, 3, -6], [10, 1, -5], [6, -1, -3], [8, 2, -7],
    [5, 0, -5],
  ]

  return (
    <group scale={scale}>
      <group ref={groupRef}>
        {positions.map((pos, i) => {
          const shapeType = i % 4
          const color = ['#e52b27', '#ffc928', '#ff6b19', '#FF9F1C'][i % 4]
          return (
            <mesh key={i} position={pos}>
              {shapeType === 0 && <boxGeometry args={[1, 1, 1]} />}
              {shapeType === 1 && <coneGeometry args={[0.6, 1.4, 4]} />}
              {shapeType === 2 && <octahedronGeometry args={[0.7, 0]} />}
              {shapeType === 3 && <dodecahedronGeometry args={[0.6, 0]} />}
              <meshStandardMaterial color={color} roughness={0.3} metalness={0.5} transparent opacity={0.75 * scale} />
            </mesh>
          )
        })}
      </group>
      {/* Luces educativas */}
      <pointLight position={[-7, 0, -4]} intensity={10 * scale} distance={12} color="#e52b27" />
      <pointLight position={[7, 0, -4]} intensity={10 * scale} distance={12} color="#ffc928" />
    </group>
  )
}

function DynamicBackground({ activeGameId }: { activeGameId: string }) {
  const zenRef = useRef<{ scale: number }>({ scale: 0 })
  const mundiRef = useRef<{ scale: number }>({ scale: 0 })
  const ondillaRef = useRef<{ scale: number }>({ scale: 0 })

  const [scales, setScales] = useState({ zen: 0, mundi: 0, ondilla3: 0 })

  useFrame((_, delta) => {
    zenRef.current.scale = damp(zenRef.current.scale, activeGameId === 'zen' ? 1 : 0, 4, delta)
    mundiRef.current.scale = damp(mundiRef.current.scale, activeGameId === 'mundi' ? 1 : 0, 4, delta)
    ondillaRef.current.scale = damp(ondillaRef.current.scale, activeGameId === 'ondilla3' ? 1 : 0, 4, delta)

    // Solo actualizar estado si hay un cambio significativo para evitar re-renders excesivos,
    // o mejor, mutar referencias directamente si pasáramos props mutables, pero para React:
    setScales({
      zen: zenRef.current.scale,
      mundi: mundiRef.current.scale,
      ondilla3: ondillaRef.current.scale,
    })
  })

  // We use mouse parallax globally for the entire background
  const groupRef = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.x = damp(groupRef.current.position.x, state.pointer.x * 2, 2, delta)
      groupRef.current.position.y = damp(groupRef.current.position.y, state.pointer.y * 2, 2, delta)
      groupRef.current.rotation.x = damp(groupRef.current.rotation.x, state.pointer.y * 0.1, 2, delta)
      groupRef.current.rotation.y = damp(groupRef.current.rotation.y, state.pointer.x * 0.1, 2, delta)
    }
  })

  return (
    <group ref={groupRef}>
      {scales.zen > 0.01 && <ZenEnvironment scale={scales.zen} />}
      {scales.mundi > 0.01 && <MundiEnvironment scale={scales.mundi} />}
      {scales.ondilla3 > 0.01 && <OndillaEnvironment scale={scales.ondilla3} />}
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   Thematic Scene Environment (Animated Fog & Background)
   ═══════════════════════════════════════════════════════ */
function ThematicEnvironment({ activeGameId }: { activeGameId: string }) {
  const { scene } = useThree()
  
  useFrame((_, delta) => {
    let hex = '#180706' // default ink
    if (activeGameId === 'zen') hex = '#021c11' // deep emerald
    if (activeGameId === 'mundi') hex = '#2b1d00' // deep yellow/gold
    if (activeGameId === 'ondilla3') hex = '#24050a' // deep crimson

    if (!scene.background) scene.background = new THREE.Color(hex)
    if (!scene.fog) scene.fog = new THREE.Fog(hex, 8, 35)

    const target = new THREE.Color(hex)
    ;(scene.background as THREE.Color).lerp(target, delta * 1.5)
    ;(scene.fog as THREE.Fog).color.lerp(target, delta * 1.5)
  })

  return null
}

/* ═══════════════════════════════════════════════════════
   3D Warp / Launch Explosion
   ═══════════════════════════════════════════════════════ */
const TUNNEL_LENGTH = 48
const TUNNEL_RINGS = 22
const STREAK_COUNT = 170
const easeOutBack = (x: number) => 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2)

function LaunchExplosion({ isLaunching, activeGameId }: { isLaunching?: boolean, activeGameId: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const tRef = useRef(0)
  const iconRef = useRef<THREE.Group>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const streakMatRef = useRef<THREE.LineBasicMaterial>(null)
  const ringRefs = useRef<(THREE.Mesh | null)[]>([])

  // Theme parameters
  let color1 = '#fff', color2 = '#fff'
  if (activeGameId === 'zen') { color1 = '#10b981'; color2 = '#a7f3d0' }
  else if (activeGameId === 'mundi') { color1 = '#fbbf24'; color2 = '#fcd34d' }
  else if (activeGameId === 'ondilla3') { color1 = '#f87171'; color2 = '#fecaca' }

  const ringData = useMemo(
    () =>
      [...Array(TUNNEL_RINGS)].map((_, i) => ({
        z: 8 - i * (TUNNEL_LENGTH / TUNNEL_RINGS),
        speed: 0.75 + Math.random() * 0.5,
        spin: (Math.random() - 0.5) * 1.1,
        radius: 3.2 + Math.random() * 1.2,
        hex: Math.random() > 0.45,
        color: Math.random() > 0.5 ? color1 : Math.random() > 0.3 ? color2 : '#fff2d5',
      })),
    [color1, color2],
  )

  const streakGeo = useMemo(() => {
    const positions = new Float32Array(STREAK_COUNT * 6)
    const cols = new Float32Array(STREAK_COUNT * 6)
    const c1 = new THREE.Color(color1)
    const c2 = new THREE.Color(color2)
    const cream = new THREE.Color('#fff2d5')
    for (let i = 0; i < STREAK_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 0.7 + Math.random() * 4.6
      const z = 8 - Math.random() * TUNNEL_LENGTH
      const x = Math.cos(angle) * r
      const y = Math.sin(angle) * r * 0.72 + 0.25
      const len = 0.8 + Math.random() * 1.6
      positions.set([x, y, z, x, y, z - len], i * 6)
      const c = Math.random() > 0.6 ? c1 : Math.random() > 0.4 ? c2 : cream
      cols.set([c.r, c.g, c.b, c.r * 0.12, c.g * 0.12, c.b * 0.12], i * 6)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(cols, 3))
    return geo
  }, [color1, color2])

  const { positions, colors, velocities } = useMemo(() => {
    const count = 3000
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    const c1 = new THREE.Color(color1)
    const c2 = new THREE.Color(color2)
    const mixed = new THREE.Color()

    for (let i = 0; i < count; i++) {
       const theta = Math.random() * Math.PI * 2
       const phi = Math.acos((Math.random() * 2) - 1)
       const r = Math.random() * 0.2
       
       pos[i*3] = r * Math.sin(phi) * Math.cos(theta)
       pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
       pos[i*3+2] = r * Math.cos(phi)

       vel[i*3] = pos[i*3] * 120
       vel[i*3+1] = pos[i*3+1] * 120
       vel[i*3+2] = pos[i*3+2] * 120 + 80 // massive blast towards camera

       mixed.lerpColors(c1, c2, Math.random())
       col[i*3] = mixed.r
       col[i*3+1] = mixed.g
       col[i*3+2] = mixed.b
    }
    return { positions: pos, colors: col, velocities: vel }
  }, [activeGameId, color1, color2])

  const matRef = useRef<THREE.PointsMaterial>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!isLaunching) {
      tRef.current = 0
      return
    }
    tRef.current += delta
    const t = tRef.current
    const speed = 8 + t * 11

    // Animate particles
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array
      for(let i = 0; i < 3000; i++) {
         pos[i*3] += velocities[i*3] * delta
         pos[i*3+1] += velocities[i*3+1] * delta
         pos[i*3+2] += velocities[i*3+2] * delta
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }

    if (matRef.current) {
      matRef.current.size += delta * 1.5
      matRef.current.opacity -= delta * 0.4
    }

    // Shockwave ring
    if (ringRef.current) {
      ringRef.current.scale.x += delta * 30
      ringRef.current.scale.y += delta * 30
      ringRef.current.rotation.z += delta * 5
      ;(ringRef.current.material as THREE.MeshBasicMaterial).opacity -= delta * 0.8
    }

    // Warp tunnel rings — fly past the camera
    const ringFade = Math.min(1, t / 0.35)
    ringRefs.current.forEach((ring, i) => {
      if (!ring) return
      const d = ringData[i]
      ring.position.z += delta * speed * d.speed
      if (ring.position.z > 15) ring.position.z -= TUNNEL_LENGTH + 10
      ring.rotation.z += delta * d.spin * (1 + t * 0.4)
      ;(ring.material as THREE.MeshBasicMaterial).opacity = ringFade * 0.55
    })

    // Light streaks
    const posAttr = streakGeo.getAttribute('position') as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array
    for (let i = 0; i < STREAK_COUNT; i++) {
      const base = i * 6
      const v = speed * (1.35 + (i % 6) * 0.3)
      arr[base + 2] += delta * v
      arr[base + 5] += delta * v
      if (arr[base + 2] > 15) {
        arr[base + 2] -= TUNNEL_LENGTH + 12
        arr[base + 5] -= TUNNEL_LENGTH + 12
      }
    }
    posAttr.needsUpdate = true
    if (streakMatRef.current) streakMatRef.current.opacity = ringFade * 0.95

    // Giant themed centerpiece: pops in, spins, then flies past the camera
    if (iconRef.current) {
      const pop = easeOutBack(Math.min(1, t / 0.55))
      const fly = Math.max(0, t - 1.9)
      iconRef.current.scale.setScalar(Math.max(0.001, 3.4 * pop))
      iconRef.current.position.set(0, 0.15 + Math.sin(t * 2.2) * 0.14, 3.2 + fly * fly * 15)
      iconRef.current.rotation.y += delta * (1.4 + t * 2.4)
      iconRef.current.rotation.z = Math.sin(t * 1.2) * 0.15
    }

    // Themed key light with electric flicker
    if (lightRef.current) {
      lightRef.current.intensity = ringFade * (16 + Math.sin(t * 23) * 7 + t * 7)
    }
  })

  if (!isLaunching) return null

  return (
    <group ref={groupRef}>
      <group position={[0, 0, 8]}>
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <pointsMaterial ref={matRef} size={0.06} vertexColors transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} />
        </points>
        <mesh ref={ringRef}>
          <ringGeometry args={[0.5, 0.8, 64]} />
          <meshBasicMaterial color={color1} transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Tunnel rings themed per experience */}
      {ringData.map((d, i) => (
        <mesh
          key={i}
          position={[0, 0.2, d.z]}
          ref={(m) => {
            ringRefs.current[i] = m
          }}
        >
          {d.hex ? <torusGeometry args={[d.radius, 0.02, 8, 6]} /> : <torusGeometry args={[d.radius, 0.014, 8, 64]} />}
          <meshBasicMaterial color={d.color} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}

      {/* Hyperspeed light streaks */}
      <lineSegments geometry={streakGeo}>
        <lineBasicMaterial
          ref={streakMatRef}
          vertexColors
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Giant themed icon that flies through the camera */}
      <group ref={iconRef} position={[0, 0.15, 3.2]} scale={0.001}>
        <ExperiencePreview gameId={activeGameId} />
      </group>

      <pointLight ref={lightRef} position={[0, 0.6, 4.5]} distance={16} color={color1} intensity={0} />
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   Full scene content
   ═══════════════════════════════════════════════════════ */
function SceneContent(props: ArcadeSceneProps) {
  const sparkles = useMemo(
    () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 100),
    [],
  )

  return (
    <>
      <ThematicEnvironment activeGameId={props.activeGameId} />

      {/* Enhanced lighting */}
      <ambientLight intensity={0.7} color="#ffbc76" />
      <directionalLight position={[2.8, 4, 6]} intensity={2.8} color="#fff0d0" />
      <pointLight position={[-5, 2, 4]} intensity={28} distance={10} color={palette.red} />
      <pointLight position={[5, -1, 2]} intensity={20} distance={9} color={palette.orange} />
      <pointLight position={[0, 4, -1]} intensity={14} distance={8} color={palette.yellow} />
      <pointLight position={[0, -2, 5]} intensity={8} distance={6} color="#ff006e" />

      <CameraRig isLaunching={props.isLaunching} />
      <LaunchExplosion isLaunching={props.isLaunching} activeGameId={props.activeGameId} />
      
      <EmberFloor />
      <FloatingOrbs />
      
      {/* Dynamic Interactive Background based on selected card */}
      <DynamicBackground activeGameId={props.activeGameId} />

      <Float speed={0.7} rotationIntensity={0.03} floatIntensity={0.18}>
        <GameCarousel {...props} />
      </Float>

      {sparkles > 0 && (
        <>
          <Sparkles
            count={sparkles}
            scale={[14, 8, 8]}
            size={2.8}
            speed={0.25}
            opacity={0.55}
            color={palette.orange}
          />
          <Sparkles
            count={30}
            scale={[8, 5, 5]}
            size={1.5}
            speed={0.15}
            opacity={0.35}
            color={palette.yellow}
          />
        </>
      )}
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   Canvas wrapper
   ═══════════════════════════════════════════════════════ */
export function ArcadeScene(props: ArcadeSceneProps) {
  return (
    <Canvas
      className="arcade-canvas"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.3, 11.5], fov: 38 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      performance={{ min: 0.65 }}
      aria-hidden="true"
    >
      <SceneContent {...props} />
    </Canvas>
  )
}
