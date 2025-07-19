import { Send, Menu, X, Clock, Newspaper } from "lucide-react";

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
  onToggleMenu: () => void;
  isLoading?: boolean;
  newsInfo?: NewsInfo | null;
  onRemoveNews?: () => void;
}

export default function ChatInput({
  message,
  onChange,
  onSubmit,
  onToggleMenu,
  isLoading = false,
  newsInfo,
  onRemoveNews,
}: ChatInputProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getImpactColor = (impact?: string) => {
    switch (impact) {
      case "positive":
        return "text-green-600 bg-green-50";
      case "negative":
        return "text-red-600 bg-red-50";
      case "neutral":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getImpactText = (impact?: string) => {
    switch (impact) {
      case "positive":
        return "긍정";
      case "negative":
        return "부정";
      case "neutral":
        return "중립";
      default:
        return "중립";
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="p-3 sm:p-4 "
    >
      {/* 뉴스 정보 카드 */}
      {newsInfo && (
        <div className="mb-3 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm max-w-2xl mx-auto">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Newspaper className="w-4 h-4 text-blue-600" />
                  <h4 className="font-medium text-blue-900 text-sm sm:text-base">
                    드롭된 뉴스
                  </h4>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(newsInfo.impact)}`}
                >
                  {getImpactText(newsInfo.impact)}
                </span>
              </div>
              <h5 className="font-semibold text-gray-900 text-sm sm:text-base mb-2 line-clamp-2 leading-tight">
                {newsInfo.title}
              </h5>
              <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-600 mb-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span className="hidden sm:inline">
                    {formatDate(newsInfo.published_at)}
                  </span>
                  <span className="sm:hidden">
                    {formatDate(newsInfo.published_at).split(" ")[0]}
                  </span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="truncate">
                  {newsInfo.press || "언론사 미상"}
                </span>
              </div>
              {newsInfo.summary && (
                <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
                  {newsInfo.summary}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onRemoveNews}
              className="flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 sm:gap-3 max-w-2xl mx-auto">
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
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-[#0A5C2B] disabled:bg-gray-50 disabled:cursor-not-allowed resize-none text-sm sm:text-base placeholder-gray-400 transition-all duration-200"
            style={{ minHeight: "36px", maxHeight: "120px" }}
          />
          {message && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <X size={14} className="sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
        <div className="flex gap-1 sm:gap-2">
          <button
            type="button"
            onClick={onToggleMenu}
            disabled={isLoading}
            className="p-2 sm:p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Menu size={16} className="sm:w-4 sm:h-4" />
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="p-2 sm:p-2.5 bg-[#0A5C2B] text-white rounded-xl hover:bg-[#0A5C2B]/90 active:scale-95 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Send size={16} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </form>
  );
}
