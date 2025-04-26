// features/chat/hooks/useChatManager.ts
import { useState, useEffect } from 'react';
import { ChatHistory, Message } from '../types';

export const useChatManager = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('chatHistories');
    if (saved) setChatHistories(JSON.parse(saved));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const saveChat = (messages: Message[]) => {
    if (messages.length === 0) return;

    if (currentChatId) {
      const updated = chatHistories.map((h) =>
        h.id === currentChatId ? { ...h, messages, title: messages[0].content.slice(0, 20) + '...' } : h
      );
      setChatHistories(updated);
      localStorage.setItem('chatHistories', JSON.stringify(updated));
    } else {
      const newHistory: ChatHistory = {
        id: Date.now().toString(),
        title: messages[0].content.slice(0, 20) + '...',
        messages,
        createdAt: new Date().toISOString(),
      };
      setCurrentChatId(newHistory.id);
      const updated = [...chatHistories, newHistory];
      setChatHistories(updated);
      localStorage.setItem('chatHistories', JSON.stringify(updated));
    }
  };

  const loadChat = (history: ChatHistory) => {
    setMessages(history.messages);
    setCurrentChatId(history.id);
    setShowHistory(false);
  };

  const deleteChat = (id: string) => {
    const updated = chatHistories.filter((h) => h.id !== id);
    setChatHistories(updated);
    localStorage.setItem('chatHistories', JSON.stringify(updated));
    if (currentChatId === id) {
      setCurrentChatId(null);
      setMessages([]);
    }
  };

  const startEditing = (history: ChatHistory) => {
    setEditingId(history.id);
    setEditTitle(history.title);
  };

  const saveEdit = (id: string) => {
    const updated = chatHistories.map((history) => (history.id === id ? { ...history, title: editTitle } : history));
    setChatHistories(updated);
    localStorage.setItem('chatHistories', JSON.stringify(updated));
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const handleSubmit = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setMessage('');

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: message,
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      const finalMessages = [...updatedMessages, botResponse];
      setMessages(finalMessages);
      saveChat(finalMessages);
    }, 1000);
  };
  const createChatSession = () => {
    const newHistory: ChatHistory = {
      id: Date.now().toString(),
      title: '새로운 채팅',
      messages: [],
      createdAt: new Date().toISOString(),
    };

    const updated = [...chatHistories, newHistory];
    setChatHistories(updated);
    setCurrentChatId(newHistory.id);
    setMessages([]);
    localStorage.setItem('chatHistories', JSON.stringify(updated));
  };

  return {
    messages,
    setMessages,
    message,
    setMessage,
    chatHistories,
    setChatHistories,
    currentChatId,
    setCurrentChatId,
    editingId,
    setEditingId,
    editTitle,
    setEditTitle,
    saveChat,
    loadChat,
    deleteChat,
    startEditing,
    saveEdit,
    cancelEdit,
    formatDate,
    showMenu,
    setShowMenu,
    showHistory,
    setShowHistory,
    handleSubmit,
    createChatSession,
  };
};
