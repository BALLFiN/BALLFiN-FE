import { Send, X, Paperclip } from "lucide-react";
import NewsInfoCard from "./NewsInfoCard";

interface NewsInfo {
  id: string;
  title: string;
  press?: string;
  published_at?: string;
  summary?: string;
  impact?: string;
}

interface ChatInputProps {
  message: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  onFileAttach?: () => void;
  isLoading?: boolean;
  newsInfo?: NewsInfo | null;
  onRemoveNews?: () => void;
}

export default function ChatInput({
  message,
  onChange,
  onSubmit,
  onFileAttach,
  isLoading = false,
  newsInfo,
  onRemoveNews,
}: ChatInputProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="p-4 sm:p-5 bg-gray-50/50 border-t border-gray-100"
    >
      {/* 뉴스 정보 카드 */}
      {newsInfo && (
        <div className="mb-4 max-w-2xl mx-auto">
          <NewsInfoCard
            title={newsInfo.title}
            press={newsInfo.press}
            published_at={newsInfo.published_at}
            summary={newsInfo.summary}
            impact={newsInfo.impact}
            onRemove={onRemoveNews}
          />
        </div>
      )}

      <div className="flex gap-3 sm:gap-4 max-w-2xl mx-auto">
        <div className="relative flex-1 min-w-0">
          <textarea
            value={message}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (message.trim()) {
                  onSubmit();
                }
              }
            }}
            placeholder="메시지를 입력하세요..."
            disabled={isLoading}
            rows={Math.min(3, Math.max(1, message.split("\n").length))}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20 focus:border-[#0A5C2B] disabled:bg-gray-50 disabled:cursor-not-allowed resize-none text-sm sm:text-base placeholder-gray-400 transition-all duration-200 shadow-sm"
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />
          {message && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2.5 right-2.5 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <X size={16} className="sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onFileAttach}
            disabled={isLoading}
            className="p-3 sm:p-3.5 text-gray-500 hover:text-[#0A5C2B] hover:bg-[#0A5C2B]/5 rounded-2xl transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            title="파일 첨부"
            style={{ height: "44px", width: "44px" }}
          >
            <Paperclip size={18} className="sm:w-5 sm:h-5" />
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="p-3 sm:p-3.5 bg-[#0A5C2B] text-white rounded-2xl hover:bg-[#0A5C2B]/90 active:scale-95 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            style={{ height: "44px", width: "44px" }}
          >
            <Send size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}
