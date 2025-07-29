import { NewMessagePT } from "@/features/chat/types";
import { useEffect, useRef } from "react";
import NewsInfoCard from "./NewsInfoCard";

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
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#0A5C2B] hover:text-[#0A5C2B]/80 underline font-medium">${linkText}</a>`;
    });

    // ### 헤딩을 bold 처리
    processedText = processedText.replace(
      /^### (.*)$/gm,
      '<span class="font-bold text-[#0A5C2B]">$1</span>'
    );

    // ** 제거 (링크 변환 후)
    processedText = processedText.replace(/\*\*/g, "");

    return processedText;
  };

  // 한국 시간으로 포맷팅하는 함수
  const formatKoreanTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Seoul",
    });
  };

  return (
    <div className="space-y-4 overflow-y-auto h-full p-4">
      {messages.map((msg) => {
        const isUser = msg.role === "user";
        const newsInfo = parseNewsInfo(msg.content);

        return (
          <div
            key={msg.msg_id}
            className={`flex items-end gap-3 justify-start`}
          >
            {newsInfo ? (
              <div
                className={`flex flex-col gap-3 ${isUser ? "items-end" : "items-start"}`}
              >
                {/* 뉴스 정보 카드 - 말풍선 외부 */}
                <div className="max-w-[85%]">
                  <NewsInfoCard
                    title={newsInfo.title}
                    press={newsInfo.press}
                    published_at={newsInfo.published_at}
                    summary={newsInfo.summary || undefined}
                    impact={newsInfo.impact || undefined}
                  />
                </div>

                {/* 질문 말풍선 */}
                <div
                  className={`max-w-[65%] rounded-2xl p-4 mr-2 shadow-sm ${
                    isUser
                      ? "bg-[#0A5C2B] text-white rounded-br-md ml-auto"
                      : "bg-gray-50 text-gray-800 rounded-bl-md border border-gray-100"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {newsInfo.question}
                  </div>
                  <p
                    className={`text-xs mt-3 opacity-70 ${
                      isUser ? "text-green-50" : "text-gray-500"
                    }`}
                  >
                    {formatKoreanTime(msg.ts)}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`max-w-[80%] w-fit rounded-2xl p-4 text-left shadow-sm ${
                  isUser
                    ? "bg-[#0A5C2B] text-white rounded-br-md ml-auto"
                    : "bg-gray-50 text-gray-800 rounded-bl-md mr-auto border border-gray-100"
                }`}
              >
                <div
                  className="text-sm whitespace-pre-wrap mr-2 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: processMessageContent(msg.content),
                  }}
                />
                <p
                  className={`text-xs mt-3 opacity-70 ${
                    isUser ? "text-green-50" : "text-gray-500"
                  }`}
                >
                  {formatKoreanTime(msg.ts)}
                </p>
              </div>
            )}
            {isUser && null}
          </div>
        );
      })}
      {isLoading && (
        <div className="flex items-end gap-3 justify-start">
          <div className="max-w-[80%] rounded-2xl p-4 bg-gray-50 text-gray-800 rounded-bl-md border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-[#0A5C2B] rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-[#0A5C2B] rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-[#0A5C2B] rounded-full animate-bounce"
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
