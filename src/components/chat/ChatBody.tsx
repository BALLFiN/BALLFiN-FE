import ChatMenu from "./ChatMenu";
import ChatHistoryList from "./ChatHistoryList";
import { ChatMessages } from "./ChatMessages";
import { NewMessagePT } from "@/features/chat/types";

interface ChatBodyProps {
  showMenu: boolean;
  showHistory: boolean;
  chatList: any[];
  currentChatId: string | null;
  editingId: string | null;
  editTitle: string;
  messages: NewMessagePT[];
  isSending: boolean;
  onToggleHistory: () => void;
  onToggleMenu: () => void;
  onCreateNewChat: () => void;
  onLoad: (history: any) => void;
  onEditStart: (history: any) => void;
  onEditChange: (value: string) => void;
  onEditSave: (id: string) => void;
  onEditCancel: () => void;
  formatDate: (date: string) => string;
}

export default function ChatBody({
  showMenu,
  showHistory,
  chatList,
  currentChatId,
  editingId,
  editTitle,
  messages,
  isSending,
  onToggleHistory,
  onToggleMenu,
  onCreateNewChat,
  onLoad,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  formatDate,
}: ChatBodyProps) {
  return (
    <>
      {showMenu && (
        <ChatMenu
          onClickHistory={onToggleHistory}
          onCreateNewChat={onCreateNewChat}
        />
      )}

      {showHistory ? (
        <div className="flex-1 overflow-y-auto">
          <ChatHistoryList
            histories={chatList}
            currentId={currentChatId}
            editingId={editingId}
            editTitle={editTitle}
            onLoad={onLoad}
            onEditStart={onEditStart}
            onEditChange={onEditChange}
            onEditSave={onEditSave}
            onEditCancel={onEditCancel}
            formatDate={formatDate}
          />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <ChatMessages messages={messages} isLoading={isSending} />
        </div>
      )}
    </>
  );
}
