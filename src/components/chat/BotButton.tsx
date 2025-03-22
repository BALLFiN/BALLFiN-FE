import React, { useState } from "react";
import { Bot } from "lucide-react";
import ChatWindow from "./ChatWindow";

const BotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#0A5C2B] text-white shadow-lg hover:bg-[#0A5C2B]/90 transition-colors flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bot size={24} />
      </button>
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default BotButton;
