import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Send,
  Paperclip,
  X,
  History,
  Plus,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NewMessagePT } from "../features/chat/types";
import { useChatManager } from "../features/chat/hooks/useChatUI";
import { useCreateChat } from "../features/chat/hooks/chatList/useChatMutation";
import {
  useChatMessages,
  useSendMessage,
} from "../features/chat/hooks/chatMessage/useChatMessage";
import { useChatList } from "../features/chat/hooks/chatList/useChatList";
import ChatHistoryList from "../components/chat/ChatHistoryList";
import DeleteConfirmModal from "../components/chat/DeleteConfirmModal";

export default function ChatPage() {
  const navigate = useNavigate();
  const { mutate: createChat } = useCreateChat();
  const { data: chatList = [] } = useChatList();
  const [showHistory, setShowHistory] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    chatId: string;
    chatTitle: string;
  }>({
    isOpen: false,
    chatId: "",
    chatTitle: "",
  });

  const generateKoreanTimestamp = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
  };

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
  } = useChatManager();

  const { data: messages = [] } = useChatMessages(currentChatId ?? "");
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();

  const handleSubmit = () => {
    if (!message.trim()) return;

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
            sendMessage({ chatId: newChatId, message: message.trim() });
            setMessage("");
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
      sendMessage({ chatId: currentChatId, message: message.trim() });
      setMessage("");
    }
  };

  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleCreateNewChat = () => {
    const title = generateKoreanTimestamp();
    createChat(title);
    setShowHistory(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // 마크다운 링크를 HTML로 변환하고 ** 제거하는 함수
  const processMessageContent = (text: string) => {
    // 마크다운 링크 패턴: [텍스트](URL)
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

    // 링크를 HTML로 변환
    let processedText = text.replace(linkPattern, (_match, linkText, url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#0A5C2B] hover:text-[#0A5C2B]/80 underline font-medium">${linkText}</a>`;
    });

    // ### 헤딩을 bold 처리
    processedText = processedText.replace(
      /^### (.*)$/gm,
      '<span class="font-bold text-[#0A5C2B]">$1</span>'
    );

    // ** 제거 (링크 변환 후)
    processedText = processedText.replace(/\*\*/g, "");

    return processedText;
  };

  // 한국 시간으로 포맷팅하는 함수
  const formatKoreanTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);

      // UTC 시간을 한국 시간으로 변환 (UTC+9)
      const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);

      return koreanTime.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Seoul",
      });
    } catch (error) {
      console.error("시간 포맷팅 오류:", error);
      return new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Seoul",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-gray-100/50">
      {/* 메시지 영역 */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden">
          {/* 헤더 */}
          <div className="bg-white/95 backdrop-blur-xl border-b border-gray-100 px-6 py-5">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2.5 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-[#0A5C2B] tracking-tight">
                  BALLFiN AI
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                  금융 인사이트 어시스턴트
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleHistory}
                  className="text-gray-500 hover:text-[#0A5C2B] transition-colors p-2 rounded-xl hover:bg-[#0A5C2B]/5 relative group"
                  title="채팅 기록 보기"
                >
                  <History size={20} className="sm:w-5 sm:h-5" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800/90 backdrop-blur-sm text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                    채팅 기록 보기
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800/90"></div>
                  </div>
                </button>
                <button
                  onClick={handleCreateNewChat}
                  className="text-gray-500 hover:text-[#0A5C2B] transition-colors p-2 rounded-xl hover:bg-[#0A5C2B]/5 relative group"
                  title="새로운 채팅방 만들기"
                >
                  <Plus size={20} className="sm:w-5 sm:h-5" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800/90 backdrop-blur-sm text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                    새로운 채팅방 만들기
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800/90"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* 메시지 또는 히스토리 영역 */}
          {showHistory ? (
            <div className="h-[calc(100vh-200px)] overflow-y-auto bg-gray-50/30">
              <ChatHistoryList
                histories={chatList}
                currentId={currentChatId}
                editingId={editingId}
                editTitle={editTitle}
                onLoad={loadChat as any}
                onEditStart={startEditing as any}
                onEditChange={setEditTitle}
                onEditSave={saveEdit}
                onEditCancel={cancelEdit}
                formatDate={formatDate}
              />
            </div>
          ) : (
            <div className="h-[calc(100vh-200px)] overflow-y-auto bg-gray-50/30 p-6 space-y-5">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      새로운 대화를 시작해보세요
                    </h3>
                    <p className="text-sm text-gray-500">
                      금융 관련 질문이나 주식 정보에 대해 무엇이든 물어보세요
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg.msg_id}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] px-5 py-4 rounded-2xl shadow-sm ${
                          isUser
                            ? "bg-[#0A5C2B] text-white rounded-br-md"
                            : "bg-gray-50 text-gray-800 rounded-bl-md border border-gray-100"
                        }`}
                      >
                        <div
                          className="text-sm leading-relaxed whitespace-pre-wrap font-medium"
                          dangerouslySetInnerHTML={{
                            __html: processMessageContent(msg.content),
                          }}
                        />
                        <p
                          className={`text-xs mt-3 opacity-70 ${
                            isUser ? "text-green-50" : "text-gray-500"
                          }`}
                        >
                          {formatKoreanTime(msg.ts)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}

              {/* 타이핑 인디케이터 */}
              {isSending && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 text-gray-800 px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#0A5C2B] rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-[#0A5C2B] rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-[#0A5C2B] rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">
                        AI가 답변을 작성 중...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 입력 영역 */}
          <div className="bg-gray-50/50 border-t border-gray-100 p-4">
            <div className="flex gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1 min-w-0">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="메시지를 입력하세요..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20 focus:border-[#0A5C2B] transition-all duration-200 shadow-sm"
                  rows={1}
                  style={{
                    minHeight: "44px",
                    maxHeight: "120px",
                  }}
                />
                {message && (
                  <button
                    onClick={() => setMessage("")}
                    className="absolute top-2.5 right-2.5 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="p-3 text-gray-500 hover:text-[#0A5C2B] hover:bg-[#0A5C2B]/5 rounded-2xl transition-all duration-200 flex items-center justify-center active:scale-95"
                  title="파일 첨부"
                  style={{ height: "44px", width: "44px" }}
                >
                  <Paperclip size={18} />
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!message.trim() || isSending}
                  className={`p-3 rounded-2xl transition-all duration-200 flex items-center justify-center ${
                    message.trim() && !isSending
                      ? "bg-[#0A5C2B] text-white hover:bg-[#0A5C2B]/90 active:scale-95 shadow-lg"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  style={{ height: "44px", width: "44px" }}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        chatTitle={deleteModal.chatTitle}
        onConfirm={() => {
          // 삭제 로직은 ChatHistoryList에서 처리됨
          setDeleteModal({ isOpen: false, chatId: "", chatTitle: "" });
        }}
        onCancel={() => {
          setDeleteModal({ isOpen: false, chatId: "", chatTitle: "" });
        }}
      />
    </div>
  );
}
