import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './src/store/authStore';
import { MagicProvider, Type, Button, Field } from './src/design-system';
import type { Theme } from './src/design-system/skins';
import { RootNavigator } from './src/navigation/RootNavigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

const levantTheme: Partial<Theme> = {
  bg: '#FFFFFF',
  text: '#352E45',
  textMuted: '#6B7280',
  border: '#E3E0EA',
  primary: { bg: '#6240CB', fg: '#FFFFFF', border: '#5235A8', pressed: '#4E2DA3' },
  secondary: { bg: '#F5F5F5', fg: '#352E45', border: '#E3E0EA', pressed: '#EBEBEB' },
  success: { bg: '#22C55E', fg: '#FFFFFF', border: '#22C55E', pressed: '#16A34A' },
  warning: { bg: '#F59E0B', fg: '#FFFFFF', border: '#F59E0B', pressed: '#D97706' },
  info: { bg: '#3B82F6', fg: '#FFFFFF', border: '#3B82F6', pressed: '#2563EB' },
  danger: { bg: '#EF4444', fg: '#FFFFFF', border: '#EF4444', pressed: '#DC2626' },
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MagicProvider theme={levantTheme}>
        <RootNavigator />
        <StatusBar style="auto" />
      </MagicProvider>
    </QueryClientProvider>
  );
}
