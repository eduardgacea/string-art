import { type SimulationContextValue } from "@/types/SimulationContext";
import { ALLOWED_FILE_TYPES } from "@/config/config";

export function validateFiles(simulationContext: SimulationContextValue, files: FileList | null) {
  try {
    if (!files) throw new Error("No files selected");
    if (files.length > 1) throw new Error("Multiple files selected");
    const file = files[0];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !ALLOWED_FILE_TYPES.includes(fileExtension)) throw new Error("Invalid file type");
    simulationContext.setFile(file);
  } catch (e) {
    if (!(e instanceof Error)) {
      throw new Error("Unrecognized error type");
    }
    if (typeof e === "string") simulationContext.setFileError(new Error(e));
    else if (e instanceof Error) simulationContext.setFileError(e);
  }
}

export function initCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  if (!canvasRef.current) return;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  return { canvas, ctx };
}
