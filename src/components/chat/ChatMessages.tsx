import { Message } from '@/features/chatbot/types';
import { Bot, User } from 'lucide-react';

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex items-end gap-2 ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
          {!msg.isUser && (
            <div className="w-8 h-8 rounded-full bg-[#0A5C2B] flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
          )}
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              msg.isUser ? 'bg-[#0A5C2B] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}
          >
            <p className="text-sm">{msg.content}</p>
          </div>
          {msg.isUser && (
            <div className="w-8 h-8 rounded-full bg-[#0A5C2B] flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
