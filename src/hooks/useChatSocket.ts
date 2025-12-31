import type { WsMessage } from "@/types/ws";
import { useEffect, useRef, useState } from "react";

const WS_URL = import.meta.env.VITE_WS_ENDPOINT;

const useChatSocket = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<WsMessage | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const ws = new WebSocket(`${WS_URL}?token=${encodeURIComponent(token)}`);

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
