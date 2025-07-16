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
    ctx.beginPath();
    ctx.arc(mousePosRef.current.x, mousePosRef.current.y, brushSizeRef.current, 0, 2 * Math.PI);
    ctx.strokeStyle = "red";
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
