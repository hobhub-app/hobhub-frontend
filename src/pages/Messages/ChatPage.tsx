import { MY_CONVERSATION_MESSAGES } from "@/graphql/queries/conversations";
import { ME } from "@/graphql/queries/users";
import type { ChatMessagesData } from "@/graphql/types/conversation";
import type { MeIdData } from "@/graphql/types/user";
import { useQuery } from "@apollo/client/react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import formatMessageDate from "./utils/formatMessageDate";
import { useState } from "react";

const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();

  const [activeMessageId, setActiveMessageId] = useState<number | null>(null);

  const { data, loading, error } = useQuery<ChatMessagesData>(
    MY_CONVERSATION_MESSAGES,
    {
      variables: {
        conversationId: Number(chatId),
      },
      skip: !chatId,
    }
  );

  const { data: meData } = useQuery<MeIdData>(ME);
  const meId = meData?.me.id;

  if (loading || !meId) {
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
        {messages.map(({ id, senderId, content, createdAt, sender }) => {
          const isMine = senderId === meId;
          const name = isMine
            ? "You"
            : `${sender.firstname} ${sender.lastname}`;
          const timestamp = formatMessageDate(createdAt);
          const isActive = activeMessageId === id;
          return (
            <Box
              key={id}
              alignSelf={isMine ? "flex-end" : "flex-start"}
              maxW="70%"
            >
              <Text
                fontSize="xs"
                color="gray.500"
                mb={1}
                textAlign={isMine ? "right" : "left"}
              >
                {name}
              </Text>
              <Box
                bg={isMine ? "blue.500" : "gray.100"}
                color={isMine ? "white" : "gray.800"}
                px={3}
                py={2}
                borderRadius="lg"
                borderTopRightRadius={isMine ? "sm" : "lg"}
                borderTopLeftRadius={isMine ? "lg" : "sm"}
                onClick={() => {
                  setActiveMessageId(activeMessageId === id ? null : id);
                }}
              >
                {content}
              </Box>
              {isActive && (
                <Text
                  fontSize="xs"
                  color="gray.400"
                  mt={1}
                  textAlign={isMine ? "right" : "left"}
                >
                  {timestamp}
                </Text>
              )}
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default ChatPage;
