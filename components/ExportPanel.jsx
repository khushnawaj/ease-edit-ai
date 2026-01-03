"use client";

export default function ExportPanel({ canvasRef }) {
  const downloadImage = (format, quality = 1) => {
    if (!canvasRef.current) return;

    const dataURL = canvasRef.current.toDataURL({
      format,
      quality,
      multiplier: 2 // higher resolution export
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `ease-edit-ai.${format}`;
    link.click();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-zinc-300">
        Export
      </h3>

      {/* PNG */}
      <button
        onClick={() => downloadImage("png")}
        className="w-full bg-zinc-800 hover:bg-zinc-700 text-sm py-2 rounded"
      >
        Download PNG
      </button>

      {/* JPG */}
      <button
        onClick={() => downloadImage("jpeg", 0.9)}
        className="w-full bg-zinc-800 hover:bg-zinc-700 text-sm py-2 rounded"
      >
        Download JPG (High)
      </button>

      <button
        onClick={() => downloadImage("jpeg", 0.7)}
        className="w-full bg-zinc-800 hover:bg-zinc-700 text-sm py-2 rounded"
      >
        Download JPG (Medium)
      </button>
    </div>
  );
}
