import { useEffect } from "react";

export function useOnWheel(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  incrementBrush: (increment: 1 | -1) => void
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const increment = e.deltaY < 0 ? -1 : 1;
      incrementBrush(increment);
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [incrementBrush, canvasRef]);
}
