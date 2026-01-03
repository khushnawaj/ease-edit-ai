"use client";

import EditorCanvas from "@/components/EditorCanvas";
import Toolbar from "@/components/Toolbar";
import Adjustments from "@/components/Adjustments";
import useFabricCanvas from "@/hooks/useFabricCanvas";
import { useState } from "react";

export default function Home() {
  const { canvasRef, imageRef, saveHistory, undo, reset } = useFabricCanvas();
  const [showAdjustments, setShowAdjustments] = useState(false);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Top Bar */}
      <header className="h-14 border-b border-zinc-800 flex items-center px-4 sm:px-6">
        <h1 className="font-semibold text-sm sm:text-base">
          Ease-Edit <span className="text-indigo-400">AI</span>
        </h1>
      </header>

      {/* Workspace */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Toolbar */}
        <Toolbar
          canvasRef={canvasRef}
          imageRef={imageRef}
          saveHistory={saveHistory}
          undo={undo}
          reset={reset}
          onToggleAdjustments={() => setShowAdjustments((v) => !v)}
          showAdjustments={showAdjustments}
        />

        {/* Canvas */}
        <main className="flex-1 flex items-center justify-center p-2 sm:p-4 overflow-auto">
          <EditorCanvas canvasRef={canvasRef} imageRef={imageRef} />
        </main>

        {/* Adjustments */}
        <Adjustments
          canvasRef={canvasRef}
          imageRef={imageRef}
          saveHistory={saveHistory}
        />
      </div>
    </div>
  );
}
