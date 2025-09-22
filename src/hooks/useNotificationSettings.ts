import { useState, useEffect, useCallback } from "react";
import { NotificationSettings } from "@/types/notification";

const STORAGE_KEY = "ballfin_notification_settings";

const defaultSettings: NotificationSettings = {
  pushNotifications: true,
  emailNotifications: false,
  priceAlerts: true,
  newsAlerts: true,
  trendingAlerts: false,
  priceThreshold: 5,
  newsKeywords: "",
  quietHours: {
    enabled: false,
    start: "22:00",
    end: "08:00",
  },
};

export function useNotificationSettings() {
  const [settings, setSettings] =
    useState<NotificationSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // 설정 로드
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...parsed });
      }
    } catch (error) {
      console.error("알림 설정 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 설정 저장
  const saveSettings = useCallback(
    (newSettings: Partial<NotificationSettings>) => {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error("알림 설정 저장 실패:", error);
      }
    },
    [settings]
  );

  // 개별 설정 업데이트
  const updateSetting = useCallback(
    (key: keyof NotificationSettings, value: any) => {
      saveSettings({ [key]: value });
    },
    [saveSettings]
  );

  // 설정 초기화
  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    settings,
    isLoading,
    saveSettings,
    updateSetting,
    resetSettings,
  };
}
