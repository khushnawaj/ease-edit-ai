"use client";

import { useRef } from "react";
import { Rect } from "fabric";

export default function CropControls({ canvasRef, imageRef, saveHistory }) {
  const cropRectRef = useRef(null);

  const startCrop = () => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const img = imageRef.current;

    // Normalize image before crop
    img.set({
      angle: 0,
      clipPath: null
    });
    canvas.centerObject(img);
    img.setCoords();

    if (cropRectRef.current) {
      canvas.remove(cropRectRef.current);
    }

    const rect = new Rect({
      left: img.left,
      top: img.top,
      width: img.getScaledWidth() * 0.6,
      height: img.getScaledHeight() * 0.6,
      fill: "rgba(0,0,0,0.3)",
      stroke: "#fff",
      strokeDashArray: [6, 4],
      selectable: true,
      hasRotatingPoint: false,
      cornerColor: "#fff",
      cornerSize: 10
    });

    cropRectRef.current = rect;
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.requestRenderAll();
  };

  const applyCrop = () => {
    if (!cropRectRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const img = imageRef.current;
    const rect = cropRectRef.current;

    const scaleX = img.scaleX;
    const scaleY = img.scaleY;

    const cropLeft = (rect.left - img.left) / scaleX;
    const cropTop = (rect.top - img.top) / scaleY;
    const cropWidth = rect.width / scaleX;
    const cropHeight = rect.height / scaleY;

    img.clipPath = new Rect({
      left: cropLeft,
      top: cropTop,
      width: cropWidth,
      height: cropHeight,
      absolutePositioned: false
    });

    canvas.remove(rect);
    cropRectRef.current = null;
    img.setCoords();
    canvas.requestRenderAll();
    saveHistory();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={startCrop}
        className="bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded text-xs"
      >
        Crop
      </button>

      <button
        onClick={applyCrop}
        className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded text-xs"
      >
        Apply
      </button>
    </div>
  );
}
