export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}
export interface NewMessagePT {
  msg_id: string;
  role: "user" | "assistant";
  content: string;
  ts: string;
}
export interface ChatListItem {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

// 기존 ChatHistory는 messages 포함한 전체형
export interface ChatHistory {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface NewsInfo {
  id?: string;
  title: string;
  press?: string;
  published_at?: string;
  summary?: string;
  impact?: "positive" | "negative" | "neutral";
}

export interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}
