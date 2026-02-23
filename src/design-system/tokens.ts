import { Platform, StyleSheet } from 'react-native';

// =============================================================================
// Spacing (dp)
// =============================================================================

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

// =============================================================================
// Border Radius (dp)
// =============================================================================

export const radii = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

// =============================================================================
// Type Scales — pre-composed size + weight + lineHeight
// =============================================================================

export const type = StyleSheet.create({
  h1: { fontSize: 36, fontWeight: '700', lineHeight: 43 },
  h2: { fontSize: 24, fontWeight: '700', lineHeight: 29 },
  h3: { fontSize: 18, fontWeight: '600', lineHeight: 22 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  label: { fontSize: 14, fontWeight: '500', lineHeight: 17 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 15 },
});

export type TypeScale = keyof typeof type;

// =============================================================================
// Shadows (platform-split)
// =============================================================================

type ShadowStyle = {
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
};

function shadow(
  ios: { y: number; opacity: number; radius: number },
  elevation: number,
): ShadowStyle {
  return Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: ios.y },
      shadowOpacity: ios.opacity,
      shadowRadius: ios.radius,
    },
    android: { elevation },
    default: {},
  }) as ShadowStyle;
}

export const shadows = {
  sm: shadow({ y: 1, opacity: 0.05, radius: 2 }, 1),
  md: shadow({ y: 4, opacity: 0.1, radius: 6 }, 3),
  lg: shadow({ y: 10, opacity: 0.1, radius: 15 }, 6),
} as const;

// =============================================================================
// Motion (ms)
// =============================================================================

export const motion = {
  fast: 150,
  base: 200,
  slow: 300,
} as const;

// =============================================================================
// Accessibility
// =============================================================================

export const MIN_TOUCH = 44;
