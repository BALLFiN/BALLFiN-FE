import { useQuery } from '@tanstack/react-query';
import { Message } from '../../types';
import { CHAT_KEYS } from '../../constants/queryKeys';
import { getChatMessages } from '../../api/messages/getChatMessages';

export const useChatMessages = (chatId: string) => {
  return useQuery<Message[]>({
    queryKey: CHAT_KEYS.detail(chatId),
    queryFn: () => getChatMessages(chatId),
    enabled: !!chatId,
  });
};
