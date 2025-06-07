import { useState } from "react";

interface NewsAlarm {
  id: string;
  keyword: string;
  isActive: boolean;
  notificationType: "push" | "email";
}

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
}

export function useNewsAlarm() {
  const [alarms, setAlarms] = useState<NewsAlarm[]>([
    { id: "1", keyword: "주식", isActive: true, notificationType: "push" },
    { id: "2", keyword: "부동산", isActive: true, notificationType: "email" },
  ]);
  const [newKeyword, setNewKeyword] = useState("");
  const [selectedType, setSelectedType] = useState<"push" | "email">("push");
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
  });

  const handleAddAlarm = () => {
    if (newKeyword.trim()) {
      setAlarms([
        ...alarms,
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

  const handleRemoveAlarm = (id: string) => {
    const removedAlarm = alarms.find((alarm) => alarm.id === id);
    setAlarms(alarms.filter((alarm) => alarm.id !== id));
    setToast({
      show: true,
      message: `${removedAlarm?.keyword} 알림이 삭제되었습니다.`,
      type: "error",
    });
  };

  const handleToggleAlarm = (id: string) => {
    setAlarms(
      alarms.map((alarm) => {
        if (alarm.id === id) {
          const newIsActive = !alarm.isActive;
          setToast({
            show: true,
            message: `${alarm.keyword} 알림이 ${
              newIsActive ? "활성화" : "비활성화"
            }되었습니다.`,
            type: newIsActive ? "success" : "error",
          });
          return { ...alarm, isActive: newIsActive };
        }
        return alarm;
      }),
    );
  };

  const handleTypeChange = (id: string, type: "push" | "email") => {
    setAlarms(
      alarms.map((alarm) => {
        if (alarm.id === id) {
          setToast({
            show: true,
            message: `${alarm.keyword} 알림이 ${
              type === "push" ? "푸시" : "이메일"
            } 알림으로 변경되었습니다.`,
            type: "success",
          });
          return { ...alarm, notificationType: type };
        }
        return alarm;
      }),
    );
  };

  return {
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
  };
}
