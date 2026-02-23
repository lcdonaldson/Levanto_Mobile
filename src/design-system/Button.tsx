import React from 'react';
import { Pressable, Text, StyleSheet, Platform } from 'react-native';
import type { ViewStyle } from 'react-native';
import { spacing, radii, type as scales, MIN_TOUCH } from './tokens';
import { useTheme, resolveSkin } from './provider';
import type { SkinProp } from './skins';

export interface ButtonProps {
  children: React.ReactNode;
  /** Skin name or custom Skin object. Default: 'primary' */
  skin?: SkinProp;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}

export function Button({
  children,
  skin: skinProp = 'primary',
  size = 'md',
  disabled = false,
  style,
  onPress,
}: ButtonProps) {
  const theme = useTheme();
  const skin = resolveSkin(skinProp, theme);

  // Check if custom background color is provided in style
  const getCustomBgColor = () => {
    if (!style) return null;
    if (Array.isArray(style)) {
      for (const s of style) {
        if (s && typeof s === 'object' && 'backgroundColor' in s) {
          return s.backgroundColor;
        }
      }
      return null;
    }
    if (typeof style === 'object' && 'backgroundColor' in style) {
      return style.backgroundColor;
    }
    return null;
  };
  const customBgColor = getCustomBgColor();

  const label = typeof children === 'string' ? (
    <Text style={[styles.label, sizes[`label_${size}`], { color: skin.fg }]}>
      {children}
    </Text>
  ) : children;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      android_ripple={{ color: skin.pressed, borderless: false }}
      style={({ pressed }) => {
        const shouldShowBorder = !customBgColor && skinProp === 'secondary';
        return [
          styles.btn,
          sizes[size],
          disabled && styles.disabled,
          style,
          {
            backgroundColor: pressed 
              ? (customBgColor ? `${customBgColor}dd` : skin.pressed)
              : (customBgColor || skin.bg),
            borderWidth: shouldShowBorder ? 1 : 0,
            borderColor: shouldShowBorder ? skin.border : 'transparent',
          },
        ];
      }}
    >
      {label}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    minHeight: MIN_TOUCH,
    // @ts-ignore - web only
    outline: 'none',
  },
  label: {
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.4,
  },
});

const sizes = StyleSheet.create({
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  md: {
    paddingVertical: spacing.md - 4,
    paddingHorizontal: spacing.lg,
  },
  lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  label_sm: { fontSize: scales.label.fontSize },
  label_md: { fontSize: scales.body.fontSize },
  label_lg: { fontSize: scales.h3.fontSize },
});
