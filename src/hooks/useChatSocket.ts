import type { WsMessage } from "@/types/ws";
import { useEffect, useRef, useState } from "react";

const WS_URL = import.meta.env.VITE_WS_ENDPOINT;

const useChatSocket = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const [lastMessage, setLastMessage] = useState<WsMessage | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !WS_URL) return;

    let cancelled = false;

    const connect = () => {
      if (cancelled) return;

      const ws = new WebSocket(`${WS_URL}?token=${encodeURIComponent(token)}`);

      socketRef.current = ws;

      ws.onopen = () => {
        setConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "NEW_MESSAGE") {
            setLastMessage(data);
          }
        } catch {
          // ignore malformed messages
        }
      };

      ws.onclose = () => {
        setConnected(false);

        reconnectTimeoutRef.current = window.setTimeout(connect, 1000);
      };

      ws.onerror = () => {
        ws.close();
      };
    };

    connect();

    return () => {
      cancelled = true;
      setConnected(false);

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      socketRef.current?.close();
    };
  }, []);

  return { lastMessage, connected };
};

export default useChatSocket;
