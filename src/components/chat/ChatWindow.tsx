import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatDropZone from "./ChatDropZone";
import { ChatWindowProps, NewsInfo } from "@/features/chat/types";
import { useChatManager } from "@/features/chat/hooks/useChatUI";
import {
  useCreateChat,
  useDeleteChat,
} from "@/features/chat/hooks/chatList/useChatMutation";
import {
  useChatMessages,
  useSendMessage,
} from "@/features/chat/hooks/chatMessage/useChatMessage";
import { useChatList } from "@/features/chat/hooks/chatList/useChatList";
import { useState, useEffect, useCallback } from "react";
import ErrorBoundary from "@/components/common/ErrorBoundary";

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const { mutate: createChat } = useCreateChat();
  const { mutate: deleteChat } = useDeleteChat();
  const { data: chatList = [] } = useChatList();
  const [newsInfo, setNewsInfo] = useState<NewsInfo | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [newlyCreatedChatId, setNewlyCreatedChatId] = useState<string | null>(
    null
  );

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

  // 공통 채팅방 생성 로직
  const createChatWithCallback = useCallback(
    (
      title: string,
      onSuccess?: (chatId: string) => void,
      onError?: (error: any) => void
    ) => {
      setIsCreating(true);
      createChat({
        title,
        options: {
          onSuccess: (response) => {
            const newChatId =
              response.chat_id ||
              response.id ||
              response.chatId ||
              response.data?.id;
            if (newChatId) {
              setNewlyCreatedChatId(newChatId);
              onSuccess?.(newChatId);
            } else {
              console.error("새 채팅방 ID를 찾을 수 없습니다:", response);
              onError?.(new Error("채팅방 ID를 찾을 수 없습니다"));
            }
            setIsCreating(false);
          },
          onError: (error) => {
            console.error("채팅방 생성 실패:", error);
            onError?.(error);
            setIsCreating(false);
          },
        },
      });
    },
    [createChat]
  );

  // 현재 채팅방이 삭제되었는지 확인
  useEffect(() => {
    if (currentChatId && chatList.length > 0) {
      const chatExists = chatList.some((chat) => chat.id === currentChatId);
      if (!chatExists) {
        setCurrentChatId(null);
      }
    }
  }, [chatList, currentChatId, setCurrentChatId]);

  // 새로 생성된 채팅방이 목록에 나타나면 자동으로 선택
  useEffect(() => {
    if (newlyCreatedChatId && chatList.length > 0) {
      const newChat = chatList.find((chat) => chat.id === newlyCreatedChatId);
      if (newChat) {
        setCurrentChatId(newlyCreatedChatId);
        setNewlyCreatedChatId(null);
        setShowHistory(false);
      }
    }
  }, [chatList, newlyCreatedChatId, setCurrentChatId, setShowHistory]);

  const { data: messages = [] } = useChatMessages(currentChatId ?? "");
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();

  // 대기 중인 메시지가 있고 현재 채팅방이 설정되면 메시지 전송
  useEffect(() => {
    if (pendingMessage && currentChatId) {
      sendMessage({ chatId: currentChatId, message: pendingMessage });
      setPendingMessage(null);
      setMessage("");
      setNewsInfo(null);
      setIsCreating(false);
      // 채팅방 화면으로 자동 이동
      setShowHistory(false);
    }
  }, [currentChatId, pendingMessage, sendMessage, setMessage, setShowHistory]);

  // 컴포넌트 언마운트 시 cleanup
  useEffect(() => {
    return () => {
      setPendingMessage(null);
      setNewsInfo(null);
      setIsCreating(false);
      setNewlyCreatedChatId(null);
    };
  }, []);

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

  const handleSubmit = useCallback(() => {
    if (!message.trim() || isCreating) return;

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

    // 현재 채팅방이 있으면 바로 메시지 전송
    if (currentChatId) {
      sendMessage({ chatId: currentChatId, message: finalMessage });
      setMessage("");
      setNewsInfo(null);
      return;
    }

    // 현재 채팅방이 없으면 새로 생성
    const title = generateKoreanTimestamp();
    createChatWithCallback(title);
    setPendingMessage(finalMessage); // 새로 생성된 채팅방으로 메시지 전송을 위해 pendingMessage 설정
  }, [
    message,
    isCreating,
    newsInfo,
    currentChatId,
    sendMessage,
    setMessage,
    setNewsInfo,
    createChatWithCallback,
  ]);

  const handleCreateNewChat = useCallback(() => {
    if (isCreating) return;

    const title = generateKoreanTimestamp();
    createChatWithCallback(title);
    setShowMenu(false);
  }, [isCreating, createChatWithCallback, setShowMenu]);

  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
    setShowMenu(false);
  };

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
