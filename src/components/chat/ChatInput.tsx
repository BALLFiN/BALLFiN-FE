import { Send, Menu } from "lucide-react";

interface ChatInputProps {
  message: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  onToggleMenu: () => void;
  isLoading?: boolean;
}

export default function ChatInput({
  message,
  onChange,
  onSubmit,
  onToggleMenu,
  isLoading = false,
}: ChatInputProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="p-4 border-t border-gray-200"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => onChange(e.target.value)}
          placeholder="메시지를 입력하세요..."
          disabled={isLoading}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onToggleMenu}
            disabled={isLoading}
            className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Menu size={20} />
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-[#0A5C2B] text-white rounded-lg hover:bg-[#0A5C2B]/90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </form>
  );
}
