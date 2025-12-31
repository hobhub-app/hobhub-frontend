export interface WsMessage {
  type: "NEW_MESSAGE";
  payload: {
    conversationId: number;
    message: {
      id: number;
      senderId: number;
      content: string;
      createdAt: string;
      sender: {
        id: number;
        firstname: string;
        lastname: string;
      };
    };
  };
}
