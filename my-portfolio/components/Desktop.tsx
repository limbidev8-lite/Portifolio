"use client"

export default function Desktop({
  openSystem,
  openAI,
}: {
  openSystem: () => void
  openAI: () => void
}) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-green-400 font-mono">

      {/* 🔥 NAME HEADER */}
      <div className="absolute top-16 text-center">
        <h1 className="text-4xl md:text-5xl tracking-widest text-green-400"
            style={{ textShadow: "0 0 15px #00ff00" }}>
          LIMBIKA ZANGAZANGA
        </h1>

        <a
          href="https://github.com/Limbika2222"
          target="_blank"
          className="block mt-3 text-sm opacity-70 hover:text-white transition"
        >
          github.com/Limbika2222
        </a>
      </div>

      {/* 🔥 ICONS */}
      <div className="flex gap-20">

        {/* SYSTEM */}
        <div
          onClick={openSystem}
          className="flex flex-col items-center cursor-pointer group"
        >
          <div className="border border-green-500 px-6 py-4 group-hover:bg-green-500 group-hover:text-black transition shadow-[0_0_10px_#00ff00]">
            SYS
          </div>
          <span className="mt-2 text-xs opacity-70">SYSTEM</span>
        </div>

        {/* AI */}
        <div
          onClick={openAI}
          className="flex flex-col items-center cursor-pointer group"
        >
          <div className="border border-green-500 px-6 py-4 group-hover:bg-green-500 group-hover:text-black transition shadow-[0_0_10px_#00ff00]">
            AI
          </div>
          <span className="mt-2 text-xs opacity-70">ASK AI</span>
        </div>

      </div>
    </div>
  )
}