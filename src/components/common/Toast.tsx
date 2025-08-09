import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type,
  onClose,
  duration = 3000,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // fade-in
    setIsVisible(true);

    // fade-out 시작 시간
    const fadeOutTime = duration - 300; // 300ms는 fade-out 애니메이션 시간

    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, fadeOutTime);

    // 완전히 사라지는 시간
    const closeTimer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 flex-nowrap whitespace-nowrap ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        } ${type === "success" ? "bg-[#0A5C2B]" : "bg-red-500"} text-white`}
      >
        {type === "success" ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <XCircle className="w-5 h-5" />
        )}
        <span className="whitespace-nowrap">{message}</span>
      </div>
    </div>
  );
}
