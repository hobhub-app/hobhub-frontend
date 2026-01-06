import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation SendMessage($receiverId: Int!, $content: String!) {
    sendMessage(receiverId: $receiverId, content: $content) {
      conversationId
      message {
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
  }
`;
