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

  if (conversationsLoading || meLoading) {
    // TODO: Replace with spinner
    return <Text>Loading...</Text>;
  }

  if (conversationsError || meError || !meData) {
    // TODO: Replace with error alert/notification
    return <Text>Something went wrong</Text>;
  }

  const conversations = conversationsData?.myConversations ?? [];

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
