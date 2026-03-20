"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import TerminalIntro from "@/components/TerminalIntro"
import SystemUI from "@/components/SystemUI"

// ✅ FIX: disable SSR for Three.js component
const Blob = dynamic(() => import("@/components/Blob"), {
  ssr: false,
})

export default function Home() {
  const [screen, setScreen] = useState<"terminal" | "system">("terminal")

  return (
    <main className="relative w-full h-screen bg-black scanlines">

      {/* 🔥 Blob (safe for Vercel now) */}
      <div className="absolute inset-0 z-0">
        <Blob />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* UI */}
      <div className="relative z-20">
        {screen === "terminal" ? (
          <TerminalIntro />
        ) : (
          <SystemUI onExit={() => setScreen("terminal")} />
        )}
      </div>

    </main>
  )
}