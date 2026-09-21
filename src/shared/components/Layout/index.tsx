import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '@store';
import { Navigate, Outlet, useMatch } from 'react-router';
import { Container, Content } from './styles';

export const Layout: FC = observer(() => {
  const { isAuth } = useAuthStore();
  const isAuthPage = useMatch('/auth');

  if (!isAuth && !isAuthPage) {
    return <Navigate to="/auth" />;
  }

  if (isAuth && isAuthPage) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
});
