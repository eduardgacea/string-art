export type CanvasState = {
  pinDistance: number;
  canvasDiameter: number;
};

export type CanvasAction =
  | { type: "setPinDistance"; payload: number }
  | { type: "setCanvasDiameter"; payload: number }
  | { type: "resetParams" };

export type CanvasContextValue = CanvasState & {
  setPinDistance: (pinDistance: number[]) => void;
  setCanvasDiameter: (canvasDiameter: number[]) => void;
  resetParams: () => void;
};
