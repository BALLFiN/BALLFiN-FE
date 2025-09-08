import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  CreditCard,
  Heart,
  ChevronRight,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit3,
} from "lucide-react";
import Toast from "@/components/common/Toast";

export default function MyPage() {
  const [user] = useState({
    name: "홍길동",
    email: "hong@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    membership: "프리미엄",
    joinDate: "2024년 1월",
  });
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const menuItems = [
    {
      icon: <User className="w-6 h-6" />,
      title: "개인정보 관리",
      subtitle: "프로필 정보 수정 및 조회",
      href: "/myPage/profile",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "결제 수단 관리",
      subtitle: "카드 정보 변경 및 결제 내역",
      href: "/myPage/payment",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "즐겨찾기 리스트",
      subtitle: "관심 종목 관리",
      href: "/myPage/favorites",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "알림 설정",
      subtitle: "푸시 알림 및 이메일 설정",
      href: "/myPage/notifications",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "보안 설정",
      subtitle: "비밀번호 변경 및 2단계 인증",
      href: "/myPage/security",
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: "고객 지원",
      subtitle: "FAQ 및 문의하기",
      href: "/myPage/support",
    },
  ];

  const handleLogout = async () => {
    const { logout } = await import("@/api/auth/logoutApi");
    try {
      await logout();
      setToast({ message: "로그아웃 되었습니다.", type: "success" });
    } catch (_) {
      setToast({ message: "로그아웃 중 오류가 발생했습니다.", type: "error" });
    } finally {
      localStorage.removeItem("access_token");
      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={1500}
        />
      )}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 space-y-6 sm:space-y-8 lg:space-y-10">
        {/* 프로필 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                />
                <button className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-[#0A5C2B] text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-[#084A23] transition-all duration-300 hover:scale-110 active:scale-95">
                  <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 mb-3">
                  <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900">
                    {user.name}
                  </h2>
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0A5C2B] text-white text-sm font-semibold rounded-full shadow-lg">
                    {user.membership}
                  </span>
                </div>
                <p className="text-gray-600 text-lg sm:text-xl lg:text-xl mb-2">
                  {user.email}
                </p>
                <p className="text-gray-500 text-sm sm:text-base">
                  가입일: {user.joinDate}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 메뉴 아이템들 */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <button
                onClick={() => (window.location.href = item.href)}
                className="group w-full bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 hover:bg-gray-50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-out active:scale-[0.98]"
              >
                <div className="flex items-start space-x-3 sm:space-x-4 lg:space-x-5">
                  <div className="p-3 sm:p-4 rounded-2xl bg-gray-100 border border-gray-200 group-hover:bg-gray-200 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                    <div className="text-[#0A5C2B]">{item.icon}</div>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="text-lg sm:text-xl lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-gray-700 transition-colors duration-300 truncate">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-2 transition-all duration-300 flex-shrink-0" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* 로그아웃 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="pt-4 sm:pt-6"
        >
          <button
            onClick={handleLogout}
            className="group w-full bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 hover:bg-gray-50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-out active:scale-[0.98]"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-5">
              <div className="p-3 sm:p-4 rounded-2xl bg-gray-100 border border-gray-200 group-hover:bg-gray-200 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                <LogOut className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <h3 className="text-lg sm:text-xl lg:text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  로그아웃
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  계정에서 로그아웃합니다
                </p>
              </div>
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-2 transition-all duration-300 flex-shrink-0" />
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
