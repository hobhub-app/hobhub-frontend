import {
  CONVERSATION_BY_ID,
  MY_CONVERSATION_MESSAGES,
} from "@/graphql/queries/conversations";
import { ME } from "@/graphql/queries/users";
import type {
  ChatByIdData,
  ChatMessagesData,
} from "@/graphql/types/conversation";
import type { MeIdData } from "@/graphql/types/user";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  Box,
  VStack,
  Text,
  Field,
  Input,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import formatMessageDate from "./utils/formatMessageDate";
import { useState } from "react";
import { SEND_MESSAGE } from "@/graphql/mutations/conversations";

const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const location = useLocation();
  const receiverIdFromState = (location.state as { receiverId?: number } | null)
    ?.receiverId;

  const [activeMessageId, setActiveMessageId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const { data, loading, error, refetch } = useQuery<ChatMessagesData>(
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

  const shouldFetchChat = !receiverIdFromState && !!chatId && !!meId;

  const { data: chatData } = useQuery<ChatByIdData>(CONVERSATION_BY_ID, {
    variables: { conversationId: Number(chatId) },
    skip: !shouldFetchChat,
  });

  const receiverId =
    receiverIdFromState ??
    (chatData && meId
      ? chatData.chat.user1Id === meId
        ? chatData.chat.user2Id
        : chatData.chat.user1Id
      : undefined);

  const messages = data?.messages ?? [];

  const [sendMessage, { loading: sending }] = useMutation(SEND_MESSAGE);

  if (loading || !meId) {
    //TODO: Replace with Spinner
    return <Box>Loading messages…</Box>;
  }

  if (error) {
    // TODO: Replace with error alert/notification
    console.error("GraphQL error:", error);
    return <Box>Failed to load messages</Box>;
  }

  if (!receiverId) {
    return <Box>Unable to load chat. Please open it from Messages.</Box>;
  }

  console.log("messages", messages);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    await sendMessage({
      variables: {
        receiverId,
        content: newMessage,
      },
    });

    setNewMessage("");
    await refetch();
  };

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

      <Box
        as="form"
        onSubmit={handleSendMessage}
        w="100%"
        pt={8}
        justifySelf="flex-end"
      >
        <HStack>
          <Field.Root>
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="message here"
            />
          </Field.Root>
          <Button type="submit" loading={sending} disabled={!newMessage.trim()}>
            send icon
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ChatPage;
