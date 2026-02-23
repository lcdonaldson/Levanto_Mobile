import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { spacing, radii, type as scales } from './tokens';
import { useTheme, resolveSkin } from './provider';
import type { SkinProp } from './skins';

export interface BadgeProps {
  children: React.ReactNode;
  /** Skin name or custom Skin object. Default: 'secondary' */
  skin?: SkinProp;
  style?: ViewStyle;
}

export function Badge({ children, skin: skinProp = 'secondary', style }: BadgeProps) {
  const theme = useTheme();
  const skin = resolveSkin(skinProp, theme);

  const label = typeof children === 'string' ? (
    <Text style={[styles.label, { color: skin.fg }]}>{children}</Text>
  ) : children;

  return (
    <View style={[styles.badge, { backgroundColor: skin.bg, borderColor: skin.border }, style]}>
      {label}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs / 2,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.full,
    borderWidth: 1,
  },
  label: {
    fontSize: scales.caption.fontSize,
    fontWeight: '600',
  },
});
