import { ReactNode, useRef, useState } from "react";

interface ChatDropZoneProps {
  children: ReactNode;
  onDrop: (e: React.DragEvent) => void;
  isOpen: boolean;
}

export default function ChatDropZone({
  children,
  onDrop,
  isOpen,
}: ChatDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(e);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropZoneRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`fixed bottom-4 sm:bottom-8 md:bottom-24 right-2 sm:right-4 md:right-8 w-[95vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] h-[70vh] sm:h-[550px] md:h-[600px] bg-white rounded-lg shadow-xl border-2 flex flex-col z-999 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl transition-all duration-200 ${
        isDragOver
          ? "border-[#0A5C2B] bg-green-50 shadow-2xl"
          : "border-gray-200"
      }`}
    >
      {children}
    </div>
  );
}
