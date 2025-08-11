import { axiosInstance } from "@/lib/axiosInstance";
import { ChatListItem } from "../../types";

interface ChatListResponse {
  chat_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export const getChatList = async (limit = 10): Promise<ChatListItem[]> => {
  const res = await axiosInstance.get<ChatListResponse[]>("/chat/chats", {
    params: { limit },
  });
  return res.data.map(
    (item): ChatListItem => ({
      id: item.chat_id,
      title: item.title,
      created_at: item.created_at,
      updated_at: item.updated_at,
    })
  );
};
