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

export const MY_CONVERSATION_MESSAGES = gql`
  query ChatMessages($conversationId: Int!) {
    messages: conversationMessages(conversationId: $conversationId) {
      id
      senderId
      content
      createdAt
    }
  }
`;
