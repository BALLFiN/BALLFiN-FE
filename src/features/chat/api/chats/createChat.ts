import { axiosInstance } from "@/lib/axiosInstance";

export const createChat = async (title: string) => {
  const res = await axiosInstance.post("/api/chat/chats", { title });
  return res.data;
};
