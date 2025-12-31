import type { User } from "./user";

export interface ConversationMessage {
  id: number;
  senderId: number;
  content: string;
  createdAt: string;
  readAt?: string | null;

  sender: Pick<User, "id" | "firstname" | "lastname">;
}

export interface Conversation {
  id: number;
  user1Id: number;
  user2Id: number;
  createdAt: string;
  lastMessageAt: string;
  lastMessageContent: string;

  user1?: User;
  user2?: User;

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

export interface ChatByIdData {
  chat: Pick<Conversation, "id" | "user1Id" | "user2Id">;
}

export interface ChatMessagesData {
  messages: ConversationMessage[];
}

export interface SendMessageResult {
  sendMessage: ChatMessagesData["messages"][number];
}
