export interface AlarmItem {
  _id: string;
  user_id: string;
  alarm_type: string;
  content: string;
  read: boolean;
  target_path: string;
  created_at: string;
  company: string;
  score: number;
}

export interface AlarmListResponse {
  data: AlarmItem[];
  message: string;
  status: number;
}

export interface AlarmListParams {
  limit?: number;
}
