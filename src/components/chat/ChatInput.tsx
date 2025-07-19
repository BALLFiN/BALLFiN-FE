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
      className="p-4"
    >
      {/* 뉴스 정보 카드 */}
      {newsInfo && (
        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Newspaper className="w-4 h-4 text-blue-600" />
                <h4 className="font-medium text-blue-900">드롭된 뉴스</h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(newsInfo.impact)}`}
                >
                  {getImpactText(newsInfo.impact)}
                </span>
              </div>
              <h5 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                {newsInfo.title}
              </h5>
              <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(newsInfo.published_at)}
                </span>
                <span>{newsInfo.press || "언론사 미상"}</span>
              </div>
              {newsInfo.summary && (
                <p className="text-xs text-gray-700 line-clamp-2">
                  {newsInfo.summary}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onRemoveNews}
              className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <div className="relative flex-1">
          <textarea
            value={message}
            onChange={(e) => onChange(e.target.value)}
            placeholder="메시지를 입력하세요..."
            disabled={isLoading}
            rows={Math.min(5, Math.max(2, message.split("\n").length))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
            style={{ minHeight: "40px", maxHeight: "200px" }}
          />
          {message && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
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
    </form>
  );
}
