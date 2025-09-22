import { useState, useEffect, useCallback } from "react";

type PermissionState = "default" | "granted" | "denied";

interface UseNotificationPermissionReturn {
  permission: PermissionState;
  isSupported: boolean;
  requestPermission: () => Promise<boolean>;
  showToast: boolean;
  hideToast: () => void;
}

export function useNotificationPermission(): UseNotificationPermissionReturn {
  const [permission, setPermission] = useState<PermissionState>("default");
  const [isSupported, setIsSupported] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // 브라우저 지원 여부 확인
    const supported = "Notification" in window;
    setIsSupported(supported);

    if (supported) {
      setPermission(Notification.permission as PermissionState);
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      setShowToast(true);
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result as PermissionState);

      if (result === "granted") {
        // 권한 허용 시 테스트 알림 표시
        new Notification("BALLFiN 알림", {
          body: "알림이 성공적으로 설정되었습니다!",
          icon: "/favicon.ico",
        });
        return true;
      } else {
        setShowToast(true);
        return false;
      }
    } catch (error) {
      console.error("알림 권한 요청 실패:", error);
      setShowToast(true);
      return false;
    }
  }, [isSupported]);

  const hideToast = useCallback(() => {
    setShowToast(false);
  }, []);

  return {
    permission,
    isSupported,
    requestPermission,
    showToast,
    hideToast,
  };
}
