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
    <div className="flex items-center justify-between p-2 sm:p-4 bg-white/90 backdrop-blur-xl border-b border-white/80 ring-1 ring-black/5">
      <h3 className="text-[17px] font-semibold text-[#0A5C2B] tracking-tight">
        BALLFiN 챗봇
      </h3>
      <div className="flex items-center gap-2">
        <button
          onClick={handleChatPageClick}
          className="text-gray-700 hover:text-[#0A5C2B] transition-colors p-2 rounded-2xl hover:bg-[#0A5C2B]/5 relative group active:scale-95"
          title="전체 채팅 페이지로 이동"
        >
          <MessageSquare size={20} className="sm:w-5 sm:h-5" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/80 text-white text-[11px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg">
            전체 채팅 페이지로 이동
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
          </div>
        </button>
        {onClickHistory && (
          <button
            onClick={onClickHistory}
            className="text-gray-700 hover:text-[#0A5C2B] transition-colors p-2 rounded-2xl hover:bg-[#0A5C2B]/5 relative group active:scale-95"
            title="채팅 기록 보기"
          >
            <History size={20} className="sm:w-5 sm:h-5" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/80 text-white text-[11px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg">
              채팅 기록 보기
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
            </div>
          </button>
        )}
        {onCreateNewChat && (
          <button
            onClick={onCreateNewChat}
            className="text-gray-700 hover:text-[#0A5C2B] transition-colors p-2 rounded-2xl hover:bg-[#0A5C2B]/5 relative group active:scale-95"
            title="새로운 채팅방 만들기"
          >
            <Plus size={20} className="sm:w-5 sm:h-5" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/80 text-white text-[11px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg">
              새로운 채팅방 만들기
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
            </div>
          </button>
        )}
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-[#0A5C2B] transition-colors p-2 rounded-2xl hover:bg-[#0A5C2B]/5 relative group active:scale-95"
          title="채팅창 닫기"
        >
          <X size={20} className="sm:w-5 sm:h-5" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/80 text-white text-[11px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg">
            채팅창 닫기
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
          </div>
        </button>
      </div>
    </div>
  );
}
