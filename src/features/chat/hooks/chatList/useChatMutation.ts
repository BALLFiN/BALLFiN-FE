import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChat } from "../../api/chats/deleteChat";
import { CHAT_KEYS } from "../../constants/queryKeys";
import { updateChatTitle } from "../../api/chats/updateChatTitle";
import { createChat } from "../../api/chats/createChat";

interface CreateChatOptions {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      options,
    }: {
      title: string;
      options?: CreateChatOptions;
    }) => createChat(title).then((response) => ({ response, options })),
    onSuccess: ({ response, options }) => {
      // 사용자 정의 콜백 실행
      if (options?.onSuccess) {
        options.onSuccess(response);
      }
      // 콜백 실행 후 쿼리 무효화
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: CHAT_KEYS.lists() });
      }, 100);
    },
    onError: (error, variables) => {
      // 사용자 정의 에러 콜백 실행
      if (variables.options?.onError) {
        variables.options.onError(error);
      }
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
