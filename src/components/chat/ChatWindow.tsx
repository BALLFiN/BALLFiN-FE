import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  User,
  Bot,
  Menu,
  Trash2,
  History,
  Edit2,
  Check,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow = ({ isOpen, onClose }: ChatWindowProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedHistories = localStorage.getItem("chatHistories");
    if (savedHistories) {
      setChatHistories(JSON.parse(savedHistories));
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveChat = (messages: Message[]) => {
    if (messages.length === 0) return;

    if (currentChatId) {
      // 기존 채팅 업데이트
      const updatedHistories = chatHistories.map((history) =>
        history.id === currentChatId
          ? {
              ...history,
              messages: messages,
              title: messages[0].content.slice(0, 20) + "...",
            }
          : history
      );
      setChatHistories(updatedHistories);
      localStorage.setItem("chatHistories", JSON.stringify(updatedHistories));
    } else {
      // 새 채팅 생성
      const newHistory: ChatHistory = {
        id: Date.now().toString(),
        title: messages[0].content.slice(0, 20) + "...",
        messages: messages,
        createdAt: new Date().toISOString(),
      };
      setCurrentChatId(newHistory.id);
      const updatedHistories = [...chatHistories, newHistory];
      setChatHistories(updatedHistories);
      localStorage.setItem("chatHistories", JSON.stringify(updatedHistories));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setMessage("");

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: message,
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      const finalMessages = [...updatedMessages, botResponse];
      setMessages(finalMessages);
      saveChat(finalMessages);
    }, 1000);
  };

  const loadChat = (history: ChatHistory) => {
    setMessages(history.messages);
    setCurrentChatId(history.id);
    setShowHistory(false);
  };

  const deleteChat = (id: string) => {
    const updatedHistories = chatHistories.filter((h) => h.id !== id);
    setChatHistories(updatedHistories);
    localStorage.setItem("chatHistories", JSON.stringify(updatedHistories));
    if (currentChatId === id) {
      setCurrentChatId(null);
      setMessages([]);
    }
  };

  const startEditing = (history: ChatHistory) => {
    setEditingId(history.id);
    setEditTitle(history.title);
  };

  const saveEdit = (id: string) => {
    const updatedHistories = chatHistories.map((history) =>
      history.id === id ? { ...history, title: editTitle } : history
    );
    setChatHistories(updatedHistories);
    localStorage.setItem("chatHistories", JSON.stringify(updatedHistories));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-8 w-[30vw] h-[600px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-[#0A5C2B]">BALLFiN 챗봇</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {showMenu && (
        <div className="absolute bottom-20 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10">
          <button
            onClick={() => {
              setShowHistory(!showHistory);
              setShowMenu(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full"
          >
            <History size={16} />
            채팅 기록
          </button>
        </div>
      )}

      {showHistory ? (
        <div className="flex-1 overflow-y-auto p-4">
          <h4 className="text-lg font-semibold mb-4">채팅 기록</h4>
          <div className="space-y-2">
            {chatHistories.map((history) => (
              <div
                key={history.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => loadChat(history)}
                >
                  {editingId === history.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent"
                        autoFocus
                      />
                      <button
                        onClick={() => saveEdit(history.id)}
                        className="text-green-600 hover:text-green-700 p-1"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{history.title}</h5>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(history);
                        }}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <Edit2 size={14} />
                      </button>
                    </div>
                  )}
                  <p className="text-sm text-gray-500">
                    {formatDate(history.createdAt)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(history.id);
                  }}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!msg.isUser && (
                <div className="w-8 h-8 rounded-full bg-[#0A5C2B] flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.isUser
                    ? "bg-[#0A5C2B] text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                } animate-slideRightFade`}
              >
                <p className="text-sm">{msg.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {formatDate(msg.timestamp)}
                </span>
              </div>
              {msg.isUser && (
                <div className="w-8 h-8 rounded-full bg-[#0A5C2B] flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center"
            >
              <Menu size={20} />
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0A5C2B] text-white rounded-lg hover:bg-[#0A5C2B]/90 transition-colors flex items-center justify-center"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
