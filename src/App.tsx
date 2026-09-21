import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { StoreProvider } from '@store';
import { AuthPage, ChatPage } from '@pages';
import { Layout } from '@shared/components';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ChatPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
