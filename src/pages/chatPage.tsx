import { useState } from "react";
import ChatHeader from "../components/chat/ChatHeader";
import { ChatMessages } from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import { NewMessagePT } from "../features/chat/types";

export default function ChatPage() {
  const [messages, setMessages] = useState<NewMessagePT[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const now = new Date().toISOString();
    setMessages((prev) => [
      ...prev,
      { msg_id: Date.now().toString(), role: "user", content: input, ts: now },
      {
        msg_id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Echo: ${input}`,
        ts: now,
      },
    ]);
    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[80vh] bg-white rounded-xl border border-gray-200 shadow mt-8">
      <ChatHeader onClose={() => {}} />
      <div className="flex-1 overflow-y-auto px-2 py-4">
        <ChatMessages messages={messages} />
      </div>
      <div className="border-t">
        <ChatInput
          message={input}
          onChange={setInput}
          onSubmit={handleSend}
          onToggleMenu={() => {}}
        />
      </div>
    </div>
  );
}
