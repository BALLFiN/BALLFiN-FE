import { axiosInstance } from '@/lib/axiosInstance';
import { Message } from '../../types';

export const getChatMessages = async (chatId: string): Promise<Message[]> => {
  const res = await axiosInstance.get(`/chat/chats/${chatId}/messages`);
  return res.data;
};
