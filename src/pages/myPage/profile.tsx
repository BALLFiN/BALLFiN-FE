import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Edit3, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "홍길동",
    email: "hong@example.com",
    phone: "010-1234-5678",
    membership: "프리미엄",
    joinDate: "2024년 1월",
  });

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const handleSave = () => {
    setUser({ ...user, ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 헤더 - 모바일에서만 표시 */}
      <div className="lg:hidden bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/mypage")}
            className="p-2 rounded-full hover:bg-gray-100/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">프로필</h1>
          <div className="w-9"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        {/* 사용자 정보 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
          <span className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-full shadow-sm">
            {user.membership}
          </span>
        </motion.div>

        {/* 개인정보 폼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200/30 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-lg">기본 정보</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-full hover:bg-blue-50"
              >
                <Edit3 className="w-4 h-4" />
                <span className="text-sm font-medium">수정</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors px-3 py-1.5 rounded-full hover:bg-gray-50"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">취소</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-full hover:bg-blue-50"
                >
                  <Save className="w-4 h-4" />
                  <span className="text-sm font-medium">저장</span>
                </button>
              </div>
            )}
          </div>

          <div className="p-6 space-y-6">
            {/* 이름 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">
                이름
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                />
              ) : (
                <p className="text-gray-900 text-lg py-2">{user.name}</p>
              )}
            </div>

            {/* 이메일 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">
                이메일
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                />
              ) : (
                <p className="text-gray-900 text-lg py-2">{user.email}</p>
              )}
            </div>

            {/* 전화번호 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">
                전화번호
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                />
              ) : (
                <p className="text-gray-900 text-lg py-2">{user.phone}</p>
              )}
            </div>

            {/* 가입일 (읽기 전용) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">
                가입일
              </label>
              <p className="text-gray-900 text-lg py-2">{user.joinDate}</p>
            </div>
          </div>
        </motion.div>

        {/* 계정 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200/30">
            <h3 className="font-semibold text-gray-900 text-lg">계정 정보</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">멤버십 등급</span>
              <span className="text-blue-500 font-semibold">
                {user.membership}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">계정 상태</span>
              <span className="text-green-500 font-semibold">활성</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
