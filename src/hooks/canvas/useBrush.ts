import { BRUSH_SIZE_STEP, DEFAULT_BRUSH_SIZE } from "@/config/config";
import { useRef, useCallback, useContext, useEffect } from "react";
import { SimulationContext } from "@/context/SimulationContext";
import type { Vector2 } from "@/types/Canvas";
import { initCanvas } from "@/lib/helpers";

export function useBrush(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  imageRef: React.RefObject<HTMLImageElement | null>
) {
  const simulationContext = useContext(SimulationContext);
  const mousePosRef = useRef<Vector2>({ x: 0, y: 0 });
  const brushSizeRef = useRef(DEFAULT_BRUSH_SIZE);
  const overlayAlphaRef = useRef(0);
  const animationFrame = useRef<number | null>(null);
  const brushEnabledRef = useRef(simulationContext.isBrushedEnabled);

  useEffect(() => {
    brushEnabledRef.current = simulationContext.isBrushedEnabled;
  }, [simulationContext.isBrushedEnabled]);

  const draw = useCallback(() => {
    if (!brushEnabledRef.current) return;
    const result = initCanvas(canvasRef);
    if (!result) return;
    const { canvas, ctx } = result;
    const img = imageRef.current;
    if (!img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // Overlay dim with animated alpha
    ctx.fillStyle = `rgba(0, 0, 0, ${overlayAlphaRef.current})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Brush hole
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(mousePosRef.current.x, mousePosRef.current.y, brushSizeRef.current, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    // Re-render clear image in hole
    ctx.save();
    ctx.beginPath();
    ctx.arc(mousePosRef.current.x, mousePosRef.current.y, brushSizeRef.current, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, 0, 0);
    ctx.restore();

    // Brush stroke
    ctx.beginPath();
    ctx.arc(mousePosRef.current.x, mousePosRef.current.y, brushSizeRef.current, 0, 2 * Math.PI);
    ctx.strokeStyle = "oklch(0.645 0.246 16.439)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [canvasRef, imageRef]);

  const setMousePos = useCallback(
    (pos: Vector2) => {
      if (!brushEnabledRef.current) return;
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

  const fadeToAlpha = useCallback(
    (target: number) => {
      if (!brushEnabledRef.current) return;
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);

      const animate = () => {
        const alpha = overlayAlphaRef.current;
        const delta = 0.01;

        if (Math.abs(target - alpha) < delta) {
          overlayAlphaRef.current = target;
          draw();
          return;
        }

        overlayAlphaRef.current += alpha < target ? delta : -delta;
        overlayAlphaRef.current = Math.min(Math.max(overlayAlphaRef.current, 0), 1);
        draw();
        animationFrame.current = requestAnimationFrame(animate);
      };

      animate();
    },
    [draw]
  );

  const clipCurrentBrushArea = useCallback(() => {
    const result = initCanvas(canvasRef);
    if (!result) return;
    const { canvas, ctx } = result;
    const img = imageRef.current;
    if (!img) return;

    const { x, y } = mousePosRef.current;
    const radius = brushSizeRef.current;
    const size = radius * 2;

    // 1. Create circular clipped version on offscreen canvas
    const offCanvas = document.createElement("canvas");
    offCanvas.width = size;
    offCanvas.height = size;
    const offCtx = offCanvas.getContext("2d");
    if (!offCtx) return;

    // Draw only the circular part of image
    offCtx.save();
    offCtx.beginPath();
    offCtx.arc(radius, radius, radius, 0, 2 * Math.PI);
    offCtx.clip();
    offCtx.drawImage(img, x - radius, y - radius, size, size, 0, 0, size, size);
    offCtx.restore();

    // 2. Clear original canvas and draw the cropped circle centered
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offCanvas, (canvas.width - size) / 2, (canvas.height - size) / 2);

    // 3. Disable brush + overlay
    simulationContext.setIsBrushEnabled(false);
    overlayAlphaRef.current = 0;
  }, [canvasRef, imageRef, simulationContext]);

  return { setMousePos, incrementBrush, fadeToAlpha, clipCurrentBrushArea };
}
