import { Box, Button, Input as MuiInput, styled, Typography } from '@mui/material';

export const FormContainer = styled(Box)(() => ({
  background: 'linear-gradient(180deg, #ffffffa3, #ffffffe0)',
  backdropFilter: 'blur(25px)',
  width: '100%',
  maxWidth: '560px',
  margin: '0 auto',
  borderRadius: '28px',
  padding: '50px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
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

export const InputError = styled(Typography)(() => ({
  fontSize: '12px',
  color: '#d32f2f',
  fontWeight: 400,
  marginTop: '5px',
}));

export const SubmitButton = styled(Button)(() => ({
  backgroundColor: '#007aff',
  textTransform: 'none',
  fontWeight: 700,
  borderRadius: '20px',
  height: '60px',
  border: 'none',
  fontSize: '17px',

  ':hover': {
    backgroundColor: '#479fff',
  },
}));
