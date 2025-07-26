import { X, MessageSquare, History, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatHeaderProps {
  onClose: () => void;
  onClickHistory?: () => void;
  onCreateNewChat?: () => void;
}

export default function ChatHeader({
  onClose,
  onClickHistory,
  onCreateNewChat,
}: ChatHeaderProps) {
  const navigate = useNavigate();

  const handleChatPageClick = () => {
    navigate("/chat");
  };

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
      <h3 className="text-base sm:text-lg font-semibold text-[#0A5C2B]">
        BALLFiN 챗봇
      </h3>
      <div className="flex items-center gap-2">
        <button
          onClick={handleChatPageClick}
          className="text-gray-500 hover:text-[#0A5C2B] transition-colors p-1 rounded-lg hover:bg-gray-100 relative group"
          title="전체 채팅 페이지로 이동"
        >
          <MessageSquare size={18} className="sm:w-5 sm:h-5" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            전체 채팅 페이지로 이동
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </button>
        {onClickHistory && (
          <button
            onClick={onClickHistory}
            className="text-gray-500 hover:text-[#0A5C2B] transition-colors p-1 rounded-lg hover:bg-gray-100 relative group"
            title="채팅 기록 보기"
          >
            <History size={18} className="sm:w-5 sm:h-5" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              채팅 기록 보기
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </button>
        )}
        {onCreateNewChat && (
          <button
            onClick={onCreateNewChat}
            className="text-gray-500 hover:text-[#0A5C2B] transition-colors p-1 rounded-lg hover:bg-gray-100 relative group"
            title="새로운 채팅방 만들기"
          >
            <Plus size={18} className="sm:w-5 sm:h-5" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              새로운 채팅방 만들기
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </button>
        )}
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors p-1 relative group"
          title="채팅창 닫기"
        >
          <X size={18} className="sm:w-5 sm:h-5" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            채팅창 닫기
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </button>
      </div>
    </div>
  );
}
