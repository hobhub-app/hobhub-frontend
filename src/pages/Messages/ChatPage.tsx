import {
  CONVERSATION_BY_ID,
  MY_CONVERSATION_MESSAGES,
} from "@/graphql/queries/conversations";
import { ME } from "@/graphql/queries/users";
import type {
  ChatByIdData,
  ChatMessagesData,
  SendMessageResult,
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import formatMessageDate from "./utils/formatMessageDate";
import { useEffect, useState } from "react";
import { SEND_MESSAGE } from "@/graphql/mutations/conversations";
import useChatSocket from "@/hooks/useChatSocket";

const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const receiverIdFromState = (location.state as { receiverId?: number } | null)
    ?.receiverId;
  const receiverIdFromQuery = new URLSearchParams(location.search).get(
    "userId"
  );

  const isNewChat = !chatId && receiverIdFromQuery;

  const { lastMessage } = useChatSocket(chatId ? Number(chatId) : null);

  const [messages, setMessages] = useState<ChatMessagesData["messages"]>([]);
  const [activeMessageId, setActiveMessageId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const { data, loading, error } = useQuery<ChatMessagesData>(
    MY_CONVERSATION_MESSAGES,
    {
      variables: {
        conversationId: Number(chatId),
      },
      skip: !chatId,
    }
  );

  useEffect(() => {
    if (!data?.messages) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages(data.messages);
  }, [data?.messages, chatId]);

  const { data: meData } = useQuery<MeIdData>(ME);
  const meId = meData?.me.id;

  const shouldFetchChat = !receiverIdFromState && !!chatId && !!meId;

  const { data: chatData } = useQuery<ChatByIdData>(CONVERSATION_BY_ID, {
    variables: { conversationId: Number(chatId) },
    skip: !shouldFetchChat,
  });

  const receiverId =
    receiverIdFromState ??
    (receiverIdFromQuery ? Number(receiverIdFromQuery) : undefined) ??
    (chatData && meId
      ? chatData.chat.user1Id === meId
        ? chatData.chat.user2Id
        : chatData.chat.user1Id
      : undefined);

  useEffect(() => {
    if (!lastMessage) return;

    const { conversationId, message } = lastMessage.payload;
    if (conversationId !== Number(chatId)) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages((prev) => {
      const exists = prev.some((m) => m.id === message.id);
      if (exists) return prev;

      return [...prev, message];
    });
  }, [lastMessage, chatId]);

  const [sendMessage, { loading: sending }] =
    useMutation<SendMessageResult>(SEND_MESSAGE);

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const { data } = await sendMessage({
      variables: {
        receiverId,
        content: newMessage,
      },
    });

    if (!data) return;

    const { conversationId, message } = data.sendMessage;

    if (message) {
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    }

    if (isNewChat) {
      navigate(`/messages/${conversationId}`, { replace: true });
    }

    setNewMessage("");
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
