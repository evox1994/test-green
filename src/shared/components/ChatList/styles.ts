import { Box, IconButton, Input as MuiInput, styled, Typography } from '@mui/material';
import { PatternFormat } from 'react-number-format';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  backgroundColor: '#fff',
  padding: '16px 16px 0',
  width: '100%',
  maxWidth: '400px',
}));

export const Title = styled(Typography)(() => ({
  fontSize: '24px',
  fontWeight: 700,
}));

export const Input = styled(MuiInput)(() => ({
  backgroundColor: '#0909090d',
  border: '1px solid transparent',
  fontSize: '15px',
  width: '100%',
  height: '52px',
  borderRadius: '16px',
  padding: '12px',

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

export const AddChatForm = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

export const AddChatInput = styled(PatternFormat)(() => ({
  border: '1px solid transparent',
  width: '100%',
  height: '52px',
  borderRadius: '16px',
  padding: '12px',
  fontSize: '15px',
  backgroundColor: '#0909090d',
}));

export const AddButton = styled(IconButton)(() => ({
  color: '#fff',
  backgroundColor: '#007aff',

  ':hover': {
    backgroundColor: '#007aff',
  },
  ':disabled': {
    backgroundColor: '#00000042',
    color: '#fff',
  },
}));

export const List = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingRight: '16px',
  margin: '0 -16px 0 0',
}));

export const ListItem = styled(Typography)(() => ({
  display: 'block',
  padding: '30px 16px',
  cursor: 'pointer',
  fontWeight: 700,

  ':hover': {
    backgroundColor: '#f6f6f6',
  },

  '&.selected': {
    backgroundColor: '#007aff14',
  },
}));
