import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Edit3, Save, X, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "홍길동",
    email: "hong@example.com",
    phone: "010-1234-5678",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
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
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">개인정보 관리</h1>
          <div className="w-9"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* 프로필 이미지 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
              />
              <button className="absolute -bottom-2 -right-2 bg-[#0A5C2B] text-white p-2 rounded-full shadow-lg hover:bg-[#0A5C2B]/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {user.name}
              </h2>
              <span className="px-3 py-1 bg-[#0A5C2B] text-white text-sm font-medium rounded-full">
                {user.membership}
              </span>
            </div>
          </div>
        </motion.div>

        {/* 개인정보 폼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">기본 정보</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-1 text-[#0A5C2B] hover:text-[#0A5C2B]/80 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span className="text-sm font-medium">수정</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">취소</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-1 text-[#0A5C2B] hover:text-[#0A5C2B]/80 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span className="text-sm font-medium">저장</span>
                </button>
              </div>
            )}
          </div>

          <div className="p-4 space-y-4">
            {/* 이름 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이름
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20 focus:border-[#0A5C2B]"
                />
              ) : (
                <p className="text-gray-900">{user.name}</p>
              )}
            </div>

            {/* 이메일 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20 focus:border-[#0A5C2B]"
                />
              ) : (
                <p className="text-gray-900">{user.email}</p>
              )}
            </div>

            {/* 전화번호 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전화번호
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20 focus:border-[#0A5C2B]"
                />
              ) : (
                <p className="text-gray-900">{user.phone}</p>
              )}
            </div>

            {/* 가입일 (읽기 전용) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                가입일
              </label>
              <p className="text-gray-900">{user.joinDate}</p>
            </div>
          </div>
        </motion.div>

        {/* 계정 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">계정 정보</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">멤버십 등급</span>
              <span className="text-[#0A5C2B] font-medium">
                {user.membership}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">계정 상태</span>
              <span className="text-green-600 font-medium">활성</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
