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

  // ** 제거하는 함수
  const removeAsterisks = (text: string) => {
    return text.replace(/\*\*/g, "");
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
              <p className="text-sm whitespace-pre-wrap">
                {removeAsterisks(msg.content)}
              </p>
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
