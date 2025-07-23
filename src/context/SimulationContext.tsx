import { type SimulationState, type SimulationAction, type SimulationContextValue } from "../types/SimulationContext";
import { DEFAULT_CANVAS_SIZE, DEFAULT_PIN_DISTANCE } from "@/config/config";
import { useReducer, createContext, useCallback } from "react";

const initialState: SimulationState = {
  pinDistance: DEFAULT_PIN_DISTANCE,
  canvasDiameter: DEFAULT_CANVAS_SIZE,
  file: null,
  fileError: null,
  isColorSimulation: false,
  isBrushedEnabled: true,
};

const SimulationContext = createContext<SimulationContextValue>({
  ...initialState,
  setPinDistance: () => {},
  setCanvasDiameter: () => {},
  setFile: () => {},
  setFileError: () => {},
  setIsColorSimulation: () => {},
  setIsBrushEnabled: () => {},
  resetParams: () => {},
});

function reducer(prevState: SimulationState, action: SimulationAction): SimulationState {
  switch (action.type) {
    case "setPinDistance":
      return { ...prevState, pinDistance: action.payload };
    case "setCanvasDiameter":
      return { ...prevState, canvasDiameter: action.payload };
    case "setFile":
      return { ...prevState, file: action.payload, fileError: null };
    case "setFileError":
      return { ...prevState, fileError: action.payload, file: null };
    case "setIsColorSimulation":
      return { ...prevState, isColorSimulation: action.payload };
    case "setIsBrushEnabled":
      return { ...prevState, isBrushedEnabled: action.payload };
    case "resetParams":
      return initialState;
    default:
      return prevState;
  }
}

function SimulationContextProvider({ children }: { children: React.ReactNode }) {
  const [{ pinDistance, canvasDiameter, file, fileError, isColorSimulation, isBrushedEnabled }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const setPinDistance = (pinDistance: number[]) => dispatch({ type: "setPinDistance", payload: pinDistance[0] });
  const setCanvasDiameter = (canvasDiameter: number[]) =>
    dispatch({ type: "setCanvasDiameter", payload: canvasDiameter[0] });
  const setFile = (file: File) => dispatch({ type: "setFile", payload: file });
  const setFileError = (error: Error) => dispatch({ type: "setFileError", payload: error });
  const setIsColorSimulation = (isColorSimulation: boolean) =>
    dispatch({ type: "setIsColorSimulation", payload: isColorSimulation });
  const setIsBrushEnabled = useCallback((isBrushedEnabled: boolean) => {
    dispatch({ type: "setIsBrushEnabled", payload: isBrushedEnabled });
  }, []);
  const resetParams = () => dispatch({ type: "resetParams" });

  return (
    <SimulationContext.Provider
      value={{
        pinDistance,
        canvasDiameter,
        file,
        fileError,
        isColorSimulation,
        isBrushedEnabled,
        setPinDistance,
        setCanvasDiameter,
        setFile,
        setFileError,
        setIsColorSimulation,
        setIsBrushEnabled,
        resetParams,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export { SimulationContext, SimulationContextProvider };
