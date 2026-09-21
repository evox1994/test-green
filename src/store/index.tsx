import { createContext, useContext, useRef, type FC, type ReactNode } from 'react';
import { AuthStore } from './auth.store';
import { ChatStore } from './chat.store';

class RootStore {
  authStore: AuthStore;
  chatStore: ChatStore;

  constructor() {
    this.authStore = new AuthStore();
    this.chatStore = new ChatStore(this.authStore);
  }
}

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const storeRef = useRef<RootStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = new RootStore();
  }

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};

const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Хук должен использоваться внутри StoreProvider');
  }
  return store;
};

export const useAuthStore = () => {
  return useStore().authStore;
};

export const useChatStore = () => {
  return useStore().chatStore;
};
