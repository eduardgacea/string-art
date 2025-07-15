import { SimulationContext } from "@/context/SimulationContext";
import { useState, useContext, useEffect, useRef } from "react";
import { BRUSH_SIZE_STEP } from "@/config/config";
import { type Vector2 } from "../../types/Canvas";
import { initCanvas } from "@/lib/helpers";

const PI = Math.PI;

function Canvas() {
  const simulationContext = useContext(SimulationContext);

  const srcCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const dstCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [mousePos, setMousePos] = useState<Vector2>({ x: 0, y: 0 });
  const [brushSize, setBrushSize] = useState(32);

  useEffect(() => {
    const file = simulationContext.file;
    const result = initCanvas(srcCanvasRef);
    if (!result) return;
    const { canvas: srcCanvas, ctx: srcCtx } = result;

    if (!file) {
      srcCtx.clearRect(0, 0, srcCanvas.width, srcCanvas.height);
      srcCanvas.width = 0;
      srcCanvas.height = 0;
      imageRef.current = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        srcCanvas.width = img.width;
        srcCanvas.height = img.height;
        srcCtx.drawImage(img, 0, 0);
        imageRef.current = img;
      };
      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  }, [simulationContext.file]);

  useEffect(() => {
    const result = initCanvas(srcCanvasRef);
    if (!result) return;
    const { canvas: srcCanvas, ctx: srcCtx } = result;
    const img = imageRef.current;
    if (!img) return;
    srcCtx.clearRect(0, 0, srcCanvas.width, srcCanvas.height);
    srcCtx.drawImage(img, 0, 0);
    srcCtx.beginPath();
    srcCtx.arc(mousePos.x, mousePos.y, brushSize, 0, 2 * PI);
    srcCtx.strokeStyle = "red";
    srcCtx.lineWidth = 2;
    srcCtx.stroke();
  }, [mousePos, brushSize]);

  useEffect(() => {
    const canvas = srcCanvasRef.current;
    if (!canvas) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      setBrushSize((prev) => {
        const newBrushSize = e.deltaY < 0 ? prev + BRUSH_SIZE_STEP : prev - BRUSH_SIZE_STEP;
        return Math.max(0, newBrushSize);
      });
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, []);

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
      x: -brushSize * 2,
      y: -brushSize * 2,
    });
  };

  return (
    <>
      <canvas
        ref={srcCanvasRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="max-w-[100%] self-start md:max-w-[90%] 2xl:max-w-[75%]"
      ></canvas>
      <canvas ref={dstCanvasRef} className="hidden"></canvas>
    </>
  );
}

export default Canvas;
