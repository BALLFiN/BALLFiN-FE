import { useUpdateChatTitle } from '@/features/chat/hooks/useUpdateChatTilte';
import { ChatListItem } from '@/features/chat/types';
import { Edit2, Trash2, Check, X } from 'lucide-react';

interface Props {
  histories: ChatListItem[];
  currentId: string | null;
  editingId: string | null;
  editTitle: string;
  onLoad: (history: ChatListItem) => void;
  onDelete: (id: string) => void;
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
  onDelete,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  formatDate,
}: Props) {
  const { mutate: updateTitle } = useUpdateChatTitle();

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h4 className="text-lg font-semibold mb-4">채팅 기록</h4>
      <div className="space-y-2">
        {histories.map((history) => (
          <div
            key={history.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <div className="flex-1 cursor-pointer" onClick={() => onLoad(history)}>
              {editingId === history.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => onEditChange(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent font-shrikhand"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      updateTitle({ chatId: history.id, title: editTitle });
                      onEditSave(history.id);
                    }}
                    className="text-green-600 hover:text-green-700 p-1"
                  >
                    <Check size={16} />
                  </button>
                  <button onClick={onEditCancel} className="text-gray-500 hover:text-gray-700 p-1">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h5 className="font-medium font-shrikhand text-lg">{history.title}</h5>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditStart(history);
                    }}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>
              )}
              <p className="text-sm text-gray-500">{formatDate(history.createdAt)}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(history.id);
              }}
              className="text-red-500 hover:text-red-700 p-2"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
