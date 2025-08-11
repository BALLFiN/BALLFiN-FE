import {
  useDeleteChat,
  useUpdateChatTitle,
} from "@/features/chat/hooks/chatList/useChatMutation";
import { ChatListItem } from "@/features/chat/types";
import { Edit2, Trash2, ChevronRight } from "lucide-react";
import { useState } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface Props {
  histories: ChatListItem[];
  currentId: string | null;
  editingId: string | null;
  editTitle: string;
  onLoad: (history: ChatListItem) => void;
  onEditStart: (history: ChatListItem) => void;
  onEditChange: (val: string) => void;
  onEditSave: (id: string) => void;
  onEditCancel: () => void;
  formatDate: (date: string) => string;
}

export default function ChatHistoryList({
  histories,
  editingId,
  editTitle,
  onLoad,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  formatDate,
}: Props) {
  const { mutate: updateTitle } = useUpdateChatTitle();
  const { mutate: deleteChatMutate } = useDeleteChat();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    chatId: string;
    chatTitle: string;
  }>({
    isOpen: false,
    chatId: "",
    chatTitle: "",
  });

  const handleDeleteClick = (chatId: string, chatTitle: string) => {
    setDeleteModal({
      isOpen: true,
      chatId,
      chatTitle,
    });
  };

  const handleConfirmDelete = () => {
    deleteChatMutate({ chatId: deleteModal.chatId });
    setDeleteModal({ isOpen: false, chatId: "", chatTitle: "" });
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, chatId: "", chatTitle: "" });
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-5">
        <h4 className="text-[17px] font-semibold mb-4 text-gray-900 tracking-tight">
          채팅 기록
        </h4>
        <div className="space-y-2">
          {histories.map((history) => (
            <div
              key={history.id}
              className="group flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur rounded-2xl border border-white/80 shadow-sm ring-1 ring-black/5 hover:bg-white transition-all duration-200 active:scale-[0.99]"
            >
              <div
                className="flex-1 cursor-pointer min-w-0"
                onClick={() => onLoad(history)}
              >
                {editingId === history.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => onEditChange(e.target.value)}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20 focus:border-[#0A5C2B] text-[15px] text-gray-900"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        updateTitle({ chatId: history.id, title: editTitle });
                        onEditSave(history.id);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#0A5C2B] text-white text-xs font-medium shadow-sm active:opacity-90"
                    >
                      완료
                    </button>
                    <button
                      onClick={onEditCancel}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200 active:opacity-90"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 min-w-0">
                    <h5 className="text-[16px] text-gray-900 font-medium truncate">
                      {history.title}
                    </h5>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditStart(history);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-[#0A5C2B] p-2 rounded-xl hover:bg-gray-100 active:opacity-80"
                      aria-label="제목 수정"
                    >
                      <Edit2 size={16} />
                    </button>
                  </div>
                )}
                <p className="text-[12px] text-gray-400 mt-0.5">
                  {formatDate(history.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-1 ml-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(history.id, history.title);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 active:opacity-80"
                  aria-label="삭제"
                >
                  <Trash2 size={18} />
                </button>
                <ChevronRight
                  className="text-gray-300 group-hover:text-gray-400 transition-colors"
                  size={18}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        chatTitle={deleteModal.chatTitle}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
