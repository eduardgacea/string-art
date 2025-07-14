import {
  CANVAS_DIAMETER_STEP,
  MAX_CANVAS_SIZE,
  MAX_PIN_DISTANCE,
  MIN_CANVAS_SIZE,
  MIN_PIN_DISTANCE,
  PIN_DISTANCE_STEP,
} from "@/config/config";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CanvasContext } from "@/context/CanvasContext";
import { Slider } from "@/components/ui/slider";
import { useContext } from "react";
import { Button } from "../ui/button";

type CanvasControlsProps = {
  className?: string;
};

function CanvasControls({ className }: CanvasControlsProps) {
  const canvasContext = useContext(CanvasContext);

  return (
    <Card className={`${className} `}>
      <CardHeader>
        <CardTitle className="text-xl">Simulation params</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div>Canvas diameter</div>
            <div>{`${canvasContext.canvasDiameter} cm`}</div>
          </div>
          <Slider
            min={MIN_CANVAS_SIZE}
            max={MAX_CANVAS_SIZE}
            value={[canvasContext.canvasDiameter]}
            step={CANVAS_DIAMETER_STEP}
            onValueChange={canvasContext.setCanvasDiameter}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div>Pin distance</div>
            <div>{`${canvasContext.pinDistance * 10} mm`}</div>
          </div>
          <Slider
            min={MIN_PIN_DISTANCE}
            max={MAX_PIN_DISTANCE}
            value={[canvasContext.pinDistance]}
            step={PIN_DISTANCE_STEP}
            onValueChange={canvasContext.setPinDistance}
          />
        </div>
        <div className="flex gap-4 justify-between items-center">
          <div>
            {canvasContext.fileError && <span className="text-destructive">{canvasContext.fileError.message}</span>}
            {!canvasContext.fileError && canvasContext.file && <span>{canvasContext.file.name}</span>}
          </div>
          <div className="flex gap-4">
            <Button>Generate</Button>
            <Button variant={"outline"} onClick={canvasContext.resetParams}>
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CanvasControls;
