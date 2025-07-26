import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatDropZone from "./ChatDropZone";
import { ChatWindowProps } from "@/features/chat/types";
import { useChatManager } from "@/features/chat/hooks/useChatUI";
import { useCreateChat } from "@/features/chat/hooks/chatList/useChatMutation";
import {
  useChatMessages,
  useSendMessage,
} from "@/features/chat/hooks/chatMessage/useChatMessage";
import { useChatList } from "@/features/chat/hooks/chatList/useChatList";
import { useState } from "react";

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const { mutate: createChat } = useCreateChat();
  const { data: chatList = [] } = useChatList();
  const [newsInfo, setNewsInfo] = useState<any>(null);
  const generateKoreanTimestamp = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
  }; //일단 채팅방 base Title
  const {
    message,
    setMessage,
    currentChatId,
    setCurrentChatId,
    editingId,
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
  } = useChatManager();
  const { data: messages = [] } = useChatMessages(currentChatId ?? "");
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();

  const handleDrop = (e: React.DragEvent) => {
    const newsData = e.dataTransfer.getData("application/json");
    if (newsData) {
      try {
        const news = JSON.parse(newsData);

        // 뉴스 정보를 상태에 저장
        setNewsInfo(news);

        // 입력창에 포커스
        setTimeout(() => {
          const textareaElement = document.querySelector(
            "textarea"
          ) as HTMLTextAreaElement;
          if (textareaElement) {
            textareaElement.focus();
            textareaElement.setSelectionRange(
              textareaElement.value.length,
              textareaElement.value.length
            );
          }
        }, 100);
      } catch (error) {
        console.error("뉴스 데이터 파싱 실패:", error);
      }
    }
  };

  const handleRemoveNews = () => {
    setNewsInfo(null);
    setMessage("");
  };

  const handleSubmit = () => {
    if (!message.trim()) return;

    // 뉴스 정보가 있으면 메시지에 포함
    let finalMessage = message;
    if (newsInfo) {
      const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      };

      const newsInfoText = `📰 뉴스 정보:
제목: ${newsInfo.title}
언론사: ${newsInfo.press || "언론사 미상"}
발행일: ${formatDate(newsInfo.published_at)}
${newsInfo.summary ? `요약: ${newsInfo.summary}` : ""}
${newsInfo.impact ? `영향도: ${newsInfo.impact === "positive" ? "긍정" : newsInfo.impact === "negative" ? "부정" : "중립"}` : ""}

질문: ${message}`;

      finalMessage = newsInfoText;
    }

    // 현재 채팅방이 없으면 새로 생성
    if (!currentChatId) {
      const title = generateKoreanTimestamp();
      createChat(title, {
        onSuccess: (response) => {
          // 응답 구조 확인 후 chatId 추출
          const newChatId =
            response.chat_id ||
            response.id ||
            response.chatId ||
            response.data?.id;
          if (newChatId) {
            // 새 채팅방으로 이동
            setCurrentChatId(newChatId);
            // 새 채팅방 생성 후 메시지 전송
            sendMessage({ chatId: newChatId, message: finalMessage });
            setMessage("");
            setNewsInfo(null);
          } else {
            console.error("새 채팅방 ID를 찾을 수 없습니다:", response);
          }
        },
        onError: (error) => {
          console.error("채팅방 생성 실패:", error);
        },
      });
    } else {
      // 기존 채팅방에 메시지 전송
      sendMessage({ chatId: currentChatId, message: finalMessage });
      setMessage("");
      setNewsInfo(null);
    }
  };

  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
    setShowMenu(false);
  };

  const handleCreateNewChat = () => {
    const title = generateKoreanTimestamp();
    createChat(title);
    setShowMenu(false);
  };

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <ChatDropZone onDrop={handleDrop} isOpen={isOpen}>
      <ChatHeader
        onClose={onClose}
        onClickHistory={handleToggleHistory}
        onCreateNewChat={handleCreateNewChat}
      />

      <ChatBody
        showMenu={showMenu}
        showHistory={showHistory}
        chatList={chatList}
        currentChatId={currentChatId}
        editingId={editingId}
        editTitle={editTitle}
        messages={messages}
        isSending={isSending}
        onToggleHistory={handleToggleHistory}
        onToggleMenu={handleToggleMenu}
        onCreateNewChat={handleCreateNewChat}
        onLoad={loadChat as any}
        onEditStart={startEditing as any}
        onEditChange={setEditTitle}
        onEditSave={saveEdit}
        onEditCancel={cancelEdit}
        formatDate={formatDate}
      />

      <ChatInput
        message={message}
        onChange={setMessage}
        onSubmit={handleSubmit}
        isLoading={isSending}
        newsInfo={newsInfo}
        onRemoveNews={handleRemoveNews}
      />
    </ChatDropZone>
  );
}
