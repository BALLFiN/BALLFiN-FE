import { Bell, Plus, X, Check } from "lucide-react";
import { useState } from "react";
import Toast from "@/components/common/Toast";

interface NewsAlert {
  id: string;
  keyword: string;
  isActive: boolean;
  notificationType: "push" | "email";
}

export default function NewsAlerts() {
  const [alerts, setAlerts] = useState<NewsAlert[]>([
    { id: "1", keyword: "주식", isActive: true, notificationType: "push" },
    { id: "2", keyword: "부동산", isActive: true, notificationType: "email" },
  ]);
  const [newKeyword, setNewKeyword] = useState("");
  const [selectedType, setSelectedType] = useState<"push" | "email">("push");
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const handleAddAlert = () => {
    if (newKeyword.trim()) {
      setAlerts([
        ...alerts,
        {
          id: Date.now().toString(),
          keyword: newKeyword.trim(),
          isActive: true,
          notificationType: selectedType,
        },
      ]);
      setNewKeyword("");
      setToast({
        show: true,
        message: `${newKeyword.trim()}에 대한 ${
          selectedType === "push" ? "푸시" : "이메일"
        } 알림 설정이 완료되었습니다.`,
        type: "success",
      });
    }
  };

  const handleRemoveAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const handleToggleAlert = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
      )
    );
  };

  const handleTypeChange = (id: string, type: "push" | "email") => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, notificationType: type } : alert
      )
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Bell className="text-[#0A5C2B]" size={20} />
          뉴스 알림 설정
        </h2>
      </div>

      <div className="flex gap-6">
        {/* 알림 추가 섹션 */}
        <div className="flex-1 bg-gray-50 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            새로운 알림 추가
          </h3>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="관심 키워드 입력"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20"
            />
            <select
              value={selectedType}
              onChange={(e) =>
                setSelectedType(e.target.value as "push" | "email")
              }
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20"
            >
              <option value="push">푸시 알림</option>
              <option value="email">이메일</option>
            </select>
            <button
              onClick={handleAddAlert}
              className="p-2 bg-[#0A5C2B] text-white rounded-lg hover:bg-[#0A5C2B]/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 알림 목록 섹션 */}
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            설정된 알림 목록
          </h3>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Bell
                    className={`w-5 h-5 ${
                      alert.isActive ? "text-[#0A5C2B]" : "text-gray-400"
                    }`}
                  />
                  <span className="font-medium text-gray-900">
                    {alert.keyword}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={alert.notificationType}
                    onChange={(e) =>
                      handleTypeChange(
                        alert.id,
                        e.target.value as "push" | "email"
                      )
                    }
                    className="px-3 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20"
                  >
                    <option value="push">푸시 알림</option>
                    <option value="email">이메일</option>
                  </select>
                  <button
                    onClick={() => handleToggleAlert(alert.id)}
                    className={`p-1.5 rounded-lg ${
                      alert.isActive
                        ? "bg-[#0A5C2B]/10 text-[#0A5C2B]"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {alert.isActive ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleRemoveAlert(alert.id)}
                    className="p-1.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
}
