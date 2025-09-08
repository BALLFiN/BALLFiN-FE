import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  CreditCard,
  Heart,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react";
import Toast from "@/components/common/Toast";

export default function MyPageLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSubPage = location.pathname !== "/mypage";

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
      icon: <User className="w-5 h-5" />,
      title: "개인정보 관리",
      subtitle: "프로필 정보 수정 및 조회",
      href: "/mypage/profile",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "결제 수단 관리",
      subtitle: "카드 정보 변경 및 결제 내역",
      href: "/mypage/payment",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "즐겨찾기 리스트",
      subtitle: "관심 종목 관리",
      href: "/mypage/favorites",
    },
    {
      icon: <Bell className="w-5 h-5" />,
      title: "알림 설정",
      subtitle: "푸시 알림 및 이메일 설정",
      href: "/mypage/notifications",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "보안 설정",
      subtitle: "비밀번호 변경 및 2단계 인증",
      href: "/mypage/security",
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "고객 지원",
      subtitle: "FAQ 및 문의하기",
      href: "/mypage/support",
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

      {isSubPage ? (
        // 하위 페이지일 때 - 모바일에서는 뒤로가기만, 데스크톱에서는 사이드바
        <div className="flex h-screen">
          {/* 데스크톱 사이드바 - 모바일에서는 숨김 */}
          <div className="hidden lg:flex w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex-col">
            {/* 프로필 섹션 */}
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                  <span className="inline-block px-2 py-1 bg-[#0A5C2B] text-white text-xs font-medium rounded-full mt-1">
                    {user.membership}
                  </span>
                </div>
              </div>
            </div>

            {/* 메뉴 아이템들 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <button
                    onClick={() => navigate(item.href)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-2xl transition-all duration-200 ${
                      location.pathname === item.href
                        ? "bg-[#0A5C2B] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-xl ${
                        location.pathname === item.href
                          ? "bg-white/20"
                          : "bg-gray-100"
                      }`}
                    >
                      <div
                        className={
                          location.pathname === item.href
                            ? "text-white"
                            : "text-[#0A5C2B]"
                        }
                      >
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <h3 className="font-medium text-sm truncate">
                        {item.title}
                      </h3>
                      <p
                        className={`text-xs truncate ${
                          location.pathname === item.href
                            ? "text-white/80"
                            : "text-gray-500"
                        }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* 로그아웃 버튼 */}
            <div className="p-4 border-t border-gray-200/50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 p-3 rounded-2xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <div className="p-2 rounded-xl bg-gray-100">
                  <LogOut className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-sm">로그아웃</h3>
                  <p className="text-xs text-gray-500">
                    계정에서 로그아웃합니다
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* 메인 콘텐츠 영역 */}
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      ) : (
        // 기본 레이아웃 (메인 마이페이지일 때)
        <div className="w-full">
          <Outlet />
        </div>
      )}
    </div>
  );
}
