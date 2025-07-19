import { X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
      <h3 className="text-base sm:text-lg font-semibold text-[#0A5C2B]">
        BALLFiN 챗봇
      </h3>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 transition-colors p-1"
      >
        <X size={18} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
