import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Settings,
  Check,
  X,
  AlertCircle,
  Info,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "alert",
      title: "주가 급등 알림",
      message: "삼성전자 주가가 5% 상승했습니다.",
      time: "2분 전",
      isRead: false,
    },
    {
      id: 2,
      type: "info",
      title: "뉴스 알림",
      message: "새로운 시장 분석 리포트가 업데이트되었습니다.",
      time: "1시간 전",
      isRead: false,
    },
    {
      id: 3,
      type: "trending",
      title: "인기 키워드",
      message: "AI 관련 주식이 오늘 인기 키워드 1위에 올랐습니다.",
      time: "3시간 전",
      isRead: true,
    },
    {
      id: 4,
      type: "alert",
      title: "포트폴리오 알림",
      message: "보유 주식 중 하나가 목표가에 도달했습니다.",
      time: "1일 전",
      isRead: true,
    },
  ]);

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    priceAlerts: true,
    newsAlerts: true,
    trendingAlerts: false,
  });

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const handleSettingChange = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      case "trending":
        return <TrendingUp className="w-5 h-5 text-[#0A5C2B]" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 헤더 */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">알림</h1>
          <button className="p-2 rounded-full hover:bg-gray-100/80 transition-colors">
            <Settings className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        {/* 알림 요약 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl">
                <Bell className="w-6 h-6 text-[#0A5C2B]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  알림 요약
                </h2>
                <p className="text-sm text-gray-600">
                  {unreadCount}개의 읽지 않은 알림
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 bg-[#0A5C2B] text-white text-sm font-medium rounded-full hover:bg-[#0A5C2B]/90 transition-colors"
              >
                모두 읽음
              </button>
            )}
          </div>
        </motion.div>

        {/* 알림 목록 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20 ${
                !notification.isRead ? "ring-2 ring-[#0A5C2B]/20" : ""
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="p-2 text-gray-400 hover:text-[#0A5C2B] hover:bg-[#0A5C2B]/10 rounded-full transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 알림 설정 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            알림 설정
          </h2>
          <div className="space-y-4">
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">
                  {key === "pushNotifications" && "푸시 알림"}
                  {key === "emailNotifications" && "이메일 알림"}
                  {key === "priceAlerts" && "주가 알림"}
                  {key === "newsAlerts" && "뉴스 알림"}
                  {key === "trendingAlerts" && "트렌드 알림"}
                </span>
                <button
                  onClick={() => handleSettingChange(key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? "bg-[#0A5C2B]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
