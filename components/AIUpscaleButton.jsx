"use client";

import { Maximize2 } from "lucide-react";

export default function AIUpscaleButton({ onUpscale }) {
  return (
    <div className="space-y-1">
      <button
        onClick={onUpscale}
        className="
          w-full flex items-center justify-center gap-2
          py-2 rounded text-sm font-medium
          bg-zinc-800 hover:bg-zinc-700
        "
      >
        <Maximize2 size={16} />
        Increase Image Quality (2×)
      </button>

      <p className="text-[11px] text-zinc-500 text-center">
        Improves resolution for export, not canvas size
      </p>
    </div>
  );
}
