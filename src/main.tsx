import { SimulationContextProvider } from "./context/SimulationContext.tsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SimulationContextProvider>
      <App />
    </SimulationContextProvider>
  </StrictMode>
);
