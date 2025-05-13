import { axiosInstance } from '@/lib/axiosInstance';
import { NewMessagePT } from '../../types';

export const getChatMessages = async (chatId: string): Promise<NewMessagePT[]> => {
  const res = await axiosInstance.get(`/chat/chats/${chatId}/messages`);
  return res.data;
};
