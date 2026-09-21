import type { FC, ReactNode } from 'react';
import { format } from 'date-fns';
import { Container, SendTime } from './styles';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  type: 'outgoing' | 'incoming';
  date: Date;
}

export const Message: FC<Props> = ({ type, date, children }) => {
  const isOutgoing = type === 'outgoing';

  return (
    <Container className={clsx({ outgoing: isOutgoing })}>
      <SendTime className={clsx({ outgoing: isOutgoing })}>{format(date, 'HH:mm')}</SendTime>
      {children}
    </Container>
  );
};
