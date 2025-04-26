export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

export interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}
