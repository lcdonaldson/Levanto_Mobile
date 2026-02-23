import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../store/authStore';
import { AppNavigator } from './AppNavigator';
import { LoginScreen } from '../screens/LoginScreen';

interface RootNavigatorProps {
  onReady?: () => void;
}

export function RootNavigator({ onReady }: RootNavigatorProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <NavigationContainer onReady={onReady}>
      {isAuthenticated ? <AppNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
}
