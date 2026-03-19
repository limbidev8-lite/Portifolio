"use client"

import { useEffect, useState } from "react"
import { Share_Tech_Mono } from "next/font/google"
import SystemUI from "./SystemUI"
import Desktop from "./Desktop"
import AskAI from "./AskAI"

const terminalFont = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
})

const lines = [
  "Hi...",
  "I am Limbika Zangazanga...",
  "Initializing system...",
  "Loading AI modules...",
  "Connecting to neural network...",
  "Access granted.",
]

export default function TerminalIntro() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState("")
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  // 🔥 NEW STATE SYSTEM
  const [mode, setMode] = useState<"intro" | "desktop" | "system">("intro")
  const [showAI, setShowAI] = useState(false)

  /* =========================
     TYPEWRITER EFFECT (INTRO ONLY)
  ========================= */
  useEffect(() => {
    if (mode !== "intro") return
    if (lineIndex >= lines.length) return

    const currentText = lines[lineIndex]

    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + currentText[charIndex])
        setCharIndex((prev) => prev + 1)
      }, 40)

      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentText])
        setCurrentLine("")
        setCharIndex(0)
        setLineIndex((prev) => prev + 1)

        // 🔥 SWITCH TO DESKTOP INSTEAD OF SYSTEM UI
        if (lineIndex === lines.length - 1) {
          setTimeout(() => {
            setMode("desktop")
          }, 1000)
        }
      }, 500)

      return () => clearTimeout(timeout)
    }
  }, [charIndex, lineIndex, mode])

  /* =========================
     MODE SWITCHING
  ========================= */

  // 👉 SYSTEM UI
  if (mode === "system") {
    return (
      <div className="animate-fadeIn">
        <SystemUI onExit={() => setMode("desktop")} />
      </div>
    )
  }

  // 👉 DESKTOP (ICONS)
  if (mode === "desktop") {
    return (
      <>
        <Desktop
          openSystem={() => setMode("system")}
          openAI={() => setShowAI(true)}
        />

        {showAI && <AskAI onClose={() => setShowAI(false)} />}
      </>
    )
  }

  /* =========================
     INTRO TERMINAL
  ========================= */
  return (
    <div
      className={`${terminalFont.className} text-green-400 text-lg p-6`}
      style={{
        height: "100vh",
        background: "transparent",
        textShadow: "0 0 10px #00ff00",
      }}
    >
      {displayedLines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}

      <div>
        {currentLine}
        <span className="animate-pulse">█</span>
      </div>
    </div>
  )
}