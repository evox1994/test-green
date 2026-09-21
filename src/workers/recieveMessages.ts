import axios from 'axios';
import type { RecieveWorkerPayload } from './types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let interval: number | null = null;

const startPolling = (idInstance: string, apiTokenInstance: string) => {
  if (interval) {
    return;
  }

  interval = setInterval(async () => {
    try {
      const response = await api.get(`/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`);
      if (!response.data) {
        return;
      }

      self.postMessage({
        id: response.data.body.idMessage,
        message: response.data.body.messageData.textMessageData.textMessage,
        date: response.data.body.timestamp,
        type: 'incoming',
      });

      await api.delete(`/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${response.data.receiptId}`);
    } catch (e) {
      console.error(e);
    }
  }, 5000);
};

const stopPolling = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
};

self.onmessage = (event: MessageEvent<RecieveWorkerPayload>) => {
  console.log(event);
  const { type, apiTokenInstance, idInstance } = event.data;

  if (type === 'start') {
    startPolling(idInstance, apiTokenInstance);
  } else if (type === 'stop') {
    stopPolling();
  }
};
