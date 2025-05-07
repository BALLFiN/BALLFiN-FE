export const CHAT_KEYS = {
  all: ['chats'] as const,
  lists: () => [...CHAT_KEYS.all, 'list'] as const,
  detail: (chatId: string) => [...CHAT_KEYS.all, 'detail', chatId] as const,
};
