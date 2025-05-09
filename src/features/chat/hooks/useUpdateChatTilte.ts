import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateChatTitle } from '../api/chats/updateChatTitle';
import { CHAT_KEYS } from '../constants/queryKeys';

export const useUpdateChatTitle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateChatTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_KEYS.lists() });
    },
  });
};
