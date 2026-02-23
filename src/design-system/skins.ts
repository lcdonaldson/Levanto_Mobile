// =============================================================================
// Skin — the smallest unit of color identity
// =============================================================================

export interface Skin {
  bg: string;
  fg: string;
  border: string;
  pressed: string;
}

// =============================================================================
// Theme — ambient colors + named skins
// =============================================================================

export interface Theme {
  bg: string;
  text: string;
  textMuted: string;
  border: string;
  primary: Skin;
  secondary: Skin;
  danger: Skin;
  ghost: Skin;
  surface: Skin;
  success: Skin;
  warning: Skin;
  info: Skin;
}

// Skin names that can be used as string shorthand
export type SkinName = 'primary' | 'secondary' | 'danger' | 'ghost' | 'surface' | 'success' | 'warning' | 'info';

// What components accept: a name (resolved from theme) or a raw Skin object
export type SkinProp = SkinName | Skin;

// =============================================================================
// Light Theme
// =============================================================================

export const light: Theme = {
  bg: '#FFFFFF',
  text: '#1F2937',
  textMuted: '#6B7280',
  border: '#E5E7EB',

  primary: {
    bg: '#5B5EFF',
    fg: '#FFFFFF',
    border: '#5B5EFF',
    pressed: '#3B3ECF',
  },
  secondary: {
    bg: '#F3F4F6',
    fg: '#1F2937',
    border: '#E5E7EB',
    pressed: '#E5E7EB',
  },
  danger: {
    bg: '#EF4444',
    fg: '#FFFFFF',
    border: '#EF4444',
    pressed: '#DC2626',
  },
  ghost: {
    bg: 'transparent',
    fg: '#5B5EFF',
    border: 'transparent',
    pressed: '#E8E8FF',
  },
  surface: {
    bg: '#F9FAFB',
    fg: '#1F2937',
    border: '#E5E7EB',
    pressed: '#F3F4F6',
  },
  success: {
    bg: '#22C55E',
    fg: '#FFFFFF',
    border: '#22C55E',
    pressed: '#16A34A',
  },
  warning: {
    bg: '#F59E0B',
    fg: '#FFFFFF',
    border: '#F59E0B',
    pressed: '#D97706',
  },
  info: {
    bg: '#3B82F6',
    fg: '#FFFFFF',
    border: '#3B82F6',
    pressed: '#2563EB',
  },
};

// =============================================================================
// Dark Theme
// =============================================================================

export const dark: Theme = {
  bg: '#111827',
  text: '#F3F4F6',
  textMuted: '#9CA3AF',
  border: '#374151',

  primary: {
    bg: '#7C7FFF',
    fg: '#FFFFFF',
    border: '#7C7FFF',
    pressed: '#6B6EDF',
  },
  secondary: {
    bg: '#374151',
    fg: '#F3F4F6',
    border: '#4B5563',
    pressed: '#4B5563',
  },
  danger: {
    bg: '#EF4444',
    fg: '#FFFFFF',
    border: '#EF4444',
    pressed: '#DC2626',
  },
  ghost: {
    bg: 'transparent',
    fg: '#7C7FFF',
    border: 'transparent',
    pressed: '#2D2E5F',
  },
  surface: {
    bg: '#1F2937',
    fg: '#F3F4F6',
    border: '#374151',
    pressed: '#374151',
  },
  success: {
    bg: '#4ADE80',
    fg: '#052E16',
    border: '#4ADE80',
    pressed: '#22C55E',
  },
  warning: {
    bg: '#FBBF24',
    fg: '#451A03',
    border: '#FBBF24',
    pressed: '#F59E0B',
  },
  info: {
    bg: '#60A5FA',
    fg: '#0C2D6B',
    border: '#60A5FA',
    pressed: '#3B82F6',
  },
};
