import { NewMessagePT } from "@/features/chat/types";
import { Bot, User } from "lucide-react";
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

  return (
    <div className="space-y-4 overflow-y-auto h-full">
      {messages.map((msg) => {
        const isUser = msg.role === "user";
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
