export type CanvasState = {
  pinDistance: number;
  canvasDiameter: number;
  file: File | null;
  fileError: Error | null;
};

export type CanvasAction =
  | { type: "setPinDistance"; payload: number }
  | { type: "setCanvasDiameter"; payload: number }
  | { type: "resetParams" }
  | { type: "setFile"; payload: File }
  | { type: "setFileError"; payload: Error };

export type CanvasContextValue = CanvasState & {
  setPinDistance: (pinDistance: number[]) => void;
  setCanvasDiameter: (canvasDiameter: number[]) => void;
  resetParams: () => void;
  setFile: (file: File) => void;
  setFileError: (error: Error) => void;
};
