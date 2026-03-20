"use client"

import { useState } from "react"

type Message = {
  type: "user" | "ai"
  text: string
}

const qaFlow: Record<string, { answer: string; next: string[] }> = {
  start: {
    answer: "Hello. I am your assistant. What would you like to know about Limbika?",
    next: ["Who is Limbika?", "What is his experience?", "What projects has he built?"],
  },

  "Who is Limbika?": {
    answer:
      "Limbika Zangazanga is a full-stack developer and AI systems builder focused on creating intelligent, real-world solutions. He specializes in building modern web applications, machine learning systems, and impactful digital tools, especially in agriculture, health, and data systems.",
    next: ["What is his experience?", "What are his skills?"],
  },

  "What is his experience?": {
    answer:
      "He has experience as a full-stack developer, working with React, Next.js, Flask, and Firebase. He has also built AI-powered systems including disease outbreak dashboards, crop advisory tools, and medical imaging applications. His work combines engineering, research, and product design.",
    next: ["What projects has he built?", "What are his skills?"],
  },

  "What projects has he built?": {
    answer:
      "Some of his key projects include:\n\n- Multi-Source Early Warning System for disease outbreaks\n- SmartFarm (Mlangizi) for farmers\n- MRI Brain Tumor Segmentation system\n- Insurance multi-tenant platform\n- Event ticketing system\n\nThese projects focus on solving real-world problems using AI and modern web technologies.",
    next: ["What are his skills?", "How can I contact him?"],
  },

  "What are his skills?": {
    answer:
      "His core skills include:\n\n- Frontend: React, Next.js, Tailwind\n- Backend: Python, Flask, APIs\n- AI/ML: TensorFlow Lite, data systems\n- UI/UX: Interactive and modern interfaces\n- Tools: Firebase, Git, Three.js",
    next: ["What projects has he built?", "How can I contact him?"],
  },

  "How can I contact him?": {
    answer:
      "You can reach Limbika via GitHub or through the contact section in this portfolio. He is open to collaborations, research, and building impactful systems.",
    next: ["Who is Limbika?"],
  },
}

export default function AskAI({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { type: "ai", text: qaFlow.start.answer },
  ])
  const [options, setOptions] = useState(qaFlow.start.next)

  const handleQuestion = (question: string) => {
    const data = qaFlow[question]
    if (!data) return

    setMessages((prev) => [
      ...prev,
      { type: "user", text: question },
      { type: "ai", text: data.answer },
    ])

    setOptions(data.next)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* WINDOW */}
      <div className="relative w-[500px] max-w-full h-[600px] border border-green-500 bg-black text-green-400 font-mono shadow-[0_0_25px_#00ff00] flex flex-col">

        {/* HEADER */}
        <div className="p-3 border-b border-green-500 flex justify-between">
          <span>AI ASSISTANT</span>
          <button onClick={onClose}>✕</button>
        </div>

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
          {messages.map((msg, i) => (
            <div key={i} className={msg.type === "user" ? "text-white" : ""}>
              {msg.type === "user" ? "> " : ""}
              {msg.text}
            </div>
          ))}
        </div>

        {/* OPTIONS */}
        <div className="border-t border-green-500 p-3 space-y-2">
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => handleQuestion(opt)}
              className="cursor-pointer hover:text-white"
            >
              &gt; {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}