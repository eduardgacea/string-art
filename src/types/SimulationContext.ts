export type SimulationState = {
  pinDistance: number;
  canvasDiameter: number;
  file: File | null;
  fileError: Error | null;
  isColorSimulation: boolean;
  isBrushedEnabled: boolean;
};

export type SimulationAction =
  | { type: "setPinDistance"; payload: number }
  | { type: "setCanvasDiameter"; payload: number }
  | { type: "setFile"; payload: File }
  | { type: "setFileError"; payload: Error }
  | { type: "setIsColorSimulation"; payload: boolean }
  | { type: "setIsBrushEnabled"; payload: boolean }
  | { type: "resetParams" };

export type SimulationContextValue = SimulationState & {
  setPinDistance: (pinDistance: number[]) => void;
  setCanvasDiameter: (canvasDiameter: number[]) => void;
  setFile: (file: File) => void;
  setFileError: (error: Error) => void;
  setIsColorSimulation: (isColorSimulation: boolean) => void;
  setIsBrushEnabled: (isBrushEnabled: boolean) => void;
  resetParams: () => void;
};
