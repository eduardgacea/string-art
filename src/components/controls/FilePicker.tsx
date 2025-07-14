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

// import { ALLOWED_FILE_TYPES } from "@/config/config";
// import { CanvasContext } from "@/context/CanvasContext";
// import { useContext, useRef, useState } from "react";

// type FilePickerProps = {
//   className?: string;
// };

// function FilePicker({ className }: FilePickerProps) {
//   const canvasContext = useContext(CanvasContext);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isDragging, setIsDragging] = useState(false);

//   const handleClick = () => {
//     fileInputRef?.current?.click();
//   };

//   const handleFile = (file: File) => {
//     const fileExtension = file.name.split(".").pop()?.toLowerCase();
//     if (!fileExtension || !ALLOWED_FILE_TYPES.includes(fileExtension)) {
//       canvasContext.setFileError(new Error("Invalid file type"));
//       return;
//     }
//     canvasContext.setFile(file);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     try {
//       const files = e.target.files;
//       if (!files) throw new Error("No files selected");
//       if (files.length > 1) throw new Error("Multiple files selected");
//       handleFile(files[0]);
//     } catch (e) {
//       if (e instanceof Error) {
//         canvasContext.setFileError(e);
//       } else {
//         canvasContext.setFileError(new Error("Unrecognized error type"));
//       }
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = e.dataTransfer.files;
//     if (!files || files.length === 0) {
//       canvasContext.setFileError(new Error("No files dropped"));
//       return;
//     }
//     if (files.length > 1) {
//       canvasContext.setFileError(new Error("Multiple files dropped"));
//       return;
//     }
//     handleFile(files[0]);
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   return (
//     <div
//       className={`${className} h-48 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm justify-center items-center`}
//     >
//       <div
//         className={`h-[100%] aspect-square border border-dashed border-primary flex justify-center items-center px-0 flex-col transition-colors ${
//           isDragging ? "bg-primary/10 border-primary/70" : ""
//         }`}
//         onClick={handleClick}
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDragEnd={handleDragLeave}
//         tabIndex={0}
//         role="button"
//       >
//         <p className="text-sm">Drop image here</p>
//         <p className="text-xs">
//           or{" "}
//           <span className="underline cursor-pointer">click</span> to browse
//         </p>
//       </div>
//       <input
//         type="file"
//         ref={fileInputRef}
//         accept={ALLOWED_FILE_TYPES.map((ext) => `.${ext}`).join(",")}
//         onChange={handleFileSelect}
//         className="hidden"
//       />
//     </div>
//   );
// }

// export default FilePicker;
