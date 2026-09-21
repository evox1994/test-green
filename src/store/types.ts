export interface SetAuthPayload {
  id: string;
  token: string;
}

export interface SendMessagePayload {
  chatId: string;
  message: string;
}
