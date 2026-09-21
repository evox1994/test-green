import { Box, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
  background: 'linear-gradient(28deg, #99d5d7 8.03%, #80bcff 91.51%)',

  '::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'linear-gradient(28deg, #007aff4d 8.03%, #007aff4d 91.51%)',
    maskImage: `url("/src/assets/pattern-bg.svg")`,
    maskPosition: '50%',
    maskRepeat: 'repeat',
    maskSize: 'auto',
  },
}));

export const Content = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
}));
