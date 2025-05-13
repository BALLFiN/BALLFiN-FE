export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}
export interface NewMessagePT {
  msg_id: string;
  role: 'user' | 'assistant';
  content: string;
  ts: string;
}
export interface ChatListItem {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

// 기존 ChatHistory는 messages 포함한 전체형
export interface ChatHistory extends ChatListItem {
  messages: Message[];
}

export interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}
