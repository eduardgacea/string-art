import { SimulationContext } from "@/context/SimulationContext";
import { useContext, useEffect } from "react";
import { initCanvas } from "@/lib/helpers";

export function useLoadImageToCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  imageRef: React.RefObject<HTMLImageElement | null>
) {
  const simulationContext = useContext(SimulationContext);

  useEffect(() => {
    const file = simulationContext.file;
    const result = initCanvas(canvasRef);
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
  }, [simulationContext.file, canvasRef, imageRef]);
}
