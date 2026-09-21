import { Box, styled, Typography } from '@mui/material';

export const Container = styled(Box)(() => ({
  borderRadius: '8px',
  padding: '4px',
  fontSize: '15px',
  textAlign: 'left',
  background: '#fff',
  border: '1px solid #0c0d0e0f',
  display: 'flex',
  alignItems: 'flex-end',
  gap: '10px',

  '&.outgoing': {
    marginLeft: 'auto',
  },
}));

export const SendTime = styled(Typography)(() => ({
  fontSize: '10px',

  '&.outgoing': {
    order: 1,
  },
}));
