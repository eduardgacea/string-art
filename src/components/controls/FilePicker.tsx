import { ALLOWED_FILE_TYPES } from "@/config/config";
import { CanvasContext } from "@/context/CanvasContext";
import { useContext, useRef } from "react";

type FilePickerProps = {
  className?: string;
};

function FilePicker({ className }: FilePickerProps) {
  const canvasContext = useContext(CanvasContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!files) throw new Error("No files selected");
      if (files.length > 1) throw new Error("Multiple files selected");
      const file = files[0];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !ALLOWED_FILE_TYPES.includes(fileExtension)) throw new Error("Invalid file type");
      canvasContext.setFile(file);
    } catch (e) {
      if (!(e instanceof Error)) {
        throw new Error("Unrecognized error type");
      }
      if (typeof e === "string") canvasContext.setFileError(new Error(e));
      else if (!(e instanceof Error)) canvasContext.setFileError(e);
    }
  };

  return (
    <div
      className={`${className} h-48 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm justify-center items-center`}
    >
      <div className="h-[100%] aspect-square border border-dashed border-primary flex justify-center items-center px-0 flex-col">
        <p className="text-sm">Drop image here</p>
        {/* prettier-ignore */}
        <p className="text-xs">or <span onClick={handleClick} role="button" className="underline cursor-pointer">click</span> to browse
        </p>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        accept={ALLOWED_FILE_TYPES.map((ext) => `.${ext}`).join(",")}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}

export default FilePicker;
