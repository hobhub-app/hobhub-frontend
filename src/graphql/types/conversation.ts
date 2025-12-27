import type { User } from "./user";

export interface ConversationMessage {
  id: number;
  conversationId: number;
  senderId: number;
  content: string;
  createdAt: string;
  readAt?: string | null;
  sender: User;
}

export interface Conversation {
  id: number;
  user1Id: number;
  user2Id: number;
  createdAt: string;
  lastMessageAt: string;
  lastMessageContent: string;
  user1: User;
  user2: User;
  messages: ConversationMessage[];
}

export interface ConversationPreview {
  id: number;
  lastMessageAt: string;
  lastMessageContent: string;
  user1: Pick<User, "id" | "firstname" | "lastname" | "profileImageUrl">;
  user2: Pick<User, "id" | "firstname" | "lastname" | "profileImageUrl">;
}

export interface MyChatsData {
  chats: ConversationPreview[];
}

export type ChatMessagesData = {
  messages: (Pick<
    ConversationMessage,
    "id" | "senderId" | "content" | "createdAt"
  > & {
    sender: Pick<User, "id" | "firstname" | "lastname">;
  })[];
};
