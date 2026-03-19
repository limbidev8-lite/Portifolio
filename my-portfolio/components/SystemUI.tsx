"use client"

import { useState, useRef, useEffect } from "react"

export default function SystemUI({ onExit }: { onExit?: () => void }) {
  const [output, setOutput] = useState("")
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showHint, setShowHint] = useState(true)

  const [commandInput, setCommandInput] = useState("")
  const [glowExit, setGlowExit] = useState(false)

  const isDragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })
  const typingRef = useRef<NodeJS.Timeout | null>(null)

  /* =========================
     TYPEWRITER
  ========================= */
  const typeOutput = (text: string) => {
    if (typingRef.current) clearInterval(typingRef.current)

    let i = 0
    let current = ""

    typingRef.current = setInterval(() => {
      // 🔥 type multiple characters at once (faster + smoother)
      const chunkSize = 3

      current += text.slice(i, i + chunkSize)
      setOutput(current)

      i += chunkSize

      if (i >= text.length) {
        if (typingRef.current) clearInterval(typingRef.current)
      }
    }, 10) // faster interval
  }

  /* =========================
     COMMAND EXECUTION
  ========================= */
  const executeCommand = (cmd: string) => {
    const clean = cmd.trim().toLowerCase()

    // 🔥 BACK TO DESKTOP
    if (clean === "cd .." || clean === "cd..") {
      setGlowExit(true)

      setTimeout(() => {
        onExit && onExit()
      }, 700)
      return
    }

    if (clean === "projects") handleCommand("projects")
    else if (clean === "skills") handleCommand("skills")
    else if (clean === "experience") handleCommand("experience")
    else if (clean === "education") handleCommand("education")
    else if (clean !== "") {
      typeOutput(`Command not recognized: ${cmd}`)
    }
  }

  /* =========================
     CLICK COMMANDS
  ========================= */
  const handleCommand = (cmd: string) => {
    if (cmd === "projects") {
      typeOutput(`Opening PROJECT ARCHIVE...

- Multi Source Early Warning Dashboard
- SmartFarm (Mlangizi)
- MRI Brain Tumor Segmentation
- Insurance Multitenant App
- Malawi Event Ticketing
- Tiyeni Mobile App`)
    }

    if (cmd === "skills") {
      typeOutput(`Loading SKILL MATRIX...

- React / Next.js
- Tailwind CSS
- Three.js / WebGL
- Python / Flask
- AI / Machine Learning
- Firebase`)
    }

    if (cmd === "experience") {
      typeOutput(`Accessing EXPERIENCE LOG...

- Full Stack Developer
- AI Systems Builder
- Associate Lecturer (2022–2024)
- Research & Prototyping`)
    }

    if (cmd === "education") {
      typeOutput(`Opening EDUCATION CORE...

- MSc Informatics (University of Delhi)
- MSc Computer Science
- B.E Computer Science`)
    }
  }

  /* =========================
     KEYBOARD INPUT (FIXED)
  ========================= */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setShowHint(false)

      setCommandInput((prev) => {
        if (e.key === "Backspace") return prev.slice(0, -1)

        if (e.key === "Enter") {
          executeCommand(prev)
          return ""
        }

        if (e.key.length === 1) {
          return prev + e.key
        }

        return prev
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  /* =========================
     DRAG LOGIC
  ========================= */
  const onMouseDown = (e: any) => {
    isDragging.current = true
    document.body.style.cursor = "grabbing"
    setShowHint(false)

    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
  }

  const onMouseMove = (e: any) => {
    if (!isDragging.current) return

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    })
  }

  const onMouseUp = () => {
    isDragging.current = false
    document.body.style.cursor = "grab"
  }

  /* =========================
     UI
  ========================= */
  return (
    <div
      className={`h-screen w-full flex items-center justify-center text-green-400 font-mono transition-all duration-500 ${
        glowExit ? "bg-green-500/20 scale-105" : ""
      }`}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {/* 🔥 GLOBAL TERMINAL INPUT */}
      <div className="absolute top-6 w-full flex justify-center pointer-events-none">
        <div className="flex items-center text-green-400 text-sm tracking-widest">
          <span className="mr-2">C:\SYSTEM&gt;</span>
          <span>{commandInput}</span>
          <span className="animate-pulse ml-1">█</span>
        </div>
      </div>

      {/* INSTRUCTION */}
      {showHint && (
        <div className="absolute top-14 w-full text-center text-green-400 text-sm animate-pulse pointer-events-none">
          type <span className="text-white">cd ..</span> to return
        </div>
      )}

      {/* DRAG HINT */}
      {showHint && (
        <div className="absolute top-20 w-full text-center text-xs opacity-50 animate-pulse pointer-events-none">
          ( drag this window )
        </div>
      )}

      {/* GITHUB */}
      <a
        href="https://github.com/Limbika2222"
        target="_blank"
        className="absolute bottom-6 text-xs opacity-70 hover:text-white"
      >
        ↗ github.com/Limbika2222
      </a>

      {/* PANEL */}
      <div
        onMouseDown={onMouseDown}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        className="w-[600px] max-w-full border border-green-500 p-6 bg-transparent shadow-[0_0_20px_#00ff00] cursor-grab"
      >
        <div className="mb-4 text-sm opacity-70">
          USER: LIMBIKA
        </div>

        <div className="space-y-2">
          <div onClick={() => handleCommand("projects")} className="cursor-pointer hover:text-white">
            &gt; open projects.exe
          </div>

          <div onClick={() => handleCommand("skills")} className="cursor-pointer hover:text-white">
            &gt; run skills.sys
          </div>

          <div onClick={() => handleCommand("experience")} className="cursor-pointer hover:text-white">
            &gt; load experience.log
          </div>

          <div onClick={() => handleCommand("education")} className="cursor-pointer hover:text-white">
            &gt; access education.db
          </div>
        </div>

        {/* OUTPUT */}
        <div className="mt-6 whitespace-pre-line border-t border-green-500 pt-4 min-h-[120px]">
          {output}
        </div>
      </div>
    </div>
  )
}