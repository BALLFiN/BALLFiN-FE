import { axiosInstance } from "@/lib/axiosInstance";

interface SendMessageParams {
  chatId: string;
  message: string;
}

export const postChatMessage = async ({
  chatId,
  message,
}: SendMessageParams) => {
  const res = await axiosInstance.post(`/chat/chats/${chatId}/messages`, {
    content: message,
    model: "gpt",
  });

  return res.data;
};
