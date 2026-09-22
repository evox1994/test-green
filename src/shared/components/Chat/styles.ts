import { Box, Input, styled, Typography } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: '100%',
  flex: 1,
}));

export const ChatHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  padding: '16px',
  borderLeft: '1px solid #0c0d0e0f',
  width: '100%',
  background: '#fff',
}));

export const Title = styled(Typography)(() => ({
  fontSize: '20px',
  fontWeight: 500,
}));

export const ChatBody = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'flex-start',
  width: '100%',
  flex: 1,
  gap: '5px',
  overflow: 'hidden',
  overflowY: 'auto',
  padding: '0 16px',
}));

export const ChatFooter = styled(Box)(() => ({
  width: '100%',
  maxWidth: '740px',
  margin: '0 auto',
  padding: '0 16px 16px 16px',
}));

export const ChatInput = styled(Input)(() => ({
  borderRadius: '16px',
  padding: '8px 12px',
  backgroundColor: '#fff',
  border: '1px solid transparent',
  fontSize: '15px',
  width: '100%',

  '::before': {
    content: 'none',
  },
  '::after': {
    content: 'none',
  },
  '&.Mui-error': {
    borderColor: '#d32f2f',
  },
}));
