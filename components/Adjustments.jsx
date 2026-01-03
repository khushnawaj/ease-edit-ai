"use client";

import { filters } from "fabric";
import ExportPanel from "@/components/ExportPanel";
import CropControls from "@/components/CropControls";
import useAIEnhance from "@/hooks/useAIEnhance";
import AIEnhanceButton from "@/components/AIEnhanceButton";
import useAIUpscale from "@/hooks/useAIUpscale";
import AIUpscaleButton from "@/components/AIUpscaleButton";


export default function Adjustments({ canvasRef, imageRef, saveHistory }) {
  const { enabled, toggleEnhance } = useAIEnhance(
    canvasRef,
    imageRef,
    saveHistory
  );
  const { upscale } = useAIUpscale(
  canvasRef,
  imageRef,
  saveHistory
);


  const applyFilter = (type, value) => {
    if (!canvasRef.current || !imageRef.current || enabled) return;

    const image = imageRef.current;
    image.filters = image.filters || [];

    // remove same filter type
    const before = image.filters.length;
    image.filters = image.filters.filter(
      (f) => f?.type !== type
    );

    if (type === "Brightness") {
      image.filters.push(
        new filters.Brightness({ brightness: value })
      );
    }

    if (type === "Contrast") {
      image.filters.push(
        new filters.Contrast({ contrast: value })
      );
    }

    // avoid unnecessary renders
    if (image.filters.length === before) return;

    image.applyFilters();
    canvasRef.current.requestRenderAll();
  };

  return (
    <aside
      className="
        w-full md:w-64
        border-t md:border-t-0 md:border-l
        border-zinc-800
        p-4
        space-y-6
        bg-zinc-950
      "
    >
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-zinc-300">
          Adjustments
        </h3>

        <CropControls
          canvasRef={canvasRef}
          imageRef={imageRef}
          saveHistory={saveHistory}
        />
      </div>

      {/* AI Enhance */}
      <AIEnhanceButton
        enabled={enabled}
        onToggle={toggleEnhance}
      />
      <AIUpscaleButton onUpscale={() => upscale(2)} />


      {/* Sliders */}
      <div
        className={`
          space-y-4
          ${enabled ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        {/* Brightness */}
        <div>
          <label
            className="text-xs text-zinc-400 block mb-1"
            htmlFor="brightness"
          >
            Brightness
          </label>
          <input
            id="brightness"
            aria-label="Brightness"
            type="range"
            min={-1}
            max={1}
            step={0.01}
            defaultValue={0}
            onChange={(e) =>
              applyFilter("Brightness", Number(e.target.value))
            }
            onMouseUp={saveHistory}
            onTouchEnd={saveHistory}
            className="w-full touch-manipulation"
          />
        </div>

        {/* Contrast */}
        <div>
          <label
            className="text-xs text-zinc-400 block mb-1"
            htmlFor="contrast"
          >
            Contrast
          </label>
          <input
            id="contrast"
            aria-label="Contrast"
            type="range"
            min={-1}
            max={1}
            step={0.01}
            defaultValue={0}
            onChange={(e) =>
              applyFilter("Contrast", Number(e.target.value))
            }
            onMouseUp={saveHistory}
            onTouchEnd={saveHistory}
            className="w-full touch-manipulation"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-zinc-800" />

      {/* Export */}
      <ExportPanel canvasRef={canvasRef} />
    </aside>
  );
}
