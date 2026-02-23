import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

interface AuthState {
  user: string | null;
  companyName: string | null;
  isAuthenticated: boolean;
  login: (user: string, companyName: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(  persist(
    (set) => ({
      user: null,
      companyName: null,
      isAuthenticated: false,
      login: (user, companyName) =>
        set({ user, companyName, isAuthenticated: true }),
      logout: () =>
        set({ user: null, companyName: null, isAuthenticated: false }),
    }),
    {
      name: 'levanto-auth',
      storage: createJSONStorage(() => 
        Platform.OS === 'web' ? localStorage : AsyncStorage
      ),
    },
  ),
);

// Prevent Redux DevTools from connecting (causes import.meta errors on web)
if (typeof window !== 'undefined') {
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ = undefined;
}
