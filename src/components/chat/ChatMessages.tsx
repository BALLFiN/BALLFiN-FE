import { NewMessagePT } from "@/features/chat/types";
import { Bot, User, Clock, Newspaper } from "lucide-react";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages: NewMessagePT[];
  isLoading?: boolean;
}

export const ChatMessages = ({
  messages,
  isLoading = false,
}: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 뉴스 정보를 파싱하는 함수
  const parseNewsInfo = (text: string) => {
    const newsInfoMatch = text.match(
      /📰 뉴스 정보:\n제목: (.+)\n언론사: (.+)\n발행일: (.+)(?:\n요약: (.+))?(?:\n영향도: (.+))?\n\n질문: (.+)/s
    );

    if (newsInfoMatch) {
      return {
        title: newsInfoMatch[1],
        press: newsInfoMatch[2],
        published_at: newsInfoMatch[3],
        summary: newsInfoMatch[4] || null,
        impact: newsInfoMatch[5] || null,
        question: newsInfoMatch[6],
      };
    }
    return null;
  };

  // 마크다운 링크를 HTML로 변환하고 ** 제거하는 함수
  const processMessageContent = (text: string) => {
    // 마크다운 링크 패턴: [텍스트](URL)
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

    // 링크를 HTML로 변환
    let processedText = text.replace(linkPattern, (_match, linkText, url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">${linkText}</a>`;
    });

    // ** 제거 (링크 변환 후)
    processedText = processedText.replace(/\*\*/g, "");

    return processedText;
  };

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
    <div className="space-y-4 overflow-y-auto h-full">
      {messages.map((msg) => {
        const isUser = msg.role === "user";
        const newsInfo = parseNewsInfo(msg.content);

        return (
          <div
            key={msg.msg_id}
            className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
          >
            {!isUser && (
              <div className="w-8 h-8 rounded-full bg-[#0A5C2B] flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
            )}
            {newsInfo ? (
              <div
                className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}
              >
                {/* 뉴스 정보 카드 - 말풍선 외부 */}
                <div className="max-w-[85%] p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <Newspaper className="w-4 h-4 text-blue-600" />
                          <h4 className="font-medium text-blue-900 text-sm sm:text-base">
                            뉴스 정보
                          </h4>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(newsInfo.impact || undefined)}`}
                        >
                          {getImpactText(newsInfo.impact || undefined)}
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
                        <span className="truncate">{newsInfo.press}</span>
                      </div>
                      {newsInfo.summary && (
                        <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
                          {newsInfo.summary}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 질문 말풍선 */}
                <div
                  className={`max-w-[65%] rounded-lg p-3 ${
                    isUser
                      ? "bg-[#0A5C2B] text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">
                    {newsInfo.question}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  isUser
                    ? "bg-[#0A5C2B] text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                <div
                  className="text-sm whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: processMessageContent(msg.content),
                  }}
                />
              </div>
            )}
            {isUser && (
              <div className="w-8 h-8 rounded-full bg-[#0A5C2B] flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            )}
          </div>
        );
      })}
      {isLoading && (
        <div className="flex items-end gap-2 justify-start">
          <div className="w-8 h-8 rounded-full bg-[#0A5C2B] flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800 rounded-bl-none">
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};
