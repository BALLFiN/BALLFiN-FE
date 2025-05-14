import ChatInput from './ChatInput';
import ChatMenu from './ChatMenu';
import ChatHistoryList from './ChatHistoryList';

import { X } from 'lucide-react';
import { ChatWindowProps } from '@/features/chat/types';
import { useChatManager } from '@/features/chat/hooks/useChatManager';
import { useChatList } from '@/features/chat/hooks/chatList/useChatList';
import { useCreateChat } from '@/features/chat/hooks/chatList/useChatMutation';
import { useChatMessages, useSendMessage } from '@/features/chat/hooks/chatList/useChatMessage';
import { ChatMessages } from './ChatMessages';

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const { data: chatList = [] } = useChatList();

  const { mutate: createChat } = useCreateChat();

  const generateKoreanTimestamp = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
  }; //일단 채팅방 base Title
  const {
    message,
    setMessage,
    chatHistories,
    currentChatId,
    editingId,
    editTitle,
    setEditTitle,
    loadChat,
    deleteChat,
    startEditing,
    saveEdit,
    cancelEdit,
    formatDate,
    showMenu,
    setShowMenu,
    showHistory,
    setShowHistory,
  } = useChatManager();
  const { data: messages = [], isLoading, refetch } = useChatMessages(currentChatId ?? '');
  const { mutate: sendMessage } = useSendMessage();

  const handleSubmit = () => {
    if (!message.trim() || !currentChatId) return;

    sendMessage({ chatId: currentChatId, message });
    setMessage('');
  };
  if (!isOpen) return null;
  console.log(messages, '1');
  return (
    <div className="fixed bottom-24 right-8 w-[30vw] h-[600px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-[#0A5C2B]">BALLFiN 챗봇</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
          <X size={20} />
        </button>
      </div>

      {showMenu && (
        <ChatMenu
          onClickHistory={() => {
            setShowHistory(!showHistory);
            setShowMenu(false);
          }}
          onCreateNewChat={() => {
            if (chatHistories.length >= 12) {
              alert('채팅방은 최대 10개까지 생성할 수 있습니다.');
              return;
            }
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
            onDelete={deleteChat}
            onEditStart={startEditing as any}
            onEditChange={setEditTitle}
            onEditSave={saveEdit}
            onEditCancel={cancelEdit}
            formatDate={formatDate}
          />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? <div></div> : <ChatMessages messages={messages} />}
        </div>
      )}

      {/* 입력창 */}
      <ChatInput
        message={message}
        onChange={setMessage}
        onSubmit={handleSubmit}
        onToggleMenu={() => setShowMenu(!showMenu)}
      />
    </div>
  );
}
