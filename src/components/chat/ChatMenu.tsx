import { History } from 'lucide-react';

interface Props {
  onClickHistory: () => void;
}

export default function ChatMenu({ onClickHistory }: Props) {
  return (
    <div className="absolute bottom-20 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10">
      <button
        onClick={onClickHistory}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full"
      >
        <History size={16} />
        채팅 기록
      </button>
    </div>
  );
}
