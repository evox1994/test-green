import { makeAutoObservable, runInAction } from 'mobx';
import { api } from '@api';
import type { SendMessagePayload } from './types';
import type { AuthStore } from './auth.store';

interface Message {
  id: string;
  message: string;
  date: Date;
  type: 'outgoing' | 'incoming';
}

interface Chat {
  id: string;
  name: string;
  messages: Message[];
}

export class ChatStore {
  chats: Chat[] = [];
  selectedChat: Chat | null = null;
  isSendingMessage = false;
  authStore: AuthStore;

  constructor(store: AuthStore) {
    makeAutoObservable(this);
    this.authStore = store;
  }

  sendMessage = async (payload: SendMessagePayload) => {
    const { chatId, message } = payload;
    const { idInstance, apiTokenInstance } = this.authStore;
    try {
      this.isSendingMessage = true;
      const response = await api.post(`/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, { chatId, message });
      runInAction(() => {
        this.chats = this.chats.map((chat) => {
          if (chat.id == chatId) {
            return {
              ...chat,
              messages: chat.messages.concat([
                {
                  id: response.data.idMessage,
                  message,
                  date: new Date(),
                  type: 'outgoing',
                },
              ]),
            };
          }

          return chat;
        });
        this.isSendingMessage = false;
      });
    } catch {
      this.isSendingMessage = false;
    }
  };

  selectChat = (id: string) => {
    const chat = this.chats.find((chat) => chat.id === id);

    if (chat) {
      this.selectedChat = chat;
    }
  };

  resetChat = () => {
    this.selectedChat = null;
  };

  getChats = async () => {
    if (!this.authStore.isAuth) {
      return;
    }

    try {
      const { idInstance, apiTokenInstance } = this.authStore;
      const response = await api.get(`/waInstance${idInstance}/getChats/${apiTokenInstance}`);
      this.chats = await Promise.all(
        response.data.map(async (chat: any) => {
          // Получение первых 100 сообщений и последующие нужно получать при скролле, но реализацию загрузки при скролле не делал т.к. это тестовое
          const res = await api.post(`/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`);

          return {
            id: chat.id,
            name: chat.name,
            messages: res.data.map((m: any) => ({
              id: m.idMessage,
              message: m.textMessage,
              date: new Date(m.timestamp),
              type: m.type,
            })),
          };
        }),
      );
    } catch (e) {
      console.error(e);
    }
  };

  addChat = async (phone: string) => {
    const { idInstance, apiTokenInstance } = this.authStore;
    const phoneNumber = parseInt(phone.replace(/[^0-9]/g, ''), 10);
    const response = await api.post(`/waInstance${idInstance}/checkAccount/${apiTokenInstance}`, {
      phoneNumber,
    });
    const { exist, chatId } = response.data;

    if (this.chats.find((c) => c.id === chatId) || !exist) {
      console.log('return');
      return;
    }

    runInAction(() => {
      this.chats = this.chats.concat([
        {
          id: chatId,
          name: phone,
          messages: [],
        },
      ]);
    });
  };

  addMessage = (chatId: string, message: Message) => {
    this.chats = this.chats.map((chat) => {
      if (chat.id !== chatId) {
        return chat;
      }

      return {
        ...chat,
        messages: chat.messages.concat([message]),
      };
    });
  };
}
