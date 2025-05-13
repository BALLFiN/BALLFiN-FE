import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NewMessagePT } from '../../types';
import { CHAT_KEYS } from '../../constants/queryKeys';
import { getChatMessages } from '../../api/messages/getChatMessages';
import { postChatMessage } from '../../api/messages/postChatMessage';

export const useChatMessages = (chatId: string) => {
  return useQuery<NewMessagePT[]>({
    queryKey: CHAT_KEYS.detail(chatId),
    queryFn: () => getChatMessages(chatId),
    enabled: !!chatId,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postChatMessage,

    onMutate: async ({ chatId, message }) => {
      await queryClient.cancelQueries({ queryKey: CHAT_KEYS.detail(chatId) });

      const previousMessages = queryClient.getQueryData<NewMessagePT[]>(CHAT_KEYS.detail(chatId));

      queryClient.setQueryData<NewMessagePT[]>(CHAT_KEYS.detail(chatId), (old) => [
        ...(old || []),
        {
          msg_id: `optimistic-${Date.now()}`,
          content: message,
          role: 'user',
          ts: new Date().toISOString(),
        },
      ]);

      return { previousMessages, chatId };
    },

    onError: (_err, _newMsg, context) => {
      if (context?.previousMessages && context?.chatId) {
        queryClient.setQueryData(CHAT_KEYS.detail(context.chatId), context.previousMessages);
      }
    },

    onSettled: (_data, _err, { chatId }) => {
      queryClient.invalidateQueries({ queryKey: CHAT_KEYS.detail(chatId) });
    },
  });
};
