import { type Vector2 } from "./Canvas";

export type UseBrushState = {
  mousePos: Vector2;
  brushSize: number;
};

export type UseBrushAction = { type: "setMousePos"; payload: Vector2 } | { type: "incrementBrush"; payload: 1 | -1 };
