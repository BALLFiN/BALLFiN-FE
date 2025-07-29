import { History, Plus } from "lucide-react";

interface Props {
  onClickHistory: () => void;
  onCreateNewChat: () => void;
}

export default function ChatMenu({ onClickHistory, onCreateNewChat }: Props) {
  const menuList = [
    {
      text: " 채팅 기록",
      icon: <History size={18} />,
      onClick: onClickHistory,
    },
    {
      text: "새로운 채팅방 만들기",
      icon: <Plus size={18} />,
      onClick: onCreateNewChat,
    },
  ];
  return (
    <div className="absolute bottom-20 right-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/50 p-3 z-10">
      {menuList.map((item, idx) => (
        <button
          key={idx}
          onClick={item.onClick}
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#0A5C2B]/5 hover:text-[#0A5C2B] rounded-xl w-full transition-all duration-200 active:scale-95"
        >
          <div className="text-[#0A5C2B]">{item.icon}</div>
          {item.text}
        </button>
      ))}
    </div>
  );
}
