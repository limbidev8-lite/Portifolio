"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"

/* =========================
   PARTICLES
========================= */

function Particles() {
  const ref = useRef<any>()

  const particles = useMemo(() => {
    const arr = new Float32Array(5000 * 3)

    for (let i = 0; i < 5000; i++) {
      const radius = 1.5 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = radius * Math.cos(phi)
    }

    return arr
  }, [])

  useFrame(() => {
    ref.current.rotation.y += 0.001
  })

  return (
    <Points ref={ref} positions={particles}>
      <PointMaterial size={0.01} color="#88ccff" transparent opacity={0.8} />
    </Points>
  )
}

/* =========================
   MAIN GROUP (INTERACTIVE)
========================= */

function Scene() {
  const group = useRef<any>()
  const timer = useRef(new THREE.Timer())

  useFrame((state) => {
    const t = timer.current.getElapsed()

    // auto rotation
    group.current.rotation.y = t * 0.2

    // mouse interaction (smooth follow)
    const mouseX = state.mouse.x
    const mouseY = state.mouse.y

    group.current.rotation.x += (mouseY * 0.5 - group.current.rotation.x) * 0.05
    group.current.rotation.y += (mouseX * 0.5 - group.current.rotation.y) * 0.05
  })

  return (
    <group ref={group}>
      {/* CORE */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          transmission={1}
          roughness={0}
          thickness={1}
          ior={1.3}
          color="#66ccff"
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* WIRE SPHERE */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          wireframe
          color="#66ccff"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* ENERGY RINGS */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshBasicMaterial
            color="#88ccff"
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}

      {/* PARTICLES */}
      <Particles />
    </group>
  )
}

/* =========================
   MAIN EXPORT
========================= */

export default function Blob() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 2, 2]} intensity={1.5} />

      <Scene />
    </Canvas>
  )
}