import type { FC, ReactNode } from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';
import { Typography } from '@mui/material';
import { Container, SendTime } from './styles';

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
      <Typography>{children}</Typography>
    </Container>
  );
};
