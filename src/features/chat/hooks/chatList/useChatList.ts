import { useQuery } from "@tanstack/react-query";
import { ChatListItem } from "../../types";
import { CHAT_KEYS } from "../../constants/queryKeys";
import { getChatList } from "../../api/chats/getChatList";

export const useChatList = (limit = 10) => {
  return useQuery<ChatListItem[]>({
    queryKey: [...CHAT_KEYS.lists(), limit],
    queryFn: async () => {
      const data = await getChatList(limit);
      return data;
    },
  });
};
