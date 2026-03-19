"use client"

import { useState } from "react"
import Blob from "@/components/Blob"
import TerminalIntro from "@/components/TerminalIntro"
import SystemUI from "@/components/SystemUI"

export default function Home() {
  const [screen, setScreen] = useState<"terminal" | "system">("terminal")

  return (
    <main className="relative w-full h-screen bg-black scanlines">
      {/* Blob */}
      <div className="absolute inset-0 z-0">
        <Blob />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* UI */}
      <div className="relative z-20">
        {screen === "terminal" ? (
          <TerminalIntro onComplete={() => setScreen("system")} />
        ) : (
          <SystemUI goBack={() => setScreen("terminal")} />
        )}
      </div>
    </main>
  )
}