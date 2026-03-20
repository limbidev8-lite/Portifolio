"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"

/* =========================
   PARTICLES (HACKER FIELD)
========================= */

function Particles() {
  const ref = useRef<THREE.Points>(null!)

  const particles = useMemo(() => {
    const arr = new Float32Array(3000 * 3)

    for (let i = 0; i < 3000; i++) {
      const r = 2 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }

    return arr
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2
    }
  })

  return (
    <Points ref={ref} positions={particles}>
      <PointMaterial size={0.015} color="#00ffff" transparent opacity={0.7} />
    </Points>
  )
}

/* =========================
   CORE BLOB
========================= */

function Core() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // 🔥 smooth mouse follow
    const targetX = state.mouse.y * 0.8
    const targetY = state.mouse.x * 0.8

    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.1
    meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.1

    // 🔥 breathing / pulse
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
    meshRef.current.scale.set(scale, scale, scale)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        color="#00ffff"
        transmission={1}
        roughness={0}
        thickness={1}
        ior={1.5}
        transparent
        opacity={0.25}
      />
    </mesh>
  )
}

/* =========================
   WIREFRAME SHELL
========================= */

function Wire() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.05, 64, 64]} />
      <meshBasicMaterial
        wireframe
        color="#00ffff"
        transparent
        opacity={0.2}
      />
    </mesh>
  )
}

/* =========================
   ENERGY RINGS
========================= */

function Rings() {
  const group = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.z += delta * 0.2
  })

  return (
    <group ref={group}>
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i]}>
          <torusGeometry args={[1.5 + i * 0.2, 0.01, 16, 100]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.25}
          />
        </mesh>
      ))}
    </group>
  )
}

/* =========================
   SCENE
========================= */

function Scene() {
  return (
    <>
      <Core />
      <Wire />
      <Rings />
      <Particles />
    </>
  )
}

/* =========================
   MAIN EXPORT
========================= */

export default function Blob() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 4] }}
        style={{ pointerEvents: "none" }} // 🔥 ensures UI always clickable
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} />
        <Scene />
      </Canvas>
    </div>
  )
}