import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteChat } from '../../api/chats/deleteChat';
import { CHAT_KEYS } from '../../constants/queryKeys';
import { updateChatTitle } from '../../api/chats/updateChatTitle';

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_KEYS.lists() });
    },
  });
};
export const useDeleteChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_KEYS.lists() });
    },
  });
};

export const useUpdateChatTitle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateChatTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_KEYS.lists() });
    },
  });
};
