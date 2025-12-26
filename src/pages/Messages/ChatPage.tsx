import { MY_CONVERSATION_MESSAGES } from "@/graphql/queries/conversations";
import type { ChatMessagesData } from "@/graphql/types/conversation";
import { useQuery } from "@apollo/client/react";
import { Box, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();

  const { data, loading, error } = useQuery<ChatMessagesData>(
    MY_CONVERSATION_MESSAGES,
    {
      variables: {
        conversationId: Number(chatId),
      },
      skip: !chatId,
    }
  );

  if (loading) {
    //TODO: Replace with Spinner
    return <Box>Loading messages…</Box>;
  }

  if (error) {
    // TODO: Replace with error alert/notification
    console.error("GraphQL error:", error);
    return <Box>Failed to load messages</Box>;
  }

  const messages = data?.messages ?? [];

  console.log("messages", messages);
  return (
    <Box>
      <VStack>
        {messages.map((message) => (
          <Box key={message.id}>{message.content}</Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ChatPage;
