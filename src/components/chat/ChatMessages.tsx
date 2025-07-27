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
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">${linkText}</a>`;
    });

    // ### 헤딩을 bold 처리
    processedText = processedText.replace(
      /^### (.*)$/gm,
      '<span class="font-bold">$1</span>'
    );

    // ** 제거 (링크 변환 후)
    processedText = processedText.replace(/\*\*/g, "");

    return processedText;
  };

  return (
    <div className="space-y-4 overflow-y-auto h-full">
      {messages.map((msg) => {
        const isUser = msg.role === "user";
        const newsInfo = parseNewsInfo(msg.content);

        return (
          <div
            key={msg.msg_id}
            className={`flex items-end gap-2 justify-start`}
          >
            {newsInfo ? (
              <div
                className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}
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
                  className={`max-w-[65%] rounded-lg p-3 mr-2 ${
                    isUser
                      ? "bg-[#0A5C2B] text-white rounded-br-none ml-auto"
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
                className={`max-w-[80%] w-fit rounded-lg p-3 text-left ${
                  isUser
                    ? "bg-[#0A5C2B] text-white rounded-br-none ml-auto"
                    : "bg-gray-100 text-gray-800 rounded-bl-none mr-auto"
                }`}
              >
                <div
                  className="text-sm whitespace-pre-wrap mr-2"
                  dangerouslySetInnerHTML={{
                    __html: processMessageContent(msg.content),
                  }}
                />
              </div>
            )}
            {isUser && null}
          </div>
        );
      })}
      {isLoading && (
        <div className="flex items-end gap-2 justify-start">
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
