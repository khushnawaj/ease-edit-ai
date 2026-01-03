"use client";

import {
  Upload,
  RotateCw,
  RotateCcw,
  Undo2,
  SlidersHorizontal
} from "lucide-react";
import { Image as FabricImage } from "fabric";

export default function Toolbar({
  canvasRef,
  imageRef,
  saveHistory,
  undo,
  reset,
  onToggleAdjustments
}) {
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !canvasRef.current) return;

    const reader = new FileReader();

    reader.onload = () => {
      FabricImage.fromURL(reader.result).then((img) => {
        const canvas = canvasRef.current;

        // Remove old image
        if (imageRef.current) {
          canvas.remove(imageRef.current);
        }

        // Responsive scale
        const maxWidth = canvas.getWidth() * 0.9;
        img.scaleToWidth(maxWidth);

        img.set({
          selectable: false,
          originX: "center",
          originY: "center",
          angle: 0,
          clipPath: null
        });

        canvas.add(img);
        canvas.centerObject(img);
        img.setCoords();
        canvas.requestRenderAll();

        imageRef.current = img;
        saveHistory(); // initial state
      });
    };

    reader.readAsDataURL(file);
  };

  const rotate = (angle) => {
    if (!imageRef.current || !canvasRef.current) return;

    const img = imageRef.current;
    img.rotate((img.angle || 0) + angle);
    img.setCoords();

    canvasRef.current.centerObject(img);
    canvasRef.current.requestRenderAll();
    saveHistory();
  };

  return (
    <aside
      className="
        md:w-16 w-full
        md:border-r border-zinc-800
        md:flex-col flex-row
        flex items-center justify-center
        gap-3 md:gap-6
        py-3 md:py-4
        border-t md:border-t-0
        bg-zinc-950
      "
    >
      {/* Upload */}
      <label className="cursor-pointer p-2 hover:text-white text-zinc-300 touch-manipulation">
        <Upload size={20} />
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleUpload}
        />
      </label>

      {/* Undo */}
      <button
        onClick={undo}
        className="p-2 hover:text-white text-zinc-300 touch-manipulation"
        title="Undo"
      >
        <Undo2 size={20} />
      </button>

      {/* Reset */}
      <button
        onClick={reset}
        className="p-2 hover:text-white text-zinc-300 touch-manipulation"
        title="Reset"
      >
        <RotateCcw size={20} />
      </button>

      {/* Rotate Right */}
      <button
        onClick={() => rotate(90)}
        className="p-2 hover:text-white text-zinc-300 touch-manipulation"
        title="Rotate Right"
      >
        <RotateCw size={20} />
      </button>

      {/* Rotate Left */}
      <button
        onClick={() => rotate(-90)}
        className="p-2 hover:text-white text-zinc-300 touch-manipulation"
        title="Rotate Left"
      >
        <RotateCcw size={20} />
      </button>

      {/* Adjustments (mobile only) */}
      <button
        onClick={onToggleAdjustments}
        className="md:hidden p-2 hover:text-white text-zinc-300 touch-manipulation"
        title="Adjustments"
      >
        <SlidersHorizontal size={20} />
      </button>
    </aside>
  );
}
