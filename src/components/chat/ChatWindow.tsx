import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ChatMenu from './ChatMenu';
import ChatHistoryList from './ChatHistoryList';

import { X } from 'lucide-react';
import { ChatWindowProps } from '@/features/chat/types';
import { useChatManager } from '@/features/chat/hooks/useChatManager';

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const {
    messages,
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
    handleSubmit,
    createChatSession,
  } = useChatManager();

  if (!isOpen) return null;
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
            if (chatHistories.length >= 10) {
              alert('채팅방은 최대 10개까지 생성할 수 있습니다.');
              return;
            }
            createChatSession();
            setShowMenu(false);
          }}
        />
      )}

      {showHistory ? (
        <div className="flex-1 overflow-y-auto">
          <ChatHistoryList
            histories={chatHistories}
            currentId={currentChatId}
            editingId={editingId}
            editTitle={editTitle}
            onLoad={loadChat}
            onDelete={deleteChat}
            onEditStart={startEditing}
            onEditChange={setEditTitle}
            onEditSave={saveEdit}
            onEditCancel={cancelEdit}
            formatDate={formatDate}
          />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <ChatMessages messages={messages} />
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
