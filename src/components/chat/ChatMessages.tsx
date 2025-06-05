import { NewMessagePT } from "@/features/chat/types";
import { Bot, User } from "lucide-react";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages: NewMessagePT[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
              <p className="text-sm">{msg.content}</p>
            </div>
            {isUser && (
              <div className="w-8 h-8 rounded-full bg-[#0A5C2B] flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            )}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};
