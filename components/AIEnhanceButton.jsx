"use client";

import { Sparkles } from "lucide-react";

export default function AIEnhanceButton({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`
        w-full flex items-center justify-center gap-2
        py-2 rounded text-sm font-medium
        transition
        ${
          enabled
            ? "bg-indigo-600 hover:bg-indigo-500"
            : "bg-zinc-800 hover:bg-zinc-700"
        }
      `}
    >
      <Sparkles size={16} />
      {enabled ? "Remove AI Enhance" : "AI Enhance"}
    </button>
  );
}
