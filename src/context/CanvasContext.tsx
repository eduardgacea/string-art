import { type CanvasState, type CanvasAction, type CanvasContextValue } from "../types/CanvasContext";
import { useReducer, createContext } from "react";

const initialState: CanvasState = {
  pinDistance: 0.5,
  canvasDiameter: 30,
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

  const setPinDistance = (pinDistance: number) => dispatch({ type: "setPinDistance", payload: pinDistance });
  const setCanvasDiameter = (pinDistance: number) => dispatch({ type: "setCanvasDiameter", payload: pinDistance });

  return (
    <CanvasContext.Provider value={{ pinDistance, canvasDiameter, setPinDistance, setCanvasDiameter }}>
      {children}
    </CanvasContext.Provider>
  );
}

export { CanvasContext, CanvasContextProvider };
