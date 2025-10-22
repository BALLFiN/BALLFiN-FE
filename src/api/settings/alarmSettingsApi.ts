import { axiosInstance } from "@/lib/axiosInstance";

export interface AlarmSettings {
  price_volatility: boolean;
  golden_cross: boolean;
  dead_cross: boolean;
  rsi_low: boolean;
  rsi_high: boolean;
  news_alert: boolean;
}

export interface AlarmSettingsResponse {
  message: string;
  alarm_settings: AlarmSettings;
}

/**
 * 알람 설정 조회
 * @returns 알람 설정 객체
 */
export const getAlarmSettings = async (): Promise<AlarmSettings> => {
  try {
    const response = await axiosInstance.get("/api/settings/alarm");
    return response.data;
  } catch (error) {
    console.error("알람 설정 조회 실패:", error);
    throw error;
  }
};

/**
 * 단일 알람 설정 토글
 * @param alarmKey - 알람 키 이름
 * @param value - 설정 값
 * @returns 업데이트된 알람 설정
 */
export const updateAlarmSetting = async (
  alarmKey: string,
  value: boolean
): Promise<AlarmSettingsResponse> => {
  try {
    console.log(`🚀 API 호출: PUT /api/settings/alarm/${alarmKey}`, { value });
    const response = await axiosInstance.put(
      `/api/settings/alarm/${alarmKey}`,
      {
        value,
      }
    );
    console.log("📊 API 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ 알람 설정 업데이트 실패:", error);
    if (error.response) {
      console.error("응답 상태:", error.response.status);
      console.error("응답 데이터:", error.response.data);
    }
    throw error;
  }
};
