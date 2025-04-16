import { Bell, Plus, X, Check } from "lucide-react";
import Toast from "@/components/common/Toast";
import { useNewsAlarm } from "@/features/newsAlarm/hooks/useNewsAlarm";

export default function NewsAlarm() {
  const {
    alarms,
    newKeyword,
    selectedType,
    toast,
    setNewKeyword,
    setSelectedType,
    setToast,
    handleAddAlarm,
    handleRemoveAlarm,
    handleToggleAlarm,
    handleTypeChange,
  } = useNewsAlarm();

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
              onClick={handleAddAlarm}
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
            {alarms.map((alarm) => (
              <div
                key={alarm.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Bell
                    className={`w-5 h-5 ${
                      alarm.isActive ? "text-[#0A5C2B]" : "text-gray-400"
                    }`}
                  />
                  <span className="font-medium text-gray-900">
                    {alarm.keyword}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={alarm.notificationType}
                    onChange={(e) =>
                      handleTypeChange(
                        alarm.id,
                        e.target.value as "push" | "email"
                      )
                    }
                    className="px-3 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20"
                  >
                    <option value="push">푸시 알림</option>
                    <option value="email">이메일</option>
                  </select>
                  <button
                    onClick={() => handleToggleAlarm(alarm.id)}
                    className={`p-1.5 rounded-lg ${
                      alarm.isActive
                        ? "bg-[#0A5C2B]/10 text-[#0A5C2B]"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {alarm.isActive ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleRemoveAlarm(alarm.id)}
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
