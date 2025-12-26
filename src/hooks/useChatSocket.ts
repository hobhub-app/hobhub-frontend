import { useEffect, useRef, useState } from "react";

export interface WsMessage {
  type: "NEW_MESSAGE";
  payload: {
    conversationId: number;
    message: {
      content: string;
      created_at: string;
    };
  };
}

const useChatSocket = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<WsMessage | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const ws = new WebSocket(
      `ws://localhost:3000?token=${encodeURIComponent(token)}`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "NEW_MESSAGE") {
        setLastMessage(data);
      }
    };

    socketRef.current = ws;

    return () => ws.close();
  }, []);

  return { lastMessage };
};

export default useChatSocket;
