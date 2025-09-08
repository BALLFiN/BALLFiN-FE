import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SecurityPage() {
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    biometricLogin: true,
    sessionTimeout: "30분",
    loginAlerts: true,
  });

  const [recentActivity] = useState([
    {
      id: 1,
      action: "로그인",
      location: "서울, 대한민국",
      device: "iPhone 15 Pro",
      time: "2분 전",
      status: "success",
    },
    {
      id: 2,
      action: "비밀번호 변경",
      location: "서울, 대한민국",
      device: "MacBook Pro",
      time: "1일 전",
      status: "success",
    },
    {
      id: 3,
      action: "로그인 시도",
      location: "부산, 대한민국",
      device: "Unknown Device",
      time: "3일 전",
      status: "failed",
    },
  ]);

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handleSecuritySettingChange = (key: string) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handleChangePassword = () => {
    if (passwords.new === passwords.confirm) {
      console.log("비밀번호 변경:", passwords);
      setPasswords({ current: "", new: "", confirm: "" });
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "success" ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <AlertTriangle className="w-4 h-4 text-red-500" />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        {/* 보안 상태 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl">
              <Shield className="w-6 h-6 text-[#0A5C2B]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">보안 상태</h2>
              <p className="text-sm text-gray-600">
                계정이 안전하게 보호되고 있습니다
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-600 font-medium">보안 강도: 높음</span>
          </div>
        </motion.div>

        {/* 비밀번호 변경 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl">
              <Lock className="w-6 h-6 text-[#0A5C2B]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                비밀번호 변경
              </h2>
              <p className="text-sm text-gray-600">
                정기적으로 비밀번호를 변경하세요
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                현재 비밀번호
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) =>
                    handlePasswordChange("current", e.target.value)
                  }
                  className="w-full px-4 py-3 pr-12 bg-gray-50/50 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20 focus:border-[#0A5C2B] focus:bg-white transition-all"
                />
                <button
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                새 비밀번호
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwords.new}
                  onChange={(e) => handlePasswordChange("new", e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-gray-50/50 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20 focus:border-[#0A5C2B] focus:bg-white transition-all"
                />
                <button
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                새 비밀번호 확인
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={(e) =>
                    handlePasswordChange("confirm", e.target.value)
                  }
                  className="w-full px-4 py-3 pr-12 bg-gray-50/50 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20 focus:border-[#0A5C2B] focus:bg-white transition-all"
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleChangePassword}
              disabled={
                !passwords.current || !passwords.new || !passwords.confirm
              }
              className="w-full bg-[#0A5C2B] text-white py-3 px-4 rounded-2xl font-medium hover:bg-[#0A5C2B]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              비밀번호 변경
            </button>
          </div>
        </motion.div>

        {/* 보안 설정 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            보안 설정
          </h2>
          <div className="space-y-4">
            {Object.entries(securitySettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                    <Smartphone className="w-4 h-4 text-[#0A5C2B]" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    {key === "twoFactorAuth" && "2단계 인증"}
                    {key === "biometricLogin" && "생체 인증"}
                    {key === "sessionTimeout" && "세션 타임아웃"}
                    {key === "loginAlerts" && "로그인 알림"}
                  </span>
                </div>
                {key === "sessionTimeout" ? (
                  <select
                    value={value}
                    onChange={(e) =>
                      setSecuritySettings((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="15분">15분</option>
                    <option value="30분">30분</option>
                    <option value="1시간">1시간</option>
                    <option value="24시간">24시간</option>
                  </select>
                ) : (
                  <button
                    onClick={() => handleSecuritySettingChange(key)}
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
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* 최근 활동 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            최근 활동
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-2xl"
              >
                <div className="flex-shrink-0">
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      {activity.action}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.device}</p>
                  <p className="text-xs text-gray-500">{activity.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
