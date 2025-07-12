import { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";

export default function LivePriceIndicator() {
  const [isLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000); // 5초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex items-center gap-1">
        {isLive ? (
          <Wifi size={14} className="text-green-500" />
        ) : (
          <WifiOff size={14} className="text-red-500" />
        )}
        <span className={isLive ? "text-green-600" : "text-red-600"}>
          {isLive ? "실시간" : "연결 끊김"}
        </span>
      </div>
      <span className="text-gray-500">|</span>
      <span className="text-gray-600">
        마지막 업데이트: {formatTime(lastUpdate)}
      </span>
    </div>
  );
}
