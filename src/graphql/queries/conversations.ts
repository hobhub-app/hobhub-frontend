import { gql } from "@apollo/client";

export const MY_CONVERSATIONS = gql`
  query MyChats {
    chats: myConversations {
      id
      lastMessageAt
      lastMessageContent
      user1 {
        id
        firstname
        lastname
        profileImageUrl
      }
      user2 {
        id
        firstname
        lastname
        profileImageUrl
      }
    }
  }
`;

export const CONVERSATION_BY_ID = gql`
  query Chat($conversationId: Int!) {
    chat: conversation(conversationId: $conversationId) {
      id
      user1Id
      user2Id
    }
  }
`;

export const MY_CONVERSATION_MESSAGES = gql`
  query ChatMessages($conversationId: Int!) {
    messages: conversationMessages(conversationId: $conversationId) {
      id
      senderId
      content
      createdAt
      sender {
        id
        firstname
        lastname
      }
    }
  }
`;
