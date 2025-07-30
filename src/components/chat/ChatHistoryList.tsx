import {
  useDeleteChat,
  useUpdateChatTitle,
} from "@/features/chat/hooks/chatList/useChatMutation";
import { ChatListItem } from "@/features/chat/types";
import { Edit2, Trash2, Check, X } from "lucide-react";
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
        <h4 className="text-xl font-semibold mb-5 text-[#0A5C2B]">채팅 기록</h4>
        <div className="space-y-3">
          {histories.map((history) => (
            <div
              key={history.id}
              className="flex items-center justify-between p-4 bg-white rounded-2xl hover:bg-gray-50/80 border border-gray-100 shadow-sm transition-all duration-200"
            >
              <div
                className="flex-1 cursor-pointer"
                onClick={() => onLoad(history)}
              >
                {editingId === history.id ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => onEditChange(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20 focus:border-[#0A5C2B] font-shrikhand bg-white"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        updateTitle({ chatId: history.id, title: editTitle });
                        onEditSave(history.id);
                      }}
                      className="text-[#0A5C2B] hover:text-[#0A5C2B]/80 p-2 rounded-xl hover:bg-[#0A5C2B]/5 transition-all duration-200"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={onEditCancel}
                      className="text-gray-500 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <h5 className="font-medium font-shrikhand text-lg text-gray-800">
                      {history.title}
                    </h5>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditStart(history);
                      }}
                      className="text-gray-500 hover:text-[#0A5C2B] p-2 rounded-xl hover:bg-[#0A5C2B]/5 transition-all duration-200"
                    >
                      <Edit2 size={16} />
                    </button>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(history.createdAt)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(history.id, history.title);
                }}
                className="text-red-500 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-all duration-200"
              >
                <Trash2 size={18} />
              </button>
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
