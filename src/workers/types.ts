export interface RecieveWorkerPayload {
  type: 'start' | 'stop';
  idInstance: string;
  apiTokenInstance: string;
}

export interface IncomingMessagePayload {
  chatId: string;
  id: string;
  message: string;
  date: Date;
  type: 'outgoing' | 'incoming';
}
