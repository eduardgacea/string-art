import { useContext, useEffect, useRef, useState } from "react";
import { CanvasContext } from "@/context/CanvasContext";
import { ALLOWED_FILE_TYPES } from "@/config/config";
import { validateFiles } from "@/lib/helpers";

type FilePickerProps = {
  className?: string;
};

function FilePicker({ className }: FilePickerProps) {
  const canvasContext = useContext(CanvasContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!canvasContext.file && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [canvasContext.file]);

  const handleClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    validateFiles(canvasContext, files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setIsDragging(false);
    validateFiles(canvasContext, files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div
      className={`${className} h-48 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm justify-center items-center`}
    >
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`h-[100%] aspect-square border border-dashed border-primary flex justify-center items-center px-0 flex-col ${
          isDragging && "bg-primary/10 border-primary/70"
        }`}
      >
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
