import { type CanvasState, type CanvasAction, type CanvasContextValue } from "../types/CanvasContext";
import { DEFAULT_CANVAS_SIZE, DEFAULT_PIN_DISTANCE } from "@/config/config";
import { useReducer, createContext } from "react";

const initialState: CanvasState = {
  pinDistance: DEFAULT_PIN_DISTANCE,
  canvasDiameter: DEFAULT_CANVAS_SIZE,
};

const CanvasContext = createContext<CanvasContextValue>({
  ...initialState,
  setPinDistance: () => {},
  setCanvasDiameter: () => {},
});

function reducer(prevState: CanvasState, action: CanvasAction): CanvasState {
  switch (action.type) {
    case "setPinDistance":
      return { ...prevState, pinDistance: action.payload };
    case "setCanvasDiameter":
      return { ...prevState, canvasDiameter: action.payload };
    default:
      return prevState;
  }
}

function CanvasContextProvider({ children }: { children: React.ReactNode }) {
  const [{ pinDistance, canvasDiameter }, dispatch] = useReducer(reducer, initialState);

  const setPinDistance = (pinDistance: number[]) => dispatch({ type: "setPinDistance", payload: pinDistance[0] });
  const setCanvasDiameter = (canvasDiameter: number[]) =>
    dispatch({ type: "setCanvasDiameter", payload: canvasDiameter[0] });

  return (
    <CanvasContext.Provider value={{ pinDistance, canvasDiameter, setPinDistance, setCanvasDiameter }}>
      {children}
    </CanvasContext.Provider>
  );
}

export { CanvasContext, CanvasContextProvider };
