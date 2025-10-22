import { useState, useEffect } from "react";
import {
  getAlarms,
  markAlarmAsRead,
  deleteAlarm,
  deleteAllAlarms,
  markAllAlarmsAsRead,
} from "@/api/alarm";
import { AlarmItem } from "@/api/alarm/types";

export const useAlarms = (limit: number = 100) => {
  const [alarms, setAlarms] = useState<AlarmItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 알림 목록 조회
  const fetchAlarms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAlarms({ limit });
      setAlarms(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알림을 불러오는데 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  // 알림 읽음 처리
  const markAsRead = async (alarmId: string) => {
    try {
      await markAlarmAsRead(alarmId);
      setAlarms((prev) =>
        prev.map((alarm) =>
          alarm._id === alarmId ? { ...alarm, read: true } : alarm
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알림 읽음 처리에 실패했습니다."
      );
    }
  };

  // 알림 삭제
  const removeAlarm = async (alarmId: string) => {
    try {
      await deleteAlarm(alarmId);
      setAlarms((prev) => prev.filter((alarm) => alarm._id !== alarmId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알림 삭제에 실패했습니다."
      );
    }
  };

  // 모든 알림 읽음 처리
  const markAllAsRead = async () => {
    try {
      await markAllAlarmsAsRead();
      setAlarms((prev) => prev.map((alarm) => ({ ...alarm, read: true })));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "모든 알림 읽음 처리에 실패했습니다."
      );
    }
  };

  // 모든 알림 삭제
  const deleteAll = async () => {
    try {
      await deleteAllAlarms();
      setAlarms([]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "모든 알림 삭제에 실패했습니다."
      );
    }
  };

  // 읽지 않은 알림 개수
  const unreadCount = alarms.filter((alarm) => !alarm.read).length;

  useEffect(() => {
    fetchAlarms();
  }, [limit]);

  return {
    alarms,
    loading,
    error,
    unreadCount,
    fetchAlarms,
    markAsRead,
    removeAlarm,
    markAllAsRead,
    deleteAll,
  };
};
