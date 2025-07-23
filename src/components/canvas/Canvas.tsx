import { useLoadImageToCanvas } from "@/hooks/canvas/useLoadImageToCanvas";
import { useOnWheel } from "@/hooks/canvas/useOnWheel";
import { useBrush } from "@/hooks/canvas/useBrush";
import { MAX_BRUSH_SIZE } from "@/config/config";
import { useRef } from "react";

function Canvas() {
  const srcCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const dstCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const { setMousePos, incrementBrush, fadeToAlpha } = useBrush(srcCanvasRef, imageRef);
  useOnWheel(srcCanvasRef, incrementBrush);
  useLoadImageToCanvas(srcCanvasRef, imageRef);

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    setMousePos({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    });
  };

  const onMouseLeave = () => {
    setMousePos({
      x: -MAX_BRUSH_SIZE * 2,
      y: -MAX_BRUSH_SIZE * 2,
    });
    fadeToAlpha(0);
  };

  const onMouseEnter = () => {
    fadeToAlpha(0.5);
  };

  return (
    <>
      <canvas
        ref={srcCanvasRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        className="max-w-[100%] self-start md:max-w-[90%] 2xl:max-w-[75%]"
      ></canvas>
      <canvas ref={dstCanvasRef} className="hidden"></canvas>
    </>
  );
}

export default Canvas;
