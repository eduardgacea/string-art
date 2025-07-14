import { type CanvasState, type CanvasAction, type CanvasContextValue } from "../types/CanvasContext";
import { DEFAULT_CANVAS_SIZE, DEFAULT_PIN_DISTANCE } from "@/config/config";
import { useReducer, createContext } from "react";

const initialState: CanvasState = {
  pinDistance: DEFAULT_PIN_DISTANCE,
  canvasDiameter: DEFAULT_CANVAS_SIZE,
  file: null,
  fileError: null,
};

const CanvasContext = createContext<CanvasContextValue>({
  ...initialState,
  setPinDistance: () => {},
  setCanvasDiameter: () => {},
  resetParams: () => {},
  setFile: () => {},
  setFileError: () => {},
});

function reducer(prevState: CanvasState, action: CanvasAction): CanvasState {
  switch (action.type) {
    case "setPinDistance":
      return { ...prevState, pinDistance: action.payload };
    case "setCanvasDiameter":
      return { ...prevState, canvasDiameter: action.payload };
    case "setFile":
      return { ...prevState, file: action.payload, fileError: null };
    case "setFileError":
      return { ...prevState, fileError: action.payload, file: null };
    case "resetParams":
      return initialState;
    default:
      return prevState;
  }
}

function CanvasContextProvider({ children }: { children: React.ReactNode }) {
  const [{ pinDistance, canvasDiameter, file, fileError }, dispatch] = useReducer(reducer, initialState);

  const setPinDistance = (pinDistance: number[]) => dispatch({ type: "setPinDistance", payload: pinDistance[0] });
  const setCanvasDiameter = (canvasDiameter: number[]) =>
    dispatch({ type: "setCanvasDiameter", payload: canvasDiameter[0] });
  const resetParams = () => dispatch({ type: "resetParams" });
  const setFile = (file: File) => dispatch({ type: "setFile", payload: file });
  const setFileError = (error: Error) => dispatch({ type: "setFileError", payload: error });

  return (
    <CanvasContext.Provider
      value={{
        pinDistance,
        canvasDiameter,
        file,
        fileError,
        setPinDistance,
        setCanvasDiameter,
        resetParams,
        setFile,
        setFileError,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}

export { CanvasContext, CanvasContextProvider };
