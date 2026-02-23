import React from 'react';
import { Text } from 'react-native';
import type { TextProps } from 'react-native';
import { type as scales } from './tokens';
import type { TypeScale } from './tokens';
import { useTheme, resolveSkin } from './provider';
import type { SkinProp } from './skins';

export interface TypeProps extends TextProps {
  /** Type scale preset. Default: 'body' */
  scale?: TypeScale;
  /** Use muted (secondary) text color. */
  muted?: boolean;
  /** Inherit fg color from a skin (for text on colored surfaces). */
  skin?: SkinProp;
}

export function Type({
  scale = 'body',
  muted = false,
  skin,
  style,
  ...props
}: TypeProps) {
  const theme = useTheme();

  const color = skin
    ? resolveSkin(skin, theme).fg
    : muted
      ? theme.textMuted
      : theme.text;

  return (
    <Text style={[scales[scale], { color }, style]} {...props} />
  );
}
