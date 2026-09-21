import { observer } from 'mobx-react-lite';
import { Add } from '@mui/icons-material';
import { useChatStore } from '@store';
import { useEffect, type FC } from 'react';
import { clsx } from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddButton, AddChatForm, AddChatInput, Container, List, ListItem, Title } from './styles';
import { schema } from './schema';

export const ChatList: FC = observer(() => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { chats, selectedChat, getChats, selectChat, addChat } = useChatStore();

  const handleSelectChat = (id: string) => () => {
    selectChat(id);
  };

  const handleAddChat = handleSubmit(({ phone }) => {
    addChat(phone);
  });

  useEffect(() => {
    getChats();
  }, []);

  return (
    <Container>
      <Title>Чаты</Title>
      <AddChatForm>
        <Controller
          control={control}
          name="phone"
          render={({ field, fieldState }) => (
            <>
              <AddChatInput
                placeholder="Введите номер телефона"
                format="+7 (###) ### ## ##"
                mask="_"
                value={field.value}
                onChange={field.onChange}
              />
              <AddButton disabled={fieldState.invalid || !field.value} onClick={handleAddChat}>
                <Add />
              </AddButton>
            </>
          )}
        />
      </AddChatForm>
      <List>
        {chats.map(({ id, name }) => (
          <ListItem key={id} onClick={handleSelectChat(id)} className={clsx({ selected: selectedChat?.id === id })}>
            {name}
          </ListItem>
        ))}
      </List>
    </Container>
  );
});
