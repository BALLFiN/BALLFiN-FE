export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "alert" | "info" | "trending" | "price" | "news";
  isRead: boolean;
  createdAt: string; // ISO string for API
  priority?: "low" | "medium" | "high";
  data?: {
    stockCode?: string;
    stockName?: string;
    priceChange?: number;
    newsId?: string;
    url?: string;
  };
}

export interface NotificationSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  priceAlerts: boolean;
  newsAlerts: boolean;
  trendingAlerts: boolean;
  priceThreshold: number; // 1-50%
  newsKeywords: string; // comma-separated
  quietHours: {
    enabled: boolean;
    start: string; // HH:mm format
    end: string; // HH:mm format
  };
}

export interface NotificationPermission {
  permission: "default" | "granted" | "denied";
  isSupported: boolean;
  showToast: boolean;
}
