"use client";

import { useEffect } from "react";
import { Canvas } from "fabric";

export default function EditorCanvas({ canvasRef, imageRef }) {
  useEffect(() => {
    if (canvasRef.current) return;

    const getSize = () => {
      const maxWidth = window.innerWidth < 768
        ? window.innerWidth - 32
        : 900;
      const width = Math.min(900, maxWidth);
      const height = width * (520 / 900);
      return { width, height };
    };

    const { width, height } = getSize();

    const canvas = new Canvas("ease-edit-canvas", {
      width,
      height,
      backgroundColor: "#111",
      preserveObjectStacking: true
    });

    canvasRef.current = canvas;

    const handleResize = () => {
      if (!canvasRef.current) return;

      const { width, height } = getSize();
      canvasRef.current.setDimensions({ width, height });

      if (imageRef.current) {
        canvasRef.current.centerObject(imageRef.current);
        imageRef.current.setCoords();
      }

      canvasRef.current.requestRenderAll();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.dispose();
      canvasRef.current = null;
      imageRef.current = null;
    };
  }, []);

  return (
    <canvas
      id="ease-edit-canvas"
      className="border border-zinc-800 rounded-lg max-w-full"
    />
  );
}
