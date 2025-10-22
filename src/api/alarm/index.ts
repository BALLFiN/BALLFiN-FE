import { axiosInstance } from "@/lib/axiosInstance";
import { AlarmListParams, AlarmListResponse } from "./types";

/**
 * 사용자 알림 목록 조회
 * @param params - 조회 파라미터 (limit 등)
 * @returns 알림 목록 응답
 */
export const getAlarms = async (
  params: AlarmListParams = {}
): Promise<AlarmListResponse> => {
  try {
    const response = await axiosInstance.get("/api/alarm/alarms", {
      params: {
        limit: params.limit || 100,
      },
    });

    // 서버 데이터를 올바른 형식으로 변환
    const transformedData = Array.isArray(response.data)
      ? response.data.map((item: any) => ({
          _id: item._id?.$oid || item._id || item.id,
          user_id: item.user_id,
          alarm_type: item.alarm_type,
          content: item.content,
          read: item.read,
          target_path: item.target_path,
          created_at: item.created_at?.$date || item.created_at,
          company: item.company,
          score: item.score,
        }))
      : [];

    return {
      data: transformedData,
      message: "알림 목록을 성공적으로 가져왔습니다.",
      status: 200,
    };
  } catch (error) {
    console.error("알림 목록 조회 실패:", error);
    throw error;
  }
};

/**
 * 알림 읽음 처리
 * @param alarmId - 알림 ID
 * @returns 성공 여부
 */
export const markAlarmAsRead = async (alarmId: string): Promise<boolean> => {
  try {
    await axiosInstance.patch(`/api/alarm/alarms/${alarmId}/read`);
    return true;
  } catch (error) {
    console.error("알림 읽음 처리 실패:", error);
    throw error;
  }
};

/**
 * 개별 알림 삭제
 * @param alarmId - 알림 ID
 * @returns 성공 여부
 */
export const deleteAlarm = async (alarmId: string): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/api/alarm/alarms/${alarmId}`);
    return true;
  } catch (error) {
    console.error("알림 삭제 실패:", error);
    throw error;
  }
};

/**
 * 모든 알림 삭제
 * @returns 성공 여부
 */
export const deleteAllAlarms = async (): Promise<boolean> => {
  try {
    await axiosInstance.delete("/api/alarm/alarms");
    return true;
  } catch (error) {
    console.error("모든 알림 삭제 실패:", error);
    throw error;
  }
};

/**
 * 모든 알림 읽음 처리
 * @returns 성공 여부
 */
export const markAllAlarmsAsRead = async (): Promise<boolean> => {
  try {
    await axiosInstance.patch("/api/alarm/alarms/read-all");
    return true;
  } catch (error) {
    console.error("모든 알림 읽음 처리 실패:", error);
    throw error;
  }
};
