import { gql } from "@apollo/client";

export const MY_CONVERSATIONS = gql`
  query MyConversations {
    myConversations {
      id
      lastMessageAt
      lastMessageContent
      user1 {
        id
        firstname
        profileImageUrl
      }
      user2 {
        id
        firstname
        profileImageUrl
      }
    }
  }
`;
