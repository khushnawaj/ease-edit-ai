"use client";

import { Image as FabricImage } from "fabric";

export default function useAIUpscale(canvasRef, imageRef, saveHistory) {
  const upscale = async (scale = 2) => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;

    // Export high-resolution image
    const dataURL = canvas.toDataURL({
      format: "png",
      multiplier: scale
    });

    // Load back as new Fabric image
    FabricImage.fromURL(dataURL).then((img) => {
      // Clear canvas safely
      canvas.clear();

      // Restore background (Fabric v7 way)
      canvas.backgroundColor = "#111";

      // Fit image back into canvas
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

      imageRef.current = img;
      canvas.requestRenderAll();
      saveHistory();
    });
  };

  return { upscale };
}
