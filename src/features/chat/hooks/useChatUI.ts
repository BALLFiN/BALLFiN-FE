import { useState } from "react";
import { ChatHistory } from "../types";
import { useChatList } from "./chatList/useChatList";

export const useChatManager = () => {
  const [message, setMessage] = useState("");
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { data: chatList = [] } = useChatList();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const loadChat = (history: ChatHistory) => {
    setCurrentChatId(history.id);
    setShowHistory(false);
    localStorage.setItem("currentChatId", history.id);
  };

  const startEditing = (history: ChatHistory) => {
    setEditingId(history.id);
    setEditTitle(history.title);
  };

  const saveEdit = (id: string) => {
    const updated = chatList.map((history) =>
      history.id === id ? { ...history, title: editTitle } : history,
    );
    localStorage.setItem("chatHistories", JSON.stringify(updated));
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  return {
    message,
    setMessage,

    currentChatId,
    setCurrentChatId,

    editingId,
    setEditingId,

    editTitle,
    setEditTitle,

    loadChat,

    startEditing,
    saveEdit,
    cancelEdit,
    formatDate,
    showMenu,
    setShowMenu,
    showHistory,
    setShowHistory,
  };
};
