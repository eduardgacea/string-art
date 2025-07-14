import { SimulationContext } from "@/context/SimulationContext";
import { useContext, useEffect, useRef } from "react";

function Canvas() {
  const simulationContext = useContext(SimulationContext);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    console.log("use effect ran");
    const file = simulationContext.file;
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!file) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = 0;
      canvas.height = 0;
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  }, [simulationContext.file]);

  return <canvas ref={canvasRef} className="max-w-[100%] self-start md:max-w-[90%] 2xl:max-w-[75%]"></canvas>;
}

export default Canvas;
