import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, AlertCircle } from "lucide-react";

interface NotificationToastProps {
  show: boolean;
  onClose: () => void;
  type: "permission" | "error" | "success";
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

export default function NotificationToast({
  show,
  onClose,
  type,
  title,
  message,
  actionText,
  onAction,
}: NotificationToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // 5초 후 자동 닫기

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const getIcon = () => {
    switch (type) {
      case "permission":
        return <Bell className="w-5 h-5 text-[#0A5C2B]" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "success":
        return <Bell className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "permission":
        return "bg-[#0A5C2B]/10 border-[#0A5C2B]/20";
      case "error":
        return "bg-red-50 border-red-200";
      case "success":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 right-4 z-[10001] max-w-sm"
        >
          <div
            className={`${getBgColor()} rounded-2xl p-4 shadow-lg border backdrop-blur-sm`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{message}</p>
                <div className="flex items-center gap-2">
                  {actionText && onAction && (
                    <button
                      onClick={onAction}
                      className="px-3 py-1.5 bg-[#0A5C2B] text-white text-xs font-medium rounded-full hover:bg-[#0A5C2B]/90 transition-colors"
                    >
                      {actionText}
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="px-3 py-1.5 text-gray-500 text-xs font-medium rounded-full hover:bg-gray-100 transition-colors"
                  >
                    나중에
                  </button>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
