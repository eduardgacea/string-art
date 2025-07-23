import { BRUSH_SIZE_STEP, DEFAULT_BRUSH_SIZE } from "@/config/config";
import type { Vector2 } from "@/types/Canvas";
import { useRef, useCallback } from "react";
import { initCanvas } from "@/lib/helpers";

export function useBrush(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  imageRef: React.RefObject<HTMLImageElement | null>
) {
  const mousePosRef = useRef<Vector2>({ x: 0, y: 0 });
  const brushSizeRef = useRef(DEFAULT_BRUSH_SIZE);

  const draw = useCallback(() => {
    const result = initCanvas(canvasRef);
    if (!result) return;
    const { canvas, ctx } = result;
    const img = imageRef.current;
    if (!img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // Overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Erase brush hole
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(mousePosRef.current.x, mousePosRef.current.y, brushSizeRef.current, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    // Redraw image
    ctx.save();
    ctx.beginPath();
    ctx.arc(mousePosRef.current.x, mousePosRef.current.y, brushSizeRef.current, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, 0, 0);
    ctx.restore();

    // Brush border
    ctx.beginPath();
    ctx.arc(mousePosRef.current.x, mousePosRef.current.y, brushSizeRef.current, 0, 2 * Math.PI);
    ctx.strokeStyle = "oklch(0.645 0.246 16.439)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [canvasRef, imageRef]);

  const setMousePos = useCallback(
    (pos: Vector2) => {
      mousePosRef.current = pos;
      draw();
    },
    [draw]
  );

  const incrementBrush = useCallback(
    (inc: 1 | -1) => {
      const newSize = brushSizeRef.current + inc * BRUSH_SIZE_STEP;
      if (newSize >= 0) brushSizeRef.current = newSize;
      draw();
    },
    [draw]
  );

  return { setMousePos, incrementBrush };
}
