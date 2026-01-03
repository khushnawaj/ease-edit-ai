import { useRef } from "react";

export default function useFabricCanvas() {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);

  const saveHistory = () => {
    if (!imageRef.current) return;
    const img = imageRef.current;

    const snapshot = {
      filters: img.filters ? img.filters.map(f => f) : [],
      angle: img.angle || 0,
      scaleX: img.scaleX,
      scaleY: img.scaleY,
      left: img.left,
      top: img.top,
      clipPath: img.clipPath ? img.clipPath.clone() : null
    };

    historyRef.current = historyRef.current.slice(
      0,
      historyIndexRef.current + 1
    );

    historyRef.current.push(snapshot);
    historyIndexRef.current++;
  };

  const applySnapshot = (snap) => {
    const img = imageRef.current;
    if (!img) return;

    img.filters = snap.filters.map(f => f);
    img.angle = snap.angle;
    img.scaleX = snap.scaleX;
    img.scaleY = snap.scaleY;
    img.left = snap.left;
    img.top = snap.top;
    img.clipPath = snap.clipPath ? snap.clipPath.clone() : null;

    img.applyFilters();
    img.setCoords();
    canvasRef.current.requestRenderAll();
  };

  const undo = () => {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current--;
    applySnapshot(historyRef.current[historyIndexRef.current]);
  };

  const reset = () => {
    if (!historyRef.current.length) return;
    historyIndexRef.current = 0;
    applySnapshot(historyRef.current[0]);
  };

  return {
    canvasRef,
    imageRef,
    saveHistory,
    undo,
    reset
  };
}
