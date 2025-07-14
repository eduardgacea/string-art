export type SimulationState = {
  pinDistance: number;
  canvasDiameter: number;
  file: File | null;
  fileError: Error | null;
  isColorSimulation: boolean;
};

export type SimulationAction =
  | { type: "setPinDistance"; payload: number }
  | { type: "setCanvasDiameter"; payload: number }
  | { type: "setFile"; payload: File }
  | { type: "setFileError"; payload: Error }
  | { type: "setIsColorSimulation"; payload: boolean }
  | { type: "resetParams" };

export type SimulationStateValue = SimulationState & {
  setPinDistance: (pinDistance: number[]) => void;
  setCanvasDiameter: (canvasDiameter: number[]) => void;
  setFile: (file: File) => void;
  setFileError: (error: Error) => void;
  setIsColorSimulation: (preference: boolean) => void;
  resetParams: () => void;
};
