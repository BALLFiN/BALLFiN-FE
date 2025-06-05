import { History, Plus } from "lucide-react";

interface Props {
  onClickHistory: () => void;
  onCreateNewChat: () => void;
}

export default function ChatMenu({ onClickHistory, onCreateNewChat }: Props) {
  const menuList = [
    {
      text: " 채팅 기록",
      icon: <History size={16} />,
      onClick: onClickHistory,
    },
    {
      text: "새로운 채팅방 만들기",
      icon: <Plus size={16} />,
      onClick: onCreateNewChat,
    },
  ];
  return (
    <div className="absolute bottom-20 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10">
      {menuList.map((item, idx) => (
        <button
          key={idx}
          onClick={item.onClick}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full"
        >
          {item.icon}
          {item.text}
        </button>
      ))}
    </div>
  );
}
