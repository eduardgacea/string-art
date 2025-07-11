import { CANVAS_DIAMETER_STEP, MAX_CANVAS_SIZE, MIN_CANVAS_SIZE } from "@/config/config";
import { CanvasContext } from "@/context/CanvasContext";
import { Slider } from "@/components/ui/slider";
import { useContext } from "react";

function CanvasControls() {
  const canvasContext = useContext(CanvasContext);

  return (
    <div>
      <Slider
        min={MIN_CANVAS_SIZE}
        max={MAX_CANVAS_SIZE}
        value={[canvasContext.canvasDiameter]}
        step={CANVAS_DIAMETER_STEP}
        onValueChange={canvasContext.setCanvasDiameter}
      />
    </div>
  );
}

export default CanvasControls;
