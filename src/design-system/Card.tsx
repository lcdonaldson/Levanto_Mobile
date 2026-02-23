import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { spacing, radii, shadows } from './tokens';
import { useTheme, resolveSkin } from './provider';
import type { SkinProp } from './skins';

export interface CardProps {
  children: React.ReactNode;
  /** Skin name or custom Skin object. Default: 'surface' */
  skin?: SkinProp;
  style?: ViewStyle;
}

export function Card({
  children,
  skin: skinProp = 'surface',
  style,
}: CardProps) {
  const theme = useTheme();
  const skin = resolveSkin(skinProp, theme);

  return (
    <View
      style={[
        styles.card,
        shadows.md,
        {
          backgroundColor: skin.bg,
          borderColor: skin.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
  },
});
