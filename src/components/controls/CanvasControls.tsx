import {
  CANVAS_DIAMETER_STEP,
  MAX_CANVAS_SIZE,
  MAX_PIN_DISTANCE,
  MIN_CANVAS_SIZE,
  MIN_PIN_DISTANCE,
  PIN_DISTANCE_STEP,
} from "@/config/config";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SimulationContext } from "@/context/SimulationContext";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useContext } from "react";

type CanvasControlsProps = {
  className?: string;
};

function CanvasControls({ className }: CanvasControlsProps) {
  const simulationContext = useContext(SimulationContext);

  return (
    <Card className={`${className} `}>
      <CardHeader>
        <CardTitle className="text-xl">Simulation params</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div>Canvas diameter</div>
            <div>{`${simulationContext.canvasDiameter} cm`}</div>
          </div>
          <Slider
            min={MIN_CANVAS_SIZE}
            max={MAX_CANVAS_SIZE}
            value={[simulationContext.canvasDiameter]}
            step={CANVAS_DIAMETER_STEP}
            onValueChange={simulationContext.setCanvasDiameter}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div>Pin distance</div>
            <div>{`${simulationContext.pinDistance * 10} mm`}</div>
          </div>
          <Slider
            min={MIN_PIN_DISTANCE}
            max={MAX_PIN_DISTANCE}
            value={[simulationContext.pinDistance]}
            step={PIN_DISTANCE_STEP}
            onValueChange={simulationContext.setPinDistance}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox disabled={true} />
          <div className="flex gap-4">
            <span className="text-muted-light">Color simulation </span>
            <span>Coming soon!</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div>
            {simulationContext.fileError && (
              <span className="text-destructive">{simulationContext.fileError.message}</span>
            )}
            {!simulationContext.fileError && simulationContext.file && (
              <span className="font-medium">{simulationContext.file.name}</span>
            )}
          </div>
          <div className="flex gap-4">
            <Button>Generate</Button>
            <Button variant={"outline"} onClick={simulationContext.resetParams}>
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CanvasControls;
