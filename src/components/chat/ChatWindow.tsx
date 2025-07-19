import ChatInput from "./ChatInput";
import ChatMenu from "./ChatMenu";
import ChatHistoryList from "./ChatHistoryList";

import { X } from "lucide-react";
import { ChatWindowProps } from "@/features/chat/types";
import { useChatManager } from "@/features/chat/hooks/useChatUI";

import { useCreateChat } from "@/features/chat/hooks/chatList/useChatMutation";

import { ChatMessages } from "./ChatMessages";
import {
  useChatMessages,
  useSendMessage,
} from "@/features/chat/hooks/chatMessage/useChatMessage";
import { useChatList } from "@/features/chat/hooks/chatList/useChatList";

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const { mutate: createChat } = useCreateChat();
  const { data: chatList = [] } = useChatList();
  const generateKoreanTimestamp = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
  }; //일단 채팅방 base Title
  const {
    message,
    setMessage,
    currentChatId,
    setCurrentChatId,
    editingId,
    editTitle,
    setEditTitle,
    loadChat,
    startEditing,
    saveEdit,
    cancelEdit,
    formatDate,
    showMenu,
    setShowMenu,
    showHistory,
    setShowHistory,
  } = useChatManager();
  const { data: messages = [] } = useChatMessages(currentChatId ?? "");
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();

  const handleSubmit = () => {
    if (!message.trim()) return;

    // 현재 채팅방이 없으면 새로 생성
    if (!currentChatId) {
      const title = generateKoreanTimestamp();
      createChat(title, {
        onSuccess: (response) => {
          // 응답 구조 확인 후 chatId 추출
          const newChatId =
            response.chat_id ||
            response.id ||
            response.chatId ||
            response.data?.id;
          if (newChatId) {
            // 새 채팅방으로 이동
            setCurrentChatId(newChatId);
            // 새 채팅방 생성 후 메시지 전송
            sendMessage({ chatId: newChatId, message });
            setMessage("");
          } else {
            console.error("새 채팅방 ID를 찾을 수 없습니다:", response);
          }
        },
        onError: (error) => {
          console.error("채팅방 생성 실패:", error);
        },
      });
    } else {
      // 기존 채팅방에 메시지 전송
      sendMessage({ chatId: currentChatId, message });
      setMessage("");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed bottom-4 sm:bottom-8 md:bottom-24 right-2 sm:right-4 md:right-8 w-[95vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] h-[70vh] sm:h-[550px] md:h-[600px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-999 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-[#0A5C2B]">
          BALLFiN 챗봇
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors p-1"
        >
          <X size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>

      {showMenu && (
        <ChatMenu
          onClickHistory={() => {
            setShowHistory(!showHistory);
            setShowMenu(false);
          }}
          onCreateNewChat={() => {
            // if (chatHistories.length >= 12) {
            //   alert('채팅방은 최대 10개까지 생성할 수 있습니다.');
            //   return;
            // }
            const title = generateKoreanTimestamp();
            createChat(title);
            setShowMenu(false);
          }}
        />
      )}

      {showHistory ? (
        <div className="flex-1 overflow-y-auto">
          <ChatHistoryList
            histories={chatList}
            currentId={currentChatId}
            editingId={editingId}
            editTitle={editTitle}
            onLoad={loadChat as any}
            onEditStart={startEditing as any}
            onEditChange={setEditTitle}
            onEditSave={saveEdit}
            onEditCancel={cancelEdit}
            formatDate={formatDate}
          />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <ChatMessages messages={messages} isLoading={isSending} />
        </div>
      )}

      {/* 입력창 */}
      <ChatInput
        message={message}
        onChange={setMessage}
        onSubmit={handleSubmit}
        onToggleMenu={() => setShowMenu(!showMenu)}
        isLoading={isSending}
      />
    </div>
  );
}
