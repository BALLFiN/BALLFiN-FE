import { useState, useEffect } from "react";
import {
  getAlarmSettings,
  updateAlarmSetting,
  AlarmSettings,
} from "@/api/settings/alarmSettingsApi";

export const useAlarmSettings = () => {
  const [settings, setSettings] = useState<AlarmSettings>({
    price_volatility: false,
    golden_cross: false,
    dead_cross: false,
    rsi_low: false,
    rsi_high: false,
    news_alert: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 알람 설정 조회
  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAlarmSettings();
      setSettings(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "알람 설정을 불러오는데 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  // 단일 알람 설정 업데이트
  const updateSetting = async (
    alarmKey: keyof AlarmSettings,
    value: boolean
  ) => {
    try {
      console.log(`🔧 알람 설정 업데이트 시도: ${alarmKey} = ${value}`);
      const response = await updateAlarmSetting(alarmKey, value);
      setSettings(response.alarm_settings);
      console.log("✅ 알람 설정 업데이트 성공:", response);
    } catch (err) {
      console.error("❌ 알람 설정 업데이트 실패:", err);
      setError(
        err instanceof Error
          ? err.message
          : "알람 설정 업데이트에 실패했습니다."
      );
      // 에러를 다시 던지지 않고 사용자에게 알림만 표시
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    updateSetting,
    fetchSettings,
  };
};
