import { useEffect, useMemo, useRef, useState } from "react";
import { Bell, Check, X, Filter } from "lucide-react";
import { NotificationItem } from "@/types/notification";
import { formatRelativeTime } from "@/utils/timeUtils";
import { useAlarms } from "@/hooks/useAlarms";

interface NotificationBellProps {
  onMarkAsRead?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function NotificationBell({
  onMarkAsRead,
  onRemove,
}: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // API에서 알림 데이터 가져오기
  const {
    alarms,
    loading,
    error,
    unreadCount,
    markAsRead: apiMarkAsRead,
    removeAlarm,
    markAllAsRead: apiMarkAllAsRead,
    deleteAll: apiDeleteAll,
  } = useAlarms(100);

  // API 데이터를 NotificationItem 형태로 변환
  const items: NotificationItem[] = useMemo(() => {
    return alarms.map((alarm) => ({
      id: alarm._id,
      title:
        alarm.alarm_type === "news"
          ? "뉴스 알림"
          : alarm.alarm_type === "price"
            ? "주가 변동"
            : alarm.alarm_type === "analysis"
              ? "분석 결과"
              : "알림",
      message: alarm.content,
      time: formatRelativeTime(alarm.created_at),
      type:
        alarm.alarm_type === "news"
          ? "news"
          : alarm.alarm_type === "price"
            ? "price"
            : "info",
      isRead: alarm.read,
      createdAt: alarm.created_at,
      priority: alarm.score > 7 ? "high" : alarm.score > 4 ? "medium" : "low",
      data: {
        stockCode: alarm.company, // company를 stockCode로 매핑
        stockName: alarm.company, // company를 stockName으로도 매핑
        newsId: alarm._id, // 알림 ID를 newsId로 사용
        url: alarm.target_path, // target_path를 url로 사용
      },
    }));
  }, [alarms]);

  const unread = useMemo(
    () => unreadCount || items.filter((i) => !i.isRead).length,
    [unreadCount, items]
  );
  const filteredItems = useMemo(
    () => (showUnreadOnly ? items.filter((i) => !i.isRead) : items),
    [items, showUnreadOnly]
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // 반응형: viewport 변화 감지
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // ESC 키로 닫기, 모바일에서 열렸을 때 스크롤 잠금
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, isMobile]);

  const markAsRead = async (id: string) => {
    try {
      await apiMarkAsRead(id);
      onMarkAsRead?.(id);
    } catch (error) {
      console.error("알림 읽음 처리 실패:", error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await removeAlarm(id);
      onRemove?.(id);
    } catch (error) {
      console.error("알림 삭제 실패:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await apiMarkAllAsRead();
      items.forEach((item) => onMarkAsRead?.(item.id));
    } catch (error) {
      console.error("모든 알림 읽음 처리 실패:", error);
    }
  };

  const deleteAll = async () => {
    try {
      await apiDeleteAll();
      items.forEach((item) => onRemove?.(item.id));
    } catch (error) {
      console.error("모든 알림 삭제 실패:", error);
    }
  };

  const toggleOpen = () => {
    if (!open) setIsAnimating(true);
    setOpen((v) => !v);
  };

  const onClose = () => {
    setOpen(false);
    // 시트 닫힘 애니메이션 동안 포인터 이벤트 방지
    setTimeout(() => setIsAnimating(false), 250);
  };

  const PanelHeader = (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
      <div className="font-semibold text-gray-900">알림</div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          className={`h-8 w-8 flex items-center justify-center rounded-full transition-colors ${
            showUnreadOnly
              ? "bg-[#0A5C2B]/10 text-[#0A5C2B] border border-[#0A5C2B]/20"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          title={showUnreadOnly ? "모든 알림 보기" : "읽지 않은 알림만 보기"}
          aria-pressed={showUnreadOnly}
        >
          <Filter className="w-4 h-4" />
        </button>
        {unread > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs px-1 py-1.5 rounded-full  text-[#0A5C2B] hover:bg-[#0A5C2B]/15 transition-colors"
          >
            모두 읽음
          </button>
        )}
        {items.length > 0 && (
          <button
            onClick={deleteAll}
            className="text-xs px-1 py-1.5 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="모든 알림 삭제"
          >
            모두 삭제
          </button>
        )}
        <button
          onClick={onClose}
          className="h-8 w-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
          aria-label="닫기"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const PanelBody = (
    <>
      <div className="max-h-96 overflow-auto py-2 md:max-h-[28rem]">
        {loading && (
          <div className="px-4 py-10 text-center text-sm text-gray-500">
            알림을 불러오는 중...
          </div>
        )}
        {error && (
          <div className="px-4 py-10 text-center text-sm text-red-500">
            알림을 불러오는데 실패했습니다.
          </div>
        )}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="px-4 py-10 text-center text-sm text-gray-500">
            {showUnreadOnly ? "읽지 않은 알림이 없습니다" : "알림이 없습니다"}
          </div>
        )}
        {filteredItems.map((n) => (
          <div
            key={n.id}
            className={`px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
              !n.isRead ? "bg-[#0A5C2B]/5" : ""
            }`}
          >
            <div
              className="mt-0.5 h-2 w-2 rounded-full"
              style={{ backgroundColor: n.isRead ? "#e5e7eb" : "#0A5C2B" }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-900 truncate">
                  {n.title}
                </div>
                <div className="text-xs text-gray-500 ml-3 whitespace-nowrap">
                  {formatRelativeTime(n.createdAt)}
                </div>
              </div>
              <div className="text-sm text-gray-600 truncate">{n.message}</div>
              <div className="mt-2 flex items-center gap-2">
                {!n.isRead && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="inline-flex items-center gap-1 text-xs text-[#0A5C2B] hover:underline"
                  >
                    <Check className="w-3 h-3" /> 읽음
                  </button>
                )}
                <button
                  onClick={() => removeItem(n.id)}
                  className="inline-flex items-center gap-1 text-xs text-red-500 hover:underline"
                >
                  <X className="w-3 h-3" /> 삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-gray-100">
        <a
          href="/mypage/notifications"
          className="block w-full text-center text-sm font-medium text-[#0A5C2B] hover:underline"
        >
          알림 설정으로 이동
        </a>
      </div>
    </>
  );

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={toggleOpen}
        className="relative h-9 w-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur text-gray-900 hover:bg-white active:bg-white/90 shadow-sm border border-black/5 transition-colors"
        aria-label={`알림 ${unread > 0 ? `(${unread}개 읽지 않음)` : ""}`}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] leading-4 text-center shadow">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* Desktop Popover */}
      {!isMobile && open && (
        <div
          className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-[10000] overflow-hidden"
          role="dialog"
          aria-label="알림 목록"
        >
          {PanelHeader}
          {PanelBody}
        </div>
      )}

      {/* Mobile Bottom Sheet */}
      {isMobile && (open || isAnimating) && (
        <div className="fixed inset-0 z-[10000]">
          {/* backdrop */}
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
            onClick={onClose}
            aria-hidden="true"
          />
          {/* sheet */}
          <div
            ref={sheetRef}
            className={`absolute left-0 right-0 bottom-0 bg-white rounded-t-3xl shadow-2xl border-t border-gray-200 ${
              open ? "translate-y-0" : "translate-y-full"
            } transition-transform duration-200 will-change-transform`}
            role="dialog"
            aria-label="알림 목록"
            style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
          >
            <div className="flex items-center justify-center py-2">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>
            {PanelHeader}
            <div className="px-0">{PanelBody}</div>
          </div>
        </div>
      )}
    </div>
  );
}
