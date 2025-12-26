import { MY_CONVERSATIONS } from "@/graphql/queries/conversations.js";
import { ME } from "@/graphql/queries/users";
import type { MyConversationsData } from "@/graphql/types/conversation";
import type { MeIdData } from "@/graphql/types/user";
import { useQuery } from "@apollo/client/react";
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import getOtherUser from "./utils/getOtherUser.js";
import truncateText from "./utils/truncateText.js";
import formatMessageDate from "./utils/formatMessageDate.js";
import { useNavigate } from "react-router-dom";
import useChatSocket from "@/hooks/useChatSocket.js";
import { useEffect, useState } from "react";

const MessagesPage = () => {
  const navigate = useNavigate();

  const {
    data: conversationsData,
    loading: conversationsLoading,
    error: conversationsError,
  } = useQuery<MyConversationsData>(MY_CONVERSATIONS);
  const {
    data: meData,
    loading: meLoading,
    error: meError,
  } = useQuery<MeIdData>(ME);

  const [conversations, setConversations] = useState<
    MyConversationsData["myConversations"]
  >([]);

  const { lastMessage } = useChatSocket();

  useEffect(() => {
    if (conversations.length === 0 && conversationsData?.myConversations) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConversations(conversationsData.myConversations);
    }
  }, [conversationsData, conversations.length]);

  useEffect(() => {
    if (!lastMessage) return;

    const { conversationId, message } = lastMessage.payload;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessageContent: message.content,
              lastMessageAt: message.created_at,
            }
          : conv
      )
    );
  }, [lastMessage]);

  if (conversationsLoading || meLoading) {
    // TODO: Replace with spinner
    return <Text>Loading...</Text>;
  }

  if (conversationsError || meError || !meData) {
    // TODO: Replace with error alert/notification
    return <Text>Something went wrong</Text>;
  }

  return (
    <Box>
      {conversations.map((conversation) => {
        const { id, lastMessageAt, lastMessageContent } = conversation;

        const otherUser = getOtherUser(conversation, meData.me.id);
        const { firstname, lastname, profileImageUrl } = otherUser;

        const userName =
          firstname && lastname ? `${firstname} ${lastname}` : "Unknown user";

        const previewText = truncateText(lastMessageContent, 50);
        const lastMessageDate = formatMessageDate(lastMessageAt);

        return (
          <Box
            key={id}
            py={4}
            borderBottom="1px solid"
            cursor="pointer"
            _hover={{ color: "grey" }}
            onClick={() => navigate(`/messages/${id}`)}
          >
            <HStack gap={4}>
              <Avatar.Root size="lg">
                <Avatar.Fallback name={userName} />
                <Avatar.Image src={profileImageUrl ?? undefined} />
              </Avatar.Root>
              <VStack align="start" flex="1">
                <Text fontWeight="medium">{userName}</Text>
                <Text fontSize="sm">{previewText}</Text>
              </VStack>
              <Text fontSize="sm">{lastMessageDate}</Text>
            </HStack>
          </Box>
        );
      })}
    </Box>
  );
};

export default MessagesPage;
