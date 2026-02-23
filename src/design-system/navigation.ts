import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import type { Theme as NavTheme } from '@react-navigation/native';
import { light, dark } from './skins';

export const LightNavigationTheme: NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: light.primary.bg,
    background: light.bg,
    card: light.bg,
    text: light.text,
    border: light.border,
    notification: light.danger.bg,
  },
};

export const DarkNavigationTheme: NavTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: dark.primary.bg,
    background: dark.bg,
    card: dark.bg,
    text: dark.text,
    border: dark.border,
    notification: dark.danger.bg,
  },
};
