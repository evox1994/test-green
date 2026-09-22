import { type FC } from 'react';
import { ChatBody, ChatFooter, ChatHeader, ChatInput, Container, Title } from './styles';
import { observer } from 'mobx-react-lite';
import { IconButton, InputAdornment } from '@mui/material';
import { ArrowBackIosNewRounded, SendRounded } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useChatStore } from '@store';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { Message } from './components';

export const Chat: FC = observer(() => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      message: '',
    },
  });
  const { selectedChat, isSendingMessage, sendMessage, resetChat } = useChatStore();

  const handleSendMessage = handleSubmit(({ message }) => {
    if (selectedChat) {
      sendMessage({
        chatId: selectedChat.id,
        message,
      });
      reset();
    }
  });

  const handleResetChat = () => {
    resetChat();
  };

  if (!selectedChat) {
    return null;
  }

  return (
    <Container>
      <ChatHeader>
        <IconButton sx={{ color: '#000' }} onClick={handleResetChat}>
          <ArrowBackIosNewRounded />
        </IconButton>
        <Title>{selectedChat.name}</Title>
      </ChatHeader>
      <ChatBody>
        {selectedChat.messages.map(({ id, message, type, date }) => (
          <Message key={id} type={type} date={date}>
            {message}
          </Message>
        ))}
      </ChatBody>
      <ChatFooter>
        <Controller
          control={control}
          name="message"
          render={({ field }) => (
            <ChatInput
              placeholder="Введите сообщение"
              multiline
              maxRows={5}
              value={field.value}
              onChange={field.onChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton disabled={!field.value || isSendingMessage} onClick={handleSendMessage}>
                    <SendRounded />
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        />
      </ChatFooter>
    </Container>
  );
});
