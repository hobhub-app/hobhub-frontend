import { MY_CONVERSATIONS } from "@/graphql/queries/conversations.js";
import { ME } from "@/graphql/queries/users";
import type { MyChatsData } from "@/graphql/types/conversation";
import type { MeIdData } from "@/graphql/types/user";
import { useQuery } from "@apollo/client/react";
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import getOtherUser from "./utils/getOtherUser.js";
import truncateText from "./utils/truncateText.js";
import formatMessageDate from "./utils/formatMessageDate.js";
import { useLocation, useNavigate } from "react-router-dom";
import useChatSocket from "@/hooks/useChatSocket.js";
import { useEffect, useState } from "react";

const MessagesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: chatData,
    loading: chatLoading,
    error: chatError,
    refetch,
  } = useQuery<MyChatsData>(MY_CONVERSATIONS);
  const {
    data: meData,
    loading: meLoading,
    error: meError,
  } = useQuery<MeIdData>(ME);

  const [chats, setChats] = useState<MyChatsData["chats"]>([]);

  const { lastMessage } = useChatSocket();

  useEffect(() => {
    if (!chatData?.chats) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChats(chatData.chats);
  }, [chatData?.chats]);

  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  useEffect(() => {
    if (!lastMessage) return;

    const { conversationId, message } = lastMessage.payload;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChats((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessageContent: message.content,
              lastMessageAt: message.createdAt,
            }
          : conv
      )
    );
  }, [lastMessage]);

  if (chatLoading || meLoading) {
    // TODO: Replace with spinner
    return <Text>Loading...</Text>;
  }

  if (chatError || meError || !meData) {
    // TODO: Replace with error alert/notification
    console.error("GraphQL error:", chatError, meError);
    return <Text>Something went wrong</Text>;
  }

  return (
    <Box>
      {chats.map((chat) => {
        const { id, lastMessageAt, lastMessageContent } = chat;

        const otherUser = getOtherUser(chat, meData.me.id);
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
            onClick={() =>
              navigate(`/messages/${id}`, {
                state: {
                  receiverId: otherUser.id,
                },
              })
            }
          >
            <HStack gap={4}>
              <Avatar.Root size="lg">
                <Avatar.Fallback name={userName} />
                <Avatar.Image
                  src={profileImageUrl ?? undefined}
                  alt={`Profile image of ${userName} `}
                />
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
