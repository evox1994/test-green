import { useEffect, useRef, type FC } from 'react';
import { Chat, ChatList } from '@shared/components';
import { observer } from 'mobx-react-lite';
import { useAuthStore, useChatStore } from '@store';
import { Container } from './styles';
import type { IncomingMessagePayload } from '../../workers/types';

export const ChatPage: FC = observer(() => {
  const workerRef = useRef<Worker>(null);
  const { idInstance, apiTokenInstance } = useAuthStore();
  const { addMessage } = useChatStore();

  useEffect(() => {
    workerRef.current = new Worker('../../workers/recieveMessages.ts');

    workerRef.current.onmessage = (event: MessageEvent<IncomingMessagePayload>) => {
      const { chatId, ...message } = event.data;
      addMessage(chatId, message);
    };

    workerRef.current.postMessage({
      type: 'start',
      idInstance,
      apiTokenInstance,
    });

    return () => {
      if (workerRef.current) {
        workerRef.current.postMessage({ type: 'stop' });
        workerRef.current.terminate();
      }
    };
  }, [idInstance, apiTokenInstance]);

  return (
    <Container>
      <ChatList />
      <Chat />
    </Container>
  );
});
