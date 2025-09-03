import { axiosInstance } from "@/lib/axiosInstance";

interface DeleteChatParams {
  chatId: string;
}

export const deleteChat = async ({ chatId }: DeleteChatParams) => {
  await axiosInstance.delete(`/api/chat/chats/${chatId}`);
};
