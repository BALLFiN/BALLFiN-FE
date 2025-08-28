import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  CreditCard,
  Heart,
  Settings,
  ChevronRight,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit3,
} from "lucide-react";

export default function MyPage() {
  const [user] = useState({
    name: "홍길동",
    email: "hong@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    membership: "프리미엄",
    joinDate: "2024년 1월",
  });

  const menuItems = [
    {
      icon: <User className="w-6 h-6" />,
      title: "개인정보 관리",
      subtitle: "프로필 정보 수정 및 조회",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-200",
      href: "/myPage/profile",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "결제 수단 관리",
      subtitle: "카드 정보 변경 및 결제 내역",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-200",
      href: "/myPage/payment",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "즐겨찾기 리스트",
      subtitle: "관심 종목 및 뉴스 관리",
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-200",
      href: "/myPage/favorites",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "알림 설정",
      subtitle: "푸시 알림 및 이메일 설정",
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-200",
      href: "/myPage/notifications",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "보안 설정",
      subtitle: "비밀번호 변경 및 2단계 인증",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-200",
      href: "/myPage/security",
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: "고객 지원",
      subtitle: "FAQ 및 문의하기",
      color: "text-slate-500",
      bgColor: "bg-slate-500/10",
      borderColor: "border-slate-200",
      href: "/myPage/support",
    },
  ];

  const handleLogout = () => {
    // 로그아웃 로직
    console.log("로그아웃");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* 프로필 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40">
            <div className="flex items-center space-x-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-30"></div>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-2xl"
                />
                <button className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95">
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {user.name}
                  </h2>
                  <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-full shadow-lg">
                    {user.membership}
                  </span>
                </div>
                <p className="text-slate-600 text-xl mb-2">{user.email}</p>
                <p className="text-slate-500 text-base">
                  가입일: {user.joinDate}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 메뉴 아이템들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="group w-full bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40 hover:bg-white/90 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out active:scale-[0.98] overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative flex items-start space-x-5">
                  <div
                    className={`p-4 rounded-2xl ${item.bgColor} border ${item.borderColor} group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
                  >
                    <div className={item.color}>{item.icon}</div>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-base">
                      {item.subtitle}
                    </p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-2 transition-all duration-300" />
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
          className="pt-6"
        >
          <button
            onClick={handleLogout}
            className="group w-full bg-gradient-to-r from-rose-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-rose-200/50 hover:from-rose-500/20 hover:to-pink-500/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out active:scale-[0.98] overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="relative flex items-center space-x-5">
              <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-200 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <LogOut className="w-6 h-6 text-rose-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-rose-600 group-hover:text-rose-700 transition-colors duration-300">
                  로그아웃
                </h3>
                <p className="text-slate-600 text-base">
                  계정에서 로그아웃합니다
                </p>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-2 transition-all duration-300" />
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
