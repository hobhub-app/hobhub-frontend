import type { ConversationPreview } from "@/graphql/types/conversation.js";

const getOtherUser = (conversation: ConversationPreview, myUserId: number) => {
  if (conversation.user1.id === myUserId) {
    return conversation.user2;
  }

  return conversation.user1;
};

export default getOtherUser;
