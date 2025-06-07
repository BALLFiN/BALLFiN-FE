import { axiosInstance } from "@/lib/axiosInstance";

interface UpdateChatTitleParams {
  chatId: string;
  title: string;
}

export const updateChatTitle = async ({
  chatId,
  title,
}: UpdateChatTitleParams) => {
  const res = await axiosInstance.put(`chat/chats/${chatId}`, { title });
  return res.data;
};
