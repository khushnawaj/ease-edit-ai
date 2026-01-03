"use client";

import { useRef, useState } from "react";
import { filters } from "fabric";

export default function useAIEnhance(canvasRef, imageRef, saveHistory) {
  const [enabled, setEnabled] = useState(false);
  const originalFiltersRef = useRef(null);

  const applyEnhance = () => {
    if (!canvasRef.current || !imageRef.current) return;

    const img = imageRef.current;

    // Save original filters only once
    if (!originalFiltersRef.current) {
      originalFiltersRef.current = img.filters
        ? img.filters.map(f => f)
        : [];
    }

    img.filters = [
      new filters.Brightness({ brightness: 0.05 }),
      new filters.Contrast({ contrast: 0.15 }),
      new filters.Saturation({ saturation: 0.2 }),
      new filters.Convolute({
        matrix: [
          0, -1, 0,
         -1,  5, -1,
          0, -1, 0
        ]
      })
    ];

    img.applyFilters();
    canvasRef.current.requestRenderAll();
    saveHistory();
    setEnabled(true);
  };

  const removeEnhance = () => {
    if (!canvasRef.current || !imageRef.current) return;

    const img = imageRef.current;

    img.filters = originalFiltersRef.current || [];
    originalFiltersRef.current = null;

    img.applyFilters();
    canvasRef.current.requestRenderAll();
    saveHistory();
    setEnabled(false);
  };

  return {
    enabled,
    toggleEnhance: () =>
      enabled ? removeEnhance() : applyEnhance()
  };
}
