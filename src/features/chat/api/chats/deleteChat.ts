import { axiosInstance } from '@/lib/axiosInstance';

interface DeleteChatParams {
  chatId: string;
}

export const deleteChat = async ({ chatId }: DeleteChatParams) => {
  await axiosInstance.delete(`/chat/chats/${chatId}`);
};
