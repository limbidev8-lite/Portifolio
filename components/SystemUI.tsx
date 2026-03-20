"use client"

import { useState, useRef } from "react"

export default function SystemUI({ onExit }: { onExit?: () => void }) {
  const [output, setOutput] = useState("")
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showHint, setShowHint] = useState(true)

  const [commandInput, setCommandInput] = useState("")
  const [glowExit, setGlowExit] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

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
      current += text[i]
      setOutput(current)
      i++

      if (i >= text.length && typingRef.current) {
        clearInterval(typingRef.current)
      }
    }, 20)
  }

  /* =========================
     EXIT
  ========================= */
  const handleExit = () => {
    setGlowExit(true)
    setTimeout(() => onExit && onExit(), 500)
  }

  /* =========================
     COMMAND EXECUTION
  ========================= */
  const executeCommand = (cmd: string) => {
    const clean = cmd.trim().toLowerCase()

    if (clean === "cd .." || clean === "cd..") {
      handleExit()
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
     COMMANDS
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
     INPUT HANDLING
  ========================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowHint(false)
    setCommandInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(commandInput)
      setCommandInput("")
    }
  }

  /* =========================
     ONLY FOCUS WHEN CLICKING INPUT AREA
  ========================= */
  const handleInputClick = () => {
    inputRef.current?.focus()
  }

  /* =========================
     DRAG (DISABLE MOBILE)
  ========================= */
  const onMouseDown = (e: any) => {
    if (window.innerWidth < 768) return

    isDragging.current = true
    document.body.style.cursor = "grabbing"

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

  return (
    <div
      className={`h-screen w-full flex items-center justify-center text-green-400 font-mono ${
        glowExit ? "bg-green-500/20 scale-105" : ""
      }`}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {/* 🔥 REAL INPUT (VISIBLE + CONTROLLED) */}
      <input
        ref={inputRef}
        value={commandInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="absolute top-6 left-1/2 -translate-x-1/2 bg-transparent border-none outline-none text-green-400 text-sm w-[300px] text-center"
        placeholder="tap here to type..."
      />

      {/* HINT */}
      {showHint && (
        <div className="absolute top-14 w-full text-center text-sm animate-pulse">
          tap input to type or use <span className="text-white">cd ..</span>
        </div>
      )}

      {/* PANEL */}
      <div
        onMouseDown={onMouseDown}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        className="relative w-[600px] max-w-full border border-green-500 p-6 bg-black/80 shadow-[0_0_20px_#00ff00]"
      >
        <button
          onClick={handleExit}
          className="absolute top-2 right-3 text-green-400 hover:text-red-400 text-lg"
        >
          ✕
        </button>

        <div className="mb-4 text-sm opacity-70">USER: LIMBIKA</div>

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

        <div className="mt-6 whitespace-pre-line border-t border-green-500 pt-4 min-h-[120px]">
          {output}
        </div>
      </div>
    </div>
  )
}